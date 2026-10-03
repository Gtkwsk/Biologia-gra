// Krótkie dźwięki gry (SPEC.md, sekcja 6.3: krótkie i wyłączalne). Syntezowane w Web Audio,
// bez plików, więc działają offline. Włączanie i wyłączanie: panel rodzica (stan.ustawienia.dzwiek).
// Dźwięk błędu jest cichy i niski: informuje, nie karze.

const GLOSNOSC = 0.12;

// Nuty: [częstotliwość w Hz, początek w s, długość w s, kształt fali].
const DZWIEKI = {
  dobrze: [
    [660, 0, 0.09, 'sine'],
    [880, 0.08, 0.13, 'sine'],
  ],
  zle: [
    [262, 0, 0.12, 'triangle'],
    [220, 0.1, 0.16, 'triangle'],
  ],
  // Koniec zadania bez błędu: zaczyna się chwilę po dźwięku ostatniej odpowiedzi.
  koniec: [
    [523, 0.22, 0.1, 'sine'],
    [659, 0.31, 0.1, 'sine'],
    [784, 0.4, 0.18, 'sine'],
  ],
  wygrana: [
    [523, 0, 0.11, 'sine'],
    [659, 0.11, 0.11, 'sine'],
    [784, 0.22, 0.11, 'sine'],
    [1047, 0.33, 0.32, 'sine'],
  ],
};

export const NAZWY_DZWIEKOW = Object.keys(DZWIEKI);

let wlaczone = true;
let kontekst = null;

export function ustawDzwieki(tak) {
  wlaczone = tak === true;
}

export function dzwiekiWlaczone() {
  return wlaczone;
}

export function graj(nazwa) {
  const nuty = DZWIEKI[nazwa];
  if (!wlaczone || !nuty) return;
  const AC = globalThis.AudioContext ?? globalThis.webkitAudioContext;
  if (!AC) return;
  try {
    kontekst ??= new AC();
    if (kontekst.state === 'suspended') kontekst.resume().catch(() => {});
    const t0 = kontekst.currentTime + 0.01;
    for (const [czestotliwosc, poczatek, dlugosc, ksztalt] of nuty) {
      const oscylator = kontekst.createOscillator();
      const wzmocnienie = kontekst.createGain();
      oscylator.type = ksztalt;
      oscylator.frequency.value = czestotliwosc;
      const start = t0 + poczatek;
      wzmocnienie.gain.setValueAtTime(0.0001, start);
      wzmocnienie.gain.exponentialRampToValueAtTime(GLOSNOSC, start + 0.015);
      wzmocnienie.gain.exponentialRampToValueAtTime(0.0001, start + dlugosc);
      oscylator.connect(wzmocnienie).connect(kontekst.destination);
      oscylator.start(start);
      oscylator.stop(start + dlugosc + 0.03);
    }
  } catch {
    // Brak dźwięku nie przerywa gry.
  }
}

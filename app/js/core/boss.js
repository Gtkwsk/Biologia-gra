// Boss świata (SPEC.md, sekcja 4.3): wyzwania w formatach sprawdzianu, bez podpowiedzi,
// z limitem błędów zamiast limitu czasu. Funkcje czyste.
//
// - Boss jest dostępny, gdy każde zadanie z misji świata zostało choć raz rozwiązane.
// - Z każdej puli losowane jest jedno zadanie, więc kolejne podejścia różnią się wariantami.
// - Gracz ma trzy serca. Wyzwanie z choćby jednym błędem kosztuje jedno serce.
//   Utrata wszystkich serc kończy podejście; można od razu spróbować ponownie.
// - Rewanż mistrzowski (po pokonaniu bossa): jedno serce, więc pierwszy błąd kończy podejście.
// - Boss ma tyle segmentów życia, ile wyzwań; każde ukończone wyzwanie zabiera jeden segment
//   (postęp pokazany językiem gier), a wyzwanie bez błędu to „cios krytyczny”.
// - Mikroskop: lupa na start, pokonany boss świata 2 daje powiększenie około 400 razy,
//   boss świata 3 około 10 000 razy (SPEC.md, sekcja 4.1).

export const SERCA = 3;
export const SERCA_MISTRZA = 1;

export function misjeUkonczone(swiat, stan) {
  return swiat.misje.filter((m) => m.zadania.every((id) => (stan.zadania[id]?.proby ?? 0) > 0)).length;
}

export function bossDostepny(swiat, stan) {
  return Boolean(swiat.boss) && misjeUkonczone(swiat, stan) === swiat.misje.length;
}

export function wylosujWyzwania(boss, zadania, losuj = Math.random) {
  return boss.wyzwania.map((w) => {
    const id = w.pula[Math.floor(losuj() * w.pula.length)];
    return zadania.find((z) => z.id === id);
  });
}

export function nowePodejscie(liczbaWyzwan, { serca = SERCA } = {}) {
  return { serca, maksSerca: serca, indeks: 0, liczba: liczbaWyzwan, wyniki: [] };
}

// Życie bossa: pozostałe segmenty (jeden na wyzwanie).
export function zycieBossa(podejscie) {
  return Math.max(0, podejscie.liczba - podejscie.indeks);
}

// Zwraca podejście po wyzwaniu: { ...podejscie, serca, indeks, wyniki, stracone }.
export function poWyzwaniu(podejscie, wynik) {
  const bezBledu = wynik.wszystkie > 0 && wynik.poprawne === wynik.wszystkie;
  return {
    ...podejscie,
    serca: bezBledu ? podejscie.serca : podejscie.serca - 1,
    indeks: podejscie.indeks + 1,
    wyniki: [...podejscie.wyniki, wynik],
    stracone: !bezBledu,
  };
}

export function stanPodejscia(podejscie) {
  if (podejscie.serca <= 0) return 'przegrane';
  if (podejscie.indeks >= podejscie.liczba) return 'wygrane';
  return 'trwa';
}

export const POZIOMY_MIKROSKOPU = [
  { id: 'lupa', nazwa: 'Lupa', powiekszenie: null, za: null },
  { id: 'x400', nazwa: 'Mikroskop szkolny', powiekszenie: 'około 400 razy', za: 2 },
  { id: 'x10000', nazwa: 'Bardzo duże powiększenie', powiekszenie: 'około 10 000 razy', za: 3 },
];

export function poziomMikroskopu(stan) {
  let poziom = 0;
  POZIOMY_MIKROSKOPU.forEach((p, i) => {
    if (p.za === null || stan.bossowie.includes(p.za)) poziom = Math.max(poziom, i);
  });
  return poziom;
}

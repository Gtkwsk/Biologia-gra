// Próbny sprawdzian (SPEC.md, sekcja 4.3): mieszanka wszystkich światów, punktacja jak
// w podręczniku (dane: data/sprawdzian.js), bez podpowiedzi i bez limitu czasu. Funkcje czyste.
//
// - Sprawdzian jest dostępny po pokonaniu bossów wszystkich światów albo po włączeniu
//   w panelu rodzica odblokowania wszystkich światów.
// - Z każdej puli losowane jest jedno zadanie.
// - Punkty za zadanie: część poprawnych odpowiedzi razy liczba punktów, zaokrąglona w dół
//   do pełnych punktów (pełna liczba punktów tylko za zadanie bez błędu).

import { kartyZBledem } from './karty.js';

// „1 punkt”, „3 punkty”, „29 punktów”.
export function liczbaPunktow(n) {
  if (n === 1) return '1 punkt';
  const r10 = n % 10;
  const r100 = n % 100;
  if (r10 >= 2 && r10 <= 4 && (r100 < 12 || r100 > 14)) return `${n} punkty`;
  return `${n} punktów`;
}

// „z 1 punktu”, „z 3 punktów” (dopełniacz po „z”).
export function zPunktow(n) {
  return n === 1 ? '1 punktu' : `${n} punktów`;
}

export function sprawdzianDostepny(swiaty, stan) {
  if (stan.ustawienia.odblokujWszystkie) return true;
  const zBossem = swiaty.filter((s) => s.gotowy && s.boss);
  return zBossem.length > 0 && zBossem.every((s) => stan.bossowie.includes(s.id));
}

export function wylosujZadania(sprawdzian, zadania, losuj = Math.random) {
  const poId = new Map(zadania.map((z) => [z.id, z]));
  return sprawdzian.map((p) => ({ ...p, zadanie: poId.get(p.pula[Math.floor(losuj() * p.pula.length)]) }));
}

export function punktyZaZadanie(maks, wynik) {
  if (!wynik || !(wynik.wszystkie > 0)) return 0;
  const czesc = Math.min(1, Math.max(0, wynik.poprawne / wynik.wszystkie));
  // Odrobina zapasu chroni przed błędem zaokrąglenia (np. 3 × 2/3).
  return Math.min(maks, Math.floor(maks * czesc + 1e-9));
}

export function sumaPunktow(sprawdzian) {
  return sprawdzian.reduce((s, p) => s + p.punkty, 0);
}

// Wynik do zapisu: { dzien, zadania: [{ punkt, zdobyte, maks }] }.
export function wynikSprawdzianu(pozycje, wyniki, dzien) {
  return {
    dzien,
    zadania: pozycje.map((p, i) => ({ punkt: p.punkt, zdobyte: punktyZaZadanie(p.punkty, wyniki[i]), maks: p.punkty })),
  };
}

// Misje do poćwiczenia po zadaniu z błędami (odnośniki w wyniku). Pozycja może mieć mapę
// misjeKart (karta atlasu → misja w świecie pozycji): odnośniki prowadzą wtedy do misji kart
// z błędem. Karta spoza mapy i zadanie bez kart prowadzą do misji tematu.
export function misjeDoPoprawy(pozycja, wynik) {
  const mapa = pozycja.misjeKart ?? {};
  const misje = (wynik?.karty ? kartyZBledem(wynik) : []).map((k) => mapa[k] ?? pozycja.misja.id);
  return misje.length ? [...new Set(misje)] : [pozycja.misja.id];
}

export function podsumuj(wynik) {
  const zdobyte = wynik.zadania.reduce((s, z) => s + z.zdobyte, 0);
  const maks = wynik.zadania.reduce((s, z) => s + z.maks, 0);
  return { zdobyte, maks, doPoprawy: wynik.zadania.filter((z) => z.zdobyte < z.maks).map((z) => z.punkt) };
}

// Punkty zakresu od najsłabszego (dla panelu rodzica): część zdobytych punktów w ostatnich
// podejściach (najwyżej `ile`). Zwraca [{ punkt, czesc, podejscia }] tylko dla punktów z brakami.
export function najslabszePunkty(sprawdziany, ile = 3) {
  const ostatnie = sprawdziany.slice(-ile);
  const suma = new Map();
  for (const s of ostatnie) {
    for (const z of s.zadania) {
      const d = suma.get(z.punkt) ?? { zdobyte: 0, maks: 0, podejscia: 0 };
      suma.set(z.punkt, { zdobyte: d.zdobyte + z.zdobyte, maks: d.maks + z.maks, podejscia: d.podejscia + 1 });
    }
  }
  return [...suma.entries()]
    .map(([punkt, d]) => ({ punkt, czesc: d.maks ? d.zdobyte / d.maks : 0, podejscia: d.podejscia }))
    .filter((p) => p.czesc < 1)
    .sort((a, b) => a.czesc - b.czesc || a.punkt - b.punkt);
}

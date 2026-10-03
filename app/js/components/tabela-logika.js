// Logika zadania „tabela porównawcza” (SPEC.md, sekcja 5, typ 6). Funkcje czyste.
// Odpowiedzi wynikają z typów komórek (dane zgodne z tabelą w TRESCI.md, sekcja 2.3).

import { zWielkiej } from './podpisywanie-logika.js';

export const klucz = (wiersz, kolumna) => `${wiersz}|${kolumna}`;

export function przygotujTabele(zadanie, { elementy, typyKomorek }) {
  const elementPoId = new Map(elementy.map((e) => [e.id, e]));
  const typPoId = new Map(typyKomorek.map((t) => [t.id, t]));
  const wiersze = zadanie.wiersze.map((id) => elementPoId.get(id));
  const kolumny = zadanie.kolumny.map((id) => typPoId.get(id));
  const poprawne = {};
  for (const w of wiersze) for (const k of kolumny) poprawne[klucz(w.id, k.id)] = k.obecnosc[w.id];
  return { wiersze, kolumny, poprawne };
}

// Zdanie wyjaśniające komórkę tabeli, np. „Komórka bakteryjna nie ma mitochondriów.”
export function zdanieKomorki(typ, element) {
  if (typ.zdania?.[element.id]) return typ.zdania[element.id];
  const czyMa = typ.obecnosc[element.id] === 'tak';
  return `${zWielkiej(typ.nazwa)} ${czyMa ? 'ma' : 'nie ma'} ${czyMa ? element.biernik : element.brak}.`;
}

// odpowiedzi: { klucz: 'tak' | 'nie' } (brak klucza = puste pole)
export function ocenTabele(przyg, odpowiedzi) {
  const komorki = [];
  for (const w of przyg.wiersze) {
    for (const k of przyg.kolumny) {
      const kl = klucz(w.id, k.id);
      komorki.push({ wiersz: w.id, kolumna: k.id, klucz: kl, oczekiwane: przyg.poprawne[kl], podane: odpowiedzi[kl] ?? null, dobrze: odpowiedzi[kl] === przyg.poprawne[kl] });
    }
  }
  const wszystkieDobrze = (filtr) => komorki.filter(filtr).every((c) => c.dobrze);
  return {
    komorki,
    wiersze: Object.fromEntries(przyg.wiersze.map((w) => [w.id, wszystkieDobrze((c) => c.wiersz === w.id)])),
    kolumny: Object.fromEntries(przyg.kolumny.map((k) => [k.id, wszystkieDobrze((c) => c.kolumna === k.id)])),
    poprawne: komorki.filter((c) => c.dobrze).length,
    wszystkie: komorki.length,
  };
}

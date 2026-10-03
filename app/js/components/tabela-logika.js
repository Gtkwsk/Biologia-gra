// Logika zadania „tabela porównawcza” (SPEC.md, sekcja 5, typ 6): siatka ✓/✗. Funkcje czyste.
// Dwa rodzaje tabel, odpowiedzi zawsze z danych (nie z zadania):
// - typy komórek × elementy (zadanie.kolumny, zadanie.wiersze): obecność z data/typy-komorek.js,
//   zgodna z tabelą w TRESCI.md, sekcja 2.3;
// - procesy × substancje (zadanie.procesy, zadanie.substancje): czy substancja powstaje w procesie,
//   z data/procesy.js (zapisy słowne z TRESCI.md, sekcje 2.4 i 2.6).

import { zWielkiej } from './podpisywanie-logika.js';

export const klucz = (wiersz, kolumna) => `${wiersz}|${kolumna}`;

// Zwraca { rodzaj, wiersze, kolumny, poprawne, opis } – opis: teksty widoku zależne od rodzaju tabeli.
export function przygotujTabele(zadanie, { elementy = [], typyKomorek = [], procesy = [], katalog = new Map() }) {
  if (zadanie.procesy) return tabelaProcesow(zadanie, procesy, katalog);
  const elementPoId = new Map(elementy.map((e) => [e.id, e]));
  const typPoId = new Map(typyKomorek.map((t) => [t.id, t]));
  const wiersze = zadanie.wiersze.map((id) => elementPoId.get(id));
  const kolumny = zadanie.kolumny.map((id) => typPoId.get(id));
  const poprawne = {};
  for (const w of wiersze) for (const k of kolumny) poprawne[klucz(w.id, k.id)] = k.obecnosc[w.id];
  return {
    rodzaj: 'komorki',
    wiersze,
    kolumny,
    poprawne,
    opis: {
      rog: 'Element',
      tak: 'ma',
      nie: 'nie ma',
      instrukcja: 'Zaznacz, czy dana komórka ma ten element.',
      jakStukac: 'Stuknij pole: raz to ✓ (ma), drugi raz ✗ (nie ma), trzeci raz czyści pole.',
      nazwaKolumny: (k) => k.nazwa.replace('komórka ', ''),
      kartaKolumny: (k) => `komorka-${k.id}`,
      zdanie: (k, w) => zdanieKomorki(k, w),
    },
  };
}

function tabelaProcesow(zadanie, procesy, katalog) {
  const procesPoId = new Map(procesy.map((p) => [p.id, p]));
  const wiersze = zadanie.substancje.map((id) => katalog.get(id));
  const kolumny = zadanie.procesy.map((id) => procesPoId.get(id));
  const poprawne = {};
  for (const w of wiersze) for (const k of kolumny) poprawne[klucz(w.id, k.id)] = k.produkty.includes(w.id) ? 'tak' : 'nie';
  return {
    rodzaj: 'procesy',
    wiersze,
    kolumny,
    poprawne,
    opis: {
      rog: 'Co powstaje?',
      tak: 'powstaje',
      nie: 'nie powstaje',
      instrukcja: 'Zaznacz, co powstaje w każdym procesie.',
      jakStukac: 'Stuknij pole: raz to ✓ (powstaje), drugi raz ✗ (nie powstaje), trzeci raz czyści pole.',
      nazwaKolumny: (k) => k.nazwa,
      kartaKolumny: (k) => k.id,
      zdanie: (k, w) => zdanieProcesu(k, w),
    },
  };
}

// Zdanie wyjaśniające pole tabeli procesów, np. „W fermentacji mlekowej nie powstaje dwutlenek węgla.”
export function zdanieProcesu(proces, substancja) {
  const powstaje = proces.produkty.includes(substancja.id);
  const czasownik = substancja.mnoga ? 'powstają' : 'powstaje';
  return `${zWielkiej(proces.miejscownik)} ${powstaje ? '' : 'nie '}${czasownik} ${substancja.nazwa}.`;
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

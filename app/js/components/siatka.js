// Mechanika „Sortownia” (SPEC.md, sekcja 3.2, świat 1): przykłady przeciągane do komórki siatki
// „związek × funkcja” (np. miód → cukry, funkcja energetyczna).
//
// zadanie.wiersze:  [{ id, nazwa, karta? }]  – związki,
// zadanie.kolumny:  [{ id, nazwa }]          – funkcje,
// zadanie.elementy: [{ tekst, wiersz, kolumna, karta?, wyjasnienie }].
// Komunikat o błędzie mówi, czy nie zgadza się związek, funkcja, czy jedno i drugie.

import { h, ikona } from '../core/dom.js';
import { rysunekKarty } from './rysunki.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';

export const kluczKomorki = (wiersz, kolumna) => `${wiersz}|${kolumna}`;

// Opis błędu umieszczenia elementu w komórce (wiersz, kolumna): 'wiersz', 'kolumna' albo 'oba'.
export function rodzajBledu(element, komorka) {
  const [w, k] = komorka.split('|');
  const zlyWiersz = element.wiersz !== w;
  const zlaKolumna = element.kolumna !== k;
  if (zlyWiersz && zlaKolumna) return 'oba';
  if (zlyWiersz) return 'wiersz';
  if (zlaKolumna) return 'kolumna';
  return null;
}

export function utworzSiatke(kontener, { zadanie, tryb = 'trening', onKoniec }) {
  const wiersze = new Map(zadanie.wiersze.map((w) => [w.id, w]));
  const kolumny = new Map(zadanie.kolumny.map((k) => [k.id, k]));
  const elementy = zadanie.elementy.map((el, i) => ({ ...el, id: `el-${i}` }));
  const elementPoId = new Map(elementy.map((el) => [el.id, el]));
  const cele = zadanie.wiersze.flatMap((w) => zadanie.kolumny.map((k) => kluczKomorki(w.id, k.id)));

  const listy = new Map();
  const komorki = [];
  const tabela = h('table', { class: 'siatka__tabela' }, [
    h('thead', {}, h('tr', {}, [h('th', { scope: 'col', class: 'siatka__rog' }, 'Związek / funkcja'), ...zadanie.kolumny.map((k) => h('th', { scope: 'col' }, k.nazwa))])),
    h(
      'tbody',
      {},
      zadanie.wiersze.map((w) =>
        h('tr', {}, [
          h('th', { scope: 'row' }, [w.karta ? rysunekKarty(w.karta, 'siatka__rysunek') : null, h('span', {}, w.nazwa)]),
          ...zadanie.kolumny.map((k) => {
            const klucz = kluczKomorki(w.id, k.id);
            const lista = h('ul', { class: 'siatka__lista' });
            listy.set(klucz, lista);
            const komorka = h('td', { class: 'siatka__komorka', 'data-cel': klucz, 'data-kolumna': k.nazwa, 'aria-label': `${w.nazwa}, funkcja ${k.nazwa}` }, lista);
            komorki.push(komorka);
            return komorka;
          }),
        ]),
      ),
    ),
  ]);
  const plansza = h('div', { class: 'siatka__plansza' }, tabela);

  const opisKomorki = (klucz) => {
    const [w, k] = klucz.split('|');
    return `${wiersze.get(w).nazwa}, funkcja ${kolumny.get(k).nazwa}`;
  };

  return utworzZadanieEtykiet(kontener, {
    klasa: 'siatka',
    tryb,
    plansza,
    etykiety: elementy.map((el) => ({ id: el.id, tekst: el.tekst, ikona: el.karta ? rysunekKarty(el.karta, 'etykieta__rysunek') : null })),
    celeDoStukania: komorki,
    def: {
      cele,
      etykiety: elementy.map((el) => el.id),
      pasuje: (e, c) => kluczKomorki(elementPoId.get(e).wiersz, elementPoId.get(e).kolumna) === c,
      pojemnosc: Infinity,
      klucze: 'etykieta',
    },
    pokazCel(cel, { etykiety: lezace, wynikiEtykiet }) {
      listy.get(cel).replaceChildren(
        ...lezace.map((e) => {
          const wynik = wynikiEtykiet.get(e.id) ?? (tryb === 'trening' ? 'dobrze' : 'wypelnione');
          return h(
            'li',
            {},
            h('button', { type: 'button', class: 'klasa__element', 'data-stan': wynik, 'data-zdejmij': tryb === 'sprawdzian' ? e.id : null }, [
              h('span', {}, e.tekst),
              wynik === 'dobrze' || wynik === 'zle' ? ikona(wynik, 'klasa__ikona') : null,
            ]),
          );
        }),
      );
    },
    komunikaty: {
      wstep: { rodzaj: 'info', tytul: 'Przeciągnij każdy przykład do właściwego związku i funkcji.', tekst: 'Możesz też stuknąć przykład, a potem kratkę w tabeli.' },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrany przykład: ${elementPoId.get(e).tekst}.`, tekst: 'Stuknij kratkę: wiersz to związek, kolumna to funkcja.' }),
      dobrze: (e, c) => ({ rodzaj: 'dobrze', tytul: `Tak: ${opisKomorki(c)}.`, tekst: elementPoId.get(e).wyjasnienie }),
      zle: (e, c) => {
        const el = elementPoId.get(e);
        const tytul = {
          wiersz: 'Funkcja się zgadza, ale to inny związek.',
          kolumna: 'Związek się zgadza, ale funkcja jest inna.',
          oba: 'Nie zgadza się ani związek, ani funkcja.',
        }[rodzajBledu(el, c)];
        return { komunikat: { rodzaj: 'zle', tytul, tekst: el.wyjasnienie }, podswietl: null };
      },
      sprawdzian: (w) => {
        const el = elementPoId.get(w.etykieta);
        return { rodzaj: 'zle', tytul: `${el.tekst}: ${opisKomorki(kluczKomorki(el.wiersz, el.kolumna))}.`, tekst: el.wyjasnienie };
      },
    },
    kartaKlucza: (e) => elementPoId.get(e).karta ?? wiersze.get(elementPoId.get(e).wiersz).karta ?? null,
    onKoniec,
  });
}

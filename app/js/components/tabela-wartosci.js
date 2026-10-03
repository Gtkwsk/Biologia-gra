// Zadanie „tabela porównawcza z wartościami” (SPEC.md, sekcja 5, typ 6, wariant z wyborem
// wartości): oddychanie tlenowe i fermentacja (TRESCI.md, sekcja 2.6).
// Dane tabeli: data/porownanie.js. Widok i przeciąganie: zadanie-etykiet.js.
//
// zadanie.cechy:       id cech (wierszy) w kolejności wyświetlania,
// zadanie.dystraktory: wartości, które nie pasują do żadnego pola: { tekst, wyjasnienie }.
// Każda wartość pasuje do dokładnie jednego pola; błędna wraca do banku z wyjaśnieniem,
// do czego pasuje (trening). Karty atlasu: procesy z nagłówków kolumn.

import { h, ikona, wyczysc } from '../core/dom.js';
import { rysunekKarty } from './rysunki.js';
import { zWielkiej } from './podpisywanie-logika.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';

export const kluczPola = (cecha, kolumna) => `${cecha}|${kolumna}`;

// Pola tabeli: [{ klucz, cecha, kolumna, tekst }] (tekst: wartość na etykiecie).
export function polaTabeli(zadanie, porownanie, katalog) {
  const kolumny = porownanie.kolumny.map((id) => katalog.get(id));
  const cechy = zadanie.cechy.map((id) => porownanie.cechy.find((c) => c.id === id));
  return {
    kolumny,
    cechy,
    pola: cechy.flatMap((c) => kolumny.map((k) => ({ klucz: kluczPola(c.id, k.id), cecha: c, kolumna: k, tekst: c.etykiety?.[k.id] ?? c.wartosci[k.id] }))),
  };
}

export function utworzTabeleWartosci(kontener, { zadanie, porownanie, katalog, tryb = 'trening', onKoniec }) {
  const { kolumny, cechy, pola } = polaTabeli(zadanie, porownanie, katalog);
  const polePoKluczu = new Map(pola.map((p) => [p.klucz, p]));
  const dystraktory = (zadanie.dystraktory ?? []).map((d, j) => ({ id: `dys-${j}`, ...d }));
  const etykiety = [...pola.map((p) => ({ id: p.klucz, tekst: p.tekst })), ...dystraktory.map((d) => ({ id: d.id, tekst: d.tekst }))];
  const tekstEtykiety = new Map(etykiety.map((e) => [e.id, e.tekst]));
  const wyjasnienieDystraktora = new Map(dystraktory.map((d) => [d.id, d.wyjasnienie]));

  const przyciski = new Map();
  const tabela = h('table', { class: 'porown__tabela' }, [
    h('thead', {}, h('tr', {}, [
      h('th', { scope: 'col', class: 'porown__rog' }, 'Cecha'),
      ...kolumny.map((k) => h('th', { scope: 'col' }, [rysunekKarty(k.id, 'porown__rysunek'), h('span', {}, k.nazwa)])),
    ])),
    h(
      'tbody',
      {},
      cechy.map((c) =>
        h('tr', {}, [
          h('th', { scope: 'row' }, c.cecha),
          ...kolumny.map((k) => {
            const klucz = kluczPola(c.id, k.id);
            const tekst = h('span', { class: 'pole-celu__tekst' });
            const stanIkona = h('span', { class: 'pole-celu__ikona' });
            const pole = h('button', { type: 'button', class: 'pole-celu porown__pole', 'data-cel': klucz, 'data-stan': 'puste', 'aria-label': `${k.nazwa}, ${c.cecha}: puste` }, [tekst, stanIkona]);
            przyciski.set(klucz, { pole, tekst, stanIkona });
            return h('td', { 'data-kolumna': k.nazwa }, pole);
          }),
        ]),
      ),
    ),
  ]);

  const opisPola = (p) => `${p.kolumna.nazwa}, ${p.cecha.cecha}`;
  const wyjasnienie = (e) => {
    if (wyjasnienieDystraktora.has(e)) return wyjasnienieDystraktora.get(e);
    const p = polePoKluczu.get(e);
    return `„${p.tekst}” pasuje do pola: ${opisPola(p)}. ${p.cecha.zdania[p.kolumna.id]}`;
  };

  return utworzZadanieEtykiet(kontener, {
    klasa: 'porown',
    tryb,
    plansza: h('div', { class: 'porown__plansza' }, tabela),
    etykiety,
    celeDoStukania: [...przyciski.values()].map((p) => p.pole),
    def: {
      cele: pola.map((p) => p.klucz),
      etykiety: etykiety.map((e) => e.id),
      pasuje: (e, c) => e === c,
      pojemnosc: 1,
      klucze: 'cel',
    },
    pokazCel(cel, { etykiety: lezace, stan }) {
      const { pole, tekst, stanIkona } = przyciski.get(cel);
      const p = polePoKluczu.get(cel);
      pole.dataset.stan = stan;
      tekst.textContent = lezace[0]?.tekst ?? '';
      wyczysc(stanIkona);
      if (stan === 'dobrze' || stan === 'zle') stanIkona.append(ikona(stan));
      pole.setAttribute('aria-label', `${opisPola(p)}: ${lezace[0]?.tekst ?? 'puste'}`);
    },
    komunikaty: {
      wstep: { rodzaj: 'info', tytul: 'Uzupełnij tabelę: przeciągnij każdą wartość do właściwego pola.', tekst: 'Możesz też stuknąć wartość, a potem pole.' },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrana wartość: „${tekstEtykiety.get(e)}”.`, tekst: 'Stuknij pole w tabeli.' }),
      dobrze: (e, c) => {
        const p = polePoKluczu.get(c);
        return { rodzaj: 'dobrze', tytul: `Tak: ${opisPola(p)}.`, tekst: p.cecha.zdania[p.kolumna.id] };
      },
      zle: (e, c, proba) => {
        const p = polePoKluczu.get(c);
        const tytul = `„${tekstEtykiety.get(e)}” nie pasuje do pola: ${opisPola(p)}.`;
        const tekst = proba >= 2 ? `${wyjasnienie(e)} Tu pasuje: „${p.tekst}”.` : wyjasnienie(e);
        return { komunikat: { rodzaj: 'zle', tytul, tekst }, podswietl: proba >= 2 ? c : null };
      },
      sprawdzian: (w) => {
        const p = polePoKluczu.get(w.cel);
        return { rodzaj: 'zle', tytul: `${zWielkiej(opisPola(p))}: „${p.tekst}”.`, tekst: p.cecha.zdania[p.kolumna.id] };
      },
    },
    kartaKlucza: (cel) => polePoKluczu.get(cel).kolumna.id,
    onKoniec,
  });
}

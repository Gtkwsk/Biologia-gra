// Zadanie „przyporządkowanie” (SPEC.md, sekcja 5, typ 3).
//
// zadanie.etykiety:
//   'nazwy' – na polach opisy (np. funkcje), na etykietach nazwy kart (np. elementy komórki);
//             dystraktory to id kart,
//   'opisy' – na polach nazwy kart z rysunkiem (np. kształty komórek), na etykietach opisy;
//             dystraktory to { tekst, wyjasnienie }.
// zadanie.wyjasnij: 'wyglad' – błędną etykietę-nazwę wyjaśnia wygląd elementu (opis karty),
//                   domyślnie jego funkcja (zdanie karty).
// Błąd: w pierwszej próbie komunikat wyjaśnia wybraną etykietę, w drugiej wskazuje poprawną.

import { h, ikona, wyczysc } from '../core/dom.js';
import { zWielkiej } from './podpisywanie-logika.js';
import { rysunekKarty } from './rysunki.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';

export function utworzPrzyporzadkowanie(kontener, { zadanie, katalog, tryb = 'trening', onKoniec }) {
  const tryNazw = (zadanie.etykiety ?? 'nazwy') === 'nazwy';
  const pary = zadanie.pary.map((p, i) => ({ ...p, cel: `para-${i}`, karta: katalog.get(p.karta) }));
  const paraCelu = new Map(pary.map((p) => [p.cel, p]));

  // Etykiety
  let etykiety;
  const wyjasnienieEtykiety = new Map();
  if (tryNazw) {
    const idKart = [...pary.map((p) => p.karta.id), ...(zadanie.dystraktory ?? [])];
    // W zadaniu o wyglądzie rysunek na etykiecie zdradzałby odpowiedź.
    const zRysunkiem = zadanie.wyjasnij !== 'wyglad';
    etykiety = idKart.map((id) => ({ id, tekst: katalog.get(id).nazwa, ikona: zRysunkiem ? rysunekKarty(id, 'etykieta__rysunek') : null }));
    const wyglad = (k) => `${zWielkiej(k.nazwa)} to ${k.opis}.`;
    for (const id of idKart) {
      const k = katalog.get(id);
      wyjasnienieEtykiety.set(id, zadanie.wyjasnij === 'wyglad' ? wyglad(k) : (k.zdanie ?? wyglad(k)));
    }
  } else {
    etykiety = [
      ...pary.map((p, i) => ({ id: `opis-${i}`, tekst: p.opis })),
      ...(zadanie.dystraktory ?? []).map((d, j) => ({ id: `dys-${j}`, tekst: d.tekst })),
    ];
    pary.forEach((p, i) => wyjasnienieEtykiety.set(`opis-${i}`, p.karta.zdanie));
    (zadanie.dystraktory ?? []).forEach((d, j) => wyjasnienieEtykiety.set(`dys-${j}`, d.wyjasnienie));
  }
  const tekstEtykiety = new Map(etykiety.map((e) => [e.id, e.tekst]));
  const poprawnaEtykieta = (cel) => (tryNazw ? paraCelu.get(cel).karta.id : `opis-${pary.indexOf(paraCelu.get(cel))}`);

  // Plansza
  const pola = new Map();
  const lista = h(
    'ul',
    { class: `przyp przyp--${tryNazw ? 'nazwy' : 'opisy'}` },
    pary.map((p) => {
      const tekst = h('span', { class: 'pole-celu__tekst' });
      const stanIkona = h('span', { class: 'pole-celu__ikona' });
      const pole = h('button', { type: 'button', class: 'pole-celu', 'data-cel': p.cel, 'data-stan': 'puste', 'aria-label': 'Puste miejsce' }, [tekst, stanIkona]);
      pola.set(p.cel, { pole, tekst, stanIkona });
      const opisCelu = tryNazw
        ? h('p', { class: 'przyp__opis' }, zWielkiej(p.opis))
        : h('div', { class: 'przyp__karta' }, [rysunekKarty(p.karta.id, 'przyp__rysunek'), h('span', { class: 'przyp__nazwa' }, p.karta.nazwa)]);
      return h('li', { class: 'przyp__para', 'data-para': p.cel }, [opisCelu, pole]);
    }),
  );

  return utworzZadanieEtykiet(kontener, {
    klasa: 'przyporzadkowanie',
    tryb,
    plansza: lista,
    etykiety,
    celeDoStukania: [...pola.values()].map((p) => p.pole),
    def: {
      cele: pary.map((p) => p.cel),
      etykiety: etykiety.map((e) => e.id),
      pasuje: (e, c) => poprawnaEtykieta(c) === e,
      pojemnosc: 1,
      klucze: 'cel',
    },
    pokazCel(cel, { etykiety: lezace, stan }) {
      const { pole, tekst, stanIkona } = pola.get(cel);
      pole.dataset.stan = stan;
      tekst.textContent = lezace[0]?.tekst ?? '';
      wyczysc(stanIkona);
      if (stan === 'dobrze' || stan === 'zle') stanIkona.append(ikona(stan));
      pole.setAttribute('aria-label', lezace[0] ? `Miejsce: ${lezace[0].tekst}` : 'Puste miejsce');
    },
    komunikaty: {
      wstep: {
        rodzaj: 'info',
        tytul: 'Przeciągnij każdą etykietę na pasujące miejsce.',
        tekst: 'Możesz też stuknąć etykietę, a potem miejsce.',
      },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrana etykieta: ${tekstEtykiety.get(e)}.`, tekst: 'Stuknij miejsce, do którego pasuje.' }),
      dobrze: (e, c) => ({
        rodzaj: 'dobrze',
        tytul: tryNazw ? `Tak, to ${tekstEtykiety.get(e)}.` : 'Tak, pasuje.',
        tekst: paraCelu.get(c).karta.zdanie,
      }),
      zle: (e, c, proba) => {
        const poprawna = poprawnaEtykieta(c);
        const tytul = tryNazw ? `To nie ${tekstEtykiety.get(e)}.` : 'To tu nie pasuje.';
        if (proba >= 2) {
          const wskazowka = tryNazw
            ? `Tu pasuje: ${tekstEtykiety.get(poprawna)}.`
            : `${paraCelu.get(c).karta.zdanie}`;
          return { komunikat: { rodzaj: 'zle', tytul, tekst: `${wyjasnienieEtykiety.get(e)} ${wskazowka}` }, podswietl: poprawna };
        }
        return { komunikat: { rodzaj: 'zle', tytul, tekst: wyjasnienieEtykiety.get(e) }, podswietl: null };
      },
      sprawdzian: (w) => {
        const p = paraCelu.get(w.cel);
        const poprawny = tekstEtykiety.get(poprawnaEtykieta(w.cel));
        const miejsce = tryNazw ? `„${zWielkiej(p.opis)}”` : p.karta.nazwa;
        return {
          rodzaj: 'zle',
          tytul: `${miejsce}: ${tryNazw ? poprawny : `„${poprawny}”`}.`,
          tekst: w.etykieta ? wyjasnienieEtykiety.get(w.etykieta) : 'To miejsce zostało puste.',
        };
      },
    },
    kartaKlucza: (cel) => paraCelu.get(cel).karta.id,
    onKoniec,
  });
}

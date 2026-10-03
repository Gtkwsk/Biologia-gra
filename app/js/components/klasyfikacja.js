// Zadanie „klasyfikacja” (SPEC.md, sekcja 5, typ 5): etykiety sortowane do grup.
//
// zadanie.kategorie: [{ id, nazwa, karta? }]
// zadanie.elementy:  [{ tekst, kategoria, karta?, wyjasnienie }]
// zadanie.obraz:     opcjonalny rysunek sceny nad grupami (id z obrazy.js)

import { h, ikona } from '../core/dom.js';
import { rysunekKarty } from './rysunki.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';

export function utworzKlasyfikacje(kontener, { zadanie, tryb = 'trening', onKoniec, obraz = null }) {
  const kategorie = new Map(zadanie.kategorie.map((k) => [k.id, k]));
  const elementy = zadanie.elementy.map((el, i) => ({ ...el, id: `el-${i}` }));
  const elementPoId = new Map(elementy.map((el) => [el.id, el]));

  const listy = new Map();
  const kolumny = zadanie.kategorie.map((k) => {
    const lista = h('ul', { class: 'klasa__lista' });
    listy.set(k.id, lista);
    const kolumna = h('section', { class: 'klasa', 'data-cel': k.id, 'aria-label': k.nazwa }, [
      h('h3', { class: 'klasa__nazwa' }, [k.karta ? rysunekKarty(k.karta, 'klasa__rysunek') : null, k.nazwa]),
      lista,
    ]);
    return kolumna;
  });
  const plansza = h('div', { class: 'klasyfikacja__plansza' }, [
    obraz ? h('figure', { class: 'klasyfikacja__obraz' }, obraz) : null,
    h('div', { class: 'klasy' }, kolumny),
  ]);

  return utworzZadanieEtykiet(kontener, {
    klasa: 'klasyfikacja',
    tryb,
    plansza,
    etykiety: elementy.map((el) => ({ id: el.id, tekst: el.tekst })),
    celeDoStukania: kolumny,
    def: {
      cele: zadanie.kategorie.map((k) => k.id),
      etykiety: elementy.map((el) => el.id),
      pasuje: (e, c) => elementPoId.get(e).kategoria === c,
      pojemnosc: Infinity,
      klucze: 'etykieta',
    },
    pokazCel(cel, { etykiety: lezace, wynikiEtykiet }) {
      const lista = listy.get(cel);
      lista.replaceChildren(
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
      wstep: { rodzaj: 'info', tytul: 'Przeciągnij każdą etykietę do właściwej grupy.', tekst: 'Możesz też stuknąć etykietę, a potem grupę.' },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrana etykieta: ${elementPoId.get(e).tekst}.`, tekst: 'Stuknij grupę, do której należy.' }),
      dobrze: (e, c) => ({ rodzaj: 'dobrze', tytul: `Tak: „${kategorie.get(c).nazwa}”.`, tekst: elementPoId.get(e).wyjasnienie ?? '' }),
      zle: (e, c) => ({
        komunikat: {
          rodzaj: 'zle',
          tytul: `„${elementPoId.get(e).tekst}” nie pasuje do grupy „${kategorie.get(c).nazwa}”.`,
          tekst: elementPoId.get(e).wyjasnienie ?? '',
        },
        podswietl: null,
      }),
      sprawdzian: (w) => {
        const el = elementPoId.get(w.etykieta);
        return { rodzaj: 'zle', tytul: `${el.tekst}: grupa „${kategorie.get(el.kategoria).nazwa}”.`, tekst: el.wyjasnienie ?? '' };
      },
    },
    kartaKlucza: (e) => elementPoId.get(e).karta ?? kategorie.get(elementPoId.get(e).kategoria).karta ?? null,
    onKoniec,
  });
}

// Mechanika „Skład ciała” (SPEC.md, sekcja 3.2, świat 1): gracz układa związki chemiczne od tego,
// którego w ciele człowieka jest najwięcej, do tego, którego jest najmniej. Po ułożeniu słupki
// rosną do wartości z podręcznika (TRESCI.md, sekcja 2.1; wartości orientacyjne, sekcja 5),
// a obok pojawia się porównanie z meduzą.
//
// zadanie.skladniki:   [{ id, nazwa, procent, karta? }] – kolejność dowolna; miejsce wynika z procentu,
// zadanie.porownanie:  opcjonalnie { nazwa, procent, karta?, opis } – słupek do porównania (np. woda u meduzy).

import { h, ikona } from '../core/dom.js';
import { rysunekKarty } from './rysunki.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';
import { zWielkiej } from './podpisywanie-logika.js';

// Miejsca od największego udziału do najmniejszego (1 = najwięcej).
export function miejsca(skladniki) {
  return [...skladniki].sort((a, b) => b.procent - a.procent).map((s, i) => ({ ...s, miejsce: i + 1 }));
}

export function utworzSlupki(kontener, { zadanie, tryb = 'trening', onKoniec }) {
  const ulozone = miejsca(zadanie.skladniki);
  const poId = new Map(ulozone.map((s) => [s.id, s]));
  const maks = Math.max(...ulozone.map((s) => s.procent), zadanie.porownanie?.procent ?? 0);
  const n = ulozone.length;

  const pola = new Map();
  const kolumny = ulozone.map((s) => {
    const cel = `miejsce-${s.miejsce}`;
    const tekst = h('span', { class: 'pole-celu__tekst' });
    const znak = h('span', { class: 'pole-celu__ikona' });
    const slupek = h('span', { class: 'slupki__slupek' });
    const wartosc = h('span', { class: 'slupki__wartosc' });
    // Najwyższy słupek zajmuje 80% wykresu: nad nim jest jeszcze miejsce na wartość.
    slupek.style.setProperty('--wysokosc', `${Math.max(2, Math.round((s.procent / maks) * 80))}%`);
    const pole = h('button', { type: 'button', class: 'pole-celu slupki__pole', 'data-cel': cel, 'data-stan': 'puste', 'aria-label': `Miejsce ${s.miejsce}: puste` }, [tekst, znak]);
    pola.set(cel, { pole, tekst, znak, wartosc });
    return h('li', { class: 'slupki__kolumna', 'data-miejsce': String(s.miejsce) }, [
      h('span', { class: 'slupki__miejsce' }, s.miejsce === 1 ? '1. najwięcej' : s.miejsce === n ? `${n}. najmniej` : `${s.miejsce}.`),
      h('span', { class: 'slupki__wykres' }, [wartosc, slupek]),
      pole,
    ]);
  });
  const porownanie = zadanie.porownanie
    ? (() => {
        const p = zadanie.porownanie;
        const slupek = h('span', { class: 'slupki__slupek slupki__slupek--porownanie' });
        slupek.style.setProperty('--wysokosc', `${Math.round((p.procent / maks) * 80)}%`);
        return h('aside', { class: 'slupki__porownanie', hidden: true }, [
          h('span', { class: 'slupki__wykres' }, [h('span', { class: 'slupki__wartosc' }, `do ${p.procent}%`), slupek]),
          h('p', {}, [p.karta ? rysunekKarty(p.karta, 'slupki__rysunek') : null, h('span', {}, p.opis)]),
        ]);
      })()
    : null;
  const notka = h('p', { class: 'slupki__notka', hidden: true }, 'Procent masy ciała człowieka. Wartości orientacyjne z podręcznika.');
  const plansza = h('div', { class: 'slupki__plansza' }, [h('ol', { class: 'slupki__lista' }, kolumny), notka, porownanie]);

  return utworzZadanieEtykiet(kontener, {
    klasa: 'slupki',
    tryb,
    plansza,
    etykiety: ulozone.map((s) => ({ id: s.id, tekst: s.nazwa, ikona: s.karta ? rysunekKarty(s.karta, 'etykieta__rysunek') : null })),
    celeDoStukania: [...pola.values()].map((p) => p.pole),
    def: {
      cele: ulozone.map((s) => `miejsce-${s.miejsce}`),
      etykiety: ulozone.map((s) => s.id),
      pasuje: (e, c) => `miejsce-${poId.get(e).miejsce}` === c,
      pojemnosc: 1,
      klucze: 'cel',
    },
    pokazCel(cel, { etykiety: lezace, stan }) {
      const { pole, tekst, znak } = pola.get(cel);
      pole.dataset.stan = stan;
      tekst.textContent = lezace[0]?.tekst ?? '';
      znak.replaceChildren(stan === 'dobrze' || stan === 'zle' ? ikona(stan) : '');
      pole.setAttribute('aria-label', `Miejsce ${cel.split('-')[1]}: ${lezace[0]?.tekst ?? 'puste'}`);
    },
    komunikaty: {
      wstep: { rodzaj: 'info', tytul: 'Ułóż związki: od tego, którego w ciele człowieka jest najwięcej, do tego, którego jest najmniej.', tekst: 'Przeciągnij etykiety na miejsca albo stuknij etykietę, a potem miejsce.' },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrany związek: ${poId.get(e).nazwa}.`, tekst: 'Stuknij miejsce w rankingu.' }),
      dobrze: (e) => ({ rodzaj: 'dobrze', tytul: `Tak: ${poId.get(e).nazwa}.`, tekst: `${zWielkiej(poId.get(e).nazwa)}: około ${poId.get(e).procent}% masy ciała człowieka.` }),
      zle: (e, c, proba) => {
        const s = poId.get(e);
        const miejsce = Number(c.split('-')[1]);
        const tekst = `To miejsce jest dla składnika, którego jest ${miejsce < s.miejsce ? 'więcej' : 'mniej'}.`;
        return {
          komunikat: { rodzaj: 'zle', tytul: `${zWielkiej(s.nazwa)}: nie to miejsce.`, tekst: proba >= 2 ? `${tekst} ${zWielkiej(s.nazwa)}: około ${s.procent}% masy ciała.` : tekst },
          podswietl: proba >= 2 ? `miejsce-${s.miejsce}` : null,
        };
      },
      sprawdzian: (w) => {
        const s = ulozone.find((x) => `miejsce-${x.miejsce}` === w.cel);
        return { rodzaj: 'zle', tytul: `Miejsce ${s.miejsce}: ${s.nazwa}.`, tekst: `${zWielkiej(s.nazwa)}: około ${s.procent}% masy ciała człowieka.` };
      },
    },
    kartaKlucza: (c) => ulozone.find((s) => `miejsce-${s.miejsce}` === c)?.karta ?? null,
    onKoniec: (wynik) => {
      for (const s of ulozone) pola.get(`miejsce-${s.miejsce}`).wartosc.textContent = `${s.procent}%`;
      plansza.classList.add('slupki__plansza--gotowa');
      notka.hidden = false;
      if (porownanie) porownanie.hidden = false;
      onKoniec?.(wynik);
    },
  });
}

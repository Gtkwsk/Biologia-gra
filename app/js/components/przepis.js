// Mechanika „przepis procesu” (SPEC.md, sekcja 3.2): przepis kuchenny (fotosynteza, świat 4),
// piekarnia drożdżowa (fermentacja alkoholowa) i lustro (fotosynteza i oddychanie tlenowe, świat 6).
// Logika: przepis-logika.js. Widok i przeciąganie: zadanie-etykiet.js.
//
// zadanie.procesy:     [id] albo [lewy, prawy] (lustro),
// zadanie.garnki:      [{ karta, podpis }] – rysunek „garnka” każdego procesu,
// zadanie.pola:        [{ id, substancja, strefa, podpis? }] (przepis-logika.js),
// zadanie.dopasowanie: 'pole' (domyślnie) albo 'strefa',
// zadanie.dystraktory: [{ karta, wyjasnienie }],
// zadanie.scena:       opcjonalna scena ożywiana dobrym polem (np. 'ciasto' rośnie, gdy na polu
//                      pojawi się dwutlenek węgla): { id, pole },
// zadanie.ciekawostka: opcjonalnie, dosłownie z TRESCI.md, sekcja 6.
// Po ułożeniu całego przepisu pojawia się zapis słowny procesu z TRESCI.md.

import { h, ikona, wyczysc } from '../core/dom.js';
import { rysunekKarty } from './rysunki.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';
import { scenaProcesu } from './sceny-procesow.js';
import * as P from './przepis-logika.js';

const NAGLOWKI = {
  wejscie: 'Składniki',
  wyjscie: 'Powstaje',
  'wejscie-lewe': 'Składnik',
  gora: 'Z lewej na prawą',
  dol: 'Z prawej na lewą',
  'wyjscie-prawe': 'Powstaje',
};

export function utworzPrzepis(kontener, { zadanie, dane, tryb = 'trening', onKoniec }) {
  const procesy = zadanie.procesy.map((id) => dane.procesy.find((p) => p.id === id));
  const lustro = procesy.length === 2;
  const katalog = dane.katalog;
  const nazwa = (id) => katalog.get(id).nazwa;
  const pola = zadanie.pola;
  const polePoId = new Map(pola.map((p) => [p.id, p]));
  const dystraktory = new Map((zadanie.dystraktory ?? []).map((d) => [d.karta, d]));
  const dopasowanie = zadanie.dopasowanie ?? 'pole';
  const scena = zadanie.scena ? scenaProcesu(zadanie.scena.id) : null;
  let scenaOzywiona = false;

  // Etykiety: substancje z pól (bez powtórzeń) i dystraktory.
  const idEtykiet = [...new Set(pola.map((p) => p.substancja)), ...dystraktory.keys()];
  const etykiety = idEtykiet.map((id) => ({ id, tekst: nazwa(id), ikona: rysunekKarty(id, 'etykieta__rysunek') }));

  const przyciski = new Map();
  const polePrzepisu = (p) => {
    const tekst = h('span', { class: 'pole-celu__tekst' });
    const stanIkona = h('span', { class: 'pole-celu__ikona' });
    const pole = h('button', { type: 'button', class: 'pole-celu przepis__pole', 'data-cel': p.id, 'data-stan': 'puste', 'aria-label': `${p.podpis ?? NAGLOWKI[p.strefa]}: puste` }, [tekst, stanIkona]);
    przyciski.set(p.id, { pole, tekst, stanIkona });
    return h('li', { class: 'przepis__miejsce', 'data-strefa': p.strefa }, [
      h('span', { class: 'przepis__strzalka', 'aria-hidden': 'true' }),
      pole,
      p.podpis ? h('span', { class: 'przepis__podpis' }, p.podpis) : null,
    ]);
  };
  const strefa = (nazwaStrefy) => {
    const lista = pola.filter((p) => p.strefa === nazwaStrefy);
    if (!lista.length) return null;
    return h('section', { class: `przepis__strefa przepis__strefa--${nazwaStrefy}`, 'aria-label': NAGLOWKI[nazwaStrefy] }, [
      lustro ? null : h('h3', { class: 'przepis__naglowek' }, NAGLOWKI[nazwaStrefy]),
      h('ul', { class: 'przepis__pola' }, lista.map(polePrzepisu)),
    ]);
  };
  const garnek = (g) =>
    h('figure', { class: 'przepis__garnek' }, [h('span', { class: 'przepis__naczynie' }, rysunekKarty(g.karta, 'przepis__rysunek')), h('figcaption', {}, g.podpis)]);

  const zapis = h('div', { class: 'przepis__zapis', hidden: true });
  const plansza = lustro
    ? h('div', { class: 'przepis__plansza przepis__plansza--lustro' }, [
        h('div', { class: 'przepis__kolumna' }, [strefa('wejscie-lewe'), garnek(zadanie.garnki[0])]),
        h('div', { class: 'przepis__srodek' }, [strefa('gora'), strefa('dol')]),
        h('div', { class: 'przepis__kolumna' }, [strefa('wyjscie-prawe'), garnek(zadanie.garnki[1])]),
      ])
    : h('div', { class: 'przepis__plansza' }, [strefa('wejscie'), garnek(zadanie.garnki[0]), strefa('wyjscie')]);

  const caloscPlanszy = h('div', { class: 'przepis__calosc' }, [
    plansza,
    scena ? h('figure', { class: 'przepis__scena' }, scena.el) : null,
    zapis,
    zadanie.ciekawostka
      ? h('aside', { class: 'ciekawostka' }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, zadanie.ciekawostka)])
      : null,
  ]);

  const opisPola = (p) => p.podpis ?? NAGLOWKI[p.strefa];
  const wyjasnienieEtykiety = (e, p) => P.powodBledu(p, e, procesy, dystraktory.get(e) ?? null);
  const zdanieEtykiety = (e) => procesy.map((pr) => pr.opisy?.[e]).filter(Boolean).join(' ') || katalog.get(e).zdanie;

  return utworzZadanieEtykiet(kontener, {
    klasa: `przepis${lustro ? ' przepis--lustro' : ''}`,
    tryb,
    plansza: caloscPlanszy,
    etykiety,
    celeDoStukania: [...przyciski.values()].map((p) => p.pole),
    def: {
      cele: pola.map((p) => p.id),
      etykiety: idEtykiet,
      pasuje: (e, c) => !dystraktory.has(e) && P.pasuje(polePoId.get(c), e, procesy, dopasowanie),
      pojemnosc: 1,
      klucze: 'cel',
    },
    pokazCel(cel, { etykiety: lezace, stan }) {
      const { pole, tekst, stanIkona } = przyciski.get(cel);
      const p = polePoId.get(cel);
      pole.dataset.stan = stan;
      tekst.textContent = lezace[0]?.tekst ?? '';
      wyczysc(stanIkona);
      if (stan === 'dobrze' || stan === 'zle') stanIkona.append(ikona(stan));
      pole.setAttribute('aria-label', `${opisPola(p)}: ${lezace[0]?.tekst ?? 'puste'}`);
      if (scena && !scenaOzywiona && cel === zadanie.scena.pole && stan === 'dobrze') {
        scenaOzywiona = true;
        scena.pokaz('wyrasta');
      }
    },
    komunikaty: {
      wstep: {
        rodzaj: 'info',
        tytul: lustro ? 'Ułóż oba przepisy na strzałkach między procesami.' : 'Ułóż przepis: przeciągnij składniki i produkty na pola.',
        tekst: 'Możesz też stuknąć etykietę, a potem pole.',
      },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrana etykieta: ${nazwa(e)}.`, tekst: 'Stuknij pole w przepisie.' }),
      dobrze: (e) => ({ rodzaj: 'dobrze', tytul: `Tak: ${nazwa(e)}.`, tekst: zdanieEtykiety(e) }),
      zle: (e, c, proba) => {
        const p = polePoId.get(c);
        const tytul = `${nazwa(e).charAt(0).toUpperCase()}${nazwa(e).slice(1)}: nie to pole.`;
        if (proba >= 2) {
          const poprawna = dopasowanie === 'pole' ? p.substancja : null;
          const wskazowka = poprawna ? ` Tu pasuje: ${nazwa(poprawna)}.` : '';
          return { komunikat: { rodzaj: 'zle', tytul, tekst: `${wyjasnienieEtykiety(e, p)}${wskazowka}` }, podswietl: poprawna };
        }
        return { komunikat: { rodzaj: 'zle', tytul, tekst: wyjasnienieEtykiety(e, p) }, podswietl: null };
      },
      sprawdzian: (w) => {
        const p = polePoId.get(w.cel);
        return {
          rodzaj: 'zle',
          tytul: `${opisPola(p)}: ${nazwa(p.substancja)}.`,
          tekst: w.etykieta ? wyjasnienieEtykiety(w.etykieta, p) : 'To pole zostało puste.',
        };
      },
    },
    kartaKlucza: (cel) => polePoId.get(cel).substancja,
    onKoniec: (wynik) => {
      zapis.replaceChildren(
        h('p', { class: 'przepis__zapis-tytul' }, lustro ? 'Dwa przepisy jak odbicia w lustrze:' : 'Przepis gotowy:'),
        ...procesy.map((pr) => h('p', { class: 'przepis__rownanie' }, [h('strong', {}, `${pr.nazwa.charAt(0).toUpperCase()}${pr.nazwa.slice(1)}: `), pr.zapis])),
      );
      zapis.hidden = false;
      plansza.classList.add('przepis__plansza--gotowa');
      onKoniec?.(wynik);
    },
  });
}

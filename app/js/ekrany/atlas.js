// Atlas kart (SPEC.md, sekcja 4.2): elementy komórek, typy komórek, kształty komórek, pojęcia,
// procesy, substancje i organizmy.
// Poziom karty wynika z wyników zadań (core/karty.js). Złota karta odsłania ciekawostkę.

import { h, ikona } from '../core/dom.js';
import { poziomKarty, NAZWY_POZIOMOW } from '../core/karty.js';
import { rysunekKarty } from '../components/rysunki.js';
import { zWielkiej } from '../components/podpisywanie-logika.js';
import { pasek } from './wspolne.js';

const GRUPY = [
  { rodzaj: 'pierwiastek', nazwa: 'Pierwiastki' },
  { rodzaj: 'zwiazek', nazwa: 'Związki chemiczne' },
  { rodzaj: 'element', nazwa: 'Elementy komórki' },
  { rodzaj: 'typ', nazwa: 'Rodzaje komórek' },
  { rodzaj: 'ksztalt', nazwa: 'Kształty komórek' },
  { rodzaj: 'proces', nazwa: 'Procesy' },
  { rodzaj: 'substancja', nazwa: 'Substancje' },
  { rodzaj: 'sposob', nazwa: 'Sposoby zdobywania pokarmu' },
  { rodzaj: 'pojecie', nazwa: 'Pojęcia' },
  { rodzaj: 'organizm', nazwa: 'Organizmy' },
];

const OPIS_POZIOMU = {
  nieodkryta: 'Karta czeka na odkrycie: wystarczy jedna poprawna odpowiedź.',
  brazowa: 'Karta odkryta. Srebrna będzie po odpowiedzi od razu dobrej w dwóch różnych rodzajach zadań.',
  srebrna: 'Od razu dobrze w dwóch rodzajach zadań. Złota będzie po odpowiedzi od razu dobrej u bossa.',
  zlota: 'Od razu dobrze u bossa, czyli w warunkach sprawdzianu.',
};

const LEGENDA = {
  brazowa: 'karta odkryta, czyli co najmniej jedna poprawna odpowiedź',
  srebrna: 'od razu dobrze w dwóch różnych rodzajach zadań',
  zlota: 'od razu dobrze u bossa; odsłania ciekawostkę',
};

export function render(kontener, ctx) {
  const karty = [...ctx.dane.katalog.values()];
  const poziom = (id) => poziomKarty(ctx.stan.karty[id]);
  const ile = (p) => karty.filter((k) => poziom(k.id) === p).length;
  const odkryte = karty.length - ile('nieodkryta');

  const dialog = h('dialog', { class: 'karta-szczegoly', 'aria-labelledby': 'karta-szczegoly-tytul' });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  const swiaty = [...new Set(karty.map((k) => k.swiat))].sort((a, b) => a - b);
  const sekcje = swiaty.map((idSwiata) => {
    const sw = ctx.dane.swiaty.find((s) => s.id === idSwiata);
    return h('section', { class: 'atlas__swiat', 'data-swiat': idSwiata }, [
      h('h2', { class: 'atlas__swiat-tytul' }, `Świat ${idSwiata}: ${sw?.tytul ?? ''}`),
      ...GRUPY.map((g) => {
        const lista = karty.filter((k) => k.swiat === idSwiata && k.rodzaj === g.rodzaj);
        if (!lista.length) return null;
        return h('div', { class: 'atlas__grupa' }, [
          h('h3', { class: 'atlas__grupa-tytul' }, g.nazwa),
          h('ul', { class: 'atlas__karty' }, lista.map((k) => h('li', {}, kafelek(k)))),
        ]);
      }),
    ]);
  });

  kontener.append(
    h('div', { class: 'ekran ekran--atlas' }, [
      pasek({ wstecz: { tekst: 'Baza', href: '#/baza' } }),
      h('h1', {}, 'Atlas'),
      h('p', { class: 'atlas__podsumowanie' }, `Odkryte karty: ${odkryte} z ${karty.length}. Srebrne: ${ile('srebrna')}. Złote: ${ile('zlota')}.`),
      h(
        'ul',
        { class: 'atlas__legenda', 'aria-label': 'Poziomy kart' },
        ['brazowa', 'srebrna', 'zlota'].map((p) =>
          h('li', { 'data-poziom': p }, [h('span', { class: 'atlas__probka', 'aria-hidden': 'true' }), h('span', {}, [h('strong', {}, zWielkiej(NAZWY_POZIOMOW[p])), `: ${LEGENDA[p]}.`])]),
        ),
      ),
      ...sekcje,
      dialog,
    ]),
  );
  return {
    zniszcz() {
      if (dialog.open) dialog.close();
    },
  };

  function kafelek(k) {
    const p = poziom(k.id);
    const odkryta = p !== 'nieodkryta';
    return h(
      'button',
      {
        type: 'button',
        class: 'karta-atlasu',
        'data-poziom': p,
        'data-karta': k.id,
        'aria-label': odkryta ? `${k.nazwa}, karta ${NAZWY_POZIOMOW[p]}` : 'Karta nieodkryta',
        onclick: () => pokaz(k),
      },
      [
        h('span', { class: 'karta-atlasu__rysunek' }, rysunekKarty(k.id, 'karta-atlasu__svg')),
        h('span', { class: 'karta-atlasu__nazwa' }, odkryta ? k.nazwa : '?'),
        h('span', { class: 'karta-atlasu__poziom' }, NAZWY_POZIOMOW[p]),
      ],
    );
  }

  function pokaz(k) {
    const p = poziom(k.id);
    const odkryta = p !== 'nieodkryta';
    dialog.replaceChildren(
      h('div', { class: 'karta-szczegoly__karta', 'data-poziom': p }, [
        h('span', { class: 'karta-szczegoly__rysunek' }, rysunekKarty(k.id, 'karta-szczegoly__svg')),
        h('p', { class: 'karta-szczegoly__poziom' }, `Karta ${NAZWY_POZIOMOW[p]}`),
        h('h2', { id: 'karta-szczegoly-tytul' }, odkryta ? zWielkiej(k.nazwa) : 'Karta nieodkryta'),
        odkryta ? h('p', {}, `${zWielkiej(k.opis)}.`) : null,
        odkryta && k.zdanie ? h('p', {}, k.zdanie) : null,
        // Dopisek przy uproszczeniu podręcznika (TRESCI.md, sekcja 5): tylko w atlasie.
        odkryta && k.uwaga ? h('p', { class: 'karta-szczegoly__uwaga' }, k.uwaga) : null,
        h('p', { class: 'karta-szczegoly__zasada' }, OPIS_POZIOMU[p]),
        p === 'zlota' && k.ciekawostka
          ? h('aside', { class: 'ciekawostka' }, [h('h3', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, k.ciekawostka)])
          : null,
        p !== 'zlota' && odkryta && k.ciekawostka ? h('p', { class: 'karta-szczegoly__zagadka' }, [ikona('klodka'), ' Złota karta odsłoni ciekawostkę.']) : null,
        h('button', { type: 'button', class: 'przycisk', onclick: () => dialog.close() }, 'Zamknij'),
      ]),
    );
    dialog.showModal();
  }
}

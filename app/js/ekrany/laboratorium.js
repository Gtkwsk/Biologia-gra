// Domowe laboratorium (SPEC.md, sekcja 4.5): doświadczenia z dorosłym, zaliczane przyciskiem
// „Zrobione z dorosłym”. Dane: data/laboratorium.js. Każde doświadczenie ma uwagę
// o bezpieczeństwie przed krokami; wyjaśnienie według TRESCI.md, ciekawostka dosłownie z sekcji 6.

import { h, dolacz, ikona } from '../core/dom.js';
import { oznaczDoswiadczenie } from '../core/stan.js';
import { dzisiaj, dataSlownie } from '../core/daty.js';
import { graj } from '../core/dzwieki.js';
import { rysunekKarty } from '../components/rysunki.js';
import { pasek } from './wspolne.js';

export function render(kontener, ctx) {
  const { laboratorium, swiaty } = ctx.dane;
  const ekran = h('div', { class: 'ekran ekran--laboratorium' });
  kontener.append(ekran);
  const otwarte = new Set();
  rysuj();
  return null;

  function rysuj() {
    const zrobione = laboratorium.filter((d) => ctx.stan.laboratorium[d.id]).length;
    ekran.replaceChildren();
    dolacz(ekran, [
      pasek({ wstecz: { tekst: 'Baza', href: '#/baza' } }),
      h('h1', {}, 'Domowe laboratorium'),
      h('p', { class: 'lab-dom__wstep' }, 'Doświadczenia do zrobienia w domu razem z dorosłym. Przed doświadczeniem dorosły czyta całą instrukcję. Po doświadczeniu stuknij „Zrobione z dorosłym”.'),
      h('p', { class: 'lab-dom__licznik' }, `Zrobione: ${zrobione} z ${laboratorium.length}.`),
      h('ul', { class: 'lab-dom__lista' }, laboratorium.map(doswiadczenie)),
    ]);
  }

  function doswiadczenie(d) {
    const kiedy = ctx.stan.laboratorium[d.id];
    const sw = swiaty.find((s) => s.id === d.swiat);
    const szczegoly = h(
      'details',
      {
        class: 'lab-dom__doswiadczenie',
        'data-doswiadczenie': d.id,
        'data-zrobione': String(Boolean(kiedy)),
        open: otwarte.has(d.id),
        ontoggle: (e) => (e.currentTarget.open ? otwarte.add(d.id) : otwarte.delete(d.id)),
      },
      [
        h('summary', { class: 'lab-dom__naglowek' }, [
          rysunekKarty(d.karta, 'lab-dom__rysunek'),
          h('span', { class: 'lab-dom__tytul' }, [
            h('span', { class: 'lab-dom__nazwa' }, d.nazwa),
            h('span', { class: 'lab-dom__swiat' }, [`Świat ${sw?.id}: ${sw?.tytul ?? ''}`, d.wymaga === 'mikroskop' ? ' · potrzebny mikroskop' : '']),
          ]),
          kiedy ? h('span', { class: 'lab-dom__pieczatka' }, [ikona('dobrze'), ' Zrobione']) : null,
        ]),
        h('div', { class: 'lab-dom__tresc' }, [
          h('p', { class: 'lab-dom__bezpieczenstwo' }, [h('strong', {}, 'Bezpieczeństwo: '), d.bezpieczenstwo]),
          h('h3', {}, 'Potrzebne'),
          h('ul', {}, d.potrzebne.map((p) => h('li', {}, p))),
          h('h3', {}, 'Kroki'),
          h('ol', {}, d.kroki.map((k) => h('li', {}, k))),
          h('h3', {}, 'Co zauważysz'),
          h('p', {}, d.obserwacja),
          h('h3', {}, 'Wyjaśnienie'),
          h('p', {}, d.wyjasnienie),
          d.ciekawostka ? h('aside', { class: 'ciekawostka' }, [h('h4', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, d.ciekawostka)]) : null,
          kiedy
            ? h('div', { class: 'przyciski' }, [
                h('p', { class: 'lab-dom__data' }, `Zrobione ${dataSlownie(kiedy)}.`),
                h('button', { type: 'button', class: 'przycisk przycisk--maly przycisk--jasny', onclick: () => oznacz(d, false) }, 'Cofnij oznaczenie'),
              ])
            : h('div', { class: 'przyciski' }, h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: () => oznacz(d, true) }, 'Zrobione z dorosłym')),
        ]),
      ],
    );
    return h('li', {}, szczegoly);
  }

  function oznacz(d, zrobione) {
    ctx.zmien((stan) => oznaczDoswiadczenie(stan, d.id, dzisiaj(), zrobione));
    if (zrobione) graj('koniec');
    otwarte.add(d.id);
    rysuj();
    ekran.querySelector(`[data-doswiadczenie="${d.id}"] summary`)?.focus();
  }
}

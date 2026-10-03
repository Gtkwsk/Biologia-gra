// Baza wyprawy: atlas, mikroskop, domowe laboratorium (SPEC.md, sekcja 3.1).
// W etapie 0 stanowiska są w budowie.

import { h } from '../core/dom.js';
import { pasek } from './wspolne.js';

const STANOWISKA = [
  {
    id: 'atlas',
    nazwa: 'Atlas',
    opis: 'Karty odkrytych elementów komórek, organizmów i procesów. Karta zmienia kolor, gdy ją opanujesz.',
  },
  {
    id: 'mikroskop',
    nazwa: 'Mikroskop',
    opis: 'Teraz: lupa. Pokonani bossowie światów 2 i 3 ulepszą go do większych powiększeń.',
  },
  {
    id: 'laboratorium',
    nazwa: 'Domowe laboratorium',
    opis: 'Doświadczenia do zrobienia w domu razem z dorosłym.',
  },
];

export function render(kontener) {
  kontener.append(
    h('div', { class: 'ekran ekran--baza' }, [
      pasek({ wstecz: { tekst: 'Mapa', href: '#/' } }),
      h('h1', { class: 'baza__tytul' }, 'Baza'),
      h('p', { class: 'baza__wstep' }, 'Tu rośnie twoje laboratorium. Nowe stanowiska otwierają się razem z kolejnymi światami.'),
      h(
        'ul',
        { class: 'baza__stanowiska' },
        STANOWISKA.map((st) =>
          h('li', { class: 'stanowisko', 'data-stanowisko': st.id }, [
            h('span', { class: 'stanowisko__znak', 'aria-hidden': 'true' }),
            h('h2', { class: 'stanowisko__nazwa' }, st.nazwa),
            h('p', { class: 'stanowisko__opis' }, st.opis),
            h('span', { class: 'stanowisko__stan' }, 'W budowie'),
          ]),
        ),
      ),
    ]),
  );
  return null;
}

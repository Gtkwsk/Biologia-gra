// Baza wyprawy: atlas, mikroskop, domowe laboratorium (SPEC.md, sekcja 3.1).
// Stanowiska pokazują postęp: liczbę odkrytych kart i poziom mikroskopu.

import { h, ikona } from '../core/dom.js';
import { poziomKarty } from '../core/karty.js';
import { POZIOMY_MIKROSKOPU, poziomMikroskopu } from '../core/boss.js';
import { pasek } from './wspolne.js';

export function render(kontener, ctx) {
  const karty = [...ctx.dane.katalog.keys()];
  const poziomy = karty.map((id) => poziomKarty(ctx.stan.karty[id]));
  const odkryte = poziomy.filter((p) => p !== 'nieodkryta').length;
  const zlote = poziomy.filter((p) => p === 'zlota').length;
  const mikroskop = POZIOMY_MIKROSKOPU[poziomMikroskopu(ctx.stan)];
  const pokonani = ctx.dane.swiaty.filter((s) => s.boss && ctx.stan.bossowie.includes(s.id));

  const stanowiska = [
    {
      id: 'atlas',
      nazwa: 'Atlas',
      opis: 'Karty elementów komórek, procesów, substancji, pojęć i organizmów. Karta zmienia kolor, gdy ją opanujesz.',
      stan: `Odkryte: ${odkryte} z ${karty.length}. Złote: ${zlote}.`,
      href: '#/atlas',
    },
    {
      id: 'mikroskop',
      nazwa: 'Mikroskop',
      opis: 'Preparaty pod lupą i mikroskopem. Pokonani bossowie światów 2 i 3 ulepszają powiększenie.',
      stan: mikroskop.powiekszenie ? `${mikroskop.nazwa}: ${mikroskop.powiekszenie}.` : `${mikroskop.nazwa}.`,
      href: '#/mikroskop',
    },
    {
      id: 'laboratorium',
      nazwa: 'Domowe laboratorium',
      opis: 'Doświadczenia do zrobienia w domu razem z dorosłym.',
      stan: 'W budowie',
      href: null,
    },
  ];

  kontener.append(
    h('div', { class: 'ekran ekran--baza' }, [
      pasek({ wstecz: { tekst: 'Mapa', href: '#/' } }),
      h('h1', { class: 'baza__tytul' }, 'Baza'),
      h('p', { class: 'baza__wstep' }, 'Tu rośnie twoje laboratorium. Nowe stanowiska i ulepszenia przybywają razem z opanowaną wiedzą.'),
      h(
        'ul',
        { class: 'baza__stanowiska' },
        stanowiska.map((st) => {
          const tresc = [
            h('span', { class: 'stanowisko__znak', 'aria-hidden': 'true' }),
            h('h2', { class: 'stanowisko__nazwa' }, st.nazwa),
            h('p', { class: 'stanowisko__opis' }, st.opis),
            h('span', { class: 'stanowisko__stan', 'data-aktywne': String(Boolean(st.href)) }, st.stan),
          ];
          return h(
            'li',
            { class: 'stanowisko', 'data-stanowisko': st.id },
            st.href ? h('a', { class: 'stanowisko__link', href: st.href }, tresc) : tresc,
          );
        }),
      ),
      h('section', { class: 'trofea', 'aria-labelledby': 'trofea-naglowek' }, [
        h('h2', { id: 'trofea-naglowek' }, 'Trofea'),
        pokonani.length
          ? h(
              'ul',
              { class: 'trofea__lista' },
              pokonani.map((s) => h('li', { class: 'trofeum', 'data-swiat': s.id }, [h('span', { class: 'trofeum__znak' }, ikona('dobrze')), h('span', {}, [h('strong', {}, s.boss.nazwa), ` pokonany: ${s.tytul}`])])),
            )
          : h('p', {}, 'Trofea przybywają za pokonanych bossów światów.'),
      ]),
    ]),
  );
  return null;
}

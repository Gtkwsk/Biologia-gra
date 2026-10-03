// Pole informacji zwrotnej wspólne dla zadań (SPEC.md, sekcja 6.4: poprawna odpowiedź
// i zdanie przyczynowe). Rodzaje: 'info', 'dobrze', 'zle'.
// Komunikat: { rodzaj, tytul, tekst?, dodatek? } – dodatek to element DOM pod tekstem (np. lupy).

import { h, ikona, wyczysc } from '../core/dom.js';
import { graj } from '../core/dzwieki.js';
import { iskry } from '../core/efekty.js';

function tresc(k) {
  return h('div', { class: 'komunikat__tresc' }, [
    h('p', { class: 'komunikat__tytul' }, k.tytul),
    k.tekst ? h('p', { class: 'komunikat__tekst' }, k.tekst) : null,
    k.dodatek ?? null,
  ]);
}

export function utworzKomunikat() {
  const el = h('div', { class: 'komunikat', role: 'status', 'aria-live': 'polite' });
  return {
    el,
    pokaz(k) {
      if (k.rodzaj === 'dobrze' || k.rodzaj === 'zle') graj(k.rodzaj);
      wyczysc(el);
      el.dataset.rodzaj = k.rodzaj;
      el.append(ikona(k.rodzaj, 'komunikat__ikona'), tresc(k));
      el.classList.remove('komunikat--nowy');
      void el.offsetWidth;
      el.classList.add('komunikat--nowy');
      if (k.rodzaj === 'dobrze') iskry(el.querySelector('.komunikat__ikona'), { ile: 7 });
    },
    pokazListe(lista) {
      wyczysc(el);
      el.dataset.rodzaj = lista.some((k) => k.rodzaj === 'zle') ? 'zle' : 'dobrze';
      graj(el.dataset.rodzaj);
      el.append(
        h(
          'ul',
          { class: 'komunikat__lista' },
          lista.map((k) => h('li', { 'data-rodzaj': k.rodzaj }, [ikona(k.rodzaj, 'komunikat__ikona'), tresc(k)])),
        ),
      );
      if (el.dataset.rodzaj === 'dobrze') iskry(el.querySelector('.komunikat__ikona'), { ile: 14, zasieg: 1.4 });
    },
  };
}

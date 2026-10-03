// Odkrycie kart (SPEC.md, sekcja 12, etap 6): po zadaniu, które odkryło nową kartę atlasu albo
// podniosło jej poziom, karty wlatują na środek ekranu, jedna po drugiej. Złota karta ma połysk.
// Okno zamyka przycisk albo stuknięcie poza nim; nie zmienia wyniku zadania.

import { h } from '../core/dom.js';
import { graj } from '../core/dzwieki.js';
import { iskry } from '../core/efekty.js';
import { NAZWY_POZIOMOW } from '../core/karty.js';
import { rysunekKarty } from './rysunki.js';

const MAKS_KART = 12;

// Nagłówek okna (funkcja czysta, do testów). awanse: [{ karta, z, na }].
export function tytulOdkrycia(awanse) {
  const n = awanse.length;
  if (awanse.some((a) => a.na === 'zlota')) return n === 1 ? 'Złota karta!' : 'Złote karty!';
  if (awanse.every((a) => a.z === 'nieodkryta')) return n === 1 ? 'Nowa karta w atlasie!' : `Nowe karty w atlasie: ${n}`;
  return n === 1 ? 'Karta awansowała!' : 'Karty awansowały!';
}

export function opisAwansu(a) {
  return a.z === 'nieodkryta' ? 'nowa karta' : `${NAZWY_POZIOMOW[a.z]} → ${NAZWY_POZIOMOW[a.na]}`;
}

export function pokazOdkrycie(awanse, katalog, { onZamknij } = {}) {
  if (!awanse.length) return null;
  const zlota = awanse.some((a) => a.na === 'zlota');
  const pokazane = awanse.slice(0, MAKS_KART);
  const karta = (a, i) => {
    const k = katalog.get(a.karta);
    const el = h('li', { class: 'odkrycie__karta', 'data-poziom': a.na, 'data-karta': a.karta }, [
      rysunekKarty(a.karta, 'odkrycie__rysunek'),
      h('span', { class: 'odkrycie__nazwa' }, k?.nazwa ?? a.karta),
      h('span', { class: 'odkrycie__poziom' }, opisAwansu(a)),
    ]);
    el.style.setProperty('--i', String(i));
    return el;
  };
  const przycisk = h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: () => dialog.close() }, 'Super!');
  const tytul = h('h2', { id: 'odkrycie-tytul', class: 'odkrycie__tytul', 'data-zlota': String(zlota) }, tytulOdkrycia(awanse));
  const dialog = h('dialog', { class: 'odkrycie', 'aria-labelledby': 'odkrycie-tytul' }, [
    h('div', { class: 'odkrycie__tresc' }, [
      tytul,
      h('ul', { class: 'odkrycie__karty' }, pokazane.map(karta)),
      awanse.length > MAKS_KART ? h('p', { class: 'odkrycie__reszta' }, `i jeszcze ${awanse.length - MAKS_KART}`) : null,
      przycisk,
    ]),
  ]);
  dialog.addEventListener('close', () => {
    dialog.remove();
    onZamknij?.();
  });
  // Stuknięcie w tło (poza treścią) zamyka okno.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.body.append(dialog);
  dialog.showModal();
  przycisk.focus({ preventScroll: true });
  graj('karta');
  setTimeout(() => iskry(tytul, { ile: zlota ? 18 : 10, zasieg: 1.6 }), 250);
  return dialog;
}

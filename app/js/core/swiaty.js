// Dostępność światów i opanowanie. Funkcje czyste.
//
// Świat jest otwarty, gdy jest gotowy i:
// - jest pierwszym gotowym światem w kolejności albo
// - boss poprzedniego gotowego świata jest pokonany albo
// - został otwarty wcześniej (raz otwarty świat zostaje otwarty) albo
// - w panelu rodzica włączono odblokowanie wszystkich światów.

import { PROG_OPANOWANIA } from './stan.js';

function gotoweWKolejnosci(swiaty) {
  return swiaty.filter((s) => s.gotowy).sort((a, b) => a.id - b.id);
}

export function otwartePrzezReguly(swiaty, stan) {
  const gotowe = gotoweWKolejnosci(swiaty);
  const wynik = new Set();
  gotowe.forEach((s, i) => {
    if (i === 0 || stan.bossowie.includes(gotowe[i - 1].id)) wynik.add(s.id);
  });
  return wynik;
}

export function otwarteSwiaty(swiaty, stan) {
  const gotowe = new Set(gotoweWKolejnosci(swiaty).map((s) => s.id));
  const wynik = new Set([...stan.odblokowane, ...otwartePrzezReguly(swiaty, stan)]);
  if (stan.ustawienia.odblokujWszystkie) for (const id of gotowe) wynik.add(id);
  return new Set([...wynik].filter((id) => gotowe.has(id)));
}

// Zapamiętuje światy otwarte przez reguły (nie te otwarte przełącznikiem w panelu).
export function utrwalOdblokowane(swiaty, stan) {
  const nowe = new Set([...stan.odblokowane, ...otwartePrzezReguly(swiaty, stan)]);
  if (nowe.size === stan.odblokowane.length) return stan;
  return { ...stan, odblokowane: [...nowe].sort((a, b) => a - b) };
}

export function statusSwiata(swiat, stan, otwarte) {
  if (!swiat.gotowy) return 'w-budowie';
  if (!otwarte.has(swiat.id)) return 'zablokowany';
  if (stan.bossowie.includes(swiat.id)) return 'pokonany';
  return 'otwarty';
}

// Gotowy świat, którego bossa trzeba pokonać, żeby otworzyć dany świat.
export function poprzedniGotowy(swiaty, swiat) {
  const gotowe = gotoweWKolejnosci(swiaty);
  const i = gotowe.findIndex((s) => s.id === swiat.id);
  return i > 0 ? gotowe[i - 1] : null;
}

export function zadaniaSwiata(swiat) {
  return swiat.misje.flatMap((m) => m.zadania);
}

// Część zadań świata rozwiązanych co najmniej w 80% (0-1).
export function opanowanieSwiata(swiat, stan) {
  const zadania = zadaniaSwiata(swiat);
  if (!zadania.length) return 0;
  const opanowane = zadania.filter((id) => (stan.zadania[id]?.najlepszy ?? 0) >= PROG_OPANOWANIA);
  return opanowane.length / zadania.length;
}

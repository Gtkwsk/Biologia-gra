// Zadanie „uzupełnianie luk” (SPEC.md, sekcja 5, typ 4).
//
// zadanie.tekst: zdania z lukami w nawiasach kwadratowych:
//   [słowo]                  – luka,
//   [słowo|karta]            – luka powiązana z kartą atlasu (wynik i podpowiedź z opisu karty),
//   [słowo|karta|podpowiedź] albo [słowo||podpowiedź] – podpowiedź do pierwszej błędnej próby.
// zadanie.dystraktory: słowa, które nie pasują do żadnej luki: 'słowo' albo
//   { tekst, wyjasnienie } – wyjaśnienie pokazywane, gdy gracz wstawi to słowo.
// Takie same słowa w dwóch lukach są wymienne.
// Błąd: w pierwszej próbie wyjaśnienie wstawionego słowa i podpowiedź luki (jawna albo z opisu karty,
// gdy słowo w luce jest nazwą karty), w drugiej poprawne słowo.

import { h, ikona, wyczysc } from '../core/dom.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';
import { parsujLuki } from './luki-logika.js';

export { parsujLuki };

export function utworzLuki(kontener, { zadanie, katalog, tryb = 'trening', onKoniec }) {
  const fragmenty = parsujLuki(zadanie.tekst);
  const luki = fragmenty.filter((f) => f.typ === 'luka');
  const lukaPoId = new Map(luki.map((l) => [l.id, l]));
  const dystraktory = (zadanie.dystraktory ?? []).map((d) => (typeof d === 'string' ? { tekst: d } : d));
  const etykiety = [
    ...luki.map((l) => ({ id: `slowo-${l.numer}`, tekst: l.slowo })),
    ...dystraktory.map((d, j) => ({ id: `dys-${j}`, tekst: d.tekst, wyjasnienie: d.wyjasnienie })),
  ];
  const tekstEtykiety = new Map(etykiety.map((e) => [e.id, e.tekst]));
  const etykietaPoId = new Map(etykiety.map((e) => [e.id, e]));

  const pola = new Map();
  const akapit = h(
    'p',
    { class: 'luki__tekst' },
    fragmenty.map((f) => {
      if (f.typ === 'tekst') return f.tekst;
      const tekst = h('span', { class: 'pole-celu__tekst' });
      const stanIkona = h('span', { class: 'pole-celu__ikona' });
      const pole = h(
        'button',
        { type: 'button', class: 'pole-celu pole-celu--luka', 'data-cel': f.id, 'data-stan': 'puste', 'aria-label': `Luka ${f.numer}: pusta` },
        [h('span', { class: 'luka__numer', 'aria-hidden': 'true' }, String(f.numer)), tekst, stanIkona],
      );
      pola.set(f.id, { pole, tekst, stanIkona, numer: f.numer });
      return pole;
    }),
  );

  function podpowiedzLuki(l) {
    if (l.podpowiedz) return l.podpowiedz;
    const k = l.karta && katalog.get(l.karta);
    return k && k.nazwa.toLowerCase() === l.slowo.toLowerCase() ? `Tu pasuje nazwa: ${k.opis}.` : null;
  }

  function wyjasnienieSlowa(e) {
    const et = etykietaPoId.get(e);
    if (et.wyjasnienie) return et.wyjasnienie;
    return e.startsWith('slowo-') ? 'To słowo pasuje do innej luki.' : null;
  }

  return utworzZadanieEtykiet(kontener, {
    klasa: 'luki',
    tryb,
    plansza: h('div', { class: 'luki__plansza' }, akapit),
    etykiety,
    celeDoStukania: [...pola.values()].map((p) => p.pole),
    def: {
      cele: luki.map((l) => l.id),
      etykiety: etykiety.map((e) => e.id),
      pasuje: (e, c) => tekstEtykiety.get(e) === lukaPoId.get(c).slowo,
      pojemnosc: 1,
      klucze: 'cel',
    },
    pokazCel(cel, { etykiety: lezace, stan }) {
      const { pole, tekst, stanIkona, numer } = pola.get(cel);
      pole.dataset.stan = stan;
      tekst.textContent = lezace[0]?.tekst ?? '';
      wyczysc(stanIkona);
      if (stan === 'dobrze' || stan === 'zle') stanIkona.append(ikona(stan));
      pole.setAttribute('aria-label', `Luka ${numer}: ${lezace[0]?.tekst ?? 'pusta'}`);
    },
    komunikaty: {
      wstep: { rodzaj: 'info', tytul: 'Przeciągnij słowa do luk w zdaniach.', tekst: 'Możesz też stuknąć słowo, a potem lukę.' },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrane słowo: „${tekstEtykiety.get(e)}”.`, tekst: 'Stuknij lukę, do której pasuje.' }),
      dobrze: (e, c) => {
        const k = lukaPoId.get(c).karta && katalog.get(lukaPoId.get(c).karta);
        return { rodzaj: 'dobrze', tytul: `Tak: „${tekstEtykiety.get(e)}”.`, tekst: k?.zdanie ?? '' };
      },
      zle: (e, c, proba) => {
        const l = lukaPoId.get(c);
        const tytul = `„${tekstEtykiety.get(e)}” nie pasuje do luki ${l.numer}.`;
        if (proba >= 2) {
          const poprawna = etykiety.find((x) => x.tekst === l.slowo)?.id ?? null;
          return { komunikat: { rodzaj: 'zle', tytul, tekst: `Tu pasuje: „${l.slowo}”.` }, podswietl: poprawna };
        }
        const tekst = [wyjasnienieSlowa(e), podpowiedzLuki(l)].filter(Boolean).join(' ') || 'Przeczytaj całe zdanie jeszcze raz.';
        return { komunikat: { rodzaj: 'zle', tytul, tekst }, podswietl: null };
      },
      sprawdzian: (w) => {
        const l = lukaPoId.get(w.cel);
        return {
          rodzaj: 'zle',
          tytul: `Luka ${l.numer}: „${l.slowo}”.`,
          tekst: w.etykieta ? (etykietaPoId.get(w.etykieta).wyjasnienie ?? `„${tekstEtykiety.get(w.etykieta)}” tu nie pasuje.`) : 'Ta luka została pusta.',
        };
      },
    },
    kartaKlucza: (cel) => lukaPoId.get(cel).karta,
    onKoniec,
  });
}

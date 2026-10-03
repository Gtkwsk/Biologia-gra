// Zadanie „tabela porównawcza” (SPEC.md, sekcja 5, typ 6): siatka ✓/✗ (typy komórek albo procesy).
// Stuknięcie pola zmienia je kolejno: puste → ✓ → ✗ → puste.
// Trening: po „Sprawdź” błędne pola są oznaczone i można je poprawić; wynik z pierwszego sprawdzenia.
// Sprawdzian: jedno sprawdzenie.

import { h, ikona } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import * as T from './tabela-logika.js';

const KOLEJNOSC = [null, 'tak', 'nie'];

export function utworzTabele(kontener, { zadanie, dane, tryb = 'trening', onKoniec }) {
  const przyg = T.przygotujTabele(zadanie, dane);
  const opis = przyg.opis;
  const odpowiedzi = {};
  const pola = new Map();
  let pierwszaOcena = null;
  let zakonczone = false;
  const komunikat = utworzKomunikat();

  const naglowek = h('tr', {}, [
    h('th', { scope: 'col', class: 'tabela-zad__rog' }, opis.rog),
    ...przyg.kolumny.map((k) => h('th', { scope: 'col' }, [rysunekKarty(opis.kartaKolumny(k), 'tabela-zad__rysunek'), h('span', {}, opis.nazwaKolumny(k))])),
  ]);
  const wiersze = przyg.wiersze.map((w) =>
    h('tr', {}, [
      h('th', { scope: 'row' }, w.wTabeli ?? w.nazwa),
      ...przyg.kolumny.map((k) => {
        const kl = T.klucz(w.id, k.id);
        const pole = h(
          'button',
          { type: 'button', class: 'tabela-zad__pole', 'data-klucz': kl, 'data-wartosc': '', 'aria-label': `${k.nazwa}, ${w.wTabeli ?? w.nazwa}: puste`, onclick: () => przelacz(kl) },
          h('span', { class: 'tabela-zad__znak' }),
        );
        pola.set(kl, { pole, wiersz: w, kolumna: k });
        return h('td', {}, pole);
      }),
    ]),
  );
  const przyciskSprawdz = h('button', { type: 'button', class: 'przycisk', onclick: sprawdz }, 'Sprawdź');
  const korzen = h('div', { class: `zadanie tabela-zad zadanie--${tryb}` }, [
    h('div', { class: 'tabela-zad__przewijana' }, h('table', { class: 'tabela-zad__siatka' }, [h('thead', {}, naglowek), h('tbody', {}, wiersze)])),
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, przyciskSprawdz)]),
  ]);
  kontener.append(korzen);
  komunikat.pokaz({ rodzaj: 'info', tytul: opis.instrukcja, tekst: opis.jakStukac });

  function pokazPole(kl, wynik = null) {
    const { pole, wiersz, kolumna } = pola.get(kl);
    const wartosc = odpowiedzi[kl] ?? '';
    pole.dataset.wartosc = wartosc;
    if (wynik) pole.dataset.wynik = wynik;
    else delete pole.dataset.wynik;
    const znak = pole.firstChild;
    znak.replaceChildren(wartosc ? ikona(wartosc === 'tak' ? 'dobrze' : 'zle') : '');
    const stan = { tak: opis.tak, nie: opis.nie }[wartosc] ?? 'puste';
    pole.setAttribute('aria-label', `${kolumna.nazwa}, ${wiersz.wTabeli ?? wiersz.nazwa}: ${stan}`);
  }

  function przelacz(kl) {
    if (zakonczone) return;
    const teraz = KOLEJNOSC.indexOf(odpowiedzi[kl] ?? null);
    const nastepna = KOLEJNOSC[(teraz + 1) % KOLEJNOSC.length];
    if (nastepna) odpowiedzi[kl] = nastepna;
    else delete odpowiedzi[kl];
    pokazPole(kl);
  }

  function sprawdz() {
    if (zakonczone) return;
    const ocena = T.ocenTabele(przyg, odpowiedzi);
    if (!pierwszaOcena) pierwszaOcena = ocena;
    for (const c of ocena.komorki) pokazPole(c.klucz, c.dobrze ? 'dobrze' : 'zle');
    const bledne = ocena.komorki.filter((c) => !c.dobrze);
    if (!bledne.length || tryb === 'sprawdzian') {
      komunikat.pokazListe(
        bledne.length
          ? bledne.map((c) => {
              const { wiersz, kolumna } = pola.get(c.klucz);
              return { rodzaj: 'zle', tytul: `${kolumna.nazwa}, ${wiersz.wTabeli ?? wiersz.nazwa}`, tekst: opis.zdanie(kolumna, wiersz) };
            })
          : [{ rodzaj: 'dobrze', tytul: 'Cała tabela poprawnie.' }],
      );
      return zakoncz();
    }
    const pierwszy = pola.get(bledne[0].klucz);
    komunikat.pokaz({
      rodzaj: 'zle',
      tytul: `Błędne pola: ${bledne.length}. Popraw pola z czerwoną ramką.`,
      tekst: `Na przykład: ${opis.zdanie(pierwszy.kolumna, pierwszy.wiersz)}`,
    });
    przyciskSprawdz.textContent = 'Sprawdź ponownie';
  }

  function zakoncz() {
    zakonczone = true;
    przyciskSprawdz.disabled = true;
    korzen.classList.add('zadanie--gotowe');
    const o = pierwszaOcena;
    const karty = [
      ...przyg.wiersze.map((w) => ({ karta: w.id, odRazu: o.wiersze[w.id], poprawnie: tryb === 'trening' || o.wiersze[w.id] })),
      ...przyg.kolumny.map((k) => ({ karta: opis.kartaKolumny(k), odRazu: o.kolumny[k.id], poprawnie: tryb === 'trening' || o.kolumny[k.id] })),
    ];
    onKoniec?.({ poprawne: o.poprawne, wszystkie: o.wszystkie, karty });
  }

  return {
    zniszcz() {
      korzen.remove();
    },
  };
}

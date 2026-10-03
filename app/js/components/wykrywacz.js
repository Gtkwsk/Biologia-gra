// „Wykrywacz bzdur” (SPEC.md, sekcja 5, typ 2, wariant): Profesor Pomyłka wygłasza wykład
// z bzdurami; gracz stuka podkreślone słowa, które uważa za bzdury, i wybiera poprawkę.
// Poprawiona bzdura zostaje w tekście przekreślona obok poprawki. Logika: wykrywacz-logika.js.

import { h, ikona } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { wymieszaj } from './podpisywanie-logika.js';
import { rysunekKarty } from './rysunki.js';
import * as W from './wykrywacz-logika.js';

export function utworzWykrywacz(kontener, { zadanie, onKoniec }) {
  const wyklad = zadanie.wyklad;
  const slowa = W.slowaWykladu(wyklad);
  const liczba = W.liczbaBzdur(wyklad);
  let st = W.nowyStan(wyklad);
  let opcjeBzdury = [];
  const komunikat = utworzKomunikat();

  const tekst = h('p', { class: 'wykrywacz__tekst' });
  const licznik = h('p', { class: 'wykrywacz__licznik' });
  const poprawka = h('div', { class: 'wykrywacz__poprawka', hidden: true });
  const korzen = h('div', { class: 'zadanie wykrywacz' }, [
    h('div', { class: 'wykrywacz__scena' }, [
      h('div', { class: 'wykrywacz__postac' }, [rysunekKarty('profesor-pomylka', 'wykrywacz__profesor'), h('p', { class: 'wykrywacz__kto' }, 'Profesor Pomyłka')]),
      h('div', { class: 'wykrywacz__dymek' }, [tekst]),
    ]),
    licznik,
    // Opcje poprawki w tacce: na tablecie tacka jest przyklejona do dołu ekranu, więc opcje są
    // widoczne zaraz po stuknięciu bzdury.
    h('div', { class: 'tacka' }, [poprawka, komunikat.el]),
  ]);
  kontener.append(korzen);
  rysuj();
  const sa = liczba % 10 >= 2 && liczba % 10 <= 4 && (liczba % 100 < 12 || liczba % 100 > 14);
  komunikat.pokaz({
    rodzaj: 'info',
    tytul: `W wykładzie ${sa ? 'są' : 'jest'} ${W.bzdury(liczba)}.`,
    tekst: 'Stuknij podkreślone słowo, które jest bzdurą, i wybierz poprawkę.',
  });

  function slowoEl(s, i) {
    const stan = st.slowa[i];
    if (stan.stan === 'poprawione') {
      return h('span', { class: 'wykrywacz__poprawione', 'data-slowo': i }, [
        h('del', {}, s.slowo),
        ' ',
        h('ins', {}, s.poprawka),
      ]);
    }
    const klasy = ['wykrywacz__slowo'];
    if (stan.stan === 'prawdziwe') klasy.push('wykrywacz__slowo--prawdziwe');
    if (stan.stan === 'znalezione') klasy.push('wykrywacz__slowo--bzdura');
    if (stan.podpowiedz) klasy.push('wykrywacz__slowo--podpowiedz');
    return h(
      'button',
      {
        type: 'button',
        class: klasy.join(' '),
        'data-slowo': i,
        disabled: stan.stan !== 'nowe' || st.wybrane !== null,
        onclick: () => przejdz(W.stuknij(wyklad, st, i)),
      },
      [stan.stan === 'prawdziwe' ? ikona('dobrze', 'wykrywacz__znak') : null, s.slowo].filter(Boolean),
    );
  }

  function rysuj() {
    let i = 0;
    tekst.replaceChildren(...wyklad.map((f) => (W.czySlowo(f) ? slowoEl(f, i++) : f)));
    licznik.textContent = `Poprawione bzdury: ${W.poprawione(st)} z ${liczba}`;
    if (st.wybrane === null) {
      poprawka.hidden = true;
      poprawka.replaceChildren();
      return;
    }
    const s = slowa[st.wybrane];
    if (poprawka.hidden) {
      opcjeBzdury = wymieszaj(s.opcje);
      poprawka.replaceChildren(
        h('p', { class: 'wykrywacz__pytanie' }, `Zamiast „${s.slowo}” powinno być:`),
        h(
          'div',
          { class: 'wykrywacz__opcje' },
          opcjeBzdury.map((o) =>
            h('button', { type: 'button', class: 'przycisk przycisk--jasny wykrywacz__opcja', 'data-opcja': o, onclick: (e) => klikOpcji(o, e.currentTarget) }, o),
          ),
        ),
      );
      poprawka.hidden = false;
      poprawka.querySelector('button')?.focus({ preventScroll: true });
    }
  }

  function klikOpcji(opcja, przycisk) {
    const r = W.wybierzPoprawke(wyklad, st, opcja);
    if (r.st.wybrane !== null) {
      przycisk.disabled = true;
      przycisk.classList.add('wykrywacz__opcja--zle');
    }
    przejdz(r);
  }

  function przejdz({ st: nowy, komunikat: k }) {
    if (!k) return;
    st = nowy;
    komunikat.pokaz(k);
    rysuj();
    if (W.czyKoniec(wyklad, st)) {
      korzen.classList.add('zadanie--gotowe');
      onKoniec?.(W.wynik(wyklad, st));
    }
  }

  return {
    zniszcz() {
      korzen.remove();
    },
  };
}

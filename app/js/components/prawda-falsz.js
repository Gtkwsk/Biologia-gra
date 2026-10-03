// Zadanie „prawda/fałsz z poprawką” (SPEC.md, sekcja 5, typ 2): zdania po kolei.
// Logika: prawda-falsz-logika.js.

import { h, ikona } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { wymieszaj } from './podpisywanie-logika.js';
import * as P from './prawda-falsz-logika.js';

export function utworzPrawdaFalsz(kontener, { zadanie, tryb = 'trening', onKoniec }) {
  const zdania = zadanie.zdania;
  const wyniki = [];
  let indeks = 0;
  let st = P.nowyStanZdania();
  const komunikat = utworzKomunikat();

  const licznik = h('p', { class: 'pf__licznik' });
  const zdanieEl = h('p', { class: 'pf__zdanie' });
  const akcje = h('div', { class: 'pf__akcje' });
  const korzen = h('div', { class: `zadanie pf zadanie--${tryb}` }, [
    h('div', { class: 'pf__karta' }, [licznik, zdanieEl, akcje]),
    h('div', { class: 'tacka' }, [komunikat.el]),
  ]);
  kontener.append(korzen);
  pokazZdanie();

  function zdanie() {
    return zdania[indeks];
  }

  function pokazZdanie() {
    st = P.nowyStanZdania();
    licznik.textContent = `Zdanie ${indeks + 1} z ${zdania.length}`;
    zdanieEl.replaceChildren(zdanie().tekst);
    zdanieEl.dataset.stan = 'ocena';
    akcje.replaceChildren(
      h('button', { type: 'button', class: 'przycisk pf__prawda', onclick: () => odpowiedz(true) }, 'Prawda'),
      h('button', { type: 'button', class: 'przycisk pf__falsz', onclick: () => odpowiedz(false) }, 'Fałsz'),
    );
    komunikat.pokaz({
      rodzaj: 'info',
      tytul: 'Czy to zdanie jest prawdziwe?',
      tekst: 'Jeśli jest fałszywe, poprawisz je.',
    });
  }

  function odpowiedz(wartosc) {
    const r = P.ocen(zdanie(), st, wartosc, tryb);
    przejdz(r);
  }

  function przejdz({ st: nowy, komunikat: k }) {
    st = nowy;
    if (k) komunikat.pokaz(k);
    zdanieEl.dataset.stan = st.etap;
    if (st.etap === 'fragment') pokazFragmenty();
    else if (st.etap === 'wersja') pokazWersje();
    else if (st.etap === 'poprawka') pokazPoprawki();
    else if (st.etap === 'koniec') pokazKoniecZdania();
  }

  function pokazWersje() {
    if (akcje.querySelector('.pf__wersja')) return;
    akcje.replaceChildren(
      h('p', { class: 'pf__pytanie' }, 'Która wersja jest prawdziwa?'),
      h(
        'div',
        { class: 'pf__wersje' },
        wymieszaj(P.wersje(zdanie())).map((opcja) =>
          h('button', { type: 'button', class: 'przycisk przycisk--jasny pf__wersja', onclick: (e) => klikWersji(opcja, e.currentTarget) }, opcja),
        ),
      ),
    );
  }

  function klikWersji(opcja, przycisk) {
    const r = P.wybierzWersje(zdanie(), st, opcja, tryb);
    if (r.st.etap !== 'koniec') {
      przycisk.disabled = true;
      przycisk.classList.add('pf__wersja--zle');
    }
    przejdz(r);
  }

  function pokazFragmenty() {
    zdanieEl.replaceChildren(
      ...P.tokeny(zdanie()).flatMap((t, i) => [
        i ? ' ' : null,
        h('button', { type: 'button', class: 'pf__slowo', onclick: (e) => klikFragmentu(t, e.currentTarget) }, t.tekst),
      ]),
    );
    akcje.replaceChildren();
  }

  function klikFragmentu(token, przycisk) {
    const r = P.wybierzFragment(zdanie(), st, token, tryb);
    if (!token.blad && r.st.etap !== 'koniec') {
      przycisk.disabled = true;
      przycisk.classList.add('pf__slowo--poprawne');
    }
    przejdz(r);
  }

  function pokazPoprawki() {
    for (const b of zdanieEl.querySelectorAll('.pf__slowo')) {
      b.disabled = true;
      if (b.textContent.startsWith(zdanie().blad)) b.classList.add('pf__slowo--blad');
    }
    akcje.replaceChildren(
      h('p', { class: 'pf__pytanie' }, `Zamiast „${zdanie().blad}” powinno być:`),
      ...zdanie().poprawki.map((opcja) =>
        h('button', { type: 'button', class: 'przycisk przycisk--jasny pf__opcja', onclick: (e) => klikPoprawki(opcja, e.currentTarget) }, opcja),
      ),
    );
  }

  function klikPoprawki(opcja, przycisk) {
    const r = P.wybierzPoprawke(zdanie(), st, opcja, tryb);
    if (r.st.etap !== 'koniec') przycisk.disabled = true;
    przejdz(r);
  }

  function pokazKoniecZdania() {
    wyniki[indeks] = st.bezBledu;
    zdanieEl.replaceChildren(ikona(st.bezBledu ? 'dobrze' : 'zle', 'pf__znak'), P.poprawione(zdanie()));
    zdanieEl.dataset.wynik = st.bezBledu ? 'dobrze' : 'zle';
    const ostatnie = indeks === zdania.length - 1;
    akcje.replaceChildren(
      h(
        'button',
        {
          type: 'button',
          class: 'przycisk przycisk--dalej',
          onclick: () => {
            if (ostatnie) return zakoncz();
            indeks += 1;
            delete zdanieEl.dataset.wynik;
            pokazZdanie();
          },
        },
        ostatnie ? 'Gotowe' : 'Następne zdanie',
      ),
    );
  }

  function zakoncz() {
    akcje.replaceChildren();
    korzen.classList.add('zadanie--gotowe');
    const karty = zdania
      .map((z, i) => (z.karta ? { karta: z.karta, odRazu: wyniki[i], poprawnie: tryb === 'trening' || wyniki[i] } : null))
      .filter(Boolean);
    onKoniec?.({ poprawne: wyniki.filter(Boolean).length, wszystkie: zdania.length, karty });
  }

  return {
    zniszcz() {
      korzen.remove();
    },
  };
}

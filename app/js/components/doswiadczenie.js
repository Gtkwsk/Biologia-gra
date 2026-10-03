// Zadanie „doświadczenie” (SPEC.md, sekcja 5, typ 7): opis i scena doświadczenia, a potem
// pytania o próbę badawczą i kontrolną, problem badawczy, wynik i wniosek.
// Logika: doswiadczenie-logika.js. Sceny: sceny-procesow.js.
//
// zadanie.scena:  id sceny (opcjonalnie),
// zadanie.opis:   akapit z opisem przebiegu doświadczenia,
// zadanie.wyniki: opcjonalna tabela wyników { kolumny: [...], wiersze: [[...], ...] },
// zadanie.kroki:  pytania (doswiadczenie-logika.js),
// zadanie.ciekawostka: opcjonalnie, dosłownie z TRESCI.md, sekcja 6 (z oznaczeniem).
// Trening: pytania po kolei, po błędzie przyczyna i kolejna próba.
// Sprawdzian: wszystkie pytania naraz i jedno „Sprawdź”.

import { h, ikona } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { wymieszaj } from './podpisywanie-logika.js';
import { scenaProcesu } from './sceny-procesow.js';
import * as D from './doswiadczenie-logika.js';

function tabelaWynikow(wyniki) {
  return h('table', { class: 'dosw__wyniki' }, [
    h('thead', {}, h('tr', {}, wyniki.kolumny.map((k) => h('th', { scope: 'col' }, k)))),
    h('tbody', {}, wyniki.wiersze.map((w) => h('tr', {}, w.map((k, i) => (i === 0 ? h('th', { scope: 'row' }, k) : h('td', {}, k)))))),
  ]);
}

export function utworzDoswiadczenie(kontener, { zadanie, tryb = 'trening', onKoniec }) {
  const kroki = zadanie.kroki;
  const komunikat = utworzKomunikat();
  const scena = zadanie.scena ? scenaProcesu(zadanie.scena) : null;
  const naglowek = h('section', { class: 'dosw__opis' }, [
    scena ? h('figure', { class: 'dosw__scena' }, scena.el) : null,
    h('div', { class: 'dosw__tekst' }, [
      h('p', {}, zadanie.opis),
      zadanie.wyniki ? tabelaWynikow(zadanie.wyniki) : null,
      zadanie.ciekawostka
        ? h('aside', { class: 'ciekawostka' }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, zadanie.ciekawostka)])
        : null,
    ]),
  ]);
  const korzen = h('div', { class: `zadanie dosw dosw--${tryb}` }, naglowek);
  kontener.append(korzen);

  if (tryb === 'sprawdzian') sprawdzian();
  else trening();
  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function przyciskOpcji(krok, i, onclick) {
    return h('button', { type: 'button', class: 'dosw__opcja', 'data-opcja': String(i), onclick }, krok.opcje[i].tekst);
  }

  function trening() {
    const pierwsze = {};
    let indeks = 0;
    let rozwiazany = false;
    const licznik = h('p', { class: 'dosw__licznik' });
    const pytanie = h('p', { class: 'dosw__pytanie' });
    const opcje = h('div', { class: 'dosw__opcje' });
    const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true, onclick: nastepny }, 'Dalej');
    korzen.append(
      h('section', { class: 'dosw__krok', 'aria-live': 'polite' }, [licznik, pytanie, opcje]),
      h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
    );
    pokazKrok();

    function pokazKrok() {
      const krok = kroki[indeks];
      rozwiazany = false;
      dalej.hidden = true;
      licznik.textContent = `Pytanie ${indeks + 1} z ${kroki.length}`;
      pytanie.textContent = krok.pytanie;
      opcje.replaceChildren(...D.kolejnoscOpcji(krok, wymieszaj).map((i) => przyciskOpcji(krok, i, (e) => wybierz(i, e.currentTarget))));
      komunikat.pokaz({ rodzaj: 'info', tytul: 'Wybierz odpowiedź.', tekst: 'Przyjrzyj się opisowi i rysunkowi.' });
    }

    function wybierz(i, przycisk) {
      if (rozwiazany) return;
      const krok = kroki[indeks];
      if (!(indeks in pierwsze)) pierwsze[indeks] = i;
      const r = D.ocenOpcje(krok, i);
      if (r.dobrze) {
        rozwiazany = true;
        przycisk.dataset.stan = 'dobrze';
        for (const b of opcje.querySelectorAll('.dosw__opcja')) b.disabled = true;
        komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Tak.', tekst: r.tekst });
        dalej.textContent = indeks === kroki.length - 1 ? 'Gotowe' : 'Dalej';
        dalej.hidden = false;
        return;
      }
      przycisk.dataset.stan = 'zle';
      przycisk.disabled = true;
      komunikat.pokaz({ rodzaj: 'zle', tytul: 'To nie ta odpowiedź.', tekst: r.tekst });
    }

    function nastepny() {
      if (indeks === kroki.length - 1) {
        dalej.hidden = true;
        korzen.classList.add('zadanie--gotowe');
        onKoniec?.(D.wynik(kroki, pierwsze, 'trening'));
        return;
      }
      indeks += 1;
      pokazKrok();
    }
  }

  function sprawdzian() {
    const odpowiedzi = {};
    let zakonczone = false;
    const bloki = kroki.map((krok, k) => {
      const przyciski = D.kolejnoscOpcji(krok, wymieszaj).map((i) =>
        przyciskOpcji(krok, i, () => {
          if (zakonczone) return;
          odpowiedzi[k] = i;
          for (const b of przyciski) b.setAttribute('aria-pressed', String(b.dataset.opcja === String(i)));
        }),
      );
      for (const b of przyciski) b.setAttribute('aria-pressed', 'false');
      const znak = h('span', { class: 'dosw__znak' });
      const el = h('section', { class: 'dosw__krok', 'data-krok': String(k) }, [
        h('p', { class: 'dosw__pytanie' }, `${k + 1}. ${krok.pytanie}`),
        h('div', { class: 'dosw__opcje', role: 'group', 'aria-label': `Pytanie ${k + 1}` }, przyciski),
        znak,
      ]);
      return { el, przyciski, znak };
    });
    const przyciskSprawdz = h('button', { type: 'button', class: 'przycisk', onclick: sprawdz }, 'Sprawdź');
    korzen.append(...bloki.map((b) => b.el), h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, przyciskSprawdz)]));
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Odpowiedz na wszystkie pytania.', tekst: 'Potem stuknij „Sprawdź”.' });

    function sprawdz() {
      if (zakonczone) return;
      zakonczone = true;
      przyciskSprawdz.disabled = true;
      const lista = [];
      kroki.forEach((krok, k) => {
        const { el, przyciski, znak } = bloki[k];
        const dobra = D.poprawnaOpcja(krok);
        const dobrze = odpowiedzi[k] === dobra;
        el.dataset.stan = dobrze ? 'dobrze' : 'zle';
        znak.replaceChildren(ikona(dobrze ? 'dobrze' : 'zle'));
        for (const b of przyciski) {
          b.disabled = true;
          if (b.dataset.opcja === String(dobra)) b.dataset.poprawna = 'true';
        }
        if (!dobrze) {
          const wybrana = odpowiedzi[k] !== undefined ? D.ocenOpcje(krok, odpowiedzi[k]).tekst : 'Bez odpowiedzi.';
          lista.push({ rodzaj: 'zle', tytul: `Pytanie ${k + 1}: ${krok.opcje[dobra].tekst}`, tekst: `${wybrana} ${krok.wyjasnienie}` });
        }
      });
      komunikat.pokazListe(lista.length ? lista : [{ rodzaj: 'dobrze', tytul: 'Wszystkie odpowiedzi poprawne.' }]);
      korzen.classList.add('zadanie--gotowe');
      onKoniec?.(D.wynik(kroki, odpowiedzi, 'sprawdzian'));
    }
  }
}

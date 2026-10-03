// Mechanika „Ratuj organizm” (SPEC.md, sekcja 3.2, świat 1): przy każdym przypadku gracz wskazuje
// składnik, którego dotyczy objaw, a potem jego funkcję. Scena pokazuje skutek (np. liście znów
// zielone). Treści: TRESCI.md, sekcja 2.1; przypadek z kiełkującym ziemniakiem to ciekawostka
// z sekcji 6 (pokazana w ramce).
//
// zadanie.przypadki: [{
//   scena: id z sceny-skladnikow.js, objaw: zdanie,
//   skladnik: { pytanie, opcje: [{ karta, poprawna?, wyjasnienie? }] },
//   funkcja:  { pytanie, opcje: [{ tekst, poprawna?, wyjasnienie? }] },
//   wyjasnienie: zdanie po rozwiązaniu, ciekawostka?: dosłownie z TRESCI.md, sekcja 6 }]
// Wynik: wskazania składnika i funkcji od razu dobre; karta to wskazany składnik.

import { h, dolacz } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj, zWielkiej } from './podpisywanie-logika.js';
import { scenaSkladnika } from './sceny-skladnikow.js';
import * as D from './doswiadczenie-logika.js';

export function utworzDiagnoze(kontener, { zadanie, dane, onKoniec }) {
  const przypadki = zadanie.przypadki;
  const komunikat = utworzKomunikat();
  const wyniki = [];
  let indeks = 0;
  const nazwa = (karta) => dane.katalog.get(karta)?.nazwa ?? karta;

  const widok = h('figure', { class: 'diag__widok' });
  const panel = h('section', { class: 'lab__panel', 'aria-live': 'polite' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie diag' }, [
    h('div', { class: 'diag__stol' }, [widok, panel]),
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);
  pokazPrzypadek();

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function pokazPrzypadek() {
    const p = przypadki[indeks];
    dalej.hidden = true;
    const scena = scenaSkladnika(p.scena, p.objaw);
    widok.replaceChildren(scena, h('figcaption', { class: 'diag__objaw' }, [h('strong', {}, 'Objaw: '), p.objaw]));
    krokSkladnika(p, scena);
  }

  function krokSkladnika(p, scena) {
    let proby = 0;
    let rozwiazany = false;
    const przyciski = wymieszaj(p.skladnik.opcje.map((o) => o.karta)).map((karta) =>
      h('button', { type: 'button', class: 'lancuch__opcja diag__skladnik', 'data-karta': karta, onclick: (e) => wybierz(karta, e.currentTarget) }, [
        rysunekKarty(karta, 'lancuch__rysunek'),
        h('span', {}, zWielkiej(nazwa(karta))),
      ]),
    );
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Przypadek ${indeks + 1} z ${przypadki.length}: składnik`),
      h('p', { class: 'dosw__pytanie' }, p.skladnik.pytanie),
      h('div', { class: 'lancuch__opcje' }, przyciski),
    );
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Postaw diagnozę.', tekst: 'Który składnik ma tu znaczenie? Stuknij go.' });

    function wybierz(karta, b) {
      if (rozwiazany) return;
      proby += 1;
      const o = p.skladnik.opcje.find((x) => x.karta === karta);
      if (!o.poprawna) {
        b.dataset.stan = 'zle';
        b.disabled = true;
        komunikat.pokaz({ rodzaj: 'zle', tytul: `${zWielkiej(nazwa(karta))}: to nie to.`, tekst: o.wyjasnienie });
        return;
      }
      rozwiazany = true;
      b.dataset.stan = 'dobrze';
      for (const x of przyciski) x.disabled = true;
      wyniki.push({ karta, odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Tak: ${nazwa(karta)}.`, tekst: 'Teraz wskaż, jaką funkcję pełni ten składnik.' });
      dalej.textContent = 'Dalej';
      dalej.hidden = false;
      dalej.onclick = () => krokFunkcji(p, scena, karta);
    }
  }

  function krokFunkcji(p, scena, karta) {
    dalej.hidden = true;
    let proby = 0;
    let rozwiazany = false;
    const krok = { ...p.funkcja, wyjasnienie: p.wyjasnienie };
    const opcje = D.kolejnoscOpcji(krok, wymieszaj).map((i) =>
      h('button', { type: 'button', class: 'dosw__opcja', 'data-opcja': String(i), onclick: (e) => odpowiedz(i, e.currentTarget) }, krok.opcje[i].tekst),
    );
    panel.replaceChildren();
    dolacz(panel, [
      h('p', { class: 'lab__krok' }, `Przypadek ${indeks + 1} z ${przypadki.length}: funkcja`),
      h('p', { class: 'dosw__pytanie' }, p.funkcja.pytanie),
      h('div', { class: 'dosw__opcje' }, opcje),
      p.ciekawostka ? h('aside', { class: 'ciekawostka', hidden: true }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, p.ciekawostka)]) : null,
    ]);
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Jaką funkcję pełni ten składnik?', tekst: 'Stuknij jedną odpowiedź.' });

    function odpowiedz(i, b) {
      if (rozwiazany) return;
      proby += 1;
      const r = D.ocenOpcje(krok, i);
      if (!r.dobrze) {
        b.dataset.stan = 'zle';
        b.disabled = true;
        komunikat.pokaz({ rodzaj: 'zle', tytul: 'To nie ta funkcja.', tekst: r.tekst });
        return;
      }
      rozwiazany = true;
      b.dataset.stan = 'dobrze';
      for (const x of opcje) x.disabled = true;
      scena.classList.add('diag__scena--po');
      panel.querySelector('.ciekawostka')?.removeAttribute('hidden');
      wyniki.push({ karta, odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Diagnoza trafna.', tekst: r.tekst });
      const ostatni = indeks === przypadki.length - 1;
      dalej.textContent = ostatni ? 'Gotowe' : 'Następny przypadek';
      dalej.hidden = false;
      dalej.onclick = () => {
        dalej.hidden = true;
        if (!ostatni) {
          indeks += 1;
          return pokazPrzypadek();
        }
        korzen.classList.add('zadanie--gotowe');
        onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki });
      };
    }
  }
}

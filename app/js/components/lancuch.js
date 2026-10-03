// Mechanika „Łańcuchy pokarmowe” (SPEC.md, sekcja 3.2, świat 5). Logika: lancuch-logika.js.
//
// Kolejne łańcuchy z jedną luką: gracz wybiera organizm, który do niej pasuje. Strzałka prowadzi
// od pokarmu do tego, kto go zjada. Zła opcja daje przyczynę wynikającą z definicji kategorii.
//
// zadanie.lancuchy: [{ ogniwa: [id | null], opcje: [{ karta, poprawna?, wyjasnienie? }] }]
//   (id: węzeł z data/pokarm.js albo karta organizmu; null to luka).
// Wynik: łańcuchy ułożone od razu dobrze; karta to organizm z luki.

import { h } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj, zWielkiej } from './podpisywanie-logika.js';
import * as L from './lancuch-logika.js';

export function utworzLancuch(kontener, { zadanie, dane, onKoniec }) {
  const pomoc = { katalog: dane.katalog, wezly: dane.pokarm.wezly, zaleznosci: dane.pokarm.zaleznosci };
  const lancuchy = zadanie.lancuchy;
  const komunikat = utworzKomunikat();
  const wyniki = [];
  let indeks = 0;

  const nazwa = (id) => pomoc.wezly.find((w) => w.id === id)?.nazwa ?? dane.katalog.get(id)?.nazwa ?? id;
  const ikonaWezla = (id) => rysunekKarty(pomoc.wezly.find((w) => w.id === id)?.ikona ?? id, 'lancuch__rysunek');

  const plansza = h('figure', { class: 'lancuch__plansza' });
  const opcje = h('div', { class: 'lancuch__opcje', role: 'group', 'aria-label': 'Organizmy do wyboru' });
  const licznik = h('p', { class: 'lab__krok' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie lancuch' }, [
    h('section', { class: 'lancuch__panel' }, [
      licznik,
      plansza,
      h('p', { class: 'lancuch__legenda' }, 'Strzałka prowadzi od pokarmu do tego, kto go zjada.'),
      opcje,
    ]),
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);
  pokazLancuch();

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function ogniwo(id, { luka = false } = {}) {
    if (luka) {
      return h('span', { class: 'lancuch__ogniwo lancuch__ogniwo--luka', 'data-stan': 'puste' }, [
        h('span', { class: 'lancuch__znak', 'aria-hidden': 'true' }, '?'),
        h('span', { class: 'lancuch__nazwa' }, 'Kto tu pasuje?'),
      ]);
    }
    return h('span', { class: 'lancuch__ogniwo' }, [ikonaWezla(id), h('span', { class: 'lancuch__nazwa' }, nazwa(id))]);
  }

  function rysujPlansze(lancuch, wybrany = null) {
    const elementy = [];
    lancuch.ogniwa.forEach((id, i) => {
      if (i > 0) elementy.push(h('span', { class: 'lancuch__strzalka', 'aria-hidden': 'true' }));
      elementy.push(id === null && !wybrany ? ogniwo(null, { luka: true }) : ogniwo(id ?? wybrany));
    });
    const caly = lancuch.ogniwa.map((id) => id ?? wybrany);
    plansza.setAttribute('aria-label', `Łańcuch: ${caly.map((id) => (id ? nazwa(id) : 'luka')).join(', potem ')}`);
    plansza.replaceChildren(...elementy);
  }

  function pokazLancuch() {
    const lancuch = lancuchy[indeks];
    let proby = 0;
    let rozwiazany = false;
    dalej.hidden = true;
    licznik.textContent = `Łańcuch ${indeks + 1} z ${lancuchy.length}`;
    rysujPlansze(lancuch);
    const przyciski = wymieszaj(lancuch.opcje.map((o) => o.karta)).map((karta) =>
      h('button', { type: 'button', class: 'lancuch__opcja', 'data-karta': karta, onclick: (e) => wybierz(karta, e.currentTarget) }, [
        rysunekKarty(karta, 'lancuch__rysunek'),
        h('span', {}, zWielkiej(nazwa(karta))),
      ]),
    );
    opcje.replaceChildren(...przyciski);
    komunikat.pokaz({
      rodzaj: 'info',
      tytul: L.indeksLuki(lancuch) === 0 ? 'Od czego zaczyna się ten łańcuch?' : 'Który organizm pasuje do luki?',
      tekst: 'Stuknij organizm. Pomyśl, czym się żywi i kto go zjada.',
    });

    function wybierz(karta, przycisk) {
      if (rozwiazany) return;
      proby += 1;
      const o = L.ocen(lancuch, karta, pomoc);
      if (!o.dobrze) {
        przycisk.dataset.stan = 'zle';
        przycisk.disabled = true;
        komunikat.pokaz({ rodzaj: 'zle', tytul: `${zWielkiej(nazwa(karta))} tu nie pasuje.`, tekst: o.tekst });
        return;
      }
      rozwiazany = true;
      przycisk.dataset.stan = 'dobrze';
      for (const b of przyciski) b.disabled = true;
      rysujPlansze(lancuch, karta);
      plansza.classList.add('lancuch__plansza--gotowa');
      // Węzeł pokarmu (np. kwiaty z nektarem) nie jest kartą atlasu.
      wyniki.push({ karta: dane.katalog.has(karta) ? karta : null, odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Tak: ${nazwa(karta)}.`, tekst: o.tekst });
      const ostatni = indeks === lancuchy.length - 1;
      dalej.textContent = ostatni ? 'Gotowe' : 'Następny łańcuch';
      dalej.hidden = false;
      dalej.onclick = () => {
        dalej.hidden = true;
        plansza.classList.remove('lancuch__plansza--gotowa');
        if (!ostatni) {
          indeks += 1;
          return pokazLancuch();
        }
        korzen.classList.add('zadanie--gotowe');
        onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki.filter((w) => w.karta) });
      };
    }
  }
}

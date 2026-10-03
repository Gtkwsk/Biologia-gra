// Mechanika „Sprint” (SPEC.md, sekcja 3.2, świat 6). Model: sprint-logika.js.
//
// Bieg w kilku etapach (trucht, szybki bieg, sprint, meta, odpoczynek). Po każdym etapie
// paski pokazują zapotrzebowanie mięśni na energię, dostawę tlenu z krwią, energię z oddychania
// tlenowego i z fermentacji mlekowej oraz kwas mlekowy w mięśniach. Gracz przewiduje i wyjaśnia
// skutki, odpowiadając na pytania (jak w doświadczeniu).
//
// zadanie.etapy: [{ tempo, czas?, polecenie, akcja, pytania: [krok] }] (krok: doswiadczenie-logika.js).
// Wynik: pytania z odpowiedzią dobrą od razu.

import { h, s } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { wymieszaj } from './podpisywanie-logika.js';
import * as D from './doswiadczenie-logika.js';
import * as SP from './sprint-logika.js';

// Pozycja biegacza po kolejnych etapach (ułamek szerokości bieżni); po finiszu stoi za metą.
const POZYCJE = [0.06, 0.32, 0.6, 0.95];

function bieznia() {
  const biegacz = s('g', { class: 'sprint__biegacz' }, [
    s('circle', { cx: 0, cy: -46, r: 8, fill: '#F0A35E', stroke: '#11191B', 'stroke-width': 2.5 }),
    s('path', { d: 'M0 -38 L-2 -14 M-2 -14 L-12 0 M-2 -14 L10 -2 M0 -32 L-12 -22 M0 -32 L12 -26', fill: 'none', stroke: '#11191B', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ]);
  const el = s('svg', { class: 'sprint__bieznia', viewBox: '0 0 600 90', role: 'img', 'aria-label': 'Bieżnia z biegaczem' }, [
    s('rect', { x: 0, y: 0, width: 600, height: 90, fill: '#2B1D1F' }),
    s('rect', { x: 0, y: 62, width: 600, height: 20, fill: '#C2563A' }),
    s('path', { d: 'M0 72 H600', stroke: '#F4F6F1', 'stroke-width': 2, 'stroke-dasharray': '14 10' }),
    s('path', { d: 'M24 54 V82', stroke: '#F4F6F1', 'stroke-width': 4 }),
    s('g', {}, [
      s('path', { d: 'M520 34 V82', stroke: '#F4F6F1', 'stroke-width': 3 }),
      s('path', { d: 'M520 34 H548 V50 H520 Z', fill: '#F4F6F1' }),
      s('path', { d: 'M520 34 H527 V42 H520 Z M534 34 H541 V42 H534 Z M527 42 H534 V50 H527 Z M541 42 H548 V50 H541 Z', fill: '#11191B' }),
    ]),
    s('text', { x: 24, y: 26, class: 'sprint__napis' }, 'start'),
    s('text', { x: 520, y: 26, 'text-anchor': 'middle', class: 'sprint__napis' }, 'meta'),
    biegacz,
  ]);
  return {
    el,
    ustaw(i) {
      biegacz.style.setProperty('--x', `${Math.round(600 * POZYCJE[Math.min(i, POZYCJE.length - 1)])}px`);
    },
  };
}

// Pasek z komórkami. Komórki mogą mieć rodzaj (np. energia z oddychania tlenowego albo z fermentacji).
function pasek(nazwa, maks, { granica = null } = {}) {
  const komorki = Array.from({ length: maks }, (_, i) => h('span', { class: 'sprint__komorka', 'data-granica': String(granica !== null && i === granica - 1) }));
  const zawartosc = h('span', { class: 'sprint__komorki', role: 'img' }, komorki);
  const el = h('li', { class: 'sprint__wskaznik' }, [h('span', { class: 'sprint__nazwa' }, nazwa), zawartosc]);
  return {
    el,
    // czesci: [{ ile, rodzaj, opis }] – kolejne odcinki paska.
    ustaw(czesci) {
      let i = 0;
      for (const k of komorki) k.dataset.rodzaj = '';
      for (const c of czesci) for (let j = 0; j < c.ile && i < maks; j++, i++) komorki[i].dataset.rodzaj = c.rodzaj;
      zawartosc.setAttribute('aria-label', `${nazwa}: ${czesci.map((c) => `${c.opis} ${c.ile}`).join(', ')} z ${maks}`);
    },
  };
}

export function utworzSprint(kontener, { zadanie, onKoniec }) {
  const etapy = zadanie.etapy;
  const komunikat = utworzKomunikat();
  const wyniki = [];
  const tor = bieznia();
  const paski = {
    zapotrzebowanie: pasek('Mięśnie potrzebują energii', 5),
    energia: pasek('Skąd mięśnie mają energię', 5, { granica: SP.MAKS_TLENU }),
    kwas: pasek('Kwas mlekowy w mięśniach', SP.MAKS_KWASU),
  };
  const legenda = h('p', { class: 'sprint__legenda' }, [
    h('span', { class: 'sprint__probka', 'data-rodzaj': 'tlenowe' }),
    ' oddychanie tlenowe ',
    h('span', { class: 'sprint__probka', 'data-rodzaj': 'mlekowa' }),
    ' fermentacja mlekowa ',
    h('span', { class: 'sprint__probka sprint__probka--granica' }),
    ` tyle tlenu dostarcza krew (najwięcej)`,
  ]);
  const panel = h('section', { class: 'sprint__panel', 'aria-live': 'polite' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie sprint' }, [
    h('figure', { class: 'sprint__scena' }, [tor.el, h('ul', { class: 'sprint__wskazniki' }, Object.values(paski).map((p) => p.el)), legenda]),
    panel,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);

  let stan = SP.nowyBieg();
  let indeks = 0;
  tor.ustaw(0);
  pokazStan({ zapotrzebowanie: 0, tlen: 0, mlekowa: 0, kwas: 0 });
  pokazEtap();

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function pokazStan(w) {
    paski.zapotrzebowanie.ustaw([{ ile: w.zapotrzebowanie, rodzaj: 'potrzeba', opis: 'potrzeba' }]);
    paski.energia.ustaw([
      { ile: w.tlen, rodzaj: 'tlenowe', opis: 'z oddychania tlenowego' },
      { ile: w.mlekowa, rodzaj: 'mlekowa', opis: 'z fermentacji mlekowej' },
    ]);
    paski.kwas.ustaw([{ ile: w.kwas, rodzaj: 'kwas', opis: 'kwas mlekowy' }]);
    korzen.dataset.niedobor = String(Boolean(w.mlekowa));
  }

  function pokazEtap() {
    const e = etapy[indeks];
    dalej.hidden = true;
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Etap ${indeks + 1} z ${etapy.length}`),
      h('p', { class: 'lab__polecenie' }, [h('strong', {}, 'Trener: '), e.polecenie]),
      h('div', { class: 'lab__opcje' }, h('button', { type: 'button', class: 'przycisk sprint__akcja', onclick: biegnij }, e.akcja)),
    );
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Słuchaj trenera.', tekst: 'Stuknij przycisk, a potem obserwuj paski pod bieżnią.' });
  }

  function biegnij() {
    const e = etapy[indeks];
    const w = SP.etap(stan, e.tempo, e.czas);
    stan = { kwas: w.kwas, etap: w.etap };
    tor.ustaw(w.etap);
    pokazStan(w);
    komunikat.pokaz({ rodzaj: 'info', tytul: `${SP.TEMPA[e.tempo].nazwa.charAt(0).toUpperCase()}${SP.TEMPA[e.tempo].nazwa.slice(1)}.`, tekst: SP.opisEtapu(w, e.tempo) });
    pytanie(0);
  }

  function pytanie(nr) {
    const e = etapy[indeks];
    const krok = e.pytania[nr];
    let proby = 0;
    let rozwiazane = false;
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Etap ${indeks + 1} z ${etapy.length}: pytanie ${nr + 1} z ${e.pytania.length}`),
      h('p', { class: 'dosw__pytanie' }, krok.pytanie),
      h(
        'div',
        { class: 'dosw__opcje' },
        D.kolejnoscOpcji(krok, wymieszaj).map((i) => h('button', { type: 'button', class: 'dosw__opcja', 'data-opcja': String(i), onclick: (ev) => odpowiedz(i, ev.currentTarget) }, krok.opcje[i].tekst)),
      ),
    );

    function odpowiedz(i, b) {
      if (rozwiazane) return;
      proby += 1;
      const r = D.ocenOpcje(krok, i);
      if (!r.dobrze) {
        b.dataset.stan = 'zle';
        b.disabled = true;
        komunikat.pokaz({ rodzaj: 'zle', tytul: 'To nie ta odpowiedź.', tekst: r.tekst });
        return;
      }
      rozwiazane = true;
      b.dataset.stan = 'dobrze';
      for (const x of panel.querySelectorAll('.dosw__opcja')) x.disabled = true;
      wyniki.push({ karta: krok.karta ?? null, odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Tak.', tekst: r.tekst });
      const ostatniePytanie = nr === e.pytania.length - 1;
      const ostatniEtap = indeks === etapy.length - 1;
      dalej.textContent = ostatniePytanie && ostatniEtap ? 'Gotowe' : 'Dalej';
      dalej.hidden = false;
      dalej.onclick = () => {
        dalej.hidden = true;
        if (!ostatniePytanie) return pytanie(nr + 1);
        if (!ostatniEtap) {
          indeks += 1;
          return pokazEtap();
        }
        korzen.classList.add('zadanie--gotowe');
        const karty = wyniki.filter((x) => x.karta);
        onKoniec?.({ poprawne: wyniki.filter((x) => x.odRazu).length, wszystkie: wyniki.length, karty });
      };
    }
  }
}

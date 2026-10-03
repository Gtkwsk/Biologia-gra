// Mechanika „Trawienie jako rozbiórka” (SPEC.md, sekcja 3.2, świat 5).
//
// TRESCI.md, sekcja 2.5: pokarm zawiera związki złożone (cukry, białka, tłuszcze); organizm może je
// wykorzystać dopiero po rozłożeniu na związki proste. Ten rozkład zachodzi podczas trawienia.
// Sekcje 2.1 i 2.5: trawienie umożliwiają enzymy trawienne.
// Gracz bierze enzymy trawienne i „rozbiera” trzy budowle z klocków: każda rozpada się na
// pojedyncze klocki (związki proste). Potem odpowiada na pytania (jak w doświadczeniu).
//
// zadanie.zwiazki: lista id spośród cukry, bialka, tluszcze (kolejność na tacy),
// zadanie.pytania: [krok] (doswiadczenie-logika.js).
// Wynik: rozłożenie wszystkich związków (jedna pozycja) i pytania z odpowiedzią dobrą od razu.

import { h, s } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj } from './podpisywanie-logika.js';
import * as D from './doswiadczenie-logika.js';

// Budowle: klocki { x, y, ksztalt } w układzie 0-120 i wiązania między kolejnymi klockami.
export const BUDOWLE = {
  cukry: {
    nazwa: 'cukry',
    kolor: '#F5C451',
    kontur: '#8C6A0C',
    ksztalt: 'szesciokat',
    klocki: [
      [20, 30],
      [44, 30],
      [68, 30],
      [92, 30],
      [32, 52],
      [56, 52],
      [80, 52],
    ],
  },
  bialka: {
    nazwa: 'białka',
    kolor: '#E07A9A',
    kontur: '#8E1F4A',
    ksztalt: 'kolo',
    klocki: [
      [18, 24],
      [40, 20],
      [62, 26],
      [82, 38],
      [70, 58],
      [48, 62],
      [26, 56],
    ],
  },
  tluszcze: {
    nazwa: 'tłuszcze',
    kolor: '#F2D06B',
    kontur: '#9C7A00',
    ksztalt: 'kwadrat',
    klocki: [
      [20, 20],
      [20, 42],
      [20, 64],
      [44, 20],
      [68, 20],
      [44, 42],
      [68, 42],
      [44, 64],
      [68, 64],
    ],
  },
};

// Pozycje „rozrzuconych” klocków (związki proste) w tym samym układzie.
function rozrzut(i) {
  const kolumny = 4;
  return [16 + (i % kolumny) * 28, 92 + Math.floor(i / kolumny) * 20];
}

function klocek(ksztalt, x, y, kolor, kontur) {
  if (ksztalt === 'kolo') return s('circle', { cx: x, cy: y, r: 9, fill: kolor, stroke: kontur, 'stroke-width': 2.5 });
  if (ksztalt === 'kwadrat') return s('rect', { x: x - 8, y: y - 8, width: 16, height: 16, rx: 3, fill: kolor, stroke: kontur, 'stroke-width': 2.5 });
  const pkt = Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k + Math.PI / 6;
    return `${(x + 10 * Math.cos(a)).toFixed(1)},${(y + 10 * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  return s('polygon', { points: pkt, fill: kolor, stroke: kontur, 'stroke-width': 2.5, 'stroke-linejoin': 'round' });
}

function budowla(id) {
  const b = BUDOWLE[id];
  const wiazania = s(
    'g',
    { class: 'rozbiorka__wiazania', stroke: '#11191B', 'stroke-width': 3, 'stroke-linecap': 'round' },
    b.klocki.slice(1).map(([x, y], i) => s('line', { x1: b.klocki[i][0], y1: b.klocki[i][1], x2: x, y2: y })),
  );
  const klocki = b.klocki.map(([x, y], i) => {
    const g = s('g', { class: 'rozbiorka__klocek' }, [klocek(b.ksztalt, x, y, b.kolor, b.kontur)]);
    const [nx, ny] = rozrzut(i);
    g.style.setProperty('--dx', `${nx - x}px`);
    g.style.setProperty('--dy', `${ny - y}px`);
    g.style.setProperty('--obrot', `${(i % 2 ? 1 : -1) * (12 + i * 5)}deg`);
    return g;
  });
  const svg = s('svg', { class: 'rozbiorka__svg', viewBox: '0 0 120 140', 'aria-hidden': 'true' }, [
    s('path', { d: 'M8 84 H112', stroke: '#C9D3CB', 'stroke-width': 2, 'stroke-dasharray': '5 4' }),
    wiazania,
    ...klocki,
  ]);
  return svg;
}

export function utworzRozbiorke(kontener, { zadanie, onKoniec }) {
  const komunikat = utworzKomunikat();
  const wyniki = [];
  const rozlozone = new Set();
  let enzymWziety = false;
  let bledy = 0;

  const enzym = h('button', { type: 'button', class: 'rozbiorka__enzym', 'aria-pressed': 'false', onclick: wezEnzym }, [
    rysunekKarty('enzymy', 'rozbiorka__ikona'),
    h('span', {}, 'Enzymy trawienne'),
  ]);
  const przyciski = new Map();
  const tace = zadanie.zwiazki.map((id) => {
    const przycisk = h('button', { type: 'button', class: 'rozbiorka__taca', 'data-zwiazek': id, 'aria-label': `Złożony związek z pokarmu: ${BUDOWLE[id].nazwa}`, onclick: () => rozloz(id) }, [
      budowla(id),
      h('span', { class: 'rozbiorka__podpis' }, [h('strong', {}, BUDOWLE[id].nazwa), h('span', { class: 'rozbiorka__stan' }, 'związek złożony')]),
    ]);
    przyciski.set(id, przycisk);
    return przycisk;
  });
  const panel = h('section', { class: 'lab__panel', 'aria-live': 'polite' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie rozbiorka' }, [
    h('div', { class: 'rozbiorka__stol' }, [h('div', { class: 'rozbiorka__narzedzia' }, [enzym]), h('div', { class: 'rozbiorka__tace' }, tace)]),
    panel,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);
  panel.replaceChildren(h('p', { class: 'lab__polecenie' }, 'Pokarm zawiera związki złożone. Weź enzymy trawienne i rozłóż każdy związek na tacy.'));
  komunikat.pokaz({ rodzaj: 'info', tytul: 'Rozbiórka w przewodzie pokarmowym.', tekst: 'Stuknij „Enzymy trawienne”, a potem związek na tacy.' });

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function wezEnzym() {
    if (rozlozone.size === zadanie.zwiazki.length) return;
    enzymWziety = !enzymWziety;
    enzym.setAttribute('aria-pressed', String(enzymWziety));
    if (enzymWziety) komunikat.pokaz({ rodzaj: 'info', tytul: 'Masz enzymy trawienne.', tekst: 'Stuknij związek złożony na tacy.' });
  }

  function rozloz(id) {
    if (rozlozone.has(id)) return;
    if (!enzymWziety) {
      bledy += 1;
      komunikat.pokaz({ rodzaj: 'zle', tytul: 'Sam związek się nie rozpadnie.', tekst: 'Rozkład związków z pokarmu umożliwiają enzymy trawienne. Najpierw stuknij „Enzymy trawienne”.' });
      return;
    }
    rozlozone.add(id);
    const p = przyciski.get(id);
    p.classList.add('rozbiorka__taca--rozlozona');
    p.disabled = true;
    p.querySelector('.rozbiorka__stan').textContent = 'związki proste';
    p.setAttribute('aria-label', `${BUDOWLE[id].nazwa}: rozłożone na związki proste`);
    if (rozlozone.size < zadanie.zwiazki.length) {
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Tak: ${BUDOWLE[id].nazwa} rozłożone.`, tekst: 'Złożony związek rozpadł się na związki proste. Zostały jeszcze inne związki.' });
      return;
    }
    enzymWziety = false;
    enzym.setAttribute('aria-pressed', 'false');
    enzym.disabled = true;
    wyniki.push({ karta: 'trawienie', odRazu: bledy === 0, poprawnie: true });
    komunikat.pokaz({
      rodzaj: 'dobrze',
      tytul: 'Wszystko rozłożone.',
      tekst: 'Cukry, białka i tłuszcze z pokarmu to związki złożone. Organizm może je wykorzystać dopiero po rozłożeniu na związki proste. Ten rozkład to trawienie.',
    });
    dalej.textContent = 'Dalej';
    dalej.hidden = false;
    dalej.onclick = () => pytanie(0);
  }

  function pytanie(nr) {
    dalej.hidden = true;
    const krok = zadanie.pytania[nr];
    let proby = 0;
    let rozwiazane = false;
    const opcje = D.kolejnoscOpcji(krok, wymieszaj).map((i) =>
      h('button', { type: 'button', class: 'dosw__opcja', 'data-opcja': String(i), onclick: (e) => odpowiedz(i, e.currentTarget) }, krok.opcje[i].tekst),
    );
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Pytanie ${nr + 1} z ${zadanie.pytania.length}`),
      h('p', { class: 'dosw__pytanie' }, krok.pytanie),
      h('div', { class: 'dosw__opcje' }, opcje),
    );
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Wybierz odpowiedź.', tekst: 'Stuknij jedną z odpowiedzi.' });

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
      for (const x of opcje) x.disabled = true;
      wyniki.push({ karta: krok.karta ?? null, odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Tak.', tekst: r.tekst });
      const ostatnie = nr === zadanie.pytania.length - 1;
      dalej.textContent = ostatnie ? 'Gotowe' : 'Dalej';
      dalej.hidden = false;
      dalej.onclick = () => {
        if (!ostatnie) return pytanie(nr + 1);
        dalej.hidden = true;
        korzen.classList.add('zadanie--gotowe');
        const karty = wyniki.filter((w) => w.karta);
        onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty });
      };
    }
  }
}

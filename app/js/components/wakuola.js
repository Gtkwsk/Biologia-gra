// Mechanika „Woda w wakuoli” (SPEC.md, sekcja 3.2, świat 3).
//
// Suwak podlewania: przy małej ilości wody wakuola w komórce liścia jest mała, a roślina więdnie;
// po podlaniu wakuola się powiększa, a roślina prostuje. Scena opiera się na ciekawostce
// z TRESCI.md, sekcja 6 (balon w pudełku), pokazanej z oznaczeniem „Ciekawostka”.
// Pytania po doświadczeniu dotyczą faktów z TRESCI.md, sekcja 2.3 (wakuola i ściana komórkowa).

import { h, s } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj, zWielkiej } from './podpisywanie-logika.js';

const CIEKAWOSTKA =
  'Wakuola pełna wody i ściana komórkowa działają jak balon napompowany w kartonowym pudełku: dlatego podlana roślina się prostuje, a bez wody więdnie.';
const PROG_PODLANIA = 0.8;
const START = 0.12;

const lerp = (a, b, t) => a + (b - a) * t;
const punkt = (p0, p1, p2, t) => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
];
const kat = (p0, p1, p2, t) => {
  const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};
const kolor = (a, b, t) => {
  const c = (x, i) => parseInt(x.slice(1 + 2 * i, 3 + 2 * i), 16);
  return `#${[0, 1, 2].map((i) => Math.round(lerp(c(a, i), c(b, i), t)).toString(16).padStart(2, '0')).join('')}`;
};

// Roślina w doniczce: łodyga i liście opadają, gdy brakuje wody.
function scenaRosliny() {
  const lodyga = s('path', { fill: 'none', stroke: '#2E6B33', 'stroke-width': 7, 'stroke-linecap': 'round' });
  const liscie = [0.42, 0.62, 0.86, 1].map(() =>
    s('path', { d: 'M0 0 C10 -12 34 -12 46 0 C34 12 10 12 0 0Z', stroke: '#1F5A32', 'stroke-width': 2.5 }),
  );
  const gleba = s('rect', { x: 66, y: 194, width: 108, height: 12, rx: 4 });
  const svg = s('svg', { class: 'wakuola__roslina', viewBox: '0 0 240 260', role: 'img', 'aria-label': 'Roślina w doniczce' }, [
    lodyga,
    ...liscie,
    s('path', { d: 'M72 202 H168 L158 252 H82 Z', fill: '#B57A50', stroke: '#11191B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('rect', { x: 62, y: 192, width: 116, height: 16, rx: 4, fill: '#C98B5E', stroke: '#11191B', 'stroke-width': 3 }),
    gleba,
  ]);
  const ustaw = (w) => {
    const u = 1 - w;
    const p0 = [120, 196];
    const p1 = [lerp(118, 124, u), lerp(118, 70, u)];
    const p2 = [lerp(120, 186, u), lerp(34, 160, u)];
    lodyga.setAttribute('d', `M${p0[0]} ${p0[1]} Q${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
    // Liście: w górę, gdy roślina ma wodę; zwisają, gdy więdnie. Kąty bezwzględne (0° w prawo, 90° w dół).
    const strony = [-1, 1, -1, 0];
    liscie.forEach((lisc, i) => {
      const t = [0.42, 0.62, 0.86, 1][i];
      const [x, y] = punkt(p0, p1, p2, t);
      let obrot = kat(p0, p1, p2, t);
      if (strony[i] < 0) obrot = lerp(-150, 118, u);
      if (strony[i] > 0) obrot = lerp(-28, 62, u);
      const skala = strony[i] === 0 ? 0.7 : 1;
      lisc.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${obrot.toFixed(1)}) scale(${skala})`);
      lisc.setAttribute('fill', kolor('#3C9A47', '#9DB45E', u));
    });
    gleba.setAttribute('fill', kolor('#4A3222', '#C9A37A', u));
  };
  return { svg, ustaw };
}

// Komórka liścia: ściana komórkowa, błona, cytozol, jądro, chloroplasty i duża wakuola.
function scenaKomorki() {
  const wakuola = s('ellipse', { cx: 125, cy: 100, fill: '#D7F0F7', stroke: '#2F7F99', 'stroke-width': 3 });
  const napis = s('text', { x: 125, y: 104, 'text-anchor': 'middle', class: 'wakuola__napis' }, 'wakuola');
  const chloroplasty = [
    [95, 38, 0],
    [160, 38, 0],
    [200, 70, 90],
    [200, 130, 90],
    [160, 162, 0],
    [95, 162, 0],
    [40, 130, 90],
  ].map(([x, y, r]) => s('ellipse', { cx: x, cy: y, rx: 10, ry: 5.5, transform: `rotate(${r} ${x} ${y})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.5 }));
  const svg = s('svg', { class: 'wakuola__komorka', viewBox: '0 0 240 200', role: 'img', 'aria-label': 'Komórka liścia z dużą wakuolą' }, [
    s('rect', { x: 16, y: 16, width: 208, height: 168, rx: 12, fill: '#D9E4B4', stroke: '#55702A', 'stroke-width': 3 }),
    s('rect', { x: 28, y: 28, width: 184, height: 144, rx: 8, fill: '#F3FAEC', stroke: '#9E3B5B', 'stroke-width': 2.5 }),
    ...chloroplasty,
    s('ellipse', { cx: 48, cy: 48, rx: 13, ry: 12, fill: '#D6C4EE', stroke: '#4E3684', 'stroke-width': 2.5 }),
    wakuola,
    napis,
  ]);
  const ustaw = (w) => {
    wakuola.setAttribute('rx', lerp(34, 80, w).toFixed(1));
    wakuola.setAttribute('ry', lerp(24, 58, w).toFixed(1));
  };
  return { svg, ustaw };
}

export function utworzWakuole(kontener, { zadanie, katalog, onKoniec }) {
  const roslina = scenaRosliny();
  const komorka = scenaKomorki();
  const komunikat = utworzKomunikat();
  const pytania = zadanie.pytania;
  const wyniki = [];
  let podlana = false;
  let indeks = -1;
  let proby = 0;
  let zakonczone = false;

  const stan = h('p', { class: 'wakuola__stan', 'aria-live': 'polite' });
  const suwak = h('input', {
    type: 'range',
    min: '0',
    max: '100',
    value: String(Math.round(START * 100)),
    class: 'wakuola__suwak',
    id: 'suwak-wody',
    'aria-valuetext': 'mało wody',
  });
  const pytanieEl = h('div', { class: 'wakuola__pytanie', hidden: true });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true, onclick: nastepne }, 'Następne pytanie');
  const korzen = h('div', { class: 'zadanie wakuola' }, [
    h('div', { class: 'wakuola__scena' }, [
      h('figure', { class: 'wakuola__panel' }, [roslina.svg, h('figcaption', {}, 'Roślina na parapecie')]),
      h('figure', { class: 'wakuola__panel' }, [komorka.svg, h('figcaption', {}, 'Komórka jej liścia')]),
    ]),
    h('div', { class: 'wakuola__sterowanie' }, [
      h('label', { for: 'suwak-wody', class: 'wakuola__etykieta' }, 'Woda w glebie'),
      h('div', { class: 'wakuola__skala' }, [h('span', {}, 'sucho'), suwak, h('span', {}, 'mokro')]),
      stan,
    ]),
    h('aside', { class: 'ciekawostka wakuola__ciekawostka' }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, CIEKAWOSTKA)]),
    pytanieEl,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  suwak.addEventListener('input', () => ustaw(Number(suwak.value) / 100));
  kontener.append(korzen);
  ustaw(START);
  komunikat.pokaz({ rodzaj: 'info', tytul: 'Podlej roślinę.', tekst: 'Przesuń suwak w prawo i obserwuj roślinę oraz wakuolę w komórce liścia.' });

  function ustaw(w) {
    roslina.ustaw(w);
    komorka.ustaw(w);
    const opis = w < 0.35 ? 'Mało wody: roślina więdnie.' : w < 0.7 ? 'Trochę wody: roślina zaczyna się podnosić.' : 'Dużo wody: roślina stoi prosto.';
    stan.textContent = opis;
    suwak.setAttribute('aria-valuetext', opis);
    if (!podlana && w >= PROG_PODLANIA) {
      podlana = true;
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Roślina się wyprostowała.', tekst: 'Wakuola w komórce liścia jest teraz duża. Odpowiedz na pytania pod sceną.' });
      nastepne();
    }
  }

  function nastepne() {
    if (indeks === pytania.length - 1) return zakoncz();
    indeks += 1;
    proby = 0;
    dalej.hidden = true;
    const p = pytania[indeks];
    pytanieEl.hidden = false;
    pytanieEl.replaceChildren(
      h('p', { class: 'wakuola__licznik' }, `Pytanie ${indeks + 1} z ${pytania.length}`),
      h('p', { class: 'wakuola__tresc' }, p.pytanie),
      h(
        'div',
        { class: 'wakuola__opcje' },
        wymieszaj(p.opcje).map((id) =>
          h('button', { type: 'button', class: 'przycisk przycisk--jasny wakuola__opcja', 'data-karta': id, onclick: (e) => odpowiedz(id, e.currentTarget) }, [
            rysunekKarty(id, 'etykieta__rysunek'),
            h('span', {}, katalog.get(id).nazwa),
          ]),
        ),
      ),
    );
    if (indeks > 0) komunikat.pokaz({ rodzaj: 'info', tytul: 'Następne pytanie.', tekst: 'Wybierz element komórki.' });
  }

  function odpowiedz(id, przycisk) {
    if (zakonczone || !dalej.hidden) return;
    const p = pytania[indeks];
    proby += 1;
    if (id === p.poprawna) {
      wyniki.push({ karta: id, odRazu: proby === 1, poprawnie: true });
      przycisk.dataset.stan = 'dobrze';
      for (const b of pytanieEl.querySelectorAll('.wakuola__opcja')) b.disabled = true;
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Tak: ${katalog.get(id).nazwa}.`, tekst: p.wyjasnienie });
      dalej.textContent = indeks === pytania.length - 1 ? 'Gotowe' : 'Następne pytanie';
      dalej.hidden = false;
      return;
    }
    przycisk.dataset.stan = 'zle';
    przycisk.disabled = true;
    const k = katalog.get(id);
    komunikat.pokaz({ rodzaj: 'zle', tytul: `To nie ${k.nazwa}.`, tekst: k.zdanie ?? `${zWielkiej(k.nazwa)} to ${k.opis}.` });
  }

  function zakoncz() {
    zakonczone = true;
    dalej.hidden = true;
    korzen.classList.add('zadanie--gotowe');
    onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki });
  }

  return {
    zniszcz() {
      korzen.remove();
    },
  };
}


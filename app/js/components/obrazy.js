// Sceny „przez okular”: widoki preparatów pod mikroskopem, rysowane w kodzie (bez zdjęć).
// Zgodnie z TRESCI.md, sekcja 2.2: przy powiększeniu około 400 razy widać błonę komórkową,
// cytoplazmę i jądro komórkowe; sekcja 2.3: w komórkach liścia moczarki widać chloroplasty.

import { s } from '../core/dom.js';

// Prosty generator liczb pseudolosowych z ziarnem: ten sam preparat wygląda zawsze tak samo.
function generator(ziarno) {
  let a = ziarno >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let licznikId = 0;

function okular(zawartosc, tlo, opis) {
  const id = `okular-${++licznikId}`;
  return s('svg', { class: 'scena', viewBox: '0 0 300 300', role: 'img', 'aria-label': opis }, [
    s('defs', {}, s('clipPath', { id }, s('circle', { cx: 150, cy: 150, r: 138 }))),
    s('circle', { cx: 150, cy: 150, r: 138, fill: tlo }),
    s('g', { 'clip-path': `url(#${id})` }, zawartosc),
    s('circle', { cx: 150, cy: 150, r: 140, fill: 'none', stroke: '#11191B', 'stroke-width': 14 }),
    s('circle', { cx: 150, cy: 150, r: 131, fill: 'none', stroke: '#5A6B6E', 'stroke-width': 3 }),
  ]);
}

function wielokat(cx, cy, r, los) {
  const n = 7;
  const punkty = [];
  for (let i = 0; i < n; i++) {
    const kat = (i / n) * Math.PI * 2 + los() * 0.5;
    const rr = r * (0.75 + los() * 0.4);
    punkty.push(`${(cx + Math.cos(kat) * rr).toFixed(1)},${(cy + Math.sin(kat) * rr).toFixed(1)}`);
  }
  return punkty.join(' ');
}

// Płaskie komórki nabłonka jamy ustnej, każda z jądrem (barwione).
function nablonek400() {
  const los = generator(7);
  const srodki = [
    [92, 96],
    [182, 84],
    [228, 168],
    [140, 168],
    [70, 196],
    [168, 244],
    [96, 268],
    [250, 250],
  ];
  const komorki = srodki.map(([cx, cy]) => {
    const r = 46 + los() * 14;
    const dx = (los() - 0.5) * 14;
    const dy = (los() - 0.5) * 14;
    return s('g', { 'data-element': 'komorka' }, [
      s('polygon', { points: wielokat(cx, cy, r, los), fill: '#F3D3DF', 'fill-opacity': 0.92, stroke: '#B57990', 'stroke-width': 2.2 }),
      s('ellipse', { cx: cx + dx, cy: cy + dy, rx: 9 + los() * 3, ry: 7 + los() * 3, fill: '#7E5BB5', 'fill-opacity': 0.85, stroke: '#4E3684', 'stroke-width': 1.5 }),
    ]);
  });
  return okular(komorki, '#FBF6F8', 'Komórki nabłonka jamy ustnej pod mikroskopem, powiększenie około 400 razy');
}

// Komórki liścia moczarki: ściany jak cegły w murze, chloroplasty przy ścianach.
export function chloroplastyMoczarki(los = generator(11)) {
  const komorki = [];
  const szer = 58;
  const wys = 34;
  for (let w = 0; w < 10; w++) {
    for (let k = 0; k < 7; k++) {
      const x = -20 + k * szer + (w % 2 ? szer / 2 : 0);
      const y = -10 + w * wys;
      const chloroplasty = [];
      const ile = 9;
      for (let i = 0; i < ile; i++) {
        chloroplasty.push({ t: i / ile + los() * 0.05, rx: 4.2, ry: 2.8 });
      }
      komorki.push({ x, y, szer, wys, chloroplasty });
    }
  }
  return komorki;
}

// Punkt na obwodzie prostokąta (t od 0 do 1), odsunięty do środka.
export function punktObwodu(k, t, odstep = 6) {
  const w = k.szer - 2 * odstep;
  const hgt = k.wys - 2 * odstep;
  const obw = 2 * (w + hgt);
  let d = (((t % 1) + 1) % 1) * obw;
  const x0 = k.x + odstep;
  const y0 = k.y + odstep;
  if (d < w) return [x0 + d, y0, 0];
  d -= w;
  if (d < hgt) return [x0 + w, y0 + d, 90];
  d -= hgt;
  if (d < w) return [x0 + w - d, y0 + hgt, 0];
  d -= w;
  return [x0, y0 + hgt - d, 90];
}

function moczarka400() {
  const komorki = chloroplastyMoczarki();
  const zawartosc = komorki.map((k) =>
    s('g', {}, [
      s('rect', { x: k.x, y: k.y, width: k.szer, height: k.wys, fill: '#EAF6E0', stroke: '#5E8A3A', 'stroke-width': 2.6 }),
      ...k.chloroplasty.map((c) => {
        const [x, y, kat] = punktObwodu(k, c.t);
        return s('ellipse', { class: 'chloroplast-moczarki', cx: x, cy: y, rx: c.rx, ry: c.ry, transform: `rotate(${kat} ${x} ${y})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1 });
      }),
    ]),
  );
  return okular(zawartosc, '#F4FBEF', 'Komórki liścia moczarki kanadyjskiej pod mikroskopem, powiększenie około 400 razy');
}

// Lupa: komórek nie widać, są za małe.
function lupaPoliczek() {
  const los = generator(3);
  const plamy = Array.from({ length: 14 }, () =>
    s('circle', { cx: 20 + los() * 260, cy: 20 + los() * 260, r: 18 + los() * 30, fill: '#EBC2CF', 'fill-opacity': 0.35 }),
  );
  return okular(s('g', { class: 'scena__rozmyta' }, plamy), '#F8E4EA', 'Widok przez lupę: komórek nie widać');
}

function lupaLisc() {
  const los = generator(5);
  const plamy = Array.from({ length: 14 }, () =>
    s('circle', { cx: 20 + los() * 260, cy: 20 + los() * 260, r: 18 + los() * 30, fill: '#9CCB86', 'fill-opacity': 0.35 }),
  );
  return okular(s('g', { class: 'scena__rozmyta' }, plamy), '#DDEFD2', 'Widok przez lupę: komórek nie widać');
}

const SCENY = {
  'nablonek-400': nablonek400,
  'moczarka-400': moczarka400,
  'nablonek-lupa': lupaPoliczek,
  'moczarka-lupa': lupaLisc,
};

export const ID_SCEN = Object.keys(SCENY);

export function obrazSceny(id) {
  return SCENY[id]?.() ?? null;
}

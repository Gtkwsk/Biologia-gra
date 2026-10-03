// Sceny doświadczeń i procesów (światy 4 i 6): rysunki własne w SVG, bez zdjęć.
// Każda scena pokazuje tylko to, co wynika z TRESCI.md (sekcje 2.4 i 2.6), np. w wodzie
// gazowanej moczarka wydziela więcej pęcherzyków tlenu niż w wodzie z kranu, w ciemności
// nie wydziela ich wcale, a woda wapienna mętnieje tylko w zestawie z drożdżami.
//
// scenaProcesu(id) → { el, pokaz(kategoria) }: pokaz ożywia część sceny przypisaną do
// kategorii (szybki sorter); sceny doświadczeń jej nie używają.

import { s } from '../core/dom.js';

const KONTUR = '#11191B';

function svg(viewBox, opis, dzieci, klasa = '') {
  return s('svg', { class: `scena-procesu ${klasa}`.trim(), viewBox, role: 'img', 'aria-label': opis }, dzieci);
}

function napis(x, y, tekst, klasa = 'scena-procesu__napis') {
  return s('text', { x, y, 'text-anchor': 'middle', class: klasa }, tekst);
}

function znakProby(x, y, litera) {
  return s('g', { class: 'scena-procesu__proba' }, [
    s('circle', { cx: x, cy: y, r: 15, fill: '#FFFFFF', stroke: KONTUR, 'stroke-width': 3 }),
    s('text', { x, y: y + 6, 'text-anchor': 'middle', class: 'scena-procesu__litera' }, litera),
  ]);
}

// Pęcherzyki unoszące się od (x, y) do powierzchni wody; ile: liczba jednocześnie widocznych.
function babelki(x, y, wysokosc, ile, { czas = 2.4, kolor = '#FFFFFF', obrys = '#2F7F99', r = 4 } = {}) {
  const g = s('g', { class: 'babelki' });
  for (let i = 0; i < ile; i++) {
    const b = s('circle', { class: 'babelek', cx: x + ((i * 7) % 11) - 5, cy: y, r: r - (i % 2), fill: kolor, stroke: obrys, 'stroke-width': 1.6 });
    b.style.setProperty('--droga', `${-wysokosc}px`);
    b.style.setProperty('--czas', `${czas}s`);
    b.style.setProperty('--opoznienie', `${(-czas * i) / ile}s`);
    g.append(b);
  }
  return g;
}

// Gałązka moczarki kanadyjskiej: łodyga z okółkami drobnych liści.
function galazka(x, yDol, wysokosc) {
  const g = s('g', { class: 'galazka' }, [s('path', { d: `M${x} ${yDol} C${x - 4} ${yDol - wysokosc / 2} ${x + 4} ${yDol - wysokosc * 0.7} ${x} ${yDol - wysokosc}`, fill: 'none', stroke: '#2E6B33', 'stroke-width': 3.5, 'stroke-linecap': 'round' })]);
  for (let i = 1; i <= 5; i++) {
    const y = yDol - (wysokosc * i) / 5.6;
    g.append(
      s('ellipse', { cx: x - 8, cy: y, rx: 9, ry: 3, transform: `rotate(22 ${x - 8} ${y})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.4 }),
      s('ellipse', { cx: x + 8, cy: y - 3, rx: 9, ry: 3, transform: `rotate(-22 ${x + 8} ${y - 3})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.4 }),
    );
  }
  return g;
}

// Szklanka z wodą; zwraca grupę i współrzędne dna i powierzchni wody.
function szklanka(x, y, szer, wys, { gazowana = false } = {}) {
  const woda = y + 22;
  const g = s('g', { class: 'szklanka' }, [
    s('path', { d: `M${x} ${y} H${x + szer} L${x + szer - 8} ${y + wys} H${x + 8} Z`, fill: '#EEF7FB', stroke: KONTUR, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: `M${x + 2.5} ${woda} H${x + szer - 2.5} L${x + szer - 9} ${y + wys - 2} H${x + 9} Z`, fill: '#CFE8F3' }),
    s('path', { d: `M${x + 2.5} ${woda} H${x + szer - 2.5}`, stroke: '#5DA9D6', 'stroke-width': 2.5 }),
  ]);
  if (gazowana) {
    for (let i = 0; i < 14; i++) {
      g.append(s('circle', { cx: x + 14 + ((i * 37) % (szer - 28)), cy: woda + 12 + ((i * 23) % (wys - 40)), r: 1.6, fill: '#FFFFFF', stroke: '#5DA9D6', 'stroke-width': 0.8 }));
    }
  }
  return { g, woda, dno: y + wys };
}

function slonce(x, y, r = 16) {
  const promienie = [];
  for (let i = 0; i < 8; i++) {
    const k = (i * Math.PI) / 4;
    promienie.push(`M${(x + Math.cos(k) * (r + 5)).toFixed(1)} ${(y + Math.sin(k) * (r + 5)).toFixed(1)} L${(x + Math.cos(k) * (r + 12)).toFixed(1)} ${(y + Math.sin(k) * (r + 12)).toFixed(1)}`);
  }
  return s('g', { class: 'slonce' }, [
    s('path', { d: promienie.join(' '), stroke: '#9C6B00', 'stroke-width': 3, 'stroke-linecap': 'round' }),
    s('circle', { cx: x, cy: y, r, fill: '#F5B800', stroke: '#9C6B00', 'stroke-width': 3 }),
  ]);
}

function parapet() {
  return [s('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#F4F6F1' }), s('rect', { x: 0, y: 206, width: 400, height: 34, fill: '#D9C4A3', stroke: KONTUR, 'stroke-width': 2 })];
}

// ---------- Doświadczenia ----------

// Moczarka w wodzie gazowanej (A) i w wodzie z kranu (B), obie na słonecznym parapecie.
function moczarkaCo2() {
  const a = szklanka(60, 70, 110, 136, { gazowana: true });
  const b = szklanka(230, 70, 110, 136);
  return svg('0 0 400 240', 'Dwie gałązki moczarki: w szklance A woda gazowana i dużo pęcherzyków, w szklance B woda z kranu i mniej pęcherzyków', [
    ...parapet(),
    slonce(200, 30),
    a.g,
    galazka(115, 196, 76),
    babelki(115, 122, 30, 7, { czas: 1.6 }),
    b.g,
    galazka(285, 196, 76),
    babelki(285, 122, 30, 3, { czas: 2.6 }),
    znakProby(48, 64, 'A'),
    znakProby(218, 64, 'B'),
    napis(115, 228, 'woda gazowana'),
    napis(285, 228, 'woda z kranu'),
  ]);
}

// Moczarka w świetle (A) i w ciemnej szafce (B).
function moczarkaSwiatlo() {
  const a = szklanka(50, 70, 110, 136);
  const b = szklanka(240, 70, 110, 136);
  return svg('0 0 400 240', 'Dwie gałązki moczarki: A w świetle wydziela pęcherzyki, B w ciemnej szafce nie wydziela ich wcale', [
    ...parapet(),
    slonce(40, 30),
    a.g,
    galazka(105, 196, 76),
    babelki(105, 122, 30, 5, { czas: 2 }),
    s('rect', { x: 222, y: 40, width: 146, height: 172, rx: 6, fill: '#2B2F3A', stroke: KONTUR, 'stroke-width': 3 }),
    b.g,
    galazka(295, 196, 76),
    s('rect', { x: 222, y: 40, width: 146, height: 172, rx: 6, fill: '#11191B', opacity: 0.45 }),
    znakProby(40, 64, 'A'),
    znakProby(230, 64, 'B'),
    napis(105, 228, 'w świetle'),
    napis(295, 228, 'w ciemnej szafce'),
  ]);
}

// Zestaw: słoik z wodą i cukrem (z drożdżami albo bez) połączony rurką ze słoikiem z wodą wapienną.
function zestawWapienny(x, { drozdze }) {
  const g = s('g', { class: 'zestaw' }, [
    s('rect', { x, y: 92, width: 74, height: 112, rx: 8, fill: '#EEF7FB', stroke: KONTUR, 'stroke-width': 3 }),
    s('rect', { x: x + 3, y: 116, width: 68, height: 85, rx: 6, fill: '#F7EBC9' }),
    s('rect', { x: x - 3, y: 84, width: 80, height: 12, rx: 3, fill: '#8C6A0C', stroke: KONTUR, 'stroke-width': 2.5 }),
    s('rect', { x: x + 98, y: 122, width: 60, height: 82, rx: 8, fill: '#EEF7FB', stroke: KONTUR, 'stroke-width': 3 }),
    s('rect', { x: x + 101, y: 138, width: 54, height: 63, rx: 6, fill: drozdze ? '#ECEDEA' : '#DDF1F8' }),
    s('path', { d: `M${x + 37} 84 V60 H${x + 128} V176`, fill: 'none', stroke: '#5A6B6E', 'stroke-width': 5, 'stroke-linejoin': 'round' }),
  ]);
  if (drozdze) {
    for (let i = 0; i < 9; i++) g.append(s('ellipse', { cx: x + 14 + ((i * 19) % 48), cy: 150 + ((i * 13) % 40), rx: 4, ry: 3, fill: '#FBF3E4', stroke: '#8A6A3A', 'stroke-width': 1.5 }));
    g.append(babelki(x + 37, 116, 20, 4, { czas: 2.2, kolor: '#E9ECEC', obrys: '#5A6B6E' }));
    for (let i = 0; i < 12; i++) g.append(s('circle', { cx: x + 108 + ((i * 17) % 42), cy: 146 + ((i * 11) % 50), r: 2.2, fill: '#C9CFD1' }));
  }
  return g;
}

function wodaWapienna() {
  return svg('0 0 400 240', 'Zestaw A z drożdżami: woda wapienna zmętniała. Zestaw B bez drożdży: woda wapienna przejrzysta', [
    s('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#F4F6F1' }),
    s('rect', { x: 0, y: 204, width: 400, height: 36, fill: '#D9C4A3', stroke: KONTUR, 'stroke-width': 2 }),
    zestawWapienny(16, { drozdze: true }),
    zestawWapienny(214, { drozdze: false }),
    znakProby(22, 40, 'A'),
    znakProby(220, 40, 'B'),
    napis(53, 226, 'cukier i drożdże'),
    napis(143, 226, 'woda wapienna'),
    napis(251, 226, 'cukier, bez drożdży'),
    napis(341, 226, 'woda wapienna'),
  ]);
}

function szklarnia(x, { co2 }) {
  const g = s('g', { class: 'szklarnia' }, [
    s('path', { d: `M${x} 200 V96 L${x + 75} 46 L${x + 150} 96 V200 Z`, fill: '#EEF7FB', stroke: KONTUR, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: `M${x + 75} 46 V200 M${x} 96 H${x + 150}`, stroke: '#9FB7C2', 'stroke-width': 2 }),
    s('rect', { x: x + 8, y: 188, width: 134, height: 12, fill: '#6E5644' }),
  ]);
  const wys = co2 ? 92 : 56;
  for (const dx of [32, 75, 118]) {
    const px = x + dx;
    g.append(s('path', { d: `M${px} 188 V${188 - wys}`, stroke: '#2E6B33', 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
    for (let i = 1; i <= (co2 ? 4 : 2); i++) {
      const y = 188 - (wys * i) / (co2 ? 4.6 : 2.6);
      g.append(
        s('ellipse', { cx: px - 9, cy: y, rx: 9, ry: 4.5, transform: `rotate(25 ${px - 9} ${y})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.5 }),
        s('ellipse', { cx: px + 9, cy: y - 4, rx: 9, ry: 4.5, transform: `rotate(-25 ${px + 9} ${y - 4})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.5 }),
      );
    }
    if (co2) g.append(s('circle', { cx: px + 6, cy: 188 - wys / 2, r: 5, fill: '#E0525B', stroke: '#8E1F2A', 'stroke-width': 1.5 }));
  }
  if (co2) {
    g.append(
      s('rect', { x: x + 120, y: 128, width: 20, height: 58, rx: 8, fill: '#9FA9AC', stroke: KONTUR, 'stroke-width': 2.5 }),
      s('rect', { x: x + 126, y: 120, width: 8, height: 10, fill: '#5A6B6E', stroke: KONTUR, 'stroke-width': 2 }),
    );
  }
  return g;
}

function szklarnieCo2() {
  return svg('0 0 400 240', 'Szklarnia A z dodatkowym dwutlenkiem węgla: rośliny większe. Szklarnia B bez dodatku: rośliny mniejsze', [
    s('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#F4F6F1' }),
    s('rect', { x: 0, y: 200, width: 400, height: 40, fill: '#9BB08A' }),
    slonce(200, 28),
    szklarnia(26, { co2: true }),
    szklarnia(224, { co2: false }),
    znakProby(26, 40, 'A'),
    znakProby(224, 40, 'B'),
    napis(101, 226, 'więcej dwutlenku węgla'),
    napis(299, 226, 'zwykłe powietrze'),
  ]);
}

// Dno oceanu: źródło gorącej wody z gazami wulkanicznymi, wokół bakterie. Światło tu nie dociera.
function dnoOceanu() {
  const bakterie = s('g', { class: 'dno__bakterie' });
  const miejsca = [
    [118, 168], [134, 182], [270, 170], [254, 186], [96, 190], [292, 192], [150, 150], [238, 150],
  ];
  for (const [x, y] of miejsca) bakterie.append(s('rect', { x: x - 7, y: y - 3, width: 14, height: 6, rx: 3, fill: '#E87A9A', stroke: '#7A2440', 'stroke-width': 1.5 }));
  const robak = (x, wys) =>
    s('g', { class: 'dno__robak' }, [
      s('rect', { x: x - 5, y: 214 - wys, width: 10, height: wys, rx: 4, fill: '#F4F2EA', stroke: '#8C8A80', 'stroke-width': 2 }),
      s('path', { d: `M${x} ${214 - wys} c-8 -8 -10 -18 -4 -22 M${x} ${214 - wys} c8 -8 10 -18 4 -22 M${x} ${214 - wys} v-24`, fill: 'none', stroke: '#D7263D', 'stroke-width': 4, 'stroke-linecap': 'round' }),
    ]);
  return svg('0 0 400 240', 'Dno oceanu w ciemności: z komina na dnie wydobywa się gorąca woda z gazami wulkanicznymi, wokół żyją bakterie', [
    s('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#14203A' }),
    s('path', { d: 'M0 214 Q100 200 200 210 T400 206 V240 H0Z', fill: '#3B3330' }),
    s('path', { d: 'M168 214 L180 110 H220 L232 214Z', fill: '#5B4A3E', stroke: '#2A211B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M200 108 C186 90 214 76 198 58 C188 46 206 34 196 16', fill: 'none', stroke: '#F0A35E', 'stroke-width': 9, 'stroke-linecap': 'round', class: 'dno__dym' }),
    robak(66, 70),
    robak(330, 84),
    robak(352, 56),
    bakterie,
    napis(200, 232, 'brak światła', 'scena-procesu__napis scena-procesu__napis--jasny'),
  ]);
}

// ---------- Sceny szybkiego sortera ----------

// Trzy drogi glukozy: słonecznik (źródło energii), truskawka (budowa ciała), ziemniak (materiał zapasowy).
function drogiGlukozy() {
  const kwiat = s('g', { class: 'drogi__kwiat' }, [
    ...Array.from({ length: 8 }, (_, i) =>
      s('ellipse', { cx: 70, cy: 58, rx: 6, ry: 12, transform: `rotate(${i * 45} 70 74)`, fill: '#F5B800', stroke: '#9C6B00', 'stroke-width': 2 }),
    ),
    s('circle', { cx: 70, cy: 74, r: 11, fill: '#6B4423', stroke: '#3B2614', 'stroke-width': 2.5 }),
  ]);
  const owoce = [
    [196, 150], [222, 156], [210, 132],
  ].map(([x, y]) =>
    s('path', { class: 'drogi__owoc', d: `M${x} ${y + 14} C${x - 10} ${y + 8} ${x - 12} ${y - 4} ${x - 6} ${y - 8} C${x - 2} ${y - 10} ${x + 2} ${y - 10} ${x + 6} ${y - 8} C${x + 12} ${y - 4} ${x + 10} ${y + 8} ${x} ${y + 14}Z`, fill: '#E0525B', stroke: '#8E1F2A', 'stroke-width': 2 }),
  );
  const bulwy = [
    [310, 208, 20, 13], [348, 214, 17, 11], [328, 226, 15, 9],
  ].map(([x, y, rx, ry]) => s('ellipse', { class: 'drogi__bulwa', cx: x, cy: y, rx, ry, fill: '#D9B27A', stroke: '#7A5530', 'stroke-width': 2.5 }));
  const grupa = (kategoria, dzieci) => s('g', { class: 'drogi__droga', 'data-kategoria': kategoria }, dzieci);
  const el = svg('0 0 400 240', 'Trzy rośliny: słonecznik, truskawka i ziemniak', [
    s('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#FFF8DC' }),
    s('rect', { x: 0, y: 186, width: 400, height: 54, fill: '#8A6A4A' }),
    slonce(30, 28, 12),
    grupa('energia', [
      s('path', { d: 'M70 186 V86', stroke: '#2E6B33', 'stroke-width': 5, 'stroke-linecap': 'round' }),
      s('path', { d: 'M70 150 C56 150 48 142 46 132 C58 132 68 140 70 150Z', fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 2 }),
      kwiat,
      napis(70, 206, 'słonecznik', 'scena-procesu__napis scena-procesu__napis--jasny'),
    ]),
    grupa('budowa', [
      s('path', { d: 'M210 186 C206 160 196 150 200 120 M210 186 C214 166 226 160 222 140', fill: 'none', stroke: '#2E6B33', 'stroke-width': 4, 'stroke-linecap': 'round' }),
      ...[[188, 112], [232, 128], [204, 98]].map(([x, y]) => s('ellipse', { cx: x, cy: y, rx: 13, ry: 8, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 2 })),
      ...owoce,
      napis(210, 206, 'truskawka', 'scena-procesu__napis scena-procesu__napis--jasny'),
    ]),
    grupa('zapas', [
      s('path', { d: 'M330 186 V118', stroke: '#2E6B33', 'stroke-width': 4, 'stroke-linecap': 'round' }),
      ...[[316, 132], [344, 120], [320, 108], [342, 146]].map(([x, y]) => s('ellipse', { cx: x, cy: y, rx: 12, ry: 7, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 2 })),
      s('path', { d: 'M330 186 C326 196 318 200 312 204 M330 186 C336 198 344 204 348 208', fill: 'none', stroke: '#C9B79A', 'stroke-width': 2.5 }),
      ...bulwy,
      napis(386, 176, 'ziemniak', 'scena-procesu__napis'),
    ]),
  ]);
  const etapy = { energia: 0, budowa: 0, zapas: 0 };
  // Na starcie widać po jednym owocu i jednej bulwie; kolejne pojawiają się z dobrymi odpowiedziami.
  owoce.forEach((o, i) => o.classList.toggle('drogi--ukryte', i > 0));
  bulwy.forEach((b, i) => b.classList.toggle('drogi--ukryte', i > 0));
  return {
    el,
    pokaz(kategoria) {
      etapy[kategoria] = (etapy[kategoria] ?? 0) + 1;
      const g = el.querySelector(`[data-kategoria="${kategoria}"]`);
      if (!g) return;
      if (kategoria === 'energia') kwiat.style.setProperty('--obrot', `${Math.min(etapy.energia * 12, 36)}deg`);
      if (kategoria === 'budowa') owoce[Math.min(etapy.budowa, owoce.length - 1)].classList.remove('drogi--ukryte');
      if (kategoria === 'zapas') bulwy[Math.min(etapy.zapas, bulwy.length - 1)].classList.remove('drogi--ukryte');
      g.classList.remove('drogi__droga--ozywiona');
      void g.getBoundingClientRect();
      g.classList.add('drogi__droga--ozywiona');
    },
  };
}

// Dzień i noc: słońce i księżyc nad liściem.
function dzienNoc() {
  const grupa = (kategoria, dzieci) => s('g', { class: 'drogi__droga', 'data-kategoria': kategoria }, dzieci);
  const el = svg('0 0 400 160', 'Liść w dzień i w nocy', [
    s('rect', { x: 0, y: 0, width: 200, height: 160, fill: '#FFF3C4' }),
    s('rect', { x: 200, y: 0, width: 200, height: 160, fill: '#1E2236' }),
    grupa('dzien', [slonce(100, 46, 18), napis(100, 146, 'dzień')]),
    grupa('noc', [
      s('path', { d: 'M318 26 A24 24 0 1 0 318 74 A18 18 0 1 1 318 26Z', fill: '#F4F6F1', stroke: '#AFB8C9', 'stroke-width': 2 }),
      ...[[248, 30], [372, 48], [262, 84], [356, 110]].map(([x, y]) => s('circle', { cx: x, cy: y, r: 2.2, fill: '#F4F6F1' })),
      napis(300, 146, 'noc', 'scena-procesu__napis scena-procesu__napis--jasny'),
    ]),
    grupa('oba', [
      s('path', { d: 'M150 120 C150 90 180 70 250 66 C250 100 220 122 150 120Z', fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
      s('path', { d: 'M150 120 C180 104 210 90 246 70', fill: 'none', stroke: '#1F5A32', 'stroke-width': 2.5 }),
    ]),
  ]);
  return {
    el,
    pokaz(kategoria) {
      const g = el.querySelector(`[data-kategoria="${kategoria}"]`);
      if (!g) return;
      g.classList.remove('drogi__droga--ozywiona');
      void g.getBoundingClientRect();
      g.classList.add('drogi__droga--ozywiona');
    },
  };
}

// Ciasto w misce: rośnie, gdy drożdże wytwarzają dwutlenek węgla (TRESCI.md, sekcja 2.6:
// dwutlenek węgla z fermentacji drożdży spulchnia ciasto).
function ciasto() {
  const pecherzyki = s(
    'g',
    { class: 'ciasto__pecherzyki' },
    [[170, 120], [196, 104], [222, 124], [244, 108], [186, 138], [232, 142], [208, 96], [258, 128]].map(([x, y], i) =>
      s('circle', { cx: x, cy: y, r: 4 + (i % 3), fill: '#FFF8E8', stroke: '#C9A86A', 'stroke-width': 1.5 }),
    ),
  );
  const masa = s('g', { class: 'ciasto__masa' }, [
    s('path', { d: 'M120 150 C120 112 160 92 210 92 C260 92 300 112 300 150 Z', fill: '#F3DDB0', stroke: '#B9852A', 'stroke-width': 3 }),
    pecherzyki,
  ]);
  const el = svg('0 0 420 220', 'Miska z ciastem drożdżowym', [
    s('rect', { x: 0, y: 0, width: 420, height: 220, fill: '#FFF8DC' }),
    s('rect', { x: 0, y: 188, width: 420, height: 32, fill: '#D9C4A3', stroke: KONTUR, 'stroke-width': 2 }),
    masa,
    s('path', { d: 'M100 146 H320 C316 176 290 192 210 192 C130 192 104 176 100 146 Z', fill: '#C98B5E', stroke: KONTUR, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M96 146 H324', stroke: KONTUR, 'stroke-width': 4, 'stroke-linecap': 'round' }),
  ]);
  return {
    el,
    pokaz(kategoria) {
      if (kategoria === 'wyrasta') el.classList.add('ciasto--wyrosniete');
    },
  };
}

const STATYCZNE = {
  'moczarka-co2': moczarkaCo2,
  'moczarka-swiatlo': moczarkaSwiatlo,
  'woda-wapienna': wodaWapienna,
  'szklarnie-co2': szklarnieCo2,
  'dno-oceanu': dnoOceanu,
};

const OZYWIANE = {
  'drogi-glukozy': drogiGlukozy,
  'dzien-noc': dzienNoc,
  ciasto,
};

export const ID_SCEN_PROCESOW = [...Object.keys(STATYCZNE), ...Object.keys(OZYWIANE)];

// Kategorie, które ożywiają sceny szybkiego sortera (walidator sprawdza zgodność z zadaniem).
export const KATEGORIE_SCEN = {
  'drogi-glukozy': ['energia', 'budowa', 'zapas'],
  'dzien-noc': ['dzien', 'noc', 'oba'],
  ciasto: ['wyrasta'],
};

export function scenaProcesu(id) {
  if (OZYWIANE[id]) return OZYWIANE[id]();
  if (STATYCZNE[id]) return { el: STATYCZNE[id](), pokaz() {} };
  return null;
}

// Sceny laboratorium fotosyntezy: akwarium z moczarką (licznik pęcherzyków tlenu) i roślina
// w szklarni (miernik intensywności). Rysunki własne w SVG; stan sceny ustawia funkcja ustaw.

import { s } from '../core/dom.js';
import * as F from './fotosynteza-logika.js';

const KONTUR = '#11191B';

function lampa(x, y) {
  const promienie = s('g', { class: 'lab__promienie' }, [
    s('path', { d: `M${x - 26} ${y + 22} L${x - 70} ${y + 90} M${x} ${y + 26} V${y + 100} M${x + 26} ${y + 22} L${x + 70} ${y + 90}`, stroke: '#F5B800', 'stroke-width': 6, 'stroke-linecap': 'round' }),
  ]);
  const zarowka = s('circle', { cx: x, cy: y + 14, r: 12, fill: '#F5B800', stroke: '#9C6B00', 'stroke-width': 2.5 });
  const g = s('g', { class: 'lab__lampa' }, [
    promienie,
    s('path', { d: `M${x - 34} ${y + 12} L${x - 20} ${y - 14} H${x + 20} L${x + 34} ${y + 12} Z`, fill: '#5A6B6E', stroke: KONTUR, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    zarowka,
    s('path', { d: `M${x} ${y - 14} V${y - 40}`, stroke: KONTUR, 'stroke-width': 3 }),
  ]);
  return {
    g,
    ustaw(poziom) {
      const jasnosc = [0, 0.3, 0.6, 1, 1][poziom];
      promienie.setAttribute('opacity', String(jasnosc));
      promienie.setAttribute('stroke-width', poziom === 4 ? '10' : '6');
      zarowka.setAttribute('fill', poziom === 0 ? '#5A6B6E' : poziom === 4 ? '#FFF3A0' : '#F5B800');
    },
  };
}

function termometr(x, y) {
  const slupek = s('rect', { x: x - 3, width: 6, rx: 3, fill: '#D7263D' });
  return {
    g: s('g', { class: 'lab__termometr' }, [
      s('rect', { x: x - 7, y, width: 14, height: 90, rx: 7, fill: '#FFFFFF', stroke: KONTUR, 'stroke-width': 2.5 }),
      slupek,
      s('circle', { cx: x, cy: y + 94, r: 11, fill: '#D7263D', stroke: KONTUR, 'stroke-width': 2.5 }),
    ]),
    ustaw(poziom) {
      const wys = [12, 28, 46, 64, 82][poziom];
      slupek.setAttribute('y', String(y + 90 - wys));
      slupek.setAttribute('height', String(wys + 4));
    },
  };
}

function nawoz(x, y) {
  const kropki = Array.from({ length: 8 }, (_, i) =>
    s('circle', { cx: x - 14 + (i % 4) * 9, cy: y + 36 + Math.floor(i / 4) * 9, r: 3, fill: '#6B4FA0' }),
  );
  return {
    g: s('g', { class: 'lab__nawoz' }, [
      s('rect', { x: x - 22, y: y + 22, width: 44, height: 34, rx: 4, fill: '#E7DDF5', stroke: KONTUR, 'stroke-width': 2.5 }),
      ...kropki,
    ]),
    ustaw(poziom) {
      const ile = [0, 2, 4, 6, 8][poziom];
      kropki.forEach((k, i) => k.setAttribute('opacity', i < ile ? '1' : '0'));
    },
  };
}

// Akwarium z moczarką: lampa, termometr, butla z dwutlenkiem węgla, nawóz, pęcherzyki tlenu.
export function scenaAkwarium() {
  const swiatlo = lampa(180, 30);
  const temp = termometr(318, 40);
  const sole = nawoz(318, 150);
  const gazy = s('g', { class: 'lab__gaz' });
  for (let i = 0; i < 16; i++) gazy.append(s('circle', { cx: 74 + ((i * 41) % 200), cy: 120 + ((i * 29) % 90), r: 1.8, fill: '#FFFFFF', stroke: '#5DA9D6', 'stroke-width': 0.8 }));
  const babelki = s('g', { class: 'lab__babelki' });
  const zrodla = [130, 180, 230];
  for (let i = 0; i < 12; i++) {
    const b = s('circle', { class: 'babelek', cx: zrodla[i % 3] + ((i * 5) % 9) - 4, cy: 140, r: 4, fill: '#FFFFFF', stroke: '#2F7F99', 'stroke-width': 1.6 });
    b.style.setProperty('--droga', '-46px');
    babelki.append(b);
  }
  const galazki = s('g', { class: 'lab__galazki' });
  for (const x of zrodla) {
    galazki.append(s('path', { d: `M${x} 222 C${x - 4} 196 ${x + 4} 170 ${x} 142`, fill: 'none', stroke: '#2E6B33', 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
    for (let k = 1; k <= 4; k++) {
      const y = 222 - k * 18;
      galazki.append(
        s('ellipse', { cx: x - 8, cy: y, rx: 9, ry: 3, transform: `rotate(22 ${x - 8} ${y})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.3 }),
        s('ellipse', { cx: x + 8, cy: y - 3, rx: 9, ry: 3, transform: `rotate(-22 ${x + 8} ${y - 3})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.3 }),
      );
    }
  }
  const el = s('svg', { class: 'lab__scena', viewBox: '0 0 360 260', role: 'img', 'aria-label': 'Akwarium z gałązkami moczarki kanadyjskiej pod lampą' }, [
    s('rect', { x: 0, y: 0, width: 360, height: 260, fill: '#F4F6F1' }),
    swiatlo.g,
    s('rect', { x: 56, y: 92, width: 230, height: 140, rx: 6, fill: '#EEF7FB', stroke: KONTUR, 'stroke-width': 3 }),
    s('rect', { x: 59, y: 112, width: 224, height: 117, fill: '#CFE8F3' }),
    s('path', { d: 'M59 112 H283', stroke: '#5DA9D6', 'stroke-width': 2.5 }),
    gazy,
    s('rect', { x: 59, y: 218, width: 224, height: 11, fill: '#C9B79A' }),
    galazki,
    babelki,
    s('rect', { x: 0, y: 232, width: 360, height: 28, fill: '#D9C4A3', stroke: KONTUR, 'stroke-width': 2 }),
    temp.g,
    sole.g,
  ]);
  return {
    el,
    ustaw(u) {
      const pelne = F.ustawieniaPelne(u);
      swiatlo.ustaw(pelne.swiatlo);
      temp.ustaw(pelne.temperatura);
      sole.ustaw(pelne.sole);
      const gestosc = [0, 4, 8, 12, 16][pelne.dwutlenek];
      [...gazy.children].forEach((c, i) => c.setAttribute('opacity', i < gestosc ? '1' : '0'));
      const ile = Math.round((F.pecherzyki(u) / F.MAKS_PECHERZYKOW) * 12);
      const czas = ile ? Math.max(1.1, 3.6 - ile * 0.2) : 3;
      [...babelki.children].forEach((b, i) => {
        b.classList.toggle('babelek--ukryty', i >= ile);
        b.style.setProperty('--czas', `${czas}s`);
        b.style.setProperty('--opoznienie', `${(-czas * i) / Math.max(ile, 1)}s`);
      });
    },
  };
}

// Roślina w szklarni: lampa, termometr, butla z dwutlenkiem węgla, nawóz, wilgotność gleby.
// Wysokość rośliny i kolor liści pokazują intensywność fotosyntezy.
export function scenaSzklarni() {
  const swiatlo = lampa(170, 26);
  const temp = termometr(318, 40);
  const sole = nawoz(318, 150);
  const gleba = s('rect', { x: 120, y: 198, width: 100, height: 14, rx: 3 });
  const kaluza = s('rect', { x: 122, y: 192, width: 96, height: 8, rx: 3, fill: '#5DA9D6' });
  const butla = s('g', { class: 'lab__butla' }, [
    s('rect', { x: 34, y: 150, width: 26, height: 70, rx: 10, fill: '#9FA9AC', stroke: KONTUR, 'stroke-width': 2.5 }),
    s('rect', { x: 41, y: 140, width: 12, height: 12, fill: '#5A6B6E', stroke: KONTUR, 'stroke-width': 2 }),
  ]);
  const chmurka = s('g', { class: 'lab__chmurka' }, [
    s('circle', { cx: 74, cy: 132, r: 9, fill: '#C9CFD1', stroke: '#5A6B6E', 'stroke-width': 1.5 }),
    s('circle', { cx: 88, cy: 122, r: 7, fill: '#C9CFD1', stroke: '#5A6B6E', 'stroke-width': 1.5 }),
  ]);
  const roslina = s('g', { class: 'lab__roslina' }, [
    s('path', { d: 'M170 198 V110', stroke: '#2E6B33', 'stroke-width': 6, 'stroke-linecap': 'round' }),
    ...[[150, 176, 25], [190, 160, -25], [150, 140, 25], [190, 124, -25], [170, 106, 0]].map(([x, y, r]) =>
      s('ellipse', { class: 'lab__lisc', cx: x, cy: y, rx: 18, ry: 8, transform: `rotate(${r} ${x} ${y})`, stroke: '#1F5A32', 'stroke-width': 2 }),
    ),
  ]);
  const el = s('svg', { class: 'lab__scena', viewBox: '0 0 360 260', role: 'img', 'aria-label': 'Roślina w doniczce w szklarni pod lampą' }, [
    s('rect', { x: 0, y: 0, width: 360, height: 260, fill: '#F4F6F1' }),
    s('path', { d: 'M20 232 V96 L180 40 L340 96 V232', fill: '#EEF7FB', stroke: '#9FB7C2', 'stroke-width': 3 }),
    swiatlo.g,
    roslina,
    s('path', { d: 'M122 200 H218 L208 236 H132 Z', fill: '#B57A50', stroke: KONTUR, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    gleba,
    kaluza,
    butla,
    chmurka,
    s('rect', { x: 0, y: 232, width: 360, height: 28, fill: '#D9C4A3', stroke: KONTUR, 'stroke-width': 2 }),
    temp.g,
    sole.g,
  ]);
  return {
    el,
    ustaw(u) {
      swiatlo.ustaw(u.swiatlo);
      temp.ustaw(u.temperatura);
      sole.ustaw(u.sole);
      gleba.setAttribute('fill', ['#E3CFA6', '#B98F5E', '#6E4B2E', '#4A3222', '#3B2A1E'][u.woda]);
      kaluza.setAttribute('opacity', u.woda === 4 ? '1' : '0');
      chmurka.setAttribute('opacity', String([0, 0.3, 0.6, 1, 1][u.dwutlenek]));
      const i = F.intensywnosc(u);
      roslina.style.setProperty('--wzrost', String(0.55 + 0.45 * i));
      for (const l of roslina.querySelectorAll('.lab__lisc')) l.setAttribute('fill', i >= 0.7 ? '#3C9A47' : i >= 0.4 ? '#7DAE4F' : '#B5B865');
    },
  };
}

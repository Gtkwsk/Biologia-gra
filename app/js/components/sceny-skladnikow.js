// Sceny przypadków w mechanice „Ratuj organizm” (świat 1). Rysunki własne (SPEC.md, sekcja 6.2).
// Każda scena ma stan „przed” i „po” (klasa diag__scena--po na elemencie <svg>): po wskazaniu
// składnika i jego funkcji widać skutek, np. liście znów zielone (TRESCI.md, sekcja 2.1).

import { s } from '../core/dom.js';

const RYSUNKI = {
  // Mało magnezu → mniej chlorofilu, żółknięcie liści.
  liscie: () => [
    s('path', { d: 'M70 126 H130 L122 98 H78 Z', fill: '#C2563A', stroke: '#7A2E1A', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M100 98 V40', stroke: '#2E6B33', 'stroke-width': 4, 'stroke-linecap': 'round' }),
    ...[
      'M100 84 C84 82 70 72 66 60 C82 60 96 70 100 84 Z',
      'M100 72 C116 70 130 60 134 48 C118 48 104 58 100 72 Z',
      'M100 58 C86 56 76 46 74 36 C88 36 98 46 100 58 Z',
      'M100 46 C112 44 122 34 124 26 C112 26 102 34 100 46 Z',
    ].map((d) => s('path', { d, class: 'diag__lisc', stroke: '#5E5A12', 'stroke-width': 2.5, 'stroke-linejoin': 'round' })),
  ],
  // Mało wapnia → słabsze kości, które łatwiej się łamią.
  kosci: () => [
    s('path', {
      d: 'M44 58 C36 50 24 54 26 64 C18 66 18 78 28 80 C26 90 38 94 44 86 L156 86 C162 94 174 90 172 80 C182 78 182 66 174 64 C176 54 164 50 156 58 Z',
      class: 'diag__kosc',
      stroke: '#8C7A55',
      'stroke-width': 3,
      'stroke-linejoin': 'round',
    }),
    s('path', { d: 'M98 58 L92 68 L104 74 L96 86', class: 'diag__peknienie', fill: 'none', stroke: '#11191B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
  ],
  // Upał → pot; parowanie potu ochładza organizm.
  upal: () => [
    s('circle', { cx: 40, cy: 30, r: 16, fill: '#F5B800', stroke: '#9C6B00', 'stroke-width': 3 }),
    s('circle', { cx: 110, cy: 76, r: 34, class: 'diag__twarz', stroke: '#8C4A12', 'stroke-width': 3 }),
    s('g', { fill: '#11191B' }, [s('circle', { cx: 98, cy: 70, r: 3.5 }), s('circle', { cx: 122, cy: 70, r: 3.5 })]),
    s('path', { d: 'M98 88 Q110 96 122 88', fill: 'none', stroke: '#11191B', 'stroke-width': 3, 'stroke-linecap': 'round' }),
    s('g', { class: 'diag__krople', fill: '#5DA9D6', stroke: '#2F6F94', 'stroke-width': 1.5 }, [
      s('path', { d: 'M80 58 C80 58 74 66 74 70 C74 74 77 76 80 76 C83 76 86 74 86 70 C86 66 80 58 80 58 Z' }),
      s('path', { d: 'M140 62 C140 62 134 70 134 74 C134 78 137 80 140 80 C143 80 146 78 146 74 C146 70 140 62 140 62 Z' }),
    ]),
    s('g', { class: 'diag__para', fill: 'none', stroke: '#9FC6DC', 'stroke-width': 3, 'stroke-linecap': 'round' }, [
      s('path', { d: 'M80 52 C74 44 86 38 80 30' }),
      s('path', { d: 'M140 56 C134 48 146 42 140 34' }),
    ]),
  ],
  // Foka w lodowatej wodzie → warstwa tłuszczu pod skórą chroni przed zimnem.
  foka: () => [
    s('rect', { x: 0, y: 92, width: 200, height: 48, fill: '#7FB8D6' }),
    s('path', { d: 'M20 96 L60 86 L120 88 L176 96 Z', fill: '#F4F9FB', stroke: '#9FC6DC', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M40 86 C40 62 70 50 104 54 C130 56 150 66 158 82 L166 74 L170 86 L156 90 C120 94 70 94 40 86 Z', fill: '#8E9AA3', stroke: '#4E5A62', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M52 82 C56 66 76 58 102 60 C124 62 140 70 148 82', class: 'diag__tluszcz', fill: 'none', 'stroke-width': 7, 'stroke-linecap': 'round' }),
    s('circle', { cx: 60, cy: 66, r: 3, fill: '#11191B' }),
    s('g', { class: 'diag__zimno', fill: 'none', stroke: '#2F6F94', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, [
      s('path', { d: 'M24 30 L34 40 M34 30 L24 40 M29 26 V44 M20 35 H38' }),
      s('path', { d: 'M164 24 L174 34 M174 24 L164 34 M169 20 V38 M160 29 H178' }),
    ]),
  ],
  // Stary, kiełkujący ziemniak mięknie: młoda roślina zużywa skrobię (ciekawostka, TRESCI.md, sekcja 6).
  ziemniak: () => [
    s('path', { d: 'M40 86 C34 62 58 46 92 48 C130 50 160 62 160 86 C160 108 128 118 96 116 C62 114 44 104 40 86 Z', fill: '#D9B26A', stroke: '#8C6A2E', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M60 70 C66 74 70 72 74 68 M110 96 C116 100 122 98 126 94 M86 104 C90 100 94 100 98 104', fill: 'none', stroke: '#8C6A2E', 'stroke-width': 2, 'stroke-linecap': 'round' }),
    s('path', { d: 'M138 56 C144 40 150 32 160 26 M144 44 C152 42 158 44 164 40', fill: 'none', stroke: '#6FA34E', 'stroke-width': 4, 'stroke-linecap': 'round' }),
    s('g', { class: 'diag__skrobia', fill: '#FFFFFF', stroke: '#B9A57A', 'stroke-width': 1.5 }, [
      s('ellipse', { cx: 76, cy: 86, rx: 6, ry: 4 }),
      s('ellipse', { cx: 96, cy: 76, rx: 6, ry: 4 }),
      s('ellipse', { cx: 112, cy: 88, rx: 6, ry: 4 }),
      s('ellipse', { cx: 92, cy: 96, rx: 6, ry: 4 }),
      s('ellipse', { cx: 126, cy: 74, rx: 6, ry: 4 }),
    ]),
    s('path', { d: 'M110 80 C122 70 132 62 140 56', class: 'diag__droga', fill: 'none', stroke: '#2457A6', 'stroke-width': 3, 'stroke-dasharray': '6 4' }),
  ],
  // Usuwanie zbędnych i szkodliwych substancji razem z wodą (np. z moczem).
  usuwanie: () => [
    s('ellipse', { cx: 86, cy: 72, rx: 60, ry: 44, fill: '#FDEBEF', stroke: '#9E3B5B', 'stroke-width': 3.5 }),
    s('g', { class: 'diag__smieci', fill: '#5A4A3A' }, [
      s('rect', { x: 62, y: 58, width: 8, height: 8, rx: 2 }),
      s('rect', { x: 92, y: 80, width: 8, height: 8, rx: 2 }),
      s('rect', { x: 104, y: 56, width: 8, height: 8, rx: 2 }),
      s('rect', { x: 74, y: 86, width: 8, height: 8, rx: 2 }),
    ]),
    s('g', { class: 'diag__odplyw' }, [
      s('path', { d: 'M140 78 C156 80 166 90 170 104 C176 120 184 126 194 128', fill: 'none', stroke: '#5DA9D6', 'stroke-width': 10, 'stroke-linecap': 'round' }),
      s('g', { fill: '#5A4A3A' }, [s('rect', { x: 160, y: 92, width: 7, height: 7, rx: 2 }), s('rect', { x: 176, y: 116, width: 7, height: 7, rx: 2 })]),
    ]),
  ],
};

export const ID_SCEN_SKLADNIKOW = Object.keys(RYSUNKI);

export function scenaSkladnika(id, opis) {
  return s('svg', { class: `diag__scena diag__scena--${id}`, viewBox: '0 0 200 140', role: 'img', 'aria-label': opis }, RYSUNKI[id]());
}

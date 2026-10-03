// Tworzenie elementów DOM i ikon SVG.

export const SVG_NS = 'http://www.w3.org/2000/svg';

function ustaw(el, atrybuty) {
  for (const [k, v] of Object.entries(atrybuty)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.setAttribute('class', v);
    else if (k === 'tekst') el.textContent = v;
    else if (k === 'dane') Object.assign(el.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
}

function dolacz(el, dzieci) {
  for (const d of [].concat(dzieci)) {
    if (d === null || d === undefined || d === false) continue;
    el.append(d instanceof Node ? d : String(d));
  }
}

export function h(tag, atrybuty = {}, dzieci = []) {
  const el = document.createElement(tag);
  ustaw(el, atrybuty);
  dolacz(el, dzieci);
  return el;
}

export function s(tag, atrybuty = {}, dzieci = []) {
  const el = document.createElementNS(SVG_NS, tag);
  ustaw(el, atrybuty);
  dolacz(el, dzieci);
  return el;
}

const IKONY = {
  dobrze: [['path', { d: 'M5 12.5l4.5 4.5L19 7.5' }]],
  zle: [
    ['path', { d: 'M6.5 6.5l11 11' }],
    ['path', { d: 'M17.5 6.5l-11 11' }],
  ],
  wstecz: [['path', { d: 'M14.5 5.5L8 12l6.5 6.5' }]],
  dalej: [['path', { d: 'M9.5 5.5L16 12l-6.5 6.5' }]],
  info: [
    ['path', { d: 'M12 11v6' }],
    ['path', { d: 'M12 7.2v.1' }],
  ],
};

export function ikona(nazwa, klasa = 'ikona') {
  return s(
    'svg',
    {
      class: klasa,
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
      focusable: 'false',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '3.2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    (IKONY[nazwa] || []).map(([tag, at]) => s(tag, at)),
  );
}

export function wyczysc(el) {
  while (el.firstChild) el.firstChild.remove();
}

export function ograniczRuch() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

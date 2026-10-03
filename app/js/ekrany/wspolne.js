// Elementy wspólne ekranów: pasek górny, soczewka świata, miernik ostrości, powiadomienia.

import { h, ikona } from '../core/dom.js';

// Sceny w soczewkach światów: rysunki własne, viewBox 0 0 100 100.
const SCENY = {
  1: `<rect width="100" height="100" fill="#E6ECEF"/>
    <g stroke="#2E2050" stroke-width="2.5" stroke-linejoin="round">
      <rect x="17" y="53" width="27" height="27" rx="3" fill="#6B4FA0"/>
      <rect x="47" y="53" width="27" height="27" rx="3" fill="#8C73C4"/>
      <rect x="32" y="23" width="27" height="27" rx="3" fill="#B9A6E3"/>
      <rect x="64" y="25" width="22" height="22" rx="3" fill="#6B4FA0" transform="rotate(12 75 36)"/>
    </g>
    <g font-family="Titan One, sans-serif" font-size="19" text-anchor="middle" fill="#fff">
      <text x="30.5" y="73.5">C</text><text x="60.5" y="73.5">H</text>
      <text x="45.5" y="43.5" fill="#2E2050">O</text>
      <text x="75" y="42.5" font-size="15" transform="rotate(12 75 36)">N</text>
    </g>`,
  2: `<rect width="100" height="100" fill="#1E2236"/>
    <path d="M50 13 C73 12 89 30 88 51 C87 73 70 88 49 87 C27 86 12 70 13 49 C14 28 29 14 50 13Z" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="3"/>
    <ellipse cx="45" cy="49" rx="15" ry="13" fill="#D6C4EE" stroke="#4E3684" stroke-width="2.5"/>
    <g fill="#F7B267" stroke="#8F4A0C" stroke-width="2">
      <ellipse rx="9" ry="4.5" transform="translate(71 41) rotate(70)"/>
      <ellipse rx="8" ry="4" transform="translate(37 74) rotate(-15)"/>
    </g>
    <g fill="#F2B33D"><circle cx="66" cy="66" r="2.6"/><circle cx="27" cy="36" r="2.6"/><circle cx="58" cy="76" r="2.6"/><circle cx="76" cy="58" r="2.6"/><circle cx="57" cy="24" r="2.6"/></g>`,
  3: `<rect width="100" height="100" fill="#E4EFE2"/>
    <rect x="15" y="19" width="70" height="62" rx="8" fill="#F2F7EC" stroke="#4F6B2E" stroke-width="5"/>
    <rect x="35" y="35" width="31" height="30" rx="10" fill="#D7F0F7" stroke="#2F7F99" stroke-width="2"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="1.8">
      <ellipse cx="27" cy="32" rx="6.5" ry="4"/><ellipse cx="73" cy="33" rx="6.5" ry="4"/>
      <ellipse cx="26" cy="67" rx="6.5" ry="4"/><ellipse cx="74" cy="68" rx="6.5" ry="4"/>
      <ellipse cx="51" cy="27" rx="6.5" ry="4"/><ellipse cx="50" cy="73" rx="6.5" ry="4"/>
    </g>`,
  4: `<rect width="100" height="100" fill="#FFF3C4"/>
    <g stroke="#9C6B00" stroke-width="3" stroke-linecap="round">
      <path d="M33 9v8M33 51v8M8 34h8M50 34h8M15 16l6 6M45 46l6 6M15 52l6-6M45 22l6-6"/>
    </g>
    <circle cx="33" cy="34" r="13" fill="#F5B800" stroke="#9C6B00" stroke-width="3"/>
    <path d="M40 86 C38 62 56 44 86 40 C88 66 70 84 40 86Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <path d="M40 86 C54 70 66 58 82 44" fill="none" stroke="#1F5A32" stroke-width="2.5" stroke-linecap="round"/>`,
  5: `<rect width="100" height="100" fill="#E3E8DC"/>
    <path d="M0 64 L22 42 L38 55 L58 33 L80 54 L100 42 L100 100 L0 100Z" fill="#9BB08A"/>
    <path d="M0 80 L28 62 L52 76 L78 60 L100 72 L100 100 L0 100Z" fill="#5B7A4A"/>
    <g fill="#2F5233"><path d="M70 40 L80 58 L60 58Z"/><path d="M70 48 L83 68 L57 68Z"/><rect x="68" y="68" width="4" height="7"/></g>`,
  6: `<rect width="100" height="100" fill="#1D1416"/>
    <path d="M50 12 C59 29 77 38 75 61 C73 79 61 89 50 89 C38 89 25 79 25 61 C25 46 35 40 38 27 C44 35 47 40 50 12Z" fill="#F05A28"/>
    <path d="M50 44 C55 54 63 58 62 69 C61 79 56 83 50 83 C44 83 38 78 38 70 C38 61 46 58 50 44Z" fill="#FFB000"/>`,
};

function scena(idSwiata) {
  const svg = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${SCENY[idSwiata] ?? ''}</svg>`,
    'image/svg+xml',
  ).documentElement;
  const el = document.importNode(svg, true);
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  return el;
}

// Ostrość obrazu w soczewce rośnie z opanowaniem świata (SPEC.md, sekcja 6.1).
export function soczewka(swiat, { status, opanowanie = 0, rozmiar = 'zwykla' }) {
  const el = h('span', { class: `soczewka soczewka--${rozmiar}`, 'data-swiat': swiat.id, 'data-status': status, 'aria-hidden': 'true' }, [
    h('span', { class: 'soczewka__scena' }, scena(swiat.id)),
    status === 'w-budowie' ? h('span', { class: 'soczewka__tasma' }, 'W budowie') : null,
    status === 'zablokowany' ? h('span', { class: 'soczewka__zaslepka' }, '?') : null,
  ]);
  if (status === 'otwarty' || status === 'pokonany') {
    el.style.setProperty('--rozmycie', `${((1 - opanowanie) * 4).toFixed(2)}px`);
  }
  return el;
}

export function miernikOstrosci(opanowanie) {
  const pelne = Math.round(opanowanie * 5);
  return h('span', { class: 'ostrosc' }, [
    h('span', { class: 'ostrosc__napis' }, 'Ostrość'),
    h(
      'span',
      { class: 'ostrosc__pasek', role: 'img', 'aria-label': `Ostrość ${pelne} z 5` },
      Array.from({ length: 5 }, (_, i) => {
        const klocek = h('span', { class: 'ostrosc__klocek', 'data-pelny': String(i < pelne) });
        klocek.style.setProperty('--i', String(i));
        return klocek;
      }),
    ),
  ]);
}

export function logoSoczewki() {
  return h('span', { class: 'logo__znak', 'aria-hidden': 'true' }, [h('span', { class: 'logo__szklo' })]);
}

export function pasek({ wstecz, tytul, prawa }) {
  return h('header', { class: 'pasek' }, [
    wstecz ? h('a', { class: 'pasek__wstecz', href: wstecz.href }, [ikona('wstecz'), h('span', {}, wstecz.tekst)]) : null,
    tytul ? h('p', { class: 'pasek__tytul' }, tytul) : null,
    prawa ? h('div', { class: 'pasek__prawa' }, prawa) : null,
  ]);
}

export function powiadom(tekst, rodzaj = 'info') {
  const kontener = document.getElementById('powiadomienia');
  if (!kontener) return;
  const el = h('div', { class: `powiadomienie powiadomienie--${rodzaj}`, role: rodzaj === 'blad' ? 'alert' : 'status' }, tekst);
  kontener.append(el);
  setTimeout(() => {
    el.classList.add('powiadomienie--znika');
    setTimeout(() => el.remove(), 400);
  }, 4500);
}

export function potrzasnij(el) {
  el.classList.remove('potrzasniecie');
  void el.getBoundingClientRect();
  el.classList.add('potrzasniecie');
  setTimeout(() => el.classList.remove('potrzasniecie'), 600);
}

// Wywołuje akcję po przytrzymaniu elementu (palcem albo myszą) przez podany czas.
export function przytrzymanie(el, ms, akcja) {
  let licznik = null;
  const anuluj = () => {
    clearTimeout(licznik);
    licznik = null;
  };
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    anuluj();
    licznik = setTimeout(() => {
      licznik = null;
      akcja();
    }, ms);
  });
  for (const zdarzenie of ['pointerup', 'pointerleave', 'pointercancel']) el.addEventListener(zdarzenie, anuluj);
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}

export function ekranNiedostepny(kontener, { tytul, tekst }) {
  kontener.append(
    h('div', { class: 'ekran ekran--komunikat' }, [
      pasek({ wstecz: { tekst: 'Mapa', href: '#/' } }),
      h('div', { class: 'karta-komunikatu' }, [
        h('h1', {}, tytul),
        h('p', {}, tekst),
        h('a', { class: 'przycisk', href: '#/' }, 'Wróć na mapę'),
      ]),
    ]),
  );
}

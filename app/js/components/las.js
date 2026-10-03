// Mechanika „Las bez sprzątaczy” (SPEC.md, sekcja 3.2, świat 5). Model: las-logika.js.
//
// Kolejne etapy: gracz włącza albo wyłącza organizmy odżywiające się szczątkami i przewija lata.
// Scena pokazuje warstwę szczątków, sole mineralne w glebie i wielkość roślin. Po każdym etapie
// pytania (jak w doświadczeniu) dotyczą tylko faktów z TRESCI.md, sekcja 2.5; zwrot soli
// mineralnych do gleby to ciekawostka (sekcja 6), pokazana w ramce „Ciekawostka”.
//
// zadanie.etapy: [{ sprzatacze, lata, polecenie, akcja, pytania: [krok] }] (krok: doswiadczenie-logika.js),
// zadanie.ciekawostka: dosłownie z TRESCI.md, sekcja 6 (pokazywana po pierwszym etapie bez sprzątaczy).
// Wynik: pytania z odpowiedzią dobrą od razu.

import { h, s } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj } from './podpisywanie-logika.js';
import * as D from './doswiadczenie-logika.js';
import * as LS from './las-logika.js';

const ZIEMIA = 160;
const KROPKI_SOLI = [
  [40, 182],
  [96, 196],
  [150, 178],
  [204, 200],
  [262, 184],
  [318, 198],
  [70, 206],
  [126, 186],
  [236, 192],
  [290, 208],
  [350, 182],
  [182, 208],
];

function scenaLasu() {
  const szczatki = s('rect', { x: 0, width: 400, fill: '#9B6A3C' });
  const liscie = s('g', { fill: '#C98A3E', stroke: '#6E4A22', 'stroke-width': 1.5 });
  const sole = s('g', { fill: '#E8DDF7', stroke: '#6B4FA0', 'stroke-width': 1.5 }, KROPKI_SOLI.map(([x, y]) => s('circle', { cx: x, cy: y, r: 4, class: 'las__sol' })));
  const korona = s('circle', { cx: 300, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 3 });
  const pien = s('rect', { x: 292, width: 16, fill: '#7A5230', stroke: '#4A3018', 'stroke-width': 2.5 });
  const ziola = s('g', { class: 'las__ziola' }, [
    s('path', { d: 'M90 0 V-30 M90 -16 C80 -24 74 -22 70 -18 M90 -22 C100 -32 108 -30 110 -26', fill: 'none', stroke: '#2E6B33', 'stroke-width': 4, 'stroke-linecap': 'round' }),
    s('path', { d: 'M150 0 V-24 M150 -12 C142 -18 138 -16 134 -12 M150 -18 C158 -26 164 -24 166 -20', fill: 'none', stroke: '#2E6B33', 'stroke-width': 4, 'stroke-linecap': 'round' }),
  ]);
  const sprzatacze = s('g', { class: 'las__sprzatacze' });
  const dzdzownica = rysunekKarty('dzdzownica', 'las__organizm');
  const grzyb = rysunekKarty('plesniak-bialy', 'las__organizm');
  for (const [el, x, y] of [
    [dzdzownica, 30, 176],
    [grzyb, 200, 168],
  ]) {
    if (!el) continue;
    el.setAttribute('x', String(x));
    el.setAttribute('y', String(y));
    el.setAttribute('width', '40');
    el.setAttribute('height', '40');
    sprzatacze.append(el);
  }
  const napisRoku = s('text', { x: 16, y: 30, class: 'las__rok' }, 'Rok 0');
  const el = s('svg', { class: 'las__scena', viewBox: '0 0 400 220', role: 'img', 'aria-label': 'Las: drzewo, rośliny, warstwa szczątków i gleba' }, [
    s('rect', { x: 0, y: 0, width: 400, height: ZIEMIA, fill: '#DCEFF4' }),
    pien,
    korona,
    s('rect', { x: 0, y: ZIEMIA, width: 400, height: 60, fill: '#6E5644' }),
    sole,
    szczatki,
    liscie,
    ziola,
    sprzatacze,
    napisRoku,
  ]);
  return {
    el,
    ustaw(stan, sprzataczeWlaczone) {
      const grubosc = stan.szczatki * 7;
      szczatki.setAttribute('y', String(ZIEMIA - grubosc));
      szczatki.setAttribute('height', String(grubosc));
      liscie.replaceChildren(
        ...Array.from({ length: Math.min(12, stan.szczatki * 2) }, (_, i) =>
          s('ellipse', { cx: 18 + ((i * 67) % 370), cy: ZIEMIA - grubosc + 2 + (i % 3) * 2, rx: 9, ry: 4, transform: `rotate(${(i * 37) % 60 - 30} ${18 + ((i * 67) % 370)} ${ZIEMIA - grubosc + 2})` }),
        ),
      );
      [...sole.children].forEach((c, i) => c.classList.toggle('las__sol--brak', i >= stan.sole * 3));
      const wielkosc = LS.rosliny(stan.sole);
      const r = { duze: 46, srednie: 38, male: 28 }[wielkosc];
      const gora = ZIEMIA - grubosc;
      pien.setAttribute('y', String(gora - 70));
      pien.setAttribute('height', String(70));
      korona.setAttribute('cy', String(gora - 70 - r * 0.6));
      korona.setAttribute('r', String(r));
      ziola.setAttribute('transform', `translate(0 ${gora}) scale(1 ${wielkosc === 'male' ? 0.55 : wielkosc === 'srednie' ? 0.8 : 1})`);
      ziola.dataset.wielkosc = wielkosc;
      sprzatacze.classList.toggle('las__sprzatacze--brak', !sprzataczeWlaczone);
      napisRoku.textContent = `Rok ${stan.rok}`;
      el.setAttribute('aria-label', `Las w roku ${stan.rok}: szczątki ${stan.szczatki} z ${LS.MAKS_SZCZATKOW}, sole mineralne w glebie ${stan.sole} z ${LS.MAKS_SOLI}, ${sprzataczeWlaczone ? 'organizmy odżywiające się szczątkami pracują' : 'brak organizmów odżywiających się szczątkami'}`);
    },
  };
}

export function utworzLas(kontener, { zadanie, onKoniec }) {
  const etapy = zadanie.etapy;
  const komunikat = utworzKomunikat();
  const scena = scenaLasu();
  const wyniki = [];
  let stan = LS.nowyLas();
  let sprzatacze = true;
  let indeks = 0;

  const status = h('p', { class: 'las__status' });
  const ciekawostka = zadanie.ciekawostka
    ? h('aside', { class: 'ciekawostka', hidden: true }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, zadanie.ciekawostka)])
    : null;
  const panel = h('section', { class: 'lab__panel', 'aria-live': 'polite' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie las' }, [
    h('figure', { class: 'las__widok' }, [scena.el, status]),
    panel,
    ciekawostka,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);
  odswiez();
  pokazEtap();

  let zegar = null;
  return {
    zniszcz() {
      clearTimeout(zegar);
      korzen.remove();
    },
  };

  function odswiez() {
    scena.ustaw(stan, sprzatacze);
    status.textContent = sprzatacze ? 'Organizmy odżywiające się szczątkami pracują.' : 'W lesie nie ma organizmów odżywiających się szczątkami.';
    korzen.dataset.sprzatacze = String(sprzatacze);
  }

  function pokazEtap() {
    const e = etapy[indeks];
    dalej.hidden = true;
    const akcja = h('button', { type: 'button', class: 'przycisk las__akcja', onclick: () => przewin(akcja) }, e.akcja);
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Etap ${indeks + 1} z ${etapy.length}`),
      h('p', { class: 'lab__polecenie' }, e.polecenie),
      h('div', { class: 'lab__opcje' }, akcja),
    );
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Obserwuj las.', tekst: 'Stuknij przycisk i patrz, co dzieje się ze szczątkami i z roślinami.' });
  }

  function przewin(akcja) {
    const e = etapy[indeks];
    akcja.disabled = true;
    sprzatacze = e.sprzatacze;
    const kolejne = LS.lata(stan, sprzatacze, e.lata);
    const krok = (i) => {
      stan = kolejne[i];
      odswiez();
      if (i < kolejne.length - 1) {
        zegar = setTimeout(() => krok(i + 1), 650);
        return;
      }
      if (!sprzatacze && ciekawostka) ciekawostka.hidden = false;
      komunikat.pokaz({
        rodzaj: 'info',
        tytul: `Minęło lat: ${e.lata}.`,
        tekst: sprzatacze ? 'Opadłe liście nie gromadzą się: ściółka jest cienka.' : 'Szczątków przybywa z każdym rokiem.',
      });
      pytanie(0);
    };
    krok(0);
  }

  function pytanie(nr) {
    const e = etapy[indeks];
    const krok = e.pytania[nr];
    let proby = 0;
    let rozwiazane = false;
    const opcje = D.kolejnoscOpcji(krok, wymieszaj).map((i) =>
      h('button', { type: 'button', class: 'dosw__opcja', 'data-opcja': String(i), onclick: (ev) => odpowiedz(i, ev.currentTarget) }, krok.opcje[i].tekst),
    );
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Etap ${indeks + 1} z ${etapy.length}: pytanie ${nr + 1} z ${e.pytania.length}`),
      h('p', { class: 'dosw__pytanie' }, krok.pytanie),
      h('div', { class: 'dosw__opcje' }, opcje),
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
      for (const x of opcje) x.disabled = true;
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
        const karty = wyniki.filter((w) => w.karta);
        onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty });
      };
    }
  }
}

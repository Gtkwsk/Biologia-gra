// Mechanika „Liść przez dobę” (SPEC.md, sekcja 3.2, świat 6). Logika: doba-logika.js.
//
// Suwak pory dnia zmienia niebo nad rośliną. W południe i o północy gracz wskazuje procesy
// zachodzące w komórkach liścia i ustawia gazy przy aparacie szparkowym: co liść pobiera,
// a co oddaje do otoczenia.
//
// zadanie.etapy: [{ pora: 'dzien' | 'noc' }], zadanie.ciekawostka: opcjonalnie (TRESCI.md, sekcja 6).
// Wynik: sprawdzenia procesów i gazów od razu dobre.

import { h, s } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import * as DB from './doba-logika.js';

const NAZWY = { fotosynteza: 'fotosynteza', 'oddychanie-komorkowe': 'oddychanie komórkowe', tlen: 'tlen', 'dwutlenek-wegla': 'dwutlenek węgla' };

function strzalka(x1, y1, x2, y2) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const kat = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return s('path', {
    d: `M0 -6 H${(L - 18).toFixed(1)} V-14 L${L.toFixed(1)} 0 L${(L - 18).toFixed(1)} 14 V6 H0 Z`,
    transform: `translate(${x1} ${y1}) rotate(${kat.toFixed(1)})`,
    fill: '#FFFFFF',
    stroke: '#11191B',
    'stroke-width': 2.5,
    'stroke-linejoin': 'round',
  });
}

function scenaDoby() {
  const niebo = s('rect', { x: 0, y: 0, width: 400, height: 240 });
  const slonce = s('circle', { r: 16, fill: '#F5B800', stroke: '#9C6B00', 'stroke-width': 3 });
  const ksiezyc = s('path', { d: 'M0 -18 A18 18 0 1 0 0 18 A13 13 0 1 1 0 -18Z', fill: '#F4F6F1', stroke: '#AFB8C9', 'stroke-width': 2 });
  const napisPobiera = s('text', { x: 10, y: 74, class: 'doba__gaz' }, '?');
  const napisOddaje = s('text', { x: 10, y: 194, class: 'doba__gaz' }, '?');
  const el = s('svg', { class: 'doba__scena', viewBox: '0 0 400 240', role: 'img', 'aria-label': 'Roślina i powiększony aparat szparkowy na spodniej stronie liścia' }, [
    niebo,
    slonce,
    ksiezyc,
    s('rect', { x: 0, y: 214, width: 400, height: 26, fill: '#6E5644' }),
    s('path', { d: 'M300 214 V120', stroke: '#2E6B33', 'stroke-width': 6, 'stroke-linecap': 'round' }),
    s('path', { d: 'M300 150 C270 120 236 112 206 120 C226 150 262 162 300 150Z', fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 3 }),
    s('path', { d: 'M300 130 C330 100 364 96 390 104 C372 136 336 146 300 130Z', fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 3 }),
    s('circle', { cx: 232, cy: 140, r: 9, fill: 'none', stroke: '#11191B', 'stroke-width': 2.5 }),
    s('path', { d: 'M224 135 L192 106 M225 146 L190 146', stroke: '#11191B', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }),
    // Powiększony aparat szparkowy (lupa): dwie komórki w kształcie nasion fasoli i szparka między nimi.
    s('g', { transform: 'translate(150 124) scale(0.9) translate(-130 -158)' }, [
      s('circle', { cx: 130, cy: 158, r: 54, fill: '#E9F5DF', stroke: '#11191B', 'stroke-width': 4 }),
      s('path', { d: 'M128 124 C108 124 100 142 100 158 C100 174 108 192 128 192 C122 178 120 168 120 158 C120 148 122 138 128 124Z', fill: '#CFE8C4', stroke: '#3C6E3A', 'stroke-width': 2.5 }),
      s('path', { d: 'M132 124 C152 124 160 142 160 158 C160 174 152 192 132 192 C138 178 140 168 140 158 C140 148 138 138 132 124Z', fill: '#CFE8C4', stroke: '#3C6E3A', 'stroke-width': 2.5 }),
    ]),
    strzalka(12, 96, 142, 116),
    strzalka(142, 134, 12, 160),
    s('text', { x: 10, y: 52, class: 'doba__opis' }, 'liść pobiera'),
    napisPobiera,
    napisOddaje,
    s('text', { x: 10, y: 210, class: 'doba__opis' }, 'liść oddaje'),
  ]);
  return {
    el,
    ustawGodzine(godz) {
      const pora = DB.poraDnia(godz);
      niebo.setAttribute('fill', pora === 'dzien' ? '#CFE8F3' : pora === 'noc' ? '#1E2236' : '#F0B27A');
      const t = ((godz - 6 + 24) % 24) / 12;
      const x = 20 + 360 * Math.min(Math.max(t, 0), 1);
      const y = 120 - 90 * Math.sin(Math.PI * Math.min(Math.max(t, 0), 1));
      slonce.setAttribute('cx', x.toFixed(1));
      slonce.setAttribute('cy', y.toFixed(1));
      slonce.setAttribute('opacity', t >= 0 && t <= 1 ? '1' : '0');
      ksiezyc.setAttribute('transform', 'translate(340 46)');
      ksiezyc.setAttribute('opacity', pora === 'noc' ? '1' : '0');
    },
    ustawGazy(pobiera, oddaje) {
      napisPobiera.textContent = pobiera ? NAZWY[pobiera] : '?';
      napisOddaje.textContent = oddaje ? NAZWY[oddaje] : '?';
    },
  };
}

export function utworzDobe(kontener, { zadanie, onKoniec }) {
  const etapy = zadanie.etapy;
  const komunikat = utworzKomunikat();
  const scena = scenaDoby();
  const wyniki = [];
  let indeks = 0;
  let godzina = 6;
  let faza = 'start';

  const suwak = h('input', { type: 'range', min: '0', max: '23', step: '1', value: String(godzina), id: `suwak-doby-${zadanie.id}`, class: 'doba__suwak' });
  const czas = h('output', { class: 'doba__czas', for: suwak.id });
  const panel = h('section', { class: 'lab__panel', 'aria-live': 'polite' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie doba' }, [
    h('div', { class: 'doba__stol' }, [
      h('figure', { class: 'doba__widok' }, scena.el),
      h('div', { class: 'doba__sterowanie' }, [h('label', { for: suwak.id, class: 'lab__nazwa' }, 'Pora dnia'), suwak, czas]),
    ]),
    panel,
    zadanie.ciekawostka
      ? h('aside', { class: 'ciekawostka', hidden: true }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, zadanie.ciekawostka)])
      : null,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);
  suwak.addEventListener('input', () => ustawGodzine(Number(suwak.value)));
  ustawGodzine(godzina);
  krokCzasu();

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function ustawGodzine(g) {
    godzina = g;
    scena.ustawGodzine(g);
    const tekst = `${String(g).padStart(2, '0')}:00`;
    czas.textContent = tekst;
    suwak.setAttribute('aria-valuetext', tekst);
    if (faza === 'czas' && g === DB.PORY[etapy[indeks].pora].godzina) krokProcesow();
  }

  function krokCzasu() {
    faza = 'czas';
    dalej.hidden = true;
    suwak.disabled = false;
    scena.ustawGazy(null, null);
    const p = DB.PORY[etapy[indeks].pora];
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Pora ${indeks + 1} z ${etapy.length}`),
      h('p', { class: 'lab__polecenie' }, `Przesuń suwak na godzinę ${String(p.godzina).padStart(2, '0')}:00 (${p.nazwa}).`),
    );
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Ustaw porę dnia.', tekst: 'Obserwuj niebo nad rośliną.' });
    if (godzina === p.godzina) krokProcesow();
  }

  function krokProcesow() {
    faza = 'procesy';
    suwak.disabled = true;
    const pora = etapy[indeks].pora;
    const wybrane = new Set();
    let proby = 0;
    const przyciski = DB.PROCESY.map((id) =>
      h('button', { type: 'button', class: 'proj__opcja', 'data-proces': id, 'aria-pressed': 'false', onclick: (e) => {
        if (faza !== 'procesy') return;
        if (wybrane.has(id)) wybrane.delete(id);
        else wybrane.add(id);
        e.currentTarget.setAttribute('aria-pressed', String(wybrane.has(id)));
      } }, NAZWY[id]),
    );
    const sprawdz = h('button', { type: 'button', class: 'przycisk', onclick: () => {
      if (faza !== 'procesy') return;
      proby += 1;
      const o = DB.ocenProcesy(pora, [...wybrane]);
      if (!o.dobrze) {
        komunikat.pokaz({ rodzaj: 'zle', tytul: 'Nie wszystko się zgadza.', tekst: o.tekst });
        return;
      }
      wyniki.push({ karta: pora === 'dzien' ? 'oddychanie-komorkowe' : 'fotosynteza', odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Tak.', tekst: o.tekst });
      krokGazow();
    } }, 'Sprawdź');
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Pora ${indeks + 1} z ${etapy.length}: ${DB.PORY[pora].nazwa}`),
      h('p', { class: 'lab__polecenie' }, 'Które procesy zachodzą teraz w komórkach liścia? Zaznacz wszystkie.'),
      h('div', { class: 'proj__opcje' }, przyciski),
      h('div', { class: 'lab__opcje' }, sprawdz),
    );
    komunikat.pokaz({ rodzaj: 'info', tytul: `Jest ${DB.PORY[pora].nazwa}.`, tekst: 'Zaznacz procesy i stuknij „Sprawdź”.' });
  }

  function krokGazow() {
    faza = 'gazy';
    const pora = etapy[indeks].pora;
    const wybor = { pobiera: null, oddaje: null };
    let proby = 0;
    const wiersz = (kierunek, opis) => {
      const przyciski = ['tlen', 'dwutlenek-wegla'].map((gaz) =>
        h('button', { type: 'button', class: 'proj__opcja', 'data-kierunek': kierunek, 'data-gaz': gaz, 'aria-pressed': 'false', onclick: () => {
          if (faza !== 'gazy') return;
          wybor[kierunek] = gaz;
          for (const b of przyciski) b.setAttribute('aria-pressed', String(b.dataset.gaz === gaz));
        } }, NAZWY[gaz]),
      );
      return h('div', { class: 'proj__czynnik' }, [h('span', { class: 'proj__nazwa' }, opis), h('span', { class: 'proj__opcje' }, przyciski)]);
    };
    const sprawdz = h('button', { type: 'button', class: 'przycisk', onclick: () => {
      if (faza !== 'gazy') return;
      proby += 1;
      const o = DB.ocenGazy(pora, wybor);
      if (!o.dobrze) {
        komunikat.pokaz({ rodzaj: 'zle', tytul: 'Strzałki trzeba poprawić.', tekst: o.tekst });
        return;
      }
      wyniki.push({ karta: 'wymiana-gazowa', odRazu: proby === 1, poprawnie: true });
      scena.ustawGazy(wybor.pobiera, wybor.oddaje);
      faza = 'koniec-pory';
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Tak.', tekst: o.tekst });
      if (pora === 'noc') korzen.querySelector('.ciekawostka')?.removeAttribute('hidden');
      const ostatni = indeks === etapy.length - 1;
      dalej.textContent = ostatni ? 'Gotowe' : 'Dalej';
      dalej.hidden = false;
      dalej.onclick = () => {
        dalej.hidden = true;
        if (!ostatni) {
          indeks += 1;
          return krokCzasu();
        }
        korzen.classList.add('zadanie--gotowe');
        onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki });
      };
    } }, 'Sprawdź');
    panel.replaceChildren(
      h('p', { class: 'lab__krok' }, `Pora ${indeks + 1} z ${etapy.length}: ${DB.PORY[pora].nazwa}`),
      h('p', { class: 'lab__polecenie' }, 'Ustaw strzałki przy aparacie szparkowym: co liść pobiera z powietrza, a co do niego oddaje?'),
      wiersz('pobiera', 'Liść pobiera'),
      wiersz('oddaje', 'Liść oddaje'),
      h('div', { class: 'lab__opcje' }, sprawdz),
    );
  }
}

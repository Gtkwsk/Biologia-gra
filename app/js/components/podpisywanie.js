// Komponent „podpisywanie schematu” (SPEC.md, sekcja 5, typ 1).
//
// Etykietę można przeciągnąć palcem albo myszą na numer na schemacie lub na pole z numerem.
// Bez przeciągania: stuknięcie etykiety, potem stuknięcie numeru albo pola.
// Logika i komunikaty: podpisywanie-logika.js.

import { h, s, ikona, wyczysc } from '../core/dom.js';
import * as L from './podpisywanie-logika.js';

const PROG_RUCHU = 8;

function utworzRysunek(svgTekst, opis) {
  const dokument = new DOMParser().parseFromString(svgTekst, 'image/svg+xml');
  const zrodlo = dokument.documentElement;
  if (zrodlo.nodeName !== 'svg' || dokument.querySelector('parsererror')) {
    throw new Error('Nie udało się wczytać rysunku.');
  }
  const svg = document.importNode(zrodlo, true);
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('class', 'podpis__rysunek');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', opis);
  return svg;
}

export function utworzPodpisywanie(kontener, opcje) {
  const { przygotowane: przyg, svgTekst, opisSchematu, tryb = 'trening', onKoniec } = opcje;
  let przebieg = L.nowyPrzebieg(przyg, tryb);
  let wybrana = null;
  let przeciaganie = null;
  let tlumKlikniecie = false;
  let zakonczone = false;
  const nazwa = (id) => przyg.elementPoId.get(id).nazwa;

  // Stuknięcie rozpoznawane ze zdarzeń wskaźnika: Chrome po przeciągnięciu ukrytego potem
  // elementu potrafi pominąć „click” przy następnym stuknięciu. „click” zostaje dla klawiatury
  // i czytników ekranu, a tuż po obsłużonym stuknięciu jest pomijany.
  const ostatnieStukniecie = new WeakMap();
  const swiezeStukniecie = (el) => performance.now() - (ostatnieStukniecie.get(el) ?? -Infinity) < 700;

  function obsluzStukniecie(el, akcja, ustalCel) {
    let start = null;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      start = { id: e.pointerId, x: e.clientX, y: e.clientY, cel: ustalCel(e) };
    });
    el.addEventListener('pointerup', (e) => {
      const st = start;
      start = null;
      if (!st?.cel || e.pointerId !== st.id) return;
      if (Math.hypot(e.clientX - st.x, e.clientY - st.y) >= PROG_RUCHU || ustalCel(e) !== st.cel) return;
      ostatnieStukniecie.set(el, performance.now());
      akcja(st.cel);
    });
    el.addEventListener('pointercancel', () => {
      start = null;
    });
    el.addEventListener('click', (e) => {
      if (swiezeStukniecie(el)) return;
      const cel = ustalCel(e);
      if (cel) akcja(cel);
    });
  }

  // Rysunek z liniami i numerami
  const rysunek = utworzRysunek(svgTekst, opisSchematu);
  const znaczniki = new Map();
  const linie = s('g', { class: 'znaczniki__linie' });
  const numery = s('g', { class: 'znaczniki__numery' });
  for (const p of przyg.punkty) {
    const [cx, cy] = p.cel;
    const [zx, zy] = p.znacznik;
    linie.append(
      s('line', { class: 'znacznik__tlo-linii', x1: zx, y1: zy, x2: cx, y2: cy }),
      s('line', { class: 'znacznik__linia', x1: zx, y1: zy, x2: cx, y2: cy }),
    );
    const g = s('g', { class: 'znacznik', 'data-punkt': p.id, 'data-stan': 'puste' }, [
      s('circle', { class: 'znacznik__obszar', cx: zx, cy: zy, r: 30 }),
      s('circle', { class: 'znacznik__kolko', cx: zx, cy: zy, r: 18 }),
      s('text', { class: 'znacznik__numer', x: zx, y: zy, dy: '0.36em', 'text-anchor': 'middle' }, String(p.numer)),
    ]);
    znaczniki.set(p.id, g);
    numery.append(g);
  }
  rysunek.append(s('g', { class: 'znaczniki' }, [linie, numery]));
  obsluzStukniecie(rysunek, stuknieciePunktu, (e) => e.target.closest?.('[data-punkt]')?.dataset.punkt ?? null);

  // Pola z numerami
  const miejsca = new Map();
  const wierszPola = (punkt, strona) =>
    przyg.punkty
      .filter((p) => (p.znacznik[0] < przyg.szerokosc / 2 ? 'lewa' : 'prawa') === strona)
      .sort((a, b) => a.znacznik[1] - b.znacznik[1])
      .indexOf(punkt) + 1;
  const lista = h(
    'ol',
    { class: 'podpis__miejsca', 'aria-label': 'Pola na podpisy' },
    przyg.punkty.map((p) => {
      const tekst = h('span', { class: 'miejsce__tekst' });
      const stanIkona = h('span', { class: 'miejsce__ikona' });
      const przycisk = h(
        'button',
        {
          type: 'button',
          class: 'miejsce__pole',
          'data-punkt': p.id,
          'aria-label': `Pole ${p.numer}: puste`,
          onfocus: () => podswietlZnacznik(p.id, true),
          onblur: () => podswietlZnacznik(p.id, false),
          onpointerenter: () => podswietlZnacznik(p.id, true),
          onpointerleave: () => podswietlZnacznik(p.id, false),
        },
        [tekst, stanIkona],
      );
      obsluzStukniecie(przycisk, stuknieciePunktu, () => p.id);
      const strona = p.znacznik[0] < przyg.szerokosc / 2 ? 'lewa' : 'prawa';
      const li = h('li', { class: 'miejsce', 'data-punkt': p.id, 'data-stan': 'puste', 'data-strona': strona }, [
        h('span', { class: 'miejsce__nr', 'aria-hidden': 'true' }, String(p.numer)),
        przycisk,
      ]);
      // Na szerokim ekranie pole stoi na wysokości swojego numeru na rysunku,
      // na węższym w kolumnie po tej samej stronie co numer.
      li.style.setProperty('--y', String(p.znacznik[1] / przyg.wysokosc));
      li.style.setProperty('--kolumna-pola', strona === 'lewa' ? '1' : '2');
      li.style.setProperty('--wiersz-pola', String(wierszPola(p, strona)));
      miejsca.set(p.id, { li, przycisk, tekst, stanIkona, numer: p.numer });
      return li;
    }),
  );

  // Bank etykiet
  const etykiety = new Map();
  const bank = h(
    'div',
    { class: 'podpis__bank', role: 'group', 'aria-label': 'Etykiety' },
    L.wymieszaj(przyg.etykiety).map((id) => {
      const chip = h('button', { type: 'button', class: 'etykieta', 'data-element': id, 'aria-pressed': 'false' }, nazwa(id));
      chip.addEventListener('pointerdown', poczatekPrzeciagania);
      chip.addEventListener('click', () => {
        if (!tlumKlikniecie && !swiezeStukniecie(chip)) przelaczWybor(id);
      });
      etykiety.set(id, chip);
      return chip;
    }),
  );

  const komunikat = h('div', { class: 'komunikat', role: 'status', 'aria-live': 'polite' });
  const przyciskSprawdz =
    tryb === 'sprawdzian' ? h('button', { type: 'button', class: 'przycisk', onclick: sprawdzWszystko }, 'Sprawdź') : null;

  // Tacka z komunikatem i etykietami: na tablecie przyklejona do dołu ekranu,
  // żeby etykiety i informacja zwrotna były zawsze widoczne.
  const korzen = h('div', { class: `podpis podpis--${tryb}` }, [
    h('div', { class: 'podpis__plansza' }, [h('figure', { class: 'podpis__schemat' }, rysunek), lista]),
    h('div', { class: 'podpis__tacka' }, [komunikat, bank, przyciskSprawdz && h('div', { class: 'podpis__akcje' }, przyciskSprawdz)]),
  ]);
  kontener.append(korzen);
  pokazKomunikat({
    rodzaj: 'info',
    tytul: 'Przeciągnij etykietę na numer.',
    tekst: 'Możesz też stuknąć etykietę, a potem numer.',
  });

  // ---------- Komunikaty i stan widoku ----------

  function pokazKomunikat(k) {
    wyczysc(komunikat);
    komunikat.dataset.rodzaj = k.rodzaj;
    komunikat.append(
      ikona(k.rodzaj === 'info' ? 'info' : k.rodzaj, 'komunikat__ikona'),
      h('div', { class: 'komunikat__tresc' }, [
        h('p', { class: 'komunikat__tytul' }, k.tytul),
        k.tekst ? h('p', { class: 'komunikat__tekst' }, k.tekst) : null,
      ]),
    );
    komunikat.classList.remove('komunikat--nowy');
    void komunikat.offsetWidth;
    komunikat.classList.add('komunikat--nowy');
  }

  function pokazListeKomunikatow(lista) {
    wyczysc(komunikat);
    komunikat.dataset.rodzaj = lista.some((k) => k.rodzaj === 'zle') ? 'zle' : 'dobrze';
    komunikat.append(
      h(
        'ul',
        { class: 'komunikat__lista' },
        lista.map((k) =>
          h('li', { 'data-rodzaj': k.rodzaj }, [
            ikona(k.rodzaj, 'komunikat__ikona'),
            h('div', { class: 'komunikat__tresc' }, [
              h('p', { class: 'komunikat__tytul' }, k.tytul),
              k.tekst ? h('p', { class: 'komunikat__tekst' }, k.tekst) : null,
            ]),
          ]),
        ),
      ),
    );
  }

  function ustawMiejsce(punktId, stan, elementId) {
    const m = miejsca.get(punktId);
    m.li.dataset.stan = stan;
    znaczniki.get(punktId).dataset.stan = stan;
    m.tekst.textContent = elementId ? nazwa(elementId) : '';
    wyczysc(m.stanIkona);
    if (stan === 'dobrze' || stan === 'zle') m.stanIkona.append(ikona(stan));
    const opisStanu = { dobrze: ', dobrze', zle: ', błąd' }[stan] ?? '';
    m.przycisk.setAttribute('aria-label', `Pole ${m.numer}: ${elementId ? nazwa(elementId) : 'puste'}${opisStanu}`);
  }

  function zaznaczBlad(punktId) {
    const { li } = miejsca.get(punktId);
    const g = znaczniki.get(punktId);
    for (const el of [li, g]) {
      el.classList.remove('blad');
      void el.getBoundingClientRect();
      el.classList.add('blad');
    }
    setTimeout(() => {
      li.classList.remove('blad');
      g.classList.remove('blad');
    }, 700);
  }

  function podswietlZnacznik(punktId, wlacz) {
    znaczniki.get(punktId)?.classList.toggle('znacznik--aktywny', wlacz);
  }

  function przelaczWybor(id) {
    if (zakonczone) return;
    wybrana = wybrana === id ? null : id;
    for (const [eid, chip] of etykiety) chip.setAttribute('aria-pressed', String(eid === wybrana));
    korzen.classList.toggle('podpis--wybor', Boolean(wybrana));
    if (wybrana) {
      pokazKomunikat({
        rodzaj: 'info',
        tytul: `Wybrana etykieta: ${nazwa(wybrana)}.`,
        tekst: 'Stuknij numer, pod którym jest ten element.',
      });
    }
  }

  function stuknieciePunktu(punktId) {
    if (zakonczone) return;
    if (wybrana) {
      const id = wybrana;
      przelaczWybor(id);
      umiesc(id, punktId);
      return;
    }
    if (tryb === 'sprawdzian' && przebieg.przypisania[punktId]) {
      przebieg = L.zdejmij(przebieg, punktId).przebieg;
      odswiezSprawdzian();
      return;
    }
    if (!przebieg.przypisania[punktId]) {
      pokazKomunikat({ rodzaj: 'info', tytul: 'Najpierw wybierz etykietę.', tekst: 'Stuknij etykietę na dole, a potem ten numer.' });
    }
  }

  function umiesc(elementId, punktId) {
    if (zakonczone) return;
    if (tryb === 'sprawdzian') {
      przebieg = L.podpiszSprawdzian(przyg, przebieg, punktId, elementId).przebieg;
      odswiezSprawdzian();
      return;
    }
    const r = L.podpiszTrening(przyg, przebieg, punktId, elementId);
    if (r.wynik === 'zajete') {
      pokazKomunikat({ rodzaj: 'info', tytul: 'To pole jest już podpisane.', tekst: 'Wybierz inny numer.' });
      return;
    }
    przebieg = r.przebieg;
    pokazKomunikat(r.komunikat);
    if (r.wynik === 'dobrze') {
      ustawMiejsce(punktId, 'dobrze', elementId);
      const chip = etykiety.get(elementId);
      chip.hidden = true;
      chip.classList.remove('etykieta--podpowiedz');
    } else {
      zaznaczBlad(punktId);
      if (r.podpowiedz) etykiety.get(r.podpowiedz)?.classList.add('etykieta--podpowiedz');
    }
    if (L.czyGotowe(przyg, przebieg)) zakoncz();
  }

  function odswiezSprawdzian() {
    const uzyte = new Set(Object.values(przebieg.przypisania).filter(Boolean));
    for (const p of przyg.punkty) {
      const e = przebieg.przypisania[p.id];
      ustawMiejsce(p.id, e ? 'wypelnione' : 'puste', e);
    }
    for (const [id, chip] of etykiety) chip.hidden = uzyte.has(id);
  }

  function sprawdzWszystko() {
    if (zakonczone) return;
    const wynik = L.sprawdz(przyg, przebieg);
    przebieg = wynik.przebieg;
    for (const w of wynik.wyniki) ustawMiejsce(w.punkt, w.dobrze ? 'dobrze' : 'zle', w.wybrany);
    const bledne = wynik.wyniki.filter((w) => !w.dobrze).map((w) => w.komunikat);
    pokazListeKomunikatow(bledne.length ? bledne : [{ rodzaj: 'dobrze', tytul: 'Wszystkie podpisy są poprawne.' }]);
    przyciskSprawdz.disabled = true;
    zakoncz();
  }

  function zakoncz() {
    zakonczone = true;
    korzen.classList.add('podpis--gotowe');
    for (const chip of etykiety.values()) chip.disabled = true;
    onKoniec?.(L.podsumuj(przyg, przebieg));
  }

  // ---------- Przeciąganie ----------

  function celPod(x, y) {
    const el = document.elementFromPoint(x, y);
    const cel = el?.closest?.('[data-punkt]');
    return cel && korzen.contains(cel) ? cel.dataset.punkt : null;
  }

  function podswietlCel(punktId) {
    if (przeciaganie.cel === punktId) return;
    if (przeciaganie.cel) {
      miejsca.get(przeciaganie.cel)?.li.classList.remove('cel');
      znaczniki.get(przeciaganie.cel)?.classList.remove('cel');
    }
    przeciaganie.cel = punktId;
    if (punktId) {
      miejsca.get(punktId).li.classList.add('cel');
      znaczniki.get(punktId).classList.add('cel');
    }
  }

  function utworzDucha(chip) {
    const r = chip.getBoundingClientRect();
    const el = chip.cloneNode(true);
    el.classList.add('etykieta--duch');
    el.removeAttribute('aria-pressed');
    el.setAttribute('aria-hidden', 'true');
    el.style.width = `${r.width}px`;
    document.body.append(el);
    return { el, szer: r.width, wys: r.height };
  }

  function przesunDucha(x, y) {
    const { duch, dotyk } = przeciaganie;
    const odstep = dotyk ? duch.wys + 22 : duch.wys / 2;
    duch.el.style.transform = `translate(${x - duch.szer / 2}px, ${y - odstep}px) rotate(-3deg)`;
  }

  function poczatekPrzeciagania(e) {
    if (zakonczone || przeciaganie || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const chip = e.currentTarget;
    przeciaganie = {
      chip,
      element: chip.dataset.element,
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      dotyk: e.pointerType !== 'mouse',
      ruszyl: false,
      duch: null,
      cel: null,
    };
    chip.setPointerCapture?.(e.pointerId);
    chip.addEventListener('pointermove', ruchPrzeciagania);
    chip.addEventListener('pointerup', koniecPrzeciagania);
    chip.addEventListener('pointercancel', przerwijPrzeciaganie);
  }

  function ruchPrzeciagania(e) {
    const p = przeciaganie;
    if (!p || e.pointerId !== p.id) return;
    if (!p.ruszyl) {
      if (Math.hypot(e.clientX - p.x0, e.clientY - p.y0) < PROG_RUCHU) return;
      p.ruszyl = true;
      p.duch = utworzDucha(p.chip);
      p.chip.classList.add('etykieta--w-ruchu');
      if (wybrana) przelaczWybor(wybrana);
    }
    przesunDucha(e.clientX, e.clientY);
    podswietlCel(celPod(e.clientX, e.clientY));
  }

  function sprzatnij() {
    const p = przeciaganie;
    if (!p) return;
    p.chip.removeEventListener('pointermove', ruchPrzeciagania);
    p.chip.removeEventListener('pointerup', koniecPrzeciagania);
    p.chip.removeEventListener('pointercancel', przerwijPrzeciaganie);
    p.chip.classList.remove('etykieta--w-ruchu');
    if (p.cel) podswietlCel(null);
    p.duch?.el.remove();
    przeciaganie = null;
  }

  function koniecPrzeciagania(e) {
    const p = przeciaganie;
    if (!p || e.pointerId !== p.id) return;
    const ruszyl = p.ruszyl;
    const cel = ruszyl ? celPod(e.clientX, e.clientY) : null;
    sprzatnij();
    if (!ruszyl) {
      ostatnieStukniecie.set(p.chip, performance.now());
      przelaczWybor(p.element);
      return;
    }
    // Po przeciągnięciu przeglądarka może jeszcze wysłać „click” na etykietę.
    tlumKlikniecie = true;
    setTimeout(() => {
      tlumKlikniecie = false;
    }, 0);
    if (cel) umiesc(p.element, cel);
  }

  function przerwijPrzeciaganie() {
    sprzatnij();
  }

  return {
    zniszcz() {
      sprzatnij();
      korzen.remove();
    },
  };
}

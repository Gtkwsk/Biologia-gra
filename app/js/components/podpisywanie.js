// Komponent „podpisywanie schematu” (SPEC.md, sekcja 5, typ 1).
//
// Etykietę można przeciągnąć palcem albo myszą na numer na schemacie lub na pole z numerem.
// Bez przeciągania: stuknięcie etykiety, potem stuknięcie numeru albo pola.
// Logika i komunikaty: podpisywanie-logika.js. Przeciąganie: przeciaganie.js.

import { h, s, ikona, wyczysc } from '../core/dom.js';
import { utworzPrzeciaganie } from './przeciaganie.js';
import { utworzKomunikat } from './komunikat.js';
import * as L from './podpisywanie-logika.js';

export function utworzRysunek(svgTekst, opis, klasa) {
  const dokument = new DOMParser().parseFromString(svgTekst, 'image/svg+xml');
  const zrodlo = dokument.documentElement;
  if (zrodlo.nodeName !== 'svg' || dokument.querySelector('parsererror')) {
    throw new Error('Nie udało się wczytać rysunku.');
  }
  const svg = document.importNode(zrodlo, true);
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('class', klasa);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', opis);
  return svg;
}

// Linie wskazujące i numery na rysunku. punkty: [{ id, numer, cel: [x, y], znacznik: [x, y] }].
// Zwraca mapę id punktu → grupa numeru (z atrybutami data-punkt i data-cel).
export function dodajZnaczniki(rysunek, punkty) {
  const znaczniki = new Map();
  const linie = s('g', { class: 'znaczniki__linie' });
  const numery = s('g', { class: 'znaczniki__numery' });
  for (const p of punkty) {
    const [cx, cy] = p.cel;
    const [zx, zy] = p.znacznik;
    linie.append(
      s('line', { class: 'znacznik__tlo-linii', x1: zx, y1: zy, x2: cx, y2: cy }),
      s('line', { class: 'znacznik__linia', x1: zx, y1: zy, x2: cx, y2: cy }),
    );
    const g = s('g', { class: 'znacznik', 'data-punkt': p.id, 'data-cel': p.id, 'data-stan': 'puste' }, [
      s('circle', { class: 'znacznik__obszar', cx: zx, cy: zy, r: 30 }),
      s('circle', { class: 'znacznik__kolko', cx: zx, cy: zy, r: 18 }),
      s('text', { class: 'znacznik__numer', x: zx, y: zy, dy: '0.36em', 'text-anchor': 'middle' }, String(p.numer)),
    ]);
    znaczniki.set(p.id, g);
    numery.append(g);
  }
  rysunek.append(s('g', { class: 'znaczniki' }, [linie, numery]));
  return znaczniki;
}

export function utworzPodpisywanie(kontener, opcje) {
  const { przygotowane: przyg, svgTekst, opisSchematu, tryb = 'trening', onKoniec } = opcje;
  let przebieg = L.nowyPrzebieg(przyg, tryb);
  let zakonczone = false;
  const nazwa = (id) => przyg.elementPoId.get(id).nazwa;
  const komunikat = utworzKomunikat();

  // Rysunek z liniami i numerami
  const rysunek = utworzRysunek(svgTekst, opisSchematu, 'podpis__rysunek');
  const znaczniki = dodajZnaczniki(rysunek, przyg.punkty);

  // Pola z numerami
  const miejsca = new Map();
  const strona = (p) => (p.znacznik[0] < przyg.szerokosc / 2 ? 'lewa' : 'prawa');
  const wierszPola = (punkt) =>
    przyg.punkty
      .filter((p) => strona(p) === strona(punkt))
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
          'data-cel': p.id,
          'aria-label': `Pole ${p.numer}: puste`,
          onfocus: () => podswietlZnacznik(p.id, true),
          onblur: () => podswietlZnacznik(p.id, false),
          onpointerenter: () => podswietlZnacznik(p.id, true),
          onpointerleave: () => podswietlZnacznik(p.id, false),
        },
        [tekst, stanIkona],
      );
      const li = h('li', { class: 'miejsce', 'data-punkt': p.id, 'data-cel': p.id, 'data-stan': 'puste', 'data-strona': strona(p) }, [
        h('span', { class: 'miejsce__nr', 'aria-hidden': 'true' }, String(p.numer)),
        przycisk,
      ]);
      // Na szerokim ekranie pole stoi na wysokości swojego numeru na rysunku,
      // na węższym w kolumnie po tej samej stronie co numer.
      li.style.setProperty('--y', String(p.znacznik[1] / przyg.wysokosc));
      li.style.setProperty('--kolumna-pola', strona(p) === 'lewa' ? '1' : '2');
      li.style.setProperty('--wiersz-pola', String(wierszPola(p)));
      miejsca.set(p.id, { li, przycisk, tekst, stanIkona, numer: p.numer });
      return li;
    }),
  );

  const etykiety = new Map();
  const bank = h('div', { class: 'bank', role: 'group', 'aria-label': 'Etykiety' });
  const przyciskSprawdz =
    tryb === 'sprawdzian' ? h('button', { type: 'button', class: 'przycisk', onclick: sprawdzWszystko }, 'Sprawdź') : null;

  // Tacka z komunikatem i etykietami: na tablecie przyklejona do dołu ekranu,
  // żeby etykiety i informacja zwrotna były zawsze widoczne.
  const korzen = h('div', { class: `zadanie podpis podpis--${tryb}` }, [
    h('div', { class: 'podpis__plansza' }, [h('figure', { class: 'podpis__schemat' }, rysunek), lista]),
    h('div', { class: 'tacka' }, [komunikat.el, bank, przyciskSprawdz && h('div', { class: 'tacka__akcje' }, przyciskSprawdz)]),
  ]);

  const przeciaganie = utworzPrzeciaganie({
    korzen,
    aktywne: () => !zakonczone,
    onUpusc: umiesc,
    onStuknijCel: stuknieciePunktu,
    onWybor: (id) => {
      if (id) {
        komunikat.pokaz({
          rodzaj: 'info',
          tytul: `Wybrana etykieta: ${nazwa(id)}.`,
          tekst: 'Stuknij numer, pod którym jest ten element.',
        });
      }
    },
  });
  for (const id of L.wymieszaj(przyg.etykiety)) {
    const chip = h('button', { type: 'button', class: 'etykieta', 'data-element': id }, nazwa(id));
    przeciaganie.podlaczEtykiete(chip, id);
    etykiety.set(id, chip);
    bank.append(chip);
  }
  przeciaganie.podlaczCel(rysunek);
  for (const { przycisk } of miejsca.values()) przeciaganie.podlaczCel(przycisk);

  kontener.append(korzen);
  komunikat.pokaz({
    rodzaj: 'info',
    tytul: 'Przeciągnij etykietę na numer.',
    tekst: 'Możesz też stuknąć etykietę, a potem numer.',
  });

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
    for (const el of [miejsca.get(punktId).li, znaczniki.get(punktId)]) {
      el.classList.remove('blad');
      void el.getBoundingClientRect();
      el.classList.add('blad');
      setTimeout(() => el.classList.remove('blad'), 700);
    }
  }

  function podswietlZnacznik(punktId, wlacz) {
    znaczniki.get(punktId)?.classList.toggle('znacznik--aktywny', wlacz);
  }

  function stuknieciePunktu(punktId) {
    if (tryb === 'sprawdzian' && przebieg.przypisania[punktId]) {
      przebieg = L.zdejmij(przebieg, punktId).przebieg;
      odswiezSprawdzian();
      return;
    }
    if (!przebieg.przypisania[punktId]) {
      komunikat.pokaz({ rodzaj: 'info', tytul: 'Najpierw wybierz etykietę.', tekst: 'Stuknij etykietę na dole, a potem ten numer.' });
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
      komunikat.pokaz({ rodzaj: 'info', tytul: 'To pole jest już podpisane.', tekst: 'Wybierz inny numer.' });
      return;
    }
    przebieg = r.przebieg;
    komunikat.pokaz(r.komunikat);
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
    komunikat.pokazListe(bledne.length ? bledne : [{ rodzaj: 'dobrze', tytul: 'Wszystkie podpisy są poprawne.' }]);
    przyciskSprawdz.disabled = true;
    zakoncz();
  }

  function zakoncz() {
    zakonczone = true;
    przeciaganie.wyczyscWybor();
    korzen.classList.add('zadanie--gotowe');
    for (const chip of etykiety.values()) chip.disabled = true;
    onKoniec?.(L.podsumuj(przyg, przebieg));
  }

  return {
    zniszcz() {
      przeciaganie.zniszcz();
      korzen.remove();
    },
  };
}

// Mapa wyprawy: sześć światów jako soczewki połączone ścieżką.
// Przytrzymanie logo przez 3 sekundy otwiera wejście do panelu rodzica.

import { h, s, ikona } from '../core/dom.js';
import { otwarteSwiaty, statusSwiata, opanowanieSwiata, poprzedniGotowy } from '../core/swiaty.js';
import { soczewka, miernikOstrosci, logoSoczewki, powiadom, potrzasnij, przytrzymanie } from './wspolne.js';

const CZAS_PRZYTRZYMANIA_MS = 3000;

// Gładka krzywa przez kolejne punkty (Catmull-Rom zamieniony na krzywe Béziera).
function krzywa(punkty) {
  if (punkty.length < 2) return '';
  const p = (i) => punkty[Math.max(0, Math.min(punkty.length - 1, i))];
  let d = `M${p(0)[0].toFixed(1)} ${p(0)[1].toFixed(1)}`;
  for (let i = 0; i < punkty.length - 1; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
    const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return d;
}

const OPIS_STATUSU = {
  'w-budowie': 'w budowie',
  zablokowany: 'zablokowany',
  otwarty: 'otwarty',
  pokonany: 'boss pokonany',
};

export function render(kontener, ctx) {
  const { swiaty } = ctx.dane;
  const otwarte = otwarteSwiaty(swiaty, ctx.stan);

  const logo = h('div', { class: 'logo' }, [
    logoSoczewki(),
    h('h1', { class: 'logo__tytul' }, [h('span', { class: 'logo__pierwszy' }, 'Wyprawa'), ' do wnętrza życia']),
  ]);
  przytrzymanie(logo, CZAS_PRZYTRZYMANIA_MS, () => ctx.nawiguj({ ekran: 'rodzic' }));

  const naglowek = h('header', { class: 'mapa__naglowek' }, [
    logo,
    h('p', { class: 'mapa__gracz' }, [h('span', { class: 'mapa__gracz-etykieta' }, 'Badacz'), ' ', ctx.stan.ustawienia.imie]),
    h('a', { class: 'przycisk przycisk--jasny mapa__baza', href: '#/baza' }, 'Baza'),
  ]);

  const sciezkaLinia = s('path', { class: 'mapa__sciezka-linia' });
  const sciezka = s('svg', { class: 'mapa__sciezka', 'aria-hidden': 'true', focusable: 'false' }, sciezkaLinia);
  const lista = h('ol', { class: 'mapa__swiaty' }, swiaty.map(elementSwiata));
  const plansza = h('div', { class: 'mapa__plansza' }, [sciezka, lista]);

  const stopka = ctx.sesja.wyniki.length
    ? h('div', { class: 'mapa__stopka' }, h('a', { class: 'przycisk przycisk--dalej', href: '#/podsumowanie' }, 'Zakończ wyprawę'))
    : null;

  const autor = h('footer', { class: 'mapa__autor' }, '© 2026 Robert Gutkowski');

  kontener.append(h('div', { class: 'ekran ekran--mapa' }, [naglowek, plansza, stopka, autor]));

  const obserwator = new ResizeObserver(rysujSciezke);
  obserwator.observe(plansza);
  rysujSciezke();

  return {
    zniszcz() {
      obserwator.disconnect();
    },
  };

  function elementSwiata(sw) {
    const status = statusSwiata(sw, ctx.stan, otwarte);
    const opanowanie = opanowanieSwiata(sw, ctx.stan);
    const otwartyDoGry = status === 'otwarty' || status === 'pokonany';
    const lupa = soczewka(sw, { status, opanowanie });
    // Gwiazda mistrza: wygrany rewanż mistrzowski (boss z jednym sercem).
    const mistrz = ctx.stan.mistrzowie.includes(sw.id);
    const ramka = h('span', { class: 'soczewka-ramka' }, [lupa, mistrz ? h('span', { class: 'soczewka__gwiazda', 'aria-hidden': 'true' }, ikona('gwiazda')) : null]);
    let opisStanu;
    if (otwartyDoGry) opisStanu = miernikOstrosci(opanowanie);
    else if (status === 'w-budowie') opisStanu = h('span', { class: 'swiat__stan' }, 'W budowie');
    else opisStanu = h('span', { class: 'swiat__stan' }, `Pokonaj bossa: ${poprzedniGotowy(swiaty, sw)?.tytul ?? ''}`);

    const li = h('li', { class: 'swiat', 'data-swiat': sw.id, 'data-status': status, 'data-mistrz': String(ctx.stan.mistrzowie.includes(sw.id)) });
    const przycisk = h(
      'button',
      {
        type: 'button',
        class: 'swiat__przycisk',
        'aria-label': `Część ${sw.czesc}: ${sw.tytul}. ${OPIS_STATUSU[status]}${mistrz ? ', mistrz' : ''}.`,
        onclick: () => wybierz(sw, status, lupa, li),
      },
      [
        ramka,
        h('span', { class: 'swiat__opis' }, [
          h('span', { class: 'swiat__czesc' }, `Część ${sw.czesc}`),
          h('span', { class: 'swiat__tytul' }, sw.tytul),
          opisStanu,
        ]),
      ],
    );
    li.append(przycisk);
    return li;
  }

  function wybierz(sw, status, lupa, li) {
    if (status === 'otwarty' || status === 'pokonany') {
      const r = lupa.getBoundingClientRect();
      ctx.przejscie = { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 };
      ctx.nawiguj({ ekran: 'swiat', swiat: sw.id });
      return;
    }
    potrzasnij(li);
    if (status === 'w-budowie') powiadom(`Świat „${sw.tytul}” jest jeszcze w budowie.`);
    else powiadom(`Ten świat otworzy się po pokonaniu bossa w świecie „${poprzedniGotowy(swiaty, sw)?.tytul}”.`);
  }

  function rysujSciezke() {
    const baza = plansza.getBoundingClientRect();
    if (!baza.width) return;
    const punkty = [...lista.querySelectorAll('.soczewka')].map((el) => {
      const r = el.getBoundingClientRect();
      return [r.left - baza.left + r.width / 2, r.top - baza.top + r.height / 2];
    });
    sciezka.setAttribute('viewBox', `0 0 ${baza.width.toFixed(1)} ${baza.height.toFixed(1)}`);
    sciezkaLinia.setAttribute('d', krzywa(punkty));
  }
}

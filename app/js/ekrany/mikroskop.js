// Mikroskop w bazie (SPEC.md, sekcja 4.1): lupa, mikroskop szkolny (około 400 razy) i bardzo duże
// powiększenie (około 10 000 razy). Wyższe powiększenia odblokowują pokonani bossowie światów 2 i 3.
// Widok nie pokazuje więcej, niż pozwala dane powiększenie (TRESCI.md, sekcje 2.2 i 2.3).

import { h, ikona, ograniczRuch } from '../core/dom.js';
import { wczytajTekst } from '../core/zasoby.js';
import { POZIOMY_MIKROSKOPU, poziomMikroskopu } from '../core/boss.js';
import { obrazSceny, scenaMoczarki, schematWOkularze } from '../components/obrazy.js';
import { utworzRysunek } from '../components/podpisywanie.js';
import { elementWTypie, zWielkiej } from '../components/podpisywanie-logika.js';
import { pasek } from './wspolne.js';

const CIEKAWOSTKA_MOCZARKI = 'W komórkach liścia moczarki chloroplasty krążą wzdłuż ścian, niesione przez płynącą cytoplazmę.';

// Preparaty: od którego poziomu są dostępne i jaki typ komórki pokazuje schemat przy 10 000 razy.
const PREPARATY = [
  { id: 'nablonek', nazwa: 'Nabłonek jamy ustnej', typ: 'zwierzeca', od: 0 },
  { id: 'moczarka', nazwa: 'Liść moczarki kanadyjskiej', typ: 'roslinna', od: 0 },
  { id: 'drozdze', nazwa: 'Drożdże', typ: 'grzybowa', od: 2 },
  { id: 'bakterie', nazwa: 'Bakterie', typ: 'bakteryjna', od: 2 },
];

// Kolejność sprawdzania przy dotknięciu schematu: najpierw drobne elementy wewnątrz, potem granice
// i wypełnienie (cytozol przed ścianą i otoczką, bo te leżą pod nim na całej powierzchni komórki).
const KOLEJNOSC_TRAFIEN = [
  'rzeska',
  'rybosomy',
  'mitochondrium',
  'chloroplast',
  'aparat-golgiego',
  'siateczka-srodplazmatyczna',
  'nic-dna',
  'wakuola',
  'jadro-komorkowe',
  'blona-komorkowa',
  'cytozol',
  'sciana-komorkowa',
  'otoczka-sluzowa',
];

// Wypełnienie i warstwy zewnętrzne: sprawdzane na końcu, po drobnych elementach z marginesem.
const TLO = ['cytozol', 'sciana-komorkowa', 'otoczka-sluzowa'];

// Czy punkt leży na obrysie kształtu pogrubionym do podanej szerokości.
function naObrysie(ksztalt, punkt, szerokosc) {
  const stare = { stroke: ksztalt.getAttribute('stroke'), szer: ksztalt.getAttribute('stroke-width') };
  ksztalt.setAttribute('stroke', '#000');
  ksztalt.setAttribute('stroke-width', String(szerokosc));
  const wynik = ksztalt.isPointInStroke(punkt);
  for (const [atr, w] of [['stroke', stare.stroke], ['stroke-width', stare.szer]]) {
    if (w === null) ksztalt.removeAttribute(atr);
    else ksztalt.setAttribute(atr, w);
  }
  return wynik;
}

// Czy dotknięcie (współrzędne ekranu) trafia w element. Pierwsze przejście jest dokładne
// (wypełnienie albo obrys rysunku), drugie z marginesem, żeby drobne elementy dało się trafić palcem.
function trafiony(grupa, x, y, zMarginesem) {
  for (const ksztalt of grupa.querySelectorAll('circle, ellipse, path, rect')) {
    const macierz = ksztalt.getScreenCTM()?.inverse();
    if (!macierz) continue;
    const punkt = new DOMPoint(x, y).matrixTransform(macierz);
    const wypelnienie = ksztalt.getAttribute('fill') ?? ksztalt.closest('[fill]')?.getAttribute('fill');
    const szerokosc = Number(ksztalt.getAttribute('stroke-width') ?? ksztalt.closest('[stroke-width]')?.getAttribute('stroke-width') ?? 0);
    if (!zMarginesem) {
      if (wypelnienie !== 'none' && ksztalt.isPointInFill(punkt)) return true;
      // Cienką błonę łatwiej trafić z nieco większym marginesem.
      const zapas = grupa.dataset.element === 'blona-komorkowa' ? 12 : 4;
      if (szerokosc > 0 && naObrysie(ksztalt, punkt, szerokosc + zapas)) return true;
      continue;
    }
    // Z marginesem tylko drobne kształty (np. rybosomy, pęcherzyki).
    const r = ksztalt.getBBox();
    const m = 14;
    if (r.width < 40 && r.height < 40 && punkt.x >= r.x - m && punkt.x <= r.x + r.width + m && punkt.y >= r.y - m && punkt.y <= r.y + r.height + m) {
      return true;
    }
  }
  return false;
}

export function render(kontener, ctx) {
  const poziom = poziomMikroskopu(ctx.stan);
  const typPoId = new Map(ctx.dane.typyKomorek.map((t) => [t.id, t]));
  const elementPoId = new Map(ctx.dane.elementy.map((e) => [e.id, e]));
  const swiatBossa = (id) => ctx.dane.swiaty.find((s) => s.id === id);
  let wybranyPoziom = poziom;
  let preparat = PREPARATY[0];
  let zatrzymaj = null;
  let zamkniety = false;

  const widok = h('div', { class: 'mikroskop__widok' });
  const opis = h('div', { class: 'mikroskop__opis', 'aria-live': 'polite' });
  const przyciskiPoziomu = h('div', { class: 'mikroskop__poziomy', role: 'group', 'aria-label': 'Powiększenie' });
  const przyciskiPreparatu = h('div', { class: 'mikroskop__preparaty', role: 'group', 'aria-label': 'Preparat' });

  kontener.append(
    h('div', { class: 'ekran ekran--mikroskop' }, [
      pasek({ wstecz: { tekst: 'Baza', href: '#/baza' } }),
      h('h1', {}, 'Mikroskop'),
      h(
        'ol',
        { class: 'mikroskop__drabina', 'aria-label': 'Ulepszenia mikroskopu' },
        POZIOMY_MIKROSKOPU.map((p, i) => {
          const odblokowany = i <= poziom;
          const boss = p.za ? swiatBossa(p.za) : null;
          return h('li', { 'data-odblokowany': String(odblokowany) }, [
            h('span', { class: 'mikroskop__szczebel' }, odblokowany ? ikona('dobrze') : ikona('klodka')),
            h('span', {}, [
              h('strong', {}, p.nazwa),
              p.powiekszenie ? `: ${p.powiekszenie}` : '',
              h('br'),
              h('span', { class: 'mikroskop__warunek' }, p.za ? (odblokowany ? 'Zdobyte.' : `Za pokonanie bossa: ${boss?.boss?.nazwa ?? ''} (świat ${p.za}).`) : 'Na start wyprawy.'),
            ]),
          ]);
        }),
      ),
      h('section', { class: 'mikroskop__stol' }, [
        h('div', { class: 'mikroskop__sterowanie' }, [h('h2', {}, 'Preparat'), przyciskiPreparatu, h('h2', {}, 'Powiększenie'), przyciskiPoziomu]),
        widok,
        opis,
      ]),
    ]),
  );
  odswiez();

  return {
    zniszcz() {
      zamkniety = true;
      zatrzymaj?.();
    },
  };

  function odswiez() {
    const preparaty = PREPARATY.filter((p) => p.od <= poziom);
    if (!preparaty.includes(preparat)) preparat = preparaty[0];
    if (preparat.od > wybranyPoziom) wybranyPoziom = poziom;
    przyciskiPreparatu.replaceChildren(
      ...preparaty.map((p) =>
        h(
          'button',
          {
            type: 'button',
            class: 'przycisk przycisk--jasny przycisk--maly',
            'aria-pressed': String(p === preparat),
            onclick: () => {
              preparat = p;
              odswiez();
            },
          },
          p.nazwa,
        ),
      ),
    );
    przyciskiPoziomu.replaceChildren(
      ...POZIOMY_MIKROSKOPU.map((p, i) =>
        h(
          'button',
          {
            type: 'button',
            class: 'przycisk przycisk--jasny przycisk--maly',
            'aria-pressed': String(i === wybranyPoziom),
            disabled: i > poziom || preparat.od > i,
            onclick: () => {
              wybranyPoziom = i;
              odswiez();
            },
          },
          [i > poziom ? ikona('klodka') : null, p.powiekszenie ? p.powiekszenie.replace('około ', '') : 'Lupa'],
        ),
      ),
    );
    pokazWidok();
  }

  async function pokazWidok() {
    zatrzymaj?.();
    zatrzymaj = null;
    const id = POZIOMY_MIKROSKOPU[wybranyPoziom].id;
    if (id === 'lupa') {
      widok.replaceChildren(obrazSceny(preparat.id === 'nablonek' ? 'nablonek-lupa' : 'moczarka-lupa'));
      opis.replaceChildren(h('p', {}, 'Przez lupę komórek nie widać: są za małe. Komórki są zwykle mikroskopijne.'));
      return;
    }
    if (id === 'x400') {
      if (preparat.id === 'nablonek') {
        widok.replaceChildren(obrazSceny('nablonek-400', { podpisy: true }));
        opis.replaceChildren(
          h('p', {}, 'Komórki nabłonka jamy ustnej pobrane patyczkiem z wnętrza policzka. Przy powiększeniu około 400 razy widać błonę komórkową, cytoplazmę i jądro komórkowe.'),
        );
      } else {
        const scena = scenaMoczarki({ ruch: !ograniczRuch(), podpisy: true });
        zatrzymaj = scena.zatrzymaj;
        widok.replaceChildren(scena.svg);
        opis.replaceChildren(
          h('p', {}, 'Komórki liścia moczarki kanadyjskiej. Przy powiększeniu około 400 razy widać w nich chloroplasty.'),
          h('aside', { class: 'ciekawostka' }, [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, CIEKAWOSTKA_MOCZARKI)]),
        );
      }
      return;
    }
    // Około 10 000 razy: schemat komórki, elementy do dotknięcia.
    const typ = typPoId.get(preparat.typ);
    widok.replaceChildren(h('p', { class: 'wczytywanie' }, 'Wczytywanie…'));
    let svgTekst;
    try {
      svgTekst = await wczytajTekst(typ.rysunek);
    } catch {
      widok.replaceChildren(h('p', {}, 'Nie udało się wczytać preparatu.'));
      return;
    }
    if (zamkniety || POZIOMY_MIKROSKOPU[wybranyPoziom].id !== 'x10000' || typPoId.get(preparat.typ) !== typ) return;
    const schemat = utworzRysunek(svgTekst, typ.nazwa, '');
    const scena = schematWOkularze(schemat, `${zWielkiej(typ.nazwa)} przy powiększeniu około 10 000 razy`);
    scena.classList.add('scena--dotyk');
    widok.replaceChildren(scena);
    const podpowiedz = h('p', {}, `${zWielkiej(typ.nazwa)}. Przy bardzo dużym powiększeniu widać, że cytoplazma to cytozol z zawieszonymi w nim elementami. Dotknij elementu, żeby poznać jego nazwę.`);
    const wskazany = h('p', { class: 'mikroskop__wskazany' });
    opis.replaceChildren(podpowiedz, wskazany);
    scena.addEventListener('click', (e) => {
      const wewn = scena.querySelector('svg');
      const grupy = [...wewn.querySelectorAll('[data-element]')];
      const kolejne = KOLEJNOSC_TRAFIEN.flatMap((id) => grupy.filter((g) => g.dataset.element === id));
      const elementy = kolejne.filter((g) => !TLO.includes(g.dataset.element));
      const tlo = kolejne.filter((g) => TLO.includes(g.dataset.element));
      const traf =
        elementy.find((g) => trafiony(g, e.clientX, e.clientY, false)) ??
        elementy.find((g) => trafiony(g, e.clientX, e.clientY, true)) ??
        tlo.find((g) => trafiony(g, e.clientX, e.clientY, false));
      for (const g of wewn.querySelectorAll('.mikroskop__zaznaczony')) g.classList.remove('mikroskop__zaznaczony');
      if (!traf) {
        wskazany.textContent = '';
        return;
      }
      for (const g of wewn.querySelectorAll(`[data-element="${traf.dataset.element}"]`)) g.classList.add('mikroskop__zaznaczony');
      const el = elementWTypie(elementPoId.get(traf.dataset.element), typ.id);
      wskazany.replaceChildren(h('strong', {}, `${zWielkiej(el.nazwa)}. `), el.funkcja);
    });
  }
}

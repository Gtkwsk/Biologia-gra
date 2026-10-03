// Mechanika „Projektant doświadczeń” (SPEC.md, sekcja 3.2, świat 4).
// Gracz ustawia warunki dwóch prób (A i B) z gałązką moczarki. Plan jest dobry, gdy próby
// różnią się dokładnie jednym czynnikiem: tym, który bada doświadczenie (TRESCI.md, sekcja 2.4:
// jedna próba w świetle, druga w ciemności, pozostałe warunki identyczne). Potem doświadczenie
// biegnie (pęcherzyki tlenu z modelu fotosyntezy), a gracz wybiera wniosek.
//
// zadanie.badany:  id czynnika (fotosynteza-logika.js),
// zadanie.czynniki: [{ id, opcje: [{ id, nazwa, poziom }] }] – wybory w każdej próbie,
// zadanie.start:   { A: { czynnik: idOpcji }, B: {...} } – plan początkowy (zły),
// zadanie.pytania: pytania po doświadczeniu (jak kroki w doswiadczenie-logika.js).
// Wynik: plan dobry za pierwszym sprawdzeniem i pytania z odpowiedzią dobrą od razu.

import { h, s } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { wymieszaj } from './podpisywanie-logika.js';
import * as F from './fotosynteza-logika.js';
import * as D from './doswiadczenie-logika.js';

const PROBY = ['A', 'B'];

function scenaProby(litera) {
  const ciemnosc = s('rect', { x: 0, y: 0, width: 160, height: 150, fill: '#11191B', opacity: 0 });
  const zimno = s('rect', { x: 34, y: 52, width: 92, height: 76, fill: '#9FD0F0', opacity: 0 });
  const gaz = s('g', {}, Array.from({ length: 10 }, (_, i) => s('circle', { cx: 44 + ((i * 23) % 72), cy: 62 + ((i * 17) % 58), r: 1.8, fill: '#FFFFFF', stroke: '#5DA9D6', 'stroke-width': 0.8 })));
  const babelki = s('g', {});
  for (let i = 0; i < 8; i++) {
    const b = s('circle', { class: 'babelek babelek--ukryty', cx: 80 + ((i * 5) % 9) - 4, cy: 80, r: 3.5, fill: '#FFFFFF', stroke: '#2F7F99', 'stroke-width': 1.5 });
    b.style.setProperty('--droga', '-26px');
    babelki.append(b);
  }
  const galazka = s('g', {}, [s('path', { d: 'M80 128 C76 112 84 96 80 82', fill: 'none', stroke: '#2E6B33', 'stroke-width': 3, 'stroke-linecap': 'round' })]);
  for (let k = 1; k <= 3; k++) {
    const y = 128 - k * 13;
    galazka.append(
      s('ellipse', { cx: 73, cy: y, rx: 7, ry: 2.6, transform: `rotate(22 73 ${y})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.2 }),
      s('ellipse', { cx: 87, cy: y - 2, rx: 7, ry: 2.6, transform: `rotate(-22 87 ${y - 2})`, fill: '#3C9A47', stroke: '#1F5A32', 'stroke-width': 1.2 }),
    );
  }
  const el = s('svg', { class: 'proj__scena', viewBox: '0 0 160 150', role: 'img', 'aria-label': `Próba ${litera}` }, [
    s('rect', { x: 0, y: 0, width: 160, height: 150, fill: '#FFF8DC' }),
    s('path', { d: 'M32 40 H128 L122 132 H38 Z', fill: '#EEF7FB', stroke: '#11191B', 'stroke-width': 3, 'stroke-linejoin': 'round' }),
    s('path', { d: 'M34 54 H126 L121 130 H39 Z', fill: '#CFE8F3' }),
    zimno,
    gaz,
    galazka,
    babelki,
    ciemnosc,
    s('circle', { cx: 22, cy: 22, r: 14, fill: '#FFFFFF', stroke: '#11191B', 'stroke-width': 3 }),
    s('text', { x: 22, y: 28, 'text-anchor': 'middle', class: 'scena-procesu__litera' }, litera),
  ]);
  return {
    el,
    ustaw(poziomy) {
      ciemnosc.setAttribute('opacity', poziomy.swiatlo === 0 ? '0.6' : '0');
      zimno.setAttribute('opacity', poziomy.temperatura !== undefined && poziomy.temperatura < 2 ? '0.55' : '0');
      gaz.setAttribute('opacity', poziomy.dwutlenek === 3 ? '1' : '0');
    },
    pokazPecherzyki(ile) {
      const n = Math.round((ile / F.MAKS_PECHERZYKOW) * 8);
      [...babelki.children].forEach((b, i) => {
        b.classList.toggle('babelek--ukryty', i >= n);
        b.style.setProperty('--czas', '1.8s');
        b.style.setProperty('--opoznienie', `${(-1.8 * i) / Math.max(n, 1)}s`);
      });
    },
  };
}

export function utworzProjektanta(kontener, { zadanie, onKoniec }) {
  const czynniki = zadanie.czynniki;
  const plan = { A: { ...zadanie.start.A }, B: { ...zadanie.start.B } };
  const wyniki = [];
  let probyPlanu = 0;
  let faza = 'plan';
  const komunikat = utworzKomunikat();
  const nazwaBadanego = F.CZYNNIK[zadanie.badany].nazwa;

  const poziomy = (proba) => {
    const u = { swiatlo: 3, dwutlenek: 2, temperatura: 2, sole: 2 };
    for (const c of czynniki) u[c.id] = c.opcje.find((o) => o.id === plan[proba][c.id]).poziom;
    return u;
  };

  const sceny = {};
  const przyciski = { A: new Map(), B: new Map() };
  const kolumny = PROBY.map((proba) => {
    sceny[proba] = scenaProby(proba);
    return h('section', { class: 'proj__proba', 'aria-label': `Próba ${proba}` }, [
      h('h3', { class: 'proj__naglowek' }, `Próba ${proba}`),
      sceny[proba].el,
      h(
        'ul',
        { class: 'proj__czynniki' },
        czynniki.map((c) =>
          h('li', { class: 'proj__czynnik' }, [
            h('span', { class: 'proj__nazwa' }, F.CZYNNIK[c.id].nazwa),
            h(
              'span',
              { class: 'proj__opcje', role: 'group', 'aria-label': `${F.CZYNNIK[c.id].nazwa}, próba ${proba}` },
              c.opcje.map((o) => {
                const b = h('button', { type: 'button', class: 'proj__opcja', 'data-proba': proba, 'data-czynnik': c.id, 'data-opcja': o.id, onclick: () => wybierz(proba, c.id, o.id) }, o.nazwa);
                przyciski[proba].set(`${c.id}|${o.id}`, b);
                return b;
              }),
            ),
          ]),
        ),
      ),
    ]);
  });
  const tabelaWynikow = h('table', { class: 'dosw__wyniki', hidden: true });
  const pytaniePanel = h('section', { class: 'dosw__krok', hidden: true, 'aria-live': 'polite' });
  const przycisk = h('button', { type: 'button', class: 'przycisk', onclick: dzialanie }, 'Sprawdź plan');
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: 'zadanie proj' }, [
    h('p', { class: 'proj__pytanie' }, [h('span', {}, 'Problem badawczy: '), h('strong', {}, zadanie.pytanie)]),
    h('div', { class: 'proj__plan' }, kolumny),
    tabelaWynikow,
    pytaniePanel,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, [przycisk, dalej])]),
  ]);
  kontener.append(korzen);
  odswiezPlan();
  komunikat.pokaz({
    rodzaj: 'info',
    tytul: 'Ustaw warunki obu prób.',
    tekst: `Zaplanuj doświadczenie tak, żeby wynik pokazał wpływ czynnika „${nazwaBadanego}”. Potem stuknij „Sprawdź plan”.`,
  });

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function odswiezPlan() {
    for (const proba of PROBY) {
      for (const [klucz, b] of przyciski[proba]) {
        const [cz, op] = klucz.split('|');
        b.setAttribute('aria-pressed', String(plan[proba][cz] === op));
      }
      sceny[proba].ustaw(poziomy(proba));
    }
  }

  function wybierz(proba, cz, op) {
    if (faza !== 'plan') return;
    plan[proba][cz] = op;
    odswiezPlan();
  }

  function dzialanie() {
    if (faza === 'plan') return sprawdzPlan();
    if (faza === 'gotowy-plan') return przeprowadz();
  }

  function sprawdzPlan() {
    probyPlanu += 1;
    const o = F.ocenPlan(plan.A, plan.B, zadanie.badany);
    const nazwy = (lista) => lista.map((id) => `„${F.CZYNNIK[id].nazwa}”`).join(' i ');
    if (o.dobry) {
      wyniki.push({ karta: 'proba-kontrolna', odRazu: probyPlanu === 1, poprawnie: true });
      faza = 'gotowy-plan';
      for (const b of korzen.querySelectorAll('.proj__opcja')) b.disabled = true;
      przycisk.textContent = 'Przeprowadź doświadczenie';
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Dobry plan.', tekst: `Próby różnią się tylko czynnikiem ${nazwy(o.roznice)}, a pozostałe warunki są identyczne. Każda różnica w wynikach będzie skutkiem tego czynnika.` });
      return;
    }
    const tekst = {
      zadna: `Próby niczym się nie różnią. Takie doświadczenie nie pokaże wpływu czynnika „${nazwaBadanego}”.`,
      wiele: `Próby różnią się kilkoma czynnikami: ${nazwy(o.roznice)}. Gdyby wyniki były różne, nie byłoby wiadomo, który czynnik je spowodował. Różnić się może tylko czynnik „${nazwaBadanego}”, a pozostałe warunki muszą być identyczne.`,
      inny: `Próby różnią się czynnikiem ${nazwy(o.roznice)}, a doświadczenie ma badać czynnik „${nazwaBadanego}”.`,
    }[o.powod];
    komunikat.pokaz({ rodzaj: 'zle', tytul: 'Ten plan trzeba poprawić.', tekst });
  }

  function przeprowadz() {
    faza = 'wyniki';
    przycisk.hidden = true;
    const liczby = Object.fromEntries(PROBY.map((p) => [p, F.pecherzyki(poziomy(p))]));
    for (const p of PROBY) sceny[p].pokazPecherzyki(liczby[p]);
    const opis = (p) => czynniki.map((c) => c.opcje.find((o) => o.id === plan[p][c.id]).nazwa).join(', ');
    tabelaWynikow.replaceChildren(
      h('thead', {}, h('tr', {}, [h('th', { scope: 'col' }, 'Próba'), h('th', { scope: 'col' }, 'Pęcherzyki tlenu w ciągu minuty')])),
      h('tbody', {}, PROBY.map((p) => h('tr', {}, [h('th', { scope: 'row' }, `${p}: ${opis(p)}`), h('td', {}, String(liczby[p]))]))),
    );
    tabelaWynikow.hidden = false;
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Doświadczenie przeprowadzone.', tekst: 'Porównaj liczby pęcherzyków i odpowiedz na pytania.' });
    pytania(0);
  }

  function pytania(indeks) {
    const krok = zadanie.pytania[indeks];
    let proby = 0;
    let rozwiazane = false;
    pytaniePanel.hidden = false;
    pytaniePanel.replaceChildren(
      h('p', { class: 'dosw__licznik' }, `Pytanie ${indeks + 1} z ${zadanie.pytania.length}`),
      h('p', { class: 'dosw__pytanie' }, krok.pytanie),
      h(
        'div',
        { class: 'dosw__opcje' },
        D.kolejnoscOpcji(krok, wymieszaj).map((i) =>
          h('button', { type: 'button', class: 'dosw__opcja', 'data-opcja': String(i), onclick: (e) => odpowiedz(i, e.currentTarget) }, krok.opcje[i].tekst),
        ),
      ),
    );
    dalej.hidden = true;

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
      for (const x of pytaniePanel.querySelectorAll('.dosw__opcja')) x.disabled = true;
      wyniki.push({ karta: krok.karta ?? null, odRazu: proby === 1, poprawnie: true });
      komunikat.pokaz({ rodzaj: 'dobrze', tytul: 'Tak.', tekst: r.tekst });
      const ostatnie = indeks === zadanie.pytania.length - 1;
      dalej.textContent = ostatnie ? 'Gotowe' : 'Dalej';
      dalej.hidden = false;
      dalej.onclick = () => {
        if (!ostatnie) return pytania(indeks + 1);
        dalej.hidden = true;
        korzen.classList.add('zadanie--gotowe');
        const karty = wyniki.filter((w) => w.karta);
        onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty });
      };
    }
  }
}

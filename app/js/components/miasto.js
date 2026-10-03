// Mechanika „Budowa miasta” (SPEC.md, sekcja 3.2, świat 2). Dane: data/miasto.js.
//
// faza 'budowa': gracz zatrudnia elementy do usług miasta (przeciąga nazwę na usługę).
//   Zatrudniony element pojawia się na planie komórki, a usługa zaczyna działać.
//   Dystraktory to elementy, których komórka zwierzęca nie ma.
// faza 'awarie': w gotowym mieście zdarzają się awarie; gracz stuka numer elementu na planie,
//   którego brak spowodował awarię. Po drugiej błędnej próbie numer jest podświetlony.
// Wynik: pierwsza próba dla każdej usługi (budowa) albo każdej awarii (awarie).

import { h, ikona } from '../core/dom.js';
import { utworzRysunek, dodajZnaczniki } from './podpisywanie.js';
import { utworzZadanieEtykiet } from './zadanie-etykiet.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj, zWielkiej } from './podpisywanie-logika.js';

export function utworzMiasto(kontener, opcje) {
  return opcje.zadanie.faza === 'awarie' ? utworzAwarie(kontener, opcje) : utworzBudowe(kontener, opcje);
}

function utworzBudowe(kontener, { zadanie, dane, miasto, svgTekst, tryb = 'trening', onKoniec }) {
  const elementPoId = new Map(dane.elementy.map((e) => [e.id, e]));
  const schemat = dane.schematy.find((x) => x.id === miasto.schemat);
  const typ = dane.typyKomorek.find((t) => t.id === schemat.typKomorki);
  const nazwa = (id) => elementPoId.get(id).nazwa;
  const uslugaPoElemencie = new Map(miasto.uslugi.map((u) => [u.element, u]));

  // Plan: rysunek komórki z ukrytymi elementami i przerywanym zarysem granicy.
  const rysunek = utworzRysunek(svgTekst, `Plan miasta: ${typ.nazwa}`, 'miasto__rysunek');
  const grupy = new Map();
  for (const g of rysunek.querySelectorAll('[data-element]')) {
    g.classList.add('miasto__ukryty');
    if (!grupy.has(g.dataset.element)) grupy.set(g.dataset.element, []);
    grupy.get(g.dataset.element).push(g);
  }
  const zarys = rysunek.querySelector('[data-element="blona-komorkowa"] path, [data-element="blona-komorkowa"] rect');
  if (zarys) {
    const plan = zarys.cloneNode(true);
    plan.setAttribute('class', 'miasto__zarys');
    rysunek.prepend(plan);
  }

  const wiersze = new Map();
  const lista = h(
    'ul',
    { class: 'miasto__uslugi' },
    wymieszaj(miasto.uslugi).map((u) => {
      const pole = h('span', { class: 'pole-celu__tekst' });
      const stanIkona = h('span', { class: 'pole-celu__ikona' });
      const slot = h('span', { class: 'pole-celu usluga__slot', 'data-stan': 'puste' }, [pole, stanIkona]);
      const li = h('li', { class: 'usluga', 'data-cel': u.element, 'data-stan': 'puste', role: 'button', tabindex: '0', 'aria-label': `${u.nazwa}: ${u.zlecenie}` }, [
        h('span', { class: 'usluga__nazwa' }, u.nazwa),
        h('span', { class: 'usluga__zlecenie' }, u.zlecenie),
        slot,
      ]);
      wiersze.set(u.element, { li, slot, pole, stanIkona });
      return li;
    }),
  );
  const plansza = h('div', { class: 'miasto__plansza' }, [h('figure', { class: 'miasto__plan' }, rysunek), lista]);

  const etykiety = [...miasto.uslugi.map((u) => u.element), ...(zadanie.dystraktory ?? [])].map((id) => ({
    id,
    tekst: nazwa(id),
    ikona: rysunekKarty(id, 'etykieta__rysunek'),
  }));

  const komponent = utworzZadanieEtykiet(kontener, {
    klasa: 'miasto miasto--budowa',
    tryb,
    plansza,
    etykiety,
    celeDoStukania: [...wiersze.values()].map((w) => w.li),
    def: {
      cele: miasto.uslugi.map((u) => u.element),
      etykiety: etykiety.map((e) => e.id),
      pasuje: (e, c) => e === c,
      pojemnosc: 1,
      klucze: 'cel',
    },
    pokazCel(cel, { etykiety: lezace, stan }) {
      const w = wiersze.get(cel);
      const zatrudniony = lezace.length > 0;
      w.li.dataset.stan = stan;
      w.slot.dataset.stan = stan;
      w.pole.textContent = lezace[0]?.tekst ?? '';
      w.stanIkona.replaceChildren(stan === 'dobrze' || stan === 'zle' ? ikona(stan) : '');
      for (const g of grupy.get(cel) ?? []) {
        if (zatrudniony && g.classList.contains('miasto__ukryty')) {
          g.classList.remove('miasto__ukryty');
          g.classList.add('miasto__nowy');
        }
      }
    },
    komunikaty: {
      wstep: {
        rodzaj: 'info',
        tytul: 'Przeciągnij nazwę elementu na usługę, którą wykona.',
        tekst: 'Możesz też stuknąć nazwę, a potem usługę. Zatrudniony element pojawi się na planie.',
      },
      wybor: (e) => ({ rodzaj: 'info', tytul: `Wybrany element: ${nazwa(e)}.`, tekst: 'Stuknij usługę, którą wykona.' }),
      dobrze: (e) => ({ rodzaj: 'dobrze', tytul: `Zatrudniony: ${nazwa(e)}. Usługa działa!`, tekst: elementPoId.get(e).funkcja }),
      zle: (e, c, proba) => {
        const u = uslugaPoElemencie.get(c);
        const powod =
          typ.obecnosc[e] === 'nie' ? `${zWielkiej(typ.nazwa)} nie ma ${elementPoId.get(e).brak}.` : elementPoId.get(e).funkcja;
        const tekst = proba >= 2 ? `${powod} Usługę „${u.nazwa}” wykona: ${nazwa(c)}.` : `${powod} Usługa „${u.nazwa}” potrzebuje innego elementu.`;
        return { komunikat: { rodzaj: 'zle', tytul: `${zWielkiej(nazwa(e))}: nie ta usługa.`, tekst }, podswietl: proba >= 2 ? c : null };
      },
      sprawdzian: (w) => ({ rodzaj: 'zle', tytul: `${uslugaPoElemencie.get(w.cel).nazwa}: ${nazwa(w.cel)}.`, tekst: elementPoId.get(w.cel).funkcja }),
    },
    kartaKlucza: (cel) => cel,
    onKoniec: (wynik) => {
      // Gotowe miasto: pokaż wszystkie elementy planu.
      for (const lista of grupy.values()) for (const g of lista) g.classList.remove('miasto__ukryty');
      onKoniec?.(wynik);
    },
  });
  return komponent;
}

function utworzAwarie(kontener, { zadanie, dane, miasto, svgTekst, onKoniec }) {
  const elementPoId = new Map(dane.elementy.map((e) => [e.id, e]));
  const schemat = dane.schematy.find((x) => x.id === miasto.schemat);
  const punkty = schemat.punkty.map((p, i) => ({ ...p, numer: i + 1 }));
  const punktElementu = new Map(punkty.map((p) => [p.element, p]));
  const awarie = wymieszaj(miasto.uslugi).slice(0, zadanie.ile);
  const wyniki = [];
  let indeks = 0;
  let proby = 0;
  let zakonczone = false;
  let rozwiazana = false;

  const rysunek = utworzRysunek(svgTekst, 'Plan miasta z numerami elementów', 'miasto__rysunek');
  const znaczniki = dodajZnaczniki(rysunek, punkty);
  const komunikat = utworzKomunikat();
  const licznik = h('p', { class: 'miasto__licznik' });
  const objaw = h('p', { class: 'miasto__objaw' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true, onclick: nastepna }, 'Następna awaria');
  const korzen = h('div', { class: 'zadanie miasto miasto--awarie' }, [
    h('div', { class: 'miasto__alarm', role: 'status' }, [licznik, objaw]),
    h('figure', { class: 'miasto__plan miasto__plan--numery' }, rysunek),
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  for (const [id, g] of znaczniki) {
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    const p = punkty.find((x) => x.id === id);
    g.setAttribute('aria-label', `Numer ${p.numer}`);
    g.addEventListener('click', () => wskaz(p));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        wskaz(p);
      }
    });
  }
  kontener.append(korzen);
  pokazAwarie();

  function biezaca() {
    return awarie[indeks];
  }

  function pokazAwarie() {
    proby = 0;
    rozwiazana = false;
    dalej.hidden = true;
    for (const g of znaczniki.values()) {
      g.dataset.stan = 'puste';
      g.classList.remove('znacznik--aktywny');
    }
    for (const g of rysunek.querySelectorAll('.miasto__naprawiony')) g.classList.remove('miasto__naprawiony');
    licznik.textContent = `Awaria ${indeks + 1} z ${awarie.length}`;
    objaw.textContent = biezaca().awaria;
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Który element przestał działać?', tekst: 'Stuknij jego numer na planie.' });
  }

  function wskaz(p) {
    if (zakonczone || rozwiazana) return;
    const u = biezaca();
    proby += 1;
    const g = znaczniki.get(p.id);
    if (p.element === u.element) {
      rozwiazana = true;
      wyniki.push({ karta: u.element, odRazu: proby === 1, poprawnie: true });
      g.dataset.stan = 'dobrze';
      for (const el of rysunek.querySelectorAll(`[data-element="${u.element}"]`)) el.classList.add('miasto__naprawiony');
      komunikat.pokaz({
        rodzaj: 'dobrze',
        tytul: `Tak, pod numerem ${p.numer}: ${elementPoId.get(u.element).nazwa}. Naprawione!`,
        tekst: elementPoId.get(u.element).funkcja,
      });
      dalej.textContent = indeks === awarie.length - 1 ? 'Gotowe' : 'Następna awaria';
      dalej.hidden = false;
      return;
    }
    g.dataset.stan = 'zle';
    g.classList.remove('blad');
    void g.getBoundingClientRect();
    g.classList.add('blad');
    setTimeout(() => {
      g.classList.remove('blad');
      if (g.dataset.stan === 'zle') g.dataset.stan = 'puste';
    }, 900);
    const wybrany = elementPoId.get(p.element);
    const poprawny = punktElementu.get(u.element);
    let tekst = `Pod numerem ${p.numer} jest ${wybrany.nazwa}. ${wybrany.funkcja}`;
    if (proby >= 2) {
      znaczniki.get(poprawny.id).classList.add('znacznik--aktywny');
      tekst += ` Awarię spowodował element pod numerem ${poprawny.numer}.`;
    }
    komunikat.pokaz({ rodzaj: 'zle', tytul: 'To nie ten element.', tekst });
  }

  function nastepna() {
    if (indeks === awarie.length - 1) return zakoncz();
    indeks += 1;
    pokazAwarie();
  }

  function zakoncz() {
    zakonczone = true;
    dalej.hidden = true;
    korzen.classList.add('zadanie--gotowe');
    onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki });
  }

  return {
    zniszcz() {
      korzen.remove();
    },
  };
}

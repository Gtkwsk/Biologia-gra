// Mechanika „Konstruktor czterech komórek” (SPEC.md, sekcja 3.2, świat 3). Logika: konstruktor-logika.js.
//
// Ten sam zestaw części (data/konstruktor.js) i kolejne plany komórek. Gracz przeciąga część na plan
// albo stuka część, a potem plan. Gra pilnuje reguł z danych o typach komórek i je wyjaśnia
// (np. jądro w bakterii: „Komórka bakteryjna nie ma jądra komórkowego…”). „Gotowe” sprawdza,
// czy na planie są wszystkie części, które ten typ komórki musi mieć.
// Wynik: plan zbudowany bez odrzuconej części i bez przedwczesnego „Gotowe” liczy się jako dobry od razu.

import { h } from '../core/dom.js';
import { wyliczenie } from '../core/tekst.js';
import { idKartyTypu } from '../core/karty.js';
import { utworzRysunek } from './podpisywanie.js';
import { utworzPrzeciaganie } from './przeciaganie.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj, zWielkiej } from './podpisywanie-logika.js';
import * as K from './konstruktor-logika.js';

// Części, które mają wszystkie komórki (TRESCI.md, sekcja 2.3).
const WSPOLNE = ['blona-komorkowa', 'cytozol', 'rybosomy'];

export function utworzKonstruktor(kontener, { zadanie, dane, czesci, rysunki, onKoniec }) {
  const elementPoId = new Map(dane.elementy.map((e) => [e.id, e]));
  const typPoId = new Map(dane.typyKomorek.map((t) => [t.id, t]));
  const plany = zadanie.plany.map((id) => typPoId.get(id));
  const karty = [];
  let poprawne = 0;
  let indeks = 0;
  let polozone = new Set();
  let bledy = 0;
  let przedwczesne = 0;
  let zbudowany = false;
  let grupy = new Map();

  const komunikat = utworzKomunikat();
  const naglowek = h('p', { class: 'konstruktor__naglowek' });
  const licznik = h('p', { class: 'konstruktor__licznik' });
  const plan = h('figure', { class: 'konstruktor__plan', 'data-cel': 'plan' });
  const bank = h('div', { class: 'bank', role: 'group', 'aria-label': 'Części komórki' });
  const gotowe = h('button', { type: 'button', class: 'przycisk', onclick: sprawdzGotowe }, 'Gotowe');
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true, onclick: nastepny }, 'Następny plan');
  const korzen = h('div', { class: 'zadanie konstruktor' }, [
    h('div', { class: 'konstruktor__plansza' }, [h('div', { class: 'konstruktor__opis' }, [naglowek, licznik]), plan]),
    h('div', { class: 'tacka' }, [komunikat.el, bank, h('div', { class: 'tacka__akcje' }, [gotowe, dalej])]),
  ]);

  const przeciaganie = utworzPrzeciaganie({
    korzen,
    aktywne: () => !zbudowany,
    onUpusc: (id) => dodaj(id),
    onStuknijCel: () => komunikat.pokaz({ rodzaj: 'info', tytul: 'Najpierw wybierz część.', tekst: 'Stuknij część na dole, a potem plan komórki.' }),
    onWybor: (id) => {
      if (id) komunikat.pokaz({ rodzaj: 'info', tytul: `Wybrana część: ${elementPoId.get(id).nazwa}.`, tekst: 'Stuknij plan komórki.' });
    },
  });
  const chipy = new Map();
  for (const id of wymieszaj(czesci)) {
    const chip = h('button', { type: 'button', class: 'etykieta', 'data-element': id }, [
      rysunekKarty(id, 'etykieta__rysunek'),
      h('span', { class: 'etykieta__tekst' }, elementPoId.get(id).nazwa),
    ]);
    przeciaganie.podlaczEtykiete(chip, id);
    chipy.set(id, chip);
    bank.append(chip);
  }
  przeciaganie.podlaczCel(plan);
  kontener.append(korzen);
  pokazPlan();

  function typ() {
    return plany[indeks];
  }

  function pokazPlan() {
    polozone = new Set();
    bledy = 0;
    przedwczesne = 0;
    zbudowany = false;
    const t = typ();
    const rysunek = utworzRysunek(rysunki.get(t.id), `Plan: ${t.nazwa}`, 'konstruktor__rysunek');
    grupy = new Map();
    for (const g of rysunek.querySelectorAll('[data-element]')) {
      g.classList.add('konstruktor__ukryty');
      if (!grupy.has(g.dataset.element)) grupy.set(g.dataset.element, []);
      grupy.get(g.dataset.element).push(g);
    }
    const zarys = rysunek.querySelector('[data-element="blona-komorkowa"] path, [data-element="blona-komorkowa"] rect');
    if (zarys) {
      const kontur = zarys.cloneNode(true);
      kontur.setAttribute('class', 'konstruktor__zarys');
      rysunek.prepend(kontur);
    }
    plan.replaceChildren(rysunek);
    for (const chip of chipy.values()) chip.hidden = false;
    gotowe.hidden = false;
    gotowe.disabled = false;
    dalej.hidden = true;
    korzen.classList.remove('zadanie--gotowe');
    naglowek.textContent = `Plan ${indeks + 1} z ${plany.length}: ${t.nazwa}`;
    odswiezLicznik();
    komunikat.pokaz({
      rodzaj: 'info',
      tytul: `Zbuduj: ${t.nazwa}.`,
      tekst: 'Przeciągnij na plan każdą część, którą ma ta komórka. Gdy skończysz, stuknij „Gotowe”.',
    });
  }

  function odswiezLicznik() {
    licznik.textContent = `Części na planie: ${polozone.size}`;
  }

  function odkryj(id) {
    for (const g of grupy.get(id) ?? []) {
      g.classList.remove('konstruktor__ukryty');
      g.classList.add('konstruktor__nowy');
    }
  }

  function dodaj(id) {
    if (zbudowany || polozone.has(id)) return;
    const t = typ();
    const r = K.regula(t, elementPoId.get(id));
    const nazwa = elementPoId.get(id).nazwa;
    if (r.decyzja === 'zakazana' || r.decyzja === 'nieznana') {
      bledy += 1;
      karty.push({ karta: id, odRazu: false, poprawnie: true });
      const chip = chipy.get(id);
      chip.classList.remove('blad');
      void chip.offsetWidth;
      chip.classList.add('blad');
      setTimeout(() => chip.classList.remove('blad'), 600);
      komunikat.pokaz({ rodzaj: 'zle', tytul: `${zWielkiej(nazwa)}: ta część nie pasuje do planu.`, tekst: r.zdanie ?? '' });
      return;
    }
    polozone.add(id);
    chipy.get(id).hidden = true;
    odkryj(id);
    odswiezLicznik();
    komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Dodano: ${nazwa}.`, tekst: r.zdanie });
  }

  function sprawdzGotowe() {
    if (zbudowany) return;
    const t = typ();
    const brak = K.brakujace(t, czesci, polozone);
    if (brak.length) {
      przedwczesne += 1;
      const ile = brak.length === 1 ? 'jednej części' : `${brak.length} części`;
      const podpowiedz = brak.some((id) => WSPOLNE.includes(id))
        ? 'Wszystkie komórki mają błonę komórkową, cytozol i rybosomy.'
        : 'Co jeszcze ma ta komórka: jądro komórkowe, mitochondria, wakuole, ścianę komórkową, chloroplasty?';
      komunikat.pokaz(
        przedwczesne === 1
          ? { rodzaj: 'zle', tytul: `Brakuje jeszcze ${ile}.`, tekst: podpowiedz }
          : { rodzaj: 'zle', tytul: `Brakuje ${wyliczenie(brak.map((id) => elementPoId.get(id).brak))}.`, tekst: 'Dodaj te części i stuknij „Gotowe”.' },
      );
      return;
    }
    zbudowany = true;
    przeciaganie.wyczyscWybor();
    // Elementy spoza zestawu części (np. siateczka śródplazmatyczna) pojawiają się po zbudowaniu.
    for (const [id] of grupy) if (!czesci.includes(id)) odkryj(id);
    const odRazu = bledy === 0 && przedwczesne === 0;
    if (odRazu) poprawne += 1;
    karty.push({ karta: idKartyTypu(t.id), odRazu, poprawnie: true });
    komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Zbudowane: ${t.nazwa}!`, tekst: `${zWielkiej(t.nazwa)} to ${t.opis}.` });
    gotowe.hidden = true;
    dalej.textContent = indeks === plany.length - 1 ? 'Gotowe' : 'Następny plan';
    dalej.hidden = false;
    korzen.classList.add('zadanie--gotowe');
  }

  function nastepny() {
    if (indeks === plany.length - 1) {
      dalej.hidden = true;
      onKoniec?.({ poprawne, wszystkie: plany.length, karty });
      return;
    }
    indeks += 1;
    pokazPlan();
  }

  return {
    zniszcz() {
      przeciaganie.zniszcz();
      korzen.remove();
    },
  };
}

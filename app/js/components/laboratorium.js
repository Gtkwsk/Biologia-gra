// Mechanika „Laboratorium fotosyntezy” i „Najsłabsze ogniwo” (SPEC.md, sekcja 3.2, świat 4).
// Model: fotosynteza-logika.js (czynnik najsłabszy). Sceny: laboratorium-sceny.js.
//
// zadanie.roslina: 'moczarka' (akwarium, licznik pęcherzyków tlenu; wody nie brakuje)
//                  albo 'szklarnia' (roślina w doniczce, miernik intensywności, także woda).
// zadanie.tryb:
//   'badanie' – kroki { czynnik, poziom }: gracz przewiduje skutek zmiany (więcej, mniej, bez
//               zmian), potem sam przesuwa suwak i widzi wynik z wyjaśnieniem przyczyny;
//               zadanie.cel: na końcu swobodne ustawienie wszystkich czynników na maksimum;
//   'ogniwo'  – przypadki { opis, ustawienia }: gracz wskazuje czynnik, który najbardziej
//               hamuje fotosyntezę, a potem go poprawia; licznik rośnie.
// Wynik: przewidywania (badanie) albo wskazania (ogniwo) od razu dobre.

import { h } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { scenaAkwarium, scenaSzklarni } from './laboratorium-sceny.js';
import * as F from './fotosynteza-logika.js';

const SKUTKI_PECHERZYKI = [
  { id: 'wzrosnie', tekst: 'Będzie ich więcej' },
  { id: 'zmaleje', tekst: 'Będzie ich mniej' },
  { id: 'bez-zmian', tekst: 'Nic się nie zmieni' },
];
const SKUTKI_INTENSYWNOSC = [
  { id: 'wzrosnie', tekst: 'Wzrośnie' },
  { id: 'zmaleje', tekst: 'Zmaleje' },
  { id: 'bez-zmian', tekst: 'Nie zmieni się' },
];

const zWielkiej = (t) => t.charAt(0).toUpperCase() + t.slice(1);

export function utworzLaboratorium(kontener, { zadanie, onKoniec }) {
  const moczarka = zadanie.roslina !== 'szklarnia';
  const czynniki = F.CZYNNIKI.filter((c) => !(moczarka && c.id === 'woda'));
  const scena = moczarka ? scenaAkwarium() : scenaSzklarni();
  const komunikat = utworzKomunikat();
  const wyniki = [];
  let u = {};
  let zakonczone = false;

  // Pomiar: licznik pęcherzyków (moczarka) albo miernik intensywności (szklarnia).
  const licznik = h('p', { class: 'lab__licznik', 'aria-live': 'polite' });
  const segmenty = Array.from({ length: 10 }, () => h('span', { class: 'lab__segment' }));
  const miernik = h('div', { class: 'lab__miernik', role: 'img' }, [h('span', { class: 'lab__miernik-napis' }, 'Intensywność fotosyntezy'), h('span', { class: 'lab__segmenty' }, segmenty)]);

  // Suwaki czynników
  const suwaki = new Map();
  const listaSuwakow = h(
    'ul',
    { class: 'lab__czynniki' },
    czynniki.map((c) => {
      const id = `suwak-${zadanie.id}-${c.id}`;
      const wartosc = h('span', { class: 'lab__poziom' });
      const input = h('input', { type: 'range', min: '0', max: String(c.poziomy.length - 1), step: '1', id, class: 'lab__suwak', 'data-czynnik': c.id, disabled: true });
      input.addEventListener('input', () => ustawCzynnik(c.id, Number(input.value)));
      const wiersz = h('li', { class: 'lab__czynnik', 'data-czynnik': c.id }, [
        h('label', { for: id, class: 'lab__nazwa' }, [rysunekKarty(c.ikona, 'lab__ikona'), zWielkiej(c.nazwa)]),
        input,
        wartosc,
      ]);
      suwaki.set(c.id, { input, wartosc, wiersz });
      return wiersz;
    }),
  );
  if (moczarka) listaSuwakow.append(h('li', { class: 'lab__czynnik lab__czynnik--staly' }, [h('span', { class: 'lab__nazwa' }, [rysunekKarty('woda', 'lab__ikona'), 'Woda']), h('span', { class: 'lab__poziom' }, 'pod dostatkiem: moczarka żyje w wodzie')]));

  const panel = h('section', { class: 'lab__panel', 'aria-live': 'polite' });
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true }, 'Dalej');
  const korzen = h('div', { class: `zadanie lab lab--${zadanie.tryb}` }, [
    h('div', { class: 'lab__stol' }, [h('figure', { class: 'lab__widok' }, [scena.el, moczarka ? licznik : miernik]), listaSuwakow]),
    panel,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);

  function pomiar() {
    return moczarka ? `${F.pecherzyki(u)} na minutę` : `${Math.round(F.intensywnosc(u) * 100)}% największej`;
  }

  function odswiez() {
    scena.ustaw(u);
    for (const c of czynniki) {
      const { input, wartosc } = suwaki.get(c.id);
      input.value = String(u[c.id]);
      wartosc.textContent = F.nazwaPoziomu(c.id, u[c.id], zadanie.roslina);
      input.setAttribute('aria-valuetext', F.nazwaPoziomu(c.id, u[c.id], zadanie.roslina));
    }
    if (moczarka) {
      licznik.replaceChildren(h('span', { class: 'lab__licznik-napis' }, 'Pęcherzyki tlenu: '), h('strong', {}, String(F.pecherzyki(u))), ' na minutę');
    } else {
      const pelne = Math.round(F.intensywnosc(u) * 10);
      segmenty.forEach((sg, i) => (sg.dataset.pelny = String(i < pelne)));
      miernik.setAttribute('aria-label', `Intensywność fotosyntezy: ${pelne} z 10`);
    }
  }

  function wlaczSuwaki(ids) {
    for (const [id, { input, wiersz }] of suwaki) {
      input.disabled = !ids.includes(id);
      wiersz.classList.toggle('lab__czynnik--aktywny', ids.includes(id) && ids.length < suwaki.size);
    }
  }

  let ustawCzynnik = () => {};

  if (zadanie.tryb === 'ogniwo') ogniwo();
  else badanie();

  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function zakoncz() {
    zakonczone = true;
    dalej.hidden = true;
    wlaczSuwaki([]);
    korzen.classList.add('zadanie--gotowe');
    onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki });
  }

  // ---------- Badanie: przewidywanie skutków zmian ----------
  function badanie() {
    const kroki = zadanie.kroki;
    const skutki = moczarka ? SKUTKI_PECHERZYKI : SKUTKI_INTENSYWNOSC;
    let indeks = 0;
    let faza = 'przewidywanie';
    let przed = null;
    let licznikZmian = 0;
    u = F.ustawieniaPelne({ ...zadanie.start });
    if (moczarka) delete u.woda;
    odswiez();
    pokazKrok();

    function pokazKrok() {
      const k = kroki[indeks];
      const c = F.CZYNNIK[k.czynnik];
      faza = 'przewidywanie';
      dalej.hidden = true;
      wlaczSuwaki([]);
      const pytanie = moczarka ? 'Co stanie się z liczbą pęcherzyków tlenu?' : 'Co stanie się z intensywnością fotosyntezy?';
      panel.replaceChildren(
        h('p', { class: 'lab__krok' }, `Doświadczenie ${indeks + 1} z ${kroki.length}`),
        h('p', { class: 'lab__polecenie' }, [`Zmienisz czynnik „${c.nazwa}”: z „${F.nazwaPoziomu(c.id, u[c.id], zadanie.roslina)}” na „${F.nazwaPoziomu(c.id, k.poziom, zadanie.roslina)}”. `, h('strong', {}, pytanie)]),
        h(
          'div',
          { class: 'lab__opcje' },
          skutki.map((sk) => h('button', { type: 'button', class: 'przycisk przycisk--jasny lab__opcja', 'data-skutek': sk.id, onclick: (e) => przewiduj(sk.id, e.currentTarget) }, sk.tekst)),
        ),
      );
      komunikat.pokaz({ rodzaj: 'info', tytul: 'Najpierw przewidź, potem sprawdź.', tekst: 'Wybierz odpowiedź, a potem przesuń suwak.' });
    }

    function przewiduj(id, przycisk) {
      if (faza !== 'przewidywanie') return;
      const k = kroki[indeks];
      const oczekiwany = F.skutek(u, k.czynnik, k.poziom);
      const dobrze = id === oczekiwany;
      wyniki.push({ karta: F.CZYNNIK[k.czynnik].karta, odRazu: dobrze, poprawnie: true });
      przycisk.dataset.stan = dobrze ? 'dobrze' : 'zle';
      for (const b of panel.querySelectorAll('.lab__opcja')) b.disabled = true;
      faza = 'ustawianie';
      przed = { ...u };
      wlaczSuwaki([k.czynnik]);
      const c = F.CZYNNIK[k.czynnik];
      komunikat.pokaz(
        dobrze
          ? { rodzaj: 'dobrze', tytul: 'Dobre przewidywanie. Sprawdź je.', tekst: `Przesuń suwak „${c.nazwa}” na „${F.nazwaPoziomu(c.id, k.poziom, zadanie.roslina)}”.` }
          : { rodzaj: 'zle', tytul: 'Sprawdź, co się naprawdę stanie.', tekst: `Przesuń suwak „${c.nazwa}” na „${F.nazwaPoziomu(c.id, k.poziom, zadanie.roslina)}” i obserwuj ${moczarka ? 'pęcherzyki' : 'miernik'}.` },
      );
      suwaki.get(k.czynnik).input.focus({ preventScroll: true });
    }

    function cel() {
      faza = 'cel';
      licznikZmian = 0;
      wlaczSuwaki(czynniki.map((c) => c.id));
      panel.replaceChildren(
        h('p', { class: 'lab__krok' }, 'Zadanie końcowe'),
        h('p', { class: 'lab__polecenie' }, moczarka
          ? `Ustaw wszystkie czynniki tak, żeby moczarka wydzielała najwięcej pęcherzyków tlenu: ${F.MAKS_PECHERZYKOW} na minutę.`
          : 'Ustaw wszystkie czynniki tak, żeby fotosynteza była jak najintensywniejsza.'),
      );
      komunikat.pokaz({ rodzaj: 'info', tytul: 'Znajdź najlepsze warunki.', tekst: 'Pamiętaj: zarówno niedobór, jak i nadmiar każdego czynnika zmniejsza intensywność fotosyntezy.' });
    }

    ustawCzynnik = (id, v) => {
      if (zakonczone) return;
      u = { ...u, [id]: v };
      odswiez();
      if (faza === 'ustawianie') {
        const k = kroki[indeks];
        if (id !== k.czynnik || v !== k.poziom) return;
        faza = 'wynik';
        wlaczSuwaki([]);
        const tytul = moczarka
          ? `Pęcherzyki tlenu: ${F.pecherzyki(przed)} → ${F.pecherzyki(u)} na minutę.`
          : `Intensywność fotosyntezy: ${Math.round(F.intensywnosc(przed) * 10)} → ${Math.round(F.intensywnosc(u) * 10)} z 10.`;
        komunikat.pokaz({ rodzaj: 'info', tytul, tekst: F.wyjasnienieSkutku(przed, k.czynnik, k.poziom) });
        dalej.textContent = indeks === kroki.length - 1 && !zadanie.cel ? 'Gotowe' : 'Dalej';
        dalej.hidden = false;
        dalej.onclick = () => {
          if (indeks < kroki.length - 1) {
            indeks += 1;
            pokazKrok();
          } else if (zadanie.cel) {
            dalej.hidden = true;
            cel();
          } else zakoncz();
        };
        return;
      }
      if (faza === 'cel') {
        licznikZmian += 1;
        if (F.intensywnosc(u) >= 1) {
          faza = 'koniec';
          komunikat.pokaz({
            rodzaj: 'dobrze',
            tytul: moczarka ? `Najwięcej pęcherzyków: ${F.pecherzyki(u)} na minutę!` : 'Fotosynteza jest najintensywniejsza!',
            tekst: 'Wszystkie czynniki są w sam raz: żaden nie jest za słaby ani za mocny.',
          });
          wlaczSuwaki([]);
          dalej.textContent = 'Gotowe';
          dalej.hidden = false;
          dalej.onclick = zakoncz;
        } else if (licznikZmian % 5 === 0) {
          const hamuje = F.najslabsze(u).map((x) => F.CZYNNIK[x].nazwa).join(' i ');
          komunikat.pokaz({ rodzaj: 'info', tytul: `Najbardziej hamuje teraz: ${hamuje}.`, tekst: F.najslabsze(u).map((x) => F.wyjasnienieCzynnika(x, u[x])).join(' ') });
        }
      }
    };
  }

  // ---------- Najsłabsze ogniwo ----------
  function ogniwo() {
    const przypadki = zadanie.przypadki;
    let indeks = 0;
    let faza = 'wskaz';
    let proby = 0;
    let przed = null;

    pokazPrzypadek();

    function hamujacy() {
      return F.najslabsze(u)[0];
    }

    function pokazPrzypadek() {
      const p = przypadki[indeks];
      u = { ...p.ustawienia };
      if (moczarka) delete u.woda;
      faza = 'wskaz';
      proby = 0;
      dalej.hidden = true;
      wlaczSuwaki([]);
      for (const { wiersz } of suwaki.values()) wiersz.classList.remove('lab__czynnik--podpowiedz');
      odswiez();
      panel.replaceChildren(
        h('p', { class: 'lab__krok' }, `Przypadek ${indeks + 1} z ${przypadki.length}`),
        h('p', { class: 'lab__polecenie' }, [p.opis, ' ', h('strong', {}, 'Który czynnik najbardziej hamuje fotosyntezę?')]),
        h(
          'div',
          { class: 'lab__opcje' },
          czynniki.map((c) => h('button', { type: 'button', class: 'przycisk przycisk--jasny lab__opcja', 'data-czynnik': c.id, onclick: (e) => wskaz(c.id, e.currentTarget) }, zWielkiej(c.nazwa))),
        ),
      );
      komunikat.pokaz({ rodzaj: 'info', tytul: 'Znajdź najsłabsze ogniwo.', tekst: 'Przyjrzyj się suwakom: który czynnik jest najbardziej niekorzystny?' });
    }

    function wskaz(id, przycisk) {
      if (faza !== 'wskaz') return;
      proby += 1;
      const cel = hamujacy();
      const c = F.CZYNNIK[id];
      if (id === cel) {
        wyniki.push({ karta: c.karta, odRazu: proby === 1, poprawnie: true });
        przycisk.dataset.stan = 'dobrze';
        for (const b of panel.querySelectorAll('.lab__opcja')) b.disabled = true;
        faza = 'popraw';
        przed = { ...u };
        wlaczSuwaki([id]);
        komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Tak: ${c.nazwa}.`, tekst: `${F.wyjasnienieCzynnika(id, u[id])} Popraw ten czynnik suwakiem.` });
        suwaki.get(id).input.focus({ preventScroll: true });
        return;
      }
      przycisk.dataset.stan = 'zle';
      przycisk.disabled = true;
      const stan = F.stanCzynnika(id, u[id]);
      const tekst =
        stan === 'optimum'
          ? `${zWielkiej(c.nazwa)} ${id === 'sole' ? 'są' : 'jest'} teraz w sam raz. Szukaj czynnika, którego jest za mało albo za dużo.`
          : `${F.wyjasnienieCzynnika(id, u[id])} Ale inny czynnik hamuje fotosyntezę jeszcze bardziej.`;
      if (proby >= 2) suwaki.get(cel).wiersz.classList.add('lab__czynnik--podpowiedz');
      komunikat.pokaz({ rodzaj: 'zle', tytul: `To nie ${c.nazwa}.`, tekst });
    }

    ustawCzynnik = (id, v) => {
      if (zakonczone || faza !== 'popraw') return;
      u = { ...u, [id]: v };
      odswiez();
      if (v !== F.optimum(id)) return;
      faza = 'wynik';
      wlaczSuwaki([]);
      const tytul = moczarka
        ? `Pęcherzyki tlenu: ${F.pecherzyki(przed)} → ${F.pecherzyki(u)} na minutę.`
        : `Intensywność fotosyntezy: ${Math.round(F.intensywnosc(przed) * 10)} → ${Math.round(F.intensywnosc(u) * 10)} z 10.`;
      const nastepny = F.najslabsze(u);
      const tekst = nastepny.length
        ? `${F.wyjasnienieCzynnika(id, v)} Teraz ${nastepny.length === 1 ? 'najsłabszym ogniwem jest' : 'najsłabszymi ogniwami są'} ${nastepny.map((x) => F.CZYNNIK[x].nazwa).join(' i ')}.`
        : `${F.wyjasnienieCzynnika(id, v)} Wszystkie czynniki są teraz w sam raz.`;
      komunikat.pokaz({ rodzaj: 'dobrze', tytul, tekst });
      dalej.textContent = indeks === przypadki.length - 1 ? 'Gotowe' : 'Następny przypadek';
      dalej.hidden = false;
      dalej.onclick = () => {
        if (indeks === przypadki.length - 1) return zakoncz();
        indeks += 1;
        pokazPrzypadek();
      };
    };
  }
}

// Zadanie „szybki sorter” (SPEC.md, sekcja 5, typ 8): zdania do 2-3 kategorii.
// Logika: sorter-logika.js.
//
// zadanie.kategorie: [{ id, nazwa, skrot?, karta? }]
// zadanie.zdania:    [{ tekst, kategoria, wyjasnienie, karta? }]
// zadanie.scena:     opcjonalna scena nad talią (sceny-procesow.js); dobra odpowiedź ożywia
//                    część sceny przypisaną do kategorii (np. trzy drogi glukozy).
// Trening: jedno zdanie naraz. Dobra odpowiedź od razu odkłada zdanie na stos kategorii,
//   błędna pokazuje przyczynę, a zdanie wraca na koniec talii.
// Sprawdzian: lista wszystkich zdań z wyborem kategorii i jedno „Sprawdź”.

import { h, ikona } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { wymieszaj } from './podpisywanie-logika.js';
import { scenaProcesu } from './sceny-procesow.js';
import * as S from './sorter-logika.js';

export function utworzSorter(kontener, { zadanie, tryb = 'trening', onKoniec }) {
  const kategorie = zadanie.kategorie;
  const katPoId = new Map(kategorie.map((k) => [k.id, k]));
  const zdania = zadanie.zdania;
  const kartaZdania = (z) => z.karta ?? katPoId.get(z.kategoria).karta ?? null;
  const komunikat = utworzKomunikat();
  const scena = zadanie.scena ? scenaProcesu(zadanie.scena) : null;
  const korzen = h('div', { class: `zadanie sorter sorter--${tryb}`, 'data-kategorie': String(kategorie.length) });
  kontener.append(korzen);

  const przyciskKategorii = (k, onclick) =>
    h('button', { type: 'button', class: 'sorter__kategoria', 'data-kategoria': k.id, onclick }, [
      k.skrot ? h('span', { class: 'sorter__skrot', 'aria-hidden': 'true' }, k.skrot) : rysunekKarty(k.karta, 'sorter__rysunek'),
      h('span', { class: 'sorter__nazwa' }, k.nazwa),
    ]);

  if (tryb === 'sprawdzian') sprawdzian();
  else trening();
  return {
    zniszcz() {
      korzen.remove();
    },
  };

  function trening() {
    let talia = S.nowaTalia(zdania.length, wymieszaj(zdania.map((_, i) => i)));
    let czekaNaDalej = false;
    const licznik = h('p', { class: 'sorter__licznik' });
    const karta = h('p', { class: 'sorter__karta', 'aria-live': 'polite' });
    const przyciski = kategorie.map((k) => przyciskKategorii(k, () => wybierz(k.id)));
    const stosy = new Map(kategorie.map((k) => [k.id, h('ul', { class: 'sorter__stos-lista' })]));
    const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true, onclick: nastepne }, 'Dalej');
    korzen.append(
      scena ? h('figure', { class: 'sorter__scena' }, scena.el) : null,
      h('div', { class: 'sorter__stol' }, [licznik, karta, h('div', { class: 'sorter__kategorie' }, przyciski)]),
      h(
        'div',
        { class: 'sorter__stosy' },
        kategorie.map((k) => h('section', { class: 'sorter__stos', 'data-kategoria': k.id, 'aria-label': k.nazwa }, [h('h3', { class: 'sorter__stos-nazwa' }, k.nazwa), stosy.get(k.id)])),
      ),
      h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
    );
    komunikat.pokaz({
      rodzaj: 'info',
      tytul: 'Do której grupy pasuje to zdanie?',
      tekst: `Stuknij przycisk: ${kategorie.map((k) => k.nazwa).join(' albo ')}.`,
    });
    pokaz();

    function pokaz() {
      const i = S.biezace(talia);
      const ulozone = Object.keys(talia.ulozone).length;
      licznik.textContent = `Ułożone: ${ulozone} z ${zdania.length}`;
      karta.textContent = zdania[i].tekst;
      karta.dataset.stan = '';
      karta.classList.remove('sorter__karta--nowa');
      void karta.offsetWidth;
      karta.classList.add('sorter__karta--nowa');
      for (const p of przyciski) p.disabled = false;
    }

    function wybierz(idKat) {
      if (czekaNaDalej || S.czyKoniec(talia)) return;
      const i = S.biezace(talia);
      const z = zdania[i];
      const r = S.odpowiedz(talia, zdania, idKat);
      talia = r.talia;
      if (r.dobrze) {
        stosy.get(idKat).append(h('li', {}, z.tekst));
        scena?.pokaz(idKat);
        komunikat.pokaz({ rodzaj: 'dobrze', tytul: `Tak: ${katPoId.get(idKat).nazwa}.`, tekst: z.wyjasnienie });
        if (S.czyKoniec(talia)) return zakoncz();
        pokaz();
        return;
      }
      czekaNaDalej = true;
      karta.dataset.stan = 'zle';
      for (const p of przyciski) p.disabled = true;
      komunikat.pokaz({
        rodzaj: 'zle',
        tytul: `To nie ${katPoId.get(idKat).nazwa}.`,
        tekst: `${z.wyjasnienie} To zdanie wróci na koniec talii.`,
      });
      dalej.hidden = false;
      dalej.focus({ preventScroll: true });
    }

    function nastepne() {
      czekaNaDalej = false;
      dalej.hidden = true;
      pokaz();
    }

    function zakoncz() {
      licznik.textContent = `Ułożone: ${zdania.length} z ${zdania.length}`;
      karta.textContent = 'Wszystkie zdania ułożone.';
      karta.dataset.stan = 'dobrze';
      for (const p of przyciski) p.disabled = true;
      korzen.classList.add('zadanie--gotowe');
      onKoniec?.(S.wynik(zdania, talia.pierwsza, kartaZdania, 'trening'));
    }
  }

  function sprawdzian() {
    const odpowiedzi = {};
    let zakonczone = false;
    const wiersze = zdania.map((z, i) => {
      const przyciski = kategorie.map((k) => {
        const b = przyciskKategorii(k, () => {
          if (zakonczone) return;
          odpowiedzi[i] = odpowiedzi[i] === k.id ? undefined : k.id;
          for (const x of przyciski) x.setAttribute('aria-pressed', String(odpowiedzi[i] === x.dataset.kategoria));
        });
        b.setAttribute('aria-pressed', 'false');
        return b;
      });
      const znak = h('span', { class: 'sorter__znak' });
      const li = h('li', { class: 'sorter__wiersz', 'data-indeks': String(i) }, [
        h('p', { class: 'sorter__tekst' }, [h('span', { class: 'sorter__numer' }, `${i + 1}.`), ' ', z.tekst]),
        h('div', { class: 'sorter__wybor', role: 'group', 'aria-label': `Zdanie ${i + 1}` }, przyciski),
        znak,
      ]);
      return { li, przyciski, znak };
    });
    const przyciskSprawdz = h('button', { type: 'button', class: 'przycisk', onclick: sprawdz }, 'Sprawdź');
    korzen.append(
      h('ol', { class: 'sorter__lista' }, wiersze.map((w) => w.li)),
      h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, przyciskSprawdz)]),
    );
    komunikat.pokaz({
      rodzaj: 'info',
      tytul: 'Przy każdym zdaniu wybierz grupę.',
      tekst: `${kategorie.map((k) => (k.skrot ? `${k.skrot}: ${k.nazwa}` : k.nazwa)).join('; ')}. Potem stuknij „Sprawdź”.`,
    });

    function sprawdz() {
      if (zakonczone) return;
      zakonczone = true;
      przyciskSprawdz.disabled = true;
      const wyniki = S.ocen(zdania, odpowiedzi);
      const pierwsza = {};
      for (const w of wyniki) {
        pierwsza[w.indeks] = w.dobrze;
        const { li, przyciski, znak } = wiersze[w.indeks];
        li.dataset.stan = w.dobrze ? 'dobrze' : 'zle';
        znak.replaceChildren(ikona(w.dobrze ? 'dobrze' : 'zle'));
        for (const p of przyciski) {
          p.disabled = true;
          if (p.dataset.kategoria === zdania[w.indeks].kategoria) p.dataset.poprawna = 'true';
        }
      }
      const bledne = wyniki.filter((w) => !w.dobrze);
      komunikat.pokazListe(
        bledne.length
          ? bledne.map((w) => ({
              rodzaj: 'zle',
              tytul: `Zdanie ${w.indeks + 1}: ${katPoId.get(zdania[w.indeks].kategoria).nazwa}.`,
              tekst: w.podana ? zdania[w.indeks].wyjasnienie : `Bez odpowiedzi. ${zdania[w.indeks].wyjasnienie}`,
            }))
          : [{ rodzaj: 'dobrze', tytul: 'Wszystkie zdania poprawnie.' }],
      );
      korzen.classList.add('zadanie--gotowe');
      onKoniec?.(S.wynik(zdania, pierwsza, kartaZdania, 'sprawdzian'));
    }
  }
}

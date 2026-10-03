// Misja: kolejne wyzwania świata. Wynik zapisywany po każdym wyzwaniu.
// misja.losuj: jeśli podane, misja wybiera tyle zadań z listy (przy każdym podejściu inne).

import { h, wyczysc, ograniczRuch } from '../core/dom.js';
import { otwarteSwiaty } from '../core/swiaty.js';
import { zapiszWynik } from '../core/stan.js';
import { dzisiaj } from '../core/daty.js';
import { kartyZBledem } from '../core/karty.js';
import { zaladujZadanie } from '../components/zadania.js';
import { wymieszaj } from '../components/podpisywanie-logika.js';
import { pasek, ekranNiedostepny } from './wspolne.js';

export function wybierzZadania(misja, zadania) {
  const lista = misja.zadania.map((id) => zadania.find((z) => z.id === id));
  return misja.losuj ? wymieszaj(lista).slice(0, misja.losuj) : lista;
}

export function render(kontener, ctx, cel) {
  const sw = ctx.dane.swiaty.find((s) => s.id === cel.swiat);
  const misja = sw?.misje.find((m) => m.id === cel.misja);
  if (!sw?.gotowy || !misja || !otwarteSwiaty(ctx.dane.swiaty, ctx.stan).has(sw.id)) {
    ekranNiedostepny(kontener, { tytul: 'Nie ma takiej misji', tekst: 'Wybierz misję na mapie wyprawy.' });
    return null;
  }
  const zadania = wybierzZadania(misja, ctx.dane.zadania);
  const nazwaKarty = (id) => ctx.dane.katalog.get(id)?.nazwa ?? id;

  let indeks = 0;
  let komponent = null;
  let zamkniety = false;

  const licznik = h('span', { class: 'pasek__licznik' });
  const polecenie = h('h1', { class: 'misja__polecenie' });
  const obszar = h('div', { class: 'misja__obszar' });
  const wynik = h('section', { class: 'misja__wynik', hidden: true, 'aria-live': 'polite' });

  kontener.append(
    h('div', { class: 'ekran ekran--misja', 'data-swiat': sw.id }, [
      pasek({ wstecz: { tekst: 'Wyjdź', href: `#/swiat/${sw.id}` }, tytul: misja.nazwa, prawa: licznik }),
      polecenie,
      obszar,
      wynik,
    ]),
  );
  pokazZadanie();

  return {
    zniszcz() {
      zamkniety = true;
      komponent?.zniszcz();
    },
  };

  async function pokazZadanie() {
    const zadanie = zadania[indeks];
    licznik.textContent = `Wyzwanie ${indeks + 1} z ${zadania.length}`;
    polecenie.textContent = zadanie.tresc;
    obszar.dataset.zadanie = zadanie.id;
    wynik.hidden = true;
    wyczysc(wynik);
    komponent?.zniszcz();
    komponent = null;
    wyczysc(obszar);
    obszar.append(h('p', { class: 'wczytywanie' }, 'Wczytywanie…'));
    let utworz;
    try {
      utworz = await zaladujZadanie(zadanie, ctx.dane);
    } catch {
      if (zamkniety) return;
      wyczysc(obszar);
      obszar.append(
        h('div', { class: 'karta-komunikatu' }, [
          h('p', {}, 'Nie udało się wczytać wyzwania.'),
          h('button', { type: 'button', class: 'przycisk', onclick: pokazZadanie }, 'Spróbuj ponownie'),
        ]),
      );
      return;
    }
    if (zamkniety) return;
    wyczysc(obszar);
    const start = performance.now();
    komponent = utworz(obszar, { tryb: 'trening', onKoniec: (w) => zakonczZadanie(zadanie, w, performance.now() - start) });
  }

  function zakonczZadanie(zadanie, w, czasMs) {
    ctx.zmien((stan) =>
      zapiszWynik(stan, {
        idZadania: zadanie.id,
        typ: zadanie.typ,
        poprawne: w.poprawne,
        wszystkie: w.wszystkie,
        karty: w.karty,
        czasMs,
        dzien: dzisiaj(),
      }),
    );
    ctx.sesja.wyniki.push({ idZadania: zadanie.id, swiat: sw.id, ...w });
    pokazWynik(zadanie, w);
  }

  function pokazWynik(zadanie, w) {
    const ostatnie = indeks === zadania.length - 1;
    const wszystkieDobrze = w.poprawne === w.wszystkie;
    const doCwiczenia = kartyZBledem(w);
    wyczysc(wynik);
    wynik.append(
      h('h2', { class: 'misja__wynik-tytul' }, wszystkieDobrze ? 'Wszystko od razu dobrze!' : `Od razu dobrze: ${w.poprawne} z ${w.wszystkie}`),
      doCwiczenia.length
        ? h('p', { class: 'misja__do-cwiczenia' }, [h('strong', {}, 'Do poćwiczenia: '), doCwiczenia.map(nazwaKarty).join(', '), '.'])
        : null,
      h('p', { class: 'misja__wyjasnienie' }, zadanie.wyjasnienie),
      ostatnie ? h('p', { class: 'misja__koniec' }, `Misja „${misja.nazwa}” zakończona.`) : null,
      h('div', { class: 'przyciski' }, [
        h('button', { type: 'button', class: 'przycisk przycisk--jasny', onclick: pokazZadanie }, 'Jeszcze raz'),
        ostatnie ? h('a', { class: 'przycisk przycisk--jasny', href: `#/swiat/${sw.id}` }, 'Misje świata') : null,
        ostatnie
          ? h('a', { class: 'przycisk przycisk--dalej', href: '#/podsumowanie' }, 'Zakończ wyprawę')
          : h(
              'button',
              {
                type: 'button',
                class: 'przycisk przycisk--dalej',
                onclick: () => {
                  indeks += 1;
                  pokazZadanie();
                },
              },
              'Dalej',
            ),
      ]),
    );
    wynik.hidden = false;
    wynik.scrollIntoView({ behavior: ograniczRuch() ? 'auto' : 'smooth', block: 'nearest' });
  }
}

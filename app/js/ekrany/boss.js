// Boss świata (SPEC.md, sekcja 4.3): wyzwania w formatach sprawdzianu, bez podpowiedzi,
// trzy serca zamiast limitu czasu. Logika: core/boss.js.

import { h, dolacz, ikona, wyczysc, ograniczRuch } from '../core/dom.js';
import { otwarteSwiaty } from '../core/swiaty.js';
import { zapiszWynik, zaliczBossa } from '../core/stan.js';
import { dzisiaj } from '../core/daty.js';
import { kartyZBledem, kartyOdRazu } from '../core/karty.js';
import * as B from '../core/boss.js';
import { sprawdzianDostepny } from '../core/sprawdzian.js';
import { zaladujZadanie } from '../components/zadania.js';
import { graj } from '../core/dzwieki.js';
import { pasek, soczewka, ekranNiedostepny } from './wspolne.js';

const NAZWY_TYPOW = {
  podpisywanie: 'podpisanie schematu',
  przyporzadkowanie: 'przyporządkowanie',
  luki: 'uzupełnianie zdań',
  klasyfikacja: 'klasyfikacja',
  'prawda-falsz': 'prawda czy fałsz',
  tabela: 'tabela porównawcza',
  porownanie: 'tabela porównawcza',
  doswiadczenie: 'doświadczenie',
  sorter: 'przyporządkowanie zdań',
};

// Tabela ✓/✗ z procesami (co powstaje w procesie) to inne zadanie niż tabela porównawcza.
function nazwaTypu(z) {
  if (z.typ === 'tabela' && z.procesy) return 'tabela produktów';
  return NAZWY_TYPOW[z.typ] ?? z.typ;
}

export function serca(liczba) {
  return h(
    'span',
    { class: 'serca', role: 'img', 'aria-label': `Serca: ${liczba} z ${B.SERCA}` },
    Array.from({ length: B.SERCA }, (_, i) => h('span', { class: 'serce', 'data-pelne': String(i < liczba) }, ikona('serce'))),
  );
}

export function render(kontener, ctx, cel) {
  const sw = ctx.dane.swiaty.find((s) => s.id === cel.swiat);
  if (!sw?.gotowy || !sw.boss || !otwarteSwiaty(ctx.dane.swiaty, ctx.stan).has(sw.id)) {
    ekranNiedostepny(kontener, { tytul: 'Nie ma tu bossa', tekst: 'Wybierz świat na mapie wyprawy.' });
    return null;
  }
  const boss = sw.boss;
  const nazwaKarty = (id) => ctx.dane.katalog.get(id)?.nazwa ?? id;
  let komponent = null;
  let zamkniety = false;
  let wyzwania = [];
  let podejscie = null;

  const ekran = h('div', { class: 'ekran ekran--boss', 'data-swiat': sw.id });
  kontener.append(ekran);

  if (!B.bossDostepny(sw, ctx.stan)) {
    ekran.append(
      pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
      h('section', { class: 'boss-karta' }, [
        h('h1', {}, boss.nazwa),
        h('p', {}, 'Boss czeka na końcu świata. Najpierw ukończ wszystkie misje.'),
        h('p', { class: 'boss-karta__postep' }, `Ukończone misje: ${B.misjeUkonczone(sw, ctx.stan)} z ${sw.misje.length}`),
        h('a', { class: 'przycisk', href: `#/swiat/${sw.id}` }, 'Misje świata'),
      ]),
    );
    return null;
  }

  pokazWstep();

  return {
    zniszcz() {
      zamkniety = true;
      komponent?.zniszcz();
    },
  };

  function pokazWstep() {
    wyzwania = B.wylosujWyzwania(boss, ctx.dane.zadania);
    podejscie = B.nowePodejscie(wyzwania.length);
    const pokonany = ctx.stan.bossowie.includes(sw.id);
    wyczysc(ekran);
    ekran.append(
      pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
      h('section', { class: 'boss-karta boss-karta--wstep' }, [
        soczewka(sw, { status: 'otwarty', opanowanie: 1, rozmiar: 'duza' }),
        h('div', { class: 'boss-karta__tekst' }, [
          h('p', { class: 'boss-karta__swiat' }, `Boss świata: ${sw.tytul}`),
          h('h1', {}, boss.nazwa),
          h('p', {}, boss.opis),
          pokonany ? h('p', { class: 'boss-karta__pokonany' }, 'Ten boss jest już pokonany. Rewanż to dobre powtórzenie.') : null,
          h('ul', { class: 'boss-karta__zasady' }, [
            h('li', {}, [serca(B.SERCA), ' Masz trzy serca. Wyzwanie z błędem kosztuje jedno serce.']),
            h('li', {}, 'Bez podpowiedzi, za to bez limitu czasu. Gdy zadanie ma przycisk „Sprawdź”, najpierw ułóż wszystko, potem go stuknij.'),
            h('li', {}, `Wyzwania: ${wyzwania.map(nazwaTypu).join(', ')}.`),
            h('li', {}, 'W każdym podejściu zadania są losowane od nowa.'),
          ]),
          h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: pokazWyzwanie }, 'Zaczynamy'),
        ]),
      ]),
    );
    const naglowek = ekran.querySelector('h1');
    naglowek?.setAttribute('tabindex', '-1');
    naglowek?.focus({ preventScroll: true });
  }

  async function pokazWyzwanie() {
    const zadanie = wyzwania[podejscie.indeks];
    const licznik = h('span', { class: 'pasek__licznik' }, `Wyzwanie ${podejscie.indeks + 1} z ${wyzwania.length}`);
    const obszar = h('div', { class: 'misja__obszar', 'data-zadanie': zadanie.id }, h('p', { class: 'wczytywanie' }, 'Wczytywanie…'));
    const wynik = h('section', { class: 'misja__wynik', hidden: true, 'aria-live': 'polite' });
    komponent?.zniszcz();
    komponent = null;
    wyczysc(ekran);
    ekran.append(
      pasek({ wstecz: { tekst: 'Wyjdź', href: `#/swiat/${sw.id}` }, tytul: boss.nazwa, prawa: [serca(podejscie.serca), licznik] }),
      h('h1', { class: 'misja__polecenie' }, zadanie.tresc),
      obszar,
      wynik,
    );
    window.scrollTo(0, 0);
    let utworz;
    try {
      utworz = await zaladujZadanie(zadanie, ctx.dane);
    } catch {
      if (zamkniety) return;
      wyczysc(obszar);
      obszar.append(
        h('div', { class: 'karta-komunikatu' }, [
          h('p', {}, 'Nie udało się wczytać wyzwania.'),
          h('button', { type: 'button', class: 'przycisk', onclick: pokazWyzwanie }, 'Spróbuj ponownie'),
        ]),
      );
      return;
    }
    if (zamkniety) return;
    wyczysc(obszar);
    const start = performance.now();
    komponent = utworz(obszar, { tryb: 'sprawdzian', onKoniec: (w) => poWyzwaniu(zadanie, w, performance.now() - start, wynik) });
  }

  function poWyzwaniu(zadanie, w, czasMs, wynikEl) {
    ctx.zmien((stan) =>
      zapiszWynik(stan, {
        idZadania: zadanie.id,
        typ: zadanie.typ,
        boss: true,
        poprawne: w.poprawne,
        wszystkie: w.wszystkie,
        karty: w.karty,
        czasMs,
        dzien: dzisiaj(),
      }),
    );
    ctx.sesja.wyniki.push({ idZadania: zadanie.id, swiat: sw.id, boss: true, ...w });
    podejscie = B.poWyzwaniu(podejscie, w);
    const stanP = B.stanPodejscia(podejscie);
    const doCwiczenia = kartyZBledem(w);
    for (const s of ekran.querySelectorAll('.pasek .serca')) s.replaceWith(serca(podejscie.serca));
    wyczysc(wynikEl);
    dolacz(wynikEl, [
      h('h2', { class: 'misja__wynik-tytul', 'data-stracone': String(podejscie.stracone) }, [
        podejscie.stracone ? 'Błąd kosztuje jedno serce.' : 'Bez błędu!',
        ' ',
        serca(podejscie.serca),
      ]),
      doCwiczenia.length ? h('p', {}, [h('strong', {}, 'Do poćwiczenia: '), doCwiczenia.map(nazwaKarty).join(', '), '.']) : null,
      h('p', { class: 'misja__wyjasnienie' }, zadanie.wyjasnienie),
      h(
        'div',
        { class: 'przyciski' },
        h(
          'button',
          { type: 'button', class: 'przycisk przycisk--dalej', onclick: stanP === 'trwa' ? pokazWyzwanie : pokazKoniec },
          stanP === 'trwa' ? 'Następne wyzwanie' : stanP === 'wygrane' ? 'Zobacz wynik' : 'Koniec podejścia',
        ),
      ),
    ]);
    wynikEl.hidden = false;
    wynikEl.scrollIntoView({ behavior: ograniczRuch() ? 'auto' : 'smooth', block: 'nearest' });
  }

  function pokazKoniec() {
    komponent?.zniszcz();
    komponent = null;
    const wygrane = B.stanPodejscia(podejscie) === 'wygrane';
    const wszystkieKarty = { karty: podejscie.wyniki.flatMap((w) => w.karty) };
    const bledy = kartyZBledem(wszystkieKarty);
    wyczysc(ekran);
    if (!wygrane) {
      ekran.append(
        pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
        h('section', { class: 'boss-karta boss-karta--koniec' }, [
          h('h1', {}, 'Tym razem wygrał boss.'),
          h('p', {}, `Wyzwania ukończone bez błędu: ${podejscie.wyniki.filter((w) => w.poprawne === w.wszystkie).length} z ${podejscie.wyniki.length}.`),
          bledy.length ? h('p', {}, [h('strong', {}, 'Do poćwiczenia: '), bledy.map(nazwaKarty).join(', '), '.']) : null,
          h('p', {}, 'W następnym podejściu zadania zostaną wylosowane od nowa. Można też najpierw wrócić do misji.'),
          h('div', { class: 'przyciski' }, [
            h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: pokazWstep }, 'Spróbuj ponownie'),
            h('a', { class: 'przycisk przycisk--jasny', href: `#/swiat/${sw.id}` }, 'Misje świata'),
          ]),
        ]),
      );
      return;
    }
    graj('wygrana');
    const przed = {
      mikroskop: B.poziomMikroskopu(ctx.stan),
      otwarte: otwarteSwiaty(ctx.dane.swiaty, ctx.stan),
      sprawdzian: sprawdzianDostepny(ctx.dane.swiaty, ctx.stan),
    };
    const pierwszeZwyciestwo = !ctx.stan.bossowie.includes(sw.id);
    ctx.zmien((stan) => zaliczBossa(stan, sw.id));
    const poziom = B.poziomMikroskopu(ctx.stan);
    const noweSwiaty = ctx.dane.swiaty.filter((s) => otwarteSwiaty(ctx.dane.swiaty, ctx.stan).has(s.id) && !przed.otwarte.has(s.id));
    const zlote = kartyOdRazu(wszystkieKarty);
    const nagrody = [
      poziom > przed.mikroskop
        ? h('li', {}, [h('strong', {}, 'Mikroskop ulepszony: '), `${B.POZIOMY_MIKROSKOPU[poziom].nazwa.toLowerCase()}, powiększenie ${B.POZIOMY_MIKROSKOPU[poziom].powiekszenie}.`])
        : null,
      ...noweSwiaty.map((s) => h('li', {}, [h('strong', {}, 'Otwarty nowy świat: '), `${s.tytul}.`])),
      !przed.sprawdzian && sprawdzianDostepny(ctx.dane.swiaty, ctx.stan)
        ? h('li', {}, [h('strong', {}, 'Otwarty próbny sprawdzian: '), 'czeka w bazie.'])
        : null,
      zlote.length ? h('li', {}, [h('strong', {}, 'Złote karty w atlasie: '), zlote.map(nazwaKarty).join(', '), '.']) : null,
    ].filter(Boolean);
    ekran.append(
      pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
      h('section', { class: 'boss-karta boss-karta--wygrana' }, [
        h('p', { class: 'boss-karta__swiat' }, sw.tytul),
        h('h1', {}, pierwszeZwyciestwo ? `${boss.nazwa} pokonany!` : 'Rewanż wygrany!'),
        h('p', {}, [`Serca na koniec: `, serca(podejscie.serca)]),
        nagrody.length ? h('ul', { class: 'boss-karta__nagrody' }, nagrody) : null,
        bledy.length ? h('p', {}, [h('strong', {}, 'Do poćwiczenia: '), bledy.map(nazwaKarty).join(', '), '.']) : null,
        h('div', { class: 'przyciski' }, [
          poziom > przed.mikroskop ? h('a', { class: 'przycisk przycisk--dalej', href: '#/mikroskop' }, 'Do mikroskopu') : null,
          !przed.sprawdzian && sprawdzianDostepny(ctx.dane.swiaty, ctx.stan) ? h('a', { class: 'przycisk przycisk--dalej', href: '#/sprawdzian' }, 'Próbny sprawdzian') : null,
          h('a', { class: 'przycisk przycisk--jasny', href: '#/' }, 'Mapa wyprawy'),
        ]),
      ]),
    );
  }
}

// Boss świata (SPEC.md, sekcja 4.3): wyzwania w formatach sprawdzianu, bez podpowiedzi,
// trzy serca zamiast limitu czasu. Boss ma portret i pasek życia: każde ukończone wyzwanie
// zabiera mu jeden segment, wyzwanie bez błędu to cios krytyczny. Po pokonaniu bossa czeka
// rewanż mistrzowski z jednym sercem. Logika: core/boss.js.

import { h, dolacz, ikona, wyczysc, ograniczRuch } from '../core/dom.js';
import { otwarteSwiaty } from '../core/swiaty.js';
import { zapiszWynik, zaliczBossa, zaliczMistrza } from '../core/stan.js';
import { dzisiaj } from '../core/daty.js';
import { kartyZBledem, kartyOdRazu, awanseKart } from '../core/karty.js';
import * as B from '../core/boss.js';
import { sprawdzianDostepny } from '../core/sprawdzian.js';
import { zaladujZadanie } from '../components/zadania.js';
import { graj } from '../core/dzwieki.js';
import { iskry, eksplozja } from '../core/efekty.js';
import { rysunekKarty } from '../components/rysunki.js';
import { pokazOdkrycie } from '../components/odkrycie.js';
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

function segmenty(n) {
  if (n === 1) return '1 segment';
  return n >= 2 && n <= 4 ? `${n} segmenty` : `${n} segmentów`;
}

export function serca(liczba, maks = B.SERCA) {
  return h(
    'span',
    { class: 'serca', role: 'img', 'aria-label': `Serca: ${liczba} z ${maks}` },
    Array.from({ length: maks }, (_, i) => h('span', { class: 'serce', 'data-pelne': String(i < liczba) }, ikona('serce'))),
  );
}

function portret(boss, klasa = '') {
  return h('span', { class: `boss-portret ${klasa}`.trim(), 'aria-hidden': 'true' }, rysunekKarty(boss.rysunek, 'boss-portret__rysunek'));
}

// Pasek życia bossa: jeden segment na wyzwanie.
function pasekZycia(podejscie) {
  const zycie = B.zycieBossa(podejscie);
  return h(
    'span',
    { class: 'zycie', role: 'img', 'aria-label': `Życie bossa: ${zycie} z ${podejscie.liczba}` },
    Array.from({ length: podejscie.liczba }, (_, i) => h('span', { class: 'zycie__segment', 'data-pelny': String(i < zycie) })),
  );
}

function naglowekBossa(boss, podejscie) {
  return h('div', { class: 'boss-zycie' }, [
    portret(boss, 'boss-portret--maly'),
    h('span', { class: 'boss-zycie__kto' }, [h('span', { class: 'boss-zycie__etykieta' }, 'Boss'), h('span', { class: 'boss-zycie__nazwa' }, boss.nazwa)]),
    pasekZycia(podejscie),
    h('span', { class: 'boss-zycie__napis' }, `Życie: ${B.zycieBossa(podejscie)} z ${podejscie.liczba}`),
  ]);
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
  let tryb = 'zwykly';
  let odkrycie = null;

  const ekran = h('div', { class: 'ekran ekran--boss', 'data-swiat': sw.id });
  kontener.append(ekran);

  if (!B.bossDostepny(sw, ctx.stan)) {
    ekran.append(
      pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
      h('section', { class: 'boss-karta boss-karta--wstep' }, [
        portret(boss),
        h('div', { class: 'boss-karta__tekst' }, [
          h('h1', {}, boss.nazwa),
          h('p', {}, 'Boss czeka na końcu świata. Najpierw ukończ wszystkie misje.'),
          h('p', { class: 'boss-karta__postep' }, `Ukończone misje: ${B.misjeUkonczone(sw, ctx.stan)} z ${sw.misje.length}`),
          h('a', { class: 'przycisk', href: `#/swiat/${sw.id}` }, 'Misje świata'),
        ]),
      ]),
    );
    return null;
  }

  pokazWstep();

  return {
    zniszcz() {
      zamkniety = true;
      komponent?.zniszcz();
      if (odkrycie?.open) odkrycie.close();
    },
  };

  function pokazWstep() {
    wyzwania = B.wylosujWyzwania(boss, ctx.dane.zadania);
    const pokonany = ctx.stan.bossowie.includes(sw.id);
    const mistrz = ctx.stan.mistrzowie.includes(sw.id);
    wyczysc(ekran);
    ekran.append(
      pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
      h('section', { class: 'boss-karta boss-karta--wstep' }, [
        portret(boss),
        h('div', { class: 'boss-karta__tekst' }, [
          h('p', { class: 'boss-karta__swiat' }, `Boss świata: ${sw.tytul}`),
          h('h1', {}, [boss.nazwa, mistrz ? h('span', { class: 'boss-karta__mistrz' }, 'Mistrz') : null]),
          h('p', {}, boss.opis),
          pokonany ? h('p', { class: 'boss-karta__pokonany' }, 'Ten boss jest już pokonany. Rewanż to dobre powtórzenie.') : null,
          h('ul', { class: 'boss-karta__zasady' }, [
            h('li', {}, [serca(B.SERCA), ' Masz trzy serca. Wyzwanie z błędem kosztuje jedno serce.']),
            h('li', {}, `Boss ma ${segmenty(wyzwania.length)} życia, po jednym na wyzwanie. Każde ukończone wyzwanie zabiera jeden segment, a wyzwanie bez błędu to cios krytyczny.`),
            h('li', {}, 'Bez podpowiedzi, za to bez limitu czasu. Gdy zadanie ma przycisk „Sprawdź”, najpierw ułóż wszystko, potem go stuknij.'),
            h('li', {}, `Wyzwania: ${wyzwania.map(nazwaTypu).join(', ')}.`),
            h('li', {}, 'W każdym podejściu zadania są losowane od nowa.'),
            pokonany ? h('li', {}, [serca(B.SERCA_MISTRZA, B.SERCA_MISTRZA), ' Rewanż mistrzowski: jedno serce. Pierwszy błąd kończy podejście.']) : null,
          ]),
          h('div', { class: 'przyciski' }, [
            h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: () => zacznij('zwykly') }, pokonany ? 'Rewanż' : 'Zaczynamy'),
            pokonany ? h('button', { type: 'button', class: 'przycisk przycisk--jasny', onclick: () => zacznij('mistrzowski') }, 'Rewanż mistrzowski') : null,
          ]),
        ]),
      ]),
    );
    const naglowek = ekran.querySelector('h1');
    naglowek?.setAttribute('tabindex', '-1');
    naglowek?.focus({ preventScroll: true });
  }

  function zacznij(wybranyTryb) {
    tryb = wybranyTryb;
    podejscie = B.nowePodejscie(wyzwania.length, { serca: tryb === 'mistrzowski' ? B.SERCA_MISTRZA : B.SERCA });
    pokazWyzwanie();
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
      pasek({
        wstecz: { tekst: 'Wyjdź', href: `#/swiat/${sw.id}` },
        tytul: tryb === 'mistrzowski' ? `${boss.nazwa}: rewanż mistrzowski` : boss.nazwa,
        prawa: [serca(podejscie.serca, podejscie.maksSerca), licznik],
      }),
      naglowekBossa(boss, podejscie),
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

  // Cios w bossa: znika skrajny prawy pełny segment życia, portret się trzęsie.
  function cios(krytyczny) {
    const segment = ekran.querySelectorAll('.zycie__segment')[podejscie.liczba - podejscie.indeks];
    if (segment) {
      segment.dataset.trafiony = 'true';
      segment.dataset.pelny = 'false';
    }
    const napis = ekran.querySelector('.boss-zycie__napis');
    if (napis) napis.textContent = `Życie: ${B.zycieBossa(podejscie)} z ${podejscie.liczba}`;
    const portretEl = ekran.querySelector('.boss-zycie .boss-portret');
    if (portretEl) {
      portretEl.classList.remove('boss-portret--cios');
      void portretEl.offsetWidth;
      portretEl.classList.add('boss-portret--cios');
      iskry(portretEl, { ile: krytyczny ? 16 : 8, zasieg: krytyczny ? 1.6 : 1 });
    }
    graj('cios');
  }

  function poWyzwaniu(zadanie, w, czasMs, wynikEl) {
    const kartyPrzed = ctx.stan.karty;
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
    const awanse = awanseKart(kartyPrzed, ctx.stan.karty, w.karty.map((k) => k.karta));
    ctx.sesja.wyniki.push({ idZadania: zadanie.id, swiat: sw.id, boss: true, ...w });
    podejscie = B.poWyzwaniu(podejscie, w);
    const stanP = B.stanPodejscia(podejscie);
    const doCwiczenia = kartyZBledem(w);
    for (const s of ekran.querySelectorAll('.pasek .serca')) s.replaceWith(serca(podejscie.serca, podejscie.maksSerca));
    cios(!podejscie.stracone);
    let tytul;
    if (!podejscie.stracone) tytul = 'Cios krytyczny! Bez błędu.';
    else if (stanP === 'przegrane' && tryb === 'mistrzowski') tytul = 'Błąd. Rewanż mistrzowski kończy się przy pierwszym błędzie.';
    else tytul = 'Cios, ale błąd kosztuje jedno serce.';
    wyczysc(wynikEl);
    dolacz(wynikEl, [
      h('h2', { class: 'misja__wynik-tytul', 'data-stracone': String(podejscie.stracone) }, [tytul, ' ', serca(podejscie.serca, podejscie.maksSerca)]),
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
    if (awanse.length) odkrycie = pokazOdkrycie(awanse, ctx.dane.katalog);
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
        h('section', { class: 'boss-karta boss-karta--wstep boss-karta--koniec' }, [
          portret(boss),
          h('div', { class: 'boss-karta__tekst' }, [
            h('h1', {}, 'Tym razem wygrał boss.'),
            h('p', {}, `Wyzwania ukończone bez błędu: ${podejscie.wyniki.filter((w) => w.poprawne === w.wszystkie).length} z ${podejscie.wyniki.length}.`),
            bledy.length ? h('p', {}, [h('strong', {}, 'Do poćwiczenia: '), bledy.map(nazwaKarty).join(', '), '.']) : null,
            h('p', {}, 'W następnym podejściu zadania zostaną wylosowane od nowa. Można też najpierw wrócić do misji.'),
            h('div', { class: 'przyciski' }, [
              h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: pokazWstep }, 'Spróbuj ponownie'),
              h('a', { class: 'przycisk przycisk--jasny', href: `#/swiat/${sw.id}` }, 'Misje świata'),
            ]),
          ]),
        ]),
      );
      return;
    }
    const przed = {
      mikroskop: B.poziomMikroskopu(ctx.stan),
      otwarte: otwarteSwiaty(ctx.dane.swiaty, ctx.stan),
      sprawdzian: sprawdzianDostepny(ctx.dane.swiaty, ctx.stan),
      mistrz: ctx.stan.mistrzowie.includes(sw.id),
    };
    const pierwszeZwyciestwo = !ctx.stan.bossowie.includes(sw.id);
    ctx.zmien((stan) => {
      const po = zaliczBossa(stan, sw.id);
      return tryb === 'mistrzowski' ? zaliczMistrza(po, sw.id) : po;
    });
    const poziom = B.poziomMikroskopu(ctx.stan);
    const noweSwiaty = ctx.dane.swiaty.filter((s) => otwarteSwiaty(ctx.dane.swiaty, ctx.stan).has(s.id) && !przed.otwarte.has(s.id));
    const zlote = kartyOdRazu(wszystkieKarty);
    const nowyMistrz = tryb === 'mistrzowski' && !przed.mistrz;
    const nagroda = (znak, tresc) => h('li', { class: 'boss-nagroda' }, [h('span', { class: 'boss-nagroda__znak' }, znak), h('span', { class: 'boss-nagroda__tresc' }, tresc)]);
    const nagrody = [
      poziom > przed.mikroskop
        ? nagroda(ikona('lupa'), [h('strong', {}, 'Mikroskop ulepszony: '), `${B.POZIOMY_MIKROSKOPU[poziom].nazwa.toLowerCase()}, powiększenie ${B.POZIOMY_MIKROSKOPU[poziom].powiekszenie}.`])
        : null,
      ...noweSwiaty.map((s) => nagroda(soczewka(s, { status: 'otwarty', opanowanie: 0 }), [h('strong', {}, 'Otwarty nowy świat: '), `${s.tytul}.`])),
      !przed.sprawdzian && sprawdzianDostepny(ctx.dane.swiaty, ctx.stan)
        ? nagroda(ikona('dobrze'), [h('strong', {}, 'Otwarty próbny sprawdzian: '), 'czeka w bazie.'])
        : null,
      zlote.length
        ? nagroda(ikona('gwiazda'), [
            h('strong', {}, 'Złote karty w atlasie: '),
            `${zlote.map(nazwaKarty).join(', ')}.`,
            h(
              'span',
              { class: 'boss-nagroda__karty', 'aria-hidden': 'true' },
              zlote.map((id) => h('span', { class: 'boss-nagroda__karta', title: nazwaKarty(id) }, rysunekKarty(id))),
            ),
          ])
        : null,
      pierwszeZwyciestwo ? nagroda(serca(B.SERCA_MISTRZA, B.SERCA_MISTRZA), [h('strong', {}, 'Odblokowany rewanż mistrzowski: '), 'boss z jednym sercem, zero błędów.']) : null,
      nowyMistrz ? nagroda(ikona('gwiazda'), [h('strong', {}, 'Tytuł mistrza świata: '), `${sw.tytul}. Gwiazda na mapie wyprawy.`]) : null,
    ].filter(Boolean);
    nagrody.forEach((n, i) => n.style.setProperty('--i', String(i)));
    const portretEl = portret(boss, 'boss-portret--pokonany');
    ekran.append(
      pasek({ wstecz: { tekst: 'Misje', href: `#/swiat/${sw.id}` } }),
      h('section', { class: 'boss-karta boss-karta--wstep boss-karta--wygrana' }, [
        portretEl,
        h('div', { class: 'boss-karta__tekst' }, [
          h('p', { class: 'boss-karta__swiat' }, sw.tytul),
          h('h1', {}, pierwszeZwyciestwo ? `${boss.nazwa} pokonany!` : tryb === 'mistrzowski' ? 'Mistrzowski rewanż wygrany!' : 'Rewanż wygrany!'),
          h('p', {}, [`Serca na koniec: `, serca(podejscie.serca, podejscie.maksSerca)]),
          nagrody.length ? h('ul', { class: 'boss-karta__nagrody' }, nagrody) : null,
          bledy.length ? h('p', {}, [h('strong', {}, 'Do poćwiczenia: '), bledy.map(nazwaKarty).join(', '), '.']) : null,
          h('div', { class: 'przyciski' }, [
            poziom > przed.mikroskop ? h('a', { class: 'przycisk przycisk--dalej', href: '#/mikroskop' }, 'Do mikroskopu') : null,
            !przed.sprawdzian && sprawdzianDostepny(ctx.dane.swiaty, ctx.stan) ? h('a', { class: 'przycisk przycisk--dalej', href: '#/sprawdzian' }, 'Próbny sprawdzian') : null,
            h('a', { class: 'przycisk przycisk--jasny', href: '#/' }, 'Mapa wyprawy'),
          ]),
        ]),
      ]),
    );
    graj('fanfara');
    eksplozja(portretEl);
  }
}

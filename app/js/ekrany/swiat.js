// Wstęp do świata: scena w soczewce, kilka zdań fabuły, odtwarzacz słuchowiska (jeśli jest plik),
// misje, wykład Profesora Pomyłki, boss, ciekawostka albo przewodnik.

import { h, ikona } from '../core/dom.js';
import { otwarteSwiaty, statusSwiata, opanowanieSwiata, wykladDostepny } from '../core/swiaty.js';
import { PROG_OPANOWANIA } from '../core/stan.js';
import { bossDostepny, misjeUkonczone } from '../core/boss.js';
import { NAGRANIA } from '../wersja.js';
import { rysunekKarty } from '../components/rysunki.js';
import { soczewka, miernikOstrosci, pasek, ekranNiedostepny } from './wspolne.js';

function kartaBossa(sw, stan) {
  if (!sw.boss) return null;
  const pokonany = stan.bossowie.includes(sw.id);
  const dostepny = bossDostepny(sw, stan);
  const tresc = [
    h('span', { class: 'boss-wejscie__etykieta' }, pokonany ? 'Boss pokonany' : 'Boss świata'),
    h('span', { class: 'boss-wejscie__nazwa' }, sw.boss.nazwa),
    h(
      'span',
      { class: 'boss-wejscie__opis' },
      dostepny
        ? pokonany
          ? 'Rewanż: zadania w formatach sprawdzianu, losowane od nowa.'
          : sw.boss.opis
        : `Ukończ wszystkie misje, żeby go wyzwać. Ukończone: ${misjeUkonczone(sw, stan)} z ${sw.misje.length}.`,
    ),
  ];
  if (!dostepny) {
    return h('div', { class: 'boss-wejscie', 'data-stan': 'zamkniety' }, [h('span', { class: 'boss-wejscie__znak' }, ikona('klodka')), h('span', { class: 'boss-wejscie__tresc' }, tresc)]);
  }
  return h('a', { class: 'boss-wejscie', href: `#/swiat/${sw.id}/boss`, 'data-stan': pokonany ? 'pokonany' : 'gotowy' }, [
    h('span', { class: 'boss-wejscie__znak' }, ikona(pokonany ? 'dobrze' : 'serce')),
    h('span', { class: 'boss-wejscie__tresc' }, tresc),
  ]);
}

// Wykład Profesora Pomyłki: dodatkowa misja otwarta po ukończeniu misji świata. Nie blokuje
// bossa: można go pominąć.
function kartaWykladu(sw, stan) {
  if (!sw.wyklad) return null;
  const w = sw.wyklad;
  const portret = h('span', { class: 'wyklad-wejscie__portret' }, rysunekKarty('profesor-pomylka', 'wyklad-wejscie__rysunek'));
  const naglowek = [h('span', { class: 'wyklad-wejscie__etykieta' }, 'Dodatkowa misja'), h('span', { class: 'wyklad-wejscie__nazwa' }, w.nazwa)];
  if (!wykladDostepny(sw, stan)) {
    return h('div', { class: 'wyklad-wejscie', 'data-stan': 'zamkniety' }, [
      portret,
      h('span', { class: 'wyklad-wejscie__tresc' }, [
        ...naglowek,
        h('span', { class: 'wyklad-wejscie__opis' }, `Profesor Pomyłka przyjedzie, gdy ukończysz wszystkie misje. Ukończone: ${misjeUkonczone(sw, stan)} z ${sw.misje.length}.`),
      ]),
      h('span', { class: 'wyklad-wejscie__klodka' }, ikona('klodka')),
    ]);
  }
  const stanW = stanMisji(w, stan);
  return h('a', { class: 'wyklad-wejscie', href: `#/swiat/${sw.id}/misja/${encodeURIComponent(w.id)}`, 'data-stan': stanW.klasa }, [
    portret,
    h('span', { class: 'wyklad-wejscie__tresc' }, [
      ...naglowek,
      h('span', { class: 'wyklad-wejscie__opis' }, w.opis),
      h('span', { class: 'misja-karta__meta' }, [h('span', {}, liczbaWyzwan(w.zadania.length)), h('span', { class: 'misja-karta__stan' }, stanW.tekst)]),
    ]),
  ]);
}

// Nagranie części słuchowiska jest opcjonalne (SPEC.md, sekcja 4.6): plik audio/czesc-N.mp3.
// Listę dostępnych nagrań zapisuje tools/wersja.js w js/wersja.js. Nagrania nie trafiają do
// pamięci offline, więc odtwarzają się przy dostępie do internetu.
function odtwarzacz(sw) {
  if (!NAGRANIA.includes(sw.czesc)) return null;
  return h('section', { class: 'sluchowisko', 'aria-label': 'Słuchowisko' }, [
    h('p', { class: 'sluchowisko__tytul' }, `Słuchowisko, część ${sw.czesc}`),
    h('audio', { class: 'sluchowisko__odtwarzacz', controls: true, preload: 'none', src: `audio/czesc-${sw.czesc}.mp3` }),
  ]);
}

// Ciekawostka świata; w światach z przewodnikiem (SPEC.md, sekcja 4.4) opowiada ją uczony ze
// słuchowiska: wizerunek, imię i kim był. Treść ciekawostki dosłownie z TRESCI.md, sekcja 6.
function ciekawostkaSwiata(sw) {
  if (!sw.ciekawostka) return null;
  const tresc = [h('h2', { class: 'ciekawostka__naglowek' }, 'Ciekawostka'), h('p', {}, sw.ciekawostka)];
  if (!sw.przewodnik) return h('aside', { class: 'ciekawostka' }, tresc);
  const p = sw.przewodnik;
  return h('aside', { class: 'ciekawostka przewodnik' }, [
    h('div', { class: 'przewodnik__postac' }, [
      rysunekKarty(p.rysunek, 'przewodnik__rysunek'),
      h('p', { class: 'przewodnik__podpis' }, [h('span', { class: 'przewodnik__etykieta' }, 'Przewodnik'), h('strong', { class: 'przewodnik__imie' }, p.imie), h('span', { class: 'przewodnik__kim' }, p.kim)]),
    ]),
    ...tresc,
  ]);
}

function stanMisji(misja, stan) {
  const wyniki = misja.zadania.map((id) => stan.zadania[id]);
  if (wyniki.every((w) => (w?.najlepszy ?? 0) >= PROG_OPANOWANIA)) return { klasa: 'opanowana', tekst: 'Opanowana' };
  if (wyniki.every((w) => w?.proby > 0)) return { klasa: 'ukonczona', tekst: 'Ukończona' };
  return { klasa: 'nowa', tekst: 'Nowa' };
}

function liczbaWyzwan(n) {
  if (n === 1) return '1 wyzwanie';
  const reszta10 = n % 10;
  const reszta100 = n % 100;
  if (reszta10 >= 2 && reszta10 <= 4 && (reszta100 < 12 || reszta100 > 14)) return `${n} wyzwania`;
  return `${n} wyzwań`;
}

export function render(kontener, ctx, cel) {
  const sw = ctx.dane.swiaty.find((s) => s.id === cel.swiat);
  const otwarte = otwarteSwiaty(ctx.dane.swiaty, ctx.stan);
  if (!sw?.gotowy) {
    ekranNiedostepny(kontener, { tytul: 'Ten świat jest w budowie', tekst: 'Wkrótce pojawią się tu nowe misje.' });
    return null;
  }
  if (!otwarte.has(sw.id)) {
    ekranNiedostepny(kontener, { tytul: 'Ten świat jest jeszcze zamknięty', tekst: 'Otworzy się po pokonaniu bossa w poprzednim świecie.' });
    return null;
  }
  const status = statusSwiata(sw, ctx.stan, otwarte);
  const opanowanie = opanowanieSwiata(sw, ctx.stan);

  const misje = h(
    'ul',
    { class: 'misje__lista' },
    sw.misje.map((m) => {
      const stanM = stanMisji(m, ctx.stan);
      return h('li', {}, [
        h('a', { class: 'misja-karta', href: `#/swiat/${sw.id}/misja/${encodeURIComponent(m.id)}`, 'data-stan': stanM.klasa }, [
          h('span', { class: 'misja-karta__nazwa' }, m.nazwa),
          h('span', { class: 'misja-karta__opis' }, m.opis),
          h('span', { class: 'misja-karta__meta' }, [
            h('span', {}, liczbaWyzwan(m.zadania.length)),
            h('span', { class: 'misja-karta__stan' }, stanM.tekst),
          ]),
        ]),
      ]);
    }),
  );

  kontener.append(
    h('div', { class: 'ekran ekran--swiat', 'data-swiat': sw.id }, [
      pasek({ wstecz: { tekst: 'Mapa', href: '#/' } }),
      h('section', { class: 'swiat-wstep' }, [
        h('div', { class: 'swiat-wstep__scena' }, [
          soczewka(sw, { status, opanowanie, rozmiar: 'duza' }),
          miernikOstrosci(opanowanie),
        ]),
        h('div', { class: 'swiat-wstep__tekst' }, [
          h('p', { class: 'swiat-wstep__czesc' }, `Część ${sw.czesc}. ${sw.temat}`),
          h('h1', { class: 'swiat-wstep__tytul' }, sw.tytul),
          ...sw.wstep.map((t) => h('p', { class: 'swiat-wstep__akapit' }, t)),
          odtwarzacz(sw),
        ]),
      ]),
      h('div', { class: 'swiat-tresc' }, [
        h('section', { class: 'misje', 'aria-labelledby': 'misje-naglowek' }, [h('h2', { id: 'misje-naglowek' }, 'Misje'), misje, kartaWykladu(sw, ctx.stan), kartaBossa(sw, ctx.stan)]),
        h('div', { class: 'swiat-dodatki' }, [
          sw.coZbadasz.length
            ? h('section', { class: 'co-zbadasz' }, [h('h2', {}, 'Co tu zbadasz'), h('ul', {}, sw.coZbadasz.map((t) => h('li', {}, t)))])
            : null,
          ciekawostkaSwiata(sw),
        ]),
      ]),
    ]),
  );
  return null;
}

// Próbny sprawdzian (SPEC.md, sekcja 4.3): czternaście zadań ze wszystkich światów, punktacja
// jak w podręczniku, bez podpowiedzi i bez limitu czasu. Logika: core/sprawdzian.js,
// zadania i punkty: data/sprawdzian.js. Po każdym zadaniu punkty i wyjaśnienie; na końcu wynik,
// punkty do poprawy z odnośnikami do misji i zapis wyniku (raport w panelu rodzica).

import { h, dolacz, wyczysc, ograniczRuch } from '../core/dom.js';
import { zapiszWynik, zapiszSprawdzian } from '../core/stan.js';
import { dzisiaj } from '../core/daty.js';
import { kartyZBledem } from '../core/karty.js';
import * as S from '../core/sprawdzian.js';
import { graj } from '../core/dzwieki.js';
import { zaladujZadanie } from '../components/zadania.js';
import { pasek } from './wspolne.js';

const WSTECZ = { tekst: 'Baza', href: '#/baza' };

export function render(kontener, ctx) {
  const { swiaty, zadania, sprawdzian } = ctx.dane;
  const nazwaKarty = (id) => ctx.dane.katalog.get(id)?.nazwa ?? id;
  const maks = S.sumaPunktow(sprawdzian);
  let komponent = null;
  let zamkniety = false;
  let pozycje = [];
  let wyniki = [];
  let indeks = 0;

  const ekran = h('div', { class: 'ekran ekran--sprawdzian' });
  kontener.append(ekran);

  if (!S.sprawdzianDostepny(swiaty, ctx.stan)) {
    const zBossem = swiaty.filter((s) => s.gotowy && s.boss);
    const pokonani = zBossem.filter((s) => ctx.stan.bossowie.includes(s.id)).length;
    ekran.append(
      pasek({ wstecz: WSTECZ }),
      h('section', { class: 'boss-karta' }, [
        h('h1', {}, 'Próbny sprawdzian'),
        h('p', {}, 'Próbny sprawdzian otworzy się po pokonaniu bossów wszystkich światów.'),
        h('p', { class: 'boss-karta__postep' }, `Pokonani bossowie: ${pokonani} z ${zBossem.length}`),
        h('a', { class: 'przycisk', href: '#/' }, 'Mapa wyprawy'),
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
    pozycje = S.wylosujZadania(sprawdzian, zadania);
    wyniki = [];
    indeks = 0;
    const najlepszy = ctx.stan.sprawdziany.length ? Math.max(...ctx.stan.sprawdziany.map((s) => S.podsumuj(s).zdobyte)) : null;
    wyczysc(ekran);
    dolacz(ekran, [
      pasek({ wstecz: WSTECZ }),
      h('section', { class: 'boss-karta boss-karta--wstep sprawdzian-karta' }, [
        h('div', { class: 'boss-karta__tekst' }, [
          h('p', { class: 'boss-karta__swiat' }, 'Dział II: Budowa i czynności życiowe organizmów'),
          h('h1', {}, 'Próbny sprawdzian'),
          h('p', {}, `${pozycje.length} zadań ze wszystkich światów, w tej samej kolejności co tematy sprawdzianu. Razem ${S.liczbaPunktow(maks)}.`),
          h('ul', { class: 'boss-karta__zasady' }, [
            h('li', {}, 'Bez podpowiedzi i bez limitu czasu. Gdy zadanie ma przycisk „Sprawdź”, najpierw ułóż wszystko, potem go stuknij.'),
            h('li', {}, 'Po każdym zadaniu pojawią się punkty i wyjaśnienie.'),
            h('li', {}, 'W każdym podejściu zadania są losowane od nowa.'),
          ]),
          najlepszy === null ? null : h('p', { class: 'sprawdzian-karta__rekord' }, `Najlepszy wynik: ${najlepszy} z ${maks}.`),
          h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: pokazZadanie }, 'Zaczynamy'),
        ]),
      ]),
    ]);
    const naglowek = ekran.querySelector('h1');
    naglowek?.setAttribute('tabindex', '-1');
    naglowek?.focus({ preventScroll: true });
  }

  async function pokazZadanie() {
    const p = pozycje[indeks];
    const zadanie = p.zadanie;
    const licznik = h('span', { class: 'pasek__licznik' }, `Zadanie ${indeks + 1} z ${pozycje.length}`);
    const obszar = h('div', { class: 'misja__obszar', 'data-zadanie': zadanie.id }, h('p', { class: 'wczytywanie' }, 'Wczytywanie…'));
    const wynik = h('section', { class: 'misja__wynik', hidden: true, 'aria-live': 'polite' });
    komponent?.zniszcz();
    komponent = null;
    wyczysc(ekran);
    ekran.append(
      pasek({ wstecz: { tekst: 'Wyjdź', href: '#/baza' }, tytul: 'Próbny sprawdzian', prawa: [licznik] }),
      h('p', { class: 'sprawdzian__punkty-zadania' }, `Do zdobycia: ${S.liczbaPunktow(p.punkty)}`),
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
          h('p', {}, 'Nie udało się wczytać zadania.'),
          h('button', { type: 'button', class: 'przycisk', onclick: pokazZadanie }, 'Spróbuj ponownie'),
        ]),
      );
      return;
    }
    if (zamkniety) return;
    wyczysc(obszar);
    const start = performance.now();
    komponent = utworz(obszar, { tryb: 'sprawdzian', onKoniec: (w) => poZadaniu(p, w, performance.now() - start, wynik) });
  }

  function poZadaniu(p, w, czasMs, wynikEl) {
    const zadanie = p.zadanie;
    // Sprawdzian to warunki jak u bossa: dobre odpowiedzi od razu liczą się do złotych kart.
    ctx.zmien((stan) =>
      zapiszWynik(stan, { idZadania: zadanie.id, typ: zadanie.typ, boss: true, poprawne: w.poprawne, wszystkie: w.wszystkie, karty: w.karty, czasMs, dzien: dzisiaj() }),
    );
    ctx.sesja.wyniki.push({ idZadania: zadanie.id, swiat: zadanie.swiat, boss: true, ...w });
    wyniki.push(w);
    const zdobyte = S.punktyZaZadanie(p.punkty, w);
    const doCwiczenia = kartyZBledem(w);
    const ostatnie = indeks === pozycje.length - 1;
    wyczysc(wynikEl);
    dolacz(wynikEl, [
      h('h2', { class: 'misja__wynik-tytul', 'data-pelne': String(zdobyte === p.punkty) }, `Zadanie ${indeks + 1}: ${zdobyte} z ${S.zPunktow(p.punkty)}.`),
      doCwiczenia.length ? h('p', {}, [h('strong', {}, 'Do poćwiczenia: '), doCwiczenia.map(nazwaKarty).join(', '), '.']) : null,
      h('p', { class: 'misja__wyjasnienie' }, zadanie.wyjasnienie),
      h(
        'div',
        { class: 'przyciski' },
        h(
          'button',
          {
            type: 'button',
            class: 'przycisk przycisk--dalej',
            onclick: () => {
              indeks += 1;
              if (ostatnie) pokazKoniec();
              else pokazZadanie();
            },
          },
          ostatnie ? 'Zobacz wynik' : 'Następne zadanie',
        ),
      ),
    ]);
    wynikEl.hidden = false;
    wynikEl.scrollIntoView({ behavior: ograniczRuch() ? 'auto' : 'smooth', block: 'nearest' });
  }

  function pokazKoniec() {
    komponent?.zniszcz();
    komponent = null;
    const wynik = S.wynikSprawdzianu(pozycje, wyniki, dzisiaj());
    const poprzedni = ctx.stan.sprawdziany.length ? Math.max(...ctx.stan.sprawdziany.map((s) => S.podsumuj(s).zdobyte)) : null;
    ctx.zmien((stan) => zapiszSprawdzian(stan, wynik));
    const { zdobyte, doPoprawy } = S.podsumuj(wynik);
    graj('wygrana');
    const wiersze = pozycje.map((p, i) => {
      const z = wynik.zadania[i];
      const sw = swiaty.find((s) => s.id === p.misja.swiat);
      // Przy temacie z brakami odnośniki do misji, w których można poćwiczyć to, co poszło źle.
      const misje = z.zdobyte < z.maks ? S.misjeDoPoprawy(p, wyniki[i]).map((id) => sw?.misje.find((m) => m.id === id)).filter(Boolean) : [];
      return h('tr', { 'data-pelne': String(z.zdobyte === z.maks) }, [
        h('th', { scope: 'row' }, [
          `${p.punkt}. ${p.nazwa}`,
          ...misje.map((m) => h('a', { class: 'sprawdzian__cwicz', href: `#/swiat/${sw.id}/misja/${encodeURIComponent(m.id)}` }, `Poćwicz: ${m.nazwa}`)),
        ]),
        h('td', { class: 'sprawdzian__wynik-pkt' }, `${z.zdobyte} z ${z.maks}`),
      ]);
    });
    wyczysc(ekran);
    dolacz(ekran, [
      pasek({ wstecz: WSTECZ }),
      h('section', { class: 'boss-karta sprawdzian-wynik' }, [
        h('p', { class: 'boss-karta__swiat' }, 'Próbny sprawdzian'),
        h('h1', {}, `Wynik: ${zdobyte} z ${S.zPunktow(maks)}`),
        zdobyte === maks
          ? h('p', {}, 'Komplet punktów! Wszystkie zadania bez błędu.')
          : h('p', {}, `Bez błędu: ${pozycje.length - doPoprawy.length} z ${pozycje.length} zadań. Przy tematach z brakami są odnośniki do misji, w których można je poćwiczyć.`),
        poprzedni !== null && zdobyte > poprzedni ? h('p', { class: 'sprawdzian-karta__rekord' }, `Nowy najlepszy wynik (poprzednio ${poprzedni}).`) : null,
        h('div', { class: 'tabela-przewijana' }, [
          h('table', { class: 'tabela sprawdzian__tabela' }, [
            h('thead', {}, h('tr', {}, [h('th', { scope: 'col' }, 'Temat'), h('th', { scope: 'col' }, 'Punkty')])),
            h('tbody', {}, wiersze),
          ]),
        ]),
        h('div', { class: 'przyciski' }, [
          h('button', { type: 'button', class: 'przycisk przycisk--dalej', onclick: pokazWstep }, 'Nowe podejście'),
          h('a', { class: 'przycisk przycisk--jasny', href: '#/baza' }, 'Baza'),
        ]),
      ]),
    ]);
    const naglowek = ekran.querySelector('h1');
    naglowek?.setAttribute('tabindex', '-1');
    naglowek?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

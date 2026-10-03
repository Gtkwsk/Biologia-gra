// Mechanika „Detektyw komórek” (SPEC.md, sekcja 3.2, świat 3). Logika: detektyw-logika.js.
//
// Tajemnicza komórka zdradza się wskazówkami odsłanianymi po jednej. Gracz wskazuje podejrzaną
// komórkę, gdy wskazówki wykluczają pozostałe. Mniej wskazówek przy trafnym rozpoznaniu daje
// więcej lup. Błędne wskazanie: komunikat podaje wskazówkę, która wyklucza tę komórkę, albo
// informuje, że wskazówki pasują jeszcze do innej komórki (zgadywanie nie daje lup).

import { h, ikona } from '../core/dom.js';
import { utworzKomunikat } from './komunikat.js';
import { rysunekKarty } from './rysunki.js';
import { idKartyTypu } from '../core/karty.js';
import * as D from './detektyw-logika.js';

function rzadLup(ile) {
  return h(
    'span',
    { class: 'lupy', role: 'img', 'aria-label': `Lupy: ${ile} z 3` },
    [1, 2, 3].map((i) => h('span', { class: 'lupy__lupa', 'data-pelna': String(i <= ile) }, ikona('lupa'))),
  );
}

export function utworzDetektywa(kontener, { zadanie, dane, wskazowki, onKoniec }) {
  const typy = dane.typyKomorek;
  const typPoId = new Map(typy.map((t) => [t.id, t]));
  const elementPoId = new Map(dane.elementy.map((e) => [e.id, e]));
  const wskazowkaPoId = new Map(wskazowki.map((w) => [w.id, w]));
  const sprawy = zadanie.sprawy;
  const wyniki = [];
  let indeks = 0;
  let odsloniete = 0;
  let wskazania = 0;
  let rozwiazana = false;

  const komunikat = utworzKomunikat();
  const licznik = h('p', { class: 'detektyw__licznik' });
  const listaWskazowek = h('ol', { class: 'detektyw__wskazowki', 'aria-live': 'polite' });
  const przyciskWskazowki = h('button', { type: 'button', class: 'przycisk przycisk--jasny', onclick: odslon }, 'Odsłoń wskazówkę');
  const podejrzani = new Map();
  const listaPodejrzanych = h(
    'ul',
    { class: 'detektyw__podejrzani', 'aria-label': 'Podejrzane komórki' },
    typy.map((t) => {
      const przycisk = h('button', { type: 'button', class: 'podejrzany', 'data-typ': t.id, onclick: () => wskaz(t.id) }, [
        rysunekKarty(idKartyTypu(t.id), 'podejrzany__rysunek'),
        h('span', { class: 'podejrzany__nazwa' }, t.nazwa),
        h('span', { class: 'podejrzany__znak' }),
      ]);
      podejrzani.set(t.id, przycisk);
      return h('li', {}, przycisk);
    }),
  );
  const dalej = h('button', { type: 'button', class: 'przycisk przycisk--dalej', hidden: true, onclick: nastepna }, 'Następna sprawa');
  const korzen = h('div', { class: 'zadanie detektyw' }, [
    h('section', { class: 'detektyw__akta' }, [
      h('div', { class: 'detektyw__tajemnica', 'aria-hidden': 'true' }, '?'),
      h('div', { class: 'detektyw__notes' }, [licznik, h('p', { class: 'detektyw__mowi' }, 'Tajemnicza komórka mówi:'), listaWskazowek, przyciskWskazowki]),
    ]),
    listaPodejrzanych,
    h('div', { class: 'tacka' }, [komunikat.el, h('div', { class: 'tacka__akcje' }, dalej)]),
  ]);
  kontener.append(korzen);
  pokazSprawe();

  function sprawa() {
    return sprawy[indeks];
  }

  function odslonieteWskazowki() {
    return sprawa().wskazowki.slice(0, odsloniete).map((id) => wskazowkaPoId.get(id));
  }

  function pokazSprawe() {
    odsloniete = 0;
    wskazania = 0;
    rozwiazana = false;
    dalej.hidden = true;
    listaWskazowek.replaceChildren();
    for (const p of podejrzani.values()) {
      p.disabled = false;
      p.dataset.stan = '';
      p.querySelector('.podejrzany__znak').replaceChildren();
    }
    licznik.textContent = `Sprawa ${indeks + 1} z ${sprawy.length}`;
    odslon();
    komunikat.pokaz({
      rodzaj: 'info',
      tytul: 'Która to komórka?',
      tekst: 'Stuknij komórkę, gdy wskazówki wykluczą wszystkie inne. Im mniej wskazówek, tym więcej lup.',
    });
  }

  function odslon() {
    if (rozwiazana || odsloniete >= sprawa().wskazowki.length) return;
    odsloniete += 1;
    const w = wskazowkaPoId.get(sprawa().wskazowki[odsloniete - 1]);
    for (const li of listaWskazowek.children) li.classList.remove('detektyw__nowa');
    listaWskazowek.append(h('li', { class: 'detektyw__nowa' }, w.tekst));
    const zostalo = sprawa().wskazowki.length - odsloniete;
    przyciskWskazowki.disabled = zostalo === 0;
    przyciskWskazowki.textContent = zostalo ? `Odsłoń wskazówkę (zostało: ${zostalo})` : 'Wszystkie wskazówki odsłonięte';
  }

  function wskaz(idTypu) {
    if (rozwiazana) return;
    wskazania += 1;
    const odsl = odslonieteWskazowki();
    const ocena = D.ocenWskazanie(sprawa(), odsl, idTypu, typy);
    const typ = typPoId.get(idTypu);
    const przycisk = podejrzani.get(idTypu);
    if (!ocena.trafione) {
      if (ocena.wykluczajaca) {
        przycisk.dataset.stan = 'wykluczona';
        przycisk.disabled = true;
        przycisk.querySelector('.podejrzany__znak').replaceChildren(ikona('zle'));
        komunikat.pokaz({
          rodzaj: 'zle',
          tytul: `To nie ${typ.nazwa}.`,
          tekst: `Wyklucza ją wskazówka „${ocena.wykluczajaca.tekst.replace(/\.$/, '')}”. ${D.powodWykluczenia(typ, ocena.wykluczajaca, elementPoId)}`,
        });
      } else {
        komunikat.pokaz({
          rodzaj: 'zle',
          tytul: `To nie ${typ.nazwa}.`,
          tekst: `Te wskazówki pasują do niej, ale pasują też do innej komórki. Odsłoń następną wskazówkę.`,
        });
      }
      return;
    }
    rozwiazana = true;
    const potrzebne = D.potrzebneWskazowki(sprawa(), wskazowkaPoId, typy);
    const odRazu = wskazania === 1 && ocena.pewne;
    wyniki.push({ karta: idKartyTypu(sprawa().cel), odRazu, poprawnie: true });
    przycisk.dataset.stan = 'trafiona';
    przycisk.querySelector('.podejrzany__znak').replaceChildren(ikona('dobrze'));
    for (const [id, p] of podejrzani) if (id !== idTypu) p.disabled = true;
    przyciskWskazowki.disabled = true;
    const powody = typy
      .filter((t) => t.id !== idTypu)
      .map((t) => {
        const w = D.wykluczajaca(t.id, odsl, typy);
        return w ? D.powodWykluczenia(t, w, elementPoId) : null;
      })
      .filter(Boolean);
    if (ocena.pewne) {
      const ile = D.lupy(odsloniete, potrzebne);
      komunikat.pokaz({
        rodzaj: 'dobrze',
        tytul: `Rozwiązane! To ${typ.nazwa}. Wskazówki: ${odsloniete}.`,
        tekst: powody.join(' '),
        dodatek: rzadLup(ile),
      });
    } else {
      komunikat.pokaz({
        rodzaj: 'info',
        tytul: `Trafione: to ${typ.nazwa}. Ale to było zgadywanie.`,
        tekst: `Inne komórki, które pasowały do tych wskazówek: ${ocena.takzeMozliwe.map((id) => typPoId.get(id).nazwa).join(', ')}. Następnym razem odsłoń wskazówkę, która je rozróżni.`,
      });
    }
    dalej.textContent = indeks === sprawy.length - 1 ? 'Gotowe' : 'Następna sprawa';
    dalej.hidden = false;
  }

  function nastepna() {
    if (indeks === sprawy.length - 1) {
      dalej.hidden = true;
      korzen.classList.add('zadanie--gotowe');
      onKoniec?.({ poprawne: wyniki.filter((w) => w.odRazu).length, wszystkie: wyniki.length, karty: wyniki });
      return;
    }
    indeks += 1;
    pokazSprawe();
  }

  return {
    zniszcz() {
      korzen.remove();
    },
  };
}

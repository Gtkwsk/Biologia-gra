// Start gry: wczytanie stanu, przełączanie ekranów, zapis.

import swiaty from '../data/swiaty.js';
import zadania from '../data/zadania.js';
import schematy from '../data/schematy.js';
import elementy from '../data/elementy-komorek.js';
import typyKomorek from '../data/typy-komorek.js';
import pojecia from '../data/pojecia.js';
import miasto from '../data/miasto.js';
import wskazowki from '../data/wskazowki.js';
import czesciKonstruktora from '../data/konstruktor.js';
import { katalogKart } from './core/karty.js';
import { utworzMagazyn } from './core/magazyn.js';
import { nowyStan } from './core/stan.js';
import { dzisiaj } from './core/daty.js';
import { parsujAdres, adres } from './core/router.js';
import { utrwalOdblokowane } from './core/swiaty.js';
import { wyczysc, ograniczRuch } from './core/dom.js';
import { zarejestrujServiceWorker } from './pwa.js';
import { powiadom } from './ekrany/wspolne.js';
import * as mapa from './ekrany/mapa.js';
import * as swiat from './ekrany/swiat.js';
import * as misja from './ekrany/misja.js';
import * as podsumowanie from './ekrany/podsumowanie.js';
import * as baza from './ekrany/baza.js';
import * as atlas from './ekrany/atlas.js';
import * as mikroskop from './ekrany/mikroskop.js';
import * as boss from './ekrany/boss.js';
import * as rodzic from './ekrany/rodzic.js';

const EKRANY = { mapa, swiat, misja, boss, podsumowanie, baza, atlas, mikroskop, rodzic };

function dostepnyStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

const magazyn = utworzMagazyn(dostepnyStorage());
const wczytany = magazyn.wczytaj(dzisiaj());
let stan = utrwalOdblokowane(swiaty, wczytany.stan);
let ostrzezenieZapisu = false;

function zapisz() {
  if (magazyn.zapisz(stan) || ostrzezenieZapisu) return;
  ostrzezenieZapisu = true;
  powiadom('Nie udało się zapisać postępu na tym urządzeniu.', 'blad');
}

const nowaSesja = () => ({ wyniki: [] });

const ctx = {
  dane: {
    swiaty,
    zadania,
    schematy,
    elementy,
    typyKomorek,
    pojecia,
    miasto,
    wskazowki,
    czesciKonstruktora,
    katalog: katalogKart({ elementy, typyKomorek, pojecia }),
  },
  get stan() {
    return stan;
  },
  zmien(zmiana) {
    stan = utrwalOdblokowane(swiaty, zmiana(stan));
    zapisz();
  },
  zastap(nowy) {
    stan = utrwalOdblokowane(swiaty, nowy);
    ctx.sesja = nowaSesja();
    zapisz();
  },
  usunPostep() {
    magazyn.usun();
    stan = utrwalOdblokowane(swiaty, nowyStan(dzisiaj()));
    ctx.sesja = nowaSesja();
    zapisz();
  },
  nowaSesja() {
    ctx.sesja = nowaSesja();
  },
  sesja: nowaSesja(),
  panelOdblokowany: false,
  przejscie: null,
  nawiguj(cel) {
    location.hash = adres(cel);
  },
};

const kontener = document.getElementById('ekran');
let biezacy = null;

function animujWejscie(el) {
  const przejscie = ctx.przejscie;
  ctx.przejscie = null;
  if (ograniczRuch() || typeof el.animate !== 'function') return;
  if (przejscie) {
    const box = el.getBoundingClientRect();
    const x = przejscie.x - box.left;
    const y = przejscie.y - box.top;
    const promien = Math.hypot(Math.max(x, box.width - x), Math.max(y, innerHeight - y));
    el.animate(
      [{ clipPath: `circle(${przejscie.r}px at ${x}px ${y}px)` }, { clipPath: `circle(${promien}px at ${x}px ${y}px)` }],
      { duration: 550, easing: 'cubic-bezier(.3,.7,.2,1)' },
    );
  } else {
    el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], {
      duration: 200,
      easing: 'ease-out',
    });
  }
}

function pokazEkran() {
  const cel = parsujAdres(location.hash);
  if (cel.ekran === 'nieznany') {
    history.replaceState(null, '', adres({ ekran: 'mapa' }));
    pokazEkran();
    return;
  }
  if (cel.ekran !== 'rodzic') ctx.panelOdblokowany = false;
  for (const el of document.querySelectorAll('.powiadomienie')) el.remove();
  biezacy?.zniszcz?.();
  wyczysc(kontener);
  document.documentElement.dataset.ekran = cel.ekran;
  biezacy = EKRANY[cel.ekran].render(kontener, ctx, cel);
  window.scrollTo(0, 0);
  const ekran = kontener.firstElementChild;
  if (ekran) animujWejscie(ekran);
  const naglowek = kontener.querySelector('h1');
  if (naglowek) {
    naglowek.setAttribute('tabindex', '-1');
    naglowek.focus({ preventScroll: true });
  }
}

window.addEventListener('hashchange', pokazEkran);
pokazEkran();

if (wczytany.uszkodzony) {
  powiadom('Zapis postępu był nieczytelny. Gra zaczyna od nowa, a kopia starego zapisu została na urządzeniu.', 'blad');
} else if (!wczytany.dostepny) {
  powiadom('Ta przeglądarka nie pozwala zapisywać postępu.', 'blad');
}

zarejestrujServiceWorker();
if (matchMedia('(display-mode: standalone)').matches || navigator.standalone === true) {
  navigator.storage?.persist?.().catch(() => {});
}

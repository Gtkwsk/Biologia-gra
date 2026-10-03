import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as S from '../app/js/components/sorter-logika.js';
import * as D from '../app/js/components/doswiadczenie-logika.js';
import * as T from '../app/js/components/tabela-logika.js';
import { przygotujZadanie, elementyProcesu } from '../app/js/components/podpisywanie-logika.js';
import * as L from '../app/js/components/podpisywanie-logika.js';
import { polaTabeli } from '../app/js/components/tabela-wartosci.js';
import procesy from '../app/data/procesy.js';
import porownanie from '../app/data/porownanie.js';
import schematy from '../app/data/schematy.js';
import elementy from '../app/data/elementy-komorek.js';
import typyKomorek from '../app/data/typy-komorek.js';
import pojecia from '../app/data/pojecia.js';
import organizmy from '../app/data/organizmy.js';
import { katalogKart } from '../app/js/core/karty.js';

const katalog = katalogKart({ elementy, typyKomorek, pojecia, organizmy });
const zdania = [
  { tekst: 'a', kategoria: 'O' },
  { tekst: 'b', kategoria: 'W' },
  { tekst: 'c', kategoria: 'O' },
];

test('sorter: błędne zdanie wraca na koniec talii, liczy się pierwsza próba', () => {
  let t = S.nowaTalia(3);
  let r = S.odpowiedz(t, zdania, 'W');
  assert.equal(r.dobrze, false);
  assert.deepEqual(r.talia.kolejka, [1, 2, 0]);
  t = r.talia;
  t = S.odpowiedz(t, zdania, 'W').talia;
  t = S.odpowiedz(t, zdania, 'O').talia;
  r = S.odpowiedz(t, zdania, 'O');
  assert.equal(r.dobrze, true);
  assert.ok(S.czyKoniec(r.talia));
  const w = S.wynik(zdania, r.talia.pierwsza, () => 'karta');
  assert.equal(w.poprawne, 2);
  assert.equal(w.wszystkie, 3);
  assert.deepEqual(
    w.karty.map((k) => k.odRazu),
    [false, true, true],
  );
});

test('sorter: w sprawdzianie brak odpowiedzi to błąd', () => {
  const o = S.ocen(zdania, { 0: 'O', 1: 'O' });
  assert.deepEqual(
    o.map((x) => x.dobrze),
    [true, false, false],
  );
  const w = S.wynik(zdania, Object.fromEntries(o.map((x) => [x.indeks, x.dobrze])), () => 'k', 'sprawdzian');
  assert.deepEqual(
    w.karty.map((k) => k.poprawnie),
    [true, false, false],
  );
});

test('doświadczenie: ocena opcji i wynik z pierwszych odpowiedzi', () => {
  const kroki = [
    { pytanie: 'p1', opcje: [{ tekst: 'x', poprawna: true }, { tekst: 'y', wyjasnienie: 'bo y' }], wyjasnienie: 'w1', karta: 'tlen' },
    { pytanie: 'p2', opcje: [{ tekst: 'x', wyjasnienie: 'bo x' }, { tekst: 'y', poprawna: true }], wyjasnienie: 'w2', karta: 'woda' },
  ];
  assert.deepEqual(D.ocenOpcje(kroki[0], 1), { dobrze: false, tekst: 'bo y' });
  assert.deepEqual(D.ocenOpcje(kroki[0], 0), { dobrze: true, tekst: 'w1' });
  assert.equal(D.poprawnaOpcja(kroki[1]), 1);
  const w = D.wynik(kroki, { 0: 0, 1: 0 });
  assert.equal(w.poprawne, 1);
  assert.deepEqual(
    w.karty.map((k) => [k.karta, k.odRazu]),
    [
      ['tlen', true],
      ['woda', false],
    ],
  );
  assert.deepEqual(D.kolejnoscOpcji({ ...kroki[0], kolejnosc: 'stala' }, (l) => [...l].reverse()), [0, 1]);
});

test('tabela procesów: odpowiedzi z zapisów słownych i zdania wyjaśniające', () => {
  const przyg = T.przygotujTabele(
    { procesy: ['oddychanie-tlenowe', 'fermentacja-alkoholowa', 'fermentacja-mlekowa'], substancje: ['dwutlenek-wegla', 'woda', 'kwas-mlekowy'] },
    { procesy, katalog },
  );
  assert.equal(przyg.poprawne['dwutlenek-wegla|oddychanie-tlenowe'], 'tak');
  assert.equal(przyg.poprawne['dwutlenek-wegla|fermentacja-alkoholowa'], 'tak');
  assert.equal(przyg.poprawne['dwutlenek-wegla|fermentacja-mlekowa'], 'nie');
  assert.equal(przyg.poprawne['woda|fermentacja-alkoholowa'], 'nie');
  const mlekowa = procesy.find((p) => p.id === 'fermentacja-mlekowa');
  assert.equal(T.zdanieProcesu(mlekowa, katalog.get('dwutlenek-wegla')), 'W fermentacji mlekowej nie powstaje dwutlenek węgla.');
  assert.equal(T.zdanieProcesu(mlekowa, katalog.get('kwas-mlekowy')), 'W fermentacji mlekowej powstaje kwas mlekowy.');
  const fot = procesy.find((p) => p.id === 'fotosynteza');
  assert.equal(T.zdanieProcesu(fot, katalog.get('substancje-pokarmowe')), 'W fotosyntezie powstają substancje pokarmowe.');
});

test('schemat fotosyntezy: komunikaty bez nazwy punktu i przyczyna przy dystraktorze', () => {
  const schemat = schematy.find((s) => s.id === 'fotosynteza-lisc');
  const proces = procesy.find((p) => p.id === 'fotosynteza');
  const zadanie = { punkty: ['co2', 'tlen', 'chloroplast'], dystraktory: [{ karta: 'mitochondrium', wyjasnienie: 'Fotosynteza zachodzi w chloroplastach.' }] };
  const elementyS = elementyProcesu(schemat, proces, katalog, zadanie.dystraktory);
  const przyg = przygotujZadanie({ zadanie, schemat, elementy: elementyS, typKomorki: null });
  assert.deepEqual(przyg.etykiety.sort(), ['chloroplast', 'dwutlenek-wegla', 'mitochondrium', 'tlen']);
  let p = L.nowyPrzebieg(przyg);
  const zle = L.podpiszTrening(przyg, p, 'co2', 'tlen');
  assert.equal(zle.wynik, 'zle');
  assert.match(zle.komunikat.tekst, /^Tlen to gaz, który powstaje w liściu/);
  assert.doesNotMatch(zle.komunikat.tekst, /dwutlenek węgla/i);
  const dys = L.podpiszTrening(przyg, zle.przebieg, 'chloroplast', 'mitochondrium');
  assert.match(dys.komunikat.tekst, /^Fotosynteza zachodzi w chloroplastach\./);
  p = L.podpiszTrening(przyg, dys.przebieg, 'co2', 'dwutlenek-wegla');
  assert.equal(p.komunikat.tekst, 'Dwutlenek węgla wnika do liści z powietrza przez aparaty szparkowe.');
  const domyslny = elementyProcesu(schemat, proces, katalog, ['kwas-mlekowy']).at(-1);
  assert.equal(domyslny.powodBledu, 'Kwas mlekowy nie bierze udziału w fotosyntezie.');
});

test('tabela wartości: pola z tabeli w TRESCI.md, krótkie etykiety długich wartości', () => {
  const { pola, kolumny } = polaTabeli({ cechy: ['tlen', 'produkty'] }, porownanie, katalog);
  assert.deepEqual(
    kolumny.map((k) => k.nazwa),
    ['oddychanie tlenowe', 'fermentacja'],
  );
  assert.equal(pola.length, 4);
  assert.equal(pola.find((p) => p.klucz === 'tlen|fermentacja').tekst, 'niewymagany');
  assert.equal(pola.find((p) => p.klucz === 'produkty|fermentacja').tekst, 'alkohol etylowy i dwutlenek węgla albo kwas mlekowy');
});

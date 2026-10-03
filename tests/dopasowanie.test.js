import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from '../app/js/components/dopasowanie-logika.js';

// Przyporządkowanie: cel ← jedna etykieta.
const przyp = {
  cele: ['c1', 'c2'],
  etykiety: ['a', 'b', 'x'],
  pasuje: (e, c) => (e === 'a' && c === 'c1') || (e === 'b' && c === 'c2'),
  pojemnosc: 1,
  klucze: 'cel',
};

// Klasyfikacja: kategoria ← wiele etykiet.
const klas = {
  cele: ['jedno', 'wielo'],
  etykiety: ['bakterie', 'drozdze', 'zubr'],
  pasuje: (e, c) => ({ bakterie: 'jedno', drozdze: 'jedno', zubr: 'wielo' })[e] === c,
  pojemnosc: Infinity,
  klucze: 'etykieta',
};

test('trening: błąd w celu odbiera mu wynik od razu, poprawka kończy zadanie', () => {
  let p = D.nowyPrzebieg(przyp);
  let r = D.umiescTrening(przyp, p, 'b', 'c1');
  assert.equal(r.wynik, 'zle');
  assert.equal(r.klucz, 'c1');
  assert.equal(r.proba, 1);
  p = r.przebieg;
  assert.equal(p.przypisania.b, null, 'błędna etykieta wraca do banku');
  p = D.umiescTrening(przyp, p, 'a', 'c1').przebieg;
  assert.equal(D.czyGotowe(przyp, p), false);
  p = D.umiescTrening(przyp, p, 'b', 'c2').przebieg;
  assert.equal(D.czyGotowe(przyp, p), true);
  assert.deepEqual(D.wynikiKluczy(przyp, p), [
    { klucz: 'c1', odRazu: false },
    { klucz: 'c2', odRazu: true },
  ]);
});

test('trening: zajęty cel i użyta etykieta nie przyjmują kolejnych ruchów', () => {
  let p = D.umiescTrening(przyp, D.nowyPrzebieg(przyp), 'a', 'c1').przebieg;
  assert.equal(D.umiescTrening(przyp, p, 'x', 'c1').wynik, 'zajete');
  assert.equal(D.umiescTrening(przyp, p, 'a', 'c2').wynik, 'zajete');
});

test('dystraktor nie pasuje do żadnego celu', () => {
  assert.equal(D.czyDystraktor(przyp, 'x'), true);
  assert.equal(D.czyDystraktor(przyp, 'a'), false);
});

test('sprawdzian: przestawianie, wypychanie z pełnego celu i ocena', () => {
  let p = D.nowyPrzebieg(przyp, 'sprawdzian');
  p = D.umiescSprawdzian(przyp, p, 'x', 'c1').przebieg;
  const r = D.umiescSprawdzian(przyp, p, 'a', 'c1');
  assert.equal(r.wypchnieta, 'x');
  p = D.umiescSprawdzian(przyp, r.przebieg, 'a', 'c2').przebieg;
  assert.equal(p.przypisania.a, 'c2', 'etykieta przeniesiona do innego celu');
  p = D.zdejmij(p, 'a');
  p = D.umiescSprawdzian(przyp, p, 'a', 'c1').przebieg;
  const { przebieg, wyniki } = D.sprawdz(przyp, p);
  assert.equal(D.czyGotowe(przyp, przebieg), true);
  assert.deepEqual(
    wyniki.map((w) => [w.klucz, w.dobrze]),
    [
      ['c1', true],
      ['c2', false],
    ],
  );
});

test('klasyfikacja: wynik liczony dla każdej etykiety, kategoria mieści wiele etykiet', () => {
  let p = D.nowyPrzebieg(klas);
  p = D.umiescTrening(klas, p, 'bakterie', 'jedno').przebieg;
  p = D.umiescTrening(klas, p, 'drozdze', 'wielo').przebieg;
  p = D.umiescTrening(klas, p, 'drozdze', 'jedno').przebieg;
  assert.equal(D.czyGotowe(klas, p), false);
  p = D.umiescTrening(klas, p, 'zubr', 'wielo').przebieg;
  assert.equal(D.czyGotowe(klas, p), true);
  assert.deepEqual(D.etykietyWCelu(p, 'jedno').sort(), ['bakterie', 'drozdze']);
  assert.deepEqual(
    D.wynikiKluczy(klas, p).map((w) => [w.klucz, w.odRazu]),
    [
      ['bakterie', true],
      ['drozdze', false],
      ['zubr', true],
    ],
  );
});

test('klasyfikacja w trybie sprawdzianu: brak etykiety w kategorii to błąd', () => {
  let p = D.nowyPrzebieg(klas, 'sprawdzian');
  p = D.umiescSprawdzian(klas, p, 'zubr', 'jedno').przebieg;
  p = D.umiescSprawdzian(klas, p, 'bakterie', 'jedno').przebieg;
  const { wyniki } = D.sprawdz(klas, p);
  assert.deepEqual(
    wyniki.map((w) => [w.klucz, w.dobrze]),
    [
      ['bakterie', true],
      ['drozdze', false],
      ['zubr', false],
    ],
  );
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsujAdres, adres } from '../app/js/core/router.js';

test('adresy ekranów są rozpoznawane', () => {
  assert.deepEqual(parsujAdres(''), { ekran: 'mapa' });
  assert.deepEqual(parsujAdres('#/'), { ekran: 'mapa' });
  assert.deepEqual(parsujAdres('#/mapa'), { ekran: 'mapa' });
  assert.deepEqual(parsujAdres('#/swiat/2'), { ekran: 'swiat', swiat: 2 });
  assert.deepEqual(parsujAdres('#/swiat/2/misja/s2-plan-miasta'), { ekran: 'misja', swiat: 2, misja: 's2-plan-miasta' });
  assert.deepEqual(parsujAdres('#/podsumowanie'), { ekran: 'podsumowanie' });
  assert.deepEqual(parsujAdres('#/baza'), { ekran: 'baza' });
  assert.deepEqual(parsujAdres('#/rodzic'), { ekran: 'rodzic' });
  assert.deepEqual(parsujAdres('#/swiat/3/boss'), { ekran: 'boss', swiat: 3 });
  assert.deepEqual(parsujAdres('#/atlas'), { ekran: 'atlas' });
  assert.deepEqual(parsujAdres('#/mikroskop'), { ekran: 'mikroskop' });
});

test('nieznane i niepełne adresy nie otwierają ekranów', () => {
  for (const h of ['#/swiat/7', '#/swiat/x', '#/swiat/2/misja', '#/swiat/2/inne/a', '#/swiat/2/boss/x', '#/baza/x', '#/atlas/2', '#/cos', '#/%E0%A4%A']) {
    assert.deepEqual(parsujAdres(h), { ekran: 'nieznany' }, h);
  }
});

test('adres i parsowanie są odwrotne', () => {
  const cele = [
    { ekran: 'mapa' },
    { ekran: 'swiat', swiat: 4 },
    { ekran: 'misja', swiat: 2, misja: 's2-plan-miasta' },
    { ekran: 'boss', swiat: 2 },
    { ekran: 'baza' },
    { ekran: 'atlas' },
    { ekran: 'mikroskop' },
    { ekran: 'rodzic' },
    { ekran: 'podsumowanie' },
  ];
  for (const c of cele) assert.deepEqual(parsujAdres(adres(c)), c);
});

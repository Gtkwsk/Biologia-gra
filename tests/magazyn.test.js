import { test } from 'node:test';
import assert from 'node:assert/strict';
import { utworzMagazyn, KLUCZ, KLUCZ_KOPII } from '../app/js/core/magazyn.js';
import { nowyStan, zapiszWynik } from '../app/js/core/stan.js';

const DZIEN = '2026-10-03';

function pamiec(poczatek = {}) {
  const dane = new Map(Object.entries(poczatek));
  return {
    dane,
    getItem: (k) => (dane.has(k) ? dane.get(k) : null),
    setItem: (k, v) => dane.set(k, String(v)),
    removeItem: (k) => dane.delete(k),
  };
}

test('pusty magazyn daje nowy stan', () => {
  const { stan, dostepny, uszkodzony } = utworzMagazyn(pamiec()).wczytaj(DZIEN);
  assert.deepEqual(stan, nowyStan(DZIEN));
  assert.equal(dostepny, true);
  assert.equal(uszkodzony, false);
});

test('zapisany stan wraca bez zmian', () => {
  const m = utworzMagazyn(pamiec());
  const s = zapiszWynik(nowyStan(DZIEN), { idZadania: 'z1', poprawne: 8, wszystkie: 8, dzien: DZIEN });
  assert.equal(m.zapisz(s), true);
  assert.deepEqual(m.wczytaj(DZIEN).stan, s);
});

test('nieczytelny zapis trafia do kopii, a gra startuje od nowa', () => {
  const p = pamiec({ [KLUCZ]: '{uszkodzone' });
  const { stan, uszkodzony } = utworzMagazyn(p).wczytaj(DZIEN);
  assert.equal(uszkodzony, true);
  assert.deepEqual(stan, nowyStan(DZIEN));
  assert.equal(p.dane.get(KLUCZ_KOPII), '{uszkodzone');
});

test('zablokowany magazyn nie przerywa gry', () => {
  const zablokowany = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
    removeItem() {
      throw new Error('SecurityError');
    },
  };
  const m = utworzMagazyn(zablokowany);
  const { stan, dostepny } = m.wczytaj(DZIEN);
  assert.equal(dostepny, false);
  assert.deepEqual(stan, nowyStan(DZIEN));
  assert.equal(m.zapisz(stan), false);
  assert.equal(m.usun(), false);
});

test('usunięcie postępu czyści zapis', () => {
  const p = pamiec();
  const m = utworzMagazyn(p);
  m.zapisz(nowyStan(DZIEN));
  assert.equal(m.usun(), true);
  assert.equal(p.dane.has(KLUCZ), false);
});

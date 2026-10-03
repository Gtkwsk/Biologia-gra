import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  otwarteSwiaty,
  utrwalOdblokowane,
  statusSwiata,
  poprzedniGotowy,
  opanowanieSwiata,
  wykladDostepny,
} from '../app/js/core/swiaty.js';
import { nowyStan, zaliczBossa, zapiszWynik, ustawOdblokujWszystkie } from '../app/js/core/stan.js';

const DZIEN = '2026-10-03';

function swiaty(gotowe) {
  return [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    gotowy: gotowe.includes(id),
    misje: gotowe.includes(id) ? [{ id: `m${id}`, zadania: [`z${id}a`, `z${id}b`] }] : [],
  }));
}

test('otwarty jest pierwszy gotowy świat, a następny po pokonaniu bossa', () => {
  const sw = swiaty([2, 3, 4]);
  let s = nowyStan(DZIEN);
  assert.deepEqual([...otwarteSwiaty(sw, s)], [2]);
  s = zaliczBossa(s, 2);
  assert.deepEqual([...otwarteSwiaty(sw, s)].sort(), [2, 3]);
});

test('świat w budowie nigdy nie jest otwarty', () => {
  const sw = swiaty([2]);
  const s = ustawOdblokujWszystkie(nowyStan(DZIEN), true);
  assert.deepEqual([...otwarteSwiaty(sw, s)], [2]);
  assert.equal(statusSwiata(sw[0], s, otwarteSwiaty(sw, s)), 'w-budowie');
});

test('raz otwarty świat zostaje otwarty, gdy wcześniej pojawi się nowy gotowy świat', () => {
  let s = utrwalOdblokowane(swiaty([2]), nowyStan(DZIEN));
  assert.deepEqual(s.odblokowane, [2]);
  // W kolejnym etapie gotowy staje się świat 1: świat 2 nie może się zamknąć.
  const pozniej = swiaty([1, 2]);
  assert.deepEqual([...otwarteSwiaty(pozniej, s)].sort(), [1, 2]);
});

test('świat z wynikami zostaje otwarty, choć zapis nie ma listy otwartych światów', () => {
  // Zapis z wersji, w której pierwszym gotowym światem był świat 2 (przed listą odblokowane).
  let s = zapiszWynik(nowyStan(DZIEN), { idZadania: 'z2a', poprawne: 3, wszystkie: 8, dzien: DZIEN });
  const pozniej = swiaty([1, 2, 3]);
  assert.deepEqual([...otwarteSwiaty(pozniej, s)].sort(), [1, 2]);
  s = utrwalOdblokowane(pozniej, s);
  assert.deepEqual(s.odblokowane, [1, 2]);
});

test('przełącznik w panelu otwiera wszystkie gotowe światy, ale nie jest utrwalany', () => {
  const sw = swiaty([2, 3]);
  let s = ustawOdblokujWszystkie(nowyStan(DZIEN), true);
  assert.deepEqual([...otwarteSwiaty(sw, s)].sort(), [2, 3]);
  s = utrwalOdblokowane(sw, s);
  assert.deepEqual(s.odblokowane, [2]);
  s = ustawOdblokujWszystkie(s, false);
  assert.deepEqual([...otwarteSwiaty(sw, s)], [2]);
});

test('status świata i świat do pokonania przed otwarciem', () => {
  const sw = swiaty([2, 3]);
  let s = nowyStan(DZIEN);
  assert.equal(statusSwiata(sw[1], s, otwarteSwiaty(sw, s)), 'otwarty');
  assert.equal(statusSwiata(sw[2], s, otwarteSwiaty(sw, s)), 'zablokowany');
  assert.equal(poprzedniGotowy(sw, sw[2]).id, 2);
  assert.equal(poprzedniGotowy(sw, sw[1]), null);
  s = zaliczBossa(s, 2);
  assert.equal(statusSwiata(sw[1], s, otwarteSwiaty(sw, s)), 'pokonany');
});

test('opanowanie świata to część zadań rozwiązanych co najmniej w 80%', () => {
  const sw = swiaty([2]);
  let s = nowyStan(DZIEN);
  assert.equal(opanowanieSwiata(sw[1], s), 0);
  s = zapiszWynik(s, { idZadania: 'z2a', poprawne: 7, wszystkie: 8, dzien: DZIEN });
  s = zapiszWynik(s, { idZadania: 'z2b', poprawne: 6, wszystkie: 8, dzien: DZIEN });
  assert.equal(opanowanieSwiata(sw[1], s), 0.5);
  assert.equal(opanowanieSwiata(sw[0], s), 0);
});

test('wykład Profesora Pomyłki otwiera się po misjach świata albo po bossie i nie zmienia opanowania', () => {
  const sw = { ...swiaty([2])[1], wyklad: { id: 'w2', zadania: ['w2a'] } };
  let s = nowyStan(DZIEN);
  assert.equal(wykladDostepny(sw, s), false);
  s = zapiszWynik(s, { idZadania: 'z2a', poprawne: 8, wszystkie: 8, dzien: DZIEN });
  assert.equal(wykladDostepny(sw, s), false, 'misja ukończona tylko w części');
  s = zapiszWynik(s, { idZadania: 'z2b', poprawne: 8, wszystkie: 8, dzien: DZIEN });
  assert.equal(wykladDostepny(sw, s), true);
  assert.equal(opanowanieSwiata(sw, s), 1, 'nierozwiązany wykład nie obniża opanowania świata');
  assert.equal(wykladDostepny(sw, zaliczBossa(nowyStan(DZIEN), 2)), true, 'po pokonanym bossie wykład jest otwarty');
  assert.equal(wykladDostepny(swiaty([2])[1], s), false, 'świat bez wykładu');
});

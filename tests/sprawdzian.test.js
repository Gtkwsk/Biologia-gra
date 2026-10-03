import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as S from '../app/js/core/sprawdzian.js';
import sprawdzian from '../app/data/sprawdzian.js';
import zadania from '../app/data/zadania.js';
import swiaty from '../app/data/swiaty.js';
import { nowyStan, zaliczBossa, ustawOdblokujWszystkie } from '../app/js/core/stan.js';
import { dataSlownie } from '../app/js/core/daty.js';

const DZIEN = '2026-10-03';

test('sprawdzian ma 14 zadań za 29 punktów, jak w TRESCI.md, sekcja 8', () => {
  assert.equal(sprawdzian.length, 14);
  assert.equal(S.sumaPunktow(sprawdzian), 29);
});

test('punkty za zadanie: część poprawnych razy punkty, w dół do pełnych', () => {
  assert.equal(S.punktyZaZadanie(3, { poprawne: 8, wszystkie: 8 }), 3);
  assert.equal(S.punktyZaZadanie(3, { poprawne: 7, wszystkie: 8 }), 2);
  assert.equal(S.punktyZaZadanie(3, { poprawne: 2, wszystkie: 3 }), 2, 'bez błędu zaokrąglenia przy 3 × 2/3');
  assert.equal(S.punktyZaZadanie(2, { poprawne: 1, wszystkie: 2 }), 1);
  assert.equal(S.punktyZaZadanie(1, { poprawne: 3, wszystkie: 4 }), 0, 'zadanie za 1 punkt tylko bez błędu');
  assert.equal(S.punktyZaZadanie(2, { poprawne: 0, wszystkie: 0 }), 0);
  assert.equal(S.punktyZaZadanie(2, null), 0);
});

test('sprawdzian otwiera się po wszystkich bossach albo po odblokowaniu w panelu rodzica', () => {
  let s = nowyStan(DZIEN);
  assert.equal(S.sprawdzianDostepny(swiaty, s), false);
  for (const id of [1, 2, 3, 4, 5]) s = zaliczBossa(s, id);
  assert.equal(S.sprawdzianDostepny(swiaty, s), false);
  assert.equal(S.sprawdzianDostepny(swiaty, zaliczBossa(s, 6)), true);
  assert.equal(S.sprawdzianDostepny(swiaty, ustawOdblokujWszystkie(nowyStan(DZIEN), true)), true);
});

test('losowanie bierze po jednym zadaniu z każdej puli, w kolejności punktów', () => {
  const pozycje = S.wylosujZadania(sprawdzian, zadania, () => 0);
  assert.deepEqual(
    pozycje.map((p) => p.zadanie.id),
    sprawdzian.map((p) => p.pula[0]),
  );
  const ostatnie = S.wylosujZadania(sprawdzian, zadania, () => 0.999);
  assert.deepEqual(
    ostatnie.map((p) => p.zadanie.id),
    sprawdzian.map((p) => p.pula.at(-1)),
  );
});

test('wynik i podsumowanie: suma punktów i tematy do poprawy', () => {
  const pozycje = S.wylosujZadania(sprawdzian, zadania, () => 0);
  const wyniki = pozycje.map((p, i) => (i === 2 ? { poprawne: 3, wszystkie: 5 } : { poprawne: 4, wszystkie: 4 }));
  const wynik = S.wynikSprawdzianu(pozycje, wyniki, DZIEN);
  const pods = S.podsumuj(wynik);
  assert.equal(pods.maks, 29);
  assert.equal(pods.zdobyte, 29 - 2, 'punkt 3 (3 pkt) przy 3 z 5 daje 1 punkt');
  assert.deepEqual(pods.doPoprawy, [3]);
});

test('najsłabsze tematy liczone z ostatnich podejść, od najsłabszego', () => {
  const s = (punkty) => ({ dzien: DZIEN, zadania: punkty.map(([punkt, zdobyte, maks]) => ({ punkt, zdobyte, maks })) });
  const lista = [s([[1, 0, 1], [2, 2, 2]]), s([[1, 1, 1], [2, 0, 2], [3, 1, 3]]), s([[1, 1, 1], [2, 2, 2], [3, 3, 3]]), s([[1, 1, 1], [2, 1, 2], [3, 3, 3]])];
  const slabe = S.najslabszePunkty(lista, 3);
  assert.deepEqual(
    slabe.map((p) => p.punkt),
    [2, 3],
    'punkt 1 bez straty w trzech ostatnich podejściach',
  );
  assert.equal(slabe[0].czesc, 3 / 6);
});

test('data słownie po polsku', () => {
  assert.equal(dataSlownie('2026-10-03'), '3 października 2026');
  assert.equal(dataSlownie('2027-01-15'), '15 stycznia 2027');
  assert.equal(dataSlownie('jutro'), 'jutro');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as B from '../app/js/core/boss.js';
import { nowyStan, zaliczBossa } from '../app/js/core/stan.js';
import swiaty from '../app/data/swiaty.js';
import zadania from '../app/data/zadania.js';

const swiat2 = swiaty.find((s) => s.id === 2);

test('boss dostępny dopiero po rozwiązaniu wszystkich zadań z misji świata', () => {
  let stan = nowyStan('2026-10-03');
  assert.equal(B.bossDostepny(swiat2, stan), false);
  const ids = swiat2.misje.flatMap((m) => m.zadania);
  for (const id of ids.slice(0, -1)) stan.zadania[id] = { proby: 1, najlepszy: 0.5, ostatni: 0.5, ostatnio: '2026-10-03' };
  assert.equal(B.bossDostepny(swiat2, stan), false);
  assert.equal(B.misjeUkonczone(swiat2, stan), swiat2.misje.length - 1);
  stan.zadania[ids.at(-1)] = { proby: 1, najlepszy: 0, ostatni: 0, ostatnio: '2026-10-03' };
  assert.equal(B.bossDostepny(swiat2, stan), true);
});

test('z każdej puli bossa losowane jest jedno zadanie', () => {
  const pierwsze = B.wylosujWyzwania(swiat2.boss, zadania, () => 0);
  const ostatnie = B.wylosujWyzwania(swiat2.boss, zadania, () => 0.999);
  assert.equal(pierwsze.length, swiat2.boss.wyzwania.length);
  pierwsze.forEach((z, i) => assert.equal(z.id, swiat2.boss.wyzwania[i].pula[0]));
  ostatnie.forEach((z, i) => assert.equal(z.id, swiat2.boss.wyzwania[i].pula.at(-1)));
});

test('wyzwanie z błędem kosztuje jedno serce, trzy stracone kończą podejście', () => {
  let p = B.nowePodejscie(4);
  p = B.poWyzwaniu(p, { poprawne: 8, wszystkie: 8, karty: [] });
  assert.equal(p.serca, 3);
  assert.equal(p.stracone, false);
  p = B.poWyzwaniu(p, { poprawne: 2, wszystkie: 3, karty: [] });
  assert.equal(p.serca, 2);
  assert.equal(B.stanPodejscia(p), 'trwa');
  p = B.poWyzwaniu(p, { poprawne: 0, wszystkie: 5, karty: [] });
  p = B.poWyzwaniu(p, { poprawne: 4, wszystkie: 5, karty: [] });
  assert.equal(p.serca, 0);
  assert.equal(B.stanPodejscia(p), 'przegrane');
});

test('ukończenie wszystkich wyzwań z co najmniej jednym sercem to wygrana', () => {
  let p = B.nowePodejscie(2);
  p = B.poWyzwaniu(p, { poprawne: 1, wszystkie: 3, karty: [] });
  p = B.poWyzwaniu(p, { poprawne: 3, wszystkie: 3, karty: [] });
  assert.equal(B.stanPodejscia(p), 'wygrane');
});

test('mikroskop: lupa, potem 400 razy za bossa świata 2 i 10 000 razy za bossa świata 3', () => {
  let stan = nowyStan('2026-10-03');
  assert.equal(B.poziomMikroskopu(stan), 0);
  stan = zaliczBossa(stan, 2);
  assert.equal(B.poziomMikroskopu(stan), 1);
  stan = zaliczBossa(stan, 3);
  assert.equal(B.poziomMikroskopu(stan), 2);
});

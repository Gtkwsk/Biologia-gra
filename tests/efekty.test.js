import { test } from 'node:test';
import assert from 'node:assert/strict';
import { awanseKart, poziomKarty } from '../app/js/core/karty.js';
import { tytulOdkrycia, opisAwansu } from '../app/js/components/odkrycie.js';
import { mnoznikSerii, NAZWY_DZWIEKOW } from '../app/js/core/dzwieki.js';

test('awanse kart: tylko karty, które po zadaniu są na wyższym poziomie', () => {
  const przed = {
    cytozol: { odRazu: 1, typy: ['luki'], boss: false },
    rybosomy: { odRazu: 2, typy: ['luki', 'podpisywanie'], boss: false },
  };
  const po = {
    cytozol: { odRazu: 2, typy: ['luki', 'klasyfikacja'], boss: false },
    rybosomy: { odRazu: 3, typy: ['luki', 'podpisywanie'], boss: true },
    'jadro-komorkowe': { odRazu: 1, typy: ['podpisywanie'], boss: false },
    wakuola: { odRazu: 0, typy: [], boss: false },
  };
  assert.equal(poziomKarty(po.wakuola), 'brazowa', 'karta poprawiona po błędzie jest brązowa');
  assert.deepEqual(awanseKart(przed, po, ['cytozol', 'rybosomy', 'jadro-komorkowe', 'wakuola', 'cytozol', 'nieznana']), [
    { karta: 'cytozol', z: 'brazowa', na: 'srebrna' },
    { karta: 'rybosomy', z: 'srebrna', na: 'zlota' },
    { karta: 'jadro-komorkowe', z: 'nieodkryta', na: 'brazowa' },
    { karta: 'wakuola', z: 'nieodkryta', na: 'brazowa' },
  ]);
  assert.deepEqual(awanseKart(po, po, ['cytozol']), [], 'bez zmiany poziomu nie ma odkrycia');
});

test('nagłówek odkrycia zależy od rodzaju awansów', () => {
  const nowa = { karta: 'a', z: 'nieodkryta', na: 'brazowa' };
  const awans = { karta: 'b', z: 'brazowa', na: 'srebrna' };
  const zlota = { karta: 'c', z: 'srebrna', na: 'zlota' };
  assert.equal(tytulOdkrycia([nowa]), 'Nowa karta w atlasie!');
  assert.equal(tytulOdkrycia([nowa, nowa]), 'Nowe karty w atlasie: 2');
  assert.equal(tytulOdkrycia([awans]), 'Karta awansowała!');
  assert.equal(tytulOdkrycia([nowa, awans]), 'Karty awansowały!');
  assert.equal(tytulOdkrycia([zlota]), 'Złota karta!');
  assert.equal(tytulOdkrycia([nowa, zlota]), 'Złote karty!');
  assert.equal(opisAwansu(nowa), 'nowa karta');
  assert.equal(opisAwansu(awans), 'brązowa → srebrna');
});

test('seria dobrych odpowiedzi podnosi ton najwyżej do oktawy; nowe dźwięki istnieją', () => {
  assert.equal(mnoznikSerii(1), 1);
  assert.equal(mnoznikSerii(2), 1.2);
  assert.equal(mnoznikSerii(4), 2);
  assert.equal(mnoznikSerii(9), 2, 'seria nie rośnie w nieskończoność');
  assert.equal(mnoznikSerii(0), 1);
  for (const n of ['dobrze', 'zle', 'koniec', 'wygrana', 'fanfara', 'karta', 'cios']) assert.ok(NAZWY_DZWIEKOW.includes(n), n);
});

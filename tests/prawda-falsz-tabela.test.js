import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../app/js/components/prawda-falsz-logika.js';
import * as T from '../app/js/components/tabela-logika.js';
import elementy from '../app/data/elementy-komorek.js';
import typyKomorek from '../app/data/typy-komorek.js';

const falszywe = {
  tekst: 'Energii komórce dostarczają rybosomy.',
  prawda: false,
  blad: 'rybosomy',
  poprawki: ['mitochondria', 'wakuole', 'rybosomy jądra'],
  poprawka: 'mitochondria',
  wyjasnienie: 'Mitochondrium to centrum energetyczne komórki.',
};
const prawdziwe = { tekst: 'Rybosomy wytwarzają białka.', prawda: true, wyjasnienie: 'Tak podaje podręcznik.' };

test('tokeny: błędny fragment jest jednym kawałkiem z doklejoną kropką', () => {
  const t = P.tokeny(falszywe);
  assert.deepEqual(
    t.map((x) => [x.tekst, x.blad]),
    [
      ['Energii', false],
      ['komórce', false],
      ['dostarczają', false],
      ['rybosomy.', true],
    ],
  );
  assert.equal(P.poprawione(falszywe), 'Energii komórce dostarczają mitochondria.');
});

test('fałsz rozpoznany i poprawiony za pierwszym razem', () => {
  let st = P.nowyStanZdania();
  st = P.ocen(falszywe, st, false).st;
  assert.equal(st.etap, 'fragment');
  st = P.wybierzFragment(falszywe, st, P.tokeny(falszywe)[3]).st;
  assert.equal(st.etap, 'poprawka');
  const r = P.wybierzPoprawke(falszywe, st, 'mitochondria');
  assert.equal(r.st.etap, 'koniec');
  assert.equal(r.st.bezBledu, true);
});

test('trening: błędy nie przerywają, ale zdanie nie liczy się jako dobre od razu', () => {
  let st = P.ocen(falszywe, P.nowyStanZdania(), true).st;
  assert.equal(st.etap, 'fragment');
  assert.equal(st.bezBledu, false);
  const zly = P.wybierzFragment(falszywe, st, P.tokeny(falszywe)[0]);
  assert.match(zly.komunikat.tytul, /Energii/);
  st = P.wybierzFragment(falszywe, zly.st, P.tokeny(falszywe)[3]).st;
  st = P.wybierzPoprawke(falszywe, st, 'wakuole').st;
  assert.equal(st.etap, 'poprawka');
  st = P.wybierzPoprawke(falszywe, st, 'mitochondria').st;
  assert.equal(st.etap, 'koniec');
  assert.equal(st.bezBledu, false);
});

test('sprawdzian: pierwszy błąd kończy zdanie i pokazuje poprawną wersję', () => {
  const r = P.ocen(falszywe, P.nowyStanZdania(), true, 'sprawdzian');
  assert.equal(r.st.etap, 'koniec');
  assert.match(r.komunikat.tekst, /Energii komórce dostarczają mitochondria\./);
});

test('zdanie prawdziwe: „Prawda” kończy, „Fałsz” to błąd z wyjaśnieniem', () => {
  assert.equal(P.ocen(prawdziwe, P.nowyStanZdania(), true).st.bezBledu, true);
  const r = P.ocen(prawdziwe, P.nowyStanZdania(), false);
  assert.equal(r.st.etap, 'koniec');
  assert.equal(r.st.bezBledu, false);
  assert.equal(r.komunikat.tytul, 'To zdanie jest prawdziwe.');
});

test('tabela: odpowiedzi z danych typów komórek i zdania wyjaśniające', () => {
  const przyg = T.przygotujTabele(
    { wiersze: ['jadro-komorkowe', 'mitochondrium', 'sciana-komorkowa'], kolumny: ['zwierzeca', 'bakteryjna'] },
    { elementy, typyKomorek },
  );
  assert.equal(przyg.poprawne['mitochondrium|bakteryjna'], 'nie');
  assert.equal(przyg.poprawne['sciana-komorkowa|bakteryjna'], 'tak');
  const bakteryjna = typyKomorek.find((t) => t.id === 'bakteryjna');
  const zwierzeca = typyKomorek.find((t) => t.id === 'zwierzeca');
  const el = (id) => elementy.find((e) => e.id === id);
  assert.equal(T.zdanieKomorki(bakteryjna, el('mitochondrium')), 'Komórka bakteryjna nie ma mitochondriów.');
  assert.equal(T.zdanieKomorki(zwierzeca, el('jadro-komorkowe')), 'Komórka zwierzęca ma jądro komórkowe.');
  assert.match(T.zdanieKomorki(bakteryjna, el('jadro-komorkowe')), /nić DNA/);

  const odp = {
    'jadro-komorkowe|zwierzeca': 'tak',
    'jadro-komorkowe|bakteryjna': 'tak',
    'mitochondrium|zwierzeca': 'tak',
    'mitochondrium|bakteryjna': 'nie',
    'sciana-komorkowa|zwierzeca': 'nie',
  };
  const o = T.ocenTabele(przyg, odp);
  assert.equal(o.wszystkie, 6);
  assert.equal(o.poprawne, 4);
  assert.deepEqual(o.wiersze, { 'jadro-komorkowe': false, mitochondrium: true, 'sciana-komorkowa': false });
  assert.deepEqual(o.kolumny, { zwierzeca: true, bakteryjna: false });
});

test('każde zdanie tabeli dla wszystkich typów jest pełnym zdaniem', () => {
  for (const typ of typyKomorek) {
    for (const e of elementy) {
      const ob = typ.obecnosc[e.id];
      if (ob !== 'tak' && ob !== 'nie') continue;
      const z = T.zdanieKomorki(typ, e);
      assert.match(z, /^[A-ZĄĆĘŁŃÓŚŹŻ].*\.$/u, z);
      assert.doesNotMatch(z, /undefined/);
    }
  }
});

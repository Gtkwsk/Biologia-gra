import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from '../app/js/components/detektyw-logika.js';
import * as K from '../app/js/components/konstruktor-logika.js';
import { parsujLuki } from '../app/js/components/luki-logika.js';
import * as P from '../app/js/components/prawda-falsz-logika.js';
import typyKomorek from '../app/data/typy-komorek.js';
import elementy from '../app/data/elementy-komorek.js';
import wskazowki from '../app/data/wskazowki.js';
import czesci from '../app/data/konstruktor.js';
import zadania from '../app/data/zadania.js';

const wsk = new Map(wskazowki.map((w) => [w.id, w]));
const el = new Map(elementy.map((e) => [e.id, e]));
const typ = (id) => typyKomorek.find((t) => t.id === id);

test('detektyw: wskazówki o elementach pasują do typów z tabeli w TRESCI.md', () => {
  assert.deepEqual([...D.pasujaceTypy(wsk.get('ma-sciane'), typyKomorek)].sort(), ['bakteryjna', 'grzybowa', 'roslinna']);
  assert.deepEqual([...D.pasujaceTypy(wsk.get('bez-jadra'), typyKomorek)], ['bakteryjna']);
  // „u części bakterii”: rzęska nie wyklucza komórki bakteryjnej
  assert.deepEqual([...D.pasujaceTypy(wsk.get('ma-rzeske'), typyKomorek)], ['bakteryjna']);
});

test('detektyw: ściana z chityny nie wyklucza bakterii, bo TRESCI.md nie podaje budulca ich ściany', () => {
  const chityna = wsk.get('sciana-chityna');
  assert.equal(D.wyklucza(chityna, 'bakteryjna', typyKomorek), false);
  assert.equal(D.wyklucza(chityna, 'roslinna', typyKomorek), true);
  assert.deepEqual(D.mozliwe([chityna], typyKomorek).sort(), ['bakteryjna', 'grzybowa']);
});

test('detektyw: liczba potrzebnych wskazówek i lupy', () => {
  const sprawa = { cel: 'grzybowa', wskazowki: ['ma-sciane', 'ma-mitochondria', 'bez-chloroplastow', 'sciana-chityna'] };
  assert.equal(D.potrzebneWskazowki(sprawa, wsk, typyKomorek), 3);
  assert.equal(D.lupy(3, 3), 3);
  assert.equal(D.lupy(4, 3), 2);
  assert.equal(D.lupy(6, 3), 1);
});

test('detektyw: błędne wskazanie podaje wykluczającą wskazówkę albo informuje o zgadywaniu', () => {
  const sprawa = { cel: 'roslinna', wskazowki: ['ma-jadro', 'ma-sciane', 'ma-chloroplasty'] };
  const odsl = [wsk.get('ma-jadro')];
  const bak = D.ocenWskazanie(sprawa, odsl, 'bakteryjna', typyKomorek);
  assert.equal(bak.trafione, false);
  assert.equal(bak.wykluczajaca.id, 'ma-jadro');
  assert.match(D.powodWykluczenia(typ('bakteryjna'), bak.wykluczajaca, el), /nie ma jądra komórkowego/);
  const zw = D.ocenWskazanie(sprawa, odsl, 'zwierzeca', typyKomorek);
  assert.equal(zw.wykluczajaca, null);
  const zgadniete = D.ocenWskazanie(sprawa, odsl, 'roslinna', typyKomorek);
  assert.equal(zgadniete.trafione, true);
  assert.equal(zgadniete.pewne, false);
});

test('detektyw: każda sprawa w zadaniach rozstrzyga się wskazówkami i żadna wskazówka nie przeczy celowi', () => {
  for (const z of zadania.filter((x) => x.typ === 'detektyw')) {
    for (const sprawa of z.sprawy) {
      assert.ok(D.potrzebneWskazowki(sprawa, wsk, typyKomorek), `${z.id}: ${sprawa.cel}`);
      for (const id of sprawa.wskazowki) assert.equal(D.wyklucza(wsk.get(id), sprawa.cel, typyKomorek), false, `${z.id}: ${id}`);
    }
  }
});

test('konstruktor: reguły z danych o typach komórek', () => {
  assert.equal(K.regula(typ('bakteryjna'), el.get('jadro-komorkowe')).decyzja, 'zakazana');
  assert.match(K.regula(typ('bakteryjna'), el.get('jadro-komorkowe')).zdanie, /nić DNA/);
  assert.equal(K.regula(typ('bakteryjna'), el.get('rzeska')).decyzja, 'dozwolona');
  assert.equal(K.regula(typ('zwierzeca'), el.get('nic-dna')).decyzja, 'zakazana');
  assert.equal(K.regula(typ('roslinna'), el.get('chloroplast')).decyzja, 'wymagana');
  assert.deepEqual(K.wymagane(typ('bakteryjna'), czesci).sort(), ['blona-komorkowa', 'cytozol', 'nic-dna', 'rybosomy', 'sciana-komorkowa']);
  assert.deepEqual(K.brakujace(typ('grzybowa'), czesci, new Set(['blona-komorkowa', 'cytozol', 'rybosomy', 'jadro-komorkowe', 'mitochondrium', 'wakuola'])), ['sciana-komorkowa']);
});

test('konstruktor: każda część ma regułę dla każdego typu komórki', () => {
  for (const t of typyKomorek) for (const id of czesci) assert.notEqual(K.regula(t, el.get(id)).decyzja, 'nieznana', `${t.id}: ${id}`);
});

test('luki: odczyt luk z kartą i podpowiedzią', () => {
  const f = parsujLuki('Ściana z [celulozy|sciana-komorkowa|To cukier.] i [fotosynteza||Proces.] oraz [wody].');
  const luki = f.filter((x) => x.typ === 'luka');
  assert.deepEqual(
    luki.map((l) => [l.numer, l.slowo, l.karta, l.podpowiedz]),
    [
      [1, 'celulozy', 'sciana-komorkowa', 'To cukier.'],
      [2, 'fotosynteza', null, 'Proces.'],
      [3, 'wody', null, null],
    ],
  );
  assert.equal(f.filter((x) => x.typ === 'tekst').map((x) => x.tekst).join('|'), 'Ściana z | i | oraz |.');
});

test('prawda/fałsz: wybór poprawnej wersji zdania', () => {
  const zd = {
    tekst: 'Rybosomy dostarczają komórce energii.',
    prawda: false,
    poprawne: 'Mitochondria dostarczają komórce energii.',
    bledne: ['Wakuole dostarczają komórce energii.'],
    wyjasnienie: 'Mitochondria to centrum energetyczne komórki.',
  };
  let r = P.ocen(zd, P.nowyStanZdania(), false);
  assert.equal(r.st.etap, 'wersja');
  r = P.wybierzWersje(zd, r.st, 'Wakuole dostarczają komórce energii.');
  assert.equal(r.st.etap, 'wersja');
  assert.equal(r.st.bezBledu, false);
  r = P.wybierzWersje(zd, r.st, zd.poprawne);
  assert.equal(r.st.etap, 'koniec');
  assert.equal(P.poprawione(zd), zd.poprawne);
  const spr = P.wybierzWersje(zd, { etap: 'wersja', bezBledu: true }, 'Wakuole dostarczają komórce energii.', 'sprawdzian');
  assert.equal(spr.st.etap, 'koniec');
  assert.match(spr.komunikat.tytul, /Mitochondria/);
});

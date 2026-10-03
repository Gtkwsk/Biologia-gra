import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../app/js/components/lancuch-logika.js';
import * as LS from '../app/js/components/las-logika.js';
import { rodzajBledu, kluczKomorki } from '../app/js/components/siatka.js';
import { miejsca } from '../app/js/components/slupki.js';
import pokarm from '../app/data/pokarm.js';
import elementy from '../app/data/elementy-komorek.js';
import typyKomorek from '../app/data/typy-komorek.js';
import pojecia from '../app/data/pojecia.js';
import organizmy from '../app/data/organizmy.js';
import { katalogKart } from '../app/js/core/karty.js';

const katalog = katalogKart({ elementy, typyKomorek, pojecia, organizmy });
const dane = { katalog, wezly: pokarm.wezly, zaleznosci: pokarm.zaleznosci };

test('łańcuch: zależność z data/pokarm.js daje „tak”', () => {
  assert.equal(L.relacja('jelen', 'rosliny', dane), 'tak');
  assert.equal(L.relacja('niedzwiedz-brunatny', 'jelen', dane), 'tak');
});

test('łańcuch: definicja kategorii wyklucza pokarm („nie”)', () => {
  // Roślinożerca nie zjada zwierząt, drapieżnik nie żywi się roślinami, organizm samożywny nikogo nie zjada.
  assert.equal(L.relacja('zubr', 'lis', dane), 'nie');
  assert.equal(L.relacja('wilk', 'trawa', dane), 'nie');
  assert.equal(L.relacja('topola', 'jelen', dane), 'nie');
});

test('łańcuch: czego TRESCI.md nie rozstrzyga, to „nie-wiadomo”', () => {
  // Wilk to drapieżnik, więc mógłby zjeść jelenia, ale TRESCI.md takiej zależności nie podaje.
  assert.equal(L.relacja('wilk', 'jelen', dane), 'nie-wiadomo');
  assert.equal(L.relacja('dzik', 'rosliny', dane), 'nie-wiadomo');
});

test('łańcuch: początek musi być samożywny, luka ma jedną dobrą opcję', () => {
  const lancuch = {
    ogniwa: [null, 'jelen', 'niedzwiedz-brunatny'],
    opcje: [
      { karta: 'rosliny', poprawna: true },
      { karta: 'lis', wyjasnienie: 'Lis nie jest organizmem samożywnym.' },
    ],
  };
  assert.deepEqual(L.problemy(lancuch, dane), []);
  assert.equal(L.indeksLuki(lancuch), 0);
  assert.deepEqual(L.pelny(lancuch), ['rosliny', 'jelen', 'niedzwiedz-brunatny']);
  const dobrze = L.ocen(lancuch, 'rosliny', dane);
  assert.equal(dobrze.dobrze, true);
  assert.match(dobrze.tekst, /organizmu samożywnego/);
  assert.deepEqual(L.ocen(lancuch, 'lis', dane), { dobrze: false, tekst: 'Lis nie jest organizmem samożywnym.' });
});

test('łańcuch: walidator odrzuca dystraktor, którego definicja nie wyklucza', () => {
  const lancuch = {
    ogniwa: ['rosliny', null, 'niedzwiedz-brunatny'],
    opcje: [
      { karta: 'jelen', poprawna: true },
      // Łoś to roślinożerca: mógłby jeść rośliny, a TRESCI.md nie mówi, czy zjada go niedźwiedź.
      { karta: 'los', wyjasnienie: '...' },
    ],
  };
  assert.ok(L.problemy(lancuch, dane).some((p) => p.includes('nie da się wykluczyć')));
});

test('łańcuch: walidator odrzuca ogniwo bez zależności i dwie luki', () => {
  const bezZaleznosci = { ogniwa: ['rosliny', null, 'wilk'], opcje: [{ karta: 'jelen', poprawna: true }] };
  assert.ok(L.problemy(bezZaleznosci, dane).some((p) => p.includes('brak zależności')));
  const dwieLuki = { ogniwa: ['rosliny', null, null], opcje: [{ karta: 'jelen', poprawna: true }] };
  assert.ok(L.problemy(dwieLuki, dane).some((p) => p.includes('dokładnie jedną lukę')));
});

test('las: bez organizmów odżywiających się szczątkami szczątków przybywa, a soli ubywa', () => {
  const start = LS.nowyLas();
  const bez = LS.lata(start, false, 4);
  assert.equal(bez.length, 4);
  assert.ok(bez.every((s, i) => s.szczatki > (i ? bez[i - 1].szczatki : start.szczatki)));
  assert.ok(bez.at(-1).sole < start.sole);
  assert.equal(LS.rosliny(bez.at(-1).sole), 'male');
  const z = LS.lata(bez.at(-1), true, 4);
  assert.ok(z.at(-1).szczatki < bez.at(-1).szczatki);
  assert.equal(z.at(-1).sole, LS.MAKS_SOLI);
  assert.equal(LS.rosliny(z.at(-1).sole), 'duze');
});

test('las: wartości nie wychodzą poza zakres', () => {
  const dlugo = LS.lata(LS.nowyLas(), false, 30).at(-1);
  assert.equal(dlugo.szczatki, LS.MAKS_SZCZATKOW);
  assert.equal(dlugo.sole, 0);
  assert.equal(LS.lata(LS.nowyLas(), true, 30).at(-1).szczatki, 1);
});

test('sortownia: komunikat rozróżnia zły związek, złą funkcję i oba błędy', () => {
  const miod = { wiersz: 'cukry', kolumna: 'energetyczna' };
  assert.equal(rodzajBledu(miod, kluczKomorki('cukry', 'energetyczna')), null);
  assert.equal(rodzajBledu(miod, kluczKomorki('tluszcze', 'energetyczna')), 'wiersz');
  assert.equal(rodzajBledu(miod, kluczKomorki('cukry', 'zapasowa')), 'kolumna');
  assert.equal(rodzajBledu(miod, kluczKomorki('bialka', 'budulcowa')), 'oba');
});

test('skład ciała: miejsca od największego udziału do najmniejszego', () => {
  const m = miejsca([
    { id: 'cukry', procent: 1 },
    { id: 'woda', procent: 65 },
    { id: 'bialka', procent: 18 },
  ]);
  assert.deepEqual(
    m.map((s) => [s.id, s.miejsce]),
    [
      ['woda', 1],
      ['bialka', 2],
      ['cukry', 3],
    ],
  );
});

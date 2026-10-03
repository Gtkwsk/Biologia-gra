import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  nowyStan,
  migruj,
  normalizuj,
  odczytajStan,
  doEksportu,
  zImportu,
  zapiszWynik,
  ustawImie,
  BladStanu,
  WERSJA_SCHEMATU,
} from '../app/js/core/stan.js';
import { dzisiaj } from '../app/js/core/daty.js';

const DZIEN = '2026-10-03';

test('nowy stan ma bieżącą wersję schematu i domyślne imię', () => {
  const s = nowyStan(DZIEN);
  assert.equal(s.wersja, WERSJA_SCHEMATU);
  assert.equal(s.ustawienia.imie, 'Mikołaj');
  assert.deepEqual(s.zadania, {});
  assert.equal(s.czasMs, 0);
});

test('migracje wykonują się po kolei aż do wersji docelowej', () => {
  const migracje = {
    1: (d) => ({ ...d, punkty: d.punkty * 2 }),
    2: (d) => ({ ...d, imie: d.imie ?? 'Mikołaj' }),
  };
  const wynik = migruj({ wersja: 1, punkty: 5 }, migracje, 3);
  assert.deepEqual(wynik, { wersja: 3, punkty: 10, imie: 'Mikołaj' });
});

test('migracja odrzuca zapis z nowszej wersji gry i brak kroku migracji', () => {
  assert.throws(() => migruj({ wersja: 9 }, {}, 1), BladStanu);
  assert.throws(() => migruj({ wersja: 1 }, {}, 2), /Brak migracji/);
});

test('normalizacja uzupełnia braki i odrzuca złe typy', () => {
  const s = normalizuj(
    {
      ustawienia: { imie: '   ', odblokujWszystkie: 'tak' },
      odblokowane: [2, 2, 9, 'x', 3],
      zadania: { a: { proby: 2.7, najlepszy: 1.5, ostatni: -1, ostatnio: 5 }, b: 'zle' },
      pomylki: { mitochondrium: 2, x: -3, y: 'dużo' },
      czasMs: -10,
    },
    DZIEN,
  );
  assert.equal(s.ustawienia.imie, 'Mikołaj');
  assert.equal(s.ustawienia.odblokujWszystkie, false);
  assert.deepEqual(s.odblokowane, [2, 3]);
  assert.deepEqual(s.zadania, { a: { proby: 2, najlepszy: 1, ostatni: 0, ostatnio: '' } });
  assert.deepEqual(s.pomylki, { mitochondrium: 2 });
  assert.equal(s.czasMs, 0);
  assert.equal(s.utworzono, DZIEN);
});

test('odczyt odrzuca dane bez numeru wersji', () => {
  assert.throws(() => odczytajStan({ zadania: {} }, DZIEN), BladStanu);
  assert.throws(() => odczytajStan(null, DZIEN), BladStanu);
  assert.throws(() => odczytajStan([], DZIEN), BladStanu);
});

test('eksport i import zachowują postęp', () => {
  let s = nowyStan(DZIEN);
  s = ustawImie(s, '  Mikołaj   Nowak ');
  s = zapiszWynik(s, { idZadania: 'z1', poprawne: 7, wszystkie: 8, bledneElementy: ['rybosomy'], czasMs: 60000, dzien: DZIEN });
  const odczytany = zImportu(doEksportu(s, DZIEN), DZIEN);
  assert.deepEqual(odczytany, s);
  assert.equal(odczytany.ustawienia.imie, 'Mikołaj Nowak');
});

test('import odrzuca obcy plik i niepoprawny JSON', () => {
  assert.throws(() => zImportu('{nie json', DZIEN), /nie jest kopią postępu/);
  assert.throws(() => zImportu(JSON.stringify({ gra: 'inna', stan: nowyStan(DZIEN) }), DZIEN), /nie jest kopią postępu/);
  assert.throws(
    () => zImportu(JSON.stringify({ gra: 'wyprawa-do-wnetrza-zycia', stan: { wersja: 99 } }), DZIEN),
    /nowszej wersji/,
  );
});

test('zapis wyniku liczy próby, najlepszy i ostatni wynik oraz pomyłki', () => {
  let s = nowyStan(DZIEN);
  s = zapiszWynik(s, { idZadania: 'z1', poprawne: 6, wszystkie: 8, bledneElementy: ['rybosomy', 'cytozol'], dzien: DZIEN });
  s = zapiszWynik(s, { idZadania: 'z1', poprawne: 4, wszystkie: 8, bledneElementy: ['rybosomy'], dzien: '2026-10-04' });
  assert.deepEqual(s.zadania.z1, { proby: 2, najlepszy: 0.75, ostatni: 0.5, ostatnio: '2026-10-04' });
  assert.deepEqual(s.pomylki, { rybosomy: 2, cytozol: 1 });
});

test('zapis wyniku nie zmienia poprzedniego stanu', () => {
  const s = nowyStan(DZIEN);
  const kopia = structuredClone(s);
  zapiszWynik(s, { idZadania: 'z1', poprawne: 1, wszystkie: 1, dzien: DZIEN });
  assert.deepEqual(s, kopia);
});

test('czas zadania liczony najwyżej do 15 minut', () => {
  const s = zapiszWynik(nowyStan(DZIEN), { idZadania: 'z1', poprawne: 1, wszystkie: 1, czasMs: 3 * 60 * 60 * 1000, dzien: DZIEN });
  assert.equal(s.czasMs, 15 * 60 * 1000);
});

test('dzień zapisywany jako lokalna data RRRR-MM-DD', () => {
  assert.equal(dzisiaj(new Date(2026, 0, 5, 23, 59)), '2026-01-05');
  assert.equal(dzisiaj(new Date(2026, 9, 25, 0, 30)), '2026-10-25');
});

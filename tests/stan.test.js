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
  MAKS_SPRAWDZIANOW,
  ustawDzwiek,
  zapiszSprawdzian,
  oznaczDoswiadczenie,
  zaliczBossa,
  zaliczMistrza,
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
  s = zapiszWynik(s, {
    idZadania: 'z1',
    typ: 'podpisywanie',
    poprawne: 7,
    wszystkie: 8,
    karty: [{ karta: 'rybosomy', odRazu: false, poprawnie: true }],
    czasMs: 60000,
    dzien: DZIEN,
  });
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

const zle = (karta) => ({ karta, odRazu: false, poprawnie: true });
const dobrze = (karta) => ({ karta, odRazu: true, poprawnie: true });

test('zapis wyniku liczy próby, najlepszy i ostatni wynik oraz pomyłki', () => {
  let s = nowyStan(DZIEN);
  s = zapiszWynik(s, { idZadania: 'z1', poprawne: 6, wszystkie: 8, karty: [zle('rybosomy'), zle('cytozol')], dzien: DZIEN });
  s = zapiszWynik(s, { idZadania: 'z1', poprawne: 4, wszystkie: 8, karty: [zle('rybosomy')], dzien: '2026-10-04' });
  assert.deepEqual(s.zadania.z1, { proby: 2, najlepszy: 0.75, ostatni: 0.5, ostatnio: '2026-10-04' });
  assert.deepEqual(s.pomylki, { rybosomy: 2, cytozol: 1 });
});

test('karty atlasu: odkrycie, typy zadań z odpowiedzią od razu i wynik w bossie', () => {
  let s = nowyStan(DZIEN);
  s = zapiszWynik(s, { idZadania: 'z1', typ: 'podpisywanie', poprawne: 1, wszystkie: 2, karty: [dobrze('jadro-komorkowe'), zle('cytozol')], dzien: DZIEN });
  assert.deepEqual(s.karty['jadro-komorkowe'], { odRazu: 1, typy: ['podpisywanie'], boss: false });
  assert.deepEqual(s.karty.cytozol, { odRazu: 0, typy: [], boss: false });
  s = zapiszWynik(s, { idZadania: 'z2', typ: 'przyporzadkowanie', poprawne: 1, wszystkie: 1, karty: [dobrze('jadro-komorkowe')], dzien: DZIEN });
  s = zapiszWynik(s, { idZadania: 'z1', typ: 'podpisywanie', poprawne: 1, wszystkie: 1, karty: [dobrze('jadro-komorkowe')], dzien: DZIEN });
  assert.deepEqual(s.karty['jadro-komorkowe'], { odRazu: 3, typy: ['podpisywanie', 'przyporzadkowanie'], boss: false });
  s = zapiszWynik(s, { idZadania: 'b', typ: 'podpisywanie', boss: true, poprawne: 0, wszystkie: 1, karty: [{ karta: 'rybosomy', odRazu: false, poprawnie: false }], dzien: DZIEN });
  assert.equal(s.karty.rybosomy, undefined, 'błędna odpowiedź bez poprawki nie odkrywa karty');
  s = zapiszWynik(s, { idZadania: 'b', typ: 'podpisywanie', boss: true, poprawne: 1, wszystkie: 1, karty: [dobrze('cytozol')], dzien: DZIEN });
  assert.equal(s.karty.cytozol.boss, true);
});

test('migracja z wersji 1 dodaje pusty atlas i zachowuje wyniki', () => {
  const v1 = {
    wersja: 1,
    utworzono: DZIEN,
    ustawienia: { imie: 'Mikołaj', odblokujWszystkie: false },
    odblokowane: [2],
    bossowie: [],
    zadania: { 's2-podpis-zwierzeca-1': { proby: 2, najlepszy: 1, ostatni: 1, ostatnio: DZIEN } },
    pomylki: { cytozol: 1 },
    czasMs: 120000,
  };
  const s = odczytajStan(v1, DZIEN);
  assert.equal(s.wersja, WERSJA_SCHEMATU);
  assert.deepEqual(s.karty, {});
  assert.deepEqual(s.zadania, v1.zadania);
  assert.deepEqual(s.pomylki, v1.pomylki);
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

test('migracja z wersji 2 dodaje wyniki sprawdzianów, laboratorium i włączone dźwięki', () => {
  const v2 = {
    wersja: 2,
    utworzono: DZIEN,
    ustawienia: { imie: 'Mikołaj', odblokujWszystkie: false },
    odblokowane: [2, 3],
    bossowie: [2],
    zadania: {},
    pomylki: {},
    karty: { cytozol: { odRazu: 1, typy: ['luki'], boss: false } },
    czasMs: 1000,
  };
  const s = odczytajStan(v2, DZIEN);
  assert.equal(s.wersja, WERSJA_SCHEMATU);
  assert.deepEqual(s.sprawdziany, []);
  assert.deepEqual(s.laboratorium, {});
  assert.equal(s.ustawienia.dzwiek, true);
  assert.deepEqual(s.karty, v2.karty);
  assert.deepEqual(s.odblokowane, [2, 3]);
  assert.deepEqual(s.mistrzowie, [], 'migracja do wersji 4 dodaje listę mistrzów');
});

test('rewanż mistrzowski: lista światów z gwiazdą, bez powtórzeń i tylko znane światy', () => {
  let s = nowyStan(DZIEN);
  s = zaliczBossa(s, 2);
  s = zaliczMistrza(s, 2);
  s = zaliczMistrza(s, 2);
  assert.deepEqual(s.mistrzowie, [2]);
  assert.deepEqual(normalizuj({ mistrzowie: [3, 3, 'x', 9, 1] }, DZIEN).mistrzowie, [1, 3]);
  assert.deepEqual(zImportu(doEksportu(s, DZIEN), DZIEN).mistrzowie, [2]);
});

test('normalizacja odrzuca złe wyniki sprawdzianu i złe daty laboratorium', () => {
  const s = normalizuj(
    {
      ustawienia: { dzwiek: false },
      sprawdziany: [
        { dzien: DZIEN, zadania: [{ punkt: 1, zdobyte: 5, maks: 2 }, { punkt: 2, zdobyte: -1, maks: 3 }, { punkt: 'x', zdobyte: 1, maks: 1 }] },
        { dzien: 'wczoraj', zadania: [{ punkt: 1, zdobyte: 1, maks: 1 }] },
        { dzien: DZIEN, zadania: [] },
      ],
      laboratorium: { chleb: DZIEN, seler: 'dziś', balonik: 5 },
    },
    DZIEN,
  );
  assert.equal(s.ustawienia.dzwiek, false);
  assert.deepEqual(s.sprawdziany, [{ dzien: DZIEN, zadania: [{ punkt: 1, zdobyte: 2, maks: 2 }, { punkt: 2, zdobyte: 0, maks: 3 }] }]);
  assert.deepEqual(s.laboratorium, { chleb: DZIEN });
});

test('zapis sprawdzianu pamięta ograniczoną liczbę ostatnich wyników', () => {
  let s = nowyStan(DZIEN);
  for (let i = 0; i < MAKS_SPRAWDZIANOW + 3; i++) s = zapiszSprawdzian(s, { dzien: DZIEN, zadania: [{ punkt: 1, zdobyte: i % 2, maks: 1 }] });
  assert.equal(s.sprawdziany.length, MAKS_SPRAWDZIANOW);
  assert.equal(s.sprawdziany.at(-1).zadania[0].zdobyte, (MAKS_SPRAWDZIANOW + 2) % 2);
});

test('doświadczenie oznaczone raz zachowuje pierwszą datę; oznaczenie można cofnąć', () => {
  let s = oznaczDoswiadczenie(nowyStan(DZIEN), 'chleb', DZIEN);
  s = oznaczDoswiadczenie(s, 'chleb', '2026-10-10');
  assert.deepEqual(s.laboratorium, { chleb: DZIEN });
  s = oznaczDoswiadczenie(s, 'chleb', DZIEN, false);
  assert.deepEqual(s.laboratorium, {});
  assert.equal(ustawDzwiek(s, false).ustawienia.dzwiek, false);
});

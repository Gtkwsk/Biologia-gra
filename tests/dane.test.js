import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wczytajWszystko, walidujDane, czyEtykietaKanoniczna } from '../tools/validate-data.js';

const kopia = (o) => structuredClone(o);

async function zaladuj() {
  const { dane, kontekst } = await wczytajWszystko();
  return { dane: kopia(dane), kontekst };
}

function zawiera(bledy, fragment) {
  assert.ok(
    bledy.some((b) => b.includes(fragment)),
    `oczekiwany błąd z fragmentem „${fragment}”, są:\n${bledy.join('\n')}`,
  );
}

test('dane gry przechodzą walidację', async () => {
  const { dane, kontekst } = await zaladuj();
  assert.deepEqual(walidujDane(dane, kontekst), []);
});

test('etykieta złożona „wakuola (wodniczka)” jest kanoniczna, „wodniczka komórkowa” nie', async () => {
  const { kontekst } = await zaladuj();
  assert.ok(czyEtykietaKanoniczna('wakuola (wodniczka)', kontekst.terminy));
  assert.ok(czyEtykietaKanoniczna('aparat Golgiego', kontekst.terminy));
  assert.ok(!czyEtykietaKanoniczna('wodniczka komórkowa', kontekst.terminy));
});

test('wykrywa powtórzone id zadania', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania.push(kopia(dane.zadania[0]));
  zawiera(walidujDane(dane, kontekst), 'powtórzone id');
});

test('wykrywa termin spoza TRESCI.md w tekście', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania[0].wyjasnienie = 'Destruenci rozkładają szczątki.';
  zawiera(walidujDane(dane, kontekst), 'organizmy odżywiające się szczątkami');
});

test('wykrywa etykietę spoza słownika kanonicznego', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.elementy.find((e) => e.id === 'mitochondrium').nazwa = 'elektrownia';
  zawiera(walidujDane(dane, kontekst), 'spoza słownika kanonicznego');
});

test('wykrywa dystraktor, który dany typ komórki ma', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania[0];
  z.punkty = z.punkty.filter((p) => p !== 'mitochondrium');
  z.dystraktory = ['mitochondrium'];
  zawiera(walidujDane(dane, kontekst), 'nie wyklucza tego elementu');
});

test('wykrywa niezgodność typu komórki z tabelą w TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.typyKomorek.find((t) => t.id === 'bakteryjna').obecnosc['jadro-komorkowe'] = 'tak';
  zawiera(walidujDane(dane, kontekst), 'według TRESCI.md powinno być „nie”');
});

test('wykrywa na rysunku element, którego typ komórki nie ma', async () => {
  const { dane, kontekst } = await zaladuj();
  const plik = dane.schematy[0].plik;
  const svg = new Map(kontekst.svg);
  svg.set(plik, svg.get(plik).replace('</svg>', '<g data-element="chloroplast"></g></svg>'));
  zawiera(walidujDane(dane, { ...kontekst, svg }), 'a rysunek go zawiera');
});

test('wykrywa punkt schematu bez elementu na rysunku', async () => {
  const { dane, kontekst } = await zaladuj();
  const plik = dane.schematy[0].plik;
  const svg = new Map(kontekst.svg);
  svg.set(plik, svg.get(plik).replace('data-element="rybosomy"', 'data-element="x"'));
  zawiera(walidujDane(dane, { ...kontekst, svg }), 'rysunek nie zawiera elementu „rybosomy”');
});

test('wykrywa odwołanie do nieistniejącej sekcji TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania[0].zrodlo = '2.9';
  zawiera(walidujDane(dane, kontekst), 'nie istnieje w TRESCI.md');
});

test('wykrywa zadanie misji z innego świata', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania[0].swiat = 3;
  zawiera(walidujDane(dane, kontekst), 'należy do świata 3');
});

test('wykrywa organizm z kategorią spoza TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.organizmy = [
    { id: 'zubr', nazwa: 'żubr', kategoria: 'roślinożerca' },
    { id: 'wilk', nazwa: 'wilk', kategoria: 'mięsożerca leśny' },
  ];
  const bledy = walidujDane(dane, kontekst);
  zawiera(bledy, 'kategoria „mięsożerca leśny”');
  assert.ok(!bledy.some((b) => b.includes('organizmy[zubr]')));
});

test('wykrywa ciekawostkę, która nie jest dosłownie z TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.swiaty.find((s) => s.id === 2).ciekawostka = 'Hooke oglądał korek.';
  zawiera(walidujDane(dane, kontekst), 'ciekawostka musi być dosłownie z TRESCI.md');
});

test('wykrywa dystraktor w lukach, który jest też słowem z luki', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.typ === 'luki');
  z.dystraktory = [...(z.dystraktory ?? []), z.tekst.match(/\[([^|\]]+)/)[1]];
  zawiera(walidujDane(dane, kontekst), 'jest też słowem z luki');
});

test('wykrywa w tabeli porównawczej element „u części” komórek', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.typ === 'tabela');
  z.wiersze = [...z.wiersze, 'otoczka-sluzowa'];
  z.kolumny = [...new Set([...z.kolumny, 'bakteryjna'])];
  zawiera(walidujDane(dane, kontekst), 'w tabeli tylko ✓ albo ✗');
});

test('wykrywa sprawę detektywa, której wskazówki nie rozstrzygają', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.typ === 'detektyw');
  z.sprawy[0] = { cel: 'roslinna', wskazowki: ['ma-jadro', 'ma-sciane'] };
  zawiera(walidujDane(dane, kontekst), 'wskazówki nie rozstrzygają sprawy');
});

test('wykrywa wskazówkę detektywa sprzeczną z rozwiązaniem', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.typ === 'detektyw');
  z.sprawy[0] = { cel: 'bakteryjna', wskazowki: ['ma-jadro', 'bez-jadra'] };
  zawiera(walidujDane(dane, kontekst), 'przeczy rozwiązaniu');
});

test('wykrywa bossa z mniej niż trzema typami zadań', async () => {
  const { dane, kontekst } = await zaladuj();
  const b = dane.swiaty.find((s) => s.id === 2).boss;
  b.wyzwania = b.wyzwania.slice(0, 2);
  zawiera(walidujDane(dane, kontekst), 'wymagane co najmniej 3');
});

test('wykrywa odwołanie do nieistniejącej karty atlasu', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.typ === 'przyporzadkowanie');
  z.pary[0].karta = 'golgi';
  zawiera(walidujDane(dane, kontekst), 'nieznana karta atlasu „golgi”');
});

test('wykrywa fałszywe zdanie bez poprawnej wersji', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.typ === 'prawda-falsz');
  const zd = z.zdania.find((x) => x.prawda === false);
  delete zd.poprawne;
  zawiera(walidujDane(dane, kontekst), 'wymaga pola poprawne');
});

test('wykrywa rzęskę jako dystraktor przy schemacie komórki zwierzęcej', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.id === 's2-podpis-zwierzeca-1');
  z.dystraktory = [...z.dystraktory, 'rzeska'];
  zawiera(walidujDane(dane, kontekst), '„rzeska” nie może być dystraktorem');
});

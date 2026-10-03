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
  const z = dane.zadania.find((x) => x.id === 's2-podpis-zwierzeca-1');
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

test('wykrywa zapis słowny procesu niezgodny z TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  const p = dane.procesy.find((x) => x.id === 'fermentacja-alkoholowa');
  p.produkty = ['alkohol-etylowy', 'tlen', 'energia'];
  zawiera(walidujDane(dane, kontekst), 'substraty, warunki i produkty dają zapis');
  p.zapis = 'glukoza → alkohol etylowy + tlen + energia';
  zawiera(walidujDane(dane, kontekst), 'nie występuje dosłownie w TRESCI.md');
});

test('wykrywa w tabeli oddychania tlenowego i fermentacji wartość niezgodną z TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.porownanie.cechy.find((c) => c.id === 'miejsce').wartosci.fermentacja = 'mitochondria';
  zawiera(walidujDane(dane, kontekst), '„mitochondria”, a w TRESCI.md „cytozol”');
});

test('wykrywa organizm z kategorią inną niż w tabeli TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.organizmy.find((o) => o.id === 'sinice').kategoria = 'organizm samożywny (roślina)';
  zawiera(walidujDane(dane, kontekst), 'według TRESCI.md, sekcja 7');
});

test('wykrywa sprint bez niedoboru tlenu i bez odpoczynku, po którym kwas mlekowy trafia do wątroby', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.id === 's6-sprint-1');
  z.etapy = z.etapy.filter((e) => e.tempo !== 'sprint');
  zawiera(walidujDane(dane, kontekst), 'żaden etap nie pokazuje niedoboru tlenu');
  const { dane: d2 } = await zaladuj();
  const z2 = d2.zadania.find((x) => x.id === 's6-sprint-1');
  z2.etapy = z2.etapy.filter((e) => e.czas !== 'kilkadziesiat-minut');
  zawiera(walidujDane(d2, kontekst), 'kwas mlekowy zostaje w mięśniach');
});

test('wykrywa nieznaną porę doby i nieistniejącą ikonę kategorii sortera', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania.find((x) => x.id === 's6-doba-1').etapy.push({ pora: 'zmierzch' });
  dane.zadania.find((x) => x.id === 's6-sorter-doba-1').kategorie[1].ikona = 'gwiazda';
  const bledy = walidujDane(dane, kontekst);
  zawiera(bledy, 'pora „zmierzch” spoza listy');
  zawiera(bledy, 'nie ma rysunku „gwiazda”');
});

test('wykrywa krok laboratorium, którego wyniku nie da się przewidzieć wprost z TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  const z = dane.zadania.find((x) => x.id === 's4-lab-1');
  // Nadmiar soli przy upale: wynik się nie zmienia, choć TRESCI.md mówi, że nadmiar zmniejsza intensywność.
  z.kroki = [
    { czynnik: 'swiatlo', poziom: 3 },
    { czynnik: 'temperatura', poziom: 4 },
    { czynnik: 'sole', poziom: 3 },
  ];
  zawiera(walidujDane(dane, kontekst), 'inny czynnik hamuje bardziej');
});

test('wykrywa światło wśród składników przepisu fotosyntezy', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania.find((x) => x.id === 's4-przepis-1').pola.find((p) => p.id === 'swiatlo').strefa = 'wejscie';
  zawiera(walidujDane(dane, kontekst), '„swiatlo” nie pasuje do strefy „wejscie”');
});

test('wykrywa w łańcuchu dystraktor, którego definicja kategorii nie wyklucza', async () => {
  const { dane, kontekst } = await zaladuj();
  // Rośliny → [jeleń] → niedźwiedź brunatny: łoś też jest roślinożercą, więc mógłby pasować do luki.
  dane.zadania.find((x) => x.id === 's5-lancuchy-1').lancuchy[0].opcje.push({ karta: 'los', wyjasnienie: 'Łoś tu nie pasuje.' });
  zawiera(walidujDane(dane, kontekst), 'nie da się wykluczyć definicją kategorii');
});

test('wykrywa zależność pokarmową sprzeczną z definicją kategorii', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.pokarm.zaleznosci.push({ zjada: 'zubr', pokarm: 'lis', dlaczego: 'Żubr zjada lisy.' });
  zawiera(walidujDane(dane, kontekst), 'przeczy definicji kategorii');
});

test('wykrywa w składzie ciała wartość niezgodną z TRESCI.md', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.zadania.find((x) => x.id === 's1-slupki-1').skladniki.find((s) => s.id === 'woda').procent = 70;
  zawiera(walidujDane(dane, kontekst), 'a w TRESCI.md 65');
});

test('wykrywa dopisek przy organizmie, którego uproszczenia nie ma w TRESCI.md, sekcja 5', async () => {
  const { dane, kontekst } = await zaladuj();
  dane.organizmy.find((o) => o.id === 'wilk').uwaga = 'W rzeczywistości wilk zjada też owoce.';
  zawiera(walidujDane(dane, kontekst), 'uwaga tylko przy uproszczeniach');
});

test('wykrywa las, w którym szczątki nigdy się nie gromadzą', async () => {
  const { dane, kontekst } = await zaladuj();
  for (const e of dane.zadania.find((x) => x.id === 's5-las-1').etapy) e.sprzatacze = true;
  zawiera(walidujDane(dane, kontekst), 'żaden etap nie pokazuje gromadzenia się szczątków');
});

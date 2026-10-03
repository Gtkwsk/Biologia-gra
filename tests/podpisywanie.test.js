import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../app/js/components/podpisywanie-logika.js';
import elementy from '../app/data/elementy-komorek.js';
import typyKomorek from '../app/data/typy-komorek.js';
import schematy from '../app/data/schematy.js';
import zadania from '../app/data/zadania.js';

const zadanie = zadania.find((z) => z.id === 's2-podpis-zwierzeca-1');
const schemat = schematy.find((s) => s.id === zadanie.schemat);
const typKomorki = typyKomorek.find((t) => t.id === schemat.typKomorki);
const przyg = L.przygotujZadanie({ zadanie, schemat, elementy, typKomorki });
const punkt = (id) => przyg.punkty.find((p) => p.id === id);

test('punkty mają numery 1…n, a bank zawiera poprawne etykiety i dystraktory', () => {
  assert.deepEqual(
    przyg.punkty.map((p) => p.numer),
    przyg.punkty.map((_, i) => i + 1),
  );
  assert.equal(przyg.etykiety.length, zadanie.punkty.length + zadanie.dystraktory.length);
  assert.ok(przyg.etykiety.includes('sciana-komorkowa'));
});

test('poprawna etykieta za pierwszym razem liczy się do wyniku', () => {
  const r = L.podpiszTrening(przyg, L.nowyPrzebieg(przyg), 'mitochondrium', 'mitochondrium');
  assert.equal(r.wynik, 'dobrze');
  assert.equal(r.komunikat.tytul, 'Tak, to mitochondrium.');
  assert.match(r.komunikat.tekst, /centrum energetyczne komórki/);
  assert.equal(r.przebieg.pierwszaDobra.mitochondrium, true);
});

test('błędna etykieta: przyczyna i opis wskazanego elementu bez jego nazwy', () => {
  const r = L.podpiszTrening(przyg, L.nowyPrzebieg(przyg), 'siateczka', 'rybosomy');
  const n = punkt('siateczka').numer;
  assert.equal(r.wynik, 'zle');
  assert.equal(r.komunikat.tytul, 'To nie rybosomy.');
  assert.equal(
    r.komunikat.tekst,
    `Rybosomy to drobne ziarenka. Pod numerem ${n}: system cienkich kanalików w całej komórce.`,
  );
  assert.doesNotMatch(r.komunikat.tekst, /siateczka/);
  assert.equal(r.podpowiedz, null);
  assert.equal(r.przebieg.przypisania.siateczka, null);
});

test('druga błędna próba w tym samym miejscu podaje nazwę i wskazuje etykietę', () => {
  let p = L.nowyPrzebieg(przyg);
  p = L.podpiszTrening(przyg, p, 'siateczka', 'rybosomy').przebieg;
  const r = L.podpiszTrening(przyg, p, 'siateczka', 'aparat-golgiego');
  assert.match(r.komunikat.tekst, /jest siateczka śródplazmatyczna/);
  assert.equal(r.podpowiedz, 'siateczka-srodplazmatyczna');
});

test('dystraktor: komunikat mówi, czego komórka zwierzęca nie ma', () => {
  const r = L.podpiszTrening(przyg, L.nowyPrzebieg(przyg), 'blona', 'sciana-komorkowa');
  assert.equal(r.komunikat.tytul, 'To nie ściana komórkowa.');
  assert.match(r.komunikat.tekst, /^Komórka zwierzęca nie ma ściany komórkowej\./);
  const r2 = L.podpiszTrening(przyg, L.nowyPrzebieg(przyg), 'blona', 'chloroplast');
  assert.match(r2.komunikat.tekst, /^Komórka zwierzęca nie ma chloroplastów\./);
});

test('poprawka po błędzie kończy zadanie, ale nie liczy się jako odpowiedź od razu', () => {
  let p = L.nowyPrzebieg(przyg);
  p = L.podpiszTrening(przyg, p, 'cytozol', 'jadro-komorkowe').przebieg;
  for (const pt of przyg.punkty) p = L.podpiszTrening(przyg, p, pt.id, pt.element).przebieg;
  assert.equal(L.czyGotowe(przyg, p), true);
  const wynik = L.podsumuj(przyg, p);
  assert.equal(wynik.poprawne, przyg.punkty.length - 1);
  assert.deepEqual(wynik.bledneElementy, ['cytozol']);
  assert.equal(p.pomylki.length, 1);
});

test('podpisane miejsce nie przyjmuje kolejnej etykiety', () => {
  let p = L.podpiszTrening(przyg, L.nowyPrzebieg(przyg), 'jadro', 'jadro-komorkowe').przebieg;
  const r = L.podpiszTrening(przyg, p, 'jadro', 'cytozol');
  assert.equal(r.wynik, 'zajete');
  assert.equal(r.przebieg, p);
});

test('sprawdzian: przenoszenie etykiet, zdejmowanie i ocena po „Sprawdź”', () => {
  let p = L.nowyPrzebieg(przyg, 'sprawdzian');
  p = L.podpiszSprawdzian(przyg, p, 'jadro', 'cytozol').przebieg;
  const przeniesienie = L.podpiszSprawdzian(przyg, p, 'cytozol', 'cytozol');
  p = przeniesienie.przebieg;
  assert.equal(p.przypisania.jadro, null);
  assert.equal(p.przypisania.cytozol, 'cytozol');
  const wypchniecie = L.podpiszSprawdzian(przyg, p, 'cytozol', 'rybosomy');
  assert.equal(wypchniecie.wypchnieta, 'cytozol');
  p = L.zdejmij(wypchniecie.przebieg, 'cytozol').przebieg;
  p = L.podpiszSprawdzian(przyg, p, 'blona', 'sciana-komorkowa').przebieg;
  p = L.podpiszSprawdzian(przyg, p, 'mitochondrium', 'mitochondrium').przebieg;
  assert.equal(L.czyGotowe(przyg, p), false);

  const { przebieg, wyniki } = L.sprawdz(przyg, p);
  assert.equal(L.czyGotowe(przyg, przebieg), true);
  const w = (id) => wyniki.find((x) => x.punkt === id);
  assert.equal(w('mitochondrium').dobrze, true);
  assert.equal(w('blona').komunikat.tytul, `Pod numerem ${punkt('blona').numer} jest błona komórkowa, nie ściana komórkowa.`);
  assert.equal(w('blona').komunikat.tekst, 'Komórka zwierzęca nie ma ściany komórkowej.');
  assert.equal(w('jadro').komunikat.tytul, `Pod numerem ${punkt('jadro').numer} jest jądro komórkowe.`);
  assert.equal(L.podsumuj(przyg, przebieg).poprawne, 1);
});

test('po sprawdzeniu etykiet nie można już przestawiać', () => {
  const { przebieg } = L.sprawdz(przyg, L.nowyPrzebieg(przyg, 'sprawdzian'));
  assert.equal(L.podpiszSprawdzian(przyg, przebieg, 'jadro', 'jadro-komorkowe').przebieg, przebieg);
});

test('każdy komunikat jest pełnym zdaniem bez pustych miejsc', () => {
  const wszystkieEtykiety = przyg.etykiety;
  for (const pt of przyg.punkty) {
    for (const idE of wszystkieEtykiety) {
      if (idE === pt.element) continue;
      for (const proba of [1, 2]) {
        const k = L.komunikatBledu(przyg, pt, idE, proba);
        for (const t of [k.tytul, k.tekst]) {
          assert.doesNotMatch(t, /undefined|null|\s{2}|\s\./, t);
          assert.match(t, /^[A-ZĄĆĘŁŃÓŚŹŻ].*\.$/u, t);
        }
      }
    }
    const d = L.komunikatDobrze(przyg, pt);
    assert.match(d.tekst, /^[A-ZĄĆĘŁŃÓŚŹŻ].*\.$/u);
  }
});

test('mieszanie zachowuje wszystkie etykiety', () => {
  let i = 0;
  const losuj = () => [0.9, 0.1, 0.5, 0.3, 0.7][i++ % 5];
  const wynik = L.wymieszaj(przyg.etykiety, losuj);
  assert.deepEqual([...wynik].sort(), [...przyg.etykiety].sort());
});

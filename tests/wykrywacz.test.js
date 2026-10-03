import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as W from '../app/js/components/wykrywacz-logika.js';

// Słowa do sprawdzenia: 0 prawdziwe, 1 bzdura, 2 prawdziwe, 3 bzdura.
const WYKLAD = [
  'Wszystkimi procesami w komórce kieruje ',
  { slowo: 'jądro komórkowe', karta: 'jadro-komorkowe', wyjasnienie: 'Jądro komórkowe kieruje procesami w komórce.' },
  '. Energii dostarczają ',
  { slowo: 'rybosomy', poprawka: 'mitochondria', opcje: ['mitochondria', 'wakuole'], karta: 'mitochondrium', wyjasnienie: 'Energii dostarczają mitochondria.' },
  '. Białka wytwarzają ',
  { slowo: 'rybosomy', karta: 'rybosomy', wyjasnienie: 'Rybosomy wytwarzają białka.' },
  '. Komórkę od otoczenia oddziela ',
  { slowo: 'wakuola', poprawka: 'błona komórkowa', opcje: ['błona komórkowa', 'jądro komórkowe'], karta: 'blona-komorkowa', wyjasnienie: 'Błona komórkowa oddziela komórkę od otoczenia.' },
  '.',
];

test('tekst wykładu i tekst po poprawieniu bzdur', () => {
  assert.equal(
    W.tekstWykladu(WYKLAD),
    'Wszystkimi procesami w komórce kieruje jądro komórkowe. Energii dostarczają rybosomy. Białka wytwarzają rybosomy. Komórkę od otoczenia oddziela wakuola.',
  );
  assert.equal(
    W.tekstPoprawiony(WYKLAD),
    'Wszystkimi procesami w komórce kieruje jądro komórkowe. Energii dostarczają mitochondria. Białka wytwarzają rybosomy. Komórkę od otoczenia oddziela błona komórkowa.',
  );
  assert.equal(W.liczbaBzdur(WYKLAD), 2);
  assert.deepEqual([1, 2, 3, 5, 12, 22].map(W.bzdury), ['1 bzdura', '2 bzdury', '3 bzdury', '5 bzdur', '12 bzdur', '22 bzdury']);
});

test('znalezienie bzdury i właściwa poprawka za pierwszym razem: wszystko od razu dobrze', () => {
  let st = W.nowyStan(WYKLAD);
  let r = W.stuknij(WYKLAD, st, 1);
  assert.equal(r.komunikat.rodzaj, 'dobrze');
  assert.equal(r.st.wybrane, 1);
  st = W.wybierzPoprawke(WYKLAD, r.st, 'mitochondria').st;
  assert.equal(st.slowa[1].stan, 'poprawione');
  assert.equal(W.czyKoniec(WYKLAD, st), false);
  st = W.stuknij(WYKLAD, st, 3).st;
  r = W.wybierzPoprawke(WYKLAD, st, 'błona komórkowa');
  assert.equal(r.komunikat.tekst, 'Błona komórkowa oddziela komórkę od otoczenia.', 'po poprawce przyczyna');
  assert.equal(W.czyKoniec(WYKLAD, r.st), true);
  assert.deepEqual(W.wynik(WYKLAD, r.st), {
    poprawne: 4,
    wszystkie: 4,
    karty: [
      { karta: 'jadro-komorkowe', odRazu: true, poprawnie: true },
      { karta: 'mitochondrium', odRazu: true, poprawnie: true },
      { karta: 'rybosomy', odRazu: true, poprawnie: true },
      { karta: 'blona-komorkowa', odRazu: true, poprawnie: true },
    ],
  });
});

test('zakwestionowane prawdziwe słowo: komunikat z przyczyną i błąd przy jego karcie', () => {
  const r = W.stuknij(WYKLAD, W.nowyStan(WYKLAD), 0);
  assert.equal(r.komunikat.rodzaj, 'zle');
  assert.equal(r.komunikat.tytul, '„jądro komórkowe” to nie bzdura.');
  assert.equal(r.komunikat.tekst, 'Jądro komórkowe kieruje procesami w komórce.');
  assert.equal(r.st.slowa[0].stan, 'prawdziwe');
  assert.equal(r.st.slowa[0].odRazu, false);
  assert.equal(W.stuknij(WYKLAD, r.st, 0).komunikat, null, 'drugie stuknięcie tego samego słowa nic nie zmienia');
});

test('zła poprawka: bzdura nie liczy się od razu, można wybrać ponownie', () => {
  let st = W.stuknij(WYKLAD, W.nowyStan(WYKLAD), 1).st;
  const r = W.wybierzPoprawke(WYKLAD, st, 'wakuole');
  assert.equal(r.komunikat.rodzaj, 'zle');
  assert.equal(r.st.wybrane, 1, 'gracz dalej wybiera poprawkę');
  st = W.wybierzPoprawke(WYKLAD, r.st, 'mitochondria').st;
  assert.equal(st.slowa[1].stan, 'poprawione');
  assert.equal(st.slowa[1].odRazu, false);
});

test('w trakcie wyboru poprawki inne słowa nie reagują', () => {
  const st = W.stuknij(WYKLAD, W.nowyStan(WYKLAD), 1).st;
  assert.equal(W.stuknij(WYKLAD, st, 0).komunikat, null);
  assert.equal(W.wybierzPoprawke(WYKLAD, W.nowyStan(WYKLAD), 'mitochondria').komunikat, null, 'bez znalezionej bzdury poprawka nic nie robi');
});

test('po dwóch pomyłkach z rzędu podpowiedź wskazuje nieznalezioną bzdurę', () => {
  let st = W.stuknij(WYKLAD, W.nowyStan(WYKLAD), 0).st;
  assert.equal(st.slowa.some((s) => s.podpowiedz), false, 'po jednej pomyłce bez podpowiedzi');
  const r = W.stuknij(WYKLAD, st, 2);
  assert.match(r.komunikat.tekst, /Podpowiedź/);
  assert.equal(r.st.slowa[1].podpowiedz, true);
  assert.equal(r.st.slowa[1].odRazu, false, 'bzdura znaleziona z podpowiedzią nie liczy się od razu');
  st = W.stuknij(WYKLAD, r.st, 1).st;
  st = W.wybierzPoprawke(WYKLAD, st, 'mitochondria').st;
  assert.equal(st.slowa[1].podpowiedz, false, 'po poprawce podświetlenie znika');
  st = W.stuknij(WYKLAD, st, 3).st;
  st = W.wybierzPoprawke(WYKLAD, st, 'błona komórkowa').st;
  assert.deepEqual(W.wynik(WYKLAD, st).poprawne, 1, 'od razu dobrze tylko druga bzdura');
});

test('znaleziona bzdura zeruje licznik pomyłek z rzędu', () => {
  let st = W.stuknij(WYKLAD, W.nowyStan(WYKLAD), 0).st;
  st = W.stuknij(WYKLAD, st, 1).st;
  st = W.wybierzPoprawke(WYKLAD, st, 'mitochondria').st;
  assert.equal(st.pomylkiZRzedu, 0);
  const r = W.stuknij(WYKLAD, st, 2);
  assert.doesNotMatch(r.komunikat.tekst, /Podpowiedź/, 'jedna pomyłka po znalezionej bzdurze to jeszcze nie podpowiedź');
});

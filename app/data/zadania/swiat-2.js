// Zadania świata 2: „Miasto, którego nie widać” (TRESCI.md, sekcja 2.2).
//
// Typ „podpisywanie”: poprawna odpowiedź wynika ze schematu (punkt → element).
// punkty:      które punkty schematu trzeba podpisać
// dystraktory: etykiety elementów, których dany typ komórki nie ma

export default [
  {
    id: 's2-podpis-zwierzeca-1',
    swiat: 2,
    typ: 'podpisywanie',
    tresc: 'Podpisz elementy komórki zwierzęcej.',
    schemat: 'komorka-zwierzeca',
    punkty: ['blona', 'rybosomy', 'mitochondrium', 'siateczka', 'cytozol', 'golgi', 'jadro', 'wakuola'],
    dystraktory: ['sciana-komorkowa', 'chloroplast'],
    wyjasnienie:
      'Komórka zwierzęca ma błonę komórkową, cytozol, jądro komórkowe, mitochondria, rybosomy, siateczkę śródplazmatyczną, aparat Golgiego i wiele drobnych wakuol. Nie ma ściany komórkowej ani chloroplastów.',
    zrodlo: '2.2',
  },
];

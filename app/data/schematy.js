// Schematy do podpisywania. Rysunki: assets/svg (rysowane od zera, SPEC.md, sekcja 6.2).
//
// Kolejność punktów wyznacza numerację na schemacie (zgodnie z ruchem wskazówek zegara).
// cel:      miejsce na rysunku, które wskazuje linia (współrzędne viewBox)
// znacznik: miejsce numeru na brzegu rysunku
// Walidator sprawdza, czy rysunek zawiera wskazany element (atrybut data-element)
// i czy element występuje w danym typie komórki.

export default [
  {
    id: 'komorka-zwierzeca',
    nazwa: 'Schemat komórki zwierzęcej',
    typKomorki: 'zwierzeca',
    plik: 'assets/svg/komorka-zwierzeca.svg',
    szerokosc: 640,
    wysokosc: 480,
    punkty: [
      { id: 'blona', element: 'blona-komorkowa', cel: [189, 101], znacznik: [38, 70] },
      { id: 'rybosomy', element: 'rybosomy', cel: [505, 175], znacznik: [602, 110] },
      { id: 'mitochondrium', element: 'mitochondrium', cel: [470, 232], znacznik: [602, 215] },
      { id: 'siateczka', element: 'siateczka-srodplazmatyczna', cel: [381, 277], znacznik: [602, 320] },
      { id: 'cytozol', element: 'cytozol', cel: [365, 365], znacznik: [602, 410] },
      { id: 'golgi', element: 'aparat-golgiego', cel: [190, 315], znacznik: [38, 352] },
      { id: 'jadro', element: 'jadro-komorkowe', cel: [242, 233], znacznik: [38, 262] },
      { id: 'wakuola', element: 'wakuola', cel: [185, 175], znacznik: [38, 170] },
    ],
  },
];

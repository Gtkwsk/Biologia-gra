// Schematy do podpisywania. Rysunki: assets/svg (rysowane od zera, SPEC.md, sekcja 6.2).
//
// Kolejność punktów wyznacza numerację na schemacie (zgodnie z ruchem wskazówek zegara).
// cel:      miejsce na rysunku, które wskazuje linia (współrzędne viewBox)
// znacznik: miejsce numeru na brzegu rysunku
// Walidator sprawdza, czy rysunek zawiera wskazany element (atrybut data-element)
// i czy element występuje w danym typie komórki.
//
// Schematy procesów (pole proces zamiast typKomorki): punkty to karty substancji biorących udział
// w procesie (data/procesy.js) albo element komórki, w którym proces zachodzi (pole wKomorce).
// opis: rzeczownikowy opis punktu w tym schemacie (informacja zwrotna bez podawania nazwy).

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
  {
    id: 'komorka-roslinna',
    nazwa: 'Schemat komórki roślinnej',
    typKomorki: 'roslinna',
    plik: 'assets/svg/komorka-roslinna.svg',
    szerokosc: 640,
    wysokosc: 480,
    punkty: [
      { id: 'sciana', element: 'sciana-komorkowa', cel: [77, 112], znacznik: [34, 70] },
      { id: 'mitochondrium', element: 'mitochondrium', cel: [462, 92], znacznik: [606, 70] },
      { id: 'chloroplast', element: 'chloroplast', cel: [524, 196], znacznik: [606, 160] },
      { id: 'wakuola', element: 'wakuola', cel: [440, 250], znacznik: [606, 250] },
      { id: 'rybosomy', element: 'rybosomy', cel: [499, 340], znacznik: [606, 340] },
      { id: 'cytozol', element: 'cytozol', cel: [500, 402], znacznik: [606, 420] },
      { id: 'siateczka', element: 'siateczka-srodplazmatyczna', cel: [150, 355], znacznik: [34, 380] },
      { id: 'blona', element: 'blona-komorkowa', cel: [92, 290], znacznik: [34, 300] },
      { id: 'jadro', element: 'jadro-komorkowe', cel: [140, 234], znacznik: [34, 226] },
      { id: 'golgi', element: 'aparat-golgiego', cel: [150, 140], znacznik: [34, 148] },
    ],
  },
  {
    id: 'komorka-roslinna-2',
    nazwa: 'Schemat komórki roślinnej (wydłużonej)',
    typKomorki: 'roslinna',
    plik: 'assets/svg/komorka-roslinna-2.svg',
    szerokosc: 640,
    wysokosc: 480,
    punkty: [
      { id: 'mitochondrium', element: 'mitochondrium', cel: [272, 66], znacznik: [34, 50] },
      { id: 'golgi', element: 'aparat-golgiego', cel: [382, 76], znacznik: [606, 60] },
      { id: 'wakuola', element: 'wakuola', cel: [330, 200], znacznik: [606, 160] },
      { id: 'rybosomy', element: 'rybosomy', cel: [413, 260], znacznik: [606, 255] },
      { id: 'siateczka', element: 'siateczka-srodplazmatyczna', cel: [378, 404], znacznik: [606, 400] },
      { id: 'jadro', element: 'jadro-komorkowe', cel: [286, 410], znacznik: [34, 420] },
      { id: 'blona', element: 'blona-komorkowa', cel: [212, 300], znacznik: [34, 300] },
      { id: 'cytozol', element: 'cytozol', cel: [226, 230], znacznik: [34, 240] },
      { id: 'chloroplast', element: 'chloroplast', cel: [226, 190], znacznik: [34, 180] },
      { id: 'sciana', element: 'sciana-komorkowa', cel: [199, 120], znacznik: [34, 120] },
    ],
  },
  {
    id: 'komorka-bakteryjna',
    nazwa: 'Schemat komórki bakteryjnej',
    typKomorki: 'bakteryjna',
    plik: 'assets/svg/komorka-bakteryjna.svg',
    szerokosc: 640,
    wysokosc: 480,
    punkty: [
      { id: 'otoczka', element: 'otoczka-sluzowa', cel: [106, 176], znacznik: [34, 110] },
      { id: 'nic', element: 'nic-dna', cel: [292, 220], znacznik: [606, 90] },
      { id: 'rzeska', element: 'rzeska', cel: [536, 240], znacznik: [606, 190] },
      { id: 'rybosomy', element: 'rybosomy', cel: [372, 262], znacznik: [606, 320] },
      { id: 'cytozol', element: 'cytozol', cel: [320, 286], znacznik: [606, 410] },
      { id: 'blona', element: 'blona-komorkowa', cel: [126, 284], znacznik: [34, 340] },
      { id: 'sciana', element: 'sciana-komorkowa', cel: [97, 240], znacznik: [34, 240] },
    ],
  },

  // ---------- Schematy procesów (świat 4) ----------
  {
    id: 'fotosynteza-roslina',
    nazwa: 'Schemat fotosyntezy: cała roślina',
    proces: 'fotosynteza',
    plik: 'assets/svg/fotosynteza-roslina.svg',
    szerokosc: 640,
    wysokosc: 480,
    punkty: [
      { id: 'swiatlo', element: 'swiatlo', cel: [214, 124], znacznik: [38, 140], opis: 'źródło energii pochłaniane przez chlorofil w liściach' },
      { id: 'tlen', element: 'tlen', cel: [492, 166], znacznik: [602, 110], opis: 'gaz, który powstaje w liściach i trafia do atmosfery' },
      { id: 'pokarm', element: 'substancje-pokarmowe', cel: [358, 380], znacznik: [602, 400], opis: 'produkt fotosyntezy, który z liści trafia do wszystkich komórek rośliny' },
      { id: 'woda', element: 'woda', cel: [284, 400], znacznik: [38, 400], opis: 'substancja, którą korzenie pobierają z gleby' },
      { id: 'co2', element: 'dwutlenek-wegla', cel: [140, 218], znacznik: [38, 250], opis: 'gaz, który wnika do liści z powietrza przez aparaty szparkowe' },
    ],
  },
  {
    id: 'fotosynteza-lisc',
    nazwa: 'Schemat fotosyntezy: liść i powiększona komórka liścia',
    proces: 'fotosynteza',
    plik: 'assets/svg/fotosynteza-lisc.svg',
    szerokosc: 640,
    wysokosc: 480,
    punkty: [
      { id: 'swiatlo', element: 'swiatlo', cel: [176, 116], znacznik: [38, 150], opis: 'źródło energii pochłaniane przez chlorofil' },
      { id: 'tlen', element: 'tlen', cel: [424, 80], znacznik: [602, 70], opis: 'gaz, który powstaje w liściu i trafia do atmosfery' },
      { id: 'chloroplast', element: 'chloroplast', cel: [528, 258], znacznik: [602, 200], opis: 'zielony element komórki liścia, w którym zachodzi fotosynteza' },
      { id: 'pokarm', element: 'substancje-pokarmowe', cel: [318, 420], znacznik: [602, 430], opis: 'produkt fotosyntezy, który z liścia trafia do wszystkich komórek rośliny' },
      { id: 'woda', element: 'woda', cel: [262, 420], znacznik: [38, 420], opis: 'substancja, którą do liścia doprowadzają komórki przewodzące' },
      { id: 'co2', element: 'dwutlenek-wegla', cel: [120, 254], znacznik: [38, 290], opis: 'gaz, który wnika do liścia z powietrza przez aparaty szparkowe' },
    ],
  },
];

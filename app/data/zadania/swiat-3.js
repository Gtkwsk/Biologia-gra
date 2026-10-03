// Zadania świata 3: „Zielone twierdze i niewidzialni mieszkańcy” (TRESCI.md, sekcja 2.3).
//
// Typy zadań i pola: SPEC.md, sekcja 5; opis pól przy komponentach w js/components.
// karta: id karty atlasu (element komórki, typ komórki „komorka-<typ>”, pojęcie, kształt).
// Zadania z przedrostkiem s3-boss- należą tylko do puli bossa.
// Luki: każda luka ma jedno poprawne słowo w banku. Zdania przeczące („nie ma [X]”) tylko wtedy,
// gdy żadne inne słowo z banku nie tworzy w luce zdania prawdziwego.

const WSZYSTKIE_TYPY = ['zwierzeca', 'roslinna', 'grzybowa', 'bakteryjna'];

export default [
  // ---------- Misja „Zielona twierdza” ----------
  {
    id: 's3-podpis-roslinna-1',
    swiat: 3,
    typ: 'podpisywanie',
    tresc: 'Podpisz elementy komórki roślinnej.',
    schemat: 'komorka-roslinna',
    punkty: ['sciana', 'mitochondrium', 'chloroplast', 'wakuola', 'rybosomy', 'cytozol', 'siateczka', 'blona', 'jadro', 'golgi'],
    dystraktory: ['otoczka-sluzowa', 'rzeska'],
    wyjasnienie:
      'Komórka roślinna ma te same podstawowe elementy co zwierzęca oraz ścianę komórkową, chloroplasty i zwykle jedną dużą wakuolę. Otoczkę śluzową i rzęskę mają niektóre bakterie.',
    zrodlo: '2.3',
  },
  {
    id: 's3-roslinna-zwierzeca',
    swiat: 3,
    typ: 'klasyfikacja',
    tresc: 'Czym różni się komórka roślinna od zwierzęcej? Przyporządkuj elementy do grup.',
    kategorie: [
      { id: 'roslinna', nazwa: 'tylko komórka roślinna', karta: 'komorka-roslinna' },
      { id: 'obie', nazwa: 'obie komórki' },
      { id: 'zwierzeca', nazwa: 'tylko komórka zwierzęca', karta: 'komorka-zwierzeca' },
    ],
    elementy: [
      { tekst: 'ściana komórkowa', kategoria: 'roslinna', karta: 'sciana-komorkowa', wyjasnienie: 'Komórka zwierzęca nie ma ściany komórkowej.' },
      { tekst: 'chloroplasty', kategoria: 'roslinna', karta: 'chloroplast', wyjasnienie: 'Chloroplasty ma tylko komórka roślinna.' },
      { tekst: 'jedna duża wakuola', kategoria: 'roslinna', karta: 'wakuola', wyjasnienie: 'Komórka roślinna ma zwykle jedną dużą wakuolę.' },
      { tekst: 'wiele drobnych wakuol', kategoria: 'zwierzeca', karta: 'wakuola', wyjasnienie: 'Komórka zwierzęca ma wiele drobnych wakuol.' },
      { tekst: 'jądro komórkowe', kategoria: 'obie', karta: 'jadro-komorkowe', wyjasnienie: 'Jądro komórkowe mają komórki zwierzęce i roślinne.' },
      { tekst: 'mitochondria', kategoria: 'obie', karta: 'mitochondrium', wyjasnienie: 'Mitochondria mają komórki zwierzęce i roślinne.' },
      { tekst: 'błona komórkowa', kategoria: 'obie', karta: 'blona-komorkowa', wyjasnienie: 'Błonę komórkową mają wszystkie komórki.' },
      { tekst: 'rybosomy', kategoria: 'obie', karta: 'rybosomy', wyjasnienie: 'Rybosomy mają wszystkie komórki.' },
    ],
    wyjasnienie:
      'Komórkę roślinną od zwierzęcej odróżniają ściana komórkowa, chloroplasty i zwykle jedna duża wakuola. W komórce zwierzęcej jest wiele drobnych wakuol.',
    zrodlo: '2.3',
  },
  {
    id: 's3-luki-1',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o komórce roślinnej.',
    tekst:
      'Komórka roślinna ma ścianę komórkową zbudowaną głównie z [celulozy|sciana-komorkowa|To cukier, który buduje ściany komórek roślin.]. Zielone [chloroplasty|chloroplast|To owalne elementy komórki.] zawierają barwnik [chlorofil|chlorofil], a zachodzi w nich [fotosynteza||W tym procesie powstają substancje pokarmowe.]. Komórka roślinna ma zwykle jedną dużą [wakuolę|wakuola|Ten element jest wypełniony głównie wodą.].',
    dystraktory: [
      { tekst: 'chityny', wyjasnienie: 'Z chityny jest zbudowana ściana komórkowa grzybów.' },
      { tekst: 'mitochondria', wyjasnienie: 'Mitochondria dostarczają komórce energii.' },
    ],
    wyjasnienie:
      'Ściana komórkowa roślin jest zbudowana głównie z celulozy. Chloroplasty zawierają chlorofil i zachodzi w nich fotosynteza.',
    zrodlo: '2.3',
  },

  // ---------- Misja „Detektyw komórek” ----------
  {
    id: 's3-detektyw-1',
    swiat: 3,
    typ: 'detektyw',
    tresc: 'Detektyw komórek: która to komórka? Odsłaniaj wskazówki i wskaż ją, gdy będziesz pewny.',
    sprawy: [
      { cel: 'roslinna', wskazowki: ['ma-jadro', 'ma-sciane', 'ma-chloroplasty', 'duza-wakuola'] },
      { cel: 'bakteryjna', wskazowki: ['ma-rybosomy', 'ma-sciane', 'bez-jadra', 'ma-rzeske'] },
      { cel: 'grzybowa', wskazowki: ['ma-sciane', 'ma-mitochondria', 'bez-chloroplastow', 'sciana-chityna'] },
    ],
    wyjasnienie:
      'Trzy zasady: tylko komórka zwierzęca nie ma ściany komórkowej, tylko roślinna ma chloroplasty, tylko bakteryjna nie ma jądra komórkowego, mitochondriów ani wakuol.',
    zrodlo: '2.3',
  },
  {
    id: 's3-detektyw-2',
    swiat: 3,
    typ: 'detektyw',
    tresc: 'Nowe sprawy dla detektywa. Która to komórka?',
    sprawy: [
      { cel: 'zwierzeca', wskazowki: ['ma-blone', 'bez-chloroplastow', 'bez-sciany', 'drobne-wakuole'] },
      { cel: 'grzybowa', wskazowki: ['ma-jadro', 'sciana-chityna', 'ma-wakuole'] },
      { cel: 'bakteryjna', wskazowki: ['bez-chloroplastow', 'bez-mitochondriow', 'ma-otoczke'] },
      { cel: 'roslinna', wskazowki: ['ma-wakuole', 'sciana-celuloza', 'ma-chloroplasty'] },
    ],
    wyjasnienie:
      'Ściana z chityny wskazuje komórkę grzybową, ściana z celulozy roślinną. Brak mitochondriów oznacza komórkę bakteryjną.',
    zrodlo: '2.3',
  },

  // ---------- Misja „Konstruktor czterech komórek” ----------
  {
    id: 's3-konstruktor-1',
    swiat: 3,
    typ: 'konstruktor',
    tresc: 'Zbuduj komórki z tego samego zestawu części.',
    plany: ['roslinna', 'zwierzeca'],
    wyjasnienie: 'Komórka roślinna ma wszystko, co zwierzęca, oraz ścianę komórkową, chloroplasty i zwykle jedną dużą wakuolę.',
    zrodlo: '2.3',
  },
  {
    id: 's3-konstruktor-2',
    swiat: 3,
    typ: 'konstruktor',
    tresc: 'Zbuduj komórki z tego samego zestawu części.',
    plany: ['grzybowa', 'bakteryjna'],
    wyjasnienie: 'Komórka grzybowa ma ścianę z chityny i nie ma chloroplastów. Komórka bakteryjna nie ma jądra, mitochondriów ani wakuol.',
    zrodlo: '2.3',
  },

  // ---------- Misja „Siatka porównawcza” ----------
  {
    id: 's3-tabela-1',
    swiat: 3,
    typ: 'tabela',
    tresc: 'Siatka porównawcza: które komórki mają te elementy?',
    wiersze: ['sciana-komorkowa', 'chloroplast', 'jadro-komorkowe', 'mitochondrium'],
    kolumny: WSZYSTKIE_TYPY,
    wyjasnienie:
      'Ścianę komórkową mają komórki roślinne, grzybowe i bakteryjne. Chloroplasty ma tylko roślinna. Jądra i mitochondriów nie ma tylko bakteryjna.',
    zrodlo: '2.3',
  },
  {
    id: 's3-luki-3',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij trzy zasady, które pomagają rozpoznać komórkę.',
    tekst:
      'Tylko komórka [zwierzęca|komorka-zwierzeca] nie ma ściany komórkowej. Tylko komórka [roślinna|komorka-roslinna] ma chloroplasty. Tylko komórka [bakteryjna|komorka-bakteryjna] nie ma jądra komórkowego, mitochondriów ani wakuol. Wszystkie cztery rodzaje komórek mają błonę komórkową, cytozol i [rybosomy|rybosomy].',
    dystraktory: [
      { tekst: 'grzybowa', wyjasnienie: 'Komórka grzybowa ma ścianę komórkową z chityny i jądro komórkowe, a nie ma chloroplastów.' },
      { tekst: 'chloroplasty', wyjasnienie: 'Chloroplasty ma tylko komórka roślinna.' },
    ],
    wyjasnienie:
      'Tylko komórka zwierzęca nie ma ściany, tylko roślinna ma chloroplasty, tylko bakteryjna nie ma jądra, mitochondriów ani wakuol. Wszystkie mają błonę komórkową, cytozol i rybosomy.',
    zrodlo: '2.3',
  },
  {
    id: 's3-pf-1',
    swiat: 3,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw zdania fałszywe.',
    zdania: [
      {
        tekst: 'Komórka bakteryjna ma jądro komórkowe.',
        prawda: false,
        karta: 'komorka-bakteryjna',
        poprawne: 'Komórka bakteryjna nie ma jądra komórkowego, a jego funkcję pełni nić DNA.',
        bledne: ['Komórka bakteryjna ma jądro komórkowe i nić DNA.', 'Komórka bakteryjna nie ma jądra komórkowego ani rybosomów.'],
        wyjasnienie: 'Bakterie mają komórki bezjądrowe. Rybosomy mają wszystkie komórki.',
      },
      {
        tekst: 'Tylko komórka roślinna ma chloroplasty.',
        prawda: true,
        karta: 'chloroplast',
        wyjasnienie: 'Komórki zwierzęce, grzybowe i bakteryjne nie mają chloroplastów.',
      },
      {
        tekst: 'Komórka grzybowa ma ścianę komórkową zbudowaną z celulozy.',
        prawda: false,
        karta: 'komorka-grzybowa',
        poprawne: 'Komórka grzybowa ma ścianę komórkową zbudowaną z chityny.',
        bledne: ['Komórka grzybowa nie ma ściany komórkowej.', 'Komórka grzybowa ma chloroplasty i ścianę komórkową z celulozy.'],
        wyjasnienie: 'Z celulozy jest zbudowana ściana komórkowa roślin. Ściana grzybów jest z chityny.',
      },
      {
        tekst: 'Wszystkie komórki mają błonę komórkową, cytozol i rybosomy.',
        prawda: true,
        karta: 'rybosomy',
        wyjasnienie: 'Mają je komórki zwierzęce, roślinne, grzybowe i bakteryjne.',
      },
      {
        tekst: 'Chlorofil to element komórki roślinnej.',
        prawda: false,
        karta: 'chlorofil',
        poprawne: 'Chlorofil to zielony barwnik zawarty w chloroplastach.',
        bledne: ['Chlorofil to zielony barwnik zawarty w mitochondriach.', 'Chlorofil to zielony element komórki zwierzęcej.'],
        wyjasnienie: 'Chlorofil to barwnik, nie element komórki. Zawierają go chloroplasty.',
      },
    ],
    wyjasnienie: 'Bakterie nie mają jądra komórkowego, grzyby mają ścianę z chityny, a chlorofil to barwnik w chloroplastach.',
    zrodlo: '2.3',
  },

  // ---------- Misja „Woda w wakuoli” ----------
  {
    id: 's3-wakuola-1',
    swiat: 3,
    typ: 'wakuola',
    tresc: 'Roślina na parapecie zwiędła. Podlej ją i zobacz, co dzieje się w jej komórkach.',
    pytania: [
      {
        pytanie: 'Który element komórki roślinnej utrzymuje w niej odpowiednią ilość wody?',
        poprawna: 'wakuola',
        opcje: ['wakuola', 'chloroplast', 'jadro-komorkowe', 'mitochondrium'],
        wyjasnienie: 'Duża wakuola jest wypełniona głównie wodą i utrzymuje w komórce odpowiednią ilość wody.',
      },
      {
        pytanie: 'Który element nadaje komórce roślinnej kształt i chroni ją przed uszkodzeniem?',
        poprawna: 'sciana-komorkowa',
        opcje: ['sciana-komorkowa', 'wakuola', 'blona-komorkowa', 'chloroplast'],
        wyjasnienie: 'Ściana komórkowa nadaje komórce kształt, chroni ją przed uszkodzeniem i zabezpiecza przed drobnoustrojami chorobotwórczymi.',
      },
    ],
    wyjasnienie: 'Wakuola utrzymuje w komórce odpowiednią ilość wody, a ściana komórkowa nadaje komórce kształt.',
    zrodlo: '2.3',
  },

  // ---------- Misja „Kształty komórek roślinnych” ----------
  {
    id: 's3-ksztalt-1',
    swiat: 3,
    typ: 'przyporzadkowanie',
    tresc: 'Kształt komórek roślinnych też zależy od funkcji. Dopasuj funkcję do komórek.',
    etykiety: 'opisy',
    pary: [
      { karta: 'aparat-szparkowy', opis: 'przez szparkę między nimi przenikają tlen i dwutlenek węgla' },
      { karta: 'wlosniki', opis: 'pobierają wodę z solami mineralnymi z gleby' },
      { karta: 'komorki-przewodzace', opis: 'transportują wodę z solami mineralnymi w roślinie' },
    ],
    dystraktory: [{ tekst: 'zawierają substancje zapasowe dla rozwijającego się organizmu', wyjasnienie: 'Substancje zapasowe zawiera komórka jajowa.' }],
    wyjasnienie:
      'Komórki aparatu szparkowego mają kształt nasion fasoli, włośniki to długie komórki skórki korzenia, a komórki przewodzące układają się jak rury.',
    zrodlo: '2.3',
  },
  {
    id: 's3-ksztalt-wyglad',
    swiat: 3,
    typ: 'przyporzadkowanie',
    tresc: 'Jak wyglądają te komórki roślinne? Dopasuj nazwy do opisów.',
    etykiety: 'nazwy',
    wyjasnij: 'wyglad',
    pary: [
      { karta: 'aparat-szparkowy', opis: 'para komórek w kształcie nasion fasoli ze szparką między nimi' },
      { karta: 'wlosniki', opis: 'długie komórki skórki korzenia' },
      { karta: 'komorki-przewodzace', opis: 'długie komórki ułożone jedna nad drugą jak rury' },
    ],
    dystraktory: ['komorka-nerwowa'],
    wyjasnienie: 'Kształt komórki zależy od funkcji: długie włośniki mają dużą powierzchnię, a komórki przewodzące tworzą rury.',
    zrodlo: '2.3',
  },
  {
    id: 's3-ksztalt-2',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o komórkach roślin.',
    tekst:
      'Komórki aparatu szparkowego mają kształt nasion [fasoli|aparat-szparkowy]. Przez [szparkę|aparat-szparkowy|To szczelina między dwiema komórkami aparatu szparkowego.] między nimi przenikają tlen i dwutlenek węgla. [Włośniki|wlosniki] pobierają wodę z solami mineralnymi. Komórki przewodzące są długie i ułożone jedna nad drugą jak [rury|komorki-przewodzace].',
    dystraktory: [
      { tekst: 'Chloroplasty', wyjasnienie: 'Chloroplasty to elementy komórki, w których zachodzi fotosynteza.' },
      { tekst: 'kule', wyjasnienie: 'Komórki przewodzące są długie, a nie kuliste.' },
    ],
    wyjasnienie: 'Komórki aparatu szparkowego przepuszczają gazy, włośniki pobierają wodę, a komórki przewodzące ją transportują.',
    zrodlo: '2.3',
  },

  // ---------- Misja „Niewidzialni mieszkańcy” ----------
  {
    id: 's3-podpis-bakteryjna-1',
    swiat: 3,
    typ: 'podpisywanie',
    tresc: 'Podpisz elementy komórki bakteryjnej.',
    schemat: 'komorka-bakteryjna',
    punkty: ['otoczka', 'nic', 'rzeska', 'rybosomy', 'cytozol', 'blona', 'sciana'],
    dystraktory: ['jadro-komorkowe', 'mitochondrium', 'chloroplast'],
    wyjasnienie:
      'Komórka bakteryjna nie ma jądra komórkowego, mitochondriów ani chloroplastów. Funkcję jądra pełni nić DNA w cytozolu.',
    zrodlo: '2.3',
  },
  {
    id: 's3-luki-2',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o komórce bakteryjnej.',
    tekst:
      'Komórka bakteryjna nie ma [jądra komórkowego|jadro-komorkowe|W komórkach zwierząt i roślin ten element kieruje wszystkimi procesami.]. Jego funkcję pełni [nić DNA|nic-dna|U bakterii DNA ma postać nici.] zanurzona w [cytozolu|cytozol|To galaretowata substancja, która wypełnia komórkę.]. Niektóre bakterie mają na powierzchni ściany komórkowej [otoczkę śluzową|otoczka-sluzowa|Ta warstwa chroni bakterię między innymi przed wysychaniem.]. Część bakterii porusza się dzięki [rzęsce|rzeska|To długa, cienka wypustka bakterii.].',
    dystraktory: [
      { tekst: 'rybosomów', wyjasnienie: 'Komórka bakteryjna ma rybosomy: mają je wszystkie komórki.' },
      { tekst: 'chloroplastom', wyjasnienie: 'Komórka bakteryjna nie ma chloroplastów.' },
    ],
    wyjasnienie:
      'Bakteria nie ma jądra komórkowego, a jego funkcję pełni nić DNA w cytozolu. Niektóre bakterie mają otoczkę śluzową, a część rzęskę.',
    zrodlo: '2.3',
  },
  {
    id: 's3-jadrowe',
    swiat: 3,
    typ: 'klasyfikacja',
    tresc: 'Komórki jądrowe i bezjądrowe. Przyporządkuj komórki do grup.',
    kategorie: [
      { id: 'jadrowe', nazwa: 'komórki jądrowe', karta: 'komorka-jadrowa' },
      { id: 'bezjadrowe', nazwa: 'komórki bezjądrowe', karta: 'komorka-bezjadrowa' },
    ],
    elementy: [
      { tekst: 'komórka bakteryjna', kategoria: 'bezjadrowe', karta: 'komorka-bakteryjna', wyjasnienie: 'Bakterie nie mają jądra komórkowego: to komórki bezjądrowe.' },
      { tekst: 'komórka zwierzęca', kategoria: 'jadrowe', karta: 'komorka-zwierzeca', wyjasnienie: 'Komórki zwierzęce mają jądro komórkowe.' },
      { tekst: 'komórka roślinna', kategoria: 'jadrowe', karta: 'komorka-roslinna', wyjasnienie: 'Komórki roślinne mają jądro komórkowe.' },
      { tekst: 'komórka grzybowa', kategoria: 'jadrowe', karta: 'komorka-grzybowa', wyjasnienie: 'Komórki grzybowe mają jądro komórkowe.' },
      { tekst: 'komórka nabłonka jamy ustnej', kategoria: 'jadrowe', wyjasnienie: 'To komórka zwierzęca: jej jądro widać już przy powiększeniu około 400 razy.' },
      { tekst: 'komórka drożdży', kategoria: 'jadrowe', wyjasnienie: 'Drożdże to grzyby, a komórki grzybowe mają jądro komórkowe.' },
    ],
    wyjasnienie: 'Komórki jądrowe to komórki zwierzęce, roślinne i grzybowe. Komórki bezjądrowe mają bakterie.',
    zrodlo: '2.3',
  },

  // ---------- Pule bossa ----------
  {
    id: 's3-boss-podpis-2',
    swiat: 3,
    typ: 'podpisywanie',
    tresc: 'Podpisz wskazane elementy komórki roślinnej.',
    schemat: 'komorka-roslinna',
    punkty: ['sciana', 'mitochondrium', 'chloroplast', 'wakuola', 'cytozol', 'blona', 'jadro'],
    dystraktory: ['otoczka-sluzowa'],
    wyjasnienie: 'Komórka roślinna nie ma otoczki śluzowej: mają ją niektóre bakterie.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-podpis-3',
    swiat: 3,
    typ: 'podpisywanie',
    tresc: 'Podpisz wskazane elementy komórki roślinnej.',
    schemat: 'komorka-roslinna',
    punkty: ['sciana', 'chloroplast', 'wakuola', 'rybosomy', 'blona', 'jadro'],
    dystraktory: ['rzeska'],
    wyjasnienie: 'Komórka roślinna nie ma rzęski: ma ją część bakterii.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-podpis-4',
    swiat: 3,
    typ: 'podpisywanie',
    tresc: 'Podpisz wskazane elementy komórki roślinnej.',
    schemat: 'komorka-roslinna',
    punkty: ['sciana', 'chloroplast', 'wakuola', 'siateczka', 'blona', 'golgi'],
    dystraktory: ['otoczka-sluzowa', 'rzeska'],
    wyjasnienie: 'Siateczka śródplazmatyczna to system kanalików, a aparat Golgiego to stos spłaszczonych pęcherzy.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-podpis-5',
    swiat: 3,
    typ: 'podpisywanie',
    tresc: 'Podpisz wskazane elementy komórki roślinnej.',
    schemat: 'komorka-roslinna',
    punkty: ['mitochondrium', 'chloroplast', 'wakuola', 'cytozol', 'jadro', 'sciana'],
    dystraktory: ['otoczka-sluzowa'],
    wyjasnienie: 'Chloroplasty są zielone i owalne, mitochondria owalne z pofałdowanym wnętrzem, a wakuola zajmuje środek komórki.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-luki-4',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o budowie komórek.',
    tekst:
      'Komórki zwierzęce, roślinne i grzybowe to komórki [jądrowe|komorka-jadrowa]. Komórki bakterii to komórki [bezjądrowe|komorka-bezjadrowa]. Komórka grzybowa ma ścianę komórkową zbudowaną z [chityny|komorka-grzybowa]. Komórka grzybowa nie ma [chloroplastów|chloroplast].',
    dystraktory: [
      { tekst: 'celulozy', wyjasnienie: 'Z celulozy jest zbudowana ściana komórkowa roślin.' },
      { tekst: 'mitochondriów', wyjasnienie: 'Komórka grzybowa ma mitochondria.' },
    ],
    wyjasnienie: 'Bakterie mają komórki bezjądrowe. Komórka grzybowa ma ścianę z chityny i nie ma chloroplastów.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-luki-5',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o budowie komórek.',
    tekst:
      'W komórce zwierzęcej jest wiele drobnych [wakuol|wakuola]. Komórka roślinna ma zwykle jedną dużą wakuolę wypełnioną głównie [wodą|wakuola]. Ściana komórkowa roślin jest zbudowana głównie z [celulozy|sciana-komorkowa]. Funkcję jądra komórkowego u bakterii pełni [nić DNA|nic-dna].',
    dystraktory: [
      { tekst: 'chlorofilem', wyjasnienie: 'Chlorofil to zielony barwnik zawarty w chloroplastach.' },
      { tekst: 'chityny', wyjasnienie: 'Z chityny jest zbudowana ściana komórkowa grzybów.' },
    ],
    wyjasnienie: 'Komórka zwierzęca ma wiele drobnych wakuol, a roślinna zwykle jedną dużą. U bakterii funkcję jądra pełni nić DNA.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-luki-6',
    swiat: 3,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o budowie komórek.',
    tekst:
      'Ściana komórkowa nadaje komórce [kształt|sciana-komorkowa], chroni ją przed uszkodzeniem i zabezpiecza przed wnikaniem drobnoustrojów chorobotwórczych. W [chloroplastach|chloroplast] zachodzi fotosynteza. Duża wakuola utrzymuje w komórce roślinnej odpowiednią ilość [wody|wakuola]. Ściana komórkowa grzybów jest zbudowana z [chityny|komorka-grzybowa].',
    dystraktory: [
      { tekst: 'energię', wyjasnienie: 'Energii dostarczają mitochondria.' },
      { tekst: 'mitochondriach', wyjasnienie: 'Mitochondria dostarczają komórce energii.' },
    ],
    wyjasnienie: 'Ściana komórkowa nadaje komórce kształt, w chloroplastach zachodzi fotosynteza, a wakuola utrzymuje odpowiednią ilość wody.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-tabela-2',
    swiat: 3,
    typ: 'tabela',
    tresc: 'Siatka porównawcza: które komórki mają te elementy?',
    wiersze: ['blona-komorkowa', 'wakuola', 'rybosomy', 'sciana-komorkowa'],
    kolumny: WSZYSTKIE_TYPY,
    wyjasnienie: 'Błonę komórkową i rybosomy mają wszystkie komórki. Wakuol nie ma tylko komórka bakteryjna, a ściany tylko zwierzęca.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-tabela-3',
    swiat: 3,
    typ: 'tabela',
    tresc: 'Siatka porównawcza: które komórki mają te elementy?',
    wiersze: ['jadro-komorkowe', 'chloroplast', 'wakuola', 'mitochondrium', 'sciana-komorkowa'],
    kolumny: ['zwierzeca', 'roslinna', 'bakteryjna'],
    wyjasnienie: 'Komórka bakteryjna nie ma jądra, mitochondriów ani wakuol. Chloroplasty ma tylko roślinna, a ściany nie ma tylko zwierzęca.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-pf-1',
    swiat: 3,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Komórka zwierzęca ma ścianę komórkową.',
        prawda: false,
        karta: 'komorka-zwierzeca',
        poprawne: 'Komórka zwierzęca nie ma ściany komórkowej.',
        bledne: ['Komórka zwierzęca ma ścianę komórkową z chityny.', 'Komórka zwierzęca ma ścianę komórkową z celulozy.'],
        wyjasnienie: 'Ścianę komórkową mają komórki roślinne, grzybowe i bakteryjne.',
      },
      {
        tekst: 'Komórka roślinna ma zwykle jedną dużą wakuolę.',
        prawda: true,
        karta: 'wakuola',
        wyjasnienie: 'Ta wakuola jest wypełniona głównie wodą i utrzymuje w komórce odpowiednią ilość wody.',
      },
      {
        tekst: 'Komórki bakterii to komórki jądrowe.',
        prawda: false,
        karta: 'komorka-bezjadrowa',
        poprawne: 'Komórki bakterii to komórki bezjądrowe.',
        bledne: ['Komórki bakterii to komórki roślinne.', 'Komórki bakterii mają po kilka jąder.'],
        wyjasnienie: 'Komórki jądrowe to komórki zwierzęce, roślinne i grzybowe.',
      },
      {
        tekst: 'Otoczka śluzowa chroni komórkę bakterii między innymi przed wysychaniem.',
        prawda: true,
        karta: 'otoczka-sluzowa',
        wyjasnienie: 'Otoczkę śluzową na powierzchni ściany komórkowej mają niektóre bakterie.',
      },
    ],
    wyjasnienie: 'Komórka zwierzęca nie ma ściany komórkowej, a bakterie mają komórki bezjądrowe.',
    zrodlo: '2.3',
  },
  {
    id: 's3-boss-pf-2',
    swiat: 3,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Komórka grzybowa ma chloroplasty, tak jak komórka roślinna.',
        prawda: false,
        karta: 'komorka-grzybowa',
        poprawne: 'Komórka grzybowa nie ma chloroplastów.',
        bledne: ['Komórka grzybowa ma chloroplasty, ale nie ma jądra komórkowego.', 'Komórka grzybowa ma więcej chloroplastów niż roślinna.'],
        wyjasnienie: 'Grzyby to nie rośliny: komórka grzybowa nie ma chloroplastów, a jej ściana jest z chityny.',
      },
      {
        tekst: 'Włośniki pobierają wodę z solami mineralnymi.',
        prawda: true,
        karta: 'wlosniki',
        wyjasnienie: 'Włośniki to długie komórki skórki korzenia.',
      },
      {
        tekst: 'Komórki przewodzące mają kształt nasion fasoli.',
        prawda: false,
        karta: 'aparat-szparkowy',
        poprawne: 'Komórki aparatu szparkowego mają kształt nasion fasoli.',
        bledne: ['Włośniki mają kształt nasion fasoli.', 'Komórki przewodzące mają kształt kuli.'],
        wyjasnienie: 'Komórki przewodzące są długie i ułożone jedna nad drugą jak rury.',
      },
      {
        tekst: 'Ściana komórkowa roślin jest zbudowana głównie z celulozy.',
        prawda: true,
        karta: 'sciana-komorkowa',
        wyjasnienie: 'Ściana grzybów jest zbudowana z chityny.',
      },
      {
        tekst: 'Komórki bakterii mają mitochondria.',
        prawda: false,
        karta: 'mitochondrium',
        poprawne: 'Komórki bakterii nie mają mitochondriów.',
        bledne: ['Komórki bakterii mają mitochondria i chloroplasty.', 'Komórki bakterii mają mitochondria zamiast rybosomów.'],
        wyjasnienie: 'Komórka bakteryjna nie ma jądra komórkowego, mitochondriów ani wakuol.',
      },
    ],
    wyjasnienie: 'Komórka grzybowa nie ma chloroplastów, a komórki bakterii nie mają mitochondriów.',
    zrodlo: '2.3',
  },
];

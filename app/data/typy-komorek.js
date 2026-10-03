// Cztery typy komórek. Treści: TRESCI.md, sekcja 2.3 (tabela porównawcza).
//
// obecnosc: 'tak' | 'nie' | 'czasem' (u niektórych lub u części komórek danego typu).
// Brak klucza oznacza, że TRESCI.md nie rozstrzyga sprawy dla tego typu:
// takiego elementu nie wolno używać jako dystraktora ani w zdaniu „nie ma”.
// Walidator porównuje te dane z tabelą w TRESCI.md.
// zdania: zdania o elementach, które wymagają uściślenia (np. rodzaj wakuoli, budulec ściany);
// pozostałe zdania powstają z form „biernik” i „brak” elementów. Zdanie o elemencie bez wpisu
// w obecnosc (np. nić DNA w komórce jądrowej) wyjaśnia, dlaczego konstruktor go nie przyjmuje.
// rysunek: schemat typu (assets/svg), także dla konstruktora i mikroskopu.
// Typ komórki jest też kartą atlasu (id karty: komorka-<id>).

export default [
  {
    id: 'zwierzeca',
    nazwa: 'komórka zwierzęca',
    zrodlo: '2.2',
    obecnosc: {
      'blona-komorkowa': 'tak',
      cytozol: 'tak',
      rybosomy: 'tak',
      'jadro-komorkowe': 'tak',
      mitochondrium: 'tak',
      'siateczka-srodplazmatyczna': 'tak',
      'aparat-golgiego': 'tak',
      wakuola: 'tak',
      chloroplast: 'nie',
      'sciana-komorkowa': 'nie',
      'otoczka-sluzowa': 'nie',
      rzeska: 'nie',
    },
    zdania: {
      wakuola: 'Komórka zwierzęca ma wiele drobnych wakuol.',
      'nic-dna': 'W komórce zwierzęcej DNA jest w jądrze komórkowym. Nić DNA w cytozolu zastępuje jądro tylko u bakterii.',
    },
    rysunek: 'assets/svg/komorka-zwierzeca.svg',
    opis: 'komórka z błoną komórkową, cytozolem, jądrem, mitochondriami i wieloma drobnymi wakuolami, bez ściany komórkowej',
    // Karty typów komórek ćwiczy świat 3 (porównania), dlatego w atlasie są w świecie 3.
    swiat: 3,
  },
  {
    id: 'roslinna',
    nazwa: 'komórka roślinna',
    zrodlo: '2.3',
    obecnosc: {
      'blona-komorkowa': 'tak',
      cytozol: 'tak',
      rybosomy: 'tak',
      'jadro-komorkowe': 'tak',
      mitochondrium: 'tak',
      'siateczka-srodplazmatyczna': 'tak',
      'aparat-golgiego': 'tak',
      wakuola: 'tak',
      chloroplast: 'tak',
      'sciana-komorkowa': 'tak',
      'otoczka-sluzowa': 'nie',
      rzeska: 'nie',
    },
    zdania: {
      wakuola: 'Komórka roślinna ma zwykle jedną dużą wakuolę.',
      'sciana-komorkowa': 'Komórka roślinna ma ścianę komórkową zbudowaną głównie z celulozy.',
      'nic-dna': 'W komórce roślinnej DNA jest w jądrze komórkowym. Nić DNA w cytozolu zastępuje jądro tylko u bakterii.',
    },
    rysunek: 'assets/svg/komorka-roslinna.svg',
    opis: 'komórka ze ścianą komórkową z celulozy, chloroplastami i zwykle jedną dużą wakuolą',
    swiat: 3,
    ciekawostka: 'W komórkach liścia moczarki chloroplasty krążą wzdłuż ścian, niesione przez płynącą cytoplazmę.',
  },
  {
    id: 'grzybowa',
    nazwa: 'komórka grzybowa',
    zrodlo: '2.3',
    obecnosc: {
      'blona-komorkowa': 'tak',
      cytozol: 'tak',
      rybosomy: 'tak',
      'jadro-komorkowe': 'tak',
      mitochondrium: 'tak',
      wakuola: 'tak',
      chloroplast: 'nie',
      'sciana-komorkowa': 'tak',
      'otoczka-sluzowa': 'nie',
      rzeska: 'nie',
    },
    zdania: {
      wakuola: 'Komórka grzybowa ma jedną dużą wakuolę lub wiele drobnych.',
      'sciana-komorkowa': 'Komórka grzybowa ma ścianę komórkową zbudowaną z chityny.',
      'nic-dna': 'W komórce grzybowej DNA jest w jądrze komórkowym. Nić DNA w cytozolu zastępuje jądro tylko u bakterii.',
    },
    rysunek: 'assets/svg/komorka-grzybowa.svg',
    opis: 'komórka podobna do zwierzęcej, ale ze ścianą komórkową z chityny, bez chloroplastów',
    swiat: 3,
    ciekawostka: 'Grzyby są bliżej spokrewnione ze zwierzętami niż z roślinami. Chityna buduje też pancerze owadów.',
  },
  {
    id: 'bakteryjna',
    nazwa: 'komórka bakteryjna',
    zrodlo: '2.3',
    obecnosc: {
      'blona-komorkowa': 'tak',
      cytozol: 'tak',
      rybosomy: 'tak',
      'jadro-komorkowe': 'nie',
      'nic-dna': 'tak',
      mitochondrium: 'nie',
      wakuola: 'nie',
      chloroplast: 'nie',
      'sciana-komorkowa': 'tak',
      'otoczka-sluzowa': 'czasem',
      rzeska: 'czasem',
    },
    zdania: {
      'jadro-komorkowe': 'Komórka bakteryjna nie ma jądra komórkowego: jego funkcję pełni nić DNA zanurzona w cytozolu.',
      'otoczka-sluzowa': 'Niektóre bakterie mają otoczkę śluzową.',
      rzeska: 'Część bakterii ma rzęskę.',
    },
    rysunek: 'assets/svg/komorka-bakteryjna.svg',
    opis: 'komórka bez jądra komórkowego, mitochondriów i wakuol; funkcję jądra pełni nić DNA',
    swiat: 3,
    ciekawostka: 'Antoni van Leeuwenhoek, kupiec handlujący suknem w Delft, budował najlepsze mikroskopy swoich czasów. W nalocie z własnych zębów zobaczył mnóstwo poruszających się „zwierzątek”, czyli bakterii; pisał, że jest ich tam więcej niż ludzi w całym królestwie.',
  },
];

// Cztery typy komórek. Treści: TRESCI.md, sekcja 2.3 (tabela porównawcza).
//
// obecnosc: 'tak' | 'nie' | 'czasem' (u niektórych lub u części komórek danego typu).
// Brak klucza oznacza, że TRESCI.md nie rozstrzyga sprawy dla tego typu:
// takiego elementu nie wolno używać jako dystraktora ani w zdaniu „nie ma”.
// Walidator porównuje te dane z tabelą w TRESCI.md.

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
    uwagi: { wakuola: 'wiele drobnych' },
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
    uwagi: { wakuola: 'zwykle jedna duża', 'sciana-komorkowa': 'z celulozy' },
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
    uwagi: { wakuola: 'jedna duża lub wiele drobnych', 'sciana-komorkowa': 'z chityny' },
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
    uwagi: {
      'jadro-komorkowe': 'funkcję jądra pełni nić DNA w cytozolu',
      'otoczka-sluzowa': 'u niektórych',
      rzeska: 'u części',
    },
  },
];

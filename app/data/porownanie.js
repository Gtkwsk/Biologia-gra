// Tabela porównawcza oddychania tlenowego i fermentacji (TRESCI.md, sekcja 2.6).
//
// wartosci: komórki tabeli dosłownie z TRESCI.md (walidator porównuje je z tabelą),
// etykiety:  krótsza wersja wartości na etykiecie w zadaniu (gdy wartość jest długa),
// zdania:    zdanie wyjaśniające każdą komórkę (informacja zwrotna).
// Kolumny to karty atlasu (data/pojecia.js).

export default {
  zrodlo: '2.6',
  kolumny: ['oddychanie-tlenowe', 'fermentacja'],
  cechy: [
    {
      id: 'tlen',
      cecha: 'udział tlenu',
      wartosci: { 'oddychanie-tlenowe': 'wymagany', fermentacja: 'niewymagany' },
      zdania: {
        'oddychanie-tlenowe': 'Oddychanie tlenowe wymaga tlenu.',
        fermentacja: 'Fermentacja to rozkład glukozy bez udziału tlenu.',
      },
    },
    {
      id: 'miejsce',
      cecha: 'miejsce w komórce',
      wartosci: { 'oddychanie-tlenowe': 'głównie mitochondria', fermentacja: 'cytozol' },
      zdania: {
        'oddychanie-tlenowe': 'Główne etapy oddychania tlenowego zachodzą w mitochondriach.',
        fermentacja: 'Fermentacja zachodzi w cytozolu.',
      },
    },
    {
      id: 'rozklad',
      cecha: 'rozkład glukozy',
      wartosci: { 'oddychanie-tlenowe': 'całkowity', fermentacja: 'częściowy' },
      zdania: {
        'oddychanie-tlenowe': 'W oddychaniu tlenowym glukoza jest rozkładana stopniowo, aż do dwutlenku węgla i wody.',
        fermentacja: 'W fermentacji glukoza jest rozkładana tylko częściowo, do nieco prostszego związku.',
      },
    },
    {
      id: 'produkty',
      cecha: 'produkty',
      wartosci: {
        'oddychanie-tlenowe': 'dwutlenek węgla, woda',
        fermentacja: 'prostszy związek: alkohol etylowy i dwutlenek węgla (alkoholowa) albo kwas mlekowy (mlekowa)',
      },
      etykiety: { fermentacja: 'alkohol etylowy i dwutlenek węgla albo kwas mlekowy' },
      zdania: {
        'oddychanie-tlenowe': 'W oddychaniu tlenowym z glukozy powstają dwutlenek węgla i woda.',
        fermentacja: 'W fermentacji alkoholowej powstają alkohol etylowy i dwutlenek węgla, a w mlekowej kwas mlekowy.',
      },
    },
    {
      id: 'energia',
      cecha: 'ilość energii',
      wartosci: { 'oddychanie-tlenowe': 'dużo', fermentacja: 'mało' },
      zdania: {
        'oddychanie-tlenowe': 'Oddychanie tlenowe uwalnia dużo energii, bo glukoza jest rozkładana całkowicie.',
        fermentacja: 'Fermentacja uwalnia znacznie mniej energii niż oddychanie tlenowe, bo glukoza jest rozkładana tylko częściowo.',
      },
    },
    {
      id: 'przyklady',
      cecha: 'przykłady',
      wartosci: {
        'oddychanie-tlenowe': 'większość organizmów',
        fermentacja: 'niektóre bakterie, grzyby (drożdże), pasożyty wewnętrzne (tasiemiec), mięśnie człowieka przy niedoborze tlenu',
      },
      etykiety: { fermentacja: 'niektóre bakterie, drożdże, tasiemiec, mięśnie człowieka przy niedoborze tlenu' },
      zdania: {
        'oddychanie-tlenowe': 'U większości organizmów oddychanie komórkowe zachodzi z udziałem tlenu.',
        fermentacja: 'Fermentację przeprowadzają niektóre bakterie, grzyby (np. drożdże) i pasożyty wewnętrzne (np. tasiemiec), a także mięśnie człowieka przy niedoborze tlenu.',
      },
    },
  ],
};

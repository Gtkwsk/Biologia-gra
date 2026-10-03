// Wskazówki dla mechaniki „Detektyw komórek” (świat 3). Treści: TRESCI.md, sekcja 2.3.
//
// Wskazówka o elemencie: element + jest (true: „mam”, false: „nie mam”). Pasujące typy komórek
// wynikają z data/typy-komorek.js („czasem” pasuje do obu wersji).
// Wskazówka szczególna: pasuje – typy zgodne z wskazówką, nieznane – typy, o których TRESCI.md
// milczy (np. budulec ściany bakterii); takiej wskazówki nie używa się do wykluczania tych typów.
// element przy wskazówce szczególnej służy do zdania wyjaśniającego wykluczenie.

export default [
  { id: 'ma-blone', tekst: 'Mam błonę komórkową.', element: 'blona-komorkowa', jest: true },
  { id: 'ma-rybosomy', tekst: 'Mam rybosomy.', element: 'rybosomy', jest: true },
  { id: 'ma-sciane', tekst: 'Mam ścianę komórkową.', element: 'sciana-komorkowa', jest: true },
  { id: 'bez-sciany', tekst: 'Nie mam ściany komórkowej.', element: 'sciana-komorkowa', jest: false },
  { id: 'ma-chloroplasty', tekst: 'Mam chloroplasty.', element: 'chloroplast', jest: true },
  { id: 'bez-chloroplastow', tekst: 'Nie mam chloroplastów.', element: 'chloroplast', jest: false },
  { id: 'ma-jadro', tekst: 'Mam jądro komórkowe.', element: 'jadro-komorkowe', jest: true },
  { id: 'bez-jadra', tekst: 'Nie mam jądra komórkowego. Jego funkcję pełni nić DNA w cytozolu.', element: 'jadro-komorkowe', jest: false },
  { id: 'ma-mitochondria', tekst: 'Mam mitochondria.', element: 'mitochondrium', jest: true },
  { id: 'bez-mitochondriow', tekst: 'Nie mam mitochondriów.', element: 'mitochondrium', jest: false },
  { id: 'ma-wakuole', tekst: 'Mam wakuole.', element: 'wakuola', jest: true },
  { id: 'bez-wakuol', tekst: 'Nie mam wakuol.', element: 'wakuola', jest: false },
  { id: 'ma-rzeske', tekst: 'Mam rzęskę.', element: 'rzeska', jest: true },
  { id: 'ma-otoczke', tekst: 'Mam otoczkę śluzową.', element: 'otoczka-sluzowa', jest: true },
  {
    id: 'sciana-chityna',
    tekst: 'Moja ściana komórkowa jest zbudowana z chityny.',
    element: 'sciana-komorkowa',
    pasuje: ['grzybowa'],
    nieznane: ['bakteryjna'],
  },
  {
    id: 'sciana-celuloza',
    tekst: 'Moja ściana komórkowa jest zbudowana głównie z celulozy.',
    element: 'sciana-komorkowa',
    pasuje: ['roslinna'],
    nieznane: ['bakteryjna'],
  },
  { id: 'duza-wakuola', tekst: 'Mam zwykle jedną dużą wakuolę.', element: 'wakuola', pasuje: ['roslinna', 'grzybowa'] },
  { id: 'drobne-wakuole', tekst: 'Mam wiele drobnych wakuol.', element: 'wakuola', pasuje: ['zwierzeca', 'grzybowa'] },
];

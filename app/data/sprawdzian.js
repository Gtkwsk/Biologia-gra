// Próbny sprawdzian (SPEC.md, sekcja 4.3): czternaście zadań w kolejności punktów zakresu
// sprawdzianu z TRESCI.md, sekcja 8; razem 29 punktów, bez podpowiedzi i bez limitu czasu.
//
// punkt:  numer punktu zakresu (TRESCI.md, sekcja 8),
// nazwa:  krótka nazwa do raportu,
// punkty: najwyższa liczba punktów za zadanie (rozkład przyjęty w etapie 4, SPEC.md, sekcja 12;
//         jeśli podręcznik podaje inny, wystarczy zmienić liczby tutaj),
// misja:  świat i misja, w której ten punkt się ćwiczy (odnośnik w raporcie),
// misjeKart: opcjonalnie karta atlasu → misja w tym samym świecie, gdy temat ćwiczy się
//         w kilku misjach (odnośniki do misji kart z błędem),
// pula:   warianty zadania w formatach sprawdzianu; przy każdym podejściu losowany jest jeden.
//         Każdy wariant sprawdza dokładnie temat punktu.

export default [
  {
    punkt: 1,
    nazwa: 'Funkcje wody, w tym usuwanie zbędnych substancji',
    punkty: 1,
    misja: { swiat: 1, id: 's1-woda' },
    pula: ['s1-woda-luki', 's1-woda-pf', 's1-woda-klas', 's1-boss-woda-luki-2', 's1-boss-woda-pf-2'],
  },
  {
    punkt: 2,
    nazwa: 'Sole mineralne: źródło wapnia i magnezu',
    punkty: 2,
    misja: { swiat: 1, id: 's1-ratuj' },
    pula: ['s1-sole-luki', 's1-boss-sole-luki-2', 's1-boss-sole-pf-1', 's1-boss-sole-przyp-1', 's1-boss-sole-klas-1'],
  },
  {
    punkt: 3,
    nazwa: 'Funkcje cukrów, białek i tłuszczów',
    punkty: 3,
    misja: { swiat: 1, id: 's1-funkcje' },
    pula: ['s1-pf-funkcje-1', 's1-boss-pf-funkcje-2', 's1-boss-pf-funkcje-3', 's1-boss-pf-funkcje-4', 's1-boss-pf-funkcje-5'],
  },
  {
    punkt: 4,
    nazwa: 'Funkcje elementów komórki',
    punkty: 3,
    misja: { swiat: 2, id: 's2-biuro' },
    pula: ['s2-funkcje-1', 's2-boss-funkcje-2', 's2-boss-funkcje-3', 's2-boss-funkcje-4', 's2-boss-funkcje-5', 's2-boss-funkcje-6'],
  },
  {
    punkt: 5,
    nazwa: 'Budowa komórek bakterii, roślin i zwierząt',
    punkty: 2,
    misja: { swiat: 3, id: 's3-siatka' },
    pula: ['s3-luki-1', 's3-luki-2', 's3-luki-3', 's3-boss-luki-5', 's3-boss-luki-6'],
  },
  {
    punkt: 6,
    nazwa: 'Schemat komórki roślinnej',
    punkty: 3,
    misja: { swiat: 3, id: 's3-twierdza' },
    pula: ['s3-podpis-roslinna-1', 's3-podpis-roslinna-2', 's3-boss-podpis-2', 's3-boss-podpis-3', 's3-boss-podpis-4', 's3-boss-podpis-5', 's3-boss-podpis-6'],
  },
  {
    punkt: 7,
    nazwa: 'Nazwy związków w schemacie fotosyntezy',
    punkty: 2,
    misja: { swiat: 4, id: 's4-przepis' },
    pula: ['s4-podpis-roslina-1', 's4-boss-podpis-lisc-1', 's4-boss-podpis-lisc-2', 's4-boss-podpis-roslina-2', 's4-luki-zapis-1', 's4-boss-luki-zapis-2'],
  },
  {
    punkt: 8,
    nazwa: 'Wykorzystanie substancji pokarmowych przez roślinę',
    punkty: 2,
    misja: { swiat: 4, id: 's4-drogi' },
    pula: ['s4-drogi-1', 's4-drogi-przyp-1', 's4-luki-drogi-1', 's4-boss-drogi-klas-1', 's4-boss-pf-drogi-1'],
  },
  {
    punkt: 9,
    nazwa: 'Wpływ dwutlenku węgla na fotosyntezę',
    punkty: 1,
    misja: { swiat: 4, id: 's4-projektant' },
    pula: ['s4-dosw-co2-1', 's4-szklarnia-1', 's4-boss-dosw-co2-2', 's4-boss-luki-co2-1', 's4-boss-pf-co2-1'],
  },
  {
    punkt: 10,
    nazwa: 'Cudzożywność',
    punkty: 2,
    misja: { swiat: 5, id: 's5-uczta' },
    pula: ['s5-luki-cudzozywnosc-1', 's5-boss-luki-2', 's5-boss-luki-3', 's5-boss-luki-4', 's5-boss-luki-5'],
  },
  {
    punkt: 11,
    nazwa: 'Typy organizmów cudzożywnych',
    punkty: 2,
    misja: { swiat: 5, id: 's5-atlas' },
    misjeKart: {
      pasozyt: 's5-pasozyty',
      'pasozyt-zewnetrzny': 's5-pasozyty',
      'pasozyt-wewnetrzny': 's5-pasozyty',
      'roslina-pasozytnicza': 's5-pasozyty',
      polpasozyt: 's5-pasozyty',
      zywiciel: 's5-pasozyty',
      'organizmy-odzywiajace-sie-szczatkami': 's5-las',
    },
    pula: ['s5-atlas-przyp-1', 's5-boss-przyp-2', 's5-boss-przyp-3', 's5-boss-przyp-4', 's5-boss-przyp-5'],
  },
  {
    punkt: 12,
    nazwa: 'Oddychanie komórkowe czy wymiana gazowa',
    punkty: 2,
    misja: { swiat: 6, id: 's6-oddychanie' },
    pula: ['s6-sorter-ow-1', 's6-boss-sorter-ow-2', 's6-boss-sorter-ow-3', 's6-boss-sorter-ow-4', 's6-boss-sorter-ow-5'],
  },
  {
    punkt: 13,
    nazwa: 'Oddychanie tlenowe i fermentacja: tabela porównawcza',
    punkty: 3,
    misja: { swiat: 6, id: 's6-tabela' },
    pula: ['s6-tabela-1', 's6-boss-tabela-2', 's6-boss-tabela-3', 's6-boss-tabela-4', 's6-boss-pf-tabela-1'],
  },
  {
    punkt: 14,
    nazwa: 'Produkty oddychania tlenowego i fermentacji',
    punkty: 1,
    misja: { swiat: 6, id: 's6-tabela' },
    pula: ['s6-produkty-1', 's6-boss-produkty-2', 's6-boss-pf-produkty-2', 's6-boss-luki-fermentacje-1', 's6-boss-pf-produkty-1'],
  },
];

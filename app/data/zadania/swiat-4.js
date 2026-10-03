// Zadania świata 4: „Kuchnia zasilana światłem” (TRESCI.md, sekcja 2.4).
//
// Typy zadań i pola: SPEC.md, sekcja 5; opis pól przy komponentach w js/components.
// karta: id karty atlasu (pojęcie, proces, substancja, organizm, element komórki).
// Zadania z przedrostkiem s4-boss- należą tylko do puli bossa.
// Liczby pęcherzyków w tabelach wyników są przykładowe; kierunek różnicy wynika z TRESCI.md.
// Luki: każda luka ma jednoznaczną rolę w zdaniu. Słowa równorzędne (np. dwa substraty) nie stoją
// w lukach obok siebie, bo zamiana ich kolejności byłaby poprawna, a gra uznałaby ją za błąd.

const DROGI = [
  { id: 'energia', nazwa: 'źródło energii', karta: 'slonecznik' },
  { id: 'budowa', nazwa: 'budowa ciała', karta: 'truskawka' },
  { id: 'zapas', nazwa: 'materiał zapasowy', karta: 'ziemniak' },
];

export default [
  // ---------- Misja „Przepis kuchenny” ----------
  {
    id: 's4-przepis-1',
    swiat: 4,
    typ: 'przepis',
    tresc: 'Kuchnia w chloroplaście: ułóż przepis na fotosyntezę. Skąd biorą się składniki i dokąd trafia to, co powstaje?',
    procesy: ['fotosynteza'],
    garnki: [{ karta: 'chloroplast', podpis: 'chloroplast w komórce liścia' }],
    pola: [
      { id: 'co2', substancja: 'dwutlenek-wegla', strefa: 'wejscie', podpis: 'z powietrza przez aparaty szparkowe' },
      { id: 'woda', substancja: 'woda', strefa: 'wejscie', podpis: 'z gleby przez korzenie i komórki przewodzące' },
      { id: 'swiatlo', substancja: 'swiatlo', strefa: 'wejscie', podpis: 'pochłania je chlorofil' },
      { id: 'pokarm', substancja: 'substancje-pokarmowe', strefa: 'wyjscie', podpis: 'do wszystkich komórek rośliny' },
      { id: 'tlen', substancja: 'tlen', strefa: 'wyjscie', podpis: 'do atmosfery' },
    ],
    wyjasnienie:
      'Fotosynteza zachodzi głównie w liściach, w chloroplastach. Z dwutlenku węgla i wody, z udziałem energii świetlnej pochłanianej przez chlorofil, powstają substancje pokarmowe i tlen.',
    zrodlo: '2.4',
  },
  {
    id: 's4-podpis-roslina-1',
    swiat: 4,
    typ: 'podpisywanie',
    tresc: 'Podpisz schemat fotosyntezy: co roślina pobiera, z czego korzysta i co powstaje?',
    schemat: 'fotosynteza-roslina',
    punkty: ['swiatlo', 'tlen', 'pokarm', 'woda', 'co2'],
    wyjasnienie:
      'Dwutlenek węgla wnika do liści z powietrza, wodę pobierają z gleby korzenie, a światło pochłania chlorofil. Powstają substancje pokarmowe, transportowane do wszystkich komórek rośliny, i tlen, który trafia do atmosfery.',
    zrodlo: '2.4',
  },
  {
    id: 's4-luki-zapis-1',
    swiat: 4,
    typ: 'luki',
    tresc: 'Uzupełnij zdanie o fotosyntezie.',
    tekst:
      'Do fotosyntezy roślina potrzebuje [dwutlenku węgla|dwutlenek-wegla|Ten gaz wnika do liści z powietrza przez aparaty szparkowe.], który wnika do liści z powietrza, i [wody|woda|Tę substancję korzenie pobierają z gleby.], którą korzenie pobierają z gleby. Energii dostarcza światło, które pochłania [chlorofil|chlorofil|To zielony barwnik zawarty w chloroplastach.]. Powstają [substancje pokarmowe|substancje-pokarmowe|To głównie glukoza.], transportowane do wszystkich komórek rośliny, oraz [tlen|tlen|Ten gaz trafia do atmosfery.], który trafia do atmosfery.',
    dystraktory: [
      { tekst: 'tlenu', wyjasnienie: 'Tlen powstaje w fotosyntezie; nie jest jej składnikiem.' },
      { tekst: 'mitochondria', wyjasnienie: 'Mitochondria dostarczają komórce energii; światło pochłania zielony barwnik.' },
    ],
    wyjasnienie: 'Zapis słowny fotosyntezy: dwutlenek węgla + woda → (światło, chlorofil) → substancje pokarmowe + tlen.',
    zrodlo: '2.4',
  },

  // ---------- Misja „Trzy drogi glukozy” ----------
  {
    id: 's4-drogi-1',
    swiat: 4,
    typ: 'sorter',
    tresc: 'Na co roślina zużywa substancje pokarmowe? Wyślij każdą porcję tam, gdzie jest potrzebna.',
    scena: 'drogi-glukozy',
    kategorie: DROGI,
    zdania: [
      { tekst: 'Kwiaty słonecznika obracają się w stronę słońca.', kategoria: 'energia', karta: 'slonecznik', wyjasnienie: 'Ruch kwiatów słonecznika w stronę słońca wymaga energii z substancji pokarmowych.' },
      { tekst: 'Młody słonecznik w ciągu dnia obraca się ku słońcu.', kategoria: 'energia', karta: 'slonecznik', wyjasnienie: 'Na ruch roślina zużywa energię z substancji pokarmowych.' },
      { tekst: 'Truskawka wytwarza słodkie owoce.', kategoria: 'budowa', karta: 'truskawka', wyjasnienie: 'Z substancji pokarmowych roślina buduje ciało w czasie wzrostu i rozwoju, np. owoce truskawki.' },
      { tekst: 'Roślina rośnie i wytwarza nowe liście.', kategoria: 'budowa', wyjasnienie: 'Nowe liście to budowa ciała w czasie wzrostu i rozwoju.' },
      { tekst: 'Roślina wytwarza kwiaty.', kategoria: 'budowa', wyjasnienie: 'Kwiaty powstają z substancji pokarmowych w czasie rozwoju rośliny.' },
      { tekst: 'Ziemniak gromadzi skrobię w bulwach.', kategoria: 'zapas', karta: 'ziemniak', wyjasnienie: 'Skrobia w bulwach ziemniaka to materiał zapasowy.' },
      { tekst: 'Zapasy pomagają roślinie przetrwać niekorzystne warunki.', kategoria: 'zapas', wyjasnienie: 'Materiał zapasowy pomaga roślinie przetrwać niekorzystne warunki.' },
      { tekst: 'Dzięki zapasom wiosną rozwijają się nowe pędy.', kategoria: 'zapas', wyjasnienie: 'Materiał zapasowy umożliwia wiosną rozwój nowych pędów.' },
    ],
    wyjasnienie: 'Roślina wykorzystuje substancje pokarmowe jako źródło energii, do budowy ciała w czasie wzrostu i rozwoju oraz jako materiał zapasowy.',
    zrodlo: '2.4',
  },
  {
    id: 's4-drogi-przyp-1',
    swiat: 4,
    typ: 'przyporzadkowanie',
    tresc: 'Jak te rośliny wykorzystują substancje pokarmowe? Dopasuj opisy.',
    etykiety: 'opisy',
    pary: [
      { karta: 'slonecznik', opis: 'źródło energii, np. do ruchu kwiatów w stronę słońca' },
      { karta: 'truskawka', opis: 'budowa ciała w czasie wzrostu i rozwoju, np. owoce' },
      { karta: 'ziemniak', opis: 'materiał zapasowy: skrobia w bulwach' },
    ],
    dystraktory: [{ tekst: 'pobieranie azotu z chwytanych owadów', wyjasnienie: 'Azot z owadów pobiera rosiczka. To nie jest sposób wykorzystania substancji pokarmowych.' }],
    wyjasnienie: 'Słonecznik zużywa substancje pokarmowe jako źródło energii, truskawka do budowy ciała, a ziemniak gromadzi je jako materiał zapasowy.',
    zrodlo: '2.4',
  },
  {
    id: 's4-luki-drogi-1',
    swiat: 4,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o wykorzystaniu substancji pokarmowych.',
    tekst:
      'Roślina wykorzystuje substancje pokarmowe jako źródło [energii|slonecznik|Dzięki niej kwiaty słonecznika obracają się w stronę słońca.], do budowy [ciała|truskawka|Truskawka w czasie wzrostu wytwarza nowe liście, kwiaty i owoce.] i jako materiał [zapasowy|ziemniak|Pomaga przetrwać niekorzystne warunki.]. Ziemniak gromadzi w bulwach [skrobię|ziemniak].',
    dystraktory: [
      { tekst: 'tlen', wyjasnienie: 'Tlen powstaje w fotosyntezie i trafia do atmosfery.' },
      { tekst: 'chlorofil', wyjasnienie: 'Chlorofil to zielony barwnik, który pochłania światło.' },
    ],
    wyjasnienie: 'Substancje pokarmowe są dla rośliny źródłem energii, materiałem do budowy ciała i materiałem zapasowym, np. skrobią w bulwach ziemniaka.',
    zrodlo: '2.4',
  },

  // ---------- Misja „Laboratorium fotosyntezy” ----------
  {
    id: 's4-lab-1',
    swiat: 4,
    typ: 'laboratorium',
    tresc: 'Laboratorium fotosyntezy: przewiduj, co stanie się z pęcherzykami tlenu, a potem sprawdź na suwakach.',
    tryb: 'badanie',
    roslina: 'moczarka',
    start: { swiatlo: 0, dwutlenek: 2, temperatura: 2, sole: 2 },
    kroki: [
      { czynnik: 'swiatlo', poziom: 3 },
      { czynnik: 'dwutlenek', poziom: 3 },
      { czynnik: 'swiatlo', poziom: 4 },
      { czynnik: 'temperatura', poziom: 4 },
      { czynnik: 'sole', poziom: 3 },
    ],
    cel: true,
    wyjasnienie:
      'W ciemności fotosynteza nie zachodzi. Więcej dwutlenku węgla zwiększa jej intensywność, a nadmiar każdego czynnika ją zmniejsza. O intensywności decyduje czynnik najmniej korzystny.',
    zrodlo: '2.4',
  },
  {
    id: 's4-pf-czynniki-1',
    swiat: 4,
    typ: 'prawda-falsz',
    tresc: 'Notatki z laboratorium: prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Na intensywność fotosyntezy wpływają światło, dwutlenek węgla, woda, temperatura i sole mineralne.',
        prawda: true,
        karta: 'intensywnosc-fotosyntezy',
        wyjasnienie: 'To pięć czynników, od których zależy, jak szybko zachodzi fotosynteza.',
      },
      {
        tekst: 'Im więcej światła, tym zawsze szybsza fotosynteza.',
        prawda: false,
        karta: 'intensywnosc-fotosyntezy',
        poprawne: 'Zarówno niedobór, jak i nadmiar światła zmniejsza intensywność fotosyntezy.',
        bledne: ['Im mniej światła, tym zawsze szybsza fotosynteza.', 'Światło nie wpływa na intensywność fotosyntezy.'],
        wyjasnienie: 'Nadmiar każdego czynnika, także światła, zmniejsza intensywność fotosyntezy.',
      },
      {
        tekst: 'W ciemności fotosynteza nie zachodzi.',
        prawda: true,
        karta: 'swiatlo',
        wyjasnienie: 'Gałązka moczarki w ciemności nie wydziela pęcherzyków tlenu: bez światła fotosynteza nie zachodzi.',
      },
      {
        tekst: 'Nadmiar wody nie ma wpływu na fotosyntezę.',
        prawda: false,
        karta: 'woda',
        poprawne: 'Zarówno niedobór, jak i nadmiar wody zmniejsza intensywność fotosyntezy.',
        bledne: ['Nadmiar wody zawsze przyspiesza fotosyntezę.', 'Woda nie bierze udziału w fotosyntezie.'],
        wyjasnienie: 'Woda jest potrzebna do fotosyntezy, ale jej nadmiar, tak jak niedobór, zmniejsza intensywność fotosyntezy.',
      },
      {
        tekst: 'W korzystnych warunkach rośliny rosną szybko, a w niekorzystnych rosną słabiej i są mniejsze.',
        prawda: true,
        karta: 'intensywnosc-fotosyntezy',
        wyjasnienie: 'Od warunków zależy intensywność fotosyntezy, a od niej ilość substancji pokarmowych.',
      },
    ],
    wyjasnienie: 'Niedobór i nadmiar każdego czynnika (światła, dwutlenku węgla, wody, temperatury, soli mineralnych) zmniejsza intensywność fotosyntezy.',
    zrodlo: '2.4',
  },

  // ---------- Misja „Najsłabsze ogniwo” ----------
  {
    id: 's4-ogniwo-1',
    swiat: 4,
    typ: 'laboratorium',
    tresc: 'Najsłabsze ogniwo: znajdź czynnik, który najbardziej hamuje fotosyntezę w szklarni, i popraw go.',
    tryb: 'ogniwo',
    roslina: 'szklarnia',
    przypadki: [
      { opis: 'Szklarnia zimą: lampy świecą jasno, gleba jest wilgotna, ale w środku jest zimno.', ustawienia: { swiatlo: 3, dwutlenek: 2, woda: 2, temperatura: 0, sole: 2 } },
      { opis: 'Jest ciepło, jasno i wilgotno, ale w powietrzu szklarni jest mało dwutlenku węgla.', ustawienia: { swiatlo: 3, dwutlenek: 1, woda: 2, temperatura: 2, sole: 2 } },
      { opis: 'Przez dwa tygodnie nikt nie podlewał roślin.', ustawienia: { swiatlo: 3, dwutlenek: 3, woda: 0, temperatura: 2, sole: 2 } },
      { opis: 'Do gleby trafiło za dużo soli mineralnych.', ustawienia: { swiatlo: 3, dwutlenek: 3, woda: 2, temperatura: 2, sole: 4 } },
      { opis: 'Pochmurny dzień, a lampy są zgaszone: w szklarni panuje półmrok.', ustawienia: { swiatlo: 1, dwutlenek: 3, woda: 2, temperatura: 2, sole: 2 } },
    ],
    wyjasnienie:
      'Fotosyntezę hamuje czynnik najmniej korzystny, jak łańcuch, który jest tak mocny jak jego najsłabsze ogniwo. Niedobór i nadmiar każdego czynnika zmniejsza intensywność fotosyntezy.',
    zrodlo: '2.4',
  },
  {
    id: 's4-szklarnia-1',
    swiat: 4,
    typ: 'doswiadczenie',
    tresc: 'Ogrodnik bada swoje szklarnie. Co pokazuje jego doświadczenie?',
    scena: 'szklarnie-co2',
    opis:
      'Ogrodnik ma dwie takie same szklarnie z takimi samymi roślinami. W obu jest tak samo jasno, ciepło i wilgotno. Do szklarni A doprowadził dodatkowy dwutlenek węgla, a w szklarni B zostawił zwykłe powietrze. Po kilku tygodniach porównał rośliny.',
    kroki: [
      {
        pytanie: 'Który czynnik ogrodnik zmienił w szklarni A?',
        opcje: [
          { tekst: 'stężenie dwutlenku węgla', poprawna: true },
          { tekst: 'ilość światła', wyjasnienie: 'W obu szklarniach jest tak samo jasno.' },
          { tekst: 'temperaturę', wyjasnienie: 'W obu szklarniach jest tak samo ciepło.' },
        ],
        wyjasnienie: 'Szklarnie różnią się tylko ilością dwutlenku węgla w powietrzu.',
        karta: 'dwutlenek-wegla',
      },
      {
        pytanie: 'Która szklarnia jest próbą kontrolną?',
        kolejnosc: 'stala',
        opcje: [
          { tekst: 'szklarnia A: więcej dwutlenku węgla', wyjasnienie: 'W szklarni A zmieniono badany czynnik, więc to próba badawcza.' },
          { tekst: 'szklarnia B: zwykłe powietrze', poprawna: true },
        ],
        wyjasnienie: 'W szklarni B nie zmieniono badanego czynnika. To punkt odniesienia, czyli próba kontrolna.',
        karta: 'proba-kontrolna',
      },
      {
        pytanie: 'Jaki wniosek wynika z doświadczenia?',
        opcje: [
          { tekst: 'Zwiększenie stężenia dwutlenku węgla zwiększa intensywność fotosyntezy, więc rośliny rosną szybciej.', poprawna: true },
          { tekst: 'Dwutlenek węgla zmniejsza intensywność fotosyntezy.', wyjasnienie: 'W szklarni z dodatkowym dwutlenkiem węgla rośliny urosły bardziej.' },
          { tekst: 'Rośliny w szklarni nie potrzebują światła.', wyjasnienie: 'W obu szklarniach było jasno, więc doświadczenie tego nie sprawdzało.' },
        ],
        wyjasnienie: 'Dlatego w szklarniach sztucznie zwiększa się stężenie dwutlenku węgla: fotosynteza jest intensywniejsza, a rośliny rosną szybciej.',
        karta: 'intensywnosc-fotosyntezy',
      },
    ],
    wyjasnienie: 'W szklarniach sztucznie zwiększa się stężenie dwutlenku węgla, co zwiększa intensywność fotosyntezy.',
    zrodlo: '2.4',
  },

  // ---------- Misja „Projektant doświadczeń” ----------
  {
    id: 's4-projektant-1',
    swiat: 4,
    typ: 'projektant',
    tresc: 'Zaprojektuj doświadczenie z dwiema gałązkami moczarki.',
    pytanie: 'Czy światło jest niezbędne do fotosyntezy?',
    badany: 'swiatlo',
    czynniki: [
      {
        id: 'swiatlo',
        opcje: [
          { id: 'swiatlo', nazwa: 'w świetle', poziom: 3 },
          { id: 'ciemnosc', nazwa: 'w ciemnej szafce', poziom: 0 },
        ],
      },
      {
        id: 'dwutlenek',
        opcje: [
          { id: 'kran', nazwa: 'woda z kranu', poziom: 2 },
          { id: 'gazowana', nazwa: 'woda gazowana', poziom: 3 },
        ],
      },
      {
        id: 'temperatura',
        opcje: [
          { id: 'cieplo', nazwa: 'ciepło', poziom: 2 },
          { id: 'zimno', nazwa: 'zimno', poziom: 0 },
        ],
      },
    ],
    start: {
      A: { swiatlo: 'swiatlo', dwutlenek: 'kran', temperatura: 'cieplo' },
      B: { swiatlo: 'swiatlo', dwutlenek: 'gazowana', temperatura: 'zimno' },
    },
    pytania: [
      {
        pytanie: 'Co pokazały wyniki?',
        opcje: [
          { tekst: 'W świetle gałązka wydzielała pęcherzyki tlenu, a w ciemności nie wydzielała ich wcale.', poprawna: true },
          { tekst: 'W obu próbach pęcherzyków było tyle samo.', wyjasnienie: 'Porównaj liczby w tabeli wyników.' },
          { tekst: 'W ciemności pęcherzyków było więcej.', wyjasnienie: 'W ciemności nie było ani jednego pęcherzyka tlenu.' },
        ],
        wyjasnienie: 'W ciemności nie powstaje tlen, bo nie zachodzi fotosynteza.',
        karta: 'swiatlo',
      },
      {
        pytanie: 'Jaki wniosek wynika z doświadczenia?',
        opcje: [
          { tekst: 'Światło jest niezbędne do fotosyntezy.', poprawna: true },
          { tekst: 'Woda gazowana zwiększa intensywność fotosyntezy.', wyjasnienie: 'To prawda, ale tego doświadczenie nie sprawdzało: w obu próbach była taka sama woda.' },
          { tekst: 'Fotosynteza zachodzi tylko w ciemności.', wyjasnienie: 'Pęcherzyki tlenu pojawiły się tylko w próbie w świetle.' },
        ],
        wyjasnienie: 'Próby różniły się tylko światłem, więc to brak światła zatrzymał fotosyntezę.',
        karta: 'fotosynteza',
      },
    ],
    wyjasnienie:
      'W dobrze zaplanowanym doświadczeniu próby różnią się tylko badanym czynnikiem: jedna gałązka stoi w świetle, druga w ciemności, a pozostałe warunki są identyczne. W ciemności nie ma pęcherzyków tlenu, więc światło jest niezbędne do fotosyntezy.',
    zrodlo: '2.4',
  },
  {
    id: 's4-dosw-co2-1',
    swiat: 4,
    typ: 'doswiadczenie',
    tresc: 'Doświadczenie z moczarką: co pokazują pęcherzyki tlenu?',
    scena: 'moczarka-co2',
    opis:
      'Dwie gałązki moczarki kanadyjskiej tej samej wielkości włożono do dwóch szklanek: A z wodą gazowaną, w której jest więcej dwutlenku węgla, i B z wodą z kranu. Obie szklanki postawiono na parapecie i przez minutę liczono pęcherzyki tlenu wydzielane przez gałązki.',
    wyniki: {
      kolumny: ['Szklanka', 'Pęcherzyki tlenu w ciągu minuty'],
      wiersze: [
        ['A: woda gazowana', '24'],
        ['B: woda z kranu', '9'],
      ],
    },
    kroki: [
      {
        pytanie: 'Jaki problem badawczy sprawdza to doświadczenie?',
        opcje: [
          { tekst: 'Czy większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy?', poprawna: true },
          { tekst: 'Czy moczarka potrzebuje światła?', wyjasnienie: 'Obie szklanki stały w świetle, więc tego doświadczenie nie sprawdza.' },
          { tekst: 'Czy moczarka wydziela dwutlenek węgla?', wyjasnienie: 'Liczono pęcherzyki tlenu, który powstaje w fotosyntezie.' },
        ],
        wyjasnienie: 'Próby różnią się tylko ilością dwutlenku węgla w wodzie.',
        karta: 'intensywnosc-fotosyntezy',
      },
      {
        pytanie: 'Która szklanka to próba badawcza?',
        kolejnosc: 'stala',
        opcje: [
          { tekst: 'A: woda gazowana', poprawna: true },
          { tekst: 'B: woda z kranu', wyjasnienie: 'W szklance B nie zmieniono badanego czynnika. To punkt odniesienia, czyli próba kontrolna.' },
        ],
        wyjasnienie: 'W próbie badawczej zmienia się badany czynnik: w wodzie gazowanej jest więcej dwutlenku węgla.',
        karta: 'proba-badawcza',
      },
      {
        pytanie: 'Która szklanka to próba kontrolna?',
        kolejnosc: 'stala',
        opcje: [
          { tekst: 'A: woda gazowana', wyjasnienie: 'W szklance A zmieniono badany czynnik, więc to próba badawcza.' },
          { tekst: 'B: woda z kranu', poprawna: true },
        ],
        wyjasnienie: 'Próba kontrolna jest punktem odniesienia: bez niej nie byłoby wiadomo, czy różnicę spowodował dwutlenek węgla.',
        karta: 'proba-kontrolna',
      },
      {
        pytanie: 'Jaki gaz tworzy pęcherzyki wydzielane przez gałązki?',
        opcje: [
          { tekst: 'tlen', poprawna: true },
          { tekst: 'dwutlenek węgla', wyjasnienie: 'Dwutlenek węgla jest potrzebny do fotosyntezy. Z gałązek uchodzi tlen, który w niej powstaje.' },
        ],
        wyjasnienie: 'Pęcherzyki to tlen powstający w fotosyntezie.',
        karta: 'tlen',
      },
      {
        pytanie: 'Jaki wniosek wynika z wyników?',
        opcje: [
          { tekst: 'Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy.', poprawna: true },
          { tekst: 'Woda z kranu zwiększa intensywność fotosyntezy.', wyjasnienie: 'W wodzie z kranu pęcherzyków było mniej.' },
          { tekst: 'Fotosynteza zachodzi tylko w wodzie gazowanej.', wyjasnienie: 'Gałązka w wodzie z kranu też wydzielała pęcherzyki, tylko mniej.' },
        ],
        wyjasnienie: 'W wodzie gazowanej pęcherzyków jest więcej, więc fotosynteza jest intensywniejsza.',
        karta: 'dwutlenek-wegla',
      },
    ],
    wyjasnienie: 'Woda gazowana to próba badawcza, a woda z kranu próba kontrolna. Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-dosw-swiatlo-1',
    swiat: 4,
    typ: 'doswiadczenie',
    tresc: 'Czy roślina potrzebuje światła? Odczytaj doświadczenie.',
    scena: 'moczarka-swiatlo',
    opis:
      'Dwie takie same gałązki moczarki kanadyjskiej włożono do szklanek z taką samą wodą. Szklankę A postawiono w świetle, a szklankę B w ciemnej szafce. Pozostałe warunki były identyczne. Przez minutę liczono pęcherzyki tlenu.',
    wyniki: {
      kolumny: ['Szklanka', 'Pęcherzyki tlenu w ciągu minuty'],
      wiersze: [
        ['A: w świetle', '15'],
        ['B: w ciemnej szafce', '0'],
      ],
    },
    kroki: [
      {
        pytanie: 'Jaki problem badawczy sprawdza to doświadczenie?',
        opcje: [
          { tekst: 'Czy światło jest niezbędne do fotosyntezy?', poprawna: true },
          { tekst: 'Czy dwutlenek węgla zwiększa intensywność fotosyntezy?', wyjasnienie: 'Woda w obu szklankach była taka sama, więc tego doświadczenie nie sprawdza.' },
          { tekst: 'Czy moczarka rośnie szybciej w szafce?', wyjasnienie: 'Liczono pęcherzyki tlenu w ciągu minuty, a nie wzrost rośliny.' },
        ],
        wyjasnienie: 'Próby różnią się tylko dostępem do światła.',
        karta: 'swiatlo',
      },
      {
        pytanie: 'Czym różnią się próby?',
        opcje: [
          { tekst: 'tylko dostępem do światła', poprawna: true },
          { tekst: 'rodzajem wody i dostępem do światła', wyjasnienie: 'Woda w obu szklankach była taka sama.' },
          { tekst: 'niczym', wyjasnienie: 'Szklanka B stała w ciemnej szafce.' },
        ],
        wyjasnienie: 'Próby różnią się jednym czynnikiem, więc wiadomo, co spowodowało różnicę w wynikach.',
        karta: 'proba-badawcza',
      },
      {
        pytanie: 'Dlaczego w szklance B nie ma pęcherzyków tlenu?',
        opcje: [
          { tekst: 'Bez światła fotosynteza nie zachodzi, więc nie powstaje tlen.', poprawna: true },
          { tekst: 'Woda w szafce była zimniejsza.', wyjasnienie: 'Pozostałe warunki, także temperatura, były identyczne.' },
          { tekst: 'Gałązka w szafce była mniejsza.', wyjasnienie: 'Gałązki były takie same.' },
        ],
        wyjasnienie: 'Światło dostarcza energii do fotosyntezy. W ciemności fotosynteza nie zachodzi.',
        karta: 'fotosynteza',
      },
      {
        pytanie: 'Jaki wniosek wynika z doświadczenia?',
        opcje: [
          { tekst: 'Światło jest niezbędne do fotosyntezy.', poprawna: true },
          { tekst: 'Ciemność zwiększa intensywność fotosyntezy.', wyjasnienie: 'W ciemności nie było ani jednego pęcherzyka tlenu.' },
          { tekst: 'Woda jest niezbędna do fotosyntezy.', wyjasnienie: 'To prawda, ale tego doświadczenie nie sprawdzało: obie gałązki były w wodzie.' },
        ],
        wyjasnienie: 'Gałązka w świetle wydzielała tlen, a w ciemności nie: światło jest niezbędne do fotosyntezy.',
        karta: 'swiatlo',
      },
    ],
    wyjasnienie: 'Próby różnią się tylko światłem, a pozostałe warunki są identyczne. W ciemności nie ma pęcherzyków tlenu, więc światło jest niezbędne do fotosyntezy.',
    zrodlo: '2.4',
  },

  // ---------- Misja „Samożywni” ----------
  {
    id: 's4-samozywni-klas',
    swiat: 4,
    typ: 'klasyfikacja',
    tresc: 'Kto sam wytwarza pokarm? Przyporządkuj organizmy samożywne do grup.',
    kategorie: [
      { id: 'rosliny', nazwa: 'rośliny' },
      { id: 'protisty', nazwa: 'protisty' },
      { id: 'bakterie', nazwa: 'bakterie' },
    ],
    elementy: [
      { tekst: 'moczarka kanadyjska', kategoria: 'rosliny', karta: 'moczarka-kanadyjska', wyjasnienie: 'Moczarka kanadyjska to roślina.' },
      { tekst: 'rosiczka', kategoria: 'rosliny', karta: 'rosiczka', wyjasnienie: 'Rosiczka to roślina samożywna, która chwyta owady.' },
      { tekst: 'słonecznik', kategoria: 'rosliny', karta: 'slonecznik', wyjasnienie: 'Słonecznik to roślina.' },
      { tekst: 'ziemniak', kategoria: 'rosliny', karta: 'ziemniak', wyjasnienie: 'Ziemniak to roślina.' },
      { tekst: 'brunatnice', kategoria: 'protisty', karta: 'brunatnice', wyjasnienie: 'Brunatnice to wielkie wodorosty należące do protistów.' },
      { tekst: 'sinice', kategoria: 'bakterie', karta: 'sinice', wyjasnienie: 'Sinice to bakterie samożywne.' },
      { tekst: 'bakterie z dna oceanu', kategoria: 'bakterie', karta: 'bakterie-z-dna-oceanu', wyjasnienie: 'To bakterie, które wytwarzają pokarm w chemosyntezie.' },
    ],
    wyjasnienie: 'Do organizmów samożywnych należą rośliny (większość z nich), niektóre protisty, np. brunatnice, i nieliczne bakterie, np. sinice.',
    zrodlo: '2.4',
  },
  {
    id: 's4-dno-1',
    swiat: 4,
    typ: 'doswiadczenie',
    tresc: 'Wyprawa na dno oceanu: jak żyć bez światła?',
    scena: 'dno-oceanu',
    opis:
      'Na dnie oceanu, przy źródłach gorącej wody zawierającej gazy wulkaniczne, panuje ciemność. Żyją tam bakterie, które same wytwarzają pokarm.',
    ciekawostka:
      'W 1977 roku na dnie oceanu odkryto wokół gorących źródeł bogate życie: małże, kraby i olbrzymie robaki w rurkach, długie nawet na 2 metry, bez ust i jelit, karmione przez bakterie przeprowadzające chemosyntezę.',
    kroki: [
      {
        pytanie: 'Jak nazywa się wytwarzanie pokarmu przez te bakterie?',
        opcje: [
          { tekst: 'chemosynteza', poprawna: true },
          { tekst: 'fotosynteza', wyjasnienie: 'Fotosynteza wymaga światła, a na dnie oceanu panuje ciemność.' },
        ],
        wyjasnienie: 'Chemosynteza to wytwarzanie pokarmu przez niektóre bakterie z wykorzystaniem energii chemicznej, bez światła.',
        karta: 'chemosynteza',
      },
      {
        pytanie: 'Z jakiej energii korzystają te bakterie, gdy wytwarzają pokarm?',
        opcje: [
          { tekst: 'z energii chemicznej', poprawna: true },
          { tekst: 'z energii świetlnej', wyjasnienie: 'Energię świetlną wykorzystuje fotosynteza, a te bakterie żyją w ciemności.' },
        ],
        wyjasnienie: 'Bakterie z dna oceanu wykorzystują energię chemiczną.',
        karta: 'bakterie-z-dna-oceanu',
      },
      {
        pytanie: 'Do jakiej grupy należą te bakterie?',
        opcje: [
          { tekst: 'do organizmów samożywnych', poprawna: true },
          { tekst: 'do organizmów cudzożywnych', wyjasnienie: 'Te bakterie same wytwarzają pokarm, a nie pobierają gotowego z otoczenia.' },
        ],
        wyjasnienie: 'Organizm samożywny sam wytwarza pokarm, nawet jeśli robi to bez światła.',
        karta: 'organizm-samozywny',
      },
    ],
    wyjasnienie: 'Niektóre samożywne bakterie wytwarzają pokarm bez udziału światła, wykorzystując energię chemiczną. Ten proces to chemosynteza.',
    zrodlo: '2.4',
  },
  {
    id: 's4-pf-samozywne-1',
    swiat: 4,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw fałszywe zdania.',
    zdania: [
      {
        tekst: 'Rosiczka jest organizmem samożywnym.',
        prawda: true,
        karta: 'rosiczka',
        wyjasnienie: 'Rosiczka sama wytwarza pokarm, a z chwytanych owadów pobiera azot.',
      },
      {
        tekst: 'Organizmy samożywne to wyłącznie rośliny.',
        prawda: false,
        karta: 'organizm-samozywny',
        poprawne: 'Do organizmów samożywnych należą rośliny, niektóre protisty i nieliczne bakterie.',
        bledne: ['Organizmy samożywne to wyłącznie bakterie.', 'Do organizmów samożywnych należą rośliny i wszystkie zwierzęta.'],
        wyjasnienie: 'Samożywne są też np. brunatnice (protisty) i sinice (bakterie).',
      },
      {
        tekst: 'Fotosynteza zachodzi głównie w korzeniach.',
        prawda: false,
        karta: 'fotosynteza',
        poprawne: 'Fotosynteza zachodzi głównie w liściach, w chloroplastach.',
        bledne: ['Fotosynteza zachodzi głównie w korzeniach, w chloroplastach.', 'Fotosynteza zachodzi głównie w liściach, w mitochondriach.'],
        wyjasnienie: 'Korzenie pobierają wodę z gleby, a fotosynteza zachodzi głównie w liściach, w chloroplastach.',
      },
      {
        tekst: 'Chemosynteza wymaga światła.',
        prawda: false,
        karta: 'chemosynteza',
        poprawne: 'Chemosynteza zachodzi bez udziału światła, z wykorzystaniem energii chemicznej.',
        bledne: ['Chemosynteza wykorzystuje energię świetlną.', 'Chemosynteza zachodzi tylko w chloroplastach roślin.'],
        wyjasnienie: 'Chemosyntezę przeprowadzają niektóre bakterie, np. na dnie oceanu.',
      },
      {
        tekst: 'Sinice to bakterie samożywne.',
        prawda: true,
        karta: 'sinice',
        wyjasnienie: 'Sinice przeprowadzają fotosyntezę, choć nie mają chloroplastów.',
      },
    ],
    wyjasnienie: 'Samożywne są rośliny, niektóre protisty i nieliczne bakterie. Fotosynteza zachodzi głównie w liściach, a chemosynteza bez światła.',
    zrodlo: '2.4',
  },
  {
    id: 's4-luki-odzywianie-1',
    swiat: 4,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o odżywianiu się.',
    tekst:
      'Odżywianie się to dostarczanie organizmowi substancji, które [budują|odzywianie-sie|Z tych substancji powstaje ciało organizmu.] jego ciało i są dla niego źródłem [energii|odzywianie-sie]. Organizmy [samożywne|organizm-samozywny] same wytwarzają pokarm. Większość z nich to [rośliny|organizm-samozywny].',
    dystraktory: [
      { tekst: 'bakterie', wyjasnienie: 'Samożywne są tylko nieliczne bakterie, np. sinice. Większość organizmów samożywnych to rośliny.' },
      { tekst: 'tlenu', wyjasnienie: 'Tlen powstaje w fotosyntezie. Źródłem energii są substancje pokarmowe.' },
    ],
    wyjasnienie: 'Odżywianie się to dostarczanie substancji, które budują ciało i są źródłem energii. Organizmy samożywne same wytwarzają pokarm; większość z nich to rośliny.',
    zrodlo: '2.4',
  },

  // ---------- Misja „Dno oceanu” ---------- (zadanie s4-dno-1 wyżej)

  // ---------- Pule bossa ----------
  {
    id: 's4-boss-podpis-lisc-1',
    swiat: 4,
    typ: 'podpisywanie',
    tresc: 'Podpisz schemat fotosyntezy w liściu.',
    schemat: 'fotosynteza-lisc',
    punkty: ['swiatlo', 'tlen', 'chloroplast', 'pokarm', 'woda', 'co2'],
    dystraktory: [{ karta: 'mitochondrium', wyjasnienie: 'Mitochondria dostarczają komórce energii, a fotosynteza zachodzi w chloroplastach.' }],
    wyjasnienie: 'Fotosynteza zachodzi w chloroplastach. Dwutlenek węgla wnika z powietrza, woda dopływa przez komórki przewodzące, a powstają substancje pokarmowe i tlen.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-podpis-lisc-2',
    swiat: 4,
    typ: 'podpisywanie',
    tresc: 'Podpisz schemat fotosyntezy: co wchodzi do liścia, a co z niego wychodzi?',
    schemat: 'fotosynteza-lisc',
    punkty: ['swiatlo', 'tlen', 'pokarm', 'woda', 'co2'],
    wyjasnienie: 'Do liścia docierają dwutlenek węgla, woda i światło. Z liścia wychodzą tlen (do atmosfery) i substancje pokarmowe (do wszystkich komórek rośliny).',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-podpis-roslina-2',
    swiat: 4,
    typ: 'podpisywanie',
    tresc: 'Podpisz substancje na schemacie fotosyntezy.',
    schemat: 'fotosynteza-roslina',
    punkty: ['tlen', 'pokarm', 'woda', 'co2'],
    wyjasnienie: 'Substraty fotosyntezy to dwutlenek węgla i woda, a produkty to substancje pokarmowe i tlen.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-luki-zapis-2',
    swiat: 4,
    typ: 'luki',
    tresc: 'Uzupełnij zapis słowny fotosyntezy.',
    tekst: 'dwutlenek węgla + [woda|woda] → (światło, [chlorofil|chlorofil]) → [substancje pokarmowe|substancje-pokarmowe] + tlen',
    dystraktory: [
      { tekst: 'sole mineralne', wyjasnienie: 'Sole mineralne wpływają na intensywność fotosyntezy, ale nie ma ich w jej zapisie słownym.' },
      { tekst: 'mitochondria', wyjasnienie: 'Mitochondria dostarczają komórce energii. W zapisie fotosyntezy nad strzałką stoją światło i chlorofil.' },
    ],
    wyjasnienie: 'Zapis słowny fotosyntezy: dwutlenek węgla + woda → (światło, chlorofil) → substancje pokarmowe + tlen.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-klas-zapis-1',
    swiat: 4,
    typ: 'klasyfikacja',
    tresc: 'Co jest potrzebne do fotosyntezy, a co w niej powstaje?',
    kategorie: [
      { id: 'potrzebne', nazwa: 'potrzebne do fotosyntezy' },
      { id: 'powstaje', nazwa: 'powstaje w fotosyntezie', karta: 'fotosynteza' },
    ],
    elementy: [
      { tekst: 'dwutlenek węgla', kategoria: 'potrzebne', karta: 'dwutlenek-wegla', wyjasnienie: 'Dwutlenek węgla wnika do liści z powietrza i jest potrzebny do fotosyntezy.' },
      { tekst: 'woda', kategoria: 'potrzebne', karta: 'woda', wyjasnienie: 'Wodę pobierają z gleby korzenie; jest potrzebna do fotosyntezy.' },
      { tekst: 'światło', kategoria: 'potrzebne', karta: 'swiatlo', wyjasnienie: 'Światło dostarcza energii; pochłania je chlorofil.' },
      { tekst: 'substancje pokarmowe', kategoria: 'powstaje', karta: 'substancje-pokarmowe', wyjasnienie: 'Substancje pokarmowe powstają w fotosyntezie.' },
      { tekst: 'glukoza', kategoria: 'powstaje', karta: 'glukoza', wyjasnienie: 'Glukoza to główna substancja pokarmowa powstająca w fotosyntezie.' },
      { tekst: 'tlen', kategoria: 'powstaje', karta: 'tlen', wyjasnienie: 'Tlen powstaje w fotosyntezie i trafia do atmosfery.' },
    ],
    wyjasnienie: 'Do fotosyntezy potrzebne są dwutlenek węgla, woda i światło; powstają substancje pokarmowe (głównie glukoza) i tlen.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-drogi-klas-1',
    swiat: 4,
    typ: 'klasyfikacja',
    tresc: 'Jak roślina wykorzystuje substancje pokarmowe? Przyporządkuj przykłady.',
    kategorie: DROGI,
    elementy: [
      { tekst: 'ruch kwiatów słonecznika w stronę słońca', kategoria: 'energia', karta: 'slonecznik', wyjasnienie: 'Na ruch roślina zużywa energię z substancji pokarmowych.' },
      { tekst: 'wzrost nowych liści', kategoria: 'budowa', wyjasnienie: 'Nowe liście to budowa ciała w czasie wzrostu i rozwoju.' },
      { tekst: 'owoce truskawki', kategoria: 'budowa', karta: 'truskawka', wyjasnienie: 'Z substancji pokarmowych truskawka buduje owoce.' },
      { tekst: 'skrobia w bulwach ziemniaka', kategoria: 'zapas', karta: 'ziemniak', wyjasnienie: 'Skrobia w bulwach ziemniaka to materiał zapasowy.' },
      { tekst: 'zapasy na niekorzystne warunki', kategoria: 'zapas', wyjasnienie: 'Materiał zapasowy pomaga roślinie przetrwać niekorzystne warunki.' },
    ],
    wyjasnienie: 'Substancje pokarmowe są dla rośliny źródłem energii, materiałem do budowy ciała i materiałem zapasowym.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-pf-drogi-1',
    swiat: 4,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Roślina wykorzystuje substancje pokarmowe jako źródło energii, do budowy ciała i jako materiał zapasowy.',
        prawda: true,
        karta: 'substancje-pokarmowe',
        wyjasnienie: 'To trzy sposoby wykorzystania substancji pokarmowych przez roślinę.',
      },
      {
        tekst: 'Skrobia w bulwach ziemniaka służy do ruchu kwiatów słonecznika.',
        prawda: false,
        karta: 'ziemniak',
        poprawne: 'Skrobia w bulwach ziemniaka to materiał zapasowy.',
        bledne: ['Skrobia w bulwach ziemniaka to źródło azotu.', 'Skrobia w bulwach ziemniaka powstaje z tlenu.'],
        wyjasnienie: 'Ziemniak gromadzi skrobię w bulwach jako materiał zapasowy.',
      },
      {
        tekst: 'Ruch kwiatów słonecznika w stronę słońca wymaga energii.',
        prawda: true,
        karta: 'slonecznik',
        wyjasnienie: 'Energii dostarczają substancje pokarmowe.',
      },
      {
        tekst: 'Substancje pokarmowe zostają tylko w liściach, w których powstały.',
        prawda: false,
        karta: 'substancje-pokarmowe',
        poprawne: 'Substancje pokarmowe są transportowane do wszystkich komórek rośliny.',
        bledne: ['Substancje pokarmowe są transportowane tylko do korzeni.', 'Substancje pokarmowe trafiają do atmosfery.'],
        wyjasnienie: 'Do atmosfery trafia tlen, a substancje pokarmowe docierają do wszystkich komórek rośliny.',
      },
      {
        tekst: 'Materiał zapasowy pomaga roślinie przetrwać niekorzystne warunki.',
        prawda: true,
        karta: 'ziemniak',
        wyjasnienie: 'Umożliwia też wiosną rozwój nowych pędów.',
      },
    ],
    wyjasnienie: 'Roślina wykorzystuje substancje pokarmowe jako źródło energii, do budowy ciała i jako materiał zapasowy; substancje pokarmowe docierają do wszystkich jej komórek.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-dosw-co2-2',
    swiat: 4,
    typ: 'doswiadczenie',
    tresc: 'Uczniowie powtórzyli doświadczenie z moczarką trzy razy. Odczytaj wyniki.',
    scena: 'moczarka-co2',
    opis:
      'Dwie takie same gałązki moczarki kanadyjskiej postawiono na parapecie: w szklance A z wodą gazowaną i w szklance B z wodą z kranu. Trzy razy liczono pęcherzyki tlenu wydzielane w ciągu minuty.',
    wyniki: {
      kolumny: ['Szklanka', 'Pomiar 1', 'Pomiar 2', 'Pomiar 3'],
      wiersze: [
        ['A: woda gazowana', '22', '25', '23'],
        ['B: woda z kranu', '8', '10', '9'],
      ],
    },
    kroki: [
      {
        pytanie: 'Czym różnią się próby?',
        opcje: [
          { tekst: 'ilością dwutlenku węgla w wodzie', poprawna: true },
          { tekst: 'ilością światła', wyjasnienie: 'Obie szklanki stały na tym samym parapecie.' },
          { tekst: 'wielkością gałązek', wyjasnienie: 'Gałązki były takie same.' },
        ],
        wyjasnienie: 'W wodzie gazowanej jest więcej dwutlenku węgla niż w wodzie z kranu.',
        karta: 'dwutlenek-wegla',
      },
      {
        pytanie: 'Która szklanka to próba kontrolna?',
        kolejnosc: 'stala',
        opcje: [
          { tekst: 'A: woda gazowana', wyjasnienie: 'W szklance A zmieniono badany czynnik, więc to próba badawcza.' },
          { tekst: 'B: woda z kranu', poprawna: true },
        ],
        wyjasnienie: 'Próba kontrolna to punkt odniesienia: nie zmienia się w niej badanego czynnika.',
        karta: 'proba-kontrolna',
      },
      {
        pytanie: 'Jak zmieni się liczba pęcherzyków w szklance B, gdy wodę z kranu zastąpimy wodą gazowaną?',
        opcje: [
          { tekst: 'Wzrośnie.', poprawna: true },
          { tekst: 'Zmaleje.', wyjasnienie: 'Więcej dwutlenku węgla zwiększa intensywność fotosyntezy.' },
          { tekst: 'Spadnie do zera.', wyjasnienie: 'Gałązka nadal ma światło i dwutlenek węgla, więc fotosynteza zachodzi.' },
        ],
        wyjasnienie: 'Gałązka w wodzie gazowanej wydziela więcej pęcherzyków tlenu.',
        karta: 'intensywnosc-fotosyntezy',
      },
      {
        pytanie: 'Jaki wniosek wynika z doświadczenia?',
        opcje: [
          { tekst: 'Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy.', poprawna: true },
          { tekst: 'Większe stężenie dwutlenku węgla zmniejsza intensywność fotosyntezy.', wyjasnienie: 'W wodzie gazowanej pęcherzyków było więcej, nie mniej.' },
          { tekst: 'Dwutlenek węgla nie wpływa na fotosyntezę.', wyjasnienie: 'Liczby pęcherzyków w szklankach wyraźnie się różnią.' },
        ],
        wyjasnienie: 'We wszystkich pomiarach w wodzie gazowanej pęcherzyków było więcej.',
        karta: 'intensywnosc-fotosyntezy',
      },
    ],
    wyjasnienie: 'Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy. Szklanka z wodą z kranu to próba kontrolna.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-luki-co2-1',
    swiat: 4,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o dwutlenku węgla i fotosyntezie.',
    tekst:
      'W szklarniach sztucznie [zwiększa|intensywnosc-fotosyntezy] się stężenie dwutlenku węgla, bo wtedy fotosynteza jest [intensywniejsza|intensywnosc-fotosyntezy]. W doświadczeniu z moczarką gałązka w wodzie [gazowanej|proba-badawcza] wydzielała więcej pęcherzyków [tlenu|tlen] niż gałązka w wodzie z kranu.',
    dystraktory: [
      { tekst: 'zmniejsza', wyjasnienie: 'Mniej dwutlenku węgla zmniejsza intensywność fotosyntezy, a ogrodnikom zależy na szybkim wzroście roślin.' },
      { tekst: 'dwutlenku węgla', wyjasnienie: 'Gałązki wydzielają tlen, który powstaje w fotosyntezie.' },
    ],
    wyjasnienie: 'Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy: dlatego w szklarniach się je zwiększa, a gałązka w wodzie gazowanej wydziela więcej tlenu.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-pf-co2-1',
    swiat: 4,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'W szklarniach sztucznie zwiększa się stężenie dwutlenku węgla.',
        prawda: true,
        karta: 'dwutlenek-wegla',
        wyjasnienie: 'Dzięki temu fotosynteza jest intensywniejsza, a rośliny rosną szybciej.',
      },
      {
        tekst: 'W doświadczeniu z moczarką próbą kontrolną jest szklanka z wodą gazowaną.',
        prawda: false,
        karta: 'proba-kontrolna',
        poprawne: 'W doświadczeniu z moczarką próbą kontrolną jest szklanka z wodą z kranu.',
        bledne: ['W doświadczeniu z moczarką próbą kontrolną jest szklanka bez gałązki.', 'W doświadczeniu z moczarką nie ma próby kontrolnej.'],
        wyjasnienie: 'Woda gazowana to próba badawcza, bo zmieniono w niej badany czynnik: ilość dwutlenku węgla.',
      },
      {
        tekst: 'Pęcherzyki wydzielane przez gałązkę moczarki to dwutlenek węgla.',
        prawda: false,
        karta: 'tlen',
        poprawne: 'Pęcherzyki wydzielane przez gałązkę moczarki to tlen.',
        bledne: ['Pęcherzyki wydzielane przez gałązkę moczarki to woda.', 'Pęcherzyki wydzielane przez gałązkę moczarki to chlorofil.'],
        wyjasnienie: 'Gałązka wydziela tlen, który powstaje w fotosyntezie.',
      },
      {
        tekst: 'Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy.',
        prawda: true,
        karta: 'intensywnosc-fotosyntezy',
        wyjasnienie: 'Pokazuje to doświadczenie z moczarką w wodzie gazowanej.',
      },
      {
        tekst: 'Próba kontrolna jest punktem odniesienia dla próby badawczej.',
        prawda: true,
        karta: 'proba-kontrolna',
        wyjasnienie: 'Bez próby kontrolnej nie byłoby wiadomo, czy różnicę spowodował badany czynnik.',
      },
    ],
    wyjasnienie: 'Większe stężenie dwutlenku węgla zwiększa intensywność fotosyntezy. W doświadczeniu z moczarką woda z kranu to próba kontrolna.',
    zrodlo: '2.4',
  },
  {
    id: 's4-boss-pf-1',
    swiat: 4,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Fotosynteza zachodzi głównie w liściach, w chloroplastach.',
        prawda: true,
        karta: 'fotosynteza',
        wyjasnienie: 'Komórki liści są pełne chloroplastów z chlorofilem.',
      },
      {
        tekst: 'Dwutlenek węgla roślina pobiera z gleby przez korzenie.',
        prawda: false,
        karta: 'dwutlenek-wegla',
        poprawne: 'Dwutlenek węgla wnika do liści z powietrza przez aparaty szparkowe.',
        bledne: ['Dwutlenek węgla roślina pobiera z gleby przez włośniki.', 'Dwutlenek węgla roślina wytwarza w chloroplastach.'],
        wyjasnienie: 'Z gleby korzenie pobierają wodę, a dwutlenek węgla pochodzi z powietrza.',
      },
      {
        tekst: 'Światło pochłania chlorofil.',
        prawda: true,
        karta: 'chlorofil',
        wyjasnienie: 'Chlorofil to zielony barwnik zawarty w chloroplastach.',
      },
      {
        tekst: 'Rosiczka jest organizmem cudzożywnym, bo chwyta owady.',
        prawda: false,
        karta: 'rosiczka',
        poprawne: 'Rosiczka jest organizmem samożywnym, choć chwyta owady i pobiera z nich azot.',
        bledne: ['Rosiczka jest organizmem cudzożywnym i nie przeprowadza fotosyntezy.', 'Rosiczka pobiera z owadów tlen.'],
        wyjasnienie: 'Rosiczka sama wytwarza pokarm; z owadów pobiera azot.',
      },
      {
        tekst: 'Tlen powstający w fotosyntezie trafia do atmosfery.',
        prawda: true,
        karta: 'tlen',
        wyjasnienie: 'Tlen jest produktem fotosyntezy.',
      },
    ],
    wyjasnienie: 'Fotosynteza zachodzi głównie w liściach, w chloroplastach; dwutlenek węgla pochodzi z powietrza, a tlen trafia do atmosfery.',
    zrodlo: '2.4',
  },
];

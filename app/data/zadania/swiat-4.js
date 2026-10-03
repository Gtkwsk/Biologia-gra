// Zadania świata 4: „Kuchnia zasilana światłem” (TRESCI.md, sekcja 2.4).
//
// Typy zadań i pola: SPEC.md, sekcja 5; opis pól przy komponentach w js/components.
// karta: id karty atlasu (pojęcie, proces, substancja, organizm, element komórki).
// Zadania z przedrostkiem s4-boss- należą tylko do puli bossa.
// Liczby pęcherzyków w tabelach wyników są przykładowe; kierunek różnicy wynika z TRESCI.md.

const DROGI = [
  { id: 'energia', nazwa: 'źródło energii', karta: 'slonecznik' },
  { id: 'budowa', nazwa: 'budowa ciała', karta: 'truskawka' },
  { id: 'zapas', nazwa: 'materiał zapasowy', karta: 'ziemniak' },
];

export default [
  // ---------- Misja „Przepis kuchenny” ----------
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
      'W fotosyntezie z [dwutlenku węgla|dwutlenek-wegla|Ten gaz wnika do liści z powietrza przez aparaty szparkowe.] i [wody|woda|Tę substancję korzenie pobierają z gleby.], z udziałem energii [świetlnej|swiatlo|Tę energię pochłania chlorofil.], powstają [substancje pokarmowe|substancje-pokarmowe|To głównie glukoza.] i [tlen|tlen|Ten gaz trafia do atmosfery.].',
    dystraktory: [
      { tekst: 'chemicznej', wyjasnienie: 'Energię chemiczną wykorzystują bakterie, które wytwarzają pokarm bez światła, w chemosyntezie.' },
      { tekst: 'tlenu', wyjasnienie: 'Tlen powstaje w fotosyntezie; w zapisie słownym stoi po strzałce.' },
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
    id: 's4-dosw-swiatlo-1',
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
];

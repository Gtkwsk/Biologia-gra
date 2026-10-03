// Zadania świata 6: „Ogień bez płomienia” (TRESCI.md, sekcja 2.6).
//
// Typy zadań i pola: SPEC.md, sekcja 5; opis pól przy komponentach w js/components.
// karta: id karty atlasu (proces, substancja, pojęcie, organizm, element komórki).
// Zadania z przedrostkiem s6-boss- należą tylko do puli bossa.
// Luki: każda luka ma jednoznaczną rolę w zdaniu (bez równorzędnych słów w sąsiednich lukach).

const OW = [
  { id: 'O', nazwa: 'oddychanie komórkowe', skrot: 'O', karta: 'oddychanie-komorkowe' },
  { id: 'W', nazwa: 'wymiana gazowa', skrot: 'W', karta: 'wymiana-gazowa' },
];

const DEF_W = 'Wymiana gazowa to dostarczanie organizmowi tlenu i usuwanie z niego dwutlenku węgla.';
const DEF_O = 'Oddychanie komórkowe to proces zachodzący w każdej żywej komórce: rozkład substancji pokarmowych i uwalnianie zawartej w nich energii.';

// Zdania do sortera O/W (TRESCI.md, sekcja 2.6). Talie składają się z nich po osiem.
const Z = {
  o1: { tekst: 'Zachodzi w każdej żywej komórce.', kategoria: 'O', wyjasnienie: 'Oddychanie komórkowe zachodzi w każdej żywej komórce.' },
  o2: { tekst: 'Polega na rozkładzie substancji pokarmowych.', kategoria: 'O', wyjasnienie: DEF_O },
  o3: { tekst: 'Uwalnia energię zawartą w pokarmie.', kategoria: 'O', wyjasnienie: 'Energię zawartą w pokarmie uwalnia oddychanie komórkowe.' },
  o4: { tekst: 'Zachodzi wewnątrz komórek, m.in. w mitochondriach.', kategoria: 'O', karta: 'mitochondrium', wyjasnienie: 'Oddychanie komórkowe zachodzi w komórkach: główne etapy oddychania tlenowego w mitochondriach, a fermentacja w cytozolu.' },
  o5: { tekst: 'Z udziałem tlenu rozkłada glukozę do dwutlenku węgla i wody.', kategoria: 'O', karta: 'oddychanie-tlenowe', wyjasnienie: 'To oddychanie tlenowe, czyli oddychanie komórkowe z udziałem tlenu. Wymiana gazowa niczego nie rozkłada: dostarcza tlen i usuwa dwutlenek węgla.' },
  o6: { tekst: 'Uwalnia energię potrzebną do wzrostu i rozwoju.', kategoria: 'O', karta: 'energia', wyjasnienie: 'Energię potrzebną m.in. do wzrostu i rozwoju uwalnia oddychanie komórkowe.' },
  o7: { tekst: 'Zachodzi w komórkach mięśni w czasie biegu.', kategoria: 'O', wyjasnienie: 'W komórkach mięśni zachodzi oddychanie komórkowe, które dostarcza im energii.' },
  o8: { tekst: 'W komórkach roślin uwalnia energię w dzień i w nocy.', kategoria: 'O', wyjasnienie: 'Rośliny oddychają cały czas: oddychanie komórkowe zachodzi w ich komórkach w dzień i w nocy.' },
  o9: { tekst: 'U większości organizmów zużywa w komórkach glukozę i tlen.', kategoria: 'O', karta: 'oddychanie-tlenowe', wyjasnienie: 'U większości organizmów oddychanie komórkowe zachodzi z udziałem tlenu: komórki zużywają glukozę i tlen. Wymiana gazowa tylko dostarcza tlen do organizmu.' },
  w1: { tekst: 'Dostarcza organizmowi tlenu.', kategoria: 'W', wyjasnienie: DEF_W },
  w2: { tekst: 'Usuwa z organizmu dwutlenek węgla.', kategoria: 'W', wyjasnienie: DEF_W },
  w3: { tekst: 'U ryb zachodzi przez skrzela.', kategoria: 'W', karta: 'skrzela', wyjasnienie: 'Ryby wymieniają gazy przez skrzela.' },
  w4: { tekst: 'U ssaków zachodzi przez płuca.', kategoria: 'W', karta: 'pluca', wyjasnienie: 'Ssaki wymieniają gazy przez płuca.' },
  w5: { tekst: 'U chełbi modrej zachodzi całą powierzchnią ciała.', kategoria: 'W', karta: 'chelbia-modra', wyjasnienie: 'Niektóre niewielkie zwierzęta, zwłaszcza wodne, np. chełbia modra, wymieniają gazy całą powierzchnią ciała.' },
  w6: { tekst: 'U roślin zachodzi przez aparaty szparkowe.', kategoria: 'W', karta: 'aparat-szparkowy', wyjasnienie: 'Rośliny wymieniają gazy przez aparaty szparkowe, zwykle na spodniej stronie liści.' },
  w7: { tekst: 'Polega na pobieraniu tlenu i usuwaniu dwutlenku węgla.', kategoria: 'W', wyjasnienie: DEF_W },
  w8: { tekst: 'U roślin zachodzi zwykle przez spodnią stronę liści.', kategoria: 'W', karta: 'aparat-szparkowy', wyjasnienie: 'Aparaty szparkowe leżą zwykle na spodniej stronie liści.' },
  w9: { tekst: 'U wielu zwierząt lądowych zachodzi przez płuca.', kategoria: 'W', karta: 'pluca', wyjasnienie: 'Płuca mają ssaki i wiele innych zwierząt lądowych.' },
  w10: { tekst: 'U wielu zwierząt wodnych zachodzi przez skrzela.', kategoria: 'W', karta: 'skrzela', wyjasnienie: 'Skrzela mają ryby i wiele innych zwierząt wodnych.' },
};

const sorterOW = (id, tresc, klucze) => ({
  id,
  swiat: 6,
  typ: 'sorter',
  tresc,
  kategorie: OW,
  zdania: klucze.map((k) => Z[k]),
  wyjasnienie:
    'Oddychanie komórkowe zachodzi w komórkach i uwalnia energię z substancji pokarmowych. Wymiana gazowa to dostarczanie organizmowi tlenu i usuwanie z niego dwutlenku węgla.',
  zrodlo: '2.6',
});

const tabelaPorownawcza = (id, tresc, cechy, dystraktory) => ({
  id,
  swiat: 6,
  typ: 'porownanie',
  tresc,
  cechy,
  dystraktory,
  wyjasnienie:
    'Oddychanie tlenowe wymaga tlenu, zachodzi głównie w mitochondriach, rozkłada glukozę całkowicie i uwalnia dużo energii. Fermentacja nie wymaga tlenu, zachodzi w cytozolu, rozkłada glukozę częściowo i uwalnia mało energii.',
  zrodlo: '2.6',
});

export default [
  // ---------- Misja „Sprint” ----------
  {
    id: 's6-sprint-1',
    swiat: 6,
    typ: 'sprint',
    tresc: 'Trening biegowy: rozgrzewka, szybki bieg i długi finisz. Skąd mięśnie biorą energię na każdym etapie?',
    etapy: [
      {
        tempo: 'trucht',
        polecenie: 'Rozgrzewka: biegnij truchtem.',
        akcja: 'Truchtaj',
        pytania: [
          {
            pytanie: 'Krew dostarcza mięśniom tyle tlenu, ile potrzebują. Jak mięśnie uzyskują teraz energię?',
            opcje: [
              { tekst: 'w oddychaniu tlenowym', poprawna: true },
              { tekst: 'w fermentacji mlekowej', wyjasnienie: 'Fermentacja mlekowa zachodzi w mięśniach wtedy, gdy krew nie dostarcza wystarczającej ilości tlenu.' },
              { tekst: 'w fotosyntezie', wyjasnienie: 'Fotosynteza zachodzi w chloroplastach, a komórki mięśni, jak wszystkie komórki zwierzęce, nie mają chloroplastów.' },
            ],
            wyjasnienie: 'Gdy tlenu wystarcza, komórki uwalniają energię w oddychaniu tlenowym.',
            karta: 'oddychanie-tlenowe',
          },
          {
            pytanie: 'Gdzie w komórkach mięśni zachodzą główne etapy oddychania tlenowego?',
            opcje: [
              { tekst: 'w mitochondriach', poprawna: true },
              { tekst: 'w cytozolu', wyjasnienie: 'W cytozolu zachodzi fermentacja.' },
              { tekst: 'w jądrze komórkowym', wyjasnienie: 'Jądro komórkowe zawiera DNA i kieruje wszystkimi procesami w komórce.' },
            ],
            wyjasnienie: 'Główne etapy oddychania tlenowego zachodzą w mitochondriach.',
            karta: 'mitochondrium',
          },
        ],
      },
      {
        tempo: 'bieg',
        polecenie: 'Przyspiesz: szybki bieg.',
        akcja: 'Biegnij szybciej',
        pytania: [
          {
            pytanie: 'Biegniesz szybciej, a krew wciąż nadąża z dostawą tlenu. Jak nazywa się dostarczanie organizmowi tlenu i usuwanie z niego dwutlenku węgla?',
            opcje: [
              { tekst: 'wymiana gazowa', poprawna: true },
              { tekst: 'oddychanie komórkowe', wyjasnienie: 'Oddychanie komórkowe zachodzi w komórkach mięśni i uwalnia energię z glukozy. Tlen dostarcza, a dwutlenek węgla usuwa wymiana gazowa.' },
              { tekst: 'fermentacja', wyjasnienie: 'Fermentacja to rozkład glukozy bez udziału tlenu.' },
            ],
            wyjasnienie: 'Wymiana gazowa to dostarczanie organizmowi tlenu i usuwanie z niego dwutlenku węgla. Oddychanie komórkowe zachodzi w komórkach i uwalnia energię.',
            karta: 'wymiana-gazowa',
          },
        ],
      },
      {
        tempo: 'sprint',
        polecenie: 'Długi finisz: sprintuj ile sił!',
        akcja: 'Sprintuj',
        pytania: [
          {
            pytanie: 'Wysiłek jest długi i bardzo intensywny: krew nie nadąża z dostawą tlenu. Skąd mięśnie biorą część energii?',
            opcje: [
              { tekst: 'z fermentacji mlekowej', poprawna: true },
              { tekst: 'z fermentacji alkoholowej', wyjasnienie: 'Fermentację alkoholową przeprowadzają np. drożdże. W mięśniach człowieka zachodzi fermentacja mlekowa.' },
              { tekst: 'z wymiany gazowej', wyjasnienie: 'Wymiana gazowa dostarcza tlen i usuwa dwutlenek węgla, ale nie uwalnia energii.' },
            ],
            wyjasnienie: 'Przy niedoborze tlenu w mięśniach szkieletowych zachodzi fermentacja mlekowa.',
            karta: 'fermentacja-mlekowa',
          },
          {
            pytanie: 'Co powstaje z glukozy w fermentacji mlekowej?',
            opcje: [
              { tekst: 'kwas mlekowy', poprawna: true },
              { tekst: 'alkohol etylowy', wyjasnienie: 'Alkohol etylowy powstaje w fermentacji alkoholowej, np. u drożdży.' },
              { tekst: 'dwutlenek węgla i woda', wyjasnienie: 'Dwutlenek węgla i woda powstają w oddychaniu tlenowym.' },
            ],
            wyjasnienie: 'Zapis słowny: glukoza → kwas mlekowy + energia.',
            karta: 'kwas-mlekowy',
          },
        ],
      },
      {
        tempo: 'odpoczynek',
        polecenie: 'Meta! Złap oddech.',
        akcja: 'Odpoczywaj',
        pytania: [
          {
            pytanie: 'Dlaczego fermentacja mlekowa uwalnia znacznie mniej energii niż oddychanie tlenowe?',
            opcje: [
              { tekst: 'Bo glukoza jest w niej rozkładana tylko częściowo.', poprawna: true },
              { tekst: 'Bo zachodzi w mitochondriach.', wyjasnienie: 'Fermentacja zachodzi w cytozolu.' },
              { tekst: 'Bo wymaga dużo tlenu.', wyjasnienie: 'Fermentacja zachodzi bez udziału tlenu.' },
            ],
            wyjasnienie: 'W fermentacji glukoza jest rozkładana tylko częściowo, dlatego uwalnia się znacznie mniej energii niż w oddychaniu tlenowym.',
            karta: 'fermentacja',
          },
        ],
      },
      {
        tempo: 'odpoczynek',
        czas: 'kilkadziesiat-minut',
        polecenie: 'Mija kilkadziesiąt minut odpoczynku.',
        akcja: 'Odpoczywaj dalej',
        pytania: [
          {
            pytanie: 'Kwasu mlekowego w mięśniach już nie ma. Dokąd przeniosła go krew?',
            opcje: [
              { tekst: 'do wątroby, gdzie służy do produkcji glukozy', poprawna: true },
              { tekst: 'do płuc, gdzie zamienia się w tlen', wyjasnienie: 'W płucach zachodzi wymiana gazowa; kwas mlekowy nie zamienia się w tlen.' },
              { tekst: 'do żołądka, gdzie jest trawiony', wyjasnienie: 'Trawienie to rozkład związków z pokarmu, a kwas mlekowy powstaje w mięśniach. Krew przenosi go do wątroby, gdzie służy do produkcji glukozy.' },
            ],
            wyjasnienie: 'W ciągu kilkudziesięciu minut krew przenosi kwas mlekowy z mięśni do wątroby, gdzie służy do produkcji glukozy.',
            karta: 'kwas-mlekowy',
          },
        ],
      },
    ],
    wyjasnienie:
      'Gdy krew dostarcza dość tlenu, mięśnie uzyskują energię w oddychaniu tlenowym. Przy bardzo intensywnym wysiłku część energii daje fermentacja mlekowa: powstaje kwas mlekowy, który krew przenosi potem do wątroby.',
    zrodlo: '2.6',
  },
  {
    id: 's6-przepis-mlekowa-1',
    swiat: 6,
    typ: 'przepis',
    tresc: 'Awaryjna kuchnia w mięśniu: ułóż przepis na fermentację mlekową.',
    procesy: ['fermentacja-mlekowa'],
    garnki: [{ karta: 'fermentacja-mlekowa', podpis: 'cytozol komórki mięśnia szkieletowego' }],
    pola: [
      { id: 'glukoza', substancja: 'glukoza', strefa: 'wejscie' },
      { id: 'p1', substancja: 'kwas-mlekowy', strefa: 'wyjscie' },
      { id: 'p2', substancja: 'energia', strefa: 'wyjscie' },
    ],
    dopasowanie: 'strefa',
    dystraktory: [
      { karta: 'tlen', wyjasnienie: 'Fermentacja mlekowa zachodzi wtedy, gdy brakuje tlenu: to rozkład glukozy bez udziału tlenu.' },
      { karta: 'dwutlenek-wegla', wyjasnienie: 'W fermentacji mlekowej nie powstaje dwutlenek węgla: z glukozy powstaje kwas mlekowy i uwalnia się energia.' },
      { karta: 'alkohol-etylowy', wyjasnienie: 'Alkohol etylowy powstaje w fermentacji alkoholowej, np. u drożdży.' },
    ],
    wyjasnienie: 'Fermentacja mlekowa: glukoza → kwas mlekowy + energia. Zachodzi w cytozolu, bez udziału tlenu, i uwalnia mało energii.',
    zrodlo: '2.6',
  },
  {
    id: 's6-luki-mlekowa-1',
    swiat: 6,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o fermentacji mlekowej w mięśniach.',
    tekst:
      'Przy długiej, bardzo intensywnej pracy krew nie dostarcza mięśniom wystarczającej ilości [tlenu|tlen]. Wtedy w mięśniach szkieletowych zachodzi fermentacja [mlekowa|fermentacja-mlekowa], w której z glukozy powstaje [kwas mlekowy|kwas-mlekowy]. W ciągu kilkudziesięciu minut krew przenosi go do [wątroby|kwas-mlekowy|Ten narząd wytwarza z kwasu mlekowego glukozę.], gdzie służy do produkcji [glukozy|glukoza].',
    dystraktory: [
      { tekst: 'alkoholowa', wyjasnienie: 'Fermentację alkoholową przeprowadzają np. drożdże.' },
      { tekst: 'płuc', wyjasnienie: 'W płucach zachodzi wymiana gazowa, a kwas mlekowy krew przenosi do wątroby.' },
    ],
    wyjasnienie: 'Przy niedoborze tlenu w mięśniach szkieletowych zachodzi fermentacja mlekowa. Powstały kwas mlekowy krew przenosi do wątroby, gdzie służy do produkcji glukozy.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Oddychanie czy wymiana gazowa?” ----------
  sorterOW('s6-sorter-ow-1', 'Oddychanie komórkowe (O) czy wymiana gazowa (W)? Rozdziel zdania.', ['o1', 'o2', 'o3', 'o4', 'w1', 'w2', 'w3', 'w6']),
  {
    id: 's6-wymiana-klas-1',
    swiat: 6,
    typ: 'klasyfikacja',
    tresc: 'Jak wymieniają gazy? Przyporządkuj organizmy do grup.',
    kategorie: [
      { id: 'powierzchnia', nazwa: 'całą powierzchnią ciała' },
      { id: 'skrzela', nazwa: 'przez skrzela', karta: 'skrzela' },
      { id: 'pluca', nazwa: 'przez płuca', karta: 'pluca' },
      { id: 'aparaty', nazwa: 'przez aparaty szparkowe', karta: 'aparat-szparkowy' },
    ],
    elementy: [
      { tekst: 'chełbia modra', kategoria: 'powierzchnia', karta: 'chelbia-modra', wyjasnienie: 'Chełbia modra to niewielkie zwierzę wodne: wymienia gazy całą powierzchnią ciała.' },
      { tekst: 'ryba', kategoria: 'skrzela', karta: 'ryba', wyjasnienie: 'Ryby wymieniają gazy przez skrzela.' },
      { tekst: 'kot (ssak)', kategoria: 'pluca', karta: 'kot', wyjasnienie: 'Ssaki, np. kot, wymieniają gazy przez płuca.' },
      { tekst: 'człowiek (ssak)', kategoria: 'pluca', wyjasnienie: 'Człowiek jest ssakiem, a ssaki wymieniają gazy przez płuca.' },
      { tekst: 'tulipan', kategoria: 'aparaty', karta: 'tulipan', wyjasnienie: 'Rośliny, np. tulipan, wymieniają gazy przez aparaty szparkowe, zwykle na spodniej stronie liści.' },
    ],
    wyjasnienie: 'Wymiana gazowa zachodzi całą powierzchnią ciała (np. chełbia modra), przez skrzela (np. ryby), przez płuca (ssaki) albo u roślin przez aparaty szparkowe.',
    zrodlo: '2.6',
  },
  {
    id: 's6-pf-ow-1',
    swiat: 6,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw fałszywe zdania.',
    zdania: [
      {
        tekst: 'Oddychanie komórkowe zachodzi w każdej żywej komórce.',
        prawda: true,
        karta: 'oddychanie-komorkowe',
        wyjasnienie: 'W każdej żywej komórce substancje pokarmowe są rozkładane, a energia uwalniana.',
      },
      {
        tekst: 'Wymiana gazowa to rozkład glukozy w mitochondriach.',
        prawda: false,
        karta: 'wymiana-gazowa',
        poprawne: 'Wymiana gazowa to dostarczanie organizmowi tlenu i usuwanie z niego dwutlenku węgla.',
        bledne: ['Wymiana gazowa to rozkład glukozy w cytozolu.', 'Wymiana gazowa to wytwarzanie glukozy w chloroplastach.'],
        wyjasnienie: 'Rozkład glukozy w mitochondriach to oddychanie tlenowe, czyli rodzaj oddychania komórkowego.',
      },
      {
        tekst: 'Rośliny oddychają tylko w nocy.',
        prawda: false,
        karta: 'oddychanie-komorkowe',
        poprawne: 'Rośliny oddychają cały czas, w dzień i w nocy.',
        bledne: ['Rośliny oddychają tylko w dzień.', 'Rośliny nie oddychają, tylko wytwarzają tlen.'],
        wyjasnienie: 'W nocy nie zachodzi fotosynteza, ale oddychanie trwa cały czas.',
      },
      {
        tekst: 'Ryby wymieniają gazy przez skrzela.',
        prawda: true,
        karta: 'skrzela',
        wyjasnienie: 'Skrzela mają ryby i wiele innych zwierząt wodnych.',
      },
      {
        tekst: 'Oddychanie komórkowe uwalnia energię zawartą w substancjach pokarmowych.',
        prawda: true,
        karta: 'energia',
        wyjasnienie: 'Energia jest potrzebna m.in. do wzrostu, rozwoju, rozmnażania i poruszania się.',
      },
    ],
    wyjasnienie: 'Oddychanie komórkowe zachodzi w komórkach i uwalnia energię. Wymiana gazowa dostarcza tlen i usuwa dwutlenek węgla. Rośliny oddychają cały czas.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Piekarnia drożdżowa” ----------
  {
    id: 's6-piekarnia-1',
    swiat: 6,
    typ: 'przepis',
    tresc: 'Piekarnia drożdżowa: ułóż przepis na fermentację alkoholową i zobacz, co dzieje się z ciastem.',
    procesy: ['fermentacja-alkoholowa'],
    garnki: [{ karta: 'drozdze', podpis: 'komórka drożdży w cieście' }],
    pola: [
      { id: 'glukoza', substancja: 'glukoza', strefa: 'wejscie' },
      { id: 'p1', substancja: 'alkohol-etylowy', strefa: 'wyjscie' },
      { id: 'p2', substancja: 'dwutlenek-wegla', strefa: 'wyjscie' },
      { id: 'p3', substancja: 'energia', strefa: 'wyjscie' },
    ],
    dopasowanie: 'strefa',
    dystraktory: [
      { karta: 'tlen', wyjasnienie: 'Fermentacja to rozkład glukozy bez udziału tlenu.' },
      { karta: 'woda', wyjasnienie: 'Wody nie ma w zapisie fermentacji alkoholowej: nie jest jej składnikiem ani produktem. Woda powstaje w oddychaniu tlenowym.' },
      { karta: 'kwas-mlekowy', wyjasnienie: 'Kwas mlekowy powstaje w fermentacji mlekowej, np. w mięśniach.' },
    ],
    scena: { id: 'ciasto', substancja: 'dwutlenek-wegla' },
    wyjasnienie: 'Drożdże przeprowadzają fermentację alkoholową: z glukozy powstają alkohol etylowy i dwutlenek węgla, a uwalnia się mało energii. Dwutlenek węgla spulchnia ciasto.',
    zrodlo: '2.6',
  },
  {
    id: 's6-luki-alkoholowa-1',
    swiat: 6,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o drożdżach.',
    tekst:
      'Drożdże to jednokomórkowe [grzyby|drozdze]. Przeprowadzają fermentację [alkoholową|fermentacja-alkoholowa], w której glukoza jest rozkładana bez udziału [tlenu|fermentacja]. Powstają przy tym [alkohol etylowy|alkohol-etylowy] i dwutlenek węgla, który [spulchnia|drozdze|To słowo opisuje, co dzieje się z ciastem na pieczywo.] ciasto na pieczywo.',
    dystraktory: [
      { tekst: 'kwas mlekowy', wyjasnienie: 'Kwas mlekowy powstaje w fermentacji mlekowej.' },
      { tekst: 'bakterie', wyjasnienie: 'Drożdże to grzyby, a nie bakterie.' },
    ],
    wyjasnienie: 'Drożdże to jednokomórkowe grzyby. W fermentacji alkoholowej z glukozy powstają alkohol etylowy i dwutlenek węgla, który spulchnia ciasto.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Liść przez dobę” ----------
  {
    id: 's6-doba-1',
    swiat: 6,
    typ: 'doba',
    tresc: 'Liść przez dobę: co dzieje się w liściu w południe, a co o północy?',
    etapy: [{ pora: 'dzien' }, { pora: 'noc' }],
    ciekawostka: 'Rośliny doniczkowe w sypialni zużywają w nocy znikome ilości tlenu; śpiący kot zużywa go znacznie więcej.',
    wyjasnienie:
      'W dzień w komórkach roślin zachodzą fotosynteza i oddychanie; fotosynteza wytwarza więcej tlenu, niż zużywa oddychanie, więc roślina oddaje tlen. W nocy zachodzi tylko oddychanie: roślina pobiera tlen i oddaje dwutlenek węgla.',
    zrodlo: '2.6',
  },
  {
    id: 's6-sorter-doba-1',
    swiat: 6,
    typ: 'sorter',
    tresc: 'Tylko w dzień, tylko w nocy czy przez całą dobę? Rozdziel zdania o roślinie.',
    scena: 'dzien-noc',
    kategorie: [
      { id: 'dzien', nazwa: 'tylko w dzień', ikona: 'swiatlo' },
      { id: 'noc', nazwa: 'tylko w nocy', ikona: 'ksiezyc' },
      { id: 'oba', nazwa: 'w dzień i w nocy', ikona: 'doba' },
    ],
    zdania: [
      { tekst: 'W liściach zachodzi fotosynteza.', kategoria: 'dzien', karta: 'fotosynteza', wyjasnienie: 'Fotosynteza wymaga światła, więc zachodzi tylko w dzień.' },
      { tekst: 'Chlorofil pochłania światło.', kategoria: 'dzien', karta: 'chlorofil', wyjasnienie: 'Światło jest dostępne tylko w dzień.' },
      { tekst: 'Roślina oddaje tlen do otoczenia.', kategoria: 'dzien', karta: 'tlen', wyjasnienie: 'W dzień fotosynteza wytwarza więcej tlenu, niż zużywa oddychanie, więc roślina oddaje tlen do otoczenia.' },
      { tekst: 'Roślina pobiera dwutlenek węgla do fotosyntezy.', kategoria: 'dzien', karta: 'dwutlenek-wegla', wyjasnienie: 'Do fotosyntezy dwutlenek węgla wnika do liści przez aparaty szparkowe.' },
      { tekst: 'Roślina pobiera tlen z otoczenia.', kategoria: 'noc', karta: 'tlen', wyjasnienie: 'W nocy zachodzi tylko oddychanie: roślina pobiera tlen.' },
      { tekst: 'Roślina oddaje dwutlenek węgla do otoczenia.', kategoria: 'noc', karta: 'dwutlenek-wegla', wyjasnienie: 'W nocy zachodzi tylko oddychanie: roślina oddaje dwutlenek węgla.' },
      { tekst: 'W komórkach rośliny zachodzi oddychanie komórkowe.', kategoria: 'oba', karta: 'oddychanie-komorkowe', wyjasnienie: 'Rośliny oddychają cały czas, w dzień i w nocy.' },
      { tekst: 'Komórki liścia uwalniają energię z glukozy.', kategoria: 'oba', karta: 'oddychanie-komorkowe', wyjasnienie: 'Energię uwalnia oddychanie komórkowe, które zachodzi przez całą dobę.' },
    ],
    wyjasnienie: 'Fotosynteza zachodzi tylko w dzień, a oddychanie przez całą dobę. W dzień roślina oddaje tlen, w nocy pobiera tlen i oddaje dwutlenek węgla.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Lustro” ----------
  {
    id: 's6-lustro-1',
    swiat: 6,
    typ: 'przepis',
    tresc: 'Lustro: połącz fotosyntezę z oddychaniem tlenowym. Co jeden proces oddaje drugiemu?',
    procesy: ['fotosynteza', 'oddychanie-tlenowe'],
    garnki: [
      { karta: 'chloroplast', podpis: 'fotosynteza w chloroplaście' },
      { karta: 'mitochondrium', podpis: 'oddychanie tlenowe, głównie w mitochondrium' },
    ],
    pola: [
      { id: 'swiatlo', substancja: 'swiatlo', strefa: 'wejscie-lewe' },
      { id: 'g1', substancja: 'glukoza', strefa: 'gora' },
      { id: 'g2', substancja: 'tlen', strefa: 'gora' },
      { id: 'd1', substancja: 'dwutlenek-wegla', strefa: 'dol' },
      { id: 'd2', substancja: 'woda', strefa: 'dol' },
      { id: 'energia', substancja: 'energia', strefa: 'wyjscie-prawe' },
    ],
    dopasowanie: 'strefa',
    // Energia z oddychania nie zasila fotosyntezy; fotosyntezę zasila energia świetlna (TRESCI.md, 2.4).
    wyjasnienia: {
      energia:
        'Energia to produkt oddychania tlenowego: organizm zużywa ją m.in. do wzrostu i rozwoju. Fotosyntezę zasila energia świetlna, którą pochłania chlorofil, a nie energia z oddychania.',
    },
    ciekawostka: 'Fotosynteza i oddychanie tlenowe są jak odbicia w lustrze: produkty jednego procesu są substratami drugiego.',
    wyjasnienie:
      'Fotosynteza: dwutlenek węgla + woda → (światło, chlorofil) → substancje pokarmowe (głównie glukoza) + tlen. Oddychanie tlenowe: glukoza + tlen → dwutlenek węgla + woda + energia.',
    zrodlo: '2.6',
  },
  {
    id: 's6-luki-tlenowe-2',
    swiat: 6,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o oddychaniu tlenowym.',
    tekst:
      'W oddychaniu tlenowym komórka rozkłada glukozę z udziałem [tlenu|tlen]. Powstają przy tym [dwutlenek węgla|dwutlenek-wegla] i woda, a uwalnia się dużo [energii|energia]. Glukoza u roślin powstaje w [fotosyntezie|fotosynteza], a u zwierząt pochodzi z trawienia pokarmu.',
    dystraktory: [
      { tekst: 'alkohol etylowy', wyjasnienie: 'Alkohol etylowy powstaje w fermentacji alkoholowej, bez udziału tlenu.' },
      { tekst: 'fermentacji', wyjasnienie: 'W fermentacji glukoza jest rozkładana, a nie wytwarzana. Glukoza u roślin powstaje w fotosyntezie.' },
    ],
    wyjasnienie: 'Zapis słowny oddychania tlenowego: glukoza + tlen → dwutlenek węgla + woda + energia.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Tabela porównawcza” ----------
  tabelaPorownawcza(
    's6-tabela-1',
    'Uzupełnij tabelę porównawczą oddychania tlenowego i fermentacji.',
    ['tlen', 'miejsce', 'rozklad', 'produkty', 'energia', 'przyklady'],
    [
      { tekst: 'chloroplasty', wyjasnienie: 'W chloroplastach zachodzi fotosynteza, a nie oddychanie komórkowe.' },
      { tekst: 'glukoza i tlen', wyjasnienie: 'Glukoza i tlen są potrzebne do oddychania tlenowego; nie są jego produktami.' },
    ],
  ),
  {
    id: 's6-produkty-1',
    swiat: 6,
    typ: 'tabela',
    tresc: 'Co powstaje w każdym procesie? Zaznacz w tabeli.',
    procesy: ['oddychanie-tlenowe', 'fermentacja-alkoholowa', 'fermentacja-mlekowa'],
    substancje: ['dwutlenek-wegla', 'woda', 'alkohol-etylowy', 'kwas-mlekowy'],
    wyjasnienie:
      'W oddychaniu tlenowym powstają dwutlenek węgla i woda, w fermentacji alkoholowej alkohol etylowy i dwutlenek węgla, a w fermentacji mlekowej kwas mlekowy.',
    zrodlo: '2.6',
  },
  {
    id: 's6-luki-tlenowe-1',
    swiat: 6,
    typ: 'luki',
    tresc: 'Uzupełnij zdania porównujące oddychanie tlenowe i fermentację.',
    tekst:
      'Główne etapy oddychania tlenowego zachodzą w [mitochondriach|mitochondrium], a fermentacja zachodzi w [cytozolu|cytozol]. W oddychaniu tlenowym glukoza jest rozkładana [całkowicie|oddychanie-tlenowe], a w fermentacji tylko [częściowo|fermentacja], dlatego fermentacja uwalnia [mniej|fermentacja] energii.',
    dystraktory: [
      { tekst: 'chloroplastach', wyjasnienie: 'W chloroplastach zachodzi fotosynteza.' },
      { tekst: 'więcej', wyjasnienie: 'Fermentacja daje mniej energii, bo glukoza jest rozkładana tylko częściowo.' },
    ],
    wyjasnienie: 'Oddychanie tlenowe zachodzi głównie w mitochondriach i rozkłada glukozę całkowicie. Fermentacja zachodzi w cytozolu, rozkłada glukozę częściowo i uwalnia mniej energii.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Woda wapienna” ----------
  {
    id: 's6-wapienna-1',
    swiat: 6,
    typ: 'doswiadczenie',
    tresc: 'Doświadczenie z drożdżami i wodą wapienną: co pokazuje mętna woda?',
    scena: 'woda-wapienna',
    opis:
      'Do słoika A wlano wodę, wsypano cukier i drożdże. Słoik B przygotowano tak samo, ale bez drożdży. Każdy słoik połączono rurką ze słoikiem z wodą wapienną. Po pewnym czasie woda wapienna połączona ze słoikiem A zmętniała, a połączona ze słoikiem B pozostała przejrzysta.',
    kroki: [
      {
        pytanie: 'Co oznacza mętnienie wody wapiennej?',
        opcje: [
          { tekst: 'obecność dwutlenku węgla', poprawna: true },
          { tekst: 'obecność tlenu', wyjasnienie: 'Woda wapienna mętnieje, gdy dotrze do niej dwutlenek węgla.' },
          { tekst: 'obecność alkoholu etylowego', wyjasnienie: 'Woda wapienna wykrywa dwutlenek węgla.' },
        ],
        wyjasnienie: 'Mętnienie wody wapiennej oznacza obecność dwutlenku węgla.',
        karta: 'woda-wapienna',
      },
      {
        pytanie: 'Który zestaw to próba kontrolna?',
        kolejnosc: 'stala',
        opcje: [
          { tekst: 'A: woda, cukier i drożdże', wyjasnienie: 'W zestawie A są drożdże, czyli badany czynnik: to próba badawcza.' },
          { tekst: 'B: woda i cukier, bez drożdży', poprawna: true },
        ],
        wyjasnienie: 'Próba kontrolna nie zawiera badanego czynnika i jest punktem odniesienia.',
        karta: 'proba-kontrolna',
      },
      {
        pytanie: 'Jaki proces przeprowadzają drożdże w słoiku A?',
        opcje: [
          { tekst: 'fermentację alkoholową', poprawna: true },
          { tekst: 'fotosyntezę', wyjasnienie: 'Drożdże to grzyby: ich komórki nie mają chloroplastów.' },
          { tekst: 'fermentację mlekową', wyjasnienie: 'W fermentacji mlekowej nie powstaje dwutlenek węgla.' },
        ],
        wyjasnienie: 'Drożdże przeprowadzają fermentację alkoholową, w której powstaje dwutlenek węgla.',
        karta: 'fermentacja-alkoholowa',
      },
      {
        pytanie: 'Jaki wniosek wynika z doświadczenia?',
        opcje: [
          { tekst: 'Drożdże przeprowadzają fermentację i wytwarzają dwutlenek węgla.', poprawna: true },
          { tekst: 'Cukier sam wytwarza dwutlenek węgla.', wyjasnienie: 'W słoiku B też był cukier, a woda wapienna nie zmętniała.' },
          { tekst: 'Woda wapienna wytwarza dwutlenek węgla.', wyjasnienie: 'Woda wapienna tylko wykrywa dwutlenek węgla: mętnieje w jego obecności.' },
        ],
        wyjasnienie: 'Woda wapienna zmętniała tylko w zestawie z drożdżami, więc dwutlenek węgla wytworzyły drożdże.',
        karta: 'drozdze',
      },
    ],
    wyjasnienie: 'Mętnienie wody wapiennej oznacza obecność dwutlenku węgla. Zmętniała tylko woda połączona ze słoikiem z drożdżami, więc drożdże przeprowadzają fermentację i wytwarzają dwutlenek węgla.',
    zrodlo: '2.6',
  },
  {
    id: 's6-pf-fermentacja-1',
    swiat: 6,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw fałszywe zdania o fermentacji.',
    zdania: [
      {
        tekst: 'Fermentacja zachodzi w mitochondriach.',
        prawda: false,
        karta: 'fermentacja',
        poprawne: 'Fermentacja zachodzi w cytozolu.',
        bledne: ['Fermentacja zachodzi w chloroplastach.', 'Fermentacja zachodzi w jądrze komórkowym.'],
        wyjasnienie: 'W mitochondriach zachodzą główne etapy oddychania tlenowego.',
      },
      {
        tekst: 'Fermentacja daje więcej energii niż oddychanie tlenowe.',
        prawda: false,
        karta: 'fermentacja',
        poprawne: 'Fermentacja daje znacznie mniej energii niż oddychanie tlenowe.',
        bledne: ['Fermentacja daje tyle samo energii co oddychanie tlenowe.', 'Fermentacja daje więcej energii, bo nie potrzebuje tlenu.'],
        wyjasnienie: 'W fermentacji glukoza jest rozkładana tylko częściowo.',
      },
      {
        tekst: 'Dorosły tasiemiec uzyskuje energię dzięki fermentacji.',
        prawda: true,
        karta: 'tasiemiec-uzbrojony',
        wyjasnienie: 'Żyje w jelicie człowieka, gdzie nie ma tlenu.',
      },
      {
        tekst: 'Drożdże przeprowadzają fermentację alkoholową.',
        prawda: true,
        karta: 'drozdze',
        wyjasnienie: 'Powstają w niej alkohol etylowy i dwutlenek węgla.',
      },
      {
        tekst: 'W fermentacji mlekowej powstaje alkohol etylowy.',
        prawda: false,
        karta: 'fermentacja-mlekowa',
        poprawne: 'W fermentacji mlekowej powstaje kwas mlekowy.',
        bledne: ['W fermentacji mlekowej powstaje woda.', 'W fermentacji mlekowej powstaje tlen.'],
        wyjasnienie: 'Alkohol etylowy powstaje w fermentacji alkoholowej.',
      },
    ],
    wyjasnienie: 'Fermentacja zachodzi w cytozolu, bez tlenu, i daje mniej energii niż oddychanie tlenowe. Przeprowadzają ją m.in. drożdże i tasiemiec.',
    zrodlo: '2.6',
  },

  // ---------- Misja „Rozmnażanie a energia” ----------
  {
    id: 's6-rozmnazanie-klas-1',
    swiat: 6,
    typ: 'klasyfikacja',
    tresc: 'Rozmnażanie płciowe czy bezpłciowe? Przyporządkuj opisy.',
    kategorie: [
      { id: 'plciowe', nazwa: 'rozmnażanie płciowe', karta: 'rozmnazanie-plciowe' },
      { id: 'bezplciowe', nazwa: 'rozmnażanie bezpłciowe', karta: 'rozmnazanie-bezplciowe' },
    ],
    elementy: [
      { tekst: 'kocięta z jednego miotu o różnym umaszczeniu', kategoria: 'plciowe', karta: 'kot', wyjasnienie: 'Kocięta mają cechy obojga rodziców, ale nie są z nimi identyczne.' },
      { tekst: 'udział komórek rozrodczych', kategoria: 'plciowe', wyjasnienie: 'Komórki rozrodcze biorą udział w rozmnażaniu płciowym.' },
      { tekst: 'najczęściej dwa organizmy rodzicielskie', kategoria: 'plciowe', wyjasnienie: 'W rozmnażaniu płciowym najczęściej biorą udział dwa organizmy rodzicielskie.' },
      { tekst: 'nowe tulipany identyczne z rośliną rodzicielską', kategoria: 'bezplciowe', karta: 'tulipan', wyjasnienie: 'Potomstwo z rozmnażania bezpłciowego jest identyczne z rodzicem.' },
      { tekst: 'podział komórki bakterii', kategoria: 'bezplciowe', wyjasnienie: 'Podział komórki, np. u bakterii, to rozmnażanie bezpłciowe.' },
      { tekst: 'podział organizmu na fragmenty', kategoria: 'bezplciowe', wyjasnienie: 'Podział organizmu na fragmenty to rozmnażanie bezpłciowe.' },
    ],
    wyjasnienie: 'W rozmnażaniu płciowym biorą udział komórki rozrodcze, a potomstwo nie jest identyczne z rodzicami. W bezpłciowym potomstwo powstaje z jednego organizmu i jest z nim identyczne.',
    zrodlo: '2.6',
  },
  {
    id: 's6-luki-rozmnazanie-1',
    swiat: 6,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o rozmnażaniu.',
    tekst:
      'Energia uwalniana w oddychaniu komórkowym jest potrzebna m.in. do wzrostu, rozwoju i [rozmnażania|energia]. W rozmnażaniu płciowym biorą udział [komórki rozrodcze|rozmnazanie-plciowe], najczęściej dwóch organizmów rodzicielskich. Potomstwo ma cechy obojga rodziców, ale nie jest z nimi [identyczne|rozmnazanie-plciowe]. W rozmnażaniu [bezpłciowym|rozmnazanie-bezplciowe] potomstwo powstaje z jednego organizmu rodzicielskiego, np. przez podział komórki u [bakterii|rozmnazanie-bezplciowe].',
    dystraktory: [
      { tekst: 'kotów', wyjasnienie: 'Koty rozmnażają się płciowo: kocięta mają cechy obojga rodziców.' },
      { tekst: 'płciowym', wyjasnienie: 'W rozmnażaniu płciowym biorą udział komórki rozrodcze, najczęściej dwóch organizmów rodzicielskich. Z jednego organizmu, np. przez podział komórki, potomstwo powstaje w rozmnażaniu bezpłciowym.' },
    ],
    wyjasnienie: 'Energia jest potrzebna m.in. do rozmnażania. Rozmnażanie płciowe wymaga komórek rozrodczych; bezpłciowe zachodzi z jednego organizmu rodzicielskiego, np. przez podział komórki bakterii.',
    zrodlo: '2.6',
  },

  // ---------- Pule bossa ----------
  sorterOW('s6-boss-sorter-ow-2', 'Oddychanie komórkowe (O) czy wymiana gazowa (W)?', ['o5', 'o6', 'o7', 'o8', 'w4', 'w5', 'w7', 'w8']),
  sorterOW('s6-boss-sorter-ow-3', 'Oddychanie komórkowe (O) czy wymiana gazowa (W)?', ['o1', 'o3', 'o5', 'o9', 'w2', 'w3', 'w9', 'w6']),
  sorterOW('s6-boss-sorter-ow-4', 'Oddychanie komórkowe (O) czy wymiana gazowa (W)?', ['o2', 'o4', 'o6', 'o8', 'w1', 'w4', 'w10', 'w5']),
  sorterOW('s6-boss-sorter-ow-5', 'Oddychanie komórkowe (O) czy wymiana gazowa (W)?', ['o3', 'o7', 'o9', 'o1', 'w7', 'w8', 'w3', 'w9']),
  tabelaPorownawcza('s6-boss-tabela-2', 'Uzupełnij tabelę porównawczą.', ['tlen', 'miejsce', 'energia', 'produkty'], [
    { tekst: 'jądro komórkowe', wyjasnienie: 'Jądro komórkowe kieruje pracą komórki; oddychanie tlenowe zachodzi głównie w mitochondriach, a fermentacja w cytozolu.' },
  ]),
  tabelaPorownawcza('s6-boss-tabela-3', 'Uzupełnij tabelę porównawczą.', ['rozklad', 'produkty', 'przyklady', 'tlen'], [
    { tekst: 'tylko rośliny', wyjasnienie: 'Oddychanie komórkowe zachodzi w każdej żywej komórce, nie tylko u roślin.' },
  ]),
  tabelaPorownawcza('s6-boss-tabela-4', 'Uzupełnij tabelę porównawczą.', ['miejsce', 'rozklad', 'energia', 'przyklady'], [
    { tekst: 'chloroplasty', wyjasnienie: 'W chloroplastach zachodzi fotosynteza.' },
  ]),
  {
    id: 's6-boss-pf-tabela-1',
    swiat: 6,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Oddychanie tlenowe zachodzi głównie w mitochondriach.',
        prawda: true,
        karta: 'oddychanie-tlenowe',
        wyjasnienie: 'W mitochondriach zachodzą główne etapy oddychania tlenowego.',
      },
      {
        tekst: 'W fermentacji glukoza jest rozkładana całkowicie.',
        prawda: false,
        karta: 'fermentacja',
        poprawne: 'W fermentacji glukoza jest rozkładana tylko częściowo.',
        bledne: ['W fermentacji glukoza w ogóle nie jest rozkładana.', 'W fermentacji glukoza jest rozkładana całkowicie, do dwutlenku węgla i wody.'],
        wyjasnienie: 'Całkowicie glukoza jest rozkładana w oddychaniu tlenowym.',
      },
      {
        tekst: 'Oddychanie tlenowe uwalnia dużo energii.',
        prawda: true,
        karta: 'oddychanie-tlenowe',
        wyjasnienie: 'Glukoza jest w nim rozkładana całkowicie.',
      },
      {
        tekst: 'Fermentacja wymaga tlenu.',
        prawda: false,
        karta: 'fermentacja',
        poprawne: 'Fermentacja zachodzi bez udziału tlenu.',
        bledne: ['Fermentacja wymaga więcej tlenu niż oddychanie tlenowe.', 'Fermentacja wymaga tlenu i światła.'],
        wyjasnienie: 'Fermentacja to sposób na uzyskanie energii, gdy brakuje tlenu.',
      },
      {
        tekst: 'Fermentację przeprowadzają m.in. drożdże i tasiemiec.',
        prawda: true,
        karta: 'fermentacja',
        wyjasnienie: 'Fermentację przeprowadzają niektóre bakterie, grzyby (np. drożdże) i pasożyty wewnętrzne (np. tasiemiec).',
      },
    ],
    wyjasnienie: 'Oddychanie tlenowe zachodzi głównie w mitochondriach i uwalnia dużo energii. Fermentacja nie wymaga tlenu i rozkłada glukozę tylko częściowo.',
    zrodlo: '2.6',
  },
  {
    id: 's6-boss-produkty-2',
    swiat: 6,
    typ: 'tabela',
    tresc: 'Co powstaje w każdym procesie? Zaznacz w tabeli.',
    procesy: ['fotosynteza', 'oddychanie-tlenowe', 'fermentacja-alkoholowa'],
    substancje: ['tlen', 'dwutlenek-wegla', 'woda', 'alkohol-etylowy'],
    wyjasnienie: 'W fotosyntezie powstaje tlen, w oddychaniu tlenowym dwutlenek węgla i woda, a w fermentacji alkoholowej alkohol etylowy i dwutlenek węgla.',
    zrodlo: '2.6',
  },
  {
    id: 's6-boss-luki-fermentacje-1',
    swiat: 6,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o produktach oddychania tlenowego i fermentacji.',
    tekst:
      'W oddychaniu tlenowym z glukozy powstają [dwutlenek węgla|dwutlenek-wegla] i woda. W fermentacji alkoholowej powstają [alkohol etylowy|alkohol-etylowy] i dwutlenek węgla. W fermentacji mlekowej powstaje [kwas mlekowy|kwas-mlekowy]. W każdym z tych procesów uwalnia się [energia|energia].',
    dystraktory: [
      { tekst: 'tlen', wyjasnienie: 'Tlen jest potrzebny do oddychania tlenowego, a powstaje w fotosyntezie.' },
      { tekst: 'glukoza', wyjasnienie: 'Glukoza jest w tych procesach rozkładana; nie jest ich produktem.' },
    ],
    wyjasnienie: 'Oddychanie tlenowe: dwutlenek węgla i woda; fermentacja alkoholowa: alkohol etylowy i dwutlenek węgla; fermentacja mlekowa: kwas mlekowy. W każdym z tych procesów uwalnia się energia.',
    zrodlo: '2.6',
  },
  {
    id: 's6-boss-pf-produkty-1',
    swiat: 6,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'W oddychaniu tlenowym powstają dwutlenek węgla i woda.',
        prawda: true,
        karta: 'oddychanie-tlenowe',
        wyjasnienie: 'Glukoza + tlen → dwutlenek węgla + woda + energia.',
      },
      {
        tekst: 'W fermentacji mlekowej powstaje dwutlenek węgla.',
        prawda: false,
        karta: 'fermentacja-mlekowa',
        poprawne: 'W fermentacji mlekowej powstaje kwas mlekowy.',
        bledne: ['W fermentacji mlekowej powstaje alkohol etylowy.', 'W fermentacji mlekowej powstają dwutlenek węgla i woda.'],
        wyjasnienie: 'Glukoza → kwas mlekowy + energia.',
      },
      {
        tekst: 'W fermentacji alkoholowej powstają alkohol etylowy i dwutlenek węgla.',
        prawda: true,
        karta: 'fermentacja-alkoholowa',
        wyjasnienie: 'Glukoza → alkohol etylowy + dwutlenek węgla + energia.',
      },
      {
        tekst: 'W oddychaniu tlenowym powstaje alkohol etylowy.',
        prawda: false,
        karta: 'oddychanie-tlenowe',
        poprawne: 'W oddychaniu tlenowym powstają dwutlenek węgla i woda.',
        bledne: ['W oddychaniu tlenowym powstaje kwas mlekowy.', 'W oddychaniu tlenowym powstaje tlen.'],
        wyjasnienie: 'Alkohol etylowy powstaje w fermentacji alkoholowej.',
      },
      {
        tekst: 'Zarówno w oddychaniu tlenowym, jak i w fermentacji uwalnia się energia.',
        prawda: true,
        karta: 'energia',
        wyjasnienie: 'W oddychaniu tlenowym uwalnia się dużo energii, a w fermentacji mało.',
      },
    ],
    wyjasnienie: 'Produkty oddychania tlenowego to dwutlenek węgla i woda; fermentacji alkoholowej alkohol etylowy i dwutlenek węgla; fermentacji mlekowej kwas mlekowy.',
    zrodlo: '2.6',
  },
  {
    id: 's6-boss-pf-produkty-2',
    swiat: 6,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw fałszywe zdania o produktach oddychania tlenowego i fermentacji.',
    zdania: [
      {
        tekst: 'Jednym z produktów oddychania tlenowego jest woda.',
        prawda: true,
        karta: 'oddychanie-tlenowe',
        wyjasnienie: 'Glukoza + tlen → dwutlenek węgla + woda + energia.',
      },
      {
        tekst: 'Kwas mlekowy powstaje w fermentacji alkoholowej.',
        prawda: false,
        karta: 'kwas-mlekowy',
        poprawne: 'Kwas mlekowy powstaje w fermentacji mlekowej.',
        bledne: ['Kwas mlekowy powstaje w oddychaniu tlenowym.', 'Kwas mlekowy powstaje w fotosyntezie.'],
        wyjasnienie: 'W fermentacji alkoholowej powstają alkohol etylowy i dwutlenek węgla, a kwas mlekowy powstaje w fermentacji mlekowej.',
      },
      {
        tekst: 'Dwutlenek węgla powstaje zarówno w oddychaniu tlenowym, jak i w fermentacji alkoholowej.',
        prawda: true,
        karta: 'dwutlenek-wegla',
        wyjasnienie: 'Oddychanie tlenowe: dwutlenek węgla i woda. Fermentacja alkoholowa: alkohol etylowy i dwutlenek węgla.',
      },
      {
        tekst: 'W mięśniach człowieka przy niedoborze tlenu powstaje alkohol etylowy.',
        prawda: false,
        karta: 'fermentacja-mlekowa',
        poprawne: 'W mięśniach człowieka przy niedoborze tlenu powstaje kwas mlekowy.',
        bledne: ['W mięśniach człowieka przy niedoborze tlenu powstaje tlen.', 'W mięśniach człowieka przy niedoborze tlenu powstają alkohol etylowy i dwutlenek węgla.'],
        wyjasnienie: 'Przy niedoborze tlenu w mięśniach szkieletowych zachodzi fermentacja mlekowa: glukoza → kwas mlekowy + energia.',
      },
      {
        tekst: 'Drożdże, przeprowadzając fermentację alkoholową, wytwarzają dwutlenek węgla.',
        prawda: true,
        karta: 'drozdze',
        wyjasnienie: 'Dwutlenek węgla z fermentacji drożdży spulchnia ciasto, a w doświadczeniu z wodą wapienną powoduje jej mętnienie.',
      },
    ],
    wyjasnienie:
      'Oddychanie tlenowe: dwutlenek węgla i woda. Fermentacja alkoholowa (np. u drożdży): alkohol etylowy i dwutlenek węgla. Fermentacja mlekowa (np. w mięśniach przy niedoborze tlenu): kwas mlekowy.',
    zrodlo: '2.6',
  },
  {
    id: 's6-boss-pf-1',
    swiat: 6,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Oddychanie tlenowe wymaga tlenu.',
        prawda: true,
        karta: 'oddychanie-tlenowe',
        wyjasnienie: 'Potrzebuje tlenu i substancji pokarmowych, przede wszystkim glukozy.',
      },
      {
        tekst: 'W nocy roślina pobiera tlen i oddaje dwutlenek węgla.',
        prawda: true,
        karta: 'oddychanie-komorkowe',
        wyjasnienie: 'W nocy zachodzi tylko oddychanie.',
      },
      {
        tekst: 'Fermentacja to rozkład glukozy z udziałem tlenu.',
        prawda: false,
        karta: 'fermentacja',
        poprawne: 'Fermentacja to rozkład glukozy bez udziału tlenu.',
        bledne: ['Fermentacja to wytwarzanie glukozy z udziałem tlenu.', 'Fermentacja to rozkład tlenu bez udziału glukozy.'],
        wyjasnienie: 'Gdy brakuje tlenu, sposobem na uzyskanie energii jest fermentacja.',
      },
      {
        tekst: 'Po dużym wysiłku kwas mlekowy zostaje w mięśniach na zawsze.',
        prawda: false,
        karta: 'kwas-mlekowy',
        poprawne: 'Po dużym wysiłku krew przenosi kwas mlekowy do wątroby, gdzie służy do produkcji glukozy.',
        bledne: ['Po dużym wysiłku kwas mlekowy jest usuwany przez płuca.', 'Po dużym wysiłku kwas mlekowy zamienia się w mięśniach w tlen.'],
        wyjasnienie: 'Kwas mlekowy znika z mięśni w ciągu kilkudziesięciu minut.',
      },
      {
        tekst: 'Dwutlenek węgla z fermentacji drożdży spulchnia ciasto.',
        prawda: true,
        karta: 'drozdze',
        wyjasnienie: 'Dlatego do ciasta na pieczywo dodaje się drożdże.',
      },
    ],
    wyjasnienie: 'Oddychanie tlenowe wymaga tlenu, a fermentacja zachodzi bez niego. W nocy roślina pobiera tlen. Kwas mlekowy krew przenosi do wątroby.',
    zrodlo: '2.6',
  },
];

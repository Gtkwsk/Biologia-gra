// Domowe laboratorium (SPEC.md, sekcja 4.5): doświadczenia do zrobienia w domu razem z dorosłym,
// zaliczane przyciskiem „Zrobione z dorosłym”. Nie są zadaniami sprawdzianowymi.
//
// swiat: świat, którego temat doświadczenie pokazuje; karta: karta atlasu (temat doświadczenia),
// potrzebne, kroki: listy; bezpieczenstwo: uwaga dla dorosłego i dziecka (ekran pokazuje ją
// przed krokami), obserwacja: co widać; wyjasnienie: przyczyna według TRESCI.md,
// ciekawostka: opcjonalnie, dosłownie z TRESCI.md, sekcja 6,
// wymaga: opcjonalnie 'mikroskop' (doświadczenie dla tych, którzy mają dostęp do mikroskopu).
// Obserwacja w doświadczeniu z jodyną pochodzi z SPEC.md, sekcja 4.5 (poza zakresem sprawdzianu).
// Uwagi o bezpieczeństwie i szczegóły wykonania są poza TRESCI.md: to instrukcje, nie treść działu.

export default [
  {
    id: 'chleb',
    nazwa: 'Słodki chleb',
    swiat: 1,
    karta: 'enzymy',
    potrzebne: ['kromka jasnego chleba albo kawałek bułki, bez słodkich dodatków'],
    kroki: ['Odgryź mały kawałek chleba.', 'Żuj go powoli przez minutę albo dwie, zanim go połkniesz.', 'Zwróć uwagę, czy smak się zmienia.'],
    bezpieczenstwo: 'Pieczywo ma być świeże i bez pleśni. Doświadczenie nie jest dla kogoś, kto nie może jeść pieczywa, np. z powodu uczulenia.',
    obserwacja: 'Po dłuższym żuciu chleb robi się słodkawy.',
    wyjasnienie:
      'Chleb powstaje z mąki z nasion zbóż, a w nasionach zbóż jest skrobia: cukier o funkcji zapasowej. W ślinie są enzymy trawienne, czyli białka regulujące przemiany chemiczne w organizmie, np. trawienie.',
    ciekawostka: 'Długo żuty chleb robi się słodkawy, bo enzym w ślinie rozkłada skrobię na prostsze cukry.',
  },
  {
    id: 'jodyna',
    nazwa: 'Gdzie jest skrobia?',
    swiat: 1,
    karta: 'skrobia',
    potrzebne: ['plaster surowego ziemniaka', 'jodyna z apteczki', 'biały talerzyk'],
    kroki: [
      'Dorosły kroi plaster ziemniaka i kładzie go na talerzyku.',
      'Dorosły zakrapla jedną kroplę jodyny na plaster, a drugą obok, na pusty talerzyk.',
      'Porównaj kolor obu kropli.',
    ],
    bezpieczenstwo:
      'Jodynę trzyma i zakrapla dorosły. Jodyny nie wolno połykać ani zbliżać do oczu, a do tego plami skórę i ubrania. Ziemniak po doświadczeniu trafia do kosza: nie wolno go jeść ani dawać zwierzętom. Na koniec myje się ręce i talerzyk.',
    obserwacja: 'Na ziemniaku kropla ciemnieje na granatowo, a na talerzyku zostaje brązowa.',
    wyjasnienie:
      'Sama jodyna jest brązowa, a granatowa robi się dopiero na ziemniaku: takie zabarwienie wskazuje skrobię. Skrobia to cukier o funkcji zapasowej, np. w bulwach ziemniaka.',
    ciekawostka: 'Stary, kiełkujący ziemniak mięknie i marszczy się, bo młoda roślina zużywa zgromadzoną skrobię.',
  },
  {
    id: 'policzek',
    nazwa: 'Komórki z policzka',
    swiat: 2,
    karta: 'jadro-komorkowe',
    wymaga: 'mikroskop',
    potrzebne: ['mikroskop', 'nowy patyczek higieniczny', 'szkiełko podstawowe i nakrywkowe', 'kropla wody'],
    kroki: [
      'Dorosły przygotowuje mikroskop i kładzie kroplę wody na szkiełku podstawowym.',
      'Delikatnie przesuń nowym patyczkiem po wewnętrznej stronie policzka.',
      'Rozmaż to, co zostało na patyczku, w kropli wody i przykryj szkiełkiem nakrywkowym.',
      'Ustaw ostrość przy najmniejszym powiększeniu, a potem przejdź na większe, około 400 razy.',
      'Przyciemnij światło w mikroskopie, bo komórki są prawie przezroczyste. Okrągłe kształty z grubym, ciemnym brzegiem to pęcherzyki powietrza, nie komórki.',
    ],
    bezpieczenstwo:
      'Każdy pobiera komórki własnym, nowym patyczkiem i od razu wyrzuca go do kosza. Szkiełka trzyma się za brzegi, bo łatwo pękają. Lusterka mikroskopu nie wolno kierować na słońce. Po doświadczeniu myje się ręce i szkiełka.',
    obserwacja: 'Widać komórki nabłonka jamy ustnej, a w każdej z nich błonę komórkową, cytoplazmę i jądro komórkowe.',
    wyjasnienie:
      'Przy powiększeniu około 400 razy widać błonę komórkową, cytoplazmę i jądro komórkowe. Pozostałe elementy komórki widać dopiero przy bardzo dużym powiększeniu, około 10 000 razy.',
    ciekawostka:
      'Komórki są małe, bo wszystko musi przejść przez błonę i dotrzeć do całego wnętrza; komórki słonia są podobnej wielkości jak komórki myszy, słoń ma ich po prostu więcej.',
  },
  {
    id: 'model',
    nazwa: 'Model komórki',
    swiat: 2,
    karta: 'komorka-zwierzeca',
    potrzebne: ['plastelina, klocki albo gra z budowaniem', 'karteczki na tabliczki z nazwami i coś do pisania'],
    kroki: [
      'Wybierz komórkę: zwierzęcą, roślinną albo bakteryjną.',
      'Zbuduj jej duży model ze wszystkimi elementami, które ta komórka ma.',
      'Przy każdym elemencie postaw tabliczkę z jego nazwą.',
      'Razem z dorosłym porównaj model ze schematem tej komórki w grze albo w podręczniku. Sprawdźcie, czy żadnego elementu nie brakuje i czy nie ma elementu, którego ta komórka nie ma.',
    ],
    bezpieczenstwo: 'Drobne klocki i kawałki plasteliny trzyma się z dala od małych dzieci.',
    obserwacja: 'Gotowy model pokazuje, z jakich elementów jest zbudowana wybrana komórka.',
    wyjasnienie:
      'Każdy typ komórki ma swój zestaw elementów: tylko komórka zwierzęca nie ma ściany komórkowej, a tylko komórka roślinna ma chloroplasty.',
  },
  {
    id: 'roslina',
    nazwa: 'Roślina, która się prostuje',
    swiat: 3,
    karta: 'wakuola',
    potrzebne: ['roślina doniczkowa, która lekko zwiędła, bo ma suchą ziemię', 'woda do podlania'],
    kroki: [
      'Dotknij ziemi w doniczce: przed podlaniem powinna być sucha.',
      'Obejrzyj liście i łodygę zwiędłej rośliny.',
      'Podlej roślinę.',
      'Po kilku godzinach obejrzyj ją jeszcze raz.',
    ],
    bezpieczenstwo:
      'Roślinę podlewa się wtedy, gdy sama lekko zwiędnie: nie trzeba jej specjalnie wysuszać. Niektóre rośliny doniczkowe są trujące, więc nie zrywa się liści i nie bierze ich do ust. Po doświadczeniu myje się ręce.',
    obserwacja: 'Po kilku godzinach liście i łodyga podlanej rośliny się prostują.',
    wyjasnienie: 'Duża wakuola w komórce roślinnej utrzymuje w komórce odpowiednią ilość wody, a ściana komórkowa nadaje komórce kształt.',
    ciekawostka:
      'Wakuola pełna wody i ściana komórkowa działają jak balon napompowany w kartonowym pudełku: dlatego podlana roślina się prostuje, a bez wody więdnie.',
  },
  {
    id: 'moczarka',
    nazwa: 'Chloroplasty moczarki',
    swiat: 3,
    karta: 'chloroplast',
    wymaga: 'mikroskop',
    potrzebne: ['mikroskop', 'gałązka moczarki kanadyjskiej (roślina akwariowa)', 'szkiełko podstawowe i nakrywkowe', 'kropla wody'],
    kroki: [
      'Oderwij jeden młody listek z czubka gałązki moczarki.',
      'Połóż go w kropli wody na szkiełku podstawowym i przykryj szkiełkiem nakrywkowym.',
      'Ustaw ostrość przy najmniejszym powiększeniu, a potem przejdź na większe, około 400 razy.',
      'Obserwuj komórki przez dłuższą chwilę.',
    ],
    bezpieczenstwo:
      'Szkiełka trzyma się za brzegi, bo łatwo pękają. Lusterka mikroskopu nie wolno kierować na słońce. Resztki moczarki wyrzuca się do kosza, nigdy do stawu ani rzeki. Po doświadczeniu myje się ręce.',
    obserwacja: 'W komórkach liścia widać zielone, owalne chloroplasty.',
    wyjasnienie: 'Chloroplasty zawierają zielony barwnik chlorofil. Zachodzi w nich fotosynteza.',
    ciekawostka: 'W komórkach liścia moczarki chloroplasty krążą wzdłuż ścian, niesione przez płynącą cytoplazmę.',
  },
  {
    id: 'seler',
    nazwa: 'Kolorowy seler',
    swiat: 4,
    karta: 'komorki-przewodzace',
    potrzebne: ['jedna jasna łodyga selera naciowego z liśćmi, najlepiej ze środka pęczka', 'szklanka', 'barwnik spożywczy, np. niebieski albo czerwony'],
    kroki: [
      'Dorosły ścina nożem dolny koniec łodygi selera.',
      'Nalej do szklanki wody do połowy i dodaj tyle barwnika, żeby woda była mocno zabarwiona.',
      'Wstaw seler do zabarwionej wody i zostaw go na noc albo na dobę.',
      'Obejrzyj liście, a potem poproś dorosłego o przecięcie łodygi w poprzek.',
    ],
    bezpieczenstwo: 'Nożem posługuje się dorosły. Barwnik brudzi ubrania i blat. Przy uczuleniu na seler doświadczenie robi sam dorosły.',
    obserwacja: 'Liście się zabarwiają, a na przekroju łodygi widać kolorowe kropki.',
    wyjasnienie:
      'Barwnik płynie razem z wodą przez komórki przewodzące. Są długie i ułożone jedna nad drugą jak rury, a transportują wodę z solami mineralnymi aż do liści. Kolorowe kropki na przekroju to miejsca, w których biegną takie rury.',
  },
  {
    id: 'balonik',
    nazwa: 'Balonik nadmuchany przez drożdże',
    swiat: 6,
    karta: 'fermentacja-alkoholowa',
    potrzebne: [
      'plastikowa butelka',
      'balonik',
      'lejek',
      'szklanka ciepłej wody',
      'łyżka cukru',
      'drożdże: torebka suchych (7 g) albo kawałek świeżych wielkości orzecha włoskiego',
    ],
    kroki: [
      'Dorosły wlewa przez lejek do butelki szklankę ciepłej, nie gorącej wody.',
      'Wsyp przez lejek cukier i drożdże (świeże najpierw pokrusz).',
      'Delikatnie zakołysz butelką, żeby wymieszać wodę z cukrem i drożdżami.',
      'Kilka razy rozciągnij balonik, a potem naciągnij go na szyjkę butelki.',
      'Odstaw butelkę w ciepłe miejsce i zaglądaj do niej co kilkanaście minut.',
    ],
    bezpieczenstwo:
      'Wodę przygotowuje dorosły: ma być ciepła, nie gorąca. Butelki nie zakręca się korkiem, bo gaz z fermentacji nie miałby ujścia. Zawartości butelki nie wolno pić; po doświadczeniu wylewa się ją do zlewu.',
    obserwacja: 'W butelce pojawia się piana, a balonik powoli się nadmuchuje.',
    wyjasnienie:
      'Drożdże przeprowadzają fermentację alkoholową: powstają alkohol etylowy i dwutlenek węgla. Dwutlenek węgla nadmuchuje balonik, tak jak spulchnia ciasto drożdżowe.',
    ciekawostka: 'Alkohol etylowy zawiera tyle energii, że może służyć jako paliwo; to znak, że fermentacja zostawia część energii niewykorzystaną.',
  },
  {
    id: 'jogurt',
    nazwa: 'Domowy jogurt',
    swiat: 6,
    karta: 'fermentacja',
    potrzebne: [
      'pół litra mleka UHT albo pasteryzowanego',
      'łyżka świeżego jogurtu naturalnego z żywymi kulturami bakterii',
      'słoik z pokrywką wyparzony przez dorosłego',
      'termometr kuchenny, jeśli jest',
      'ręcznik',
    ],
    kroki: [
      'Dorosły wyparza słoik wrzątkiem i podgrzewa mleko do około 40 stopni: ma być ciepłe, ale nie gorące.',
      'Wlej mleko do słoika i wmieszaj łyżkę jogurtu.',
      'Zakręć słoik, owiń go ręcznikiem i postaw w ciepłym miejscu, ale nie na kuchence ani na grzejniku. Zostaw go na 8 do 10 godzin.',
      'Sprawdź, czy mleko zgęstniało, a potem wstaw słoik do lodówki.',
    ],
    bezpieczenstwo:
      'Mleko podgrzewa i słoik wyparza dorosły. O tym, czy jogurt nadaje się do jedzenia, decyduje dorosły: jeśli mleko nie zgęstniało, pachnie nieprzyjemnie albo ma pleśń, wylewa się je. Gotowy jogurt trzyma się w lodówce i zjada w ciągu kilku dni.',
    obserwacja: 'Mleko gęstnieje i robi się lekko kwaśne.',
    wyjasnienie:
      'Bakterie z dodanego jogurtu przeprowadzają w ciepłym mleku fermentację, czyli beztlenowy rozkład substancji pokarmowych do prostszego związku. Fermentację wykorzystuje się m.in. przy wyrobie jogurtów, kefirów i serów.',
  },
];

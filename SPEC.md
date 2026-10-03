# SPEC: gra „Wyprawa do wnętrza życia”

Dokument projektowy, wersja 1.0 (październik 2026). Treści merytoryczne: `TRESCI.md`. Zasady pracy: `CLAUDE.md`.

## 1. Cel, gracz, kontekst

**Gracz.** Mikołaj, 11 lat, klasa 5. Gra na tablecie lub telefonie (do potwierdzenia, sekcja 11). Motywacja: gry. Nauka szkolna wciąga go wtedy, gdy ma charakter rozgrywki.

**Cel dydaktyczny.** Opanowanie działu II biologii „Budowa i czynności życiowe organizmów” tak, by wiedza przenosiła się na sprawdzian „Wiesz czy nie wiesz?” (0-29 pkt). Zakres sprawdzianu: `TRESCI.md`, sekcja 8.

**Cel motywacyjny.** Gra, do której wraca się z własnej woli przez kilka tygodni, w sesjach po 10-15 minut.

**Kontekst.**

- Audiobook „Wyprawa do wnętrza życia”: sześć części po 10-15 minut, zgodnych z sześcioma tematami działu, w stylu programów przyrodniczych (opowieści o uczonych, metafory, doświadczenia domowe, podsumowanie na końcu każdej części). Tytuły części są tytułami światów w grze. Nagrania mp3 mogą trafić do `app/audio/` (sekcja 4.6). Tekst jest w repozytorium jako `AUDIOBOOK.md`.
- Wcześniejsze aplikacje Roberta do nauki: test wyboru i dopasowywanie par. Ta gra nie opiera głównej rozgrywki na tych formach.

## 2. Zasady projektowe

1. **Treść jako mechanika.** Gracz uczy się, robiąc to, czego dotyczy treść: buduje komórkę, steruje fotosyntezą, prowadzi śledztwo, układa łańcuchy pokarmowe, gospodaruje tlenem w biegu. Quiz jest formą bossa i powtórek, nie główną rozgrywką.
2. **Myślenie przyczynowe.** Zadania i informacja zwrotna pokazują „dlaczego”: brak magnezu → brak chlorofilu → żółknące liście; mało wody w wakuolach → roślina więdnie.
3. **Przypominanie zamiast rozpoznawania.** Powtórki oparte na aktywnym odtwarzaniu wiedzy, z rosnącymi odstępami (sekcja 4.2), mieszane między światami.
4. **Zgodność z formatem sprawdzianu.** Komponenty zadań odwzorowują typy zadań ze sprawdzianu (sekcja 5).
5. **Kompetencja i autonomia.** Trudność adaptacyjna z celem około 80% poprawnych odpowiedzi. Wybór kolejności misji w odblokowanych światach. Podpowiedzi dostępne, ale ograniczone.
6. **Nagrody informacyjne.** Nagroda oznacza opanowanie (kolor karty, ulepszenie mikroskopu, nowa scena), nie czas spędzony w grze. Bez kar za przerwy, bez serii z karą, bez losowych nagród, bez liczników czasu w trybie podstawowym.
7. **Domknięta sesja.** Sesja ma wyraźny koniec: ekran „Dzisiejsza wyprawa zakończona” z podsumowaniem, co opanowane, a co wróci w powtórkach.
8. **Ton.** Przygodowy, przyrodniczy, z humorem, bez infantylizmu. Krótkie zdania. Do gracza w drugiej osobie, formy męskie, imię z ustawień (domyślnie Mikołaj).

## 3. Struktura gry

### 3.1 Mapa, baza, pętla sesji

- **Mapa wyprawy:** sześć światów w kolejności części audiobooka. Świat 1 otwarty, kolejne odblokowuje pokonanie bossa poprzedniego. W panelu rodzica i w trybie deweloperskim można odblokować wszystkie.
- **Baza:** atlas, mikroskop, domowe laboratorium, panel rodzica.
- **Pętla sesji:** powtórki dnia (3-8 kart z minionym terminem) → misja w wybranym świecie (1-3 wyzwania) → boss, jeśli świat jest gotowy → podsumowanie i zapis. Powtórki dnia zawieszone decyzją z 2026-10-03 (bez planu powtórek; zob. sekcja 12).
- **Wstęp do świata:** ekran fabularny (2-4 zdania w duchu audiobooka), opcjonalny odtwarzacz nagrania danej części, lista „co tu zbadasz”.

### 3.2 Światy

Każdy świat ma cele (odwołanie do `TRESCI.md`), co najmniej trzy mechaniki i bossa.

#### Świat 1. Alfabet życia (składniki chemiczne organizmów)

Cele: `TRESCI.md` 2.1.

- **Ratuj organizm** (diagnoza): pojawia się objaw, gracz wskazuje składnik i jego funkcję. Przykłady: żółknące liście → magnez, składnik chlorofilu; słabe, łamliwe kości → sole wapnia, funkcja budulcowa; foka w lodowatej wodzie → warstwa tłuszczu, funkcja ochronna; kiełkujący ziemniak mięknie → skrobia, materiał zapasowy; przegrzanie w upale → woda w pocie, regulacja temperatury.
- **Sortownia:** przykłady przeciągane do związku i funkcji (miód → cukry, energetyczna; nasiona fasoli → białka, zapasowa; kopyta → białka, budulcowa; włoski nasion bawełny → celuloza, budulcowa; nasiona słonecznika → tłuszcze, zapasowa; enzymy w ślinie → białka, regulacyjna; DNA → kwasy nukleinowe, informacja o cechach).
- **Skład ciała:** gracz układa słupki składu ciała człowieka od największego do najmniejszego albo szacuje udział wody; porównanie z meduzą.
- **Misja domowa:** żucie chleba (sekcja 4.5).

Boss: przyporządkowanie funkcji, prawda/fałsz o funkcjach cukrów, białek i tłuszczów, rola wody w usuwaniu substancji, źródła wapnia i magnezu.

#### Świat 2. Miasto, którego nie widać (budowa komórki zwierzęcej)

Cele: `TRESCI.md` 2.2.

- **Budowa miasta-komórki:** elementy przeciągane na plan komórki; każdy uruchamia „usługę miasta” zgodną z funkcją (błona: granica i przejścia; jądro: polecenia i DNA; mitochondria: energia; rybosomy: białka; siateczka śródplazmatyczna: wytwarzanie i transport białek i tłuszczów; aparat Golgiego: przekształcanie i transport białek; wakuole: pochłanianie, trawienie, usuwanie). Brak elementu powoduje konkretną, przyczynową awarię.
- **Biuro zatrudnienia:** ogłoszenie z opisem funkcji → wybór elementu, i odwrotnie.
- **Kształt do zadania:** dobór kształtu komórki do funkcji (plemnik z wicią, kulista komórka jajowa z zapasami, komórka nerwowa z wypustkami, komórka nabłonka w kształcie kostki).
- **Mikroskop:** przy powiększeniu około 400 razy widoczne tylko błona komórkowa, cytoplazma i jądro; pozostałe elementy dopiero po ulepszeniu (sekcja 4.1). Scena obserwacji nabłonka jamy ustnej.
- **Dlaczego komórki są małe** (ciekawostka, opcjonalnie): rosnąca komórka, do której środka substancje docierają coraz wolniej.

Boss: podpisanie schematu komórki zwierzęcej, przyporządkowanie funkcji do wakuoli, mitochondrium i jądra, organizmy jedno- i wielokomórkowe.

#### Świat 3. Zielone twierdze i niewidzialni mieszkańcy (komórka roślinna, inne rodzaje komórek)

Cele: `TRESCI.md` 2.3. Świat kluczowy dla sprawdzianu (schemat komórki roślinnej).

- **Detektyw komórek:** wskazówki odsłaniane po jednej („mam ścianę komórkową”, „nie mam chloroplastów”, „moja ściana zawiera chitynę”, „zamiast jądra mam nić DNA w cytozolu”). Mniej wskazówek do trafnego rozpoznania daje więcej punktów. Błędne wskazanie → informacja, która wskazówka wyklucza ten wybór.
- **Konstruktor czterech komórek:** ten sam zestaw części, cztery plany (zwierzęca, roślinna, grzybowa, bakteryjna). Gra pilnuje reguł i je wyjaśnia (jądro w bakterii → „bakterie nie mają jądra”).
- **Siatka porównawcza:** tabela cztery typy komórek × elementy do wypełnienia (format sprawdzianu).
- **Woda w wakuoli:** suwak podlewania; wakuola pęcznieje albo się kurczy, roślina prostuje się albo więdnie; pytanie przyczynowe.
- **Kształty komórek roślinnych:** komórki aparatu szparkowego, włośniki, komórki przewodzące; dobór kształtu do funkcji.
- **Moczarka pod mikroskopem:** scena z krążącymi chloroplastami jako nagroda za ulepszenie mikroskopu.

Boss: podpisanie schematu komórki roślinnej (obowiązkowo), uzupełnianie zdań o budowie komórek bakterii, roślin i zwierząt, siatka porównawcza.

#### Świat 4. Kuchnia zasilana światłem (samożywność)

Cele: `TRESCI.md` 2.4.

- **Laboratorium fotosyntezy:** suwaki światła, dwutlenku węgla, wody, temperatury i soli mineralnych; licznik pęcherzyków tlenu z gałązki moczarki na minutę. Model: każdy czynnik ma zakres optymalny, niedobór i nadmiar obniżają wynik, a całość wyznacza czynnik najsłabszy. Model nie musi być fizjologicznie dokładny, ale nie może przeczyć `TRESCI.md`.
- **Najsłabsze ogniwo:** zadany stan, gracz wskazuje czynnik ograniczający, po korekcie licznik rośnie.
- **Projektant doświadczeń:** gracz buduje doświadczenie z próbą badawczą i kontrolną (woda gazowana i woda z kranu; światło i ciemność). Walidator: próby różnią się dokładnie jednym czynnikiem. Wniosek wybierany spośród zdań.
- **Przepis kuchenny:** składniki do „garnka” chloroplastu (dwutlenek węgla z powietrza przez aparaty szparkowe; woda z gleby przez korzenie i komórki przewodzące; światło pochłaniane przez chlorofil) i produkty (substancje pokarmowe, np. glukoza; tlen).
- **Trzy drogi glukozy:** źródło energii (obracanie się słonecznika ku słońcu), budowa ciała (truskawka), materiał zapasowy (skrobia w bulwie ziemniaka).
- **Szklarnia:** zwiększanie stężenia dwutlenku węgla i jego skutek.
- **Dno oceanu:** chemosynteza jako scena dodatkowa.

Boss: nazwy związków w schemacie fotosyntezy, wykorzystanie substancji pokarmowych, wpływ wzrostu stężenia dwutlenku węgla, interpretacja doświadczenia z moczarką.

#### Świat 5. Wielka uczta (cudzożywność)

Cele: `TRESCI.md` 2.5. Sceneria: Bieszczady (żubry, orzeł przedni, wilki, rysie, dziki, niedźwiedzie, kleszcze, jemioła, dżdżownice, grzyby) z wypadem na afrykańską sawannę (zebry, hieny cętkowane, sępy).

- **Atlas Bieszczad:** klasyfikacja organizmów przez przeciąganie kart do kategorii (roślinożerca, drapieżnik, padlinożerca, wszystkożerca, pasożyt zewnętrzny, pasożyt wewnętrzny, roślina pasożytnicza, półpasożyt, organizm odżywiający się szczątkami). Karty trafiają do atlasu.
- **Łańcuchy pokarmowe:** łańcuch zaczyna się od organizmu samożywnego; reguły kategorii (drapieżnik tylko po zwierzęciu, roślinożerca tylko po roślinie).
- **Pory roku:** zdarzenia zmieniające jadłospis wszystkożerców (wróbel zimą zjada nasiona, latem także owady; pisklęta karmi gąsienicami).
- **Pasożyt szuka żywiciela:** dobór par, rozróżnienie pasożytów zewnętrznych i wewnętrznych; reguła „zielony kolor = chlorofil” dla roślin pasożytniczych i półpasożytów.
- **Las bez sprzątaczy:** symulacja kolejnych lat; wyłączenie organizmów odżywiających się szczątkami → narastające szczątki; włączenie → szczątki znikają, gleba odzyskuje sole mineralne, rośliny rosną.
- **Trawienie jako rozbiórka:** złożone związki rozkładane na proste; trawienie wewnątrz ciała (dżdżownica) i na zewnątrz ciała (bakterie, grzyby, pleśniak biały).
- **Uczta, gra karciana** (opcjonalnie): drapieżnika kładzie się tylko na zwierzęciu, pasożyt odpada razem z żywicielem, padlinożerca bierze karty zwierząt ze stosu odrzuconych, a resztę stosu do talii zwracają wyłącznie organizmy odżywiające się szczątkami.

Boss: uzupełnianie zdań o cudzożywności, przyporządkowanie typów organizmów cudzożywnych do opisów, klasyfikacja, prawda/fałsz.

#### Świat 6. Ogień bez płomienia (sposoby oddychania organizmów)

Cele: `TRESCI.md` 2.6.

- **Sprint:** bieg z paskiem dostawy tlenu i zapotrzebowania na energię. Gdy dostawa nie nadąża, mięśnie uzyskują energię dzięki fermentacji mlekowej: energii jest mniej, rośnie poziom kwasu mlekowego; po biegu kwas mlekowy trafia z krwią do wątroby. Gracz przewiduje skutki i je wyjaśnia.
- **Sorter O/W:** szybkie sortowanie zdań na oddychanie komórkowe (O) i wymianę gazową (W). Format sprawdzianu.
- **Piekarnia drożdżowa:** temperatura wody (ciepła, nie gorąca), cukier, drożdże; ciasto rośnie dzięki dwutlenkowi węgla; alkohol odparowuje przy pieczeniu; pytania o produkty fermentacji alkoholowej.
- **Liść przez dobę:** suwak pory dnia; strzałki gazów przy aparatach szparkowych (dzień: fotosynteza i oddychanie, roślina oddaje tlen; noc: tylko oddychanie, roślina pobiera tlen i oddaje dwutlenek węgla).
- **Lustro:** fotosynteza i oddychanie tlenowe jako procesy odwrotne; substraty jednego są produktami drugiego.
- **Tabela porównawcza:** oddychanie tlenowe i fermentacja (tlen, miejsce, rozkład glukozy, produkty, ilość energii). Format sprawdzianu.
- **Woda wapienna:** interpretacja doświadczenia z drożdżami i próbą kontrolną.
- **Rozmnażanie a energia** (moduł krótki): rozmnażanie płciowe i bezpłciowe z przykładami.

Boss: oddychanie komórkowe czy wymiana gazowa, tabela porównawcza, produkty obu procesów, prawda/fałsz.

## 4. Mechaniki meta

### 4.1 Mikroskop

- Poziomy: lupa → mikroskop szkolny (około 400 razy: błona komórkowa, cytoplazma, jądro) → bardzo duże powiększenie (około 10 000 razy: elementy zawieszone w cytozolu).
- Ulepszenia za bossów światów 2 i 3.
- Widok nie może pokazywać więcej, niż pozwala dany poziom powiększenia.
- Okrągły widok przez okular może być motywem przewodnim interfejsu (sekcja 6.1).

### 4.2 Atlas i powtórki

(Zawieszone decyzją z 2026-10-03: bez planu powtórek; zob. sekcja 12.) Część o odstępach, terminach i dacie sprawdzianu nie obowiązuje do czasu nowej decyzji. Reguła zmiany koloru kart bez harmonogramu: sekcja 12, wpis z etapu 1.

- Karty: organizmy (`TRESCI.md`, sekcja 7), elementy komórek, pojęcia i procesy (np. fotosynteza, chemosynteza, fermentacja alkoholowa, wymiana gazowa, żywiciel).
- Stany karty: nieodkryta → brązowa → srebrna → złota. Awans wymaga poprawnego przypomnienia w innym dniu niż poprzednie, przy rosnących odstępach (np. 1, 3, 7, 14 dni). Błąd obniża kartę o jeden poziom i skraca odstęp; kolekcja nigdy nie jest zerowana.
- Jeśli w panelu rodzica wpisano datę sprawdzianu, odstępy są skracane tak, by każda karta miała co najmniej dwie powtórki przed tą datą.
- Przypomnienie to aktywne zadanie (wskaż kategorię, funkcję, miejsce na schemacie), nie samo obejrzenie karty.
- Powtórki dnia: do 8 kart z minionym terminem, wymieszanych między światami.
- Złota karta odsłania ciekawostkę (`TRESCI.md`, sekcja 6) jako nagrodę informacyjną.

### 4.3 Bossowie, rewanże, próbny sprawdzian

- Boss to mieszanka typów zadań sprawdzianowych z danego świata, bez podpowiedzi, z limitem błędów zamiast limitu czasu (np. trzy błędy kończą podejście; można od razu spróbować ponownie). W etapie 1: trzy serca, wyzwanie z błędem kosztuje jedno serce (sekcja 12).
- Pokonani bossowie wracają w powtórkach jako krótkie rewanże. (Zawieszone decyzją z 2026-10-03: bez planu powtórek; zob. sekcja 12.)
- **Próbny sprawdzian:** mieszanka wszystkich światów, punktacja 0-29 jak w podręczniku, bez podpowiedzi; raport słabych punktów w panelu rodzica.

### 4.4 Przewodnicy

Postacie z audiobooka dają podpowiedzi (ograniczona liczba na sesję) i krótkie anegdoty:

- Robert Hooke (świat 2): korek i nazwa „komórka”.
- Antoni van Leeuwenhoek (świat 3): bakterie w nalocie z zębów.
- Jan Baptysta van Helmont (świat 4): wierzba w donicy, masa drzewa z powietrza.
- Joseph Priestley (świat 6): świeca, mięta i „naprawione” powietrze.

Wizerunki stylizowane, rysowane od zera.

### 4.5 Domowe laboratorium

Misje w realnym świecie zaliczane przyciskiem „Zrobione z dorosłym”, każda z krótką instrukcją i uwagą o bezpieczeństwie:

- żucie chleba (enzym w ślinie rozkłada skrobię, chleb robi się słodkawy);
- balonik na butelce z ciepłą, nie gorącą wodą, cukrem i drożdżami (dwutlenek węgla z fermentacji);
- seler naciowy w wodzie z barwnikiem spożywczym (transport wody przez komórki przewodzące);
- jodyna na plastrze ziemniaka (ciemnoniebieskie zabarwienie wskazuje skrobię; ziemniaka potem nie jeść);
- zwiędnięta roślina podlana wodą (wakuole i ściana komórkowa);
- domowy jogurt (fermentacja mlekowa);
- przy dostępie do mikroskopu: nabłonek jamy ustnej, liść moczarki;
- wyzwanie budowlane (opcjonalnie, jeśli Mikołaj gra w Minecraft): model komórki w dużej skali z tabliczkami z nazwami.

### 4.6 Audiobook

- Folder `app/audio/` na pliki `czesc-1.mp3` … `czesc-6.mp3` (opcjonalne). Odtwarzacz na ekranie wstępu świata; brak pliku ukrywa odtwarzacz.
- Pliki audio poza wstępnym cache service workera (rozmiar); cache na żądanie.

### 4.7 Panel rodzica

- Wejście ukryte (np. przytrzymanie logo przez 3 sekundy i proste działanie matematyczne).
- Widok: postęp w światach, karty z największą liczbą błędów, łączny czas, wynik próbnego sprawdzianu.
- Ustawienia: imię gracza, data sprawdzianu, odblokowanie światów, dźwięk, reset postępu, eksport i import postępu (JSON). Data sprawdzianu zawieszona decyzją z 2026-10-03 (bez planu powtórek; zob. sekcja 12).

## 5. Typy zadań (komponenty wielokrotnego użytku)

Każdy typ to osobny komponent zasilany danymi z `data/`:

1. **Podpisywanie schematu:** etykiety przeciągane na punkty rysunku SVG (komórki: zwierzęca, roślinna, grzybowa, bakteryjna; schemat fotosyntezy z polami na dwutlenek węgla, wodę, światło, substancje pokarmowe, tlen).
2. **Prawda/fałsz z poprawką:** po wybraniu „fałsz” gracz wskazuje błędne słowo albo wybiera poprawną wersję zdania. Wariant **Wykrywacz bzdur:** postać (np. Profesor Pomyłka) opowiada krótką historię z 1-3 błędami merytorycznymi, gracz stuka błędne słowa i wybiera poprawki. Zrealizowany w etapie 5 jako wykład Profesora Pomyłki w każdym świecie (sekcja 12).
3. **Przyporządkowanie:** elementy do opisów (funkcje do wakuoli, mitochondrium, jądra; typy cudzożywne do opisów).
4. **Uzupełnianie luk:** bank słów (zdania o budowie komórek, o cudzożywności, o fotosyntezie).
5. **Klasyfikacja:** sortowanie kart do kategorii.
6. **Tabela porównawcza:** siatka ✓/✗ albo wybór wartości w komórkach tabeli.
7. **Doświadczenie:** wskazanie próby badawczej i kontrolnej, problemu badawczego, wyniku i wniosku.
8. **Szybki sorter:** dwie kategorie (oddychanie komórkowe/wymiana gazowa; dzień/noc).

Wymagania wspólne: dotyk i mysz (Pointer Events); alternatywa dla przeciągania (stuknięcie etykiety, potem miejsca); natychmiastowa informacja zwrotna z przyczyną; wynik zapisywany do modułu powtórek; każde zadanie ma odwołanie do sekcji `TRESCI.md`.

## 6. Oprawa i UX

### 6.1 Kierunek wizualny (do akceptacji przed kodem)

- Temat: dziennik wyprawy przyrodnika połączony z widokiem przez okular mikroskopu. Okrągła soczewka jako jeden zapamiętywalny element (przejścia między skalą krajobrazu a skalą komórki); reszta interfejsu spokojna i czytelna.
- Każdy świat z własnym klimatem i paletą: laboratorium (1), miasto komórki (2), zielona twierdza (3), słoneczna kuchnia (4), bieszczadzki las i sawanna (5), ogień i ruch (6), przy jednym wspólnym systemie typograficznym.
- Unikać rozwiązań szablonowych: identycznych zaokrąglonych kart z jednakowym cieniem, gradientów jako ozdoby, kremowego tła z terakotowym akcentem, wersalików nad każdym nagłówkiem, numerowania 01/02/03 tam, gdzie nie ma sekwencji.
- Przed kodem: plan tokenów (4-6 kolorów bazowych z wartościami hex, kroje i ich role, skala typograficzna), szkice ASCII ekranu mapy i ekranu zadania, uzasadnienie wyborów.

### 6.2 Schematy i ilustracje

- Schematy komórek rysowane od zera w SVG, w konwencjach szkolnych, żeby rozpoznawanie przenosiło się na rysunki ze sprawdzianu: zielone owalne chloroplasty; duża centralna wakuola w komórce roślinnej; ściana komórkowa jako wyraźna zewnętrzna warstwa; owalne mitochondria z pofałdowanym wnętrzem; aparat Golgiego jako stos spłaszczonych pęcherzy z pęcherzykami; siateczka śródplazmatyczna jako sieć kanalików; rybosomy jako drobne ziarenka; u bakterii nić DNA w cytozolu, otoczka śluzowa i rzęska.
- Organizmy jako spójne, proste piktogramy SVG.
- Bez kopiowania ilustracji z podręcznika i bez obrazów z internetu.

### 6.3 Dostępność i ergonomia

- Cele dotyku co najmniej 44 px; każde przeciąganie ma alternatywę stuknięciem.
- Duży, czytelny krój, wysoki kontrast, wiersze tekstu poniżej 70 znaków.
- `prefers-reduced-motion` respektowane; dźwięki krótkie i wyłączalne.
- Układ działający w pionie i w poziomie; bez funkcji niedostępnych w Safari na iPadzie i w Chrome na Androidzie.
- Kroje pisma z pełnymi polskimi znakami, dołączone lokalnie (praca offline), na licencji pozwalającej na osadzenie (np. OFL).

### 6.4 Teksty w interfejsie

- Krótkie zdania, przyciski nazwane działaniem („Sprawdź”, „Dalej”, „Zbuduj”), te same nazwy działań w całej grze.
- Informacja zwrotna: poprawna odpowiedź i jedno zdanie przyczynowe. Bez wyśmiewania błędów.

## 7. Technologia

- **Stos:** statyczna PWA: HTML, CSS, JavaScript (moduły ES), bez frameworka i bez kroku budowania, chyba że w etapie 0 pojawi się mocny powód (wtedy opcja do akceptacji).
- **PWA:** `manifest.webmanifest`, ikony, service worker (cache zasobów aplikacji, praca offline, komunikat o nowej wersji z przyciskiem odświeżenia).
- **Stan:** `localStorage` pod jednym kluczem, z numerem wersji schematu i migracjami; zapis po każdym zadaniu; eksport i import JSON.
- **Dane:** `data/` jako moduły ES lub JSON: pojęcia, elementy komórek, typy komórek, organizmy, pytania dla światów 1-6, ciekawostki. Każde pytanie ma: `id`, `swiat`, `typ`, treść, poprawną odpowiedź, wyjaśnienie, odwołanie do sekcji `TRESCI.md`.
- **Walidator danych** (`tools/validate-data.js`): unikalne id, kompletność pól, terminy zgodne ze słownikiem kanonicznym (`TRESCI.md`, sekcja 9), kategorie organizmów z dozwolonej listy.
- **Testy** (`node --test`): logika powtórek (awanse, spadki, terminy, skracanie odstępów przed sprawdzianem; zawieszone decyzją z 2026-10-03, zob. sekcja 12), punktacja, model fotosyntezy (wynik maleje przy niedoborze i nadmiarze każdego czynnika), model sprintu.
- **Struktura (stan po etapie 5):**

```
netlify.toml            publikacja katalogu app/, testy i walidator przed wdrożeniem
app/                    publikowana gra (tylko ten katalog trafia na stronę)
  index.html
  manifest.webmanifest
  sw.js                 service worker; WERSJA i PLIKI generuje tools/wersja.js
  css/                  tokeny, podstawy, ekrany, zadania, podpisywanie, mechaniki, procesy,
                        alfabet (świat 1), uczta (świat 5), wykrywacz (wykłady Profesora Pomyłki)
  js/core/              stan, zapis, adresy ekranów, światy, boss, próbny sprawdzian, karty
                        atlasu, dźwięki, daty, DOM
  js/components/        typy zadań (sekcja 5) i mechaniki światów; logika (*-logika.js)
                        oddzielona od widoku; zadania.js wybiera komponent według typu
  js/ekrany/            mapa, świat, misja, boss, podsumowanie, baza, atlas, mikroskop,
                        próbny sprawdzian, domowe laboratorium, panel rodzica
  data/                 moduły ES z treściami: światy (misje, bossowie), elementy i typy
                        komórek, pojęcia, organizmy, procesy (zapisy słowne), tabela
                        oddychania tlenowego i fermentacji, schematy, miasto, wskazówki
                        detektywa, części konstruktora, zależności pokarmowe do łańcuchów
                        (pokarm.js), próbny sprawdzian (sprawdzian.js), domowe
                        laboratorium (laboratorium.js), zadania/swiat-N.js
  assets/svg/           schematy komórek i fotosyntezy rysowane od zera
  assets/fonts/         kroje OFL z licencjami
  assets/ikony/
  audio/                opcjonalnie czesc-N.mp3, poza pamięcią offline; listę nagrań
                        zapisuje tools/wersja.js w js/wersja.js
tests/                  node --test
tools/                  validate-data.js, wersja.js, serwer.js, e2e.js, rozwiazania.js, ikony.js
.githooks/pre-commit    testy i walidator przed commitem
```

- **Wdrożenie:** Netlify z gałęzi `main`, publikacja statyczna; `netlify.toml` z nagłówkami cache (bez długiego cache dla `sw.js`).

## 8. Treści w grze

- Jedyne źródło prawdy: `TRESCI.md`. Pytania nie wprowadzają faktów spoza niego.
- Ciekawostki (`TRESCI.md`, sekcja 6) tylko w opisach kart, scenach i informacji zwrotnej, oznaczone jako ciekawostka; nigdy jako poprawna odpowiedź w zadaniu sprawdzianowym.
- Uproszczenia podręcznika (`TRESCI.md`, sekcja 5) obowiązują w zadaniach; dopiski o rzeczywistej złożoności dozwolone w kartach atlasu.
- Około 40 pytań na świat w różnych typach, żeby powtórki nie powtarzały się zbyt szybko. Każdy punkt zakresu sprawdzianu (`TRESCI.md`, sekcja 8) ma co najmniej jedną ćwiczącą go mechanikę i co najmniej pięć wariantów pytań.

## 9. Kryteria odbioru

- Każdy świat: co najmniej trzy mechaniki z sekcji 3.2, boss z co najmniej trzema typami zadań, dane przechodzące walidator.
- Sesję da się zakończyć w 15 minut; postęp przetrwa zamknięcie przeglądarki.
- Gra działa offline po pierwszym uruchomieniu i instaluje się na ekranie głównym.
- Każda błędna odpowiedź daje wyjaśnienie przyczynowe.
- Brak błędów w konsoli; testy i walidator przechodzą.
- Przed każdym wdrożeniem losowa próbka 20 pytań porównana z `TRESCI.md`.

## 10. Etapy

0. **Fundament:** plan wizualny do akceptacji; szkielet PWA, router ekranów, stan, moduł powtórek z testami, podstawowy panel rodzica, komponent podpisywania schematu, walidator danych, `netlify.toml`. Zrealizowany 2026-10-03 bez modułu powtórek (zob. sekcja 12).
1. **Wersja do pierwszego testu z Mikołajem:** świat 2 i świat 3 (komórki, najważniejsze dla sprawdzianu), mikroskop z dwoma poziomami, atlas elementów komórek, dwóch bossów. Po etapie: obserwacja gry Mikołaja i notatki. Zrealizowany 2026-10-03 (zob. sekcja 12): świat 2 z pięcioma misjami, świat 3 z siedmioma, dwóch bossów, atlas, mikroskop, baza.
2. **Świat 4 i świat 6:** procesy (fotosynteza, oddychanie, fermentacja), symulacje. Zrealizowany 2026-10-03 (zob. sekcja 12): świat 4 z siedmioma misjami, świat 6 z ośmioma, dwóch bossów, karty procesów, substancji i organizmów w atlasie.
3. **Świat 5 i świat 1:** atlas organizmów, łańcuchy pokarmowe, składniki chemiczne. Zrealizowany 2026-10-03 (zob. sekcja 12): świat 1 z sześcioma misjami, świat 5 z ośmioma, dwóch bossów, karty pierwiastków, związków chemicznych, sposobów zdobywania pokarmu i 47 nowych organizmów w atlasie.
4. **Domknięcie:** próbny sprawdzian, domowe laboratorium, audio, dopracowanie oprawy i dźwięku. Zrealizowany 2026-10-03 (zob. sekcja 12): próbny sprawdzian (14 zadań, 29 punktów) z raportem w panelu rodzica, domowe laboratorium (9 doświadczeń), odtwarzacz nagrań słuchowiska, krótkie dźwięki, przewodnicy na wstępach światów 2, 3, 4 i 6.
5. **Uzupełnienie projektu:** wykrywacz bzdur z sekcji 5 (typ 2, wariant), jedyny typ zadania z projektu, którego nie było po etapach 0-4. Zrealizowany 2026-10-03 (zob. sekcja 12): wykład Profesora Pomyłki jako dodatkowa misja w każdym świecie, po dwa wykłady.

Po każdym etapie: wdrożenie, lista rzeczy do sprawdzenia przez Roberta, korekty treści. Kolejność może się zmienić po odpowiedzi na pytanie o termin sprawdzianu.

## 11. Otwarte decyzje (pytania do Roberta na start)

Odpowiedzi z 2026-10-03 są dopisane przy pytaniach; wynikające z nich decyzje w sekcji 12.

1. Urządzenie główne: tablet czy telefon, Android czy iPad? Odpowiedź: tablet. System nieustalony: gra działa w Safari na iPadzie i w Chrome na Androidzie.
2. W co Mikołaj gra najchętniej (np. Minecraft, gry kolekcjonerskie, sportowe)? Od tego zależą oprawa i akcenty: budowanie, kolekcja, rywalizacja. Odpowiedź: Roblox.
3. Termin sprawdzianu i czy pierwsza wersja ma objąć wszystkie światy w uproszczonej formie. Odpowiedź: pełne światy (bez wersji uproszczonej); termin sprawdzianu niepodany; „nie rób planu powtórek”.
4. Czy będą nagrania audiobooka (mp3)? Odpowiedź: tekst słuchowiska z czatu Claude, zapisany jako `AUDIOBOOK.md`. Nagrania mp3: brak informacji; odtwarzacz pojawi się, gdy pliki trafią do `app/audio/`.
5. Nazwa gry i adres na Netlify. Odpowiedź: nazwa ostateczna „Wyprawa do wnętrza życia”; adres: https://biologia-gra.netlify.app.
6. Czy Mikołaj ma dostęp do mikroskopu? Brak odpowiedzi: misje z mikroskopem pozostają opcjonalne.
7. Czy potrzebny jest tryb rywalizacji z rodzicem na jednym urządzeniu? Odpowiedź: bez rywalizacji z rodzicem.

## 12. Dziennik decyzji

- 2026-10: dokument startowy przygotowany na podstawie rozmowy o audiobooku i koncepcji gry.
- 2026-10-03, odpowiedzi Roberta: tablet, Roblox, pełne światy, tekst słuchowiska z czatu Claude, nazwa ostateczna, bez rywalizacji z rodzicem, „nie rób planu powtórek”, wybór rozwiązań technicznych i wizualnych pozostawiony wykonawcy.
- 2026-10-03, plan powtórek: przyjęta interpretacja to brak harmonogramu powtórek (odstępy, terminy kart, powtórki dnia, skracanie odstępów przed sprawdzianem) i brak daty sprawdzianu w panelu rodzica. Sekcje 3.1, 4.2, 4.3, 4.7 i 7 mają przy tych fragmentach znacznik zawieszenia. Jeśli decyzja dotyczyła tylko daty sprawdzianu, moduł powtórek może wrócić w etapie 1. Koszt dydaktyczny: przypominanie z rosnącymi odstępami to najsilniej udokumentowany sposób utrwalania wiedzy; zastępczo gra pozwala powtarzać misje i pokazuje elementy do poćwiczenia.
- 2026-10-03, oprawa (Roblox): zachowany motyw soczewki okularu i tło zeszytu w kratkę; dodany „klockowy” język interakcji znany z gier: przyciski i etykiety z grubym konturem i twardym cieniem, wciskane przy dotknięciu; gruby, growy krój nagłówków. Schematy komórek zostają w konwencji szkolnej (przenoszenie na rysunki ze sprawdzianu).
- 2026-10-03, ostrość jako miara opanowania: obraz w soczewce świata jest nieostry i wyostrza się z odsetkiem zadań świata rozwiązanych co najmniej w 80%. Nagroda informacyjna, bez związku z czasem gry.
- 2026-10-03, paleta bazowa (barwniki laboratoryjne): papier #F4F6F1, atrament #1C2B2D, okular #11191B, błękit metylenowy #2457A6 (działanie, wybór), chlorofil #2E7D46 (poprawnie), eozyna #C2366B (do poprawy). Stan odpowiedzi zawsze także znakiem ✓/✗ i zdaniem, nie samym kolorem. Klimat światów: tła i akcenty w `app/css/tokeny.css`.
- 2026-10-03, kroje: Titan One (nagłówki, przyciski) i Lexend (tekst, etykiety), licencja OFL, pliki lokalne. Odrzucone po sprawdzeniu glifów: Lilita One (brak ą, ć, ę, ń, ś, ź, ż), Atkinson Hyperlegible Next (tylko przekreślone zero, nietypowe dla ucznia polskiej szkoły).
- 2026-10-03, technika: dane jako moduły ES; na Netlify publikowany tylko katalog `app/` (dokumenty projektu, w tym `CLAUDE.md` z imieniem dziecka, nie trafiają na stronę); polecenie budowania Netlify uruchamia testy i walidator, więc błąd zatrzymuje wdrożenie; adresy ekranów po znaku #; wersja gry to skrót zawartości plików (`tools/wersja.js`), dzięki czemu każda zmiana dociera do urządzeń; hak przed commitem w `.githooks/`.
- 2026-10-03, podpisywanie schematu: w treningu błędna etykieta wraca do banku, a komunikat podaje przyczynę i opis wskazanego elementu bez jego nazwy (przypominanie zamiast podpowiedzi); nazwa pada po drugiej błędnej próbie w tym samym miejscu; wynik liczy pierwsze próby. Dystraktorami mogą być tylko elementy, których dany typ komórki według `TRESCI.md` nie ma (pilnuje walidator). Na szerokim ekranie pola stoją obok numerów jak na sprawdzianie; komunikat i etykiety na tacce przy dolnej krawędzi ekranu.
- 2026-10-03, walidator: porównuje typy komórek z tabelą porównawczą w `TRESCI.md` (sekcja 2.3), sprawdza zawartość rysunków SVG (brak elementów, których typ komórki nie ma) i szuka terminów spoza `TRESCI.md` (np. „destruenci”, „organellum”, „retikulum”).
- 2026-10-03, panel rodzica: postęp w światach, najczęstsze pomyłki, czas w wyzwaniach, imię gracza, odblokowanie gotowych światów, kopia postępu w pliku (na iPadzie przez arkusz udostępniania), usuwanie postępu, informacja o instalacji i ochronie zapisu.
- 2026-10-03, adres gry: https://biologia-gra.netlify.app (Netlify, gałąź `main`). Repozytorium na GitHubie jest publiczne: dokumenty projektu, w tym imię i wiek gracza w `CLAUDE.md`, są widoczne publicznie. Ukrycie repozytorium nie przeszkadza we wdrożeniu na Netlify (decyzja Roberta).
- 2026-10-03, otwarte: rozkład punktów 0-29 na 14 punktów zakresu sprawdzianu (potrzebny do próbnego sprawdzianu, etap 4); kategorie pomocnicze z `TRESCI.md`, sekcja 7 („zwierzę (przykład)” itp.) nie trafiają do zadań klasyfikacyjnych.
- 2026-10-03, propozycje akcentów z gier Roblox na kolejne etapy (do decyzji): baza rozbudowywana wraz z opanowaniem jak w grach typu tycoon (nowe stanowiska i ulepszenia mikroskopu), boss jako tor przeszkód z punktami kontrolnymi zamiast licznika błędów, odznaki za pokonanych bossów, awatar badacza z elementami zdobywanymi za opanowanie.
- 2026-10-03, etap 1, zakres: świat 2 (misje: Plan miasta, Budowa miasta, Biuro zatrudnienia, Kształt do zadania, Pod mikroskopem; 22 zadania, 107 pozycji) i świat 3 (Zielona twierdza, Detektyw komórek, Konstruktor czterech komórek, Siatka porównawcza, Woda w wakuoli, Kształty komórek roślinnych, Niewidzialni mieszkańcy; 30 zadań, 182 pozycje). Punkty zakresu sprawdzianu z tych tematów mają co najmniej pięć wariantów: przyporządkowanie funkcji do wakuoli, mitochondrium i jądra (6), zdania o budowie komórek (6), schemat komórki roślinnej (7, na dwóch rysunkach). „Dlaczego komórki są małe” zostaje ciekawostką na karcie błony komórkowej.
- 2026-10-03, etap 1, misje i bossowie: misja ma stały zestaw 1-3 zadań (powtórka misji to to samo zadanie z innym ułożeniem etykiet); warianty losuje boss, po jednym z każdej puli. Boss jest dostępny po rozwiązaniu wszystkich zadań z misji świata (każde choć raz). Trzy serca; wyzwanie z choćby jednym błędem kosztuje serce; utrata trzech kończy podejście, nowe podejście od razu i z nowymi wariantami. Uzasadnienie: limit błędów zamiast czasu (SPEC, sekcja 4.3), a próg „wyzwanie bez błędu” jest prosty do zrozumienia dla 11-latka. Wygrana otwiera kolejny świat i ulepsza mikroskop; przegrana pokazuje elementy do poćwiczenia, bez kar. Mechaniki (miasto, detektyw, konstruktor, wakuola) są tylko w misjach, boss ma wyłącznie formaty sprawdzianu.
- 2026-10-03, etap 1, karty atlasu bez harmonogramu powtórek: nieodkryta, brązowa (co najmniej jedna poprawna odpowiedź), srebrna (od razu dobrze w dwóch różnych typach zadań), złota (od razu dobrze u bossa, czyli w warunkach sprawdzianu). Karta nie traci poziomu. Złota karta odsłania ciekawostkę z `TRESCI.md`, sekcja 6. Karty: elementy komórek, cztery typy komórek (w atlasie świata 3, bo tam są porównania), kształty komórek, pojęcia (komórka, organizm jedno- i wielokomórkowy, cytoplazma, komórka jądrowa i bezjądrowa, chlorofil).
- 2026-10-03, etap 1, mikroskop: lupa na start (komórek nie widać), około 400 razy za bossa świata 2 (nabłonek jamy ustnej z podpisami błony, cytoplazmy i jądra; liść moczarki z krążącymi chloroplastami jako oznaczona ciekawostka), około 10 000 razy za bossa świata 3 (schematy czterech komórek; dotknięcie elementu podaje nazwę i funkcję). Preparaty drożdży i bakterii tylko przy 10 000 razy, bo `TRESCI.md` nie opisuje, co widać przy 400 razy.
- 2026-10-03, etap 1, prawda/fałsz: zdanie fałszywe poprawia się wyborem prawdziwej wersji. Wskazywanie błędnego słowa zostaje tylko dla tekstów z jednoznacznym błędem (np. przyszły „Wykrywacz bzdur”), bo w zdaniu „X robi Y” błąd można poprawić i w X, i w Y; gra uznałaby wtedy poprawne rozumowanie za błąd.
- 2026-10-03, etap 1, detektyw komórek: lupy za liczbę wskazówek tylko przy trafieniu „na pewno” (gdy odsłonięte wskazówki wykluczają pozostałe komórki); trafienie na zgadywanie nie daje lup i nie liczy się jako „od razu dobrze”. Wskazówka o budulcu ściany (chityna, celuloza) nie wyklucza bakterii, bo `TRESCI.md` nie podaje budulca ich ściany.
- 2026-10-03, etap 1, konstruktor czterech komórek: części to elementy z tabeli porównawczej (`TRESCI.md`, sekcja 2.3) i nić DNA. Bez siateczki śródplazmatycznej i aparatu Golgiego, bo `TRESCI.md` nie rozstrzyga ich obecności w komórce grzybowej (pojawiają się na planie zwierzęcej i roślinnej po zbudowaniu). Nić DNA w komórce jądrowej jest odrzucana z wyjaśnieniem, że DNA jest tam w jądrze komórkowym; tabela porównawcza nie zawiera wiersza „nić DNA”. Otoczka śluzowa jest w bakterii dozwolona, ale nie wymagana; rzęski nie ma wśród części (wpis o rzęsce niżej).
- 2026-10-03, etap 1, woda w wakuoli: scena (suwak podlewania, roślina i komórka liścia) ilustruje ciekawostkę o balonie w pudełku z oznaczeniem „Ciekawostka”; pytania dotyczą tylko faktów z sekcji 2.3 (wakuola utrzymuje odpowiednią ilość wody, ściana nadaje kształt). Rysunek nie pokazuje odstawania błony od ściany, bo tego nie ma w `TRESCI.md`.
- 2026-10-03, etap 1, budowa miasta: nazwy usług to przenośnie ze słuchowiska (elektrownie, warsztaty białek, sortownia paczek); awarie są dobrane tak, by każda pasowała do jednego elementu według `TRESCI.md` (tłuszcze tylko siateczka, przekształcanie białek tylko aparat Golgiego, trawienie tylko wakuole).
- 2026-10-03, etap 1, przykłady organizmów jedno- i wielokomórkowych: tylko takie, które wynikają z `TRESCI.md` (bakterie, drożdże; zwierzęta, rośliny z tabeli organizmów). Komórka grzybowa narysowana bez siateczki i aparatu Golgiego (jak wyżej).
- 2026-10-03, etap 1, rzęska: tabela w `TRESCI.md` (sekcja 2.3) podaje rzęskę tylko „u części” bakterii, a w pozostałych komórkach ✗. Jako zdanie ogólne „komórka zwierzęca nie ma rzęski” jest nieprawdziwe (rzęski mają np. komórki nabłonka dróg oddechowych), a sekcja 5 nie wymienia tego uproszczenia. Dlatego rzęska nie jest dystraktorem przy schematach komórek zwierzęcej i roślinnej, nie ma jej w tabelach do wypełnienia ani wśród części konstruktora; występuje tylko jako element komórki bakteryjnej. Do decyzji Roberta: dopisanie uproszczenia do `TRESCI.md`, sekcja 5.
- 2026-10-03, etap 1, przegląd treści względem `TRESCI.md` (niezależny przegląd wszystkich tekstów światów 2 i 3): poprawione m.in. „wszystkie komórki” na „wszystkie cztery rodzaje komórek”, opisy funkcji, które pasowały do dwóch elementów (rybosomy i siateczka śródplazmatyczna, wakuole i błona komórkowa), zdania spoza `TRESCI.md` (pofałdowane wnętrze mitochondrium, położenie ściany bakterii, powierzchnia włośników), fałszywe zdanie o największej komórce (komórka nerwowa bywa rozumiana jako najdłuższa), wyjaśnienia w scenie wakuoli (funkcja wakuoli w komórce roślinnej), forma gramatyczna komunikatów.
- 2026-10-03, etap 1, dwa rysunki komórki roślinnej (prostokątna i wydłużona, inny układ elementów), żeby rozpoznawanie nie opierało się na jednym obrazie; oba w misji „Zielona twierdza” i w puli bossa (siedem wariantów podpisywania). Do rozważenia po teście z Mikołajem: dźwięki, liczba serc u bossa.
- 2026-10-03, etap 2, zakres: świat 4 (misje: Przepis kuchenny, Trzy drogi glukozy, Laboratorium fotosyntezy, Najsłabsze ogniwo, Projektant doświadczeń, Samożywni, Dno oceanu; 28 zadań, w tym 12 tylko u bossa) i świat 6 (Sprint, Oddychanie czy wymiana gazowa?, Piekarnia drożdżowa, Woda wapienna, Liść przez dobę, Lustro, Tabela porównawcza, Rozmnażanie a energia; 31 zadań, w tym 12 tylko u bossa). Bossowie: „Szef kuchni” (schematy fotosyntezy i zapis słowny, wykorzystanie substancji pokarmowych, doświadczenia z dwutlenkiem węgla i światłem) i „Strażnik ognia” (oddychanie komórkowe czy wymiana gazowa, tabela porównawcza, produkty procesów, prawda/fałsz). Boss świata 3 otwiera świat 4, a boss świata 4 świat 6, dopóki świat 5 jest w budowie; otwarty świat zostaje otwarty także po dodaniu świata 5 (lista otwartych światów jest w zapisie). Mikroskop ulepszają nadal tylko bossowie światów 2 i 3. Punkty zakresu sprawdzianu 7, 8, 9, 12, 13 i 14 (`TRESCI.md`, sekcja 8) mają w pulach bossów po co najmniej pięć wariantów (punkt 7: siedem).
- 2026-10-03, etap 2, nowe formaty sprawdzianowe w bossach: przyporządkowanie zdań do dwóch albo trzech grup (szybki sorter), tabela porównawcza z wartościami do wpisania, tabela ✓/✗ produktów procesów, doświadczenie z pytaniami. Mechaniki (przepis, laboratorium, projektant, sprint, liść przez dobę) są tylko w misjach.
- 2026-10-03, etap 2, procesy jako dane: `data/procesy.js` opisuje fotosyntezę, oddychanie tlenowe, fermentację alkoholową i mlekową (składniki, warunki, produkty, miejsce w komórce, zapis słowny dosłownie z `TRESCI.md`). Walidator sprawdza, czy zapis złożony z nazw kart jest identyczny z zapisem w `TRESCI.md`, a tabelę oddychania tlenowego i fermentacji porównuje z tabelą w sekcji 2.6. W fotosyntezie glukoza jest równoważna „substancjom pokarmowym” (sekcja 2.4: substancje pokarmowe, głównie glukoza), dzięki czemu lustro łączy fotosyntezę z oddychaniem tlenowym przez glukozę, a zapis słowny zostaje podręcznikowy.
- 2026-10-03, etap 2, model fotosyntezy w laboratorium: pięć czynników z sekcji 2.4, każdy na pięciu poziomach; niedobór i nadmiar zmniejszają intensywność, a całość wyznacza czynnik najsłabszy (w grze: łańcuch jest tak mocny, jak jego najsłabsze ogniwo). Model jest poglądowy, nie fizjologiczny; testy pilnują zgodności z `TRESCI.md` (w ciemności brak pęcherzyków tlenu, w wodzie gazowanej więcej). Moczarka żyje w wodzie, więc w akwarium nie ma suwaka wody; woda jest czynnikiem tylko w szklarni. Liczby pęcherzyków w tabelach wyników są przykładowe; kierunek różnicy wynika z `TRESCI.md`.
- 2026-10-03, etap 2, doświadczenia: o próbę badawczą i kontrolną gra pyta tam, gdzie `TRESCI.md` je wskazuje (woda gazowana i woda z kranu, słoik z drożdżami i bez nich) albo gdzie wynikają wprost z definicji (szklarnie z dodatkowym dwutlenkiem węgla i bez niego). W doświadczeniu ze światłem gra nie pyta, która próba jest kontrolna, bo `TRESCI.md` tego nie rozstrzyga; pyta o problem badawczy, różnicę między próbami i wynik. Projektant doświadczeń planuje tylko doświadczenie ze światłem: przy modelu czynnika najsłabszego niektóre poprawne plany z dwutlenkiem węgla dawałyby równe wyniki obu prób (walidator sprawdza wszystkie dobre plany).
- 2026-10-03, etap 2, luki: w sąsiednich lukach nie stoją słowa równorzędne (np. dwa składniki fotosyntezy), bo zamiana ich kolejności byłaby poprawna, a gra uznałaby ją za błąd. Takie zadania przepisane tak, by każda luka miała jednoznaczną rolę w zdaniu.
- 2026-10-03, etap 2, sprint: wersja ze słuchowiska dopuszczona w `TRESCI.md`, sekcja 5: przy niedoborze tlenu część energii pochodzi z fermentacji mlekowej, a oddychanie tlenowe trwa dalej. Bieg to trening z długim finiszem, a nie bieg na 60 m ze słuchowiska, bo `TRESCI.md` wiąże fermentację mlekową z długą, bardzo intensywną pracą. Kwas mlekowy zostaje w mięśniach tuż po wysiłku i znika po kilkudziesięciu minutach odpoczynku (krew przenosi go do wątroby). Zakwasy tylko jako ciekawostka na karcie kwasu mlekowego.
- 2026-10-03, etap 2, piekarnia drożdżowa: przepis fermentacji alkoholowej z rosnącym ciastem (dwutlenek węgla spulchnia ciasto). Temperatura wody i odparowanie alkoholu przy pieczeniu (słuchowisko, sekcja 3.2) nie weszły do zadań, bo nie ma ich w `TRESCI.md`.
- 2026-10-03, etap 2, liść przez dobę: pytania tylko w południe i o północy, bo `TRESCI.md` nie opisuje świtu ani zmierzchu. W dzień zachodzą fotosynteza i oddychanie, liść oddaje tlen i pobiera dwutlenek węgla do fotosyntezy; w nocy zachodzi tylko oddychanie, liść pobiera tlen i oddaje dwutlenek węgla.
- 2026-10-03, etap 2, sorter „oddychanie komórkowe czy wymiana gazowa”: zdania grupy „oddychanie komórkowe” są prawdziwe dla całego oddychania komórkowego, także fermentacji (np. „Zachodzi wewnątrz komórek, m.in. w mitochondriach”, „U większości organizmów zużywa w komórkach glukozę i tlen”). Część z nich celowo zawiera słowa „tlen” i „dwutlenek węgla”, żeby ćwiczyć typowy błąd z sekcji 4. W klasyfikacji sposobów wymiany gazowej kot i człowiek mają dopisek „(ssak)”, bo `TRESCI.md` podaje płuca dla ssaków, a nie dla konkretnych zwierząt.
- 2026-10-03, etap 2, lustro: światło wchodzi do chloroplastu, glukoza i tlen wędrują do mitochondrium, dwutlenek węgla i woda wracają do chloroplastu, energia wychodzi z mitochondrium. Informacja zwrotna nazywa rolę substancji w obu procesach i kierunek jej wędrówki (np. „Tlen to produkt fotosyntezy i składnik oddychania tlenowego”).
- 2026-10-03, etap 2, atlas: nowe grupy kart: procesy, substancje i organizmy (14 organizmów z `TRESCI.md`, sekcja 7, z kategoriami dosłownie z tabeli). Ciekawostki z sekcji 6 trafiły na karty (m.in. połowa tlenu z mórz i oceanów, ogień bez płomienia, lustro, paliwo z alkoholu, zakwasy, odkrycie z 1977 roku) i do wstępów światów (van Helmont, Priestley).
- 2026-10-03, etap 2, światło w przepisie fotosyntezy: osobne pole „Zasilanie” nad garnkiem zamiast miejsca wśród składników, zgodnie z zapisem słownym (warunki stoją nad strzałką) i z nazwą świata („Kuchnia zasilana światłem”). Unika to odpowiedzi „substraty: dwutlenek węgla, woda i światło” na sprawdzianie (`TRESCI.md`, sekcja 8, punkt 7). Komunikaty rozróżniają składnik i warunek („w zapisie słownym stoi nad strzałką”). Odstępstwo od słowa „składniki” w sekcji 3.2.
- 2026-10-03, etap 2, przegląd treści względem `TRESCI.md` (niezależny przegląd wszystkich tekstów światów 4 i 6): poprawione m.in. kolejność kroków laboratorium (nadmiar soli przy upale nie zmieniał wyniku, co przeczyło regule „nadmiar zmniejsza intensywność”; walidator pilnuje teraz, by w trybie przewidywania każdy krok zmieniał wynik), zdania „światło pochłania chlorofil” (szyk dwuznaczny, teraz „chlorofil pochłania światło”), nazwy poziomów dwutlenku węgla w szklarni (powietrze zamiast wody), komunikat o energii w lustrze (fotosyntezę zasila energia świetlna, a nie energia z oddychania), wynik doświadczenia w szklarniach dopisany do opisu, zdanie sortera pasujące do obu grup, wyjaśnienia bez przyczyny i drobne błędy językowe.
- 2026-10-03, otwarte (do decyzji Roberta): w przepisach i w lustrze to, z czego powstają produkty, nazywa się „składnikami” (metafora kuchni), a ciekawostka z `TRESCI.md` i opis sprawdzianu (sekcja 8, punkt 7) mówią o „substratach”. Możliwości: zostawić „składnik”, pisać „składnik (substrat)” albo przejść na „substrat”.

- 2026-10-03, etap 3, zakres: świat 1 „Alfabet życia” (misje: Alfabet życia, Skład ciała, Woda na pięciu etatach, Ratuj organizm, Sortownia, Cukry, białka, tłuszcze; 28 zadań, w tym 12 tylko u bossa) i świat 5 „Wielka uczta” (Wielka uczta, Kto co je?, Atlas Bieszczad, Atlas świata, Łańcuchy pokarmowe, Pasożyt szuka żywiciela, Trawienie jako rozbiórka, Las bez sprzątaczy; 30 zadań, w tym 10 tylko u bossa). Bossowie: „Bibliotekarz” (rola wody w usuwaniu substancji, sole wapnia i magnez, prawda/fałsz o funkcjach cukrów, białek i tłuszczów, przyporządkowanie funkcji) i „Król Bieszczad” (uzupełnianie zdań o cudzożywności, przyporządkowanie typów organizmów cudzożywnych do opisów, klasyfikacja, prawda/fałsz). Punkty zakresu sprawdzianu 1, 2, 3, 10 i 11 (`TRESCI.md`, sekcja 8) mają w pulach bossów po pięć wariantów. Wszystkie sześć światów jest gotowych.
- 2026-10-03, etap 3, kolejność światów: nowy gracz zaczyna od świata 1, a każdy kolejny świat otwiera boss poprzedniego (1, 2, 3, 4, 5, 6), zgodnie z kolejnością części słuchowiska i podręcznika. Świat, który gracz już otworzył albo w którym ma wyniki, zostaje otwarty: świat 2 nie zamyka się temu, kto od niego zaczynał (także przy zapisie sprzed listy otwartych światów), a świat 6 temu, kto pokonał bossa świata 4. Gra nie odbiera tego, co już zdobyte.
- 2026-10-03, etap 3, łańcuchy pokarmowe: `TRESCI.md` nie opisuje łańcuchów i podaje tylko kilka par „kto kogo zjada”. Łańcuch ma jedną lukę; dobre ogniwa wynikają wyłącznie z par w `data/pokarm.js` (np. orzeł przedni poluje na lisy, niedźwiedź brunatny zjada jelenie, wróbel latem zjada owady), a każdą złą opcję wyklucza sama definicja kategorii (roślinożerca nie zjada zwierząt, drapieżnik nie żywi się roślinami, łańcuch zaczyna się od organizmu samożywnego). Opcji, której definicja nie wyklucza (np. wilk po jeleniu), gra nie pokazuje, bo nie mogłaby uznać jej za błąd bez faktów spoza `TRESCI.md`. Walidator pilnuje obu reguł. Łańcuchy są tylko w misjach.
- 2026-10-03, etap 3, las bez sprzątaczy: poglądowy model rok po roku (opad liści, rozkład, sole mineralne w glebie, wielkość roślin). Pytania dotyczą faktów z sekcji 2.5: bez organizmów odżywiających się szczątkami szczątki się gromadzą; te organizmy żyją w glebie, w ściółce, na dnie zbiorników wodnych i w mule. Zwrot soli mineralnych glebie i „las utonąłby we własnych szczątkach” to ciekawostka z sekcji 6 w ramce po pierwszym etapie bez tych organizmów; mniejsze rośliny przy braku soli wynikają z sekcji 2.4.
- 2026-10-03, etap 3, trawienie jako rozbiórka: enzymy trawienne rozkładają cukry, białka i tłuszcze z pokarmu na związki proste; stuknięcie związku bez enzymów daje komunikat, że sam związek się nie rozłoży. Trawienie wewnątrz ciała (dżdżownica) i na zewnątrz ciała (bakterie i grzyby, np. pleśniak biały) w szybkim sorterze.
- 2026-10-03, etap 3, mechaniki świata 1: Ratuj organizm (objaw, potem składnik i jego funkcja, scena przed i po; przypadki z sekcji 2.1; przy kiełkującym ziemniaku odpowiedź wynika z sekcji 2.1 i 2.4, a przyczyna mięknięcia jest ciekawostką z sekcji 6 w ramce), Sortownia (siatka związek × funkcja; komunikat mówi, czy nie zgadza się związek, funkcja, czy jedno i drugie), Skład ciała (ranking, potem słupki z wartościami z podręcznika z dopiskiem „wartości orientacyjne” z sekcji 5 i porównanie z meduzą w tej samej skali). Woda jest kartą świata 1 (związek chemiczny), tasiemiec uzbrojony kartą świata 5. Misja domowa z żuciem chleba czeka na domowe laboratorium (etap 4); ciekawostka o chlebie jest we wstępie świata i na karcie enzymów.
- 2026-10-03, etap 3, pory roku i gra karciana: zmiany jadłospisu wróbla (zimą nasiona, latem także owady, pisklęta karmione larwami owadów) ćwiczą luki o wszystkożercach, bez osobnej mechaniki. Opcjonalna gra karciana „Uczta” nie weszła do etapu; do decyzji przy etapie 4.
- 2026-10-03, etap 3, atlas: karty pierwiastków, związków chemicznych, sposobów zdobywania pokarmu i 47 nowych organizmów; każda karta ma własny piktogram. Pole `uwaga` (dopisek w karcie atlasu, nigdy w zadaniu) tylko przy uproszczeniach z `TRESCI.md`, sekcja 5: słonecznik (ruch kwiatów dotyczy głównie młodych roślin) i hiena cętkowana (także sprawny drapieżnik). Walidator to sprawdza.
- 2026-10-03, etap 3, poprawka błędu z etapu 0: `Element.append(null)` wstawiał napis „null” w wyniku misji i wyzwania bossa (gdy nie było kart do poćwiczenia), w sorterze bez sceny i w diagnozie bez ciekawostki. Te miejsca używają teraz `dolacz` z `core/dom.js`, a test całej gry sprawdza po każdym zadaniu, czy na ekranie nie ma napisów „null”, „undefined” ani „NaN”.
- 2026-10-03, etap 3, karty atlasu do odkrycia w misjach: każdą kartę można odkryć w co najmniej jednym zadaniu misji, a nie tylko w wariancie bossa (dotąd tak było z kilkoma organizmami świata 5, z pojęciami „pasożyt zewnętrzny” i „pasożyt wewnętrzny” oraz z kartą „komórka bezjądrowa”). Dwie klasyfikacje z puli bossa świata 5 tworzą nową misję „Atlas świata” (pula bossa ich nie traci); w klasyfikacji pasożytów kleszcz i tasiemiec liczą się do kart pojęć (oba organizmy odkrywa zadanie „Pasożyt szuka żywiciela”); w klasyfikacji komórek jądrowych i bezjądrowych komórka bakteryjna liczy się do karty „komórka bezjądrowa”. Test całej gry sprawdza, że po przejściu wszystkich misji i bossów odkryte są wszystkie karty.
- 2026-10-03, oznaczenie autorstwa (prośba Roberta): „© 2026 Robert Gutkowski” w stopce mapy, w metadanych strony (author) i w README. Znak © informuje o autorstwie i nie wymaga rejestracji (prawo autorskie powstaje z chwilą stworzenia utworu); znak ® oznacza zarejestrowany znak towarowy, więc bez rejestracji w Urzędzie Patentowym nie jest używany. Kroje pisma mają własną licencję OFL.
- 2026-10-03, etap 3, przegląd treści względem `TRESCI.md` (niezależny przegląd wszystkich tekstów światów 1 i 5): poprawione m.in. zdanie „Magnez buduje kości” oznaczone jako fałsz (w rzeczywistości część magnezu jest w kościach; zadanie pyta teraz o chlorofil) i opcja magnezu przy słabych kościach w diagnozie, dystraktor pasujący do półpasożyta („organizm, który sam wytwarza pokarm”), zdanie sortera prawdziwe dla obu sposobów trawienia, wyjaśnienia w łańcuchach sprzeczne z przyrodą (zięba, koliber i gil jedzą też owady; dystraktorami są teraz duzi roślinożercy), szyk zdań możliwy do odczytania na odwrót („Kości budują sole wapnia”), uogólnienia spoza `TRESCI.md`, dystraktory bliskie opisom w przyporządkowaniach, forma „Bieszczadów”, przykłady „np.” przy podmiocie w kartach. Pule bossa świata 1 mocniej ćwiczą punkty 1 i 2 (luka „usuwanie”, sole mineralne jako źródło wapnia i magnezu). Podpowiedzi luk wyjaśniają zamianę słów między lukami także w bossie. Przypadek ziemniaka w diagnozie pyta o fakt z sekcji 2.4 (rozwój nowych pędów), a mięknięcie bulwy zostaje ciekawostką w ramce.
- 2026-10-03, otwarte (do decyzji Roberta): `TRESCI.md` nie opisuje łańcuchów pokarmowych (pojęcie i reguła „łańcuch zaczyna się od organizmu samożywnego” są tylko w SPEC 3.2), a gil, zięba i koliber są w tabeli organizmów roślinożercami, choć w przyrodzie jedzą też owady (zięba karmi pisklęta gąsienicami). Możliwość: dopisać oba uproszczenia do `TRESCI.md`, sekcja 5.
- 2026-10-03, etap 4, próbny sprawdzian: czternaście zadań w kolejności punktów zakresu z `TRESCI.md`, sekcja 8; każde losowane z puli co najmniej pięciu wariantów (pule bossów; walidator sprawdza liczbę punktów zakresu, sumę punktów, formaty sprawdzianu i liczbę wariantów). Rozkład 29 punktów (1, 2, 3, 3, 2, 3, 2, 2, 1, 2, 2, 2, 3, 1) przyjęty bez treści podręcznikowego sprawdzianu, do zmiany w `data/sprawdzian.js`. Punkty za zadanie: część poprawnych odpowiedzi razy liczba punktów, w dół do pełnych punktów. Po każdym zadaniu punkty i wyjaśnienie (zasada 6), bez podpowiedzi i bez limitu czasu; na końcu wynik i tematy z brakami z odnośnikiem do misji, bez ocen szkolnych (nacisk na to, co poćwiczyć, a nie na stopień). Dostęp po pokonaniu bossów wszystkich światów albo po odblokowaniu wszystkich światów w panelu rodzica (wtedy sprawdzian można zrobić przed terminem sprawdzianu). Dobre odpowiedzi liczą się do złotych kart jak u bossa. Zapis pamięta 20 ostatnich wyników; panel rodzica pokazuje ostatnie wyniki, tematy ostatniego podejścia i najsłabsze tematy z trzech ostatnich podejść.
- 2026-10-03, etap 4, domowe laboratorium: dziewięć doświadczeń z sekcji 4.5 (słodki chleb, jodyna na ziemniaku, komórki z policzka i liść moczarki pod mikroskopem, model komórki, roślina, która się prostuje, kolorowy seler, balonik nadmuchany przez drożdże, domowy jogurt), każde z uwagą o bezpieczeństwie przed krokami, obserwacją, wyjaśnieniem według `TRESCI.md` i ciekawostką dosłownie z sekcji 6. Obserwacja z jodyną (ciemnoniebieskie zabarwienie wskazuje skrobię) pochodzi z sekcji 4.5, nie z `TRESCI.md`: doświadczenia nie są zadaniami sprawdzianowymi. Zamiast Minecrafta „gra z budowaniem” (Mikołaj gra w Roblox). Oznaczenie „Zrobione z dorosłym” można cofnąć; za doświadczenia nie ma punktów.
- 2026-10-03, etap 4, nagrania słuchowiska: odtwarzacz na wstępie świata pokazuje się tylko przy pliku `audio/czesc-N.mp3`; listę nagrań zapisuje `tools/wersja.js` w `js/wersja.js`, więc gra nie odpytuje serwera o brakujące pliki. Nagrania nie trafiają do pamięci offline (rozmiar, odtwarzanie fragmentami).
- 2026-10-03, etap 4, dźwięki: cztery krótkie sygnały syntezowane w Web Audio (dobra odpowiedź, błąd, zadanie bez błędu, wygrana z bossem i koniec sprawdzianu), bez plików; dźwięk błędu jest cichy i niski, informuje, nie karze. Domyślnie włączone, przełącznik w panelu rodzica.
- 2026-10-03, etap 4, przewodnicy: Robert Hooke (świat 2), Antoni van Leeuwenhoek (świat 3), Jan Baptysta van Helmont (świat 4) i Joseph Priestley (świat 6) na wstępach światów, z wizerunkiem rysowanym od zera i ciekawostką z `TRESCI.md`, sekcja 6; opisy postaci ze słuchowiska. Podpowiedzi przewodników z limitem na sesję (sekcja 4.4) nie weszły: po błędzie gra już podaje przyczynę, a od drugiej próby wskazuje poprawne miejsce; osobny przycisk podpowiedzi zmieniłby liczenie „od razu dobrze”. Do decyzji po obserwacji gry Mikołaja.
- 2026-10-03, etap 4, zapis postępu w wersji 3 (wyniki sprawdzianów, domowe laboratorium, ustawienie dźwięku); starsze zapisy i kopie w plikach są przenoszone automatycznie.
- 2026-10-03, etap 4, przegląd tekstów etapu 4 (niezależny przegląd próbnego sprawdzianu, domowego laboratorium, panelu rodzica i przewodników): w laboratorium dopisane zasady bezpieczeństwa (kropla kontrolna na talerzyku i sprzątanie przy jodynie, nowy patyczek do pobrania komórek, ostrość ustawiana od najmniejszego powiększenia, lusterko mikroskopu nigdy w stronę słońca, butelka z drożdżami bez korka, jogurt z mleka UHT albo pasteryzowanego w słoiku wyparzonym przez dorosłego, o jedzeniu jogurtu decyduje dorosły, resztki moczarki do kosza, nie do stawu), wyjaśnienia podające przyczynę (chleb, seler, jogurt) i uwaga we wstępie, że dorosły czyta całą instrukcję przed doświadczeniem. W próbnym sprawdzianie każdy wariant sprawdza dokładnie temat punktu: z pul wypadły luki o komórce grzybowej (punkt 5) i klasyfikacja „potrzebne czy powstaje” (punkt 7), a luki o oddychaniu tlenowym w punkcie 14 zastąpiło nowe zadanie prawda/fałsz o produktach oddychania tlenowego i obu fermentacji (także w puli bossa świata 6). Odnośniki „Poćwicz” przy temacie 11 prowadzą do misji kart z błędem (pasożyty, organizmy odżywiające się szczątkami), a nie zawsze do „Atlasu Bieszczadów” (pole `misjeKart`, sprawdzane przez walidator). Teksty: „W każdym podejściu zadania są losowane od nowa” zamiast obietnicy nowych wariantów (losowanie może powtórzyć wariant), „Do zdobycia: 3 punkty” przy zadaniu, odmiana „punkt, punkty, punktów” także w bazie i panelu, w panelu wynik z datą w nawiasie, procent zdobytych punktów przy najsłabszych tematach i uwaga, że wynik jest orientacyjny. Opisy przewodników nie powtarzają ciekawostki (Hooke: „angielski uczony”, Leeuwenhoek: „holenderski kupiec i badacz sprzed około 350 lat”).
- 2026-10-03, otwarte (do decyzji Roberta), etap 4: rozkład 29 punktów na zadania jest przyjęty w grze; przy dostępie do podręcznikowego sprawdzianu albo jego punktacji wystarczy zmienić liczby w `data/sprawdzian.js`. Opisy przewodników (kraj, zawód, czas) pochodzą ze słuchowiska, nie z `TRESCI.md`; to tło postaci, nie treść zadań. Podpowiedzi przewodników (sekcja 4.4) czekają na obserwację gry Mikołaja.
- 2026-10-03, etap 5, wykrywacz bzdur (sekcja 5, typ 2, wariant): wykład Profesora Pomyłki jako dodatkowa misja w każdym świecie, po dwa wykłady z 1-3 bzdurami (razem 12), wyłącznie z faktów z `TRESCI.md`, sekcje 2.1-2.6. Stukać można tylko podkreślone słowa do sprawdzenia, a reszta tekstu jest prawdziwa; dzięki temu każda bzdura ma jedną poprawkę (w zdaniu „X robi Y” błąd dałoby się poprawić i w X, i w Y, zob. wpis z etapu 1 o prawdzie i fałszu). Po każdym stuknięciu gra podaje przyczynę, a poprawiona bzdura zostaje w tekście przekreślona obok poprawki (kontrast błąd i poprawka utrwala właściwą wersję). Po dwóch pomyłkach z rzędu gra podświetla jedną z nieznalezionych bzdur, więc wykład zawsze da się skończyć. Wynik liczy każde słowo do sprawdzenia: prawdziwe, jeśli nie zostało zakwestionowane; bzdurę, jeśli została znaleziona bez podpowiedzi i poprawiona za pierwszym razem. Dydaktycznie: wyszukiwanie błędów u pewnego siebie „autorytetu” wymaga przypomnienia faktu, a nie rozpoznania odpowiedzi, i ćwiczy krytyczne czytanie; humor postaci obniża napięcie przy błędach.
- 2026-10-03, etap 5, miejsce wykładu w świecie: karta „Dodatkowa misja” między misjami a bossem, otwarta po ukończeniu misji świata albo po pokonaniu jego bossa. Wykład nie blokuje bossa i nie wchodzi do opanowania świata (ostrość soczewki) ani do liczby wyzwań w panelu rodzica, żeby aktualizacja gry nie odebrała nic z tego, co gracz już zdobył. Wyniki wykładu liczą się do kart atlasu jak wyniki misji. Wykrywacz jest mechaniką: nie trafia do pul bossów ani próbnego sprawdzianu (walidator to sprawdza). Profesor Pomyłka to postać wymyślona do gry, nie ze słuchowiska; wizerunek rysowany od zera.

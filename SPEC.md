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

(Zawieszone decyzją z 2026-10-03: bez planu powtórek; zob. sekcja 12.) Część o odstępach, terminach i dacie sprawdzianu nie obowiązuje do czasu nowej decyzji; reguła zmiany koloru kart do ustalenia w etapie 1.

- Karty: organizmy (`TRESCI.md`, sekcja 7), elementy komórek, pojęcia i procesy (np. fotosynteza, chemosynteza, fermentacja alkoholowa, wymiana gazowa, żywiciel).
- Stany karty: nieodkryta → brązowa → srebrna → złota. Awans wymaga poprawnego przypomnienia w innym dniu niż poprzednie, przy rosnących odstępach (np. 1, 3, 7, 14 dni). Błąd obniża kartę o jeden poziom i skraca odstęp; kolekcja nigdy nie jest zerowana.
- Jeśli w panelu rodzica wpisano datę sprawdzianu, odstępy są skracane tak, by każda karta miała co najmniej dwie powtórki przed tą datą.
- Przypomnienie to aktywne zadanie (wskaż kategorię, funkcję, miejsce na schemacie), nie samo obejrzenie karty.
- Powtórki dnia: do 8 kart z minionym terminem, wymieszanych między światami.
- Złota karta odsłania ciekawostkę (`TRESCI.md`, sekcja 6) jako nagrodę informacyjną.

### 4.3 Bossowie, rewanże, próbny sprawdzian

- Boss to mieszanka typów zadań sprawdzianowych z danego świata, bez podpowiedzi, z limitem błędów zamiast limitu czasu (np. trzy błędy kończą podejście; można od razu spróbować ponownie).
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
2. **Prawda/fałsz z poprawką:** po wybraniu „fałsz” gracz wskazuje błędne słowo albo wybiera poprawną wersję zdania. Wariant **Wykrywacz bzdur:** postać (np. Profesor Pomyłka) opowiada krótką historię z 1-3 błędami merytorycznymi, gracz stuka błędne słowa i wybiera poprawki.
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
- **Struktura (stan po etapie 0):**

```
netlify.toml            publikacja katalogu app/, testy i walidator przed wdrożeniem
app/                    publikowana gra (tylko ten katalog trafia na stronę)
  index.html
  manifest.webmanifest
  sw.js                 service worker; WERSJA i PLIKI generuje tools/wersja.js
  css/                  tokeny, podstawy, ekrany, komponenty
  js/core/              stan, zapis, adresy ekranów, dostępność światów, DOM
  js/components/        typy zadań (sekcja 5); logika oddzielona od widoku
  js/ekrany/            mapa, świat, misja, podsumowanie, baza, panel rodzica
  data/                 moduły ES z treściami (światy, elementy, typy komórek, schematy, zadania)
  assets/svg/           schematy rysowane od zera
  assets/fonts/         kroje OFL z licencjami
  assets/ikony/
  audio/                opcjonalnie, poza pamięcią offline
tests/                  node --test
tools/                  validate-data.js, wersja.js, serwer.js, e2e.js, ikony.js
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
1. **Wersja do pierwszego testu z Mikołajem:** świat 2 i świat 3 (komórki, najważniejsze dla sprawdzianu), mikroskop z dwoma poziomami, atlas elementów komórek, dwóch bossów. Po etapie: obserwacja gry Mikołaja i notatki.
2. **Świat 4 i świat 6:** procesy (fotosynteza, oddychanie, fermentacja), symulacje.
3. **Świat 5 i świat 1:** atlas organizmów, łańcuchy pokarmowe, składniki chemiczne.
4. **Domknięcie:** próbny sprawdzian, domowe laboratorium, audio, dopracowanie oprawy i dźwięku.

Po każdym etapie: wdrożenie, lista rzeczy do sprawdzenia przez Roberta, korekty treści. Kolejność może się zmienić po odpowiedzi na pytanie o termin sprawdzianu.

## 11. Otwarte decyzje (pytania do Roberta na start)

Odpowiedzi z 2026-10-03 są dopisane przy pytaniach; wynikające z nich decyzje w sekcji 12.

1. Urządzenie główne: tablet czy telefon, Android czy iPad? Odpowiedź: tablet. System nieustalony: gra działa w Safari na iPadzie i w Chrome na Androidzie.
2. W co Mikołaj gra najchętniej (np. Minecraft, gry kolekcjonerskie, sportowe)? Od tego zależą oprawa i akcenty: budowanie, kolekcja, rywalizacja. Odpowiedź: Roblox.
3. Termin sprawdzianu i czy pierwsza wersja ma objąć wszystkie światy w uproszczonej formie. Odpowiedź: pełne światy (bez wersji uproszczonej); termin sprawdzianu niepodany; „nie rób planu powtórek”.
4. Czy będą nagrania audiobooka (mp3)? Odpowiedź: tekst słuchowiska z czatu Claude, zapisany jako `AUDIOBOOK.md`. Nagrania mp3: brak informacji; odtwarzacz pojawi się, gdy pliki trafią do `app/audio/`.
5. Nazwa gry i adres na Netlify. Odpowiedź: nazwa ostateczna „Wyprawa do wnętrza życia”; adres na Netlify zostanie podany później.
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
- 2026-10-03, otwarte: rozkład punktów 0-29 na 14 punktów zakresu sprawdzianu (potrzebny do próbnego sprawdzianu, etap 4); kategorie pomocnicze z `TRESCI.md`, sekcja 7 („zwierzę (przykład)” itp.) nie trafiają do zadań klasyfikacyjnych.
- 2026-10-03, propozycje akcentów z gier Roblox na kolejne etapy (do decyzji): baza rozbudowywana wraz z opanowaniem jak w grach typu tycoon (nowe stanowiska i ulepszenia mikroskopu), boss jako tor przeszkód z punktami kontrolnymi zamiast licznika błędów, odznaki za pokonanych bossów, awatar badacza z elementami zdobywanymi za opanowanie.

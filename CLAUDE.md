# Wyprawa do wnętrza życia: gra do nauki biologii (klasa 5)

Ten plik jest czytany na początku każdej sesji. Szczegóły są w dwóch dokumentach:

- `SPEC.md`: projekt gry (światy, mechaniki, systemy meta, typy zadań, oprawa, technologia, etapy, kryteria odbioru, otwarte decyzje).
- `TRESCI.md`: treści merytoryczne działu II. Jedyne źródło prawdy dla pytań, etykiet, opisów i informacji zwrotnych.

## O projekcie

- **Gracz:** Mikołaj, 11 lat, klasa 5, syn Roberta (właściciela repozytorium). Lubi gry. Uczy się do sprawdzianu z działu II biologii „Budowa i czynności życiowe organizmów” (podręcznik, strony 24-58).
- **Cel:** gra przeglądarkowa (PWA na tablet i telefon), w której treść działu jest mechaniką rozgrywki, a nie bramką z pytaniami. Po kilku tygodniach grania Mikołaj ma umieć to, czego wymaga sprawdzian: podpisywać schematy, przyporządkowywać, oceniać prawdziwość zdań, wypełniać tabele porównawcze, interpretować doświadczenia.
- **Audiobook:** istnieje słuchowisko „Wyprawa do wnętrza życia” w sześciu częściach, zgodnych z sześcioma tematami działu. Gra ma sześć światów odpowiadających tym częściom. Audiobook to fabuła i wprowadzenie, gra to trening.
- **Wcześniejsze aplikacje Roberta** (PWA na Netlify) to test wyboru i dopasowywanie par. Ta gra ma dawać to, czego tamte nie mają: budowanie, symulację, śledztwo i kolekcję.

## Zasady nienegocjowalne

1. Poprawność merytoryczna ponad efekt. Żadna mechanika nie może utrwalać błędnej biologii. W razie wątpliwości obowiązuje `TRESCI.md`.
2. Terminy w dokładnym brzmieniu z `TRESCI.md` (np. „siateczka śródplazmatyczna”, „wakuola (wodniczka)”, „otoczka śluzowa”, „organizmy odżywiające się szczątkami”). W zadaniach sprawdzianowych bez synonimów.
3. Treść jest mechaniką. Jeśli pytanie da się wyjąć z gry bez straty dla rozgrywki, mechanikę trzeba przeprojektować.
4. Każdy świat kończy się bossem w formatach zadań ze sprawdzianu (`SPEC.md`, sekcja 5).
5. Nagrody za opanowanie, nie za czas. Bez kar za przerwy, bez serii z karą, bez losowych nagród, bez presji czasu w trybie podstawowym.
6. Po każdej odpowiedzi krótka informacja zwrotna z przyczyną, nie samo „źle”.
7. Bez kont, logowania, danych osobowych, reklam, analityki i zewnętrznych API. Postęp tylko lokalnie na urządzeniu.
8. Bez ilustracji z podręcznika i obrazów z internetu. Schematy i piktogramy rysowane od zera w SVG.
9. Interfejs wyłącznie po polsku, poprawną polszczyzną, z pełnymi znakami diakrytycznymi.

## Technologia w skrócie

- Statyczna PWA: HTML, CSS, JavaScript (moduły ES), domyślnie bez frameworka i bez kroku budowania. Praca offline (service worker), instalacja na ekranie głównym (manifest).
- Gra w katalogu `app/`: tylko on trafia na stronę. Treści w plikach danych w `app/data/`, oddzielonych od logiki. Dodanie pytania lub organizmu nie wymaga zmian w kodzie.
- Testy logiki i walidator danych uruchamiane przed każdym commitem (`node --test`, `node tools/validate-data.js`). Hak: `git config core.hooksPath .githooks` (raz w każdym klonie).
- Po każdej zmianie w `app/`: `node tools/wersja.js` (wersja gry i lista plików offline; test pilnuje aktualności).
- Podgląd: `node tools/serwer.js`. Test całej gry w Chromium: `node tools/e2e.js [katalog-na-zrzuty]`.
- Wdrożenie: Netlify z gałęzi `main`. Podpięcie repozytorium do Netlify wykonuje Robert.

## Sposób pracy

- **Pierwsza sesja:** przeczytać `SPEC.md` i `TRESCI.md`; zadać pytania z sekcji 11 w `SPEC.md` jednym zestawem; przedstawić plan etapu 0 i plan wizualny (`SPEC.md`, sekcja 6.1) do akceptacji. Kod dopiero po akceptacji.
- Praca etapami (`SPEC.md`, sekcja 10). Każdy etap kończy się działającą wersją do wdrożenia i krótkim opisem: co zrobione, co sprawdzić z Mikołajem.
- Decyzje o zakresie, kolejności i oprawie należą do Roberta. Propozycje jako opcje z krótkim uzasadnieniem. W ramach zatwierdzonego etapu praca samodzielna.
- Każda zmiana treści sprawdzona z `TRESCI.md`. Fakty spoza `TRESCI.md` tylko jako oznaczone ciekawostki, nigdy jako poprawna odpowiedź w zadaniu sprawdzianowym.
- Małe, opisane commity. Decyzje projektowe dopisywane do `SPEC.md` w sekcji 12 (dziennik decyzji).
- Jeśli w repozytorium jest `AUDIOBOOK.md` (tekst słuchowiska), jest on źródłem tonu, scen i anegdot, ale nie źródłem treści do zadań.

## Komunikacja z Robertem

- Po polsku, bez długich myślników.
- Bez form adresatywnych („ty”, „pan”) i bez obejść w trzeciej osobie. Styl bezosobowy: „należy sprawdzić”, „brakuje jednego elementu”.
- Bez powitań, podziękowań, formuł grzecznościowych, symulowania emocji i zachęt do dalszej rozmowy.
- Pytania tylko przy braku informacji: krótkie, zebrane w jednym miejscu.
- Robert jest psychologiem: zwięzłe uzasadnienia dydaktyczne i motywacyjne są przydatne przy propozycjach.

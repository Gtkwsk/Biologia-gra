# Wyprawa do wnętrza życia

Gra przeglądarkowa do nauki biologii: klasa 5, dział II „Budowa i czynności życiowe organizmów”. Adres: https://biologia-gra.netlify.app Działa offline po pierwszym uruchomieniu i instaluje się na ekranie głównym tabletu. Bez kont, reklam i analityki; postęp zapisuje się tylko na urządzeniu.

Gotowe wszystkie sześć światów z misjami i bossami: świat 1 (składniki chemiczne organizmów), świat 2 (budowa komórki zwierzęcej), świat 3 (komórka roślinna, grzybowa i bakteryjna), świat 4 (samożywność i fotosynteza), świat 5 (cudzożywność) i świat 6 (oddychanie komórkowe, wymiana gazowa, fermentacja), a także atlas kart, mikroskop, próbny sprawdzian (14 zadań, 29 punktów, otwarty po pokonaniu bossów wszystkich światów), domowe laboratorium (9 doświadczeń z dorosłym), przewodnicy ze słuchowiska i wykłady Profesora Pomyłki (dodatkowa misja w każdym świecie: znajdowanie i poprawianie bzdur). Nowy gracz zaczyna od świata 1; kolejny świat otwiera boss poprzedniego. Krótkie dźwięki po odpowiedziach można wyłączyć w panelu rodzica.

## Wdrożenie na Netlify

1. W Netlify: nowy projekt z repozytorium GitHub `gtkwsk/biologia-gra`, gałąź `main`.
2. Ustawienia budowania są w `netlify.toml`: publikowany jest katalog `app`, a polecenie budowania uruchamia testy i walidator danych. Błąd w testach zatrzymuje wdrożenie. Pola ustawień w formularzu Netlify mogą zostać puste.
3. Adres strony ustawia się w konfiguracji projektu w Netlify (nazwa projektu).

## Nagrania słuchowiska

Odtwarzacz na wstępie świata pojawia się, gdy w katalogu `app/audio/` jest plik danej części: `czesc-1.mp3` … `czesc-6.mp3` (numer części to numer świata). Po dodaniu pliku należy uruchomić `node tools/wersja.js` (zapisuje listę nagrań w grze) i wdrożyć zmianę. Nagrania nie trafiają do pamięci offline, więc odtwarzają się przy dostępie do internetu.

## Instalacja na tablecie

- iPad, Safari: przycisk Udostępnij, potem „Do ekranu początkowego”.
- Android, Chrome: menu ⋮, potem „Zainstaluj aplikację” albo „Dodaj do ekranu głównego”.

Gra zainstalowana na ekranie początkowym jest chroniona przed usuwaniem danych przez Safari po tygodniu przerwy. Kopię postępu można zapisać w pliku w panelu rodzica (przytrzymanie logo na mapie przez 3 sekundy).

## Praca nad projektem

- `node --test`: testy logiki.
- `node tools/validate-data.js`: walidator danych (zgodność z `TRESCI.md`).
- `node tools/wersja.js`: po każdej zmianie w `app/` (wersja gry i lista plików offline).
- `node tools/serwer.js`: podgląd pod adresem http://localhost:8080/.
- `node tools/e2e.js zrzuty`: test całej gry w Chromium ze zrzutami ekranu (wymaga pakietu playwright); zadania rozwiązuje `tools/rozwiazania.js` na podstawie danych. Test opublikowanej wersji: `node tools/e2e.js zrzuty --adres=https://biologia-gra.netlify.app/` (za pośrednikiem sieciowym z własnym urzędem certyfikacji dodatkowo `--ca=<plik z certyfikatami>`).
- `git config core.hooksPath .githooks`: testy i walidator przed każdym commitem.

Dokumenty: `CLAUDE.md` (zasady pracy), `SPEC.md` (projekt i dziennik decyzji), `TRESCI.md` (jedyne źródło treści), `AUDIOBOOK.md` (tekst słuchowiska).

© 2026 Robert Gutkowski. Kroje pisma Lexend i Titan One mają własną licencję SIL Open Font License (pliki w `app/assets/fonts`).

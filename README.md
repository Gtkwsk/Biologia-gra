# Wyprawa do wnętrza życia

Gra przeglądarkowa do nauki biologii: klasa 5, dział II „Budowa i czynności życiowe organizmów”. Adres: https://biologia-gra.netlify.app Działa offline po pierwszym uruchomieniu i instaluje się na ekranie głównym tabletu. Bez kont, reklam i analityki; postęp zapisuje się tylko na urządzeniu.

Gotowe wszystkie sześć światów z misjami i bossami: świat 1 (składniki chemiczne organizmów), świat 2 (budowa komórki zwierzęcej), świat 3 (komórka roślinna, grzybowa i bakteryjna), świat 4 (samożywność i fotosynteza), świat 5 (cudzożywność) i świat 6 (oddychanie komórkowe, wymiana gazowa, fermentacja), a także atlas kart i mikroskop. Nowy gracz zaczyna od świata 1; kolejny świat otwiera boss poprzedniego. Następny etap (4): próbny sprawdzian, domowe laboratorium, audio i dopracowanie oprawy (`SPEC.md`, sekcja 10).

## Wdrożenie na Netlify

1. W Netlify: nowy projekt z repozytorium GitHub `gtkwsk/biologia-gra`, gałąź `main`.
2. Ustawienia budowania są w `netlify.toml`: publikowany jest katalog `app`, a polecenie budowania uruchamia testy i walidator danych. Błąd w testach zatrzymuje wdrożenie. Pola ustawień w formularzu Netlify mogą zostać puste.
3. Adres strony ustawia się w konfiguracji projektu w Netlify (nazwa projektu).

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

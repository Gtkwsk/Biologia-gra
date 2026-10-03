// Elementy komórek. Treści: TRESCI.md, sekcje 2.2 i 2.3.
//
// nazwa:   etykieta w dokładnym brzmieniu kanonicznym (TRESCI.md, sekcja 9)
// opis:    jak element wygląda, w mianowniku (do zdań „X to …” i „Pod numerem 3: …”)
// funkcja: zdanie o funkcji, zaczynające się od nazwy
// brak:    dopełniacz do zdania „Komórka … nie ma …”
// biernik: forma do zdania „Komórka … ma …”
// wTabeli: nazwa wiersza w tabeli porównawczej, jeśli inna niż etykieta (jak w TRESCI.md, sekcja 2.3)
// mnoga:   nazwa w liczbie mnogiej (np. „Pod numerem 2 są rybosomy.”)
// wTypie:  inny opis lub funkcja w danym typie komórki
// ciekawostka: dosłownie z TRESCI.md, sekcja 6 (pokazywana na złotej karcie atlasu)

export default [
  {
    id: 'blona-komorkowa',
    nazwa: 'błona komórkowa',
    opis: 'cienka granica komórki',
    funkcja: 'Błona komórkowa oddziela komórkę od otoczenia i transportuje substancje do jej wnętrza i na zewnątrz.',
    brak: 'błony komórkowej',
    biernik: 'błonę komórkową',
    ciekawostka: 'Komórki są małe, bo wszystko musi przejść przez błonę i dotrzeć do całego wnętrza; komórki słonia są podobnej wielkości jak komórki myszy, słoń ma ich po prostu więcej.',
    zrodlo: '2.2',
  },
  {
    id: 'cytozol',
    nazwa: 'cytozol',
    opis: 'galaretowata substancja wypełniająca komórkę',
    funkcja: 'Cytozol wypełnia komórkę. Zanurzone są w nim pozostałe elementy.',
    brak: 'cytozolu',
    biernik: 'cytozol',
    zrodlo: '2.2',
  },
  {
    id: 'jadro-komorkowe',
    nazwa: 'jądro komórkowe',
    opis: 'zwykle kulisty element w środkowej części komórki',
    funkcja: 'Jądro komórkowe zawiera DNA i kieruje wszystkimi procesami w komórce.',
    brak: 'jądra komórkowego',
    biernik: 'jądro komórkowe',
    ciekawostka: 'Informacja w DNA człowieka to około trzech miliardów „liter” zapisanych czterema rodzajami cegiełek.',
    zrodlo: '2.2',
  },
  {
    id: 'mitochondrium',
    nazwa: 'mitochondrium',
    opis: 'owalny element z pofałdowanym wnętrzem',
    funkcja: 'Mitochondrium dostarcza energii. To centrum energetyczne komórki.',
    brak: 'mitochondriów',
    biernik: 'mitochondria',
    wTabeli: 'mitochondria',
    ciekawostka: 'Oddychanie komórkowe to „ogień bez płomienia”: energia jest uwalniana małymi porcjami, a nie naraz jak w ognisku.',
    zrodlo: '2.2',
  },
  {
    id: 'rybosomy',
    nazwa: 'rybosomy',
    mnoga: true,
    opis: 'drobne ziarenka',
    funkcja: 'Rybosomy wytwarzają białka.',
    brak: 'rybosomów',
    biernik: 'rybosomy',
    zrodlo: '2.2',
  },
  {
    id: 'siateczka-srodplazmatyczna',
    nazwa: 'siateczka śródplazmatyczna',
    opis: 'system cienkich kanalików w całej komórce',
    funkcja: 'Siateczka śródplazmatyczna wytwarza i transportuje białka i tłuszcze.',
    brak: 'siateczki śródplazmatycznej',
    biernik: 'siateczkę śródplazmatyczną',
    zrodlo: '2.2',
  },
  {
    id: 'aparat-golgiego',
    nazwa: 'aparat Golgiego',
    opis: 'stos spłaszczonych pęcherzy z drobnymi pęcherzykami',
    funkcja: 'Aparat Golgiego przekształca i transportuje białka.',
    brak: 'aparatu Golgiego',
    biernik: 'aparat Golgiego',
    zrodlo: '2.2',
  },
  {
    id: 'wakuola',
    nazwa: 'wakuola (wodniczka)',
    opis: 'niewielki pęcherzyk',
    funkcja: 'Wakuole biorą udział w pochłanianiu, trawieniu i usuwaniu z komórki różnych substancji.',
    brak: 'wakuol',
    biernik: 'wakuole',
    ciekawostka: 'Wakuola pełna wody i ściana komórkowa działają jak balon napompowany w kartonowym pudełku: dlatego podlana roślina się prostuje, a bez wody więdnie.',
    zrodlo: '2.2',
    wTypie: {
      roslinna: {
        opis: 'duży pęcherz w centrum komórki, wypełniony głównie wodą',
        funkcja: 'Wakuola utrzymuje w komórce odpowiednią ilość wody.',
      },
    },
  },
  {
    id: 'sciana-komorkowa',
    nazwa: 'ściana komórkowa',
    opis: 'wyraźna warstwa na zewnątrz błony komórkowej',
    funkcja:
      'Ściana komórkowa nadaje komórce kształt, chroni ją przed uszkodzeniem i zabezpiecza przed wnikaniem drobnoustrojów chorobotwórczych.',
    brak: 'ściany komórkowej',
    biernik: 'ścianę komórkową',
    zrodlo: '2.3',
    wTypie: {
      grzybowa: { funkcja: 'Ściana komórkowa grzybów jest zbudowana z chityny.' },
      bakteryjna: { funkcja: 'Ściana komórkowa bakterii leży na zewnątrz błony komórkowej.' },
    },
  },
  {
    id: 'chloroplast',
    nazwa: 'chloroplast',
    opis: 'zielony, owalny element',
    funkcja: 'Chloroplast zawiera zielony barwnik chlorofil. Zachodzi w nim fotosynteza.',
    brak: 'chloroplastów',
    biernik: 'chloroplasty',
    wTabeli: 'chloroplasty',
    ciekawostka: 'Chloroplasty pochodzą od dawnych sinic, które ponad miliard lat temu zamieszkały w innej komórce i stały się jej częścią.',
    zrodlo: '2.3',
  },
  {
    id: 'nic-dna',
    nazwa: 'nić DNA',
    opis: 'nić zanurzona w cytozolu',
    funkcja: 'Nić DNA pełni w komórce bakterii funkcję jądra komórkowego.',
    brak: 'nici DNA',
    biernik: 'nić DNA',
    zrodlo: '2.3',
  },
  {
    id: 'otoczka-sluzowa',
    nazwa: 'otoczka śluzowa',
    opis: 'warstwa na powierzchni ściany komórkowej',
    funkcja: 'Otoczka śluzowa chroni komórkę bakterii między innymi przed wysychaniem.',
    brak: 'otoczki śluzowej',
    biernik: 'otoczkę śluzową',
    zrodlo: '2.3',
  },
  {
    id: 'rzeska',
    nazwa: 'rzęska',
    opis: 'długa, cienka wypustka',
    funkcja: 'Rzęska umożliwia bakterii ruch.',
    brak: 'rzęski',
    biernik: 'rzęskę',
    ciekawostka: 'Rzęska bakterii obraca się jak śruba statku.',
    zrodlo: '2.3',
  },
];

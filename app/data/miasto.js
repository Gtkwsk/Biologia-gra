// Miasto-komórka (świat 2, mechanika „Budowa miasta”): usługi miasta i awarie.
// Funkcje zgodne z TRESCI.md, sekcja 2.2. Nazwy usług to przenośnie ze słuchowiska (AUDIOBOOK.md).
//
// zlecenie: czego potrzebuje miasto (gracz zatrudnia element, czyli przyporządkowuje nazwę do funkcji),
// awaria:   co przestaje działać bez elementu (gracz wskazuje element na planie). Każda awaria
//           pasuje do jednego elementu: np. „tłuszcze” tylko do siateczki, „trawienie” tylko do wakuol.

export default {
  schemat: 'komorka-zwierzeca',
  uslugi: [
    {
      element: 'blona-komorkowa',
      nazwa: 'Granica z przejściami',
      zlecenie: 'Oddzieli komórkę od otoczenia i będzie transportować substancje do wnętrza i na zewnątrz.',
      awaria: 'Komórka nie jest oddzielona od otoczenia.',
    },
    {
      element: 'cytozol',
      nazwa: 'Wypełnienie miasta',
      zlecenie: 'Wypełni komórkę; zanurzą się w nim pozostałe elementy.',
      awaria: 'Zniknęła galaretowata substancja, która wypełnia komórkę.',
    },
    {
      element: 'jadro-komorkowe',
      nazwa: 'Ratusz z biblioteką',
      zlecenie: 'Będzie zawierać DNA i kierować wszystkimi procesami w komórce.',
      awaria: 'Nikt nie kieruje procesami w komórce.',
    },
    {
      element: 'mitochondrium',
      nazwa: 'Elektrownie',
      zlecenie: 'Dostarczą komórce energii.',
      awaria: 'W całym mieście zabrakło energii.',
    },
    {
      element: 'rybosomy',
      nazwa: 'Warsztaty białek',
      zlecenie: 'Będą wytwarzać białka.',
      awaria: 'Przestały powstawać białka, choć sieć kanalików działa.',
    },
    {
      element: 'siateczka-srodplazmatyczna',
      nazwa: 'Sieć korytarzy i taśmociągów',
      zlecenie: 'Będzie wytwarzać i transportować białka i tłuszcze.',
      awaria: 'Przestały powstawać tłuszcze, a kanaliki nie rozwożą białek i tłuszczów.',
    },
    {
      element: 'aparat-golgiego',
      nazwa: 'Sortownia paczek',
      zlecenie: 'Będzie przekształcać i transportować białka.',
      awaria: 'Białka powstają, ale nikt ich nie przekształca.',
    },
    {
      element: 'wakuola',
      nazwa: 'Trawienie i wywóz',
      zlecenie: 'Będą pochłaniać, trawić i usuwać z komórki różne substancje.',
      awaria: 'Pochłonięte substancje nie są trawione.',
    },
  ],
};

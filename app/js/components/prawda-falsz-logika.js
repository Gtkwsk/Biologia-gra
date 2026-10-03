// Logika zadania „prawda/fałsz z poprawką” (SPEC.md, sekcja 5, typ 2). Funkcje czyste.
//
// Zdanie: { tekst, prawda, wyjasnienie, karta?, ... }. Zdanie fałszywe poprawia się na dwa sposoby:
// - wybór poprawnej wersji zdania: poprawne (zdanie prawdziwe), bledne (inne, fałszywe wersje);
//   domyślny sposób, bo w zdaniu „X robi Y” błąd można poprawić i w X, i w Y,
// - wskazanie błędnego fragmentu (gdy błąd jest jednoznaczny, np. w opowieści): blad – fragment
//   dosłownie z tekstu, poprawki – opcje zamiany, poprawka – właściwa opcja.
// Etapy: 'ocena' → (dla fałszu) 'wersja' albo 'fragment' → 'poprawka' → 'koniec'.
// W treningu błąd nie przerywa: można szukać dalej, ale zdanie nie liczy się jako dobre od razu.
// W sprawdzianie pierwszy błąd kończy zdanie i pokazuje poprawną wersję.

export function poprawione(zdanie) {
  if (zdanie.prawda) return zdanie.tekst;
  return zdanie.poprawne ?? zdanie.tekst.replace(zdanie.blad, zdanie.poprawka);
}

function etapPoprawy(zdanie) {
  return zdanie.blad ? 'fragment' : 'wersja';
}

const POLECENIE_POPRAWY = {
  fragment: 'Stuknij fragment, który jest błędny.',
  wersja: 'Wybierz poprawną wersję zdania.',
};

// Wersje zdania do wyboru (poprawna i błędne) w kolejności z danych; widok je miesza.
export function wersje(zdanie) {
  return [zdanie.poprawne, ...(zdanie.bledne ?? [])];
}

// Słowa zdania do stukania; błędny fragment jest jednym kawałkiem, znak interpunkcyjny
// tuż po nim dokleja się do niego.
export function tokeny(zdanie) {
  const slowa = (t) =>
    t
      .split(/\s+/)
      .filter(Boolean)
      .map((tekst) => ({ tekst, blad: false }));
  if (zdanie.prawda) return slowa(zdanie.tekst);
  const i = zdanie.tekst.indexOf(zdanie.blad);
  const przed = zdanie.tekst.slice(0, i);
  let po = zdanie.tekst.slice(i + zdanie.blad.length);
  const doklejka = po.match(/^[^\s]+/)?.[0] ?? '';
  po = po.slice(doklejka.length);
  return [...slowa(przed), { tekst: zdanie.blad + doklejka, blad: true }, ...slowa(po)];
}

export function nowyStanZdania() {
  return { etap: 'ocena', bezBledu: true };
}

const koniec = (st, bezBledu = st.bezBledu) => ({ ...st, etap: 'koniec', bezBledu });

export function ocen(zdanie, st, odpowiedz, tryb = 'trening') {
  const dobrze = odpowiedz === zdanie.prawda;
  if (dobrze && zdanie.prawda) {
    return { st: koniec(st), komunikat: { rodzaj: 'dobrze', tytul: 'Tak, to zdanie jest prawdziwe.', tekst: zdanie.wyjasnienie } };
  }
  if (dobrze) {
    return {
      st: { ...st, etap: etapPoprawy(zdanie) },
      komunikat: { rodzaj: 'dobrze', tytul: 'Tak, to zdanie jest fałszywe.', tekst: POLECENIE_POPRAWY[etapPoprawy(zdanie)] },
    };
  }
  if (zdanie.prawda) {
    return { st: koniec(st, false), komunikat: { rodzaj: 'zle', tytul: 'To zdanie jest prawdziwe.', tekst: zdanie.wyjasnienie } };
  }
  if (tryb === 'sprawdzian') {
    return {
      st: koniec(st, false),
      komunikat: { rodzaj: 'zle', tytul: 'To zdanie jest fałszywe.', tekst: `Poprawnie: „${poprawione(zdanie)}” ${zdanie.wyjasnienie}` },
    };
  }
  return {
    st: { ...st, etap: etapPoprawy(zdanie), bezBledu: false },
    komunikat: {
      rodzaj: 'zle',
      tytul: 'To zdanie jest fałszywe.',
      tekst: zdanie.blad ? 'Znajdź w nim błąd: stuknij fragment, który jest błędny.' : 'Wybierz poprawną wersję zdania.',
    },
  };
}

export function wybierzWersje(zdanie, st, opcja, tryb = 'trening') {
  if (st.etap !== 'wersja') return { st, komunikat: null };
  if (opcja === zdanie.poprawne) {
    return { st: koniec(st), komunikat: { rodzaj: 'dobrze', tytul: 'Tak, ta wersja jest prawdziwa.', tekst: zdanie.wyjasnienie } };
  }
  if (tryb === 'sprawdzian') {
    return { st: koniec(st, false), komunikat: { rodzaj: 'zle', tytul: `Poprawnie: „${zdanie.poprawne}”`, tekst: zdanie.wyjasnienie } };
  }
  return {
    st: { ...st, bezBledu: false },
    komunikat: { rodzaj: 'zle', tytul: 'Ta wersja też jest fałszywa.', tekst: zdanie.wyjasnienie },
  };
}

export function wybierzFragment(zdanie, st, token, tryb = 'trening') {
  if (st.etap !== 'fragment') return { st, komunikat: null };
  if (token.blad) {
    return {
      st: { ...st, etap: 'poprawka' },
      komunikat: { rodzaj: 'dobrze', tytul: `Tak, błąd jest w słowach „${zdanie.blad}”.`, tekst: 'Wybierz poprawkę.' },
    };
  }
  if (tryb === 'sprawdzian') {
    return {
      st: koniec(st, false),
      komunikat: { rodzaj: 'zle', tytul: `Błąd był w słowach „${zdanie.blad}”.`, tekst: `Poprawnie: „${poprawione(zdanie)}” ${zdanie.wyjasnienie}` },
    };
  }
  return {
    st: { ...st, bezBledu: false },
    komunikat: { rodzaj: 'zle', tytul: `„${token.tekst}” jest w porządku.`, tekst: 'Błąd jest w innym miejscu zdania.' },
  };
}

export function wybierzPoprawke(zdanie, st, opcja, tryb = 'trening') {
  if (st.etap !== 'poprawka') return { st, komunikat: null };
  if (opcja === zdanie.poprawka) {
    return { st: koniec(st), komunikat: { rodzaj: 'dobrze', tytul: `Tak: „${poprawione(zdanie)}”`, tekst: zdanie.wyjasnienie } };
  }
  if (tryb === 'sprawdzian') {
    return { st: koniec(st, false), komunikat: { rodzaj: 'zle', tytul: `Poprawnie: „${poprawione(zdanie)}”`, tekst: zdanie.wyjasnienie } };
  }
  return {
    st: { ...st, bezBledu: false },
    komunikat: { rodzaj: 'zle', tytul: `„${opcja}” nie pasuje.`, tekst: zdanie.wyjasnienie },
  };
}

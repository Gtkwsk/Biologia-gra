// Logika zadania „szybki sorter” (SPEC.md, sekcja 5, typ 8). Funkcje czyste.
//
// Zdania trafiają do jednej z 2-3 kategorii (np. oddychanie komórkowe albo wymiana gazowa).
// Trening: zdania po jednym; błędnie przyporządkowane zdanie wraca na koniec talii,
//   aż wszystkie trafią do właściwych kategorii. Liczy się pierwsza próba każdego zdania.
// Sprawdzian: gracz przyporządkowuje wszystkie zdania, potem jedno sprawdzenie.

export function nowaTalia(liczbaZdan, kolejnosc = null) {
  return {
    kolejka: kolejnosc ? [...kolejnosc] : Array.from({ length: liczbaZdan }, (_, i) => i),
    pierwsza: {},
    ulozone: {},
  };
}

export function biezace(talia) {
  return talia.kolejka[0] ?? null;
}

export function czyKoniec(talia) {
  return talia.kolejka.length === 0;
}

// Trening: odpowiedź dla bieżącego zdania. Zwraca { talia, dobrze, wraca }.
// Zdanie dobre schodzi z talii, błędne wraca na jej koniec.
export function odpowiedz(talia, zdania, kategoria) {
  const i = biezace(talia);
  if (i === null) return { talia, dobrze: false, wraca: false };
  const dobrze = zdania[i].kategoria === kategoria;
  const pierwsza = i in talia.pierwsza ? talia.pierwsza : { ...talia.pierwsza, [i]: dobrze };
  const reszta = talia.kolejka.slice(1);
  return {
    talia: {
      kolejka: dobrze ? reszta : [...reszta, i],
      pierwsza,
      ulozone: dobrze ? { ...talia.ulozone, [i]: kategoria } : talia.ulozone,
    },
    dobrze,
    wraca: !dobrze,
  };
}

// Sprawdzian: odpowiedzi { indeks: kategoria }. Wyniki dla każdego zdania.
export function ocen(zdania, odpowiedzi) {
  return zdania.map((z, i) => ({ indeks: i, podana: odpowiedzi[i] ?? null, dobrze: odpowiedzi[i] === z.kategoria }));
}

// Wynik zadania; kartaZdania(zdanie) → id karty atlasu albo null.
export function wynik(zdania, pierwsza, kartaZdania, tryb = 'trening') {
  const karty = zdania
    .map((z, i) => ({ karta: kartaZdania(z), odRazu: pierwsza[i] === true, poprawnie: tryb === 'trening' || pierwsza[i] === true }))
    .filter((k) => k.karta);
  return { poprawne: zdania.filter((_, i) => pierwsza[i] === true).length, wszystkie: zdania.length, karty };
}

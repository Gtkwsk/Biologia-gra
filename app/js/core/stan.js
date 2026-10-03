// Stan gry: jeden obiekt zapisywany lokalnie na urządzeniu.
// Funkcje czyste, bez DOM i bez localStorage (zapis: magazyn.js).

export const WERSJA_SCHEMATU = 1;
export const ID_GRY = 'wyprawa-do-wnetrza-zycia';
export const PROG_OPANOWANIA = 0.8;
export const DOMYSLNE_IMIE = 'Mikołaj';
const MAKS_DLUGOSC_IMIENIA = 30;
// Czas zadania liczony najwyżej do 15 minut, żeby przerwa przy otwartej grze nie zawyżała sumy.
const MAKS_CZAS_ZADANIA_MS = 15 * 60 * 1000;

export class BladStanu extends Error {}

export function nowyStan(dzien) {
  return {
    wersja: WERSJA_SCHEMATU,
    utworzono: dzien,
    ustawienia: { imie: DOMYSLNE_IMIE, odblokujWszystkie: false },
    odblokowane: [],
    bossowie: [],
    zadania: {},
    pomylki: {},
    czasMs: 0,
  };
}

// Migracje schematu: klucz to wersja źródłowa, funkcja zwraca dane o jedną wersję wyższe.
export const MIGRACJE = {};

export function migruj(dane, migracje = MIGRACJE, docelowa = WERSJA_SCHEMATU) {
  let wersja = dane.wersja;
  if (wersja > docelowa) throw new BladStanu('Zapis pochodzi z nowszej wersji gry.');
  let wynik = dane;
  while (wersja < docelowa) {
    const krok = migracje[wersja];
    if (!krok) throw new BladStanu(`Brak migracji zapisu z wersji ${wersja}.`);
    wynik = { ...krok(wynik), wersja: wersja + 1 };
    wersja += 1;
  }
  return wynik;
}

const czyObiekt = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function liczbaNieujemna(v) {
  return Number.isFinite(v) && v > 0 ? v : 0;
}

function ulamek(v) {
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0;
}

function idSwiatow(v) {
  if (!Array.isArray(v)) return [];
  return [...new Set(v.filter((x) => Number.isInteger(x) && x >= 1 && x <= 6))].sort((a, b) => a - b);
}

function wynikiZadan(v) {
  const wynik = {};
  if (!czyObiekt(v)) return wynik;
  for (const [id, z] of Object.entries(v)) {
    if (!czyObiekt(z)) continue;
    wynik[id] = {
      proby: Math.floor(liczbaNieujemna(z.proby)),
      najlepszy: ulamek(z.najlepszy),
      ostatni: ulamek(z.ostatni),
      ostatnio: typeof z.ostatnio === 'string' ? z.ostatnio : '',
    };
  }
  return wynik;
}

function liczniki(v) {
  const wynik = {};
  if (!czyObiekt(v)) return wynik;
  for (const [id, n] of Object.entries(v)) {
    const liczba = Math.floor(liczbaNieujemna(n));
    if (liczba > 0) wynik[id] = liczba;
  }
  return wynik;
}

export function poprawImie(imie) {
  const t = typeof imie === 'string' ? imie.trim().replace(/\s+/g, ' ') : '';
  return t ? t.slice(0, MAKS_DLUGOSC_IMIENIA) : DOMYSLNE_IMIE;
}

// Uzupełnia brakujące pola i odrzuca wartości o złym typie.
export function normalizuj(dane, dzien) {
  const d = czyObiekt(dane) ? dane : {};
  const ust = czyObiekt(d.ustawienia) ? d.ustawienia : {};
  return {
    wersja: WERSJA_SCHEMATU,
    utworzono: typeof d.utworzono === 'string' ? d.utworzono : dzien,
    ustawienia: {
      imie: poprawImie(ust.imie),
      odblokujWszystkie: ust.odblokujWszystkie === true,
    },
    odblokowane: idSwiatow(d.odblokowane),
    bossowie: idSwiatow(d.bossowie),
    zadania: wynikiZadan(d.zadania),
    pomylki: liczniki(d.pomylki),
    czasMs: liczbaNieujemna(d.czasMs),
  };
}

export function odczytajStan(dane, dzien) {
  if (!czyObiekt(dane) || !Number.isInteger(dane.wersja)) {
    throw new BladStanu('To nie jest zapis postępu tej gry.');
  }
  return normalizuj(migruj(dane), dzien);
}

export function doEksportu(stan, dzien) {
  return JSON.stringify({ gra: ID_GRY, eksportowano: dzien, stan }, null, 2);
}

export function zImportu(tekst, dzien) {
  let dane;
  try {
    dane = JSON.parse(tekst);
  } catch {
    throw new BladStanu('Plik nie jest kopią postępu tej gry.');
  }
  if (!czyObiekt(dane) || dane.gra !== ID_GRY) throw new BladStanu('Plik nie jest kopią postępu tej gry.');
  return odczytajStan(dane.stan, dzien);
}

// wynik: { idZadania, poprawne, wszystkie, bledneElementy, czasMs, dzien }
export function zapiszWynik(stan, wynik) {
  const { idZadania, poprawne, wszystkie, bledneElementy = [], czasMs = 0, dzien } = wynik;
  const czesc = wszystkie > 0 ? ulamek(poprawne / wszystkie) : 0;
  const poprzedni = stan.zadania[idZadania];
  const pomylki = { ...stan.pomylki };
  for (const id of bledneElementy) pomylki[id] = (pomylki[id] ?? 0) + 1;
  return {
    ...stan,
    zadania: {
      ...stan.zadania,
      [idZadania]: {
        proby: (poprzedni?.proby ?? 0) + 1,
        najlepszy: Math.max(poprzedni?.najlepszy ?? 0, czesc),
        ostatni: czesc,
        ostatnio: dzien,
      },
    },
    pomylki,
    czasMs: stan.czasMs + Math.min(liczbaNieujemna(czasMs), MAKS_CZAS_ZADANIA_MS),
  };
}

export function ustawImie(stan, imie) {
  return { ...stan, ustawienia: { ...stan.ustawienia, imie: poprawImie(imie) } };
}

export function ustawOdblokujWszystkie(stan, wartosc) {
  return { ...stan, ustawienia: { ...stan.ustawienia, odblokujWszystkie: wartosc === true } };
}

export function zaliczBossa(stan, idSwiata) {
  if (stan.bossowie.includes(idSwiata)) return stan;
  return { ...stan, bossowie: [...stan.bossowie, idSwiata].sort((a, b) => a - b) };
}

// Model intensywności fotosyntezy (SPEC.md, sekcja 3.2, świat 4: laboratorium fotosyntezy).
// Funkcje czyste.
//
// Model nie musi być fizjologicznie dokładny, ale nie może przeczyć TRESCI.md (sekcja 2.4):
// - na intensywność wpływają światło, dwutlenek węgla, woda, temperatura i sole mineralne,
// - zarówno niedobór, jak i nadmiar każdego czynnika zmniejsza intensywność,
// - w ciemności fotosynteza nie zachodzi (brak pęcherzyków tlenu),
// - więcej dwutlenku węgla (woda gazowana, szklarnia) zwiększa intensywność,
// - niedobór magnezu (sole mineralne) to mniej chlorofilu i słabsza fotosynteza (sekcja 2.1).
// Każdy czynnik ma pięć poziomów; wydajność poziomu to liczba 0-1, a całość wyznacza czynnik
// najsłabszy (najmniejsza wydajność), jak łańcuch, który jest tak mocny jak najsłabsze ogniwo.

export const MAKS_PECHERZYKOW = 30;

export const CZYNNIKI = [
  {
    id: 'swiatlo',
    nazwa: 'światło',
    karta: 'swiatlo',
    ikona: 'swiatlo',
    poziomy: ['ciemność', 'półmrok', 'jasno', 'pełne światło', 'za mocne światło'],
    wydajnosc: [0, 0.35, 0.7, 1, 0.55],
  },
  {
    id: 'dwutlenek',
    nazwa: 'dwutlenek węgla',
    karta: 'dwutlenek-wegla',
    ikona: 'dwutlenek-wegla',
    poziomy: ['brak', 'mało', 'tyle co w wodzie z kranu', 'więcej, jak w wodzie gazowanej', 'za dużo'],
    // W szklarni dwutlenek węgla jest w powietrzu, nie w wodzie (TRESCI.md, 2.4).
    poziomySzklarnia: ['brak', 'mało', 'tyle co w zwykłym powietrzu', 'więcej, jak po dodaniu dwutlenku węgla', 'za dużo'],
    wydajnosc: [0, 0.3, 0.6, 1, 0.55],
  },
  {
    id: 'woda',
    nazwa: 'woda',
    karta: 'woda',
    ikona: 'woda',
    poziomy: ['sucha gleba', 'mało wody', 'w sam raz', 'dużo wody', 'za dużo wody'],
    wydajnosc: [0, 0.5, 1, 0.8, 0.45],
  },
  {
    id: 'temperatura',
    nazwa: 'temperatura',
    karta: 'intensywnosc-fotosyntezy',
    ikona: 'temperatura',
    poziomy: ['zimno', 'chłodno', 'ciepło', 'gorąco', 'upał'],
    wydajnosc: [0.15, 0.55, 1, 0.6, 0.2],
  },
  {
    id: 'sole',
    nazwa: 'sole mineralne',
    karta: 'intensywnosc-fotosyntezy',
    ikona: 'sole-mineralne',
    poziomy: ['brak', 'mało', 'w sam raz', 'dużo', 'za dużo'],
    wydajnosc: [0.2, 0.6, 1, 0.75, 0.35],
  },
];

export const CZYNNIK = Object.fromEntries(CZYNNIKI.map((c) => [c.id, c]));

// Nazwa poziomu czynnika; roslina: 'moczarka' (akwarium) albo 'szklarnia'.
export function nazwaPoziomu(idCzynnika, poziom, roslina = 'moczarka') {
  const c = CZYNNIK[idCzynnika];
  return (roslina === 'szklarnia' && c.poziomySzklarnia ? c.poziomySzklarnia : c.poziomy)[poziom];
}

// Poziom o najwyższej wydajności.
export function optimum(idCzynnika) {
  const w = CZYNNIK[idCzynnika].wydajnosc;
  return w.indexOf(Math.max(...w));
}

// Moczarka żyje w wodzie, więc wody jej nie brakuje: poziom wody jest stały.
export function ustawieniaPelne(ustawienia) {
  return { woda: optimum('woda'), ...ustawienia };
}

export function wydajnosc(idCzynnika, poziom) {
  return CZYNNIK[idCzynnika].wydajnosc[poziom];
}

export function intensywnosc(ustawienia) {
  const u = ustawieniaPelne(ustawienia);
  return Math.min(...CZYNNIKI.map((c) => wydajnosc(c.id, u[c.id])));
}

export function pecherzyki(ustawienia) {
  return Math.round(MAKS_PECHERZYKOW * intensywnosc(ustawienia));
}

// Czynniki o najmniejszej wydajności (gdy wszystkie są w optimum: pusta lista).
export function najslabsze(ustawienia) {
  const u = ustawieniaPelne(ustawienia);
  const min = intensywnosc(u);
  if (min >= 1) return [];
  return CZYNNIKI.filter((c) => wydajnosc(c.id, u[c.id]) === min).map((c) => c.id);
}

// Skutek zmiany jednego czynnika: 'wzrosnie' | 'zmaleje' | 'bez-zmian'.
export function skutek(ustawienia, idCzynnika, poziom) {
  const przed = intensywnosc(ustawienia);
  const po = intensywnosc({ ...ustawienia, [idCzynnika]: poziom });
  if (po > przed) return 'wzrosnie';
  if (po < przed) return 'zmaleje';
  return 'bez-zmian';
}

// Stan czynnika na danym poziomie: 'brak' (wydajność 0), 'niedobor', 'optimum', 'nadmiar'.
export function stanCzynnika(idCzynnika, poziom) {
  const opt = optimum(idCzynnika);
  if (poziom === opt) return 'optimum';
  if (wydajnosc(idCzynnika, poziom) === 0) return 'brak';
  return poziom < opt ? 'niedobor' : 'nadmiar';
}

const WYJASNIENIA = {
  swiatlo: {
    brak: 'W ciemności fotosynteza nie zachodzi: to światło dostarcza energii, którą pochłania chlorofil.',
    niedobor: 'Niedobór światła zmniejsza intensywność fotosyntezy.',
    optimum: 'Pełne światło: roślina ma dość energii świetlnej do fotosyntezy.',
    nadmiar: 'Nadmiar światła też zmniejsza intensywność fotosyntezy.',
  },
  dwutlenek: {
    brak: 'Bez dwutlenku węgla roślina nie ma z czego wytwarzać substancji pokarmowych.',
    niedobor: 'Niedobór dwutlenku węgla zmniejsza intensywność fotosyntezy.',
    optimum: 'Więcej dwutlenku węgla zwiększa intensywność fotosyntezy, jak w wodzie gazowanej i w szklarniach.',
    nadmiar: 'Nadmiar dwutlenku węgla też zmniejsza intensywność fotosyntezy.',
  },
  woda: {
    brak: 'Bez wody fotosynteza nie zachodzi: woda jest jednym z jej składników.',
    niedobor: 'Niedobór wody zmniejsza intensywność fotosyntezy.',
    optimum: 'Wody jest w sam raz.',
    nadmiar: 'Nadmiar wody też zmniejsza intensywność fotosyntezy.',
  },
  temperatura: {
    niedobor: 'Zbyt niska temperatura zmniejsza intensywność fotosyntezy.',
    optimum: 'Temperatura jest korzystna dla fotosyntezy.',
    nadmiar: 'Zbyt wysoka temperatura zmniejsza intensywność fotosyntezy.',
  },
  sole: {
    niedobor: 'Niedobór soli mineralnych zmniejsza intensywność fotosyntezy. Na przykład przy niedoborze magnezu powstaje mniej chlorofilu.',
    optimum: 'Soli mineralnych jest w sam raz.',
    nadmiar: 'Nadmiar soli mineralnych też zmniejsza intensywność fotosyntezy.',
  },
};

// Zdanie przyczynowe o czynniku na danym poziomie.
export function wyjasnienieCzynnika(idCzynnika, poziom) {
  const stan = stanCzynnika(idCzynnika, poziom);
  return WYJASNIENIA[idCzynnika][stan] ?? WYJASNIENIA[idCzynnika].niedobor;
}

// Wyjaśnienie skutku zmiany (np. po przewidywaniu): dlaczego liczba pęcherzyków rośnie,
// maleje albo się nie zmienia.
export function wyjasnienieSkutku(ustawienia, idCzynnika, poziom) {
  const s = skutek(ustawienia, idCzynnika, poziom);
  const po = { ...ustawienia, [idCzynnika]: poziom };
  if (s !== 'bez-zmian') return wyjasnienieCzynnika(idCzynnika, poziom);
  const hamuje = najslabsze(po).filter((id) => id !== idCzynnika);
  if (!hamuje.length) return wyjasnienieCzynnika(idCzynnika, poziom);
  const nazwy = hamuje.map((id) => CZYNNIK[id].nazwa).join(' i ');
  return hamuje.length === 1
    ? `Fotosyntezę hamuje teraz inny czynnik: ${nazwy}. Dopóki go nie poprawisz, zmiana tego czynnika nic nie da, jak w łańcuchu, który pęka w najsłabszym ogniwie.`
    : `Fotosyntezę hamują teraz inne czynniki: ${nazwy}. Dopóki ich nie poprawisz, zmiana tego czynnika nic nie da, jak w łańcuchu, który pęka w najsłabszym ogniwie.`;
}

// Plan doświadczenia: dwie próby { czynnik: poziom }. Zwraca czynniki, którymi się różnią.
export function roznice(probaA, probaB) {
  const klucze = [...new Set([...Object.keys(probaA), ...Object.keys(probaB)])];
  return klucze.filter((k) => probaA[k] !== probaB[k]);
}

// Ocena planu: { dobry, powod: 'zadna' | 'wiele' | 'inny' | null, roznice }.
export function ocenPlan(probaA, probaB, badany) {
  const r = roznice(probaA, probaB);
  if (r.length === 0) return { dobry: false, powod: 'zadna', roznice: r };
  if (r.length > 1) return { dobry: false, powod: 'wiele', roznice: r };
  if (r[0] !== badany) return { dobry: false, powod: 'inny', roznice: r };
  return { dobry: true, powod: null, roznice: r };
}

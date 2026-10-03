// Logika zadania „podpisywanie schematu”. Funkcje czyste, bez DOM.
//
// Tryb „trening”: etykieta sprawdzana od razu po umieszczeniu. Błędna wraca do banku,
// a komunikat podaje przyczynę i opis wskazanego elementu bez jego nazwy (gracz ma
// przypomnieć sobie nazwę sam). Po drugiej błędnej próbie w tym samym miejscu komunikat
// podaje nazwę. Do wyniku liczy się tylko pierwsza próba.
// Tryb „sprawdzian” (boss): gracz rozmieszcza wszystkie etykiety, potem „Sprawdź”.

export function zWielkiej(tekst) {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}

export function elementWTypie(element, idTypu) {
  return { ...element, ...(element.wTypie?.[idTypu] ?? {}) };
}

export function wymieszaj(lista, losuj = Math.random) {
  const wynik = [...lista];
  for (let i = wynik.length - 1; i > 0; i--) {
    const j = Math.floor(losuj() * (i + 1));
    [wynik[i], wynik[j]] = [wynik[j], wynik[i]];
  }
  return wynik;
}

// Punkty zadania z numerami 1…n w kolejności ze schematu, etykiety w banku i opisy elementów.
export function przygotujZadanie({ zadanie, schemat, elementy, typKomorki }) {
  const elementPoId = new Map(elementy.map((e) => [e.id, elementWTypie(e, typKomorki.id)]));
  const punkty = schemat.punkty
    .filter((p) => zadanie.punkty.includes(p.id))
    .map((p, i) => ({ ...p, numer: i + 1 }));
  const etykiety = [...punkty.map((p) => p.element), ...(zadanie.dystraktory ?? [])];
  return { punkty, etykiety, elementPoId, typKomorki, szerokosc: schemat.szerokosc, wysokosc: schemat.wysokosc };
}

export function nowyPrzebieg(przyg, tryb = 'trening') {
  const puste = (wartosc) => Object.fromEntries(przyg.punkty.map((p) => [p.id, wartosc]));
  return {
    tryb,
    przypisania: puste(null),
    proby: puste(0),
    pierwszaDobra: {},
    pomylki: [],
    sprawdzone: false,
  };
}

function el(przyg, id) {
  return przyg.elementPoId.get(id);
}

function przyczynaBledu(przyg, wybranyId) {
  const w = el(przyg, wybranyId);
  if (przyg.typKomorki.obecnosc?.[wybranyId] === 'nie') {
    return `${zWielkiej(przyg.typKomorki.nazwa)} nie ma ${w.brak}.`;
  }
  return `${zWielkiej(w.nazwa)} to ${w.opis}.`;
}

export function komunikatDobrze(przyg, punkt) {
  const e = el(przyg, punkt.element);
  return { rodzaj: 'dobrze', tytul: `Tak, to ${e.nazwa}.`, tekst: e.funkcja };
}

export function komunikatBledu(przyg, punkt, wybranyId, proba) {
  const w = el(przyg, wybranyId);
  const p = el(przyg, punkt.element);
  const wskazany =
    proba >= 2
      ? `Pod numerem ${punkt.numer} jest ${p.nazwa}: ${p.opis}.`
      : `Pod numerem ${punkt.numer}: ${p.opis}.`;
  return { rodzaj: 'zle', tytul: `To nie ${w.nazwa}.`, tekst: `${przyczynaBledu(przyg, wybranyId)} ${wskazany}` };
}

export function komunikatSprawdzianu(przyg, punkt, wybranyId) {
  const p = el(przyg, punkt.element);
  if (!wybranyId) {
    return { rodzaj: 'zle', tytul: `Pod numerem ${punkt.numer} jest ${p.nazwa}.`, tekst: `${zWielkiej(p.nazwa)} to ${p.opis}.` };
  }
  const w = el(przyg, wybranyId);
  return {
    rodzaj: 'zle',
    tytul: `Pod numerem ${punkt.numer} jest ${p.nazwa}, nie ${w.nazwa}.`,
    tekst: przyczynaBledu(przyg, wybranyId),
  };
}

// Tryb treningu. Zwraca { przebieg, wynik: 'dobrze' | 'zle' | 'zajete', komunikat, podpowiedz }.
// podpowiedz: element do wyróżnienia w banku po drugiej błędnej próbie.
export function podpiszTrening(przyg, przebieg, punktId, elementId) {
  const punkt = przyg.punkty.find((p) => p.id === punktId);
  if (!punkt || przebieg.przypisania[punktId] || !przyg.elementPoId.has(elementId)) {
    return { przebieg, wynik: 'zajete', komunikat: null, podpowiedz: null };
  }
  const proba = przebieg.proby[punktId] + 1;
  const dobrze = punkt.element === elementId;
  const nowy = {
    ...przebieg,
    proby: { ...przebieg.proby, [punktId]: proba },
    pierwszaDobra: proba === 1 ? { ...przebieg.pierwszaDobra, [punktId]: dobrze } : przebieg.pierwszaDobra,
    przypisania: dobrze ? { ...przebieg.przypisania, [punktId]: elementId } : przebieg.przypisania,
    pomylki: dobrze
      ? przebieg.pomylki
      : [...przebieg.pomylki, { punkt: punktId, wybrany: elementId, poprawny: punkt.element }],
  };
  return {
    przebieg: nowy,
    wynik: dobrze ? 'dobrze' : 'zle',
    komunikat: dobrze ? komunikatDobrze(przyg, punkt) : komunikatBledu(przyg, punkt, elementId, proba),
    podpowiedz: !dobrze && proba >= 2 ? punkt.element : null,
  };
}

// Tryb sprawdzianu: umieszcza etykietę (przenosi ją, jeśli leżała gdzie indziej).
// Zwraca { przebieg, wypchnieta } – etykietę, która wcześniej zajmowała to miejsce.
export function podpiszSprawdzian(przyg, przebieg, punktId, elementId) {
  if (przebieg.sprawdzone || !(punktId in przebieg.przypisania)) return { przebieg, wypchnieta: null };
  const przypisania = { ...przebieg.przypisania };
  for (const [p, e] of Object.entries(przypisania)) if (e === elementId) przypisania[p] = null;
  const wypchnieta = przypisania[punktId];
  przypisania[punktId] = elementId;
  return { przebieg: { ...przebieg, przypisania }, wypchnieta };
}

export function zdejmij(przebieg, punktId) {
  if (przebieg.sprawdzone || !przebieg.przypisania[punktId]) return { przebieg, zdjeta: null };
  return {
    przebieg: { ...przebieg, przypisania: { ...przebieg.przypisania, [punktId]: null } },
    zdjeta: przebieg.przypisania[punktId],
  };
}

export function sprawdz(przyg, przebieg) {
  const wyniki = przyg.punkty.map((p) => {
    const wybrany = przebieg.przypisania[p.id];
    const dobrze = wybrany === p.element;
    return {
      punkt: p.id,
      numer: p.numer,
      wybrany,
      poprawny: p.element,
      dobrze,
      komunikat: dobrze ? komunikatDobrze(przyg, p) : komunikatSprawdzianu(przyg, p, wybrany),
    };
  });
  return {
    przebieg: {
      ...przebieg,
      sprawdzone: true,
      pierwszaDobra: Object.fromEntries(wyniki.map((w) => [w.punkt, w.dobrze])),
      pomylki: wyniki.filter((w) => !w.dobrze).map((w) => ({ punkt: w.punkt, wybrany: w.wybrany, poprawny: w.poprawny })),
    },
    wyniki,
  };
}

export function czyGotowe(przyg, przebieg) {
  if (przebieg.tryb === 'sprawdzian') return przebieg.sprawdzone;
  return przyg.punkty.every((p) => przebieg.przypisania[p.id] === p.element);
}

// Wynik do zapisu: poprawne od razu, elementy z błędem przy pierwszej próbie.
export function podsumuj(przyg, przebieg) {
  const odRazu = przyg.punkty.filter((p) => przebieg.pierwszaDobra[p.id] === true);
  const zBledem = przyg.punkty.filter((p) => przebieg.pierwszaDobra[p.id] !== true);
  return {
    poprawne: odRazu.length,
    wszystkie: przyg.punkty.length,
    opanowaneElementy: odRazu.map((p) => p.element),
    bledneElementy: zBledem.map((p) => p.element),
  };
}

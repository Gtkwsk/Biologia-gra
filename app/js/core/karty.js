// Karty atlasu: elementy komórek, typy komórek (id: komorka-<typ>), pojęcia, procesy, substancje,
// kształty komórek i organizmy.
//
// Poziom karty (bez harmonogramu powtórek, decyzja z 2026-10-03):
// - nieodkryta: brak poprawnej odpowiedzi,
// - brązowa: poprawna odpowiedź choć raz,
// - srebrna: poprawnie za pierwszym razem w co najmniej dwóch różnych typach zadań,
// - złota: poprawnie za pierwszym razem w zadaniu bossa (warunki sprawdzianu).

export const NAZWY_POZIOMOW = {
  nieodkryta: 'nieodkryta',
  brazowa: 'brązowa',
  srebrna: 'srebrna',
  zlota: 'złota',
};

export function idKartyTypu(idTypu) {
  return `komorka-${idTypu}`;
}

export function katalogKart({ elementy = [], typyKomorek = [], pojecia = [], organizmy = [] }) {
  const katalog = new Map();
  for (const e of elementy) {
    katalog.set(e.id, {
      id: e.id,
      rodzaj: 'element',
      nazwa: e.nazwa,
      opis: e.opis,
      zdanie: e.funkcja,
      swiat: e.zrodlo === '2.2' ? 2 : 3,
      ciekawostka: e.ciekawostka,
      zrodlo: e.zrodlo,
    });
  }
  for (const t of typyKomorek) {
    const id = idKartyTypu(t.id);
    katalog.set(id, { id, rodzaj: 'typ', typ: t.id, nazwa: t.nazwa, opis: t.opis, swiat: t.swiat, ciekawostka: t.ciekawostka, zrodlo: t.zrodlo });
  }
  for (const p of pojecia) katalog.set(p.id, { ...p });
  for (const o of organizmy) katalog.set(o.id, { ...o, rodzaj: 'organizm' });
  return katalog;
}

export function poziomKarty(stanKarty) {
  if (!stanKarty) return 'nieodkryta';
  if (stanKarty.boss) return 'zlota';
  if (stanKarty.typy.length >= 2) return 'srebrna';
  return 'brazowa';
}

// Karty z błędem przy pierwszej próbie i karty rozpoznane od razu (wynik zadania).
export function kartyZBledem(wynik) {
  return [...new Set(wynik.karty.filter((k) => !k.odRazu).map((k) => k.karta))];
}

export function kartyOdRazu(wynik) {
  const zBledem = new Set(kartyZBledem(wynik));
  return [...new Set(wynik.karty.filter((k) => k.odRazu).map((k) => k.karta))].filter((k) => !zBledem.has(k));
}

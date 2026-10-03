// Logika „Wykrywacza bzdur” (SPEC.md, sekcja 5, typ 2, wariant): Profesor Pomyłka wygłasza
// wykład z 1-3 bzdurami. Gracz stuka słowa, które uważa za bzdury, i wybiera poprawkę.
// Funkcje czyste.
//
// Wykład to lista fragmentów: tekst albo słowo do sprawdzenia:
//   { slowo, karta, wyjasnienie }                      słowo prawdziwe,
//   { slowo, karta, wyjasnienie, poprawka, opcje }     bzdura; poprawka jest jedną z opcji.
// Stukać można tylko słowa do sprawdzenia, a reszta zdania jest prawdziwa. Dzięki temu każda
// bzdura ma jedną poprawkę (w zdaniu „X robi Y” błąd dałoby się poprawić i w X, i w Y).
//
// Wynik liczy każde słowo do sprawdzenia. Słowo prawdziwe jest od razu dobrze, jeśli gracz go
// nie zakwestionował; bzdura, jeśli gracz znalazł ją bez podpowiedzi i od razu wybrał właściwą
// poprawkę. Po dwóch pomyłkach z rzędu gra podświetla jedną z nieznalezionych bzdur, więc
// wykład zawsze da się skończyć.

export const POMYLKI_DO_PODPOWIEDZI = 2;

export const czySlowo = (f) => typeof f !== 'string';
export const czyBzdura = (s) => s.poprawka !== undefined;

export function slowaWykladu(wyklad) {
  return wyklad.filter(czySlowo);
}

// Tekst wykładu tak, jak mówi go profesor, i po poprawieniu wszystkich bzdur.
export function tekstWykladu(wyklad) {
  return wyklad.map((f) => (czySlowo(f) ? f.slowo : f)).join('');
}

export function tekstPoprawiony(wyklad) {
  return wyklad.map((f) => (czySlowo(f) ? (czyBzdura(f) ? f.poprawka : f.slowo) : f)).join('');
}

export function liczbaBzdur(wyklad) {
  return slowaWykladu(wyklad).filter(czyBzdura).length;
}

// „1 bzdura”, „2 bzdury”, „5 bzdur”.
export function bzdury(n) {
  if (n === 1) return '1 bzdura';
  const r10 = n % 10;
  const r100 = n % 100;
  return r10 >= 2 && r10 <= 4 && (r100 < 12 || r100 > 14) ? `${n} bzdury` : `${n} bzdur`;
}

// Stan słowa: 'nowe' | 'prawdziwe' (zakwestionowane, ale prawdziwe) | 'znalezione' (bzdura,
// gracz wybiera poprawkę) | 'poprawione'.
export function nowyStan(wyklad) {
  return {
    slowa: slowaWykladu(wyklad).map(() => ({ stan: 'nowe', odRazu: true, podpowiedz: false })),
    wybrane: null,
    pomylkiZRzedu: 0,
  };
}

const zmienSlowo = (st, i, zmiany) => ({ ...st, slowa: st.slowa.map((s, j) => (j === i ? { ...s, ...zmiany } : s)) });

export function poprawione(st) {
  return st.slowa.filter((s) => s.stan === 'poprawione').length;
}

export function czyKoniec(wyklad, st) {
  return poprawione(st) === liczbaBzdur(wyklad);
}

// Stuknięcie słowa o numerze i (kolejność słów do sprawdzenia w wykładzie).
export function stuknij(wyklad, st, i) {
  const s = slowaWykladu(wyklad)[i];
  if (!s || st.wybrane !== null || st.slowa[i].stan !== 'nowe') return { st, komunikat: null };
  if (czyBzdura(s)) {
    const nowy = { ...zmienSlowo(st, i, { stan: 'znalezione' }), wybrane: i, pomylkiZRzedu: 0 };
    return { st: nowy, komunikat: { rodzaj: 'dobrze', tytul: `Tak, „${s.slowo}” to bzdura!`, tekst: 'Wybierz poprawkę.' } };
  }
  let nowy = { ...zmienSlowo(st, i, { stan: 'prawdziwe', odRazu: false }), pomylkiZRzedu: st.pomylkiZRzedu + 1 };
  let tekst = s.wyjasnienie;
  const juzPodpowiedz = nowy.slowa.some((x) => x.podpowiedz && x.stan === 'nowe');
  if (nowy.pomylkiZRzedu >= POMYLKI_DO_PODPOWIEDZI && !juzPodpowiedz) {
    const slowa = slowaWykladu(wyklad);
    const cel = nowy.slowa.findIndex((x, j) => czyBzdura(slowa[j]) && x.stan === 'nowe');
    if (cel >= 0) {
      nowy = zmienSlowo(nowy, cel, { podpowiedz: true, odRazu: false });
      tekst += ' Podpowiedź: przyjrzyj się podświetlonemu słowu.';
    }
  }
  return { st: nowy, komunikat: { rodzaj: 'zle', tytul: `„${s.slowo}” to nie bzdura.`, tekst } };
}

export function wybierzPoprawke(wyklad, st, opcja) {
  if (st.wybrane === null) return { st, komunikat: null };
  const i = st.wybrane;
  const s = slowaWykladu(wyklad)[i];
  if (opcja === s.poprawka) {
    const nowy = { ...zmienSlowo(st, i, { stan: 'poprawione', podpowiedz: false }), wybrane: null };
    return { st: nowy, komunikat: { rodzaj: 'dobrze', tytul: `Tak: „${s.poprawka}”.`, tekst: s.wyjasnienie } };
  }
  return {
    st: zmienSlowo(st, i, { odRazu: false }),
    komunikat: { rodzaj: 'zle', tytul: `„${opcja}” też nie pasuje.`, tekst: s.wyjasnienie },
  };
}

export function wynik(wyklad, st) {
  const karty = slowaWykladu(wyklad).map((s, i) => ({ karta: s.karta, odRazu: st.slowa[i].odRazu, poprawnie: true }));
  return { poprawne: karty.filter((k) => k.odRazu).length, wszystkie: karty.length, karty };
}

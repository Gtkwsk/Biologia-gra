// Logika zadania „doświadczenie” (SPEC.md, sekcja 5, typ 7). Funkcje czyste.
//
// Krok: { pytanie, opcje: [{ tekst, poprawna?, wyjasnienie? }], wyjasnienie, karta?, kolejnosc? }.
// Dokładnie jedna opcja jest poprawna (pilnuje walidator). Wyjaśnienie opcji błędnej mówi,
// dlaczego jest błędna; wyjaśnienie kroku mówi, dlaczego poprawna odpowiedź jest poprawna.
// Trening: po błędzie można wybrać inną opcję; krok liczy się jako dobry od razu tylko
// przy pierwszej odpowiedzi poprawnej. Sprawdzian: jedna odpowiedź na krok, ocena na końcu.

export function poprawnaOpcja(krok) {
  return krok.opcje.findIndex((o) => o.poprawna === true);
}

// Zwraca { dobrze, tekst } – tekst to wyjaśnienie do pokazania po odpowiedzi.
export function ocenOpcje(krok, indeks) {
  const o = krok.opcje[indeks];
  if (!o) return { dobrze: false, tekst: '' };
  if (o.poprawna) return { dobrze: true, tekst: krok.wyjasnienie };
  return { dobrze: false, tekst: o.wyjasnienie ?? 'Ta odpowiedź nie pasuje do opisu doświadczenia.' };
}

// Kolejność opcji w widoku: stała (np. próby A i B) albo pomieszana.
export function kolejnoscOpcji(krok, mieszaj) {
  const indeksy = krok.opcje.map((_, i) => i);
  return krok.kolejnosc === 'stala' ? indeksy : mieszaj(indeksy);
}

// odpowiedzi: { indeksKroku: indeksOpcji } (sprawdzian) albo pierwsze odpowiedzi (trening).
export function wynik(kroki, pierwsze, tryb = 'trening') {
  const dobre = kroki.map((k, i) => pierwsze[i] !== undefined && k.opcje[pierwsze[i]]?.poprawna === true);
  return {
    poprawne: dobre.filter(Boolean).length,
    wszystkie: kroki.length,
    karty: kroki
      .map((k, i) => ({ karta: k.karta ?? null, odRazu: dobre[i], poprawnie: tryb === 'trening' || dobre[i] }))
      .filter((k) => k.karta),
  };
}

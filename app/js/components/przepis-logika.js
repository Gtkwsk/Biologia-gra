// Logika mechaniki „przepis procesu” (SPEC.md, sekcja 3.2: przepis kuchenny w świecie 4,
// piekarnia i lustro w świecie 6). Funkcje czyste. Dane procesów: data/procesy.js.
//
// Przepis to „garnek” procesu z polami na składniki (wejścia) i produkty (wyjścia).
// Tryb lustra: dwa procesy obok siebie (fotosynteza i oddychanie tlenowe), a pola leżą na
// strzałkach między nimi: produkty jednego procesu są składnikami drugiego.
//
// Pole: { id, substancja, strefa, podpis }
//   strefa: 'wejscie' | 'wyjscie' (jeden proces) albo 'wejscie-lewe' | 'gora' | 'dol' | 'wyjscie-prawe' (lustro).
// Dopasowanie: 'pole' – karta pasuje tylko do pola ze swoją substancją (pola różnią się drogą,
//   np. dwutlenek węgla z powietrza, woda z gleby); 'strefa' – karty tej samej strefy są
//   wymienne (np. dwa produkty fermentacji).

export function pasuje(pole, idKarty, procesy, dopasowanie = 'pole') {
  if (dopasowanie === 'strefa') return pasujeDoStrefy(pole.strefa, idKarty, procesy);
  return pole.substancja === idKarty;
}

// Rola karty w procesie: 'substrat', 'warunek', 'produkt' albo null.
export function rola(proces, idKarty) {
  const id = proces.rownowazne?.[idKarty] ?? idKarty;
  if (proces.substraty.includes(id)) return 'substrat';
  if ((proces.warunki ?? []).includes(id)) return 'warunek';
  if (proces.produkty.includes(id)) return 'produkt';
  return null;
}

// Czy karta pasuje do strefy pola. W lustrze: 'gora' to produkty lewego procesu, które są
// składnikami prawego; 'dol' odwrotnie.
export function pasujeDoStrefy(strefa, idKarty, [lewy, prawy = null]) {
  const rl = rola(lewy, idKarty);
  const rp = prawy ? rola(prawy, idKarty) : null;
  switch (strefa) {
    case 'wejscie':
    case 'wejscie-lewe':
      return rl === 'substrat' || rl === 'warunek';
    case 'wyjscie':
      return rl === 'produkt';
    case 'gora':
      return rl === 'produkt' && rp === 'substrat';
    case 'dol':
      return rp === 'produkt' && rl === 'substrat';
    case 'wyjscie-prawe':
      return rp === 'produkt';
    default:
      return false;
  }
}

// Wyjaśnienie, dlaczego karta nie pasuje do pola (bez nazwy poprawnej odpowiedzi).
// dystraktor: { wyjasnienie } albo null; procesy: [lewy, prawy?].
export function powodBledu(pole, idKarty, procesy, dystraktor = null) {
  if (dystraktor) return dystraktor.wyjasnienie;
  const [lewy, prawy = null] = procesy;
  if (prawy) {
    return procesy
      .map((p) => p.opisy?.[idKarty])
      .filter(Boolean)
      .join(' ');
  }
  const r = rola(lewy, idKarty);
  const opis = lewy.opisy?.[idKarty] ?? '';
  if (pole.strefa === 'wejscie' && r === 'produkt') return `To nie składnik ${lewy.dopelniacz}, tylko produkt. ${opis}`.trim();
  if (pole.strefa === 'wyjscie' && (r === 'substrat' || r === 'warunek')) return `To nie produkt ${lewy.dopelniacz}. ${opis}`.trim();
  return pole.podpis ? `${opis} To pole: ${pole.podpis}.`.trim() : opis;
}

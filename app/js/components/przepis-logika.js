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

const NAZWY_ROL = { substrat: 'składnik', warunek: 'warunek', produkt: 'produkt' };

// Lustro: rola substancji w obu procesach i jej droga między nimi, np. „Tlen to produkt
// fotosyntezy i składnik oddychania tlenowego. Dlatego wędruje od fotosyntezy do oddychania
// tlenowego.” Zdania bez form zależnych od rodzaju gramatycznego nazwy.
export function drogaWLustrze(idKarty, nazwa, [lewy, prawy]) {
  const role = [
    [lewy, rola(lewy, idKarty)],
    [prawy, rola(prawy, idKarty)],
  ].filter(([, r]) => r);
  role.sort(([, a], [, b]) => (a === 'produkt' ? 0 : 1) - (b === 'produkt' ? 0 : 1));
  const Nazwa = `${nazwa.charAt(0).toUpperCase()}${nazwa.slice(1)}`;
  if (!role.length) return `${Nazwa} nie bierze udziału w tych procesach.`;
  const kim = `${Nazwa} to ${role.map(([p, r]) => `${NAZWY_ROL[r]} ${p.dopelniacz}`).join(' i ')}.`;
  const zrodlo = role.find(([, r]) => r === 'produkt')?.[0];
  const cel = role.find(([, r]) => r !== 'produkt')?.[0];
  const drugi = (p) => (p === lewy ? prawy : lewy);
  if (zrodlo && cel) return `${kim} Dlatego wędruje od ${zrodlo.dopelniacz} do ${cel.dopelniacz}.`;
  if (zrodlo) return `${kim} Nie jest składnikiem ${drugi(zrodlo).dopelniacz}, więc nie wędruje między procesami.`;
  return `${kim} Nie powstaje ${drugi(cel).miejscownik}, więc nie wędruje między procesami.`;
}

// Wyjaśnienie, dlaczego karta nie pasuje do pola (bez nazwy poprawnej odpowiedzi).
// dystraktor: { wyjasnienie } albo null; procesy: [lewy, prawy?]; nazwa: nazwa karty (lustro).
export function powodBledu(pole, idKarty, procesy, dystraktor = null, nazwa = idKarty) {
  if (dystraktor) return dystraktor.wyjasnienie;
  const [lewy, prawy = null] = procesy;
  if (prawy) return drogaWLustrze(idKarty, nazwa, procesy);
  const r = rola(lewy, idKarty);
  const opis = lewy.opisy?.[idKarty] ?? '';
  if (pole.strefa === 'wejscie' && r === 'produkt') return `To nie składnik ${lewy.dopelniacz}, tylko produkt. ${opis}`.trim();
  if (pole.strefa === 'wyjscie' && (r === 'substrat' || r === 'warunek')) return `To nie produkt ${lewy.dopelniacz}. ${opis}`.trim();
  return pole.podpis ? `${opis} To pole: ${pole.podpis}.`.trim() : opis;
}

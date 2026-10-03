// Logika zadania „uzupełnianie luk”: odczyt tekstu z lukami. Funkcje czyste (także dla walidatora).
//
// [słowo]                  – luka,
// [słowo|karta]            – luka powiązana z kartą atlasu,
// [słowo|karta|podpowiedź] albo [słowo||podpowiedź] – luka z podpowiedzią do pierwszej błędnej próby.

export function parsujLuki(tekst) {
  const fragmenty = [];
  const wzor = /\[([^\]]+)\]/g;
  let ostatni = 0;
  let numer = 0;
  for (const m of tekst.matchAll(wzor)) {
    if (m.index > ostatni) fragmenty.push({ typ: 'tekst', tekst: tekst.slice(ostatni, m.index) });
    const [slowo, karta = '', podpowiedz = ''] = m[1].split('|').map((c) => c.trim());
    numer += 1;
    fragmenty.push({ typ: 'luka', id: `luka-${numer}`, numer, slowo, karta: karta || null, podpowiedz: podpowiedz || null });
    ostatni = m.index + m[0].length;
  }
  if (ostatni < tekst.length) fragmenty.push({ typ: 'tekst', tekst: tekst.slice(ostatni) });
  return fragmenty;
}

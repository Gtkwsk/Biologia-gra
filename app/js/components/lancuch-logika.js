// Logika mechaniki „Łańcuchy pokarmowe” (SPEC.md, sekcja 3.2, świat 5). Funkcje czyste.
//
// Łańcuch to ciąg ogniw: pokarm → ten, kto go zjada → ... Zaczyna się od organizmu samożywnego.
// Dobre ogniwa muszą wynikać z zależności zapisanych w data/pokarm.js (tylko pary z TRESCI.md,
// sekcja 2.5). Złą opcję trzeba móc wykluczyć samą definicją kategorii (TRESCI.md, sekcja 3),
// np. roślinożerca nie zjada zwierząt, drapieżnik nie żywi się roślinami. Opcji, których
// definicja nie wyklucza (np. inny drapieżnik), łańcuch nie może pokazywać, bo gra nie ma prawa
// uznać ich za błąd bez faktów spoza TRESCI.md (pilnuje tego walidator).

const SAMOZYWNE = ['organizm samożywny (roślina)', 'organizm samożywny (protisty)', 'organizm samożywny (bakterie)'];
const ZWIERZETA = ['roślinożerca', 'drapieżnik', 'padlinożerca', 'wszystkożerca', 'zwierzę (przykład)', 'pasożyt zewnętrzny', 'pasożyt wewnętrzny'];
// Organizmy odżywiające się szczątkami to drobne zwierzęta, bakterie i grzyby (TRESCI.md, 2.5).
const GRZYBY = new Set(['plesniak-bialy', 'drozdze']);

// Typ pokarmu: 'roslinny', 'zwierze', 'grzyb', 'padlina', 'szczatki' albo null (nieznany).
export function typPokarmu(id, { katalog, wezly }) {
  const w = wezly.find((x) => x.id === id);
  if (w) return w.typ;
  const k = katalog.get(id);
  if (!k || k.rodzaj !== 'organizm') return null;
  if (GRZYBY.has(id)) return 'grzyb';
  if (SAMOZYWNE.includes(k.kategoria)) return 'roslinny';
  if (ZWIERZETA.includes(k.kategoria) || k.kategoria === 'organizm odżywiający się szczątkami') return 'zwierze';
  return null;
}

export function samozywny(id, { katalog, wezly }) {
  const w = wezly.find((x) => x.id === id);
  if (w) return Boolean(w.samozywny);
  return SAMOZYWNE.includes(katalog.get(id)?.kategoria);
}

// Czy „zjada” może zjeść „pokarm”: 'tak' (zależność z TRESCI.md), 'nie' (wyklucza to definicja
// kategorii) albo 'nie-wiadomo' (definicja nie wyklucza, ale TRESCI.md tego nie podaje).
export function relacja(zjada, pokarm, dane) {
  if (dane.zaleznosci.some((z) => z.zjada === zjada && z.pokarm === pokarm)) return 'tak';
  const kategoria = dane.katalog.get(zjada)?.kategoria;
  const typ = typPokarmu(pokarm, dane);
  if (!kategoria) return 'nie';
  if (SAMOZYWNE.includes(kategoria)) return 'nie';
  switch (kategoria) {
    case 'roślinożerca':
      return typ === 'roslinny' ? 'nie-wiadomo' : 'nie';
    case 'drapieżnik':
    case 'padlinożerca':
      return typ === 'zwierze' || typ === 'padlina' ? 'nie-wiadomo' : 'nie';
    case 'organizm odżywiający się szczątkami':
      return typ === 'szczatki' || typ === 'padlina' ? 'nie-wiadomo' : 'nie';
    default:
      return 'nie-wiadomo';
  }
}

// Łańcuch z ogniwami { ogniwa: [id | null], opcje: [{ karta, poprawna?, wyjasnienie? }] }.
export function poprawna(lancuch) {
  return lancuch.opcje.find((o) => o.poprawna)?.karta ?? null;
}

export function pelny(lancuch) {
  const p = poprawna(lancuch);
  return lancuch.ogniwa.map((id) => id ?? p);
}

export function indeksLuki(lancuch) {
  return lancuch.ogniwa.indexOf(null);
}

// Ocena wybranej opcji: { dobrze, tekst } (tekst: przyczyna z danych albo zdania o zależnościach).
export function ocen(lancuch, karta, dane) {
  if (karta === poprawna(lancuch)) return { dobrze: true, tekst: wyjasnienieLuki(lancuch, dane) };
  const o = lancuch.opcje.find((x) => x.karta === karta);
  return { dobrze: false, tekst: o?.wyjasnienie ?? '' };
}

// Zdania o zależnościach wokół luki (z data/pokarm.js) i o początku łańcucha.
export function wyjasnienieLuki(lancuch, dane) {
  const ogniwa = pelny(lancuch);
  const i = indeksLuki(lancuch);
  const zdania = [];
  if (i === 0) zdania.push('Łańcuch zaczyna się od organizmu samożywnego, który sam wytwarza pokarm.');
  for (const [pokarm, zjada] of [
    [ogniwa[i - 1], ogniwa[i]],
    [ogniwa[i], ogniwa[i + 1]],
  ]) {
    if (!pokarm || !zjada) continue;
    const z = dane.zaleznosci.find((x) => x.zjada === zjada && x.pokarm === pokarm);
    if (z) zdania.push(z.dlaczego);
  }
  return zdania.join(' ');
}

// Problemy łańcucha (dla walidatora): lista opisów błędów.
export function problemy(lancuch, dane) {
  const wynik = [];
  const ogniwa = lancuch.ogniwa ?? [];
  if (ogniwa.length < 3) wynik.push('łańcuch musi mieć co najmniej trzy ogniwa');
  if (ogniwa.filter((x) => x === null).length !== 1) wynik.push('łańcuch musi mieć dokładnie jedną lukę (null)');
  const dobre = (lancuch.opcje ?? []).filter((o) => o.poprawna === true);
  if (dobre.length !== 1) {
    wynik.push(`opcji poprawnych jest ${dobre.length}, a musi być dokładnie jedna`);
    return wynik;
  }
  const znany = (id) => dane.wezly.some((w) => w.id === id) || dane.katalog.get(id)?.rodzaj === 'organizm';
  const caly = pelny(lancuch);
  for (const id of caly) if (!znany(id)) wynik.push(`nieznane ogniwo „${id}” (węzeł z data/pokarm.js albo karta organizmu)`);
  if (wynik.length) return wynik;
  if (!samozywny(caly[0], dane)) wynik.push(`łańcuch zaczyna się od „${caly[0]}”, a powinien od organizmu samożywnego`);
  for (let i = 0; i < caly.length - 1; i++) {
    if (relacja(caly[i + 1], caly[i], dane) !== 'tak') wynik.push(`brak zależności „${caly[i + 1]}” zjada „${caly[i]}” w data/pokarm.js`);
  }
  const i = indeksLuki(lancuch);
  const lewy = caly[i - 1] ?? null;
  const prawy = caly[i + 1] ?? null;
  for (const o of lancuch.opcje) {
    if (o.poprawna) continue;
    if (!dane.katalog.get(o.karta)) {
      wynik.push(`opcja „${o.karta}” nie jest kartą atlasu`);
      continue;
    }
    if (!o.wyjasnienie) wynik.push(`opcja „${o.karta}” bez wyjaśnienia`);
    const wykluczona =
      (i === 0 && !samozywny(o.karta, dane)) ||
      (lewy !== null && relacja(o.karta, lewy, dane) === 'nie') ||
      (prawy !== null && relacja(prawy, o.karta, dane) === 'nie');
    if (!wykluczona) wynik.push(`opcji „${o.karta}” nie da się wykluczyć definicją kategorii: mogłaby pasować do luki`);
  }
  return wynik;
}

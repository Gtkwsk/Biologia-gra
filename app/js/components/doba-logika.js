// Logika mechaniki „Liść przez dobę” (SPEC.md, sekcja 3.2, świat 6). Funkcje czyste.
//
// TRESCI.md, sekcja 2.6: w dzień w komórkach roślin zachodzą jednocześnie fotosynteza
// i oddychanie; fotosynteza wytwarza więcej tlenu, niż zużywa oddychanie, więc roślina oddaje
// tlen do otoczenia. W nocy zachodzi tylko oddychanie: roślina pobiera tlen i oddaje dwutlenek
// węgla. Sekcja 2.4: do fotosyntezy dwutlenek węgla wnika do liści przez aparaty szparkowe.
// Pytania padają tylko w południe i o północy (zmierzch pomijamy, bo TRESCI.md go nie opisuje).

export const PORY = {
  dzien: { godzina: 12, nazwa: 'południe' },
  noc: { godzina: 0, nazwa: 'północ' },
};

export function poraDnia(godzina) {
  if (godzina >= 7 && godzina <= 17) return 'dzien';
  if (godzina >= 21 || godzina <= 3) return 'noc';
  return 'zmierzch';
}

export const PROCESY = ['fotosynteza', 'oddychanie-komorkowe'];

export function procesy(pora) {
  return pora === 'dzien' ? ['fotosynteza', 'oddychanie-komorkowe'] : ['oddychanie-komorkowe'];
}

export function gazy(pora) {
  return pora === 'dzien' ? { pobiera: 'dwutlenek-wegla', oddaje: 'tlen' } : { pobiera: 'tlen', oddaje: 'dwutlenek-wegla' };
}

// wybrane: lista id procesów. Zwraca { dobrze, tekst } z przyczyną.
export function ocenProcesy(pora, wybrane) {
  const oczekiwane = procesy(pora);
  const zbior = new Set(wybrane);
  const dobrze = oczekiwane.length === zbior.size && oczekiwane.every((p) => zbior.has(p));
  if (dobrze) {
    return {
      dobrze,
      tekst:
        pora === 'dzien'
          ? 'W dzień w komórkach liścia zachodzą jednocześnie fotosynteza i oddychanie komórkowe.'
          : 'W nocy zachodzi tylko oddychanie komórkowe: bez światła nie ma fotosyntezy.',
    };
  }
  const powody = [];
  if (!zbior.has('oddychanie-komorkowe')) powody.push('Rośliny oddychają cały czas, w dzień i w nocy.');
  if (pora === 'dzien' && !zbior.has('fotosynteza')) powody.push('W dzień, w świetle, w chloroplastach liścia zachodzi fotosynteza.');
  if (pora === 'noc' && zbior.has('fotosynteza')) powody.push('W nocy nie ma światła, więc fotosynteza nie zachodzi.');
  return { dobrze, tekst: powody.join(' ') };
}

// wybor: { pobiera, oddaje } (id kart substancji albo null). Zwraca { dobrze, tekst }.
export function ocenGazy(pora, wybor) {
  const o = gazy(pora);
  const dobrze = wybor.pobiera === o.pobiera && wybor.oddaje === o.oddaje;
  const tekst =
    pora === 'dzien'
      ? 'W dzień fotosynteza wytwarza więcej tlenu, niż zużywa oddychanie, więc liść oddaje tlen do otoczenia. Do fotosyntezy pobiera dwutlenek węgla przez aparaty szparkowe.'
      : 'W nocy zachodzi tylko oddychanie: liść pobiera tlen i oddaje dwutlenek węgla.';
  return { dobrze, tekst };
}

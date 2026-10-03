// Adresy ekranów zapisane po znaku # (działa offline i bez reguł na serwerze).
//
// #/                         mapa
// #/swiat/2                  wstęp świata
// #/swiat/2/misja/<id>       misja
// #/swiat/2/boss             boss świata
// #/podsumowanie             koniec wyprawy
// #/baza                     baza
// #/atlas                    atlas kart
// #/mikroskop                mikroskop
// #/sprawdzian               próbny sprawdzian
// #/laboratorium             domowe laboratorium
// #/rodzic                   panel rodzica

export function parsujAdres(hash = '') {
  let czesci;
  try {
    czesci = hash
      .replace(/^#\/?/, '')
      .split('/')
      .filter(Boolean)
      .map((c) => decodeURIComponent(c));
  } catch {
    return { ekran: 'nieznany' };
  }
  const [a, b, c, d] = czesci;
  if (!a || (a === 'mapa' && czesci.length === 1)) return { ekran: 'mapa' };
  if (a === 'swiat' && /^[1-6]$/.test(b ?? '')) {
    if (czesci.length === 2) return { ekran: 'swiat', swiat: Number(b) };
    if (c === 'misja' && d && czesci.length === 4) return { ekran: 'misja', swiat: Number(b), misja: d };
    if (c === 'boss' && czesci.length === 3) return { ekran: 'boss', swiat: Number(b) };
  }
  if (czesci.length === 1 && ['podsumowanie', 'baza', 'atlas', 'mikroskop', 'sprawdzian', 'laboratorium', 'rodzic'].includes(a)) return { ekran: a };
  return { ekran: 'nieznany' };
}

export function adres(cel) {
  switch (cel.ekran) {
    case 'mapa':
      return '#/';
    case 'swiat':
      return `#/swiat/${cel.swiat}`;
    case 'misja':
      return `#/swiat/${cel.swiat}/misja/${encodeURIComponent(cel.misja)}`;
    case 'boss':
      return `#/swiat/${cel.swiat}/boss`;
    default:
      return `#/${cel.ekran}`;
  }
}

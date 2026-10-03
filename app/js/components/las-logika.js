// Model mechaniki „Las bez sprzątaczy” (SPEC.md, sekcja 3.2, świat 5). Funkcje czyste.
//
// TRESCI.md, sekcja 2.5: organizmy odżywiające się szczątkami (drobne zwierzęta, bakterie,
// grzyby) zapobiegają gromadzeniu się szczątków w przyrodzie.
// Sekcja 6 (ciekawostka): bez nich las z czasem utonąłby we własnych szczątkach; zwracają też
// glebie sole mineralne. Sekcja 2.4: niedobór soli mineralnych zmniejsza intensywność fotosyntezy,
// a w niekorzystnych warunkach rośliny rosną słabiej.
// Model poglądowy: co roku opadają liście; organizmy odżywiające się szczątkami rozkładają więcej,
// niż opada, i zwracają glebie sole mineralne. Bez nich szczątki rosną, a soli w glebie ubywa.

export const MAKS_SZCZATKOW = 9;
export const MAKS_SOLI = 4;
const OPAD = 2;
const ROZKLAD = 4;

export function nowyLas() {
  return { rok: 0, szczatki: 1, sole: MAKS_SOLI };
}

export function rok(stan, sprzatacze) {
  const szczatki = sprzatacze ? Math.max(1, stan.szczatki + OPAD - ROZKLAD) : Math.min(MAKS_SZCZATKOW, stan.szczatki + OPAD);
  const sole = sprzatacze ? Math.min(MAKS_SOLI, stan.sole + 1) : Math.max(0, stan.sole - 1);
  return { rok: stan.rok + 1, szczatki, sole };
}

export function lata(stan, sprzatacze, ile) {
  const kolejne = [];
  let s = stan;
  for (let i = 0; i < ile; i++) {
    s = rok(s, sprzatacze);
    kolejne.push(s);
  }
  return kolejne;
}

// Wielkość roślin zależy od soli mineralnych w glebie: 'duze', 'srednie', 'male'.
export function rosliny(sole) {
  if (sole >= 3) return 'duze';
  if (sole === 2) return 'srednie';
  return 'male';
}

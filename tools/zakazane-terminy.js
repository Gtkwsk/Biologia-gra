// Warianty terminów spoza TRESCI.md, niedozwolone w tekstach gry.
// Walidator przeszukuje nimi wszystkie teksty w danych (pytania, opisy, wstępy).
// Terminy dozwolone walidator czyta wprost z TRESCI.md, sekcja 9.

export const ZAKAZANE = [
  { wzorzec: /\bdestruen/i, zamiast: 'organizmy odżywiające się szczątkami' },
  { wzorzec: /\breducen/i, zamiast: 'organizmy odżywiające się szczątkami' },
  { wzorzec: /\bsaprofit/i, zamiast: 'organizmy odżywiające się szczątkami' },
  { wzorzec: /\bsaprotrof/i, zamiast: 'organizmy odżywiające się szczątkami' },
  { wzorzec: /\bdetrytusożer/i, zamiast: 'organizmy odżywiające się szczątkami' },
  { wzorzec: /\bautotrof/i, zamiast: 'organizm samożywny' },
  { wzorzec: /\bheterotrof/i, zamiast: 'organizm cudzożywny' },
  { wzorzec: /\borganell/i, zamiast: 'element komórki' },
  { wzorzec: /\bplazmolem/i, zamiast: 'błona komórkowa' },
  { wzorzec: /\bprotoplazm/i, zamiast: 'cytoplazma' },
  { wzorzec: /\bretikulum/i, zamiast: 'siateczka śródplazmatyczna' },
  { wzorzec: /\bsiateczk\p{L}* endoplazmatyczn/iu, zamiast: 'siateczka śródplazmatyczna' },
  { wzorzec: /\bmitochondrion\b/i, zamiast: 'mitochondrium' },
  { wzorzec: /\bjąderk/i, zamiast: 'jądro komórkowe (jąderka nie ma w TRESCI.md)' },
  { wzorzec: /\bprokariot/i, zamiast: 'komórka bezjądrowa' },
  { wzorzec: /\beukariot/i, zamiast: 'komórka jądrowa' },
  { wzorzec: /\boddychani\p{L}* beztlenow/iu, zamiast: 'fermentacja' },
  { wzorzec: /\bwić bakteri/i, zamiast: 'rzęska' },
  { wzorzec: /\bglikoliz/i, zamiast: 'rozkład glukozy (bez nazw etapów spoza TRESCI.md)' },
  { wzorzec: /\bcykl\p{L}* Krebsa/iu, zamiast: 'rozkład glukozy (bez nazw etapów spoza TRESCI.md)' },
];

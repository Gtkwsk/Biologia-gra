// Konstruktor czterech komórek (świat 3): wspólny zestaw części dla wszystkich planów.
// Części to elementy z tabeli porównawczej w TRESCI.md, sekcja 2.3, oraz nić DNA, bez rzęski:
// tabela podaje ją tylko u bakterii, a odrzucenie rzęski w komórce zwierzęcej utrwalałoby
// fałszywą regułę (rzęski mają np. komórki nabłonka dróg oddechowych; SPEC.md, sekcja 12).
// Reguły (czy dany typ komórki ma część) wynikają z data/typy-komorek.js.

export default [
  'blona-komorkowa',
  'cytozol',
  'jadro-komorkowe',
  'nic-dna',
  'mitochondrium',
  'rybosomy',
  'wakuola',
  'chloroplast',
  'sciana-komorkowa',
  'otoczka-sluzowa',
];

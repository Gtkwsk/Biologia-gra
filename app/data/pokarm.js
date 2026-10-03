// Zależności pokarmowe do łańcuchów (świat 5, SPEC.md, sekcja 3.2). Tylko pary, które wynikają
// wprost z TRESCI.md, sekcja 2.5.
//
// wezly: pokarm, który nie jest kartą atlasu (np. rośliny, nektar kwiatów).
//   typ: 'roslinny' (pokarm roślinny), 'padlina' (ciało martwego zwierzęcia), 'szczatki';
//   samozywny: węzeł to organizmy samożywne (od nich zaczyna się łańcuch).
// zaleznosci: { zjada, pokarm, dlaczego } – kto (karta organizmu) zjada co (węzeł albo karta);
//   dlaczego: pełne zdanie z TRESCI.md, pokazywane po dobrym ułożeniu łańcucha.

export const WEZLY = [
  { id: 'rosliny', nazwa: 'rośliny', typ: 'roslinny', ikona: 'rosliny', samozywny: true },
  { id: 'trawa', nazwa: 'trawy', typ: 'roslinny', ikona: 'trawa', samozywny: true },
  { id: 'kwiat', nazwa: 'kwiaty z nektarem', typ: 'roslinny', ikona: 'kwiat', samozywny: true },
];

export const ZALEZNOSCI = [
  { zjada: 'jelen', pokarm: 'rosliny', dlaczego: 'Jeleń jest roślinożercą: żywi się pokarmem roślinnym.' },
  { zjada: 'zebra', pokarm: 'trawa', dlaczego: 'Zebra jest roślinożercą: zjada liście i łodygi traw.' },
  { zjada: 'lis', pokarm: 'rosliny', dlaczego: 'Lis jest wszystkożercą: zjada pokarm roślinny i zwierzęcy.' },
  { zjada: 'rusalka-pokrzywnik', pokarm: 'kwiat', dlaczego: 'Rusałka pokrzywnik pije nektar kwiatów.' },
  { zjada: 'niedzwiedz-brunatny', pokarm: 'jelen', dlaczego: 'Niedźwiedź brunatny zjada m.in. duże ssaki, np. jelenie.' },
  { zjada: 'orzel-przedni', pokarm: 'lis', dlaczego: 'Orzeł przedni jest drapieżnikiem: poluje m.in. na lisy.' },
  { zjada: 'wrobel', pokarm: 'rusalka-pokrzywnik', dlaczego: 'Wróbel latem zjada także owady, np. motyle.' },
];

export default { wezly: WEZLY, zaleznosci: ZALEZNOSCI };

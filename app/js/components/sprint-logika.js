// Model sprintu (SPEC.md, sekcja 3.2, świat 6). Funkcje czyste.
//
// Zgodnie z TRESCI.md (sekcja 2.6):
// - energię mięśniom daje oddychanie komórkowe; gdy krew dostarcza dość tlenu, jest to
//   oddychanie tlenowe (główne etapy w mitochondriach),
// - przy długiej, bardzo intensywnej pracy krew nie dostarcza wystarczającej ilości tlenu;
//   wtedy w mięśniach szkieletowych zachodzi fermentacja mlekowa: powstaje kwas mlekowy,
//   a energii uwalnia się mało (glukoza rozkładana częściowo),
// - po dużym wysiłku kwas mlekowy gromadzi się w mięśniach; w ciągu kilkudziesięciu minut
//   krew przenosi go do wątroby, gdzie służy do produkcji glukozy.
// Model pokazuje wersję ze słuchowiska: przy niedoborze tlenu część energii pochodzi
// z fermentacji mlekowej (TRESCI.md, sekcja 5, dopuszcza też brzmienie „zamiast”).

export const MAKS_TLENU = 3;

export const TEMPA = {
  odpoczynek: { nazwa: 'odpoczynek', zapotrzebowanie: 1 },
  trucht: { nazwa: 'trucht', zapotrzebowanie: 2 },
  bieg: { nazwa: 'szybki bieg', zapotrzebowanie: 3 },
  sprint: { nazwa: 'sprint', zapotrzebowanie: 5 },
};

// Ile kwasu mlekowego przybywa za każdą jednostkę energii z fermentacji.
const KWAS_ZA_JEDNOSTKE = 2;
export const MAKS_KWASU = 8;

export function nowyBieg() {
  return { kwas: 0, etap: 0 };
}

// Stan po etapie biegu w danym tempie. czas: 'chwila' albo 'kilkadziesiat-minut' (tylko odpoczynek:
// po kilkudziesięciu minutach krew zdąży przenieść cały kwas mlekowy do wątroby; tuż po wysiłku
// kwas mlekowy jest jeszcze w mięśniach).
export const CZASY = ['chwila', 'kilkadziesiat-minut'];

export function etap(stan, tempo, czas = 'chwila') {
  const zapotrzebowanie = TEMPA[tempo].zapotrzebowanie;
  const tlen = Math.min(zapotrzebowanie, MAKS_TLENU);
  const mlekowa = zapotrzebowanie - tlen;
  let kwas = stan.kwas;
  if (mlekowa > 0) kwas = Math.min(MAKS_KWASU, kwas + mlekowa * KWAS_ZA_JEDNOSTKE);
  else if (tempo === 'odpoczynek' && czas === 'kilkadziesiat-minut') kwas = 0;
  return {
    kwas,
    etap: stan.etap + 1,
    zapotrzebowanie,
    tlen,
    mlekowa,
    niedoborTlenu: mlekowa > 0,
    doWatroby: stan.kwas > kwas,
  };
}

// Krótki opis tego, co pokazują paski po etapie (komunikat po stuknięciu polecenia trenera).
export function opisEtapu(w, tempo) {
  if (w.niedoborTlenu) return 'Krew nie nadąża z dostawą tlenu: część energii pochodzi z fermentacji mlekowej, a w mięśniach przybywa kwasu mlekowego.';
  if (w.doWatroby) return 'Po kilkudziesięciu minutach odpoczynku krew przeniosła kwas mlekowy z mięśni do wątroby.';
  if (tempo === 'odpoczynek' && w.kwas > 0) return 'Mięśnie odpoczywają i krew znów dostarcza dość tlenu. Kwas mlekowy wciąż jest w mięśniach.';
  return 'Krew dostarcza tyle tlenu, ile potrzebują mięśnie: energię daje oddychanie tlenowe.';
}

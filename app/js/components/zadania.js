// Punkt startowy wszystkich typów zadań. Każdy typ przygotowuje się z danych
// (np. wczytuje rysunek) i zwraca funkcję tworzącą zadanie w kontenerze.
// Wynik każdego zadania: { poprawne, wszystkie, karty: [{ karta, odRazu, poprawnie }] }.

import { wczytajTekst } from '../core/zasoby.js';
import { przygotujZadanie, elementyProcesu } from './podpisywanie-logika.js';
import { utworzPodpisywanie } from './podpisywanie.js';
import { utworzPrzyporzadkowanie } from './przyporzadkowanie.js';
import { utworzLuki } from './luki.js';
import { utworzKlasyfikacje } from './klasyfikacja.js';
import { utworzPrawdaFalsz } from './prawda-falsz.js';
import { utworzTabele } from './tabela.js';
import { utworzMiasto } from './miasto.js';
import { utworzDetektywa } from './detektyw.js';
import { utworzKonstruktor } from './konstruktor.js';
import { utworzWakuole } from './wakuola.js';
import { utworzSorter } from './sorter.js';
import { utworzDoswiadczenie } from './doswiadczenie.js';
import { utworzTabeleWartosci } from './tabela-wartosci.js';
import { utworzPrzepis } from './przepis.js';
import { utworzLaboratorium } from './laboratorium.js';
import { utworzProjektanta } from './projektant.js';
import { utworzSprint } from './sprint.js';
import { utworzDobe } from './doba.js';
import { utworzLancuch } from './lancuch.js';
import { utworzRozbiorke } from './rozbiorka.js';
import { utworzLas } from './las.js';
import { utworzSiatke } from './siatka.js';
import { utworzSlupki } from './slupki.js';
import { utworzDiagnoze } from './diagnoza.js';
import { utworzWykrywacz } from './wykrywacz.js';
import { obrazSceny } from './obrazy.js';

const TYPY = {
  async podpisywanie(zadanie, dane) {
    const schemat = dane.schematy.find((s) => s.id === zadanie.schemat);
    const svgTekst = await wczytajTekst(schemat.plik);
    let przygotowane;
    if (schemat.proces) {
      const proces = dane.procesy.find((p) => p.id === schemat.proces);
      const elementy = elementyProcesu(schemat, proces, dane.katalog, zadanie.dystraktory);
      przygotowane = przygotujZadanie({ zadanie, schemat, elementy, typKomorki: null });
    } else {
      const typKomorki = dane.typyKomorek.find((t) => t.id === schemat.typKomorki);
      przygotowane = przygotujZadanie({ zadanie, schemat, elementy: dane.elementy, typKomorki });
    }
    return (kontener, opcje) => utworzPodpisywanie(kontener, { przygotowane, svgTekst, opisSchematu: schemat.nazwa, ...opcje });
  },
  async przyporzadkowanie(zadanie, dane) {
    return (kontener, opcje) => utworzPrzyporzadkowanie(kontener, { zadanie, katalog: dane.katalog, ...opcje });
  },
  async luki(zadanie, dane) {
    return (kontener, opcje) => utworzLuki(kontener, { zadanie, katalog: dane.katalog, ...opcje });
  },
  async klasyfikacja(zadanie) {
    return (kontener, opcje) => utworzKlasyfikacje(kontener, { zadanie, obraz: zadanie.obraz ? obrazSceny(zadanie.obraz) : null, ...opcje });
  },
  async 'prawda-falsz'(zadanie) {
    return (kontener, opcje) => utworzPrawdaFalsz(kontener, { zadanie, ...opcje });
  },
  async wykrywacz(zadanie) {
    return (kontener, opcje) => utworzWykrywacz(kontener, { zadanie, ...opcje });
  },
  async tabela(zadanie, dane) {
    return (kontener, opcje) => utworzTabele(kontener, { zadanie, dane, ...opcje });
  },
  async miasto(zadanie, dane) {
    const schemat = dane.schematy.find((x) => x.id === dane.miasto.schemat);
    const svgTekst = await wczytajTekst(schemat.plik);
    return (kontener, opcje) => utworzMiasto(kontener, { zadanie, dane, miasto: dane.miasto, svgTekst, ...opcje });
  },
  async detektyw(zadanie, dane) {
    return (kontener, opcje) => utworzDetektywa(kontener, { zadanie, dane, wskazowki: dane.wskazowki, ...opcje });
  },
  async konstruktor(zadanie, dane) {
    const rysunki = new Map();
    for (const id of zadanie.plany) {
      const typ = dane.typyKomorek.find((t) => t.id === id);
      rysunki.set(id, await wczytajTekst(typ.rysunek));
    }
    return (kontener, opcje) => utworzKonstruktor(kontener, { zadanie, dane, czesci: dane.czesciKonstruktora, rysunki, ...opcje });
  },
  async wakuola(zadanie, dane) {
    return (kontener, opcje) => utworzWakuole(kontener, { zadanie, katalog: dane.katalog, elementy: dane.elementy, ...opcje });
  },
  async sorter(zadanie) {
    return (kontener, opcje) => utworzSorter(kontener, { zadanie, ...opcje });
  },
  async doswiadczenie(zadanie) {
    return (kontener, opcje) => utworzDoswiadczenie(kontener, { zadanie, ...opcje });
  },
  async laboratorium(zadanie) {
    return (kontener, opcje) => utworzLaboratorium(kontener, { zadanie, ...opcje });
  },
  async sprint(zadanie) {
    return (kontener, opcje) => utworzSprint(kontener, { zadanie, ...opcje });
  },
  async doba(zadanie) {
    return (kontener, opcje) => utworzDobe(kontener, { zadanie, ...opcje });
  },
  async siatka(zadanie) {
    return (kontener, opcje) => utworzSiatke(kontener, { zadanie, ...opcje });
  },
  async slupki(zadanie) {
    return (kontener, opcje) => utworzSlupki(kontener, { zadanie, ...opcje });
  },
  async diagnoza(zadanie, dane) {
    return (kontener, opcje) => utworzDiagnoze(kontener, { zadanie, dane, ...opcje });
  },
  async las(zadanie) {
    return (kontener, opcje) => utworzLas(kontener, { zadanie, ...opcje });
  },
  async rozbiorka(zadanie) {
    return (kontener, opcje) => utworzRozbiorke(kontener, { zadanie, ...opcje });
  },
  async lancuch(zadanie, dane) {
    return (kontener, opcje) => utworzLancuch(kontener, { zadanie, dane, ...opcje });
  },
  async projektant(zadanie) {
    return (kontener, opcje) => utworzProjektanta(kontener, { zadanie, ...opcje });
  },
  async przepis(zadanie, dane) {
    return (kontener, opcje) => utworzPrzepis(kontener, { zadanie, dane, ...opcje });
  },
  async porownanie(zadanie, dane) {
    return (kontener, opcje) => utworzTabeleWartosci(kontener, { zadanie, porownanie: dane.porownanie, katalog: dane.katalog, ...opcje });
  },
};

export function zarejestrujTyp(typ, przygotuj) {
  TYPY[typ] = przygotuj;
}

export async function zaladujZadanie(zadanie, dane) {
  const przygotuj = TYPY[zadanie.typ];
  if (!przygotuj) throw new Error(`Nieznany typ zadania: ${zadanie.typ}`);
  return przygotuj(zadanie, dane);
}

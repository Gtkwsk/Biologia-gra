// Walidator danych gry. Uruchomienie: node tools/validate-data.js
//
// Sprawdza:
// - unikalność identyfikatorów i kompletność pól,
// - odwołania do sekcji TRESCI.md,
// - brzmienie etykiet według słownika kanonicznego (TRESCI.md, sekcja 9),
// - teksty pod kątem terminów spoza TRESCI.md (tools/zakazane-terminy.js),
// - ciekawostki: dosłownie z TRESCI.md, sekcja 6,
// - zgodność typów komórek z tabelą porównawczą (TRESCI.md, sekcja 2.3),
// - rysunki SVG: czy zawierają wskazane elementy i nie zawierają elementów,
//   których dany typ komórki nie ma,
// - dystraktory: tylko elementy, których dany typ komórki nie ma,
// - zadania każdego typu: odwołania do kart atlasu, jednoznaczność (np. dystraktor w lukach
//   nie jest słowem z luki, sprawa detektywa rozstrzyga się wskazówkami), tabele tylko z ✓/✗,
// - światy: misje, bossowie (co najmniej trzy typy zadań), co najmniej trzy mechaniki,
// - organizmy: nazwy i kategorie z tabeli w TRESCI.md, sekcja 7,
// - procesy: zapisy słowne dosłownie z TRESCI.md, substraty i produkty zgodne z zapisem,
// - tabela porównawcza oddychania tlenowego i fermentacji zgodna z tabelą w TRESCI.md, sekcja 2.6,
// - próbny sprawdzian: punkty zakresu i suma punktów z TRESCI.md, sekcja 8, pule wariantów,
// - domowe laboratorium: kroki, bezpieczeństwo, karty atlasu i ciekawostki.

import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ZAKAZANE } from './zakazane-terminy.js';
import { katalogKart } from '../app/js/core/karty.js';
import { parsujLuki } from '../app/js/components/luki-logika.js';
import { pasujaceTypy, potrzebneWskazowki, wyklucza } from '../app/js/components/detektyw-logika.js';
import { regula } from '../app/js/components/konstruktor-logika.js';
import { ID_SCEN } from '../app/js/components/obrazy.js';
import { ID_SCEN_PROCESOW, KATEGORIE_SCEN } from '../app/js/components/sceny-procesow.js';
import { pasujeDoStrefy, rola } from '../app/js/components/przepis-logika.js';
import * as F from '../app/js/components/fotosynteza-logika.js';
import * as SP from '../app/js/components/sprint-logika.js';
import { PORY } from '../app/js/components/doba-logika.js';
import * as LN from '../app/js/components/lancuch-logika.js';
import * as LS from '../app/js/components/las-logika.js';
import { ID_SCEN_SKLADNIKOW } from '../app/js/components/sceny-skladnikow.js';
import { ID_RYSUNKOW } from '../app/js/components/rysunki.js';

const KORZEN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KATALOG_APP = path.join(KORZEN, 'app');

export const TYPY_ZADAN = [
  'podpisywanie',
  'prawda-falsz',
  'przyporzadkowanie',
  'luki',
  'klasyfikacja',
  'tabela',
  'porownanie',
  'doswiadczenie',
  'sorter',
  'miasto',
  'detektyw',
  'konstruktor',
  'wakuola',
  'przepis',
  'laboratorium',
  'projektant',
  'sprint',
  'doba',
  'lancuch',
  'las',
  'rozbiorka',
  'diagnoza',
  'siatka',
  'slupki',
];

// Typy zadań w formatach sprawdzianu (SPEC.md, sekcja 5); mechaniki to pozostałe.
const MECHANIKI = ['miasto', 'detektyw', 'konstruktor', 'wakuola', 'przepis', 'laboratorium', 'projektant', 'sprint', 'doba', 'lancuch', 'las', 'rozbiorka', 'diagnoza', 'siatka', 'slupki'];

const OBECNOSC = ['tak', 'nie', 'czasem'];

// Rodzaje kart w data/pojecia.js (grupy w atlasie). Organizmy mają własny plik.
const RODZAJE_POJEC = ['pojecie', 'ksztalt', 'proces', 'substancja', 'pierwiastek', 'zwiazek', 'sposob'];

// Pełne zdanie: wielka litera na początku, kropka na końcu.
const pelneZdanie = (t) => /^[A-ZĄĆĘŁŃÓŚŹŻ].*\.$/u.test(t ?? '');

// Elementy, których „nie ma” w tabeli TRESCI.md jest uproszczeniem: jako zdanie ogólne byłoby
// fałszywe (rzęski mają np. komórki nabłonka dróg oddechowych). Nie mogą być dystraktorami,
// wierszami tabel do wypełnienia ani częściami konstruktora (SPEC.md, sekcja 12).
const TYLKO_U_BAKTERII = ['rzeska'];

// Wiersze tabeli z TRESCI.md, sekcja 2.3, nazwane inaczej niż etykieta elementu.
const WIERSZE_TABELI = { mitochondria: 'mitochondrium', chloroplasty: 'chloroplast', wakuola: 'wakuola' };

// ---------- Odczyt TRESCI.md ----------

export function sekcjeTresci(tekst) {
  const sekcje = new Set();
  for (const linia of tekst.split('\n')) {
    const m = linia.match(/^#{2,3}\s+(\d+(?:\.\d+)*)\.?\s/);
    if (m) sekcje.add(m[1]);
  }
  return sekcje;
}

function trescSekcji(tekst, numer) {
  const linie = tekst.split('\n');
  const start = linie.findIndex((l) => new RegExp(`^#{2,3}\\s+${numer.replace('.', '\\.')}\\.?\\s`).test(l));
  if (start === -1) return [];
  const wynik = [];
  for (const linia of linie.slice(start + 1)) {
    if (/^#{1,3}\s/.test(linia)) break;
    wynik.push(linia);
  }
  return wynik;
}

export function terminyKanoniczne(tekst) {
  const linie = trescSekcji(tekst, '9').filter((l) => l.trim() && !l.startsWith('|'));
  return new Set(
    linie
      .join(' ')
      .split(';')
      .map((t) => t.trim().replace(/\.$/, ''))
      .filter(Boolean),
  );
}

function tabela(linie, naglowekZaczynaSie) {
  const start = linie.findIndex((l) => l.startsWith(naglowekZaczynaSie));
  if (start === -1) return null;
  const komorki = (l) =>
    l
      .split('|')
      .slice(1, -1)
      .map((k) => k.trim());
  const kolumny = komorki(linie[start]);
  const wiersze = [];
  for (const linia of linie.slice(start + 2)) {
    if (!linia.startsWith('|')) break;
    wiersze.push(komorki(linia));
  }
  return { kolumny, wiersze };
}

export function tabelaKomorek(tekst) {
  return tabela(trescSekcji(tekst, '2.3'), '| Element |');
}

export function tabelaProcesow(tekst) {
  return tabela(trescSekcji(tekst, '2.6'), '| Cecha |');
}

// Tekst TRESCI.md bez wyróżnień (**…**), do wyszukiwania zapisów słownych.
export function tekstBezWyroznien(tekst) {
  return tekst.replace(/\*\*/g, '');
}

export function ciekawostkiTresci(tekst) {
  return new Set(
    trescSekcji(tekst, '6')
      .filter((l) => l.startsWith('- '))
      .map((l) => l.slice(2).trim()),
  );
}

export function organizmyTresci(tekst) {
  const t = tabela(trescSekcji(tekst, '7'), '| Organizm |');
  if (!t) return { nazwy: new Set(), kategorie: new Set() };
  return {
    nazwy: new Set(t.wiersze.map((w) => w[0])),
    kategorie: new Set(t.wiersze.map((w) => w[1])),
    kategoriaNazwy: new Map(t.wiersze.map((w) => [w[0], w[1]])),
  };
}

// ---------- Pomocnicze ----------

function bezOgonkow(s) {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L');
}

function niepustyTekst(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function* teksty(obiekt, sciezka) {
  if (typeof obiekt === 'string') {
    yield [sciezka, obiekt];
  } else if (Array.isArray(obiekt)) {
    for (let i = 0; i < obiekt.length; i++) yield* teksty(obiekt[i], `${sciezka}[${i}]`);
  } else if (obiekt && typeof obiekt === 'object') {
    for (const [k, v] of Object.entries(obiekt)) yield* teksty(v, `${sciezka}.${k}`);
  }
}

function liczbaZdan(tekst) {
  return (tekst.match(/[.!?…](\s|$)/g) || []).length;
}

export function czyEtykietaKanoniczna(nazwa, terminy) {
  if (terminy.has(nazwa)) return true;
  const m = nazwa.match(/^(.+) \((.+)\)$/);
  return Boolean(m && terminy.has(m[1]) && terminy.has(m[2]));
}

function wartoscTabeli(komorka) {
  if (komorka.startsWith('✗')) return 'nie';
  if (/u niektórych|u części/.test(komorka)) return 'czasem';
  if (komorka.startsWith('✓') || komorka.length > 0) return 'tak';
  return null;
}

// ---------- Walidacja ----------

export function walidujDane(dane, kontekst) {
  const bledy = [];
  const blad = (gdzie, co) => bledy.push(`${gdzie}: ${co}`);
  const {
    swiaty = [],
    elementy = [],
    typyKomorek = [],
    schematy = [],
    zadania = [],
    pojecia = [],
    miasto = null,
    wskazowki = [],
    czesciKonstruktora = [],
    organizmy,
    procesy = [],
    porownanie = null,
    pokarm = null,
    sprawdzian = null,
    laboratorium = null,
  } = dane;
  const {
    sekcje,
    terminy,
    tabelaKomorek: tabelaTk,
    tabelaProcesow: tabelaPr = null,
    organizmyTresci: orgT,
    ciekawostki = new Set(),
    tekstTresci = '',
    svg = new Map(),
  } = kontekst;

  const unikalne = (lista, nazwa) => {
    const widziane = new Set();
    for (const o of lista) {
      if (o.id === undefined || o.id === null || o.id === '') blad(nazwa, 'obiekt bez id');
      else if (widziane.has(o.id)) blad(`${nazwa}[${o.id}]`, 'powtórzone id');
      widziane.add(o.id);
    }
  };
  const zrodlo = (gdzie, o) => {
    if (!niepustyTekst(o.zrodlo)) blad(gdzie, 'brak pola zrodlo (sekcja TRESCI.md)');
    else if (!sekcje.has(o.zrodlo)) blad(gdzie, `sekcja „${o.zrodlo}” nie istnieje w TRESCI.md`);
  };

  unikalne(swiaty, 'swiaty');
  unikalne(elementy, 'elementy');
  unikalne(typyKomorek, 'typyKomorek');
  unikalne(schematy, 'schematy');
  unikalne(zadania, 'zadania');
  unikalne(pojecia, 'pojecia');
  unikalne(wskazowki, 'wskazowki');

  const elementPoId = new Map(elementy.map((e) => [e.id, e]));
  const typPoId = new Map(typyKomorek.map((t) => [t.id, t]));
  const schematPoId = new Map(schematy.map((s) => [s.id, s]));
  const zadaniePoId = new Map(zadania.map((z) => [z.id, z]));
  const wskazowkaPoId = new Map(wskazowki.map((w) => [w.id, w]));
  const katalog = katalogKart({ elementy, typyKomorek, pojecia, organizmy: organizmy || [] });
  const zajete = new Set([...elementPoId.keys(), ...[...typPoId.keys()].map((t) => `komorka-${t}`)]);
  for (const p of pojecia) {
    if (zajete.has(p.id)) blad(`pojecia[${p.id}]`, 'id karty zajęte przez element albo typ komórki');
    zajete.add(p.id);
  }
  for (const o of organizmy || []) if (zajete.has(o.id)) blad(`organizmy[${o.id}]`, 'id karty zajęte przez inną kartę');
  const procesPoId = new Map(procesy.map((p) => [p.id, p]));
  const karta = (gdzie, id) => {
    if (id !== undefined && id !== null && !katalog.has(id)) blad(gdzie, `nieznana karta atlasu „${id}”`);
  };
  const ciekawostka = (gdzie, tekst) => {
    if (tekst !== undefined && !ciekawostki.has(tekst)) blad(gdzie, 'ciekawostka musi być dosłownie z TRESCI.md, sekcja 6');
  };

  // Światy
  const idSwiatow = swiaty.map((s) => s.id).sort((a, b) => a - b);
  if (idSwiatow.join(',') !== '1,2,3,4,5,6') blad('swiaty', 'wymagane są światy o id 1-6');
  const idMisji = new Set();
  for (const s of swiaty) {
    const gdzie = `swiaty[${s.id}]`;
    for (const pole of ['tytul', 'temat']) if (!niepustyTekst(s[pole])) blad(gdzie, `brak pola ${pole}`);
    zrodlo(gdzie, s);
    if (typeof s.gotowy !== 'boolean') blad(gdzie, 'pole gotowy musi być true albo false');
    for (const pole of ['wstep', 'coZbadasz', 'misje']) if (!Array.isArray(s[pole])) blad(gdzie, `pole ${pole} musi być listą`);
    if (!s.gotowy) continue;
    const zdania = liczbaZdan((s.wstep || []).join(' '));
    if (zdania < 2 || zdania > 4) blad(gdzie, `wstęp ma ${zdania} zdań, wymagane 2-4 (SPEC.md, sekcja 3.1)`);
    if (!s.misje?.length) blad(gdzie, 'gotowy świat musi mieć co najmniej jedną misję');
    for (const m of s.misje || []) {
      const gm = `${gdzie}.misje[${m.id}]`;
      if (!niepustyTekst(m.id)) blad(gdzie, 'misja bez id');
      else if (idMisji.has(m.id)) blad(gm, 'powtórzone id misji');
      idMisji.add(m.id);
      if (!niepustyTekst(m.nazwa)) blad(gm, 'brak nazwy');
      if (!m.zadania?.length) blad(gm, 'misja bez zadań');
      for (const idZ of m.zadania || []) {
        const z = zadaniePoId.get(idZ);
        if (!z) blad(gm, `zadanie „${idZ}” nie istnieje`);
        else if (z.swiat !== s.id) blad(gm, `zadanie „${idZ}” należy do świata ${z.swiat}`);
      }
    }
    ciekawostka(`${gdzie}.ciekawostka`, s.ciekawostka);
    // Przewodnik (SPEC.md, sekcja 4.4): uczony, o którym jest ciekawostka świata.
    if (s.przewodnik !== undefined) {
      const p = s.przewodnik;
      const gp = `${gdzie}.przewodnik`;
      if (!niepustyTekst(p?.imie) || !niepustyTekst(p?.kim)) blad(gp, 'przewodnik wymaga imienia i opisu (kim)');
      if (!ID_RYSUNKOW.includes(p?.rysunek)) blad(gp, `nie ma rysunku „${p?.rysunek}”`);
      const nazwisko = (p?.imie ?? '').split(' ').at(-1);
      if (!s.ciekawostka?.includes(nazwisko)) blad(gp, 'ciekawostka świata nie mówi o przewodniku');
    }
    const typyMisji = new Set((s.misje || []).flatMap((m) => (m.zadania || []).map((id) => zadaniePoId.get(id)?.typ)).filter(Boolean));
    if (typyMisji.size < 3) blad(gdzie, `misje mają ${typyMisji.size} typy zadań, wymagane co najmniej 3 (SPEC.md, sekcja 9)`);
    // Boss (SPEC.md, sekcje 4.3 i 9)
    const b = s.boss;
    if (!b) {
      blad(gdzie, 'gotowy świat musi mieć bossa');
      continue;
    }
    if (!niepustyTekst(b.nazwa)) blad(`${gdzie}.boss`, 'brak nazwy');
    if (!b.wyzwania?.length) blad(`${gdzie}.boss`, 'boss bez wyzwań');
    const typyBossa = new Set();
    (b.wyzwania || []).forEach((w, i) => {
      const gw = `${gdzie}.boss.wyzwania[${i}]`;
      if (!w.pula?.length) blad(gw, 'pusta pula zadań');
      for (const idZ of w.pula || []) {
        const z = zadaniePoId.get(idZ);
        if (!z) blad(gw, `zadanie „${idZ}” nie istnieje`);
        else if (z.swiat !== s.id) blad(gw, `zadanie „${idZ}” należy do świata ${z.swiat}`);
        else if (MECHANIKI.includes(z.typ)) blad(gw, `zadanie „${idZ}” nie jest w formacie sprawdzianu`);
        else typyBossa.add(z.typ);
      }
    });
    if (typyBossa.size < 3) blad(`${gdzie}.boss`, `boss ma ${typyBossa.size} typy zadań, wymagane co najmniej 3 (SPEC.md, sekcja 9)`);
  }

  // Elementy komórek
  for (const e of elementy) {
    const gdzie = `elementy[${e.id}]`;
    for (const pole of ['nazwa', 'opis', 'funkcja', 'brak', 'biernik']) if (!niepustyTekst(e[pole])) blad(gdzie, `brak pola ${pole}`);
    zrodlo(gdzie, e);
    ciekawostka(`${gdzie}.ciekawostka`, e.ciekawostka);
    if (niepustyTekst(e.nazwa) && !czyEtykietaKanoniczna(e.nazwa, terminy)) {
      blad(gdzie, `etykieta „${e.nazwa}” spoza słownika kanonicznego (TRESCI.md, sekcja 9)`);
    }
    for (const typ of Object.keys(e.wTypie || {})) {
      if (!typPoId.has(typ)) blad(gdzie, `wTypie: nieznany typ komórki „${typ}”`);
    }
  }

  // Typy komórek i zgodność z tabelą w TRESCI.md
  for (const t of typyKomorek) {
    const gdzie = `typyKomorek[${t.id}]`;
    if (!niepustyTekst(t.nazwa)) blad(gdzie, 'brak nazwy');
    zrodlo(gdzie, t);
    for (const [idE, w] of Object.entries(t.obecnosc || {})) {
      if (!elementPoId.has(idE)) blad(gdzie, `nieznany element „${idE}”`);
      if (!OBECNOSC.includes(w)) blad(gdzie, `obecność „${w}” dla „${idE}” spoza listy ${OBECNOSC.join(', ')}`);
    }
    for (const idE of Object.keys(t.zdania || {})) if (!elementPoId.has(idE)) blad(`${gdzie}.zdania`, `nieznany element „${idE}”`);
    ciekawostka(`${gdzie}.ciekawostka`, t.ciekawostka);
    if (t.rysunek) {
      const rys = svg.get(t.rysunek);
      if (rys === undefined) blad(gdzie, `plik „${t.rysunek}” nie istnieje`);
      else {
        for (const [idE, o] of Object.entries(t.obecnosc || {})) {
          const jest = rys.includes(`data-element="${idE}"`);
          if (o === 'tak' && !jest) blad(t.rysunek, `brak elementu „${idE}”, który ${t.nazwa} ma według TRESCI.md`);
        }
      }
    }
  }
  const sprawdzRysunek = (plik, rysunek, typ) => {
    if (/\sstyle\s*=/.test(rysunek)) blad(plik, 'atrybut style jest blokowany przez politykę CSP; użyj atrybutów fill, stroke itp.');
    if (/<script/i.test(rysunek)) blad(plik, 'rysunek nie może zawierać skryptów');
    for (const [, idE] of rysunek.matchAll(/data-element="([^"]+)"/g)) {
      if (!elementPoId.has(idE)) blad(plik, `nieznany element „${idE}”`);
      else if (typ && typ.obecnosc?.[idE] === 'nie') blad(plik, `${typ.nazwa} nie ma elementu „${idE}”, a rysunek go zawiera`);
    }
  };
  for (const t of typyKomorek) if (t.rysunek && svg.has(t.rysunek)) sprawdzRysunek(t.rysunek, svg.get(t.rysunek), t);

  // Pojęcia i kształty komórek (karty atlasu)
  const tekstMaly = tekstTresci.toLowerCase();
  for (const p of pojecia) {
    const gdzie = `pojecia[${p.id}]`;
    for (const pole of ['nazwa', 'opis', 'zdanie']) if (!niepustyTekst(p[pole])) blad(gdzie, `brak pola ${pole}`);
    if (!RODZAJE_POJEC.includes(p.rodzaj)) blad(gdzie, `rodzaj „${p.rodzaj}” spoza listy ${RODZAJE_POJEC.join(', ')}`);
    if (p.rodzaj === 'ksztalt' && !niepustyTekst(p.funkcja)) blad(gdzie, 'kształt komórki bez pola funkcja');
    if (!Number.isInteger(p.swiat)) blad(gdzie, 'swiat musi być liczbą');
    zrodlo(gdzie, p);
    ciekawostka(`${gdzie}.ciekawostka`, p.ciekawostka);
    if (niepustyTekst(p.nazwa) && !terminy.has(p.nazwa) && !tekstMaly.includes(p.nazwa.toLowerCase())) {
      blad(gdzie, `nazwa „${p.nazwa}” nie występuje w TRESCI.md`);
    }
  }
  if (!tabelaTk) {
    blad('TRESCI.md', 'nie znaleziono tabeli porównawczej komórek w sekcji 2.3');
  } else {
    const kolumnaTypu = tabelaTk.kolumny.slice(1).map((k) => bezOgonkow(k));
    for (const wiersz of tabelaTk.wiersze) {
      const etykieta = wiersz[0];
      const idE = WIERSZE_TABELI[etykieta] || elementy.find((e) => e.nazwa === etykieta)?.id;
      if (!idE) {
        blad('TRESCI.md, sekcja 2.3', `wiersz „${etykieta}” bez odpowiednika w elementach komórek`);
        continue;
      }
      kolumnaTypu.forEach((idT, i) => {
        const t = typPoId.get(idT);
        if (!t) return;
        const oczekiwana = wartoscTabeli(wiersz[i + 1]);
        const jest = t.obecnosc?.[idE];
        if (oczekiwana && jest !== oczekiwana) {
          blad(`typyKomorek[${idT}].obecnosc.${idE}`, `jest „${jest}”, a według TRESCI.md powinno być „${oczekiwana}”`);
        }
      });
    }
    for (const t of typyKomorek) {
      if (!kolumnaTypu.includes(t.id)) blad(`typyKomorek[${t.id}]`, 'brak kolumny tego typu w tabeli TRESCI.md');
    }
  }

  // Schematy procesów: punkty to uczestnicy procesu albo miejsce w komórce
  const uczestnicyProcesu = (pr) => new Set([...(pr.substraty || []), ...(pr.warunki || []), ...(pr.produkty || []), ...(pr.wKomorce || [])]);
  for (const s of schematy.filter((x) => x.proces)) {
    const gdzie = `schematy[${s.id}]`;
    const pr = procesPoId.get(s.proces);
    if (!pr) {
      blad(gdzie, `nieznany proces „${s.proces}”`);
      continue;
    }
    const rysunek = svg.get(s.plik);
    if (rysunek === undefined) blad(gdzie, `plik „${s.plik}” nie istnieje`);
    else {
      if (/\sstyle\s*=/.test(rysunek)) blad(s.plik, 'atrybut style jest blokowany przez politykę CSP; użyj atrybutów fill, stroke itp.');
      if (/<script/i.test(rysunek)) blad(s.plik, 'rysunek nie może zawierać skryptów');
    }
    const uczestnicy = uczestnicyProcesu(pr);
    const idPunktow = new Set();
    for (const p of s.punkty || []) {
      const gp = `${gdzie}.punkty[${p.id}]`;
      if (idPunktow.has(p.id)) blad(gp, 'powtórzone id punktu');
      idPunktow.add(p.id);
      karta(gp, p.element);
      if (!uczestnicy.has(p.element)) blad(gp, `„${p.element}” nie bierze udziału w procesie „${pr.id}” według data/procesy.js`);
      if (!niepustyTekst(p.opis)) blad(gp, 'brak opisu punktu');
      if (rysunek !== undefined && !rysunek.includes(`data-element="${p.element}"`)) blad(gp, `rysunek nie zawiera elementu „${p.element}” (data-element)`);
      for (const pole of ['cel', 'znacznik']) {
        const [x, y] = p[pole] || [];
        if (!(x >= 0 && x <= s.szerokosc && y >= 0 && y <= s.wysokosc)) blad(gp, `${pole} poza obszarem rysunku`);
      }
    }
  }

  // Schematy komórek
  for (const s of schematy.filter((x) => !x.proces)) {
    const gdzie = `schematy[${s.id}]`;
    const typ = typPoId.get(s.typKomorki);
    if (!typ) blad(gdzie, `nieznany typ komórki „${s.typKomorki}”`);
    if (!niepustyTekst(s.plik)) {
      blad(gdzie, 'brak pliku rysunku');
      continue;
    }
    const rysunek = svg.get(s.plik);
    if (rysunek === undefined) blad(gdzie, `plik „${s.plik}” nie istnieje`);
    if (rysunek !== undefined && typ?.rysunek !== s.plik) sprawdzRysunek(s.plik, rysunek, typ);
    const idPunktow = new Set();
    for (const p of s.punkty || []) {
      const gp = `${gdzie}.punkty[${p.id}]`;
      if (idPunktow.has(p.id)) blad(gp, 'powtórzone id punktu');
      idPunktow.add(p.id);
      if (!elementPoId.has(p.element)) blad(gp, `nieznany element „${p.element}”`);
      else if (typ && !['tak', 'czasem'].includes(typ.obecnosc?.[p.element])) {
        blad(gp, `element „${p.element}” nie występuje w typie „${typ.id}” według TRESCI.md`);
      }
      if (rysunek !== undefined && !rysunek.includes(`data-element="${p.element}"`)) {
        blad(gp, `rysunek nie zawiera elementu „${p.element}” (data-element)`);
      }
      for (const pole of ['cel', 'znacznik']) {
        const [x, y] = p[pole] || [];
        if (!(x >= 0 && x <= s.szerokosc && y >= 0 && y <= s.wysokosc)) blad(gp, `${pole} poza obszarem rysunku`);
      }
    }
  }

  // Zadania: pola wspólne i reguły każdego typu
  const tekstyRowne = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
  const WALIDATORY = {
    podpisywanie(z, gdzie) {
      const s = schematPoId.get(z.schemat);
      if (!s) {
        blad(gdzie, `nieznany schemat „${z.schemat}”`);
        return;
      }
      if (s.proces) {
        const pr = procesPoId.get(s.proces);
        const punktyS = new Map((s.punkty || []).map((p) => [p.id, p]));
        if (!z.punkty?.length) blad(gdzie, 'brak punktów do podpisania');
        const poprawne = new Set();
        for (const idP of z.punkty || []) {
          if (!punktyS.has(idP)) blad(gdzie, `punkt „${idP}” nie istnieje w schemacie „${s.id}”`);
          else poprawne.add(punktyS.get(idP).element);
        }
        if (poprawne.size !== (z.punkty || []).length) blad(gdzie, 'dwa punkty z tą samą etykietą');
        const uczestnicy = pr ? uczestnicyProcesu(pr) : new Set();
        for (const d of z.dystraktory || []) {
          const id = typeof d === 'string' ? d : d?.karta;
          karta(gdzie, id);
          if (typeof d !== 'string' && !niepustyTekst(d?.wyjasnienie)) blad(gdzie, `dystraktor „${id}” bez wyjaśnienia`);
          if (poprawne.has(id)) blad(gdzie, `dystraktor „${id}” jest jednocześnie poprawną odpowiedzią`);
          else if (uczestnicy.has(id)) blad(gdzie, `dystraktor „${id}” bierze udział w procesie „${s.proces}”`);
        }
        return;
      }
      const typ = typPoId.get(s.typKomorki);
      const punktyS = new Map((s.punkty || []).map((p) => [p.id, p]));
      if (!z.punkty?.length) blad(gdzie, 'brak punktów do podpisania');
      if (new Set(z.punkty).size !== (z.punkty || []).length) blad(gdzie, 'powtórzony punkt');
      const poprawne = new Set();
      for (const idP of z.punkty || []) {
        const p = punktyS.get(idP);
        if (!p) blad(gdzie, `punkt „${idP}” nie istnieje w schemacie „${s.id}”`);
        else poprawne.add(p.element);
      }
      if (poprawne.size !== (z.punkty || []).length) blad(gdzie, 'dwa punkty z tym samym elementem: etykiety muszą być jednoznaczne');
      for (const idD of z.dystraktory || []) {
        if (TYLKO_U_BAKTERII.includes(idD)) blad(gdzie, `„${idD}” nie może być dystraktorem (SPEC.md, sekcja 12)`);
        if (!elementPoId.has(idD)) blad(gdzie, `nieznany dystraktor „${idD}”`);
        else if (poprawne.has(idD)) blad(gdzie, `dystraktor „${idD}” jest jednocześnie poprawną odpowiedzią`);
        else if (typ && typ.obecnosc?.[idD] !== 'nie') {
          blad(gdzie, `dystraktor „${idD}”: według TRESCI.md ${typ.nazwa} nie wyklucza tego elementu`);
        }
      }
    },

    przyporzadkowanie(z, gdzie) {
      const tryb = z.etykiety ?? 'nazwy';
      if (!['nazwy', 'opisy'].includes(tryb)) blad(gdzie, `etykiety: „${tryb}” spoza listy nazwy, opisy`);
      if (z.wyjasnij !== undefined && z.wyjasnij !== 'wyglad') blad(gdzie, `wyjasnij: „${z.wyjasnij}” spoza listy wyglad`);
      if (!(z.pary?.length >= 2)) blad(gdzie, 'co najmniej dwie pary');
      const karty = new Set();
      for (const p of z.pary || []) {
        karta(gdzie, p.karta);
        if (karty.has(p.karta)) blad(gdzie, `karta „${p.karta}” w dwóch parach`);
        karty.add(p.karta);
        if (!niepustyTekst(p.opis)) blad(gdzie, `para „${p.karta}” bez opisu`);
      }
      const opisy = new Set((z.pary || []).map((p) => p.opis));
      if (opisy.size !== (z.pary || []).length) blad(gdzie, 'dwie pary z tym samym opisem');
      for (const d of z.dystraktory || []) {
        if (tryb === 'nazwy') {
          karta(gdzie, d);
          if (karty.has(d)) blad(gdzie, `dystraktor „${d}” jest jednocześnie w parze`);
        } else if (!niepustyTekst(d?.tekst) || !niepustyTekst(d?.wyjasnienie)) {
          blad(gdzie, 'dystraktor w trybie opisów wymaga pól tekst i wyjasnienie');
        } else if (opisy.has(d.tekst)) blad(gdzie, `dystraktor „${d.tekst}” jest jednocześnie opisem pary`);
      }
    },

    luki(z, gdzie) {
      const luki = parsujLuki(z.tekst ?? '').filter((f) => f.typ === 'luka');
      if (!luki.length) blad(gdzie, 'tekst bez luk');
      for (const l of luki) {
        if (!niepustyTekst(l.slowo)) blad(gdzie, `luka ${l.numer} bez słowa`);
        if (l.karta) karta(gdzie, l.karta);
      }
      const slowa = luki.map((l) => l.slowo);
      const widziane = new Set();
      for (const d of z.dystraktory || []) {
        const tekst = typeof d === 'string' ? d : d?.tekst;
        if (!niepustyTekst(tekst)) {
          blad(gdzie, 'dystraktor bez tekstu');
          continue;
        }
        if (slowa.some((sl) => tekstyRowne(sl, tekst))) blad(gdzie, `dystraktor „${tekst}” jest też słowem z luki`);
        if (widziane.has(tekst)) blad(gdzie, `powtórzony dystraktor „${tekst}”`);
        widziane.add(tekst);
      }
    },

    klasyfikacja(z, gdzie) {
      const kat = new Set();
      for (const k of z.kategorie || []) {
        if (!niepustyTekst(k.id) || !niepustyTekst(k.nazwa)) blad(gdzie, 'kategoria bez id albo nazwy');
        if (kat.has(k.id)) blad(gdzie, `powtórzona kategoria „${k.id}”`);
        kat.add(k.id);
        if (k.karta) karta(gdzie, k.karta);
      }
      if (kat.size < 2) blad(gdzie, 'co najmniej dwie kategorie');
      if (!(z.elementy?.length >= 2)) blad(gdzie, 'co najmniej dwa elementy do przyporządkowania');
      const teksty = new Set();
      for (const e of z.elementy || []) {
        if (!niepustyTekst(e.tekst)) blad(gdzie, 'element bez tekstu');
        if (teksty.has(e.tekst)) blad(gdzie, `powtórzony element „${e.tekst}”`);
        teksty.add(e.tekst);
        if (!kat.has(e.kategoria)) blad(gdzie, `element „${e.tekst}”: nieznana kategoria „${e.kategoria}”`);
        if (!niepustyTekst(e.wyjasnienie)) blad(gdzie, `element „${e.tekst}” bez wyjaśnienia`);
        if (e.karta) karta(gdzie, e.karta);
      }
      if (z.obraz !== undefined && !ID_SCEN.includes(z.obraz)) blad(gdzie, `nieznana scena „${z.obraz}”`);
    },

    'prawda-falsz'(z, gdzie) {
      if (!z.zdania?.length) blad(gdzie, 'brak zdań');
      (z.zdania || []).forEach((zd, i) => {
        const gz = `${gdzie}.zdania[${i}]`;
        if (!niepustyTekst(zd.tekst)) blad(gz, 'brak tekstu');
        if (typeof zd.prawda !== 'boolean') blad(gz, 'pole prawda musi być true albo false');
        if (!niepustyTekst(zd.wyjasnienie)) blad(gz, 'brak wyjaśnienia');
        if (zd.karta) karta(gz, zd.karta);
        if (zd.prawda !== false) return;
        if (zd.blad !== undefined) {
          if (!zd.tekst?.includes(zd.blad)) blad(gz, 'błędny fragment nie występuje w tekście');
          if (!zd.poprawki?.includes(zd.poprawka)) blad(gz, 'poprawka musi być jedną z opcji');
          if (new Set(zd.poprawki).size !== (zd.poprawki || []).length) blad(gz, 'powtórzona opcja poprawki');
        } else {
          if (!niepustyTekst(zd.poprawne)) blad(gz, 'zdanie fałszywe wymaga pola poprawne (albo blad)');
          if (!zd.bledne?.length) blad(gz, 'zdanie fałszywe wymaga co najmniej jednej błędnej wersji');
          const wersje = [zd.poprawne, ...(zd.bledne || [])];
          if (new Set(wersje).size !== wersje.length) blad(gz, 'powtórzona wersja zdania');
          if (wersje.includes(zd.tekst)) blad(gz, 'wersja do wyboru powtarza zdanie fałszywe');
        }
      });
    },

    tabela(z, gdzie) {
      if (z.procesy) {
        if (!(z.procesy.length >= 2) || !(z.substancje?.length >= 2)) blad(gdzie, 'tabela procesów: co najmniej dwa procesy i dwie substancje');
        for (const id of z.procesy) if (!procesPoId.has(id)) blad(gdzie, `nieznany proces „${id}”`);
        for (const id of z.substancje || []) karta(gdzie, id);
        if (new Set(z.substancje).size !== (z.substancje || []).length) blad(gdzie, 'powtórzona substancja');
        return;
      }
      if (!z.wiersze?.length || !z.kolumny?.length) blad(gdzie, 'tabela bez wierszy albo kolumn');
      for (const w of z.wiersze || []) {
        if (!elementPoId.has(w)) {
          blad(gdzie, `nieznany element „${w}”`);
          continue;
        }
        if (TYLKO_U_BAKTERII.includes(w)) blad(gdzie, `„${w}” nie może być wierszem tabeli (SPEC.md, sekcja 12)`);
        for (const k of z.kolumny || []) {
          const t = typPoId.get(k);
          if (!t) {
            blad(gdzie, `nieznany typ komórki „${k}”`);
            continue;
          }
          const o = t.obecnosc[w];
          if (o !== 'tak' && o !== 'nie') blad(gdzie, `${t.nazwa} / ${w}: w tabeli tylko ✓ albo ✗, a według danych jest „${o ?? 'brak'}”`);
        }
      }
    },

    porownanie(z, gdzie) {
      if (!porownanie) {
        blad(gdzie, 'brak danych tabeli porównawczej (data/porownanie.js)');
        return;
      }
      const cechy = new Map((porownanie.cechy || []).map((c) => [c.id, c]));
      if (!(z.cechy?.length >= 2)) blad(gdzie, 'co najmniej dwie cechy');
      if (new Set(z.cechy).size !== (z.cechy || []).length) blad(gdzie, 'powtórzona cecha');
      for (const id of z.cechy || []) if (!cechy.has(id)) blad(gdzie, `nieznana cecha „${id}”`);
      const etykiety = new Set((porownanie.cechy || []).flatMap((c) => (porownanie.kolumny || []).flatMap((k) => [c.wartosci?.[k], c.etykiety?.[k]])).filter(Boolean));
      for (const d of z.dystraktory || []) {
        if (!niepustyTekst(d?.tekst) || !niepustyTekst(d?.wyjasnienie)) blad(gdzie, 'dystraktor wymaga pól tekst i wyjasnienie');
        else if (etykiety.has(d.tekst)) blad(gdzie, `dystraktor „${d.tekst}” jest wartością z tabeli`);
      }
    },

    sorter(z, gdzie) {
      const kat = new Set();
      if (!(z.kategorie?.length >= 2 && z.kategorie.length <= 3)) blad(gdzie, 'sorter ma 2 albo 3 kategorie');
      for (const k of z.kategorie || []) {
        if (!niepustyTekst(k.id) || !niepustyTekst(k.nazwa)) blad(gdzie, 'kategoria bez id albo nazwy');
        if (kat.has(k.id)) blad(gdzie, `powtórzona kategoria „${k.id}”`);
        kat.add(k.id);
        if (k.karta) karta(gdzie, k.karta);
        if (k.ikona !== undefined && !ID_RYSUNKOW.includes(k.ikona)) blad(gdzie, `kategoria „${k.id}”: nie ma rysunku „${k.ikona}”`);
        if (!k.skrot && !k.karta && !k.ikona) blad(gdzie, `kategoria „${k.id}” potrzebuje skrótu, karty albo ikony (rysunek na przycisku)`);
      }
      if (!(z.zdania?.length >= 4)) blad(gdzie, 'co najmniej cztery zdania');
      const teksty = new Set();
      const uzyte = new Set();
      for (const zd of z.zdania || []) {
        if (!niepustyTekst(zd.tekst)) blad(gdzie, 'zdanie bez tekstu');
        if (teksty.has(zd.tekst)) blad(gdzie, `powtórzone zdanie „${zd.tekst}”`);
        teksty.add(zd.tekst);
        if (!kat.has(zd.kategoria)) blad(gdzie, `zdanie „${zd.tekst}”: nieznana kategoria „${zd.kategoria}”`);
        uzyte.add(zd.kategoria);
        if (!niepustyTekst(zd.wyjasnienie)) blad(gdzie, `zdanie „${zd.tekst}” bez wyjaśnienia`);
        if (zd.karta) karta(gdzie, zd.karta);
      }
      for (const k of kat) if (!uzyte.has(k)) blad(gdzie, `kategoria „${k}” bez żadnego zdania`);
      if (z.scena !== undefined) {
        if (!ID_SCEN_PROCESOW.includes(z.scena)) blad(gdzie, `nieznana scena „${z.scena}”`);
        else if (KATEGORIE_SCEN[z.scena]) {
          for (const k of kat) if (!KATEGORIE_SCEN[z.scena].includes(k)) blad(gdzie, `scena „${z.scena}” nie ma części dla kategorii „${k}”`);
        }
      }
    },

    doswiadczenie(z, gdzie) {
      if (!niepustyTekst(z.opis)) blad(gdzie, 'brak opisu doświadczenia');
      if (z.scena !== undefined && !ID_SCEN_PROCESOW.includes(z.scena)) blad(gdzie, `nieznana scena „${z.scena}”`);
      ciekawostka(`${gdzie}.ciekawostka`, z.ciekawostka);
      if (z.wyniki) {
        const n = z.wyniki.kolumny?.length ?? 0;
        if (n < 2) blad(gdzie, 'tabela wyników: co najmniej dwie kolumny');
        for (const w of z.wyniki.wiersze || []) if (w.length !== n) blad(gdzie, 'tabela wyników: wiersz o innej liczbie komórek niż kolumn');
      }
      if (!z.kroki?.length) blad(gdzie, 'brak pytań');
      (z.kroki || []).forEach((k, i) => {
        const gk = `${gdzie}.kroki[${i}]`;
        if (!niepustyTekst(k.pytanie) || !niepustyTekst(k.wyjasnienie)) blad(gk, 'brak pytania albo wyjaśnienia');
        if (!(k.opcje?.length >= 2)) blad(gk, 'co najmniej dwie opcje');
        const poprawne = (k.opcje || []).filter((o) => o.poprawna === true).length;
        if (poprawne !== 1) blad(gk, `opcji poprawnych jest ${poprawne}, a musi być dokładnie jedna`);
        const teksty = (k.opcje || []).map((o) => o.tekst);
        if (new Set(teksty).size !== teksty.length) blad(gk, 'powtórzona opcja');
        for (const o of k.opcje || []) {
          if (!niepustyTekst(o.tekst)) blad(gk, 'opcja bez tekstu');
          if (o.poprawna !== true && !niepustyTekst(o.wyjasnienie)) blad(gk, `opcja „${o.tekst}” bez wyjaśnienia, dlaczego jest błędna`);
        }
        if (k.kolejnosc !== undefined && k.kolejnosc !== 'stala') blad(gk, `kolejnosc: „${k.kolejnosc}” spoza listy stala`);
        if (k.karta) karta(gk, k.karta);
      });
    },

    przepis(z, gdzie) {
      const procesyZ = (z.procesy || []).map((id) => procesPoId.get(id));
      if (!(procesyZ.length === 1 || procesyZ.length === 2)) blad(gdzie, 'przepis ma jeden proces albo dwa (lustro)');
      if (procesyZ.some((p) => !p)) {
        blad(gdzie, 'nieznany proces');
        return;
      }
      if ((z.garnki || []).length !== procesyZ.length) blad(gdzie, 'każdy proces potrzebuje garnka (rysunku)');
      for (const g of z.garnki || []) {
        karta(gdzie, g.karta);
        if (!niepustyTekst(g.podpis)) blad(gdzie, 'garnek bez podpisu');
      }
      const strefy = procesyZ.length === 2 ? ['wejscie-lewe', 'gora', 'dol', 'wyjscie-prawe'] : ['wejscie', 'warunek', 'wyjscie'];
      if (!['pole', 'strefa', undefined].includes(z.dopasowanie)) blad(gdzie, `dopasowanie „${z.dopasowanie}” spoza listy pole, strefa`);
      const idPol = new Set();
      const substancje = [];
      for (const p of z.pola || []) {
        const gp = `${gdzie}.pola[${p.id}]`;
        if (idPol.has(p.id)) blad(gp, 'powtórzone id pola');
        idPol.add(p.id);
        karta(gp, p.substancja);
        substancje.push(p.substancja);
        if (!strefy.includes(p.strefa)) blad(gp, `strefa „${p.strefa}” spoza listy ${strefy.join(', ')}`);
        else if (!pasujeDoStrefy(p.strefa, p.substancja, procesyZ)) blad(gp, `„${p.substancja}” nie pasuje do strefy „${p.strefa}” według data/procesy.js`);
        if ((z.dopasowanie ?? 'pole') === 'pole' && procesyZ.length === 1 && !niepustyTekst(p.podpis)) blad(gp, 'pole bez podpisu (drogi substancji)');
      }
      if (new Set(substancje).size !== substancje.length) blad(gdzie, 'powtórzona substancja w polach');
      // Przepis musi być kompletny: wszystkie substraty i produkty z zapisu słownego.
      const zamien = (pr, id) => pr.rownowazne?.[id] ?? id;
      for (const pr of procesyZ) {
        const obecne = new Set(substancje.map((id) => zamien(pr, id)));
        for (const id of [...pr.substraty, ...pr.produkty]) {
          if (!obecne.has(id) && !(procesyZ.length === 2 && pr === procesyZ[0] && substancje.some((x) => pr.rownowazne?.[x] === id))) {
            blad(gdzie, `przepis bez „${id}” (${pr.nazwa})`);
          }
        }
      }
      for (const d of z.dystraktory || []) {
        karta(gdzie, d?.karta);
        if (!niepustyTekst(d?.wyjasnienie)) blad(gdzie, `dystraktor „${d?.karta}” bez wyjaśnienia`);
        if (procesyZ.some((pr) => rola(pr, d?.karta))) blad(gdzie, `dystraktor „${d?.karta}” bierze udział w procesie`);
      }
      if (z.scena) {
        if (!ID_SCEN_PROCESOW.includes(z.scena.id)) blad(gdzie, `nieznana scena „${z.scena.id}”`);
        if (!substancje.includes(z.scena.substancja)) blad(gdzie, `scena: substancji „${z.scena.substancja}” nie ma w przepisie`);
      }
      if (z.wyjasnienia !== undefined) {
        if (procesyZ.length !== 2) blad(gdzie, 'wyjasnienia substancji są tylko w lustrze');
        for (const [id, t] of Object.entries(z.wyjasnienia)) {
          if (!substancje.includes(id)) blad(gdzie, `wyjasnienia: substancji „${id}” nie ma w przepisie`);
          if (!pelneZdanie(t)) blad(gdzie, `wyjasnienia[${id}]: potrzebne pełne zdanie`);
        }
      }
      ciekawostka(`${gdzie}.ciekawostka`, z.ciekawostka);
    },

    laboratorium(z, gdzie) {
      if (!['badanie', 'ogniwo'].includes(z.tryb)) blad(gdzie, `tryb „${z.tryb}” spoza listy badanie, ogniwo`);
      if (!['moczarka', 'szklarnia'].includes(z.roslina)) blad(gdzie, `roslina „${z.roslina}” spoza listy moczarka, szklarnia`);
      const potrzebne = F.CZYNNIKI.map((c) => c.id).filter((id) => !(z.roslina === 'moczarka' && id === 'woda'));
      const sprawdzUstawienia = (u, g) => {
        for (const id of Object.keys(u || {})) {
          if (!F.CZYNNIK[id]) blad(g, `nieznany czynnik „${id}”`);
          else if (z.roslina === 'moczarka' && id === 'woda') blad(g, 'moczarka żyje w wodzie: poziom wody jest stały');
        }
        for (const id of potrzebne) {
          const v = u?.[id];
          if (!Number.isInteger(v) || v < 0 || v >= F.CZYNNIK[id].poziomy.length) blad(g, `czynnik „${id}”: poziom spoza zakresu`);
        }
      };
      if (z.tryb === 'badanie') {
        sprawdzUstawienia(z.start, `${gdzie}.start`);
        if (!z.kroki?.length) blad(gdzie, 'brak kroków');
        let u = { ...z.start };
        (z.kroki || []).forEach((k, i) => {
          const gk = `${gdzie}.kroki[${i}]`;
          if (!potrzebne.includes(k.czynnik)) {
            blad(gk, `czynnik „${k.czynnik}” niedostępny dla tej rośliny`);
            return;
          }
          if (!(k.poziom >= 0 && k.poziom < F.CZYNNIK[k.czynnik].poziomy.length)) blad(gk, 'poziom spoza zakresu');
          if (u[k.czynnik] === k.poziom) blad(gk, 'krok niczego nie zmienia');
          // Przewidywanie ma wynikać wprost z TRESCI.md, sekcja 2.4 (niedobór i nadmiar zmniejszają
          // intensywność), więc wynik kroku nie może zależeć od innego czynnika, który hamuje bardziej.
          else if (F.skutek(u, k.czynnik, k.poziom) === 'bez-zmian') blad(gk, 'krok nie zmienia wyniku, bo inny czynnik hamuje bardziej: przewidywanie nie wynika wprost z TRESCI.md');
          u = { ...u, [k.czynnik]: k.poziom };
        });
        if (z.cel !== undefined && typeof z.cel !== 'boolean') blad(gdzie, 'cel musi być true albo false');
      }
      if (z.tryb === 'ogniwo') {
        if (!z.przypadki?.length) blad(gdzie, 'brak przypadków');
        (z.przypadki || []).forEach((p, i) => {
          const gp = `${gdzie}.przypadki[${i}]`;
          if (!niepustyTekst(p.opis)) blad(gp, 'brak opisu');
          sprawdzUstawienia(p.ustawienia, gp);
          const n = F.najslabsze(p.ustawienia || {});
          if (n.length !== 1) blad(gp, `najsłabsze ogniwo musi być jedno, a jest: ${n.join(', ') || 'żadne'}`);
        });
      }
    },

    projektant(z, gdzie) {
      if (!niepustyTekst(z.pytanie)) blad(gdzie, 'brak problemu badawczego (pytanie)');
      const ids = (z.czynniki || []).map((c) => c.id);
      if (!ids.includes(z.badany)) blad(gdzie, `badany czynnik „${z.badany}” nie jest wśród czynników do wyboru`);
      for (const c of z.czynniki || []) {
        if (!F.CZYNNIK[c.id] || c.id === 'woda') blad(gdzie, `czynnik „${c.id}” niedostępny (moczarka żyje w wodzie)`);
        if (!(c.opcje?.length >= 2)) blad(gdzie, `czynnik „${c.id}”: co najmniej dwie opcje`);
        for (const o of c.opcje || []) {
          if (!niepustyTekst(o.id) || !niepustyTekst(o.nazwa)) blad(gdzie, `czynnik „${c.id}”: opcja bez id albo nazwy`);
          if (!(o.poziom >= 0 && o.poziom < (F.CZYNNIK[c.id]?.poziomy.length ?? 0))) blad(gdzie, `czynnik „${c.id}”: poziom opcji „${o.id}” spoza zakresu`);
        }
      }
      for (const p of ['A', 'B']) {
        for (const c of z.czynniki || []) if (!c.opcje?.some((o) => o.id === z.start?.[p]?.[c.id])) blad(gdzie, `start.${p}: brak opcji dla czynnika „${c.id}”`);
      }
      if (z.start && F.ocenPlan(z.start.A, z.start.B, z.badany).dobry) blad(gdzie, 'plan początkowy nie może być od razu dobry');
      // Każdy dobry plan musi dać różne wyniki prób (inaczej wniosek nie wynika z doświadczenia).
      const kombinacje = (z.czynniki || []).reduce((acc, c) => acc.flatMap((k) => (c.opcje || []).map((o) => ({ ...k, [c.id]: o }))), [{}]);
      const poziomy = (k) => ({ swiatlo: 3, dwutlenek: 2, temperatura: 2, sole: 2, ...Object.fromEntries(Object.entries(k).map(([id, o]) => [id, o.poziom])) });
      for (const a of kombinacje) {
        for (const b of kombinacje) {
          const rozne = Object.keys(a).filter((id) => a[id].id !== b[id].id);
          if (rozne.length === 1 && rozne[0] === z.badany && F.pecherzyki(poziomy(a)) === F.pecherzyki(poziomy(b))) {
            blad(gdzie, `dobry plan (${Object.values(a).map((o) => o.id).join(', ')} / ${Object.values(b).map((o) => o.id).join(', ')}) daje taki sam wynik obu prób`);
          }
        }
      }
      WALIDATORY.doswiadczenie({ opis: z.pytanie, kroki: z.pytania }, gdzie);
    },

    sprint(z, gdzie) {
      if (!z.etapy?.length) {
        blad(gdzie, 'brak etapów biegu');
        return;
      }
      let stan = SP.nowyBieg();
      let niedobor = false;
      z.etapy.forEach((e, i) => {
        const ge = `${gdzie}.etapy[${i}]`;
        if (!SP.TEMPA[e.tempo]) {
          blad(ge, `tempo „${e.tempo}” spoza listy ${Object.keys(SP.TEMPA).join(', ')}`);
          return;
        }
        if (e.czas !== undefined && !SP.CZASY.includes(e.czas)) blad(ge, `czas „${e.czas}” spoza listy ${SP.CZASY.join(', ')}`);
        if (e.czas === 'kilkadziesiat-minut' && e.tempo !== 'odpoczynek') blad(ge, 'kilkadziesiąt minut może trwać tylko odpoczynek');
        if (!niepustyTekst(e.polecenie) || !niepustyTekst(e.akcja)) blad(ge, 'etap wymaga polecenia trenera i napisu na przycisku (akcja)');
        if (!e.pytania?.length) blad(ge, 'etap bez pytań');
        else WALIDATORY.doswiadczenie({ opis: e.polecenie, kroki: e.pytania }, ge);
        const w = SP.etap(stan, e.tempo, e.czas);
        niedobor ||= w.niedoborTlenu;
        stan = { kwas: w.kwas, etap: w.etap };
      });
      // Bieg ma pokazać całą historię z TRESCI.md, sekcja 2.6: fermentację mlekową przy niedoborze
      // tlenu i przeniesienie kwasu mlekowego do wątroby w czasie odpoczynku.
      if (!niedobor) blad(gdzie, 'żaden etap nie pokazuje niedoboru tlenu (fermentacji mlekowej)');
      else if (stan.kwas !== 0) blad(gdzie, 'na końcu biegu kwas mlekowy zostaje w mięśniach: brak odpoczynku przez kilkadziesiąt minut');
    },

    siatka(z, gdzie) {
      const idW = new Set((z.wiersze || []).map((w) => w.id));
      const idK = new Set((z.kolumny || []).map((k) => k.id));
      if (idW.size < 2 || idW.size !== (z.wiersze || []).length) blad(gdzie, 'co najmniej dwa wiersze o różnych id');
      if (idK.size < 2 || idK.size !== (z.kolumny || []).length) blad(gdzie, 'co najmniej dwie kolumny o różnych id');
      for (const w of z.wiersze || []) {
        if (!niepustyTekst(w.nazwa)) blad(gdzie, `wiersz „${w.id}” bez nazwy`);
        if (w.karta) karta(gdzie, w.karta);
      }
      for (const k of z.kolumny || []) if (!niepustyTekst(k.nazwa)) blad(gdzie, `kolumna „${k.id}” bez nazwy`);
      if (!(z.elementy?.length >= 4)) blad(gdzie, 'co najmniej cztery przykłady');
      const teksty = new Set();
      for (const el of z.elementy || []) {
        if (!niepustyTekst(el.tekst) || teksty.has(el.tekst)) blad(gdzie, `przykład bez tekstu albo powtórzony: „${el.tekst}”`);
        teksty.add(el.tekst);
        if (!idW.has(el.wiersz) || !idK.has(el.kolumna)) blad(gdzie, `przykład „${el.tekst}”: nieznany wiersz albo kolumna`);
        if (!pelneZdanie(el.wyjasnienie)) blad(gdzie, `przykład „${el.tekst}”: wyjaśnienie musi być pełnym zdaniem`);
        if (el.karta) karta(gdzie, el.karta);
      }
    },

    slupki(z, gdzie) {
      // Skład ciała człowieka: wartości z TRESCI.md, sekcja 2.1 (np. „woda 65, białka 18, ...”).
      const linia = tekstTresci.split('\n').find((l) => l.includes('Skład ciała człowieka')) ?? '';
      const wartosciT = new Map([...linia.matchAll(/([a-ząćęłńóśźż ]+?) (\d+)(?=,|\.|$)/giu)].map((m) => [m[1].replace(/^.*: /, '').trim(), Number(m[2])]));
      const sk = z.skladniki || [];
      if (sk.length < 3) blad(gdzie, 'co najmniej trzy składniki');
      if (new Set(sk.map((x) => x.id)).size !== sk.length) blad(gdzie, 'powtórzone id składnika');
      if (new Set(sk.map((x) => x.procent)).size !== sk.length) blad(gdzie, 'dwa składniki z tym samym procentem: kolejność byłaby niejednoznaczna');
      for (const x of sk) {
        if (!wartosciT.has(x.nazwa)) blad(gdzie, `składnik „${x.nazwa}” nie występuje w składzie ciała w TRESCI.md, sekcja 2.1`);
        else if (wartosciT.get(x.nazwa) !== x.procent) blad(gdzie, `składnik „${x.nazwa}”: ${x.procent}, a w TRESCI.md ${wartosciT.get(x.nazwa)}`);
        if (x.karta) karta(gdzie, x.karta);
      }
      if (z.porownanie) {
        if (!tekstTresci.includes(`${z.porownanie.procent}%`)) blad(gdzie, `porównanie: wartości ${z.porownanie.procent}% nie ma w TRESCI.md`);
        if (!pelneZdanie(z.porownanie.opis)) blad(gdzie, 'porównanie: opis musi być pełnym zdaniem');
        if (z.porownanie.karta) karta(gdzie, z.porownanie.karta);
      }
    },

    diagnoza(z, gdzie) {
      if (!z.przypadki?.length) blad(gdzie, 'brak przypadków');
      (z.przypadki || []).forEach((p, i) => {
        const gp = `${gdzie}.przypadki[${i}]`;
        if (!ID_SCEN_SKLADNIKOW.includes(p.scena)) blad(gp, `nieznana scena „${p.scena}”`);
        if (!pelneZdanie(p.objaw) || !pelneZdanie(p.wyjasnienie)) blad(gp, 'objaw i wyjaśnienie muszą być pełnymi zdaniami');
        const sk = p.skladnik || {};
        if (!niepustyTekst(sk.pytanie)) blad(gp, 'składnik: brak pytania');
        const dobre = (sk.opcje || []).filter((o) => o.poprawna === true);
        if (dobre.length !== 1) blad(gp, `składnik: opcji poprawnych jest ${dobre.length}, a musi być dokładnie jedna`);
        if ((sk.opcje || []).length < 3) blad(gp, 'składnik: co najmniej trzy opcje');
        for (const o of sk.opcje || []) {
          karta(gp, o.karta);
          if (!o.poprawna && !pelneZdanie(o.wyjasnienie)) blad(gp, `składnik „${o.karta}” bez wyjaśnienia, dlaczego nie pasuje`);
        }
        WALIDATORY.doswiadczenie({ opis: p.objaw, kroki: [{ ...p.funkcja, wyjasnienie: p.wyjasnienie }] }, gp);
        ciekawostka(`${gp}.ciekawostka`, p.ciekawostka);
      });
    },

    las(z, gdzie) {
      if (!z.etapy?.length) {
        blad(gdzie, 'brak etapów');
        return;
      }
      let stan = LS.nowyLas();
      let gromadzenie = false;
      z.etapy.forEach((e, i) => {
        const ge = `${gdzie}.etapy[${i}]`;
        if (typeof e.sprzatacze !== 'boolean') blad(ge, 'sprzatacze musi być true albo false');
        if (!Number.isInteger(e.lata) || e.lata < 1 || e.lata > 5) blad(ge, 'lata: liczba od 1 do 5');
        if (!niepustyTekst(e.polecenie) || !niepustyTekst(e.akcja)) blad(ge, 'etap wymaga polecenia i napisu na przycisku (akcja)');
        if (!e.pytania?.length) blad(ge, 'etap bez pytań');
        else WALIDATORY.doswiadczenie({ opis: e.polecenie, kroki: e.pytania }, ge);
        const przed = stan.szczatki;
        for (const s of LS.lata(stan, Boolean(e.sprzatacze), Math.max(1, e.lata | 0))) stan = s;
        if (!e.sprzatacze && stan.szczatki > przed) gromadzenie = true;
      });
      // Mechanika ma pokazać fakt z TRESCI.md, sekcja 2.5: bez tych organizmów szczątki się gromadzą.
      if (!gromadzenie) blad(gdzie, 'żaden etap nie pokazuje gromadzenia się szczątków bez organizmów odżywiających się szczątkami');
      ciekawostka(`${gdzie}.ciekawostka`, z.ciekawostka);
    },

    rozbiorka(z, gdzie) {
      const zwiazki = z.zwiazki || [];
      if (zwiazki.length < 2) blad(gdzie, 'co najmniej dwa związki do rozłożenia');
      for (const id of zwiazki) if (!['cukry', 'bialka', 'tluszcze'].includes(id)) blad(gdzie, `związek „${id}” spoza listy cukry, bialka, tluszcze (TRESCI.md, 2.5)`);
      if (new Set(zwiazki).size !== zwiazki.length) blad(gdzie, 'powtórzony związek');
      if (!z.pytania?.length) blad(gdzie, 'brak pytań');
      else WALIDATORY.doswiadczenie({ opis: z.tresc, kroki: z.pytania }, gdzie);
    },

    lancuch(z, gdzie) {
      if (!pokarm) {
        blad(gdzie, 'brak danych data/pokarm.js');
        return;
      }
      const dane = { katalog, wezly: pokarm.wezly || [], zaleznosci: pokarm.zaleznosci || [] };
      if (!z.lancuchy?.length) blad(gdzie, 'brak łańcuchów');
      (z.lancuchy || []).forEach((l, i) => {
        for (const p of LN.problemy(l, dane)) blad(`${gdzie}.lancuchy[${i}]`, p);
      });
    },

    doba(z, gdzie) {
      const pory = (z.etapy || []).map((e) => e.pora);
      if (!pory.length) blad(gdzie, 'brak etapów (pór doby)');
      for (const p of pory) if (!PORY[p]) blad(gdzie, `pora „${p}” spoza listy ${Object.keys(PORY).join(', ')}`);
      if (new Set(pory).size !== pory.length) blad(gdzie, 'powtórzona pora doby');
      ciekawostka(`${gdzie}.ciekawostka`, z.ciekawostka);
    },

    miasto(z, gdzie) {
      if (!['budowa', 'awarie'].includes(z.faza)) blad(gdzie, `faza „${z.faza}” spoza listy budowa, awarie`);
      if (!miasto) {
        blad(gdzie, 'brak danych miasta (data/miasto.js)');
        return;
      }
      const s = schematPoId.get(miasto.schemat);
      const typ = s && typPoId.get(s.typKomorki);
      for (const d of z.dystraktory || []) {
        if (TYLKO_U_BAKTERII.includes(d)) blad(gdzie, `„${d}” nie może być dystraktorem (SPEC.md, sekcja 12)`);
        if (!elementPoId.has(d)) blad(gdzie, `nieznany dystraktor „${d}”`);
        else if (typ && typ.obecnosc?.[d] !== 'nie') blad(gdzie, `dystraktor „${d}”: według TRESCI.md ${typ.nazwa} nie wyklucza tego elementu`);
      }
      if (z.faza === 'awarie' && !(z.ile >= 1 && z.ile <= miasto.uslugi.length)) blad(gdzie, `ile: od 1 do ${miasto.uslugi.length}`);
    },

    detektyw(z, gdzie) {
      if (!z.sprawy?.length) blad(gdzie, 'brak spraw');
      (z.sprawy || []).forEach((sp, i) => {
        const gs = `${gdzie}.sprawy[${i}]`;
        if (!typPoId.has(sp.cel)) {
          blad(gs, `nieznany typ komórki „${sp.cel}”`);
          return;
        }
        const nieznane = (sp.wskazowki || []).filter((id) => !wskazowkaPoId.has(id));
        for (const id of nieznane) blad(gs, `nieznana wskazówka „${id}”`);
        if (nieznane.length) return;
        for (const id of sp.wskazowki) {
          if (wyklucza(wskazowkaPoId.get(id), sp.cel, typyKomorek)) blad(gs, `wskazówka „${id}” przeczy rozwiązaniu „${sp.cel}”`);
        }
        if (potrzebneWskazowki(sp, wskazowkaPoId, typyKomorek) === null) blad(gs, 'wskazówki nie rozstrzygają sprawy');
      });
    },

    konstruktor(z, gdzie) {
      if (!z.plany?.length) blad(gdzie, 'brak planów');
      for (const idT of z.plany || []) {
        const t = typPoId.get(idT);
        if (!t) {
          blad(gdzie, `nieznany typ komórki „${idT}”`);
          continue;
        }
        if (!t.rysunek) blad(gdzie, `${t.nazwa} nie ma rysunku`);
        for (const idE of czesciKonstruktora) {
          const e = elementPoId.get(idE);
          if (e && regula(t, e).decyzja === 'nieznana') blad(gdzie, `${t.nazwa}: brak reguły dla części „${idE}” (obecnosc albo zdania)`);
        }
      }
    },

    wakuola(z, gdzie) {
      if (!z.pytania?.length) blad(gdzie, 'brak pytań');
      (z.pytania || []).forEach((p, i) => {
        const gp = `${gdzie}.pytania[${i}]`;
        if (!niepustyTekst(p.pytanie) || !niepustyTekst(p.wyjasnienie)) blad(gp, 'brak pytania albo wyjaśnienia');
        if (!p.opcje?.includes(p.poprawna)) blad(gp, 'poprawna odpowiedź musi być jedną z opcji');
        for (const o of p.opcje || []) karta(gp, o);
      });
    },
  };

  for (const z of zadania) {
    const gdzie = `zadania[${z.id}]`;
    if (!Number.isInteger(z.swiat) || z.swiat < 1 || z.swiat > 6) blad(gdzie, 'swiat musi być liczbą 1-6');
    if (!TYPY_ZADAN.includes(z.typ)) blad(gdzie, `nieznany typ zadania „${z.typ}”`);
    for (const pole of ['tresc', 'wyjasnienie']) if (!niepustyTekst(z[pole])) blad(gdzie, `brak pola ${pole}`);
    zrodlo(gdzie, z);
    const walidator = WALIDATORY[z.typ];
    if (walidator) walidator(z, gdzie);
    else if (TYPY_ZADAN.includes(z.typ)) blad(gdzie, `typ „${z.typ}” nie ma jeszcze reguł walidatora`);
  }

  // Miasto-komórka
  if (miasto) {
    const s = schematPoId.get(miasto.schemat);
    if (!s) blad('miasto', `nieznany schemat „${miasto.schemat}”`);
    const elementySchematu = new Set((s?.punkty || []).map((p) => p.element));
    const uslugi = new Set();
    for (const u of miasto.uslugi || []) {
      const gu = `miasto.uslugi[${u.element}]`;
      if (!elementPoId.has(u.element)) blad(gu, 'nieznany element');
      else if (s && !elementySchematu.has(u.element)) blad(gu, 'elementu nie ma wśród punktów schematu');
      if (uslugi.has(u.element)) blad(gu, 'powtórzony element');
      uslugi.add(u.element);
      for (const pole of ['nazwa', 'zlecenie', 'awaria']) if (!niepustyTekst(u[pole])) blad(gu, `brak pola ${pole}`);
    }
  }

  // Części konstruktora
  for (const idE of czesciKonstruktora) {
    if (!elementPoId.has(idE)) blad('konstruktor', `nieznana część „${idE}”`);
    if (TYLKO_U_BAKTERII.includes(idE)) blad('konstruktor', `„${idE}” nie może być częścią konstruktora (SPEC.md, sekcja 12)`);
  }

  // Wskazówki detektywa
  for (const w of wskazowki) {
    const gw = `wskazowki[${w.id}]`;
    if (!niepustyTekst(w.tekst)) blad(gw, 'brak tekstu');
    if (!elementPoId.has(w.element)) blad(gw, `nieznany element „${w.element}”`);
    if (w.pasuje) {
      for (const t of [...w.pasuje, ...(w.nieznane || [])]) if (!typPoId.has(t)) blad(gw, `nieznany typ komórki „${t}”`);
    } else {
      if (typeof w.jest !== 'boolean') blad(gw, 'wskazówka o elemencie wymaga pola jest (true albo false)');
      for (const t of typyKomorek) if (!t.obecnosc[w.element]) blad(gw, `${t.nazwa}: brak obecności elementu „${w.element}” w danych`);
      if (pasujaceTypy(w, typyKomorek).size === 0) blad(gw, 'wskazówka nie pasuje do żadnego typu komórki');
    }
  }

  // Organizmy (karty atlasu)
  const sekcja5 = tekstTresci.split(/^## 5\./m)[1]?.split(/^## 6\./m)[0] ?? '';
  if (organizmy) {
    unikalne(organizmy, 'organizmy');
    for (const o of organizmy) {
      const gdzie = `organizmy[${o.id}]`;
      if (!orgT.nazwy.has(o.nazwa)) blad(gdzie, `organizm „${o.nazwa}” spoza tabeli w TRESCI.md, sekcja 7`);
      if (!orgT.kategorie.has(o.kategoria)) blad(gdzie, `kategoria „${o.kategoria}” spoza tabeli w TRESCI.md, sekcja 7`);
      else if (orgT.kategoriaNazwy?.get(o.nazwa) && orgT.kategoriaNazwy.get(o.nazwa) !== o.kategoria) {
        blad(gdzie, `kategoria „${o.kategoria}”, a według TRESCI.md, sekcja 7: „${orgT.kategoriaNazwy.get(o.nazwa)}”`);
      }
      if (o.opis !== undefined || o.zdanie !== undefined) {
        for (const pole of ['opis', 'zdanie']) if (!niepustyTekst(o[pole])) blad(gdzie, `brak pola ${pole}`);
        if (!Number.isInteger(o.swiat)) blad(gdzie, 'swiat musi być liczbą');
        zrodlo(gdzie, o);
      }
      ciekawostka(`${gdzie}.ciekawostka`, o.ciekawostka);
      // Dopisek o rzeczywistości tylko przy uproszczeniach wymienionych w TRESCI.md, sekcja 5.
      if (o.uwaga !== undefined) {
        const rdzen = o.nazwa.slice(0, Math.max(5, o.nazwa.length - 2)).toLowerCase();
        if (!pelneZdanie(o.uwaga)) blad(gdzie, 'uwaga musi być pełnym zdaniem');
        if (!sekcja5.toLowerCase().includes(rdzen)) blad(gdzie, 'uwaga tylko przy uproszczeniach z TRESCI.md, sekcja 5');
      }
    }
  }

  // Zależności pokarmowe (łańcuchy w świecie 5)
  if (pokarm) {
    const idWezlow = new Set();
    for (const w of pokarm.wezly || []) {
      const gw = `pokarm.wezly[${w.id}]`;
      if (idWezlow.has(w.id) || katalog.has(w.id)) blad(gw, 'id węzła powtórzone albo zajęte przez kartę atlasu');
      idWezlow.add(w.id);
      if (!niepustyTekst(w.nazwa)) blad(gw, 'brak nazwy');
      if (!['roslinny', 'padlina', 'szczatki'].includes(w.typ)) blad(gw, `typ „${w.typ}” spoza listy roslinny, padlina, szczatki`);
      if (!ID_RYSUNKOW.includes(w.ikona)) blad(gw, `nie ma rysunku „${w.ikona}”`);
    }
    const daneP = { katalog, wezly: pokarm.wezly || [], zaleznosci: [] };
    for (const z of pokarm.zaleznosci || []) {
      const gz = `pokarm.zaleznosci[${z.zjada}→${z.pokarm}]`;
      if (katalog.get(z.zjada)?.rodzaj !== 'organizm') blad(gz, `„${z.zjada}” nie jest kartą organizmu`);
      if (!idWezlow.has(z.pokarm) && katalog.get(z.pokarm)?.rodzaj !== 'organizm') blad(gz, `nieznany pokarm „${z.pokarm}”`);
      if (!pelneZdanie(z.dlaczego)) blad(gz, 'dlaczego: potrzebne pełne zdanie');
      else if (LN.relacja(z.zjada, z.pokarm, daneP) === 'nie') blad(gz, 'zależność przeczy definicji kategorii organizmu');
    }
  }

  // Procesy: zapisy słowne dosłownie z TRESCI.md
  const tekstZapisow = tekstBezWyroznien(tekstTresci);
  unikalne(procesy, 'procesy');
  for (const pr of procesy) {
    const gdzie = `procesy[${pr.id}]`;
    for (const pole of ['nazwa', 'miejscownik', 'dopelniacz', 'zapis', 'miejsce']) if (!niepustyTekst(pr[pole])) blad(gdzie, `brak pola ${pole}`);
    for (const [id, cel] of Object.entries(pr.rownowazne || {})) {
      karta(`${gdzie}.rownowazne`, id);
      if (![...(pr.substraty || []), ...(pr.produkty || [])].includes(cel)) blad(`${gdzie}.rownowazne`, `„${cel}” nie jest substratem ani produktem procesu`);
    }
    zrodlo(gdzie, pr);
    if (!katalog.has(pr.id)) blad(gdzie, 'brak karty atlasu o tym samym id');
    const nazwyKart = (lista) => (lista || []).map((id) => katalog.get(id)?.nazwa ?? `?${id}`);
    for (const id of [...(pr.substraty || []), ...(pr.warunki || []), ...(pr.produkty || [])]) karta(gdzie, id);
    const warunki = pr.warunki?.length ? ` → (${nazwyKart(pr.warunki).join(', ')}) →` : ' →';
    const zbudowany = `${nazwyKart(pr.substraty).join(' + ')}${warunki} ${nazwyKart(pr.produkty).join(' + ')}`;
    if (niepustyTekst(pr.zapis)) {
      if (!tekstZapisow.includes(pr.zapis)) blad(gdzie, `zapis „${pr.zapis}” nie występuje dosłownie w TRESCI.md`);
      if (zbudowany !== pr.zapis) blad(gdzie, `substraty, warunki i produkty dają zapis „${zbudowany}”, a zapis to „${pr.zapis}”`);
    }
    if (pr.energia !== undefined && !['dużo', 'mało'].includes(pr.energia)) blad(gdzie, `energia „${pr.energia}” spoza listy dużo, mało`);
    const uczestnicy = new Set([...(pr.substraty || []), ...(pr.warunki || []), ...(pr.produkty || []), ...Object.keys(pr.rownowazne || {})]);
    for (const [id, zd] of Object.entries(pr.opisy || {})) {
      if (!uczestnicy.has(id)) blad(`${gdzie}.opisy`, `„${id}” nie bierze udziału w tym procesie`);
      if (!pelneZdanie(zd)) blad(`${gdzie}.opisy.${id}`, 'opis musi być pełnym zdaniem');
    }
  }

  // Tabela porównawcza oddychania tlenowego i fermentacji
  if (porownanie) {
    const gdzie = 'porownanie';
    zrodlo(gdzie, porownanie);
    for (const k of porownanie.kolumny || []) karta(`${gdzie}.kolumny`, k);
    if (!tabelaPr) blad('TRESCI.md', 'nie znaleziono tabeli porównawczej oddychania tlenowego i fermentacji w sekcji 2.6');
    else {
      const kolumnyTresci = tabelaPr.kolumny.slice(1).map((k) => k.toLowerCase());
      const kolumnyDanych = (porownanie.kolumny || []).map((k) => katalog.get(k)?.nazwa);
      if (kolumnyTresci.join('|') !== kolumnyDanych.join('|')) blad(gdzie, `kolumny „${kolumnyDanych.join(', ')}”, a w TRESCI.md „${kolumnyTresci.join(', ')}”`);
      const cechaPoNazwie = new Map((porownanie.cechy || []).map((c) => [c.cecha, c]));
      for (const wiersz of tabelaPr.wiersze) {
        const c = cechaPoNazwie.get(wiersz[0]);
        if (!c) {
          blad(gdzie, `brak cechy „${wiersz[0]}” z tabeli w TRESCI.md`);
          continue;
        }
        (porownanie.kolumny || []).forEach((k, i) => {
          if (c.wartosci?.[k] !== wiersz[i + 1]) blad(`${gdzie}.cechy[${c.id}].${k}`, `„${c.wartosci?.[k]}”, a w TRESCI.md „${wiersz[i + 1]}”`);
        });
      }
      const etykiety = new Set();
      for (const c of porownanie.cechy || []) {
        if (!tabelaPr.wiersze.some((w) => w[0] === c.cecha)) blad(`${gdzie}.cechy[${c.id}]`, `cechy „${c.cecha}” nie ma w tabeli w TRESCI.md`);
        for (const k of porownanie.kolumny || []) {
          if (!niepustyTekst(c.zdania?.[k])) blad(`${gdzie}.cechy[${c.id}]`, `brak zdania dla kolumny „${k}”`);
          const e = c.etykiety?.[k] ?? c.wartosci?.[k];
          if (etykiety.has(e)) blad(`${gdzie}.cechy[${c.id}]`, `etykieta „${e}” powtarza się w tabeli`);
          etykiety.add(e);
        }
      }
    }
  }

  // Próbny sprawdzian: punkty zakresu z TRESCI.md, sekcja 8, w kolejności; suma punktów jak
  // w nagłówku sekcji; w pulach tylko formaty sprawdzianu i co najmniej pięć wariantów.
  if (sprawdzian) {
    const sekcja8 = tekstTresci.split(/^## 8\./m)[1]?.split(/^## 9\./m)[0] ?? '';
    const naglowek = tekstTresci.match(/Zakres sprawdzianu[^\n]*\((\d+)-(\d+) pkt\)/);
    const liczbaPunktow = sekcja8.match(/^\d+\. /gm)?.length ?? 0;
    if (sprawdzian.length !== liczbaPunktow) blad('sprawdzian', `zadań ${sprawdzian.length}, a punktów zakresu w TRESCI.md ${liczbaPunktow}`);
    const suma = sprawdzian.reduce((s, p) => s + (Number.isInteger(p.punkty) ? p.punkty : 0), 0);
    if (naglowek && suma !== Number(naglowek[2])) blad('sprawdzian', `suma punktów ${suma}, a w TRESCI.md ${naglowek[2]}`);
    sprawdzian.forEach((p, i) => {
      const g = `sprawdzian[${p.punkt}]`;
      if (p.punkt !== i + 1) blad(g, 'punkty zakresu muszą iść po kolei od 1');
      if (!niepustyTekst(p.nazwa)) blad(g, 'brak nazwy');
      if (!Number.isInteger(p.punkty) || p.punkty < 1) blad(g, 'punkty: liczba całkowita od 1');
      const sw = swiaty.find((x) => x.id === p.misja?.swiat);
      if (!sw?.misje?.some((m) => m.id === p.misja?.id)) blad(g, `nieznana misja „${p.misja?.id}” w świecie ${p.misja?.swiat}`);
      // misjeKart: karta atlasu → misja w świecie tematu (odnośniki do misji kart z błędem)
      for (const [k, idMisji] of Object.entries(p.misjeKart ?? {})) {
        if (!katalog.has(k)) blad(`${g}.misjeKart`, `nieznana karta atlasu „${k}”`);
        if (!sw?.misje?.some((m) => m.id === idMisji)) blad(`${g}.misjeKart`, `nieznana misja „${idMisji}” w świecie ${p.misja?.swiat}`);
      }
      const pula = p.pula || [];
      if (new Set(pula).size !== pula.length) blad(g, 'powtórzone zadanie w puli');
      if (new Set(pula).size < 5) blad(g, `wariantów ${new Set(pula).size}, a potrzeba co najmniej pięciu (TRESCI.md, sekcja 8)`);
      for (const id of pula) {
        const z = zadania.find((x) => x.id === id);
        if (!z) blad(g, `nieznane zadanie „${id}”`);
        else if (MECHANIKI.includes(z.typ)) blad(g, `„${id}” to mechanika (${z.typ}), a sprawdzian ma tylko formaty sprawdzianu`);
      }
    });
  }

  // Domowe laboratorium (SPEC.md, sekcja 4.5): kroki i uwagi pełnymi zdaniami, karta atlasu,
  // ciekawostka dosłownie z TRESCI.md, sekcja 6.
  if (laboratorium) {
    unikalne(laboratorium, 'laboratorium');
    for (const d of laboratorium) {
      const g = `laboratorium[${d.id}]`;
      if (!niepustyTekst(d.nazwa)) blad(g, 'brak nazwy');
      if (!swiaty.some((s) => s.id === d.swiat)) blad(g, `nieznany świat ${d.swiat}`);
      if (!katalog.has(d.karta)) blad(g, `nieznana karta atlasu „${d.karta}”`);
      for (const pole of ['potrzebne', 'kroki']) {
        if (!Array.isArray(d[pole]) || !d[pole].length || !d[pole].every(niepustyTekst)) blad(g, `${pole}: potrzebna lista niepustych tekstów`);
      }
      for (const k of d.kroki || []) if (!pelneZdanie(k)) blad(g, `krok „${k}” musi być pełnym zdaniem`);
      for (const pole of ['bezpieczenstwo', 'obserwacja', 'wyjasnienie']) if (!pelneZdanie(d[pole])) blad(g, `${pole}: potrzebne pełne zdanie`);
      if (d.wymaga !== undefined && d.wymaga !== 'mikroskop') blad(g, 'wymaga: dozwolone tylko „mikroskop”');
      ciekawostka(`${g}.ciekawostka`, d.ciekawostka);
    }
  }

  // Terminy spoza TRESCI.md we wszystkich tekstach
  const doPrzeszukania = [
    ['swiaty', swiaty],
    ['elementy', elementy],
    ['typyKomorek', typyKomorek],
    ['pojecia', pojecia],
    ['zadania', zadania],
    ['miasto', miasto ? [miasto] : []],
    ['wskazowki', wskazowki],
    ['organizmy', organizmy || []],
    ['procesy', procesy],
    ['porownanie', porownanie ? [porownanie] : []],
    ['sprawdzian', sprawdzian || []],
    ['laboratorium', laboratorium || []],
  ];
  for (const [nazwa, lista] of doPrzeszukania) {
    for (const [sciezka, tekst] of teksty(lista, nazwa)) {
      for (const { wzorzec, zamiast } of ZAKAZANE) {
        const m = tekst.match(wzorzec);
        if (m) blad(sciezka, `termin spoza TRESCI.md „${m[0]}…”; zamiast tego: ${zamiast}`);
      }
    }
  }

  return bledy;
}

// ---------- Wczytanie plików ----------

async function istnieje(plik) {
  try {
    await access(plik);
    return true;
  } catch {
    return false;
  }
}

async function modul(nazwa) {
  const plik = path.join(KATALOG_APP, 'data', nazwa);
  if (!(await istnieje(plik))) return undefined;
  return (await import(pathToFileURL(plik).href)).default;
}

export async function wczytajWszystko() {
  const tresc = await readFile(path.join(KORZEN, 'TRESCI.md'), 'utf8');
  const dane = {
    swiaty: await modul('swiaty.js'),
    elementy: await modul('elementy-komorek.js'),
    typyKomorek: await modul('typy-komorek.js'),
    schematy: await modul('schematy.js'),
    zadania: await modul('zadania.js'),
    pojecia: await modul('pojecia.js'),
    miasto: await modul('miasto.js'),
    wskazowki: await modul('wskazowki.js'),
    czesciKonstruktora: await modul('konstruktor.js'),
    organizmy: await modul('organizmy.js'),
    procesy: await modul('procesy.js'),
    porownanie: await modul('porownanie.js'),
    pokarm: await modul('pokarm.js'),
    sprawdzian: await modul('sprawdzian.js'),
    laboratorium: await modul('laboratorium.js'),
  };
  const svg = new Map();
  const pliki = [...(dane.schematy || []).map((s) => s.plik), ...(dane.typyKomorek || []).map((t) => t.rysunek)].filter(Boolean);
  for (const p of pliki) {
    const plik = path.join(KATALOG_APP, p);
    if (await istnieje(plik)) svg.set(p, await readFile(plik, 'utf8'));
  }
  const kontekst = {
    sekcje: sekcjeTresci(tresc),
    terminy: terminyKanoniczne(tresc),
    tabelaKomorek: tabelaKomorek(tresc),
    tabelaProcesow: tabelaProcesow(tresc),
    organizmyTresci: organizmyTresci(tresc),
    ciekawostki: ciekawostkiTresci(tresc),
    tekstTresci: tresc,
    svg,
  };
  return { dane, kontekst };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { dane, kontekst } = await wczytajWszystko();
  const bledy = walidujDane(dane, kontekst);
  if (bledy.length) {
    console.error(`Walidator danych: ${bledy.length} błędów\n`);
    for (const b of bledy) console.error(`- ${b}`);
    process.exit(1);
  }
  const ile = (l) => (l ? l.length : 0);
  console.log(
    `Walidator danych: bez błędów (światy: ${ile(dane.swiaty)}, elementy: ${ile(dane.elementy)}, ` +
      `schematy: ${ile(dane.schematy)}, karty pojęć: ${ile(dane.pojecia)}, organizmy: ${ile(dane.organizmy)}, ` +
      `procesy: ${ile(dane.procesy)}, zadania: ${ile(dane.zadania)}).`,
  );
}

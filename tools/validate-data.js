// Walidator danych gry. Uruchomienie: node tools/validate-data.js
//
// Sprawdza:
// - unikalność identyfikatorów i kompletność pól,
// - odwołania do sekcji TRESCI.md,
// - brzmienie etykiet według słownika kanonicznego (TRESCI.md, sekcja 9),
// - teksty pod kątem terminów spoza TRESCI.md (tools/zakazane-terminy.js),
// - zgodność typów komórek z tabelą porównawczą (TRESCI.md, sekcja 2.3),
// - schematy SVG: czy rysunek zawiera wskazane elementy i nie zawiera elementów,
//   których dany typ komórki nie ma,
// - dystraktory: tylko elementy, których dany typ komórki nie ma,
// - kategorie organizmów z tabeli w TRESCI.md, sekcja 7 (gdy istnieje data/organizmy.js).

import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ZAKAZANE } from './zakazane-terminy.js';

const KORZEN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KATALOG_APP = path.join(KORZEN, 'app');

export const TYPY_ZADAN = [
  'podpisywanie',
  'prawda-falsz',
  'przyporzadkowanie',
  'luki',
  'klasyfikacja',
  'tabela',
  'doswiadczenie',
  'sorter',
];

const OBECNOSC = ['tak', 'nie', 'czasem'];

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

export function organizmyTresci(tekst) {
  const t = tabela(trescSekcji(tekst, '7'), '| Organizm |');
  if (!t) return { nazwy: new Set(), kategorie: new Set() };
  return {
    nazwy: new Set(t.wiersze.map((w) => w[0])),
    kategorie: new Set(t.wiersze.map((w) => w[1])),
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
  const { swiaty = [], elementy = [], typyKomorek = [], schematy = [], zadania = [], organizmy } = dane;
  const { sekcje, terminy, tabelaKomorek: tabelaTk, organizmyTresci: orgT, svg = new Map() } = kontekst;

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

  const elementPoId = new Map(elementy.map((e) => [e.id, e]));
  const typPoId = new Map(typyKomorek.map((t) => [t.id, t]));
  const schematPoId = new Map(schematy.map((s) => [s.id, s]));
  const zadaniePoId = new Map(zadania.map((z) => [z.id, z]));

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
  }

  // Elementy komórek
  for (const e of elementy) {
    const gdzie = `elementy[${e.id}]`;
    for (const pole of ['nazwa', 'opis', 'funkcja', 'brak']) if (!niepustyTekst(e[pole])) blad(gdzie, `brak pola ${pole}`);
    zrodlo(gdzie, e);
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

  // Schematy
  for (const s of schematy) {
    const gdzie = `schematy[${s.id}]`;
    const typ = typPoId.get(s.typKomorki);
    if (!typ) blad(gdzie, `nieznany typ komórki „${s.typKomorki}”`);
    if (!niepustyTekst(s.plik)) {
      blad(gdzie, 'brak pliku rysunku');
      continue;
    }
    const rysunek = svg.get(s.plik);
    if (rysunek === undefined) blad(gdzie, `plik „${s.plik}” nie istnieje`);
    if (rysunek !== undefined) {
      if (/\sstyle\s*=/.test(rysunek)) blad(s.plik, 'atrybut style jest blokowany przez politykę CSP; użyj atrybutów fill, stroke itp.');
      if (/<script/i.test(rysunek)) blad(s.plik, 'rysunek nie może zawierać skryptów');
      for (const [, idE] of rysunek.matchAll(/data-element="([^"]+)"/g)) {
        if (!elementPoId.has(idE)) blad(s.plik, `nieznany element „${idE}”`);
        else if (typ && typ.obecnosc?.[idE] === 'nie') blad(s.plik, `${typ.nazwa} nie ma elementu „${idE}”, a rysunek go zawiera`);
      }
    }
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

  // Zadania
  for (const z of zadania) {
    const gdzie = `zadania[${z.id}]`;
    if (!Number.isInteger(z.swiat) || z.swiat < 1 || z.swiat > 6) blad(gdzie, 'swiat musi być liczbą 1-6');
    if (!TYPY_ZADAN.includes(z.typ)) blad(gdzie, `nieznany typ zadania „${z.typ}”`);
    for (const pole of ['tresc', 'wyjasnienie']) if (!niepustyTekst(z[pole])) blad(gdzie, `brak pola ${pole}`);
    zrodlo(gdzie, z);
    if (z.typ === 'podpisywanie') {
      const s = schematPoId.get(z.schemat);
      if (!s) {
        blad(gdzie, `nieznany schemat „${z.schemat}”`);
        continue;
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
        if (!elementPoId.has(idD)) blad(gdzie, `nieznany dystraktor „${idD}”`);
        else if (poprawne.has(idD)) blad(gdzie, `dystraktor „${idD}” jest jednocześnie poprawną odpowiedzią`);
        else if (typ && typ.obecnosc?.[idD] !== 'nie') {
          blad(gdzie, `dystraktor „${idD}”: według TRESCI.md ${typ.nazwa} nie wyklucza tego elementu`);
        }
      }
    } else if (z.odpowiedz === undefined) {
      blad(gdzie, 'brak pola odpowiedz');
    }
  }

  // Organizmy (od etapu 3)
  if (organizmy) {
    unikalne(organizmy, 'organizmy');
    for (const o of organizmy) {
      const gdzie = `organizmy[${o.id}]`;
      if (!orgT.nazwy.has(o.nazwa)) blad(gdzie, `organizm „${o.nazwa}” spoza tabeli w TRESCI.md, sekcja 7`);
      if (!orgT.kategorie.has(o.kategoria)) blad(gdzie, `kategoria „${o.kategoria}” spoza tabeli w TRESCI.md, sekcja 7`);
    }
  }

  // Terminy spoza TRESCI.md we wszystkich tekstach
  const doPrzeszukania = [
    ['swiaty', swiaty],
    ['elementy', elementy],
    ['zadania', zadania],
    ['organizmy', organizmy || []],
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
    organizmy: await modul('organizmy.js'),
  };
  const svg = new Map();
  for (const s of dane.schematy || []) {
    const plik = path.join(KATALOG_APP, s.plik || '');
    if (s.plik && (await istnieje(plik))) svg.set(s.plik, await readFile(plik, 'utf8'));
  }
  const kontekst = {
    sekcje: sekcjeTresci(tresc),
    terminy: terminyKanoniczne(tresc),
    tabelaKomorek: tabelaKomorek(tresc),
    organizmyTresci: organizmyTresci(tresc),
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
      `schematy: ${ile(dane.schematy)}, zadania: ${ile(dane.zadania)}).`,
  );
}

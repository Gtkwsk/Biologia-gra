// Rozwiązywanie zadań w przeglądarce (Playwright) samymi stuknięciami, z odpowiedziami z danych.
// Używane w teście tools/e2e.js: każde zadanie musi dać się ukończyć i dać wynik „wszystko od razu
// dobrze” przy poprawnych odpowiedziach (sprawdza dane, widok i liczenie wyniku).

import { parsujLuki } from '../app/js/components/luki-logika.js';
import { potrzebneWskazowki } from '../app/js/components/detektyw-logika.js';
import { wymagane } from '../app/js/components/konstruktor-logika.js';
import * as F from '../app/js/components/fotosynteza-logika.js';
import { kluczPola } from '../app/js/components/tabela-wartosci.js';
import * as DB from '../app/js/components/doba-logika.js';

async function stuknij(strona, etykieta, cel) {
  await strona.locator(etykieta).click();
  await strona.locator(cel).first().click();
}

async function sprawdzJesliTrzeba(strona) {
  const przycisk = strona.locator('.tacka__akcje button', { hasText: 'Sprawdź' });
  if ((await przycisk.count()) && (await przycisk.isEnabled())) await przycisk.click();
}

async function dalej(strona, kontener) {
  await strona.locator(`${kontener} .przycisk--dalej:visible`).click();
}

const ROZWIAZANIA = {
  async podpisywanie(strona, z, d) {
    const schemat = d.schematy.find((s) => s.id === z.schemat);
    for (const idP of z.punkty) {
      const el = schemat.punkty.find((p) => p.id === idP).element;
      await stuknij(strona, `.bank .etykieta[data-element="${el}"]`, `.miejsce__pole[data-cel="${idP}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async przyporzadkowanie(strona, z) {
    for (const [i, para] of z.pary.entries()) {
      const id = (z.etykiety ?? 'nazwy') === 'nazwy' ? para.karta : `opis-${i}`;
      await stuknij(strona, `.bank .etykieta[data-element="${id}"]`, `.pole-celu[data-cel="para-${i}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async luki(strona, z) {
    for (const l of parsujLuki(z.tekst).filter((f) => f.typ === 'luka')) {
      await stuknij(strona, `.bank .etykieta[data-element="slowo-${l.numer}"]`, `.pole-celu[data-cel="${l.id}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async klasyfikacja(strona, z) {
    for (const [i, e] of z.elementy.entries()) {
      await stuknij(strona, `.bank .etykieta[data-element="el-${i}"]`, `.klasa[data-cel="${e.kategoria}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async wykrywacz(strona, z) {
    const slowa = z.wyklad.filter((f) => typeof f !== 'string');
    for (const [i, s] of slowa.entries()) {
      if (s.poprawka === undefined) continue;
      await strona.locator(`.wykrywacz__slowo[data-slowo="${i}"]`).click();
      await strona.locator(`.wykrywacz__opcja[data-opcja="${s.poprawka}"]`).click();
    }
  },

  async 'prawda-falsz'(strona, z) {
    for (const zd of z.zdania) {
      await strona.locator(zd.prawda ? '.pf__prawda' : '.pf__falsz').click();
      if (!zd.prawda) {
        if (zd.blad) {
          await strona.locator('.pf__slowo', { hasText: zd.blad }).first().click();
          await strona.locator('.pf__opcja', { hasText: zd.poprawka }).click();
        } else {
          await strona.locator('.pf__wersja').filter({ hasText: zd.poprawne }).click();
        }
      }
      await dalej(strona, '.pf__akcje');
    }
  },

  async tabela(strona, z, d) {
    const wiersze = z.procesy ? z.substancje : z.wiersze;
    const kolumny = z.procesy ?? z.kolumny;
    for (const w of wiersze) {
      for (const k of kolumny) {
        const tak = z.procesy ? d.procesy.find((p) => p.id === k).produkty.includes(w) : d.typyKomorek.find((t) => t.id === k).obecnosc[w] === 'tak';
        const pole = strona.locator(`.tabela-zad__pole[data-klucz="${w}|${k}"]`);
        await pole.click();
        if (!tak) await pole.click();
      }
    }
    await sprawdzJesliTrzeba(strona);
  },

  async porownanie(strona, z, d) {
    for (const c of z.cechy) {
      for (const k of d.porownanie.kolumny) {
        const klucz = kluczPola(c, k);
        await stuknij(strona, `.bank .etykieta[data-element="${klucz}"]`, `.porown__pole[data-cel="${klucz}"]`);
      }
    }
    await sprawdzJesliTrzeba(strona);
  },

  async sorter(strona, z) {
    if (await strona.locator('.sorter--sprawdzian').count()) {
      for (const [i, zd] of z.zdania.entries()) {
        await strona.locator(`.sorter__wiersz[data-indeks="${i}"] .sorter__kategoria[data-kategoria="${zd.kategoria}"]`).click();
      }
      await sprawdzJesliTrzeba(strona);
      return;
    }
    for (let i = 0; i < z.zdania.length; i++) {
      const tekst = (await strona.locator('.sorter__karta').textContent()).trim();
      const zd = z.zdania.find((x) => x.tekst === tekst);
      await strona.locator(`.sorter__kategorie .sorter__kategoria[data-kategoria="${zd.kategoria}"]`).click();
    }
  },

  async doswiadczenie(strona, z) {
    if (await strona.locator('.dosw--sprawdzian').count()) {
      for (const [k, krok] of z.kroki.entries()) {
        const dobra = krok.opcje.findIndex((o) => o.poprawna);
        await strona.locator(`.dosw__krok[data-krok="${k}"] .dosw__opcja[data-opcja="${dobra}"]`).click();
      }
      await sprawdzJesliTrzeba(strona);
      return;
    }
    for (const krok of z.kroki) {
      const dobra = krok.opcje.findIndex((o) => o.poprawna);
      await strona.locator(`.dosw__opcja[data-opcja="${dobra}"]`).click();
      await dalej(strona, '.dosw');
    }
  },

  async przepis(strona, z) {
    const dopasowanie = z.dopasowanie ?? 'pole';
    const uzyte = new Set();
    for (const p of z.pola) {
      // Przy dopasowaniu do strefy każda substancja strefy pasuje do każdego jej pola.
      const id = dopasowanie === 'pole' ? p.substancja : z.pola.find((x) => x.strefa === p.strefa && !uzyte.has(x.substancja)).substancja;
      uzyte.add(id);
      await stuknij(strona, `.bank .etykieta[data-element="${id}"]`, `.przepis__pole[data-cel="${p.id}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async laboratorium(strona, z) {
    const ustaw = (cz, v) =>
      strona.locator(`.lab__suwak[data-czynnik="${cz}"]`).evaluate((el, v) => {
        el.value = String(v);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, v);
    if (z.tryb === 'ogniwo') {
      for (const p of z.przypadki) {
        const n = F.najslabsze(p.ustawienia)[0];
        await strona.locator(`.lab__opcja[data-czynnik="${n}"]`).click();
        await ustaw(n, F.optimum(n));
        await dalej(strona, '.tacka');
      }
      return;
    }
    let u = { ...z.start };
    for (const k of z.kroki) {
      await strona.locator(`.lab__opcja[data-skutek="${F.skutek(u, k.czynnik, k.poziom)}"]`).click();
      await ustaw(k.czynnik, k.poziom);
      u = { ...u, [k.czynnik]: k.poziom };
      await dalej(strona, '.tacka');
    }
    if (z.cel) {
      for (const c of F.CZYNNIKI) if (!(z.roslina === 'moczarka' && c.id === 'woda')) await ustaw(c.id, F.optimum(c.id));
      await dalej(strona, '.tacka');
    }
  },

  async projektant(strona, z) {
    for (const c of z.czynniki) {
      const a = c.opcje[0].id;
      const b = c.id === z.badany ? c.opcje[1].id : a;
      await strona.locator(`.proj__opcja[data-proba="A"][data-czynnik="${c.id}"][data-opcja="${a}"]`).click();
      await strona.locator(`.proj__opcja[data-proba="B"][data-czynnik="${c.id}"][data-opcja="${b}"]`).click();
    }
    await strona.locator('.tacka__akcje button', { hasText: 'Sprawdź plan' }).click();
    await strona.locator('.tacka__akcje button', { hasText: 'Przeprowadź' }).click();
    for (const krok of z.pytania) {
      await strona.locator(`.dosw__opcja[data-opcja="${krok.opcje.findIndex((o) => o.poprawna)}"]`).click();
      await dalej(strona, '.tacka');
    }
  },

  async sprint(strona, z) {
    for (const e of z.etapy) {
      await strona.locator('.sprint__akcja').click();
      for (const krok of e.pytania) {
        await strona.locator(`.sprint .dosw__opcja[data-opcja="${krok.opcje.findIndex((o) => o.poprawna)}"]`).click();
        await dalej(strona, '.sprint');
      }
    }
  },

  async doba(strona, z) {
    const sprawdz = () => strona.locator('.doba .lab__opcje .przycisk', { hasText: 'Sprawdź' }).click();
    for (const e of z.etapy) {
      await strona.locator('.doba__suwak').evaluate((el, g) => {
        el.value = String(g);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, DB.PORY[e.pora].godzina);
      for (const p of DB.procesy(e.pora)) await strona.locator(`.doba .proj__opcja[data-proces="${p}"]`).click();
      await sprawdz();
      const g = DB.gazy(e.pora);
      await strona.locator(`.doba .proj__opcja[data-kierunek="pobiera"][data-gaz="${g.pobiera}"]`).click();
      await strona.locator(`.doba .proj__opcja[data-kierunek="oddaje"][data-gaz="${g.oddaje}"]`).click();
      await sprawdz();
      await dalej(strona, '.doba');
    }
  },

  async miasto(strona, z, d) {
    if (z.faza === 'budowa') {
      for (const u of d.miasto.uslugi) {
        await stuknij(strona, `.bank .etykieta[data-element="${u.element}"]`, `.usluga[data-cel="${u.element}"]`);
      }
      return;
    }
    const schemat = d.schematy.find((s) => s.id === d.miasto.schemat);
    for (let i = 0; i < z.ile; i++) {
      const objaw = (await strona.locator('.miasto__objaw').textContent()).trim();
      const u = d.miasto.uslugi.find((x) => x.awaria === objaw);
      const punkt = schemat.punkty.find((p) => p.element === u.element);
      await strona.locator(`.znacznik[data-punkt="${punkt.id}"] .znacznik__kolko`).click();
      await dalej(strona, '.miasto--awarie');
    }
  },

  async detektyw(strona, z, d) {
    const wskazowkaPoId = new Map(d.wskazowki.map((w) => [w.id, w]));
    for (const sprawa of z.sprawy) {
      const k = potrzebneWskazowki(sprawa, wskazowkaPoId, d.typyKomorek);
      for (let i = 1; i < k; i++) await strona.locator('.detektyw__notes button').click();
      await strona.locator(`.podejrzany[data-typ="${sprawa.cel}"]`).click();
      await dalej(strona, '.detektyw');
    }
  },

  async konstruktor(strona, z, d) {
    for (const idT of z.plany) {
      const typ = d.typyKomorek.find((t) => t.id === idT);
      for (const id of wymagane(typ, d.czesciKonstruktora)) {
        await stuknij(strona, `.bank .etykieta[data-element="${id}"]`, '.konstruktor__plan');
      }
      await strona.locator('.tacka__akcje button', { hasText: 'Gotowe' }).first().click();
      await dalej(strona, '.konstruktor');
    }
  },

  async wakuola(strona, z) {
    await strona.locator('.wakuola__suwak').evaluate((el) => {
      el.value = '100';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    for (const p of z.pytania) {
      await strona.locator(`.wakuola__opcja[data-karta="${p.poprawna}"]`).click();
      await dalej(strona, '.wakuola');
    }
  },
  async lancuch(strona, z) {
    for (const l of z.lancuchy) {
      await strona.locator(`.lancuch__opcja[data-karta="${l.opcje.find((o) => o.poprawna).karta}"]`).click();
      await dalej(strona, '.lancuch');
    }
  },

  async rozbiorka(strona, z) {
    await strona.locator('.rozbiorka__enzym').click();
    for (const id of z.zwiazki) await strona.locator(`.rozbiorka__taca[data-zwiazek="${id}"]`).click();
    await dalej(strona, '.rozbiorka');
    for (const krok of z.pytania) {
      await strona.locator(`.rozbiorka .dosw__opcja[data-opcja="${krok.opcje.findIndex((o) => o.poprawna)}"]`).click();
      await dalej(strona, '.rozbiorka');
    }
  },

  async las(strona, z) {
    for (const e of z.etapy) {
      await strona.locator('.las__akcja').click();
      for (const krok of e.pytania) {
        // Pytania pojawiają się dopiero po animacji kolejnych lat.
        await strona.locator(`.las .dosw__opcja[data-opcja="${krok.opcje.findIndex((o) => o.poprawna)}"]`).click({ timeout: 15000 });
        await dalej(strona, '.las');
      }
    }
  },

  async siatka(strona, z) {
    for (const [i, e] of z.elementy.entries()) {
      await stuknij(strona, `.bank .etykieta[data-element="el-${i}"]`, `.siatka__komorka[data-cel="${e.wiersz}|${e.kolumna}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async slupki(strona, z) {
    const ulozone = [...z.skladniki].sort((a, b) => b.procent - a.procent);
    for (const [i, s] of ulozone.entries()) {
      await stuknij(strona, `.bank .etykieta[data-element="${s.id}"]`, `.slupki__pole[data-cel="miejsce-${i + 1}"]`);
    }
    await sprawdzJesliTrzeba(strona);
  },

  async diagnoza(strona, z) {
    for (const p of z.przypadki) {
      await strona.locator(`.diag__skladnik[data-karta="${p.skladnik.opcje.find((o) => o.poprawna).karta}"]`).click();
      await dalej(strona, '.diag');
      await strona.locator(`.diag .dosw__opcja[data-opcja="${p.funkcja.opcje.findIndex((o) => o.poprawna)}"]`).click();
      await dalej(strona, '.diag');
    }
  },
};

export async function rozwiaz(strona, zadanie, dane) {
  const r = ROZWIAZANIA[zadanie.typ];
  if (!r) throw new Error(`Brak rozwiązania dla typu ${zadanie.typ}`);
  await r(strona, zadanie, dane);
}

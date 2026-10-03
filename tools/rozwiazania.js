// Rozwiązywanie zadań w przeglądarce (Playwright) samymi stuknięciami, z odpowiedziami z danych.
// Używane w teście tools/e2e.js: każde zadanie musi dać się ukończyć i dać wynik „wszystko od razu
// dobrze” przy poprawnych odpowiedziach (sprawdza dane, widok i liczenie wyniku).

import { parsujLuki } from '../app/js/components/luki-logika.js';
import { potrzebneWskazowki } from '../app/js/components/detektyw-logika.js';
import { wymagane } from '../app/js/components/konstruktor-logika.js';

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
    for (const w of z.wiersze) {
      for (const k of z.kolumny) {
        const typ = d.typyKomorek.find((t) => t.id === k);
        const pole = strona.locator(`.tabela-zad__pole[data-klucz="${w}|${k}"]`);
        await pole.click();
        if (typ.obecnosc[w] === 'nie') await pole.click();
      }
    }
    await sprawdzJesliTrzeba(strona);
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
};

export async function rozwiaz(strona, zadanie, dane) {
  const r = ROZWIAZANIA[zadanie.typ];
  if (!r) throw new Error(`Brak rozwiązania dla typu ${zadanie.typ}`);
  await r(strona, zadanie, dane);
}

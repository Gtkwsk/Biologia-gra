import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as F from '../app/js/components/fotosynteza-logika.js';

const OPTYMALNE = Object.fromEntries(F.CZYNNIKI.map((c) => [c.id, F.optimum(c.id)]));

test('model fotosyntezy: wszystkie czynniki w optimum dają najwięcej pęcherzyków', () => {
  assert.equal(F.intensywnosc(OPTYMALNE), 1);
  assert.equal(F.pecherzyki(OPTYMALNE), F.MAKS_PECHERZYKOW);
  assert.deepEqual(F.najslabsze(OPTYMALNE), []);
});

test('model fotosyntezy: niedobór i nadmiar każdego czynnika zmniejszają intensywność (TRESCI.md, 2.4)', () => {
  for (const c of F.CZYNNIKI) {
    const opt = F.optimum(c.id);
    for (let poziom = 0; poziom < c.poziomy.length; poziom++) {
      if (poziom === opt) continue;
      const u = { ...OPTYMALNE, [c.id]: poziom };
      assert.ok(F.intensywnosc(u) < 1, `${c.id} na poziomie ${poziom}`);
      assert.equal(F.skutek(u, c.id, opt), 'wzrosnie', `${c.id}: powrót do optimum`);
    }
    // Im dalej od optimum, tym mniej (w obie strony).
    for (let p = 0; p < opt; p++) assert.ok(c.wydajnosc[p] < c.wydajnosc[p + 1], `${c.id}: niedobór rośnie do optimum`);
    for (let p = opt; p < c.poziomy.length - 1; p++) assert.ok(c.wydajnosc[p] > c.wydajnosc[p + 1], `${c.id}: nadmiar maleje od optimum`);
  }
});

test('model fotosyntezy: w ciemności brak pęcherzyków tlenu, woda gazowana daje ich więcej niż woda z kranu', () => {
  assert.equal(F.pecherzyki({ ...OPTYMALNE, swiatlo: 0 }), 0);
  const kran = F.pecherzyki({ ...OPTYMALNE, dwutlenek: 2 });
  const gazowana = F.pecherzyki({ ...OPTYMALNE, dwutlenek: 3 });
  assert.ok(gazowana > kran, `${gazowana} > ${kran}`);
  assert.equal(F.CZYNNIK.dwutlenek.poziomy[3], 'więcej, jak w wodzie gazowanej');
});

test('model fotosyntezy: całość wyznacza czynnik najsłabszy', () => {
  const u = { swiatlo: 2, dwutlenek: 3, temperatura: 2, sole: 0 };
  assert.deepEqual(F.najslabsze(u), ['sole']);
  assert.equal(F.skutek(u, 'swiatlo', 3), 'bez-zmian');
  assert.match(F.wyjasnienieSkutku(u, 'swiatlo', 3), /hamuje teraz inny czynnik: sole mineralne/);
  assert.equal(F.skutek(u, 'sole', 2), 'wzrosnie');
  assert.match(F.wyjasnienieCzynnika('sole', 0), /magnezu/);
});

test('model fotosyntezy: moczarka ma zawsze dość wody', () => {
  assert.equal(F.ustawieniaPelne({ swiatlo: 3 }).woda, F.optimum('woda'));
});

test('plan doświadczenia: próby muszą różnić się dokładnie badanym czynnikiem', () => {
  assert.deepEqual(F.ocenPlan({ swiatlo: 3, dwutlenek: 2 }, { swiatlo: 0, dwutlenek: 2 }, 'swiatlo'), { dobry: true, powod: null, roznice: ['swiatlo'] });
  assert.equal(F.ocenPlan({ swiatlo: 3, dwutlenek: 2 }, { swiatlo: 0, dwutlenek: 3 }, 'swiatlo').powod, 'wiele');
  assert.equal(F.ocenPlan({ swiatlo: 3, dwutlenek: 2 }, { swiatlo: 3, dwutlenek: 2 }, 'swiatlo').powod, 'zadna');
  assert.equal(F.ocenPlan({ swiatlo: 3, dwutlenek: 2 }, { swiatlo: 3, dwutlenek: 3 }, 'swiatlo').powod, 'inny');
});

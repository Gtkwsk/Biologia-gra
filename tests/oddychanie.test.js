// Modele mechanik świata 6: sprint (fermentacja mlekowa w mięśniach) i liść przez dobę.
// Wymagania: TRESCI.md, sekcja 2.6; SPEC.md, sekcja 7 (testy modeli symulacji).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as SP from '../app/js/components/sprint-logika.js';
import * as DB from '../app/js/components/doba-logika.js';

function bieg(etapy) {
  let stan = SP.nowyBieg();
  return etapy.map(([tempo, czas]) => {
    const w = SP.etap(stan, tempo, czas);
    stan = { kwas: w.kwas, etap: w.etap };
    return w;
  });
}

test('sprint: gdy krew nadąża z tlenem, energię daje tylko oddychanie tlenowe i nie ma kwasu mlekowego', () => {
  for (const tempo of ['odpoczynek', 'trucht', 'bieg']) {
    const [w] = bieg([[tempo]]);
    assert.equal(w.niedoborTlenu, false, tempo);
    assert.equal(w.mlekowa, 0, tempo);
    assert.equal(w.tlen, w.zapotrzebowanie, tempo);
    assert.equal(w.kwas, 0, tempo);
  }
});

test('sprint: przy niedoborze tlenu część energii pochodzi z fermentacji mlekowej, a w mięśniach przybywa kwasu mlekowego', () => {
  const [, , w] = bieg([['trucht'], ['bieg'], ['sprint']]);
  assert.equal(w.niedoborTlenu, true);
  assert.equal(w.tlen, SP.MAKS_TLENU, 'oddychanie tlenowe trwa dalej, na ile starcza tlenu');
  assert.ok(w.mlekowa > 0 && w.mlekowa < w.zapotrzebowanie, 'fermentacja daje tylko część energii');
  assert.ok(w.kwas > 0);
  assert.match(SP.opisEtapu(w, 'sprint'), /część energii pochodzi z fermentacji mlekowej/);
});

test('sprint: kwas mlekowy zostaje w mięśniach tuż po wysiłku, a po kilkudziesięciu minutach krew przenosi go do wątroby', () => {
  const [, meta, potem] = bieg([['sprint'], ['odpoczynek'], ['odpoczynek', 'kilkadziesiat-minut']]);
  assert.ok(meta.kwas > 0, 'tuż po wysiłku kwas mlekowy gromadzi się w mięśniach');
  assert.equal(meta.doWatroby, false);
  assert.match(SP.opisEtapu(meta, 'odpoczynek'), /Kwas mlekowy wciąż jest w mięśniach/);
  assert.equal(potem.kwas, 0);
  assert.equal(potem.doWatroby, true);
  assert.match(SP.opisEtapu(potem, 'odpoczynek'), /do wątroby/);
});

test('sprint: poziom kwasu mlekowego nie przekracza skali paska', () => {
  const wyniki = bieg(Array.from({ length: 6 }, () => ['sprint']));
  for (const w of wyniki) assert.ok(w.kwas <= SP.MAKS_KWASU);
  assert.equal(wyniki.at(-1).kwas, SP.MAKS_KWASU);
});

test('liść przez dobę: w dzień fotosynteza i oddychanie, w nocy tylko oddychanie (TRESCI.md, 2.6)', () => {
  assert.deepEqual(new Set(DB.procesy('dzien')), new Set(['fotosynteza', 'oddychanie-komorkowe']));
  assert.deepEqual(DB.procesy('noc'), ['oddychanie-komorkowe']);
  assert.deepEqual(DB.gazy('dzien'), { pobiera: 'dwutlenek-wegla', oddaje: 'tlen' });
  assert.deepEqual(DB.gazy('noc'), { pobiera: 'tlen', oddaje: 'dwutlenek-wegla' });
  assert.equal(DB.poraDnia(DB.PORY.dzien.godzina), 'dzien');
  assert.equal(DB.poraDnia(DB.PORY.noc.godzina), 'noc');
});

test('liść przez dobę: informacja zwrotna podaje przyczynę typowego błędu', () => {
  const bezOddychania = DB.ocenProcesy('dzien', ['fotosynteza']);
  assert.equal(bezOddychania.dobrze, false);
  assert.match(bezOddychania.tekst, /oddychają cały czas/);
  const fotosyntezaWNocy = DB.ocenProcesy('noc', ['fotosynteza', 'oddychanie-komorkowe']);
  assert.equal(fotosyntezaWNocy.dobrze, false);
  assert.match(fotosyntezaWNocy.tekst, /nie ma światła/);
  assert.equal(DB.ocenProcesy('noc', ['oddychanie-komorkowe']).dobrze, true);
  assert.equal(DB.ocenGazy('noc', { pobiera: 'dwutlenek-wegla', oddaje: 'tlen' }).dobrze, false);
  assert.equal(DB.ocenGazy('dzien', { pobiera: 'dwutlenek-wegla', oddaje: 'tlen' }).dobrze, true);
});

test('lustro: informacja zwrotna podaje rolę substancji w obu procesach i kierunek jej wędrówki', async () => {
  const { drogaWLustrze } = await import('../app/js/components/przepis-logika.js');
  const procesy = (await import('../app/data/procesy.js')).default;
  const para = ['fotosynteza', 'oddychanie-tlenowe'].map((id) => procesy.find((p) => p.id === id));
  assert.equal(
    drogaWLustrze('tlen', 'tlen', para),
    'Tlen to produkt fotosyntezy i składnik oddychania tlenowego. Dlatego wędruje od fotosyntezy do oddychania tlenowego.',
  );
  assert.equal(
    drogaWLustrze('dwutlenek-wegla', 'dwutlenek węgla', para),
    'Dwutlenek węgla to produkt oddychania tlenowego i składnik fotosyntezy. Dlatego wędruje od oddychania tlenowego do fotosyntezy.',
  );
  assert.equal(
    drogaWLustrze('swiatlo', 'światło', para),
    'Światło to warunek fotosyntezy. Nie powstaje w oddychaniu tlenowym, więc nie wędruje między procesami.',
  );
  assert.equal(
    drogaWLustrze('energia', 'energia', para),
    'Energia to produkt oddychania tlenowego. Nie jest składnikiem fotosyntezy, więc nie wędruje między procesami.',
  );
});

// Wspólny widok zadań z etykietami (przyporządkowanie, luki, klasyfikacja): bank etykiet
// na tacce, cele na planszy, informacja zwrotna, tryb treningu i sprawdzianu.
// Logika: dopasowanie-logika.js. Przeciąganie i stukanie: przeciaganie.js.
//
// opcje: {
//   klasa, tryb, def (definicja dopasowania), plansza (element DOM z celami),
//   etykiety: [{ id, tekst, ikona? }],
//   celeDoStukania: elementy DOM reagujące na stuknięcie (z atrybutem data-cel),
//   pokazCel(celId, { etykiety, stan, wynikiEtykiet }) – odświeża wygląd celu,
//   komunikaty: { wstep, wybor(etykieta), dobrze(e, c), zle(e, c, proba) → { komunikat, podswietl },
//                 sprawdzian(wynik) → komunikat dla błędu },
//   kartaKlucza(klucz) → id karty atlasu albo null,
//   onKoniec({ poprawne, wszystkie, karty }),
// }

import { h } from '../core/dom.js';
import { utworzPrzeciaganie } from './przeciaganie.js';
import { utworzKomunikat } from './komunikat.js';
import { wymieszaj } from './podpisywanie-logika.js';
import * as D from './dopasowanie-logika.js';

export function utworzZadanieEtykiet(kontener, o) {
  const { klasa, tryb = 'trening', def, plansza, etykiety, celeDoStukania, pokazCel, komunikaty, kartaKlucza, onKoniec } = o;
  let przebieg = D.nowyPrzebieg(def, tryb);
  let zakonczone = false;
  let wynikiEtykiet = new Map();
  const tekstEtykiety = new Map(etykiety.map((e) => [e.id, e.tekst]));
  const komunikat = utworzKomunikat();
  const chipy = new Map();
  const bank = h('div', { class: 'bank', role: 'group', 'aria-label': 'Etykiety' });
  const przyciskSprawdz =
    tryb === 'sprawdzian' ? h('button', { type: 'button', class: 'przycisk', onclick: sprawdzWszystko }, 'Sprawdź') : null;
  const korzen = h('div', { class: `zadanie ${klasa} zadanie--${tryb}` }, [
    plansza,
    h('div', { class: 'tacka' }, [komunikat.el, bank, przyciskSprawdz && h('div', { class: 'tacka__akcje' }, przyciskSprawdz)]),
  ]);

  const przeciaganie = utworzPrzeciaganie({
    korzen,
    aktywne: () => !zakonczone,
    onUpusc: umiesc,
    onStuknijCel: stuknijCel,
    // Zdejmowanie etykiety z celu (tryb sprawdzianu): stuknięcie etykiety leżącej w celu.
    onZdejmij: (id) => {
      if (zakonczone || tryb !== 'sprawdzian') return;
      przebieg = D.zdejmij(przebieg, id);
      odswiez();
    },
    onWybor: (id) => {
      if (id && komunikaty.wybor) komunikat.pokaz(komunikaty.wybor(id));
    },
  });
  for (const e of wymieszaj(etykiety)) {
    const chip = h('button', { type: 'button', class: 'etykieta', 'data-element': e.id }, [
      e.ikona ?? null,
      h('span', { class: 'etykieta__tekst' }, e.tekst),
    ]);
    przeciaganie.podlaczEtykiete(chip, e.id);
    chipy.set(e.id, chip);
    bank.append(chip);
  }
  for (const el of celeDoStukania) przeciaganie.podlaczCel(el);

  kontener.append(korzen);
  odswiez();
  komunikat.pokaz(komunikaty.wstep);

  function stanCelu(cel) {
    const wCelu = D.etykietyWCelu(przebieg, cel);
    if (przebieg.sprawdzone && def.klucze === 'cel') return przebieg.pierwszaDobra[cel] ? 'dobrze' : 'zle';
    if (tryb === 'trening') return wCelu.length && def.klucze === 'cel' ? 'dobrze' : 'puste';
    return wCelu.length ? 'wypelnione' : 'puste';
  }

  function odswiez() {
    for (const cel of def.cele) {
      pokazCel(cel, {
        etykiety: D.etykietyWCelu(przebieg, cel).map((id) => ({ id, tekst: tekstEtykiety.get(id) })),
        stan: stanCelu(cel),
        wynikiEtykiet,
      });
    }
    for (const [id, chip] of chipy) chip.hidden = Boolean(przebieg.przypisania[id]);
  }

  function zaznaczBlad(cel) {
    for (const el of korzen.querySelectorAll(`[data-cel="${cel}"]`)) {
      el.classList.remove('blad');
      void el.getBoundingClientRect();
      el.classList.add('blad');
      setTimeout(() => el.classList.remove('blad'), 700);
    }
  }

  function stuknijCel(cel) {
    if (tryb === 'sprawdzian' && def.pojemnosc === 1) {
      const [lezaca] = D.etykietyWCelu(przebieg, cel);
      if (lezaca) {
        przebieg = D.zdejmij(przebieg, lezaca);
        odswiez();
        return;
      }
    }
    komunikat.pokaz({ rodzaj: 'info', tytul: 'Najpierw wybierz etykietę.', tekst: 'Stuknij etykietę na dole, a potem miejsce.' });
  }

  function umiesc(etykieta, cel) {
    if (zakonczone) return;
    if (tryb === 'sprawdzian') {
      przebieg = D.umiescSprawdzian(def, przebieg, etykieta, cel).przebieg;
      odswiez();
      return;
    }
    const r = D.umiescTrening(def, przebieg, etykieta, cel);
    if (r.wynik === 'zajete') {
      komunikat.pokaz({ rodzaj: 'info', tytul: 'To miejsce jest już zajęte.', tekst: 'Wybierz inne.' });
      return;
    }
    przebieg = r.przebieg;
    for (const chip of chipy.values()) chip.classList.remove('etykieta--podpowiedz');
    if (r.wynik === 'dobrze') {
      komunikat.pokaz(komunikaty.dobrze(etykieta, cel));
    } else {
      const { komunikat: k, podswietl } = komunikaty.zle(etykieta, cel, r.proba);
      komunikat.pokaz(k);
      zaznaczBlad(cel);
      if (podswietl) chipy.get(podswietl)?.classList.add('etykieta--podpowiedz');
    }
    odswiez();
    if (D.czyGotowe(def, przebieg)) zakoncz();
  }

  function sprawdzWszystko() {
    if (zakonczone) return;
    const { przebieg: p, wyniki } = D.sprawdz(def, przebieg);
    przebieg = p;
    wynikiEtykiet = new Map(wyniki.filter((w) => w.etykieta).map((w) => [w.etykieta, w.dobrze ? 'dobrze' : 'zle']));
    odswiez();
    const bledne = wyniki.filter((w) => !w.dobrze).map((w) => komunikaty.sprawdzian(w));
    komunikat.pokazListe(bledne.length ? bledne : [{ rodzaj: 'dobrze', tytul: 'Wszystko poprawnie.' }]);
    przyciskSprawdz.disabled = true;
    zakoncz();
  }

  function zakoncz() {
    zakonczone = true;
    przeciaganie.wyczyscWybor();
    korzen.classList.add('zadanie--gotowe');
    const klucze = D.wynikiKluczy(def, przebieg);
    const karty = klucze
      .map(({ klucz, odRazu }) => ({ karta: kartaKlucza(klucz), odRazu, poprawnie: tryb === 'trening' || odRazu }))
      .filter((k) => k.karta);
    onKoniec?.({ poprawne: klucze.filter((k) => k.odRazu).length, wszystkie: klucze.length, karty });
  }

  return {
    zniszcz() {
      przeciaganie.zniszcz();
      korzen.remove();
    },
  };
}

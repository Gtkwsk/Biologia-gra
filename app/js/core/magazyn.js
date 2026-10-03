// Zapis stanu w localStorage pod jednym kluczem.
// Nieczytelny zapis nie jest nadpisywany bez śladu: trafia pod klucz kopii.

import { nowyStan, odczytajStan } from './stan.js';

export const KLUCZ = 'wyprawa-do-wnetrza-zycia';
export const KLUCZ_KOPII = `${KLUCZ}-kopia-nieczytelna`;

export function utworzMagazyn(storage) {
  return {
    // Zwraca { stan, dostepny, uszkodzony }.
    // dostepny: false, gdy przeglądarka nie pozwala zapisywać (np. tryb prywatny z blokadą).
    wczytaj(dzien) {
      let surowe;
      try {
        surowe = storage.getItem(KLUCZ);
      } catch {
        return { stan: nowyStan(dzien), dostepny: false, uszkodzony: false };
      }
      if (surowe === null || surowe === undefined) {
        return { stan: nowyStan(dzien), dostepny: true, uszkodzony: false };
      }
      try {
        return { stan: odczytajStan(JSON.parse(surowe), dzien), dostepny: true, uszkodzony: false };
      } catch {
        try {
          storage.setItem(KLUCZ_KOPII, surowe);
        } catch {
          // Brak miejsca na kopię: stan startuje od nowa, oryginał zostaje do pierwszego zapisu.
        }
        return { stan: nowyStan(dzien), dostepny: true, uszkodzony: true };
      }
    },

    zapisz(stan) {
      try {
        storage.setItem(KLUCZ, JSON.stringify(stan));
        return true;
      } catch {
        return false;
      }
    },

    usun() {
      try {
        storage.removeItem(KLUCZ);
        return true;
      } catch {
        return false;
      }
    },
  };
}

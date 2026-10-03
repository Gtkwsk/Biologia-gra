// Logika mechaniki „Detektyw komórek” (SPEC.md, sekcja 3.2, świat 3). Funkcje czyste.
//
// Sprawa: { cel: id typu komórki, wskazowki: [id wskazówek w kolejności odsłaniania] }.
// Wskazówki: data/wskazowki.js. Typ jest wykluczony, gdy któraś odsłonięta wskazówka mu przeczy.
// Wskazanie poprawnego typu liczy się jako rozwiązanie „od razu”, gdy było pierwszym wskazaniem
// i odsłonięte wskazówki wykluczały już wszystkie inne typy (bez zgadywania).

import { zdanieKomorki } from './tabela-logika.js';

export function pasujaceTypy(wskazowka, typy) {
  if (wskazowka.pasuje) return new Set(wskazowka.pasuje);
  return new Set(
    typy
      .filter((t) => {
        const o = t.obecnosc[wskazowka.element];
        return o === 'czasem' || o === (wskazowka.jest ? 'tak' : 'nie');
      })
      .map((t) => t.id),
  );
}

export function wyklucza(wskazowka, idTypu, typy) {
  if (wskazowka.nieznane?.includes(idTypu)) return false;
  return !pasujaceTypy(wskazowka, typy).has(idTypu);
}

// Pierwsza odsłonięta wskazówka, która wyklucza typ (albo null).
export function wykluczajaca(idTypu, odsloniete, typy) {
  return odsloniete.find((w) => wyklucza(w, idTypu, typy)) ?? null;
}

export function mozliwe(odsloniete, typy) {
  return typy.filter((t) => !wykluczajaca(t.id, odsloniete, typy)).map((t) => t.id);
}

// Ile wskazówek trzeba odsłonić, żeby został tylko cel (null, gdy wskazówki nie wystarczają).
export function potrzebneWskazowki(sprawa, wskazowkaPoId, typy) {
  for (let k = 1; k <= sprawa.wskazowki.length; k++) {
    const odsl = sprawa.wskazowki.slice(0, k).map((id) => wskazowkaPoId.get(id));
    const m = mozliwe(odsl, typy);
    if (m.length === 1 && m[0] === sprawa.cel) return k;
  }
  return null;
}

// Zdanie wyjaśniające, dlaczego wskazówka wyklucza typ, np. „Komórka zwierzęca nie ma ściany komórkowej.”
export function powodWykluczenia(typ, wskazowka, elementPoId) {
  return zdanieKomorki(typ, elementPoId.get(wskazowka.element));
}

// Lupy za rozwiązanie: 3, gdy wystarczyło minimum wskazówek; mniej za każdą dodatkową.
export function lupy(uzyte, potrzebne) {
  return Math.max(1, 3 - Math.max(0, uzyte - potrzebne));
}

// Ocena wskazania. Zwraca { trafione, pewne, wykluczajaca, takzeMozliwe }.
export function ocenWskazanie(sprawa, odsloniete, wybrany, typy) {
  const m = mozliwe(odsloniete, typy);
  if (wybrany === sprawa.cel) {
    return { trafione: true, pewne: m.length === 1, wykluczajaca: null, takzeMozliwe: m.filter((t) => t !== wybrany) };
  }
  return {
    trafione: false,
    pewne: false,
    wykluczajaca: wykluczajaca(wybrany, odsloniete, typy),
    takzeMozliwe: m.filter((t) => t !== wybrany),
  };
}

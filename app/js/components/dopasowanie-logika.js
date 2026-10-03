// Wspólna logika zadań, w których etykiety trafiają do celów. Funkcje czyste, bez DOM.
//
// definicja: {
//   cele:      lista id celów,
//   etykiety:  lista id etykiet,
//   pasuje(etykieta, cel) → true, jeśli etykieta należy do celu,
//   pojemnosc: ile etykiet mieści cel (1 w przyporządkowaniu i lukach, Infinity w klasyfikacji),
//   klucze:    'cel' – wynik i próby liczone dla każdego celu (przyporządkowanie, luki),
//              'etykieta' – dla każdej etykiety (klasyfikacja),
// }
//
// Tryb „trening”: poprawna etykieta zostaje w celu, błędna wraca do banku; liczy się pierwsza próba.
// Tryb „sprawdzian”: etykiety można przestawiać, ocena po „Sprawdź”.

export function nowyPrzebieg(def, tryb = 'trening') {
  return {
    tryb,
    przypisania: Object.fromEntries(def.etykiety.map((e) => [e, null])),
    proby: {},
    pierwszaDobra: {},
    sprawdzone: false,
  };
}

export function czyDystraktor(def, etykieta) {
  return !def.cele.some((c) => def.pasuje(etykieta, c));
}

function zajetoscCelu(przebieg, cel) {
  return Object.entries(przebieg.przypisania)
    .filter(([, c]) => c === cel)
    .map(([e]) => e);
}

// Zwraca { przebieg, wynik: 'dobrze' | 'zle' | 'zajete', klucz, proba }.
export function umiescTrening(def, przebieg, etykieta, cel) {
  if (!def.cele.includes(cel) || !(etykieta in przebieg.przypisania) || przebieg.przypisania[etykieta]) {
    return { przebieg, wynik: 'zajete', klucz: null, proba: 0 };
  }
  if (zajetoscCelu(przebieg, cel).length >= def.pojemnosc) return { przebieg, wynik: 'zajete', klucz: null, proba: 0 };
  const klucz = def.klucze === 'cel' ? cel : etykieta;
  const proba = (przebieg.proby[klucz] ?? 0) + 1;
  const dobrze = def.pasuje(etykieta, cel);
  return {
    przebieg: {
      ...przebieg,
      proby: { ...przebieg.proby, [klucz]: proba },
      pierwszaDobra: proba === 1 ? { ...przebieg.pierwszaDobra, [klucz]: dobrze } : przebieg.pierwszaDobra,
      przypisania: dobrze ? { ...przebieg.przypisania, [etykieta]: cel } : przebieg.przypisania,
    },
    wynik: dobrze ? 'dobrze' : 'zle',
    klucz,
    proba,
  };
}

// Zwraca { przebieg, wypchnieta } – etykietę, która musiała zwolnić miejsce w pełnym celu.
export function umiescSprawdzian(def, przebieg, etykieta, cel) {
  if (przebieg.sprawdzone || !def.cele.includes(cel) || !(etykieta in przebieg.przypisania)) return { przebieg, wypchnieta: null };
  const przypisania = { ...przebieg.przypisania, [etykieta]: cel };
  let wypchnieta = null;
  const wCelu = Object.entries(przypisania)
    .filter(([e, c]) => c === cel && e !== etykieta)
    .map(([e]) => e);
  if (wCelu.length >= def.pojemnosc) {
    wypchnieta = wCelu[0];
    przypisania[wypchnieta] = null;
  }
  return { przebieg: { ...przebieg, przypisania }, wypchnieta };
}

export function zdejmij(przebieg, etykieta) {
  if (przebieg.sprawdzone || !przebieg.przypisania[etykieta]) return przebieg;
  return { ...przebieg, przypisania: { ...przebieg.przypisania, [etykieta]: null } };
}

export function etykietyWCelu(przebieg, cel) {
  return zajetoscCelu(przebieg, cel);
}

// Ocena w trybie sprawdzianu. Wyniki: [{ klucz, dobrze, etykieta, cel }].
export function sprawdz(def, przebieg) {
  let wyniki;
  if (def.klucze === 'cel') {
    wyniki = def.cele.map((cel) => {
      const [etykieta = null] = zajetoscCelu(przebieg, cel);
      return { klucz: cel, cel, etykieta, dobrze: Boolean(etykieta) && def.pasuje(etykieta, cel) };
    });
  } else {
    wyniki = def.etykiety
      .filter((e) => !czyDystraktor(def, e) || przebieg.przypisania[e])
      .map((etykieta) => {
        const cel = przebieg.przypisania[etykieta];
        return { klucz: etykieta, cel, etykieta, dobrze: Boolean(cel) && def.pasuje(etykieta, cel) };
      });
  }
  return {
    przebieg: { ...przebieg, sprawdzone: true, pierwszaDobra: Object.fromEntries(wyniki.map((w) => [w.klucz, w.dobrze])) },
    wyniki,
  };
}

export function czyGotowe(def, przebieg) {
  if (przebieg.tryb === 'sprawdzian') return przebieg.sprawdzone;
  if (def.klucze === 'cel') {
    return def.cele.every((cel) => zajetoscCelu(przebieg, cel).some((e) => def.pasuje(e, cel)));
  }
  return def.etykiety.filter((e) => !czyDystraktor(def, e)).every((e) => przebieg.przypisania[e] && def.pasuje(e, przebieg.przypisania[e]));
}

// Klucze, które liczą się do wyniku, z informacją, czy były dobrze za pierwszym razem.
export function wynikiKluczy(def, przebieg) {
  const klucze = def.klucze === 'cel' ? def.cele : def.etykiety.filter((e) => !czyDystraktor(def, e));
  return klucze.map((klucz) => ({ klucz, odRazu: przebieg.pierwszaDobra[klucz] === true }));
}

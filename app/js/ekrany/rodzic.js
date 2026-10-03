// Panel rodzica (SPEC.md, sekcja 4.7). Wejście: przytrzymanie logo na mapie
// i proste działanie matematyczne. Teksty panelu są bezosobowe.

import { h, wyczysc } from '../core/dom.js';
import { otwarteSwiaty, statusSwiata, zadaniaSwiata } from '../core/swiaty.js';
import { doEksportu, zImportu, ustawImie, ustawOdblokujWszystkie, ustawDzwiek } from '../core/stan.js';
import { dzisiaj, dataSlownie } from '../core/daty.js';
import { sprawdzianDostepny, sumaPunktow, podsumuj, najslabszePunkty, liczbaPunktow } from '../core/sprawdzian.js';
import { graj } from '../core/dzwieki.js';
import { WERSJA } from '../wersja.js';
import { pasek, powiadom } from './wspolne.js';

const STAN_SWIATA = {
  'w-budowie': 'w budowie',
  zablokowany: 'zablokowany',
  otwarty: 'otwarty',
  pokonany: 'boss pokonany',
};

function czyZainstalowana() {
  return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}

function minuty(ms) {
  const m = Math.round(ms / 60000);
  return m < 1 ? 'poniżej minuty' : `${m} min`;
}

export function render(kontener, ctx) {
  const ekran = h('div', { class: 'ekran ekran--rodzic' });
  kontener.append(ekran);
  if (ctx.panelOdblokowany) panel(ekran, ctx);
  else bramka(ekran, ctx);
  return null;
}

function bramka(ekran, ctx) {
  let wynik = 0;
  const pytanie = h('label', { class: 'bramka__pytanie', for: 'bramka-pole' });
  const pole = h('input', {
    id: 'bramka-pole',
    class: 'pole',
    type: 'text',
    inputmode: 'numeric',
    autocomplete: 'off',
    maxlength: '4',
  });
  const blad = h('p', { class: 'bramka__blad', 'aria-live': 'polite' });
  const losuj = () => {
    const a = 13 + Math.floor(Math.random() * 17);
    const b = 3 + Math.floor(Math.random() * 7);
    wynik = a * b;
    pytanie.textContent = `Ile to ${a} × ${b}?`;
    pole.value = '';
  };
  losuj();
  const formularz = h(
    'form',
    {
      class: 'bramka',
      onsubmit: (e) => {
        e.preventDefault();
        if (Number(pole.value.trim()) === wynik) {
          ctx.panelOdblokowany = true;
          wyczysc(ekran);
          panel(ekran, ctx);
        } else {
          blad.textContent = 'Wynik się nie zgadza. Nowe działanie powyżej.';
          losuj();
          pole.focus();
        }
      },
    },
    [
      h('h1', {}, 'Panel rodzica'),
      h('p', {}, 'Wejście dla dorosłego.'),
      pytanie,
      pole,
      blad,
      h('div', { class: 'przyciski' }, [
        h('button', { type: 'submit', class: 'przycisk' }, 'Wejdź'),
        h('a', { class: 'przycisk przycisk--jasny', href: '#/' }, 'Wróć do gry'),
      ]),
    ],
  );
  ekran.append(pasek({ wstecz: { tekst: 'Gra', href: '#/' } }), formularz);
}

function panel(ekran, ctx) {
  const odswiez = () => {
    wyczysc(ekran);
    panel(ekran, ctx);
  };
  const { swiaty } = ctx.dane;
  const stan = ctx.stan;
  const otwarte = otwarteSwiaty(swiaty, stan);

  // Postęp w światach
  const wiersze = swiaty.map((sw) => {
    const zadania = zadaniaSwiata(sw);
    const zrobione = zadania.filter((id) => stan.zadania[id]?.proby > 0);
    const srednia = zrobione.length
      ? Math.round((100 * zrobione.reduce((s, id) => s + stan.zadania[id].najlepszy, 0)) / zrobione.length)
      : null;
    return h('tr', {}, [
      h('th', { scope: 'row' }, `${sw.id}. ${sw.tytul}`),
      h('td', {}, STAN_SWIATA[statusSwiata(sw, stan, otwarte)]),
      h('td', {}, zadania.length ? `${zrobione.length} z ${zadania.length}` : '–'),
      h('td', {}, srednia === null ? '–' : `${srednia}%`),
    ]);
  });

  // Pomyłki
  const pomylki = Object.entries(stan.pomylki)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const nazwa = (id) => ctx.dane.katalog.get(id)?.nazwa ?? id;

  // Ustawienia
  const poleImienia = h('input', { id: 'imie', class: 'pole', type: 'text', value: stan.ustawienia.imie, maxlength: '30', autocomplete: 'off' });
  const formImie = h(
    'form',
    {
      class: 'ustawienie',
      onsubmit: (e) => {
        e.preventDefault();
        ctx.zmien((st) => ustawImie(st, poleImienia.value));
        powiadom('Zapisano imię gracza.');
        odswiez();
      },
    },
    [h('label', { for: 'imie' }, 'Imię gracza'), h('div', { class: 'ustawienie__wiersz' }, [poleImienia, h('button', { type: 'submit', class: 'przycisk przycisk--maly' }, 'Zapisz')])],
  );
  const przelacznikDzwieku = h('input', {
    id: 'dzwiek',
    type: 'checkbox',
    checked: stan.ustawienia.dzwiek,
    onchange: (e) => {
      ctx.zmien((st) => ustawDzwiek(st, e.target.checked));
      graj('dobrze');
      odswiez();
    },
  });
  const przelacznik = h('input', {
    id: 'odblokuj',
    type: 'checkbox',
    checked: stan.ustawienia.odblokujWszystkie,
    onchange: (e) => {
      ctx.zmien((st) => ustawOdblokujWszystkie(st, e.target.checked));
      odswiez();
    },
  });

  // Próbny sprawdzian: ostatnie wyniki, tematy ostatniego podejścia i najsłabsze tematy
  const { sprawdzian } = ctx.dane;
  const maksSprawdzianu = sumaPunktow(sprawdzian);
  const nazwaTematu = (n) => sprawdzian.find((p) => p.punkt === n)?.nazwa ?? `temat ${n}`;
  const ostatni = stan.sprawdziany.at(-1);
  const najslabsze = najslabszePunkty(stan.sprawdziany).slice(0, 4);
  const sekcjaSprawdzianu = h('section', { class: 'panel-sekcja' }, [
    h('h2', {}, 'Próbny sprawdzian'),
    ...(ostatni
      ? [
          h('p', {}, `Podejścia: ${stan.sprawdziany.length}. Ostatnie wyniki (od najnowszego): ${stan.sprawdziany
            .slice(-5)
            .reverse()
            .map((s) => `${podsumuj(s).zdobyte} z ${podsumuj(s).maks} (${dataSlownie(s.dzien)})`)
            .join('; ')}.`),
          h('h3', {}, 'Ostatnie podejście'),
          h('div', { class: 'tabela-przewijana' }, [
            h('table', { class: 'tabela' }, [
              h('thead', {}, h('tr', {}, [h('th', { scope: 'col' }, 'Temat sprawdzianu'), h('th', { scope: 'col' }, 'Punkty')])),
              h('tbody', {}, ostatni.zadania.map((z) => h('tr', {}, [h('th', { scope: 'row' }, `${z.punkt}. ${nazwaTematu(z.punkt)}`), h('td', {}, `${z.zdobyte} z ${z.maks}`)]))),
            ]),
          ]),
          najslabsze.length
            ? h('p', {}, [
                h('strong', {}, 'Najsłabsze tematy w ostatnich podejściach (najwyżej trzech; część zdobytych punktów): '),
                `${najslabsze.map((p) => `${p.punkt}. ${nazwaTematu(p.punkt)}: ${Math.round(p.czesc * 100)}%`).join('; ')}.`,
              ])
            : h('p', {}, 'W ostatnich podejściach wszystkie tematy bez straty punktów.'),
        ]
      : [
          h(
            'p',
            {},
            sprawdzianDostepny(ctx.dane.swiaty, stan)
              ? `Próbny sprawdzian (${liczbaPunktow(maksSprawdzianu)}) nie był jeszcze rozwiązywany. Wejście: Baza, „Próbny sprawdzian”.`
              : `Próbny sprawdzian (${liczbaPunktow(maksSprawdzianu)}) otworzy się po pokonaniu bossów wszystkich światów albo po włączeniu odblokowania w ustawieniach.`,
          ),
        ]),
    h('p', { class: 'panel-uwaga' }, 'Rozkład punktów na zadania jest przyjęty w grze, bez wzoru z podręcznika, więc wynik jest orientacyjny.'),
  ]);

  // Domowe laboratorium
  const zrobione = ctx.dane.laboratorium.filter((d) => stan.laboratorium[d.id]);
  const sekcjaLaboratorium = h('section', { class: 'panel-sekcja' }, [
    h('h2', {}, 'Domowe laboratorium'),
    h('p', {}, `Doświadczenia oznaczone jako zrobione z dorosłym: ${zrobione.length} z ${ctx.dane.laboratorium.length}.`),
    zrobione.length
      ? h('ul', { class: 'lista-opisow' }, zrobione.map((d) => h('li', {}, [h('strong', {}, d.nazwa), `: ${dataSlownie(stan.laboratorium[d.id])}`])))
      : null,
  ]);

  // Kopia postępu
  const plik = h('input', {
    type: 'file',
    accept: '.json,application/json',
    class: 'ukryte',
    onchange: async (e) => {
      const f = e.target.files?.[0];
      e.target.value = '';
      if (!f) return;
      try {
        const nowy = zImportu(await f.text(), dzisiaj());
        if (!confirm('Wczytać kopię? Obecny postęp na tym urządzeniu zostanie zastąpiony.')) return;
        ctx.zastap(nowy);
        powiadom('Wczytano kopię postępu.');
        odswiez();
      } catch (blad) {
        powiadom(blad.message || 'Nie udało się wczytać pliku.', 'blad');
      }
    },
  });

  // Instalacja i ochrona zapisu
  const ochrona = h('p', {}, 'Sprawdzanie ochrony zapisu…');
  const przyciskOchrony = h(
    'button',
    {
      type: 'button',
      class: 'przycisk przycisk--maly przycisk--jasny',
      hidden: true,
      onclick: async () => {
        const ok = await navigator.storage?.persist?.().catch(() => false);
        powiadom(ok ? 'Przeglądarka chroni teraz zapis.' : 'Przeglądarka nie zgodziła się na ochronę zapisu.');
        odswiez();
      },
    },
    'Poproś o ochronę zapisu',
  );
  Promise.resolve(navigator.storage?.persisted?.())
    .then((tak) => {
      if (tak) ochrona.textContent = 'Przeglądarka chroni zapis przed automatycznym usunięciem.';
      else {
        ochrona.textContent = 'Przeglądarka może usunąć zapis, gdy zabraknie miejsca na urządzeniu.';
        przyciskOchrony.hidden = !navigator.storage?.persist;
      }
    })
    .catch(() => {
      ochrona.textContent = 'Brak informacji o ochronie zapisu.';
    });

  // Usuwanie postępu
  const potwierdzenie = h('div', { class: 'potwierdzenie', hidden: true }, [
    h('p', {}, 'Usunąć cały postęp na tym urządzeniu? Tego nie da się cofnąć.'),
    h('div', { class: 'przyciski' }, [
      h(
        'button',
        {
          type: 'button',
          class: 'przycisk przycisk--niebezpieczny',
          onclick: () => {
            ctx.usunPostep();
            powiadom('Postęp usunięty.');
            odswiez();
          },
        },
        'Usuń postęp',
      ),
      h('button', { type: 'button', class: 'przycisk przycisk--jasny', onclick: () => (potwierdzenie.hidden = true) }, 'Anuluj'),
    ]),
  ]);

  ekran.append(
    pasek({ wstecz: { tekst: 'Gra', href: '#/' } }),
    h('h1', {}, 'Panel rodzica'),
    h('section', { class: 'panel-sekcja' }, [
      h('h2', {}, 'Postęp w światach'),
      h('div', { class: 'tabela-przewijana' }, [
        h('table', { class: 'tabela' }, [
          h('thead', {}, h('tr', {}, [h('th', { scope: 'col' }, 'Świat'), h('th', { scope: 'col' }, 'Stan'), h('th', { scope: 'col' }, 'Wyzwania'), h('th', { scope: 'col' }, 'Najlepszy wynik (średnio)')])),
          h('tbody', {}, wiersze),
        ]),
      ]),
      h('p', {}, `Czas w wyzwaniach: ${minuty(stan.czasMs)}.`),
    ]),
    sekcjaSprawdzianu,
    h('section', { class: 'panel-sekcja' }, [
      h('h2', {}, 'Najczęstsze pomyłki'),
      pomylki.length
        ? h('ol', { class: 'lista-opisow' }, pomylki.map(([id, n]) => h('li', {}, [h('strong', {}, nazwa(id)), `: ${n}`])))
        : h('p', {}, 'Brak pomyłek.'),
    ]),
    h('section', { class: 'panel-sekcja' }, [
      h('h2', {}, 'Ustawienia'),
      formImie,
      h('div', { class: 'ustawienie ustawienie--przelacznik' }, [przelacznikDzwieku, h('label', { for: 'dzwiek' }, 'Dźwięki w grze (krótkie sygnały po odpowiedziach i na końcu zadań)')]),
      h('div', { class: 'ustawienie ustawienie--przelacznik' }, [
        przelacznik,
        h('label', { for: 'odblokuj' }, 'Odblokowanie wszystkich gotowych światów i próbnego sprawdzianu (bez pokonywania bossów)'),
      ]),
    ]),
    sekcjaLaboratorium,
    h('section', { class: 'panel-sekcja' }, [
      h('h2', {}, 'Kopia postępu'),
      h('p', {}, 'Postęp jest zapisany tylko na tym urządzeniu. Kopia w pliku pozwala go przenieść albo odtworzyć.'),
      h('div', { class: 'przyciski' }, [
        h('button', { type: 'button', class: 'przycisk przycisk--maly', onclick: () => eksportuj(ctx) }, 'Zapisz kopię do pliku'),
        h('button', { type: 'button', class: 'przycisk przycisk--maly przycisk--jasny', onclick: () => plik.click() }, 'Wczytaj kopię z pliku'),
        plik,
      ]),
    ]),
    h('section', { class: 'panel-sekcja' }, [
      h('h2', {}, 'Instalacja i zapis'),
      h('p', {}, czyZainstalowana() ? 'Gra jest zainstalowana na ekranie głównym.' : 'Gra jest otwarta w przeglądarce, bez instalacji.'),
      ochrona,
      przyciskOchrony,
      h('ul', { class: 'lista-opisow' }, [
        h('li', {}, [h('strong', {}, 'iPad, Safari: '), 'przycisk Udostępnij, potem „Do ekranu początkowego”.']),
        h('li', {}, [h('strong', {}, 'Android, Chrome: '), 'menu ⋮, potem „Zainstaluj aplikację” albo „Dodaj do ekranu głównego”.']),
      ]),
      h('p', {}, 'W Safari dane stron nieotwieranych przez 7 dni mogą zostać usunięte. Gra dodana do ekranu początkowego jest przed tym chroniona.'),
    ]),
    h('section', { class: 'panel-sekcja' }, [
      h('h2', {}, 'Usuwanie postępu'),
      h('button', { type: 'button', class: 'przycisk przycisk--maly przycisk--niebezpieczny', onclick: () => (potwierdzenie.hidden = false) }, 'Usuń cały postęp'),
      potwierdzenie,
    ]),
    h('p', { class: 'panel-wersja' }, `Wersja gry: ${WERSJA}`),
    h('div', { class: 'przyciski' }, [
      h(
        'a',
        {
          class: 'przycisk',
          href: '#/',
          onclick: () => {
            ctx.panelOdblokowany = false;
          },
        },
        'Wróć do gry',
      ),
    ]),
  );
}

async function eksportuj(ctx) {
  const nazwaPliku = `wyprawa-postep-${dzisiaj()}.json`;
  const tresc = doEksportu(ctx.stan, dzisiaj());
  const plik = new File([tresc], nazwaPliku, { type: 'application/json' });
  // Na iPadzie w zainstalowanej grze pobieranie bywa zawodne: wtedy arkusz udostępniania.
  if (navigator.canShare?.({ files: [plik] })) {
    try {
      await navigator.share({ files: [plik], title: nazwaPliku });
      return;
    } catch (e) {
      if (e?.name === 'AbortError') return;
    }
  }
  const adres = URL.createObjectURL(plik);
  const link = h('a', { href: adres, download: nazwaPliku, class: 'ukryte' });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(adres), 2000);
}

// Koniec wyprawy: co poszło od razu, co do poćwiczenia (SPEC.md, sekcja 2, zasada 7).

import { h } from '../core/dom.js';
import { kartyZBledem, kartyOdRazu } from '../core/karty.js';
import { pasek } from './wspolne.js';

export function render(kontener, ctx) {
  const wyniki = ctx.sesja.wyniki;
  const element = (id) => ctx.dane.katalog.get(id);
  const doCwiczenia = [...new Set(wyniki.flatMap(kartyZBledem))];
  const opanowane = [...new Set(wyniki.flatMap(kartyOdRazu))].filter((id) => !doCwiczenia.includes(id));
  const poprawne = wyniki.reduce((suma, w) => suma + w.poprawne, 0);
  const wszystkie = wyniki.reduce((suma, w) => suma + w.wszystkie, 0);

  const tresc = wyniki.length
    ? [
        h('p', { class: 'podsumowanie__wynik' }, `Ukończone wyzwania: ${wyniki.length}. Od razu dobrze: ${poprawne} z ${wszystkie}.`),
        opanowane.length
          ? h('section', { class: 'podsumowanie__sekcja' }, [
              h('h2', {}, 'Rozpoznane od razu'),
              h('ul', { class: 'lista-etykiet' }, opanowane.map((id) => h('li', { class: 'znaczek znaczek--dobrze' }, element(id)?.nazwa ?? id))),
            ])
          : null,
        doCwiczenia.length
          ? h('section', { class: 'podsumowanie__sekcja' }, [
              h('h2', {}, 'Do poćwiczenia następnym razem'),
              h(
                'ul',
                { class: 'lista-opisow' },
                doCwiczenia.map((id) => {
                  const e = element(id);
                  return h('li', {}, [h('strong', {}, e?.nazwa ?? id), e ? `: ${e.opis}.` : '']);
                }),
              ),
            ])
          : null,
      ]
    : [h('p', {}, 'W tej wyprawie nie ma jeszcze ukończonych wyzwań.')];

  kontener.append(
    h('div', { class: 'ekran ekran--podsumowanie' }, [
      pasek({}),
      h('section', { class: 'podsumowanie' }, [
        h('h1', {}, 'Dzisiejsza wyprawa zakończona'),
        ...tresc,
        h('div', { class: 'przyciski' }, [
          h(
            'button',
            {
              type: 'button',
              class: 'przycisk przycisk--dalej',
              onclick: () => {
                ctx.nowaSesja();
                ctx.nawiguj({ ekran: 'mapa' });
              },
            },
            'Wróć na mapę',
          ),
        ]),
      ]),
    ]),
  );
  return null;
}

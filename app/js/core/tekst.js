// Pomocnicze funkcje tekstowe (polszczyzna w komunikatach).

// „a”, „a i b”, „a, b i c”
export function wyliczenie(lista) {
  if (lista.length <= 1) return lista.join('');
  return `${lista.slice(0, -1).join(', ')} i ${lista.at(-1)}`;
}

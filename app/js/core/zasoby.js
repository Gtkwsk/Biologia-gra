// Wczytywanie plików tekstowych gry (rysunki SVG) z pamięcią podręczną w obrębie sesji.

const pamiec = new Map();

export async function wczytajTekst(plik) {
  if (!pamiec.has(plik)) {
    const odpowiedz = await fetch(plik);
    if (!odpowiedz.ok) throw new Error(`HTTP ${odpowiedz.status}`);
    pamiec.set(plik, await odpowiedz.text());
  }
  return pamiec.get(plik);
}

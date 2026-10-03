// Daty jako lokalne napisy RRRR-MM-DD: zmiana czasu i strefa nie przesuwają dnia.

export function dzisiaj(data = new Date()) {
  const r = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const d = String(data.getDate()).padStart(2, '0');
  return `${r}-${m}-${d}`;
}

const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

// „2026-10-03” → „3 października 2026”; inny napis zostaje bez zmian.
export function dataSlownie(dzien) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dzien ?? '');
  if (!m) return dzien ?? '';
  return `${Number(m[3])} ${MIESIACE[Number(m[2]) - 1]} ${m[1]}`;
}

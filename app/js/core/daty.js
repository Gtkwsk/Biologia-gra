// Daty jako lokalne napisy RRRR-MM-DD: zmiana czasu i strefa nie przesuwają dnia.

export function dzisiaj(data = new Date()) {
  const r = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const d = String(data.getDate()).padStart(2, '0');
  return `${r}-${m}-${d}`;
}

// Wspólny mechanizm etykiet dla zadań: etykietę przeciąga się palcem albo myszą na cel
// albo stuka etykietę, a potem cel. Cel to element z atrybutem data-cel wewnątrz korzenia.
//
// Stuknięcia są rozpoznawane ze zdarzeń wskaźnika: Chrome po przeciągnięciu ukrytego potem
// elementu potrafi pominąć „click” przy następnym stuknięciu. „click” zostaje dla klawiatury
// i czytników ekranu, a tuż po obsłużonym stuknięciu jest pomijany.

const PROG_RUCHU = 8;
const OKNO_STUKNIECIA_MS = 700;

// onZdejmij(id): stuknięcie etykiety leżącej w celu (atrybut data-zdejmij), gdy nie wybrano innej
// etykiety. Gdy etykieta jest wybrana, stuknięcie w obrębie celu umieszcza ją w tym celu.
export function utworzPrzeciaganie({ korzen, aktywne = () => true, onUpusc, onWybor, onStuknijCel, onZdejmij }) {
  let wybrana = null;
  let przeciaganie = null;
  let tlumKlikniecie = false;
  const etykiety = new Map();
  const ostatnieStukniecie = new WeakMap();
  const swiezeStukniecie = (el) => performance.now() - (ostatnieStukniecie.get(el) ?? -Infinity) < OKNO_STUKNIECIA_MS;

  function elementyCelu(celId) {
    return korzen.querySelectorAll(`[data-cel="${celId}"]`);
  }

  function ustawWybor(id) {
    wybrana = id;
    for (const [eid, el] of etykiety) el.setAttribute('aria-pressed', String(eid === wybrana));
    korzen.classList.toggle('wybor-aktywny', Boolean(wybrana));
    onWybor?.(wybrana);
  }

  function przelaczWybor(id) {
    if (!aktywne()) return;
    ustawWybor(wybrana === id ? null : id);
  }

  function stuknijCel(celId) {
    if (!aktywne()) return;
    if (wybrana) {
      const id = wybrana;
      ustawWybor(null);
      onUpusc(id, celId);
      return;
    }
    onStuknijCel?.(celId);
  }

  function domyslnyCel(e) {
    if (!wybrana && e.target.closest?.('[data-zdejmij]')) return null;
    return e.target.closest?.('[data-cel]')?.dataset.cel ?? null;
  }

  function zdejmowana(e) {
    if (wybrana) return null;
    return e.target.closest?.('[data-zdejmij]')?.dataset.zdejmij ?? null;
  }

  // Stuknięcie celu (pole, numer na rysunku, kolumna).
  function podlaczCel(el, ustalCel = domyslnyCel) {
    let start = null;
    const zdejmij = (id) => {
      if (aktywne()) onZdejmij?.(id);
    };
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      start = { id: e.pointerId, x: e.clientX, y: e.clientY, cel: ustalCel(e), zdejmij: zdejmowana(e) };
    });
    el.addEventListener('pointerup', (e) => {
      const st = start;
      start = null;
      if (!st || e.pointerId !== st.id || Math.hypot(e.clientX - st.x, e.clientY - st.y) >= PROG_RUCHU) return;
      if (st.zdejmij && zdejmowana(e) === st.zdejmij) {
        ostatnieStukniecie.set(el, performance.now());
        zdejmij(st.zdejmij);
        return;
      }
      if (!st.cel || ustalCel(e) !== st.cel) return;
      ostatnieStukniecie.set(el, performance.now());
      stuknijCel(st.cel);
    });
    el.addEventListener('pointercancel', () => {
      start = null;
    });
    el.addEventListener('click', (e) => {
      if (swiezeStukniecie(el)) return;
      const id = zdejmowana(e);
      if (id) return zdejmij(id);
      const cel = ustalCel(e);
      if (cel) stuknijCel(cel);
    });
  }

  function podlaczEtykiete(el, id) {
    etykiety.set(id, el);
    el.dataset.etykieta = id;
    el.setAttribute('aria-pressed', 'false');
    el.addEventListener('pointerdown', poczatek);
    el.addEventListener('click', () => {
      if (!tlumKlikniecie && !swiezeStukniecie(el)) przelaczWybor(id);
    });
  }

  // ---------- Przeciąganie ----------

  function celPod(x, y) {
    const el = document.elementFromPoint(x, y);
    const cel = el?.closest?.('[data-cel]');
    return cel && korzen.contains(cel) ? cel.dataset.cel : null;
  }

  function podswietl(celId) {
    if (przeciaganie.cel === celId) return;
    if (przeciaganie.cel) for (const el of elementyCelu(przeciaganie.cel)) el.classList.remove('cel');
    przeciaganie.cel = celId;
    if (celId) for (const el of elementyCelu(celId)) el.classList.add('cel');
  }

  function utworzDucha(el) {
    const r = el.getBoundingClientRect();
    const duch = el.cloneNode(true);
    duch.classList.add('etykieta--duch');
    duch.removeAttribute('aria-pressed');
    duch.removeAttribute('data-etykieta');
    duch.setAttribute('aria-hidden', 'true');
    duch.style.width = `${r.width}px`;
    document.body.append(duch);
    return { el: duch, szer: r.width, wys: r.height };
  }

  function przesunDucha(x, y) {
    const { duch, dotyk } = przeciaganie;
    // Przy dotyku etykieta unosi się nad palcem, żeby było ją widać.
    const odstep = dotyk ? duch.wys + 22 : duch.wys / 2;
    duch.el.style.transform = `translate(${x - duch.szer / 2}px, ${y - odstep}px) rotate(-3deg)`;
  }

  function poczatek(e) {
    if (!aktywne() || przeciaganie || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const el = e.currentTarget;
    przeciaganie = {
      el,
      etykieta: el.dataset.etykieta,
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      dotyk: e.pointerType !== 'mouse',
      ruszyl: false,
      duch: null,
      cel: null,
    };
    el.setPointerCapture?.(e.pointerId);
    el.addEventListener('pointermove', ruch);
    el.addEventListener('pointerup', koniec);
    el.addEventListener('pointercancel', sprzatnij);
  }

  function ruch(e) {
    const p = przeciaganie;
    if (!p || e.pointerId !== p.id) return;
    if (!p.ruszyl) {
      if (Math.hypot(e.clientX - p.x0, e.clientY - p.y0) < PROG_RUCHU) return;
      p.ruszyl = true;
      p.duch = utworzDucha(p.el);
      p.el.classList.add('etykieta--w-ruchu');
      if (wybrana) ustawWybor(null);
    }
    przesunDucha(e.clientX, e.clientY);
    podswietl(celPod(e.clientX, e.clientY));
  }

  function sprzatnij() {
    const p = przeciaganie;
    if (!p) return;
    p.el.removeEventListener('pointermove', ruch);
    p.el.removeEventListener('pointerup', koniec);
    p.el.removeEventListener('pointercancel', sprzatnij);
    p.el.classList.remove('etykieta--w-ruchu');
    if (p.cel) podswietl(null);
    p.duch?.el.remove();
    przeciaganie = null;
  }

  function koniec(e) {
    const p = przeciaganie;
    if (!p || e.pointerId !== p.id) return;
    const ruszyl = p.ruszyl;
    const cel = ruszyl ? celPod(e.clientX, e.clientY) : null;
    sprzatnij();
    if (!ruszyl) {
      ostatnieStukniecie.set(p.el, performance.now());
      przelaczWybor(p.etykieta);
      return;
    }
    // Po przeciągnięciu przeglądarka może jeszcze wysłać „click” na etykietę.
    tlumKlikniecie = true;
    setTimeout(() => {
      tlumKlikniecie = false;
    }, 0);
    if (cel && aktywne()) onUpusc(p.etykieta, cel);
  }

  return {
    podlaczEtykiete,
    podlaczCel,
    wybrana: () => wybrana,
    wyczyscWybor: () => ustawWybor(null),
    zniszcz: sprzatnij,
  };
}

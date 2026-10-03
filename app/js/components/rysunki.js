// Rysunki kart: elementy komórek, typy komórek, kształty komórek, pojęcia.
// Rysunki własne (SPEC.md, sekcja 6.2), viewBox 0 0 100 100, kolory jak na schematach komórek.

const R = {
  // ---------- Elementy komórek ----------
  'blona-komorkowa': `
    <path d="M50 12 C76 11 90 30 89 52 C88 75 70 89 48 88 C25 87 11 70 12 48 C13 27 28 13 50 12Z" fill="#FDEBEF"/>
    <path d="M50 12 C76 11 90 30 89 52 C88 75 70 89 48 88 C25 87 11 70 12 48 C13 27 28 13 50 12Z" fill="none" stroke="#9E3B5B" stroke-width="7"/>`,
  cytozol: `
    <path d="M50 12 C76 11 90 30 89 52 C88 75 70 89 48 88 C25 87 11 70 12 48 C13 27 28 13 50 12Z" fill="#F7C9D5" stroke="#E7B0BF" stroke-width="2" stroke-dasharray="4 4"/>
    <g fill="#C98FA1"><circle cx="35" cy="35" r="2.5"/><circle cx="62" cy="30" r="2"/><circle cx="70" cy="58" r="2.5"/><circle cx="40" cy="66" r="2"/><circle cx="52" cy="50" r="2"/></g>`,
  'jadro-komorkowe': `
    <ellipse cx="50" cy="50" rx="36" ry="32" fill="#D6C4EE" stroke="#4E3684" stroke-width="4"/>
    <g fill="none" stroke="#8E6CC0" stroke-width="3" stroke-linecap="round">
      <path d="M30 42 q8 -10 18 -2 t16 3"/><path d="M36 62 q10 8 20 0 t16 5"/><path d="M56 32 q6 6 13 1"/>
    </g>`,
  mitochondrium: `
    <g transform="rotate(-25 50 50)">
      <ellipse cx="50" cy="50" rx="40" ry="20" fill="#F7B267" stroke="#8F4A0C" stroke-width="4"/>
      <path d="M20 50 q6 -13 12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#8F4A0C" stroke-width="3" stroke-linejoin="round"/>
    </g>`,
  rybosomy: `
    <g fill="#4B3A78">
      <circle cx="38" cy="36" r="6"/><circle cx="58" cy="30" r="6"/><circle cx="70" cy="48" r="6"/>
      <circle cx="50" cy="52" r="6"/><circle cx="32" cy="58" r="6"/><circle cx="56" cy="70" r="6"/><circle cx="74" cy="70" r="6"/>
    </g>`,
  'siateczka-srodplazmatyczna': `
    <g fill="none" stroke-linecap="round">
      <g stroke="#2F6F94" stroke-width="10"><path d="M18 20 Q50 34 82 20"/><path d="M18 46 Q50 60 82 46"/><path d="M18 72 Q50 86 82 72"/><path d="M50 27 V53"/><path d="M36 54 V80"/><path d="M66 54 V80"/></g>
      <g stroke="#A9DBF2" stroke-width="5"><path d="M18 20 Q50 34 82 20"/><path d="M18 46 Q50 60 82 46"/><path d="M18 72 Q50 86 82 72"/><path d="M50 27 V53"/><path d="M36 54 V80"/><path d="M66 54 V80"/></g>
    </g>`,
  'aparat-golgiego': `
    <g fill="none" stroke-linecap="round">
      <g stroke="#8C6A0C" stroke-width="12"><path d="M16 34 Q50 16 84 34"/><path d="M20 50 Q50 33 80 50"/><path d="M25 66 Q50 50 75 66"/></g>
      <g stroke="#F6D56B" stroke-width="7"><path d="M16 34 Q50 16 84 34"/><path d="M20 50 Q50 33 80 50"/><path d="M25 66 Q50 50 75 66"/></g>
    </g>
    <g fill="#F6D56B" stroke="#8C6A0C" stroke-width="2.5"><circle cx="12" cy="20" r="6"/><circle cx="88" cy="22" r="6"/><circle cx="84" cy="78" r="5.5"/><circle cx="18" cy="80" r="5.5"/></g>`,
  wakuola: `
    <circle cx="50" cy="50" r="34" fill="#D7F0F7" stroke="#2F7F99" stroke-width="4"/>
    <path d="M32 40 q5 -10 15 -12" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>`,
  'sciana-komorkowa': `
    <rect x="10" y="14" width="80" height="72" rx="10" fill="#F2F7EC" stroke="#4F6B2E" stroke-width="10"/>
    <rect x="21" y="25" width="58" height="50" rx="5" fill="#E9F5DF" stroke="#9E3B5B" stroke-width="2.5"/>`,
  chloroplast: `
    <g transform="rotate(-20 50 50)">
      <ellipse cx="50" cy="50" rx="40" ry="22" fill="#3C9A47" stroke="#1F5A32" stroke-width="4"/>
      <g fill="#1F5A32"><rect x="26" y="40" width="12" height="5" rx="2"/><rect x="26" y="49" width="12" height="5" rx="2"/><rect x="44" y="36" width="12" height="5" rx="2"/><rect x="44" y="45" width="12" height="5" rx="2"/><rect x="44" y="54" width="12" height="5" rx="2"/><rect x="62" y="43" width="12" height="5" rx="2"/><rect x="62" y="52" width="12" height="5" rx="2"/></g>
    </g>`,
  'nic-dna': `
    <path d="M22 48 C22 26 48 20 60 30 C74 42 52 52 42 46 C30 38 42 22 60 22 C82 22 86 50 72 62 C58 74 34 72 30 60 C26 48 44 44 54 54 C64 64 58 80 40 80" fill="none" stroke="#6B3FA0" stroke-width="5" stroke-linecap="round"/>`,
  'otoczka-sluzowa': `
    <rect x="8" y="24" width="84" height="52" rx="26" fill="#F3F7C8" stroke="#B9C24A" stroke-width="3" stroke-dasharray="6 4"/>
    <rect x="20" y="34" width="60" height="32" rx="16" fill="#E8F3D8" stroke="#5E7B3A" stroke-width="5"/>`,
  rzeska: `
    <rect x="8" y="34" width="44" height="32" rx="16" fill="#E8F3D8" stroke="#5E7B3A" stroke-width="5"/>
    <path d="M52 50 q8 -12 16 0 t16 0 t12 -4" fill="none" stroke="#4B3A78" stroke-width="5" stroke-linecap="round"/>`,

  // ---------- Typy komórek ----------
  'komorka-zwierzeca': `
    <path d="M50 10 C76 9 91 28 90 51 C89 76 70 91 47 90 C23 89 9 71 10 48 C11 26 27 11 50 10Z" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="4"/>
    <ellipse cx="46" cy="50" rx="16" ry="14" fill="#D6C4EE" stroke="#4E3684" stroke-width="3"/>
    <ellipse cx="72" cy="38" rx="9" ry="4.5" transform="rotate(60 72 38)" fill="#F7B267" stroke="#8F4A0C" stroke-width="2"/>
    <ellipse cx="36" cy="76" rx="8" ry="4" transform="rotate(-15 36 76)" fill="#F7B267" stroke="#8F4A0C" stroke-width="2"/>
    <g fill="#D7F0F7" stroke="#2F7F99" stroke-width="2"><circle cx="28" cy="32" r="5"/><circle cx="70" cy="70" r="4.5"/></g>`,
  'komorka-roslinna': `
    <rect x="10" y="12" width="80" height="76" rx="6" fill="#F2F7EC" stroke="#4F6B2E" stroke-width="7"/>
    <rect x="18" y="20" width="64" height="60" rx="4" fill="#E9F5DF" stroke="#9E3B5B" stroke-width="2"/>
    <rect x="34" y="30" width="40" height="42" rx="12" fill="#D7F0F7" stroke="#2F7F99" stroke-width="2.5"/>
    <ellipse cx="25" cy="34" rx="6" ry="7" fill="#D6C4EE" stroke="#4E3684" stroke-width="2"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="1.5"><ellipse cx="27" cy="58" rx="5" ry="3.5"/><ellipse cx="25" cy="72" rx="5" ry="3.5"/><ellipse cx="50" cy="25" rx="5" ry="3.5"/><ellipse cx="68" cy="76" rx="5" ry="3.5"/><ellipse cx="78" cy="44" rx="3.5" ry="5"/></g>`,
  'komorka-grzybowa': `
    <rect x="12" y="16" width="76" height="68" rx="22" fill="#FBF3E4" stroke="#8A6A3A" stroke-width="7"/>
    <rect x="20" y="24" width="60" height="52" rx="16" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="2"/>
    <ellipse cx="46" cy="48" rx="12" ry="11" fill="#D6C4EE" stroke="#4E3684" stroke-width="2.5"/>
    <ellipse cx="68" cy="62" rx="8" ry="4" transform="rotate(30 68 62)" fill="#F7B267" stroke="#8F4A0C" stroke-width="2"/>
    <g fill="#D7F0F7" stroke="#2F7F99" stroke-width="2"><circle cx="66" cy="36" r="5"/><circle cx="32" cy="66" r="4"/></g>`,
  'komorka-bakteryjna': `
    <rect x="8" y="30" width="66" height="40" rx="20" fill="#E8F3D8" stroke="#5E7B3A" stroke-width="6"/>
    <path d="M24 48 C24 38 38 36 44 42 C50 48 40 56 34 52 C28 48 38 40 50 42 C60 44 60 56 50 58" fill="none" stroke="#6B3FA0" stroke-width="3" stroke-linecap="round"/>
    <g fill="#4B3A78"><circle cx="58" cy="40" r="2.5"/><circle cx="62" cy="56" r="2.5"/><circle cx="20" cy="58" r="2.5"/></g>
    <path d="M74 50 q6 -10 12 0 t10 -2" fill="none" stroke="#4B3A78" stroke-width="3.5" stroke-linecap="round"/>`,

  // ---------- Kształty komórek ----------
  plemnik: `
    <ellipse cx="22" cy="50" rx="13" ry="9" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="3"/>
    <ellipse cx="20" cy="50" rx="7" ry="5" fill="#D6C4EE"/>
    <path d="M35 50 C45 40 52 60 62 50 C72 40 79 60 92 48" fill="none" stroke="#9E3B5B" stroke-width="3.5" stroke-linecap="round"/>`,
  'komorka-jajowa': `
    <circle cx="50" cy="50" r="40" fill="#FFF3D6" stroke="#B9852A" stroke-width="4"/>
    <circle cx="50" cy="50" r="40" fill="none" stroke="#F6D9A0" stroke-width="2" transform="scale(0.9) translate(5.5 5.5)"/>
    <circle cx="40" cy="42" r="10" fill="#D6C4EE" stroke="#4E3684" stroke-width="2.5"/>
    <g fill="#E9C77E"><circle cx="62" cy="58" r="4"/><circle cx="54" cy="70" r="3"/><circle cx="68" cy="40" r="3"/><circle cx="34" cy="66" r="3.5"/></g>`,
  'komorka-nerwowa': `
    <g fill="none" stroke="#9E3B5B" stroke-width="3.5" stroke-linecap="round">
      <path d="M30 40 L12 22"/><path d="M26 50 L6 52"/><path d="M32 60 L16 80"/><path d="M38 34 L34 10"/><path d="M14 22 L8 30"/><path d="M8 52 L4 44"/>
      <path d="M46 52 C60 52 70 48 94 50"/><path d="M94 50 L98 42"/><path d="M94 50 L98 58"/>
    </g>
    <path d="M28 36 C36 28 50 34 48 46 C50 58 38 66 30 60 C20 56 20 42 28 36Z" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="3"/>
    <circle cx="36" cy="47" r="6" fill="#D6C4EE" stroke="#4E3684" stroke-width="2"/>`,
  'komorka-nablonka': `
    <g stroke="#9E3B5B" stroke-width="3">
      <rect x="8" y="34" width="28" height="32" fill="#FDEBEF"/><rect x="36" y="34" width="28" height="32" fill="#FBE0E8"/><rect x="64" y="34" width="28" height="32" fill="#FDEBEF"/>
    </g>
    <g fill="#D6C4EE" stroke="#4E3684" stroke-width="2"><circle cx="22" cy="50" r="6"/><circle cx="50" cy="50" r="6"/><circle cx="78" cy="50" r="6"/></g>`,
  'aparat-szparkowy': `
    <path d="M48 14 C26 14 18 34 18 50 C18 66 26 86 48 86 C42 70 40 60 40 50 C40 40 42 30 48 14Z" fill="#CFE8C4" stroke="#3C6E3A" stroke-width="3.5"/>
    <path d="M52 14 C74 14 82 34 82 50 C82 66 74 86 52 86 C58 70 60 60 60 50 C60 40 58 30 52 14Z" fill="#CFE8C4" stroke="#3C6E3A" stroke-width="3.5"/>
    <g fill="#3C9A47"><circle cx="28" cy="40" r="3.5"/><circle cx="30" cy="60" r="3.5"/><circle cx="72" cy="40" r="3.5"/><circle cx="70" cy="60" r="3.5"/></g>`,
  wlosniki: `
    <g fill="#F2F7EC" stroke="#4F6B2E" stroke-width="3">
      <rect x="6" y="62" width="28" height="22" rx="3"/><rect x="34" y="62" width="30" height="22" rx="3"/><rect x="64" y="62" width="30" height="22" rx="3"/>
    </g>
    <path d="M46 62 C46 44 48 30 54 14 C56 10 60 10 60 14 C56 30 54 46 54 62Z" fill="#F2F7EC" stroke="#4F6B2E" stroke-width="3"/>`,
  'komorki-przewodzace': `
    <g fill="#E3F1F7" stroke="#2F6F94" stroke-width="3">
      <rect x="18" y="6" width="22" height="28" rx="3"/><rect x="18" y="36" width="22" height="28" rx="3"/><rect x="18" y="66" width="22" height="28" rx="3"/>
      <rect x="58" y="6" width="22" height="28" rx="3"/><rect x="58" y="36" width="22" height="28" rx="3"/><rect x="58" y="66" width="22" height="28" rx="3"/>
    </g>
    <g fill="none" stroke="#5DA9D6" stroke-width="3" stroke-linecap="round"><path d="M29 88 V12"/><path d="M69 88 V12"/><path d="M24 18 L29 12 L34 18"/><path d="M64 18 L69 12 L74 18"/></g>`,

  // ---------- Pojęcia ----------
  komorka: `
    <path d="M50 12 C76 11 90 30 89 52 C88 75 70 89 48 88 C25 87 11 70 12 48 C13 27 28 13 50 12Z" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="4"/>
    <circle cx="48" cy="50" r="13" fill="#D6C4EE" stroke="#4E3684" stroke-width="3"/>`,
  'organizm-jednokomorkowy': `
    <circle cx="50" cy="50" r="22" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="4"/>
    <circle cx="48" cy="48" r="7" fill="#D6C4EE" stroke="#4E3684" stroke-width="2"/>`,
  'organizm-wielokomorkowy': `
    <g fill="#FDEBEF" stroke="#9E3B5B" stroke-width="3">
      <circle cx="32" cy="34" r="16"/><circle cx="64" cy="30" r="16"/><circle cx="24" cy="64" r="16"/><circle cx="54" cy="60" r="16"/><circle cx="80" cy="58" r="14"/><circle cx="44" cy="86" r="12"/>
    </g>
    <g fill="#D6C4EE"><circle cx="32" cy="34" r="5"/><circle cx="64" cy="30" r="5"/><circle cx="24" cy="64" r="5"/><circle cx="54" cy="60" r="5"/><circle cx="80" cy="58" r="4.5"/><circle cx="44" cy="86" r="4"/></g>`,
  cytoplazma: `
    <path d="M50 12 C76 11 90 30 89 52 C88 75 70 89 48 88 C25 87 11 70 12 48 C13 27 28 13 50 12Z" fill="#F7C9D5" stroke="#9E3B5B" stroke-width="4"/>
    <circle cx="60" cy="46" r="11" fill="#B79BDD" stroke="#4E3684" stroke-width="2.5"/>`,
  'komorka-jadrowa': `
    <path d="M50 12 C76 11 90 30 89 52 C88 75 70 89 48 88 C25 87 11 70 12 48 C13 27 28 13 50 12Z" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="4"/>
    <circle cx="48" cy="50" r="18" fill="#D6C4EE" stroke="#4E3684" stroke-width="4"/>`,
  'komorka-bezjadrowa': `
    <rect x="10" y="28" width="80" height="44" rx="22" fill="#E8F3D8" stroke="#5E7B3A" stroke-width="5"/>
    <path d="M28 50 C28 38 44 36 50 44 C56 52 44 60 38 54 C32 48 44 40 58 44 C70 48 68 62 56 62" fill="none" stroke="#6B3FA0" stroke-width="3.5" stroke-linecap="round"/>`,
  chlorofil: `
    <path d="M50 10 C50 10 20 46 20 64 C20 80 34 90 50 90 C66 90 80 80 80 64 C80 46 50 10 50 10Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="4"/>
    <path d="M36 60 q2 -12 12 -18" fill="none" stroke="#A8DCAE" stroke-width="5" stroke-linecap="round"/>`,
};

const pamiec = new Map();

export function maRysunek(id) {
  return Object.hasOwn(R, id);
}

// Zwraca nowy element <svg> z rysunkiem karty albo null, jeśli rysunku nie ma.
export function rysunekKarty(id, klasa = 'rysunek-karty') {
  if (!maRysunek(id)) return null;
  if (!pamiec.has(id)) {
    const svg = new DOMParser().parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${R[id]}</svg>`,
      'image/svg+xml',
    ).documentElement;
    pamiec.set(id, svg);
  }
  const el = document.importNode(pamiec.get(id), true);
  el.setAttribute('class', klasa);
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  return el;
}

export const ID_RYSUNKOW = Object.keys(R);

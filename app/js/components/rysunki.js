// Rysunki kart: elementy komórek, typy komórek, kształty komórek, pojęcia, procesy, substancje i organizmy.
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

  // ---------- Świat 4: pojęcia, procesy i substancje ----------
  'odzywianie-sie': `
    <path d="M14 52 H86 C86 72 70 86 50 86 C30 86 14 72 14 52Z" fill="#F6D9A0" stroke="#8C6A0C" stroke-width="4" stroke-linejoin="round"/>
    <path d="M10 52 H90" stroke="#8C6A0C" stroke-width="4" stroke-linecap="round"/>
    <g fill="none" stroke="#B9852A" stroke-width="3.5" stroke-linecap="round"><path d="M36 40 q-6 -8 0 -16 t0 -16"/><path d="M52 40 q-6 -8 0 -16 t0 -16"/><path d="M68 40 q-6 -8 0 -16 t0 -16"/></g>`,
  'organizm-samozywny': `
    <circle cx="74" cy="22" r="11" fill="#F5B800" stroke="#9C6B00" stroke-width="3"/>
    <g stroke="#9C6B00" stroke-width="3" stroke-linecap="round"><path d="M74 4v5M74 35v5M56 22h5M87 22h5M61 9l3.5 3.5M84 32l3.5 3.5M61 35l3.5 -3.5M84 12l3.5 -3.5"/></g>
    <path d="M28 78 H62 L58 94 H32Z" fill="#B57A50" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M45 78 V50" stroke="#2E6B33" stroke-width="4" stroke-linecap="round"/>
    <path d="M45 58 C34 58 24 50 22 38 C34 38 44 46 45 58Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <path d="M45 52 C54 50 62 42 62 30 C51 32 45 40 45 52Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>`,
  fotosynteza: `
    <circle cx="20" cy="20" r="9" fill="#F5B800" stroke="#9C6B00" stroke-width="3"/>
    <g stroke="#9C6B00" stroke-width="3" stroke-linecap="round"><path d="M20 3v5M20 32v5M3 20h5M32 20h5M8 8l3.5 3.5M28.5 28.5l3.5 3.5M8 32l3.5 -3.5M28.5 11.5l3.5 -3.5"/></g>
    <path d="M26 86 C22 58 42 36 80 30 C84 62 62 84 26 86Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="4" stroke-linejoin="round"/>
    <path d="M26 86 C44 68 58 54 76 36" fill="none" stroke="#1F5A32" stroke-width="3" stroke-linecap="round"/>
    <g fill="#D7F0F7" stroke="#2F7F99" stroke-width="2.5"><circle cx="86" cy="18" r="6"/><circle cx="76" cy="8" r="4"/><circle cx="92" cy="6" r="3"/></g>`,
  chemosynteza: `
    <rect x="4" y="4" width="92" height="92" rx="12" fill="#1E2A44"/>
    <path d="M36 94 L42 52 H58 L64 94Z" fill="#6E5644" stroke="#3B2C22" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 50 C40 42 56 34 46 24 C40 18 50 12 46 6" fill="none" stroke="#F0A35E" stroke-width="5" stroke-linecap="round"/>
    <g fill="#E87A9A" stroke="#7A2440" stroke-width="2"><rect x="16" y="62" width="12" height="6" rx="3"/><rect x="70" y="56" width="12" height="6" rx="3" transform="rotate(-25 76 59)"/><rect x="72" y="76" width="12" height="6" rx="3"/><rect x="14" y="80" width="12" height="6" rx="3" transform="rotate(20 20 83)"/></g>`,
  'intensywnosc-fotosyntezy': `
    <path d="M12 70 A38 38 0 0 1 88 70" fill="none" stroke="#E3E8E0" stroke-width="14"/>
    <path d="M12 70 A38 38 0 0 1 72 39" fill="none" stroke="#3C9A47" stroke-width="14"/>
    <path d="M50 70 L72 42" stroke="#11191B" stroke-width="5" stroke-linecap="round"/>
    <circle cx="50" cy="70" r="7" fill="#11191B"/>
    <path d="M30 94 C28 82 38 74 50 74 C62 74 72 82 70 94Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3"/>`,
  'proba-badawcza': `
    <path d="M24 16 H76 L70 92 H30Z" fill="#E3F1F7" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <path d="M27 30 H73" stroke="#5DA9D6" stroke-width="3"/>
    <path d="M50 90 V44" stroke="#2E6B33" stroke-width="3.5" stroke-linecap="round"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="1.5"><ellipse cx="42" cy="78" rx="7" ry="3" transform="rotate(25 42 78)"/><ellipse cx="58" cy="70" rx="7" ry="3" transform="rotate(-25 58 70)"/><ellipse cx="42" cy="60" rx="7" ry="3" transform="rotate(25 42 60)"/><ellipse cx="58" cy="52" rx="7" ry="3" transform="rotate(-25 58 52)"/></g>
    <g fill="#FFFFFF" stroke="#2F7F99" stroke-width="2"><circle cx="54" cy="38" r="3.5"/><circle cx="46" cy="32" r="3"/><circle cx="56" cy="24" r="3.5"/><circle cx="36" cy="44" r="2.5"/><circle cx="64" cy="40" r="2.5"/><circle cx="62" cy="62" r="2.5"/><circle cx="36" cy="68" r="2.5"/></g>`,
  'proba-kontrolna': `
    <path d="M24 16 H76 L70 92 H30Z" fill="#E3F1F7" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <path d="M27 30 H73" stroke="#5DA9D6" stroke-width="3"/>
    <path d="M50 90 V44" stroke="#2E6B33" stroke-width="3.5" stroke-linecap="round"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="1.5"><ellipse cx="42" cy="78" rx="7" ry="3" transform="rotate(25 42 78)"/><ellipse cx="58" cy="70" rx="7" ry="3" transform="rotate(-25 58 70)"/><ellipse cx="42" cy="60" rx="7" ry="3" transform="rotate(25 42 60)"/><ellipse cx="58" cy="52" rx="7" ry="3" transform="rotate(-25 58 52)"/></g>
    <circle cx="54" cy="38" r="3" fill="#FFFFFF" stroke="#2F7F99" stroke-width="2"/>
    <path d="M8 40 H92" stroke="#11191B" stroke-width="2.5" stroke-dasharray="5 4"/>`,
  swiatlo: `
    <circle cx="50" cy="50" r="20" fill="#F5B800" stroke="#9C6B00" stroke-width="4"/>
    <g stroke="#9C6B00" stroke-width="5" stroke-linecap="round"><path d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l8 8M72 72l8 8M20 80l8 -8M72 28l8 -8"/></g>`,
  'dwutlenek-wegla': `
    <g fill="#C9CFD1" stroke="#5A6B6E" stroke-width="3.5">
      <circle cx="34" cy="58" r="18"/><circle cx="58" cy="44" r="20"/><circle cx="70" cy="66" r="15"/>
    </g>
    <g fill="#5A6B6E"><circle cx="30" cy="56" r="3"/><circle cx="56" cy="40" r="3"/><circle cx="64" cy="50" r="2.5"/><circle cx="72" cy="66" r="3"/><circle cx="40" cy="64" r="2.5"/></g>`,
  woda: `
    <path d="M50 8 C50 8 20 46 20 64 C20 80 34 92 50 92 C66 92 80 80 80 64 C80 46 50 8 50 8Z" fill="#5DA9D6" stroke="#2F6F94" stroke-width="4"/>
    <path d="M36 62 q2 -12 12 -18" fill="none" stroke="#D7F0F7" stroke-width="5" stroke-linecap="round"/>`,
  'substancje-pokarmowe': `
    <g stroke="#8C6A0C" stroke-width="3.5" stroke-linejoin="round">
      <path d="M14 56 L34 46 L56 56 L36 66Z" fill="#FFFFFF"/><path d="M14 56 V80 L36 90 V66Z" fill="#F1E6CC"/><path d="M36 66 V90 L56 80 V56Z" fill="#E4D3AA"/>
      <path d="M46 30 L64 21 L84 30 L66 39Z" fill="#FFFFFF"/><path d="M46 30 V52 L66 61 V39Z" fill="#F1E6CC"/><path d="M66 39 V61 L84 52 V30Z" fill="#E4D3AA"/>
    </g>
    <path d="M70 92 C66 78 74 68 88 66 C90 80 84 90 70 92Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3"/>`,
  tlen: `
    <g fill="#D7F0F7" stroke="#2F7F99" stroke-width="4">
      <circle cx="40" cy="64" r="20"/><circle cx="66" cy="36" r="14"/><circle cx="40" cy="22" r="9"/>
    </g>
    <g fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"><path d="M30 58 q3 -8 10 -10"/><path d="M60 32 q2 -5 6 -6"/></g>`,
  glukoza: `
    <g stroke="#8C6A0C" stroke-width="4" stroke-linejoin="round">
      <path d="M18 38 L50 22 L82 38 L50 54Z" fill="#FFFFFF"/><path d="M18 38 V70 L50 86 V54Z" fill="#F1E6CC"/><path d="M50 54 V86 L82 70 V38Z" fill="#E4D3AA"/>
    </g>
    <g fill="#C9B07A"><circle cx="34" cy="60" r="2.5"/><circle cx="40" cy="70" r="2.5"/><circle cx="62" cy="62" r="2.5"/><circle cx="70" cy="56" r="2.5"/><circle cx="50" cy="38" r="2.5"/></g>`,

  // ---------- Świat 6: procesy, substancje i pojęcia ----------
  'oddychanie-komorkowe': `
    <path d="M50 10 C76 9 91 28 90 51 C89 76 70 91 47 90 C23 89 9 71 10 48 C11 26 27 11 50 10Z" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="4"/>
    <g transform="rotate(-20 50 52)"><ellipse cx="50" cy="52" rx="26" ry="14" fill="#F7B267" stroke="#8F4A0C" stroke-width="3"/>
    <path d="M30 52 q5 -9 10 0 t10 0 t10 0 t10 0" fill="none" stroke="#8F4A0C" stroke-width="2.5"/></g>
    <path d="M74 24 l-6 10 h6 l-6 10" fill="none" stroke="#C2366B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  'oddychanie-tlenowe': `
    <g transform="rotate(-20 46 56)"><ellipse cx="46" cy="56" rx="34" ry="18" fill="#F7B267" stroke="#8F4A0C" stroke-width="4"/>
    <path d="M18 56 q6 -12 12 0 t12 0 t12 0 t12 0" fill="none" stroke="#8F4A0C" stroke-width="3"/></g>
    <g fill="#D7F0F7" stroke="#2F7F99" stroke-width="3"><circle cx="80" cy="20" r="10"/><circle cx="64" cy="10" r="5"/></g>`,
  fermentacja: `
    <path d="M30 14 H70 V24 C82 30 86 42 86 56 V80 C86 88 80 92 72 92 H28 C20 92 14 88 14 80 V56 C14 42 18 30 30 24Z" fill="#FFF3D6" stroke="#8C6A0C" stroke-width="4" stroke-linejoin="round"/>
    <path d="M16 54 H84" stroke="#B9852A" stroke-width="3"/>
    <g fill="#FFFFFF" stroke="#8C6A0C" stroke-width="2"><circle cx="34" cy="70" r="5"/><circle cx="56" cy="78" r="4"/><circle cx="66" cy="64" r="5"/><circle cx="44" cy="44" r="3.5"/><circle cx="60" cy="40" r="3"/></g>`,
  'fermentacja-alkoholowa': `
    <g fill="#FBF3E4" stroke="#8A6A3A" stroke-width="4">
      <ellipse cx="38" cy="56" rx="22" ry="17"/><ellipse cx="64" cy="36" rx="13" ry="10" transform="rotate(-30 64 36)"/>
    </g>
    <ellipse cx="36" cy="56" rx="7" ry="6" fill="#D6C4EE" stroke="#4E3684" stroke-width="2"/>
    <g fill="#C9CFD1" stroke="#5A6B6E" stroke-width="2.5"><circle cx="76" cy="66" r="6"/><circle cx="86" cy="50" r="4.5"/><circle cx="68" cy="84" r="5"/></g>`,
  'fermentacja-mlekowa': `
    <path d="M10 50 C24 26 76 26 90 50 C76 74 24 74 10 50Z" fill="#F3A6B8" stroke="#9E3B5B" stroke-width="4"/>
    <g stroke="#C9637F" stroke-width="3" stroke-linecap="round"><path d="M30 38 V62"/><path d="M42 34 V66"/><path d="M54 34 V66"/><path d="M66 38 V62"/></g>
    <g fill="#FFF6E0" stroke="#B9852A" stroke-width="2.5"><circle cx="78" cy="22" r="6"/><circle cx="90" cy="34" r="4"/></g>`,
  'wymiana-gazowa': `
    <circle cx="50" cy="50" r="22" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="4"/>
    <path d="M8 34 H30" stroke="#2F7F99" stroke-width="5" stroke-linecap="round"/><path d="M24 26 L32 34 L24 42" fill="none" stroke="#2F7F99" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M70 66 H92" stroke="#5A6B6E" stroke-width="5" stroke-linecap="round"/><path d="M86 58 L94 66 L86 74" fill="none" stroke="#5A6B6E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="10" cy="18" r="6" fill="#D7F0F7" stroke="#2F7F99" stroke-width="3"/><circle cx="88" cy="88" r="6" fill="#C9CFD1" stroke="#5A6B6E" stroke-width="3"/>`,
  skrzela: `
    <g fill="none" stroke-linecap="round">
      <g stroke="#8E1F2A" stroke-width="9"><path d="M30 14 C14 34 14 66 30 86"/><path d="M50 14 C34 34 34 66 50 86"/><path d="M70 14 C54 34 54 66 70 86"/></g>
      <g stroke="#E0525B" stroke-width="5"><path d="M30 14 C14 34 14 66 30 86"/><path d="M50 14 C34 34 34 66 50 86"/><path d="M70 14 C54 34 54 66 70 86"/></g>
    </g>
    <g stroke="#E0525B" stroke-width="3" stroke-linecap="round"><path d="M24 30 h10M20 50 h10M24 70 h10M44 30 h10M40 50 h10M44 70 h10M64 30 h10M60 50 h10M64 70 h10"/></g>`,
  pluca: `
    <path d="M50 10 V44" stroke="#9E3B5B" stroke-width="6" stroke-linecap="round"/>
    <path d="M50 40 L36 50 M50 40 L64 50" stroke="#9E3B5B" stroke-width="5" stroke-linecap="round"/>
    <path d="M42 30 C26 30 12 52 12 74 C12 88 22 92 34 88 C42 86 44 78 44 66 V44 C44 36 44 30 42 30Z" fill="#F3A6B8" stroke="#9E3B5B" stroke-width="4" stroke-linejoin="round"/>
    <path d="M58 30 C74 30 88 52 88 74 C88 88 78 92 66 88 C58 86 56 78 56 66 V44 C56 36 56 30 58 30Z" fill="#F3A6B8" stroke="#9E3B5B" stroke-width="4" stroke-linejoin="round"/>`,
  energia: `
    <path d="M58 6 L22 56 H46 L38 94 L78 40 H54Z" fill="#FFD23F" stroke="#9C6B00" stroke-width="4" stroke-linejoin="round"/>`,
  'alkohol-etylowy': `
    <path d="M40 10 H60 V36 L84 82 C87 88 83 92 77 92 H23 C17 92 13 88 16 82 L40 36Z" fill="#E3F1F7" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <path d="M28 62 H72 L82 84 C84 88 82 90 78 90 H22 C18 90 16 88 18 84Z" fill="#EBD8F5"/>
    <path d="M36 10 H64" stroke="#2F6F94" stroke-width="4" stroke-linecap="round"/>
    <g fill="#FFFFFF" stroke="#7D5BA6" stroke-width="2"><circle cx="40" cy="78" r="3"/><circle cx="56" cy="72" r="2.5"/><circle cx="62" cy="82" r="3"/></g>`,
  'kwas-mlekowy': `
    <path d="M36 8 H64" stroke="#2F6F94" stroke-width="4" stroke-linecap="round"/>
    <path d="M40 8 V80 C40 88 44 92 50 92 C56 92 60 88 60 80 V8" fill="#E3F1F7" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <path d="M41 46 H59 V80 C59 86 56 90 50 90 C44 90 41 86 41 80Z" fill="#FFF6E0"/>
    <path d="M72 56 C72 56 62 70 62 76 C62 82 66 86 72 86 C78 86 82 82 82 76 C82 70 72 56 72 56Z" fill="#FFF6E0" stroke="#B9852A" stroke-width="3"/>`,
  'woda-wapienna': `
    <path d="M22 14 H78 V84 C78 90 74 92 68 92 H32 C26 92 22 90 22 84Z" fill="#E3F1F7" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <path d="M24 40 H76 V84 C76 88 74 90 68 90 H32 C26 90 24 88 24 84Z" fill="#F4F4F2"/>
    <g fill="#C9CFD1"><circle cx="36" cy="56" r="3"/><circle cx="52" cy="66" r="3.5"/><circle cx="64" cy="52" r="3"/><circle cx="44" cy="78" r="3"/><circle cx="66" cy="76" r="3.5"/><circle cx="30" cy="70" r="2.5"/></g>
    <path d="M50 4 V30" stroke="#5A6B6E" stroke-width="5" stroke-linecap="round"/>`,
  'rozmnazanie-plciowe': `
    <circle cx="64" cy="54" r="28" fill="#FFF3D6" stroke="#B9852A" stroke-width="4"/>
    <circle cx="60" cy="48" r="9" fill="#D6C4EE" stroke="#4E3684" stroke-width="2.5"/>
    <ellipse cx="26" cy="48" rx="8" ry="6" fill="#FDEBEF" stroke="#9E3B5B" stroke-width="3"/>
    <path d="M18 48 C12 40 8 56 2 48" fill="none" stroke="#9E3B5B" stroke-width="3" stroke-linecap="round"/>`,
  'rozmnazanie-bezplciowe': `
    <path d="M8 50 C8 34 18 28 30 28 C40 28 44 36 50 36 C56 36 60 28 70 28 C82 28 92 34 92 50 C92 66 82 72 70 72 C60 72 56 64 50 64 C44 64 40 72 30 72 C18 72 8 66 8 50Z" fill="#E8F3D8" stroke="#5E7B3A" stroke-width="4"/>
    <path d="M18 50 C18 42 26 40 30 46 C34 52 26 56 24 52" fill="none" stroke="#6B3FA0" stroke-width="3" stroke-linecap="round"/>
    <path d="M60 50 C60 42 68 40 72 46 C76 52 68 56 66 52" fill="none" stroke="#6B3FA0" stroke-width="3" stroke-linecap="round"/>`,

  // ---------- Ikony czynników (laboratorium; nie są kartami atlasu) ----------
  temperatura: `
    <rect x="40" y="8" width="20" height="62" rx="10" fill="#FFFFFF" stroke="#11191B" stroke-width="4"/>
    <rect x="46" y="34" width="8" height="40" rx="4" fill="#D7263D"/>
    <circle cx="50" cy="78" r="15" fill="#D7263D" stroke="#11191B" stroke-width="4"/>
    <g stroke="#11191B" stroke-width="3" stroke-linecap="round"><path d="M64 22h8M64 34h8M64 46h8"/></g>`,
  'sole-mineralne': `
    <rect x="18" y="30" width="64" height="56" rx="6" fill="#E7DDF5" stroke="#11191B" stroke-width="4"/>
    <path d="M18 46 H82" stroke="#11191B" stroke-width="3"/>
    <g fill="#6B4FA0"><circle cx="32" cy="60" r="5"/><circle cx="50" cy="56" r="5"/><circle cx="68" cy="62" r="5"/><circle cx="40" cy="74" r="5"/><circle cx="60" cy="76" r="5"/></g>
    <path d="M30 30 L36 14 H64 L70 30" fill="#FFFFFF" stroke="#11191B" stroke-width="4" stroke-linejoin="round"/>`,

  // ---------- Organizmy ----------
  'moczarka-kanadyjska': `
    <path d="M50 96 C48 70 54 40 50 6" fill="none" stroke="#2E6B33" stroke-width="4" stroke-linecap="round"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="2">
      <ellipse cx="38" cy="80" rx="12" ry="4" transform="rotate(20 38 80)"/><ellipse cx="62" cy="76" rx="12" ry="4" transform="rotate(-20 62 76)"/>
      <ellipse cx="40" cy="58" rx="12" ry="4" transform="rotate(20 40 58)"/><ellipse cx="64" cy="54" rx="12" ry="4" transform="rotate(-20 64 54)"/>
      <ellipse cx="40" cy="36" rx="11" ry="4" transform="rotate(20 40 36)"/><ellipse cx="62" cy="32" rx="11" ry="4" transform="rotate(-20 62 32)"/>
      <ellipse cx="44" cy="16" rx="9" ry="3.5" transform="rotate(25 44 16)"/><ellipse cx="58" cy="13" rx="9" ry="3.5" transform="rotate(-25 58 13)"/>
    </g>
    <g fill="#FFFFFF" stroke="#2F7F99" stroke-width="2"><circle cx="76" cy="20" r="4"/><circle cx="82" cy="8" r="3"/></g>`,
  rosiczka: `
    <g stroke="#6E8F3A" stroke-width="3" stroke-linecap="round"><path d="M50 80 L22 50"/><path d="M50 80 L78 50"/><path d="M50 80 L50 36"/><path d="M50 80 L30 78"/><path d="M50 80 L70 78"/></g>
    <g fill="#9DBE5A" stroke="#4F6B2E" stroke-width="2.5"><circle cx="20" cy="46" r="10"/><circle cx="80" cy="46" r="10"/><circle cx="50" cy="28" r="10"/></g>
    <g stroke="#C2366B" stroke-width="2" stroke-linecap="round"><path d="M20 36v-6M12 42l-5-3M28 40l5-4M80 36v-6M72 40l-5-4M88 42l5-3M50 18v-6M42 22l-5-4M58 22l5-4"/></g>
    <g fill="#F7E7F0" stroke="#C2366B" stroke-width="1.5"><circle cx="20" cy="29" r="2.5"/><circle cx="6" cy="38" r="2.5"/><circle cx="34" cy="35" r="2.5"/><circle cx="80" cy="29" r="2.5"/><circle cx="66" cy="35" r="2.5"/><circle cx="94" cy="38" r="2.5"/><circle cx="50" cy="11" r="2.5"/><circle cx="36" cy="17" r="2.5"/><circle cx="64" cy="17" r="2.5"/></g>`,
  slonecznik: `
    <path d="M50 54 V96" stroke="#2E6B33" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 80 C40 80 32 74 30 66 C40 66 48 72 50 80Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/>
    <g fill="#F5B800" stroke="#9C6B00" stroke-width="2.5">
      <ellipse cx="50" cy="12" rx="7" ry="11"/><ellipse cx="50" cy="56" rx="7" ry="11"/><ellipse cx="28" cy="34" rx="11" ry="7"/><ellipse cx="72" cy="34" rx="11" ry="7"/>
      <ellipse cx="34" cy="18" rx="7" ry="11" transform="rotate(-45 34 18)"/><ellipse cx="66" cy="50" rx="7" ry="11" transform="rotate(-45 66 50)"/><ellipse cx="66" cy="18" rx="7" ry="11" transform="rotate(45 66 18)"/><ellipse cx="34" cy="50" rx="7" ry="11" transform="rotate(45 34 50)"/>
    </g>
    <circle cx="50" cy="34" r="13" fill="#6B4423" stroke="#3B2614" stroke-width="3"/>`,
  truskawka: `
    <path d="M50 92 C30 82 14 60 18 42 C22 30 36 28 50 32 C64 28 78 30 82 42 C86 60 70 82 50 92Z" fill="#E0525B" stroke="#8E1F2A" stroke-width="4" stroke-linejoin="round"/>
    <g fill="#F6D56B"><ellipse cx="34" cy="48" rx="2" ry="3"/><ellipse cx="50" cy="46" rx="2" ry="3"/><ellipse cx="66" cy="48" rx="2" ry="3"/><ellipse cx="40" cy="62" rx="2" ry="3"/><ellipse cx="58" cy="62" rx="2" ry="3"/><ellipse cx="50" cy="76" rx="2" ry="3"/><ellipse cx="30" cy="58" rx="2" ry="3"/><ellipse cx="70" cy="58" rx="2" ry="3"/></g>
    <path d="M50 34 L36 22 L46 26 L50 12 L54 26 L64 22Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>`,
  ziemniak: `
    <path d="M14 58 C10 40 26 26 48 28 C70 26 90 36 88 56 C86 74 66 82 46 80 C28 80 16 72 14 58Z" fill="#D9B27A" stroke="#7A5530" stroke-width="4"/>
    <g fill="#7A5530"><circle cx="34" cy="48" r="2.5"/><circle cx="60" cy="42" r="2.5"/><circle cx="70" cy="62" r="2.5"/><circle cx="42" cy="66" r="2.5"/></g>
    <path d="M60 30 C58 20 62 12 70 8" fill="none" stroke="#3C9A47" stroke-width="4" stroke-linecap="round"/>
    <path d="M68 10 C74 6 80 8 82 12 C76 14 70 14 68 10Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2"/>`,
  brunatnice: `
    <g fill="#8A6A2E" stroke="#4A3612" stroke-width="3" stroke-linejoin="round">
      <path d="M34 96 C30 76 20 64 22 44 C24 30 18 20 22 8 C30 18 34 30 34 44 C34 62 40 76 40 96Z"/>
      <path d="M54 96 C56 76 66 60 64 40 C62 26 70 14 66 4 C58 14 54 26 54 40 C54 60 48 76 48 96Z"/>
      <path d="M70 96 C72 84 82 74 82 60 C82 50 88 42 86 32 C78 40 74 50 74 60 C74 74 64 84 64 96Z"/>
    </g>
    <path d="M10 96 H90" stroke="#4A3612" stroke-width="4" stroke-linecap="round"/>`,
  sinice: `
    <g fill="#4FA3A0" stroke="#22615F" stroke-width="3">
      <circle cx="14" cy="64" r="9"/><circle cx="30" cy="56" r="9"/><circle cx="46" cy="50" r="9"/><circle cx="62" cy="46" r="9"/><circle cx="78" cy="44" r="9"/>
    </g>
    <g fill="#4FA3A0" stroke="#22615F" stroke-width="3"><circle cx="20" cy="30" r="7"/><circle cx="34" cy="24" r="7"/><circle cx="48" cy="22" r="7"/></g>
    <circle cx="90" cy="46" r="6" fill="#4FA3A0" stroke="#22615F" stroke-width="3"/>`,
  'bakterie-z-dna-oceanu': `
    <rect x="4" y="4" width="92" height="92" rx="12" fill="#1E2A44"/>
    <g fill="#E87A9A" stroke="#7A2440" stroke-width="2.5">
      <rect x="18" y="24" width="24" height="12" rx="6" transform="rotate(-20 30 30)"/><rect x="54" y="18" width="24" height="12" rx="6" transform="rotate(15 66 24)"/>
      <rect x="40" y="48" width="24" height="12" rx="6"/><rect x="14" y="66" width="24" height="12" rx="6" transform="rotate(25 26 72)"/><rect x="62" y="68" width="24" height="12" rx="6" transform="rotate(-15 74 74)"/>
    </g>`,
  drozdze: `
    <g fill="#FBF3E4" stroke="#8A6A3A" stroke-width="4">
      <ellipse cx="42" cy="58" rx="26" ry="20"/><ellipse cx="74" cy="30" rx="14" ry="11" transform="rotate(-35 74 30)"/>
    </g>
    <ellipse cx="40" cy="58" rx="8" ry="7" fill="#D6C4EE" stroke="#4E3684" stroke-width="2.5"/>
    <circle cx="56" cy="66" r="5" fill="#D7F0F7" stroke="#2F7F99" stroke-width="2"/>`,
  'chelbia-modra': `
    <path d="M14 46 C14 22 32 10 50 10 C68 10 86 22 86 46 C76 50 24 50 14 46Z" fill="#B9D7F2" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <g fill="none" stroke="#6B4FA0" stroke-width="3"><circle cx="34" cy="32" r="5"/><circle cx="50" cy="26" r="5"/><circle cx="66" cy="32" r="5"/></g>
    <g fill="none" stroke="#2F6F94" stroke-width="3.5" stroke-linecap="round"><path d="M26 50 C22 64 30 74 24 90"/><path d="M42 50 C40 66 46 76 42 92"/><path d="M58 50 C60 66 54 76 58 92"/><path d="M74 50 C78 64 70 74 76 90"/></g>`,
  ryba: `
    <path d="M10 50 C24 26 58 22 76 40 L94 26 V74 L76 60 C58 78 24 74 10 50Z" fill="#7FB3D5" stroke="#2F5F80" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="26" cy="46" r="4" fill="#11191B"/>
    <path d="M38 36 C44 44 44 56 38 64" fill="none" stroke="#C2366B" stroke-width="4" stroke-linecap="round"/>`,
  'tasiemiec-uzbrojony': `
    <path d="M12 20 C30 10 40 30 30 44 C20 58 30 76 50 74 C70 72 70 52 84 50 C92 50 94 60 90 68" fill="none" stroke="#B9852A" stroke-width="13" stroke-linecap="round"/>
    <path d="M12 20 C30 10 40 30 30 44 C20 58 30 76 50 74 C70 72 70 52 84 50 C92 50 94 60 90 68" fill="none" stroke="#FFF3D6" stroke-width="8" stroke-linecap="round" stroke-dasharray="6 3"/>
    <circle cx="11" cy="20" r="5" fill="#FFF3D6" stroke="#8C6A0C" stroke-width="2.5"/>`,
  kot: `
    <path d="M20 40 L18 10 L40 26 H60 L82 10 L80 40 C86 52 84 70 72 80 C62 88 38 88 28 80 C16 70 14 52 20 40Z" fill="#F0A35E" stroke="#8C4A12" stroke-width="4" stroke-linejoin="round"/>
    <g fill="#11191B"><ellipse cx="38" cy="50" rx="4" ry="6"/><ellipse cx="62" cy="50" rx="4" ry="6"/></g>
    <path d="M46 62 H54 L50 67Z" fill="#C2366B"/>
    <g stroke="#8C4A12" stroke-width="2" stroke-linecap="round"><path d="M30 64 L12 62M30 68 L14 72M70 64 L88 62M70 68 L86 72"/></g>`,
  tulipan: `
    <path d="M50 52 V94" stroke="#2E6B33" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 86 C34 82 26 66 30 50 C40 58 48 70 50 86Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <path d="M28 18 L38 28 L50 12 L62 28 L72 18 C76 36 68 54 50 54 C32 54 24 36 28 18Z" fill="#E0525B" stroke="#8E1F2A" stroke-width="4" stroke-linejoin="round"/>`,
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

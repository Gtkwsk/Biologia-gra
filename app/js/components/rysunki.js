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

  // ---------- Ikony pór doby (sorter „dzień czy noc”; nie są kartami atlasu) ----------
  ksiezyc: `
    <circle cx="50" cy="50" r="44" fill="#1E2A4A"/>
    <path d="M60 14 C38 18 26 36 28 56 C30 76 48 90 68 86 C52 80 42 66 42 50 C42 34 50 22 60 14Z" fill="#F4E8A6" stroke="#8C7A1E" stroke-width="3.5" stroke-linejoin="round"/>
    <g fill="#F4E8A6"><circle cx="72" cy="30" r="3"/><circle cx="80" cy="54" r="2.5"/><circle cx="66" cy="68" r="2"/></g>`,
  doba: `
    <circle cx="50" cy="50" r="40" fill="#1E2A4A" stroke="#11191B" stroke-width="4"/>
    <path d="M50 10 A40 40 0 0 0 50 90Z" fill="#FCE58C" stroke="#11191B" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="34" cy="50" r="9" fill="#F5B800" stroke="#9C6B00" stroke-width="3"/>
    <g stroke="#9C6B00" stroke-width="3" stroke-linecap="round"><path d="M34 32v5M34 63v5M16 50h5M24 38l3 3M24 62l3 -3M44 38l-3 3M44 62l-3 -3"/></g>
    <path d="M70 34 C61 37 57 45 58 53 C59 61 66 67 74 66 C67 62 64 57 64 50 C64 43 66 38 70 34Z" fill="#F4E8A6" stroke="#8C7A1E" stroke-width="2.5" stroke-linejoin="round"/>`,

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
  // Etap 3: pojęcia cudzożywności (świat 5).
  'organizm-cudzozywny': `
    <g stroke="#5A6B6E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M7 8 V22 C7 30 10 34 14 34 C18 34 21 30 21 22 V8"/><path d="M14 8 V34"/></g>
    <rect x="10.5" y="32" width="7" height="60" rx="3.5" fill="#5A6B6E"/>
    <circle cx="62" cy="52" r="32" fill="#FFFFFF" stroke="#5A6B6E" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="62" cy="52" r="23" fill="#F4F4F2" stroke="#C9CFD1" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#F6D56B" stroke="#8C6A0C" stroke-width="2.5" stroke-linejoin="round"><ellipse cx="54" cy="44" rx="9" ry="7" transform="rotate(-15 54 44)"/><ellipse cx="68" cy="41" rx="8" ry="6.5" transform="rotate(20 68 41)"/></g>
    <circle cx="54" cy="62" r="8" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5" stroke-linejoin="round"/><g fill="#F6D9A0"><ellipse cx="51" cy="60" rx="1.6" ry="2.4"/><ellipse cx="57" cy="60" rx="1.6" ry="2.4"/><ellipse cx="54" cy="65" rx="2.4" ry="1.6"/></g>
    <g fill="#5DB85F" stroke="#1F5A32" stroke-width="2" stroke-linejoin="round"><circle cx="70" cy="58" r="4"/><circle cx="76" cy="51" r="4"/><circle cx="72" cy="66" r="4"/></g>`,
  trawienie: `
    <g fill="#E0525B" stroke="#8E1F2A" stroke-width="3" stroke-linejoin="round"><rect x="7" y="77" width="20" height="14" rx="2.5"/></g>
    <g fill="#5DA9D6" stroke="#2F6F94" stroke-width="3" stroke-linejoin="round"><rect x="7" y="63" width="20" height="14" rx="2.5"/></g>
    <g fill="#F5B800" stroke="#9C6B00" stroke-width="3" stroke-linejoin="round"><rect x="7" y="49" width="20" height="14" rx="2.5"/></g>
    <g fill="#5DB85F" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"><rect x="10" y="31" width="4.8" height="6" rx="1.5"/><rect x="19.2" y="31" width="4.8" height="6" rx="1.5"/><rect x="7" y="35" width="20" height="14" rx="2.5"/></g>
    <g fill="none" stroke="#11191B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M34 62 H50"/><path d="M44 55 L51 62 L44 69"/></g>
    <g fill="#5DB85F" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round" transform="rotate(-14 66 36)"><rect x="60.4" y="26" width="3.8" height="6" rx="1.5"/><rect x="67.8" y="26" width="3.8" height="6" rx="1.5"/><rect x="58" y="30" width="16" height="12" rx="2.5"/></g>
    <g fill="#F5B800" stroke="#9C6B00" stroke-width="3" stroke-linejoin="round" transform="rotate(12 84 46)"><rect x="78.4" y="36" width="3.8" height="6" rx="1.5"/><rect x="85.8" y="36" width="3.8" height="6" rx="1.5"/><rect x="76" y="40" width="16" height="12" rx="2.5"/></g>
    <g fill="#5DA9D6" stroke="#2F6F94" stroke-width="3" stroke-linejoin="round" transform="rotate(9 67 66)"><rect x="61.4" y="56" width="3.8" height="6" rx="1.5"/><rect x="68.8" y="56" width="3.8" height="6" rx="1.5"/><rect x="59" y="60" width="16" height="12" rx="2.5"/></g>
    <g fill="#E0525B" stroke="#8E1F2A" stroke-width="3" stroke-linejoin="round" transform="rotate(-8 84 83)"><rect x="78.4" y="73" width="3.8" height="6" rx="1.5"/><rect x="85.8" y="73" width="3.8" height="6" rx="1.5"/><rect x="76" y="77" width="16" height="12" rx="2.5"/></g>`,
  'zwiazki-proste': `
    <g fill="#E0525B" stroke="#8E1F2A" stroke-width="3" stroke-linejoin="round" transform="rotate(-8 19 31.5)"><rect x="11.3" y="20" width="5.3" height="6" rx="1.5"/><rect x="21.4" y="20" width="5.3" height="6" rx="1.5"/><rect x="8" y="24" width="22" height="15" rx="2.5"/></g>
    <g fill="#5DA9D6" stroke="#2F6F94" stroke-width="3" stroke-linejoin="round" transform="rotate(6 51 25.5)"><rect x="43.3" y="14" width="5.3" height="6" rx="1.5"/><rect x="53.4" y="14" width="5.3" height="6" rx="1.5"/><rect x="40" y="18" width="22" height="15" rx="2.5"/></g>
    <g fill="#F5B800" stroke="#9C6B00" stroke-width="3" stroke-linejoin="round" transform="rotate(-5 82 33.5)"><rect x="74.3" y="22" width="5.3" height="6" rx="1.5"/><rect x="84.4" y="22" width="5.3" height="6" rx="1.5"/><rect x="71" y="26" width="22" height="15" rx="2.5"/></g>
    <g fill="#5DB85F" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round" transform="rotate(7 21 69.5)"><rect x="13.3" y="58" width="5.3" height="6" rx="1.5"/><rect x="23.4" y="58" width="5.3" height="6" rx="1.5"/><rect x="10" y="62" width="22" height="15" rx="2.5"/></g>
    <g fill="#B79BDD" stroke="#4E3684" stroke-width="3" stroke-linejoin="round" transform="rotate(-6 52 75.5)"><rect x="44.3" y="64" width="5.3" height="6" rx="1.5"/><rect x="54.4" y="64" width="5.3" height="6" rx="1.5"/><rect x="41" y="68" width="22" height="15" rx="2.5"/></g>
    <g fill="#F7B267" stroke="#8F4A0C" stroke-width="3" stroke-linejoin="round" transform="rotate(9 82 67.5)"><rect x="74.3" y="56" width="5.3" height="6" rx="1.5"/><rect x="84.4" y="56" width="5.3" height="6" rx="1.5"/><rect x="71" y="60" width="22" height="15" rx="2.5"/></g>`,
  roslinozerca: `
    <path d="M18 84 L10 93" stroke="#1F5A32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 84C8.5 47.6 50.1 13.1 86 14C86.6 26.2 83.2 39.2 77 50.6A9.9 9.9 0 0 0 61.5 47.8A9.9 9.9 0 0 0 51.3 59.8A9.9 9.9 0 0 0 56.6 74.7C45.4 83 31.9 87.2 18 84Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="4" stroke-linejoin="round"/>
    <path d="M19.4 82.6 Q44.4 49.8 76.5 23.8" fill="none" stroke="#1F5A32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  miesozerca: `
    <g transform="translate(44 44) rotate(40) scale(0.96)"><path d="M20 -5 L39.1 -5 A7 7 0 1 1 49.6 0 A7 7 0 1 1 39.1 5 L20 5Z" fill="#FFF6E0" stroke="#B9852A" stroke-width="3" stroke-linejoin="round"/><path d="M30 -8 C22 -20 10 -26 -4 -26 C-20 -26 -30 -14 -30 0 C-30 14 -20 26 -4 26 C10 26 22 20 30 8 C33 4 33 -4 30 -8Z" fill="#D9764A" stroke="#7A3414" stroke-width="4" stroke-linejoin="round"/><path d="M-20 -8 C-18 -16 -10 -20 -2 -20" fill="none" stroke="#F2B08E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  drapieznik: `
    <path d="M20.7 55.3C20 56.4 17.2 59.4 16.2 61.7C15.1 64 14.6 66.6 14.6 69C14.5 71.4 15 73.8 15.8 75.9C16.7 78 18 79.9 19.5 81.4C21 82.9 22.9 84.1 24.7 84.8C26.5 85.5 29.4 85.6 30.4 85.8C29.6 85.3 27 84.1 25.8 82.9C24.6 81.8 23.6 80.3 23 78.9C22.4 77.5 22.2 75.8 22.2 74.4C22.2 73 22.6 71.6 23.1 70.4C23.6 69.2 24.5 68.2 25.4 67.4C26.2 66.7 27.8 66.1 28.3 65.9ZM56.5 66.5C56.3 67.2 55.7 69.5 55.1 70.9C54.5 72.2 53.8 73.6 53 74.8C52.2 76 51.3 77.1 50.4 78.2C49.5 79.2 48.4 80.1 47.4 80.9C46.3 81.7 45.2 82.5 44.1 83.1C43 83.7 41.2 84.3 40.6 84.5C40.9 84 42 82.5 42.6 81.5C43.1 80.5 43.6 79.4 43.9 78.3C44.3 77.3 44.5 76.2 44.6 75.2C44.8 74.1 44.8 73.1 44.8 72.1C44.7 71.1 44.6 70.1 44.4 69.1C44.2 68.2 43.6 66.9 43.5 66.5ZM79.3 55.3C80 56.4 82.8 59.4 83.8 61.7C84.9 64 85.4 66.6 85.4 69C85.5 71.4 85 73.8 84.2 75.9C83.3 78 82 79.9 80.5 81.4C79 82.9 77.1 84.1 75.3 84.8C73.5 85.5 70.6 85.6 69.6 85.8C70.4 85.3 73 84.1 74.2 82.9C75.4 81.8 76.4 80.3 77 78.9C77.6 77.5 77.8 75.8 77.8 74.4C77.8 73 77.4 71.6 76.9 70.4C76.4 69.2 75.5 68.2 74.6 67.4C73.8 66.7 72.2 66.1 71.7 65.9Z" fill="#3A4448" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="#F5C542" stroke="#9C6B00" stroke-width="3" stroke-linejoin="round"><path d="M50.2 46.2C49.7 46.8 47.9 48.6 46.7 49.7C45.5 50.9 44.3 52 43.1 53.1C41.8 54.3 40.6 55.4 39.3 56.5C38.1 57.6 36.8 58.7 35.5 59.7C34.2 60.8 32.9 61.8 31.6 62.9C30.2 63.9 28.2 65.4 27.5 65.9A6 6 0 0 1 20.5 56.1C21.1 55.7 23 54.3 24.2 53.4C25.5 52.4 26.7 51.4 27.9 50.5C29.1 49.5 30.3 48.5 31.4 47.4C32.6 46.4 33.8 45.4 34.9 44.3C36.1 43.2 37.2 42.2 38.4 41.1C39.5 40 41.2 38.3 41.8 37.8A6 6 0 0 1 50.2 46.2Z"/><path d="M56 42C56 42.7 56 44.8 56 46.2C56 47.6 56 48.9 56 50.3C56 51.7 56 53.1 56 54.5C56 55.9 56 57.3 56 58.7C56 60.1 56 61.4 56 62.8C56 64.2 56 66.3 56 67A6 6 0 0 1 44 67C44 66.3 44 64.2 44 62.8C44 61.4 44 60.1 44 58.7C44 57.3 44 55.9 44 54.5C44 53.1 44 51.7 44 50.3C44 48.9 44 47.6 44 46.2C44 44.8 44 42.7 44 42A6 6 0 0 1 56 42Z"/><path d="M58.2 37.8C58.8 38.3 60.5 40 61.6 41.1C62.8 42.2 63.9 43.2 65.1 44.3C66.2 45.4 67.4 46.4 68.6 47.4C69.7 48.5 70.9 49.5 72.1 50.5C73.3 51.4 74.5 52.4 75.8 53.4C77 54.3 78.9 55.7 79.5 56.1A6 6 0 0 1 72.5 65.9C71.8 65.4 69.8 63.9 68.4 62.9C67.1 61.8 65.8 60.8 64.5 59.7C63.2 58.7 61.9 57.6 60.7 56.5C59.4 55.4 58.2 54.3 56.9 53.1C55.7 52 54.5 50.9 53.3 49.7C52.1 48.6 50.3 46.8 49.8 46.2A6 6 0 0 1 58.2 37.8Z"/><path d="M41 5.5 H59 V40 C59 46 55 48 50 48 C45 48 41 46 41 40Z"/></g>
    <path d="M44 16 Q50 19 56 16M44 24 Q50 27 56 24M44 32 Q50 35 56 32" fill="none" stroke="#C99A1C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37.6 55.6 L32.4 49.4M67.6 49.4 L62.4 55.6M46 58 H54" fill="none" stroke="#C99A1C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  padlinozerca: `
    <g transform="translate(50 50) rotate(-40) scale(0.95)"><path d="M-27.1 -6 L27.1 -6 A9 9 0 1 1 41.7 0 A9 9 0 1 1 27.1 6 L-27.1 6 A9 9 0 1 1 -41.7 0 A9 9 0 1 1 -27.1 -6Z" fill="#F7F0DC" stroke="#8A7A5C" stroke-width="4" stroke-linejoin="round"/><path d="M-22 -1.5 H18" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  wszystkozerca: `
    <path d="M22 92C-1 73.2 7.5 28.5 30 10C48.5 32.5 48.2 78 22 92Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M22.2 90.4 Q21.4 55.5 28.9 21.5" fill="none" stroke="#1F5A32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(67 38) rotate(72) scale(0.74)"><path d="M20 -5 L39.1 -5 A7 7 0 1 1 49.6 0 A7 7 0 1 1 39.1 5 L20 5Z" fill="#FFF6E0" stroke="#B9852A" stroke-width="4" stroke-linejoin="round"/><path d="M30 -8 C22 -20 10 -26 -4 -26 C-20 -26 -30 -14 -30 0 C-30 14 -20 26 -4 26 C10 26 22 20 30 8 C33 4 33 -4 30 -8Z" fill="#D9764A" stroke="#7A3414" stroke-width="5" stroke-linejoin="round"/><path d="M-20 -8 C-18 -16 -10 -20 -2 -20" fill="none" stroke="#F2B08E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  pasozyt: `
    <g transform="translate(50 68)"><path d="M-5.5 -13 H5.5 L3 0 H-3Z" fill="#4A2410" stroke="#4A2410" stroke-width="3" stroke-linejoin="round"/></g>
    <path d="M4 96 V75 Q50 51 96 75 V96Z" fill="#F9D9C4"/>
    <path d="M6 74 Q50 51 94 74" fill="none" stroke="#B8775A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="#E0B094" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 84 l2 -4M22 88 l2 -4M34 84 l2 -4M64 86 l2 -4M76 84 l2 -4M84 89 l2 -4M48 90 l2 -4"/></g>
    <g transform="translate(50 68)"><path d="M8 -11 L16 -11 L20 1M11 -16 L24 -17 L30 4M13 -22 L30 -25 L40 -15M12 -30 L28 -39 L36 -49M-8 -11 L-16 -11 L-20 1M-11 -16 L-24 -17 L-30 4M-13 -22 L-30 -25 L-40 -15M-12 -30 L-28 -39 L-36 -49" fill="none" stroke="#4A2410" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-5.5 -13 H5.5 L3 0 H-3Z" fill="#4A2410" stroke="#4A2410" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-30" rx="15" ry="19" fill="#B5502F" stroke="#4A2410" stroke-width="3" stroke-linejoin="round"/><ellipse cx="0" cy="-18" rx="11" ry="8" fill="#4A2410"/><ellipse cx="-5" cy="-37" rx="3.5" ry="6" transform="rotate(20 -5 -37)" fill="#D9805F"/></g>`,
  zywiciel: `
    <g transform="translate(1.5 0)"><g fill="#D9A066" stroke="#7A4A22" stroke-width="4" stroke-linejoin="round"><path d="M80 52 C86 46 88 38 86 28 C91 30 93 40 91 48 C89 56 85 60 80 60Z"/><rect x="64" y="60" width="11" height="28" rx="5"/><rect x="77" y="58" width="10" height="30" rx="5"/><rect x="28" y="60" width="11" height="28" rx="5"/><rect x="42" y="62" width="10" height="26" rx="5"/><ellipse cx="57" cy="56" rx="31" ry="18"/><circle cx="27" cy="36" r="16"/><ellipse cx="16" cy="44" rx="11" ry="8"/></g>
    <ellipse cx="36" cy="38" rx="6" ry="12" transform="rotate(20 36 38)" fill="#9A6232" stroke="#5E3815" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="23" cy="32" r="3" fill="#11191B"/><ellipse cx="8.5" cy="41" rx="4" ry="3.5" fill="#11191B"/>
    <g transform="translate(62 41) scale(0.4)"><path d="M8 -11 L14 -8 L17 0M11 -17 L21 -16 L25 -7M13 -24 L25 -27 L30 -20M12 -32 L21 -41 L25 -48M-8 -11 L-14 -8 L-17 0M-11 -17 L-21 -16 L-25 -7M-13 -24 L-25 -27 L-30 -20M-12 -32 L-21 -41 L-25 -48" fill="none" stroke="#4A2410" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-5.5 -13 H5.5 L3 0 H-3Z" fill="#4A2410" stroke="#4A2410" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-30" rx="15" ry="19" fill="#B5502F" stroke="#4A2410" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-18" rx="11" ry="8" fill="#4A2410"/><ellipse cx="-5" cy="-37" rx="3.5" ry="6" transform="rotate(20 -5 -37)" fill="#D9805F"/></g></g>`,
  'pasozyt-zewnetrzny': `
    <g fill="#F9DCC6" stroke="#A0603F" stroke-width="4" stroke-linejoin="round"><rect x="42" y="30" width="16" height="18" rx="4"/><path d="M14 94 V76 C14 56 30 46 50 46 C70 46 86 56 86 76 V94Z"/><circle cx="50" cy="22" r="16"/></g>
    <g transform="translate(72 53) rotate(28) scale(0.45)"><path d="M8 -11 L14 -8 L17 0M11 -17 L21 -16 L25 -7M13 -24 L25 -27 L30 -20M12 -32 L21 -41 L25 -48M-8 -11 L-14 -8 L-17 0M-11 -17 L-21 -16 L-25 -7M-13 -24 L-25 -27 L-30 -20M-12 -32 L-21 -41 L-25 -48" fill="none" stroke="#4A2410" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-5.5 -13 H5.5 L3 0 H-3Z" fill="#4A2410" stroke="#4A2410" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-30" rx="15" ry="19" fill="#B5502F" stroke="#4A2410" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-18" rx="11" ry="8" fill="#4A2410"/><ellipse cx="-5" cy="-37" rx="3.5" ry="6" transform="rotate(20 -5 -37)" fill="#D9805F"/></g>`,
  'pasozyt-wewnetrzny': `
    <g fill="#F9DCC6" stroke="#A0603F" stroke-width="4" stroke-linejoin="round"><rect x="42" y="30" width="16" height="18" rx="4"/><path d="M14 94 V76 C14 56 30 46 50 46 C70 46 86 56 86 76 V94Z"/><circle cx="50" cy="22" r="16"/></g>
    <path d="M30 55 H66 A17 17 0 0 1 66 89 H32 A7 7 0 0 1 32 75 H66 A3 3 0 0 0 66 69 H30 A7 7 0 0 1 30 55Z" fill="#F3A6B8" stroke="#9E3B5B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M36 59 H66 A13 13 0 0 1 66 85 H50 A3 3 0 0 1 50 79 H66 A7 7 0 0 0 66 65 H36 A3 3 0 0 1 36 59Z" fill="#FFF3D6" stroke="#8C6A0C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M41 59 L41 65M46.1 59 L46.1 65M50.9 59 L50.9 65M55.9 59 L55.9 65M61 59 L61 65M66 59 L66 65M72.3 60.6 L69.4 65.9M77 65.1 L71.9 68.2M79 71 L73 71.4M77.9 77.3 L72.4 74.9M73.8 82.4 L70.2 77.6M67.8 84.9 L67 78.9M62.4 85 L62.4 79M57.4 85 L57.4 79" fill="none" stroke="#B9852A" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="36" cy="62" r="4" fill="#FFF3D6" stroke="#8C6A0C" stroke-width="2" stroke-linejoin="round"/>`,
  'roslina-pasozytnicza': `
    <path d="M29 74.5C29.3 73.8 29.8 71.7 31 70.4C32.3 69.2 34.3 67.9 36.5 67C38.7 66.1 41.5 65.3 44 64.8C46.5 64.2 49.3 63.9 51.5 63.8C53.7 63.7 55.7 63.9 57 64.1C58.2 64.3 58.7 64.8 59 65M29 55.5C29.3 54.8 29.8 52.7 31 51.4C32.3 50.2 34.3 48.9 36.5 48C38.7 47.1 41.5 46.3 44 45.8C46.5 45.2 49.3 44.9 51.5 44.8C53.7 44.7 55.7 44.9 57 45.1C58.2 45.3 58.7 45.8 59 46M29 36.5C29.3 35.8 29.8 33.7 31 32.4C32.3 31.2 34.3 29.9 36.5 29C38.7 28.1 41.5 27.3 44 26.8C46.5 26.2 49.3 25.9 51.5 25.8C53.7 25.7 55.7 25.9 57 26.1C58.2 26.3 58.7 26.8 59 27" stroke="#EE9A1A" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="39" y="10" width="10" height="84.5" rx="4" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"><path d="M46 16 C52 6 66 4 76 8 C70 18 58 22 46 16Z"/><path d="M42 22 C36 12 22 10 12 14 C18 24 30 28 42 22Z"/></g>
    <path d="M59 84C58.7 84.2 58.2 84.7 57 84.9C55.7 85.1 53.7 85.3 51.5 85.2C49.3 85.1 46.5 84.8 44 84.3C41.5 83.7 38.7 82.9 36.5 82C34.3 81.1 32.3 79.8 31 78.6C29.8 77.3 29.3 75.2 29 74.5M59 65C58.7 65.2 58.2 65.7 57 65.9C55.7 66.1 53.7 66.3 51.5 66.2C49.3 66.1 46.5 65.8 44 65.3C41.5 64.7 38.7 63.9 36.5 63C34.3 62.1 32.3 60.8 31 59.6C29.8 58.3 29.3 56.2 29 55.5M59 46C58.7 46.2 58.2 46.7 57 46.9C55.7 47.1 53.7 47.3 51.5 47.2C49.3 47.1 46.5 46.8 44 46.3C41.5 45.7 38.7 44.9 36.5 44C34.3 43.1 32.3 41.8 31 40.6C29.8 39.3 29.3 37.2 29 36.5" stroke="#EE9A1A" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M59 27 C68 20 80 24 82 34 C84 42 76 44 74 38" stroke="#EE9A1A" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M59 84 C64 88 76 90 92 86" stroke="#EE9A1A" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#FBE8EC" stroke="#C98FA1" stroke-width="2" stroke-linejoin="round"><circle cx="30" cy="58" r="3.5"/><circle cx="26" cy="64" r="3.5"/><circle cx="33" cy="65" r="3.5"/><circle cx="84" cy="81" r="3.5"/><circle cx="89" cy="88" r="3.5"/></g>`,
  polpasozyt: `
    <path d="M74 67 C78 58 82 52 90 46 M84 53 C88 52 91 54 93 57" fill="none" stroke="#4A3612" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 70 C22 69 34 72 50 69 C66 66 80 60 94 55 V63 C80 68 66 75 52 79 C36 84 22 82 6 86Z" fill="#8A6A3A" stroke="#4A3612" stroke-width="3" stroke-linejoin="round"/>
    <path d="M48 68 L48 56 L41 46M48 56 L55 46M41 46 L36.7 44.5M41 46 L35 37.1M41 46 L37.8 30M41 46 L44 25.6M55 46 L52 25.6M55 46 L58.2 30M55 46 L61 37.1M55 46 L59.3 44.5" fill="none" stroke="#4F7A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#8DBA4A" stroke="#3F6B26" stroke-width="2.5" stroke-linejoin="round"><ellipse cx="32.2" cy="52.3" rx="9.5" ry="4.5" transform="rotate(120 32.2 52.3)"/><ellipse cx="27.7" cy="44.5" rx="9.5" ry="4.5" transform="rotate(180 27.7 44.5)"/><ellipse cx="26.9" cy="41" rx="9.5" ry="4.5" transform="rotate(154 26.9 41)"/><ellipse cx="27.6" cy="32.1" rx="9.5" ry="4.5" transform="rotate(214 27.6 32.1)"/><ellipse cx="28.8" cy="28.7" rx="9.5" ry="4.5" transform="rotate(188 28.8 28.7)"/><ellipse cx="34.4" cy="21.7" rx="9.5" ry="4.5" transform="rotate(248 34.4 21.7)"/><ellipse cx="37.3" cy="19.6" rx="9.5" ry="4.5" transform="rotate(222 37.3 19.6)"/><ellipse cx="45.9" cy="16.8" rx="9.5" ry="4.5" transform="rotate(282 45.9 16.8)"/><ellipse cx="50.1" cy="16.8" rx="9.5" ry="4.5" transform="rotate(258 50.1 16.8)"/><ellipse cx="58.7" cy="19.6" rx="9.5" ry="4.5" transform="rotate(318 58.7 19.6)"/><ellipse cx="61.6" cy="21.7" rx="9.5" ry="4.5" transform="rotate(292 61.6 21.7)"/><ellipse cx="67.2" cy="28.7" rx="9.5" ry="4.5" transform="rotate(352 67.2 28.7)"/><ellipse cx="68.4" cy="32.1" rx="9.5" ry="4.5" transform="rotate(326 68.4 32.1)"/><ellipse cx="69.1" cy="41" rx="9.5" ry="4.5" transform="rotate(386 69.1 41)"/><ellipse cx="68.3" cy="44.5" rx="9.5" ry="4.5" transform="rotate(0 68.3 44.5)"/><ellipse cx="63.8" cy="52.3" rx="9.5" ry="4.5" transform="rotate(60 63.8 52.3)"/></g>
    <g fill="#FFFFFF" stroke="#7D8F6A" stroke-width="2" stroke-linejoin="round"><circle cx="31.6" cy="38.9" r="3.6"/><circle cx="38.4" cy="38.9" r="3.6"/><circle cx="35" cy="33.5" r="3.6"/><circle cx="44.6" cy="27.4" r="3.6"/><circle cx="51.4" cy="27.4" r="3.6"/><circle cx="48" cy="22" r="3.6"/><circle cx="57.6" cy="38.9" r="3.6"/><circle cx="64.4" cy="38.9" r="3.6"/><circle cx="61" cy="33.5" r="3.6"/></g>`,
  ssawki: `
    <rect x="45" y="5.5" width="45" height="89" rx="2" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <rect x="51" y="7" width="33" height="86" fill="#CFE8C4"/>
    <rect x="62" y="7" width="10" height="86" fill="#D7F0F7" stroke="#2F7F99" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M40 19 C50 19 56 21 63 21.5 A2.5 2.5 0 0 1 63 26.5 C56 27 50 29 40 29ZM40 45 C50 45 56 47 63 47.5 A2.5 2.5 0 0 1 63 52.5 C56 53 50 55 40 55ZM40 71 C50 71 56 73 63 73.5 A2.5 2.5 0 0 1 63 78.5 C56 79 50 81 40 81Z" fill="#F7C843" stroke="#B8650A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M43 11.6C42.8 13.1 42.4 17.8 42.2 20.9C42.1 24.1 42.1 27.2 42.2 30.4C42.2 33.6 42.4 36.8 42.5 40C42.6 43.2 42.9 46.5 43 49.7C43.2 53 43.4 56.2 43.6 59.5C43.7 62.8 43.8 66.1 43.9 69.4C43.9 72.8 43.9 76.1 43.7 79.5C43.6 82.8 43.1 87.9 43 89.5A5 5 0 0 1 33 88.5C33.1 86.9 33.6 82.2 33.7 79.1C33.9 75.9 33.9 72.8 33.9 69.6C33.8 66.4 33.7 63.2 33.6 60C33.4 56.8 33.2 53.5 33.1 50.3C32.9 47 32.7 43.8 32.5 40.5C32.4 37.2 32.2 33.9 32.2 30.6C32.1 27.2 32.1 23.9 32.3 20.5C32.4 17.2 32.9 12.1 33 10.4A5 5 0 0 1 43 11.6Z" fill="#F7C843" stroke="#B8650A" stroke-width="3" stroke-linejoin="round"/>`,
  'organizmy-odzywiajace-sie-szczatkami': `
    <g fill="#FBF7EE" stroke="#7D7462" stroke-width="3" stroke-linejoin="round"><path d="M75 40 V70 H86 V40Z"/><path d="M67 41 C67 22 94 22 94 41 C94 45 67 45 67 41Z"/></g>
    <g fill="#E8DFCB"><circle cx="74" cy="32" r="2.2"/><circle cx="84" cy="29" r="2.2"/><circle cx="88" cy="36" r="1.8"/></g>
    <path d="M8 84C13.7 69.6 37.3 67.2 50 75C41.7 87.3 19.1 94.8 8 84Z" fill="#C9782E" stroke="#6E3A10" stroke-width="3" stroke-linejoin="round"/><path d="M8.8 83.8 Q26 77.9 44.1 76.3" stroke="#6E3A10" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M92 86C81.7 98.1 56.6 93.1 46 82C58.4 72.9 83.9 72.3 92 86Z" fill="#D9A441" stroke="#7A5A12" stroke-width="3" stroke-linejoin="round"/><path d="M91.1 85.9 Q71.6 86.5 52.4 82.6" stroke="#7A5A12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.1 63.2C7.3 62.2 7.8 59.3 8.4 57.3C9 55.3 9.7 53.3 10.7 51.4C11.6 49.6 12.8 47.6 14.3 46C15.8 44.3 17.6 42.5 19.8 41.4C21.9 40.3 24.7 39.5 27.2 39.4C29.7 39.3 32.4 40 34.6 40.9C36.8 41.8 38.8 43.4 40.4 44.9C42.1 46.3 43.4 48.4 44.5 49.7C45.6 51 46.3 52 47.3 52.8C48.2 53.7 49.3 54.3 50.3 54.6C51.2 54.9 52 55 52.8 54.8C53.7 54.6 54.6 54.2 55.4 53.4C56.2 52.7 57 51.7 57.6 50.5C58.3 49.4 58.9 47.3 59.2 46.6A5 5 0 0 1 68.8 49.4C68.4 50.4 67.5 53.5 66.3 55.4C65.2 57.4 63.9 59.4 62 61C60.1 62.5 57.6 64 55.1 64.5C52.6 65.1 49.4 64.7 47 64.1C44.6 63.4 42.5 61.8 40.7 60.4C39 59 37.6 56.9 36.4 55.5C35.2 54.2 34.5 53 33.5 52.1C32.6 51.2 31.5 50.5 30.5 50C29.5 49.6 28.4 49.3 27.5 49.4C26.5 49.4 25.5 49.7 24.6 50.2C23.7 50.7 22.7 51.5 21.9 52.5C21 53.5 20.2 54.7 19.6 56C18.9 57.3 18.4 58.7 17.9 60.2C17.5 61.6 17.1 64 16.9 64.8A5 5 0 0 1 7.1 63.2Z" fill="#F4A3B4" stroke="#A8445A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M8.7 57.8 L17.4 60.3M11 51.9 L19 55.9M14.6 46.4 L21.4 52.3M20 41.9 L24.3 49.8M27.2 39.9 L27.5 48.9M34.5 41.4 L30.8 49.6M40.4 45.5 L34.1 52M44.3 50.3 L37.1 55.7M47.3 53.5 L41.6 60.5M50.4 55.2 L48 63.8M53.3 55.2 L55.9 63.8M56.1 53.5 L62.4 59.9" fill="none" stroke="#C9637F" stroke-width="2" stroke-linejoin="round"/>
    <path d="M48 53.4C48.1 53.5 48.6 53.8 49 54C49.4 54.2 49.7 54.4 50.1 54.5C50.4 54.7 50.7 54.7 51 54.8C51.4 54.9 51.8 54.9 52 54.9L52.1 64.9C51.6 64.8 50.2 64.8 49.3 64.6C48.4 64.5 47.4 64.2 46.6 63.9C45.8 63.6 45 63.2 44.2 62.8C43.5 62.4 42.5 61.7 42.1 61.5Z" fill="#E7879C" stroke="#A8445A" stroke-width="3" stroke-linejoin="round"/>`,
  // Etap 3: ssaki (światy 1 i 5).
  zubr: `
    <path d="M41.5 56 42.5 84 51.5 84 52.5 56Z" fill="#4E2F18" stroke="#2B1A0D" stroke-width="3" stroke-linejoin="round"/>
    <path d="M65 54.3 67.5 84.2 76.5 83.8 77 53.7Z" fill="#4E2F18" stroke="#2B1A0D" stroke-width="3" stroke-linejoin="round"/>
    <rect x="42" y="82" width="10" height="4" rx="1.5" fill="#2B1A0D"/>
    <rect x="67" y="82" width="10" height="4" rx="1.5" fill="#2B1A0D"/>
    <path d="M89.5 42 C93 48 93 55 92 62" fill="none" stroke="#2B1A0D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M92 59 C94.3 63 94.3 69 92 72 C89.7 69 89.7 63 92 59 Z" fill="#3F2512" stroke="#2B1A0D" stroke-width="2" stroke-linejoin="round"/>
    <path d="M29.5 56 31 87 41 87 42.5 56Z" fill="#7A4E2D" stroke="#2B1A0D" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M75 52.3 78 87.2 88 86.8 89 51.7Z" fill="#7A4E2D" stroke="#2B1A0D" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="30.5" y="85" width="11" height="4.5" rx="1.5" fill="#2B1A0D"/>
    <rect x="77.5" y="85" width="11" height="4.5" rx="1.5" fill="#2B1A0D"/>
    <path d="M24 50 C22 38 26 26 34 20 C40 15 48 14 54 16 C64 19 74 26 82 30 C88 33 91 40 90 47 C89 55 86 60 80 62 C70 64 56 64 46 63 C38 63 30 62 27 58 C25 56 24 53 24 50 Z" fill="#7A4E2D"/>
    <path d="M24 50 C22 38 26 26 34 20 C40 15 48 14 54 16 L57 17.5 L53 23 L58 27 L52 32 L57 37 L51 42 L56 47 L50 52 L54 57 L46 63 C38 63 30 62 27 58 C25 56 24 53 24 50 Z" fill="#57351C"/>
    <path d="M24 50 C22 38 26 26 34 20 C40 15 48 14 54 16 C64 19 74 26 82 30 C88 33 91 40 90 47 C89 55 86 60 80 62 C70 64 56 64 46 63 C38 63 30 62 27 58 C25 56 24 53 24 50 Z" fill="none" stroke="#2B1A0D" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M27 31 C26 26 27 23 31 21 C30 25 31 28 33 30 Z" fill="#CDBF9F" stroke="#2B1A0D" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M15 66 C17 72 20 77 25 80 C27 74 28 68 30 58 Z" fill="#3F2512" stroke="#2B1A0D" stroke-width="3" stroke-linejoin="round"/>
    <path d="M32 30 C26 27 18 30 15 36 C12 43 8 54 9 62 C10 67 14 69 19 68 C24 66 29 60 31 53 C33 46 34 37 32 30 Z" fill="#57351C" stroke="#2B1A0D" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M19.5 34 C16.5 29 16.5 24 20.5 21 C20.5 25 22.5 29 25.5 32 Z" fill="#EADFC6" stroke="#2B1A0D" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="19" cy="43" r="2.3" fill="#11191B"/>
    <circle cx="18.3" cy="42.3" r="0.7" fill="#FFFFFF"/>
    <ellipse cx="11" cy="61.5" rx="1.3" ry="1.8" fill="#2B1A0D"/>`,
  los: `
    <path d="M28 30 C22 30 15 28 9.5 24 L6.5 19 L11 20.5 L9.5 14 L15 17.5 L15.5 11 L19.5 16 L22 11.5 L24 18 C25 22 26.5 25 28 28 Z" fill="#BCA677" stroke="#6E5426" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M46 54.2 48 88.1 54 87.9 54 53.8Z" fill="#432A18" stroke="#2A190C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M68.2 51.4 71.7 62 73 68.6 73.5 75.5 73 87.7 79 88.3 80.7 75.9 81 71.8 81.1 67.9 80.8 64.1 80.3 60.2 77.8 48.6Z" fill="#432A18" stroke="#2A190C" stroke-width="3" stroke-linejoin="round"/>
    <rect x="47.5" y="86" width="7" height="3.5" rx="1.2" fill="#2A190C"/>
    <rect x="72.5" y="86" width="7" height="3.5" rx="1.2" fill="#2A190C"/>
    <path d="M36.8 54.2 39 91.1 45 90.9 45.2 53.8Z" fill="#5C3B25" stroke="#2A190C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M75.8 51.8 78.7 59.2 80.1 63.3 81.1 66.9 81.8 70.3 82.2 73.9 82.3 77.8 82 90.7 88 91.3 89.9 78.1 90.2 73.8 90.2 69.6 89.9 65.4 89.3 61.1 88.3 56.4 86.2 48.2Z" fill="#5C3B25" stroke="#2A190C" stroke-width="3" stroke-linejoin="round"/>
    <rect x="38.3" y="89" width="7.5" height="3.8" rx="1.2" fill="#2A190C"/>
    <rect x="81.3" y="89" width="7.5" height="3.8" rx="1.2" fill="#2A190C"/>
    <path d="M32 33 C36 28 41 26 47 27 C59 29 71 31 81 32 C87 33 90 39 89 45 C88 51 86 55 83 57 C71 59 57 59 47 58 C41 58 37 54 35 50 C33 46 31 43 29 41 Z" fill="#5C3B25" stroke="#2A190C" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M33 30 C36 25 40 23 45 23 C43 27 40 30 36 33 Z" fill="#5C3B25" stroke="#2A190C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M25 52 C24 57 25 62 28 64 C30 60 31 55 32 49 Z" fill="#5C3B25" stroke="#2A190C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M34 31 C28 27 20 29 15 33 C11 36 8 40 6.5 45 C5.5 49 7 52 10 52 C12 52 13 53 14 55 C16 57 20 56 24 53 C28 50 32 47 34 43 C36 39 36 34 34 31 Z" fill="#5C3B25" stroke="#2A190C" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="20" cy="37" r="2.1" fill="#11191B"/>
    <circle cx="19.3" cy="36.3" r="0.7" fill="#FFFFFF"/>
    <ellipse cx="8.6" cy="47" rx="1.2" ry="1.7" fill="#2A190C" transform="rotate(20 8.6 47)"/>
    <path d="M30 30 C36 31 45 29 53 25 L58 21 L53 20 L56 14 L50 16.5 L51 10 L46 14 L45 8.5 L41 14 L38 10 L36 17 C34 21 31 25 29 28 Z" fill="#D9C69B" stroke="#6E5426" stroke-width="2.5" stroke-linejoin="round"/>`,
  jelen: `
    <path d="M25 25 C22 18 17 13 10.5 10" fill="none" stroke="#57391F" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.5 19 C22.5 16.5 23 14.5 24 12.5" fill="none" stroke="#57391F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.5 13.7 C17.5 11.5 18 9.5 19 7.5" fill="none" stroke="#57391F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.5 10 C9.5 11.5 8.5 13 8 15" fill="none" stroke="#57391F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M46 64.2 47.8 90.1 52.2 89.9 52 63.8Z" fill="#8E4F2A" stroke="#5A2C12" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M70.4 63.7 74.5 71.9 75.4 74.4 75.9 76.7 76.3 79 76.4 81.5 75.8 89.6 80.2 90.4 81.7 83.4 82 80.3 82.1 77.4 81.9 74.4 81.3 71.4 79.2 64.5 77.6 60.3Z" fill="#8E4F2A" stroke="#5A2C12" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="47.5" y="88.5" width="5" height="3" rx="1" fill="#3A2414"/>
    <rect x="75.5" y="88.5" width="5" height="3" rx="1" fill="#3A2414"/>
    <path d="M37.8 64.2 39.8 92.1 44.2 91.9 44.2 63.8Z" fill="#B4683A" stroke="#5A2C12" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M77.9 63.8 82.1 72.5 83.1 75.2 83.7 77.6 84.1 80.1 84.2 82.8 83.8 91.7 88.2 92.3 90 83.1 90.3 80 90.3 76.8 90 73.6 89.3 70.3 88.3 66.6 86.1 60.2Z" fill="#B4683A" stroke="#5A2C12" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="39.5" y="90.5" width="5" height="3.2" rx="1" fill="#3A2414"/>
    <rect x="83.5" y="90.5" width="5" height="3.2" rx="1" fill="#3A2414"/>
    <path d="M38 66 C34 60 32 52 30 46 C28 42 26 40 24 38 L32 30 C36 36 40 44 48 48 C60 50 74 50 84 50 C90 51 93 55 92 60 C91 65 88 68 84 69 C72 70 56 70 46 69 C42 68 39 67 38 66 Z" fill="#B4683A"/>
    <path d="M84 50 C90 51 93 55 92 60 C91 65 88 68 84 69 C86 63 86 56 84 50 Z" fill="#EED9B8"/>
    <path d="M38 66 C34 60 32 52 30 46 C28 42 26 40 24 38 L32 30 C36 36 40 44 48 48 C60 50 74 50 84 50 C90 51 93 55 92 60 C91 65 88 68 84 69 C72 70 56 70 46 69 C42 68 39 67 38 66 Z" fill="none" stroke="#5A2C12" stroke-width="3" stroke-linejoin="round"/>
    <path d="M30 28 C33 22 37 20 41 20 C40 24 37 28 33 31 Z" fill="#B4683A" stroke="#5A2C12" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M33 31 C30 26 24 25 20 27 C16 29 12 33 9 37 C7 40 9 43 12 43 C17 42 22 40 26 37 C30 35 33 34 33 31 Z" fill="#B4683A" stroke="#5A2C12" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="21" cy="32" r="1.8" fill="#11191B"/>
    <circle cx="9.6" cy="39.4" r="1.5" fill="#3A2414"/>
    <path d="M27 25 C29 18 34 12 42 8" fill="none" stroke="#6B4A2E" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.7 21.5 C24.5 20 21.5 18.5 19 16.5" fill="none" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M30.3 16.5 C28.5 14 27.3 12 26.5 9" fill="none" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35.5 11.5 C35 10 35 8.5 35.5 7" fill="none" stroke="#6B4A2E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 8 C43.5 8.5 45 10 46 12" fill="none" stroke="#6B4A2E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  zebra: `
    <path d="M28 22 L26 12 C34 13 43 20 51 28 L46 36 Z" fill="#FFFFFF"/>
    <path d="M32.5 25.5 29.3 23 28.8 12.6 29 12.6 30.1 13 31.1 13.4 31.8 13.7Z" fill="#11191B"/>
    <path d="M36.5 28 35.7 28 33.5 26.3 33.5 14.4 34.3 14.8 35.3 15.4 36.4 16Z" fill="#11191B"/>
    <path d="M40.5 31.1 39.6 31 37.6 29.5 38.3 17.2 41.2 19.3Z" fill="#11191B"/>
    <path d="M44.5 33.2 42 32.9 41.5 32.5 43 20.7 43.8 21.4 44.8 22.3 45.8 23.1Z" fill="#11191B"/>
    <path d="M28 22 L26 12 C34 13 43 20 51 28 L46 36 Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M46 56.2 48 86.2 54 85.8 54 55.8Z" fill="#E9ECEC"/>
    <path d="M46.8 68.4 47 71.6 54 71.6 54 68.4Z" fill="#11191B"/>
    <path d="M47.3 75.4 47.5 78.6 54 78.6 54 75.4Z" fill="#11191B"/>
    <path d="M47.7 82.4 48 85.6 54 85.6 54 82.4Z" fill="#11191B"/>
    <path d="M46 56.2 48 86.2 54 85.8 54 55.8Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M68.3 55.6 71.7 65 73.1 70.5 73.5 76.1 73 85.6 79 86.4 80.7 76.5 81 73.1 81 69.8 80.8 66.4 80.2 62.9 77.7 52.4Z" fill="#E9ECEC"/>
    <path d="M72.6 68.4 73.1 70.5 73.2 71.6 81 71.6 81 69.8 80.9 68.4Z" fill="#11191B"/>
    <path d="M73.5 75.4 73.5 76.1 73.4 78.6 80.3 78.6 80.7 76.5 80.8 75.4Z" fill="#11191B"/>
    <path d="M73.2 82.4 73 85.6 79.1 85.6 79.7 82.4Z" fill="#11191B"/>
    <path d="M68.3 55.6 71.7 65 73.1 70.5 73.5 76.1 73 85.6 79 86.4 80.7 76.5 81 73.1 81 69.8 80.8 66.4 80.2 62.9 77.7 52.4Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <rect x="47.8" y="85" width="6.5" height="3.5" rx="1.2" fill="#11191B"/>
    <rect x="72.8" y="85" width="6.5" height="3.5" rx="1.2" fill="#11191B"/>
    <path d="M36.8 56.2 39 89.1 45 88.9 45.2 55.8Z" fill="#FFFFFF"/>
    <path d="M37.6 68.4 37.8 71.6 45.1 71.6 45.1 68.4Z" fill="#11191B"/>
    <path d="M38.1 75.4 38.3 78.6 45.1 78.6 45.1 75.4Z" fill="#11191B"/>
    <path d="M38.6 82.4 38.8 85.6 45 85.6 45 82.4Z" fill="#11191B"/>
    <path d="M36.8 56.2 39 89.1 45 88.9 45.2 55.8Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M76.7 55.6 80.4 66.1 81.9 72.2 82.4 78.3 82 88.6 88 89.4 89.8 78.8 90.2 75.1 90.2 71.5 90 67.9 89.6 64 87.3 52.4Z" fill="#FFFFFF"/>
    <path d="M81 68.4 81.8 71.6 90.2 71.6 90 68.4Z" fill="#11191B"/>
    <path d="M82.2 75.4 82.4 78.3 82.4 78.6 89.8 78.6 90.2 75.4Z" fill="#11191B"/>
    <path d="M82.2 82.4 82.1 85.6 88.6 85.6 89.2 82.4Z" fill="#11191B"/>
    <path d="M76.7 55.6 80.4 66.1 81.9 72.2 82.4 78.3 82 88.6 88 89.4 89.8 78.8 90.2 75.1 90.2 71.5 90 67.9 89.6 64 87.3 52.4Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <rect x="38.8" y="88" width="6.5" height="3.8" rx="1.2" fill="#11191B"/>
    <rect x="81.8" y="88" width="6.5" height="3.8" rx="1.2" fill="#11191B"/>
    <path d="M89.5 42 C92.5 48 93 54 92.5 60" fill="none" stroke="#11191B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="92.5" cy="63.5" rx="2" ry="4.2" fill="#11191B"/>
    <path d="M28 30 C30 38 31 46 34 52 C36 58 40 62 46 62 C58 63 72 63 82 62 C88 60 91 54 91 47 C91 40 86 35 78 35 C68 35 56 35 48 34 C40 32 34 24 30 18 Z" fill="#FFFFFF"/>
    <path d="M41.9 61.3 44.5 61.9 49.3 34.1 47 33.7 43.5 32.2Z" fill="#11191B"/>
    <path d="M52.7 62.4 55.3 62.6 58.9 34.8 52.5 34.4Z" fill="#11191B"/>
    <path d="M62.7 62.7 65.4 62.7 68 35 61.7 34.9Z" fill="#11191B"/>
    <path d="M90.4 42.9 89.4 40.8 88 38.9 86.3 37.4 84.2 36.2 81.7 35.4 79.9 35.1 73.6 35Z" fill="#11191B"/>
    <path d="M69.1 46.3 89.5 54.9 89.7 54.3 90.4 52 90.9 49.6 70.9 41.7Z" fill="#11191B"/>
    <path d="M74.7 54.1 73.3 57.9 83.3 61.5 85.4 60.3 87.3 58.4Z" fill="#11191B"/>
    <path d="M29 24 28.1 29.2 36.1 26 33.1 22.3Z" fill="#11191B"/>
    <path d="M28.7 32.8 29.7 37.4 42.9 32.3 42.7 31.7 38.7 28.7Z" fill="#11191B"/>
    <path d="M30.8 42.5 32.1 47.1 47 41.6 45 36.4Z" fill="#11191B"/>
    <path d="M28 30 C30 38 31 46 34 52 C36 58 40 62 46 62 C58 63 72 63 82 62 C88 60 91 54 91 47 C91 40 86 35 78 35 C68 35 56 35 48 34 C40 32 34 24 30 18 Z" fill="none" stroke="#11191B" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M32 19 C32 14 34 10 36 8 C37 12 37 16 35 20 Z" fill="#FFFFFF" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M31 17 C26 14 20 16 17 20 C14 24 11 30 9 35 C7 39 6 44 9 46 C12 48 17 46 20 43 C24 39 30 34 32 28 C33 24 33 20 31 17 Z" fill="#FFFFFF"/>
    <path d="M17.9 19 17.4 19.5 17 20 16.6 20.5 16.3 20.9 29.3 29.1 30.7 26.9Z" fill="#11191B"/>
    <path d="M13.1 26.3 11.9 28.4 26.5 36.6 28.1 34.6Z" fill="#11191B"/>
    <path d="M9 35 C7 39 6 44 9 46 C12 48 17 46 20 43 C17 40 13 37 9 35 Z" fill="#11191B"/>
    <path d="M31 17 C26 14 20 16 17 20 C14 24 11 30 9 35 C7 39 6 44 9 46 C12 48 17 46 20 43 C24 39 30 34 32 28 C33 24 33 20 31 17 Z" fill="none" stroke="#11191B" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M27 19 C26 14 27 10 30 7 C32 11 32 15 31 20 Z" fill="#FFFFFF" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="20" cy="25" r="2" fill="#11191B"/>`,
  antylopa: `
    <path d="M32.1 26.7 32.9 24 33.7 21.7 37.3 15.1 38.3 12.4 38.5 10.5 38.5 9.5 37.9 7.4 37.2 6.1 36.8 6 36.6 6.3 37 9.6 36.7 11.1 36.1 12.5 30.6 20 29.2 22.4 27.9 25.3Z" fill="#3A2A1C" stroke="#3A2A1C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M46.3 62.2 48 90.1 52 89.9 51.7 61.8Z" fill="#A9733A" stroke="#6E4318" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M70.6 61.5 73.4 67.2 74.7 70.3 75.6 73.1 76.2 75.6 76.5 78.1 76.6 80.8 76 89.7 80 90.3 81.4 82.8 81.8 79.5 81.9 76.4 81.4 71.7 80.7 68.4 79.7 64.8 77.4 58.5Z" fill="#A9733A" stroke="#6E4318" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="47.8" y="88.5" width="4.5" height="3" rx="1" fill="#3A2A1C"/>
    <rect x="75.8" y="88.5" width="4.5" height="3" rx="1" fill="#3A2A1C"/>
    <path d="M38 62.2 40 92.1 44 91.9 44 61.8Z" fill="#CF9350" stroke="#6E4318" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M78.1 61.6 81 67.7 82.3 71 83.3 73.8 83.9 76.5 84.3 79.2 84.5 82.1 84 91.7 88 92.3 89.8 82.4 90.1 79.1 90.1 75.8 89.7 72.5 89.1 69 88.1 65.1 85.9 58.4Z" fill="#CF9350" stroke="#6E4318" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="39.8" y="90.5" width="4.5" height="3.2" rx="1" fill="#3A2A1C"/>
    <rect x="83.8" y="90.5" width="4.5" height="3.2" rx="1" fill="#3A2A1C"/>
    <path d="M90 50 C93 52 94 56 93.5 60" fill="none" stroke="#6E4318" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="93.5" cy="61.5" rx="1.8" ry="3" fill="#3A2A1C"/>
    <path d="M38 64 C34 58 32 50 30 44 C28 40 26 38 24 36 L32 28 C36 34 40 42 48 46 C60 48 74 48 84 48 C90 49 93 53 92 58 C91 63 88 66 84 67 C72 68 56 68 46 67 C42 66 39 65 38 64 Z" fill="#CF9350"/>
    <path d="M38 64 36.2 60.9 34.6 57.5 91.2 60.8 90.4 62.3 89.5 63.6 88.4 64.7 86.8 65.9 84 67 79.3 67.3 71 67.7 62.6 67.7 48.6 67.2 46 67 42.8 66.1 39.6 65Z" fill="#FBF4E8"/>
    <path d="M38 64 C34 58 32 50 30 44 C28 40 26 38 24 36 L32 28 C36 34 40 42 48 46 C60 48 74 48 84 48 C90 49 93 53 92 58 C91 63 88 66 84 67 C72 68 56 68 46 67 C42 66 39 65 38 64 Z" fill="none" stroke="#6E4318" stroke-width="3" stroke-linejoin="round"/>
    <path d="M29 27 C33 22 38 21 42 22 C40 26 36 29 32 30 Z" fill="#CF9350" stroke="#6E4318" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M33 29 C30 24 24 23 20 25 C16 27 12 31 9 35 C7 38 9 41 12 41 C17 40 22 38 26 35 C30 33 33 32 33 29 Z" fill="#CF9350"/>
    <path d="M8.2 38 8.6 39.1 9.4 40.1 10.6 40.8 12 41 15.1 40.2 18.2 39.2 21.1 38 23.7 36.6Z" fill="#FBF4E8"/>
    <path d="M33 29 C30 24 24 23 20 25 C16 27 12 31 9 35 C7 38 9 41 12 41 C17 40 22 38 26 35 C30 33 33 32 33 29 Z" fill="none" stroke="#6E4318" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="21" cy="30" r="1.8" fill="#11191B"/>
    <circle cx="9.6" cy="37.6" r="1.4" fill="#3A2A1C"/>
    <path d="M27.1 26.7 27.9 24 28.7 21.7 32.3 15.1 33.3 12.4 33.5 10.5 33.5 9.5 32.9 7.4 32.2 6.1 31.8 6 31.6 6.3 32 9.6 31.7 11.1 31.1 12.5 25.6 20 24.2 22.4 22.9 25.3Z" fill="#3A2A1C" stroke="#3A2A1C" stroke-width="2" stroke-linejoin="round"/>`,
  bawol: `
    <path d="M46 58.3 48 86.2 56 85.8 56 57.7Z" fill="#272A2E" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M67.8 57.9 71.1 66.2 72.3 71 72.6 76.1 72 85.4 80 86.6 81.6 76.7 81.8 73.3 81.8 70.1 81.5 66.9 80.9 63.6 78.2 54.1Z" fill="#272A2E" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <rect x="47" y="84" width="10" height="3.8" rx="1.3" fill="#11191B"/>
    <rect x="71" y="84" width="10" height="3.8" rx="1.3" fill="#11191B"/>
    <path d="M90.5 44 C93.5 50 93.5 56 92.5 62" fill="none" stroke="#11191B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="92.5" cy="65" rx="2" ry="4" fill="#11191B"/>
    <path d="M36 58 37.5 88 46.5 88 48 58Z" fill="#3B3F44" stroke="#11191B" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M75.8 58 79.3 67.3 80.6 72.6 81 78 80.5 87.4 89.5 88.6 91.2 78.6 91.5 75.1 91.5 71.7 91.2 68.2 90.7 64.6 88.2 54Z" fill="#3B3F44" stroke="#11191B" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="37" y="86" width="10" height="4" rx="1.3" fill="#11191B"/>
    <rect x="80" y="86" width="10" height="4" rx="1.3" fill="#11191B"/>
    <path d="M36 34 C42 27 50 24 60 24 C70 24 79 27 86 31 C91 35 93 41 92 48 C91 56 87 62 80 64 C70 66 57 66 47 65 C39 64 34 58 32 51 C31 45 32 39 36 34 Z" fill="#3B3F44" stroke="#11191B" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M18.5 47 C14 45 10 46 8.5 49.5 C12 52.5 16 52 19.5 50 Z" fill="#3B3F44" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <g transform="translate(54 0) scale(-1 1)">
    <path d="M18.5 47 C14 45 10 46 8.5 49.5 C12 52.5 16 52 19.5 50 Z" fill="#3B3F44" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    </g><path d="M17 42 C17 37 37 37 37 42 C37 51 35 59 33 65 C32 69 30 71 27 71 C24 71 22 69 21 65 C19 59 17 51 17 42 Z" fill="#3B3F44" stroke="#11191B" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="27" cy="66" rx="6.5" ry="4.5" fill="#2A2D31"/>
    <ellipse cx="24.3" cy="66.5" rx="1.3" ry="1.8" fill="#9AA0A6"/>
    <ellipse cx="29.7" cy="66.5" rx="1.3" ry="1.8" fill="#9AA0A6"/>
    <circle cx="21.5" cy="50" r="1.9" fill="#11191B"/>
    <circle cx="32.5" cy="50" r="1.9" fill="#11191B"/>
    <circle cx="21" cy="49.3" r="0.7" fill="#FFFFFF"/>
    <circle cx="32" cy="49.3" r="0.7" fill="#FFFFFF"/>
    <path d="M25.5 28.5 21.5 28.8 19.5 29.4 17.6 30.1 15.8 31.1 12.7 33.6 10.2 36.6 9.3 38.3 8.2 41.7 8.1 42.1 9 41.6 11.1 41.7 11.7 42.3 10.9 40.5 9.9 36.2 9.6 32.7 9.8 28.9 9.5 28.3 8.6 28.3 8.2 28.8 7.1 32.4 6.2 37.9 6.3 42.7 6.5 44 7 45.3 8.4 46.7 11.3 46.9 13 45.5 15.3 42 16.1 41.2 17.9 39.9 18.9 39.5 20.7 39 22.5 39 24.5 39.5Z" fill="#B8B1A3" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <g transform="translate(54 0) scale(-1 1)">
    <path d="M25.5 28.5 21.5 28.8 19.5 29.4 17.6 30.1 15.8 31.1 12.7 33.6 10.2 36.6 9.3 38.3 8.2 41.7 8.1 42.1 9 41.6 11.1 41.7 11.7 42.3 10.9 40.5 9.9 36.2 9.6 32.7 9.8 28.9 9.5 28.3 8.6 28.3 8.2 28.8 7.1 32.4 6.2 37.9 6.3 42.7 6.5 44 7 45.3 8.4 46.7 11.3 46.9 13 45.5 15.3 42 16.1 41.2 17.9 39.9 18.9 39.5 20.7 39 22.5 39 24.5 39.5Z" fill="#B8B1A3" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    </g><path d="M13.5 39.5 C13.5 31 20 27.5 27 27.5 C34 27.5 40.5 31 40.5 39.5 C34 36 20 36 13.5 39.5 Z" fill="#B8B1A3" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>`,
  'wiewiorka-pospolita': `
    <path d="M46 88 C64 92 84 80 90 62 C95 46 94 28 86 18 C78 8 64 6 58 14 C54 20 58 26 64 24 C70 30 74 42 70 58 C66 70 58 78 50 80 Z" fill="#B94B22" stroke="#6E2A10" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M30 42 C22 48 18 60 20 72 C22 84 30 90 42 90 C52 90 58 84 58 74 C58 60 52 46 42 40 Z" fill="#C9572B"/>
    <path d="M27 85 28.4 84.8 29.8 84.1 31.1 82.9 32.3 81.4 33.4 79.4 34.3 77.2 35 74.6 35.6 71.9 36 66 35.6 60.1 35 57.4 34.3 54.8 33.4 52.6 32.3 50.6 31.1 49.1 29.8 47.9 28.4 47.2 27 47 25.6 47.2 24.7 47.7 22.8 51 21.7 53.5 20.5 57.4 19.9 60.2 19.5 66 19.6 69 20 72 20.6 74.9 21.5 77.5 22.6 79.9 23.9 82 26.3 84.7Z" fill="#F6E3C8"/>
    <path d="M30 42 C22 48 18 60 20 72 C22 84 30 90 42 90 C52 90 58 84 58 74 C58 60 52 46 42 40 Z" fill="none" stroke="#6E2A10" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="46" cy="76" rx="12" ry="11" fill="#C9572B" stroke="#6E2A10" stroke-width="3"/>
    <ellipse cx="36" cy="89" rx="10" ry="3.2" fill="#C9572B" stroke="#6E2A10" stroke-width="2.5"/>
    <path d="M27 22 C26 17 28 13 31 12 C33 15 33 19 32 23 Z" fill="#C9572B" stroke="#6E2A10" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M32.2 12.8 31.7 10.9 31.5 9.3 32 5.8 31.7 5.5 31.3 5.5 30.1 7.3 29.4 8.9 28.9 10.9 28.8 13.2Z" fill="#7E2E12" stroke="#7E2E12" stroke-width="2" stroke-linejoin="round"/>
    <path d="M42 32 C42 24 36 19 29 20 C23 21 19 25 17 29 C14 32 12 35 14 38 C16 41 21 42 26 42 C35 43 42 39 42 32 Z" fill="#C9572B" stroke="#6E2A10" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M32 22 C31 16 33 12 37 10 C39 14 39 19 37 23 Z" fill="#C9572B" stroke="#6E2A10" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M38.7 10.9 38 8.4 38.5 5.9 38.3 5.6 37.9 5.5 36.6 6.7 35.9 7.8 35.3 9.3 34.9 11.1Z" fill="#7E2E12" stroke="#7E2E12" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="27" cy="30" r="2.6" fill="#11191B"/>
    <circle cx="26.2" cy="29.2" r="0.8" fill="#FFFFFF"/>
    <circle cx="14.2" cy="35" r="1.4" fill="#3A1A0A"/>
    <path d="M19 45.5 C23.5 47.5 26 51.5 26 56 C26 60.5 23 63 19 63 C15 63 12 60.5 12 56 C12 51.5 14.5 47.5 19 45.5 Z" fill="#9A6230" stroke="#5A3612" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M13.4 59.5 C15.5 63 22.5 63 24.6 59.5 C22 60.7 16 60.7 13.4 59.5 Z" fill="#D9B77A" stroke="#5A3612" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="12.8" cy="53" rx="2.8" ry="3.6" fill="#C9572B" stroke="#6E2A10" stroke-width="2.5" transform="rotate(15 12.8 53)"/>
    <ellipse cx="25.6" cy="53" rx="2.8" ry="3.6" fill="#C9572B" stroke="#6E2A10" stroke-width="2.5" transform="rotate(-15 25.6 53)"/>`,
  orzesznica: `
    <path d="M57.6 89.1 60.4 90 63.6 90.7 66.8 91 69.9 91 72.9 90.5 75.8 89.8 78.5 88.7 81.1 87.3 83.4 85.6 85.5 83.7 87.4 81.5 89 79.2 90.4 76.7 91.6 74.1 92.5 71.3 93.1 68.5 93.5 65.6 93.6 62.6 93.5 59.5 93.1 56.4 92.5 53.3 91.5 50.2 90.3 47.1 88.9 44.2 87.4 42.2 85.2 40.9 82.7 40.5 80.2 41.1 78.2 42.6 76.9 44.8 76.5 47.3 77.1 49.8 79 54.3 79.9 58.5 80.1 60.5 79.9 64.2 79.6 65.9 78.6 69 78 70.3 76.4 72.6 74.5 74.4 72.5 75.6 70.2 76.2 67.6 76.3 64.5 75.7 62.4 74.9Z" fill="#D69030" stroke="#8A5612" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M30 50 C22 58 22 76 32 84 C40 90 56 90 64 84 C72 76 72 58 64 50 C56 42 38 42 30 50 Z" fill="#E3A33E"/>
    <path d="M43.9 63.5 43.5 61.1 42.9 58.7 42.1 56.6 41.1 54.7 39.9 53.1 38.5 51.7 37.1 50.8 35.6 50.2 34 50 32.4 50.2 30.9 50.8 29.5 51.7 28.1 53.1 26.9 54.7 25.9 56.6 25.1 59.1 24.5 62.2 24.3 67 24.9 71.8 25.8 74.9 26.9 77.3 28.1 78.9 29.5 80.3 30.9 81.2 32.4 81.8 34 82 35.6 81.8 37.1 81.2 38.5 80.3 39.9 78.9 41.1 77.3 42.1 75.4 42.9 73.3 43.5 70.9 43.9 68.5 44 66Z" fill="#FBEBC8"/>
    <path d="M30 50 C22 58 22 76 32 84 C40 90 56 90 64 84 C72 76 72 58 64 50 C56 42 38 42 30 50 Z" fill="none" stroke="#8A5612" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="37" cy="88.5" rx="9" ry="3.2" fill="#E3A33E" stroke="#8A5612" stroke-width="2.5"/>
    <circle cx="33" cy="16" r="5" fill="#E3A33E" stroke="#8A5612" stroke-width="2.5"/>
    <path d="M50 34 C50 22 42 14 32 14 C22 14 14 22 12 30 C10 34 11 38 14 40 C18 44 26 46 34 46 C44 46 50 42 50 34 Z" fill="#E3A33E" stroke="#8A5612" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="41" cy="16" r="6" fill="#E3A33E" stroke="#8A5612" stroke-width="2.5"/>
    <circle cx="41" cy="16.5" r="3.2" fill="#F2C893"/>
    <circle cx="27" cy="28" r="5" fill="#11191B"/>
    <circle cx="25.4" cy="26.4" r="1.6" fill="#FFFFFF"/>
    <circle cx="12.6" cy="35" r="1.8" fill="#8A4A3A"/>
    <path d="M14 38 L6.5 36.5 M14.5 39.5 L7.5 42" fill="none" stroke="#8A5612" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 50 C26.5 52 29 56 29 61 C29 65.5 26 68 22 68 C18 68 15 65.5 15 61 C15 56 17.5 52 22 50 Z" fill="#9A6230" stroke="#5A3612" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M16 63.5 C18 67.5 26 67.5 28 63.5 C25.5 64.8 18.5 64.8 16 63.5 Z" fill="#D9B77A" stroke="#5A3612" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="15.5" cy="58" rx="3.4" ry="3" fill="#E3A33E" stroke="#8A5612" stroke-width="2.5"/>
    <ellipse cx="28.5" cy="58" rx="3.4" ry="3" fill="#E3A33E" stroke="#8A5612" stroke-width="2.5"/>`,
  wilk: `
    <path d="M43.3 55.2 45 85.2 51 84.8 50.7 54.8Z" fill="#6E777D" stroke="#2F363A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M66.5 53.6 69.4 60.4 70.6 64 71.5 67.1 71.9 69.8 72.1 72.5 71.9 75.2 71.4 78.4 70.1 84.1 75.9 85.9 78.4 78.1 79.1 74.6 79.5 71.2 79.5 67.6 79 63.9 78.2 59.9 77 55.5 75.5 50.4Z" fill="#6E777D" stroke="#2F363A" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="47.5" cy="86" rx="4.5" ry="2.4" fill="#6E777D" stroke="#2F363A" stroke-width="2"/>
    <ellipse cx="72.5" cy="86" rx="4.5" ry="2.4" fill="#6E777D" stroke="#2F363A" stroke-width="2"/>
    <path d="M83 37 C89 40 93 50 92.5 62 C92 70 88.5 75 85.5 72 C82.5 66 83.5 56 80.5 46 Z" fill="#8D969C"/>
    <path d="M92.4 63.5 92 65.7 91.4 68.1 89.9 71.1 88.9 72.3 87.8 72.8 86.6 72.8 85.9 72.3 85.5 72 84.5 69.6 83.4 64.1Z" fill="#2F363A"/>
    <path d="M83 37 C89 40 93 50 92.5 62 C92 70 88.5 75 85.5 72 C82.5 66 83.5 56 80.5 46 Z" fill="none" stroke="#2F363A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M34 54.8 34 86.9 40 87.1 42 55.2Z" fill="#8D969C" stroke="#2F363A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M74 53.7 77 61.1 78.3 65.1 79.2 68.4 79.6 71.3 79.7 74.1 79.5 76.9 78.8 80.1 77.2 85.9 82.8 88.1 86 80.3 87 76.6 87.5 73 87.6 69.2 87.3 65.2 86.6 60.8 85.5 55.9 84 50.3Z" fill="#8D969C" stroke="#2F363A" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="35.5" cy="88" rx="5" ry="2.6" fill="#8D969C" stroke="#2F363A" stroke-width="2"/>
    <ellipse cx="78.5" cy="88" rx="5" ry="2.6" fill="#8D969C" stroke="#2F363A" stroke-width="2"/>
    <path d="M27 44 C28 54 34 60 42 61 C50 62 58 58 66 56 C74 55 80 56 84 52 C88 48 89 42 87 38 C85 34 80 33 74 33 C62 33 50 31 42 29 C37 28 33 26 31 24 C29 30 28 37 27 44 Z" fill="#8D969C"/>
    <path d="M41.9 52.6 41.5 51.2 40.8 49.9 39.9 48.7 38.8 47.6 36 46 32.7 45.1 31 45 29.3 45.1 27.2 45.6 28.2 49.7 30.1 53.5 32.5 56.6 34 57.8 36.4 59.3 38.8 60.3 39.9 59.3 40.8 58.1 41.5 56.8 41.9 55.4 42 54Z" fill="#DCE1E3"/>
    <path d="M27 44 C28 54 34 60 42 61 C50 62 58 58 66 56 C74 55 80 56 84 52 C88 48 89 42 87 38 C85 34 80 33 74 33 C62 33 50 31 42 29 C37 28 33 26 31 24 C29 30 28 37 27 44 Z" fill="none" stroke="#2F363A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M28 18 L32 7 L36 19 Z" fill="#6E777D" stroke="#2F363A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M36 26 C34 19 27 15 20 17 C16 18 13 21 11 24 L7 29 C5.8 31 6.2 34 8.5 35 L15 37.5 C21 39.5 28 38 33 34 C35.5 32 36.5 29 36 26 Z" fill="#8D969C"/>
    <path d="M6.4 32 6.8 33.4 8 34.7 15 37.5 18.9 38.3 22.8 38.2 25.2 37.8 27.4 37.1 29.6 36.2 31.7 34.9 33.3 33.7 34.6 32.3 35.5 30.7 36 29Z" fill="#DCE1E3"/>
    <path d="M36 26 C34 19 27 15 20 17 C16 18 13 21 11 24 L7 29 C5.8 31 6.2 34 8.5 35 L15 37.5 C21 39.5 28 38 33 34 C35.5 32 36.5 29 36 26 Z" fill="none" stroke="#2F363A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M22 19 L25 6 L31 17 Z" fill="#8D969C" stroke="#2F363A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24.6 15 L25.6 10.5 L28.2 14.6 Z" fill="#6E777D"/>
    <circle cx="19.5" cy="24.5" r="1.9" fill="#11191B"/>
    <ellipse cx="7.3" cy="31.6" rx="1.7" ry="1.6" fill="#11191B"/>`,
  rys: `
    <path d="M46 56.2 47.5 86.2 54.5 85.8 54 55.8Z" fill="#A97D45" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M63.4 55.9 66.1 62 67.3 65.2 68.1 67.9 68.5 70.4 68.6 72.9 68.5 75.6 68 78.9 66.6 85.1 73.4 86.9 75.9 78.7 76.6 75.2 77 71.7 76.9 68.2 76.4 64.6 75.5 60.8 74.2 56.7 72.6 52.1Z" fill="#A97D45" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="51" cy="87" rx="5.5" ry="2.8" fill="#A97D45" stroke="#6A4520" stroke-width="2"/>
    <ellipse cx="70" cy="87" rx="5.5" ry="2.8" fill="#A97D45" stroke="#6A4520" stroke-width="2"/>
    <path d="M80.4 42.2 85.8 41.8 87.9 41.9 91.9 42.5 93 42.1 93.9 41.3 94.4 40.2 94.5 39.1 94.1 38 93.3 37.1 91.1 36.3 86 35.6 83.5 35.5 79.6 35.8Z" fill="#C99A5E"/>
    <path d="M88.3 42 91.9 42.5 93 42.1 93.9 41.3 94.4 40.2 94.5 39.1 94.1 38 93.3 37.1 91.1 36.3 88.3 35.9Z" fill="#11191B"/>
    <path d="M80.4 42.2 85.8 41.8 87.9 41.9 91.9 42.5 93 42.1 93.9 41.3 94.4 40.2 94.5 39.1 94.1 38 93.3 37.1 91.1 36.3 86 35.6 83.5 35.5 79.6 35.8Z" fill="none" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M37.8 55.8 37.3 87.8 44.7 88.2 46.2 56.2Z" fill="#C99A5E"/>
    <circle cx="41" cy="72" r="1.6" fill="#6E4C2A"/>
    <circle cx="42.5" cy="80" r="1.4" fill="#6E4C2A"/>
    <path d="M37.8 55.8 37.3 87.8 44.7 88.2 46.2 56.2Z" fill="none" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M71.8 55.9 74.6 62.7 75.9 66.2 76.6 69.2 77 71.9 77.1 74.5 76.8 77.3 76.2 80.6 74.5 86.8 81.5 89.2 84.6 80.9 85.6 77.2 86.1 73.5 86.2 69.7 85.8 65.9 84.9 61.7 83.7 57.2 82.2 52.1Z" fill="#C99A5E"/>
    <circle cx="81" cy="70" r="1.6" fill="#6E4C2A"/>
    <circle cx="79" cy="79" r="1.4" fill="#6E4C2A"/>
    <path d="M71.8 55.9 74.6 62.7 75.9 66.2 76.6 69.2 77 71.9 77.1 74.5 76.8 77.3 76.2 80.6 74.5 86.8 81.5 89.2 84.6 80.9 85.6 77.2 86.1 73.5 86.2 69.7 85.8 65.9 84.9 61.7 83.7 57.2 82.2 52.1Z" fill="none" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="40.5" cy="89" rx="6" ry="3" fill="#C99A5E" stroke="#6A4520" stroke-width="2"/>
    <ellipse cx="78" cy="89" rx="6" ry="3" fill="#C99A5E" stroke="#6A4520" stroke-width="2"/>
    <path d="M38 36 C46 32 58 32 68 33 C76 34 82 37 84 43 C86 50 84 58 79 60 C67 63 54 63 44 61 C38 60 34 54 34 46 C34 42 35 39 38 36 Z" fill="#C99A5E"/>
    <ellipse cx="48" cy="40" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="57" cy="38" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="66" cy="39" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="75" cy="41" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="52" cy="49" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="62" cy="47" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="72" cy="48" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="80" cy="49" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="45" cy="56" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="56" cy="56" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="67" cy="56" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <ellipse cx="76" cy="56" rx="2.2" ry="1.7" fill="#6E4C2A"/>
    <path d="M38 36 C46 32 58 32 68 33 C76 34 82 37 84 43 C86 50 84 58 79 60 C67 63 54 63 44 61 C38 60 34 54 34 46 C34 42 35 39 38 36 Z" fill="none" stroke="#6A4520" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M12 26 L13 12 L21 21 Z" fill="#C99A5E" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    <g transform="translate(48 0) scale(-1 1)">
    <path d="M12 26 L13 12 L21 21 Z" fill="#C99A5E" stroke="#6A4520" stroke-width="2.5" stroke-linejoin="round"/>
    </g><path d="M14.5 12.9 12.8 7.1 12.3 6.1 11.9 6 11.6 6.2 11.5 6.6 11.6 9.7 11.5 13.1Z" fill="#11191B" stroke="#11191B" stroke-width="2" stroke-linejoin="round"/>
    <g transform="translate(48 0) scale(-1 1)">
    <path d="M14.5 12.9 12.8 7.1 12.3 6.1 11.9 6 11.6 6.2 11.5 6.6 11.6 9.7 11.5 13.1Z" fill="#11191B" stroke="#11191B" stroke-width="2" stroke-linejoin="round"/>
    </g><path d="M24 18 C31 18 36 22 37 28 L39 35 L37 37 L41 42 L38 43 L41 49 C35 48 29 50 24 51 C19 50 13 48 7 49 L10 43 L7 42 L11 37 L9 35 L11 28 C12 22 17 18 24 18 Z" fill="#C99A5E"/>
    <path d="M16 37.6 17.6 35.7 18.7 34.9 21.2 33.9 24 33.5 26.8 33.9 29.3 34.9 30.4 35.7 32 37.6 32.9 39.8 33 41 32.6 43.3 32 44.4 30.4 46.3 28.1 47.7 26.8 48.1 24 48.5 22.6 48.4 19.9 47.7 17.6 46.3 16 44.4 15.4 43.3 15 41 15.1 39.8Z" fill="#F2E3C6"/>
    <path d="M10 37.5 L14.5 39.5 M9 43.5 L14.5 43" fill="none" stroke="#6A4520" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M38 37.5 L33.5 39.5 M39 43.5 L33.5 43" fill="none" stroke="#6A4520" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 18 C31 18 36 22 37 28 L39 35 L37 37 L41 42 L38 43 L41 49 C35 48 29 50 24 51 C19 50 13 48 7 49 L10 43 L7 42 L11 37 L9 35 L11 28 C12 22 17 18 24 18 Z" fill="none" stroke="#6A4520" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="19.5" cy="33" rx="1.8" ry="2.2" fill="#11191B"/>
    <ellipse cx="28.5" cy="33" rx="1.8" ry="2.2" fill="#11191B"/>
    <path d="M21.8 38 L26.2 38 L24 40.5 Z" fill="#9C5B4A" stroke="#9C5B4A" stroke-width="2" stroke-linejoin="round"/>
    <path d="M24 41 C23 43 21.5 43.5 20.5 42.8 M24 41 C25 43 26.5 43.5 27.5 42.8" fill="none" stroke="#6A4520" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  'hiena-cetkowana': `
    <path d="M43.8 54.2 45.8 86.2 52.2 85.8 52.2 53.8Z" fill="#A9884F" stroke="#5B4426" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M68 60 70.6 65 71.8 67.6 72.5 69.8 72.9 71.9 73 74 72.8 76.4 72.3 79.4 70.9 85.1 77.1 86.9 79.5 79.4 80.5 74.5 80.5 69.8 80 66.6 79 63.4 76 56Z" fill="#A9884F" stroke="#5B4426" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="48.5" cy="87" rx="5" ry="2.6" fill="#A9884F" stroke="#5B4426" stroke-width="2"/>
    <ellipse cx="73.5" cy="87" rx="5" ry="2.6" fill="#A9884F" stroke="#5B4426" stroke-width="2"/>
    <path d="M83.9 49.4 85.9 51.2 88.3 54.2 89.8 57.7 90.3 60.4 94.3 59.6 93.5 56.5 92.2 53.6 90.6 51 88.5 48.6 86.1 46.6Z" fill="#CDAA6E" stroke="#5B4426" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="92.2" cy="63.5" rx="2.3" ry="4.5" fill="#3B2E22" stroke="#5B4426" stroke-width="2"/>
    <path d="M35.3 53.8 35.5 87.8 42.5 88.2 44.7 54.2Z" fill="#CDAA6E"/>
    <circle cx="40" cy="70" r="1.6" fill="#5B4426"/>
    <circle cx="38.5" cy="78" r="1.5" fill="#5B4426"/>
    <path d="M35.3 53.8 35.5 87.8 42.5 88.2 44.7 54.2Z" fill="none" stroke="#5B4426" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M75.4 60 78.1 65.7 79.3 68.7 80 71.1 80.4 73.4 80.4 75.6 80.1 78.1 79.5 81.1 77.7 86.8 84.3 89.2 87.3 81.6 88.6 76.5 88.9 73.1 88.8 71.4 88.4 67.9 87.5 64.3 84.6 56Z" fill="#CDAA6E"/>
    <circle cx="83" cy="72" r="1.6" fill="#5B4426"/>
    <circle cx="81.5" cy="80" r="1.5" fill="#5B4426"/>
    <path d="M75.4 60 78.1 65.7 79.3 68.7 80 71.1 80.4 73.4 80.4 75.6 80.1 78.1 79.5 81.1 77.7 86.8 84.3 89.2 87.3 81.6 88.6 76.5 88.9 73.1 88.8 71.4 88.4 67.9 87.5 64.3 84.6 56Z" fill="none" stroke="#5B4426" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="38.5" cy="89" rx="5.5" ry="2.8" fill="#CDAA6E" stroke="#5B4426" stroke-width="2"/>
    <ellipse cx="80.5" cy="89" rx="5.5" ry="2.8" fill="#CDAA6E" stroke="#5B4426" stroke-width="2"/>
    <path d="M31.6 29.7 30.2 26.5 33.6 27.3 32.9 23.9 36.1 25.2 36 21.7 39 23.6 39.6 20.2 42.3 22.5 43.6 19.2 45.9 22 47.8 18.9 49.9 21.9 52.4 19.2 54.1 22.5 52 30 34 34Z" fill="#3B2E22" stroke="#5B4426" stroke-width="2" stroke-linejoin="round"/>
    <path d="M28 40 C32 31 38 25 46 25 C58 26 70 34 80 41 C86 45 89 50 88 55 C87 61 83 64 77 64 C66 65 52 64 42 62 C36 61 32 57 30 51 C29 47 28 43 28 40 Z" fill="#CDAA6E"/>
    <circle cx="44" cy="33" r="2" fill="#5B4426"/>
    <circle cx="53" cy="34" r="2" fill="#5B4426"/>
    <circle cx="62" cy="38" r="2" fill="#5B4426"/>
    <circle cx="71" cy="43" r="2" fill="#5B4426"/>
    <circle cx="79" cy="48" r="2" fill="#5B4426"/>
    <circle cx="42" cy="44" r="2" fill="#5B4426"/>
    <circle cx="51" cy="45" r="2" fill="#5B4426"/>
    <circle cx="60" cy="47" r="2" fill="#5B4426"/>
    <circle cx="69" cy="51" r="2" fill="#5B4426"/>
    <circle cx="78" cy="56" r="2" fill="#5B4426"/>
    <circle cx="45" cy="55" r="2" fill="#5B4426"/>
    <circle cx="55" cy="56" r="2" fill="#5B4426"/>
    <circle cx="65" cy="58" r="2" fill="#5B4426"/>
    <circle cx="36" cy="51" r="2" fill="#5B4426"/>
    <circle cx="84" cy="53" r="2" fill="#5B4426"/>
    <path d="M28 40 C32 31 38 25 46 25 C58 26 70 34 80 41 C86 45 89 50 88 55 C87 61 83 64 77 64 C66 65 52 64 42 62 C36 61 32 57 30 51 C29 47 28 43 28 40 Z" fill="none" stroke="#5B4426" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M28 27 C27 21 29 17 33 17.5 C36.5 18.5 36.5 24 34 28 Z" fill="#CDAA6E" stroke="#5B4426" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M36 36 C35 28 28 23 21 24 C16 25 12 29 10 33 C7 37 6 42 10 44 C16 46 25 46 31 43 C35 41 37 39 36 36 Z" fill="#CDAA6E"/>
    <path d="M12.9 44.5 14.2 42.4 14.7 41.1 14.9 39.8 14.9 37.2 14.7 35.9 13.7 33.5 12.9 32.5 11.2 30.9 8.2 36.1 7.5 38.2 7.4 40.2 7.9 42 9.1 43.4 10.8 44.2 12.7 44.7Z" fill="#3B2E22"/>
    <path d="M36 36 C35 28 28 23 21 24 C16 25 12 29 10 33 C7 37 6 42 10 44 C16 46 25 46 31 43 C35 41 37 39 36 36 Z" fill="none" stroke="#5B4426" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M21.5 27 C19.5 21 21.5 16 25.5 16 C29.5 16 30.5 21 28.5 27 Z" fill="#CDAA6E" stroke="#5B4426" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M23.2 25 C22.2 21.5 23.5 19 25.5 19 C27.5 19 28.3 21.5 27.2 25 Z" fill="#3B2E22"/>
    <circle cx="21" cy="31.5" r="1.9" fill="#11191B"/>
    <circle cx="8.3" cy="37.5" r="1.8" fill="#11191B"/>`,
  'niedzwiedz-brunatny': `
    <path d="M40 60.4 42 85.3 52 84.7 52 59.6Z" fill="#6E4520" stroke="#45280F" stroke-width="3" stroke-linejoin="round"/>
    <path d="M64.5 60.4 67 85.3 77 84.7 77.5 59.6Z" fill="#6E4520" stroke="#45280F" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="46" cy="86" rx="7" ry="3" fill="#6E4520" stroke="#45280F" stroke-width="2.5"/>
    <ellipse cx="71" cy="86" rx="7" ry="3" fill="#6E4520" stroke="#45280F" stroke-width="2.5"/>
    <path d="M27.3 59.6 27.5 86.7 38.5 87.3 40.7 60.4Z" fill="#8C5A2E" stroke="#45280F" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M75 60.4 77.5 87.3 88.5 86.7 89 59.6Z" fill="#8C5A2E" stroke="#45280F" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="32" cy="88" rx="8" ry="3.4" fill="#8C5A2E" stroke="#45280F" stroke-width="2.5"/>
    <ellipse cx="82" cy="88" rx="8" ry="3.4" fill="#8C5A2E" stroke="#45280F" stroke-width="2.5"/>
    <path d="M24 52 C24 40 29 30 37 25 C42 21 50 20 56 23 C62 26 70 28 78 30 C88 33 94 42 92 54 C91 63 85 68 76 68 C64 69 50 69 40 67 C32 66 26 60 24 52 Z" fill="#8C5A2E" stroke="#45280F" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="32" cy="31" r="4.5" fill="#8C5A2E" stroke="#45280F" stroke-width="2.5"/>
    <path d="M36 36 C33 30 25 29 20 32 C17 34 15 36 13 38 C8 40 5 44 6 49 C7 53 13 54 18 53 C25 52 32 49 35 45 C37 42 38 39 36 36 Z" fill="#8C5A2E"/>
    <path d="M18.3 52.4 19.6 50.3 20 48 19.6 45.7 18.3 43.6 16.3 41.9 13.8 40.9 11 40.5 8.6 40.8 7 42.9 6 45.5 5.8 47.2 6 49 6.9 50.8 7.6 51.5 8.9 52.3 10.5 52.9 12.3 53.2 14.2 53.4 16.7 53.2 17.4 53.1Z" fill="#C09060"/>
    <path d="M36 36 C33 30 25 29 20 32 C17 34 15 36 13 38 C8 40 5 44 6 49 C7 53 13 54 18 53 C25 52 32 49 35 45 C37 42 38 39 36 36 Z" fill="none" stroke="#45280F" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="26" cy="31.5" r="4.8" fill="#8C5A2E" stroke="#45280F" stroke-width="2.5"/>
    <circle cx="26" cy="32" r="2.3" fill="#6E4520"/>
    <circle cx="20.5" cy="38.5" r="1.8" fill="#11191B"/>
    <ellipse cx="7.6" cy="45.8" rx="2.1" ry="2.4" fill="#2A180A"/>
    <path d="M8.5 50 C10.5 51.5 13 51.5 15 50.5" fill="none" stroke="#45280F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  dzik: `
    <path d="M30.7 30.6 29.7 25.3 33.8 28.9 33.9 23.4 37.4 27.6 38.4 22.2 41.5 26.8 43.2 21.5 45.9 26.4 48.3 21.4 50.6 26.4 53.5 21.7 55.5 26.9 59 22.4 60.7 27.8 64.5 23.6 65.8 29.1 70 25.2 71.1 30.9 75.6 27.3 76.2 33 81 29.8 81.2 35.6 79 44 33 40Z" fill="#3E342D" stroke="#2A221C" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M44.3 58.2 46 85.2 52 84.8 51.7 57.8Z" fill="#463C35" stroke="#2A221C" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M67.9 59.8 71.1 66.9 72.2 71.1 72.3 73.2 72.3 75.7 71.1 84.3 76.9 85.7 79.2 76.6 79.6 73.5 79.7 70.5 79.4 67.6 78.9 64.6 76.8 58.1 76.1 56.2Z" fill="#463C35" stroke="#2A221C" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="46" y="83.5" width="6" height="3.5" rx="1.2" fill="#2A221C"/>
    <rect x="71" y="83.5" width="6" height="3.5" rx="1.2" fill="#2A221C"/>
    <path d="M89 46 C92.5 50 93.5 54 92.5 58" fill="none" stroke="#2A221C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="92.5" cy="60.5" rx="1.8" ry="3.2" fill="#3E342D"/>
    <path d="M34.8 58 35.8 87 42.3 87 43.3 58Z" fill="#5E5047" stroke="#2A221C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M74.8 57.7 78.3 67 79.6 72.3 79.8 74.8 79.8 77.4 79.6 80.5 78.8 86.3 85.2 87.7 86.8 81.8 87.6 78.4 88.1 75.1 88.2 71.8 88.1 68.4 87.6 64.8 85.2 54.3Z" fill="#5E5047" stroke="#2A221C" stroke-width="3" stroke-linejoin="round"/>
    <rect x="35.7" y="85.5" width="6.6" height="3.8" rx="1.2" fill="#2A221C"/>
    <rect x="78.7" y="85.5" width="6.6" height="3.8" rx="1.2" fill="#2A221C"/>
    <path d="M25 42 C29 32 39 26 51 27 C63 28 75 32 83 38 C89 42 91 50 89 56 C87 62 81 66 73 66 C61 67 47 67 37 64 C31 62 27 56 25 50 Z" fill="#5E5047"/>
    <path d="M45 40 l3 -4 M53 44 l3 -4 M61 41 l3 -4 M69 46 l3 -4 M49 52 l3 -4 M59 54 l3 -4 M71 56 l3 -4" fill="none" stroke="#3E342D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25 42 C29 32 39 26 51 27 C63 28 75 32 83 38 C89 42 91 50 89 56 C87 62 81 66 73 66 C61 67 47 67 37 64 C31 62 27 56 25 50 Z" fill="none" stroke="#2A221C" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M38 36 C32 32 24 34 18 40 C14 44 10 50 8 54 C7 56 7 60 9 61 L14 62 C20 63 28 62 34 58 C38 54 40 46 38 36 Z" fill="#5E5047" stroke="#2A221C" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M31 36 L34 25 L38 35 Z" fill="#3E342D" stroke="#2A221C" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="8.6" cy="57.5" rx="2.6" ry="4.2" fill="#C9A49A" stroke="#2A221C" stroke-width="2"/>
    <circle cx="8.6" cy="56" r="0.8" fill="#2A221C"/>
    <circle cx="8.6" cy="59" r="0.8" fill="#2A221C"/>
    <path d="M17.7 59 16 58.2 15.2 57.4 14.2 55.2 13.9 52.7 13.5 52.5 13.2 52.6 12.8 54.1 12.7 56.4 13.1 58.4 14 60.1 14.7 60.9 16.3 62Z" fill="#F4EEE0" stroke="#2A221C" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="24" cy="44" r="1.7" fill="#11191B"/>`,
  lis: `
    <path d="M72 40 C80 39 88.5 45 92.5 55 C94.5 61 93.5 68 90.5 70 C86.5 72 83 68 81 64 C79 58 75.5 52 70 50 Z" fill="#E06A2A"/>
    <path d="M93.5 60.3 93.4 64 93 66 92.4 67.7 91.5 69 90.5 70 88.5 70.5 87.6 70.5 86.3 70 85 69.3 83.8 68.2 81.5 65 79.9 61Z" fill="#FFFFFF"/>
    <path d="M72 40 C80 39 88.5 45 92.5 55 C94.5 61 93.5 68 90.5 70 C86.5 72 83 68 81 64 C79 58 75.5 52 70 50 Z" fill="none" stroke="#8A3410" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M44 52.1 45.8 85.1 50.2 84.9 50 51.9Z" fill="#B4501C"/>
    <path d="M45 70 45.8 85.1 50.2 84.9 50.1 70Z" fill="#3A2A22"/>
    <path d="M44 52.1 45.8 85.1 50.2 84.9 50 51.9Z" fill="none" stroke="#8A3410" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M60.2 51.4 63.1 58.2 64.4 61.9 65.2 65.1 65.8 68.1 66 71.1 66 74.3 64.8 84.6 69.2 85.4 71.2 76.7 71.7 73 72 69.4 71.7 64 71 60.2 70 56 67.8 48.6Z" fill="#B4501C"/>
    <path d="M66 72 66 74.3 64.8 84.6 69.2 85.4 71.2 76.7 71.7 73 71.8 72Z" fill="#3A2A22"/>
    <path d="M60.2 51.4 63.1 58.2 64.4 61.9 65.2 65.1 65.8 68.1 66 71.1 66 74.3 64.8 84.6 69.2 85.4 71.2 76.7 71.7 73 72 69.4 71.7 64 71 60.2 70 56 67.8 48.6Z" fill="none" stroke="#8A3410" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="47.5" cy="86" rx="3.8" ry="2.2" fill="#3A2A22"/>
    <ellipse cx="66.5" cy="86" rx="3.8" ry="2.2" fill="#3A2A22"/>
    <path d="M34.8 51.9 34.5 87.9 39.5 88.1 41.2 52.1Z" fill="#E06A2A"/>
    <path d="M34.6 72 34.5 87.9 39.5 88.1 40.3 72Z" fill="#3A2A22"/>
    <path d="M34.8 51.9 34.5 87.9 39.5 88.1 41.2 52.1Z" fill="none" stroke="#8A3410" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M67.7 51.4 70.6 59 71.9 63 72.8 66.5 73.3 69.8 73.5 73 73.3 76.4 72.8 80.3 71.6 87.4 76.4 88.6 79 79.3 79.8 75.3 80.2 71.4 80 65.5 79.4 61.3 78.4 56.7 76.3 48.6Z" fill="#E06A2A"/>
    <path d="M73.4 74 72.8 80.3 71.6 87.4 76.4 88.6 79 79.3 79.9 74Z" fill="#3A2A22"/>
    <path d="M67.7 51.4 70.6 59 71.9 63 72.8 66.5 73.3 69.8 73.5 73 73.3 76.4 72.8 80.3 71.6 87.4 76.4 88.6 79 79.3 79.8 75.3 80.2 71.4 80 65.5 79.4 61.3 78.4 56.7 76.3 48.6Z" fill="none" stroke="#8A3410" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="36" cy="89" rx="4.2" ry="2.4" fill="#3A2A22"/>
    <ellipse cx="73" cy="89" rx="4.2" ry="2.4" fill="#3A2A22"/>
    <path d="M25 44 C29 50 35 54 41 55 C51 57 63 57 71 55 C77 53 80 48 79 43 C78 38 73 36 67 36 C57 36 47 35 39 34 C33 33 29 31 27 29 C26 34 25 39 25 44 Z" fill="#E06A2A"/>
    <path d="M25 44 26.6 46.2 29 48.7 30.9 50.4 33.3 52 34.6 48.7 35 45 34.9 43.1 34 39.6 33.3 37.9 32.4 36.5 31.3 35.3 30.1 34.3 28.8 33.6 27.4 33.1 26.2 33 25.3 39Z" fill="#FFFFFF"/>
    <path d="M25 44 C29 50 35 54 41 55 C51 57 63 57 71 55 C77 53 80 48 79 43 C78 38 73 36 67 36 C57 36 47 35 39 34 C33 33 29 31 27 29 C26 34 25 39 25 44 Z" fill="none" stroke="#8A3410" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M26 20 L30 8 L33 21 Z" fill="#B4501C" stroke="#8A3410" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M31 30 C30 23 24 19 18 20 C14 21 12 24 10 27 L6.5 31.5 C5.5 33.5 6.5 35 8.5 35 L15 37 C21 39 27 38 30 35 C31 33 31 32 31 30 Z" fill="#E06A2A"/>
    <path d="M31 30 6.1 33.1 6.5 34.2 7.4 34.8 16.5 37.4 20.2 38 23.6 37.9 25.5 37.5 27.2 36.9 28.7 36 30 35 30.8 32.9Z" fill="#FFFFFF"/>
    <path d="M31 30 C30 23 24 19 18 20 C14 21 12 24 10 27 L6.5 31.5 C5.5 33.5 6.5 35 8.5 35 L15 37 C21 39 27 38 30 35 C31 33 31 32 31 30 Z" fill="none" stroke="#8A3410" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M20 21 L23 8 L29 19 Z" fill="#E06A2A"/>
    <path d="M21.8 13 23 8 25.7 13Z" fill="#3A2A22"/>
    <path d="M20 21 L23 8 L29 19 Z" fill="none" stroke="#8A3410" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="18" cy="26" r="1.7" fill="#11191B"/>
    <circle cx="6.8" cy="33" r="1.6" fill="#11191B"/>`,
  czlowiek: `
    <path d="M37 62 L63 62 L62 89 L52.5 89 L50 72 L47.5 89 L38 89 Z" fill="#2F6F94" stroke="#1E4A66" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="42" cy="91" rx="7" ry="3.5" fill="#11191B"/>
    <ellipse cx="58" cy="91" rx="7" ry="3.5" fill="#11191B"/>
    <path d="M35.5 39.6 30.5 45.4 27.8 49.4 25.5 53.6 24.6 55.7 23.1 60.1 28.9 61.9 30.3 58.1 33.2 52.9 35.8 49.5 40.5 44.4Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="25.5" cy="63" r="4.5" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5"/>
    <path d="M64.1 44.8 67.7 41.9 69.3 40.2 72.2 36.6 74.7 32.6 77.7 26.2 72.3 23.8 69.3 29.4 67 32.7 64.5 35.6 63.1 36.8 59.9 39.2Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="76" cy="22.5" r="4.5" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5"/>
    <path d="M37 37 C42 35 58 35 63 37 L71 42 L66 50 L63 47 L63 64 L37 64 L37 47 L33 51 L28 44 Z" fill="#F5B800" stroke="#9C6B00" stroke-width="3" stroke-linejoin="round"/>
    <rect x="46" y="30" width="8" height="8" rx="2" fill="#F1C7A0" stroke="#A0623A" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="36.5" cy="23" r="3" fill="#F1C7A0" stroke="#A0623A" stroke-width="2"/>
    <circle cx="63.5" cy="23" r="3" fill="#F1C7A0" stroke="#A0623A" stroke-width="2"/>
    <circle cx="50" cy="22" r="14" fill="#F1C7A0" stroke="#A0623A" stroke-width="3"/>
    <path d="M36 21 C35 11 42 6.5 50 6.5 C58 6.5 65 11 64 21 C61 17 57 15 53 16 C51 13 47 13 45 15 C42 15 38 17 36 21 Z" fill="#5A3A22" stroke="#2E1C10" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="45" cy="23" r="1.8" fill="#11191B"/>
    <circle cx="55" cy="23" r="1.8" fill="#11191B"/>
    <circle cx="41.5" cy="28" r="2.2" fill="#F09A8C"/>
    <circle cx="58.5" cy="28" r="2.2" fill="#F09A8C"/>
    <path d="M45.5 29 Q50 33 54.5 29" fill="none" stroke="#A0623A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  foka: `
    <path d="M8 76 L34 82 L68 82 L94 74 L92 86 L68 93 L34 93 L10 88 Z" fill="#BFDDEC" stroke="#5E8FB0" stroke-width="3" stroke-linejoin="round"/>
    <path d="M8 76 L22 68 L56 64 L84 66 L94 74 L68 82 L34 82 Z" fill="#F4FAFC" stroke="#5E8FB0" stroke-width="3" stroke-linejoin="round"/>
    <path d="M84 60 C87.5 55 91 51.5 94 50.5 C94 55 93 59 90.5 62 Z" fill="#5E6C77" stroke="#3E4C57" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M84 64 C87.5 64 91 66 94 69 C90.5 71 87 69 84 67 Z" fill="#5E6C77" stroke="#3E4C57" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M10 34 C10 28 16 24 22 24 C30 24 34 30 36 36 C40 44 54 50 70 54 C78 56 84 58 88 62 C86 68 76 71 64 72 C50 73 34 73 24 69 C18 66 16 60 18 53 C18 47 14 43 12 40 C10 38 10 36 10 34 Z" fill="#8A98A3"/>
    <path d="M85.2 65.8 82.7 67.5 78.7 69.3 75.1 70.3 69.8 71.3 64 72 56.9 72.4 49.6 72.6 42.5 72.4 37.4 72 32.5 71.3 28 70.3 24 69 21.9 67.7 20.3 66.2 18.9 64.5 17.9 62.1Z" fill="#B9C4CC"/>
    <ellipse cx="30" cy="33" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="44" cy="46" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="54" cy="52" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="64" cy="57" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="74" cy="60" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="40" cy="40" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="60" cy="51" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <ellipse cx="50" cy="47" rx="1.8" ry="1.3" fill="#5E6C77"/>
    <path d="M10 34 C10 28 16 24 22 24 C30 24 34 30 36 36 C40 44 54 50 70 54 C78 56 84 58 88 62 C86 68 76 71 64 72 C50 73 34 73 24 69 C18 66 16 60 18 53 C18 47 14 43 12 40 C10 38 10 36 10 34 Z" fill="none" stroke="#3E4C57" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M24.6 57.1 24.2 59.1 23.2 61.8 22.2 63.6 19.7 67.1 19.5 68 19.7 69 20.3 69.8 21.1 70.3 22 70.5 23 70.3 24.8 68.9 26.6 67 28.3 64.9 29.7 62.7 31.4 58.9Z" fill="#5E6C77" stroke="#3E4C57" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="19" cy="32" r="2.6" fill="#11191B"/>
    <circle cx="18.2" cy="31.2" r="0.8" fill="#FFFFFF"/>
    <ellipse cx="11.5" cy="35.5" rx="1.6" ry="1.3" fill="#11191B"/>
    <path d="M13 38 L6.5 37 M13 39.5 L7 41.5" fill="none" stroke="#3E4C57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  nietoperz: `
    <path d="M79 94 C79 86 78.5 80 78 74" fill="none" stroke="#2E6B33" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M78.5 86 C70 86 64 81 63 75 C70 75 76 80 78.5 86 Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M66 54 C68 62 72 70 78 75 C84 70 88 62 90 54 C86 58 82 59 78 57.5 C74 59 70 58 66 54 Z" fill="#F6E7B0" stroke="#9A7A22" stroke-width="3" stroke-linejoin="round"/>
    <path d="M78 58 L78 50.5 M74 57 L71.5 51 M82 57 L84.5 51" fill="none" stroke="#8A5A12" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(0 -4)">
    <path d="M40 33 L24 21 L6 27 Q14 33 9 43 Q18 43 20 52 Q30 47 39 52 Z" fill="#A87A5A" stroke="#3B2414" stroke-width="3" stroke-linejoin="round"/>
    <path d="M40 33 L24 21 L6 27 M24 21 L9 43 M24 21 L20 52 M24 21 L23 17.5" fill="none" stroke="#3B2414" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(88 0) scale(-1 1)">
    <path d="M40 33 L24 21 L6 27 Q14 33 9 43 Q18 43 20 52 Q30 47 39 52 Z" fill="#A87A5A" stroke="#3B2414" stroke-width="3" stroke-linejoin="round"/>
    <path d="M40 33 L24 21 L6 27 M24 21 L9 43 M24 21 L20 52 M24 21 L23 17.5" fill="none" stroke="#3B2414" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g><ellipse cx="44" cy="42" rx="7" ry="11" fill="#6E4529" stroke="#3B2414" stroke-width="3"/>
    <path d="M39 26 L37 15 L43 22 Z" fill="#6E4529" stroke="#3B2414" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M49 26 L51 15 L45 22 Z" fill="#6E4529" stroke="#3B2414" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M39.4 23 L38.3 17.5 L41.3 21.3 Z" fill="#C79A7E"/>
    <path d="M48.6 23 L49.7 17.5 L46.7 21.3 Z" fill="#C79A7E"/>
    <circle cx="44" cy="28" r="7" fill="#6E4529" stroke="#3B2414" stroke-width="3"/>
    <circle cx="41.3" cy="27" r="1.4" fill="#11191B"/>
    <circle cx="46.7" cy="27" r="1.4" fill="#11191B"/>
    <ellipse cx="44" cy="31.5" rx="2" ry="1.4" fill="#3B2414"/>
    <path d="M41 53 L40 56 M47 53 L48 56" fill="none" stroke="#3B2414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`,
  // Etap 3: rośliny, pokarm i składniki chemiczne (światy 1 i 5).
  topola: `
    <path d="M45.5 92 L47.5 72 H52.5 L54.5 92Z" fill="#8A6A3A" stroke="#4A3612" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 7 A4.6 4.6 0 0 1 55.5 12 A5.1 5.1 0 0 1 59 19.5 A5.5 5.5 0 0 1 61.5 28 A5.7 5.7 0 0 1 63 37 A5.7 5.7 0 0 1 64.5 46 A5.6 5.6 0 0 1 65.5 55 A5.6 5.6 0 0 1 64.5 64 A5.3 5.3 0 0 1 61.5 72 A5.3 5.3 0 0 1 55.5 78 A3.6 3.6 0 0 1 50 80 A3.6 3.6 0 0 1 44.5 78 A5.3 5.3 0 0 1 38.5 72 A5.3 5.3 0 0 1 35.5 64 A5.6 5.6 0 0 1 34.5 55 A5.6 5.6 0 0 1 35.5 46 A5.7 5.7 0 0 1 37 37 A5.7 5.7 0 0 1 38.5 28 A5.5 5.5 0 0 1 41 19.5 A5.1 5.1 0 0 1 44.5 12 A4.6 4.6 0 0 1 50 7Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M53 18 C57 30 59 50 58 70 C56 74 53 76 50 77 C55 60 56 36 53 18Z" fill="#2F8040"/>
    <g fill="none" stroke="#1F5A32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M44 28 q3 -3.5 6 -1"/><path d="M50 40 q3.5 -3.5 7 -1"/><path d="M41 47 q3 -3.5 6 -1"/><path d="M48 58 q3.5 -3.5 7 -1"/><path d="M40 67 q3 -3.5 6 -1"/></g>
    <g fill="none" stroke="#7CC47F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M44 16 q-3 6 -4 13"/><path d="M39 36 q-1.5 8 -1 15"/></g>
    <path d="M28 92 H72" stroke="#4A3612" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  podbial: `
    <path d="M30 91 H70" stroke="#6B4423" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="#2E6B33" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M50 90 C42 88 32 84 28.4 73.3"/><path d="M50 90 C58 88 68 84 71.6 73.3"/></g>
    <path d="M28.4 73.3 C33.2 76.5 39 77.1 41.8 73.6 C46 68.4 44 59.4 39.2 53.9 C34 47.5 25.5 45.9 17.4 49.7 C9.2 53.5 5 61 6.6 69.1 C7.7 76.3 13.3 83.6 20 83.8 C24.5 83.9 27.8 79 28.4 73.3Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <path d="M71.6 73.3 C72.2 79 75.5 83.9 80 83.8 C86.7 83.6 92.3 76.3 93.4 69.1 C95 61 90.8 53.5 82.6 49.7 C74.5 45.9 66 47.5 60.8 53.9 C56 59.4 54 68.4 58.2 73.6 C61 77.1 66.8 76.5 71.6 73.3Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <path d="M28.4 73.3 L19.5 54.2 M28.4 73.3 L11.6 63.4 M28.4 73.3 L31.6 54.1 M28.4 73.3 L12.7 75.1 M28.4 73.3 L39.9 62.4 M71.6 73.3 L80.5 54.2 M71.6 73.3 L68.4 54.1 M71.6 73.3 L88.4 63.4 M71.6 73.3 L60.1 62.4 M71.6 73.3 L87.3 75.1" fill="none" stroke="#1F5A32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 32 V90" stroke="#9A6B45" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M48 50 L43 42 L49.5 46Z M48 66 L43 58 L49.5 62Z M48 82 L43 74 L49.5 78Z M52 42 L57 34 L50.5 38Z M52 58 L57 50 L50.5 54Z M52 74 L57 66 L50.5 70Z" fill="#C98F5A" stroke="#6B4423" stroke-width="2" stroke-linejoin="round"/>
    <path d="M57.9 20.7 L64.3 19.8 A2.2 2.2 0 0 1 64.3 24.2 L57.9 23.3 L64.3 24.3 A2.2 2.2 0 0 1 62.9 28.5 L57.1 25.6 L62.9 28.6 A2.2 2.2 0 0 1 60.3 32.2 L55.7 27.7 L60.2 32.3 A2.2 2.2 0 0 1 56.6 34.9 L53.6 29.1 L56.5 34.9 A2.2 2.2 0 0 1 52.3 36.3 L51.3 29.9 L52.2 36.3 A2.2 2.2 0 0 1 47.8 36.3 L48.7 29.9 L47.7 36.3 A2.2 2.2 0 0 1 43.5 34.9 L46.4 29.1 L43.4 34.9 A2.2 2.2 0 0 1 39.8 32.3 L44.3 27.7 L39.7 32.2 A2.2 2.2 0 0 1 37.1 28.6 L42.9 25.6 L37.1 28.5 A2.2 2.2 0 0 1 35.7 24.3 L42.1 23.3 L35.7 24.2 A2.2 2.2 0 0 1 35.7 19.8 L42.1 20.7 L35.7 19.7 A2.2 2.2 0 0 1 37.1 15.5 L42.9 18.4 L37.1 15.4 A2.2 2.2 0 0 1 39.7 11.8 L44.3 16.3 L39.8 11.7 A2.2 2.2 0 0 1 43.4 9.1 L46.4 14.9 L43.5 9.1 A2.2 2.2 0 0 1 47.7 7.7 L48.7 14.1 L47.8 7.7 A2.2 2.2 0 0 1 52.2 7.7 L51.3 14.1 L52.3 7.7 A2.2 2.2 0 0 1 56.5 9.1 L53.6 14.9 L56.6 9.1 A2.2 2.2 0 0 1 60.2 11.7 L55.7 16.3 L60.3 11.8 A2.2 2.2 0 0 1 62.9 15.4 L57.1 18.4 L62.9 15.5 A2.2 2.2 0 0 1 64.3 19.7Z" fill="#FFD23F" stroke="#9C6B00" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="50" cy="22" r="8" fill="#F5B800" stroke="#9C6B00" stroke-width="2"/>`,
  'kanianka-pospolita': `
    <path d="M59.7 79.2 L59.4 78.4 L58.9 77.8 L58.3 77.1 L57.5 76.5 L56.7 75.9 L55.7 75.3 L54.6 74.8 L53.5 74.3 L52.3 73.9 L51.2 73.6 L50 73.3 L48.9 73.1 L47.8 72.9 L46.7 72.8 L45.8 72.7 L44.9 72.7 L44.1 72.8 L43.5 72.9 L42.9 73 L42.5 73.2 L42.2 73.3 L42.1 73.5 L42 73.7 L42.1 73.9 M59.3 66.9 L59.2 66.2 L58.9 65.5 L58.4 64.8 L57.7 64.2 L56.9 63.6 L56 63 L55 62.5 L53.8 62.1 L52.6 61.7 L51.3 61.3 L50 61 L48.7 60.8 L47.4 60.6 L46.1 60.5 L45 60.5 L43.9 60.5 L42.9 60.5 L42.1 60.6 L41.4 60.7 L40.9 60.9 L40.5 61.1 L40.4 61.3 L40.4 61.5 L40.5 61.7 M57.9 54.6 L57.7 53.9 L57.4 53.2 L56.9 52.6 L56.4 51.9 L55.7 51.3 L55 50.8 L54.1 50.3 L53.2 49.8 L52.2 49.4 L51.1 49.1 L50 48.8 L48.9 48.5 L47.8 48.4 L46.6 48.3 L45.6 48.2 L44.5 48.2 L43.6 48.3 L42.7 48.3 L42 48.5 L41.3 48.6 L40.9 48.8 L40.5 49 L40.4 49.2 L40.4 49.4 M59.2 42.4 L58.8 41.6 L58.4 41 L57.7 40.3 L57 39.7 L56.2 39.1 L55.3 38.5 L54.3 38 L53.2 37.5 L52.2 37.1 L51.1 36.8 L50 36.5 M62 76.2 L61.8 75.4 L61.4 74.6 L60.8 73.8 L60 73 L59 72.3 L57.9 71.6 L56.7 71 L55.3 70.4 L54 69.8 L52.5 69.4 L51.1 69 L49.7 68.7 L48.3 68.4 L47 68.2 L45.7 68.1 L44.6 68 L43.5 68 L42.6 68.1 L41.9 68.2 L41.2 68.3 L40.8 68.5 L40.4 68.7 L40.3 68.9 L40.3 69.1 M61.4 61.5 L61.4 60.7 L61.2 59.9 L60.7 59.1 L60.1 58.3 L59.3 57.6 L58.2 56.9 L57.1 56.3 L55.8 55.7 L54.3 55.2 L52.8 54.7 L51.2 54.3 L49.6 54 L48 53.7 L46.5 53.6 L45 53.4 L43.5 53.4 L42.3 53.4 L41.1 53.4 L40.1 53.5 L39.4 53.7 L38.8 53.8 L38.4 54 L38.2 54.2 L38.3 54.5 M59.7 46.9" fill="none" stroke="#B4501C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 92 C48.5 70 51.5 40 50 9" fill="none" stroke="#2E6B33" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"><path d="M50 30 C42 34 30 31 23 22 C33 18 45 22 50 30Z"/><path d="M50 19 C57 13 68 11 77 15 C70 23 58 25 50 19Z"/></g>
    <path d="M41 86 L41 86.2 L41.1 86.4 L41.4 86.6 L41.9 86.7 L42.5 86.9 L43.2 86.9 L44.1 87 L45.1 87 L46.3 86.9 L47.4 86.8 L48.7 86.7 L50 86.4 L51.3 86.1 L52.6 85.8 L53.8 85.4 L55 84.9 L56.1 84.4 L57.1 83.9 L58 83.3 L58.7 82.6 L59.3 82 L59.6 81.3 L59.8 80.6 L59.9 79.9 L59.7 79.2 M42.1 73.9 L42.3 74.1 L42.7 74.3 L43.1 74.5 L43.7 74.6 L44.4 74.7 L45.1 74.7 L46 74.7 L46.9 74.7 L47.9 74.6 L48.9 74.4 L50 74.2 L51.1 73.9 L52.2 73.5 L53.2 73.1 L54.3 72.7 L55.3 72.2 L56.2 71.6 L57 71 L57.7 70.4 L58.4 69.7 L58.8 69 L59.2 68.3 L59.3 67.6 L59.3 66.9 M40.5 61.7 L40.9 61.9 L41.3 62 L42 62.2 L42.7 62.3 L43.6 62.4 L44.5 62.5 L45.6 62.5 L46.6 62.4 L47.8 62.3 L48.9 62.1 L50 61.9 L51.1 61.6 L52.2 61.3 L53.2 60.9 L54.1 60.4 L55 59.9 L55.7 59.3 L56.4 58.7 L56.9 58.1 L57.4 57.4 L57.7 56.8 L57.9 56 L57.9 55.3 L57.9 54.6 M40.4 49.4 L40.5 49.6 L40.9 49.8 L41.4 49.9 L42.1 50.1 L42.9 50.1 L43.9 50.2 L45 50.2 L46.1 50.1 L47.4 50 L48.7 49.9 L50 49.6 L51.3 49.3 L52.6 49 L53.8 48.6 L55 48.1 L56 47.6 L56.9 47.1 L57.7 46.5 L58.4 45.8 L58.9 45.2 L59.2 44.5 L59.3 43.8 L59.3 43.1 L59.2 42.4" fill="none" stroke="#EE7D22" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50.4 84 L52 83.6 L53.5 83.2 L55 82.7 L56.5 82.2 L57.8 81.6 L59 80.9 L60 80.2 L60.8 79.5 L61.4 78.7 L61.9 77.9 L62.1 77 L62 76.2 M40.3 69.1 L40.4 69.3 L40.7 69.5 L41.2 69.7 L41.8 69.9 L42.5 70 L43.3 70.1 L44.3 70.1 L45.3 70.1 L46.5 70 L47.7 69.8 L49 69.6 L50.3 69.3 L51.6 69 L52.9 68.6 L54.3 68.1 L55.5 67.5 L56.7 66.9 L57.8 66.2 L58.8 65.5 L59.6 64.8 L60.4 64 L60.9 63.2 L61.3 62.4 L61.4 61.5 M38.3 54.5 L38.5 54.7 L38.9 54.9 L39.6 55.1 L40.4 55.2 L41.3 55.3 L42.4 55.4 L43.6 55.4 L44.9 55.4 L46.2 55.3 L47.6 55.2 L48.9 55 L50.3 54.7 L51.6 54.3 L52.9 53.9 L54.1 53.4 L55.3 52.8 L56.3 52.2 L57.2 51.6 L57.9 50.9 L58.6 50.1 L59.1 49.3 L59.4 48.5 L59.6 47.7 L59.7 46.9" fill="none" stroke="#F29A2E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="#EE7D22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M59.3 66.9 C69.3 60.9 83.3 64.9 82.3 73.9 C81.3 81.9 71.3 82.9 66.3 76.9"/>
    <path d="M40.4 49.4 C31.4 47.4 23.4 53.4 21.4 61.4 C20.4 67.4 26.4 70.4 29.4 66.4"/>
    <path d="M40.5 49 C34.5 46 30.5 48 26.5 44"/>
    </g>
    <g fill="#FFFFFF" stroke="#C08A80" stroke-width="2" stroke-linejoin="round"><circle cx="79.1" cy="70.4" r="3.2"/><circle cx="85.5" cy="70.1" r="3.2"/><circle cx="82.3" cy="74.5" r="3.2"/><circle cx="82.1" cy="67.5" r="2.8"/></g><g fill="#FFFFFF"><circle cx="79.1" cy="70.4" r="3.2"/><circle cx="85.5" cy="70.1" r="3.2"/><circle cx="82.3" cy="74.5" r="3.2"/><circle cx="82.1" cy="67.5" r="2.8"/></g><g fill="#E8B4AC"><circle cx="79.1" cy="70.4" r="1"/><circle cx="85.5" cy="70.1" r="1"/><circle cx="82.3" cy="74.5" r="1"/></g>
    <g fill="#FFFFFF" stroke="#C08A80" stroke-width="2" stroke-linejoin="round"><circle cx="19.2" cy="56.9" r="3.2"/><circle cx="25.6" cy="56.6" r="3.2"/><circle cx="22.4" cy="61" r="3.2"/><circle cx="22.2" cy="54" r="2.8"/></g><g fill="#FFFFFF"><circle cx="19.2" cy="56.9" r="3.2"/><circle cx="25.6" cy="56.6" r="3.2"/><circle cx="22.4" cy="61" r="3.2"/><circle cx="22.2" cy="54" r="2.8"/></g><g fill="#E8B4AC"><circle cx="19.2" cy="56.9" r="1"/><circle cx="25.6" cy="56.6" r="1"/><circle cx="22.4" cy="61" r="1"/></g>
    <g fill="#FFFFFF" stroke="#C08A80" stroke-width="2" stroke-linejoin="round"><circle cx="22.3" cy="40.5" r="3.2"/><circle cx="28.7" cy="40.2" r="3.2"/><circle cx="25.5" cy="44.6" r="3.2"/><circle cx="25.3" cy="37.6" r="2.8"/></g><g fill="#FFFFFF"><circle cx="22.3" cy="40.5" r="3.2"/><circle cx="28.7" cy="40.2" r="3.2"/><circle cx="25.5" cy="44.6" r="3.2"/><circle cx="25.3" cy="37.6" r="2.8"/></g><g fill="#E8B4AC"><circle cx="22.3" cy="40.5" r="1"/><circle cx="28.7" cy="40.2" r="1"/><circle cx="25.5" cy="44.6" r="1"/></g>
    <g fill="#FFFFFF" stroke="#C08A80" stroke-width="2" stroke-linejoin="round"><circle cx="54.8" cy="54.5" r="3.2"/><circle cx="61.2" cy="54.2" r="3.2"/><circle cx="58" cy="58.6" r="3.2"/><circle cx="57.8" cy="51.6" r="2.8"/></g><g fill="#FFFFFF"><circle cx="54.8" cy="54.5" r="3.2"/><circle cx="61.2" cy="54.2" r="3.2"/><circle cx="58" cy="58.6" r="3.2"/><circle cx="57.8" cy="51.6" r="2.8"/></g><g fill="#E8B4AC"><circle cx="54.8" cy="54.5" r="1"/><circle cx="61.2" cy="54.2" r="1"/><circle cx="58" cy="58.6" r="1"/></g>`,
  'zaraza-zolta': `
    <path d="M5 80 H95 V91 C95 93.2 93.2 95 91 95 H9 C6.8 95 5 93.2 5 91Z" fill="#E6CDA0"/>
    <path d="M5.5 80 H94.5" stroke="#7A5530" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="#8A5A2E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 80 C20 86 26 89 34 88 C41 87.5 46 89 52 89 C62 89 70 91 82 89"/><path d="M31 88 L28 93"/><path d="M64 89.5 L68 93.5"/><path d="M82 89 L89 86"/></g>
    <path d="M20 80 C20 76 19.8 72.5 19.6 68.5" fill="none" stroke="#2E6B33" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.7 68.2 C22.2 71.2 25.7 72.7 28.1 71 C31.8 68.5 32.3 62.5 30.3 58.1 C28.3 53 23.2 50.4 17.3 51.2 C11.5 52.1 7.3 56 6.8 61.4 C6.1 66.1 8.2 71.8 12.4 73.3 C15.2 74.2 18.2 71.8 19.7 68.2Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="50" cy="87" rx="6.5" ry="4.5" fill="#E8C66A" stroke="#8C6A0C" stroke-width="2.5"/>
    <path d="M46.5 85 L47.5 20 H52.5 L53.5 85Z" fill="#E0B85A" stroke="#8C6A0C" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M47 78 L41.5 70 L48 73Z M47 64 L41.5 56 L48 59Z M53 71 L58.5 63 L52 66Z M53 57 L58.5 49 L52 52Z" fill="#C99A3A" stroke="#8C6A0C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M51.9 50.7 C57.6 48.8 61.8 47 65.2 43.9 C67.2 42.5 69.6 44.6 70.5 48.5 C71.5 52.4 70.4 55.3 68 55.1 C63.6 54 59 54.3 53.1 55.3Z M48.2 44.7 C42.5 42.7 38.4 40.6 35.2 37.4 C33.2 36 30.7 38 29.6 41.9 C28.5 45.7 29.5 48.7 32 48.6 C36.4 47.6 41 48 46.8 49.3Z M51.7 38.9 C56.9 36.6 60.7 34.4 63.6 31.1 C65.4 29.6 67.8 31.4 69.1 35 C70.4 38.5 69.6 41.4 67.3 41.5 C63 40.8 58.8 41.6 53.3 43.1Z M48.3 33 C43.4 30.6 40 28.5 37.4 25.3 C35.7 23.8 33.3 25.4 32 28.7 C30.6 32.1 31.3 34.8 33.4 35 C37.5 34.5 41.5 35.3 46.7 37Z M51.4 27.3 C55.6 24.7 58.5 22.4 60.6 19.2 C61.9 17.8 64.2 18.9 65.8 21.8 C67.3 24.7 67 27.3 65 27.6 C61.3 27.6 57.7 28.7 53.2 30.7Z M48.7 22.5 C45.2 20 42.8 17.8 41.2 14.9 C40.1 13.6 38 14.5 36.4 16.9 C34.9 19.3 35 21.6 36.7 22 C40 22.2 43.1 23.4 46.9 25.5Z" fill="#F6D56B" stroke="#8C6A0C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M67 44.9 C68.3 44.5 69.4 46.5 70 48.6 C70.5 50.8 70.4 53.1 69.1 53.4 C67.7 53.7 66.6 51.7 66.1 49.6 C65.6 47.5 65.6 45.2 67 44.9Z M33.3 38.4 C32 38 30.8 39.9 30.2 42 C29.6 44.2 29.6 46.4 30.9 46.8 C32.3 47.2 33.4 45.3 34 43.1 C34.6 41 34.7 38.7 33.3 38.4Z M65.4 31.9 C66.6 31.4 67.9 33.2 68.6 35.2 C69.3 37.1 69.5 39.3 68.2 39.7 C67 40.2 65.7 38.4 65 36.5 C64.3 34.5 64.1 32.3 65.4 31.9Z M35.6 25.9 C34.5 25.5 33.2 27.1 32.5 28.9 C31.7 30.8 31.5 32.8 32.7 33.3 C33.8 33.7 35.1 32.1 35.8 30.3 C36.6 28.4 36.8 26.4 35.6 25.9Z M62.2 19.7 C63.2 19.1 64.5 20.5 65.3 22.1 C66.2 23.7 66.6 25.5 65.6 26 C64.6 26.6 63.3 25.2 62.4 23.6 C61.6 22 61.2 20.2 62.2 19.7Z M39.7 15.2 C38.9 14.7 37.6 15.8 36.8 17.1 C36 18.5 35.5 20 36.4 20.6 C37.2 21.1 38.4 20 39.3 18.7 C40.1 17.3 40.6 15.7 39.7 15.2Z" fill="#C9962E"/>
    <path d="M53 54.9 C57 54.4 60.2 54.8 63.2 56.5 C59.9 58 56.9 58.1 53.7 57.9Z M46.9 48.9 C43 48.2 39.8 48.5 36.7 50.1 C39.9 51.7 43 51.9 46.1 51.8Z M53.1 42.8 C56.9 41.8 59.9 41.9 62.9 43.3 C60 44.9 57.1 45.4 54.1 45.5Z M46.8 36.7 C43.4 35.7 40.4 35.6 37.5 36.8 C40.3 38.5 43 39 45.8 39.2Z M53.1 30.4 C56.1 29.2 58.8 28.9 61.5 29.7 C59.2 31.5 56.8 32.2 54.2 32.6Z M47 25.2 C44.4 23.9 42.2 23.5 39.7 24 C41.6 25.7 43.7 26.5 45.9 27.1Z" fill="#C99A3A" stroke="#8C6A0C" stroke-width="2" stroke-linejoin="round"/>
    <path d="M50 11 C53.5 13 54.5 18 53 22 L47 22 C45.5 18 46.5 13 50 11Z" fill="#F6D56B" stroke="#8C6A0C" stroke-width="2" stroke-linejoin="round"/>`,
  'jemiola-pospolita': `
    <path d="M24 26 C22 20 18 16 12 14" fill="none" stroke="#6B4F2A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 28 C30 22 60 20 94 12 L94 22 C62 30 32 33 6 38Z" fill="#8A6A3A" stroke="#4A3612" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="55" r="25" fill="#BFDD8E"/>
    <path d="M50 55 L51.4 45.1 M51.4 45.1 L48.8 37 M51.4 45.1 L56.2 38.7 M50 55 L60.8 51.1 M60.8 51.1 L67.1 43.6 M60.8 51.1 L69.8 53.1 M50 55 L57.9 61.2 M57.9 61.2 L66.1 63.2 M57.9 61.2 L61.3 68.4 M50 55 L48.9 65.9 M48.9 65.9 L52.4 74.6 M48.9 65.9 L43.6 73 M50 55 L40.7 59.9 M40.7 59.9 L36 67.5 M40.7 59.9 L32.4 59.2 M50 55 L41.9 50 M41.9 50 L33.9 49 M41.9 50 L38.1 43.4" fill="none" stroke="#5E8A2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M48.8 37 C43.3 37.2 39.4 32.5 40.1 26.7 C46 27 49.9 31.6 48.8 37Z M48.8 37 C44.7 33.3 45.1 27.2 49.7 23.5 C53.7 27.8 53.3 33.9 48.8 37Z M56.2 38.7 C52.9 34.3 54.4 28.4 59.6 25.6 C62.7 30.6 61.2 36.5 56.2 38.7Z M56.2 38.7 C56.8 33.2 62 30.1 67.7 31.6 C66.5 37.4 61.3 40.6 56.2 38.7Z M67.1 43.6 C64.1 39 65.9 33.2 71.3 30.7 C74.1 35.9 72.2 41.7 67.1 43.6Z M67.1 43.6 C68.1 38.2 73.5 35.3 79 37.2 C77.5 42.9 72.1 45.8 67.1 43.6Z M69.8 53.1 C72.5 48.4 78.5 47.4 83.1 51 C79.8 55.9 73.8 56.9 69.8 53.1Z M69.8 53.1 C75 51.6 80 55.1 80.8 60.9 C75.1 62.1 70.1 58.6 69.8 53.1Z M66.1 63.2 C68.9 58.5 74.9 57.6 79.5 61.3 C76.1 66.1 70.1 67 66.1 63.2Z M66.1 63.2 C71.4 61.7 76.3 65.3 77 71.1 C71.3 72.3 66.4 68.7 66.1 63.2Z M61.3 68.4 C66.7 67.5 71.3 71.6 71.3 77.5 C65.5 78 60.9 73.8 61.3 68.4Z M61.3 68.4 C65.8 71.5 66.2 77.6 62.2 81.8 C57.6 78.1 57.3 72 61.3 68.4Z M52.4 74.6 C57.8 74.1 62 78.5 61.7 84.3 C55.9 84.4 51.6 80 52.4 74.6Z M52.4 74.6 C56.7 78 56.7 84.1 52.4 88.1 C48.1 84.1 48.1 78 52.4 74.6Z M43.6 73 C46.9 77.4 45.3 83.3 40.1 86 C37 81.1 38.6 75.2 43.6 73Z M43.6 73 C42.9 78.4 37.7 81.6 32 80 C33.2 74.2 38.4 71.1 43.6 73Z M36 67.5 C39.6 71.6 38.6 77.6 33.7 80.8 C30.1 76.1 31.2 70.1 36 67.5Z M36 67.5 C35.8 73 30.8 76.6 25.1 75.4 C25.8 69.6 30.7 66 36 67.5Z M32.4 59.2 C30.4 64.3 24.5 66.1 19.5 63.1 C22 57.9 27.9 56.1 32.4 59.2Z M32.4 59.2 C27.4 61.5 21.9 58.7 20.3 53.1 C25.8 51.1 31.3 53.8 32.4 59.2Z M33.9 49 C31.8 54 25.9 55.6 20.9 52.5 C23.6 47.3 29.5 45.7 33.9 49Z M33.9 49 C28.9 51.1 23.5 48.1 22.1 42.4 C27.7 40.6 33 43.6 33.9 49Z M38.1 43.4 C32.8 44.8 27.9 41 27.4 35.2 C33.2 34.2 38 37.9 38.1 43.4Z M38.1 43.4 C33.3 40.7 32.4 34.7 36.1 30.1 C40.9 33.4 41.8 39.4 38.1 43.4Z" fill="#84B84A" stroke="#3E6B23" stroke-width="2" stroke-linejoin="round"/>
    <g fill="#FFFFFF" stroke="#7A8A70" stroke-width="2" stroke-linejoin="round"><circle cx="51.4" cy="45.1" r="3.2"/><circle cx="60.8" cy="51.1" r="3.2"/><circle cx="57.9" cy="61.2" r="3.2"/><circle cx="48.9" cy="65.9" r="3.2"/><circle cx="40.7" cy="59.9" r="3.2"/><circle cx="41.9" cy="50" r="3.2"/><circle cx="48" cy="34.6" r="3.2"/><circle cx="68.7" cy="41.7" r="3.2"/><circle cx="68.6" cy="63.8" r="3.2"/><circle cx="53.3" cy="76.9" r="3.2"/><circle cx="34.7" cy="69.6" r="3.2"/><circle cx="31.4" cy="48.7" r="3.2"/></g>`,
  'plesniak-bialy': `
    <path d="M20 92 C18.3 92 17 90.7 17 89 V48 C9 45 6 37 8 29 C10 18 22 12 32 13 C38 10 44 9 50 10 C56 9 62 10 68 13 C78 12 90 18 92 29 C94 37 91 45 83 48 V89 C83 90.7 81.7 92 80 92Z" fill="#C98A4A" stroke="#6B4423" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M24 85 V44 C17 42 13.5 36 14.5 30 C16 22 25 18 33 19 C38 16 44 15.5 50 16 C56 15.5 62 16 67 19 C75 18 84 22 85.5 30 C86.5 36 83 42 76 44 V85Z" fill="#F6DFA8"/>
    <g fill="#E9C98A"><circle cx="30" cy="30" r="1.8"/><circle cx="70" cy="28" r="1.8"/><circle cx="34" cy="78" r="1.8"/><circle cx="66" cy="80" r="1.8"/><circle cx="72" cy="40" r="1.5"/><circle cx="58" cy="24" r="1.5"/></g>
    <path d="M72 60 A5.2 5.2 0 0 1 69.6 68 A7.2 7.2 0 0 1 58.8 72.2 A7.6 7.6 0 0 1 46.7 74.6 A7.3 7.3 0 0 1 35.6 70.6 A6.4 6.4 0 0 1 27.4 64.2 A5.2 5.2 0 0 1 29.5 56.2 A5.6 5.6 0 0 1 35 49 A7.6 7.6 0 0 1 46.9 46.1 A7.9 7.9 0 0 1 59.6 46.6 A6.5 6.5 0 0 1 68.1 52.6 A5.2 5.2 0 0 1 72 60Z" fill="#FFFFFF" stroke="#9AA6A8" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M40 54 L37 41 M48 52 L48 36 M56 53 L59 40 M63 57 L69 47 M33 60 L27 52 M52 62 L53 54 M44 64 L41 58" fill="none" stroke="#8A9698" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#2F3A3C"><circle cx="37" cy="41" r="2.8"/><circle cx="48" cy="36" r="2.8"/><circle cx="59" cy="40" r="2.8"/><circle cx="69" cy="47" r="2.8"/><circle cx="27" cy="52" r="2.8"/><circle cx="53" cy="54" r="2.8"/><circle cx="41" cy="58" r="2.8"/></g>`,
  groch: `
    <path d="M14.6 72.7 C8.7 70.4 6.2 66.1 7.6 60.6" fill="none" stroke="#2E6B33" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.9 73.7 C14.8 44.9 62.2 15.2 86.1 24.5 C86 52.3 37.8 84.8 12.9 73.7Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M17.6 69.9 C23.4 48 62.3 23.3 81.4 28.4 C76.3 47.5 35.7 73.3 17.6 69.9Z" fill="#DDF0C8"/>
    <g fill="#8BC34A" stroke="#2E6B33" stroke-width="2.5" stroke-linejoin="round"><circle cx="27.5" cy="63" r="7"/><circle cx="38.4" cy="55.9" r="7"/><circle cx="49.3" cy="48.7" r="7"/><circle cx="60.1" cy="41.6" r="7"/><circle cx="71" cy="34.4" r="7"/></g>
    <g fill="#DCEDC8"><circle cx="23.9" cy="62" r="2"/><circle cx="34.8" cy="54.9" r="2"/><circle cx="45.7" cy="47.7" r="2"/><circle cx="56.6" cy="40.6" r="2"/><circle cx="67.5" cy="33.5" r="2"/></g>
    <path d="M12.9 73.7 C31.7 66.3 72.3 40.6 86.1 24.5 C88.7 53.1 38.8 86.5 12.9 73.7Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M12.9 73.7 L16.5 65.9 M12.9 73.7 L21.3 72.3 M12.9 73.7 L21.2 78.2" fill="none" stroke="#1F5A32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  fasola: `
    <path d="M12.5 58.8 C14.9 36.1 51.1 11.1 71.5 17.2 C70.8 38.9 31.2 66 12.5 58.8Z" fill="#C9D77A" stroke="#5E7B2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M17.1 54.7 C20.9 38.2 50.4 17.4 66.9 21.3 C61.5 35.2 32 56 17.1 54.7Z" fill="#F1F0D0"/>
    <path d="M21 53.1 C18.1 49.7 19.8 46.5 22.5 46.2 Q24.9 46.5 25.7 44.3 C27.1 41.9 30.8 41.8 32.5 45.8 C34 49.3 32 52 29.4 53.6 C26.7 55.3 23.5 55.9 21 53.1Z" fill="#FBF7EC" stroke="#7A6A4A" stroke-width="2" stroke-linejoin="round"/><path d="M32.8 45.6 C30 42.3 31.7 39.1 34.4 38.8 Q36.8 39.1 37.6 36.8 C39 34.5 42.6 34.4 44.4 38.4 C45.8 41.9 43.9 44.6 41.2 46.2 C38.6 47.9 35.3 48.5 32.8 45.6Z" fill="#FBF7EC" stroke="#7A6A4A" stroke-width="2" stroke-linejoin="round"/><path d="M44.7 38.2 C41.9 34.9 43.5 31.6 46.3 31.4 Q48.7 31.7 49.4 29.4 C50.9 27 54.5 27 56.3 31 C57.7 34.5 55.7 37.2 53.1 38.8 C50.5 40.5 47.2 41 44.7 38.2Z" fill="#FBF7EC" stroke="#7A6A4A" stroke-width="2" stroke-linejoin="round"/>
    <path d="M12.5 58.8 C26 53.9 62.2 28.9 71.5 17.2 C73.6 39.5 32.2 67.7 12.5 58.8Z" fill="#C9D77A" stroke="#5E7B2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M71.5 17.2 C73 13.9 72.6 10.6 71 8.1" fill="none" stroke="#5E7B2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.3 81.1 C17.8 71.2 24.5 66.1 30.6 68.4 Q35.3 71.4 39.3 67.5 C44.7 64 52.4 67.5 52 77.8 C51.5 86.6 44.6 90.2 37.4 91 C30.2 91.7 22.6 89.6 20.3 81.1Z" fill="#FBF7EC" stroke="#7A6A4A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M31.8 70.9 Q35.5 72.8 38.7 70.1" fill="none" stroke="#7A6A4A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M58.6 80.8 C52.6 72.5 56.9 65.2 63.4 65.1 Q68.9 66.1 71.1 61 C74.8 55.7 83.3 56.1 86.8 65.8 C89.6 74.2 84.5 80.1 78.1 83.5 C71.7 86.9 64 87.8 58.6 80.8Z" fill="#F4E3D0" stroke="#8E3B3B" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#B8443F"><ellipse cx="63.9" cy="75.7" rx="2.1" ry="1.4" transform="rotate(2 63.9 75.7)"/><ellipse cx="71.5" cy="78" rx="2.1" ry="1.4" transform="rotate(2 71.5 78)"/><ellipse cx="77.6" cy="71.6" rx="2.1" ry="1.4" transform="rotate(2 77.6 71.6)"/><ellipse cx="78.7" cy="64.7" rx="2.1" ry="1.4" transform="rotate(2 78.7 64.7)"/><ellipse cx="66" cy="82.5" rx="2.1" ry="1.4" transform="rotate(2 66 82.5)"/><ellipse cx="72.3" cy="70.5" rx="2.1" ry="1.4" transform="rotate(2 72.3 70.5)"/><ellipse cx="81.5" cy="75.9" rx="2.1" ry="1.4" transform="rotate(2 81.5 75.9)"/></g>
    <path d="M65.4 67 Q69.5 67.4 71.5 63.7" fill="none" stroke="#8E3B3B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  bawelna: `
    <path d="M50 70 V91" stroke="#6B4F2A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M45.5 36 Q43.5 17.7 50 7.5 Q56.5 17.7 54.5 36Z M58.2 38.6 Q74.9 31.1 86.6 34.1 Q78.9 43.5 60.9 47.1Z M59.5 51.5 Q71.9 65 72.6 77.1 Q61.3 72.7 52.3 56.8Z M47.7 56.8 Q38.7 72.7 27.4 77.1 Q28.1 65 40.5 51.5Z M39.1 47.1 Q21.1 43.5 13.4 34.1 Q25.1 31.1 41.8 38.6Z" fill="#9A6A3A" stroke="#5A3A1A" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#FFFFFF" stroke="#9AA6A8" stroke-width="3.5" stroke-linejoin="round"><circle cx="58.2" cy="34.7" r="14.5"/><circle cx="63.3" cy="50.3" r="14.5"/><circle cx="50" cy="60" r="14.5"/><circle cx="36.7" cy="50.3" r="14.5"/><circle cx="41.8" cy="34.7" r="14.5"/><circle cx="58.2" cy="25.6" r="8"/><circle cx="66.9" cy="31.9" r="8"/><circle cx="71.9" cy="47.5" r="8"/><circle cx="68.7" cy="57.7" r="8"/><circle cx="55.3" cy="67.3" r="8"/><circle cx="44.7" cy="67.3" r="8"/><circle cx="31.3" cy="57.7" r="8"/><circle cx="28.1" cy="47.5" r="8"/><circle cx="33.1" cy="31.9" r="8"/><circle cx="41.8" cy="25.6" r="8"/><circle cx="50" cy="46" r="12"/></g><g fill="#FFFFFF"><circle cx="58.2" cy="34.7" r="14.5"/><circle cx="63.3" cy="50.3" r="14.5"/><circle cx="50" cy="60" r="14.5"/><circle cx="36.7" cy="50.3" r="14.5"/><circle cx="41.8" cy="34.7" r="14.5"/><circle cx="58.2" cy="25.6" r="8"/><circle cx="66.9" cy="31.9" r="8"/><circle cx="71.9" cy="47.5" r="8"/><circle cx="68.7" cy="57.7" r="8"/><circle cx="55.3" cy="67.3" r="8"/><circle cx="44.7" cy="67.3" r="8"/><circle cx="31.3" cy="57.7" r="8"/><circle cx="28.1" cy="47.5" r="8"/><circle cx="33.1" cy="31.9" r="8"/><circle cx="41.8" cy="25.6" r="8"/><circle cx="50" cy="46" r="12"/></g>
    <g fill="none" stroke="#C5CDD0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M55.7 44.1 L66.2 40.7"/><path d="M53.5 50.9 L60 59.8"/><path d="M46.5 50.9 L40 59.8"/><path d="M44.3 44.1 L33.8 40.7"/><path d="M50 40 L50 29"/></g>`,
  'oliwka-europejska': `
    <g fill="none" stroke="#6B5A3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M36 64 L36 72"/><path d="M50 52 L52 60"/><path d="M64 39 L70 44"/></g>
    <path d="M10 88 C13.3 85 23 76.3 30 70 C37 63.7 45.3 56 52 50 C58.7 44 64.7 38.8 70 34 C75.3 29.2 81.7 23.2 84 21" fill="none" stroke="#6B5A3A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 77 C18.2 70.8 20.2 61.6 26.4 56.5 C29.9 63.7 28 72.9 22 77Z M22 77 C27.1 71.8 36.5 71.5 43 76.3 C36.9 81.5 27.5 81.8 22 77Z M36 64 C32 57.9 33.6 48.7 39.6 43.3 C43.5 50.4 41.8 59.6 36 64Z M50 52 C46 45.9 47.6 36.7 53.6 31.3 C57.5 38.4 55.8 47.6 50 52Z M63 40 C59 33.9 60.6 24.7 66.6 19.3 C70.5 26.4 68.8 35.6 63 40Z M63 40 C67.9 34.6 77.3 34 83.9 38.5 C78 44 68.6 44.6 63 40Z M75 29 C71.2 22.8 73.2 13.6 79.4 8.5 C82.9 15.7 81 24.9 75 29Z M75 29 C78.1 23.4 85.2 22.1 90.8 26.2 C86.9 32 79.8 33.2 75 29Z M84 21 C83.3 15.3 87.7 10.9 93.9 11.1 C94.1 17.3 89.7 21.7 84 21Z" fill="#7E9A6E" stroke="#3F5236" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="34" cy="80" rx="7.5" ry="9.5" transform="rotate(12 34 80)" fill="#3A2C40" stroke="#11191B" stroke-width="3"/>
    <ellipse cx="53" cy="68" rx="7.5" ry="9.5" transform="rotate(-8 53 68)" fill="#A9BE45" stroke="#56701E" stroke-width="3"/>
    <ellipse cx="74" cy="52" rx="7.5" ry="9.5" transform="rotate(-25 74 52)" fill="#3A2C40" stroke="#11191B" stroke-width="3"/>
    <g fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M31 76 q1 -3 3 -4"/><path d="M50 64 q1 -3 3 -4"/><path d="M71 48 q1 -3 3 -4"/></g>`,
  'trzcina-cukrowa': `
    <rect x="25" y="34" width="10" height="59" rx="3" fill="#B7CF5E" stroke="#5E7B2A" stroke-width="3" stroke-linejoin="round"/><rect x="23.5" y="48" width="13" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="23.5" y="62" width="13" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="23.5" y="76" width="13" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/>
    <rect x="65" y="38" width="10" height="55" rx="3" fill="#B7CF5E" stroke="#5E7B2A" stroke-width="3" stroke-linejoin="round"/><rect x="63.5" y="52" width="13" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="63.5" y="66" width="13" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="63.5" y="80" width="13" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/>
    <rect x="44.5" y="20" width="11" height="73" rx="3" fill="#B7CF5E" stroke="#5E7B2A" stroke-width="3" stroke-linejoin="round"/><rect x="43" y="35" width="14" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="43" y="49" width="14" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="43" y="63" width="14" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/><rect x="43" y="77" width="14" height="4" rx="2" fill="#8DAA3C" stroke="#5E7B2A" stroke-width="2" stroke-linejoin="round"/>
    <path d="M31.8 36 L31 34 L30.3 31.9 L29.5 29.8 L28.6 27.7 L27.4 25.6 L25.9 23.6 L23.7 21.6 L21 20.4 L18.1 20 L15.4 20.2 L12.7 21.2 L10.5 23 L9.2 25.4 L8.5 27.7 L8.1 29.9 L7.8 32.1 L7.5 34.4 L7.5 34.4 L8.5 32.4 L9.6 30.4 L10.6 28.5 L11.7 26.8 L12.9 25.5 L14.4 25 L16 24.8 L17.6 25 L19.1 25.5 L20.2 26.3 L21.2 27.5 L22.1 29.1 L23.2 30.8 L24.4 32.5 L25.7 34.3 L26.9 36.1 L28.2 38Z M31.9 36.3 L32.7 34.2 L33.4 32.1 L34.1 30.1 L34.4 27.9 L34.6 25.8 L34.8 23.8 L35.2 21.8 L35.7 19.8 L36.4 17.7 L37.2 15.6 L38 13.5 L38 13.5 L36.3 15 L34.6 16.6 L33 18.3 L31.6 20.2 L30.4 22.4 L29.5 24.6 L28.8 26.8 L28.2 29 L28.1 31.2 L28.1 33.4 L28.1 35.7Z M51.7 22.6 L50.6 20.8 L49.5 18.9 L48.3 16.9 L47 15 L45.5 13 L43.5 11.3 L41.1 9.9 L38.6 9 L36.1 8.5 L33.7 8.3 L31.2 8.3 L28.8 8.5 L26.4 8.9 L24.1 9.7 L21.9 10.9 L20.1 12.3 L18.4 13.8 L16.7 15.4 L15.1 16.9 L15.1 16.9 L17.2 16 L19.2 15.1 L21.2 14.2 L23.1 13.5 L25.1 13 L27 12.9 L29 13 L31 13.3 L32.9 13.7 L34.8 14.2 L36.6 14.9 L38.1 15.7 L39.4 16.6 L40.7 17.9 L42.2 19.2 L43.7 20.6 L45.2 22.1 L46.7 23.8 L48.3 25.4Z M51.7 25.4 L53.3 23.8 L54.8 22.2 L56.3 20.6 L57.9 19.1 L59.4 17.7 L60.7 16.2 L62 14.9 L63.3 13.9 L64.7 13.2 L66.4 12.6 L68.3 12.3 L70.2 12.1 L72.3 12.1 L74.3 12.2 L76.3 12.5 L78.2 13 L80.1 13.9 L81.9 15 L83.7 16.3 L85.5 17.6 L85.5 17.6 L84.2 15.8 L82.8 14 L81.3 12.3 L79.5 10.7 L77.4 9.4 L75.2 8.5 L72.9 7.8 L70.6 7.3 L68.1 7.1 L65.6 7.1 L63 7.4 L60.4 8.3 L58 9.7 L56 11.4 L54.3 13.1 L53 15.1 L51.7 17 L50.6 18.9 L49.5 20.8 L48.3 22.6Z M52.6 24.8 L54.1 23.1 L55.5 21.3 L56.2 19.1 L56.7 16.6 L56.6 13.9 L55.6 11.5 L54.2 9.6 L54.2 9.6 L54 11.9 L53.6 13.8 L52.7 15.5 L51.6 17.1 L50.5 18.8 L49.9 21 L49.4 23.2Z M71.6 42.3 L73.2 40.7 L74.8 39.2 L76.3 37.6 L77.9 36.2 L79.2 34.7 L80.4 33.4 L81.6 32.4 L83 31.8 L84.6 31.5 L86.3 31.5 L87.9 31.8 L89.3 32.6 L90.3 34.1 L91.2 36 L91.9 38 L92.7 40.1 L92.7 40.1 L92.8 37.9 L92.8 35.6 L92.5 33.3 L91.8 30.8 L89.9 28.6 L87.4 27.3 L84.8 26.7 L82.1 26.6 L79.2 27.2 L76.7 28.6 L74.7 30.3 L73.1 32 L71.8 34 L70.6 35.9 L69.5 37.8 L68.4 39.7Z M71.7 39.4 L71.5 37.2 L71.2 35 L70.6 32.9 L69.7 30.8 L68.6 28.8 L67.4 26.8 L66 25 L64.5 23.2 L62.9 21.6 L62.9 21.6 L63.3 23.8 L63.8 26 L64.2 28.2 L64.6 30.3 L65 32.4 L65.4 34.6 L66.1 36.6 L67.2 38.6 L68.3 40.6Z M51 35.6 L49.4 34 L47.9 32.4 L46 31 L43.8 30 L41.1 29.2 L38.1 29.7 L36.1 31.5 L34.7 33.5 L33.6 35.5 L33.6 35.5 L35.5 34.3 L37.4 33.3 L39.1 32.8 L40.4 33.1 L41.7 34 L43.3 35.3 L45 36.4 L47 37.4 L49 38.4Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>`,
  rosliny: `
    <path d="M8 90 H92" stroke="#6B4423" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="#2E6B33" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 89 V52"/><path d="M50 89 C50 70 49 44 50 26"/><path d="M78 89 V60"/></g>
    <path d="M24 76 C17.8 81.2 11.1 78.7 9 70.5 C15.9 65.6 22.6 68.1 24 76Z M24 76 C25.4 68.1 32.1 65.6 39 70.5 C36.9 78.7 30.2 81.2 24 76Z M24 62 C18 65.4 12.5 62.3 11.9 55 C18.5 51.9 24 55.1 24 62Z M24 62 C24 55.1 29.5 51.9 36.1 55 C35.5 62.3 30 65.4 24 62Z M24 52 C19.5 49.5 19.5 45 24 42 C28.5 45 28.5 49.5 24 52Z M78 80 C71.1 83.7 66 80.1 66.5 72 C74 68.6 79.1 72.3 78 80Z M78 80 C76.9 72.3 82 68.6 89.5 72 C90 80.1 84.9 83.7 78 80Z M78 68 C71.5 69.6 68 65.4 70.3 58.8 C77.2 57.7 80.7 61.8 78 68Z M78 68 C75.3 61.8 78.8 57.7 85.7 58.8 C88 65.4 84.5 69.6 78 68Z M78 60 C73 57.5 73 53 78 50 C83 53 83 57.5 78 60Z" fill="#4FAE52" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M50 74 C51.6 65.5 59.7 61.7 68.1 65.5 C65.6 74.4 57.5 78.2 50 74Z M50 62 C42.5 66.2 34.4 62.4 31.9 53.5 C40.3 49.7 48.4 53.5 50 62Z M50 50 C50.6 42.1 57.7 38.1 65.6 41 C64.2 49.3 57.1 53.4 50 50Z M50 38 C43.5 41.2 37.3 37.6 36.1 30 C43.3 27.2 49.5 30.8 50 38Z M50 28 C47.4 22.5 50.6 17 57 15.9 C59.2 22 56.1 27.5 50 28Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>`,
  trawa: `
    <path d="M38.5 90 Q36 52 14 22 Q40 54 45.5 90Z M48.5 90 Q52 40 60 8 Q56 42 55.5 90Z M56.5 90 Q64 52 90 30 Q68 54 63.5 90Z" fill="#2E8B3E" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M34.5 90 Q30 64 8 50 Q34 66 41.5 90Z M42.5 90 Q44 46 34 14 Q48 48 49.5 90Z M51.5 90 Q58 48 76 18 Q62 50 58.5 90Z M58.5 90 Q70 66 92 62 Q74 68 65.5 90Z M44.5 90 Q47 58 48 30 Q51 60 51.5 90Z" fill="#4FAE52" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M22 91 H78" stroke="#6B4423" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  kwiat: `
    <path d="M50 56 V93" stroke="#2E6B33" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 84 C40 84 32 78 30 70 C40 70 48 76 50 84Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="#F3A6B8" stroke="#9E3B5B" stroke-width="3" stroke-linejoin="round"><ellipse cx="50" cy="22" rx="10.5" ry="14" transform="rotate(0 50 22)"/><ellipse cx="64.3" cy="32.4" rx="10.5" ry="14" transform="rotate(72 64.3 32.4)"/><ellipse cx="58.8" cy="49.1" rx="10.5" ry="14" transform="rotate(144 58.8 49.1)"/><ellipse cx="41.2" cy="49.1" rx="10.5" ry="14" transform="rotate(216 41.2 49.1)"/><ellipse cx="35.7" cy="32.4" rx="10.5" ry="14" transform="rotate(288 35.7 32.4)"/></g>
    <circle cx="50" cy="37" r="11" fill="#F0902A" stroke="#9C5A00" stroke-width="3"/>
    <path d="M50 26.5 C50 26.5 43.5 34.5 43.5 38.5 C43.5 42.2 46.4 45 50 45 C53.6 45 56.5 42.2 56.5 38.5 C56.5 34.5 50 26.5 50 26.5Z" fill="#FFE27A" stroke="#9C6B00" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M46.5 39 q0.5 -3 2.5 -5" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  szczatki: `
    <path d="M6 80 C6 68 26 61 50 61 C74 61 94 68 94 80 C94 90 76 94 50 94 C24 94 6 90 6 80Z" fill="#8A6A3A"/>
    <path d="M58 74 L90 68 M72 71.5 L79 62" fill="none" stroke="#5A3A1A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M58 66 C47.3 72.5 32.8 64.7 32 51 C44.3 44.7 58.3 53.5 58 66Z" fill="#D08A3A" stroke="#7A4A1A" stroke-width="3" stroke-linejoin="round"/><path d="M58 66 L35.5 53 M48.9 60.8 L40.7 63 M48.9 60.8 L46.8 52.5 M42.4 57 L35.3 58.5 M42.4 57 L40.2 50" fill="none" stroke="#7A4A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 76 C11.7 61.4 31.6 55.1 44.5 65.5 C39.2 81.3 18.9 86.4 8 76Z" fill="#C98F4A" stroke="#6B4423" stroke-width="3" stroke-linejoin="round"/><path d="M8 76 L40.7 66.6 M20.8 72.3 L26.1 63.4 M20.8 72.3 L30.1 77.2 M29.9 69.7 L34.8 62.2 M29.9 69.7 L38.1 73.5" fill="none" stroke="#6B4423" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 68 C33 56.1 41.8 39.6 57 38.6 C63.7 52.2 53.8 68.1 40 68Z" fill="#D9A65A" stroke="#7A5530" stroke-width="3" stroke-linejoin="round"/><path d="M40 68 L55 42 M46 57.7 L43.6 48.5 M46 57.7 L55.1 55.1 M50.2 50.3 L48.6 42.4 M50.2 50.3 L57.9 47.8" fill="none" stroke="#7A5530" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 86 C54.4 72 74.5 66.4 86.9 76.8 C80.8 91.8 60.4 96.3 50 86Z" fill="#9A6A3A" stroke="#4A2E12" stroke-width="3" stroke-linejoin="round"/><path d="M50 86 L83 77.8 M62.9 82.8 L68.6 74.2 M62.9 82.8 L71.9 87.6 M72.1 80.5 L77.4 73.4 M72.1 80.5 L80.1 84.3" fill="none" stroke="#4A2E12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 89 L44 84.5 M25 87 L31 92 M35 86 L39 79.5" fill="none" stroke="#5A3A1A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  padlina: `
    <path d="M8 66 C8 52 26 46 50 46 C76 46 94 54 94 68 C94 82 76 90 50 90 C24 90 8 80 8 66Z" fill="#EAD9A6"/>
    <path d="M42.5 55.4 L55.8 76.6 L50.7 79.8 L37.5 58.6Z M72.5 56.4 L85.8 77.6 L80.7 80.8 L67.5 59.6Z" fill="#E4E7E8" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M46.8 62.2 L42.4 66.4 M50 67.3 L45.5 71.5 M76.8 63.2 L72.4 67.4 M80 68.3 L75.5 72.5" fill="none" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M53.8 73.4 L55.8 76.6 L50.7 79.8 L48.7 76.6Z M83.8 74.4 L85.8 77.6 L80.7 80.8 L78.7 77.6Z" fill="#11191B" stroke="#11191B" stroke-width="2" stroke-linejoin="round"/>
    <path d="M42 37 C36 37 31 39.5 27 43 L15 48.5 C10 50.5 7 53.5 7 57 C7 61 10 63 14 63 L22 62 C27 61.5 32 61 40 60Z" fill="#FFFFFF" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M14.5 49 C10 51 7 53.8 7 57 C7 61 10 63 14 63 L15.5 62.8 C14 58.5 14 53 16 48.4Z" fill="#4A4F51"/>
    <circle cx="10.5" cy="56.5" r="1.4" fill="#11191B"/>
    <g fill="none" stroke="#11191B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M29.5 41.5 L31 61"/><path d="M35 38.6 L36 60.4"/><path d="M24.5 45 L25.5 51"/></g>
    <g fill="none" stroke="#11191B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M27.5 42.5 L25.5 38.5"/><path d="M32 39.6 L31 35.6"/><path d="M37 37.8 L37 33.8"/><path d="M42 37 L42.5 33"/></g>
    <path d="M25 44.5 C27 39 31 36.5 36 36 C34 40 31.5 43 28 45.5Z" fill="#FFFFFF" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="58" cy="48" rx="24" ry="13" fill="#FFFFFF" stroke="#11191B" stroke-width="3"/>
    <path d="M44.5 39.3 C40.5 45.1 40.5 50.9 43.5 56.7 M52.5 36.7 C48.5 44.2 48.5 51.8 51.5 59.3 M60.5 36 C56.5 44 56.5 52 59.5 60 M68.5 36.7 C64.5 44.2 64.5 51.8 67.5 59.3 M76.5 39.3 C72.5 45.1 72.5 50.9 75.5 56.7" fill="none" stroke="#11191B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M48.8 58.3 L62 79.5 L56.5 82.9 L43.2 61.7Z M78.8 54.3 L92 75.5 L86.5 78.9 L73.2 57.7Z" fill="#FFFFFF" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M53 65.1 L48.1 69.6 M56.2 70.2 L51.3 74.7 M83 61.1 L78.1 65.6 M86.2 66.2 L81.3 70.7" fill="none" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M60 76.3 L62 79.5 L56.5 82.9 L54.5 79.7Z M90 72.3 L92 75.5 L86.5 78.9 L84.5 75.7Z" fill="#11191B" stroke="#11191B" stroke-width="2" stroke-linejoin="round"/>
    <path d="M81.5 45 C85 46 87.5 49 88.5 54" fill="none" stroke="#11191B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="89" cy="57.5" rx="2.5" ry="4" fill="#11191B"/>
    <path d="M17.5 52 Q20.5 55 23.5 52" fill="none" stroke="#11191B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  'pierwiastek-chemiczny': `
    <rect x="17" y="21" width="66" height="66" rx="11.2" fill="#2F6F94" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <rect x="17" y="12" width="66" height="66" rx="11.2" fill="#5DA9D6" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <rect x="26.9" y="21.9" width="46.2" height="46.2" rx="6.6" fill="#A9DBF2"/>
    <path d="M33 30 q3 -6 10 -6" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  'zwiazek-chemiczny': `
    <path d="M30 50 H40 M60 50 H70" stroke="#11191B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <rect x="7" y="41" width="24" height="24" rx="4.1" fill="#2F6F94" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <rect x="7" y="36" width="24" height="24" rx="4.1" fill="#5DA9D6" stroke="#2F6F94" stroke-width="4" stroke-linejoin="round"/>
    <rect x="10.6" y="39.6" width="16.8" height="16.8" rx="2.4" fill="#A9DBF2"/>
    
    <rect x="38" y="41" width="24" height="24" rx="4.1" fill="#8F4A0C" stroke="#8F4A0C" stroke-width="4" stroke-linejoin="round"/>
    <rect x="38" y="36" width="24" height="24" rx="4.1" fill="#F7B267" stroke="#8F4A0C" stroke-width="4" stroke-linejoin="round"/>
    <rect x="41.6" y="39.6" width="16.8" height="16.8" rx="2.4" fill="#FCDDB4"/>
    
    <rect x="69" y="41" width="24" height="24" rx="4.1" fill="#3C6E3A" stroke="#3C6E3A" stroke-width="4" stroke-linejoin="round"/>
    <rect x="69" y="36" width="24" height="24" rx="4.1" fill="#8BC34A" stroke="#3C6E3A" stroke-width="4" stroke-linejoin="round"/>
    <rect x="72.6" y="39.6" width="16.8" height="16.8" rx="2.4" fill="#D3EBB5"/>`,
  wapn: `
    <g fill="#FFFFFF" stroke="#6B7275" stroke-width="4" stroke-linejoin="round"><circle cx="15.2" cy="39.6" r="7.5"/><circle cx="22.1" cy="49.4" r="7.5"/><circle cx="47.9" cy="16.6" r="7.5"/><circle cx="54.8" cy="26.4" r="7.5"/><path d="M15.5 40 L48.2 17 L54.5 26 L21.8 49Z"/></g>
    <g fill="#FFFFFF"><circle cx="15.2" cy="39.6" r="7.5"/><circle cx="22.1" cy="49.4" r="7.5"/><circle cx="47.9" cy="16.6" r="7.5"/><circle cx="54.8" cy="26.4" r="7.5"/><path d="M15.5 40 L48.2 17 L54.5 26 L21.8 49Z"/></g>
    <path d="M42 82 C38 88 42 94 52 93 C66 92 82 90 88 80 C93 72 92 56 86 48 C78 38 64 36 54 40 C44 44 38 54 40 66 C41 72 42 78 42 82Z" fill="#F1E1C0" stroke="#8A6A3A" stroke-width="4" stroke-linejoin="round"/>
    <path d="M61.5 66 L61.4 65.7 L61.3 65.4 L61.3 65 L61.3 64.6 L61.4 64.3 L61.6 63.9 L61.8 63.5 L62.1 63.2 L62.4 62.9 L62.8 62.6 L63.2 62.3 L63.7 62.1 L64.3 62 L64.8 61.9 L65.4 62 L66 62 L66.6 62.2 L67.2 62.4 L67.8 62.7 L68.3 63.1 L68.8 63.6 L69.2 64.1 L69.6 64.7 L69.9 65.3 L70 66 L70.1 66.7 L70.1 67.4 L70 68.2 L69.8 68.9 L69.5 69.7 L69 70.3 L68.5 71 L67.8 71.6 L67.1 72.1 L66.3 72.5 L65.4 72.9 L64.5 73.1 L63.5 73.2 L62.5 73.3 L61.5 73.1 L60.5 72.9 L59.5 72.6 L58.5 72.1 L57.6 71.5 L56.8 70.8 L56.1 70 L55.5 69.1 L55 68.1 L54.6 67.1 L54.4 66 L54.4 64.9 L54.4 63.7 L54.7 62.6 L55.1 61.5 L55.7 60.4 L56.4 59.4 L57.3 58.5 L58.3 57.7 L59.4 57 L60.6 56.4 L61.9 55.9 L63.3 55.6 L64.7 55.5 L66.2 55.5 L67.6 55.8 L69 56.1 L70.4 56.7 L71.7 57.4 L72.9 58.3 L74 59.3 L75 60.4 L75.8 61.7 L76.4 63.1 L76.9 64.5 L77.1 66 L77.2 67.5 L77 69.1 L76.6 70.6 L76 72.1 L75.2 73.5 L74.2 74.8 L73 76 L71.6 77.1 L70.1 78 L68.5 78.7 L66.8 79.3 L64.9 79.6 L63.1 79.7 L61.2 79.7 L59.3 79.3 L57.4 78.8 L55.7 78.1 L54 77.1 L52.5 76 L51.1 74.6 L49.9 73.1 L48.9 71.5 L48.1 69.7 L47.6 67.9 L47.3 66 L47.3 64.1 L47.6 62.1 L48.1 60.2 L48.9 58.4 L49.9 56.6 L51.2 55 L52.7 53.5 L54.5 52.2 L56.4 51.1 L58.4 50.2 L60.6 49.5 L62.8 49.1 L65.2 49 L67.5 49.1 L69.8 49.6 L72.1 50.2 L74.2 51.2 L76.2 52.4 L78.1 53.8 L79.8 55.5" fill="none" stroke="#8A6A3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  magnez: `
    <path d="M12 88 C8 52 34 16 88 12 C92 62 62 90 12 88Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="4" stroke-linejoin="round"/>
    <g fill="none" stroke="#1F5A32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 88 L39 61"/><path d="M61 39 L84 16"/><path d="M26 74 L22 60"/><path d="M26 74 L40 78"/><path d="M70 30 L66 18"/><path d="M70 30 L82 34"/></g>
    <path d="M50 34 L66 50 L50 66 L34 50Z" fill="#EAF7D6" stroke="#1F5A32" stroke-width="3" stroke-linejoin="round"/>`,
  cukry: `
    <g stroke="#8C6A0C" stroke-width="3.5" stroke-linejoin="round"><path d="M8 60.5 L25 52 L42 60.5 L25 69Z" fill="#FFFFFF"/><path d="M8 60.5 L8 77.5 L25 86 L25 69Z" fill="#F1E6CC"/><path d="M25 69 L25 86 L42 77.5 L42 60.5Z" fill="#E4D3AA"/><path d="M38 68.5 L55 60 L72 68.5 L55 77Z" fill="#FFFFFF"/><path d="M38 68.5 L38 85.5 L55 94 L55 77Z" fill="#F1E6CC"/><path d="M55 77 L55 94 L72 85.5 L72 68.5Z" fill="#E4D3AA"/></g>
    <g fill="#C9B07A"><circle cx="18" cy="74" r="2"/><circle cx="31" cy="80" r="2"/><circle cx="48" cy="84" r="2"/><circle cx="62" cy="86" r="2"/><circle cx="55" cy="68" r="2"/></g>
    <path d="M74 8 C74 8 58 30 58 40 C58 49 65 55 74 55 C83 55 90 49 90 40 C90 30 74 8 74 8Z" fill="#F0A020" stroke="#8C5A0C" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M66 40 q1.5 -8 7 -12" fill="none" stroke="#FFE9B0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  skrobia: `
    <path d="M42 30 C42 17 56 9 70 10 C86 10 95 21 93 36 C91 50 80 57 68 57 C54 57 42 45 42 30Z" fill="#D9B27A" stroke="#7A5530" stroke-width="4" stroke-linejoin="round"/>
    <g fill="#7A5530"><circle cx="62" cy="20" r="2.3"/><circle cx="80" cy="18" r="2.3"/><circle cx="87" cy="38" r="2.3"/></g>
    <path d="M7 64 C5 46 21 35 41 36 C63 35 79 47 77 65 C75 82 59 93 41 92 C21 93 9 81 7 64Z" fill="#D9B27A" stroke="#7A5530" stroke-width="4" stroke-linejoin="round"/>
    <path d="M12 64 C10.5 49 24 40 41 41 C59 40 73 50 71.5 65 C70 79 57 88 41 87 C24 88 13.5 78 12 64Z" fill="#F7E8BC"/>
    <g fill="#FFFFFF" stroke="#A08A5A" stroke-width="2" stroke-linejoin="round"><ellipse cx="26" cy="56" rx="6.5" ry="4.5" transform="rotate(-20 26 56)"/><ellipse cx="43" cy="48" rx="6.5" ry="4.6" transform="rotate(10 43 48)"/><ellipse cx="60" cy="55" rx="6.5" ry="4.6" transform="rotate(25 60 55)"/><ellipse cx="33" cy="70" rx="7" ry="4.8" transform="rotate(12 33 70)"/><ellipse cx="52" cy="70" rx="6.5" ry="4.6" transform="rotate(-15 52 70)"/><ellipse cx="43" cy="84" rx="6" ry="4.2" transform="rotate(0 43 84)"/><ellipse cx="66" cy="73" rx="5" ry="3.8" transform="rotate(-30 66 73)"/><ellipse cx="20" cy="72" rx="4.5" ry="3.5" transform="rotate(35 20 72)"/></g>
    <g fill="#D8C69A"><circle cx="23.3" cy="57" r="1.3"/><circle cx="40.1" cy="47.5" r="1.3"/><circle cx="57.3" cy="53.8" r="1.3"/><circle cx="29.9" cy="69.3" r="1.3"/><circle cx="49.2" cy="70.8" r="1.3"/><circle cx="40.3" cy="84" r="1.3"/><circle cx="64.1" cy="74.1" r="1.3"/><circle cx="18.3" cy="70.8" r="1.3"/></g>`,
  celuloza: `
    <g stroke="#4F6B2E" stroke-width="4" stroke-linejoin="round"><rect x="8" y="12" width="28" height="19" fill="#E9F5DF"/><rect x="36" y="12" width="28" height="19" fill="#D6EDC2"/><rect x="64" y="12" width="28" height="19" fill="#E9F5DF"/><rect x="8" y="31" width="14" height="19" fill="#D6EDC2"/><rect x="22" y="31" width="28" height="19" fill="#E9F5DF"/><rect x="50" y="31" width="28" height="19" fill="#D6EDC2"/><rect x="78" y="31" width="14" height="19" fill="#E9F5DF"/><rect x="8" y="50" width="28" height="19" fill="#E9F5DF"/><rect x="36" y="50" width="28" height="19" fill="#D6EDC2"/><rect x="64" y="50" width="28" height="19" fill="#E9F5DF"/><rect x="8" y="69" width="14" height="19" fill="#D6EDC2"/><rect x="22" y="69" width="28" height="19" fill="#E9F5DF"/><rect x="50" y="69" width="28" height="19" fill="#D6EDC2"/><rect x="78" y="69" width="14" height="19" fill="#E9F5DF"/></g>
    <rect x="8" y="12" width="84" height="76" rx="3" fill="none" stroke="#4F6B2E" stroke-width="5" stroke-linejoin="round"/>`,
  chityna: `
    <path d="M38 58 H62 L64.5 90 C64.7 92.2 63 94 60.8 94 H39.2 C37 94 35.3 92.2 35.5 90Z" fill="#FBF3E4" stroke="#8A6A3A" stroke-width="4" stroke-linejoin="round"/>
    <path d="M37.2 70 H62.8 M36.4 82 H63.6 M50 58 V70 M43 70 V82 M57 70 V82 M50 82 V94" fill="none" stroke="#B9965E" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M8 56 A42 46 0 0 1 92 56 Q50 64 8 56Z" fill="#E2C08F" stroke="#6B4A23" stroke-width="4" stroke-linejoin="round"/>
    <path d="M22.7 22 L77.3 22 M14.1 34 L85.9 34 M10 46 L90 46 M50 10 L50 22 M36 22 L36 34 M64 22 L64 34 M26 34 L26 46 M50 34 L50 46 M74 34 L74 46 M18 46 L18 56 M38 46 L38 56 M62 46 L62 56 M82 46 L82 56" fill="none" stroke="#8A6A3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  bialka: `
    <path d="M16 30 C18.3 27.7 24.3 18.7 30 16 C35.7 13.3 43.7 13 50 14 C56.3 15 64 18 68 22 C72 26 75 33.7 74 38 C73 42.3 67 47 62 48 C57 49 49.3 43.7 44 44 C38.7 44.3 33.3 46.3 30 50 C26.7 53.7 23.3 61 24 66 C24.7 71 29.3 76.8 34 80 C38.7 83.2 46 85 52 85 C58 85 65 83.2 70 80 C75 76.8 79.7 71 82 66 C84.3 61 83.7 52.7 84 50" fill="none" stroke="#5A6B6E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="16" cy="30" r="6.2" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="23.5" cy="21.2" r="6.2" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="33" cy="14.8" r="6.2" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="44.5" cy="13.5" r="6.2" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="55.9" cy="15.4" r="6.2" fill="#B79BDD" stroke="#4E3684" stroke-width="2.5"/><circle cx="66.3" cy="20.5" r="6.2" fill="#F0A35E" stroke="#8C4A12" stroke-width="2.5"/><circle cx="72.9" cy="29.9" r="6.2" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="72.6" cy="41" r="6.2" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="63.4" cy="47.6" r="6.2" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="52.1" cy="45.9" r="6.2" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="40.8" cy="44.4" r="6.2" fill="#F0A35E" stroke="#8C4A12" stroke-width="2.5"/><circle cx="30.6" cy="49.4" r="6.2" fill="#B79BDD" stroke="#4E3684" stroke-width="2.5"/><circle cx="24.8" cy="59.4" r="6.2" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="25.6" cy="70.6" r="6.2" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="33.1" cy="79.3" r="6.2" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="43.6" cy="84" r="6.2" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="55.1" cy="84.8" r="6.2" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="66.3" cy="82" r="6.2" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="75.6" cy="75.2" r="6.2" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="82.1" cy="65.7" r="6.2" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="83.9" cy="54.3" r="6.2" fill="#B79BDD" stroke="#4E3684" stroke-width="2.5"/>`,
  enzymy: `
    <path d="M48.5 47 L56.5 51 L39 90 C38 92 35 92 34.5 90Z" fill="#DDE3E5" stroke="#5A6B6E" stroke-width="3" stroke-linejoin="round"/>
    <path d="M11.5 66 H45 M55 66 H88.5" stroke="#5A6B6E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="11.5" cy="66" r="5.5" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="23" cy="66" r="5.5" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="34.5" cy="66" r="5.5" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="45" cy="66" r="5.5" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="55" cy="66" r="5.5" fill="#F0A35E" stroke="#8C4A12" stroke-width="2.5"/><circle cx="65.5" cy="66" r="5.5" fill="#B79BDD" stroke="#4E3684" stroke-width="2.5"/><circle cx="77" cy="66" r="5.5" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="88.5" cy="66" r="5.5" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/>
    <path d="M51.5 47 L43.5 51 L61 90 C62 92 65 92 65.5 90Z" fill="#DDE3E5" stroke="#5A6B6E" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 49 L36 28 M50 49 L64 28" stroke="#C23B47" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#E0525B" stroke="#8E1F2A" stroke-width="3" stroke-linejoin="round"><circle cx="32" cy="20" r="11"/><circle cx="68" cy="20" r="11"/></g>
    <g fill="#FFFFFF" stroke="#8E1F2A" stroke-width="3" stroke-linejoin="round"><circle cx="32" cy="20" r="5"/><circle cx="68" cy="20" r="5"/></g>
    <circle cx="50" cy="49" r="3.5" fill="#5A6B6E" stroke="#11191B" stroke-width="2"/>`,
  tluszcze: `
    <path d="M50 8 C50 8 20 46 20 64 C20 80 34 92 50 92 C66 92 80 80 80 64 C80 46 50 8 50 8Z" fill="#F7D84E" stroke="#A07A0A" stroke-width="4" stroke-linejoin="round"/>
    <path d="M36 62 q2 -12 12 -18" fill="none" stroke="#FFF6C8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'kwasy-nukleinowe': `
    <path d="M12 70 C12.8 67.5 14.9 60.1 16.7 55.2 C18.4 50.4 20 45.3 22.6 40.9 C25.2 36.6 28.7 29.8 32.3 29 C35.9 28.2 40.9 32.5 44.1 35.9 C47.3 39.3 49.5 44.7 51.7 49.4 C53.8 54.1 54.4 59.6 56.8 64 C59.2 68.5 62.8 74.8 66.3 75.9 C69.9 77.1 75.3 74.2 78.2 70.9 C81.1 67.7 82.9 58.9 83.8 56.4" fill="none" stroke="#6B3FA0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="70" r="5.5" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="16.7" cy="55.2" r="5.5" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="22.6" cy="40.9" r="5.5" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="32.3" cy="29" r="5.5" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="44.1" cy="35.9" r="5.5" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/><circle cx="51.7" cy="49.4" r="5.5" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="56.8" cy="64" r="5.5" fill="#E0525B" stroke="#8E1F2A" stroke-width="2.5"/><circle cx="66.3" cy="75.9" r="5.5" fill="#F5B800" stroke="#9C6B00" stroke-width="2.5"/><circle cx="78.2" cy="70.9" r="5.5" fill="#5DA9D6" stroke="#2F6F94" stroke-width="2.5"/><circle cx="83.8" cy="56.4" r="5.5" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5"/>`,
  dna: `
    <path d="M73 18 L72.9 18.5 L72.6 19 L72.3 19.5 L71.8 20 L71.2 20.5 L70.5 21 L69.6 21.5 L68.7 22 L67.7 22.5 L66.6 23 L65.3 23.5 L64.1 24 L62.7 24.5 L61.3 25 L59.8 25.5 L58.2 26 L56.6 26.5 L55 27 L53.3 27.5 L51.7 28 L50 28.5 L48.3 29 L46.7 29.5 L45 30 L43.4 30.5 L41.8 31 L40.2 31.5 L38.7 32 L37.3 32.5 L35.9 33 L34.7 33.5 L33.4 34 L32.3 34.5 L31.3 35 L30.4 35.5 L29.5 36 L28.8 36.5 L28.2 37 L27.7 37.5 L27.4 38 L27.1 38.5 L27 39 L27 39.5 M73 61 L72.9 61.5 L72.6 62 L72.3 62.5 L71.8 63 L71.2 63.5 L70.5 64 L69.6 64.5 L68.7 65 L67.7 65.5 L66.6 66 L65.3 66.5 L64.1 67 L62.7 67.5 L61.3 68 L59.8 68.5 L58.2 69 L56.6 69.5 L55 70 L53.3 70.5 L51.7 71 L50 71.5 L48.3 72 L46.7 72.5 L45 73 L43.4 73.5 L41.8 74 L40.2 74.5 L38.7 75 L37.3 75.5 L35.9 76 L34.7 76.5 L33.4 77 L32.3 77.5 L31.3 78 L30.4 78.5 L29.5 79 L28.8 79.5 L28.2 80 L27.7 80.5 L27.4 81 L27.1 81.5 L27 82 L27 82.5 M50 7 L48.3 7.5 L46.7 8 L45 8.5 L43.4 9 L41.8 9.5 L40.2 10 L38.7 10.5 L37.3 11 L35.9 11.5 L34.7 12 L33.4 12.5 L32.3 13 L31.3 13.5 L30.4 14 L29.5 14.5 L28.8 15 L28.2 15.5 L27.7 16 L27.4 16.5 L27.1 17 L27 17.5 L27 18 M73 39.5 L72.9 40 L72.6 40.5 L72.3 41 L71.8 41.5 L71.2 42 L70.5 42.5 L69.6 43 L68.7 43.5 L67.7 44 L66.6 44.5 L65.3 45 L64.1 45.5 L62.7 46 L61.3 46.5 L59.8 47 L58.2 47.5 L56.6 48 L55 48.5 L53.3 49 L51.7 49.5 L50 50 L48.3 50.5 L46.7 51 L45 51.5 L43.4 52 L41.8 52.5 L40.2 53 L38.7 53.5 L37.3 54 L35.9 54.5 L34.7 55 L33.4 55.5 L32.3 56 L31.3 56.5 L30.4 57 L29.5 57.5 L28.8 58 L28.2 58.5 L27.7 59 L27.4 59.5 L27.1 60 L27 60.5 L27 61 M73 82.5 L72.9 83 L72.6 83.5 L72.3 84 L71.8 84.5 L71.2 85 L70.5 85.5 L69.6 86 L68.7 86.5 L67.7 87 L66.6 87.5 L65.3 88 L64.1 88.5 L62.7 89 L61.3 89.5 L59.8 90 L58.2 90.5 L56.6 91 L55 91.5 L53.3 92 L51.7 92.5 L50 93" fill="none" stroke="#9C86C4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <g stroke-width="4" stroke-linejoin="round"><path d="M62.7 11 L50 11" stroke="#5DA9D6"/><path d="M50 11 L37.3 11" stroke="#F5B800"/><path d="M73 17.6 L50 17.6" stroke="#E0525B"/><path d="M50 17.6 L27 17.6" stroke="#3C9A47"/><path d="M63.5 24.2 L50 24.2" stroke="#F5B800"/><path d="M50 24.2 L36.5 24.2" stroke="#5DA9D6"/><path d="M42.4 30.8 L50 30.8" stroke="#3C9A47"/><path d="M50 30.8 L57.6 30.8" stroke="#E0525B"/><path d="M27.8 37.4 L50 37.4" stroke="#5DA9D6"/><path d="M50 37.4 L72.2 37.4" stroke="#F5B800"/><path d="M32.3 44 L50 44" stroke="#E0525B"/><path d="M50 44 L67.7 44" stroke="#3C9A47"/><path d="M70 57.2 L50 57.2" stroke="#F5B800"/><path d="M50 57.2 L30 57.2" stroke="#5DA9D6"/><path d="M70.8 63.8 L50 63.8" stroke="#3C9A47"/><path d="M50 63.8 L29.2 63.8" stroke="#E0525B"/><path d="M33.4 77 L50 77" stroke="#5DA9D6"/><path d="M50 77 L66.6 77" stroke="#F5B800"/><path d="M27.4 83.6 L50 83.6" stroke="#E0525B"/><path d="M50 83.6 L72.6 83.6" stroke="#3C9A47"/><path d="M40.9 90.2 L50 90.2" stroke="#F5B800"/><path d="M50 90.2 L59.1 90.2" stroke="#5DA9D6"/></g>
    <path d="M50 7 L51.7 7.5 L53.3 8 L55 8.5 L56.6 9 L58.2 9.5 L59.8 10 L61.3 10.5 L62.7 11 L64.1 11.5 L65.3 12 L66.6 12.5 L67.7 13 L68.7 13.5 L69.6 14 L70.5 14.5 L71.2 15 L71.8 15.5 L72.3 16 L72.6 16.5 L72.9 17 L73 17.5 L73 18 M27 39.5 L27.1 40 L27.4 40.5 L27.7 41 L28.2 41.5 L28.8 42 L29.5 42.5 L30.4 43 L31.3 43.5 L32.3 44 L33.4 44.5 L34.7 45 L35.9 45.5 L37.3 46 L38.7 46.5 L40.2 47 L41.8 47.5 L43.4 48 L45 48.5 L46.7 49 L48.3 49.5 L50 50 L51.7 50.5 L53.3 51 L55 51.5 L56.6 52 L58.2 52.5 L59.8 53 L61.3 53.5 L62.7 54 L64.1 54.5 L65.3 55 L66.6 55.5 L67.7 56 L68.7 56.5 L69.6 57 L70.5 57.5 L71.2 58 L71.8 58.5 L72.3 59 L72.6 59.5 L72.9 60 L73 60.5 L73 61 M27 82.5 L27.1 83 L27.4 83.5 L27.7 84 L28.2 84.5 L28.8 85 L29.5 85.5 L30.4 86 L31.3 86.5 L32.3 87 L33.4 87.5 L34.7 88 L35.9 88.5 L37.3 89 L38.7 89.5 L40.2 90 L41.8 90.5 L43.4 91 L45 91.5 L46.7 92 L48.3 92.5 L50 93" fill="none" stroke="#6B3FA0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27 18 L27.1 18.5 L27.4 19 L27.7 19.5 L28.2 20 L28.8 20.5 L29.5 21 L30.4 21.5 L31.3 22 L32.3 22.5 L33.4 23 L34.7 23.5 L35.9 24 L37.3 24.5 L38.7 25 L40.2 25.5 L41.8 26 L43.4 26.5 L45 27 L46.7 27.5 L48.3 28 L50 28.5 L51.7 29 L53.3 29.5 L55 30 L56.6 30.5 L58.2 31 L59.8 31.5 L61.3 32 L62.7 32.5 L64.1 33 L65.3 33.5 L66.6 34 L67.7 34.5 L68.7 35 L69.6 35.5 L70.5 36 L71.2 36.5 L71.8 37 L72.3 37.5 L72.6 38 L72.9 38.5 L73 39 L73 39.5 M27 61 L27.1 61.5 L27.4 62 L27.7 62.5 L28.2 63 L28.8 63.5 L29.5 64 L30.4 64.5 L31.3 65 L32.3 65.5 L33.4 66 L34.7 66.5 L35.9 67 L37.3 67.5 L38.7 68 L40.2 68.5 L41.8 69 L43.4 69.5 L45 70 L46.7 70.5 L48.3 71 L50 71.5 L51.7 72 L53.3 72.5 L55 73 L56.6 73.5 L58.2 74 L59.8 74.5 L61.3 75 L62.7 75.5 L64.1 76 L65.3 76.5 L66.6 77 L67.7 77.5 L68.7 78 L69.6 78.5 L70.5 79 L71.2 79.5 L71.8 80 L72.3 80.5 L72.6 81 L72.9 81.5 L73 82 L73 82.5" fill="none" stroke="#2F6F94" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  // Etap 3: ptaki i bezkręgowce (światy 1 i 5).
  gil: `
    <g fill="none" stroke="#5A4A44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M48 74 V85"/><path d="M57 74 V85"/></g>
    <path d="M66 61 L87 74 C90 76 88 81 85 80 L63 70Z" fill="#262B2E" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 31 C24.8 27.7 26 25 28 23 C30 21 33.2 19.3 36 19 C38.8 18.7 42.5 19.5 45 21 C47.5 22.5 48.3 25.8 51 28 C53.7 30.2 57.7 31.3 61 34 C64.3 36.7 68.3 40.5 71 44 C73.7 47.5 76 51.7 77 55 C78 58.3 78.2 61.3 77 64 C75.8 66.7 73 69 70 71 C67 73 62.8 75.2 59 76 C55.2 76.8 50.8 76.8 47 76 C43.2 75.2 39.2 73.3 36 71 C32.8 68.7 30 65.2 28 62 C26 58.8 24.8 55.2 24 52 C23.2 48.8 23 46.5 23 43 C23 39.5 23.2 34.3 24 31Z" fill="#8D979D"/>
    <path d="M77 64 C75.8 66.7 73 69 70 71 C67 73 62.8 75.2 59 76 C59.8 75 61 72 64 70 C67 68 74.8 65 77 64Z" fill="#F4F1EC"/>
    <path d="M59 76 C55.2 76.8 50.8 76.8 47 76 C43.2 75.2 39.2 73.3 36 71 C32.8 68.7 30 65.2 28 62 C26 58.8 24.8 55.2 24 52 C23.2 48.8 23 46.5 23 43 C24.2 42.2 27.5 39.5 30 38 C32.5 36.5 35.3 35.3 38 34 C40.7 32.7 43.3 29.3 46 30 C48.7 30.7 51.3 34.7 54 38 C56.7 41.3 59.8 46.2 62 50 C64.2 53.8 67.5 56.7 67 61 C66.5 65.3 60.3 73.5 59 76Z" fill="#E2453C"/>
    <path d="M23 43 C23 39.5 23.2 34.3 24 31 C24.8 27.7 26 25 28 23 C30 21 33.2 19.3 36 19 C38.8 18.7 42.5 19.5 45 21 C47.5 22.5 48.3 25.8 51 28 C50.2 28.5 48.2 29.5 46 31 C43.8 32.5 40.7 35.3 38 37 C35.3 38.7 32.5 40 30 41 C27.5 42 24.2 42.7 23 43Z" fill="#1F2427"/>
    <path d="M45 34 C46.8 33 52.3 33.5 56 35 C59.7 36.5 63.7 39.7 67 43 C70.3 46.3 73.3 50.8 76 55 C78.7 59.2 80.7 63.7 83 68 C78.7 67 74 66.7 70 65 C66 63.3 62.3 60.7 59 58 C55.7 55.3 52.3 51.8 50 49 C47.7 46.2 45.8 43.5 45 41 C44.2 38.5 43.2 35 45 34Z" fill="#262B2E" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M49 44 C50.3 42.7 55.2 42.2 58 43 C60.8 43.8 65 47.2 66 49 C67 50.8 65.7 53.8 64 54 C62.3 54.2 58.3 50.5 56 50 C53.7 49.5 51.2 52 50 51 C48.8 50 47.7 45.3 49 44Z" fill="#C9D0D4"/>
    <path d="M24 31 C24.8 27.7 26 25 28 23 C30 21 33.2 19.3 36 19 C38.8 18.7 42.5 19.5 45 21 C47.5 22.5 48.3 25.8 51 28 C53.7 30.2 57.7 31.3 61 34 C64.3 36.7 68.3 40.5 71 44 C73.7 47.5 76 51.7 77 55 C78 58.3 78.2 61.3 77 64 C75.8 66.7 73 69 70 71 C67 73 62.8 75.2 59 76 C55.2 76.8 50.8 76.8 47 76 C43.2 75.2 39.2 73.3 36 71 C32.8 68.7 30 65.2 28 62 C26 58.8 24.8 55.2 24 52 C23.2 48.8 23 46.5 23 43 C23 39.5 23.2 34.3 24 31Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M25 31 C19 30 14 33 13 37 C15 41 20 43 24 42Z" fill="#3E4449" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="31" cy="33" r="2.6" fill="#11191B"/><circle cx="31.9" cy="32.1" r="1" fill="#FFFFFF"/>
    <path d="M6 86 C30 82 62 82 94 84 L94 90 C62 88 30 88 6 92Z" fill="#8A5A32" stroke="#4A2E16" stroke-width="3" stroke-linejoin="round"/>`,
  zieba: `
    <g fill="none" stroke="#8A6F62" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M45 70 V85"/><path d="M53 71 V85"/></g>
    <path d="M62 56 L86 80 C88 82 86 86 83 85 L58 64Z" fill="#3A3F42" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 32 C24.8 29.5 26.2 26.8 28 25 C29.8 23.2 32.5 21.5 35 21 C37.5 20.5 40.7 20.8 43 22 C45.3 23.2 46.7 25.8 49 28 C51.3 30.2 54.2 32.3 57 35 C59.8 37.7 63.5 40.8 66 44 C68.5 47.2 71.2 51 72 54 C72.8 57 72.3 59.7 71 62 C69.7 64.3 66.8 66.3 64 68 C61.2 69.7 57.5 71.5 54 72 C50.5 72.5 46.3 72.2 43 71 C39.7 69.8 36.7 67.5 34 65 C31.3 62.5 28.7 59 27 56 C25.3 53 24.7 49.7 24 47 C23.3 44.3 23 42.5 23 40 C23 37.5 23.2 34.5 24 32Z" fill="#9C6440"/>
    <path d="M71 62 C69.7 64.3 66.8 66.3 64 68 C61.2 69.7 57.5 71.5 54 72 C55 71 57.2 67.7 60 66 C62.8 64.3 69.2 62.7 71 62Z" fill="#F2EDE6"/>
    <path d="M54 72 C50.5 72.5 46.3 72.2 43 71 C39.7 69.8 36.7 67.5 34 65 C31.3 62.5 28.7 59 27 56 C25.3 53 24.7 49.7 24 47 C23.3 44.3 23 42.5 23 40 C23 37.5 23.2 34.5 24 32 C24.8 31.5 27 29.6 29 29 C31 28.4 33.7 28 36 28.5 C38.3 29 40.7 30.6 43 32 C45.3 33.4 47.7 34.5 50 37 C52.3 39.5 55 43.8 57 47 C59 50.2 60.8 53.3 62 56 C63.2 58.7 65.3 60.3 64 63 C62.7 65.7 55.7 70.5 54 72Z" fill="#D98C74"/>
    <path d="M24 32 C24.8 29.5 26.2 26.8 28 25 C29.8 23.2 32.5 21.5 35 21 C37.5 20.5 40.7 20.8 43 22 C45.3 23.2 46.7 25.8 49 28 C51.3 30.2 54.2 32.3 57 35 C55.8 35.3 52.3 37.5 50 37 C47.7 36.5 45.3 33.4 43 32 C40.7 30.6 38.3 29 36 28.5 C33.7 28 31 28.4 29 29 C27 29.6 24.8 31.5 24 32Z" fill="#7891A8"/>
    <path d="M45 36 C46.8 35.2 51.8 35.5 55 37 C58.2 38.5 61.3 41.8 64 45 C66.7 48.2 68.7 51.8 71 56 C73.3 60.2 75.7 65.3 78 70 C74 68.3 69.7 67 66 65 C62.3 63 59 60.7 56 58 C53 55.3 50 51.7 48 49 C46 46.3 44.5 44.2 44 42 C43.5 39.8 43.2 36.8 45 36Z" fill="#2A2D30" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M46 39 C47.3 38 51.3 37.2 53 38 C54.7 38.8 56.5 42.5 56 44 C55.5 45.5 51.8 47 50 47 C48.2 47 45.7 45.3 45 44 C44.3 42.7 44.7 40 46 39Z" fill="#FFFFFF"/>
    <path d="M51 52 C52.2 50.5 58.8 47.2 61 47 C63.2 46.8 65.2 49.5 64 51 C62.8 52.5 56.2 55.8 54 56 C51.8 56.2 49.8 53.5 51 52Z" fill="#FFFFFF"/>
    <path d="M24 32 C24.8 29.5 26.2 26.8 28 25 C29.8 23.2 32.5 21.5 35 21 C37.5 20.5 40.7 20.8 43 22 C45.3 23.2 46.7 25.8 49 28 C51.3 30.2 54.2 32.3 57 35 C59.8 37.7 63.5 40.8 66 44 C68.5 47.2 71.2 51 72 54 C72.8 57 72.3 59.7 71 62 C69.7 64.3 66.8 66.3 64 68 C61.2 69.7 57.5 71.5 54 72 C50.5 72.5 46.3 72.2 43 71 C39.7 69.8 36.7 67.5 34 65 C31.3 62.5 28.7 59 27 56 C25.3 53 24.7 49.7 24 47 C23.3 44.3 23 42.5 23 40 C23 37.5 23.2 34.5 24 32Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 32 L12 37 L23 41Z" fill="#8FA2B3" stroke="#3A4A58" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="31" cy="33" r="2.4" fill="#11191B"/><circle cx="31.8" cy="32.2" r="0.9" fill="#FFFFFF"/>
    <path d="M6 86 C30 82 62 82 94 84 L94 90 C62 88 30 88 6 92Z" fill="#8A5A32" stroke="#4A2E16" stroke-width="3" stroke-linejoin="round"/>`,
  koliber: `
    <path d="M20 84 C19 87 18 90 17 92" fill="none" stroke="#2E6B33" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 90 C16.7 90.8 11.3 88.7 8 88 C10.7 86.3 14.3 82.7 16 83 C17.7 83.3 19.3 89.2 18 90Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M17 80 C16.7 77.8 18.8 73.2 20 70 C21.2 66.8 23.3 63.8 24 61 C24.7 58.2 24.5 55.7 24 53 C23.5 50.3 21 47.2 21 45 C21 42.8 22.7 40.3 24 40 C25.3 39.7 27.7 44 29 43 C30.3 42 30.7 35.7 32 34 C33.3 32.3 36 32 37 33 C38 34 36.8 39.3 38 40 C39.2 40.7 42.3 36.8 44 37 C45.7 37.2 48.2 39.3 48 41 C47.8 42.7 45.2 44.7 43 47 C40.8 49.3 37.2 52.2 35 55 C32.8 57.8 31.5 60.8 30 64 C28.5 67.2 27.3 70.8 26 74 C24.7 77.2 23.5 82 22 83 C20.5 84 17.3 82.2 17 80Z" fill="#E0525B" stroke="#8E1F2A" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="36" cy="45" rx="5.5" ry="2.6" transform="rotate(-40 36 45)" fill="#8E1F2A"/>
    <path d="M15 79 C14.8 76.5 17 74.3 18 72 C19 74 19.7 77.5 21 78 C22.3 78.5 24.3 76 26 75 C25.7 77.7 26.2 81 25 83 C23.8 85 20.7 87.7 19 87 C17.3 86.3 15.2 81.5 15 79Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M64 42 C58 30 56 18 58 8 C64 18 68 30 68 42Z" fill="#CDEBD9" stroke="#1B6B45" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M70 58 C68.5 60.5 71.3 68 72 73 C73.7 72 75.2 69.5 77 70 C78.8 70.5 81 74 83 76 C82.3 70 83.2 61 81 58 C78.8 55 71.5 55.5 70 58Z" fill="#1F7A4A" stroke="#11402A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M51 36 C51.5 34.2 53.3 31.8 55 31 C56.7 30.2 59.3 30.2 61 31 C62.7 31.8 63.5 34.3 65 36 C66.5 37.7 68.2 39 70 41 C71.8 43 74.5 45.5 76 48 C77.5 50.5 79 53.7 79 56 C79 58.3 77.7 61.2 76 62 C74.3 62.8 71.3 62.2 69 61 C66.7 59.8 64.2 57.2 62 55 C59.8 52.8 57.7 50.2 56 48 C54.3 45.8 52.8 44 52 42 C51.2 40 50.5 37.8 51 36Z" fill="#2FB36A"/>
    <path d="M69 61 C66.7 59.8 64.2 57.2 62 55 C59.8 52.8 57.7 50.2 56 48 C54.3 45.8 52.8 44 52 42 C53.2 42.5 56.7 43.2 59 45 C61.3 46.8 64.3 50.3 66 53 C67.7 55.7 68.5 59.7 69 61Z" fill="#9EDDB4"/>
    <path d="M51 36 C51.5 34.2 53.3 31.8 55 31 C56.7 30.2 59.3 30.2 61 31 C62.7 31.8 63.5 34.3 65 36 C66.5 37.7 68.2 39 70 41 C71.8 43 74.5 45.5 76 48 C77.5 50.5 79 53.7 79 56 C79 58.3 77.7 61.2 76 62 C74.3 62.8 71.3 62.2 69 61 C66.7 59.8 64.2 57.2 62 55 C59.8 52.8 57.7 50.2 56 48 C54.3 45.8 52.8 44 52 42 C51.2 40 50.5 37.8 51 36Z" fill="none" stroke="#11402A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M66 44 C72 30 80 20 90 14 C86 26 78 36 70 46Z" fill="#CDEBD9" stroke="#1B6B45" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M51 38 L37 44" fill="none" stroke="#11191B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="57" cy="36" r="1.9" fill="#11191B"/><circle cx="57.7" cy="35.3" r="0.7" fill="#FFFFFF"/>`,
  nektarnik: `
    <path d="M29 76 C28 84 27 88 26 93" fill="none" stroke="#2E6B33" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27 88 C25 88.7 18.3 85.3 14 84 C18 82.7 23.8 79.3 26 80 C28.2 80.7 29 87.3 27 88Z" fill="#3C9A47" stroke="#1F5A32" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="#F2663A" stroke="#8C2E0C" stroke-width="2.5" stroke-linejoin="round"><ellipse cx="29" cy="55" rx="6.5" ry="9" transform="rotate(0 29 55)"/><ellipse cx="37.6" cy="61.2" rx="6.5" ry="9" transform="rotate(72 37.6 61.2)"/><ellipse cx="34.3" cy="71.3" rx="6.5" ry="9" transform="rotate(144 34.3 71.3)"/><ellipse cx="23.7" cy="71.3" rx="6.5" ry="9" transform="rotate(216 23.7 71.3)"/><ellipse cx="20.4" cy="61.2" rx="6.5" ry="9" transform="rotate(288 20.4 61.2)"/></g>
    <circle cx="29" cy="64" r="5" fill="#F6D24A" stroke="#8C6A0C" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M74 66 L88 90 L84 92 L70 70Z" fill="#1E4E6E" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M66 70 V82"/><path d="M72 71 V82"/></g>
    <path d="M50 84 C64 80 80 79 94 76 L94 81 C80 84 64 85 50 89Z" fill="#8A5A32" stroke="#4A2E16" stroke-width="3" stroke-linejoin="round"/>
    <path d="M52 37 C52.3 34.5 53.3 32.3 55 31 C56.7 29.7 59.8 28.7 62 29 C64.2 29.3 66.3 31.2 68 33 C69.7 34.8 70.3 37.2 72 40 C73.7 42.8 76.3 46.3 78 50 C79.7 53.7 81.7 58.7 82 62 C82.3 65.3 81.7 68.3 80 70 C78.3 71.7 74.7 72.7 72 72 C69.3 71.3 66.5 68.7 64 66 C61.5 63.3 58.8 59.3 57 56 C55.2 52.7 53.8 49.2 53 46 C52.2 42.8 51.7 39.5 52 37Z" fill="#1C86A8"/>
    <path d="M53 46 C52.2 42.8 51.7 39.5 52 37 C52.3 34.5 53.3 32.3 55 31 C56.7 29.7 59.8 28.7 62 29 C64.2 29.3 66.3 31.2 68 33 C69.7 34.8 70.3 37.2 72 40 C71 40.3 68 41.3 66 42 C64 42.7 62.2 43.3 60 44 C57.8 44.7 54.2 45.7 53 46Z" fill="#1FA884"/>
    <path d="M52 37 C52.3 34.5 53.3 32.3 55 31 C56.7 29.7 59.8 28.7 62 29 C64.2 29.3 66.3 31.2 68 33 C69.7 34.8 70.3 37.2 72 40 C73.7 42.8 76.3 46.3 78 50 C79.7 53.7 81.7 58.7 82 62 C82.3 65.3 81.7 68.3 80 70 C78.3 71.7 74.7 72.7 72 72 C69.3 71.3 66.5 68.7 64 66 C61.5 63.3 58.8 59.3 57 56 C55.2 52.7 53.8 49.2 53 46 C52.2 42.8 51.7 39.5 52 37Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M61 45 C61.8 42.8 66.5 41.8 69 43 C71.5 44.2 74.2 48.2 76 52 C77.8 55.8 78.7 61.3 80 66 C77.3 65.3 74.7 65.7 72 64 C69.3 62.3 65.8 59.2 64 56 C62.2 52.8 60.2 47.2 61 45Z" fill="#22485A" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M58 31.5 C61 30.5 64 31 66 32.5" fill="none" stroke="#BFF2E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M53 36 C44 32 34 40 29 60 C35 46 44 40 53 40.5Z" fill="#11191B"/>
    <circle cx="59" cy="35" r="1.9" fill="#11191B"/><circle cx="59.7" cy="34.3" r="0.7" fill="#FFFFFF"/>`,
  'orzel-przedni': `
    <path d="M56 74 L70 72 L72 94 L60 94Z" fill="#3E2616" stroke="#2A1A0E" stroke-width="3" stroke-linejoin="round"/>
    <path d="M26 17 C27 14.7 28.7 12.3 31 11 C33.3 9.7 37.2 8.7 40 9 C42.8 9.3 46 10.8 48 13 C50 15.2 50.3 18.7 52 22 C53.7 25.3 56 28.7 58 33 C60 37.3 62.3 42.8 64 48 C65.7 53.2 67.3 59.3 68 64 C68.7 68.7 69.7 73 68 76 C66.3 79 61.7 81.3 58 82 C54.3 82.7 49.7 81.7 46 80 C42.3 78.3 38.7 75.7 36 72 C33.3 68.3 31.3 62.7 30 58 C28.7 53.3 28.5 48.3 28 44 C27.5 39.7 27.5 35.2 27 32 C26.5 28.8 25.2 27.5 25 25 C24.8 22.5 25 19.3 26 17Z" fill="#5A3A22"/>
    <path d="M40 9 C42.8 9.3 46 10.8 48 13 C50 15.2 50.3 18.7 52 22 C53.7 25.3 56 28.7 58 33 C57 32.8 54.2 33.3 52 32 C49.8 30.7 47.2 27.5 45 25 C42.8 22.5 39.8 19.7 39 17 C38.2 14.3 39.8 10.3 40 9Z" fill="#D9A441"/>
    <path d="M44 30 C46 28 52.7 29.3 56 32 C59.3 34.7 62 41 64 46 C66 51 67.2 56 68 62 C68.8 68 68.7 75.3 69 82 C65.3 79.3 61.2 77.7 58 74 C54.8 70.3 52.3 65 50 60 C47.7 55 45 49 44 44 C43 39 42 32 44 30Z" fill="#43291A" stroke="#2A1A0E" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M36 64 C38.3 62 45 60.7 48 62 C51 63.3 53 68.7 54 72 C55 75.3 55.3 80 54 82 C52.7 84 48.7 84 46 84 C43.3 84 40 83.7 38 82 C36 80.3 34.3 77 34 74 C33.7 71 33.7 66 36 64Z" fill="#7A5232" stroke="#2A1A0E" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M26 17 C27 14.7 28.7 12.3 31 11 C33.3 9.7 37.2 8.7 40 9 C42.8 9.3 46 10.8 48 13 C50 15.2 50.3 18.7 52 22 C53.7 25.3 56 28.7 58 33 C60 37.3 62.3 42.8 64 48 C65.7 53.2 67.3 59.3 68 64 C68.7 68.7 69.7 73 68 76 C66.3 79 61.7 81.3 58 82 C54.3 82.7 49.7 81.7 46 80 C42.3 78.3 38.7 75.7 36 72 C33.3 68.3 31.3 62.7 30 58 C28.7 53.3 28.5 48.3 28 44 C27.5 39.7 27.5 35.2 27 32 C26.5 28.8 25.2 27.5 25 25 C24.8 22.5 25 19.3 26 17Z" fill="none" stroke="#2A1A0E" stroke-width="3" stroke-linejoin="round"/>
    <path d="M27 15 C20 15 15 18 14 23 C13 26 14 29 16 30 C16 28 17 26 19 26 L27 27Z" fill="#4A4A48" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M27 15 C24 15 22 16 21 17 L22 26 L27 27Z" fill="#F2C230"/>
    <circle cx="33" cy="19" r="2.8" fill="#C98A3A"/><circle cx="33" cy="19" r="1.4" fill="#11191B"/>
    <path d="M6 85 C30 83 66 83 94 85 L94 91 C66 89 30 89 6 91Z" fill="#8A6A3A" stroke="#4A3612" stroke-width="3" stroke-linejoin="round"/>
    <g fill="none" stroke="#8C6A0C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M38 82 L35 87.5 M42 82 L40 88.5 M45 82 L45 87.5 M50 82 L49 87.5 M54 82 L54 88.5 M57 82 L59 87.5"/></g>
    <g fill="none" stroke="#F2C230" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M38 82 L35 87.5 M42 82 L40 88.5 M45 82 L45 87.5 M50 82 L49 87.5 M54 82 L54 88.5 M57 82 L59 87.5"/></g>
    <g fill="none" stroke="#11191B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M35 87.5 C33.5 89.5 34 91.5 36 92.5"/><path d="M40 88.5 C38.5 90.5 39 92.5 41 93.5"/><path d="M45 87.5 C43.5 89.5 44 91.5 46 92.5"/><path d="M49 87.5 C47.5 89.5 48 91.5 50 92.5"/><path d="M54 88.5 C52.5 90.5 53 92.5 55 93.5"/><path d="M59 87.5 C57.5 89.5 58 91.5 60 92.5"/></g>`,
  sep: `
    <path d="M84 72 L93 85 L87 90 L76 80Z" fill="#4A2E16" stroke="#2A1A0E" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="none" stroke="#9A948C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M52 84 V89"/><path d="M62 84 V89"/></g>
    <path d="M6 88 C30 86 66 86 94 88 L94 93 C66 91 30 91 6 93Z" fill="#8A6A3A" stroke="#4A3612" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="none" stroke="#9A948C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M52 89 L46 89.5"/><path d="M62 89 L56 89.5"/></g>
    <path d="M36 44 C38 40.3 40.7 36.8 44 34 C47.3 31.2 52 28 56 27 C60 26 64.3 26.5 68 28 C71.7 29.5 75 32.3 78 36 C81 39.7 84 45.3 86 50 C88 54.7 89 59.3 90 64 C91 68.7 91.3 73.3 92 78 C88.7 78.7 86 79 82 80 C78 81 72.7 83 68 84 C63.3 85 58.3 86.7 54 86 C49.7 85.3 45.3 83 42 80 C38.7 77 35.7 72 34 68 C32.3 64 31.7 60 32 56 C32.3 52 34 47.7 36 44Z" fill="#A87545" stroke="#4A2E16" stroke-width="3" stroke-linejoin="round"/>
    <path d="M48 36 C50 33.8 56 31.3 60 31 C64 30.7 68.3 31.5 72 34 C75.7 36.5 79.3 41.7 82 46 C84.7 50.3 86.3 54.7 88 60 C89.7 65.3 90.7 72 92 78 C87.3 76 82.3 74.7 78 72 C73.7 69.3 69.7 65.3 66 62 C62.3 58.7 59 55 56 52 C53 49 49.3 46.7 48 44 C46.7 41.3 46 38.2 48 36Z" fill="#6E4626"/>
    <path d="M48 36 C50 33.8 56 31.3 60 31 C64 30.7 68.3 31.5 72 34 C75.7 36.5 79.3 41.7 82 46 C80.7 46.7 77.3 50.3 74 50 C70.7 49.7 65.5 45.3 62 44 C58.5 42.7 55.3 43.3 53 42 C50.7 40.7 48.8 37 48 36Z" fill="#C29766"/>
    <path d="M48 36 C50 33.8 56 31.3 60 31 C64 30.7 68.3 31.5 72 34 C75.7 36.5 79.3 41.7 82 46 C84.7 50.3 86.3 54.7 88 60 C89.7 65.3 90.7 72 92 78 C87.3 76 82.3 74.7 78 72 C73.7 69.3 69.7 65.3 66 62 C62.3 58.7 59 55 56 52 C53 49 49.3 46.7 48 44 C46.7 41.3 46 38.2 48 36Z" fill="none" stroke="#3A2412" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M40.7 37.8 C40.1 37 39.4 36.2 38.8 35.5 C38.2 34.7 37.5 33.9 36.8 33.1 C36.2 32.3 35.5 31.5 34.7 30.7 C33.9 30 33.1 29.2 32.3 28.5 C31.5 27.8 30.7 27.1 29.8 26.5 C29 25.8 28.1 25.2 27.2 24.6 C26.3 24 25.2 23.4 24.5 22.9 C23.7 22.5 23.4 22.2 22.7 21.9 C22 21.7 20.9 21.4 20.1 21.6 C19.3 21.9 18.4 22.6 17.9 23.3 C17.5 24 17.4 25.1 17.6 25.9 C17.9 26.7 18.7 27.5 19.3 28.1 C19.8 28.6 20.3 28.6 21 29 C21.7 29.4 22.6 29.9 23.3 30.4 C24.1 30.9 24.8 31.5 25.6 32 C26.3 32.6 27 33.2 27.7 33.8 C28.4 34.4 29.1 35 29.7 35.6 C30.3 36.3 30.9 37 31.5 37.7 C32.2 38.4 32.8 39.2 33.4 39.9 C34 40.7 34.7 41.5 35.3 42.2 C37.1 40.7 38.9 39.3 40.7 37.8Z" fill="#EFC3B3" stroke="#A86A55" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M38 33.5 A4.6 4.6 0 0 1 46.4 35.5 A4.6 4.6 0 0 1 50.8 40.5 A4.6 4.6 0 0 1 49.3 46.3 A4.6 4.6 0 0 1 42.4 50 A4.6 4.6 0 0 1 33.6 50 A4.6 4.6 0 0 1 26.7 46.3 A4.6 4.6 0 0 1 25.2 40.5 A4.6 4.6 0 0 1 29.6 35.5 A4.6 4.6 0 0 1 38 33.5Z" fill="#F6EEDF" stroke="#A89878" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M12 24 C11.8 22.2 13.3 19.5 15 18 C16.7 16.5 19.8 15 22 15 C24.2 15 26.8 16.3 28 18 C29.2 19.7 29.7 23.2 29 25 C28.3 26.8 26.2 28.3 24 29 C21.8 29.7 18 29.8 16 29 C14 28.2 12.2 25.8 12 24Z" fill="#EFC3B3" stroke="#A86A55" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M15 19 C10 19 6.5 22 6.5 27 C6.5 30 7.5 32 9.5 33 C9.5 30 10.5 28 12.5 28 L16 28Z" fill="#5A5650" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="21" cy="21" r="2" fill="#11191B"/>`,
  wrobel: `
    <g fill="none" stroke="#B08A70" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M46 73 V85"/><path d="M55 74 V85"/></g>
    <path d="M64 58 L86 78 C88 80 86 84 83 83 L60 66Z" fill="#7A5634" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 32 C24.8 29.2 26 26 28 24 C30 22 33.2 20.3 36 20 C38.8 19.7 42.5 20.5 45 22 C47.5 23.5 48.5 26.7 51 29 C53.5 31.3 57 33.2 60 36 C63 38.8 66.7 42.5 69 46 C71.3 49.5 73.5 53.8 74 57 C74.5 60.2 73.5 62.7 72 65 C70.5 67.3 68 69.3 65 71 C62 72.7 57.8 74.5 54 75 C50.2 75.5 45.5 75.3 42 74 C38.5 72.7 35.5 69.7 33 67 C30.5 64.3 28.5 61 27 58 C25.5 55 24.7 51.8 24 49 C23.3 46.2 23 43.8 23 41 C23 38.2 23.2 34.8 24 32Z" fill="#A06C3C"/>
    <path d="M72 65 C70.5 67.3 68 69.3 65 71 C62 72.7 57.8 74.5 54 75 C50.2 75.5 45.5 75.3 42 74 C38.5 72.7 35.5 69.7 33 67 C30.5 64.3 28.5 61 27 58 C25.5 55 24.7 51.8 24 49 C25.7 50.2 30.3 55.2 34 56 C37.7 56.8 42.3 54 46 54 C49.7 54 53 54.7 56 56 C59 57.3 61.3 60.5 64 62 C66.7 63.5 70.7 64.5 72 65Z" fill="#CFCFC8"/>
    <path d="M29 37 C30.3 35.8 34.3 35 37 35 C39.7 35 43.3 35.7 45 37 C46.7 38.3 47.7 41.3 47 43 C46.3 44.7 43.3 46.5 41 47 C38.7 47.5 35 46.8 33 46 C31 45.2 29.7 43.5 29 42 C28.3 40.5 27.7 38.2 29 37Z" fill="#ECEAE2"/>
    <path d="M27 58 C25.5 55 24.7 51.8 24 49 C23.3 46.2 23 43.8 23 41 C24.2 41.2 28.3 40.5 30 42 C31.7 43.5 33.5 47.3 33 50 C32.5 52.7 28 56.7 27 58Z" fill="#1F2224"/>
    <path d="M24 32 C24.8 29.2 26 26 28 24 C30 22 33.2 20.3 36 20 C38.8 19.7 42.5 20.5 45 22 C44.2 22.8 42 25.8 40 27 C38 28.2 35.2 28.3 33 29 C30.8 29.7 28.5 30.5 27 31 C25.5 31.5 24.5 31.8 24 32Z" fill="#8E959A"/>
    <path d="M24 34 L31 33" fill="none" stroke="#1F2224" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M46 38 C47.8 37 52.7 36.5 56 38 C59.3 39.5 63.2 43.7 66 47 C68.8 50.3 71 54.2 73 58 C75 61.8 76.3 66 78 70 C74 69 69.7 68.7 66 67 C62.3 65.3 58.8 62.7 56 60 C53.2 57.3 50.8 53.7 49 51 C47.2 48.3 45.5 46.2 45 44 C44.5 41.8 44.2 39 46 38Z" fill="#9A6A3E" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <g fill="none" stroke="#3A2A1E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M52 44 L60 48"/><path d="M55 52 L66 58"/><path d="M60 60 L72 66"/><path d="M53 32 L58 36"/><path d="M47 30 L51 34"/></g>
    <path d="M48 47 C49.2 46 55.2 44.8 57 45 C58.8 45.2 60.2 47 59 48 C57.8 49 51.8 51.2 50 51 C48.2 50.8 46.8 48 48 47Z" fill="#FFFFFF"/>
    <path d="M24 32 C24.8 29.2 26 26 28 24 C30 22 33.2 20.3 36 20 C38.8 19.7 42.5 20.5 45 22 C47.5 23.5 48.5 26.7 51 29 C53.5 31.3 57 33.2 60 36 C63 38.8 66.7 42.5 69 46 C71.3 49.5 73.5 53.8 74 57 C74.5 60.2 73.5 62.7 72 65 C70.5 67.3 68 69.3 65 71 C62 72.7 57.8 74.5 54 75 C50.2 75.5 45.5 75.3 42 74 C38.5 72.7 35.5 69.7 33 67 C30.5 64.3 28.5 61 27 58 C25.5 55 24.7 51.8 24 49 C23.3 46.2 23 43.8 23 41 C23 38.2 23.2 34.8 24 32Z" fill="none" stroke="#11191B" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 32 L13 37 L23 41Z" fill="#2A2A2A" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="32" cy="33" r="2.4" fill="#11191B"/><circle cx="32.8" cy="32.2" r="0.9" fill="#FFFFFF"/>
    <path d="M6 86 C30 82 62 82 94 84 L94 90 C62 88 30 88 6 92Z" fill="#8A5A32" stroke="#4A2E16" stroke-width="3" stroke-linejoin="round"/>`,
  'rusalka-pokrzywnik': `
    <g><path d="M53 44 C56 44.7 58.8 45.2 62 46 C65.2 46.8 68.8 48 72 49 C75.2 50 78.7 50.5 81 52 C83.3 53.5 85.3 55.8 86 58 C86.7 60.2 85.8 62.7 85 65 C84.2 67.3 82.5 69.7 81 72 C79.5 74.3 78.2 77 76 79 C73.8 81 70.7 83.5 68 84 C65.3 84.5 62.2 83.7 60 82 C57.8 80.3 56.2 77.7 55 74 C53.8 70.3 53.3 65 53 60 C52.7 55 53 49.3 53 44Z" fill="#F08A1C" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 82 C57.8 80.3 56.2 77.7 55 74 C53.8 70.3 53.3 65 53 60 C52.7 55 53 49.3 53 44 C56 44.7 58.8 45.2 62 46 C65.2 46.8 68.8 48 72 49 C71.7 50.5 71.3 54.5 70 58 C68.7 61.5 65.7 66 64 70 C62.3 74 60.7 80 60 82Z" fill="#3A2A22"/><path d="M81 52 C83.3 53.5 85.3 55.8 86 58 C86.7 60.2 85.8 62.7 85 65 C84.2 67.3 82.5 69.7 81 72 C79.5 74.3 78.2 77 76 79 C73.8 81 70.7 83.5 68 84 C65.3 84.5 62.2 83.7 60 82 C60.7 81.2 62 78.2 64 77 C66 75.8 69.8 76.3 72 75 C74.2 73.7 75.7 71.2 77 69 C78.3 66.8 79.7 64.2 80 62 C80.3 59.8 78.8 57.7 79 56 C79.2 54.3 80.7 52.7 81 52Z" fill="#2A2420"/><g fill="#3B7DD8"><circle cx="83" cy="59" r="1.9"/><circle cx="82" cy="66" r="1.9"/><circle cx="78" cy="73" r="1.9"/><circle cx="72" cy="79" r="1.9"/><circle cx="65" cy="81" r="1.9"/></g><path d="M53 44 C56 44.7 58.8 45.2 62 46 C65.2 46.8 68.8 48 72 49 C75.2 50 78.7 50.5 81 52 C83.3 53.5 85.3 55.8 86 58 C86.7 60.2 85.8 62.7 85 65 C84.2 67.3 82.5 69.7 81 72 C79.5 74.3 78.2 77 76 79 C73.8 81 70.7 83.5 68 84 C65.3 84.5 62.2 83.7 60 82 C57.8 80.3 56.2 77.7 55 74 C53.8 70.3 53.3 65 53 60 C52.7 55 53 49.3 53 44Z" fill="none" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/><path d="M53 36 C54.3 33.7 55.3 31.2 57 29 C58.7 26.8 61 24.8 63 23 C65 21.2 66.8 19.5 69 18 C71.2 16.5 73.7 15 76 14 C78.3 13 80.7 12.2 83 12 C85.3 11.8 87.7 12.7 90 13 C90.7 15.3 92.2 17.7 92 20 C91.8 22.3 89.3 24.7 89 27 C88.7 29.3 90.5 31.5 90 34 C89.5 36.5 87.2 39.7 86 42 C84.8 44.3 84 46 83 48 C80 48.3 77.2 49 74 49 C70.8 49 67 48.7 64 48 C61 47.3 57.8 47 56 45 C54.2 43 54 39 53 36Z" fill="#F08A1C" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/><path d="M56 45 C54.2 43 54 39 53 36 C54.3 33.7 55.3 31.2 57 29 C57.5 30.5 60.2 35.3 60 38 C59.8 40.7 56.7 43.8 56 45Z" fill="#3A2A22"/><path d="M57 29 C58.7 26.8 61 24.8 63 23 C65 21.2 66.8 19.5 69 18 C71.2 16.5 73.7 15 76 14 C78.3 13 80.7 12.2 83 12 C85.3 11.8 87.7 12.7 90 13 C90.7 15.3 92.2 17.7 92 20 C91.8 22.3 89.3 24.7 89 27 C88.7 29.3 90.5 31.5 90 34 C89.5 36.5 87.2 39.7 86 42 C84.8 44.3 84 46 83 48 C82.3 46 80.8 44.3 81 42 C81.2 39.7 83.7 36.5 84 34 C84.3 31.5 82.7 29.5 83 27 C83.3 24.5 86.5 20 86 19 C85.5 18 82 20.2 80 21 C78 21.8 76 22.7 74 24 C72 25.3 70 27.2 68 29 C66 30.8 63.8 35 62 35 C60.2 35 57.8 30 57 29Z" fill="#1E1A18"/><path d="M63 23 C65 21.2 66.8 19.5 69 18 C69.8 19 74.2 22.2 74 24 C73.8 25.8 69.8 29.2 68 29 C66.2 28.8 63.8 24 63 23Z" fill="#F6D24A"/><path d="M76 14 C78.3 13 80.7 12.2 83 12 C83.5 13.2 86.5 17.5 86 19 C85.5 20.5 81.7 21.8 80 21 C78.3 20.2 76.7 15.2 76 14Z" fill="#F6D24A"/><circle cx="86" cy="15.5" r="1.5" fill="#FFFFFF"/><g fill="#3B7DD8"><circle cx="88" cy="22" r="1.8"/><circle cx="87" cy="29" r="1.8"/><circle cx="86.5" cy="36" r="1.8"/><circle cx="84" cy="43" r="1.8"/></g><g fill="#1E1A18"><circle cx="72" cy="34" r="2.6"/><circle cx="78" cy="30" r="2.2"/><circle cx="66" cy="42" r="3.4"/></g><path d="M53 36 C54.3 33.7 55.3 31.2 57 29 C58.7 26.8 61 24.8 63 23 C65 21.2 66.8 19.5 69 18 C71.2 16.5 73.7 15 76 14 C78.3 13 80.7 12.2 83 12 C85.3 11.8 87.7 12.7 90 13 C90.7 15.3 92.2 17.7 92 20 C91.8 22.3 89.3 24.7 89 27 C88.7 29.3 90.5 31.5 90 34 C89.5 36.5 87.2 39.7 86 42 C84.8 44.3 84 46 83 48 C80 48.3 77.2 49 74 49 C70.8 49 67 48.7 64 48 C61 47.3 57.8 47 56 45 C54.2 43 54 39 53 36Z" fill="none" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/></g>
    <g transform="translate(100 0) scale(-1 1)"><path d="M53 44 C56 44.7 58.8 45.2 62 46 C65.2 46.8 68.8 48 72 49 C75.2 50 78.7 50.5 81 52 C83.3 53.5 85.3 55.8 86 58 C86.7 60.2 85.8 62.7 85 65 C84.2 67.3 82.5 69.7 81 72 C79.5 74.3 78.2 77 76 79 C73.8 81 70.7 83.5 68 84 C65.3 84.5 62.2 83.7 60 82 C57.8 80.3 56.2 77.7 55 74 C53.8 70.3 53.3 65 53 60 C52.7 55 53 49.3 53 44Z" fill="#F08A1C" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 82 C57.8 80.3 56.2 77.7 55 74 C53.8 70.3 53.3 65 53 60 C52.7 55 53 49.3 53 44 C56 44.7 58.8 45.2 62 46 C65.2 46.8 68.8 48 72 49 C71.7 50.5 71.3 54.5 70 58 C68.7 61.5 65.7 66 64 70 C62.3 74 60.7 80 60 82Z" fill="#3A2A22"/><path d="M81 52 C83.3 53.5 85.3 55.8 86 58 C86.7 60.2 85.8 62.7 85 65 C84.2 67.3 82.5 69.7 81 72 C79.5 74.3 78.2 77 76 79 C73.8 81 70.7 83.5 68 84 C65.3 84.5 62.2 83.7 60 82 C60.7 81.2 62 78.2 64 77 C66 75.8 69.8 76.3 72 75 C74.2 73.7 75.7 71.2 77 69 C78.3 66.8 79.7 64.2 80 62 C80.3 59.8 78.8 57.7 79 56 C79.2 54.3 80.7 52.7 81 52Z" fill="#2A2420"/><g fill="#3B7DD8"><circle cx="83" cy="59" r="1.9"/><circle cx="82" cy="66" r="1.9"/><circle cx="78" cy="73" r="1.9"/><circle cx="72" cy="79" r="1.9"/><circle cx="65" cy="81" r="1.9"/></g><path d="M53 44 C56 44.7 58.8 45.2 62 46 C65.2 46.8 68.8 48 72 49 C75.2 50 78.7 50.5 81 52 C83.3 53.5 85.3 55.8 86 58 C86.7 60.2 85.8 62.7 85 65 C84.2 67.3 82.5 69.7 81 72 C79.5 74.3 78.2 77 76 79 C73.8 81 70.7 83.5 68 84 C65.3 84.5 62.2 83.7 60 82 C57.8 80.3 56.2 77.7 55 74 C53.8 70.3 53.3 65 53 60 C52.7 55 53 49.3 53 44Z" fill="none" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/><path d="M53 36 C54.3 33.7 55.3 31.2 57 29 C58.7 26.8 61 24.8 63 23 C65 21.2 66.8 19.5 69 18 C71.2 16.5 73.7 15 76 14 C78.3 13 80.7 12.2 83 12 C85.3 11.8 87.7 12.7 90 13 C90.7 15.3 92.2 17.7 92 20 C91.8 22.3 89.3 24.7 89 27 C88.7 29.3 90.5 31.5 90 34 C89.5 36.5 87.2 39.7 86 42 C84.8 44.3 84 46 83 48 C80 48.3 77.2 49 74 49 C70.8 49 67 48.7 64 48 C61 47.3 57.8 47 56 45 C54.2 43 54 39 53 36Z" fill="#F08A1C" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/><path d="M56 45 C54.2 43 54 39 53 36 C54.3 33.7 55.3 31.2 57 29 C57.5 30.5 60.2 35.3 60 38 C59.8 40.7 56.7 43.8 56 45Z" fill="#3A2A22"/><path d="M57 29 C58.7 26.8 61 24.8 63 23 C65 21.2 66.8 19.5 69 18 C71.2 16.5 73.7 15 76 14 C78.3 13 80.7 12.2 83 12 C85.3 11.8 87.7 12.7 90 13 C90.7 15.3 92.2 17.7 92 20 C91.8 22.3 89.3 24.7 89 27 C88.7 29.3 90.5 31.5 90 34 C89.5 36.5 87.2 39.7 86 42 C84.8 44.3 84 46 83 48 C82.3 46 80.8 44.3 81 42 C81.2 39.7 83.7 36.5 84 34 C84.3 31.5 82.7 29.5 83 27 C83.3 24.5 86.5 20 86 19 C85.5 18 82 20.2 80 21 C78 21.8 76 22.7 74 24 C72 25.3 70 27.2 68 29 C66 30.8 63.8 35 62 35 C60.2 35 57.8 30 57 29Z" fill="#1E1A18"/><path d="M63 23 C65 21.2 66.8 19.5 69 18 C69.8 19 74.2 22.2 74 24 C73.8 25.8 69.8 29.2 68 29 C66.2 28.8 63.8 24 63 23Z" fill="#F6D24A"/><path d="M76 14 C78.3 13 80.7 12.2 83 12 C83.5 13.2 86.5 17.5 86 19 C85.5 20.5 81.7 21.8 80 21 C78.3 20.2 76.7 15.2 76 14Z" fill="#F6D24A"/><circle cx="86" cy="15.5" r="1.5" fill="#FFFFFF"/><g fill="#3B7DD8"><circle cx="88" cy="22" r="1.8"/><circle cx="87" cy="29" r="1.8"/><circle cx="86.5" cy="36" r="1.8"/><circle cx="84" cy="43" r="1.8"/></g><g fill="#1E1A18"><circle cx="72" cy="34" r="2.6"/><circle cx="78" cy="30" r="2.2"/><circle cx="66" cy="42" r="3.4"/></g><path d="M53 36 C54.3 33.7 55.3 31.2 57 29 C58.7 26.8 61 24.8 63 23 C65 21.2 66.8 19.5 69 18 C71.2 16.5 73.7 15 76 14 C78.3 13 80.7 12.2 83 12 C85.3 11.8 87.7 12.7 90 13 C90.7 15.3 92.2 17.7 92 20 C91.8 22.3 89.3 24.7 89 27 C88.7 29.3 90.5 31.5 90 34 C89.5 36.5 87.2 39.7 86 42 C84.8 44.3 84 46 83 48 C80 48.3 77.2 49 74 49 C70.8 49 67 48.7 64 48 C61 47.3 57.8 47 56 45 C54.2 43 54 39 53 36Z" fill="none" stroke="#5A2A0A" stroke-width="2.5" stroke-linejoin="round"/></g>
    <g fill="none" stroke="#11191B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M48 31 L40 12"/><path d="M52 31 L60 12"/></g>
    <g fill="#11191B"><circle cx="40" cy="11" r="2.2"/><circle cx="60" cy="11" r="2.2"/></g>
    <g fill="#4A3426" stroke="#11191B" stroke-width="2" stroke-linejoin="round"><ellipse cx="50" cy="64" rx="3.4" ry="13"/><ellipse cx="50" cy="45" rx="4.4" ry="10"/><circle cx="50" cy="33" r="4"/></g>`,
  'pszczola-miodna': `
    <g fill="none" stroke="#3A2E28" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M57 40 L67 46 L71 54"/><path d="M57 43 L69 55 L73 65"/><path d="M56 46 L67 63 L71 76"/><path d="M47 16 L44 9 L38 6"/></g>
    <g transform="translate(100 0) scale(-1 1)"><g fill="none" stroke="#3A2E28" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M57 40 L67 46 L71 54"/><path d="M57 43 L69 55 L73 65"/><path d="M56 46 L67 63 L71 76"/><path d="M47 16 L44 9 L38 6"/></g></g>
    <ellipse cx="50" cy="62" rx="14" ry="21" fill="#E3A63A"/>
    <g fill="#2A2420"><path d="M37.7 52 A14 21 0 0 0 36.3 58 Q50 62 63.7 58 A14 21 0 0 0 62.3 52 Q50 56 37.7 52Z"/><path d="M36.1 64 A14 21 0 0 0 37.1 70 Q50 74 62.9 70 A14 21 0 0 0 63.9 64 Q50 68 36.1 64Z"/><path d="M39 75 A14 21 0 0 0 61 75 Q50 79 39 75Z"/></g>
    <ellipse cx="50" cy="62" rx="14" ry="21" fill="none" stroke="#4A3010" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="50" cy="37" rx="10" ry="9" fill="#B57B35" stroke="#4A3010" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#DDEFF8" stroke="#5F8FAE" stroke-width="2" stroke-linejoin="round" fill-opacity="0.75"><ellipse cx="71" cy="24" rx="19" ry="8.5" transform="rotate(-32 71 24)"/><ellipse cx="72" cy="36" rx="13" ry="6" transform="rotate(-14 72 36)"/></g>
    <g transform="translate(100 0) scale(-1 1)"><g fill="#DDEFF8" stroke="#5F8FAE" stroke-width="2" stroke-linejoin="round" fill-opacity="0.75"><ellipse cx="71" cy="24" rx="19" ry="8.5" transform="rotate(-32 71 24)"/><ellipse cx="72" cy="36" rx="13" ry="6" transform="rotate(-14 72 36)"/></g></g>
    <ellipse cx="50" cy="22" rx="8.5" ry="7.5" fill="#3A2E28" stroke="#11191B" stroke-width="2.5" stroke-linejoin="round"/>`,
  pajak: `
    <g fill="none" stroke="#3A2412" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M43 34 L30 20 L24 8"/><path d="M41 38 L24 30 L10 28"/><path d="M41 43 L24 47 L10 57"/><path d="M43 47 L30 61 L24 79"/></g>
    <g transform="translate(100 0) scale(-1 1)"><g fill="none" stroke="#3A2412" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M43 34 L30 20 L24 8"/><path d="M41 38 L24 30 L10 28"/><path d="M41 43 L24 47 L10 57"/><path d="M43 47 L30 61 L24 79"/></g></g>
    <ellipse cx="50" cy="67" rx="15" ry="19" fill="#8A5A32" stroke="#2E1A0C" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#F2E6D0"><circle cx="50" cy="57" r="2.2"/><circle cx="50" cy="64" r="2.2"/><circle cx="50" cy="71" r="2.2"/><circle cx="44" cy="63" r="2.2"/><circle cx="56" cy="63" r="2.2"/></g>
    <ellipse cx="50" cy="40" rx="10" ry="11" fill="#6B4423" stroke="#2E1A0C" stroke-width="3" stroke-linejoin="round"/>`,
  zaba: `
    <g><ellipse cx="25" cy="72" rx="16" ry="11" transform="rotate(-25 25 72)" fill="#4E9A3C" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/><path d="M10 86 C11.7 84.7 18 82 22 82 C26 82 32.7 84.7 34 86 C35.3 87.3 33.7 89.3 30 90 C26.3 90.7 15.3 90.7 12 90 C8.7 89.3 8.3 87.3 10 86Z" fill="#4E9A3C" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/></g>
    <g transform="translate(100 0) scale(-1 1)"><ellipse cx="25" cy="72" rx="16" ry="11" transform="rotate(-25 25 72)" fill="#4E9A3C" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/><path d="M10 86 C11.7 84.7 18 82 22 82 C26 82 32.7 84.7 34 86 C35.3 87.3 33.7 89.3 30 90 C26.3 90.7 15.3 90.7 12 90 C8.7 89.3 8.3 87.3 10 86Z" fill="#4E9A3C" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/></g>
    <g fill="#5DAA45" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"><circle cx="36" cy="30" r="10"/><circle cx="64" cy="30" r="10"/></g>
    <path d="M50 30 C54.7 30 59.8 30 64 32 C68.2 34 72.7 37.7 75 42 C77.3 46.3 78.3 52.7 78 58 C77.7 63.3 75.7 70 73 74 C70.3 78 65.8 80.3 62 82 C58.2 83.7 54 84 50 84 C46 84 41.8 83.7 38 82 C34.2 80.3 29.7 78 27 74 C24.3 70 22.3 63.3 22 58 C21.7 52.7 22.7 46.3 25 42 C27.3 37.7 31.8 34 36 32 C40.2 30 45.3 30 50 30Z" fill="#5DAA45" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="50" cy="68" rx="16" ry="13" fill="#D5EBA8"/>
    <g><path d="M34 62 C32.7 63.3 31.7 68.7 31 72 C30.3 75.3 29.7 79.7 30 82 C30.3 84.3 31.7 85.3 33 86 C34.3 86.7 37 87 38 86 C39 85 39 82.7 39 80 C39 77.3 38 72.7 38 70 C38 67.3 39.7 65.3 39 64 C38.3 62.7 35.3 60.7 34 62Z" fill="#5DAA45" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/></g>
    <g transform="translate(100 0) scale(-1 1)"><path d="M34 62 C32.7 63.3 31.7 68.7 31 72 C30.3 75.3 29.7 79.7 30 82 C30.3 84.3 31.7 85.3 33 86 C34.3 86.7 37 87 38 86 C39 85 39 82.7 39 80 C39 77.3 38 72.7 38 70 C38 67.3 39.7 65.3 39 64 C38.3 62.7 35.3 60.7 34 62Z" fill="#5DAA45" stroke="#2E6B2A" stroke-width="3" stroke-linejoin="round"/></g>
    <g fill="#F2C94C" stroke="#7A5A0C" stroke-width="2" stroke-linejoin="round"><circle cx="36" cy="29" r="6.5"/><circle cx="64" cy="29" r="6.5"/></g>
    <g fill="#11191B"><ellipse cx="36" cy="29" rx="3.6" ry="2"/><ellipse cx="64" cy="29" rx="3.6" ry="2"/><circle cx="46" cy="41" r="1.2"/><circle cx="54" cy="41" r="1.2"/></g>
    <path d="M30 48 C40 56 60 56 70 48" fill="none" stroke="#2E6B2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  waz: `
    <path d="M50 92.7 C51.8 93 53.7 93.6 55.5 93.6 C57.3 93.7 59.1 93.3 60.9 92.9 C62.7 92.5 64.5 92.1 66.3 91.5 C68.1 90.9 69.8 90.2 71.5 89.4 C73.2 88.6 74.9 87.6 76.4 86.5 C78 85.4 79.5 84.1 80.9 82.6 C82.2 81.2 83.5 79.5 84.4 77.6 C85.3 75.7 85.9 73.6 86.2 71.5 C86.4 69.4 86.2 67 85.7 65 C85.1 62.9 84.1 60.9 82.9 59.1 C81.8 57.4 80.3 55.8 78.8 54.5 C77.3 53.1 75.6 51.9 73.9 50.9 C72.2 49.9 70.3 49 68.5 48.3 C66.7 47.6 64.8 47 62.9 46.6 C61 46.1 59 45.8 57.1 45.6 C55.1 45.3 53.2 45.3 51.2 45.3 C49.3 45.3 47.3 45.5 45.3 45.8 C43.3 46.1 41.4 46.5 39.4 47.1 C37.5 47.7 35.5 48.4 33.7 49.4 C31.8 50.4 29.8 51.5 28.2 53.1 C26.5 54.6 24.7 56.4 23.7 58.7 C22.6 60.9 21.7 63.9 21.8 66.5 C21.8 69.1 22.8 72.1 24.1 74.3 C25.3 76.5 27.2 78.4 29.1 79.8 C30.9 81.3 33 82.3 35.1 83.2 C37.1 84 39.3 84.5 41.4 84.8 C43.5 85.2 45.7 85.3 47.9 85.2 C50 85.1 52.2 84.8 54.3 84.2 C56.5 83.6 58.7 82.9 60.8 81.5 C62.8 80.1 65.5 78.2 66.6 75.7 C67.7 73.2 67.6 68.9 67.4 66.5 C67.2 64.1 66 62.8 65.4 61.1 C64.8 59.5 64.3 58.1 63.9 56.6 C63.5 55 63.3 53.5 62.9 51.7 C62.5 49.9 62.2 47.8 61.6 45.9 C60.9 44 60 41.9 59 40.1 C58.1 38.3 57 36.7 55.8 35 C54.6 33.4 53.1 31.8 51.7 30.4 C50.2 29 48.3 27.6 47.2 26.7 C46.1 25.8 46.1 25.5 45.1 25.1 C44.1 24.6 42.6 23.9 41.4 24 C40.3 24.2 38.8 25 38.1 25.9 C37.4 26.8 36.9 28.4 37 29.6 C37.2 30.7 38.2 32.1 38.9 32.9 C39.5 33.8 40 33.8 40.9 34.6 C41.9 35.4 43.5 36.7 44.6 37.7 C45.7 38.8 46.6 39.9 47.4 41.1 C48.3 42.3 49.1 43.7 49.8 45 C50.5 46.3 51 47.6 51.4 49 C51.9 50.4 52 51.9 52.4 53.6 C52.7 55.3 52.9 57.3 53.3 59.1 C53.8 61 54.4 63 55 64.7 C55.5 66.4 56.3 68.4 56.6 69.3 C56.9 70.3 56.9 69.9 56.7 70.3 C56.4 70.7 55.7 71.3 54.8 71.8 C54 72.2 52.7 72.8 51.5 73 C50.2 73.3 48.8 73.5 47.5 73.5 C46.1 73.5 44.7 73.4 43.3 73.2 C42 72.9 40.6 72.6 39.4 72.1 C38.3 71.6 37.1 71 36.2 70.3 C35.2 69.7 34.4 69 33.9 68.2 C33.4 67.5 33.1 66.8 33 66 C32.9 65.2 33.1 64.5 33.5 63.6 C33.9 62.8 34.6 61.8 35.4 60.9 C36.3 60.1 37.4 59.2 38.6 58.5 C39.8 57.8 41.2 57.1 42.6 56.6 C44 56.1 45.5 55.7 47 55.4 C48.5 55 50.1 54.8 51.6 54.7 C53.2 54.6 54.8 54.6 56.4 54.6 C57.9 54.7 59.5 54.9 61.1 55.1 C62.6 55.4 64.2 55.8 65.7 56.2 C67.1 56.7 68.6 57.3 70 58 C71.3 58.7 72.7 59.5 73.8 60.4 C75 61.3 76.1 62.3 76.9 63.4 C77.8 64.5 78.6 65.7 79 67 C79.4 68.3 79.6 69.6 79.6 71 C79.6 72.3 79.3 73.8 78.7 75.1 C78.2 76.4 77.4 77.7 76.5 78.9 C75.6 80.1 74.4 81.3 73.2 82.3 C72 83.4 70.6 84.3 69.2 85.2 C67.8 86 66.3 86.8 64.8 87.5 C63.2 88.1 61.6 88.8 60 89.3 C58.4 89.8 56.7 90 55 90.6 C53.4 91.2 51.7 92 50 92.7Z" fill="#6F7F4F" stroke="#33401F" stroke-width="3" stroke-linejoin="round"/>
    <path d="M67.4 66.5 C67.2 64.1 66 62.8 65.4 61.1 C64.8 59.5 64.3 58.1 63.9 56.6 C63.5 55 63.3 53.5 62.9 51.7 C62.5 49.9 62.2 47.8 61.6 45.9 C60.9 44 60 41.9 59 40.1 C58.1 38.3 57 36.7 55.8 35 C54.6 33.4 53.1 31.8 51.7 30.4 C50.2 29 48.3 27.6 47.2 26.7 C46.1 25.8 46.1 25.5 45.1 25.1 C44.1 24.6 42.6 23.9 41.4 24 C40.3 24.2 38.8 25 38.1 25.9 C37.4 26.8 36.9 28.4 37 29.6 C37.2 30.7 38.2 32.1 38.9 32.9 C39.5 33.8 40 33.8 40.9 34.6 C41.9 35.4 43.5 36.7 44.6 37.7 C45.7 38.8 46.6 39.9 47.4 41.1 C48.3 42.3 49.1 43.7 49.8 45 C50.5 46.3 51 47.6 51.4 49 C51.9 50.4 52 51.9 52.4 53.6 C52.7 55.3 52.9 57.3 53.3 59.1 C53.8 61 54.4 63 55 64.7 C55.5 66.4 56.3 68.4 56.6 69.3 C58.4 68.9 65.6 67 67.4 66.5Z" fill="#6F7F4F"/>
    <path d="M67.4 66.5 C67.2 64.1 66 62.8 65.4 61.1 C64.8 59.5 64.3 58.1 63.9 56.6 C63.5 55 63.3 53.5 62.9 51.7 C62.5 49.9 62.2 47.8 61.6 45.9 C60.9 44 60 41.9 59 40.1 C58.1 38.3 57 36.7 55.8 35 C54.6 33.4 53.1 31.8 51.7 30.4 C50.2 29 48.3 27.6 47.2 26.7 C46.1 25.8 46.1 25.5 45.1 25.1 C44.1 24.6 42.6 23.9 41.4 24 C40.3 24.2 38.8 25 38.1 25.9 C37.4 26.8 36.9 28.4 37 29.6 C37.2 30.7 38.2 32.1 38.9 32.9 C39.5 33.8 40 33.8 40.9 34.6 C41.9 35.4 43.5 36.7 44.6 37.7 C45.7 38.8 46.6 39.9 47.4 41.1 C48.3 42.3 49.1 43.7 49.8 45 C50.5 46.3 51 47.6 51.4 49 C51.9 50.4 52 51.9 52.4 53.6 C52.7 55.3 52.9 57.3 53.3 59.1 C53.8 61 54.4 63 55 64.7 C55.5 66.4 56.3 68.4 56.6 69.3" fill="none" stroke="#33401F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 27 C14 25.2 15.2 22.7 17 21 C18.8 19.3 22 17.5 25 17 C28 16.5 32.2 17 35 18 C37.8 19 40.8 21.2 42 23 C43.2 24.8 43.2 27.3 42 29 C40.8 30.7 38 32.2 35 33 C32 33.8 27 34.2 24 34 C21 33.8 18.7 33.2 17 32 C15.3 30.8 14 28.8 14 27Z" fill="#6F7F4F" stroke="#33401F" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50.8 30.8 C52.4 33.4 55.3 36.8 55.4 38.5 C55.6 40.3 53.3 41.5 51.7 41.2 C50.1 40.9 47.8 38.2 45.9 36.7 C47.3 36.4 49.4 36.7 50.2 35.7 C51 34.7 50.6 32.4 50.8 30.8Z" fill="#11191B"/>
    <path d="M48.8 29.1 C50.5 31.6 53.7 34.7 53.9 36.4 C54.1 38.1 51.8 39.4 50.1 39.1 C48.5 38.9 46 36.4 43.9 35 C45.4 34.6 47.5 34.9 48.3 33.9 C49.1 32.9 48.7 30.7 48.8 29.1Z" fill="#F5D23A"/>
    <circle cx="24" cy="23.5" r="3" fill="#E8C24A"/><circle cx="24" cy="23.5" r="1.6" fill="#11191B"/>
    <path d="M15 28 L10 29 M10 29 L6.5 26.5 M10 29 L6.5 31.5" fill="none" stroke="#11191B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  kleszcz: `
    <g fill="none" stroke="#3E1A0C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M39 39 L28 29 L24 17"/><path d="M36 44 L22 39 L10 37"/><path d="M35 50 L21 53 L10 61"/><path d="M37 55 L26 65 L20 77"/></g>
    <g transform="translate(100 0) scale(-1 1)"><g fill="none" stroke="#3E1A0C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M39 39 L28 29 L24 17"/><path d="M36 44 L22 39 L10 37"/><path d="M35 50 L21 53 L10 61"/><path d="M37 55 L26 65 L20 77"/></g></g>
    <path d="M45 36 L45 27 C46 23 54 23 55 27 L55 36Z" fill="#3E1E12" stroke="#2A1208" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M50 34 C54 34 58.7 35 62 37 C65.3 39 68.2 42.5 70 46 C71.8 49.5 72.8 53.7 73 58 C73.2 62.3 72.7 67.8 71 72 C69.3 76.2 66.5 80.5 63 83 C59.5 85.5 54.3 87 50 87 C45.7 87 40.5 85.5 37 83 C33.5 80.5 30.7 76.2 29 72 C27.3 67.8 26.8 62.3 27 58 C27.2 53.7 28.2 49.5 30 46 C31.8 42.5 34.7 39 38 37 C41.3 35 46 34 50 34Z" fill="#8E4426" stroke="#3E1A0C" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 35 C53 35 56.8 35.5 59 37 C61.2 38.5 62.8 41.5 63 44 C63.2 46.5 62.2 50.2 60 52 C57.8 53.8 53.3 55 50 55 C46.7 55 42.2 53.8 40 52 C37.8 50.2 36.8 46.5 37 44 C37.2 41.5 38.8 38.5 41 37 C43.2 35.5 47 35 50 35Z" fill="#3E1E12"/>`,
  wesz: `
    <g fill="none" stroke="#8A7458" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M43 34 L33 31 L27 38"/><path d="M43 38 L31 42 L26 50"/><path d="M44 42 L34 51 L30 60"/></g><g fill="none" stroke="#4A3A28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 C24 38 23 41 25 43"/><path d="M26 50 C23 50 22 53 24 55"/><path d="M30 60 C27 60 26 63 28 65"/></g>
    <g transform="translate(100 0) scale(-1 1)"><g fill="none" stroke="#8A7458" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M43 34 L33 31 L27 38"/><path d="M43 38 L31 42 L26 50"/><path d="M44 42 L34 51 L30 60"/></g><g fill="none" stroke="#4A3A28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M27 38 C24 38 23 41 25 43"/><path d="M26 50 C23 50 22 53 24 55"/><path d="M30 60 C27 60 26 63 28 65"/></g></g>
    <g fill="none" stroke="#6A5640" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M44 17 L38 12 L36 7"/><path d="M56 17 L62 12 L64 7"/></g>
    <path d="M50 40 C53.3 40 57.3 40 60 41 C62.7 42 64.7 44 66 46 C67.3 48 67.8 50.7 68 53 C68.2 55.3 67 57.7 67 60 C67 62.3 68.3 64.7 68 67 C67.7 69.3 66.5 71.7 65 74 C63.5 76.3 61.5 79.3 59 81 C56.5 82.7 53 84 50 84 C47 84 43.5 82.7 41 81 C38.5 79.3 36.5 76.3 35 74 C33.5 71.7 32.3 69.3 32 67 C31.7 64.7 33 62.3 33 60 C33 57.7 31.8 55.3 32 53 C32.2 50.7 32.7 48 34 46 C35.3 44 37.3 42 40 41 C42.7 40 46.7 40 50 40Z" fill="#CDB89A" stroke="#6A5640" stroke-width="3" stroke-linejoin="round"/>
    <g fill="none" stroke="#A08A6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M37 50 Q50 53 63 50"/><path d="M36 57 Q50 60 64 57"/><path d="M36 64 Q50 67 64 64"/><path d="M37 71 Q50 74 63 71"/><path d="M40 78 Q50 80 60 78"/></g>
    <g fill="#8A7458"><circle cx="35" cy="53" r="2"/><circle cx="35" cy="60" r="2"/><circle cx="35" cy="67" r="2"/><circle cx="65" cy="53" r="2"/><circle cx="65" cy="60" r="2"/><circle cx="65" cy="67" r="2"/></g>
    <ellipse cx="50" cy="36" rx="9" ry="7" fill="#C2AC8C" stroke="#6A5640" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 12 C52 12 54.7 13.3 56 15 C57.3 16.7 58.2 19.7 58 22 C57.8 24.3 57.2 27.8 55 29 C52.8 30.2 47.2 30.2 45 29 C42.8 27.8 42.2 24.3 42 22 C41.8 19.7 42.7 16.7 44 15 C45.3 13.3 48 12 50 12Z" fill="#CDB89A" stroke="#6A5640" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#11191B"><circle cx="44.5" cy="23" r="1.6"/><circle cx="55.5" cy="23" r="1.6"/></g>`,
  pchla: `
    <g fill="none" stroke="#4A2208" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M33 63 L33 72 L29 80 L26 86"/><path d="M48 65 L51 75 L49 83 L48 89"/><path d="M66 62 L68 73 L80 78 L91 82"/></g>
    <path d="M19 56 C18.5 53.5 19.7 49.7 21 47 C22.3 44.3 24.5 42.2 27 40 C29.5 37.8 32.5 36.2 36 34 C39.5 31.8 43.8 29 48 27 C52.2 25 56.7 22.8 61 22 C65.3 21.2 70.2 20.8 74 22 C77.8 23.2 81.7 26 84 29 C86.3 32 87.8 36.3 88 40 C88.2 43.7 87 47.8 85 51 C83 54.2 79.8 56.8 76 59 C72.2 61.2 67 62.8 62 64 C57 65.2 50.8 65.8 46 66 C41.2 66.2 36.7 65.7 33 65 C29.3 64.3 26.3 63.5 24 62 C21.7 60.5 19.5 58.5 19 56Z" fill="#8A4A1E" stroke="#3E1E08" stroke-width="3" stroke-linejoin="round"/>
    <g fill="none" stroke="#5A2E10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M33 36 Q36 50 33 64"/><path d="M44 29 Q48 47 44 65"/><path d="M56 24 Q60 44 56 65"/><path d="M68 22 Q72 42 68 62"/><path d="M79 25 Q83 40 78 56"/></g>
    <path d="M47 32 C55 26 66 24 76 27" fill="none" stroke="#B8743F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="27" cy="50" r="2.3" fill="#11191B"/>
    <g fill="none" stroke="#3E1E08" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M28 62 L26 70 L20 76 L15 80"/><path d="M42 65 L41 74 L36 81 L32 87"/><path d="M56 79 L71 84 L84 90"/></g>
    <g fill="none" stroke="#B86E34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M28 62 L26 70 L20 76 L15 80"/><path d="M42 65 L41 74 L36 81 L32 87"/><path d="M56 79 L71 84 L84 90"/></g>
    <ellipse cx="58" cy="71" rx="5" ry="9" transform="rotate(15 58 71)" fill="#B86E34" stroke="#3E1E08" stroke-width="2.5" stroke-linejoin="round"/>`,
  'owsik-ludzki': `
    <circle cx="50" cy="50" r="44" fill="#F9DDE2" stroke="#D99AA8" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20.9 35.6 C22 35.3 24.6 34.5 26.2 33.8 C27.9 33.2 29.4 32 30.7 31.6 C32 31.2 32.9 30.9 34.2 31.2 C35.5 31.5 36.7 32.6 38.4 33.3 C40.1 34 42.5 35.2 44.6 35.2 C46.6 35.2 49 34 50.8 33.1 C52.6 32.1 54 30.5 55.2 29.4 C56.4 28.4 57.1 27.8 58 27 C56.9 27.5 56 27.9 54.6 28.5 C53.2 29.1 51.1 30.1 49.6 30.5 C48 30.8 46.6 31 45.2 30.7 C43.9 30.3 43 29 41.4 28.1 C39.8 27.2 37.9 25.7 35.8 25.4 C33.7 25 30.7 25.4 28.6 26 C26.5 26.5 24.8 27.6 23.2 28.6 C21.7 29.7 20 31.6 19.1 32.4 C18.3 33.2 18.4 33.1 18.3 33.5 C18.2 33.9 18.2 34.5 18.4 34.9 C18.6 35.2 19.1 35.6 19.5 35.7 C19.9 35.8 19.8 35.9 20.9 35.6Z" fill="#FFFDF7" stroke="#857868" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24.9 55.6 C26.3 55.1 29.7 53.7 31.8 52.9 C33.8 52.1 35.4 50.9 37.1 51 C38.8 51.1 39.9 52.8 42.2 53.7 C44.5 54.7 48.1 57.1 50.8 57 C53.5 56.8 56.2 53.9 58.4 52.6 C60.5 51.4 61.7 49.7 63.8 49.5 C65.8 49.2 68.6 50.5 70.4 51.1 C72.3 51.7 73.5 52.4 75 53 C73.7 52 72.8 51.2 71 50.1 C69.1 49 66.4 46.8 63.9 46.6 C61.4 46.4 58.1 48 55.9 48.8 C53.6 49.5 52 51 50.3 51 C48.6 51 47.7 49.7 45.5 48.8 C43.4 47.8 40.3 45.2 37.5 45 C34.8 44.8 31.4 46.4 29 47.6 C26.5 48.8 24.2 51.5 23.1 52.4 C22 53.4 22.4 53.1 22.3 53.5 C22.2 53.9 22.2 54.5 22.4 54.9 C22.7 55.3 23.1 55.6 23.5 55.7 C23.9 55.8 23.5 56 24.9 55.6Z" fill="#FFFDF7" stroke="#857868" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M35 76.5 C36.1 76.1 38.8 75 40.5 74.2 C42.1 73.4 43.6 72.1 45 71.6 C46.3 71.1 47 70.9 48.3 71.3 C49.6 71.7 50.8 73.2 52.6 74 C54.4 74.9 57.1 76.4 59.3 76.3 C61.5 76.2 63.8 74.7 65.6 73.6 C67.4 72.5 68.9 70.7 70.1 69.6 C71.4 68.5 72 67.9 73 67 C71.8 67.6 70.9 68 69.5 68.7 C68 69.4 65.9 70.5 64.3 71 C62.6 71.5 61 72 59.6 71.7 C58.3 71.4 57.5 70.1 56 69.1 C54.5 68.1 52.7 66.2 50.5 65.7 C48.2 65.2 44.9 65.5 42.6 66.1 C40.4 66.7 38.7 68 37.1 69.2 C35.5 70.5 33.8 72.6 33 73.5 C32.2 74.4 32.3 74.2 32.2 74.6 C32.2 75 32.3 75.6 32.5 76 C32.7 76.3 33.2 76.7 33.6 76.8 C34 76.8 33.8 76.9 35 76.5Z" fill="#FFFDF7" stroke="#857868" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M64.7 27.3 C65.6 27.1 67.7 26.6 69.1 26.2 C70.4 25.7 71.6 24.9 72.6 24.7 C73.6 24.5 74.2 24.6 75 25 C75.8 25.4 77 26.5 77.6 27.3 C78.3 28.2 78.8 29 78.9 30 C79.1 30.9 78.8 32.1 78.4 32.9 C78.1 33.6 77.6 34 76.9 34.4 C76.1 34.8 74.6 35 74 35.1 C73.4 35.3 73.5 35.2 73.4 35.4 C73.2 35.5 73.1 35.8 73.1 36 C73.1 36.2 73.2 36.5 73.4 36.6 C73.5 36.8 73.4 36.7 74 36.9 C74.6 37 75.6 37.7 77.1 37.5 C78.5 37.2 81.7 36.5 82.8 35.2 C84 33.8 84.1 31.3 83.9 29.5 C83.7 27.6 82.6 25.7 81.5 24.2 C80.4 22.7 79.2 21.4 77.5 20.7 C75.8 19.9 73.2 19.6 71.4 19.8 C69.6 20 68.1 20.9 66.8 21.7 C65.4 22.5 64 24 63.3 24.7 C62.6 25.3 62.7 25.2 62.6 25.5 C62.5 25.9 62.5 26.4 62.7 26.7 C62.8 27 63.2 27.3 63.5 27.4 C63.9 27.5 63.7 27.6 64.7 27.3Z" fill="#FFFDF7" stroke="#857868" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M12.9 63.1 C13.4 63.8 14.4 65.6 15.2 66.6 C15.9 67.6 17 68.4 17.3 69.1 C17.7 69.8 17.5 70 17.3 70.9 C17 71.9 15.5 73.4 15.6 75.1 C15.7 76.7 16.8 79.6 18 81 C19.2 82.3 21 83.3 22.7 83.3 C24.3 83.3 26.7 81.7 27.8 80.9 C29 80.2 29.2 79.2 29.6 78.7 C29.9 78.2 29.8 78.3 29.9 78.1 C29.9 77.9 29.8 77.6 29.7 77.4 C29.5 77.3 29.3 77.2 29.1 77.1 C28.9 77.1 29 77.1 28.4 77.3 C27.9 77.6 26.8 78.3 26 78.5 C25.2 78.7 24.5 78.6 23.7 78.4 C22.9 78.2 21.7 77.5 21.2 77.1 C20.6 76.7 20.4 76.8 20.5 76.1 C20.6 75.3 21.7 74.2 21.9 72.7 C22.2 71.1 22.3 68.3 21.7 66.7 C21.2 65.1 19.8 64 18.7 63 C17.6 62.1 15.8 61.4 15.1 60.9 C14.3 60.5 14.3 60.5 14 60.5 C13.6 60.5 13.2 60.7 12.9 60.9 C12.7 61.2 12.5 61.7 12.5 62 C12.5 62.4 12.5 62.3 12.9 63.1Z" fill="#FFFDF7" stroke="#857868" stroke-width="2.5" stroke-linejoin="round"/>`,
  'glista-ludzka': `
    <path d="M12 24 C14.7 23 17.5 22.1 20 21.1 C22.6 20.1 24.9 18.5 27.2 17.9 C29.6 17.2 31.8 17 34.1 17.2 C36.5 17.3 39.1 17.9 41.4 18.7 C43.7 19.4 46 20.4 47.9 21.6 C49.8 22.9 51.5 24.7 52.7 26.4 C54 28 55.2 29.9 55.3 31.5 C55.4 33 54.5 34.2 53.4 35.8 C52.2 37.4 50.2 39.6 48.4 40.9 C46.7 42.2 45.5 42.7 43.1 43.5 C40.7 44.4 37 44.2 34.2 46 C31.4 47.8 28 51.2 26.4 54.5 C24.9 57.7 24.3 62.1 24.9 65.5 C25.5 68.9 28 72.2 30 74.8 C32 77.4 34.4 79.4 37.1 81.1 C39.7 82.8 42.9 84.3 45.9 85.2 C48.9 86 52 86.3 55 86.4 C58 86.5 61 86.4 64 85.8 C66.9 85.2 70 84.1 72.7 82.8 C75.3 81.5 77.7 79.9 79.9 78.1 C82.2 76.3 84 74 86 72 C83.3 72.8 80.4 73.5 77.8 74.4 C75.2 75.3 72.8 76.7 70.4 77.5 C67.9 78.3 65.6 78.8 63.1 79 C60.7 79.2 58 79 55.5 78.7 C53.1 78.4 50.5 77.9 48.3 77.1 C46.1 76.3 44.1 75.2 42.3 73.8 C40.4 72.4 38.5 70.5 37.2 68.8 C35.9 67.1 34.7 65.4 34.4 63.7 C34.1 62 34.7 60.1 35.4 58.6 C36.1 57.2 36.8 55.9 38.5 55 C40.2 54.1 42.9 54.3 45.6 53.2 C48.4 52.1 52.3 50.4 54.9 48.4 C57.5 46.4 59.7 44.4 61.3 41.4 C62.9 38.4 64.8 33.8 64.6 30.4 C64.3 26.9 61.8 23.4 59.7 20.8 C57.7 18.1 55 16 52.3 14.5 C49.5 12.9 46.4 11.9 43.4 11.2 C40.4 10.5 37.3 10.1 34.3 10.3 C31.2 10.5 27.7 11.4 25 12.6 C22.2 13.8 19.9 15.7 17.7 17.6 C15.5 19.5 13.9 21.9 12 24Z" fill="#F5D7CF" stroke="#B4776A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M29 15.5 C30.3 15.5 34.2 15.1 36.8 15.4 C39.4 15.7 42.1 16.3 44.5 17.3 C46.9 18.2 49.3 19.4 51.3 21 C53.2 22.6 55.2 24.7 56.3 26.8 C57.4 28.8 58.3 31.1 57.9 33.3 C57.6 35.4 55.7 37.6 54.1 39.5 C52.5 41.4 50.6 43.4 48.4 44.7 C46.3 45.9 43.8 46.1 41.2 47 C38.6 48 34.9 48.6 32.7 50.5 C30.5 52.4 28.7 55.7 28 58.6 C27.4 61.5 27.8 65.3 28.8 68 C29.8 70.8 32.1 73.1 34.2 75.2 C36.2 77.2 38.6 79.1 41.1 80.5 C43.7 81.9 46.6 82.8 49.4 83.4 C52.3 84 55.2 84.2 58 84.2 C60.9 84.1 65.1 83.4 66.6 83.2" fill="none" stroke="#FFF3EF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  dzdzownica: `
    <path d="M13.6 33.9 C14.8 33.2 17.2 31.6 18.9 30.6 C20.6 29.5 22.3 28.6 23.9 27.6 C25.4 26.6 26.6 25.4 28.1 24.8 C29.5 24.2 30.9 23.5 32.4 23.7 C34 23.9 35.7 25.5 37.1 26 C38.6 26.6 40 26.6 41.1 27.1 C42.3 27.5 43 28.1 44.3 28.9 C45.5 29.6 47.6 30.3 48.8 31.4 C49.9 32.6 50.5 34.6 51 35.9 C51.4 37.2 51.7 38 51.4 39.2 C51.1 40.4 50.2 41.7 49.2 43.2 C48.3 44.7 46.7 46.4 45.7 48.4 C44.7 50.4 43.7 52.8 43 55 C42.3 57.1 41.7 59 41.3 61.3 C41 63.6 40.6 66.4 41.1 68.9 C41.6 71.4 42.9 74.1 44.2 76.2 C45.6 78.3 47.3 79.9 49 81.5 C50.8 83 52.8 84.4 54.9 85.5 C57 86.6 59.4 87.3 61.7 87.9 C63.9 88.4 66.1 88.7 68.3 88.8 C70.6 89 72.7 89.2 75.1 88.8 C77.5 88.4 80.5 87.6 82.7 86.5 C84.9 85.3 86.8 83.2 88.2 82 C89.6 80.8 90.3 80.3 91 79.3 C91.8 78.3 92.5 77.2 92.5 76.2 C92.5 75.1 92 73.7 91.3 73 C90.6 72.2 89.2 71.5 88.2 71.5 C87.1 71.5 86 72 85 72.7 C83.9 73.4 83.1 74.6 82 75.6 C80.8 76.6 79.4 78 78.1 78.7 C76.9 79.4 75.8 79.7 74.3 79.8 C72.7 80 70.7 80 69 79.9 C67.2 79.7 65.3 79.5 63.7 79.1 C62 78.7 60.5 78.2 59 77.5 C57.6 76.8 56.2 75.8 54.9 74.7 C53.7 73.6 52.5 72.3 51.6 71.1 C50.8 69.8 50.2 68.8 50 67.4 C49.7 66 49.9 64.6 50.2 62.9 C50.5 61.3 51.1 59.2 51.6 57.6 C52.1 55.9 52.6 54.6 53.4 53 C54.3 51.4 55.6 50.1 56.7 48.2 C57.8 46.3 59.6 44 60.1 41.5 C60.6 38.9 60.1 35.4 59.5 33 C58.9 30.5 57.4 28.8 56.3 26.6 C55.3 24.4 54.9 21.7 53.3 19.7 C51.7 17.7 48.9 15.9 46.5 14.7 C44.1 13.5 41.4 12.6 38.9 12.6 C36.4 12.6 34 14.1 31.5 14.8 C29.1 15.4 26.4 15.7 24.2 16.7 C22 17.6 20 19 18.3 20.5 C16.6 21.9 15.5 23.7 14.1 25.3 C12.8 27 11.2 29 10.4 30.1 C9.6 31.2 9.6 31.2 9.5 31.8 C9.5 32.4 9.7 33.2 10.1 33.6 C10.5 34 11.2 34.4 11.8 34.5 C12.4 34.5 12.4 34.5 13.6 33.9Z" fill="#D4887A" stroke="#8A4436" stroke-width="3" stroke-linejoin="round"/>
    <path d="M37.3 24.6 C38.3 24.8 39.4 25 40.4 25.3 C41.3 25.6 42.1 25.9 42.9 26.4 C43.7 26.8 44.5 27.4 45.3 27.9 C47.6 25.5 50 23.1 52.3 20.7 C51 19.5 49.9 18.1 48.4 17.2 C46.9 16.3 45.2 15.6 43.5 15.1 C41.9 14.5 40.3 14.4 38.7 14 C38.2 17.6 37.8 21.1 37.3 24.6Z" fill="#E9A27F"/>
    <path d="M18 29.6 Q17.3 27.3 15.1 26.4 M23 26.5 Q22.2 23.2 19.2 21.6 M27.5 23.5 Q27.4 20.2 24.8 17.9 M32.3 22.3 Q33.3 19.1 31.7 16.2 M49.9 30.7 Q53.3 30.1 55.2 27.3 M52.3 35.4 Q55.7 35.7 58.2 33.4 M52.7 39.6 Q55.4 41.6 58.7 41.1 M50.4 44 Q52.2 46.8 55.5 47.4 M46.9 49.1 Q48.9 51.9 52.2 52.3 M44.3 55.4 Q46.9 57.6 50.3 57.2 M42.7 61.6 Q45.5 63.4 48.8 62.7 M42.5 68.6 Q45.8 69.5 48.6 67.6 M45.4 75.4 Q48.7 74.7 50.5 71.9 M50 80.4 Q53 79 54 75.7 M55.6 84.3 Q58.2 82.1 58.4 78.7 M62 86.5 Q64 83.8 63.3 80.5 M68.4 87.4 Q70 84.4 68.9 81.2 M75 87.4 Q76 84.2 74.4 81.2 M82 85.3 Q81.6 81.9 78.8 79.9 M87.3 81 Q86.1 77.8 82.9 76.6" fill="none" stroke="#A85C4E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37.3 24.6 L38.7 14 M45.3 27.9 L52.3 20.7" fill="none" stroke="#8A4436" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  meduza: `
    <g fill="none" stroke="#E07AA0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 50 C14 60 22 70 16 82"/><path d="M30 52 C26 64 34 74 28 88"/><path d="M70 52 C74 64 66 74 72 88"/><path d="M82 50 C86 60 78 70 84 82"/></g>
    <path d="M42 50 C43.3 50 46 56.7 46 60 C46 63.3 42 66.7 42 70 C42 73.3 46 76.7 46 80 C46 83.3 43.3 86.7 42 90 C40.7 86.7 39.2 83.3 38 80 C36.8 76.7 35 73.3 35 70 C35 66.7 36.8 63.3 38 60 C39.2 56.7 40.7 50 42 50Z" fill="#F7B3CB" stroke="#C2366B" stroke-width="2.5" stroke-linejoin="round"/>
    <g transform="translate(100 0) scale(-1 1)"><path d="M42 50 C43.3 50 46 56.7 46 60 C46 63.3 42 66.7 42 70 C42 73.3 46 76.7 46 80 C46 83.3 43.3 86.7 42 90 C40.7 86.7 39.2 83.3 38 80 C36.8 76.7 35 73.3 35 70 C35 66.7 36.8 63.3 38 60 C39.2 56.7 40.7 50 42 50Z" fill="#F7B3CB" stroke="#C2366B" stroke-width="2.5" stroke-linejoin="round"/></g>
    <path d="M50 50 C51.3 49.7 54 58 54 62 C54 66 50.2 70 50 74 C49.8 78 52 82 53 86 C51 83.3 48.2 81.7 47 78 C45.8 74.3 45.5 68.7 46 64 C46.5 59.3 48.7 50.3 50 50Z" fill="#F7B3CB" stroke="#C2366B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M12 50 C12 24 30 10 50 10 C70 10 88 24 88 50 Q83.3 55 78.5 50 Q73.8 55 69 50 Q64.3 55 59.5 50 Q54.8 55 50 50 Q45.3 55 40.5 50 Q35.8 55 31 50 Q26.3 55 21.5 50 Q16.8 55 12 50Z" fill="#F9C6D8" stroke="#C2366B" stroke-width="3.5" stroke-linejoin="round" fill-opacity="0.88"/>
    <path d="M22 48 C26 34 38 26 50 26 C62 26 74 34 78 48" fill="none" stroke="#E58AAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 38 C26 28 34 20 44 18" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  // Etap 4: przewodnicy ze słuchowiska (wizerunki stylizowane, rysowane od zera).
  'przewodnik-hooke': `
    <path d="M24.5 42.5 C23 52 23 60 25 66 L51 66 C53 60 53 52 51.5 42.5 Z" fill="#2A1B11" stroke="#1C120B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M8 94 L8 81 C8 68 17 61 28 59 L48 59 C59 61 68 68 68 81 L68 94 Z" fill="#2E4A6B" stroke="#16263A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="#E5B248"><circle cx="38" cy="79" r="2"/><circle cx="38" cy="87" r="2"/></g>
    <path d="M33 47 L43 47 L43 61 L33 61 Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M29.5 58 Q38 64 46.5 58 L53.5 59.5 C54.5 63 54 67 52 70 L39.3 73.5 L38 71.8 L36.7 73.5 L24 70 C22 67 21.5 63 22.5 59.5 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <ellipse cx="38" cy="35.5" rx="14" ry="15.5" fill="#F1C7A0" stroke="#A0623A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="29.4" cy="42.8" r="2.4" fill="#F09A8C"/><circle cx="46.6" cy="42.8" r="2.4" fill="#F09A8C"/><circle cx="32.8" cy="37.5" r="2.1" fill="#11191B"/><circle cx="43.2" cy="37.5" r="2.1" fill="#11191B"/><path d="M29.8 32.9 Q32.8 30.5 35.8 32.1" fill="none" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M40.2 32.1 Q43.2 30.5 46.2 32.9" fill="none" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M38.3 39 Q36.2 42.7 39 42.9" fill="none" stroke="#A0623A" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><path d="M33.5 45 Q38 49.5 42.5 45" fill="none" stroke="#A0623A" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M38 13.5 C48.5 13.5 56 19 56.5 28.5 Q60.5 33.5 57.5 38.5 Q61.5 44 58 49.5 Q62 55 58.5 60.5 Q61.5 66 56 67.5 Q52 67.5 51.5 63.5 C50.5 56.5 50.5 46.5 50.5 38.5 C50.5 29.5 45 24 39.5 24 L38 22 L36.5 24 C31 24 25.5 29.5 25.5 38.5 C25.5 46.5 25.5 56.5 24.5 63.5 Q24 67.5 20 67.5 Q14.5 66 17.5 60.5 Q14 55 18 49.5 Q14.5 44 18.5 38.5 Q15.5 33.5 19.5 28.5 C20 19 27.5 13.5 38 13.5 Z" fill="#3A2618" stroke="#1C120B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M38 15.5 L38 21.5 M36 17 Q28 18.5 24.5 26.5 M40 17 Q48 18.5 51.5 26.5" fill="none" stroke="#1C120B" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M21.5 43.5 Q24 47.5 21.5 51.5 M54.5 43.5 Q52 47.5 54.5 51.5" fill="none" stroke="#1C120B" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M67 93 C67 87.5 72 85 80 85 C88 85 93 87.5 93 93 Z" fill="#E5B248" stroke="#7D5310" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="84" y="40" width="4.5" height="46" rx="1.5" fill="#E5B248" stroke="#7D5310" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="86.2" cy="38.5" r="2.8" fill="#E5B248" stroke="#7D5310" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="69" y="73" width="17" height="4" rx="1.5" fill="#E5B248" stroke="#7D5310" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="74" y="49" width="12" height="4" rx="1.5" fill="#C38E2C" stroke="#7D5310" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <g transform="rotate(-12 75 50)"><path d="M72.5 57 L77.5 57 L76.5 65 L73.5 65 Z" fill="#C38E2C" stroke="#7D5310" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><rect x="70.5" y="31" width="9" height="27" rx="2" fill="#E5B248" stroke="#7D5310" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><path d="M70.5 38.5 L79.5 38.5 M70.5 47 L79.5 47" fill="none" stroke="#7D5310" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><rect x="69" y="26" width="12" height="6" rx="2" fill="#C38E2C" stroke="#7D5310" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></g>`,
  'przewodnik-leeuwenhoek': `
    <path d="M22 36 C22 50 23 60 25 66 L49 66 C51 60 52 50 52 36 Z" fill="#A97A43" stroke="#6B4622" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M6 94 L6 81 C6 68 15 61 27 59 L47 59 C59 61 68 68 68 81 L68 94 Z" fill="#2D2C33" stroke="#11191B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M32 45 L42 45 L42 59 L32 59 Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M34.5 58 L29 72 L30.7 74 L32.4 72.4 L34.1 74 L35.8 72.4 L37 59 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M39.5 58 L45 72 L43.3 74 L41.6 72.4 L39.9 74 L38.2 72.4 L37 59 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M33 55 Q37 53.5 41 55 L40.2 60 Q37 61.3 33.8 60 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <ellipse cx="37" cy="35" rx="13.5" ry="15" fill="#F1C7A0" stroke="#A0623A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="28.4" cy="42.3" r="2.4" fill="#F09A8C"/><circle cx="45.6" cy="42.3" r="2.4" fill="#F09A8C"/><circle cx="32.6" cy="37" r="2.1" fill="#11191B"/><circle cx="43" cy="37" r="2.1" fill="#11191B"/><path d="M28.8 32.4 Q31.8 30 34.8 31.6" fill="none" stroke="#6B4622" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M39.2 31.6 Q42.2 30 45.2 32.4" fill="none" stroke="#6B4622" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M37.3 38.5 Q35.2 42.2 38 42.4" fill="none" stroke="#A0623A" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><path d="M32.5 44.5 Q37 49 41.5 44.5" fill="none" stroke="#A0623A" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M37 9 A5 5 0 0 1 45 10 A4.9 4.9 0 0 1 52 13.5 A5 5 0 0 1 57.5 19.5 A5 5 0 0 1 60.5 27 A5 5 0 0 1 62 35 A5 5 0 0 1 63 43 A5 5 0 0 1 63.5 51 A5 5 0 0 1 64 59 A5 5 0 0 1 64 67 A5 5 0 0 1 63 75 A4.6 4.6 0 0 1 60.5 82 A3.5 3.5 0 0 1 55.5 84.5 A3.2 3.2 0 0 1 51 82 A7.2 7.2 0 0 1 51.5 74 A7.2 7.2 0 0 1 51.5 66 A7.2 7.2 0 0 1 51 58 A7.2 7.2 0 0 1 50.5 50 A7.2 7.2 0 0 1 50 42 C50 30 47 21 38.5 21.5 L37 23.5 L35.5 21.5 C27 21 24 30 24 42 A7.2 7.2 0 0 1 23.5 50 A7.2 7.2 0 0 1 23 58 A7.2 7.2 0 0 1 22.5 66 A7.2 7.2 0 0 1 22.5 74 A7.2 7.2 0 0 1 23 82 A3.2 3.2 0 0 1 18.5 84.5 A3.5 3.5 0 0 1 13.5 82 A4.6 4.6 0 0 1 11 75 A5 5 0 0 1 10 67 A5 5 0 0 1 10 59 A5 5 0 0 1 10.5 51 A5 5 0 0 1 11 43 A5 5 0 0 1 12 35 A5 5 0 0 1 13.5 27 A5 5 0 0 1 16.5 19.5 A5 5 0 0 1 22 13.5 A4.9 4.9 0 0 1 29 10 A5 5 0 0 1 37 9 Z" fill="#C99A5E" stroke="#6B4622" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M58 30 q-3 1 -2 4 M59 45 q-3 1 -2 4 M60 60 q-3 1 -2 4 M59 74 q-3 1 -2 4" fill="none" stroke="#9C6D38" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M16 30 q3 1 2 4 M15 45 q3 1 2 4 M14 60 q3 1 2 4 M15 74 q3 1 2 4" fill="none" stroke="#9C6D38" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M69 71 L85.5 71 L88.5 94 L66.5 94 Z" fill="#2D2C33" stroke="#11191B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M69.5 66 L85.5 66 L86.5 72.5 Q82.5 74.5 78 72.5 Q73 74.5 68.5 72.5 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <g transform="rotate(10 77 62)"><path d="M70.5 48 L70.5 30.5 C70.5 26 73.5 23.5 77 23.5 C80.5 23.5 83.5 26 83.5 30.5 L83.5 48 Q83.5 51 80.5 51 L73.5 51 Q70.5 51 70.5 48 Z" fill="#D3DAE1" stroke="#4F5B66" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><g fill="#4F5B66"><circle cx="73.4" cy="47.6" r="1"/><circle cx="80.6" cy="47.6" r="1"/></g><circle cx="77" cy="30.5" r="3.9" fill="#A7DDF2" stroke="#2E3A44" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="78.1" cy="29.4" r="1" fill="#FFFFFF"/><path d="M77 36.5 L77 39.5" fill="none" stroke="#4F5B66" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><rect x="74" y="39.5" width="6" height="4" rx="1" fill="#A9B4BF" stroke="#4F5B66" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><rect x="75.6" y="43.5" width="2.8" height="16" rx="1" fill="#A9B4BF" stroke="#4F5B66" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><path d="M75.6 47 L78.4 46 M75.6 50 L78.4 49 M75.6 53 L78.4 52" fill="none" stroke="#4F5B66" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></g>
    <rect x="71" y="56.5" width="12.5" height="11.5" rx="4.5" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M73 58 C73.5 55 77 54 79.5 55.5 C80.5 56.5 80 58 78.5 58.3 Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M71.5 60.2 L75.5 60.2 M71.5 63 L75.5 63 M71.5 65.8 L75.5 65.8" fill="none" stroke="#A0623A" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`,
  'przewodnik-helmont': `
    <path d="M6 94 L6 82 C6 70 15 63 27 61 L47 61 C58 63 67 70 67 82 L67 94 Z" fill="#6B2638" stroke="#36101C" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="#E5B248"><circle cx="37" cy="80" r="2"/><circle cx="37" cy="88" r="2"/></g>
    <path d="M32 48 L42 48 L42 61 L32 61 Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M17 64.5 C22 57.5 29 57 37 58.5 C45 57 52 57.5 57 64.5 C51 72 43 73.5 37 72 C31 73.5 23 72 17 64.5 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="24" cy="39" r="3.4" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="50" cy="39" r="3.4" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <ellipse cx="37" cy="38" rx="13" ry="14.5" fill="#F1C7A0" stroke="#A0623A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="28.4" cy="43.3" r="2.4" fill="#F09A8C"/><circle cx="45.6" cy="43.3" r="2.4" fill="#F09A8C"/><circle cx="31.8" cy="38" r="2.1" fill="#11191B"/><circle cx="42.2" cy="38" r="2.1" fill="#11191B"/><path d="M28.8 33.4 Q31.8 31 34.8 32.6" fill="none" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M39.2 32.6 Q42.2 31 45.2 33.4" fill="none" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M37.3 39.5 Q35.2 43.2 38 43.4" fill="none" stroke="#A0623A" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><path d="M34 48.2 Q37 50.8 40 48.2" fill="none" stroke="#A0623A" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M23.5 34 C23 29 25 26 28 25 L27 33 Z" fill="#6A4A33" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M50.5 34 C51 29 49 26 46 25 L47 33 Z" fill="#6A4A33" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M24.2 40 C24.5 48 30 56 37 63 C44 56 49.5 48 49.8 40 C47 47 43.5 53.5 37 53.5 C30.5 53.5 27 47 24.2 40 Z" fill="#6A4A33" stroke="#3A2618" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M37 45 C34 44 30 45 29 48.5 C32 47.5 35 48 37 47.5 C39 48 42 47.5 45 48.5 C44 45 40 44 37 45 Z" fill="#6A4A33" stroke="#3A2618" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <ellipse cx="38" cy="23" rx="18" ry="7.5" transform="rotate(-8 38 23)" fill="#2C2B35" stroke="#11191B" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M23 28 Q37 31 52 25.5" fill="none" stroke="#4A4955" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M78 79 C77.2 68 79.4 56 78.8 41.5 L81 41.5 C81.4 56 79.8 68 80.8 79 Z" fill="#7A5232" stroke="#3E2614" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M79.8 42.5 C74.5 35 68 37 67 45.5 M79.8 43.5 C76.5 39.5 73 41 72.5 46.5 M80 43.5 C83 39.5 85 41 85.5 46.5 M80 42.5 C85 35 90 37 91 45.5 M79.9 41.5 L80.3 35" fill="none" stroke="#3E2614" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M67 45.5 L67 63 M72.5 46.5 L72.5 61 M85.5 46.5 L85.5 61 M91 45.5 L91 63" fill="none" stroke="#3E2614" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="#8CC65A" stroke="#3B7329" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="65.4" cy="48.5" rx="1.5" ry="3.8" transform="rotate(18 65.4 48.5)"/><ellipse cx="68.6" cy="53.2" rx="1.5" ry="3.8" transform="rotate(-18 68.6 53.2)"/><ellipse cx="65.4" cy="57.8" rx="1.5" ry="3.8" transform="rotate(18 65.4 57.8)"/><ellipse cx="68.6" cy="62.5" rx="1.5" ry="3.8" transform="rotate(-18 68.6 62.5)"/><ellipse cx="70.9" cy="49.5" rx="1.5" ry="3.8" transform="rotate(18 70.9 49.5)"/><ellipse cx="74.1" cy="53.2" rx="1.5" ry="3.8" transform="rotate(-18 74.1 53.2)"/><ellipse cx="70.9" cy="56.8" rx="1.5" ry="3.8" transform="rotate(18 70.9 56.8)"/><ellipse cx="74.1" cy="60.5" rx="1.5" ry="3.8" transform="rotate(-18 74.1 60.5)"/><ellipse cx="83.9" cy="49.5" rx="1.5" ry="3.8" transform="rotate(18 83.9 49.5)"/><ellipse cx="87.1" cy="53.2" rx="1.5" ry="3.8" transform="rotate(-18 87.1 53.2)"/><ellipse cx="83.9" cy="56.8" rx="1.5" ry="3.8" transform="rotate(18 83.9 56.8)"/><ellipse cx="87.1" cy="60.5" rx="1.5" ry="3.8" transform="rotate(-18 87.1 60.5)"/><ellipse cx="89.4" cy="48.5" rx="1.5" ry="3.8" transform="rotate(18 89.4 48.5)"/><ellipse cx="92.6" cy="53.2" rx="1.5" ry="3.8" transform="rotate(-18 92.6 53.2)"/><ellipse cx="89.4" cy="57.8" rx="1.5" ry="3.8" transform="rotate(18 89.4 57.8)"/><ellipse cx="92.6" cy="62.5" rx="1.5" ry="3.8" transform="rotate(-18 92.6 62.5)"/><ellipse cx="80.3" cy="31" rx="1.6" ry="4.5"/><ellipse cx="76.8" cy="34.8" rx="1.5" ry="3.8" transform="rotate(38 76.8 34.8)"/><ellipse cx="83.8" cy="34.8" rx="1.5" ry="3.8" transform="rotate(-38 83.8 34.8)"/></g>
    <path d="M68.5 81 L89.5 81 L86.5 93 L71.5 93 Z" fill="#C8673F" stroke="#6E2E14" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="66.5" y="76.5" width="25" height="5.5" rx="1.5" fill="#A9502C" stroke="#6E2E14" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`,
  'przewodnik-priestley': `
    <path d="M21 30 C19.5 37 19.5 43 22.5 46.5 Q36 49.5 49.5 46.5 C52.5 43 52.5 37 51 30 Z" fill="#B9C1C9" stroke="#6E7883" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M6 94 L6 82 C6 70 15 63 26 61 L46 61 C57 63 66 70 66 82 L66 94 Z" fill="#8A5636" stroke="#45230F" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M27 61 L45 61 L42 94 L30 94 Z" fill="#F0CF72" stroke="#8C6A16" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="#8C6A16"><circle cx="36" cy="76" r="1.6"/><circle cx="36" cy="83" r="1.6"/><circle cx="36" cy="90" r="1.6"/></g>
    <path d="M26 61 L32 70 L29 94" fill="none" stroke="#45230F" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M46 61 L40 70 L43 94" fill="none" stroke="#45230F" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M31 47 L41 47 L41 60 L31 60 Z" fill="#F1C7A0" stroke="#A0623A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M30 55.5 L42 55.5 L42.5 61 L39 61 Q40 67 36 71 Q32 67 33 61 L29.5 61 Z" fill="#FFFFFF" stroke="#66717C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <ellipse cx="36" cy="37" rx="13.5" ry="15" fill="#F1C7A0" stroke="#A0623A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="27.4" cy="44.3" r="2.4" fill="#F09A8C"/><circle cx="44.6" cy="44.3" r="2.4" fill="#F09A8C"/><circle cx="31.4" cy="39" r="2.1" fill="#11191B"/><circle cx="41.8" cy="39" r="2.1" fill="#11191B"/><path d="M27.8 34.4 Q30.8 32 33.8 33.6" fill="none" stroke="#7A5A40" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M38.2 33.6 Q41.2 32 44.2 34.4" fill="none" stroke="#7A5A40" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M36.3 40.5 Q34.2 44.2 37 44.4" fill="none" stroke="#A0623A" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><path d="M31.5 46.5 Q36 51 40.5 46.5" fill="none" stroke="#A0623A" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M22 35 C20.5 23 28 16.5 36 16.5 C44 16.5 51.5 23 50 35 C47 29 42 26.5 36 27 C30 26.5 25 29 22 35 Z" fill="#F3F3F0" stroke="#6E7883" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M27.5 22.5 Q36 18.5 44.5 22.5" fill="none" stroke="#B9C1C9" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="#F3F3F0" stroke="#6E7883" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="20.7" cy="33.5" rx="4.7" ry="3.7"/><ellipse cx="21.2" cy="41" rx="4.7" ry="3.7"/><ellipse cx="51.3" cy="33.5" rx="4.7" ry="3.7"/><ellipse cx="50.8" cy="41" rx="4.7" ry="3.7"/></g>
    <path d="M22.2 33.5 a1.6 1.6 0 1 0 -1.6 1.6 M22.7 41 a1.6 1.6 0 1 0 -1.6 1.6 M49.8 33.5 a1.6 1.6 0 1 1 1.6 1.6 M49.3 41 a1.6 1.6 0 1 1 1.6 1.6" fill="none" stroke="#6E7883" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="60.5" y="87.5" width="33" height="6" rx="2" fill="#A9B2BB" stroke="#4E5964" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M64.5 88 L64.5 62 C64.5 50 70.5 44 78.5 44 C86.5 44 92.5 50 92.5 62 L92.5 88 Z" fill="#CBEAF6" fill-opacity="0.55"/>
    <rect x="68" y="71" width="7" height="16.5" rx="1" fill="#FFF5DC" stroke="#A38B5A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M71.5 71 L71.5 67.5" fill="none" stroke="#11191B" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M71.5 57 C74.5 61 75 64 73.5 66.5 C72.5 68 70.5 68 69.5 66.5 C68 64 68.5 61 71.5 57 Z" fill="#FFC531" stroke="#D9792B" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M84 87.5 L84 57" fill="none" stroke="#2C6B2C" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <g fill="#5DB85A" stroke="#2C6B2C" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="79.5" cy="79" rx="4" ry="2.4" transform="rotate(-25 79.5 79)"/><ellipse cx="88.5" cy="79" rx="4" ry="2.4" transform="rotate(25 88.5 79)"/><ellipse cx="80" cy="69.5" rx="3.6" ry="2.2" transform="rotate(-30 80 69.5)"/><ellipse cx="88" cy="69.5" rx="3.6" ry="2.2" transform="rotate(30 88 69.5)"/><ellipse cx="81" cy="60.5" rx="3" ry="1.9" transform="rotate(-35 81 60.5)"/><ellipse cx="87" cy="60.5" rx="3" ry="1.9" transform="rotate(35 87 60.5)"/></g>
    <path d="M64.5 88 L64.5 62 C64.5 50 70.5 44 78.5 44 C86.5 44 92.5 50 92.5 62 L92.5 88" fill="none" stroke="#3F86AD" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M68.5 80 L68.5 62 C68.5 56 71 52 74 50" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="78.5" cy="41" r="3" fill="#CBEAF6" stroke="#3F86AD" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`,
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

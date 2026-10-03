// Service worker: praca offline po pierwszym uruchomieniu.
// WERSJA i PLIKI uzupełnia narzędzie: node tools/wersja.js (nie edytować ręcznie).
// Każda zmiana w app/ zmienia WERSJA, więc przeglądarka pobiera nową wersję gry.

const WERSJA = '293f5204ff08';
const PLIKI = [
  './',
  'assets/fonts/OFL-lexend.txt',
  'assets/fonts/OFL-titan-one.txt',
  'assets/fonts/lexend-latin-ext-wght-normal.woff2',
  'assets/fonts/lexend-latin-wght-normal.woff2',
  'assets/fonts/titan-one-latin-400-normal.woff2',
  'assets/fonts/titan-one-latin-ext-400-normal.woff2',
  'assets/ikony/apple-touch-icon.png',
  'assets/ikony/ikona-192.png',
  'assets/ikony/ikona-512.png',
  'assets/ikony/ikona.svg',
  'assets/svg/komorka-zwierzeca.svg',
  'css/baza.css',
  'css/ekrany.css',
  'css/podpisywanie.css',
  'css/tokeny.css',
  'data/elementy-komorek.js',
  'data/schematy.js',
  'data/swiaty.js',
  'data/typy-komorek.js',
  'data/zadania.js',
  'data/zadania/swiat-2.js',
  'index.html',
  'js/components/podpisywanie-logika.js',
  'js/components/podpisywanie.js',
  'js/core/daty.js',
  'js/core/dom.js',
  'js/core/magazyn.js',
  'js/core/router.js',
  'js/core/stan.js',
  'js/core/swiaty.js',
  'js/ekrany/baza.js',
  'js/ekrany/mapa.js',
  'js/ekrany/misja.js',
  'js/ekrany/podsumowanie.js',
  'js/ekrany/rodzic.js',
  'js/ekrany/swiat.js',
  'js/ekrany/wspolne.js',
  'js/main.js',
  'js/pwa.js',
  'js/wersja.js',
  'manifest.webmanifest',
];

const PAMIEC = `wyprawa-${WERSJA}`;

self.addEventListener('install', (zdarzenie) => {
  zdarzenie.waitUntil(caches.open(PAMIEC).then((pamiec) => pamiec.addAll(PLIKI)));
});

self.addEventListener('activate', (zdarzenie) => {
  zdarzenie.waitUntil(
    caches
      .keys()
      .then((klucze) => Promise.all(klucze.filter((k) => k.startsWith('wyprawa-') && k !== PAMIEC).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Nowa wersja czeka, aż gracz stuknie „Odśwież” (komunikat z gry).
self.addEventListener('message', (zdarzenie) => {
  if (zdarzenie.data === 'aktualizuj') self.skipWaiting();
});

self.addEventListener('fetch', (zdarzenie) => {
  const zadanie = zdarzenie.request;
  if (zadanie.method !== 'GET') return;
  const adres = new URL(zadanie.url);
  if (adres.origin !== self.location.origin) return;
  // Nagrania słuchowiska nie trafiają do pamięci offline z góry (rozmiar; SPEC.md, sekcja 4.6).
  if (adres.pathname.includes('/audio/')) return;
  zdarzenie.respondWith(
    (async () => {
      const pamiec = await caches.open(PAMIEC);
      if (zadanie.mode === 'navigate') return (await pamiec.match('index.html')) || fetch(zadanie);
      return (await pamiec.match(zadanie, { ignoreSearch: true })) || fetch(zadanie);
    })(),
  );
});

// Generuje ikony PNG z app/assets/ikony/ikona.svg: node tools/ikony.js
// Narzędzie deweloperskie: wymaga pakietu playwright z przeglądarką Chromium
// (lokalnie albo globalnie). Gra sama z niego nie korzysta.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wczytajPlaywright } from './playwright.js';

const KATALOG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'app', 'assets', 'ikony');
const ROZMIARY = [
  ['ikona-192.png', 192],
  ['ikona-512.png', 512],
  ['apple-touch-icon.png', 180],
];

const { chromium } = wczytajPlaywright();
const svg = await readFile(path.join(KATALOG, 'ikona.svg'), 'utf8');
const przegladarka = await chromium.launch();
for (const [plik, rozmiar] of ROZMIARY) {
  const strona = await przegladarka.newPage({ viewport: { width: rozmiar, height: rozmiar } });
  await strona.setContent(
    `<!doctype html><body style="margin:0">${svg.replace('<svg ', `<svg width="${rozmiar}" height="${rozmiar}" `)}</body>`,
  );
  await strona.screenshot({ path: path.join(KATALOG, plik) });
  await strona.close();
  console.log(`${plik}: ${rozmiar}×${rozmiar}`);
}
await przegladarka.close();

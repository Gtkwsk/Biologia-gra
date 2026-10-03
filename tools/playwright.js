// Wczytanie pakietu playwright: lokalnie albo z globalnych pakietów npm.
// Używane tylko przez narzędzia deweloperskie (ikony, test w przeglądarce).

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import path from 'node:path';

export function wczytajPlaywright() {
  const require = createRequire(import.meta.url);
  try {
    return require('playwright');
  } catch {
    try {
      const globalne = execSync('npm root -g', { encoding: 'utf8' }).trim();
      return require(path.join(globalne, 'playwright'));
    } catch {
      console.error('Brak pakietu playwright. Instalacja: npm install -g playwright');
      process.exit(1);
    }
  }
}

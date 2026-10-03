import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { oczekiwanePliki, KATALOG_APP, nagrania, trescWersjiJs } from '../tools/wersja.js';

const POLECENIE = 'Po zmianach w app/ należy uruchomić: node tools/wersja.js';

test('sw.js i js/wersja.js odpowiadają bieżącej zawartości gry', async () => {
  const { sw, wersjaJs } = await oczekiwanePliki();
  assert.equal(await readFile(path.join(KATALOG_APP, 'sw.js'), 'utf8'), sw, POLECENIE);
  assert.equal(await readFile(path.join(KATALOG_APP, 'js', 'wersja.js'), 'utf8'), wersjaJs, POLECENIE);
});

test('każdy plik z listy offline istnieje', async () => {
  const { pliki } = await oczekiwanePliki();
  assert.ok(pliki.includes('index.html'));
  assert.ok(pliki.includes('manifest.webmanifest'));
  assert.ok(pliki.includes('js/wersja.js'), 'plik wersji jest importowany przez grę, więc musi działać offline');
  assert.ok(!pliki.includes('sw.js'));
  for (const p of pliki) await access(path.join(KATALOG_APP, p));
});

test('manifest wskazuje istniejące ikony', async () => {
  const manifest = JSON.parse(await readFile(path.join(KATALOG_APP, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.lang, 'pl');
  for (const ikona of manifest.icons) await access(path.join(KATALOG_APP, ikona.src));
});

test('lista nagrań słuchowiska: tylko pliki czesc-1.mp3 … czesc-6.mp3 z katalogu audio/', async () => {
  const katalog = await mkdtemp(path.join(os.tmpdir(), 'wyprawa-'));
  try {
    assert.deepEqual(await nagrania(katalog), [], 'bez katalogu audio/ lista jest pusta');
    await mkdir(path.join(katalog, 'audio'));
    for (const n of ['czesc-3.mp3', 'czesc-1.mp3', 'czesc-7.mp3', 'czesc-2.wav', 'notatka.txt']) await writeFile(path.join(katalog, 'audio', n), '');
    assert.deepEqual(await nagrania(katalog), [1, 3]);
    assert.match(trescWersjiJs('abc', [1, 3]), /export const NAGRANIA = \[1, 3\];/);
  } finally {
    await rm(katalog, { recursive: true, force: true });
  }
});

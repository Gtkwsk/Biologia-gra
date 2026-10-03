// Test całej gry w przeglądarce Chromium:
//   node tools/e2e.js [katalog-na-zrzuty] [--adres=https://biologia-gra.netlify.app/]
// Bez --adres test uruchamia lokalny serwer z katalogiem app/.
// Narzędzie deweloperskie (wymaga playwright). Sprawdza przejście mapa → świat → misja →
// podsumowanie, przeciąganie myszą i palcem, stuknięcia, zapis postępu, wszystkie misje
// świata 2 i jego bossa (przegrana i wygrana), otwarcie świata 3, atlas, mikroskop, bramkę
// panelu rodzica, pracę offline oraz brak błędów w konsoli (w tym naruszeń CSP).
// Zadania rozwiązuje tools/rozwiazania.js na podstawie danych gry.
// Każdy przebieg używa nowego, pustego profilu przeglądarki.

import path from 'node:path';
import { mkdir, readFile } from 'node:fs/promises';
import { X509Certificate, createHash } from 'node:crypto';
import { uruchomSerwer } from './serwer.js';
import { wczytajPlaywright } from './playwright.js';
import { rozwiaz } from './rozwiazania.js';
import schematy from '../app/data/schematy.js';
import zadania from '../app/data/zadania.js';
import swiaty from '../app/data/swiaty.js';
import typyKomorek from '../app/data/typy-komorek.js';
import miasto from '../app/data/miasto.js';
import wskazowki from '../app/data/wskazowki.js';
import czesciKonstruktora from '../app/data/konstruktor.js';

const daneGry = { zadania, schematy, typyKomorek, miasto, wskazowki, czesciKonstruktora };
const zadaniePoId = new Map(zadania.map((z) => [z.id, z]));

const { chromium } = wczytajPlaywright();
const argumenty = process.argv.slice(2);
const adresZdalny = argumenty.find((a) => a.startsWith('--adres='))?.slice('--adres='.length);
// --ca=plik.pem: przeglądarka ufa certyfikatom z tego pliku (np. pośrednik sieciowy środowiska
// z własnym urzędem certyfikacji). Weryfikacja TLS działa dalej, tylko z dodatkowym zaufanym kluczem.
const plikCA = argumenty.find((a) => a.startsWith('--ca='))?.slice('--ca='.length);
const katalogArg = argumenty.find((a) => !a.startsWith('--'));
const katalogZrzutow = katalogArg ? path.resolve(katalogArg) : null;
if (katalogZrzutow) await mkdir(katalogZrzutow, { recursive: true });

const zadanie = zadania.find((z) => z.id === 's2-podpis-zwierzeca-1');
const schemat = schematy.find((s) => s.id === zadanie.schemat);
const elementPunktu = Object.fromEntries(schemat.punkty.map((p) => [p.id, p.element]));

const bledy = [];
const sprawdz = (warunek, opis) => {
  if (warunek) console.log(`  ok  ${opis}`);
  else bledy.push(opis);
};

const serwer = adresZdalny ? null : await uruchomSerwer(0);
const adres = adresZdalny ? adresZdalny.replace(/\/?$/, '/') : `http://127.0.0.1:${serwer.address().port}/`;
console.log(`Adres: ${adres}`);
async function skrotyKluczyCA(plik) {
  const pem = await readFile(plik, 'utf8');
  const certyfikaty = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) ?? [];
  return certyfikaty.map((c) =>
    createHash('sha256')
      .update(new X509Certificate(c).publicKey.export({ type: 'spki', format: 'der' }))
      .digest('base64'),
  );
}

const przegladarka = await chromium.launch({
  args: plikCA ? [`--ignore-certificate-errors-spki-list=${(await skrotyKluczyCA(plikCA)).join(',')}`] : [],
});

async function nowaStrona(opcje) {
  const kontekst = await przegladarka.newContext({ locale: 'pl-PL', ...opcje });
  const strona = await kontekst.newPage();
  strona.on('console', (m) => {
    if (m.type() === 'error') bledy.push(`[konsola] ${m.text()}`);
  });
  strona.on('pageerror', (e) => bledy.push(`[wyjątek] ${e.message}`));
  return { kontekst, strona };
}

async function zrzut(strona, nazwa) {
  if (!katalogZrzutow) return;
  await strona.waitForTimeout(700);
  await strona.screenshot({ path: path.join(katalogZrzutow, `${nazwa}.png`), fullPage: true });
}

async function srodek(lokator) {
  const r = await lokator.boundingBox();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
}

async function wejdzDoMisji(strona) {
  await strona.goto(adres);
  await strona.locator('.swiat[data-swiat="2"] .swiat__przycisk').click();
  await strona.locator('.misja-karta').first().click();
  await strona.locator('.podpis__rysunek').waitFor();
}

// Rozwiązuje bieżące zadanie (misji albo bossa) i czeka na wynik.
async function rozwiazBiezace(strona) {
  const obszar = strona.locator('.misja__obszar');
  await obszar.locator('.zadanie').first().waitFor();
  const id = await obszar.getAttribute('data-zadanie');
  await rozwiaz(strona, zadaniePoId.get(id), daneGry);
  await strona.locator('.misja__wynik:not([hidden])').waitFor();
  return id;
}

// Przechodzi całą misję; zwraca tytuły wyników kolejnych zadań.
async function przejdzMisje(strona, idSwiata, idMisji) {
  await strona.goto(`${adres}#/swiat/${idSwiata}/misja/${idMisji}`);
  const misja = swiaty.find((s) => s.id === idSwiata).misje.find((m) => m.id === idMisji);
  const tytuly = [];
  for (let i = 0; i < misja.zadania.length; i++) {
    await rozwiazBiezace(strona);
    tytuly.push((await strona.locator('.misja__wynik-tytul').textContent()).trim());
    if (i < misja.zadania.length - 1) await strona.locator('.misja__wynik button', { hasText: 'Dalej' }).click();
  }
  return tytuly;
}

// ---------- Tablet poziomo, mysz ----------
console.log('Tablet poziomo (mysz)');
{
  const { kontekst, strona } = await nowaStrona({ viewport: { width: 1024, height: 768 } });
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  sprawdz((await strona.locator('.swiat').count()) === 6, 'mapa pokazuje sześć światów');
  sprawdz((await strona.locator('.swiat[data-swiat="2"]').getAttribute('data-status')) === 'otwarty', 'świat 2 jest otwarty');
  sprawdz((await strona.locator('.swiat[data-swiat="3"]').getAttribute('data-status')) === 'zablokowany', 'świat 3 czeka na bossa świata 2');
  sprawdz((await strona.locator('.swiat[data-status="w-budowie"]').count()) === 4, 'pozostałe światy są w budowie');
  await zrzut(strona, '01-mapa-tablet-poziomo');

  await strona.locator('.swiat[data-swiat="1"] .swiat__przycisk').click();
  sprawdz((await strona.locator('.powiadomienie').first().textContent()).includes('w budowie'), 'świat w budowie odpowiada komunikatem');

  await strona.locator('.swiat[data-swiat="2"] .swiat__przycisk').click();
  await strona.locator('.swiat-wstep').waitFor();
  sprawdz((await strona.locator('h1').textContent()) === 'Miasto, którego nie widać', 'wstęp świata 2');
  sprawdz((await strona.locator('.misja-karta').count()) === 5, 'świat 2 ma pięć misji');
  sprawdz((await strona.locator('.boss-wejscie[data-stan="zamkniety"]').count()) === 1, 'boss zamknięty przed ukończeniem misji');
  await zrzut(strona, '02-swiat-2');

  await strona.locator('.misja-karta').first().click();
  await strona.locator('.podpis__rysunek').waitFor();
  sprawdz((await strona.locator('.bank .etykieta').count()) === 10, 'bank ma 8 etykiet i 2 dystraktory');
  {
    const tacka = await strona.locator('.tacka').boundingBox();
    const rysunek = await strona.locator('.podpis__rysunek').boundingBox();
    sprawdz(rysunek.y + rysunek.height <= tacka.y, `w poziomie rysunek mieści się nad tacką (${Math.round(rysunek.y + rysunek.height)} ≤ ${Math.round(tacka.y)})`);
  }
  await zrzut(strona, '03-misja-start');

  // Błędna etykieta przez stuknięcia
  await strona.locator('.etykieta[data-element="rybosomy"]').click();
  await strona.locator('.miejsce__pole[data-punkt="siateczka"]').click();
  const komunikat = strona.locator('.komunikat');
  sprawdz((await komunikat.getAttribute('data-rodzaj')) === 'zle', 'błąd oznaczony jako błąd');
  sprawdz((await komunikat.textContent()).includes('Rybosomy to drobne ziarenka.'), 'komunikat podaje przyczynę błędu');
  await zrzut(strona, '04-misja-blad');

  // Dystraktor
  await strona.locator('.etykieta[data-element="sciana-komorkowa"]').click();
  await strona.locator('.znacznik[data-punkt="blona"] .znacznik__kolko').click();
  sprawdz((await komunikat.textContent()).includes('Komórka zwierzęca nie ma ściany komórkowej.'), 'dystraktor wyjaśniony regułą z TRESCI.md');

  // Przeciąganie myszą na numer na rysunku
  const start = await srodek(strona.locator('.etykieta[data-element="mitochondrium"]'));
  const cel = await srodek(strona.locator('.znacznik[data-punkt="mitochondrium"] .znacznik__kolko'));
  await strona.mouse.move(start.x, start.y);
  await strona.mouse.down();
  await strona.mouse.move(start.x + 20, start.y - 20, { steps: 4 });
  await strona.mouse.move(cel.x, cel.y, { steps: 12 });
  sprawdz((await strona.locator('.etykieta--duch').count()) === 1, 'podczas przeciągania widać etykietę pod kursorem');
  await strona.mouse.up();
  sprawdz((await strona.locator('.miejsce[data-punkt="mitochondrium"]').getAttribute('data-stan')) === 'dobrze', 'przeciągnięcie myszą podpisuje punkt');
  sprawdz((await strona.locator('.etykieta--duch').count()) === 0, 'etykieta przeciągania znika po upuszczeniu');

  // Reszta przez stuknięcia
  for (const p of zadanie.punkty) {
    if (p === 'mitochondrium') continue;
    await strona.locator(`.etykieta[data-element="${elementPunktu[p]}"]`).click();
    await strona.locator(`.miejsce__pole[data-punkt="${p}"]`).click();
  }
  await strona.locator('.misja__wynik').waitFor();
  const wynik = await strona.locator('.misja__wynik').textContent();
  sprawdz(wynik.includes('Od razu dobrze: 6 z 8'), `wynik liczy tylko pierwsze próby (${wynik.slice(0, 40)}…)`);
  sprawdz(wynik.includes('siateczka śródplazmatyczna'), 'wynik wskazuje element do poćwiczenia');
  await zrzut(strona, '05-misja-wynik');

  // Drugie wyzwanie misji i koniec wyprawy
  await strona.locator('.misja__wynik button', { hasText: 'Dalej' }).click();
  await rozwiazBiezace(strona);
  sprawdz((await strona.locator('.misja__wynik-tytul').textContent()) === 'Wszystko od razu dobrze!', 'drugie wyzwanie misji rozwiązane stuknięciami');
  await strona.locator('.misja__wynik a', { hasText: 'Zakończ wyprawę' }).click();
  await strona.locator('.podsumowanie').waitFor();
  sprawdz((await strona.locator('.podsumowanie').textContent()).includes('Ukończone wyzwania: 2. Od razu dobrze: 12 z 14.'), 'podsumowanie wyprawy');
  await zrzut(strona, '06-podsumowanie');
  await strona.locator('.podsumowanie button', { hasText: 'Wróć na mapę' }).click();

  // Zapis postępu po przeładowaniu
  await strona.reload();
  await strona.locator('.mapa__swiaty').waitFor();
  const klocki = await strona.locator('.swiat[data-swiat="2"] .ostrosc__klocek[data-pelny="true"]').count();
  sprawdz(klocki === 0, `postęp po przeładowaniu: jedno z 11 wyzwań opanowane, ostrość ${klocki} z 5`);

  // Wszystkie misje świata 2 od razu dobrze
  for (const m of swiaty.find((s) => s.id === 2).misje) {
    const tytuly = await przejdzMisje(strona, 2, m.id);
    sprawdz(tytuly.every((t) => t === 'Wszystko od razu dobrze!'), `misja „${m.nazwa}”: od razu dobrze (wyzwania: ${tytuly.length})`);
    if (m.id === 's2-budowa-miasta') await zrzut(strona, '07-misja-miasto');
  }
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  sprawdz((await strona.locator('.swiat[data-swiat="2"] .ostrosc__klocek[data-pelny="true"]').count()) === 5, 'opanowany świat ma pełną ostrość');

  // Boss świata 2: przegrana, potem wygrana
  await strona.goto(`${adres}#/swiat/2`);
  await strona.locator('a.boss-wejscie').click();
  await strona.locator('.boss-karta--wstep').waitFor();
  await zrzut(strona, '08-boss-wstep');
  await strona.locator('.boss-karta button', { hasText: 'Zaczynamy' }).click();
  while (!(await strona.locator('.boss-karta--koniec').count())) {
    await strona.locator('.misja__obszar .zadanie').first().waitFor();
    if (await strona.locator('.pf__prawda').count()) {
      // Prawda/fałsz: „Prawda” przy każdym zdaniu (każde zadanie ma zdania fałszywe).
      while (await strona.locator('.pf__prawda').count()) {
        await strona.locator('.pf__prawda').click();
        await strona.locator('.pf__akcje .przycisk--dalej').click();
      }
    } else {
      await strona.locator('.tacka__akcje button', { hasText: 'Sprawdź' }).click();
    }
    await strona.locator('.misja__wynik:not([hidden])').waitFor();
    await strona.locator('.misja__wynik .przycisk--dalej').click();
  }
  sprawdz((await strona.locator('.boss-karta--koniec h1').textContent()).includes('wygrał boss'), 'trzy wyzwania z błędem kończą podejście');
  await zrzut(strona, '09-boss-przegrana');
  await strona.locator('.boss-karta button', { hasText: 'Spróbuj ponownie' }).click();
  await strona.locator('.boss-karta button', { hasText: 'Zaczynamy' }).click();
  for (let i = 0; i < swiaty.find((s) => s.id === 2).boss.wyzwania.length; i++) {
    await rozwiazBiezace(strona);
    if (i === 0) await zrzut(strona, '10-boss-wyzwanie');
    await strona.locator('.misja__wynik .przycisk--dalej').click();
  }
  await strona.locator('.boss-karta--wygrana').waitFor();
  const wygrana = await strona.locator('.boss-karta--wygrana').textContent();
  sprawdz(wygrana.includes('Inspektor miasta pokonany!'), 'boss świata 2 pokonany');
  sprawdz(wygrana.includes('Mikroskop ulepszony') && wygrana.includes('Otwarty nowy świat: Zielone twierdze'), 'nagrody: mikroskop i nowy świat');
  await zrzut(strona, '11-boss-wygrana');

  // Świat 3 otwarty, misja detektywa
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  sprawdz((await strona.locator('.swiat[data-swiat="3"]').getAttribute('data-status')) === 'otwarty', 'świat 3 otwarty po bossie świata 2');
  sprawdz((await strona.locator('.swiat[data-swiat="2"]').getAttribute('data-status')) === 'pokonany', 'świat 2 oznaczony jako pokonany');
  await zrzut(strona, '12-mapa-swiat-3');
  for (const idMisji of ['s3-twierdza', 's3-detektyw', 's3-konstruktor']) {
    const tytuly = await przejdzMisje(strona, 3, idMisji);
    sprawdz(tytuly.every((t) => t === 'Wszystko od razu dobrze!'), `świat 3, misja ${idMisji}: od razu dobrze`);
  }
  await zrzut(strona, '13-misja-konstruktor');

  // Atlas i mikroskop
  await strona.goto(`${adres}#/atlas`);
  await strona.locator('.ekran--atlas').waitFor();
  const zlote = await strona.locator('.karta-atlasu[data-poziom="zlota"]').count();
  sprawdz(zlote > 0, `atlas: złote karty po bossie (${zlote})`);
  await strona.locator('.karta-atlasu[data-karta="blona-komorkowa"]').click();
  sprawdz((await strona.locator('dialog.karta-szczegoly').textContent()).includes('Ciekawostka'), 'złota karta odsłania ciekawostkę');
  await zrzut(strona, '14-atlas');
  await strona.locator('dialog.karta-szczegoly button', { hasText: 'Zamknij' }).click();
  await strona.goto(`${adres}#/mikroskop`);
  await strona.locator('.ekran--mikroskop').waitFor();
  sprawdz(await strona.locator('.mikroskop__poziomy button', { hasText: '10 000' }).isDisabled(), 'mikroskop: 10 000 razy jeszcze zamknięte');
  await strona.locator('.mikroskop__poziomy button', { hasText: '400' }).click();
  await strona.locator('.mikroskop__preparaty button', { hasText: 'moczarki' }).click();
  const chloroplast = strona.locator('.chloroplast-moczarki').first();
  const przed = await chloroplast.getAttribute('cx');
  await strona.waitForTimeout(600);
  sprawdz((await chloroplast.getAttribute('cx')) !== przed, 'chloroplasty moczarki krążą');
  await zrzut(strona, '15-mikroskop');

  // Bramka i panel rodzica
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  const logo = await srodek(strona.locator('.logo'));
  await strona.mouse.move(logo.x, logo.y);
  await strona.mouse.down();
  await strona.waitForTimeout(3200);
  await strona.mouse.up();
  await strona.locator('.bramka').waitFor();
  sprawdz(strona.url().endsWith('#/rodzic'), 'przytrzymanie logo otwiera bramkę panelu');
  await strona.locator('#bramka-pole').fill('0');
  await strona.locator('.bramka button[type="submit"]').click();
  sprawdz((await strona.locator('.bramka__blad').textContent()).length > 0, 'zły wynik nie otwiera panelu');
  const [a, b] = (await strona.locator('.bramka__pytanie').textContent()).match(/\d+/g).map(Number);
  await strona.locator('#bramka-pole').fill(String(a * b));
  await strona.locator('.bramka button[type="submit"]').click();
  await strona.locator('.tabela').waitFor();
  const panel = await strona.locator('.ekran--rodzic').textContent();
  // Pomyłki z przegranego podejścia do bossa zależą od wylosowanych wariantów: sprawdzana jest lista.
  sprawdz((await strona.locator('.ekran--rodzic .lista-opisow li').count()) > 0, 'panel pokazuje najczęstsze pomyłki');
  sprawdz(panel.includes('11 z 11'), 'panel pokazuje ukończone wyzwania świata 2');
  await zrzut(strona, '16-panel-rodzica');
  await strona.locator('.ekran--rodzic a', { hasText: 'Wróć do gry' }).last().click();
  await strona.locator('.mapa__swiaty').waitFor();
  await strona.goto(`${adres}#/rodzic`);
  sprawdz((await strona.locator('.bramka').count()) === 1, 'po wyjściu panel znów wymaga bramki');

  // Praca offline
  await strona.goto(adres);
  await strona.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await strona.reload();
  await kontekst.setOffline(true);
  await strona.reload();
  await strona.locator('.mapa__swiaty').waitFor();
  await wejdzDoMisji(strona);
  sprawdz((await strona.locator('.bank .etykieta').count()) === 10, 'gra działa offline (mapa i misja z rysunkiem)');
  await strona.goto(`${adres}#/swiat/3/misja/s3-bakterie`);
  await strona.locator('.podpis__rysunek').waitFor();
  sprawdz((await strona.locator('.bank .etykieta').count()) === 10, 'offline działa też schemat komórki bakteryjnej');
  await kontekst.setOffline(false);
  await kontekst.close();
}

// ---------- Tablet pionowo, dotyk ----------
console.log('Tablet pionowo (dotyk)');
{
  const { kontekst, strona } = await nowaStrona({ viewport: { width: 768, height: 1024 }, hasTouch: true, isMobile: true });
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  await zrzut(strona, '17-mapa-tablet-pionowo');
  await wejdzDoMisji(strona);
  const cdp = await kontekst.newCDPSession(strona);
  const dotyk = (type, x, y) =>
    cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
  // W pionie etykiety i komunikat są na tacce przy dolnej krawędzi; celem są numery na rysunku.
  const start = await srodek(strona.locator('.etykieta[data-element="jadro-komorkowe"]'));
  const cel = await srodek(strona.locator('.znacznik[data-punkt="jadro"] .znacznik__kolko'));
  await dotyk('touchStart', start.x, start.y);
  for (let i = 1; i <= 10; i++) {
    await dotyk('touchMove', start.x + ((cel.x - start.x) * i) / 10, start.y + ((cel.y - start.y) * i) / 10);
  }
  await dotyk('touchEnd');
  sprawdz((await strona.locator('.miejsce[data-punkt="jadro"]').getAttribute('data-stan')) === 'dobrze', 'przeciągnięcie palcem podpisuje punkt');
  await strona.locator('.etykieta[data-element="cytozol"]').tap();
  sprawdz((await strona.locator('.etykieta[data-element="cytozol"]').getAttribute('aria-pressed')) === 'true', 'stuknięcie palcem wybiera etykietę');
  await strona.locator('.znacznik[data-punkt="cytozol"] .znacznik__kolko').tap();
  sprawdz((await strona.locator('.miejsce[data-punkt="cytozol"]').getAttribute('data-stan')) === 'dobrze', 'stuknięcie numeru podpisuje punkt');
  const tacka = await strona.locator('.tacka').boundingBox();
  const rysunek = await strona.locator('.podpis__rysunek').boundingBox();
  sprawdz(rysunek.y + rysunek.height <= tacka.y, 'w pionie rysunek mieści się nad tacką z etykietami');
  await zrzut(strona, '18-misja-tablet-pionowo');
  await kontekst.close();
}

// ---------- Telefon ----------
console.log('Telefon');
{
  const { kontekst, strona } = await nowaStrona({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  await zrzut(strona, '18-mapa-telefon');
  await wejdzDoMisji(strona);
  for (const [adresEkranu, nazwa] of [
    [null, 'misja'],
    ['#/swiat/2/misja/s2-mikroskop', 'klasyfikacja ze sceną'],
    ['#/swiat/2/misja/s2-budowa-miasta', 'budowa miasta'],
    ['#/atlas', 'atlas'],
    ['#/mikroskop', 'mikroskop'],
    ['#/baza', 'baza'],
  ]) {
    if (adresEkranu) {
      await strona.goto(`${adres}${adresEkranu}`);
      await strona.waitForTimeout(400);
    }
    const szerokosc = await strona.evaluate(() => document.documentElement.scrollWidth);
    sprawdz(szerokosc <= 390, `telefon, ${nazwa}: brak przewijania w poziomie (${szerokosc}px)`);
  }
  await strona.goto(`${adres}#/swiat/2/misja/s2-plan-miasta`);
  await strona.locator('.podpis__rysunek').waitFor();
  await zrzut(strona, '19-misja-telefon');
  await kontekst.close();
}

await przegladarka.close();
serwer?.close();

if (bledy.length) {
  console.error(`\nBłędy (${bledy.length}):`);
  for (const b of bledy) console.error(`- ${b}`);
  process.exit(1);
}
console.log('\nTest w przeglądarce: bez błędów.');

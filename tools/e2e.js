// Test całej gry w przeglądarce Chromium:
//   node tools/e2e.js [katalog-na-zrzuty] [--adres=https://biologia-gra.netlify.app/]
// Bez --adres test uruchamia lokalny serwer z katalogiem app/.
// Narzędzie deweloperskie (wymaga playwright). Sprawdza mapę nowego gracza (otwarty tylko
// świat 1), wszystkie misje i bossa świata 1, przejście mapa → świat → misja → podsumowanie,
// przeciąganie myszą i palcem, stuknięcia, zapis postępu, wszystkie misje świata 2 i jego bossa
// (przegrana i wygrana), atlas, mikroskop, bramkę panelu rodzica, wszystkie misje i bossów
// światów 3-6 (każdy świat otwiera się po bossie poprzedniego), wykłady Profesora Pomyłki
// (wykrywacz bzdur, z podpowiedzią po pomyłkach), próbny sprawdzian, domowe
// laboratorium, raport w panelu rodzica, pracę offline, układ na telefonie oraz brak błędów
// w konsoli (w tym naruszeń CSP).
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
import procesy from '../app/data/procesy.js';
import porownanie from '../app/data/porownanie.js';
import sprawdzian from '../app/data/sprawdzian.js';
import { KLUCZ } from '../app/js/core/magazyn.js';
import { misjeDoPoprawy } from '../app/js/core/sprawdzian.js';

const daneGry = { zadania, schematy, typyKomorek, miasto, wskazowki, czesciKonstruktora, procesy, porownanie };
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

// Otwiera panel rodzica: przytrzymanie logo na mapie i poprawny wynik działania.
async function otworzPanel(strona) {
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  const logo = await srodek(strona.locator('.logo'));
  await strona.mouse.move(logo.x, logo.y);
  await strona.mouse.down();
  await strona.waitForTimeout(3200);
  await strona.mouse.up();
  await strona.locator('.bramka').waitFor();
  const [a, b] = (await strona.locator('.bramka__pytanie').textContent()).match(/\d+/g).map(Number);
  await strona.locator('#bramka-pole').fill(String(a * b));
  await strona.locator('.bramka button[type="submit"]').click();
  await strona.locator('.tabela').first().waitFor();
}

// Rozwiązuje bieżące zadanie (misji albo bossa) i czeka na wynik.
async function rozwiazBiezace(strona) {
  const obszar = strona.locator('.misja__obszar');
  await obszar.locator('.zadanie').first().waitFor();
  const id = await obszar.getAttribute('data-zadanie');
  await rozwiaz(strona, zadaniePoId.get(id), daneGry);
  await strona.locator('.misja__wynik:not([hidden])').waitFor();
  // Puste wartości nie mogą trafić na ekran jako napis (np. Element.append(null) daje „null”).
  const tekst = await strona.locator('body').innerText();
  if (/\b(null|undefined|NaN)\b/.test(tekst)) bledy.push(`${id}: na ekranie jest napis „null”, „undefined” albo „NaN”`);
  return id;
}

// Przyporządkowanie z dwiema pierwszymi parami zamienionymi (próbny sprawdzian): sprawdza punkty
// za część odpowiedzi i odnośniki do misji. Zwraca zadanie.
async function przyporzadkujZBledem(strona) {
  const obszar = strona.locator('.misja__obszar');
  await obszar.locator('.zadanie').first().waitFor();
  const z = zadaniePoId.get(await obszar.getAttribute('data-zadanie'));
  if (z.typ !== 'przyporzadkowanie') {
    bledy.push(`${z.id}: oczekiwano przyporządkowania`);
    await rozwiaz(strona, z, daneGry);
  } else {
    const etykieta = (i) => ((z.etykiety ?? 'nazwy') === 'nazwy' ? z.pary[i].karta : `opis-${i}`);
    for (let i = 0; i < z.pary.length; i++) {
      await strona.locator(`.bank .etykieta[data-element="${etykieta(i < 2 ? 1 - i : i)}"]`).click();
      await strona.locator(`.pole-celu[data-cel="para-${i}"]`).first().click();
    }
    await strona.locator('.tacka__akcje button', { hasText: 'Sprawdź' }).click();
  }
  await strona.locator('.misja__wynik:not([hidden])').waitFor();
  const tekst = await strona.locator('body').innerText();
  if (/\b(null|undefined|NaN)\b/.test(tekst)) bledy.push(`${z.id}: na ekranie jest napis „null”, „undefined” albo „NaN”`);
  return z;
}

// Przechodzi całą misję; zwraca tytuły wyników kolejnych zadań.
async function przejdzMisje(strona, idSwiata, idMisji) {
  await strona.goto(`${adres}#/swiat/${idSwiata}/misja/${idMisji}`);
  const sw = swiaty.find((s) => s.id === idSwiata);
  const misja = sw.misje.find((m) => m.id === idMisji) ?? (sw.wyklad?.id === idMisji ? sw.wyklad : null);
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
  const status = (id) => strona.locator(`.swiat[data-swiat="${id}"]`).getAttribute('data-status');
  sprawdz((await strona.locator('.swiat').count()) === 6, 'mapa pokazuje sześć światów');
  sprawdz((await status(1)) === 'otwarty', 'świat 1 jest otwarty');
  for (const id of [2, 3, 4, 5, 6]) sprawdz((await status(id)) === 'zablokowany', `świat ${id} czeka na bossa poprzedniego świata`);
  sprawdz((await strona.locator('.swiat[data-status="w-budowie"]').count()) === 0, 'żaden świat nie jest w budowie');
  sprawdz((await strona.locator('.mapa__autor').textContent()) === '© 2026 Robert Gutkowski', 'mapa ma oznaczenie autorstwa');
  await zrzut(strona, '01-mapa-tablet-poziomo');

  await strona.locator('.swiat[data-swiat="2"] .swiat__przycisk').click();
  sprawdz(
    (await strona.locator('.powiadomienie').first().textContent()).includes('po pokonaniu bossa w świecie „Alfabet życia”'),
    'zablokowany świat mówi, po którym bossie się otworzy',
  );

  // Świat 1: wstęp, wszystkie misje i boss, który otwiera świat 2.
  {
    const sw = swiaty.find((s) => s.id === 1);
    await strona.locator('.swiat[data-swiat="1"] .swiat__przycisk').click();
    await strona.locator('.swiat-wstep').waitFor();
    sprawdz((await strona.locator('h1').textContent()) === 'Alfabet życia', 'wstęp świata 1');
    sprawdz((await strona.locator('.misja-karta').count()) === 6, 'świat 1 ma sześć misji');
    sprawdz((await strona.locator('.sluchowisko').count()) === 0, 'bez nagrania nie ma odtwarzacza słuchowiska');
    sprawdz((await strona.locator('.wyklad-wejscie[data-stan="zamkniety"]').count()) === 1, 'wykład Profesora Pomyłki zamknięty przed ukończeniem misji');
    await zrzut(strona, '01a-swiat-1');
    const zrzutyMisji1 = { 's1-sklad': '01b-sklad-ciala', 's1-ratuj': '01c-ratuj-organizm', 's1-sortownia': '01d-sortownia' };
    for (const m of sw.misje) {
      const tytuly = await przejdzMisje(strona, 1, m.id);
      sprawdz(tytuly.every((t) => t === 'Wszystko od razu dobrze!'), `świat 1, misja „${m.nazwa}”: od razu dobrze (wyzwania: ${tytuly.length})`);
      if (zrzutyMisji1[m.id]) await zrzut(strona, zrzutyMisji1[m.id]);
    }
    await strona.goto(`${adres}#/swiat/1`);
    sprawdz((await strona.locator('a.wyklad-wejscie').count()) === 1, 'po misjach świata 1 wykład Profesora Pomyłki jest otwarty');
    {
      const tytuly = await przejdzMisje(strona, 1, sw.wyklad.id);
      sprawdz(tytuly.every((t) => t === 'Wszystko od razu dobrze!'), `świat 1, wykład Profesora Pomyłki: od razu dobrze (wyzwania: ${tytuly.length})`);
      await zrzut(strona, '01d2-wyklad');
    }
    await strona.goto(`${adres}#/swiat/1`);
    await strona.locator('a.boss-wejscie').click();
    await strona.locator('.boss-karta button', { hasText: 'Zaczynamy' }).click();
    for (let i = 0; i < sw.boss.wyzwania.length; i++) {
      await rozwiazBiezace(strona);
      await strona.locator('.misja__wynik .przycisk--dalej').click();
    }
    await strona.locator('.boss-karta--wygrana').waitFor();
    const tekstWygranej = await strona.locator('.boss-karta--wygrana').textContent();
    sprawdz(tekstWygranej.includes('Bibliotekarz pokonany!'), 'boss świata 1 („Bibliotekarz”) pokonany');
    sprawdz(tekstWygranej.includes('Otwarty nowy świat: Miasto, którego nie widać'), 'po bossie świata 1 otwiera się świat 2');
    await zrzut(strona, '01e-boss-swiata-1');
  }

  // Nowa sesja: podsumowanie wyprawy liczy dalej tylko wyzwania świata 2.
  await strona.goto(adres);
  await strona.reload();
  await strona.locator('.mapa__swiaty').waitFor();
  sprawdz((await status(1)) === 'pokonany', 'świat 1 oznaczony jako pokonany');
  sprawdz((await status(2)) === 'otwarty', 'świat 2 otwarty po bossie świata 1');
  sprawdz((await status(3)) === 'zablokowany', 'świat 3 czeka na bossa świata 2');
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

  // Wykład świata 2: dwa prawdziwe słowa zakwestionowane z rzędu dają podpowiedź.
  {
    const wyklad = zadaniePoId.get('s2-wyklad-1').wyklad.filter((f) => typeof f !== 'string');
    const prawdziwe = wyklad.flatMap((s, i) => (s.poprawka === undefined ? [i] : []));
    await strona.goto(`${adres}#/swiat/2/misja/s2-wyklad`);
    await strona.locator('.wykrywacz__tekst').waitFor();
    sprawdz((await strona.locator('.komunikat').textContent()).includes('W wykładzie są 2 bzdury.'), 'wykład mówi, ile jest bzdur');
    await strona.locator(`.wykrywacz__slowo[data-slowo="${prawdziwe[0]}"]`).click();
    sprawdz((await strona.locator('.komunikat').textContent()).includes('to nie bzdura'), 'prawdziwe słowo: komunikat z przyczyną');
    await strona.locator(`.wykrywacz__slowo[data-slowo="${prawdziwe[1]}"]`).click();
    sprawdz((await strona.locator('.wykrywacz__slowo--podpowiedz').count()) === 1, 'po dwóch pomyłkach podpowiedź wskazuje bzdurę');
    await zrzut(strona, '08a-wyklad-podpowiedz');
    await rozwiazBiezace(strona);
    const tytul = (await strona.locator('.misja__wynik-tytul').textContent()).trim();
    sprawdz(tytul === `Od razu dobrze: ${wyklad.length - 3} z ${wyklad.length}`, `wykład: pomyłki i podpowiedź obniżają wynik (${tytul})`);
    sprawdz((await strona.locator('.wykrywacz__poprawione').count()) === 2, 'poprawione bzdury zostają w tekście obok poprawek');
    await strona.locator('.misja__wynik button', { hasText: 'Dalej' }).click();
    await rozwiazBiezace(strona);
    sprawdz((await strona.locator('.misja__wynik-tytul').textContent()).trim() === 'Wszystko od razu dobrze!', 'drugi wykład świata 2 od razu dobrze');
  }

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

  // Światy 3-6: pozostałe misje i bossowie; kolejny świat otwiera się po bossie poprzedniego.
  const przejdzione = new Set(['s3-twierdza', 's3-detektyw', 's3-konstruktor']);
  const zrzutyMisji = {
    's4-laboratorium': '16a-laboratorium',
    's5-lancuchy': '16b-lancuchy',
    's5-trawienie': '16c-rozbiorka',
    's5-las': '16d-las',
    's6-sprint': '16e-sprint',
    's6-doba': '16f-doba',
  };
  const nastepnySwiat = { 3: 'Kuchnia zasilana światłem', 4: 'Wielka uczta', 5: 'Ogień bez płomienia' };
  for (const idSwiata of [3, 4, 5, 6]) {
    const sw = swiaty.find((s) => s.id === idSwiata);
    for (const m of sw.misje.filter((x) => !przejdzione.has(x.id))) {
      const tytuly = await przejdzMisje(strona, idSwiata, m.id);
      sprawdz(tytuly.every((t) => t === 'Wszystko od razu dobrze!'), `świat ${idSwiata}, misja „${m.nazwa}”: od razu dobrze (wyzwania: ${tytuly.length})`);
      if (zrzutyMisji[m.id]) await zrzut(strona, zrzutyMisji[m.id]);
    }
    {
      const tytuly = await przejdzMisje(strona, idSwiata, sw.wyklad.id);
      sprawdz(tytuly.every((t) => t === 'Wszystko od razu dobrze!'), `świat ${idSwiata}, wykład Profesora Pomyłki: od razu dobrze (wyzwania: ${tytuly.length})`);
    }
    await strona.goto(`${adres}#/swiat/${idSwiata}`);
    await strona.locator('a.boss-wejscie').click();
    await strona.locator('.boss-karta button', { hasText: 'Zaczynamy' }).click();
    for (let i = 0; i < sw.boss.wyzwania.length; i++) {
      await rozwiazBiezace(strona);
      await strona.locator('.misja__wynik .przycisk--dalej').click();
    }
    await strona.locator('.boss-karta--wygrana').waitFor();
    const tekstWygranej = await strona.locator('.boss-karta--wygrana').textContent();
    sprawdz(tekstWygranej.includes(`${sw.boss.nazwa} pokonany!`), `boss świata ${idSwiata} („${sw.boss.nazwa}”) pokonany`);
    if (nastepnySwiat[idSwiata]) {
      sprawdz(tekstWygranej.includes(`Otwarty nowy świat: ${nastepnySwiat[idSwiata]}`), `po bossie świata ${idSwiata} otwiera się świat „${nastepnySwiat[idSwiata]}”`);
    }
    if (idSwiata === 5) await zrzut(strona, '16g-boss-swiata-5');
  }
  await strona.goto(adres);
  await strona.locator('.mapa__swiaty').waitFor();
  for (const id of [1, 2, 3, 4, 5, 6]) {
    sprawdz((await status(id)) === 'pokonany', `świat ${id} oznaczony jako pokonany`);
  }
  await zrzut(strona, '16h-mapa-po-bossach');
  await strona.goto(`${adres}#/atlas`);
  await strona.locator('.ekran--atlas').waitFor();
  const atlas = await strona.locator('.ekran--atlas').textContent();
  // Każdą kartę da się odkryć w misjach, więc po przejściu wszystkich misji odkryte są wszystkie.
  const [odkryte, wszystkieKarty] = atlas.match(/Odkryte karty: (\d+) z (\d+)/).slice(1).map(Number);
  sprawdz(odkryte === wszystkieKarty, `atlas: odkryte wszystkie karty (${odkryte} z ${wszystkieKarty})`);
  sprawdz(
    ['Pierwiastki', 'Związki chemiczne', 'Procesy', 'Substancje', 'Sposoby zdobywania pokarmu', 'Organizmy'].every((g) => atlas.includes(g)),
    'atlas ma grupy pierwiastków, związków, procesów, substancji, sposobów zdobywania pokarmu i organizmów',
  );
  for (const k of ['magnez', 'bialka', 'fotosynteza', 'trawienie', 'jelen', 'organizmy-odzywiajace-sie-szczatkami', 'fermentacja-mlekowa', 'drozdze', 'woda-wapienna']) {
    sprawdz((await strona.locator(`.karta-atlasu[data-karta="${k}"]`).getAttribute('data-poziom')) !== 'nieodkryta', `atlas: karta „${k}” odkryta`);
  }
  await strona.locator('.karta-atlasu[data-karta="hiena-cetkowana"]').click();
  sprawdz(
    (await strona.locator('dialog.karta-szczegoly .karta-szczegoly__uwaga').textContent()).includes('sprawnym drapieżnikiem'),
    'karta hieny cętkowanej ma dopisek o uproszczeniu z podręcznika',
  );
  await zrzut(strona, '16i-atlas-uwaga');
  await strona.locator('dialog.karta-szczegoly button', { hasText: 'Zamknij' }).click();
  await strona.goto(`${adres}#/mikroskop`);
  await strona.locator('.ekran--mikroskop').waitFor();
  sprawdz(!(await strona.locator('.mikroskop__poziomy button', { hasText: '10 000' }).isDisabled()), 'mikroskop: 10 000 razy otwarte po bossie świata 3');

  // Próbny sprawdzian: otwarty po bossach wszystkich światów. Wszystko dobrze poza tematem 11,
  // w którym dwie pary są zamienione: 28 z 29 punktów i odnośniki do misji kart z błędem.
  await strona.goto(`${adres}#/baza`);
  await strona.locator('.ekran--baza').waitFor();
  sprawdz(
    (await strona.locator('.stanowisko[data-stanowisko="sprawdzian"] .stanowisko__stan').textContent()).includes('Gotowy'),
    'baza: próbny sprawdzian gotowy po pokonaniu wszystkich bossów',
  );
  await strona.locator('.stanowisko[data-stanowisko="sprawdzian"] a').click();
  await strona.locator('.ekran--sprawdzian .boss-karta button', { hasText: 'Zaczynamy' }).click();
  let zBledem = null;
  for (let i = 0; i < 14; i++) {
    if (i === 10) zBledem = await przyporzadkujZBledem(strona);
    else await rozwiazBiezace(strona);
    if (i === 0) await zrzut(strona, '16j-sprawdzian-zadanie');
    if (i === 10) await zrzut(strona, '16j-sprawdzian-blad');
    await strona.locator('.misja__wynik .przycisk--dalej').click();
  }
  await strona.locator('.sprawdzian-wynik').waitFor();
  sprawdz((await strona.locator('.sprawdzian-wynik h1').textContent()) === 'Wynik: 28 z 29 punktów', 'próbny sprawdzian: 28 z 29 punktów przy dwóch zamienionych parach w jednym zadaniu');
  const wierszeWyniku = strona.locator('.sprawdzian__tabela tbody tr');
  const pelneTematy = await wierszeWyniku.evaluateAll((wiersze) => wiersze.map((w) => w.dataset.pelne));
  sprawdz(
    pelneTematy.filter((p) => p === 'true').length === 13 && pelneTematy[10] === 'false',
    'próbny sprawdzian: pełne punkty za 13 tematów, brak tylko w temacie 11',
  );
  const misjeSwiata5 = swiaty.find((s) => s.id === 5).misje;
  const oczekiwaneOdnosniki = misjeDoPoprawy(sprawdzian[10], { karty: zBledem.pary.slice(0, 2).map((p) => ({ karta: p.karta, odRazu: false })) }).map(
    (id) => `Poćwicz: ${misjeSwiata5.find((m) => m.id === id).nazwa}`,
  );
  const odnosniki = await wierszeWyniku.nth(10).locator('.sprawdzian__cwicz').allTextContents();
  sprawdz(
    JSON.stringify(odnosniki) === JSON.stringify(oczekiwaneOdnosniki),
    `próbny sprawdzian: odnośniki do misji przy temacie z błędem (${zBledem.id}: ${odnosniki.join(', ')})`,
  );
  await zrzut(strona, '16k-sprawdzian-wynik');

  // Domowe laboratorium: oznaczenie doświadczenia
  await strona.goto(`${adres}#/laboratorium`);
  await strona.locator('[data-doswiadczenie="chleb"] summary').click();
  sprawdz((await strona.locator('[data-doswiadczenie="chleb"] .lab-dom__bezpieczenstwo').isVisible()), 'laboratorium: uwaga o bezpieczeństwie przy doświadczeniu');
  await strona.locator('[data-doswiadczenie="chleb"] button', { hasText: 'Zrobione z dorosłym' }).click();
  sprawdz((await strona.locator('.lab-dom__licznik').textContent()) === 'Zrobione: 1 z 9.', 'laboratorium: doświadczenie oznaczone jako zrobione');
  await zrzut(strona, '16l-laboratorium');

  // Panel rodzica: wynik sprawdzianu, laboratorium i ustawienie dźwięku
  await otworzPanel(strona);
  const panelPoSprawdzianie = await strona.locator('.ekran--rodzic').textContent();
  sprawdz(panelPoSprawdzianie.includes('28 z 29') && panelPoSprawdzianie.includes('Próbny sprawdzian'), 'panel: wynik próbnego sprawdzianu');
  sprawdz(panelPoSprawdzianie.includes('11. Typy organizmów cudzożywnych: 50%'), 'panel: najsłabszy temat próbnego sprawdzianu');
  sprawdz(panelPoSprawdzianie.includes('Słodki chleb'), 'panel: zrobione doświadczenie z domowego laboratorium');
  sprawdz(await strona.locator('#dzwiek').isChecked(), 'panel: dźwięki domyślnie włączone');
  await strona.locator('#dzwiek').click();
  sprawdz(!(await strona.locator('#dzwiek').isChecked()), 'panel: dźwięki można wyłączyć');
  await strona.locator('#dzwiek').click();
  await zrzut(strona, '16m-panel-po-sprawdzianie');

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
  await strona.goto(`${adres}#/swiat/6/misja/s6-sprint`);
  await strona.locator('.sprint__bieznia').waitFor();
  sprawdz(await strona.locator('.sprint__akcja').isVisible(), 'offline działa też sprint w świecie 6');
  await strona.goto(`${adres}#/swiat/5/misja/s5-lancuchy`);
  await strona.locator('.lancuch__plansza').waitFor();
  sprawdz((await strona.locator('.lancuch__opcja svg').count()) > 0, 'offline działają też łańcuchy pokarmowe z rysunkami');
  await strona.goto(`${adres}#/laboratorium`);
  await strona.locator('.lab-dom__lista').waitFor();
  sprawdz((await strona.locator('.lab-dom__doswiadczenie').count()) === 9, 'offline działa też domowe laboratorium');
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
  // Ustawienie z panelu rodzica „odblokuj wszystkie gotowe światy”: schemat komórki jest w świecie 2.
  await strona.evaluate((klucz) => localStorage.setItem(klucz, JSON.stringify({ wersja: 2, ustawienia: { odblokujWszystkie: true } })), KLUCZ);
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
  // Ustawienie z panelu rodzica „odblokuj wszystkie gotowe światy”, żeby obejrzeć misje wszystkich światów;
  // pokonany boss świata 2 otwiera wykład Profesora Pomyłki w tym świecie.
  await strona.evaluate((klucz) => localStorage.setItem(klucz, JSON.stringify({ wersja: 2, ustawienia: { odblokujWszystkie: true }, bossowie: [2] })), KLUCZ);
  await wejdzDoMisji(strona);
  const zrzutyTelefonu = {
    'skład ciała': '19a-telefon-sklad-ciala',
    'ratuj organizm': '19b-telefon-ratuj-organizm',
    sortownia: '19c-telefon-sortownia',
    'łańcuchy pokarmowe': '19d-telefon-lancuchy',
    'trawienie jako rozbiórka': '19e-telefon-rozbiorka',
    'las bez sprzątaczy': '19f-telefon-las',
    'wykład Profesora Pomyłki': '19g-telefon-wyklad',
  };
  for (const [adresEkranu, nazwa] of [
    [null, 'misja'],
    ['#/swiat/1/misja/s1-alfabet', 'alfabet życia'],
    ['#/swiat/1/misja/s1-sklad', 'skład ciała'],
    ['#/swiat/1/misja/s1-woda', 'woda na pięciu etatach'],
    ['#/swiat/1/misja/s1-ratuj', 'ratuj organizm'],
    ['#/swiat/1/misja/s1-sortownia', 'sortownia'],
    ['#/swiat/2/misja/s2-mikroskop', 'klasyfikacja ze sceną'],
    ['#/swiat/2/misja/s2-budowa-miasta', 'budowa miasta'],
    ['#/swiat/2/misja/s2-wyklad', 'wykład Profesora Pomyłki'],
    ['#/swiat/4/misja/s4-przepis', 'przepis fotosyntezy'],
    ['#/swiat/4/misja/s4-drogi', 'trzy drogi glukozy'],
    ['#/swiat/4/misja/s4-laboratorium', 'laboratorium fotosyntezy'],
    ['#/swiat/4/misja/s4-ogniwo', 'najsłabsze ogniwo'],
    ['#/swiat/4/misja/s4-projektant', 'projektant doświadczeń'],
    ['#/swiat/5/misja/s5-uczta', 'wielka uczta'],
    ['#/swiat/5/misja/s5-atlas', 'atlas Bieszczadów'],
    ['#/swiat/5/misja/s5-lancuchy', 'łańcuchy pokarmowe'],
    ['#/swiat/5/misja/s5-trawienie', 'trawienie jako rozbiórka'],
    ['#/swiat/5/misja/s5-las', 'las bez sprzątaczy'],
    ['#/swiat/6/misja/s6-sprint', 'sprint'],
    ['#/swiat/6/misja/s6-doba', 'liść przez dobę'],
    ['#/swiat/6/misja/s6-lustro', 'lustro'],
    ['#/swiat/6/misja/s6-tabela', 'tabela porównawcza'],
    ['#/swiat/6/misja/s6-woda-wapienna', 'woda wapienna'],
    ['#/atlas', 'atlas'],
    ['#/laboratorium', 'domowe laboratorium'],
    ['#/sprawdzian', 'próbny sprawdzian'],
    ['#/mikroskop', 'mikroskop'],
    ['#/baza', 'baza'],
  ]) {
    if (adresEkranu) {
      await strona.goto(`${adres}${adresEkranu}`);
      await strona.waitForTimeout(400);
    }
    if (adresEkranu?.includes('/misja/')) {
      await strona.locator('.misja__obszar .zadanie').first().waitFor();
    }
    const szerokosc = await strona.evaluate(() => document.documentElement.scrollWidth);
    sprawdz(szerokosc <= 390, `telefon, ${nazwa}: brak przewijania w poziomie (${szerokosc}px)`);
    if (zrzutyTelefonu[nazwa]) await zrzut(strona, zrzutyTelefonu[nazwa]);
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

// Zadania świata 5: „Wielka uczta” (TRESCI.md, sekcja 2.5).
//
// Typy zadań i pola: SPEC.md, sekcja 5; opis pól przy komponentach w js/components.
// karta: id karty atlasu (organizm, sposób zdobywania pokarmu, pojęcie).
// Zadania z przedrostkiem s5-boss- należą tylko do puli bossa.
// Luki: każda luka ma jednoznaczną rolę w zdaniu (bez równorzędnych słów w sąsiednich lukach).
// Klasyfikacje organizmów używają tylko kategorii z TRESCI.md, sekcja 7 (bez kategorii pomocniczych).

const ZJADAJACY = [
  { id: 'roslinozerca', nazwa: 'roślinożercy', karta: 'roslinozerca' },
  { id: 'drapieznik', nazwa: 'drapieżniki', karta: 'drapieznik' },
  { id: 'padlinozerca', nazwa: 'padlinożercy', karta: 'padlinozerca' },
  { id: 'wszystkozerca', nazwa: 'wszystkożercy', karta: 'wszystkozerca' },
];

const PASOZYTY = [
  { id: 'zewnetrzny', nazwa: 'pasożyty zewnętrzne', karta: 'pasozyt-zewnetrzny' },
  { id: 'wewnetrzny', nazwa: 'pasożyty wewnętrzne', karta: 'pasozyt-wewnetrzny' },
  { id: 'roslina', nazwa: 'rośliny pasożytnicze', karta: 'roslina-pasozytnicza' },
  { id: 'polpasozyt', nazwa: 'półpasożyty', karta: 'polpasozyt' },
];

// Elementy klasyfikacji z wyjaśnieniami z TRESCI.md, sekcja 2.5.
const O = {
  zubr: { tekst: 'żubr', kategoria: 'roslinozerca', karta: 'zubr', wyjasnienie: 'Żubr żywi się pokarmem roślinnym.' },
  zebra: { tekst: 'zebra', kategoria: 'roslinozerca', karta: 'zebra', wyjasnienie: 'Zebra zjada liście i łodygi traw.' },
  wiewiorka: { tekst: 'wiewiórka pospolita', kategoria: 'roslinozerca', karta: 'wiewiorka-pospolita', wyjasnienie: 'Wiewiórka pospolita żywi się owocami i nasionami.' },
  gil: { tekst: 'gil', kategoria: 'roslinozerca', karta: 'gil', wyjasnienie: 'Gil żywi się nasionami, czyli pokarmem roślinnym.' },
  zieba: { tekst: 'zięba', kategoria: 'roslinozerca', karta: 'zieba', wyjasnienie: 'Zięba żywi się nasionami, czyli pokarmem roślinnym.' },
  rusalka: { tekst: 'rusałka pokrzywnik', kategoria: 'roslinozerca', karta: 'rusalka-pokrzywnik', wyjasnienie: 'Rusałka pokrzywnik pije nektar kwiatów, czyli żywi się pokarmem roślinnym.' },
  koliber: { tekst: 'koliber', kategoria: 'roslinozerca', karta: 'koliber', wyjasnienie: 'Kolibry żywią się nektarem kwiatów.' },
  nektarnik: { tekst: 'nektarnik', kategoria: 'roslinozerca', karta: 'nektarnik', wyjasnienie: 'Nektarniki żywią się nektarem kwiatów.' },
  nietoperz: { tekst: 'nietoperz żywiący się nektarem', kategoria: 'roslinozerca', karta: 'nietoperz', wyjasnienie: 'Niektóre nietoperze żywią się nektarem kwiatów, czyli pokarmem roślinnym.' },
  los: { tekst: 'łoś', kategoria: 'roslinozerca', karta: 'los', wyjasnienie: 'Dorosły łoś zjada około 50 kg roślin na dobę.' },
  jelen: { tekst: 'jeleń', kategoria: 'roslinozerca', karta: 'jelen', wyjasnienie: 'Jeleń żywi się pokarmem roślinnym.' },
  antylopa: { tekst: 'antylopa', kategoria: 'roslinozerca', karta: 'antylopa', wyjasnienie: 'Antylopy żywią się pokarmem roślinnym.' },
  bawol: { tekst: 'bawół', kategoria: 'roslinozerca', karta: 'bawol', wyjasnienie: 'Bawoły żywią się pokarmem roślinnym.' },
  orzesznica: { tekst: 'orzesznica', kategoria: 'roslinozerca', karta: 'orzesznica', wyjasnienie: 'Orzesznica żywi się pokarmem roślinnym.' },
  orzel: { tekst: 'orzeł przedni', kategoria: 'drapieznik', karta: 'orzel-przedni', wyjasnienie: 'Orzeł przedni poluje na lisy i zające i je zabija.' },
  wilk: { tekst: 'wilk', kategoria: 'drapieznik', karta: 'wilk', wyjasnienie: 'Wilk poluje na ofiary i je zabija.' },
  rys: { tekst: 'ryś', kategoria: 'drapieznik', karta: 'rys', wyjasnienie: 'Ryś poluje na ofiary i je zabija.' },
  pajak: { tekst: 'pająk', kategoria: 'drapieznik', karta: 'pajak', wyjasnienie: 'Pająk poluje na ofiary i je zabija.' },
  zaba: { tekst: 'żaba', kategoria: 'drapieznik', karta: 'zaba', wyjasnienie: 'Żaba poluje na ofiary i je zabija.' },
  waz: { tekst: 'wąż', kategoria: 'drapieznik', karta: 'waz', wyjasnienie: 'Wąż poluje na ofiary i je zabija.' },
  sep: { tekst: 'sęp', kategoria: 'padlinozerca', karta: 'sep', wyjasnienie: 'Sęp żywi się ciałami martwych zwierząt.' },
  hiena: { tekst: 'hiena cętkowana', kategoria: 'padlinozerca', karta: 'hiena-cetkowana', wyjasnienie: 'Hiena cętkowana żywi się ciałami martwych zwierząt.' },
  niedzwiedz: { tekst: 'niedźwiedź brunatny', kategoria: 'wszystkozerca', karta: 'niedzwiedz-brunatny', wyjasnienie: 'Niedźwiedź brunatny zjada ryby, jelenie, rośliny, grzyby, ptasie jaja i drobne zwierzęta.' },
  dzik: { tekst: 'dzik', kategoria: 'wszystkozerca', karta: 'dzik', wyjasnienie: 'Dzik zjada pokarm roślinny i zwierzęcy.' },
  lis: { tekst: 'lis', kategoria: 'wszystkozerca', karta: 'lis', wyjasnienie: 'Lis zjada pokarm roślinny i zwierzęcy.' },
  wrobel: { tekst: 'wróbel', kategoria: 'wszystkozerca', karta: 'wrobel', wyjasnienie: 'Wróbel zimą zjada nasiona, a latem także owady.' },
  czlowiek: { tekst: 'człowiek', kategoria: 'wszystkozerca', karta: 'czlowiek', wyjasnienie: 'Człowiek zjada pokarm roślinny i zwierzęcy.' },
  kleszcz: { tekst: 'kleszcz', kategoria: 'zewnetrzny', karta: 'kleszcz', wyjasnienie: 'Kleszcz żyje na powierzchni ciała żywiciela: przebija skórę i odżywia się krwią.' },
  wesz: { tekst: 'wesz', kategoria: 'zewnetrzny', karta: 'wesz', wyjasnienie: 'Wesz żyje na powierzchni ciała żywiciela.' },
  pchla: { tekst: 'pchła', kategoria: 'zewnetrzny', karta: 'pchla', wyjasnienie: 'Pchła żyje na powierzchni ciała żywiciela.' },
  tasiemiec: { tekst: 'tasiemiec uzbrojony', kategoria: 'wewnetrzny', karta: 'tasiemiec-uzbrojony', wyjasnienie: 'Tasiemiec uzbrojony żyje w jelicie człowieka.' },
  owsik: { tekst: 'owsik ludzki', kategoria: 'wewnetrzny', karta: 'owsik-ludzki', wyjasnienie: 'Owsik ludzki żyje wewnątrz ciała żywiciela.' },
  glista: { tekst: 'glista ludzka', kategoria: 'wewnetrzny', karta: 'glista-ludzka', wyjasnienie: 'Glista ludzka żyje wewnątrz ciała żywiciela.' },
  kanianka: { tekst: 'kanianka pospolita', kategoria: 'roslina', karta: 'kanianka-pospolita', wyjasnienie: 'Kanianka pospolita nie ma chlorofilu i wszystkie potrzebne substancje pobiera od żywiciela za pomocą ssawek.' },
  zaraza: { tekst: 'zaraza żółta', kategoria: 'roslina', karta: 'zaraza-zolta', wyjasnienie: 'Zaraza żółta nie ma chlorofilu i wszystkie potrzebne substancje pobiera od żywiciela, np. podbiału.' },
  jemiola: { tekst: 'jemioła pospolita', kategoria: 'polpasozyt', karta: 'jemiola-pospolita', wyjasnienie: 'Jemioła pospolita ma chlorofil i sama wytwarza substancje pokarmowe, ale wodę i sole mineralne pobiera od żywiciela.' },
};

// karty: dla wybranych elementów inna karta atlasu niż organizm, np. pojęcie, które element ćwiczy.
const klasyfikacja = (id, tresc, kategorie, klucze, wyjasnienie, karty = {}) => ({
  id,
  swiat: 5,
  typ: 'klasyfikacja',
  tresc,
  kategorie,
  elementy: klucze.map((k) => (karty[k] ? { ...O[k], karta: karty[k] } : O[k])),
  wyjasnienie,
  zrodlo: '2.5',
});

const OPISY = {
  roslinozerca: 'zwierzę żywiące się pokarmem roślinnym',
  drapieznik: 'mięsożerca, który poluje na ofiary i je zabija',
  padlinozerca: 'mięsożerca żywiący się ciałami martwych zwierząt',
  wszystkozerca: 'zwierzę zjadające pokarm roślinny i zwierzęcy',
  pasozyt: 'organizm pobierający składniki pokarmowe od żywego organizmu, zwykle bez zabijania go',
  'organizmy-odzywiajace-sie-szczatkami': 'drobne zwierzęta, bakterie i grzyby rozkładające szczątki innych organizmów',
  'pasozyt-zewnetrzny': 'pasożyt żyjący na powierzchni ciała żywiciela',
  'pasozyt-wewnetrzny': 'pasożyt żyjący wewnątrz ciała żywiciela',
  'roslina-pasozytnicza': 'roślina bez chlorofilu, która pobiera od żywiciela wszystkie potrzebne substancje za pomocą ssawek',
  polpasozyt: 'roślina z chlorofilem, która sama wytwarza substancje pokarmowe, ale wodę i sole mineralne pobiera od żywiciela',
  miesozerca: 'zwierzę żywiące się innymi zwierzętami',
  zywiciel: 'organizm, od którego pasożyt pobiera składniki pokarmowe',
};

const przyporzadkowanie = (id, tresc, karty, dystraktory, wyjasnienie, etykiety = 'nazwy') => ({
  id,
  swiat: 5,
  typ: 'przyporzadkowanie',
  tresc,
  etykiety,
  pary: karty.map((karta) => ({ karta, opis: OPISY[karta] })),
  dystraktory,
  wyjasnienie,
  zrodlo: '3',
});

export default [
  // ---------- Misja „Wielka uczta” ----------
  {
    id: 's5-cudzozywne-klas',
    swiat: 5,
    typ: 'klasyfikacja',
    tresc: 'Kto sam wytwarza pokarm, a kto pobiera gotowy pokarm z otoczenia? Przyporządkuj organizmy.',
    kategorie: [
      { id: 'samozywny', nazwa: 'organizmy samożywne', karta: 'organizm-samozywny' },
      { id: 'cudzozywny', nazwa: 'organizmy cudzożywne', karta: 'organizm-cudzozywny' },
    ],
    elementy: [
      { tekst: 'topola', kategoria: 'samozywny', karta: 'topola', wyjasnienie: 'Topola jest rośliną, a rośliny same wytwarzają pokarm.' },
      { tekst: 'podbiał', kategoria: 'samozywny', karta: 'podbial', wyjasnienie: 'Podbiał jest rośliną, a rośliny same wytwarzają pokarm.' },
      { tekst: 'sinice', kategoria: 'samozywny', karta: 'sinice', wyjasnienie: 'Sinice należą do nielicznych bakterii samożywnych.' },
      { tekst: 'żubr', kategoria: 'cudzozywny', karta: 'zubr', wyjasnienie: 'Zwierzęta, np. żubr, pobierają gotowy pokarm z otoczenia.' },
      { tekst: 'pleśniak biały', kategoria: 'cudzozywny', karta: 'plesniak-bialy', wyjasnienie: 'Grzyby, np. pleśniak biały, są cudzożywne.' },
      { tekst: 'orzeł przedni', kategoria: 'cudzozywny', karta: 'orzel-przedni', wyjasnienie: 'Zwierzęta, np. orzeł przedni, pobierają gotowy pokarm z otoczenia.' },
    ],
    wyjasnienie:
      'Organizmy cudzożywne nie wytwarzają pokarmu, tylko pobierają gotowy pokarm z otoczenia: zwierzęta, grzyby, większość bakterii i niektóre protisty. Samożywne są rośliny, niektóre protisty i nieliczne bakterie.',
    zrodlo: '2.5',
  },
  {
    id: 's5-luki-cudzozywnosc-1',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o cudzożywności.',
    tekst:
      'Organizmy cudzożywne nie wytwarzają pokarmu, tylko pobierają [gotowy|organizm-cudzozywny] pokarm z otoczenia. Należą do nich zwierzęta, [grzyby|organizm-cudzozywny], większość bakterii i niektóre protisty. Pokarm zawiera związki [złożone|trawienie|Cukry, białka i tłuszcze z pokarmu to związki złożone.], które organizm może wykorzystać dopiero po rozłożeniu na związki [proste|zwiazki-proste|Trawienie rozkłada związki złożone na związki proste.]. Ten rozkład zachodzi podczas [trawienia|trawienie].',
    dystraktory: [
      { tekst: 'rośliny', wyjasnienie: 'Rośliny same wytwarzają pokarm: są samożywne.' },
      { tekst: 'fotosyntezy', wyjasnienie: 'W fotosyntezie roślina wytwarza pokarm; złożone związki z pokarmu rozkłada trawienie.' },
    ],
    wyjasnienie:
      'Organizmy cudzożywne pobierają gotowy pokarm. Złożone związki z pokarmu (cukry, białka, tłuszcze) organizm może wykorzystać dopiero po rozłożeniu na związki proste, czyli po trawieniu.',
    zrodlo: '2.5',
  },
  {
    id: 's5-pf-uczta-1',
    swiat: 5,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw fałszywe zdania.',
    zdania: [
      {
        tekst: 'Grzyby są organizmami samożywnymi.',
        prawda: false,
        karta: 'organizm-cudzozywny',
        poprawne: 'Grzyby są organizmami cudzożywnymi.',
        bledne: ['Grzyby same wytwarzają pokarm w chloroplastach.', 'Grzyby są roślinami samożywnymi.'],
        wyjasnienie: 'Grzyby pobierają gotowy pokarm z otoczenia.',
      },
      {
        tekst: 'Organizm może wykorzystać złożone związki z pokarmu dopiero po ich rozłożeniu na związki proste.',
        prawda: true,
        karta: 'zwiazki-proste',
        wyjasnienie: 'Ten rozkład zachodzi podczas trawienia.',
      },
      {
        tekst: 'Większość bakterii jest cudzożywna.',
        prawda: true,
        karta: 'organizm-cudzozywny',
        wyjasnienie: 'Tylko nieliczne bakterie, np. sinice, są samożywne.',
      },
      {
        tekst: 'Trawienie to wytwarzanie złożonych związków z prostych.',
        prawda: false,
        karta: 'trawienie',
        poprawne: 'Trawienie to rozkład złożonych związków z pokarmu na związki proste.',
        bledne: ['Trawienie to wytwarzanie pokarmu z dwutlenku węgla i wody.', 'Trawienie to rozkład związków prostych na złożone.'],
        wyjasnienie: 'Trawienie rozkłada cukry, białka i tłuszcze z pokarmu.',
      },
    ],
    wyjasnienie: 'Organizmy cudzożywne (zwierzęta, grzyby, większość bakterii, niektóre protisty) pobierają gotowy pokarm i trawią go, czyli rozkładają złożone związki na proste.',
    zrodlo: '2.5',
  },

  // ---------- Misja „Kto co je?” ----------
  {
    id: 's5-sorter-pokarm-1',
    swiat: 5,
    typ: 'sorter',
    tresc: 'Pokarm roślinny czy pokarm zwierzęcy? Rozdziel zdania.',
    kategorie: [
      { id: 'roslinny', nazwa: 'pokarm roślinny', karta: 'roslinozerca' },
      { id: 'zwierzecy', nazwa: 'pokarm zwierzęcy', karta: 'miesozerca' },
    ],
    zdania: [
      { tekst: 'Jest łatwo dostępny.', kategoria: 'roslinny', wyjasnienie: 'Pokarm roślinny jest łatwo dostępny, ale mało pożywny.' },
      { tekst: 'Jest mało pożywny, więc trzeba go zjadać dużo.', kategoria: 'roslinny', karta: 'los', wyjasnienie: 'Dorosły łoś zjada około 50 kg roślin na dobę, bo pokarm roślinny jest mało pożywny.' },
      { tekst: 'Jest trudny do strawienia z powodu celulozy.', kategoria: 'roslinny', karta: 'celuloza', wyjasnienie: 'Celuloza w ścianach komórkowych roślin utrudnia trawienie.' },
      { tekst: 'Do jego strawienia przydają się dłuższe przewody pokarmowe.', kategoria: 'roslinny', wyjasnienie: 'Przewody pokarmowe roślinożerców są dłuższe niż mięsożerców, bo pokarm roślinny trudno strawić.' },
      { tekst: 'Jest pożywny, ale trudniej go zdobyć.', kategoria: 'zwierzecy', wyjasnienie: 'Pokarm zwierzęcy jest pożywny, ale trudniej go zdobyć.' },
      { tekst: 'Do jego zdobycia przydają się ostre zęby i silne pazury.', kategoria: 'zwierzecy', karta: 'drapieznik', wyjasnienie: 'Mięsożercy mają ostre zęby lub dzioby i silne pazury.' },
      { tekst: 'Do jego zdobycia potrzebny jest dobry refleks.', kategoria: 'zwierzecy', karta: 'drapieznik', wyjasnienie: 'Dobry refleks i sprawność fizyczna to przystosowania mięsożerców.' },
      { tekst: 'Żywią się nim drapieżniki i padlinożercy.', kategoria: 'zwierzecy', karta: 'miesozerca', wyjasnienie: 'Drapieżniki i padlinożercy to mięsożercy: żywią się innymi zwierzętami.' },
    ],
    wyjasnienie: 'Pokarm roślinny jest łatwo dostępny, ale mało pożywny i trudny do strawienia. Pokarm zwierzęcy jest pożywny, ale trudniej go zdobyć.',
    zrodlo: '2.5',
  },
  {
    id: 's5-roslinozercy-luki',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o roślinożercach.',
    tekst:
      'Pokarm roślinny jest trudny do strawienia z powodu [celulozy|celuloza] w ścianach komórkowych. Dlatego przewody pokarmowe roślinożerców są [dłuższe|roslinozerca] niż mięsożerców. W przewodach pokarmowych niektórych roślinożerców, np. żubra, żyją bakterie i protisty, które wytwarzają enzymy trawiące [celulozę|zubr]. Pokarm roślinny jest mało pożywny, dlatego dorosły łoś zjada około [50 kg|los] roślin na dobę.',
    dystraktory: [
      { tekst: 'krótsze', wyjasnienie: 'Pokarm roślinny trudno strawić, więc przewody pokarmowe roślinożerców są dłuższe.' },
      { tekst: 'chityny', wyjasnienie: 'Chityna buduje ściany komórek grzybów. Ściany komórek roślinnych buduje celuloza.' },
    ],
    wyjasnienie: 'Celuloza utrudnia trawienie pokarmu roślinnego, dlatego roślinożercy mają dłuższe przewody pokarmowe, a niektórym pomagają bakterie i protisty.',
    zrodlo: '2.5',
  },
  {
    id: 's5-wszystkozercy-luki',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o wszystkożercach.',
    tekst:
      'Wszystkożercy zjadają pokarm roślinny i [zwierzęcy|wszystkozerca]. Mogą zmieniać pokarm zależnie od tego, co jest [dostępne|wszystkozerca]. Wróbel zimą zjada [nasiona|wrobel], a latem także owady. Pisklęta karmi larwami owadów, np. [gąsienicami|wrobel] motyli.',
    dystraktory: [
      { tekst: 'nektarem', wyjasnienie: 'Nektarem żywią się np. rusałka pokrzywnik i kolibry. Wróbel karmi pisklęta larwami owadów.' },
      { tekst: 'trujące', wyjasnienie: 'Wszystkożercy zmieniają pokarm zależnie od tego, co jest dostępne.' },
    ],
    wyjasnienie: 'Wszystkożercy zjadają pokarm roślinny i zwierzęcy. Wróbel zimą zjada nasiona, latem także owady, a pisklęta karmi gąsienicami motyli.',
    zrodlo: '2.5',
  },

  // ---------- Misja „Atlas Bieszczadów” ----------
  klasyfikacja(
    's5-atlas-klas-1',
    'Atlas Bieszczadów i sawanny: przyporządkuj zwierzęta do grup.',
    ZJADAJACY,
    ['zubr', 'wiewiorka', 'orzel', 'rys', 'sep', 'hiena', 'dzik', 'niedzwiedz'],
    'Roślinożercy żywią się pokarmem roślinnym, drapieżniki polują na ofiary i je zabijają, padlinożercy żywią się ciałami martwych zwierząt, a wszystkożercy zjadają pokarm roślinny i zwierzęcy.',
  ),
  przyporzadkowanie(
    's5-atlas-przyp-1',
    'Kto jest kim? Dopasuj nazwy do opisów.',
    ['roslinozerca', 'drapieznik', 'padlinozerca', 'wszystkozerca', 'pasozyt'],
    ['zywiciel'],
    'Drapieżniki i padlinożercy to mięsożercy. Wszystkożercy zjadają pokarm roślinny i zwierzęcy, a pasożyt pobiera składniki pokarmowe od żywego organizmu, zwykle go nie zabijając.',
  ),
  klasyfikacja(
    's5-atlas-klas-2',
    'Kto czym się żywi? Przyporządkuj zwierzęta do grup.',
    ZJADAJACY,
    ['zebra', 'gil', 'rusalka', 'wilk', 'zaba', 'sep', 'lis', 'wrobel', 'czlowiek'],
    'Zebra, gil i rusałka pokrzywnik to roślinożercy, wilk i żaba to drapieżniki, sęp to padlinożerca, a lis, wróbel i człowiek to wszystkożercy.',
  ),

  // ---------- Misja „Atlas świata” ----------
  klasyfikacja(
    's5-atlas-klas-3',
    'Atlas świata: przyporządkuj zwierzęta do grup.',
    ZJADAJACY.slice(0, 2).concat(ZJADAJACY[3]),
    ['antylopa', 'bawol', 'zieba', 'pajak', 'waz', 'rys', 'niedzwiedz', 'czlowiek'],
    'Antylopy, bawoły i zięby to roślinożercy, pająki, węże i rysie to drapieżniki, a niedźwiedź brunatny i człowiek to wszystkożercy.',
  ),
  klasyfikacja(
    's5-atlas-klas-4',
    'Atlas świata: przyporządkuj organizmy do grup.',
    [ZJADAJACY[0], ZJADAJACY[2], PASOZYTY[0], PASOZYTY[3]],
    ['koliber', 'nektarnik', 'nietoperz', 'orzesznica', 'los', 'hiena', 'sep', 'pchla', 'wesz', 'jemiola'],
    'Kolibry, nektarniki, niektóre nietoperze, orzesznica i łoś to roślinożercy, hiena cętkowana i sęp to padlinożercy, pchła i wesz to pasożyty zewnętrzne, a jemioła pospolita to półpasożyt.',
  ),

  // ---------- Misja „Łańcuchy pokarmowe” ----------
  {
    id: 's5-lancuchy-1',
    swiat: 5,
    typ: 'lancuch',
    tresc: 'Uczta w Bieszczadach i na sawannie: kto pasuje do luki w łańcuchu pokarmowym?',
    lancuchy: [
      {
        ogniwa: ['rosliny', null, 'niedzwiedz-brunatny'],
        opcje: [
          { karta: 'jelen', poprawna: true },
          { karta: 'orzel-przedni', wyjasnienie: 'Orzeł przedni jest drapieżnikiem: poluje na zwierzęta, a nie żywi się roślinami.' },
          { karta: 'sep', wyjasnienie: 'Sęp jest padlinożercą: żywi się ciałami martwych zwierząt, a nie roślinami.' },
          { karta: 'rys', wyjasnienie: 'Ryś jest drapieżnikiem: poluje na zwierzęta, a nie żywi się roślinami.' },
        ],
      },
      {
        ogniwa: ['rosliny', null, 'orzel-przedni'],
        opcje: [
          { karta: 'lis', poprawna: true },
          { karta: 'rys', wyjasnienie: 'Ryś jest drapieżnikiem: poluje na zwierzęta, a nie żywi się roślinami.' },
          { karta: 'hiena-cetkowana', wyjasnienie: 'Hiena cętkowana jest padlinożercą: żywi się ciałami martwych zwierząt, a nie roślinami.' },
          { karta: 'sep', wyjasnienie: 'Sęp jest padlinożercą: żywi się ciałami martwych zwierząt, a nie roślinami.' },
        ],
      },
      {
        ogniwa: ['kwiat', null, 'wrobel'],
        opcje: [
          { karta: 'rusalka-pokrzywnik', poprawna: true },
          { karta: 'orzel-przedni', wyjasnienie: 'Orzeł przedni jest drapieżnikiem: poluje na zwierzęta, a nie żywi się nektarem kwiatów.' },
          { karta: 'zaba', wyjasnienie: 'Żaba jest drapieżnikiem: poluje na zwierzęta, a nie żywi się nektarem kwiatów.' },
          { karta: 'hiena-cetkowana', wyjasnienie: 'Hiena cętkowana jest padlinożercą: żywi się ciałami martwych zwierząt, a nie nektarem.' },
        ],
      },
    ],
    wyjasnienie: 'Łańcuch pokarmowy zaczyna się od organizmu samożywnego. Roślinożerca zjada rośliny, drapieżnik poluje na zwierzęta, a wszystkożerca zjada pokarm roślinny i zwierzęcy.',
    zrodlo: '2.5',
  },
  {
    id: 's5-lancuchy-2',
    swiat: 5,
    typ: 'lancuch',
    tresc: 'Kto zamyka łańcuch, a od czego się on zaczyna?',
    lancuchy: [
      {
        ogniwa: [null, 'rusalka-pokrzywnik', 'wrobel'],
        opcje: [
          { karta: 'kwiat', poprawna: true },
          { karta: 'pajak', wyjasnienie: 'Łańcuch zaczyna się od organizmu samożywnego, a pająk jest drapieżnikiem.' },
          { karta: 'sep', wyjasnienie: 'Łańcuch zaczyna się od organizmu samożywnego, a sęp jest padlinożercą.' },
          { karta: 'plesniak-bialy', wyjasnienie: 'Łańcuch zaczyna się od organizmu samożywnego, a pleśniak biały to grzyb cudzożywny.' },
        ],
      },
      {
        ogniwa: ['rosliny', 'lis', null],
        opcje: [
          { karta: 'orzel-przedni', poprawna: true },
          { karta: 'zubr', wyjasnienie: 'Żubr jest roślinożercą: żywi się pokarmem roślinnym, a nie zwierzętami.' },
          { karta: 'los', wyjasnienie: 'Łoś jest roślinożercą: żywi się pokarmem roślinnym, a nie zwierzętami.' },
          { karta: 'zebra', wyjasnienie: 'Zebra jest roślinożercą: zjada liście i łodygi traw, a nie zwierzęta.' },
        ],
      },
      {
        ogniwa: ['kwiat', 'rusalka-pokrzywnik', null],
        opcje: [
          { karta: 'wrobel', poprawna: true },
          { karta: 'zubr', wyjasnienie: 'Żubr jest roślinożercą: żywi się pokarmem roślinnym, a nie owadami.' },
          { karta: 'los', wyjasnienie: 'Łoś jest roślinożercą: żywi się pokarmem roślinnym, a nie owadami.' },
          { karta: 'bawol', wyjasnienie: 'Bawół jest roślinożercą: żywi się pokarmem roślinnym, a nie owadami.' },
        ],
      },
    ],
    wyjasnienie: 'Pierwszym ogniwem jest organizm samożywny. Po roślinożercy w łańcuchu stoi ten, kto zjada zwierzęta: drapieżnik albo wszystkożerca.',
    zrodlo: '2.5',
  },

  // ---------- Misja „Pasożyt szuka żywiciela” ----------
  klasyfikacja(
    's5-pasozyty-klas',
    'Pasożyty: przyporządkuj je do grup.',
    PASOZYTY,
    ['kleszcz', 'wesz', 'pchla', 'tasiemiec', 'owsik', 'glista', 'kanianka', 'zaraza', 'jemiola'],
    'Pasożyty zewnętrzne żyją na powierzchni ciała żywiciela, a wewnętrzne w jego wnętrzu. Rośliny pasożytnicze nie mają chlorofilu i biorą od żywiciela wszystko, a półpasożyty mają chlorofil i biorą tylko wodę i sole mineralne.',
    // Kleszcza i tasiemca odkrywa misja w zadaniu „Pasożyt szuka żywiciela”; tu ćwiczą pojęcia.
    { kleszcz: 'pasozyt-zewnetrzny', tasiemiec: 'pasozyt-wewnetrzny' },
  ),
  {
    id: 's5-zywiciel-przyp',
    swiat: 5,
    typ: 'przyporzadkowanie',
    tresc: 'Pasożyt szuka żywiciela: dopasuj pasożyta do opisu.',
    etykiety: 'nazwy',
    pary: [
      { karta: 'tasiemiec-uzbrojony', opis: 'żyje w jelicie człowieka i przyczepia się do ściany jelita przyssawkami i haczykami' },
      { karta: 'kleszcz', opis: 'przebija skórę żywiciela i odżywia się jego krwią' },
      { karta: 'jemiola-pospolita', opis: 'rośnie na żywicielu, np. na topoli, i pobiera od niego wodę i sole mineralne' },
      { karta: 'zaraza-zolta', opis: 'nie ma chlorofilu i wszystkie potrzebne substancje pobiera np. od podbiału' },
    ],
    dystraktory: ['dzdzownica'],
    wyjasnienie: 'Tasiemiec uzbrojony to pasożyt wewnętrzny, kleszcz to pasożyt zewnętrzny, jemioła pospolita to półpasożyt, a zaraza żółta to roślina pasożytnicza.',
    zrodlo: '2.5',
  },
  {
    id: 's5-pf-pasozyty-1',
    swiat: 5,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz? Popraw fałszywe zdania o pasożytach.',
    zdania: [
      {
        tekst: 'Pasożyt zwykle zabija żywiciela.',
        prawda: false,
        karta: 'zywiciel',
        poprawne: 'Pasożyt zwykle nie zabija żywiciela, bo żywiciel jest dla niego źródłem pokarmu.',
        bledne: ['Pasożyt zawsze zabija żywiciela od razu.', 'Pasożyt zjada żywiciela w całości.'],
        wyjasnienie: 'Gdyby pasożyt zabił żywiciela, straciłby źródło pokarmu.',
      },
      {
        tekst: 'Jemioła pospolita ma chlorofil i sama wytwarza substancje pokarmowe.',
        prawda: true,
        karta: 'polpasozyt',
        wyjasnienie: 'Od żywiciela pobiera tylko wodę i sole mineralne.',
      },
      {
        tekst: 'Kanianka pospolita ma chlorofil.',
        prawda: false,
        karta: 'roslina-pasozytnicza',
        poprawne: 'Kanianka pospolita nie ma chlorofilu.',
        bledne: ['Kanianka pospolita ma chlorofil i sama wytwarza pokarm.', 'Kanianka pospolita jest półpasożytem.'],
        wyjasnienie: 'Rośliny pasożytnicze nie mają chlorofilu i pobierają od żywiciela wszystkie potrzebne substancje.',
      },
      {
        tekst: 'Rośliny pasożytnicze pobierają substancje od żywiciela za pomocą ssawek.',
        prawda: true,
        karta: 'ssawki',
        wyjasnienie: 'Pobierają substancje pokarmowe, wodę i sole mineralne.',
      },
      {
        tekst: 'Pasożyty występują tylko wśród zwierząt.',
        prawda: false,
        karta: 'pasozyt',
        poprawne: 'Pasożyty występują we wszystkich królestwach.',
        bledne: ['Pasożyty występują tylko wśród roślin.', 'Pasożyty występują tylko wśród bakterii.'],
        wyjasnienie: 'Pasożytami są np. zwierzęta (kleszcz) i rośliny (kanianka pospolita).',
      },
    ],
    wyjasnienie: 'Pasożyt zwykle nie zabija żywiciela. Rośliny pasożytnicze nie mają chlorofilu, a półpasożyty, np. jemioła, mają chlorofil i biorą od żywiciela tylko wodę i sole mineralne.',
    zrodlo: '2.5',
  },

  // ---------- Misja „Trawienie jako rozbiórka” ----------
  {
    id: 's5-rozbiorka-1',
    swiat: 5,
    typ: 'rozbiorka',
    tresc: 'Rozbiórka w przewodzie pokarmowym: rozłóż związki złożone z pokarmu.',
    zwiazki: ['cukry', 'bialka', 'tluszcze'],
    pytania: [
      {
        pytanie: 'Jak nazywa się rozkład złożonych związków z pokarmu na związki proste?',
        opcje: [
          { tekst: 'trawienie', poprawna: true },
          { tekst: 'fotosynteza', wyjasnienie: 'W fotosyntezie roślina wytwarza substancje pokarmowe z dwutlenku węgla i wody.' },
          { tekst: 'wymiana gazowa', wyjasnienie: 'Wymiana gazowa to dostarczanie organizmowi tlenu i usuwanie z niego dwutlenku węgla.' },
        ],
        wyjasnienie: 'Trawienie to rozkład złożonych związków z pokarmu (cukrów, białek, tłuszczów) na związki proste.',
        karta: 'trawienie',
      },
      {
        pytanie: 'Dlaczego organizm musi trawić pokarm?',
        opcje: [
          { tekst: 'Bo złożone związki z pokarmu może wykorzystać dopiero po rozłożeniu ich na związki proste.', poprawna: true },
          { tekst: 'Bo w ten sposób sam wytwarza pokarm.', wyjasnienie: 'Pokarm sam wytwarzają organizmy samożywne. Trawienie rozkłada pokarm już zjedzony.' },
          { tekst: 'Bo pokarm zawiera tylko związki proste.', wyjasnienie: 'Pokarm zawiera związki złożone: cukry, białka i tłuszcze.' },
        ],
        wyjasnienie: 'Dopiero związki proste organizm może wykorzystać.',
        karta: 'zwiazki-proste',
      },
      {
        pytanie: 'Co umożliwia rozkład związków z pokarmu podczas trawienia?',
        opcje: [
          { tekst: 'enzymy trawienne', poprawna: true },
          { tekst: 'chlorofil', wyjasnienie: 'Chlorofil to zielony barwnik, który pochłania światło do fotosyntezy.' },
          { tekst: 'DNA', wyjasnienie: 'DNA zawiera informację o cechach organizmu.' },
        ],
        wyjasnienie: 'Enzymy to białka regulujące przemiany chemiczne w organizmie, np. trawienie.',
        karta: 'enzymy',
      },
    ],
    wyjasnienie: 'Pokarm zawiera związki złożone: cukry, białka i tłuszcze. Podczas trawienia enzymy trawienne rozkładają je na związki proste, które organizm może wykorzystać.',
    zrodlo: '2.5',
  },
  {
    id: 's5-trawienie-sorter',
    swiat: 5,
    typ: 'sorter',
    tresc: 'Trawienie wewnątrz ciała czy na zewnątrz ciała? Rozdziel zdania.',
    kategorie: [
      { id: 'wewnatrz', nazwa: 'wewnątrz ciała', karta: 'dzdzownica' },
      { id: 'zewnatrz', nazwa: 'na zewnątrz ciała', karta: 'plesniak-bialy' },
    ],
    zdania: [
      { tekst: 'Dżdżownica rozkłada szczątki w przewodzie pokarmowym.', kategoria: 'wewnatrz', karta: 'dzdzownica', wyjasnienie: 'Dżdżownice trawią szczątki w przewodzie pokarmowym za pomocą enzymów trawiennych.' },
      { tekst: 'Enzymy trawienne działają w przewodzie pokarmowym.', kategoria: 'wewnatrz', karta: 'enzymy', wyjasnienie: 'Gdy trawienie zachodzi w przewodzie pokarmowym, organizm trawi wewnątrz ciała.' },
      { tekst: 'Szczątki są trawione dopiero po zjedzeniu.', kategoria: 'wewnatrz', karta: 'dzdzownica', wyjasnienie: 'Dżdżownica najpierw zjada szczątki, a potem trawi je w przewodzie pokarmowym.' },
      { tekst: 'Pleśniak biały wydziela enzymy trawienne do otoczenia.', kategoria: 'zewnatrz', karta: 'plesniak-bialy', wyjasnienie: 'Grzyby wydzielają enzymy trawienne na zewnątrz i wchłaniają powstałe związki proste.' },
      { tekst: 'Bakterie wchłaniają związki proste powstałe w otoczeniu.', kategoria: 'zewnatrz', karta: 'zwiazki-proste', wyjasnienie: 'Bakterie wydzielają enzymy trawienne do otoczenia i wchłaniają powstałe związki proste.' },
      { tekst: 'Enzymy rozkładają szczątki jeszcze poza ciałem organizmu.', kategoria: 'zewnatrz', karta: 'enzymy', wyjasnienie: 'Bakterie i grzyby najpierw rozkładają szczątki enzymami w otoczeniu, a potem wchłaniają związki proste.' },
    ],
    wyjasnienie: 'Dżdżownice trawią szczątki wewnątrz ciała, w przewodzie pokarmowym. Bakterie i grzyby, np. pleśniak biały, wydzielają enzymy trawienne do otoczenia, czyli trawią na zewnątrz ciała.',
    zrodlo: '2.5',
  },

  // ---------- Misja „Las bez sprzątaczy” ----------
  {
    id: 's5-las-1',
    swiat: 5,
    typ: 'las',
    tresc: 'Las bez sprzątaczy: co się stanie, gdy zabraknie organizmów odżywiających się szczątkami?',
    etapy: [
      {
        sprzatacze: true,
        lata: 1,
        polecenie: 'Jesień: z drzew opadają liście. Przewiń rok i obserwuj ściółkę.',
        akcja: 'Przewiń rok',
        pytania: [
          {
            pytanie: 'Liście opadły, a warstwa szczątków nie urosła. Dlaczego?',
            opcje: [
              { tekst: 'Organizmy odżywiające się szczątkami je rozłożyły.', poprawna: true },
              { tekst: 'Liście wróciły na drzewa.', wyjasnienie: 'Opadłe liście zostają na ziemi jako szczątki.' },
              { tekst: 'Drapieżniki zjadły liście.', wyjasnienie: 'Drapieżniki polują na zwierzęta, a nie żywią się szczątkami roślin.' },
            ],
            wyjasnienie: 'Organizmy odżywiające się szczątkami zapobiegają gromadzeniu się szczątków w przyrodzie.',
            karta: 'organizmy-odzywiajace-sie-szczatkami',
          },
        ],
      },
      {
        sprzatacze: false,
        lata: 3,
        polecenie: 'Usuń z lasu organizmy odżywiające się szczątkami i przewiń trzy lata.',
        akcja: 'Usuń i przewiń 3 lata',
        pytania: [
          {
            pytanie: 'Co dzieje się w lesie bez organizmów odżywiających się szczątkami?',
            opcje: [
              { tekst: 'Szczątki gromadzą się coraz grubszą warstwą.', poprawna: true },
              { tekst: 'Szczątki znikają same w ciągu roku.', wyjasnienie: 'Bez organizmów, które je rozkładają, szczątków przybywa z każdym rokiem.' },
              { tekst: 'Nic się nie zmienia.', wyjasnienie: 'Bez organizmów odżywiających się szczątkami nikt nie rozkłada opadłych liści, więc szczątków przybywa.' },
            ],
            wyjasnienie: 'Organizmy odżywiające się szczątkami zapobiegają gromadzeniu się szczątków. Bez nich szczątków przybywa.',
            karta: 'organizmy-odzywiajace-sie-szczatkami',
          },
          {
            pytanie: 'Które organizmy zostały usunięte z lasu?',
            opcje: [
              { tekst: 'drobne zwierzęta, bakterie i grzyby', poprawna: true },
              { tekst: 'drapieżniki i padlinożercy', wyjasnienie: 'Drapieżniki polują na zwierzęta, padlinożercy żywią się ciałami martwych zwierząt. Organizmy odżywiające się szczątkami rozkładają szczątki roślin.' },
              { tekst: 'rośliny i sinice', wyjasnienie: 'Rośliny i sinice są samożywne: same wytwarzają pokarm.' },
            ],
            wyjasnienie: 'Organizmy odżywiające się szczątkami to drobne zwierzęta (np. dżdżownice), bakterie i grzyby (np. pleśniak biały).',
            karta: 'dzdzownica',
          },
        ],
      },
      {
        sprzatacze: true,
        lata: 3,
        polecenie: 'Przywróć organizmy odżywiające się szczątkami i przewiń trzy lata.',
        akcja: 'Przywróć i przewiń 3 lata',
        pytania: [
          {
            pytanie: 'Gdzie żyją organizmy odżywiające się szczątkami?',
            opcje: [
              { tekst: 'w glebie, w ściółce leśnej, na dnie zbiorników wodnych i w mule', poprawna: true },
              { tekst: 'tylko w koronach drzew', wyjasnienie: 'Szczątki gromadzą się na ziemi i na dnie zbiorników wodnych, a tam żyją te organizmy.' },
              { tekst: 'tylko w jelicie człowieka', wyjasnienie: 'W jelicie człowieka żyją np. pasożyty wewnętrzne, takie jak tasiemiec uzbrojony.' },
            ],
            wyjasnienie: 'Żyją tam, gdzie są szczątki: w glebie, w ściółce leśnej, na dnie zbiorników wodnych i w mule.',
            karta: 'plesniak-bialy',
          },
        ],
      },
    ],
    ciekawostka: 'Bez organizmów odżywiających się szczątkami las z czasem utonąłby we własnych szczątkach; organizmy te zwracają też glebie sole mineralne.',
    wyjasnienie: 'Organizmy odżywiające się szczątkami (drobne zwierzęta, bakterie, grzyby) zapobiegają gromadzeniu się szczątków w przyrodzie.',
    zrodlo: '2.5',
  },
  {
    id: 's5-szczatki-luki',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o organizmach odżywiających się szczątkami.',
    tekst:
      'Organizmy odżywiające się szczątkami to drobne zwierzęta, [bakterie|organizmy-odzywiajace-sie-szczatkami] i grzyby. Żyją w glebie, w [ściółce|organizmy-odzywiajace-sie-szczatkami] leśnej, na dnie zbiorników wodnych i w mule. Dżdżownice trawią szczątki [wewnątrz|dzdzownica] ciała, a pleśniak biały wydziela enzymy trawienne do [otoczenia|plesniak-bialy].',
    dystraktory: [
      { tekst: 'mięsożercy', wyjasnienie: 'Mięsożercy żywią się innymi zwierzętami. Drobne zwierzęta, bakterie i grzyby rozkładają szczątki.' },
      { tekst: 'na zewnątrz', wyjasnienie: 'Dżdżownice trawią szczątki w przewodzie pokarmowym, czyli wewnątrz ciała.' },
    ],
    wyjasnienie: 'Drobne zwierzęta, bakterie i grzyby rozkładają szczątki. Dżdżownice trawią je wewnątrz ciała, a bakterie i grzyby na zewnątrz.',
    zrodlo: '2.5',
  },

  // ---------- Pule bossa ----------
  {
    id: 's5-boss-luki-2',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o organizmach, które zjadają inne organizmy.',
    tekst:
      'Roślinożercy żywią się pokarmem [roślinnym|roslinozerca]. Mięsożercy, którzy polują na ofiary i je zabijają, to [drapieżniki|drapieznik|Drapieżniki polują na ofiary i je zabijają.]. Mięsożercy żywiący się ciałami martwych zwierząt to [padlinożercy|padlinozerca|Padlinożercy żywią się ciałami martwych zwierząt.]. Zwierzęta zjadające pokarm roślinny i zwierzęcy to [wszystkożercy|wszystkozerca].',
    dystraktory: [
      { tekst: 'pasożyty', wyjasnienie: 'Pasożyty pobierają składniki pokarmowe od żywego organizmu i zwykle go nie zabijają.' },
      { tekst: 'zwierzęcym', wyjasnienie: 'Pokarmem zwierzęcym żywią się mięsożercy.' },
    ],
    wyjasnienie: 'Wśród organizmów zjadających inne organizmy są roślinożercy, mięsożercy (drapieżniki i padlinożercy) i wszystkożercy.',
    zrodlo: '2.5',
  },
  {
    id: 's5-boss-luki-3',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o pasożytach.',
    tekst:
      'Pasożyty pobierają składniki pokarmowe od żywych organizmów, które nazywamy [żywicielami|zywiciel]. Kleszcze żyją na powierzchni ciała żywiciela, więc są pasożytami [zewnętrznymi|pasozyt-zewnetrzny]. Tasiemiec uzbrojony żyje w jelicie człowieka, więc jest pasożytem [wewnętrznym|pasozyt-wewnetrzny]. Jemioła pospolita ma chlorofil, ale wodę i sole mineralne pobiera od żywiciela, więc jest [półpasożytem|polpasozyt].',
    dystraktory: [
      { tekst: 'roślinożercami', wyjasnienie: 'Roślinożercy zjadają rośliny; organizmy, od których pasożyty pobierają pokarm, to żywiciele.' },
      { tekst: 'rośliną pasożytniczą', wyjasnienie: 'Rośliny pasożytnicze nie mają chlorofilu. Jemioła ma chlorofil, więc jest półpasożytem.' },
    ],
    wyjasnienie: 'Pasożyty zewnętrzne żyją na powierzchni ciała żywiciela, wewnętrzne w jego wnętrzu, a półpasożyty mają chlorofil i biorą od żywiciela tylko wodę i sole mineralne.',
    zrodlo: '2.5',
  },
  {
    id: 's5-boss-luki-4',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o trawieniu.',
    tekst:
      'Pokarm zawiera związki złożone: cukry, [białka|bialka] i tłuszcze. Podczas trawienia są one rozkładane na związki [proste|zwiazki-proste]. Dżdżownice trawią szczątki w przewodzie [pokarmowym|dzdzownica], a bakterie i grzyby wydzielają enzymy trawienne do [otoczenia|plesniak-bialy].',
    dystraktory: [
      { tekst: 'złożone', wyjasnienie: 'Trawienie rozkłada związki złożone na proste.' },
      { tekst: 'tlen', wyjasnienie: 'Tlen nie jest związkiem złożonym z pokarmu. Pokarm zawiera cukry, białka i tłuszcze.' },
    ],
    wyjasnienie: 'Trawienie rozkłada cukry, białka i tłuszcze z pokarmu na związki proste: u dżdżownic wewnątrz ciała, u bakterii i grzybów na zewnątrz.',
    zrodlo: '2.5',
  },
  {
    id: 's5-boss-luki-5',
    swiat: 5,
    typ: 'luki',
    tresc: 'Uzupełnij zdania o sposobach zdobywania pokarmu.',
    tekst:
      'Organizmy cudzożywne pobierają z otoczenia [gotowy|organizm-cudzozywny] pokarm. Ze względu na sposób zdobywania pokarmu dzielimy je na trzy grupy: organizmy zjadające inne organizmy, [pasożyty|pasozyt] i organizmy odżywiające się szczątkami. Rośliny pasożytnicze nie mają [chlorofilu|roslina-pasozytnicza] i pobierają od żywiciela wszystkie potrzebne substancje za pomocą [ssawek|ssawki].',
    dystraktory: [
      { tekst: 'roślinożercy', wyjasnienie: 'Roślinożercy należą do organizmów zjadających inne organizmy.' },
      { tekst: 'korzeni', wyjasnienie: 'Rośliny pasożytnicze pobierają substancje od żywiciela za pomocą ssawek.' },
    ],
    wyjasnienie: 'Organizmy cudzożywne to organizmy zjadające inne organizmy, pasożyty i organizmy odżywiające się szczątkami. Rośliny pasożytnicze nie mają chlorofilu i mają ssawki.',
    zrodlo: '2.5',
  },
  przyporzadkowanie(
    's5-boss-przyp-2',
    'Dopasuj nazwy do opisów.',
    ['pasozyt-zewnetrzny', 'pasozyt-wewnetrzny', 'roslina-pasozytnicza', 'polpasozyt'],
    ['zywiciel'],
    'Pasożyty zewnętrzne żyją na powierzchni ciała żywiciela, wewnętrzne w jego wnętrzu. Roślina pasożytnicza nie ma chlorofilu, a półpasożyt ma.',
  ),
  przyporzadkowanie(
    's5-boss-przyp-3',
    'Dopasuj nazwy do opisów.',
    ['drapieznik', 'padlinozerca', 'pasozyt', 'organizmy-odzywiajace-sie-szczatkami'],
    ['zywiciel'],
    'Drapieżniki zabijają ofiary, padlinożercy żywią się ciałami martwych zwierząt, pasożyty zwykle nie zabijają żywiciela, a organizmy odżywiające się szczątkami rozkładają szczątki.',
  ),
  przyporzadkowanie(
    's5-boss-przyp-4',
    'Dopasuj nazwy do opisów.',
    ['roslinozerca', 'miesozerca', 'wszystkozerca', 'zywiciel'],
    ['roslina-pasozytnicza'],
    'Roślinożercy żywią się pokarmem roślinnym, mięsożercy innymi zwierzętami, a wszystkożercy jednym i drugim. Żywiciel to organizm, od którego pasożyt pobiera pokarm.',
  ),
  przyporzadkowanie(
    's5-boss-przyp-5',
    'Dopasuj opisy do nazw.',
    ['wszystkozerca', 'padlinozerca', 'polpasozyt', 'roslina-pasozytnicza', 'organizmy-odzywiajace-sie-szczatkami'],
    [{ tekst: 'organizm, od którego pasożyt pobiera składniki pokarmowe', wyjasnienie: 'To opis żywiciela, a żywiciela nie ma wśród nazw w tym zadaniu.' }],
    'Półpasożyt ma chlorofil, roślina pasożytnicza go nie ma. Padlinożerca żywi się ciałami martwych zwierząt, a organizmy odżywiające się szczątkami rozkładają szczątki.',
    'opisy',
  ),
  {
    id: 's5-boss-pf-3',
    swiat: 5,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Padlinożerca nie jest mięsożercą.',
        prawda: false,
        karta: 'padlinozerca',
        poprawne: 'Padlinożercy to grupa mięsożerców.',
        bledne: ['Padlinożercy to grupa roślinożerców.', 'Padlinożercy to pasożyty.'],
        wyjasnienie: 'Mięsożercami są drapieżniki i padlinożercy.',
      },
      {
        tekst: 'Roślinożercy zwykle nie powodują śmierci rośliny.',
        prawda: true,
        karta: 'roslinozerca',
        wyjasnienie: 'Zjadają tylko część rośliny.',
      },
      {
        tekst: 'Pokarm roślinny jest pożywny, ale trudno go zdobyć.',
        prawda: false,
        karta: 'roslinozerca',
        poprawne: 'Pokarm roślinny jest łatwo dostępny, ale mało pożywny.',
        bledne: ['Pokarm roślinny jest łatwo dostępny i bardzo pożywny.', 'Pokarm roślinny jest najłatwiejszy do strawienia.'],
        wyjasnienie: 'Pożywny, ale trudniejszy do zdobycia jest pokarm zwierzęcy.',
      },
      {
        tekst: 'Wszystkożercy mogą zmieniać pokarm zależnie od tego, co jest dostępne.',
        prawda: true,
        karta: 'wszystkozerca',
        wyjasnienie: 'Np. wróbel zimą zjada nasiona, a latem także owady.',
      },
      {
        tekst: 'Drapieżnik to mięsożerca żywiący się ciałami martwych zwierząt.',
        prawda: false,
        karta: 'drapieznik',
        poprawne: 'Drapieżnik to mięsożerca, który poluje na ofiary i je zabija.',
        bledne: ['Drapieżnik to zwierzę żywiące się tylko roślinami.', 'Drapieżnik to organizm pobierający pokarm od żywiciela, zwykle bez zabijania go.'],
        wyjasnienie: 'Ciałami martwych zwierząt żywią się padlinożercy.',
      },
    ],
    wyjasnienie: 'Mięsożercami są drapieżniki i padlinożercy. Pokarm roślinny jest łatwo dostępny, ale mało pożywny. Wszystkożercy mogą zmieniać pokarm.',
    zrodlo: '2.5',
  },
  {
    id: 's5-boss-pf-4',
    swiat: 5,
    typ: 'prawda-falsz',
    tresc: 'Prawda czy fałsz?',
    zdania: [
      {
        tekst: 'Organizmy odżywiające się szczątkami zapobiegają gromadzeniu się szczątków w przyrodzie.',
        prawda: true,
        karta: 'organizmy-odzywiajace-sie-szczatkami',
        wyjasnienie: 'To drobne zwierzęta, bakterie i grzyby.',
      },
      {
        tekst: 'Dżdżownice trawią szczątki na zewnątrz ciała.',
        prawda: false,
        karta: 'dzdzownica',
        poprawne: 'Dżdżownice trawią szczątki wewnątrz ciała.',
        bledne: ['Dżdżownice w ogóle nie trawią szczątków.', 'Dżdżownice trawią szczątki w chloroplastach.'],
        wyjasnienie: 'Rozkładają je w przewodzie pokarmowym za pomocą enzymów trawiennych.',
      },
      {
        tekst: 'Pleśniak biały wydziela enzymy trawienne do otoczenia.',
        prawda: true,
        karta: 'plesniak-bialy',
        wyjasnienie: 'Potem wchłania powstałe związki proste.',
      },
      {
        tekst: 'Tasiemiec uzbrojony jest pasożytem zewnętrznym.',
        prawda: false,
        karta: 'tasiemiec-uzbrojony',
        poprawne: 'Tasiemiec uzbrojony jest pasożytem wewnętrznym.',
        bledne: ['Tasiemiec uzbrojony jest półpasożytem.', 'Tasiemiec uzbrojony jest drapieżnikiem.'],
        wyjasnienie: 'Żyje w jelicie człowieka, czyli wewnątrz ciała żywiciela.',
      },
      {
        tekst: 'Półpasożyt ma chlorofil.',
        prawda: true,
        karta: 'polpasozyt',
        wyjasnienie: 'Sam wytwarza substancje pokarmowe, a od żywiciela pobiera wodę i sole mineralne.',
      },
    ],
    wyjasnienie: 'Dżdżownice trawią wewnątrz ciała, a pleśniak biały na zewnątrz. Tasiemiec uzbrojony jest pasożytem wewnętrznym, a półpasożyt ma chlorofil.',
    zrodlo: '2.5',
  },
  // Wykład Profesora Pomyłki (wykrywacz bzdur): stukać można tylko słowa do sprawdzenia;
  // reszta tekstu jest prawdziwa. Bzdura ma poprawkę i opcje (poprawka jest jedną z nich).
  {
    id: 's5-wyklad-1',
    swiat: 5,
    typ: 'wykrywacz',
    tresc: 'Profesor Pomyłka mówi o cudzożywności. Znajdź bzdury i popraw je.',
    wyklad: [
      'Witajcie na wielkiej uczcie! Organizmy cudzożywne pobierają z otoczenia ',
      { slowo: 'gotowy pokarm', karta: 'organizm-cudzozywny', wyjasnienie: 'Organizmy cudzożywne nie wytwarzają pokarmu, tylko pobierają gotowy pokarm z otoczenia.' },
      '. Należą do nich zwierzęta, grzyby, większość bakterii i ',
      {
        slowo: 'wszystkie rośliny',
        poprawka: 'niektóre protisty',
        opcje: ['niektóre protisty', 'sinice'],
        karta: 'organizm-cudzozywny',
        wyjasnienie: 'Cudzożywne są zwierzęta, grzyby, większość bakterii i niektóre protisty. Większość organizmów samożywnych to rośliny, a sinice to bakterie samożywne.',
      },
      '. Związki złożone z pokarmu są rozkładane na związki proste podczas ',
      {
        slowo: 'fotosyntezy',
        poprawka: 'trawienia',
        opcje: ['trawienia', 'wymiany gazowej'],
        karta: 'trawienie',
        wyjasnienie: 'Podczas trawienia związki złożone z pokarmu, np. cukry, białka i tłuszcze, są rozkładane na związki proste.',
      },
      '. Roślinożercy mają dłuższe przewody pokarmowe niż mięsożercy, bo pokarm roślinny trudno strawić z powodu ',
      {
        slowo: 'celulozy',
        karta: 'roslinozerca',
        wyjasnienie: 'Pokarm roślinny jest trudny do strawienia z powodu celulozy w ścianach komórkowych, dlatego przewody pokarmowe roślinożerców są dłuższe niż mięsożerców.',
      },
      '. Sępy to ',
      {
        slowo: 'drapieżniki',
        poprawka: 'padlinożercy',
        opcje: ['padlinożercy', 'roślinożercy'],
        karta: 'padlinozerca',
        wyjasnienie: 'Sępy to padlinożercy: żywią się ciałami martwych zwierząt. Drapieżniki polują na ofiary i je zabijają. Padlinożercy i drapieżniki to dwie grupy mięsożerców.',
      },
      '. Niedźwiedź brunatny je ryby, rośliny, grzyby i ptasie jaja, więc jest ',
      {
        slowo: 'wszystkożercą',
        karta: 'wszystkozerca',
        wyjasnienie: 'Wszystkożercy zjadają pokarm roślinny i zwierzęcy. Niedźwiedź brunatny zjada m.in. ryby, jelenie, rośliny, grzyby i ptasie jaja.',
      },
      '. Do zobaczenia przy stole!',
    ],
    wyjasnienie:
      'Organizmy cudzożywne, czyli zwierzęta, grzyby, większość bakterii i niektóre protisty, pobierają gotowy pokarm. Podczas trawienia związki złożone są rozkładane na związki proste. Sępy to padlinożercy, a niedźwiedź brunatny jest wszystkożercą.',
    zrodlo: '2.5',
  },
  {
    id: 's5-wyklad-2',
    swiat: 5,
    typ: 'wykrywacz',
    tresc: 'Profesor Pomyłka mówi o pasożytach i o organizmach odżywiających się szczątkami. Znajdź bzdury i popraw je.',
    wyklad: [
      'Teraz o pasożytach. Pasożyty pobierają składniki pokarmowe od żywych organizmów, czyli od ',
      { slowo: 'żywicieli', karta: 'zywiciel', wyjasnienie: 'Żywiciel to żywy organizm, od którego pasożyt pobiera składniki pokarmowe.' },
      '. Pasożyt zwykle ',
      {
        slowo: 'szybko zabija żywiciela',
        poprawka: 'nie powoduje śmierci żywiciela',
        opcje: ['nie powoduje śmierci żywiciela', 'zjada żywiciela w całości'],
        karta: 'pasozyt',
        wyjasnienie: 'Pasożyt zwykle nie powoduje śmierci żywiciela, bo żywiciel jest dla niego źródłem pokarmu.',
      },
      '. Kleszcze, wszy i pchły to pasożyty ',
      {
        slowo: 'wewnętrzne',
        poprawka: 'zewnętrzne',
        opcje: ['zewnętrzne', 'samożywne'],
        karta: 'pasozyt-zewnetrzny',
        wyjasnienie: 'Kleszcze, wszy i pchły żyją na powierzchni ciała żywiciela, więc są pasożytami zewnętrznymi.',
      },
      '. Tasiemiec uzbrojony żyje w ',
      {
        slowo: 'jelicie',
        karta: 'tasiemiec-uzbrojony',
        wyjasnienie: 'Tasiemiec uzbrojony to pasożyt wewnętrzny: żyje w jelicie człowieka i przyczepia się do ściany jelita przyssawkami i haczykami.',
      },
      ' człowieka. Jemioła pospolita ma chlorofil, ale wodę i sole mineralne pobiera od żywiciela, więc jest ',
      {
        slowo: 'rośliną pasożytniczą',
        poprawka: 'półpasożytem',
        opcje: ['półpasożytem', 'roślinożercą'],
        karta: 'polpasozyt',
        wyjasnienie: 'Półpasożyty mają chlorofil i same wytwarzają substancje pokarmowe, a od żywiciela pobierają wodę i sole mineralne. Roślina pasożytnicza nie ma chlorofilu.',
      },
      '. Kanianka pospolita pobiera od żywiciela wszystkie potrzebne substancje za pomocą ',
      {
        slowo: 'ssawek',
        karta: 'ssawki',
        wyjasnienie: 'Rośliny pasożytnicze, np. kanianka pospolita, pobierają od żywiciela wszystkie potrzebne substancje za pomocą ssawek.',
      },
      '. Grzyby i bakterie odżywiające się szczątkami trawią je ',
      {
        slowo: 'na zewnątrz ciała',
        karta: 'organizmy-odzywiajace-sie-szczatkami',
        wyjasnienie: 'Bakterie i grzyby wydzielają enzymy trawienne do otoczenia i wchłaniają powstałe związki proste, czyli trawią na zewnątrz ciała.',
      },
      '. Pytania?',
    ],
    wyjasnienie:
      'Pasożyty pobierają pokarm od żywicieli i zwykle nie powodują ich śmierci. Kleszcze, wszy i pchły to pasożyty zewnętrzne, a tasiemiec uzbrojony to pasożyt wewnętrzny. Jemioła pospolita to półpasożyt, a kanianka pospolita to roślina pasożytnicza ze ssawkami. Bakterie i grzyby trawią szczątki na zewnątrz ciała.',
    zrodlo: '2.5',
  },
];

// Sześć światów w kolejności części słuchowiska. Treści: TRESCI.md, sekcje 2.1-2.6.
// gotowy: świat ma treść do grania. Świat niegotowy jest na mapie oznaczony „W budowie”.
// ciekawostka: dosłownie z TRESCI.md, sekcja 6.
// boss: wyzwania w formatach sprawdzianu (SPEC.md, sekcja 4.3); z każdej puli losowane jest
// jedno zadanie, więc kolejne podejścia różnią się wariantami.

export default [
  {
    id: 1,
    czesc: 1,
    tytul: 'Alfabet życia',
    temat: 'Składniki chemiczne organizmów',
    zrodlo: '2.1',
    gotowy: false,
    wstep: [],
    coZbadasz: [],
    misje: [],
  },
  {
    id: 2,
    czesc: 2,
    tytul: 'Miasto, którego nie widać',
    temat: 'Budowa komórki zwierzęcej',
    zrodlo: '2.2',
    gotowy: true,
    wstep: [
      'Wyobraź sobie, że zmniejszasz się tysiące razy i stajesz u bram komórki.',
      'Komórka to podstawowa jednostka życia. Działa jak miasto: ma granicę z przejściami, centrum dowodzenia, elektrownie i fabryki.',
      'Zacznij od planu miasta.',
    ],
    ciekawostka:
      'Robert Hooke ponad 350 lat temu zobaczył pod mikroskopem w plasterku korka setki pustych komór i nazwał je słowem oznaczającym małą izbę; po polsku to „komórki”. Oglądał puste ściany martwych komórek.',
    coZbadasz: [
      'z jakich elementów zbudowana jest komórka zwierzęca',
      'do czego służy każdy z tych elementów',
      'dlaczego komórki mają różne kształty',
    ],
    misje: [
      {
        id: 's2-plan-miasta',
        nazwa: 'Plan miasta',
        opis: 'Podpisz elementy komórki zwierzęcej i poznaj ich wygląd.',
        zadania: ['s2-podpis-zwierzeca-1', 's2-wyglad-1'],
      },
      {
        id: 's2-budowa-miasta',
        nazwa: 'Budowa miasta',
        opis: 'Zatrudnij elementy do usług miasta i znajdź przyczyny awarii.',
        zadania: ['s2-miasto-budowa', 's2-miasto-awarie'],
      },
      {
        id: 's2-biuro',
        nazwa: 'Biuro zatrudnienia',
        opis: 'Dopasuj elementy komórki do ogłoszeń i funkcji.',
        zadania: ['s2-biuro-1', 's2-funkcje-1'],
      },
      {
        id: 's2-ksztalty',
        nazwa: 'Kształt do zadania',
        opis: 'Dlaczego plemnik ma wić, a komórka nerwowa długie wypustki?',
        zadania: ['s2-ksztalt-1', 's2-ksztalt-2'],
      },
      {
        id: 's2-mikroskop',
        nazwa: 'Pod mikroskopem',
        opis: 'Co widać przy różnych powiększeniach? Jedna komórka czy wiele?',
        zadania: ['s2-mikroskop-1', 's2-jeden-czy-wielu', 's2-pf-1'],
      },
    ],
    boss: {
      nazwa: 'Inspektor miasta',
      opis: 'Inspektor sprawdza, czy znasz miasto-komórkę: plan, funkcje elementów i organizmy jedno- i wielokomórkowe.',
      wyzwania: [
        { pula: ['s2-podpis-zwierzeca-1', 's2-boss-podpis-2', 's2-boss-podpis-3'] },
        { pula: ['s2-funkcje-1', 's2-boss-funkcje-2', 's2-boss-funkcje-3', 's2-boss-funkcje-4', 's2-boss-funkcje-5', 's2-boss-funkcje-6'] },
        { pula: ['s2-jeden-czy-wielu', 's2-boss-organizmy-2', 's2-boss-organizmy-3'] },
        { pula: ['s2-boss-pf-1', 's2-boss-pf-2', 's2-pf-1'] },
      ],
    },
  },
  {
    id: 3,
    czesc: 3,
    tytul: 'Zielone twierdze i niewidzialni mieszkańcy',
    temat: 'Komórka roślinna. Inne rodzaje komórek',
    zrodlo: '2.3',
    gotowy: true,
    wstep: [
      'Zapomniana roślina na parapecie zwiędła, a po podlaniu znów stoi prosto. Jak to możliwe bez kości i mięśni?',
      'Odpowiedź kryje się w komórkach: w zielonych twierdzach roślin, w komórkach grzybów i w maleńkich bakteriach, które nie mają nawet jądra.',
      'Zacznij od planu zielonej twierdzy.',
    ],
    ciekawostka:
      'Antoni van Leeuwenhoek, kupiec handlujący suknem w Delft, budował najlepsze mikroskopy swoich czasów. W nalocie z własnych zębów zobaczył mnóstwo poruszających się „zwierzątek”, czyli bakterii; pisał, że jest ich tam więcej niż ludzi w całym królestwie.',
    coZbadasz: [
      'czym komórka roślinna różni się od zwierzęcej',
      'jak zbudowane są komórki grzybów i bakterii',
      'jak rozpoznać komórkę po trzech zasadach',
      'po co roślinie duża wakuola',
    ],
    misje: [
      {
        id: 's3-twierdza',
        nazwa: 'Zielona twierdza',
        opis: 'Podpisz komórkę roślinną i znajdź różnice między nią a zwierzęcą.',
        zadania: ['s3-podpis-roslinna-1', 's3-podpis-roslinna-2', 's3-roslinna-zwierzeca'],
      },
      {
        id: 's3-detektyw',
        nazwa: 'Detektyw komórek',
        opis: 'Rozpoznaj komórkę po jak najmniejszej liczbie wskazówek i sprawdź zeznania świadków.',
        zadania: ['s3-detektyw-1', 's3-detektyw-2', 's3-pf-1'],
      },
      {
        id: 's3-konstruktor',
        nazwa: 'Konstruktor czterech komórek',
        opis: 'Zbuduj cztery komórki z jednego zestawu części.',
        zadania: ['s3-konstruktor-1', 's3-konstruktor-2'],
      },
      {
        id: 's3-siatka',
        nazwa: 'Siatka porównawcza',
        opis: 'Porównaj komórki zwierzęcą, roślinną, grzybową i bakteryjną.',
        zadania: ['s3-tabela-1', 's3-luki-3', 's3-luki-1'],
      },
      {
        id: 's3-woda',
        nazwa: 'Woda w wakuoli',
        opis: 'Podlej zwiędłą roślinę i zajrzyj do jej komórek.',
        zadania: ['s3-wakuola-1'],
      },
      {
        id: 's3-ksztalty',
        nazwa: 'Kształty komórek roślinnych',
        opis: 'Aparat szparkowy, włośniki i komórki przewodzące.',
        zadania: ['s3-ksztalt-1', 's3-ksztalt-wyglad', 's3-ksztalt-2'],
      },
      {
        id: 's3-bakterie',
        nazwa: 'Niewidzialni mieszkańcy',
        opis: 'Komórka bakterii: bez jądra, za to z nicią DNA.',
        zadania: ['s3-podpis-bakteryjna-1', 's3-luki-2', 's3-jadrowe'],
      },
    ],
    boss: {
      nazwa: 'Strażnik twierdzy',
      opis: 'Strażnik sprawdza schemat komórki roślinnej, zdania o budowie komórek i siatkę porównawczą.',
      wyzwania: [
        { pula: ['s3-podpis-roslinna-1', 's3-podpis-roslinna-2', 's3-boss-podpis-2', 's3-boss-podpis-3', 's3-boss-podpis-4', 's3-boss-podpis-5', 's3-boss-podpis-6'] },
        { pula: ['s3-luki-1', 's3-luki-2', 's3-luki-3', 's3-boss-luki-4', 's3-boss-luki-5', 's3-boss-luki-6'] },
        { pula: ['s3-tabela-1', 's3-boss-tabela-2', 's3-boss-tabela-3'] },
        { pula: ['s3-boss-pf-1', 's3-boss-pf-2', 's3-pf-1'] },
      ],
    },
  },
  {
    id: 4,
    czesc: 4,
    tytul: 'Kuchnia zasilana światłem',
    temat: 'Samożywność',
    zrodlo: '2.4',
    gotowy: false,
    wstep: [],
    coZbadasz: [],
    misje: [],
  },
  {
    id: 5,
    czesc: 5,
    tytul: 'Wielka uczta',
    temat: 'Cudzożywność',
    zrodlo: '2.5',
    gotowy: false,
    wstep: [],
    coZbadasz: [],
    misje: [],
  },
  {
    id: 6,
    czesc: 6,
    tytul: 'Ogień bez płomienia',
    temat: 'Sposoby oddychania organizmów',
    zrodlo: '2.6',
    gotowy: false,
    wstep: [],
    coZbadasz: [],
    misje: [],
  },
];

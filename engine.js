const POKOJE = [
  { id: 1, maLewo: false, maPrawo: true },
  { id: 2, maLewo: true,  maPrawo: true },
  { id: 3, maLewo: true,  maPrawo: true },
  { id: 4, maLewo: true,  maPrawo: false }
];


function stanPoczatkowy() {
  return {
    pokoj: 1,
    energia: 10,
    karta: false,
    bezpiecznik: false,
    zasilanie: false,
    koniec: false,
    wersja: "1.0.0"
  };
}

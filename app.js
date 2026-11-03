
let stan = stanPoczatkowy();


function przetworzWynik(wynik) {
  if (wynik && wynik.stan !== undefined) {
    stan = wynik.stan;
  }
  if (wynik && wynik.komunikat) {
    console.log(wynik.komunikat);
  }
  return stan;
}

window.gra = {
  idz: function(kierunek) {
    const wynik = przejscie(stan, { typ: "ruch", kierunek: kierunek });
    return przetworzWynik(wynik);
  },

  akcja: function(co) {
    const wynik = przejscie(stan, { typ: "akcja", co: co });
    return przetworzWynik(wynik);
  },

  status: function() {
    console.log("=== AKTUALNY STAN GRY ===");
    console.log(stan);
    return stan;
  },

  mapa: function() {
    console.log("=== MAPA POKOJÓW ===");
    if (typeof pokoje !== "undefined") {
      console.table(pokoje);
    } else {
      console.log("Kolekcja pokojów niedostępna.");
    }
    return stan;
  },

  start: function() {
    stan = stanPoczatkowy();
    console.log("Rozpoczęto nową grę.");
    return stan;
  },

  eksportuj: function() {
    const pakiet = {
      wersja: 1,
      stan: stan
    };
    const jsonTekst = JSON.stringify(pakiet);
    console.log(jsonTekst);
    return jsonTekst;
  },

  importuj: function(tekst) {
    if (typeof tekst !== "string" || tekst.trim() === "") {
      console.log("Błąd: Przekazano pusty tekst lub anulowano operację.");
      return false;
    }

    let sparsowane;
    try {
      sparsowane = JSON.parse(tekst);
    } catch (e) {
      console.log("Błąd: Niepoprawna składnia JSON.");
      return false;
    }


    if (typeof czyPoprawnyPakiet === "function" && !czyPoprawnyPakiet(sparsowane)) {
      console.log("Błąd: Dane nie przeszły walidacji (niepoprawna wersja, typy lub reguły stanu).");
      return false;
    }

   
    stan = {
      pokoj: Number(sparsowane.stan.pokoj),
      energia: Number(sparsowane.stan.energia),
      karta: Boolean(sparsowane.stan.karta),
      bezpiecznik: Boolean(sparsowane.stan.bezpiecznik),
      zasilanie: Boolean(sparsowane.stan.zasilanie),
      koniec: Boolean(sparsowane.stan.koniec),
      wygrana: Boolean(sparsowane.stan.wygrana)
    };

    console.log("Sukces: Pomyślnie zaimportowano stan gry.");
    return true;
  }
};
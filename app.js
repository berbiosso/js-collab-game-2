let stan = stanPoczatkowy();
 
function wykonaj(komenda) {
    const wynik = przejscie(stan, komenda);
 
    stan = wynik.stan;
 
    console.log(wynik.komunikat);
    console.log(stan);
 
    return wynik;
}
 
function ruch(cel) {
    return wykonaj({ typ: "ruch", cel });
}
 
function wezKarte() {
    return wykonaj({ typ: "wezKarte" });
}
 
function wezLatarke() {
    return wykonaj({ typ: "wezLatarke" });
}
 
function wezBezpiecznik() {
    return wykonaj({ typ: "wezBezpiecznik" });
}
 
function napraw() {
    return wykonaj({ typ: "napraw" });
}
 
function wyjdz() {
    return wykonaj({ typ: "wyjdz" });
}
 
function status() {
    console.log(stan);
    return stan;
}
 
function reset() {
    stan = stanPoczatkowy();
 
    console.log("Gra rozpoczęta od nowa!");
 
    return stan;
}
 
function eksportuj() {
    return JSON.stringify({
        wersja: 1,
        stan: stan
    });
}
 
function importuj(tekst) {
    if (typeof tekst !== "string" || tekst.trim() === "") {
        console.log("Błędny tekst.");
        return false;
    }
 
    try {
        const dane = JSON.parse(tekst);
 
        if (!dane || typeof dane !== "object" ||
            Array.isArray(dane) ||
            dane.wersja !== 1 ||
            !czyStan(dane.stan)) {
 
            console.log("Nieprawidłowy zapis.");
            return false;
        }
 
        const s = dane.stan;
 
        stan = {
            pokoj: s.pokoj,
            energia: s.energia,
            karta: s.karta,
            latarka: s.latarka,
            bezpiecznik: s.bezpiecznik,
            kartaPobrana: s.kartaPobrana,
            latarkaPobrana: s.latarkaPobrana,
            bezpiecznikPobrany: s.bezpiecznikPobrany,
            bezpiecznikZamontowany: s.bezpiecznikZamontowany,
            zasilanie: s.zasilanie,
            zakonczona: s.zakonczona,
            wynik: s.wynik
        };
 
        console.log("Zapis wczytany!");
        return true;
 
    } catch (blad) {
        console.log("Błąd JSON:", blad.message);
        return false;
    }
}
 
window.gra = {
    ruch,
    wezKarte,
    wezLatarke,
    wezBezpiecznik,
    napraw,
    wyjdz,
    status,
    reset,
    eksportuj,
    importuj
};
 
console.log("Gra uruchomiona!");
const pokoje = [
    { id: 1, polaczenia: [2] },
    { id: 2, polaczenia: [1, 3] },
    { id: 3, polaczenia: [2, 4] },
    { id: 4, polaczenia: [3] }
];
 
function stanPoczatkowy() {
    return {
        pokoj: 1,
        energia: 10,
        karta: false,
        latarka: false,
        bezpiecznik: false,
        kartaPobrana: false,
        latarkaPobrana: false,
        bezpiecznikPobrany: false,
        bezpiecznikZamontowany: false,
        zasilanie: false,
        zakonczona: false,
        wynik: null
    };
}
 
function czyStan(s) {
    if (s === null || typeof s !== "object" || Array.isArray(s)) {
        return false;
    }
 
    const pola = [
        "pokoj", "energia", "karta", "latarka",
        "bezpiecznik", "kartaPobrana", "latarkaPobrana",
        "bezpiecznikPobrany", "bezpiecznikZamontowany",
        "zasilanie", "zakonczona", "wynik"
    ];
 
    if (!pola.every(p => Object.hasOwn(s, p))) return false;
 
    if (!Number.isInteger(s.pokoj) || s.pokoj < 1 || s.pokoj > 4) return false;
    if (!Number.isInteger(s.energia) || s.energia < 0 || s.energia > 10) return false;
 
    const booleany = [
        "karta", "latarka", "bezpiecznik",
        "kartaPobrana", "latarkaPobrana",
        "bezpiecznikPobrany", "bezpiecznikZamontowany",
        "zasilanie", "zakonczona"
    ];
 
    if (!booleany.every(p => typeof s[p] === "boolean")) return false;
 
    if (![null, "wygrana", "przegrana"].includes(s.wynik)) return false;
 
    if (s.karta && !s.kartaPobrana) return false;
    if (s.latarka && !s.latarkaPobrana) return false;
    if (s.bezpiecznik && !s.bezpiecznikPobrany) return false;
 
    if (s.bezpiecznikZamontowany &&
        (!s.bezpiecznikPobrany || s.bezpiecznik)) return false;
 
    if (s.zasilanie && !s.bezpiecznikZamontowany) return false;
    if (s.zakonczona !== (s.wynik !== null)) return false;
 
    if (!s.zakonczona && s.energia === 0) return false;
    if (s.wynik === "przegrana" && s.energia !== 0) return false;
 
    if (s.wynik === "wygrana" &&
        (s.pokoj !== 4 || !s.karta || !s.zasilanie)) return false;
 
    return true;
}
 
function przejscie(stanPrzed, komenda) {
    const odmowa = komunikat => ({
        stan: stanPrzed,
        komunikat
    });
 
    if (!czyStan(stanPrzed)) {
        return odmowa("Nieprawidłowy stan.");
    }
 
    if (stanPrzed.zakonczona) {
        return odmowa("Gra jest już zakończona.");
    }
 
    if (!komenda || typeof komenda !== "object" ||
        Array.isArray(komenda) || typeof komenda.typ !== "string") {
        return odmowa("Nieznana komenda.");
    }
 
    const nowy = { ...stanPrzed };
 
    if (komenda.typ === "ruch") {
        const pokoj = pokoje.find(p => p.id === stanPrzed.pokoj);
 
        if (!Number.isInteger(komenda.cel) ||
            !pokoj.polaczenia.includes(komenda.cel)) {
            return odmowa("Nie możesz tam przejść.");
        }
 
        nowy.pokoj = komenda.cel;
    }
 
    else if (komenda.typ === "wezKarte") {
        if (stanPrzed.pokoj !== 1 || stanPrzed.kartaPobrana) {
            return odmowa("Nie możesz pobrać karty.");
        }
 
        nowy.karta = true;
        nowy.kartaPobrana = true;
    }
 
    else if (komenda.typ === "wezLatarke") {
        if (stanPrzed.pokoj !== 1 || stanPrzed.latarkaPobrana) {
            return odmowa("Nie możesz pobrać latarki.");
        }
 
        nowy.latarka = true;
        nowy.latarkaPobrana = true;
    }
 
    else if (komenda.typ === "wezBezpiecznik") {
        if (stanPrzed.pokoj !== 2 || stanPrzed.bezpiecznikPobrany) {
            return odmowa("Nie możesz pobrać bezpiecznika.");
        }
 
        nowy.bezpiecznik = true;
        nowy.bezpiecznikPobrany = true;
    }
 
    else if (komenda.typ === "napraw") {
        if (stanPrzed.pokoj !== 3) {
            return odmowa("Musisz być w pokoju technicznym.");
        }
 
        if (!stanPrzed.latarka) {
            return odmowa("Jest za ciemno! Potrzebujesz latarki.");
        }
 
        if (!stanPrzed.bezpiecznik) {
            return odmowa("Potrzebujesz bezpiecznika.");
        }
 
        nowy.bezpiecznik = false;
        nowy.bezpiecznikZamontowany = true;
        nowy.zasilanie = true;
    }
 
    else if (komenda.typ === "wyjdz") {
        if (stanPrzed.pokoj !== 4 ||
            !stanPrzed.karta ||
            !stanPrzed.zasilanie) {
            return odmowa("Nie możesz jeszcze wyjść.");
        }
 
        nowy.zakonczona = true;
        nowy.wynik = "wygrana";
    }
 
    else {
        return odmowa("Nieznana komenda.");
    }
 
    nowy.energia--;
 
    if (nowy.wynik === "wygrana") {
        return {
            stan: nowy,
            komunikat: "Gratulacje! Wygrałeś grę!"
        };
    }
 
    if (nowy.energia === 0) {
        nowy.zakonczona = true;
        nowy.wynik = "przegrana";
 
        return {
            stan: nowy,
            komunikat: "Przegrałeś! Brak energii."
        };
    }
 
    return {
        stan: nowy,
        komunikat: "Akcja wykonana!"
    };
}
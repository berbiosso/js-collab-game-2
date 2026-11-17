# Próby odbioru

| Wymaganie | Stan początkowy | Działanie | Wynik oczekiwany | Wynik faktyczny | Kto sprawdził |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Zwykła ścieżka (Naprawa) | Pokój 3 (Rozdzielnia), `latarka: true`, `bezpiecznik: true`, `zasilanie: false`, `energia: 6` | `gra.napraw()` | `zasilanie: true`, `bezpiecznik: false`, `energia: 5`, komunikat `"Akcja wykonana!"` | Zasilanie włączone (`true`), bezpiecznik zużyty (`false`), energia spadła do `5`, komunikat `"Akcja wykonana!"` | Zespół |
| Granica mapy (Brak przejścia) | Pokój 1 (Magazyn), `energia: 10` | `gra.ruch(3)` | Odmowa ruchu, brak zmiany pokoju (`1`) i energii (`10`), komunikat `"Nie możesz tam przejść."` | Pokój nadal `1`, energia nadal `10`, komunikat `"Nie możesz tam przejść."` | Zespół |
| Błędne wejście (Urwany JSON) | Pokój 1, `karta: true`, `energia: 9` | `gra.importuj('{"wersja":1,"stan":{')` | Zwrot `false`, komunikat błędu JSON, brak zmiany stanu gry | Zwrócono `false`, komunikat `"Błąd JSON: ..."`, stan gry bez zmian (`energia: 9`, `karta: true`) | Zespół |
| Zachowanie po błędzie (Anulowany prompt / pusty tekst) | Pokój 1, `karta: true`, `energia: 9` | `gra.importuj(null)` oraz `gra.importuj("")` | Zwrot `false`, komunikat `"Błędny tekst."`, dalsza gra działa poprawnie | Zwrócono `false`, komunikat `"Błędny tekst."`, następny ruch `gra.ruch(2)` działa normalnie | Zespół |
| Eksport i ręczny import | Pokój 2 (Piwnica), `karta: true`, `latarka: true`, `energia: 7` | `gra.eksportuj()`, odświeżenie strony, `gra.importuj(prompt("..."))` | Zwrot `true`, odtworzenie wszystkich pól stanu sprzed odświeżenia | Zwrócono `true`, `gra.status()` pokazał identyczne wartości (`pokoj: 2`, `energia: 7`, `karta: true`, `latarka: true`) | Zespół |
| Test regresji + Nowa zmiana (`gra.griddy()`) | Pokój 1, `energia: 10` | `gra.griddy()`, a następnie `gra.wezKarte()` | Animacja i napis `"🕺 Brawo, zatańczyłeś griddy!"` bez zużycia energii, a `gra.wezKarte()` nadal działa | Wyświetlono animację i kolorowy napis, `energia` pozostała `10`, a `gra.wezKarte()` pobrało kartę (`energia: 9`) | Zespół |

Uwzględnij zwykłą ścieżkę, granicę, błędne wejście i zachowanie po błędzie. Jeden test regresji dotyczy wcześniejszej funkcji, której nowa zmiana miała nie naruszyć.

## Odtworzenie

* **Wersja Node:** Nie dotyczy (projekt działa lokalnie w przeglądarce po otwarciu pliku `index.html`, bez Node i bez serwera).
* **Wersje pakietów / lockfile:** Brak (czysty HTML, CSS i Vanilla JS).
* **Komendy:** Otwarcie `index.html` dwuklikiem -> `F12` (zakładka `Console`) -> wywoływanie metod obiektu `gra` (np. `gra.status()`, `gra.ruch(2)`, `gra.griddy()`).
* **System i przeglądarka:** Windows / Google Chrome (DevTools Console).

## Błąd do poprawy

* **Najkrótsze kroki odtworzenia:** Wywołanie funkcji `gra.wezKarte()` dwukrotnie w pokoju 1 (Magazyn).
* **Oczekiwane:** Za drugim razem funkcja powinna odrzucić akcję i nie odejmować energii.
* **Otrzymane:** Za pierwszym razem pobrała kartę (`karta: true`, `kartaPobrana: true`, `energia: 9`), a za drugim razem warunek `stanPrzed.kartaPobrana` poprawnie zablokował pobranie (`"Nie możesz pobrać karty."`, `energia` nadal `9`).
* **Hipoteza:** Flaga `kartaPobrana` w `engine.js` prawidłowo blokuje wielokrotne podniesienie tego samego przedmiotu (analogicznie `latarkaPobrana` i `bezpiecznikPobrany`).
* **Wynik ponownej próby po poprawce:** Potwierdzono poprawne działanie blokady duplikatów dla wszystkich trzech przedmiotów.

# Próby odbioru

| Wymaganie | Stan początkowy | Działanie | Wynik oczekiwany | Wynik faktyczny | Kto sprawdził |
|---|---|---|---|---|---|
| | | | | | |

Uwzględnij zwykłą ścieżkę, granicę, błędne wejście i zachowanie po błędzie. Jeden test regresji dotyczy wcześniejszej funkcji, której nowa zmiana miała nie naruszyć.

## Odtworzenie

Wersja Node:
Wersje pakietów / lockfile:
Komendy:
System i przeglądarka:

## Błąd do poprawy

Najkrótsze kroki odtworzenia:
Oczekiwane:
Otrzymane:
Hipoteza:
Wynik ponownej próby po poprawce:


# TESTY.md — Raport z testów aplikacji

## Test 1: Lewa granica mapy
* **Stan wejściowy:** Gra uruchomiona, gracz w pokoju 1 (recepcja), energia: 10.
* **Czynność:** Wywołanie w konsoli: `gra.idz("lewo")` (lub próba ruchu w lewo poza planszę).
* **Oczekiwany wynik:** Stan i energia bez zmian, komunikat o ścianie/braku przejścia w konsoli.
* **Rzeczywisty wynik:** Zwrócono `{ojciec/stan...}`, energia pozostała na poziomie 10, w konsoli wyświetlił się komunikat: "Nie możesz iść w tę stronę.".

## Test 2: Przedmiot już zabrany
* **Stan wejściowy:** Gracz w pokoju magazynu podniósł kartę (karta: true).
* **Czynność:** Ponowne wykonanie akcji podniesienia karty: `gra.akcja("karta")`.
* **Oczekiwany wynik:** Brak duplikatu, brak zmiany stanu ekwipunku, energia nie została pobrana, komunikat informujący, że przedmiot został już zabrany.
* **Rzeczywisty wynik:** Stan przedmiotu pozostał bez zmian (karta: true), energia nienaruszona, komunikat: "Przedmiot został już wcześniej zabrany.".

## Test 3: Właściwe miejsce i przedmiot (Naprawa)
* **Stan wejściowy:** Gracz w serwerowni posiadający bezpiecznik, energia: 8, zasilanie: false.
* **Czynność:** Wywołanie akcji naprawy: `gra.akcja("napraw")`.
* **Oczekiwany wynik:** Zmiana pola zasilanie na `true`, zużycie przedmiotu (bezpiecznik: false), pobranie jednej energii (energia spada do 7).
* **Rzeczywisty wynik:** Stan zasilania zmieniony na `true`, bezpiecznik zużyty (false), energia pomniejszona do 7, komunikat o pomyślnej naprawie wyświetlony poprawnie.

## Test 4: Postęp wyeksportowany i ręcznie zapisany
* **Stan wejściowy:** Gra w toku w pokoju 2, energia: 5, z karta: true.
* **Czynność:** Wywołanie `gra.eksportuj()`, skopiowanie surowego JSON, odświeżenie strony i wklejenie do `gra.importuj(prompt())`.
* **Oczekiwany wynik:** Odtworzenie dokładnie zapisanych danych (pokoj: 2, energia: 5, karta: true) bez utraty postępu.
* **Rzeczywisty wynik:** Po imporcie polecenie `gra.status()` potwierdziło identyczne wartości pól jak przed odświeżeniem strony.

## Test 5: Aktywna rozgrywka i import urwanego JSON
* **Stan wejściowy:** Aktywna gra z energią 8 w pokoju 1.
* **Czynność:** Próba importu uszkodzonego stringa: `gra.importuj('{"wersja":1, "stan":{')`.
* **Oczekiwany wynik:** Komunikat błędu składni, stan gry w aplikacji pozostaje całkowicie nienaruszony.
* **Rzeczywisty wynik:** Złapano wyjątek w bloku try/catch, wypisano komunikat o błędzie składni JSON, bieżący stan gracza nie umniejszył się ani nie zmienił.

## Test 6: Brak tekstu lub anulowane okno w imporcie
* **Stan wejściowy:** Aktywna gra o dowolnym stanie.
* **Czynność:** Wywołanie importu z pustym ciągiem lub wynikiem anulowania okna prompt (`gra.importuj("")` lub `gra.importuj(null)`).
* **Oczekiwany wynik:** Czytelna odmowa wykonania importu, brak zmian w rozgrywce.
* **Rzeczywisty wynik:** Funkcja zwróciła `false`, wyświetliła komunikat o braku tekstu, stan gry pozostał stabilny.
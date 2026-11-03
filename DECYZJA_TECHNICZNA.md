# Decyzja techniczna zespołu

- Problem użytkownika lub implementacji:
- Ograniczenie, którego nie możemy zmienić:
- Wariant A i jego koszt:
- Wariant B i jego koszt:
- Krótka próba porównawcza i wynik:
- Wybór oraz uzasadnienie:
- Kiedy wrócimy do decyzji:
- Które kontrakty lub pliki trzeba zaktualizować:

Wystarczy kilka zdań. Nie oceniamy długości dokumentu ani popularności autora pomysłu.

=================================================
# Decyzje Architektoniczne

## Wybrany Kontrakt Stanu Gry
Wersja zapisu: "1.0.0"
Obiekt stanu zawiera pola:
- pokoj (number, zakres 1-4)
- energia (number, zakres 0-10)
- karta (boolean)
- bezpiecznik (boolean)
- zasilanie (boolean)
- koniec (boolean)
- wersja (string)

## Alternatywa
Przechowywanie przedmiotów w tablicy `ekwipunek: ["karta"]`.

## Powód wyboru
Wersja z osobnymi polami boolean (karta: false/true) jest łatwiejsza do głębokiej walidacji typów bez używania pętli i metod tablicowych, co przyspieszy działanie silnika w czystym JS.

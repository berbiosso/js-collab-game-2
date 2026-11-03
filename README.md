# js-collab-game-2
Second collab
===============================
# UCIECZKA Z BUDYNKU

## Opis gry

Gracz musi wydostać się z budynku.
Musi znaleźć kartę, latarkę i bezpiecznik,
naprawić zasilanie i dotrzeć do wyjścia.

## Uruchomienie

1. Otwórz folder z grą.
2. Kliknij dwa razy index.html.
3. Naciśnij F12.
4. Otwórz Console.
5. Wpisz gra.status().

Nie trzeba instalować Node.js ani serwera.

## Zasady gry

- Gracz zaczyna z 10 punktami energii.
- Pokój 1 zawiera kartę i latarkę.
- Pokój 2 zawiera bezpiecznik.
- Pokój 3 służy do naprawy zasilania.
- Pokój 4 zawiera wyjście.
- Latarka jest potrzebna do naprawy.
- Każda udana akcja kosztuje 1 energię.
- Odmowa nie zabiera energii.
- Brak energii oznacza przegraną.

## Komendy

- gra.status() – pokazuje stan gry.
- gra.ruch(2) – przechodzi do pokoju 2.
- gra.wezKarte() – zabiera kartę.
- gra.wezLatarke() – zabiera latarkę.
- gra.wezBezpiecznik() – zabiera bezpiecznik.
- gra.napraw() – naprawia zasilanie.
- gra.wyjdz() – próbuje opuścić budynek.
- gra.reset() – rozpoczyna grę od nowa.
- gra.eksportuj() – eksportuje postęp.
- gra.importuj(tekst) – importuje postęp.

## Zapisywanie gry

1. Wpisz gra.eksportuj().
2. Skopiuj otrzymany tekst JSON.
3. Otwórz edytor tekstu.
4. Wklej tekst.
5. Zapisz jako postep.json.

## Wczytywanie gry

1. Otwórz postep.json.
2. Skopiuj jego zawartość.
3. W konsoli wpisz:

gra.importuj(prompt("Wklej JSON"));

4. Wklej tekst do okna.
5. Kliknij OK.
6. Wpisz gra.status().

## Technologie

HTML i JavaScript.
Gra działa bez serwera i localStorage.
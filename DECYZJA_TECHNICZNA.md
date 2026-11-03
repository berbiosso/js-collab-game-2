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
# DECYZJE

## Wybrany sposób działania

Gra ma 4 pokoje.

Gracz posiada:
- energię,
- kartę,
- latarkę,
- bezpiecznik,
- informację o zasilaniu.

Funkcja przejscie() odpowiada za zasady gry.

Funkcja czyStan() sprawdza poprawność stanu.

Odmowa nie zmienia stanu i nie zabiera energii.

Zapis gry ma format JSON z wersją 1.

## Dodatkowa funkcja

Dodaliśmy latarkę.

Latarka znajduje się w pokoju 1.
Jest potrzebna do naprawy zasilania w pokoju 3.

## Alternatywa

Mogliśmy zrobić grę bez latarki.

Wybraliśmy latarkę, ponieważ dodaje
jedną prostą zasadę i urozmaica grę.
# Määrittelydokumentti

Ohjelman tarkoituksena on luoda halutun pituisia soittolistoja annetusta videolistasta, käyttäen Knapsack [1,2] -algoritmia. Algoritmille annetaan lista YouTube -videoista sekä halutun soittolistan pituus. Näistä videoista valikoidaan kombinaatio, joista muodostuu halutun pituinen yhdistelmä videoita. Algoritmille voidaan antaa esimerkiksi lista tuhannesta videosta ja näiden pituuksista, sekä haluttu soittolistan pituus. Algoritmi valitsee listalta videot, joista muodostuu soittolista, joka on mahdollisimman lähellä annettua pituutta, mutta ei kuitenkaan ylitä annettua pituutta.

Knapsack -algoritmissa on siis ajatuksena, että käytössä on tila, johon mahtuu vain rajallinen määrä asioita ja tila tulisi käyttää mahdollisimman tehokkaasti, niin että hukkatilaa jää mahdollisimman vähän. Tilaan laitettavilla asioilla on tietty arvo, esimerkiksi paino tai pituus, tässä harjoitustyössä pituus, jonka perusteella tilaan sijoitetaan asioita.

Tietorakenteina jono ja hashmap.
Algoritmi saa arvokseen hashmapin, joka sisältää videon osoitteen sekä pituuden.
Algoritmin palautusarvo on jono, jossa on kaikki soittolistalle mahtuvien videoiden osoitteet.

Algoritmin aika- ja tilavaatimus on `O(nW)`, jossa `W` on halutun soittolistan pituus.

Jonon aika- ja tilavaatimus on `O(n)`. Jonossa lisäys- ja poisto-operaatioiden aika- ja tilavaatimukset on `O(1)` [4].

Ohjelma kehitetään web-sovelluksena, käyttäen React kirjastoa ja Typescript kieltä.

## Lähteet
- [1] https://en.wikipedia.org/wiki/Knapsack_problem Knapsack problem - Ladattu 20.7.2020
- [2] http://www.es.ele.tue.nl/education/5MC10/Solutions/knapsack.pdf Lecture 13: The Knapsack Problem - Ladattu 20.7.2020
- [3] https://en.wikipedia.org/wiki/Queue_(abstract_data_type) Queue (abstract data type) - Ladattu 20.7.2020

# Määrittelydokumentti

Ohjelman tarkoituksena on luoda halutun pituisia soittolistoja annetusta videolistasta, käyttäen `Knapsack` [1,2] -algoritmia. Algoritmin suomenkielinen termi on `Repunpakkaus` [3]. Algoritmi on NP-täydellinen ongelma, näin se on ollen laskennallisesti vaativa. Toteuttamalleni algoritmille annetaan lista YouTube -videoista sekä halutun soittolistan pituus. Näistä videoista valikoidaan kombinaatio, joista muodostuu halutun pituinen yhdistelmä videoita. Algoritmille voidaan antaa esimerkiksi lista tuhannesta videosta ja näiden pituuksista, sekä haluttu soittolistan pituus. Algoritmi valitsee listalta videot, joista muodostuu soittolista, joka on mahdollisimman lähellä annettua pituutta, mutta ei kuitenkaan ylitä annettua pituutta.

Knapsack -algoritmissa on siis ajatuksena, että käytössä on tila, johon mahtuu vain rajallinen määrä asioita ja tila tulisi käyttää mahdollisimman tehokkaasti, niin että hukkatilaa jää mahdollisimman vähän. Tilaan laitettavilla asioilla on tietty arvo, esimerkiksi paino tai pituus, tässä harjoitustyössä pituus, jonka perusteella tilaan sijoitetaan asioita.

Tietorakenteina jono ja map.
Algoritmi saa kaksi arvoa; halutun soittolistan pituuden sekä jonon, jonka jokainen alkio on map muodossa oleva tietorakenne. Tämä rakenne sisältää avain/arvo -pareina videon osoitteen, otsikon sekä pituuden. Tästä tiedosta pituus on algoritmin kannalta tärkein.
Algoritmin palautusarvo on jono, jossa jokainen alkio on myös map muotoinen tietorakenne.

Algoritmin aika- ja tilavaatimus on `O(nW)`, jossa `W` on halutun soittolistan pituus.

Jonon tilavaatimus on `O(n)`. Jonossa lisäys- ja poisto-operaatioiden aikavaatimukset on `O(1)` [4].
Mapin tilavaatimus on `O(n)`. Mapissa lisäysoperaation aikavaatimus on `O(1)`, kun taas poiston aikavaatimus on `O(n)` [5].

Ohjelma kehitetään web-sovelluksena, käyttäen React kirjastoa ja Typescript kieltä.

Koska algoritmi on NP-täydellinen ongelma, on se laskennallisesti vaativa ongelma. Tästä johtuen tutkin mahdollisuuksia performanssitestien kirjoittamiseen sekä teen graafin joka kuvastaa suoritusajan kasvua syötteen kasvun myötä.

## Lähteet
- [1] https://en.wikipedia.org/wiki/Knapsack_problem Knapsack problem - Ladattu 20.7.2020
- [2] http://www.es.ele.tue.nl/education/5MC10/Solutions/knapsack.pdf Lecture 13: The Knapsack Problem - Ladattu 20.7.2020
- [3] https://www.cs.helsinki.fi/u/ahslaaks/kkkk.pdf Kisakoodarin käsikirja, Antti Laaksonen - Ladattu 21.7.2020
- [4] https://en.wikipedia.org/wiki/Queue_(abstract_data_type) Queue (abstract data type) - Ladattu 20.7.2020
- [5] https://en.wikipedia.org/wiki/Associative_array#Comparison Associative array - Ladattu 24.7.2020

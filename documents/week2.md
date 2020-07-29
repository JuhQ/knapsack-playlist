# Viikko 2

## Mitä saatu aikaiseksi

Rakensin komponentin jonka avulla voidaan valita halutut videot algoritmille annettavalle datasetille. Tätä ennen videot valikoitiin satunnaisesti. Satunnaisvalikointi on edelleen, sen käyttöliittymä on nyt vähän yksinkertaisempi ja selkeämpi. Suurempia näkymäkomponentteja on myös paloiteltu pienempiin osiin kehitystyön helpottamiseksi.

Array tietorakenne korvattiin jonoksi ja knapsack algoritmi ottaa nyt sisään jonon ja palauttaa jonon.

Käyttöliittymässä javascript array korvattiin ArrayList tietorakenteella.

## Mikä jäi epäselväksi tai tuotti vaikeuksia

Vaikeuksia koittaneet asiat korjattu.

## Mitä teen seuraavaksi

Käyttöliittymää tulee parantaa, sekä intuitiivisemmaksi että tehokkaammaksi. Algoritmille ei vielä voi antaa painotettuja videoita, tähän täytyy tällä viikolla tutustua ja pohtia lähestymistapa painostusten tekemiseen. Alkuperäisessä ajatuksessani oli myös, että soittolistalle voi lisätä alku- ja loppuspiikit, sekä "mainoskatkot". Tällä viikolla pohdin keinoja miten tämän saisi järkevästi toteutettua. Varmaankin jotenkin niin, että näiden välispiikkien/mainoskatkojen pituus vähennetään annetusta pituudesta, jotta näille on tilaa. Sitten kappaleet valitaan tämän lyhyemmän pituuden perusteella ja alkuspiikki laitetaan jonon alkuun, loppuspiikki jonon loppuun ja "mainoskatkot" ripotellaan sopivin aikavälein.


## Ajanseuranta

| Päivä	| Käytetty aika	| Mihin aikaa käytettiin	|
| ------|:-------------:|------:|
| 25.7.	| 4h		| Videoiden valitsin ja käyttöliittymän tuunailua. |
| 26.7.	| 1h		| Uutta musiikkia, käyttöliittymän viilailua sekä picker komponenttiin sivutuksen lisääminen |
| 27.7.	| 4h		| Jono tietorakenteen implementointia sekä komponenttien ja testien muuttaminen käyttämään jonoa |
| 29.7.	| 2h		| ArrayList tietorakenteen implementointia |

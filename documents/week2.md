# Viikko 2

## Mitä saatu aikaiseksi

Rakensin komponentin jonka avulla voidaan valita halutut videot algoritmille annettavalle datasetille. Tätä ennen videot valikoitiin satunnaisesti. Satunnaisvalikointi on edelleen, sen käyttöliittymä on nyt vähän yksinkertaisempi ja selkeämpi. Suurempia näkymäkomponentteja on myös paloiteltu pienempiin osiin kehitystyön helpottamiseksi.


## Mikä jäi epäselväksi tai tuotti vaikeuksia

Videovalitsin komponentti renderöi kaikki videot sivulle kerralla. Jokaista videota kohti renderöidään useita DOM-elementtejä, ja tämä aiheuttaa hitautta esimerkiksi yksittäisen videon valitsemisen vasteajassa, sekä halutun soittolistan pituuden määrittämisessä. Täytyy selvitellä, lomakkeella on tapahtumakuuntelija, jonka siirtäminen pois tästä suuremmasta komponentista voisi ehkä auttaa.

## Mitä teen seuraavaksi

Käyttöliittymää tulee parantaa, sekä intuitiivisemmaksi että tehokkaammaksi. Algoritmille ei vielä voi antaa painotettuja videoita, tähän täytyy tällä viikolla tutustua ja pohtia lähestymistapa painostusten tekemiseen. Alkuperäisessä ajatuksessani oli myös, että soittolistalle voi lisätä alku- ja loppuspiikit, sekä "mainoskatkot". Tällä viikolla pohdin keinoja miten tämän saisi järkevästi toteutettua. Varmaankin jotenkin niin, että näiden välispiikkien/mainoskatkojen pituus vähennetään annetusta pituudesta, jotta näille on tilaa. Sitten kappaleet valitaan tämän lyhyemmän pituuden perusteella ja alkuspiikki laitetaan jonon alkuun, loppuspiikki jonon loppuun ja "mainoskatkot" ripotellaan sopivin aikavälein.


## Ajanseuranta

| Päivä	| Käytetty aika	| Mihin aikaa käytettiin	|
| ------|:-------------:|------:|
| 25.7.	| 4h		| Videoiden valitsin ja käyttöliittymän tuunailua. |

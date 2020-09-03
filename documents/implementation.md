# Toteutusdokumentti

Ohjelman tarkoituksena on luoda halutun pituisia soittolistoja annetusta videolistasta, käyttäen `Knapsack` [1,2] -ongelmaa varten toteutettua algoritmia. Ohjelma toteutettiin websovelluksena typescript kielellä ja react kirjastolla. Toteutuneessa sovelluksessa voidaan luoda soittolistoja youtube videoista. Sovellus sisältää noin tuhannen videon tietokannan, josta soittolista luodaan käyttäen tietokannan osajoukkoa.

## Saavutetut aika- ja tilavaativuudet

Algoritmi kehitettiin niin, että se ensin tarkistaa mikäli osajoukon yhteispituus on pienempi tai yhtä suuri kuin halutun soittolistan pituus, ja jos näin on, palautetaan annettu osajoukko tulokseksi. Tällöin aikavaatimus optimitapauksessa on `O(n)`, jossa `n` on osajoukon pituus. Algoritmin aikavaatimus on kuitenkin keskiarvona ja huonoimmassa tapauksessa `O(nW)`, jossa `n` on osajoukon pituus ja `W` on halutun soittolistan pituus sekunneissa.

Algoritmin tilavaatimus on `O(nW)`, jossa `n` on osajoukon pituus ja `W` on halutun soittolistan pituus sekunneissa


## Performanssitestien tuloksia

![Performanssitestien käyrät](graphs/performance-test-growth-chart.png)<br />
*Kuvaaja josta selviää miten nopeasti toteutettu algoritmi suoriutuu mistäkin datasetistä*

Ylläoleva kuvaaja on piirretty performanssitestien tuloksista. Sama kuvaaja löytyy myös [testausdokumentista](testplan.md). Kuvaaja on sortattu niin että ensimmäisenä vasemmalta löytyy nopeimmat datasetit ja oikealle mentäessä algoritmin suoritus hidastuu. Nopein datasetti toteuttamalleni algoritmille on 15 videota ja neljän tunnin soittolista. Hitain taasen on 30 videota ja tunnin soittolista.


## Kuinka tätä voisi jatkokehittää?

Ongelmalle pitäisi ehdottomasti kehittää dynaamista ohjelmointia hyödyntäen versio, joka pitää muistissa generoituja soittolistoja ja valitsee taulukon alaoikealta viimeisen listan. Omien aikataulupaineiden vuoksi en saanut tuota kyseistä versiota valmiiksi käyttämälläni tietorakenteella.

Jatkokehitystä ajatellen tulisi myös tämä hypoteettinen dynaamisella ohjelmoinnilla toteutettu versio performanssitestata samalla datasetillä, ja näitä kahta implementaatiota tulisikin vertailla keskenään.

Mikäli tätä jatkokehitettäisiin tätä kurssia pidemmälle, tulisi tietorakennettakin varmasti parantaa joillain tavoin. En esimerkiksi ole kovinkaan tyytyväinen valitsemaani `seconds` avaimeen listojen alkioissa, kuvaavampi nimi voisi olla esimerkiksi `length` tai `lengthInSeconds`.

Myöskin sovelluksen käyttöliittymä vaatisi paljon muutoksia, jotta se olisi intuitiivisempi.


## Lähteet
- [1] https://en.wikipedia.org/wiki/Knapsack_problem Knapsack problem - Ladattu 20.7.2020
- [2] http://www.es.ele.tue.nl/education/5MC10/Solutions/knapsack.pdf Lecture 13: The Knapsack Problem - Ladattu 20.7.2020

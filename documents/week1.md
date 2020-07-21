# Viikko 1

## Mitä saatu aikaiseksi

Projektin ideaksi muodostui soittolistan luominen Knapsack -algoritmia käyttäen. Idean lisäksi github repositorio on luotu ja ohjelmakoodin toteutus on aloitettu. Dokumentaatio on aloitettu.

Projektiin on määritelty lintterit, testityökalut sekä git pre-commit hook, joka ajaa lintterit ennen kuin koodia voi commitoida.
Testityökaluihin on nyt määritelty optimisesti 100% testikattavuus tavoitteeksi. Testityökalun konfiguraatiot löytyy juuren [package.json](/package.json) tiedostosta kohdasta `jest`.

Algoritmista muodostui ensimmäinen versio, joka pohjautuu osittain `Koodarin käsikirjasta` löytyvään esimerkkitoteutukseen.

Github actions konfiguroitu niin, että se generoi testikattavuusraportin sekä buildaa lähdekoodit automaattisesti joka kerta, kun master haara päivittyy Githubissa. Sovellus julkaistaan automaattisesti osoitteeseen [https://juhq.github.io/knapsack-playlist/](https://juhq.github.io/knapsack-playlist/), josta löytyy myös [testikattavuusraportti](https://juhq.github.io/knapsack-playlist/coverage/lcov-report/).

## Mikä jäi epäselväksi tai tuotti vaikeuksia

Luentomateriaalissa mainittiin että valmiita tietorakenteita ei saisi käyttää. Materiaalissa mainittiin myös että valmiita tietorakenteita voi kuitenkin alkuun käyttää, ja korvata ne omalla toteutuksella, kun algoritmi toimii. Koska teen labraa typescriptillä, joka kääntyy javaskriptiksi, niin mietinkin mitkä tietorakenteista on sallittuja ja mitkä ei? Lista ja objekti ei taida siis olla sallittu?

## Mitä teen seuraavaksi

Algoritmin jatkokehittäminen, tarkastelu ja validointi, sekä testien järkevyyden validointi. Kun algoritmi toimii testeissä, alan kehittämään sen ympärille käyttöliittymää, josta voi alkuun kovakoodatulla datalla luoda halutun pituisia listoja. Kun listan generointi toimii, luon käyttöliittymän sekä soittolistalle että YouTube -soittimelle.

Youtuben hakurajapinta tarjoaa videolistan, mutta listan tuloksista puuttuu videoiden pituudet. Näin ollen kurssin aikana kerään manuaalisesti youtuben sivuilta tätä tietoa. Tavoitteenani on kerätä noin tuhannen videon tietokanta.



## Ajanseuranta

| Päivä	| Käytetty aika	| Mihin aikaa käytettiin	|
| ------|:-------------:|------:|
| 20.7.	| 4h		| Projektin alustaminen ja dokumentaation aloittaminen. |
| 21.7.	| 6h		| Algoritmin kehittäminen ja sille testien kirjoittaminen |

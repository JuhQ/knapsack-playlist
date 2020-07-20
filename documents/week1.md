# Viikko 1

Vastaa kirjoituksessa esimerkiksi seuraaviin kysymyksiin:

- Mitä olen tehnyt tällä viikolla?
- Miten ohjelma on edistynyt?
- Mitä opin tällä viikolla / tänään?
- Mikä jäi epäselväksi tai tuottanut vaikeuksia? Vastaa tähän kohtaan rehellisesti, koska saat tarvittaessa apua tämän kohdan perusteella.
- Mitä teen seuraavaksi?

## Mitä saatu aikaiseksi

Projektin ideaksi muodostui soittolistan luominen Knapsack -algoritmia käyttäen. Idean lisäksi github repositorio on luotu ja ohjelmakoodin toteutus on aloitettu. Dokumentaatio on aloitettu.

Projektiin on määritelty lintterit, testityökalut sekä git pre-commit hook, joka ajaa lintterit ennen kuin koodia voi commitoida.
Testityökaluihin on nyt määritelty optimisesti 100% testikattavuus tavoitteeksi. Testityökalun konfiguraatiot löytyy juuren [package.json](/package.json) tiedostosta kohdasta `jest`.

## Mikä jäi epäselväksi tai tuotti vaikeuksia

Luentomateriaalissa mainittiin että valmiita tietorakenteita ei saisi käyttää. Materiaalissa mainittiin myös että valmiita tietorakenteita voi kuitenkin alkuun käyttää, ja korvata ne omalla toteutuksella, kun algoritmi toimii. Koska teen labraa typescriptillä, joka kääntyy javaskriptiksi, niin mietinkin mitkä tietorakenteista on sallittuja ja mitkä ei? Lista ja objekti ei taida siis olla sallittu?

## Mitä teen seuraavaksi

Algoritmin kehittäminen ja ensimmäisten oikeiden testien kirjoittaminen. Kun algoritmi toimii testeissä, alan kehittämään sen ympärille käyttöliittymää, josta voi alkuun kovakoodatulla datalla luoda halutun pituisia listoja. Kun listan generointi toimii, luon käyttöliittymän sekä soittolistalle että YouTube -soittimelle.

Kun soittolistaa voi käyttää ja videoita voi toistaa, alan tutustumaan YouTuben rajapintaan, jotta kovakoodatun datan voi korvata oikeasta rajapinnasta tulevalla datalla. Mikäli tämä tuottaa ongelmia, kerään lisää dataa ja teen oman mock -rajapinnan tällä datalla.



## Ajanseuranta

| Päivä	| Käytetty aika	| Mihin aikaa käytettiin	|
| ------|:-------------:|------:|
| 20.7.	| 4h		| Projektin alustaminen ja dokumentaation aloittaminen. |

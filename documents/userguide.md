# Käyttöohjeet

Projektin käyttöohjeet

## Sovelluksen käyttöohjeet

Tarkemmat käyttöohjeet tulee myöhemmin.
Sovellusta voi käyttää verkossa osoitteesta [https://juhq.github.io/knapsack-playlist/](https://juhq.github.io/knapsack-playlist/).

## Kehityksen tukena olevat komennot

### `npm install`

Jotta projektia voi ajaa, kehittää, testata, tulee ensin asentaa projektin riippuvuudet. Projektin suurin riippuvuus on tietenkin node.js ympäristö, ilman nodea et voi ajaa npm komentoa, etkä näin ollen mitään alla olevista komennoista.

Ennen kuin mitään alla olevaa komentoa voi ajaa, ajathan ensin `npm install` komennon.


### `npm start`

Tämä komento käynnistää ohjelman kehitysmoodissa.<br />
Kehitysympäristö toimii selaimessa osoitteessa [http://localhost:3000](http://localhost:3000) ja päivittyy automaattisesti kun lähdekoodiin tehdään muutoksia.

### `npm test`

Tämä komento ajaa testit interaktiivisessa moodissa.

### `npm run test-coverage`

Tämä komento ajaa testit sekä generoi kattavuusraportin. Raportin löytää [coverage](/coverage/lcov-report) hakemistosta. Githubissa generoitu kattavuusraportti ei ole helposti luettavissa, kannattaakin kloonata projekti omalle koneelle ja avata raportit selaimessa.

Mikäli testit halutaan ajaa ilman kattavuusraportin luontia, onnistuu se komennolla `npm test`.

### `npm run lint`

Tällä komennolla voidaan tarkistaa lähdekoodin laatu. Lintterit on konfiguroitu käyttämään [airbnb eslint konfiguraatiota](https://www.npmjs.com/package/eslint-config-airbnb) sekä [prettier eslint konfiguraatiota](https://www.npmjs.com/package/prettier-eslint). Tämä komento on myös määritelty [`husky`](https://www.npmjs.com/package/husky) paketin avulla git pre-commit hookiksi, jolloin jokainen tiedosto tarkistetaan automaattisesti ennen git committia.

Mikäli käytössä on vscode editori, voidaan editori määritellä niin, että tallennuksen yhteydessä koodi formatoidaan näiden sääntöjen mukaan.

```
"[typescript]": {
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Tämä asetus kuitenkin vaatii [`esbenp.prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) laajennuksen käyttöönottoa.
Typescriptiä työstäessä vscodeen voi asentaa muitakin hyödyllisiä laajennuksia kuten [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ja [`ms-vscode.vscode-typescript-tslint-plugin`](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin).


### `npm run build`

Mikäli projektin haluaa kääntää tuotantokelpoiseksi, saadaan se aikaiseksi tällä komennolla. Käännetty koodi ilmestyy `build` hakemistoon, mutta sitä ei sellaisenaan voi ajaa, vaan se tulisi "deployata" johonkin ympäristöön. Deployaamisen sijaan voi ajaa myös komennon `node node-server.js`, joka toimii palvelimen joka jakaa `build` hakemiston sisältöä osoitteessa `http://localhost:3001`.

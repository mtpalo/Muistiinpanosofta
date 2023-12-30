# Käytetyt työkalut

## Win11

* VSCode 1.85.1
* WSL v0.81.8 (VSCode extension)

## WSL2 (windows subsystem linux)

* Ubuntu 20.04.6 LTS
* git 2.25.1
* nvm 0.39.5
* NodeJS 16.14.0
* npm 9.9.2
* Svelte for VS Code v108.1.0

# Sovelluksen ajaminen

Asennetaan riippuvuudet komennolla:

```shell
npm install
```

Kehitysversion käynnistys:

```shell
npm run dev
```

# Sovelluksen toiminta

## Routes

### /

Create-näkymään ei pääse, jos kursseja ei ole. Title-attribuutin kautta ilmoitus käyttäjälle ("Luo kurssi ensin").

### /create

Luodaan muistiinpanoja. Sivun "BACK"-painikkeella voidaan istunto aloittaa uudelleen. Samalla lisättyjen muistiinpanojen näkymä tyhjenee.

Uusi istunto alkaa myös, kun käydään päänäkymässä (etusivu '/').

### /list

Listaa kurssien muistiinpanot. Muistiinpanon voi poistaa muistiinpano-komponentin oikeassa alalaidassa olevasta ruksista.

### /add

Kurssin lisääminen. Onnistuneesta kurssin lisäyksestä annetaan ilmoitus käyttäjälle. Jo olemassa olevasta saman nimisestä kurssista annetaan ilmoitus (varoitus). Tyhjästä input-kentän arvosta annetaan myös ilmoitus käyttäjälle (varoitus).

Kenttää ei tyhjennetä, jos kurssin lisääminen ei onnistu (mahdollistetaan nimen muokkaaminen). Tässä tapauksessa kurssi on jo olemassa.

Tehtävänannon mukaan kursseja ei voi poistaa.

# Huomioita sovelluksesta

* sovellus on responsiivinen (css-määrittelyt)
* tiedostossa +layout.svelte tehdään muistiinpanojen ja kurssien lisäys storeen populate-metodilla (APIsta)
* komponentteja ovat NavButton (navigointi), Button, Footer, Note (muistiinpano) ja Select (valikko)
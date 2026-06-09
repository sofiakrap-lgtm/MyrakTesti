# Kotileipomo Karpalo – DEMO-nettisivupohja

Uudelleenkäytettävä, staattinen demo-nettisivu tilauskakkuyritykselle.
Puhdasta **HTML + CSS + vanilla JS** – ei frameworkia, ei build-vaihetta.
Toimii suoraan GitHub Pagesissa ja myös avaamalla `index.html` paikallisesti.

> **Tämä on demo.** Lomakkeet ja ostoskori eivät oikeasti lähetä tai veloita –
> ne näyttävät demo-vahvistuksen. Tarkoitus on näyttää asiakkaalle, miltä
> valmis sivu toimii ja mihin eri painikkeet vievät.

---

## 📁 Tiedostorakenne

```
leipomo-demo/
├── index.html            Etusivu
├── tuotteet.html         Verkkokauppa (haku, suodatus, kori)
├── tilaa.html            Räätälikakun tilauslomake
├── palvelut.html         Palvelut
├── catering.html         Catering + tarjouspyyntö
├── tapahtumat.html       Tapahtumat / kurssit
├── galleria.html         Kuvagalleria
├── meista.html           Leipojan tarina
├── ukk.html              Usein kysyttyä
├── yhteystiedot.html     Toimipisteet, aukiolot, kartta
├── tilausehdot.html      Tilaus- ja toimitusehdot (esimerkki)
├── tietosuoja.html       Tietosuojaseloste (esimerkki)
├── css/style.css         Koko sivuston tyylit (design-järjestelmä)
├── js/main.js            Navi, haku, kori, lomakkeet, renderöinti
├── data/site.js          ⭐ KAIKKI MUOKATTAVA SISÄLTÖ TÄÄLLÄ
└── assets/               Logo ja ikonit
```

---

## ✏️ 1. Miten muokkaan sisältöä

**Lähes kaikki sisältö muokataan yhdestä tiedostosta: [`data/site.js`](data/site.js).**

Avaa tiedosto tekstieditorissa ja muuta arvoja. Sieltä löytyy:

- **Yrityksen nimi, iskulause ja kuvaus**
- **Puhelin ja sähköposti**
- **Somelinkit** (Facebook, Instagram, Pinterest, TikTok – tyhjennä `""` jos kanavaa ei ole)
- **Toimipisteet** (osoite, puhelin, aukiolot, poikkeusaukiolot)
- **Tuotteet** (nimi, kuvaus, alkaen-hinta, koot, ruokavaliovariaatiot, annoskoko, allergeenit)
- **Galleria** (kuvatekstit)
- **Tapahtumat** (päivä, otsikko, kuvaus)
- **Footerin "Sivuston rakentaja" -rivi** (`rakentaja`)

> Tuotteet, galleria ja tapahtumat renderöityvät automaattisesti tämän datan
> perusteella – sinun ei tarvitse koskea HTML-sivuihin.

Sivukohtaiset leipätekstit (esim. "Meistä"-tarina, UKK-vastaukset, ehdot)
muokataan suoraan kyseisen sivun `.html`-tiedostosta.

---

## 🖼️ 2. Miten vaihdan kuvat

Kaikki kuvat ovat tällä hetkellä **paikkamerkkejä** (lämmin gradientti +
"oma kuva tähän"). Vaihtaminen on tehty helpoksi:

### a) Tuote-, galleria- ja tapahtumakuvat (data/site.js)
Aseta kuvan polku tuotteen/gallerian `kuva`-kenttään:
```js
{ nimi: "Vintagekakku", kuva: "assets/vintagekakku.jpg", ... }
```
Tyhjä `""` = paikkamerkki näkyy.

### b) Kiinteät sivukuvat (hero, "meistä" jne.)
Etsi sivulta elementti, jossa on luokka `kuvapaikka`, ja muuta se kuvaksi:
```html
<!-- ennen -->
<div class="kuvapaikka kuvapaikka--laaja"><span class="kuvapaikka__teksti">oma kuva tähän</span></div>

<!-- jälkeen -->
<div class="kuvapaikka kuvapaikka--laaja has-img" role="img" aria-label="Hääkakku"
     style="background-image:url('assets/hero.jpg')"></div>
```
Luokka `has-img` piilottaa paikkamerkkitekstin automaattisesti.

### c) Logo
Korvaa tiedosto **`assets/logo.svg`** omalla logollasi (sama tiedostonimi).

### 📐 Suositellut kuvakoot
| Käyttö            | Suositeltu koko        | Suhde |
|-------------------|------------------------|-------|
| Hero-kuva         | 1200 × 900 px          | 4:3   |
| Tuotekortti       | 800 × 600 px           | 4:3   |
| Galleria          | 800 × 800 px           | 1:1   |
| Logo              | SVG tai 200 × 200 px   | –     |

> Optimoi kuvat verkkoon (esim. JPG/WebP, alle ~300 kt) latausnopeuden vuoksi.

---

## 🎨 3. Miten vaihdan värit ja fontit (brändi)

Avaa [`css/style.css`](css/style.css). Heti alussa on `:root`-lohko, jossa
kaikki värit, fontit ja pyöristykset ovat muuttujina. Muuta vain niitä:

```css
:root {
  --terra: #C0633F;   /* pääväri / napit */
  --berry: #8E3B4E;   /* aksentti */
  --font-otsikko: 'Fraunces', serif;
  --font-leipa: 'Inter', sans-serif;
  /* ... */
}
```

Jos vaihdat fontit, päivitä myös Google Fonts -linkki jokaisen `.html`-sivun
`<head>`-osassa.

---

## 🚀 4. Miten julkaisen GitHub Pagesiin

1. Vie tiedostot GitHub-repositorioon (ks. alla "uusi asiakas").
2. Mene repon **Settings → Pages**.
3. Kohdassa **Build and deployment → Source** valitse **Deploy from a branch**.
4. Valitse haara (esim. `main`) ja kansio (`/root`), paina **Save**.
5. Hetken kuluttua sivu on osoitteessa
   `https://<käyttäjänimi>.github.io/<repon-nimi>/`.

> Jos demo on alikansiossa (kuten tässä repossa `leipomo-demo/`), linkki on
> `https://<käyttäjänimi>.github.io/<repon-nimi>/leipomo-demo/`.

---

## 👥 5. Miten kloonaan pohjan uudelle asiakkaalle

Suositeltu tapa: **oma repo jokaiselle asiakkaalle** → jokainen saa oman
selkeän osoitteen.

1. Luo GitHubissa uusi repo, esim. `leipomo-asiakas`.
2. Kopioi tämän kansion sisältö uuteen repoon.
3. Muokkaa **`data/site.js`** asiakkaan tiedoilla.
4. Vaihda **`assets/logo.svg`** ja kuvat asiakkaan omiin.
5. Säädä värit/fontit **`css/style.css`**:n `:root`-lohkossa.
6. Kun sivu on valmis asiakkaalle, **poista demo-elementit**:
   - Ohut "DEMOVERSIO"-yläpalkki: `renderHeader`-funktiossa tiedostossa `js/main.js`.
   - Lomakkeiden/korin demo-vahvistustekstit kytketään oikeaan lähetykseen/maksuun.
7. Julkaise GitHub Pagesiin (kohta 4).

---

## ♿ Saavutettavuus & tekniikka

- Semanttinen HTML, näkyvä focus-tila, alt-tekstit, "siirry sisältöön" -linkki.
- Mobiili ensin, täysin responsiivinen.
- Kunnioittaa `prefers-reduced-motion`-asetusta.
- Kaikki linkit suhteellisia → toimii myös paikallisesti `file://`-tilassa.

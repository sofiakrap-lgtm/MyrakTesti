# studio blomma — verkkosivut

Lämmin, 70-luvun retro-editorial-tyylinen sivusto verkkosivujen suunnittelupalvelulle.
Pelkkä HTML + CSS + vanilla JS — ei build-vaihetta. Avaa `index.html` selaimessa.

## Sivut
- `index.html` — etusivu: palvelut, "näin se toimii", toimialat
- `laskuri.html` — alakohtaiset hintalaskurit (leipomo, kahvila, ravintola, kampaamo, muu)
- `tarjouspyynto.html` — tarjouspyyntö + suunnittelulomake (värit, tyyli, toiminnot)
- `style.css` — koko design-system (värit, fontit, komponentit)
- `script.js` — laskurin logiikka, esitäyttö lomakkeelle, lomakkeen lähetys

## Brändi
Nimi on **studio blomma** (blomma = kukka). Tunnusmerkki on viisilehtinen kukka.

### Värit (style.css → :root)
- Kerma `#F4EDE0` · Terracotta `#9C4A2D` · Sinappi `#E6B23E`
- Oranssi `#DD5A26` (vain korostukset) · Pölynsininen `#A6B5BD` · Ruskea teksti `#3A2A21`

### Fontit (Google Fonts)
Fraunces (otsikot, serif) · Inter (leipä/labelit) · Pinyon Script (käsinkirjoitettu aksentti) ·
Baloo 2 (logo-wordmark, lihava pyöreä)

## Logo & kukka
- **Wordmark** "studio blomma" ladotaan tekstinä Baloo 2 -fontilla (`.brand`-luokka), joten se
  skaalautuu terävänä ja sen värin voi vaihtaa CSS:llä.
- **Kukkamerkki** on inline-SVG-symbolina (`#s-flower` täytetty, `#s-bloom` ääriviiva) sekä
  erillisinä tiedostoina:
  - `kukka.svg` — ääriviivakukka (kuten logossa), terracotta
  - `kukka-taytetty.svg` — täytetty kukka, oranssi + sinappikeskusta

Kukan saa mihin tahansa kohtaan näin:
`<svg class="sticker" style="color:var(--orange)"><use href="#s-flower"/></svg>`
(tai `#s-bloom` ääriviivaversiolle). Väri tulee `color`-arvosta.

## Lomakkeen lähetys
Lomake avaa nyt sähköpostiohjelman valmiilla viestillä (mailto). Jos haluat ottaa
lähetykset vastaan automaattisesti ilman sähköpostiohjelmaa, korvaa `script.js`:n lopussa
oleva `window.location.href = mailto;` esimerkiksi Formspree-/Web3Forms-kutsulla
(ohje kommentissa samassa kohdassa).

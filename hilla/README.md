# Hilla Studios — verkkosivut

Lämmin, 70-luvun retro-editorial-tyylinen sivusto verkkosivujen suunnittelupalvelulle.
Pelkkä HTML + CSS + vanilla JS — ei build-vaihetta. Avaa `index.html` selaimessa.

## Sivut
- `index.html` — etusivu: palvelut, "näin se toimii", toimialat
- `laskuri.html` — alakohtaiset hintalaskurit (leipomo, kahvila, ravintola, kampaamo, muu)
- `tarjouspyynto.html` — tarjouspyyntö + suunnittelulomake (värit, tyyli, toiminnot)
- `style.css` — koko design-system (värit, fontit, komponentit)
- `script.js` — laskurin logiikka, esitäyttö lomakkeelle, lomakkeen lähetys

## Brändin värit (style.css → :root)
- Kerma `#F4EDE0` · Terracotta `#9C4A2D` · Sinappi `#E6B23E`
- Oranssi `#DD5A26` (vain korostukset) · Pölynsininen `#A6B5BD` · Ruskea teksti `#3A2A21`

## Fontit (Google Fonts)
Fraunces (otsikot, serif) · Inter (leipä/labelit) · Pinyon Script (käsinkirjoitettu aksentti) ·
Fredoka (logo-wordmark, pyöreä)

## Omien logojesi & kuviesi lisääminen
Tällä hetkellä logo on tekstimuotoinen wordmark ("hilla studios") ja kaikki ikonit ovat
inline-SVG:tä, jotta sivu toimii ilman erillisiä tiedostoja.

Kun haluat omat logosi tilalle:
1. Lisää logotiedostot tähän kansioon, esim. `paalogo.svg`, `sivulogo.svg`, `kuvalogo.svg`, `ympyralogo.svg`.
2. Korvaa navigaation `<a class="brand">…</a>` kuvalla, esim.:
   `<a href="index.html" class="brand"><img src="paalogo.svg" alt="Hilla Studios" style="height:38px"></a>`
3. Hero-kuvan paikka on `.hero-photo` — vaihda taustaksi oma kuvasi:
   `style="background-image:url('kuvasi.jpg');background-size:cover"` ja poista `.photo-note`.
4. Pyöreän leiman (`#s-stamp`) tilalle voit halutessasi laittaa `ympyralogo.svg`:n.

## Lomakkeen lähetys
Lomake avaa nyt sähköpostiohjelman valmiilla viestillä (mailto). Jos haluat ottaa
lähetykset vastaan automaattisesti ilman sähköpostiohjelmaa, korvaa `script.js`:n lopussa
oleva `window.location.href = mailto;` esimerkiksi Formspree-/Web3Forms-kutsulla
(ohje kommentissa samassa kohdassa).

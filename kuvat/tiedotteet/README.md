# Tiedotteiden kuvat

Tiedotekohtaiset kuvat. Ensimmäinen kuva (`-1.jpg`) on tiedotteen pääkuva,
jota klikkaamalla karuselli aukeaa. Loput näkyvät vain karusellissa.

Kytkentä tehdään `aktiiviset.js`:ssä tiedotteen `gallery`-kentässä.

## Nimeäminen

```
<projekti>-<vuosi>-<kk>-<pv>-<numero>.jpg
```

Päivämäärä on tiedotteen päivä, ei kuvauspäivä. Numerointi ratkaisee
järjestyksen karusellissa; `-1` on aina pääkuva.

Pääte pienellä (`.jpg`), ei välilyöntejä eikä ääkkösiä. Suositeltu leveys
1600–2000 px. Karuselli skaalaa kuvan automaattisesti, mutta yli 3 Mt:n
kuvat hidastavat sivua turhaan.

## Nykyinen sisältö

| Tiedote | Kuvat |
|---|---|
| As Oy Aitio, 3.8.2026 — Tilannetiedote, vesikattotyöt käynnissä | `aitio-2026-08-03-1.jpg` … `-5.jpg` |
| As Oy Aitio, 18.8.2026 — Tilannetiedote, peltityöt ja telineasennukset | `aitio-2026-08-18-1.jpg` |
| As Oy Aitio, 20.8.2026 — Urakan aloitus, Aino Acktén tie 3 | `aitio-2026-08-20-1.jpg` … `-3.jpg` |

## Kuvien lisääminen uuteen tiedotteeseen

1. Nimeä tiedostot yllä olevan kaavan mukaan ja vie ne tähän kansioon.
2. Lisää `aktiiviset.js`:ssä kyseiselle tiedotteelle `gallery`-kenttä:

```js
gallery: ['kuvat/tiedotteet/projekti-2026-09-01-1.jpg',
          'kuvat/tiedotteet/projekti-2026-09-01-2.jpg'],
```

Jos tiedostoa ei löydy, pääkuva piilotetaan automaattisesti eikä sivulle
tule rikkinäistä kuvaa.

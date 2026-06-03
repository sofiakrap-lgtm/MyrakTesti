# Verkkotunnuksen myrak.fi siirto-ohje

Tämä on vaiheittainen tarkistuslista verkkotunnuksen **myrak.fi** siirtämiseksi
Myrakin omaan hallintaan ja uuden (GitHub Pages -pohjaisen) verkkosivun
kytkemiseksi siihen — **ilman että sähköpostit katkeavat.**

Domain on tällä hetkellä **Fraidein** hallinnassa (edellisen sivuston yhteydestä).

---

## Tärkein periaate

Verkkosivu ja sähköposti ohjautuvat saman domainin sisällä **eri tietueista**:

- **Verkkosivu** → A- ja CNAME-tietueet
- **Sähköposti** → MX-tietueet (+ TXT: SPF, DKIM, DMARC)

➡️ **Sähköpostit pysyvät ennallaan, kun MX- ja sähköpostin TXT-tietueisiin EI kosketa.**

---

## Vaihe 0 — Fraidein vastauksessa pitää olla nämä

- [ ] **Välittäjän (rekisteröijän) nimi** — millä palvelulla domain on rekisteröity
- [ ] **Valtuutusavain (siirtoavain / auth key / EPP-koodi)**
- [ ] **Nykyiset MX-tietueet** sellaisinaan
- [ ] **Sähköpostin TXT-tietueet:** SPF, DKIM, DMARC
- [ ] Tieto siitä, **missä sähköposti on isännöity** (Google Workspace / Microsoft 365 / webhotelli)
- [ ] Vahvistus, että **domain on voimassa** eikä eräänny lähiaikoina

> Jos jokin puuttuu → pyydä se ennen kuin etenet.

---

## Vaihe 1 — Valitse oma verkkotunnusvälittäjä  (kesto: minuutteja – 1 pv)

- [ ] Luo tili suomalaiselle välittäjälle (esim. Louhi, Zoner, Hostingpalvelu, Domainkeskus)
- [ ] (Sähköposti EI ole sidottu välittäjään → mikä tahansa käy)

## Vaihe 2 — Tilaa siirto omalle välittäjälle  (kesto: minuutteja)

- [ ] Valitse välittäjän palvelusta "Siirrä verkkotunnus"
- [ ] Syötä `myrak.fi` + **valtuutusavain**
- [ ] **Kun kysytään DNS-tietueista → tuo/kopioi nykyiset MX- ja TXT-tietueet**
      (älä aloita tyhjältä, muuten sähköposti katkeaa)

## Vaihe 3 — Vahvistukset (.fi-erikoispiirre)  (kesto: tunteja – 1–5 vrk)

- [ ] Hyväksy mahdolliset sähköpostivahvistukset
- [ ] Siirto kulkee Traficomin kautta; etenee valtuutusavaimella tai Fraidein hyväksynnällä
- [ ] Odota, kunnes domain näkyy oman välittäjäsi hallinnassa

## Vaihe 4 — Kytke uusi verkkosivu  (kesto: ~15 min + propagaatio)

Tehdään VASTA kun domain on omassa hallinnassa:

- [ ] Yhdistä `CNAME`-muutos main-branchiin (sis. jo tiedoston `myrak.fi`)
- [ ] Ota **GitHub Pages** käyttöön: repo → Settings → Pages → Source: main / root
- [ ] Lisää `myrak.fi`:lle **A-tietueet** (älä koske MX-tietueisiin):
      - 185.199.108.153
      - 185.199.109.153
      - 185.199.110.153
      - 185.199.111.153
- [ ] (Valinnainen IPv6 AAAA-tietueet:)
      - 2606:50c0:8000::153
      - 2606:50c0:8001::153
      - 2606:50c0:8002::153
      - 2606:50c0:8003::153
- [ ] Lisää `www.myrak.fi` → **CNAME** → `sofiakrap-lgtm.github.io`
- [ ] Odota DNS:n päivittymistä (10 min – muutama tunti)
- [ ] Rastita GitHubissa **Enforce HTTPS**

---

## Sähköpostien varmistus siirron jälkeen

- [ ] Tarkista, että **MX-tietueet ovat identtiset** alkuperäisten kanssa
- [ ] Lähetä testisähköposti `@myrak.fi`-osoitteeseen ja takaisin
- [ ] Varmista, että SPF / DKIM / DMARC -tietueet ovat tallella

---

## Varotoimet (älä unohda näitä)

- ⚠️ **Älä anna domainin vanhentua** siirron aikana — vanhentunutta ei voi siirtää
- ⚠️ **Älä vaihda verkkosivun A-tietueita** ennen kuin domain on omassa hallinnassa
- ⚠️ **Älä koske MX-/sähköposti-TXT-tietueisiin** verkkosivua kytkiessä
- ⚠️ Jos vaihdat DNS-palvelua/nimipalvelimia, **kopioi kaikki sähköpostitietueet ensin**

---

## Aika-arvio yhteensä

| Vaihe | Kesto |
|---|---|
| Oman välittäjätilin luonti | minuutteja – 1 pv |
| Siirron tilaaminen | minuutteja |
| .fi-siirron läpimeno | muutama tunti – 1–5 vrk |
| Verkkosivun DNS-kytkentä | minuutteja |
| DNS-propagaatio | 10 min – ~24 h |
| HTTPS-sertifikaatti | muutama minuutti |

**Käytännön kokonaisaika:** valtuutusavaimen saannista yleensä **1–5 päivää.**
Sähköpostit pysyvät koko ajan toiminnassa, kun MX-tietueisiin ei kosketa.

/* =========================================================================
   KESKITETTY SISÄLTÖTIEDOSTO  –  data/site.js
   -------------------------------------------------------------------------
   TÄMÄ ON AINOA TIEDOSTO, JOTA TARVITSEE MUOKATA UUDELLE ASIAKKAALLE.
   Tähän on koottu yrityksen nimi, toimipisteet, aukiolot, somelinkit,
   tuotteet, galleria ja tapahtumat. Sivut lukevat sisältönsä täältä.

   Huom: tämä ei ole moduuli, vaan tavallinen skripti. Se asettaa
   globaalin SITE-muuttujan, jotta sivu toimii myös avaamalla index.html
   suoraan koneelta (file://) ilman palvelinta.
   ========================================================================= */

const SITE = {
  /* --- Yrityksen perustiedot --------------------------------------------- */
  nimi: "Kotileipomo Karpalo",
  iskulause: "Käsintehtyjä tilauskakkuja ja leivonnaisia Helsingistä",
  kuvaus:
    "Pieni käsityöläisleipomo, jossa jokainen kakku leivotaan tilauksesta " +
    "hyvistä raaka-aineista – juuri sinun juhliisi.",

  /* Sivuston rakentaja näkyy footerissa. Vaihda omaan nimeesi / yritykseesi. */
  rakentaja: "Sivuston rakentaja: [oma nimesi]",
  rakentajaLinkki: "#",

  /* --- Yhteystiedot (näkyvät footerissa ja yhteystiedot-sivulla) --------- */
  puhelin: "+358 40 123 4567",
  sahkoposti: "tilaukset@karpalo-demo.fi",

  /* --- Somelinkit (jätä tyhjäksi "" jos kanavaa ei ole) ------------------ */
  some: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    pinterest: "https://pinterest.com/",
    tiktok: "https://tiktok.com/",
  },

  /* --- Toimipisteet (kaksi toimipistettä) -------------------------------- */
  toimipisteet: [
    {
      nimi: "Karpalo Kallio",
      osoite: "Esimerkkikatu 12, 00530 Helsinki",
      puhelin: "+358 40 123 4567",
      sahkoposti: "kallio@karpalo-demo.fi",
      aukiolot: [
        { paiva: "Ma–Pe", aika: "9–18" },
        { paiva: "La", aika: "10–16" },
        { paiva: "Su", aika: "Suljettu" },
      ],
      poikkeukset: "Juhannusaattona 19.6. suljettu. Nouto sopimuksen mukaan.",
    },
    {
      nimi: "Karpalo Lauttasaari",
      osoite: "Mallipolku 3, 00200 Helsinki",
      puhelin: "+358 40 765 4321",
      sahkoposti: "lauttasaari@karpalo-demo.fi",
      aukiolot: [
        { paiva: "Ma–Pe", aika: "10–18" },
        { paiva: "La", aika: "10–15" },
        { paiva: "Su", aika: "Suljettu" },
      ],
      poikkeukset: "Heinäkuussa avoinna vain tilauksesta.",
    },
  ],

  /* --- Tuotteet (verkkokauppa) ------------------------------------------
     Jokaisella tuotteella:
       id        – yksilöivä tunniste
       nimi      – tuotteen nimi
       kuvaus    – lyhyt kuvaus
       kategoria – käytetään suodatuksessa
       alkaen    – pienimmän variaation hinta (näkyy "alkaen X €")
       annos     – "riittää n. X hengelle"
       allergeenit – lista merkkijonoja
       koot      – valittavat koot; lisa = lisähinta perushintaan
       ruokavaliot – tavallinen / gluteeniton / vegaaninen; lisa = lisähinta
       kuva      – kuvatiedoston polku (tyhjä "" = paikkamerkki)
  ----------------------------------------------------------------------- */
  tuotteet: [
    {
      id: "vintagekakku",
      nimi: "Vintagekakku",
      kuvaus: "Klassinen reunaröyhelö ja herkät kukkakoristeet – juhlan tähti.",
      kategoria: "kakut",
      alkaen: 75,
      annos: "riittää n. 10 hengelle",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "10 hlö", lisa: 0 },
        { nimi: "15 hlö", lisa: 30 },
        { nimi: "20 hlö", lisa: 60 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 8 },
        { nimi: "Vegaaninen", lisa: 10 },
      ],
      kuva: "",
    },
    {
      id: "nakukakku",
      nimi: "Nakukakku",
      kuvaus: "Rustiikkinen 'naked cake' tuoreilla marjoilla ja kermavaahdolla.",
      kategoria: "kakut",
      alkaen: 68,
      annos: "riittää n. 10 hengelle",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "10 hlö", lisa: 0 },
        { nimi: "15 hlö", lisa: 28 },
        { nimi: "20 hlö", lisa: 56 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 8 },
        { nimi: "Vegaaninen", lisa: 10 },
      ],
      kuva: "",
    },
    {
      id: "minivintagekakku",
      nimi: "Minivintagekakku",
      kuvaus: "Pieni juhlakakku kahdelle – täydellinen yllätyslahja.",
      kategoria: "kakut",
      alkaen: 32,
      annos: "riittää n. 2–4 hengelle",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "2–4 hlö", lisa: 0 },
        { nimi: "4–6 hlö", lisa: 14 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 5 },
        { nimi: "Vegaaninen", lisa: 6 },
      ],
      kuva: "",
    },
    {
      id: "kuppikakut",
      nimi: "Kuppikakut",
      kuvaus: "Pehmeät kuppikakut kauniilla kuorrutuksella – myydään 6 kpl erissä.",
      kategoria: "leivonnaiset",
      alkaen: 24,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 22 },
        { nimi: "24 kpl", lisa: 44 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 4 },
        { nimi: "Vegaaninen", lisa: 5 },
      ],
      kuva: "",
    },
    {
      id: "gender-reveal",
      nimi: "Gender reveal -kakku",
      kuvaus: "Yllätysvärinen täyte paljastaa vauvan sukupuolen leikkaushetkellä.",
      kategoria: "kakut",
      alkaen: 79,
      annos: "riittää n. 12 hengelle",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "12 hlö", lisa: 0 },
        { nimi: "16 hlö", lisa: 26 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 8 },
        { nimi: "Vegaaninen", lisa: 10 },
      ],
      kuva: "",
    },
    {
      id: "lahjakortti",
      nimi: "Lahjakortti",
      kuvaus: "Anna lahjaksi makuelämys – lahjakortti käy kaikkiin tuotteisiin.",
      kategoria: "muut",
      alkaen: 25,
      annos: "voimassa 12 kk",
      allergeenit: [],
      koot: [
        { nimi: "25 €", lisa: 0 },
        { nimi: "50 €", lisa: 25 },
        { nimi: "100 €", lisa: 75 },
      ],
      ruokavaliot: [{ nimi: "—", lisa: 0 }],
      kuva: "",
    },
  ],

  /* Suodatuskategoriat tuotesivulle (avain = tuotteen kategoria) */
  kategoriat: [
    { avain: "kaikki", nimi: "Kaikki" },
    { avain: "kakut", nimi: "Kakut" },
    { avain: "leivonnaiset", nimi: "Leivonnaiset" },
    { avain: "muut", nimi: "Muut" },
  ],

  /* Suosikkituotteet etusivulle (tuotteiden id:t) */
  suosikit: ["vintagekakku", "kuppikakut", "minivintagekakku"],

  /* --- Galleria (aiemmat työt) ------------------------------------------- */
  galleria: [
    { otsikko: "Hääkakku, kesä 2025", kuva: "" },
    { otsikko: "Syntymäpäiväkakku", kuva: "" },
    { otsikko: "Rippijuhlat", kuva: "" },
    { otsikko: "Yritystilaisuus", kuva: "" },
    { otsikko: "Kuppikakkutorni", kuva: "" },
    { otsikko: "Kastejuhla", kuva: "" },
    { otsikko: "Pop-up-myynti", kuva: "" },
    { otsikko: "Joulun erikoiskakku", kuva: "" },
    { otsikko: "Ystävänpäivän herkut", kuva: "" },
  ],

  /* --- Tapahtumat / kurssit / pop-upit ----------------------------------- */
  tapahtumat: [
    {
      pvm: "2026-06-21",
      otsikko: "Kesäinen leivontakurssi",
      tagi: "Kurssi",
      kuvaus: "Opettele koristelemaan vintagekakku ammattilaisen opastuksella.",
    },
    {
      pvm: "2026-07-05",
      otsikko: "Pop-up Kalliossa",
      tagi: "Pop-up",
      kuvaus: "Tule maistelemaan kauden leivonnaisia myymälämme edustalle.",
    },
    {
      pvm: "2026-08-16",
      otsikko: "Lasten leivontapaja",
      tagi: "Kurssi",
      kuvaus: "Mukava aamupäivä koko perheelle – kuppikakkujen koristelua.",
    },
    {
      pvm: "2026-09-12",
      otsikko: "Syksyn makuilta",
      tagi: "Tapahtuma",
      kuvaus: "Maistelumenu ja tarinoita käsityöläisleipomon arjesta.",
    },
  ],

  /* --- Navigaation linkit (jaettu header käyttää tätä) ------------------- */
  navi: [
    { teksti: "Etusivu", linkki: "index.html" },
    { teksti: "Tuotteet", linkki: "tuotteet.html" },
    { teksti: "Palvelut", linkki: "palvelut.html" },
    { teksti: "Catering", linkki: "catering.html" },
    { teksti: "Tapahtumat", linkki: "tapahtumat.html" },
    { teksti: "Galleria", linkki: "galleria.html" },
    { teksti: "Meistä", linkki: "meista.html" },
    { teksti: "UKK", linkki: "ukk.html" },
    { teksti: "Yhteystiedot", linkki: "yhteystiedot.html" },
  ],
};

/* Asetetaan globaaliksi, jotta kaikki skriptit (myös file://-tilassa) löytävät sen. */
window.SITE = SITE;

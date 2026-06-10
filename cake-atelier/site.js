/* =========================================================================
   KESKITETTY SISÄLTÖTIEDOSTO  –  data/site.js
   -------------------------------------------------------------------------
   TÄMÄ ON AINOA TIEDOSTO, JOTA TARVITSEE MUOKATA UUDELLE ASIAKKAALLE.
   Tähän on koottu yrityksen nimi, toimipisteet, aukiolot, somelinkit,
   tuotteet, maut, galleria ja tapahtumat. Sivut lukevat sisältönsä täältä.

   KUVAPOLUT: tiedostonimissä on välilyöntejä, joten ne on koodattu
   (välilyönti = %20). Pääte oletettu .jpg. Jos kuva ei näy, tarkista että
   tiedostonimi assets/-kansiossa täsmää tähän polkuun täsmälleen.

   Huom: tämä ei ole moduuli vaan tavallinen skripti (toimii myös file://).
   ========================================================================= */

const SITE = {
  /* --- Yrityksen perustiedot --------------------------------------------- */
  nimi: "The Cake Atelier",
  tagline: "Cakes worth remembering",   // englanninkielinen slogan (wordmarkin pari)
  iskulause: "Käsintehtyjä juhlakakkuja, jotka jäävät mieleen",
  kuvaus:
    "Pieni, designvetoinen kakkustudio. Jokainen kakku tehdään käsin, " +
    "pienissä erissä ja hyvistä raaka-aineista – yhdelle perheelle, yhteen päivään.",

  /* Sivuston rakentaja näkyy footerissa. Vaihda omaan nimeesi / yritykseesi. */
  rakentaja: "Sivuston rakentaja: [oma nimesi]",
  rakentajaLinkki: "#",

  /* --- Yhteystiedot (näkyvät footerissa ja yhteystiedot-sivulla) --------- */
  puhelin: "+358 40 123 4567",
  sahkoposti: "hello@thecakeatelier-demo.fi",

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
      nimi: "Studio · Kallio",
      osoite: "Esimerkkikatu 12, 00530 Helsinki",
      puhelin: "+358 40 123 4567",
      sahkoposti: "kallio@thecakeatelier-demo.fi",
      aukiolot: [
        { paiva: "Ti–Pe", aika: "10–17" },
        { paiva: "La", aika: "10–15" },
        { paiva: "Su–Ma", aika: "Vain tilauksesta" },
      ],
      poikkeukset: "Nouto ja tapaamiset sopimuksen mukaan. Juhannusaattona 19.6. suljettu.",
    },
    {
      nimi: "Studio · Lauttasaari",
      osoite: "Mallipolku 3, 00200 Helsinki",
      puhelin: "+358 40 765 4321",
      sahkoposti: "lauttasaari@thecakeatelier-demo.fi",
      aukiolot: [
        { paiva: "Ti–Pe", aika: "11–17" },
        { paiva: "La", aika: "10–14" },
        { paiva: "Su–Ma", aika: "Vain tilauksesta" },
      ],
      poikkeukset: "Heinäkuussa avoinna vain tilauksesta.",
    },
  ],

  /* --- Tuotteet (verkkokauppa) ------------------------------------------
     id, nimi, kuvaus, ainesosat, sailytys, kategoria (kakut/minit/suolaiset),
     alkaen, annos, allergeenit, koot (lisa = lisähinta), ruokavaliot, kuva.
  ----------------------------------------------------------------------- */
  tuotteet: [
    /* ---------- KAKUT ---------- */
    {
      id: "kermakakku",
      nimi: "Kermakakku",
      kuvaus: "Klassinen kermakakku tuoreilla mauilla ja kauniilla viimeistelyllä.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, kerma, kausimarjat.",
      sailytys: "Säilytä jääkaapissa ja nauti kahden vuorokauden kuluessa noudosta.",
      kategoria: "kakut",
      alkaen: 65,
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
      kuva: "assets/kermakakku,%20vanilja.jpg",
    },
    {
      id: "kirsikka-suklaakakku",
      nimi: "Kirsikka-suklaakakku",
      kuvaus: "Täyteläinen suklaakakku ja kirpeä kirsikka – runsas klassikko.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, tumma suklaa, kirsikka.",
      sailytys: "Säilytä jääkaapissa ja nauti kahden vuorokauden kuluessa noudosta.",
      kategoria: "kakut",
      alkaen: 72,
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
      kuva: "assets/kirsikka%20suklaakakku.jpg",
    },
    {
      id: "mansikkakakku",
      nimi: "Mansikkakakku",
      kuvaus: "Raikas mansikkakakku tuoreilla marjoilla – kesän suosikki.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, kerma, mansikka.",
      sailytys: "Säilytä jääkaapissa ja nauti kahden vuorokauden kuluessa noudosta.",
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
      kuva: "assets/mansikkakakku,%20neli%C3%B6.jpg",
    },
    {
      id: "mansikkapiiras",
      nimi: "Mansikkapiiras",
      kuvaus: "Mehevä piiras tuoreilla mansikoilla – täydellinen kahvipöytään.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, mansikka, vaniljakreemi.",
      sailytys: "Säilytä jääkaapissa ja nauti vuorokauden kuluessa noudosta.",
      kategoria: "kakut",
      alkaen: 38,
      annos: "riittää n. 8 hengelle",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "8 palaa", lisa: 0 },
        { nimi: "12 palaa", lisa: 14 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 6 },
      ],
      kuva: "assets/mansikkapiiras.jpg",
    },
    {
      id: "marenkikakku",
      nimi: "Marenkikakku",
      kuvaus: "Kuohkea marenki, kermavaahto ja marjat – kevyt ja juhlava.",
      ainesosat: "Kananmuna, sokeri, kerma, kausimarjat.",
      sailytys: "Säilytä jääkaapissa ja nauti tarjoilupäivänä.",
      kategoria: "kakut",
      alkaen: 70,
      annos: "riittää n. 10 hengelle",
      allergeenit: ["kananmuna", "maito"],
      koot: [
        { nimi: "10 hlö", lisa: 0 },
        { nimi: "15 hlö", lisa: 30 },
        { nimi: "20 hlö", lisa: 60 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Laktoositon", lisa: 4 },
      ],
      kuva: "assets/marenkikakku.jpg",
    },
    {
      id: "marjakakku",
      nimi: "Marjakakku",
      kuvaus: "Runsaasti kauden marjoja kevyellä kermavaahdolla.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, kerma, kausimarjat.",
      sailytys: "Säilytä jääkaapissa ja nauti kahden vuorokauden kuluessa noudosta.",
      kategoria: "kakut",
      alkaen: 66,
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
      kuva: "assets/marjakakku.jpg",
    },
    {
      id: "suklaakakku",
      nimi: "Suklaakakku",
      kuvaus: "Tumma, täyteläinen suklaakakku suklaaganachella.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, tumma suklaa, kaakao.",
      sailytys: "Säilytä jääkaapissa ja nauti kahden vuorokauden kuluessa noudosta.",
      kategoria: "kakut",
      alkaen: 68,
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
      kuva: "assets/suklaakakku.jpg",
    },

    /* ---------- MINIT ---------- */
    {
      id: "mini-vanilja",
      nimi: "Mini · vanilja",
      kuvaus: "Pienet vaniljakakut – herkullinen suupala juhliin.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, vanilja, kerma.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
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
      kuva: "assets/mini,%20vanilja.jpg",
    },
    {
      id: "mini-suklaa",
      nimi: "Mini · suklaa",
      kuvaus: "Täyteläiset suklaamini-kakut – suosikki kaikenikäisille.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, tumma suklaa.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
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
      kuva: "assets/mini,%20suklaa.jpg",
    },
    {
      id: "mini-kirsikka",
      nimi: "Mini · kirsikka",
      kuvaus: "Raikkaat kirsikkamini-kakut kauniilla viimeistelyllä.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, kirsikka, kerma.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
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
      kuva: "assets/mini,%20kirsikka.jpg",
    },
    {
      id: "mini-suklaa-kirsikka",
      nimi: "Mini · suklaa-kirsikka",
      kuvaus: "Suklaan ja kirsikan klassinen pari pienessä koossa.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, tumma suklaa, kirsikka.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
      alkaen: 26,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 24 },
        { nimi: "24 kpl", lisa: 48 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 4 },
        { nimi: "Vegaaninen", lisa: 5 },
      ],
      kuva: "assets/mini,%20suklaa%20kirsikka.jpg",
    },
    {
      id: "mini-lemon",
      nimi: "Mini · sitruuna",
      kuvaus: "Pirteät sitruunamini-kakut – raikas valinta.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, sitruuna.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
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
      kuva: "assets/mini,%20lemon.jpg",
    },
    {
      id: "mini-velvet",
      nimi: "Mini · red velvet",
      kuvaus: "Samettiset red velvet -minit tuorejuustokuorrutuksella.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, tuorejuusto, kaakao.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
      alkaen: 26,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 24 },
        { nimi: "24 kpl", lisa: 48 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 4 },
      ],
      kuva: "assets/mini,%20velvet.jpg",
    },
    {
      id: "mini-mix",
      nimi: "Mini · mix-lajitelma",
      kuvaus: "Värikäs lajitelma suosituimpia makuja yhdessä laatikossa.",
      ainesosat: "Vehnäjauho, voi, kananmuna, sokeri, vaihtelevat täytteet.",
      sailytys: "Säilytä viileässä ja nauti tarjoilupäivänä.",
      kategoria: "minit",
      alkaen: 28,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "kananmuna", "maito"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 26 },
        { nimi: "24 kpl", lisa: 52 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 4 },
        { nimi: "Vegaaninen", lisa: 5 },
      ],
      kuva: "assets/mini,%20mix.jpg",
    },

    /* ---------- SUOLAISET ---------- */
    {
      id: "suolainen-voileipakakku",
      nimi: "Voileipäkakku",
      kuvaus: "Suolainen juhlaklassikko, täytteet toiveidesi mukaan.",
      ainesosat: "Vehnäleipä, tuorejuusto, kala tai kasvis, kananmuna, majoneesi.",
      sailytys: "Säilytä jääkaapissa ja nauti vuorokauden kuluessa noudosta.",
      kategoria: "suolaiset",
      alkaen: 45,
      annos: "riittää n. 10 hengelle",
      allergeenit: ["gluteeni", "kananmuna", "maito", "kala"],
      koot: [
        { nimi: "10 hlö", lisa: 0 },
        { nimi: "15 hlö", lisa: 20 },
        { nimi: "20 hlö", lisa: 40 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Gluteeniton", lisa: 6 },
        { nimi: "Kasvis", lisa: 0 },
      ],
      kuva: "assets/suolainen,%20voileip%C3%A4kakku.jpg",
    },
    {
      id: "suolainen-focaccia",
      nimi: "Focaccia",
      kuvaus: "Pehmeä focaccia yrteillä ja oliiviöljyllä – täydellinen jaettavaksi.",
      ainesosat: "Vehnäjauho, oliiviöljy, hiiva, suola, rosmariini.",
      sailytys: "Parhaimmillaan tarjoilupäivänä.",
      kategoria: "suolaiset",
      alkaen: 28,
      annos: "riittää n. 8 hengelle",
      allergeenit: ["gluteeni"],
      koot: [
        { nimi: "pelti", lisa: 0 },
        { nimi: "iso pelti", lisa: 18 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
        { nimi: "Vegaaninen", lisa: 0 },
      ],
      kuva: "assets/suolainen,%20focaccia.jpg",
    },
    {
      id: "suolainen-katkarapu",
      nimi: "Suolainen mini · katkarapu",
      kuvaus: "Pienet suolaiset suupalat katkaravulla – tyylikäs tarjottava.",
      ainesosat: "Vehnäleipä, tuorejuusto, katkarapu, sitruuna, tilli.",
      sailytys: "Säilytä jääkaapissa ja nauti tarjoilupäivänä.",
      kategoria: "suolaiset",
      alkaen: 26,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "maito", "äyriäiset"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 24 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
      ],
      kuva: "assets/suolainen,%20nimi%20katkarapu.jpg",
    },
    {
      id: "suolainen-lohi-retiisi",
      nimi: "Suolainen mini · lohi & retiisi",
      kuvaus: "Raikkaat suolaiset minit graavilohella ja retiisillä.",
      ainesosat: "Vehnäleipä, tuorejuusto, graavilohi, retiisi, tilli.",
      sailytys: "Säilytä jääkaapissa ja nauti tarjoilupäivänä.",
      kategoria: "suolaiset",
      alkaen: 26,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "maito", "kala"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 24 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
      ],
      kuva: "assets/suolainen%20mini,%20lohi%20ja%20retiisi.jpg",
    },
    {
      id: "suolainen-lohi",
      nimi: "Suolainen mini · lohi",
      kuvaus: "Klassiset lohimini-suupalat juhlapöytään.",
      ainesosat: "Vehnäleipä, tuorejuusto, savulohi, ruohosipuli.",
      sailytys: "Säilytä jääkaapissa ja nauti tarjoilupäivänä.",
      kategoria: "suolaiset",
      alkaen: 26,
      annos: "6 kpl / erä",
      allergeenit: ["gluteeni", "maito", "kala"],
      koot: [
        { nimi: "6 kpl", lisa: 0 },
        { nimi: "12 kpl", lisa: 24 },
      ],
      ruokavaliot: [
        { nimi: "Tavallinen", lisa: 0 },
      ],
      kuva: "assets/suomainen,%20mini%20loki.jpg",
    },

    /* ---------- MUU ---------- */
    {
      id: "lahjakortti",
      nimi: "Lahjakortti",
      kuvaus: "Anna lahjaksi makuelämys. Lahjakortti käy kaikkiin tuotteisiin.",
      ainesosat: "Sähköinen tai painettu lahjakortti.",
      sailytys: "Voimassa 12 kk ostohetkestä.",
      kategoria: "kakut",
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
    { avain: "minit", nimi: "Minit" },
    { avain: "suolaiset", nimi: "Suolaiset" },
  ],

  /* Suosikkituotteet etusivulle (tuotteiden id:t) */
  suosikit: ["kermakakku", "mansikkakakku", "marjakakku"],

  /* --- Maut (makugalleria + maku.html?id=) – leikkauskuvat -------------- */
  maut: [
    {
      id: "kerma-mansikka",
      nimi: "Kerma & mansikka",
      lyhyt: "Raikas kesäklassikko.",
      sopii: "Häät, kesäjuhlat, ristiäiset",
      kuvaus: "Pehmeä vaniljapohja, tuoretta mansikkaa ja kevyttä kermavaahtoa. Suosikki, joka miellyttää kaikkia vieraita.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "kerma", "mansikka", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20kerma%20mansikka.jpg",
    },
    {
      id: "suklaa-vanilja",
      nimi: "Suklaa & vanilja",
      lyhyt: "Tasapainoinen ja tuttu.",
      sopii: "Syntymäpäivät, kahvipöytä",
      kuvaus: "Täyteläinen suklaapohja ja silkkinen vaniljatäyte – klassikko, joka ei petä.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "tumma suklaa", "vanilja", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20suklaa%20vanilja.jpg",
    },
    {
      id: "mansikka-valkosuklaa",
      nimi: "Mansikka & valkosuklaa",
      lyhyt: "Makea ja marjainen.",
      sopii: "Häät, kevätjuhlat",
      kuvaus: "Tuore mansikka ja pehmeä valkosuklaa – herkullisen makea yhdistelmä.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "valkosuklaa", "mansikka", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20mansikka%20valkosuklaa.jpg",
    },
    {
      id: "vadelma-valkosuklaa",
      nimi: "Vadelma & valkosuklaa",
      lyhyt: "Hapokkaan makea.",
      sopii: "Illalliset, juhlat",
      kuvaus: "Kirpeä vadelma ja samettinen valkosuklaa tasapainottavat toisiaan kauniisti.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "valkosuklaa", "vadelma", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20vadelma%20valkosuklaa.jpg",
    },
    {
      id: "kirsikka-suklaa",
      nimi: "Kirsikka & suklaa",
      lyhyt: "Täyteläinen klassikko.",
      sopii: "Talvijuhlat, syntymäpäivät",
      kuvaus: "Tumma suklaa ja kirpeä kirsikka – runsas ja juhlava maku.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "tumma suklaa", "kirsikka", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20kirsikka,%20suklaa.jpg",
    },
    {
      id: "pistaasi-vadelma",
      nimi: "Pistaasi & vadelma",
      lyhyt: "Hienostunut ja raikas.",
      sopii: "Häät, illalliset",
      kuvaus: "Pähkinäinen pistaasi ja kirpeä vadelma – tyylikäs ja moderni valinta.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "pistaasi", "vadelma", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20pistaasi%20vadelma.jpg",
    },
    {
      id: "oreo",
      nimi: "Oreo",
      lyhyt: "Rapea ja runsas.",
      sopii: "Syntymäpäivät, lasten juhlat",
      kuvaus: "Suklaakeksiä ja vaniljakreemiä – lasten ja aikuisten suosikki.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "kaakaokeksi", "vanilja", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20oreo.jpg",
    },
    {
      id: "snickers",
      nimi: "Snickers",
      lyhyt: "Suklaa, kinuski ja maapähkinä.",
      sopii: "Syntymäpäivät",
      kuvaus: "Runsas yhdistelmä suklaata, kinuskia ja maapähkinää – todellinen herkuttelu.",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "suklaa", "kinuski", "maapähkinä"],
      leikkauskuva: "assets/leikkaus,%20snickers.jpg",
    },
    {
      id: "honey-cake",
      nimi: "Hunajakakku",
      lyhyt: "Pehmeä ja hunajainen.",
      sopii: "Kahvipöytä, juhlat",
      kuvaus: "Ohuet hunajaiset kakkukerrokset ja vaalea täyte – lämmin ja kotoisa klassikko (honey cake).",
      ainesosat: ["vehnäjauho", "voi", "kananmuna", "hunaja", "smetana", "sokeri"],
      leikkauskuva: "assets/leikkaus,%20honey%20cake.jpg",
    },
    {
      id: "porkkana",
      nimi: "Porkkanakakku",
      lyhyt: "Mausteinen ja täyteläinen.",
      sopii: "Syysjuhlat, ristiäiset",
      kuvaus: "Mausteinen porkkanakakku ja silkkinen tuorejuustokuorrutus – täyteläinen ympäri vuoden.",
      ainesosat: ["vehnäjauho", "porkkana", "kaneli", "tuorejuusto", "kananmuna", "öljy"],
      leikkauskuva: "assets/laikkaus,%20porkkanakakku.jpg",
    },
  ],

  /* --- Galleria (aiemmat työt – "yleinen kuvitus") ----------------------- */
  galleria: [
    { otsikko: "Hääkakku, kirsikka", kuva: "assets/h%C3%A4%C3%A4kakku,%20kirsikka.jpg" },
    { otsikko: "Kermakakku, pinkki", kuva: "assets/kermakakku,%20pinkki.jpg" },
    { otsikko: "Kermakakku, viikuna", kuva: "assets/kermakakku,%20viikuna.jpg" },
    { otsikko: "Hääkakun maistelusetti", kuva: "assets/leikkaus,%20h%C3%A4%C3%A4kakun%20maistelusetti.jpg" },
    { otsikko: "Juhlakakku", kuva: "assets/15.jpg" },
  ],

  /* --- Tapahtumat / kurssit / pop-upit ----------------------------------- */
  tapahtumat: [
    {
      pvm: "2026-06-21",
      otsikko: "Kesäinen koristelu-workshop",
      tagi: "Workshop",
      kuvaus: "Opettele koristelemaan kermakakku ammattilaisen opastuksella.",
    },
    {
      pvm: "2026-07-05",
      otsikko: "Pop-up Kalliossa",
      tagi: "Pop-up",
      kuvaus: "Tule maistelemaan kauden makuja studiomme edustalle.",
    },
    {
      pvm: "2026-08-16",
      otsikko: "Lasten leivontapaja",
      tagi: "Workshop",
      kuvaus: "Mukava aamupäivä koko perheelle – minikakkujen koristelua.",
    },
    {
      pvm: "2026-09-12",
      otsikko: "Syksyn makuilta",
      tagi: "Tapahtuma",
      kuvaus: "Maistelumenu ja tarinoita käsityöstudion arjesta.",
    },
  ],

  /* --- Myymälä (fyysinen studiomyymälä, oma sivu myymala.html) ----------- */
  myymala: {
    otsikko: "Studio & myymälä",
    kuvaus:
      "Pieni studiomyymälämme on paikka, jossa kakut syntyvät käsin ja jossa " +
      "voit noutaa tilauksesi. Tervetuloa poikkeamaan – kerromme mielellämme lisää.",
    osoite: "Esimerkkikatu 12, 00530 Helsinki",
    puhelin: "+358 40 123 4567",
    sahkoposti: "hello@thecakeatelier-demo.fi",
    aukiolot: [
      { paiva: "Ti–Pe", aika: "10–17" },
      { paiva: "La", aika: "10–15" },
      { paiva: "Su–Ma", aika: "Vain tilauksesta" },
    ],
    kuvat: [
      { otsikko: "Vitriini", kuva: "assets/referenssikuva,%20j%C3%A4%C3%A4kaappi.jpg" },
      { otsikko: "Kakkuja", kuva: "assets/referenssikuva,%20kakkuja.jpg" },
      { otsikko: "Hetki myymälässä", kuva: "assets/referenssikuva,%20kakun%20sy%C3%B6nti.jpg" },
    ],
  },

  /* --- Navigaation linkit (jaettu header käyttää tätä) ------------------- */
  navi: [
    { teksti: "Etusivu", linkki: "index.html" },
    { teksti: "Tuotteet", linkki: "tuotteet.html" },
    { teksti: "Maut", linkki: "maut.html" },
    { teksti: "Palvelut", linkki: "palvelut.html" },
    { teksti: "Tapahtumat", linkki: "tapahtumat.html" },
    { teksti: "Myymälä", linkki: "myymala.html" },
    { teksti: "Meistä", linkki: "meista.html" },
    { teksti: "Yhteystiedot", linkki: "yhteystiedot.html" },
  ],
};

/* Asetetaan globaaliksi, jotta kaikki skriptit (myös file://-tilassa) löytävät sen. */
window.SITE = SITE;

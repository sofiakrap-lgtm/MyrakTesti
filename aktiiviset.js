/* ============================================================
   Myrak Oy - Aktiiviset projektit (2026)
   Shared data + renderers for:
     - index.html / sv/index.html / en/index.html  (preview row)
     - ajankohtaista.html (+ sv/en)                 (full grid)
     - projekti.html (+ sv/en)                      (project detail)
     - tiedote.html (+ sv/en)                       (single bulletin)

   NOTE: Bulletin texts in REAL_POSTS are compiled from Myrak Oy's project
   documents. Images are generic site photos from the shared image library
   and are not necessarily from the project in question.
   ============================================================ */
(function () {
  'use strict';

  var lang = (document.documentElement.lang || 'fi').slice(0, 2).toLowerCase();
  if (['fi', 'sv', 'en'].indexOf(lang) === -1) lang = 'fi';

  var path = window.location.pathname;
  var inSub = path.indexOf('/sv/') !== -1 || path.indexOf('/en/') !== -1;
  var base = inSub ? '../' : '';

  var UI = {
    fi: {
      eyebrow: 'Aktiivinen projekti 2026',
      addressLabel: 'Osoite',
      whatWeDo: 'Mitä projektissa tehdään',
      updates: 'Tiedotteet projektista',
      latest: 'Ajankohtaisin',
      building: 'Valmistumassa',
      readMore: 'Lue lisää',
      back: '← Takaisin ajankohtaisiin',
      backToProject: '← Takaisin projektiin',
      seeAll: 'Katso kaikki ajankohtaiset',
      notFound: 'Valittua projektia ei löytynyt.',
      noNews: 'Tästä projektista ei ole vielä julkaistu tiedotteita.',
      sectionLabel: 'Ajankohtaista',
      sectionTitle: 'Aktiiviset projektit',
      sectionSub: 'Vuoden 2026 käynnissä olevat kohteemme'
    },
    sv: {
      eyebrow: 'Aktivt projekt 2026',
      addressLabel: 'Adress',
      whatWeDo: 'Vad som görs i projektet',
      updates: 'Nyheter om projektet',
      latest: 'Senaste',
      building: 'Pågående',
      readMore: 'Läs mer',
      back: '← Tillbaka till aktuellt',
      backToProject: '← Tillbaka till projektet',
      seeAll: 'Se allt aktuellt',
      notFound: 'Det valda projektet hittades inte.',
      noNews: 'Inga meddelanden har ännu publicerats om detta projekt.',
      sectionLabel: 'Aktuellt',
      sectionTitle: 'Aktiva projekt',
      sectionSub: 'Våra pågående objekt under 2026'
    },
    en: {
      eyebrow: 'Active project 2026',
      addressLabel: 'Address',
      whatWeDo: 'What the project involves',
      updates: 'Project updates',
      latest: 'Latest',
      building: 'In progress',
      readMore: 'Read more',
      back: '← Back to news',
      backToProject: '← Back to project',
      seeAll: 'See all news',
      notFound: 'The selected project was not found.',
      noNews: 'No bulletins have been published for this project yet.',
      sectionLabel: 'News',
      sectionTitle: 'Active projects',
      sectionSub: 'Our ongoing sites in 2026'
    }
  };
  var t = UI[lang];

  /* ---- Project data (2026) ---- */
  var PROJECTS = [
    {
      slug: 'aitio', company: 'As Oy Aitio', address: 'Aino Acktén tie 1, 3, Helsinki', image: 'kuvat/referenssit/idaekmanintie5.jpg',
      intro: {
        fi: 'Kohteessa toteutetaan kattavat katon korjaustyöt. Uusimme vaurioituneet peltipinnat, tarkistamme ja korjaamme aluskatteen sekä huollamme sadevesijärjestelmät ja kattoturvatuotteet.',
        sv: 'I objektet utförs omfattande takreparationer. Vi förnyar skadade plåtytor, kontrollerar och reparerar undertaket samt servar regnvattensystem och taksäkerhetsprodukter.',
        en: 'The site involves comprehensive roof repairs. We renew damaged sheet-metal surfaces, inspect and repair the underlay, and service the rainwater systems and roof safety products.'
      }
    },
    {
      slug: 'bulevardinpuisto', company: 'As Oy Bulevardinpuisto', address: 'Uudenmaankatu 39, Helsinki', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
      intro: {
        fi: 'Laaja julkisivu- ja ikkunakorjaus, johon kuuluu ikkunoiden ja katon vaihto. Rappaukset paikataan ja pinnat käsitellään, ikkunat uusitaan ja vesikatto rakennetaan uudelleen.',
        sv: 'Omfattande fasad- och fönsterrenovering inklusive byte av fönster och tak. Putsen lagas och ytorna behandlas, fönstren förnyas och yttertaket byggs om.',
        en: 'Extensive facade and window renovation including window and roof replacement. Plaster is patched and surfaces treated, windows are renewed and the roof is rebuilt.'
      }
    },
    {
      slug: 'centrum', company: 'Bost Ab Centrum i Helsingfors', address: 'Kasarmikatu 38, Helsinki', image: 'kuvat/referenssit/kasarmikatu28.jpg',
      intro: {
        fi: 'Tuuletusparvekelinjojen ikkunoiden ja ovien kunnostus- ja pintakäsittelytyöt. Rappukäytävien parvekeovet ja -ikkunat kunnostetaan ja pintakäsitellään rappu kerrallaan.',
        sv: 'Renovering och ytbehandling av fönster och dörrar i vädringsbalkongernas linjer. Trapphusens balkongdörrar och -fönster renoveras och ytbehandlas ett trapphus i taget.',
        en: 'Renovation and surface treatment of the windows and doors along the ventilation-balcony lines. The stairwells’ balcony doors and windows are restored and finished one stairwell at a time.'
      }
    },
    {
      slug: 'cygnaeuksenkatu10', company: 'As Oy Cygnaeuksenkatu 10', address: 'Cygnaeuksenkatu 10, Helsinki', image: 'kuvat/referenssit/cygnaeuksenkatu10.jpg',
      intro: {
        fi: 'Ikkunoiden vaihto ja julkisivun korjaus. Vanhat ikkunat korvataan tyylinmukaisilla uusilla, ja julkisivun rappaukset sekä koristeet kunnostetaan alkuperäistä ilmettä kunnioittaen.',
        sv: 'Fönsterbyte och fasadrenovering. Gamla fönster ersätts med nya i stilenlig utförande och fasadens puts samt dekorationer restaureras med respekt för det ursprungliga.',
        en: 'Window replacement and facade repair. Old windows are replaced with style-matched new ones, and the facade plaster and ornaments are restored with respect to the original look.'
      }
    },
    {
      slug: 'fleminginkatu11', company: 'As Oy Fleminginkatu 11', address: 'Fleminginkatu 11, Helsinki', image: 'kuvat/referenssit/fleminginkatu11.jpg',
      intro: {
        fi: 'Ikkunoiden vaihto ja julkisivun korjaus. Projektissa uusitaan ikkunat ja korjataan julkisivun vauriot, jonka jälkeen pinnat maalataan ja suojataan sään rasituksilta.',
        sv: 'Fönsterbyte och fasadrenovering. I projektet förnyas fönstren och fasadens skador repareras, varefter ytorna målas och skyddas mot väderpåfrestningar.',
        en: 'Window replacement and facade repair. The project renews the windows and repairs facade damage, after which the surfaces are painted and protected from the weather.'
      }
    },
    {
      slug: 'hameentie37', company: 'As Oy Hämeentie 37', address: 'Hämeentie 37, Helsinki', image: 'kuvat/referenssit/hameentie37.jpg',
      intro: {
        fi: 'Ikkunoiden korjaustyöt. Kunnostamme alkuperäiset puuikkunat entisöiden: tiivistykset, kittaukset, maalaukset ja heloitukset tehdään perinteisin menetelmin.',
        sv: 'Fönsterreparationer. Vi restaurerar de ursprungliga träfönstren: tätningar, kittning, målning och beslag utförs med traditionella metoder.',
        en: 'Window repairs. We restore the original wooden windows: sealing, puttying, painting and fittings are carried out using traditional methods.'
      }
    },
    {
      slug: 'isoroobertinkatu42', company: 'As Oy Iso Roobertinkatu 42', address: 'Iso Roobertinkatu 42, Helsinki', image: 'kuvat/referenssit/isoroobertinkatu42.jpg',
      intro: {
        fi: 'Kiinteistön yleiset korjaustyöt. Kartoitamme korjaustarpeet ja toteutamme julkisivun, parvekkeiden ja yhteistilojen kunnostukset suunnitelman mukaisessa aikataulussa.',
        sv: 'Allmänna reparationer av fastigheten. Vi kartlägger reparationsbehoven och utför renovering av fasad, balkonger och gemensamma utrymmen enligt planerad tidtabell.',
        en: 'General building repairs. We survey the repair needs and carry out renovation of the facade, balconies and common areas on the planned schedule.'
      }
    },
    {
      slug: 'myllytie2', company: 'As Oy Kaivopuiston Myllytie 2', address: 'Myllytie 2, Helsinki', image: 'kuvat/referenssit/myllytie2.jpg',
      intro: {
        fi: 'Kiinteistön korjaustyöt arvokkaassa Kaivopuiston kohteessa. Työt suunnitellaan ja toteutetaan rakennuksen historiallista arvoa kunnioittaen.',
        sv: 'Reparationer i ett värdefullt objekt i Brunnsparken. Arbetet planeras och utförs med respekt för byggnadens historiska värde.',
        en: 'Building repairs at a distinguished Kaivopuisto site. The work is planned and carried out with respect for the building’s historical value.'
      }
    },
    {
      slug: 'neitsytpolku9', company: 'As Oy Neitsytpolku 9', address: 'Neitsytpolku 9, Helsinki', image: 'kuvat/referenssit/neitsytpolku9.jpg',
      intro: {
        fi: 'Julkisivu-, ikkuna- ja parvekekorjaukset. Kokonaisvaltainen julkisivuremontti, jossa kunnostetaan rappaukset, uusitaan ikkunat ja saneerataan parvekkeet rakenteineen.',
        sv: 'Fasad-, fönster- och balkongrenovering. En helhetsrenovering där putsen restaureras, fönstren förnyas och balkongerna saneras med konstruktioner.',
        en: 'Facade, window and balcony repairs. A comprehensive facade renovation restoring the plaster, renewing the windows and refurbishing the balconies and their structures.'
      }
    },
    {
      slug: 'soma', company: 'As Oy Soma', address: 'Meritullinkatu 31 / Kruununhaankatu 3, Helsinki', image: 'kuvat/referenssit/merituuli.jpg',
      intro: {
        fi: 'Ikkuna- ja julkisivukorjaukset Kruununhaan arvokorttelissa. Ikkunat entisöidään tai uusitaan ja julkisivun pinnat kunnostetaan kokonaisuutta kunnioittaen.',
        sv: 'Fönster- och fasadrenovering i Kronohagens värdefulla kvarter. Fönstren restaureras eller förnyas och fasadens ytor renoveras med respekt för helheten.',
        en: 'Window and facade repairs in the distinguished Kruununhaka block. Windows are restored or renewed and the facade surfaces refurbished respecting the whole.'
      }
    },
    {
      slug: 'turuntie68', company: 'As Oy Turuntie 68', address: 'Mannerheimintie 94, Helsinki', image: 'kuvat/referenssit/mannerheimintie94.jpg',
      intro: {
        fi: 'Ikkuna-, julkisivu- ja kattokorjaukset. Laaja kokonaisuus, jossa rakennuksen vaippa kunnostetaan ulkoa: ikkunat, julkisivut ja vesikatto saatetaan kuntoon.',
        sv: 'Fönster-, fasad- och takrenovering. En omfattande helhet där byggnadens klimatskal renoveras utifrån: fönster, fasader och yttertak sätts i skick.',
        en: 'Window, facade and roof repairs. A broad package in which the building envelope is renovated from the outside: windows, facades and roof are brought into shape.'
      }
    },
    {
      slug: 'uudenmaankatu29', company: 'As Oy Uudenmaankatu 29', address: 'Uudenmaankatu 29, Helsinki', image: 'kuvat/referenssit/uudenmaankatu29.jpg',
      intro: {
        fi: 'Sisäpihan rakennuksen vesikaton uusimistyöt. Vanha vesikatto puretaan sääsuojan alla ja tilalle rakennetaan uusi; telineet pystytetään talon ympärille ja ullakkotilat suojataan pölyltä.',
        sv: 'Förnyelse av yttertaket på gårdsbyggnaden. Det gamla taket rivs under väderskydd och ett nytt byggs; ställningar reses runt huset och vindsutrymmena skyddas mot damm.',
        en: 'Roof renewal of the courtyard building. The old roof is demolished under weather protection and a new one built; scaffolding is erected around the building and the attic spaces are protected from dust.'
      }
    },
    {
      slug: 'aino', company: 'Asunto Oy Aino', address: 'Yrjönkatu 12–14, Helsinki', image: 'kuvat/referenssit/yrjonkatu1214.jpg',
      intro: {
        fi: 'Julkisivu- ja ikkunakorjaukset keskeisellä paikalla. Rappaukset paikataan ja maalataan, ikkunat kunnostetaan ja kadunpuoleinen julkisivu palautetaan edustavaan kuntoon.',
        sv: 'Fasad- och fönsterrenovering på central plats. Putsen lagas och målas, fönstren restaureras och gatufasaden återställs till representativt skick.',
        en: 'Facade and window repairs in a central location. Plaster is patched and painted, windows restored and the street facade returned to a representative condition.'
      }
    },
    {
      slug: 'carl', company: 'Asunto Oy Carl Bostads Ab', address: 'Topeliuksenkatu 19, Helsinki', image: 'kuvat/referenssit/topeliuksenkatu19.jpg',
      intro: {
        fi: 'Julkisivu- ja parvekekorjaukset. Parvekkeiden betonirakenteet kunnostetaan ja julkisivun pinnat uusitaan, jolloin kohde säilyy turvallisena ja edustavana.',
        sv: 'Fasad- och balkongrenovering. Balkongernas betongkonstruktioner renoveras och fasadens ytor förnyas, vilket håller objektet säkert och representativt.',
        en: 'Facade and balcony repairs. The balconies’ concrete structures are renovated and the facade surfaces renewed, keeping the site safe and presentable.'
      }
    },
    {
      slug: 'bangatan', company: 'Bostads Ab Bangatan 11–13', address: 'Ratakatu 11–13, Helsinki', image: 'kuvat/referenssit/ratakatu1113.jpg',
      intro: {
        fi: 'Julkisivu-, ikkuna- ja parvekekorjaukset. Monivaiheinen projekti, jossa kunnostetaan julkisivut, uusitaan ikkunat ja saneerataan parvekkeet asukkaiden arkea kunnioittaen.',
        sv: 'Fasad-, fönster- och balkongrenovering. Ett flerstegsprojekt där fasaderna renoveras, fönstren förnyas och balkongerna saneras med hänsyn till de boende.',
        en: 'Facade, window and balcony repairs. A multi-phase project renovating the facades, renewing the windows and refurbishing the balconies with care for residents.'
      }
    },
    {
      slug: 'ortodoksinen', company: 'Helsingin Ortodoksinen Seurakunta', address: 'Unioninkatu 39, Helsinki', image: 'kuvat/referenssit/unioninkatu39.jpg',
      intro: {
        fi: 'Katto-, parveke-, julkisivu- ja ikkunakorjaukset arvorakennuksessa. Vaativa kokonaisuus, jossa yhdistyvät entisöinti ja nykyaikaiset korjausmenetelmät.',
        sv: 'Tak-, balkong-, fasad- och fönsterrenovering i en värdebyggnad. En krävande helhet som kombinerar restaurering med moderna reparationsmetoder.',
        en: 'Roof, balcony, facade and window repairs in a heritage building. A demanding package combining restoration with modern repair methods.'
      }
    }
  ];

  /* ---- Oikeat tiedotteet projektidokumenteista (fi/sv/en) ---- */
  var REAL_POSTS = {
    aitio: [
      { date: '26.5.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus - vesikattojen uusiminen', sv: 'Entreprenaden inleds - takförnyelse', en: 'Project start - roof renewal' },
        excerpt: { fi: 'Vesikattojen uusimistyöt alkavat 1.6.2026 työmaan perustamisella ja telineiden pystytyksellä. Työt aloitetaan Ida Ekmannin tie 5 ja 3 taloista.', sv: 'Takförnyelsen inleds 1.6.2026 med etablering och ställningar. Arbetet börjar med husen Ida Ekmans väg 5 och 3.', en: 'The roof renewal begins on 1 June 2026 with site setup and scaffolding. Work starts with the buildings at Ida Ekmannin tie 5 and 3.' } },
      { date: '9.6.2026', image: 'kuvat/sivut/rikhardinkatu1-peltityot.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - purkutyöt käynnissä', sv: 'Lägesrapport - rivning pågår', en: 'Status update - demolition under way' },
        excerpt: { fi: 'E-talon vesikaton purkutyöt ovat käynnissä ja F-talon telineasennus etenee. F-talon katon purku alkaa viikolla 27.', sv: 'Rivningen av E-husets tak pågår och ställningsmonteringen vid F-huset framskrider. F-husets tak rivs från vecka 27.', en: 'Demolition of building E’s roof is under way and scaffolding at building F is progressing. Building F’s roof demolition starts in week 27.' } },
      { date: '10.6.2026', image: 'kuvat/sivut/peltikatto.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vinttikomeroiden tyhjennys - Ida Ekmannin tie 3 ja 5', sv: 'Tömning av vindsförråd - Ida Ekmans väg 3 och 5', en: 'Emptying of attic storage - Ida Ekmannin tie 3 and 5' },
        excerpt: { fi: 'Tyhjennä oma vinttikomerosi tarpeettomista tavaroista 15.6.2026 mennessä. Komeroihin jäävät tavarat suositellaan suojaamaan.', sv: 'Töm ditt vindsförråd på onödiga föremål senast 15.6.2026. Kvarlämnade föremål rekommenderas att skyddas.', en: 'Please clear your attic storage of unnecessary items by 15 June 2026. Items left behind should be protected.' } },
      { date: '6.8.2026', image: 'kuvat/sivut/rikhardinkatu1-peltityot.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ida Ekmannin tie 5 ja 3 - suojausten poisto', sv: 'Ida Ekmans väg 5 och 3 - skydden avlägsnas', en: 'Ida Ekmannin tie 5 and 3 - removing protective covers' },
        excerpt: { fi: 'Asukkaiden tekemiä suojauksia voi poistaa 10.8. alkaen. Suojamuovit jätetään urakoitsijan säkkeihin 17.8. mennessä, ja rakennusimuri on käytettävissä 10.-17.8. ullakkotilojen ovien vieressä.', sv: 'De boende kan avlägsna sina skydd från 10.8. Skyddsplasten lämnas i entreprenörens säckar senast 17.8, och en byggdammsugare finns tillgänglig 10-17.8 vid vindsdörrarna.', en: 'Residents may remove their protective covers from 10 Aug. Plastic sheeting goes into the contractor’s bags by 17 Aug, and a construction vacuum is available 10-17 Aug next to the attic doors.' } },
      { date: '3.8.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus - Ida Ekmannin tie 1 ja vinttikomeroiden tyhjennys', sv: 'Entreprenaden inleds - Ida Ekmans väg 1 och tömning av vindsförråd', en: 'Project start - Ida Ekmannin tie 1 and attic storage clearing' },
        excerpt: { fi: 'Ida Ekmannin tie 1 vesikaton uusiminen alkaa 10.8. telineiden pystytyksellä (n. 3 vk); pihaterassit ja ylimmät parvekkeet on tyhjennettävä. Samalla siivotaan vinttitilat - tyhjennä komerosi ja siirrä poistettavat tavarat käytävälle 17.8. mennessä.', sv: 'Takförnyelsen på Ida Ekmans väg 1 börjar 10.8 med ställningar (ca 3 v); gårdsterrasser och översta balkonger ska tömmas. Samtidigt städas vindsutrymmena - töm ditt förråd och för onödiga föremål till korridoren senast 17.8.', en: 'Roof renewal at Ida Ekmannin tie 1 starts 10 Aug with scaffolding (approx. 3 weeks); patios and top-floor balconies must be cleared. Attic spaces are also cleaned - clear your storage and move unwanted items to the corridor by 17 Aug.' } },
      { date: '3.8.2026', image: 'kuvat/sivut/peltikatto.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - vesikattotyöt käynnissä', sv: 'Lägesrapport - takarbetena pågår', en: 'Status update - roof work under way' },
        excerpt: { fi: 'Ida Ekmannin tie 5 peltityöt 50 % ja tie 3 alusta valmis (peltityöt 25 %). Tie 2 purku 50 % ja alustan kunnostus käynnissä. Tie 1 telineet asennetaan 10.8. alkaen.', sv: 'Ida Ekmans väg 5 plåtarbeten 50 % och väg 3 underlag klart (plåt 25 %). Väg 2 rivning 50 % och underlagsrenovering pågår. Väg 1 ställningar monteras från 10.8.', en: 'Ida Ekmannin tie 5 sheet-metal work 50% and tie 3 substrate complete (sheet-metal 25%). Tie 2 demolition 50% with substrate repair under way. Tie 1 scaffolding installed from 10 Aug.' } },
      { date: '20.8.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Aloitus', sv: 'Uppstart', en: 'Project start' },
        title: { fi: 'Urakan aloitus - Aino Acktén tie 3 ja vinttikomeroiden tyhjennys', sv: 'Entreprenadstart - Aino Acktén tie 3 och tömning av vindsförråden', en: 'Project start - Aino Acktén tie 3 and attic storage clearance' },
        excerpt: { fi: 'Aino Acktén tie 3 vesikaton uusiminen alkaa viikolla 35 telineiden pystytyksellä (n. 3 vk). Autopaikat ovat pois käytöstä, ja pihaterassit sekä ylimmät parvekkeet on tyhjennettävä. Tyhjennä vinttikomerosi ja siirrä poistettavat tavarat käytävälle 7.9. mennessä.', sv: 'Takrenoveringen på Aino Acktén tie 3 inleds under vecka 35 med ställningsmontage som tar cirka 3 veckor. Alla parkeringsplatser är ur bruk och gårdsterrasser samt de översta balkongerna ska tömmas. Töm ditt vindsförråd och flytta det som ska slängas till korridoren senast 7.9.', en: 'Roof renewal at Aino Acktén tie 3 begins in week 35 with scaffolding, taking about 3 weeks. All parking spaces will be out of use, and yard terraces and top-floor balconies must be cleared. Empty your attic storage and move discarded items to the corridor by 7 September.' } },
      { date: '18.8.2026', image: 'kuvat/sivut/rikhardinkatu1-peltityot.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - peltityöt ja telineasennukset', sv: 'Lägesrapport - plåtarbeten och ställningsmontage', en: 'Status update - sheet metal work and scaffolding' },
        excerpt: { fi: 'Ida Ekmannin tie 5 ja 3: vesikattopeltien asennus on loppuvaiheessa, ja katolle asennetaan lumiesteitä, kattosiltoja sekä riippukouruja. Tie 2: puutyöt käynnissä ja peltiasennus aloitettu. Tie 1: telineet ja sääsuoja asennuksessa.', sv: 'Ida Ekmannin tie 5 och 3: monteringen av takplåtar är i slutskedet, och snörasskydd, taksäkerhetsbryggor samt hängrännor installeras. Tie 2: träarbeten pågår och plåtmontaget har inletts. Tie 1: ställningar och väderskydd monteras.', en: 'Ida Ekmannin tie 5 and 3: roof sheet installation is in its final stage, with snow guards, roof walkways and gutters being fitted. Tie 2: carpentry underway and sheet installation started. Tie 1: scaffolding and weather protection being erected.' } }
    ],
    bulevardinpuisto: [
      { date: '3.3.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Mallityön aloitus', sv: 'Modellarbetet inleds', en: 'Sample work begins' },
        excerpt: { fi: 'Aloitamme terastirappauksen mallialueen työt sisäpihalla 3.3.2026. Mallialue toteutetaan sääsuojan alla, eikä se vaikuta liikenteeseen tai pysäköintiin.', sv: 'Vi inleder provytan för ädelputs på gården 3.3.2026. Provytan utförs under väderskydd och påverkar inte trafik eller parkering.', en: 'We begin the noble-render sample area in the courtyard on 3 March 2026. It is carried out under weather protection and does not affect traffic or parking.' } },
      { date: '26.3.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Työmaan aloitus', sv: 'Byggarbetet inleds', en: 'Site work begins' },
        excerpt: { fi: 'Julkisivutyöt alkavat viikolla 13 (26.3.2026) työmaan perustamisella ja sähköistyksellä. Telineet rakennetaan viikolla 14, ja autopaikat ovat pois käytöstä 26.3. alkaen.', sv: 'Fasadarbetena börjar vecka 13 (26.3.2026) med etablering och el. Ställningarna byggs vecka 14 och parkeringsplatserna är ur bruk från 26.3.', en: 'Facade work starts in week 13 (26 March 2026) with site setup and electrical installation. Scaffolding goes up in week 14, and parking is out of use from 26 March.' } },
      { date: '22.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Julkisivujen purkutyöt', sv: 'Rivning av fasader', en: 'Facade demolition' },
        excerpt: { fi: 'Julkisivujen suojaus- ja purkutyöt alkavat ja kestävät noin kuukauden. Työ aiheuttaa melua ja pölyä; ikkunat ja ovet suojataan ulkopuolelta.', sv: 'Skydds- och rivningsarbetena på fasaderna inleds och pågår cirka en månad. Arbetet orsakar buller och damm; fönster och dörrar skyddas utifrån.', en: 'Protection and demolition of the facades begins and lasts about a month. The work causes noise and dust; windows and doors are protected from the outside.' } },
      { date: '26.4.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Parvekkeiden tyhjennys', sv: 'Tömning av balkonger', en: 'Clearing of balconies' },
        excerpt: { fi: 'Parvekkeet on tyhjennettävä kaikista tavaroista viikonloppuun 26.4.2026 mennessä. Parvekkeiden ovet teipataan ja parvekkeet ovat suljettuina urakan loppuun asti.', sv: 'Balkongerna måste tömmas på alla föremål senast veckoslutet 26.4.2026. Balkongdörrarna tejpas och balkongerna är stängda till entreprenadens slut.', en: 'Balconies must be cleared of all items by the weekend of 26 April 2026. Balcony doors are taped shut and balconies stay closed until the end of the contract.' } },
      { date: '30.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'IV-kierros ja asuntokäynnit 6.5.', sv: 'Ventilationsrunda och bostadsbesök 6.5.', en: 'Ventilation round and apartment visits 6 May' },
        excerpt: { fi: '6.5.2026 tehdään asunnoissa ilmanvaihdon tarkastuskierros ja kuvataan ikkunapielet. Asuntoihin tullaan yleisavaimella - varmistathan, että turvalukot ovat auki.', sv: 'Den 6.5.2026 görs en ventilationskontroll i bostäderna och fönstersmygarna fotograferas. Bostäderna nås med huvudnyckel - se till att säkerhetslåsen är öppna.', en: 'On 6 May 2026 a ventilation inspection is carried out in the apartments and window reveals are photographed. Apartments are accessed with a master key - please keep security locks open.' } },
      { date: '30.4.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ullakkokoppien avaaminen siivousta varten', sv: 'Öppning av vindsförråd för städning', en: 'Opening attic storages for cleaning' },
        excerpt: { fi: 'Vesikaton purkutöistä on kulkeutunut pölyä ullakkokoppeihin. Pyydämme avaamaan ullakkokopit 2.–4.5.2026, jolloin tilat siivotaan ja tavarat suojataan.', sv: 'Damm från takrivningen har spridit sig till vindsförråden. Vi ber er öppna vindsförråden 2–4.5.2026, då utrymmena städas och föremålen skyddas.', en: 'Dust from the roof demolition has spread into the attic storages. Please open them on 2–4 May 2026, when the spaces will be cleaned and belongings protected.' } },
      { date: '4.5.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - viikot 19–21', sv: 'Lägesrapport - vecka 19–21', en: 'Status update - weeks 19–21' },
        excerpt: { fi: 'Viikoilla 19–21 puretaan vanha rappaus ja parvekkeet, puhdistetaan pinnat ja valmistaudutaan uusien parvekkeiden rakentamiseen sekä rappaustöiden aloitukseen.', sv: 'Under vecka 19–21 rivs den gamla putsen och balkongerna, ytorna rengörs och man förbereder nya balkonger och putsarbetenas start.', en: 'During weeks 19–21 the old rendering and balconies are removed, surfaces cleaned, and preparations made for new balconies and the start of rendering.' } },
      { date: '13.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Ikkunoiden mittauskierros asunnoissa', sv: 'Fönstermätning i bostäderna', en: 'Window measurements in apartments' },
        excerpt: { fi: 'Ikkunoiden mittaukset tehdään asunnoissa 27.–28.5.2026 klo 9 alkaen yleisavaimella. Varmistathan, että turvalukot ovat auki; uusintakäynnistä veloitetaan 400 €.', sv: 'Fönstermätningar görs i bostäderna 27–28.5.2026 från kl. 9 med huvudnyckel. Se till att säkerhetslåsen är öppna; ett upprepat besök debiteras 400 €.', en: 'Window measurements take place in the apartments on 27–28 May 2026 from 9 a.m. using a master key. Please keep security locks open; a repeat visit is charged €400.' } },
      { date: '18.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Ikkunoiden mittauskierros 17.–18.6.', sv: 'Fönstermätning 17–18.6', en: 'Window measurements 17–18 June' },
        excerpt: { fi: 'Toinen ikkunoiden mittauskierros tehdään asunnoissa 17.–18.6.2026. Käynti kestää noin 20 minuuttia ja asuntoihin tullaan yleisavaimella.', sv: 'En andra fönstermätningsrunda görs i bostäderna 17–18.6.2026. Besöket tar cirka 20 minuter och bostäderna nås med huvudnyckel.', en: 'A second window measurement round takes place on 17–18 June 2026. The visit takes about 20 minutes and apartments are accessed with a master key.' } },
      { date: '11.8.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ullakkokomeroiden siivous ja tyhjennys 28.8.', sv: 'Städning och tömning av vindsförråd 28.8.', en: 'Attic storage cleaning and clearing 28 Aug' },
        excerpt: { fi: 'Ullakkotilojen siivous- ja imurointityöt tehdään pe 28.8. Avaa oma ullakkokomerosi kyseiseksi päiväksi ja siirrä poistettavat tavarat käytävälle 27.8. mennessä. Sähkölaitteita ja ongelmajätettä ei oteta jätelavalle.', sv: 'Städning och dammsugning av vindsutrymmena görs fre 28.8. Öppna ditt vindsförråd den dagen och för onödiga föremål till korridoren senast 27.8. Elapparater och problemavfall tas inte emot.', en: 'Attic cleaning and vacuuming take place on Fri 28 Aug. Open your attic storage for that day and move items for disposal to the corridor by 27 Aug. Electrical devices and hazardous waste are not accepted.' } },
      { date: '5.8.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: '5. kerroksen ikkunoiden asennus alkaa 13.8.', sv: 'Fönstermonteringen i 5:e våningen börjar 13.8.', en: '5th-floor window installation starts 13 Aug' },
        excerpt: { fi: '6. kerroksen ikkuna-asennukset päättyvät 12.8. ja 5. kerroksen työt alkavat 13.8. klo 8. Turvalukot auki, ikkunan edestä n. 1,5 m vapaata ja huonekalut suojattava. Ikkunaa ei saa avata 24 h asennuksen jälkeen.', sv: 'Fönstermonteringen i 6:e våningen slutar 12.8 och 5:e våningen börjar 13.8 kl. 8. Säkerhetslås öppna, ca 1,5 m fritt framför fönstret och möblerna skyddade. Fönstret får inte öppnas 24 h efter monteringen.', en: '6th-floor window installation ends 12 Aug and 5th-floor work starts 13 Aug at 8:00. Keep safety locks open, leave approx. 1.5 m clear in front and cover furniture. Do not open the window for 24 h after installation.' } },
      { date: '4.8.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - vesikaton viimeistely ja ikkunat', sv: 'Lägesrapport - takets slutarbeten och fönster', en: 'Status update - roof finishing and windows' },
        excerpt: { fi: 'Käynnissä: vesikaton viimeistely, erkkerikatosten pohja- ja pellitystyöt, räystäslistojen korjaus, seinien rappaus ja 6. kerroksen ikkuna-asennukset. Seuraavaksi vesikaton maalaus ja ikkunapielien kunnostus.', sv: 'Pågår: takets slutarbeten, burspråkens tak- och plåtarbeten, takfotslister, väggputs och fönstermontering i 6:e våningen. Härnäst takmålning och renovering av fönstersmygar.', en: 'Under way: roof finishing, bay-window canopy base and sheet-metal work, eaves trims, wall rendering and 6th-floor window installation. Next: roof painting and window-reveal repairs.' } },
      { date: '1.8.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Turvallisuustiedote', sv: 'Säkerhetsmeddelande', en: 'Safety notice' },
        title: { fi: 'Murto työmaan kautta - turvallisuustoimenpiteet', sv: 'Inbrott via arbetsplatsen - säkerhetsåtgärder', en: 'Break-in via the site - safety measures' },
        excerpt: { fi: 'Työmaalla on tapahtunut murto telineiden kautta. Urakoitsija on tehostanut telineiden suojausta, kulunvalvontaa ja valaistusta. Pidäthän ikkunat ja parvekkeen ovet lukittuina ja ilmoita epäilyttävästä toiminnasta.', sv: 'Ett inbrott har skett via ställningarna. Entreprenören har förstärkt ställningsskyddet, tillträdeskontrollen och belysningen. Håll fönster och balkongdörrar låsta och anmäl misstänkt aktivitet.', en: 'A break-in occurred via the scaffolding. The contractor has reinforced scaffold protection, access control and lighting. Please keep windows and balcony doors locked and report any suspicious activity.' } },
      { date: '28.7.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: 'Ikkunoiden asennukset alkavat 30.7.', sv: 'Fönstermonteringen börjar 30.7.', en: 'Window installations start 30 Jul' },
        excerpt: { fi: 'Uusien ikkunoiden asennus alkaa to 30.7. klo 8, ylimmästä kerroksesta alaspäin (n. viikko/kerros). Turvalukot auki, ikkunan edestä n. 1,5 m vapaata ja huonekalut suojattava. Ikkunaa ei avata 24 h asennuksen jälkeen.', sv: 'Monteringen av nya fönster börjar to 30.7 kl. 8, uppifrån och ner (ca en vecka/våning). Säkerhetslås öppna, ca 1,5 m fritt framför fönstret och möblerna skyddade. Fönstret öppnas inte 24 h efter monteringen.', en: 'Installation of new windows starts Thu 30 Jul at 8:00, from the top floor down (approx. one week per floor). Keep safety locks open, approx. 1.5 m clear in front and cover furniture. Do not open the window for 24 h after installation.' } },
      { date: '27.7.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - vesikatto ja ikkunat alkamassa', sv: 'Lägesrapport - tak och fönster inleds', en: 'Status update - roof and windows starting' },
        excerpt: { fi: 'Käynnissä: vesikaton asennus valmistuu lähiaikoina, julkisivujen pohjarappaus ja parvekkeiden valutyöt tehty. Seuraavaksi vesikaton maalaus ja ikkunoiden asennus.', sv: 'Pågår: takmonteringen färdig inom kort, fasadernas grundputs och balkongernas gjutningar klara. Härnäst takmålning och fönstermontering.', en: 'Under way: roof installation completing shortly, facade base rendering and balcony castings done. Next: roof painting and window installation.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - aikataulu päivitetty 30.6.', sv: 'Lägesrapport - tidtabellen uppdaterad 30.6.', en: 'Status update - schedule updated 30 Jun' },
        excerpt: { fi: 'Käynnissä: vesikaton pohjatyöt, julkisivujen pohjan kunnostus sekä parvekkeiden muotitus, raudoitus ja valutyöt. Seuraavaksi rappaus, vesikaton pellitys ja ikkunoiden asennus.', sv: 'Pågår: takets grundarbeten, fasadernas grundrenovering samt balkongernas formning, armering och gjutning. Härnäst puts, takplåt och fönstermontering.', en: 'Under way: roof base work, facade base repair and balcony formwork, reinforcement and casting. Next: rendering, roof sheeting and window installation.' } },
      { date: '22.8.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - ikkuna- ja julkisivutyöt', sv: 'Lägesrapport - fönster- och fasadarbeten', en: 'Status update - window and facade work' },
        excerpt: { fi: 'Käynnissä ovat vesikaton maalaustyöt, julkisivun pohjarappausten viimeistely, ikkunapielien mallien teko sekä 3. kerroksen ikkuna-asennukset. Seuraavaksi alkavat 2. kerroksen asennukset, ikkunapielien rappaus, ikkunapenkkien pellitys ja parvekkeiden ruiskubetonointi.', sv: 'Pågående: målning av yttertaket, finslipning av fasadens grundputs, modellarbeten för fönstersmygar och fönstermontage på våning 3. Härnäst inleds montaget på våning 2, putsning av fönstersmygar, plåtning av fönsterbänkar och sprutbetongering av balkongerna.', en: 'Underway: roof painting, finishing of the facade base rendering, window reveal sample work and window installation on floor 3. Next: installation on floor 2, rendering of window reveals, sheet metal for window sills and shotcreting of balconies.' } },
      { date: '20.8.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: '2. kerroksen ikkuna-asennukset alkavat 26.8.', sv: 'Fönstermontaget på våning 2 inleds 26.8.', en: 'Window installation on floor 2 starts 26 August' },
        excerpt: { fi: 'Uusien ikkunoiden asennus 2. kerroksessa alkaa keskiviikkona 26.8. klo 8.00 ja kestää noin 1,5 viikkoa. Jätä turvalukot auki ja varaa ikkunan eteen 1,5 metriä vapaata tilaa. Ikkunoita ei saa avata 24 tuntiin asennuksen jälkeen.', sv: 'Monteringen av nya fönster på våning 2 inleds onsdagen 26.8 kl. 8.00 och tar cirka 1,5 veckor. Lämna säkerhetslåsen öppna och se till att det finns 1,5 meter fritt utrymme framför fönstret. Fönstren får inte öppnas under 24 timmar efter monteringen.', en: 'Installation of new windows on floor 2 starts Wednesday 26 August at 8.00 and takes about 1.5 weeks. Leave security locks open and keep 1.5 metres of free space in front of the window. Windows must not be opened for 24 hours after installation.' } },
      { date: '20.8.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: 'Ikkunapielien kunnostustyöt alkavat 24.8.', sv: 'Renoveringen av fönstersmygarna inleds 24.8.', en: 'Window reveal repairs start 24 August' },
        excerpt: { fi: 'Ikkunavaihdon yhteydessä vaurioituneiden alueiden korjaustyöt alkavat maanantaina 24.8. Työt aloitetaan ylimmästä kerroksesta ja edetään kerros kerrallaan alaspäin, noin 2 viikkoa kerrosta kohti. Työt tehdään ma-pe klo 8–17, ja asunnossa käydään useampana päivänä.', sv: 'Reparationen av områden som skadats i samband med fönsterbytet inleds måndagen 24.8. Arbetet startar på översta våningen och fortsätter våning för våning nedåt, cirka 2 veckor per våning. Arbetet utförs må-fre kl. 8–17 och lägenheten besöks under flera dagar.', en: 'Repairs to areas damaged during the window replacement start on Monday 24 August. Work begins on the top floor and moves down one floor at a time, about 2 weeks per floor. Work is carried out Mon-Fri 8.00–17.00 and each flat is visited on several days.' } },
      { date: '14.8.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: '3. kerroksen ikkuna-asennukset alkavat 20.8.', sv: 'Fönstermontaget på våning 3 inleds 20.8.', en: 'Window installation on floor 3 starts 20 August' },
        excerpt: { fi: 'Uusien ikkunoiden asennus 3. kerroksessa alkaa torstaina 20.8. klo 8.00 ja kestää noin viikon. Jätä turvalukot auki, varaa ikkunan eteen 1,5 metriä vapaata tilaa ja suojaa huonekalut muovilla. Ikkunoita ei saa avata 24 tuntiin asennuksen jälkeen.', sv: 'Monteringen av nya fönster på våning 3 inleds torsdagen 20.8 kl. 8.00 och tar cirka en vecka. Lämna säkerhetslåsen öppna, se till att det finns 1,5 meter fritt utrymme framför fönstret och skydda möblerna med plast. Fönstren får inte öppnas under 24 timmar efter monteringen.', en: 'Installation of new windows on floor 3 starts Thursday 20 August at 8.00 and takes about one week. Leave security locks open, keep 1.5 metres of free space in front of the window and cover furniture with plastic. Windows must not be opened for 24 hours after installation.' } }
    ],
    cygnaeuksenkatu10: [
      { date: '12.2.2026', image: 'kuvat/referenssit/cygnaeuksenkatu10.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus ja ikkunoiden mittauskierros', sv: 'Entreprenaden inleds och fönstermätning', en: 'Project start and window measurements' },
        excerpt: { fi: 'Ikkunoiden uusinta ja julkisivukorjaus käynnistyy. Ikkunoiden mittauskierros tehdään asunnoissa alkaen ylimmästä kerroksesta klo 8.', sv: 'Fönsterbyte och fasadrenovering inleds. Fönstermätningen i bostäderna börjar från översta våningen kl. 8.', en: 'Window replacement and facade repair begin. The window measurement round starts from the top floor at 8 a.m.' } },
      { date: '24.3.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Ikkunoiden mittauskierros', sv: 'Fönstermätning', en: 'Window measurements' },
        excerpt: { fi: 'Asunnoissa tehdään ikkunoiden mittauskierros ylimmästä kerroksesta alaspäin klo 8 alkaen yleisavaimella.', sv: 'En fönstermätning görs i bostäderna uppifrån och ned från kl. 8 med huvudnyckel.', en: 'A window measurement round is carried out in the apartments top-down from 8 a.m. using a master key.' } },
      { date: '7.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sisäpihan telineiden asennustyöt', sv: 'Ställningsmontering på gården', en: 'Courtyard scaffolding installation' },
        excerpt: { fi: 'Sisäpihan julkisivuille rakennetaan telineet 7.4.2026 alkaen. Sisäpihan parvekkeet on tyhjennettävä ennen asennusta.', sv: 'Ställningar byggs på gårdsfasaderna från 7.4.2026. Gårdsbalkongerna måste tömmas före monteringen.', en: 'Scaffolding is built on the courtyard facades from 7 April 2026. Courtyard balconies must be cleared before installation.' } },
      { date: '20.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Työmaan tilanne ja ikkunoiden vaihto', sv: 'Lägesrapport och fönsterbyte', en: 'Site status and window replacement' },
        excerpt: { fi: 'Katujulkisivun pielien purkutyöt ovat valmiit ja seinät pestään. Ikkunoiden vaihto alkaa viikolla 19 ylimmästä kerroksesta.', sv: 'Rivningen av gatufasadens smygar är klar och väggarna tvättas. Fönsterbytet börjar vecka 19 från översta våningen.', en: 'Demolition of the street facade reveals is complete and the walls are being washed. Window replacement starts in week 19 from the top floor.' } },
      { date: '7.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Liikehuoneistojen ikkunoiden tarkastuskierros', sv: 'Granskning av affärslokalernas fönster', en: 'Inspection of commercial premises windows' },
        excerpt: { fi: 'Maantason liikehuoneistoissa tehdään ikkunoiden tarkastuskierros uusimistöiden suunnittelua varten.', sv: 'I affärslokalerna i gatuplan görs en fönstergranskning inför förnyelsen.', en: 'A window inspection is carried out in the ground-floor commercial premises to plan the replacement.' } },
      { date: '1.6.2026', image: 'kuvat/referenssit/cygnaeuksenkatu10.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Antenniverkkojen tarkistustyöt', sv: 'Kontroll av antennnät', en: 'Antenna network checks' },
        excerpt: { fi: 'Kiinteistön antenniverkkojen tarkistustyöt tehdään julkisivu- ja ikkunatöiden yhteydessä.', sv: 'Fastighetens antennnät kontrolleras i samband med fasad- och fönsterarbetena.', en: 'The building’s antenna networks are checked in connection with the facade and window work.' } },
      { date: '5.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'A-rapun ikkunapielien kunnostustyöt', sv: 'Renovering av fönstersmygar i trapphus A', en: 'Window reveal repairs in stairwell A' },
        excerpt: { fi: 'A-rapussa korjataan ikkunanvaihdon yhteydessä vaurioituneet ikkunapielet ylimmästä kerroksesta alaspäin.', sv: 'I trapphus A repareras de fönstersmygar som skadats vid fönsterbytet, uppifrån och ned.', en: 'In stairwell A, window reveals damaged during the window replacement are repaired from the top floor down.' } },
      { date: '24.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'IV-kartoituskäynti 24.6. peruttu', sv: 'IV-kartläggningen 24.6 inställd', en: 'Ventilation survey on 24 June cancelled' },
        excerpt: { fi: 'Keskiviikoksi 24.6.2026 klo 8–14 suunniteltu IV-kartoituskäynti on peruttu sairastumisen vuoksi. Käynnille sovitaan uusi ajankohta, josta tiedotetaan asukkaille vähintään viikkoa ennen.', sv: 'Den IV-kartläggning som planerats till onsdag 24.6.2026 kl. 8–14 är inställd på grund av sjukdom. En ny tid avtalas och meddelas de boende minst en vecka i förväg.', en: 'The ventilation survey planned for Wednesday 24 June 2026, 8 a.m.–2 p.m., has been cancelled due to illness. A new date will be arranged and announced to residents at least a week in advance.' } },
      { date: '24.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'B-rapun ikkunapielien kunnostustyöt', sv: 'Renovering av fönstersmygar i trapphus B', en: 'Window reveal repairs in stairwell B' },
        excerpt: { fi: 'B-rapussa aloitetaan 29.6.2026 ikkunanvaihdon yhteydessä vaurioituneiden ikkunapielien korjaustyöt ylimmästä kerroksesta alaspäin. Kesto noin 2 viikkoa, työt ma–pe klo 8–17. Siirrä tavarat pois ikkunan edestä ja jätä turvalukot auki – asuntoihin tullaan yleisavaimella.', sv: 'I trapphus B inleds 29.6.2026 reparationen av de fönstersmygar som skadats vid fönsterbytet, uppifrån och ned. Arbetet tar cirka 2 veckor och utförs mån–fre kl. 8–17. Flytta undan föremål framför fönstret och lämna säkerhetslåsen öppna – bostäderna nås med huvudnyckel.', en: 'In stairwell B, repairs to window reveals damaged during the window replacement start on 29 June 2026, from the top floor down. The work takes about 2 weeks, Mon–Fri 8 a.m.–5 p.m. Clear items from in front of the window and leave safety locks open – apartments are entered with a master key.' } },
      { date: '3.7.2026', image: 'kuvat/referenssit/cygnaeuksenkatu10.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'IV-kartoituskäynti 8.7. klo 9 alkaen', sv: 'IV-kartläggning 8.7 från kl. 9', en: 'Ventilation survey 8 July from 9 a.m.' },
        excerpt: { fi: 'Kaikissa asunnoissa tehdään IV-tarkastuskierros ke 8.7.2026 klo 9 alkaen A-rapun ylimmästä kerroksesta. Kierroksella kartoitetaan julkisivun tuloilmaventtiilien kunto ja tyyppi; käynti kestää n. 15 min asuntoa kohden. Asuntoihin tullaan yleisavaimella – jätäthän turvalukot auki.', sv: 'En IV-inspektion görs i alla bostäder ons 8.7.2026 från kl. 9, med start i trapphus A:s översta våning. Tilluftsventilernas skick och typ kartläggs; besöket tar ca 15 min per bostad. Bostäderna nås med huvudnyckel – lämna säkerhetslåsen öppna.', en: 'A ventilation inspection is carried out in all apartments on Wed 8 July 2026 from 9 a.m., starting from the top floor of stairwell A. The condition and type of the facade supply-air valves are surveyed; the visit takes approx. 15 min per apartment. Apartments are entered with a master key – please leave safety locks open.' } },
      { date: '5.8.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: 'Ikkunoiden pesutyöt alkavat 11.8.', sv: 'Fönstertvätten börjar 11.8.', en: 'Window cleaning starts 11 Aug' },
        excerpt: { fi: 'Ikkunoiden pesutyöt alkavat ti 11.8.2026 klo 8 ylimmästä asunnosta ja kestävät noin viikon (ma–pe klo 8–16). Ikkunat pestään ulkoa ja sisältä, lukot öljytään ja asukkaille annetaan huolto-ohjeet. Siirrä huonekalut, verhot ja kasvit pois ikkunoiden edestä ja jätä turvalukot auki.', sv: 'Fönstertvätten inleds tis 11.8.2026 kl. 8 från den översta bostaden och pågår cirka en vecka (mån–fre kl. 8–16). Fönstren tvättas utifrån och inifrån, låsen oljas och de boende får skötselanvisningar. Flytta undan möbler, gardiner och växter framför fönstren och lämna säkerhetslåsen öppna.', en: 'Window cleaning begins on Tue 11 Aug 2026 at 8 a.m. from the top apartment and lasts about a week (Mon–Fri 8 a.m.–4 p.m.). Windows are washed inside and out, locks are oiled and residents are given maintenance instructions. Move furniture, curtains and plants away from the windows and leave safety locks open.' } },
      { date: '12.8.2026', image: 'kuvat/referenssit/cygnaeuksenkatu10.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - katujulkisivu ja sisäpiha', sv: 'Lägesrapport - gatufasad och innergård', en: 'Status update - street facade and courtyard' },
        excerpt: { fi: 'Käynnissä ovat katujulkisivun puhdistus- ja maalaustyöt sekä sisäpihan rappaustyöt ja parvekkeiden kunnostus. Seuraavaksi alkavat katujulkisivun telineiden purku ja liiketilaikkunoiden kunnostustyöt. Aikataulu päivitetty 11.8.2026.', sv: 'Pågående: rengöring och målning av gatufasaden samt putsarbeten och balkongrenovering på innergården. Härnäst inleds rivning av ställningarna på gatufasaden och renovering av affärslokalernas fönster. Tidtabellen uppdaterad 11.8.2026.', en: 'Underway: cleaning and painting of the street facade, plus rendering work and balcony repairs in the courtyard. Next: dismantling of the street facade scaffolding and renovation of the commercial premises’ windows. Schedule updated 11 August 2026.' } }
    ],
    fleminginkatu11: [
      { date: '30.3.2026', image: 'kuvat/referenssit/fleminginkatu11.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Työmaan aloitus', sv: 'Byggarbetet inleds', en: 'Site work begins' },
        excerpt: { fi: 'Sisäpihan ikkunoiden uusiminen sekä rappausten ja tiilisaumojen uusimistyöt käynnistyvät.', sv: 'Förnyelsen av gårdens fönster samt puts och tegelfogar inleds.', en: 'Renewal of the courtyard windows and of the rendering and brick joints begins.' } },
      { date: '9.4.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Ikkunoiden mittauskierros', sv: 'Fönstermätning', en: 'Window measurements' },
        excerpt: { fi: 'Asunnoissa tehdään ikkunoiden mittauskierros uusien ikkunoiden valmistusta varten.', sv: 'En fönstermätning görs i bostäderna för tillverkningen av nya fönster.', en: 'A window measurement round is carried out in the apartments to manufacture the new windows.' } },
      { date: '29.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - tiilisaumat', sv: 'Lägesrapport - tegelfogar', en: 'Status update - brick joints' },
        excerpt: { fi: 'Päädyn tiilisaumausten poistotyöt ovat valmiit ja työ etenee suunnitellusti seuraaviin julkisivuihin.', sv: 'Borttagningen av gavelns tegelfogar är klar och arbetet framskrider planenligt.', en: 'Removal of the gable’s brick joints is complete and work proceeds to the next facades as planned.' } },
      { date: '2.5.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Rappausten ja tiilisaumojen uusimistyöt etenevät julkisivuilla aikataulun mukaisesti.', sv: 'Förnyelsen av puts och tegelfogar på fasaderna framskrider enligt tidtabell.', en: 'Renewal of rendering and brick joints on the facades is progressing on schedule.' } },
      { date: '6.5.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - katujulkisivu', sv: 'Lägesrapport - gatufasaden', en: 'Status update - street facade' },
        excerpt: { fi: 'Katujulkisivun tiilisaumausten ja ensimmäisen kerroksen rappausten poistotyöt ovat valmiit.', sv: 'Borttagningen av gatufasadens tegelfogar och första våningens puts är klar.', en: 'Removal of the street facade’s brick joints and the first-floor rendering is complete.' } },
      { date: '28.5.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - tiilisaumat valmiit', sv: 'Lägesrapport - tegelfogar klara', en: 'Status update - brick joints done' },
        excerpt: { fi: 'Kaikkien julkisivujen tiilisaumausten poistotyöt on tehty ja rappausjätteiden siivous on käynnissä.', sv: 'Borttagningen av tegelfogar på alla fasader är gjord och städningen av putsavfall pågår.', en: 'Brick-joint removal on all facades is done and clearing of render debris is under way.' } },
      { date: '5.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - mallityöt', sv: 'Lägesrapport - modellarbeten', en: 'Status update - sample work' },
        excerpt: { fi: 'Tiilisaumojen mallityöt ovat käynnissä, ja seuraavat työvaiheet ovat alkamassa.', sv: 'Modellarbetena för tegelfogarna pågår och nästa arbetsskeden inleds snart.', en: 'Sample work for the brick joints is under way and the next phases are starting.' } },
      { date: '8.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Suodatinkankaan asennustyöt', sv: 'Montering av filterduk', en: 'Filter fabric installation' },
        excerpt: { fi: 'Jokaisen asunnon tuuletusikkunaan asennetaan suodatinkangas. Työt tehdään ulkopuolelta telineiltä.', sv: 'En filterduk monteras i varje bostads vädringsfönster. Arbetet utförs utifrån från ställningarna.', en: 'A filter fabric is installed in each apartment’s ventilation window. The work is done from the outside on scaffolding.' } },
      { date: '26.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - tiilisaumaus ja hiekkapuhallus', sv: 'Lägesrapport - tegelfogning och blästring', en: 'Status update - repointing and blasting' },
        excerpt: { fi: 'Käynnissä: katujulkisivujen tiilisaumaustyöt ja tuuletusparvekkeiden hiekkapuhallustyöt. Seuraavaksi alkavat sokkelikerroksen rappaustyöt.', sv: 'Pågår: tegelfogning på gatufasaderna och blästring av vädringsbalkongerna. Härnäst inleds putsarbetena på sockelvåningen.', en: 'Under way: brick repointing on the street facades and sandblasting of the ventilation balconies. Next: rendering of the plinth level.' } },
      { date: '16.7.2026', image: 'kuvat/referenssit/fleminginkatu11.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - maantasokerroksen rappaustyöt', sv: 'Lägesrapport - putsarbeten på bottenvåningen', en: 'Status update - ground-floor rendering' },
        excerpt: { fi: 'Käynnissä: kerrospellin purku- ja kaatovalutyöt sekä katujulkisivun maantasokerroksen linjaukset, täyttörappaukset ja roilotustyöt. Seuraavaksi päädyn ja pihajulkisivun maantasokerroksen tartunta-, linjaus- ja täyttörappaustyöt.', sv: 'Pågår: rivning och gjutning av våningslisten samt riktning, fyllnadsputs och spårfräsning på gatufasadens bottenvåning. Härnäst vidhäftnings-, riktnings- och fyllnadsputs på gaveln och gårdsfasadens bottenvåning.', en: 'Under way: demolition and levelling casts of the floor flashing, plus alignment, filler rendering and chasing on the street facade ground level. Next: bonding, alignment and filler rendering on the gable and courtyard facade ground level.' } },
      { date: '5.8.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - aikataulu päivitetty 5.8.', sv: 'Lägesrapport - tidtabellen uppdaterad 5.8.', en: 'Status update - schedule updated 5 Aug' },
        excerpt: { fi: 'Käynnissä: ylimmäisen kerroslistan kaatovalutyöt, pihajulkisivun maantasokerroksen linjaukset ja täyttörappaukset sekä katujulkisivun rappukäytävän smyygin mallityöt. Seuraavaksi asennetaan naapuripäädyn telineet.', sv: 'Pågår: gjutning av den översta våningslisten, riktning och fyllnadsputs på gårdsfasadens bottenvåning samt provarbete på trapphusets smyg i gatufasadens bottenvåning. Härnäst monteras ställningar vid grannens gavel.', en: 'Under way: levelling casts of the topmost floor trim, alignment and filler rendering on the courtyard facade ground level, and sample work on the stairwell reveal at street level. Next: scaffolding at the neighbouring gable.' } },
      { date: '21.8.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Asukastiedote', sv: 'Boendeinfo', en: 'Resident notice' },
        title: { fi: 'Tuuletusparvekkeiden purkutyöt alkavat 25.8.', sv: 'Rivningen av luftningsbalkongerna inleds 25.8.', en: 'Demolition of ventilation balconies starts 25 August' },
        excerpt: { fi: 'Tuuletusparvekkeiden purkutyöt aloitetaan tiistaina 25.8.2026. Työt kestävät noin 2–3 viikkoa ja aiheuttavat meteliä. Työaika arkisin klo 8–18 ja lauantaisin klo 9–16.', sv: 'Rivningen av luftningsbalkongerna inleds tisdagen 25.8.2026. Arbetet tar cirka 2–3 veckor och orsakar buller. Arbetstid vardagar kl. 8–18 och lördagar kl. 9–16.', en: 'Demolition of the ventilation balconies starts on Tuesday 25 August 2026. The work takes about 2–3 weeks and causes noise. Working hours are weekdays 8.00–18.00 and Saturdays 9.00–16.00.' } },
      { date: '19.8.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - pellitys- ja rappaustyöt', sv: 'Lägesrapport - plåt- och putsarbeten', en: 'Status update - sheet metal and rendering work' },
        excerpt: { fi: 'Käynnissä ovat ylimmäisen kerroslistan pellitystyöt, pihajulkisivun maantasokerroksen linjaukset ja täyttörappaus sekä katujulkisivun rappukäytävän smyygin mallityöt. Seuraavaksi alkavat naapuripäädyn telineiden asennus ja autotallin korjaustyöt. Aikataulu päivitetty 19.8.2026.', sv: 'Pågående: plåtning av den översta våningslisten, linjeringar och fyllnadsputs på gårdsfasadens markplan samt modellarbeten för trapphusets smyg på gatufasaden. Härnäst: ställningsmontage vid grannens gavel och reparation av garaget. Tidtabellen uppdaterad 19.8.2026.', en: 'Underway: sheet metal work on the top floor cornice, alignment and filler rendering on the courtyard facade ground floor, and reveal sample work in the street facade stairwell. Next: scaffolding at the neighbouring gable and garage repairs. Schedule updated 19 August 2026.' } }
    ],
    hameentie37: [
      { date: '18.2.2026', image: 'kuvat/referenssit/hameentie37.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus ja ikkunoiden mittauskierros', sv: 'Entreprenaden inleds och fönstermätning', en: 'Project start and window measurements' },
        excerpt: { fi: 'Ikkunoiden ja ovien uusimistyöt käynnistyvät. Mittauskierros alkaa A-rapusta klo 8 ylimmästä kerroksesta alaspäin.', sv: 'Förnyelsen av fönster och dörrar inleds. Mätningsrundan börjar i trapphus A kl. 8 uppifrån och ned.', en: 'Renewal of windows and doors begins. The measurement round starts in stairwell A at 8 a.m. top-down.' } },
      { date: '2.3.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Tiedote', sv: 'Meddelande', en: 'Notice' },
        title: { fi: 'Ikkunaurakan infotilaisuus 1.4.', sv: 'Infomöte om fönsterentreprenaden 1.4.', en: 'Window project info session 1 April' },
        excerpt: { fi: 'Ikkunaurakan infotilaisuus järjestetään ke 1.4.2026 klo 17 Kinaporin palvelukeskuksessa asukkaille, osakkaille ja liiketilojen vuokralaisille.', sv: 'Infomöte om fönsterentreprenaden ordnas ons. 1.4.2026 kl. 17 i Kinaporis servicecentral för boende, delägare och hyresgäster.', en: 'An info session on the window project is held on Wed 1 April 2026 at 5 p.m. at the Kinapori service centre for residents, shareholders and commercial tenants.' } },
      { date: '19.5.2026', image: 'kuvat/referenssit/hameentie37.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Suojakoppien asennustyöt alkavat 1.6.', sv: 'Montering av skyddsbås inleds 1.6.', en: 'Protective enclosures installed from 1 June' },
        excerpt: { fi: 'Asuntoihin asennettavien suojakoppien asennustyöt aloitetaan 1.6.2026.', sv: 'Monteringen av skyddsbås i bostäderna inleds 1.6.2026.', en: 'Installation of the protective enclosures in apartments begins on 1 June 2026.' } },
      { date: '20.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ikkunoiden uusimisaikataulu', sv: 'Tidtabell för fönsterbytet', en: 'Window replacement schedule' },
        excerpt: { fi: 'Ikkunoiden vaihto etenee kerroksittain: 9. kerros alkaen viikoilla 23–24 ja siitä alaspäin porras kerrallaan.', sv: 'Fönsterbytet framskrider våningsvis: 9:e våningen från vecka 23–24 och nedåt, trapphus för trapphus.', en: 'Window replacement proceeds floor by floor: the 9th floor from weeks 23–24 and downwards, stairwell by stairwell.' } },
      { date: '28.5.2026', image: 'kuvat/referenssit/hameentie37.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Suojakoppien asennus 5.–6. kerros 15.6.', sv: 'Skyddsbås på vån. 5–6 från 15.6.', en: 'Enclosures on floors 5–6 from 15 June' },
        excerpt: { fi: 'Suojakoppien asennustyöt 5. ja 6. kerroksen asuntoihin aloitetaan 15.6.2026.', sv: 'Monteringen av skyddsbås i bostäderna på 5:e och 6:e våningen inleds 15.6.2026.', en: 'Installation of protective enclosures in the 5th and 6th floor apartments begins on 15 June 2026.' } },
      { date: '2.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Liikehuoneistojen ikkunoiden mittauskierros 11.6.', sv: 'Fönstermätning i affärslokaler 11.6.', en: 'Commercial premises window measurements 11 June' },
        excerpt: { fi: 'Liikehuoneistojen ikkunoiden mittauskierros tehdään 11.6.2026.', sv: 'Fönstermätningen i affärslokalerna görs 11.6.2026.', en: 'Window measurements in the commercial premises take place on 11 June 2026.' } },
      { date: '15.6.2026', image: 'kuvat/referenssit/hameentie37.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Ikkunoiden uusimistyön eteneminen ja aikataulu', sv: 'Fönsterbytets framskridande och tidtabell', en: 'Window replacement progress and schedule' },
        excerpt: { fi: 'Tiedote ikkunoiden uusimistyön etenemisestä ja aikataulun tulkinnasta asukkaille.', sv: 'Information till de boende om fönsterbytets framskridande och tolkningen av tidtabellen.', en: 'An update for residents on the progress of the window replacement and how to read the schedule.' } },
      { date: '11.8.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Ikkunatyöt', sv: 'Fönsterarbeten', en: 'Window works' },
        title: { fi: 'Ikkunoiden viimeistelytyöt asunnoissa', sv: 'Slutarbeten på fönstren i lägenheterna', en: 'Window finishing work in the flats' },
        excerpt: { fi: 'Asunnoissa asennetaan ikkunoiden sisäpuolen alalistat ja ulkopuolen liitospellit. Työ on pölytöntä eikä vaadi suojakoppia tai asunnon peittämistä. Aikataulu: B-rappu 13.–14.8. (kerrokset 8–9), A-rappu 17.8., B-rappu 18.8. ja C-rappu 19.8. (kerrokset 7–1).', sv: 'I lägenheterna monteras fönstrens invändiga underlister och utvändiga anslutningsplåtar. Arbetet är dammfritt och kräver varken skyddsbås eller övertäckning av lägenheten. Tidtabell: trapphus B 13.–14.8 (våning 8–9), trapphus A 17.8, trapphus B 18.8 och trapphus C 19.8 (våning 7–1).', en: 'Interior bottom trims and exterior connecting flashings will be installed on the windows. The work is dust-free and requires no protective enclosure or covering of the flat. Schedule: stairwell B 13–14 August (floors 8–9), stairwell A 17 August, stairwell B 18 August and stairwell C 19 August (floors 7–1).' } }
    ],
    neitsytpolku9: [
      { date: '9.4.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Parvekehanke ja julkisivusaneeraus alkaa', sv: 'Balkongprojekt och fasadrenovering inleds', en: 'Balcony project and facade renovation begins' },
        excerpt: { fi: 'Parvekkeiden rakentaminen ja julkisivusaneeraus alkavat huhtikuussa 2026 telineiden pystytyksellä. Urakassa rakennetaan uudet jälkiasenteiset huoneistoparvekkeet.', sv: 'Byggandet av balkonger och fasadrenoveringen inleds i april 2026 med ställningsmontering. Nya efterhandsmonterade lägenhetsbalkonger byggs.', en: 'Balcony construction and facade renovation begin in April 2026 with scaffolding. New retrofitted apartment balconies will be built.' } },
      { date: '15.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus', sv: 'Entreprenaden inleds', en: 'Project start' },
        excerpt: { fi: 'Sisäpihojen parvekkeiden uusiminen sekä ikkunoiden ja julkisivujen kunnostustyöt käynnistyvät työmaan perustamisella ja telineillä.', sv: 'Förnyelsen av gårdsbalkongerna samt renoveringen av fönster och fasader inleds med etablering och ställningar.', en: 'Renewal of the courtyard balconies and repair of windows and facades begins with site setup and scaffolding.' } },
      { date: '22.4.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Polkupyörät pois sisäpihoilta', sv: 'Cyklar bort från gårdarna', en: 'Bicycles to be removed from courtyards' },
        excerpt: { fi: 'Pyydämme siirtämään polkupyörät pois sisäpihoilta telineiden ja parveketöiden tieltä.', sv: 'Vi ber er flytta cyklarna bort från gårdarna för ställningarna och balkongarbetena.', en: 'Please move bicycles away from the courtyards to make way for scaffolding and balcony work.' } },
      { date: '22.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Telineiden pystytys ja työmaan valmistelut etenevät sisäpihoilla suunnitellusti.', sv: 'Ställningsmonteringen och förberedelserna på gårdarna framskrider planenligt.', en: 'Scaffolding and site preparations in the courtyards are progressing as planned.' } },
      { date: '18.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Parvekeovien mittauskierros', sv: 'Mätning av balkongdörrar', en: 'Balcony door measurements' },
        excerpt: { fi: 'Asunnoissa tehdään parvekeovien mittauskierros. Jos kotona ei ole ketään, asuntoon tullaan yleisavaimella.', sv: 'En mätning av balkongdörrarna görs i bostäderna. Om ingen är hemma används huvudnyckel.', en: 'Balcony doors are measured in the apartments. If no one is home, a master key is used.' } },
      { date: '21.5.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sisäpihojen julkisivujen purkutyöt', sv: 'Rivning av gårdsfasaderna', en: 'Courtyard facade demolition' },
        excerpt: { fi: 'Sisäpihojen julkisivujen purkutyöt alkavat. Työ aiheuttaa melua ja pölyä työalueen läheisyydessä.', sv: 'Rivningen av gårdsfasaderna inleds. Arbetet orsakar buller och damm nära arbetsområdet.', en: 'Demolition of the courtyard facades begins. The work causes noise and dust near the work area.' } },
      { date: '4.6.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Parveke- ja julkisivutyöt etenevät sisäpihoilla. Tiedotamme seuraavista työvaiheista erikseen.', sv: 'Balkong- och fasadarbetena framskrider på gårdarna. Vi informerar om kommande skeden separat.', en: 'Balcony and facade work is progressing in the courtyards. We will announce the next phases separately.' } },
      { date: '18.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - purkutyöt valmiit', sv: 'Lägesrapport - rivningen klar', en: 'Status update - demolition complete' },
        excerpt: { fi: 'Julkisivujen purkutyöt ovat valmistuneet ja purkujätteen siivous on käynnissä. Julkisivun pesutyöt tehdään 19.–20.6. klo 9–16, pohjien kunnostus alkaa viikolla 26 ja rappaustyöt viikolla 27.', sv: 'Rivningen av fasaderna är klar och städningen av rivningsavfallet pågår. Fasadtvätt utförs 19–20.6 kl. 9–16, grundrenoveringen börjar vecka 26 och putsarbetena vecka 27.', en: 'Facade demolition is complete and clearing of demolition waste is under way. Facade washing takes place 19–20 June, 9 a.m.–4 p.m., substrate repairs start in week 26 and rendering in week 27.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - aikataulu päivitetty 30.6.', sv: 'Lägesrapport - tidtabellen uppdaterad 30.6.', en: 'Status update - schedule updated 30 Jun' },
        excerpt: { fi: 'Käynnissä: julkisivujen pohja-, linjaus- ja rappaustyöt. Seuraavaksi edellä mainitut työt jatkuvat ja malli-ikkuna valmistetaan.', sv: 'Pågår: fasadernas grund-, riktnings- och putsarbeten. Härnäst fortsätter arbetena och ett provfönster tillverkas.', en: 'Under way: facade base, alignment and rendering work. Next: the above continues and a sample window is produced.' } },
      { date: '2.7.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ikkunoiden alaosan muovituksen avaaminen', sv: 'Plasten i fönstrens nedre del öppnas', en: 'Opening the plastic on the lower windows' },
        excerpt: { fi: 'Julkisivun tartuntarappaustöiden valmistuttua ikkunoiden alaosan muovitus avataan, jolloin asuntoa voi tuulettaa työpäivän päätyttyä. Tuulettaminen tapahtuu omalla vastuulla – työmaa on yhä käynnissä ja avoimesta ikkunasta voi kulkeutua rakennuspölyä.', sv: 'När fasadens vidhäftningsputs är klar öppnas plasten i fönstrens nedre del, varefter bostaden kan vädras efter arbetsdagens slut. Vädring sker på eget ansvar – bygget pågår fortfarande och byggdamm kan komma in genom ett öppet fönster.', en: 'Once the facade bonding render is complete, the plastic covering on the lower part of the windows is opened, allowing apartments to be aired after the working day. Airing is at your own risk – the site is still active and construction dust can enter through an open window.' } },
      { date: '31.7.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ilmalämpöpumput osakasmuutostöinä parvekkeille', sv: 'Luftvärmepumpar på balkongerna som aktieägarändring', en: 'Balcony heat pumps as shareholder alterations' },
        excerpt: { fi: 'Parvekkeille voi asennuttaa viilennykseen tarkoitetun ilmalämpöpumpun osakasmuutostyönä julkisivuremontin valmistuttua. Osakas tekee muutostyöilmoituksen isännöitsijälle ja sopii asennuksesta taloyhtiön kanssa. Ulkoseinän läpivientivarauksen voi tilata Myrak Oy:ltä 200 €/asunto elokuun loppuun mennessä.', sv: 'Efter fasadrenoveringen kan en luftvärmepump för kylning installeras på balkongen som en aktieägarändring. Aktieägaren gör en ändringsanmälan till disponenten och avtalar om installationen med bolaget. Genomföring i ytterväggen kan beställas av Myrak Oy för 200 €/bostad fram till slutet av augusti.', en: 'After the facade renovation, an air-source heat pump for cooling may be installed on the balcony as a shareholder alteration. The shareholder files an alteration notice with the property manager and agrees the installation with the housing company. A wall penetration can be ordered from Myrak Oy for €200 per apartment until the end of August.' } },
      { date: '19.8.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Boendeinfo', en: 'Resident notice' },
        title: { fi: 'Sisäänkäyntien rappausten purkutyöt viikolla 35', sv: 'Rivning av entréernas puts under vecka 35', en: 'Demolition of entrance rendering in week 35' },
        excerpt: { fi: 'Talon sisäänkäyntien rappausten purkutyöt tehdään viikolla 35, ja sisäänkäynteihin tulee tilapäisiä käyttökatkoja. A-E-rapuissa kuljetaan tarvittaessa toisen sisäänkäyntioven kautta. F-rapussa sisäänkäynti suljetaan lyhyiksi ajoiksi, koska vaihtoehtoista kulkureittiä ei ole.', sv: 'Rivningen av putsen vid husets entréer utförs under vecka 35 och entréerna stängs tillfälligt. I trapphusen A-E sker in- och utpassage vid behov genom den andra entrédörren. I trapphus F stängs entrén korta stunder, eftersom alternativ ingång saknas.', en: 'Rendering at the building entrances will be demolished during week 35, causing temporary closures. In stairwells A-E, access is via the second entrance door when needed. In stairwell F the entrance will be closed for short periods, as there is no alternative route.' } },
      { date: '12.8.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - julkisivut ja osakasparvekkeet', sv: 'Lägesrapport - fasader och aktielägenheternas balkonger', en: 'Status update - facades and shareholder balconies' },
        excerpt: { fi: 'Julkisivujen pohjarappaustyöt ovat 70 % valmiit, ja ikkunapielien sekä kerroslistan rappaustyöt ovat käynnissä. Osakasparvekkeilla tehdään muottien pohjatöitä ja raudoitusten asennusta. Seuraavaksi alkavat sisäänkäyntien rappausten purku, pintarappaus ja parvekkeiden valutyöt.', sv: 'Fasadernas grundputs är till 70 % färdig och putsningen av fönstersmygar och våningslister pågår. På balkongerna görs grundarbeten för formar och armering monteras. Härnäst inleds rivning av entréernas puts, ytputsning och gjutning av balkongerna.', en: 'Base rendering of the facades is 70 % complete, and rendering of window reveals and floor cornices is underway. On the balconies, formwork groundwork and reinforcement installation are in progress. Next: demolition of entrance rendering, surface rendering and balcony casting.' } }
    ],
    aino: [
      { date: '30.1.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus', sv: 'Entreprenaden inleds', en: 'Project start' },
        excerpt: { fi: 'Katujulkisivujen ja vesikaton kunnostustyöt alkavat telineiden asennuksella. Urakka-aika on helmikuu–syyskuu 2026.', sv: 'Renoveringen av gatufasaderna och taket inleds med ställningsmontering. Entreprenadtiden är februari–september 2026.', en: 'The street-facade and roof repairs begin with scaffolding. The contract period is February–September 2026.' } },
      { date: '27.2.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Katujulkisivun telineiden asennustyöt', sv: 'Ställningsmontering på gatufasaden', en: 'Street-facade scaffolding installation' },
        excerpt: { fi: 'Katujulkisivulle asennetaan telineet, jotka tehdään alikuljettaviksi, jotta kulku liiketiloihin ja porteille onnistuu.', sv: 'Ställningar monteras på gatufasaden och görs genomgångsbara så att passage till affärslokaler och portar fungerar.', en: 'Scaffolding is installed on the street facade and made walk-through so that access to shops and gates is maintained.' } },
      { date: '19.3.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - Yrjönkadun purkutyöt', sv: 'Lägesrapport - rivning på Yrjögatan', en: 'Status update - Yrjönkatu demolition' },
        excerpt: { fi: 'Yrjönkadun julkisivun purkutyöt ovat käynnissä ja työ etenee seuraaviin työvaiheisiin.', sv: 'Rivningen av Yrjögatans fasad pågår och arbetet framskrider till nästa skeden.', en: 'Demolition of the Yrjönkatu facade is under way and work is moving to the next phases.' } },
      { date: '20.3.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ikkunoiden avaamisen kielto', sv: 'Förbud mot att öppna fönster', en: 'Window opening prohibited' },
        excerpt: { fi: 'Ikkunoiden avaaminen on kielletty urakan ajan pölyn ja turvallisuuden vuoksi.', sv: 'Det är förbjudet att öppna fönstren under entreprenaden på grund av damm och säkerhet.', en: 'Opening windows is prohibited during the contract due to dust and safety.' } },
      { date: '26.3.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Yrjönkadun julkisivun purkutyöt', sv: 'Rivning av Yrjögatans fasad', en: 'Yrjönkatu facade demolition' },
        excerpt: { fi: 'Yrjönkadun julkisivun purkutyöt aloitetaan ylimmästä kerroksesta. Työ aiheuttaa melua ja pölyä.', sv: 'Rivningen av Yrjögatans fasad inleds från översta våningen. Arbetet orsakar buller och damm.', en: 'Demolition of the Yrjönkatu facade starts from the top floor. The work causes noise and dust.' } },
      { date: '4.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - Uudenmaankadun telineet', sv: 'Lägesrapport - ställningar på Nylandsgatan', en: 'Status update - Uudenmaankatu scaffolding' },
        excerpt: { fi: 'Yrjönkadun julkisivun purku jatkuu ja Uudenmaankadun puolelle aloitetaan telineiden asennus.', sv: 'Rivningen på Yrjögatan fortsätter och ställningsmontering inleds på Nylandsgatans sida.', en: 'Demolition on Yrjönkatu continues and scaffolding begins on the Uudenmaankatu side.' } },
      { date: '8.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Uudenmaankadun telineiden asennustyöt ovat käynnissä ja seuraavat työvaiheet käynnistyvät pian.', sv: 'Ställningsmonteringen på Nylandsgatan pågår och nästa arbetsskeden inleds snart.', en: 'Scaffolding on Uudenmaankatu is under way and the next phases will start soon.' } },
      { date: '16.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - paikkarappaukset', sv: 'Lägesrapport - lagningsputs', en: 'Status update - patch rendering' },
        excerpt: { fi: 'Yrjönkadun paikkarappauskohtien avaustyöt ovat käynnissä ja vauriokohdat kartoitetaan.', sv: 'Öppningen av lagningsputsställena på Yrjögatan pågår och skadeställena kartläggs.', en: 'Opening of the patch-render areas on Yrjönkatu is under way and damaged spots are surveyed.' } },
      { date: '22.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Uudenmaankadun julkisivun purkutyöt', sv: 'Rivning av Nylandsgatans fasad', en: 'Uudenmaankatu facade demolition' },
        excerpt: { fi: 'Uudenmaankadun julkisivun purkutyöt aloitetaan ylimmästä kerroksesta. Työ aiheuttaa melua ja pölyä.', sv: 'Rivningen av Nylandsgatans fasad inleds från översta våningen. Arbetet orsakar buller och damm.', en: 'Demolition of the Uudenmaankatu facade starts from the top floor. The work causes noise and dust.' } },
      { date: '2.5.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Uudenmaankadun julkisivun purkutyöt ovat valmiit ja työ siirtyy paikkarappausvaiheeseen.', sv: 'Rivningen av Nylandsgatans fasad är klar och arbetet övergår till lagningsputs.', en: 'Demolition of the Uudenmaankatu facade is complete and work moves to patch rendering.' } },
      { date: '6.5.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - paikkarappaukset', sv: 'Lägesrapport - lagningsputs', en: 'Status update - patch rendering' },
        excerpt: { fi: 'Uudenmaankadun paikkarappauskohtien avaustyöt ovat käynnissä ja rappaustöitä valmistellaan.', sv: 'Öppningen av lagningsputsställena på Nylandsgatan pågår och putsarbetena förbereds.', en: 'Opening of the patch-render areas on Uudenmaankatu is under way and rendering is being prepared.' } },
      { date: '24.5.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - ikkunapielet', sv: 'Lägesrapport - fönstersmygar', en: 'Status update - window reveals' },
        excerpt: { fi: 'Yrjönkadun ikkunapielien rappaustyöt ovat käynnissä ja julkisivun pinnat etenevät rappausvaiheeseen.', sv: 'Putsarbetena på Yrjögatans fönstersmygar pågår och fasadytorna går mot putsskedet.', en: 'Rendering of the Yrjönkatu window reveals is under way and the facade surfaces move to the rendering phase.' } },
      { date: '9.6.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vesikaton maalaustöiden aloitus', sv: 'Takmålningen inleds', en: 'Roof painting begins' },
        excerpt: { fi: 'Keskiviikkona 9.6.2026 aloitetaan vesikaton maalaustyöt. Työstä voi aiheutua hajua ja ajoittaista häiriötä.', sv: 'Onsdagen 9.6.2026 inleds takmålningen. Arbetet kan medföra lukt och tillfälliga störningar.', en: 'On Wednesday 9 June 2026 roof painting begins. The work may cause odour and occasional disturbance.' } },
      { date: '10.6.2026', image: 'kuvat/referenssit/uudenmaankatu39.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sisäpihan autopaikat pois käytöstä 10.–13.6.', sv: 'Gårdens parkering ur bruk 10–13.6.', en: 'Courtyard parking out of use 10–13 June' },
        excerpt: { fi: 'Sisäpihan autopaikat ovat pois käytöstä 10.–13.6.2026 työn ajan. Pyydämme siirtämään autot pois tältä ajalta.', sv: 'Gårdens parkeringsplatser är ur bruk 10–13.6.2026 under arbetet. Vänligen flytta bilarna under denna tid.', en: 'The courtyard parking spaces are out of use on 10–13 June 2026 during the work. Please move vehicles for this period.' } },
      { date: '16.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - ikkunapielet ja rappaus', sv: 'Lägesrapport - smygar och puts', en: 'Status update - reveals and rendering' },
        excerpt: { fi: 'Uudenmaankadun ikkunapielien työt ja julkisivun rappaustyöt ovat käynnissä aikataulun mukaisesti.', sv: 'Arbetena på Nylandsgatans fönstersmygar och fasadputsen pågår enligt tidtabell.', en: 'Work on the Uudenmaankatu window reveals and the facade rendering is under way on schedule.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - pintarappaus ja vesikaton maalaus', sv: 'Lägesrapport - ytputs och takmålning', en: 'Status update - surface render and roof painting' },
        excerpt: { fi: 'Käynnissä: Yrjönkadun julkisivun pintarappaustyöt, ikkunapeltien asennus ja vesikaton maalaustyöt. Seuraavaksi Yrjönkadun alimmaisen kerroslistan purku ja täyttörappaus sekä Uudenmaankadun koristeiden ja paikkarappausten työt.', sv: 'Pågår: ytputs på Georgsgatans fasad, montering av fönsterplåtar och takmålning. Härnäst rivning och fyllnadsputs av den nedersta våningslisten på Georgsgatan samt dekor- och lagningsputs på Nylandsgatan.', en: 'Under way: surface rendering of the Yrjönkatu facade, installation of window flashings and roof painting. Next: demolition and filler rendering of the lowest floor trim on Yrjönkatu, plus ornament and patch rendering on Uudenmaankatu.' } },
      { date: '14.7.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vesikaton maalaustyöt 22.–24.7. - autopaikat pois käytöstä', sv: 'Takmålning 22–24.7 - parkeringsplatserna ur bruk', en: 'Roof painting 22–24 July - parking out of use' },
        excerpt: { fi: 'Vesikaton maalaustyöt tehdään ke–pe 22.–24.7.2026 nosturilta, minkä vuoksi kaikki sisäpihan autopaikat ovat pois käytöstä näiden päivien ajan. Asukkailta tai osakkailta ei edellytetä toimenpiteitä työn aikana.', sv: 'Takmålningen utförs ons–fre 22–24.7.2026 från kran, och därför är alla parkeringsplatser på gården ur bruk under dessa dagar. Inga åtgärder krävs av de boende eller aktieägarna under arbetet.', en: 'Roof painting takes place Wed–Fri 22–24 July 2026 from a crane, so all courtyard parking spaces are out of use during those days. No action is required from residents or shareholders.' } },
      { date: '16.7.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - maalaustyöt alkamassa', sv: 'Lägesrapport - målningsarbetena inleds', en: 'Status update - painting about to start' },
        excerpt: { fi: 'Käynnissä: Yrjönkadun julkisivun pintarappaus, ikkunoiden valmistelu huoltomaalausta varten, telineiden siivous ja vesikaton maalaus. Seuraavaksi Yrjönkadun julkisivun maalaustyöt sekä Uudenmaankadun koristelistojen ja paikkarappauskohtien täyttörappaus.', sv: 'Pågår: ytputs på Georgsgatans fasad, förberedelser av fönstren för underhållsmålning, städning av ställningarna och takmålning. Härnäst målning av Georgsgatans fasad samt fyllnadsputs av dekorlister och lagningsställen på Nylandsgatan.', en: 'Under way: surface rendering of the Yrjönkatu facade, preparation of the windows for maintenance painting, scaffolding clean-up and roof painting. Next: painting of the Yrjönkatu facade plus filler rendering of the Uudenmaankatu ornament trims and patch areas.' } },
      { date: '20.8.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - julkisivujen ja vesikaton kunnostus', sv: 'Lägesrapport - renovering av fasader och yttertak', en: 'Status update - facade and roof renovation' },
        excerpt: { fi: 'Käynnissä ovat Yrjönkadun julkisivun maalaustyöt, Uudenmaankadun ikkunapeltien liitosten viimeistelyrappaukset, vesikaton maalaus sekä asuntoikkunoiden kunnostus ja parvekelaattojen korjaus. Seuraavaksi alkavat peltien maalaus, parvekkeiden kaiteiden asennus ja Yrjönkadun telineiden purku. Aikataulu päivitetty 20.8.2026.', sv: 'Pågående: målning av fasaden mot Yrjögatan, finputsning av fönsterplåtarnas anslutningar mot Nylandsgatan, målning av yttertaket samt renovering av lägenhetsfönstren och reparation av balkongplattorna. Härnäst: målning av plåtarna, montering av balkongräcken och rivning av ställningarna vid Yrjögatan. Tidtabellen uppdaterad 20.8.2026.', en: 'Underway: painting of the Yrjönkatu facade, finishing rendering of the window flashing joints on the Uudenmaankatu side, roof painting, plus renovation of flat windows and repair of balcony slabs. Next: painting of the sheet metal, installation of balcony railings and dismantling of the Yrjönkatu scaffolding. Schedule updated 20 August 2026.' } }
    ],
    turuntie68: [
      { date: '7.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus', sv: 'Entreprenaden inleds', en: 'Project start' },
        excerpt: { fi: 'Julkisivun kunnostustyöt alkavat telineiden asennuksella 7.4.2026. Telineet ovat alikuljettavia, joten pääsy liiketiloihin säilyy.', sv: 'Fasadrenoveringen inleds med ställningsmontering 7.4.2026. Ställningarna är genomgångsbara, så tillträdet till affärslokalerna bevaras.', en: 'Facade repairs begin with scaffolding on 7 April 2026. The scaffolding is walk-through, so access to the shops is maintained.' } },
      { date: '23.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Mannerheimintien julkisivun purkutyöt', sv: 'Rivning av fasaden mot Mannerheimvägen', en: 'Mannerheimintie facade demolition' },
        excerpt: { fi: 'Telineiden suojaustyöt ja Mannerheimintien julkisivun rappaus- ja purkutyöt käynnistyvät. Työ aiheuttaa melua ja pölyä.', sv: 'Skyddsarbetena på ställningarna och puts- och rivningsarbetena på Mannerheimvägens fasad inleds. Arbetet orsakar buller och damm.', en: 'Scaffolding covering and the rendering and demolition of the Mannerheimintie facade begin. The work causes noise and dust.' } },
      { date: '23.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Käynnissä ovat telineiden suojaustyöt ja Mannerheimintien julkisivun rappaustyöt. Seuraavat työvaiheet ovat alkamassa.', sv: 'Pågående: skyddsarbeten på ställningarna och putsarbeten på Mannerheimvägens fasad. Nästa skeden inleds snart.', en: 'Under way: scaffolding covering and rendering of the Mannerheimintie facade. The next phases are starting.' } },
      { date: '4.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ikkunoiden suojaus- ja eristystyöt', sv: 'Skydd och tätning av fönster', en: 'Window protection and sealing' },
        excerpt: { fi: 'Telineet on asennettu ja ikkunoiden suojaus- ja eristystyöt ovat käynnissä. Vanhat tilkkeet poistetaan ja ikkunakarmien pielirakenteet kunnostetaan.', sv: 'Ställningarna är monterade och skydds- och tätningsarbetena på fönstren pågår. Gamla drev avlägsnas och fönsterkarmarnas smygkonstruktioner renoveras.', en: 'Scaffolding is in place and window protection and sealing are under way. Old caulking is removed and the window-frame reveal structures are repaired.' } },
      { date: '10.6.2026', image: 'kuvat/referenssit/mannerheimintie94.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Julkisivujen alaosien purkutyöt 18.–20.6.', sv: 'Rivning av fasadernas nedre delar 18–20.6', en: 'Demolition of lower facades 18–20 June' },
        excerpt: { fi: 'Julkisivujen alaosien purkutyöt tehdään to 18.6. Mannerheimintien puolella ja pe 19.6. Nordenskiöldinkadun puolella. Telineiden alikulku on suljettu koko päivän – käytäthän sisäpihan sisäänkäyntiä. K-kaupan sisäänkäynnin purkutyöt tehdään la 20.6. klo 7–9.', sv: 'Rivningen av fasadernas nedre delar utförs tors 18.6 på Mannerheimvägens sida och fre 19.6 på Nordenskiöldsgatans sida. Passagen under ställningarna är stängd hela dagen – använd gårdens ingång. Rivningen vid K-butikens ingång görs lör 20.6 kl. 7–9.', en: 'Demolition of the lower facade sections takes place on Thu 18 June on the Mannerheimintie side and Fri 19 June on the Nordenskiöldinkatu side. The passage under the scaffolding is closed all day – please use the courtyard entrance. Demolition at the K-store entrance is done on Sat 20 June, 7–9 a.m.' } },
      { date: '16.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Korjaus - purkutyöt siirtyvät 24.–26.6.', sv: 'Rättelse - rivningen flyttas till 24–26.6', en: 'Correction - demolition moved to 24–26 June' },
        excerpt: { fi: 'Aiemmin tiedotetut julkisivujen alaosien purkutyöt siirtyvät. Työt tehdään ke 24.6. Mannerheimintien puolella sekä to–pe 25.–26.6. Nordenskiöldinkadun puolella. Telineiden alikulku on suljettu töiden ajan – käytäthän sisäpihan sisäänkäyntiä.', sv: 'De tidigare meddelade rivningsarbetena på fasadernas nedre delar flyttas. Arbetet utförs ons 24.6 på Mannerheimvägens sida och tors–fre 25–26.6 på Nordenskiöldsgatans sida. Passagen under ställningarna är stängd under arbetet – använd gårdens ingång.', en: 'The previously announced demolition of the lower facade sections has been rescheduled. The work is done on Wed 24 June on the Mannerheimintie side and Thu–Fri 25–26 June on the Nordenskiöldinkatu side. The passage under the scaffolding is closed during the work – please use the courtyard entrance.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - katutason pohjatyöt', sv: 'Lägesrapport - grundarbeten i gatuplan', en: 'Status update - street-level base work' },
        excerpt: { fi: 'Käynnissä: Nordenskiöldinkadun puoleisten ikkunakaulureiden rappaustyöt ja julkisivujen katutason pohjatyöt. Seuraavaksi alkavat julkisivujen katutasojen rappaustyöt.', sv: 'Pågår: putsning av fönsterkragarna på Nordenskiöldsgatans sida och grundarbeten i fasadernas gatuplan. Härnäst inleds putsarbetena i fasadernas gatuplan.', en: 'Under way: rendering of the window collars on the Nordenskiöldinkatu side and base work on the street-level facades. Next: rendering of the street-level facades.' } },
      { date: '14.7.2026', image: 'kuvat/referenssit/mannerheimintie94.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - maantasokerroksen rappaus ja pellitykset', sv: 'Lägesrapport - puts och plåtarbeten i bottenvåningen', en: 'Status update - ground-floor rendering and flashings' },
        excerpt: { fi: 'Käynnissä: molempien julkisivujen maantasokerroksen pohjarappaustyöt, K-kaupan edustan seinän vesipeltien asennus, Nordenskiöldinkadun ikkunakaulureiden rappaus sekä maantasokerrosten ikkunoiden pellitys- ja kaulureiden rappaustyöt. Seuraavaksi alkavat ikkunoiden huoltomaalaus, julkisivujen maalaus, räystäskourun maalaus ja betonisen ylälistan rappaus.', sv: 'Pågår: grundputs i bottenvåningen på båda fasaderna, montering av vattenplåtar på väggen framför K-butiken, putsning av fönsterkragarna på Nordenskiöldsgatan samt plåtarbeten och kragputs vid bottenvåningens fönster. Härnäst: underhållsmålning av fönstren, målning av fasaderna och takrännan samt putsning av den övre betonglisten.', en: 'Under way: base rendering at ground level on both facades, installation of flashings on the wall in front of the K-store, rendering of the Nordenskiöldinkatu window collars, and flashing and collar rendering at the ground-floor windows. Next: maintenance painting of windows, painting of the facades and gutter, and rendering of the upper concrete cornice.' } },
      { date: '29.7.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Autotallin käyttökatko 3.–24.8.', sv: 'Garaget ur bruk 3–24.8', en: 'Garage closed 3–24 Aug' },
        excerpt: { fi: 'Autotalli on poissa käytöstä 3.–24.8.2026 sisäänkäynnin rappaustöiden vuoksi. Tänä aikana autotalliin ei voi ajaa eikä sinne voi pysäköidä – varaathan ajoneuvolle vaihtoehtoisen pysäköintipaikan. Ilmoitamme heti, kun autotalli on jälleen käytettävissä.', sv: 'Garaget är ur bruk 3–24.8.2026 på grund av putsarbeten vid infarten. Under den tiden går det inte att köra in eller parkera i garaget – ordna en alternativ parkeringsplats för fordonet. Vi meddelar genast när garaget är tillgängligt igen.', en: 'The garage is out of use from 3 to 24 Aug 2026 due to rendering work at the entrance. During this time it is not possible to drive in or park there – please arrange alternative parking. We will announce as soon as the garage is available again.' } }
    ],
    carl: [
      { date: '30.1.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus', sv: 'Entreprenaden inleds', en: 'Project start' },
        excerpt: { fi: 'Julkisivujen ja parvekkeiden korjausrakennustyöt alkavat sisäpihan telineiden asennuksella.', sv: 'Renoveringen av fasader och balkonger inleds med ställningsmontering på gården.', en: 'Facade and balcony repairs begin with scaffolding in the courtyard.' } },
      { date: '3.2.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sisäpihan julkisivun purkutyöt', sv: 'Rivning av gårdsfasaden', en: 'Courtyard facade demolition' },
        excerpt: { fi: 'Sisäpihan julkisivun purkutyöt kestävät noin kolme viikkoa ja aiheuttavat kovaa melua.', sv: 'Rivningen av gårdsfasaden tar cirka tre veckor och orsakar kraftigt buller.', en: 'Demolition of the courtyard facade takes about three weeks and causes loud noise.' } },
      { date: '23.3.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - telineet asennettu', sv: 'Lägesrapport - ställningar monterade', en: 'Status update - scaffolding installed' },
        excerpt: { fi: 'Rakennustelineet on asennettu pihan puolelle sekä päätyyn Humalistonkadun puolelle, ja työ etenee.', sv: 'Ställningarna är monterade på gårdssidan och på gaveln mot Humalistogatan, och arbetet framskrider.', en: 'Scaffolding is installed on the courtyard side and the gable toward Humalistonkatu, and work is progressing.' } },
      { date: '30.3.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - parvekkeet ja ikkunat', sv: 'Lägesrapport - balkonger och fönster', en: 'Status update - balconies and windows' },
        excerpt: { fi: 'Ikkunoiden vanhat eristeet on uusittu, ja pihan ja Humalistonkadun parvekelattioiden ja -kaiteiden hionta- ja maalaustyöt ovat käynnissä.', sv: 'Fönstrens gamla isoleringar är förnyade, och slipningen och målningen av balkonggolv och -räcken på gården och mot Humalistogatan pågår.', en: 'The windows’ old seals have been renewed, and sanding and painting of balcony floors and railings on the courtyard and Humalistonkatu sides is under way.' } },
      { date: '31.3.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Katujulkisivun purkutyöt', sv: 'Rivning av gatufasaden', en: 'Street facade demolition' },
        excerpt: { fi: 'Katujulkisivun purkutyöt alkavat ja kestävät noin kolme viikkoa. Työ aiheuttaa kovaa melua ja pölyä.', sv: 'Rivningen av gatufasaden inleds och tar cirka tre veckor. Arbetet orsakar kraftigt buller och damm.', en: 'Demolition of the street facade begins and lasts about three weeks. The work causes loud noise and dust.' } },
      { date: '8.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - Humalistonkatu valmis', sv: 'Lägesrapport - Humalistogatan klar', en: 'Status update - Humalistonkatu done' },
        excerpt: { fi: 'Humalistonkadun julkisivun purkutyöt ovat valmiit, ja työ siirtyy seuraaviin julkisivuihin.', sv: 'Rivningen av Humalistogatans fasad är klar och arbetet övergår till nästa fasader.', en: 'Demolition of the Humalistonkatu facade is complete and work moves to the next facades.' } },
      { date: '15.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - Topeliuksenkatu', sv: 'Lägesrapport - Topeliusgatan', en: 'Status update - Topeliuksenkatu' },
        excerpt: { fi: 'Topeliuksenkadun puolelta julkisivun rappaus on poistettu ja pinnat valmistellaan uudelleenrappausta varten.', sv: 'På Topeliusgatans sida har fasadputsen avlägsnats och ytorna förbereds för omputsning.', en: 'On the Topeliuksenkatu side the facade rendering has been removed and the surfaces are being prepared for re-rendering.' } },
      { date: '12.5.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - erkkerit', sv: 'Lägesrapport - burspråk', en: 'Status update - bay windows' },
        excerpt: { fi: 'Erkkereiden täyttörappaustyöt ovat käynnissä ja julkisivun rappaus etenee.', sv: 'Fyllnadsputsen på burspråken pågår och fasadputsen framskrider.', en: 'Filler rendering of the bay windows is under way and the facade rendering is progressing.' } },
      { date: '25.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'IV-kierros ja asuntokäynnit', sv: 'Ventilationsrunda och bostadsbesök', en: 'Ventilation round and apartment visits' },
        excerpt: { fi: 'Asunnoissa tehdään ilmanvaihdon tarkastuskierros. Käynneistä ja yleisavaimen käytöstä tiedotetaan erikseen.', sv: 'En ventilationskontroll görs i bostäderna. Besöken och användningen av huvudnyckel meddelas separat.', en: 'A ventilation inspection is carried out in the apartments. Visits and master-key use are announced separately.' } },
      { date: '3.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - täyttörappaukset', sv: 'Lägesrapport - fyllnadsputs', en: 'Status update - filler rendering' },
        excerpt: { fi: 'Topeliuksenkadun ja Humalistonkadun julkisivujen täyttörappaustyöt ovat käynnissä aikataulun mukaisesti.', sv: 'Fyllnadsputsen på Topeliusgatans och Humalistogatans fasader pågår enligt tidtabell.', en: 'Filler rendering of the Topeliuksenkatu and Humalistonkatu facades is under way on schedule.' } },
      { date: '4.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ilmalämpöpumppujen läpivientien poraukset', sv: 'Borrning av genomföringar för värmepumpar', en: 'Drilling of heat-pump penetrations' },
        excerpt: { fi: 'Ilmalämpöpumppujen läpivientien poraukset alkavat tiistaina 9.6. klo 9 asunnosta A12 ja jatkuvat asunnoittain.', sv: 'Borrningen av genomföringar för luftvärmepumpar börjar tisdag 9.6 kl. 9 från lägenhet A12 och fortsätter lägenhetsvis.', en: 'Drilling of heat-pump penetrations starts on Tuesday 9 June at 9 a.m. from apartment A12 and continues apartment by apartment.' } },
      { date: '11.6.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Läpivientien poraukset tehty - tulppaus alkaa', sv: 'Genomföringarna borrade - tätning inleds', en: 'Penetrations drilled - sealing begins' },
        excerpt: { fi: 'Läpivientien poraukset on tehty. Ensi viikon alussa aloitetaan läpivientien tulppaus.', sv: 'Genomföringarna är borrade. I början av nästa vecka inleds tätningen av genomföringarna.', en: 'The penetrations have been drilled. Sealing of the penetrations begins early next week.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - betonikorjaukset ja pohjarappaus', sv: 'Lägesrapport - betongreparation och grundputs', en: 'Status update - concrete repairs and base rendering' },
        excerpt: { fi: 'Käynnissä: parvekkeiden ja kerroslistan betonikorjaustyöt, Topeliuksenkadun pohjarappaus ja vesipeltien asennus. Seuraavaksi alkavat julkisivujen pintarappaustyöt.', sv: 'Pågår: betongreparationer på balkongerna och våningslisten, grundputs på Topeliusgatan och montering av vattenplåtar. Härnäst inleds ytputsen på fasaderna.', en: 'Under way: concrete repairs to the balconies and floor trim, base rendering on Topeliuksenkatu and installation of flashings. Next: surface rendering of the facades.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Liiketilaikkunoiden mittauskierros 2.7.', sv: 'Mätning av affärslokalernas fönster 2.7.', en: 'Commercial premises window measurements 2 July' },
        excerpt: { fi: 'Kaikissa liiketiloissa tehdään ikkunoiden mittakierros to 2.7.2026 klo 9 alkaen tulevia uusimistöitä varten. Käynti kestää noin 5 minuuttia; liiketiloihin saavutaan tarvittaessa yleisavaimella, joten turvalukot ja varmuusketjut on jätettävä auki.', sv: 'En fönstermätning görs i alla affärslokaler tors 2.7.2026 från kl. 9 inför den kommande förnyelsen. Besöket tar cirka 5 minuter; lokalerna nås vid behov med huvudnyckel, så säkerhetslås och kedjor ska lämnas öppna.', en: 'A window measurement round is carried out in all commercial premises on Thu 2 July 2026 from 9 a.m. ahead of the upcoming replacement. The visit takes about 5 minutes; premises are entered with a master key if needed, so safety locks and chains must be left open.' } },
      { date: '7.7.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Naapuripihan seinäpinnan korjaustyöt 13.–18.7.', sv: 'Reparation av väggytan mot grannens gård 13–18.7', en: 'Wall repairs on the neighbouring yard 13–18 July' },
        excerpt: { fi: 'Naapuripihan puoleisen seinäpinnan purku-, pesu- ja rappaustyöt tehdään 13.–18.7.2026. Työ aiheuttaa melua ja pölyä työalueen läheisyydessä.', sv: 'Rivning, tvätt och putsning av väggytan mot grannens gård utförs 13–18.7.2026. Arbetet orsakar buller och damm i närheten av arbetsområdet.', en: 'Demolition, washing and rendering of the wall surface facing the neighbouring yard take place 13–18 July 2026. The work causes noise and dust near the work area.' } },
      { date: '27.7.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - pihajulkisivun viimeistely', sv: 'Lägesrapport - gårdsfasaden slutförs', en: 'Status update - courtyard facade finishing' },
        excerpt: { fi: 'Pihajulkisivun pintarappaus valmistuu viikolla 31, jonka jälkeen alkavat julkisivun pesu- ja puhdistustyöt. Ikkunoiden muovit poistetaan heinä-elokuun vaihteessa ja telineiden purku on suunniteltu elokuun loppupuolelle. Käynnissä: parvekkeiden ja kerroslistan betonikorjaukset katujulkisivulla sekä Topeliuksenkadun pohjarappaus.', sv: 'Ytputsen på gårdsfasaden blir klar under vecka 31, varefter tvätt- och rengöringsarbetena inleds. Plasten på fönstren avlägsnas vid månadsskiftet juli–augusti och ställningarna rivs enligt planen i slutet av augusti. Pågår: betongreparationer på balkonger och våningslist mot gatan samt grundputs på Topeliusgatan.', en: 'Surface rendering of the courtyard facade completes in week 31, after which facade washing and cleaning begin. Window plastic is removed at the turn of July and August, and scaffolding removal is planned for late August. Under way: concrete repairs to the balconies and floor trim on the street facade, plus base rendering on Topeliuksenkatu.' } }
    ],
    bangatan: [
      { date: '3.3.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus', sv: 'Entreprenaden inleds', en: 'Project start' },
        excerpt: { fi: 'Kahden sisäpihan julkisivujen, porttikäytävien, parvekkeiden ja ikkunoiden uusimis- ja kunnostustyöt alkavat viikolla 11 telineiden pystytyksellä.', sv: 'Renoveringen av två gårdars fasader, portgångar, balkonger och fönster inleds vecka 11 med ställningsmontering.', en: 'Renewal and repair of two courtyards’ facades, gateways, balconies and windows begins in week 11 with scaffolding.' } },
      { date: '23.3.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Telineet on asennettu ja sisäpihojen julkisivutyöt etenevät suunnitellusti.', sv: 'Ställningarna är monterade och fasadarbetena på gårdarna framskrider planenligt.', en: 'Scaffolding is installed and the courtyard facade work is progressing as planned.' } },
      { date: '30.3.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sisäpiha 1 - julkisivun purkutyöt', sv: 'Gård 1 - rivning av fasaden', en: 'Courtyard 1 - facade demolition' },
        excerpt: { fi: 'Sisäpiha 1:n julkisivun purkutyöt aloitetaan. Työ aiheuttaa melua ja pölyä.', sv: 'Rivningen av gård 1:s fasad inleds. Arbetet orsakar buller och damm.', en: 'Demolition of courtyard 1’s facade begins. The work causes noise and dust.' } },
      { date: '8.4.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - sisäpiha 1', sv: 'Lägesrapport - gård 1', en: 'Status update - courtyard 1' },
        excerpt: { fi: 'Sisäpiha 1:n julkisivurappaus on kokonaan poistettu ja seinien pesutyöt on suoritettu.', sv: 'Gård 1:s fasadputs är helt avlägsnad och väggtvätten är utförd.', en: 'Courtyard 1’s facade rendering has been fully removed and the walls have been washed.' } },
      { date: '15.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Sisäpiha 1:n pinnat valmistellaan uudelleenrappausta varten ja työ etenee seuraavaan pihaan.', sv: 'Gård 1:s ytor förbereds för omputsning och arbetet går vidare till nästa gård.', en: 'Courtyard 1’s surfaces are prepared for re-rendering and work moves to the next courtyard.' } },
      { date: '12.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ullakkokomeroiden omistajatiedot', sv: 'Uppgifter om vindsförrådens ägare', en: 'Attic storage owner information' },
        excerpt: { fi: 'Pyydämme pikaisesti tietoja ullakkokomeroiden omistajista töiden suunnittelua varten.', sv: 'Vi ber snarast om uppgifter om vindsförrådens ägare för planeringen av arbetet.', en: 'We kindly request information on the attic storages’ owners promptly to plan the work.' } },
      { date: '22.5.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Parvekeovien mittauskierros', sv: 'Mätning av balkongdörrar', en: 'Balcony door measurements' },
        excerpt: { fi: 'Asunnoissa tehdään parvekeovien mittauskierros uusien ovien valmistusta varten.', sv: 'En mätning av balkongdörrarna görs i bostäderna för tillverkningen av nya dörrar.', en: 'Balcony doors are measured in the apartments to manufacture the new doors.' } },
      { date: '3.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - rappaustyöt', sv: 'Lägesrapport - putsarbeten', en: 'Status update - rendering' },
        excerpt: { fi: 'Sisäpihojen julkisivujen rappaustyöt ovat käynnissä ja parveketyöt etenevät.', sv: 'Putsarbetena på gårdsfasaderna pågår och balkongarbetena framskrider.', en: 'Rendering of the courtyard facades is under way and balcony work is progressing.' } },
      { date: '16.6.2026', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        excerpt: { fi: 'Julkisivujen pintarappaus ja parvekkeiden sekä ikkunoiden työt etenevät aikataulun mukaisesti.', sv: 'Fasadernas ytputs samt balkong- och fönsterarbetena framskrider enligt tidtabell.', en: 'The facade finish rendering and the balcony and window work are progressing on schedule.' } },
      { date: '30.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - aikataulu päivitetty 30.6.', sv: 'Lägesrapport - tidtabellen uppdaterad 30.6.', en: 'Status update - schedule updated 30 Jun' },
        excerpt: { fi: 'Sisäpiha 1:n ylälistan rappaus on valmistumassa ja pohjia valmistellaan pintarappausta varten. Sisäpiha 2:n täyttörappauksesta on tehty 75 %, ja naapurin puoleisen päätyjulkisivun maalaustyöt ovat käynnissä. Seuraavaksi alkavat sisäpiha 1:n pintarappaus- ja ikkunoiden kunnostustyöt.', sv: 'Putsen på överlisten på gård 1 är snart klar och underlagen förbereds för ytputs. På gård 2 är fyllnadsputsen 75 % färdig, och målningen av gavelfasaden mot grannen pågår. Härnäst inleds ytputs och fönsterrenovering på gård 1.', en: 'Rendering of the upper trim in courtyard 1 is nearing completion and the substrates are being prepared for surface rendering. Filler rendering in courtyard 2 is 75% complete, and painting of the gable facade facing the neighbour is under way. Next: surface rendering and window restoration in courtyard 1.' } },
      { date: '9.7.2026', image: 'kuvat/sivut/koydenpunojankatu7.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Liiketilojen IV-kierros 14.7.', sv: 'IV-kartläggning i affärslokalerna 14.7.', en: 'Ventilation survey in commercial premises 14 July' },
        excerpt: { fi: 'Kaikissa liiketiloissa tehdään ilmanvaihdon tarkastuskierros ti 14.7.2026 klo 9 alkaen, jolloin kartoitetaan julkisivun tuloilmaventtiilien kunto ja tyyppi. Käynti kestää noin 15 minuuttia; liiketiloihin saavutaan yleisavaimella, joten turvalukot on jätettävä auki.', sv: 'En IV-inspektion görs i alla affärslokaler tis 14.7.2026 från kl. 9, då tilluftsventilernas skick och typ i fasaden kartläggs. Besöket tar cirka 15 minuter; lokalerna nås med huvudnyckel, så säkerhetslåsen ska lämnas öppna.', en: 'A ventilation inspection is carried out in all commercial premises on Tue 14 July 2026 from 9 a.m., surveying the condition and type of the facade supply-air valves. The visit takes about 15 minutes; premises are entered with a master key, so safety locks must be left open.' } },
      { date: '30.6.2026', image: 'kuvat/referenssit/ratakatu1113.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - Ratakatu 11 ja 13', sv: 'Lägesrapport - Bangatan 11 och 13', en: 'Status update - Ratakatu 11 and 13' },
        excerpt: { fi: 'Ratakatu 11: parvekepohjat on puhallettu ja pesty, tasoitustyöt käynnissä. Pintarappaukset, ylälista ja telineputsaus ovat valmiit, ja maalaustyöt alkavat torstaina. Ratakatu 13: ylälistan rappaustyöt valmistuvat tällä viikolla ja pintarappaus alkaa ensi viikolla.', sv: 'Bangatan 11: balkongbottnarna är blästrade och tvättade, spacklingsarbeten pågår. Ytputsen, övre listen och rengöringen av ställningarna är klara, och målningen inleds på torsdag. Bangatan 13: putsningen av övre listen blir klar denna vecka och ytputsen inleds nästa vecka.', en: 'Ratakatu 11: balcony bases have been blasted and washed, levelling work underway. Surface rendering, upper cornice and scaffold cleaning are complete, and painting starts on Thursday. Ratakatu 13: rendering of the upper cornice finishes this week and surface rendering starts next week.' } }
    ],
    ortodoksinen: [
      { date: '19.8.2025', image: 'kuvat/referenssit/unioninkatu39.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Töiden aloitus', sv: 'Arbetet inleds', en: 'Work begins' },
        excerpt: { fi: 'Sisäpihan ja porttikongin rappausten, parvekkeiden ja kattojen uusiminen sekä ikkunoiden kunnostus alkavat telineiden pystytyksellä sisäpihalle ja katolle.', sv: 'Förnyelsen av gårdens och portvalvets puts, balkonger och tak samt fönsterrenoveringen inleds med ställningar på gården och taket.', en: 'Renewal of the courtyard and gateway rendering, balconies and roofs, and window repairs begin with scaffolding in the courtyard and on the roof.' } },
      { date: '26.9.2025', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Katujulkisivun telineiden asennustyöt', sv: 'Ställningsmontering på gatufasaden', en: 'Street-facade scaffolding installation' },
        excerpt: { fi: 'Katujulkisivulle asennetaan telineet, jotka tehdään alikuljettaviksi. Liikenne- ja kulkujärjestelyistä tiedotetaan erikseen.', sv: 'Ställningar monteras på gatufasaden och görs genomgångsbara. Trafik- och passagearrangemang meddelas separat.', en: 'Scaffolding is installed on the street facade and made walk-through. Traffic and access arrangements are announced separately.' } },
      { date: '1.10.2025', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vaihe 1 - sisäpihan suojaus- ja purkutyöt', sv: 'Skede 1 - skydd och rivning på gården', en: 'Phase 1 - courtyard protection and demolition' },
        excerpt: { fi: 'Vaihe 1:n sisäpihan suojaus- ja purkutyöt alkavat. Pyydämme tyhjentämään sisäpihan parvekkeet tavaroista.', sv: 'Skede 1:s skydds- och rivningsarbeten på gården inleds. Vänligen töm gårdsbalkongerna på föremål.', en: 'Phase 1 courtyard protection and demolition begin. Please clear the courtyard balconies of items.' } },
      { date: '14.10.2025', image: 'kuvat/referenssit/unioninkatu39.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sääsuojan nostotyöt 20.–21.10.', sv: 'Lyft av väderskydd 20–21.10.', en: 'Weather-cover lifting 20–21 Oct' },
        excerpt: { fi: 'Sääsuoja nostetaan katolle 20.–21.10.2025 klo 18–06. Yöaikainen toteutus aiheuttaa vähiten haittaa liikenteelle, mutta työstä syntyy melua.', sv: 'Väderskyddet lyfts på taket 20–21.10.2025 kl. 18–06. Nattetid stör trafiken minst, men arbetet orsakar buller.', en: 'The weather cover is lifted onto the roof on 20–21 Oct 2025 at 6 p.m.–6 a.m. Night work least disturbs traffic but causes noise.' } },
      { date: '5.11.2025', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vaihe 1 - vesikaton purkutyöt', sv: 'Skede 1 - takrivning', en: 'Phase 1 - roof demolition' },
        excerpt: { fi: 'Vaihe 1:n vesikaton purkutyöt käynnistyvät. Töiden yhteydessä uusitaan myös katon rakenteita.', sv: 'Skede 1:s takrivning inleds. I samband med arbetet förnyas även takets konstruktioner.', en: 'Phase 1 roof demolition begins. The roof structures are also renewed as part of the work.' } },
      { date: '24.11.2025', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Rappukäytävien parvekeovien ja ikkunoiden kunnostus', sv: 'Renovering av trapphusens balkongdörrar och fönster', en: 'Stairwell balcony doors and windows repair' },
        excerpt: { fi: 'Rappukäytävien parvekeovien ja ikkunoiden kunnostustyöt aloitetaan 26.11.2025.', sv: 'Renoveringen av trapphusens balkongdörrar och fönster inleds 26.11.2025.', en: 'Repair of the stairwell balcony doors and windows begins on 26 Nov 2025.' } },
      { date: '3.12.2025', image: 'kuvat/sivut/ratakatu21-parvekkeet.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vaihe 1 - parvekkeiden purkutyöt', sv: 'Skede 1 - rivning av balkonger', en: 'Phase 1 - balcony demolition' },
        excerpt: { fi: 'Parvekkeiden purkutyöt alkavat 3.12.2025 ja kestävät noin viikon. Purkutyöt aiheuttavat kovaa melua.', sv: 'Rivningen av balkongerna inleds 3.12.2025 och tar cirka en vecka. Arbetet orsakar kraftigt buller.', en: 'Balcony demolition begins on 3 Dec 2025 and takes about a week. The work causes loud noise.' } },
      { date: '27.1.2026', image: 'kuvat/referenssit/unioninkatu39.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Ullakon sähkötyöt 29.1.', sv: 'Elarbeten på vinden 29.1.', en: 'Attic electrical work 29 Jan' },
        excerpt: { fi: 'Ullakkotiloissa tehdään sähkötöitä torstaina 29.1.2026. Pyydämme avaamaan ullakkokopit kyseisenä päivänä.', sv: 'Elarbeten utförs på vinden torsdag 29.1.2026. Vi ber er öppna vindsförråden den dagen.', en: 'Electrical work is carried out in the attic on Thursday 29 Jan 2026. Please open the attic storages that day.' } },
      { date: '27.1.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - vesikatto', sv: 'Lägesrapport - taket', en: 'Status update - roof' },
        excerpt: { fi: 'Vesikaton purkutyöt on suoritettu ja katon pohjatyöt ovat valmiit. Työ etenee uuden katteen asennukseen.', sv: 'Takrivningen är utförd och takets grundarbeten är klara. Arbetet går vidare till montering av det nya taket.', en: 'Roof demolition is done and the roof base work is complete. Work proceeds to installing the new covering.' } },
      { date: '12.3.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - vesikatto valmis', sv: 'Lägesrapport - taket klart', en: 'Status update - roof complete' },
        excerpt: { fi: 'Vesikaton uusimistyöt ovat valmiit ja kattoturvatuotteiden asennustyöt ovat käynnissä.', sv: 'Takförnyelsen är klar och monteringen av taksäkerhetsprodukter pågår.', en: 'Roof renewal is complete and installation of roof-safety products is under way.' } },
      { date: '2.4.2026', image: 'kuvat/referenssit/unioninkatu39.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Sääsuojan nostotyöt 1.–2.4.', sv: 'Lyft av väderskydd 1–2.4.', en: 'Weather-cover lifting 1–2 Apr' },
        excerpt: { fi: 'Sääsuojan nostotyöt tehdään 1.–2.4.2026 klo 18–05 ilta- ja yöaikaan pääkadun vilkkaan liikenteen vuoksi. Työstä syntyy melua.', sv: 'Lyftet av väderskyddet görs 1–2.4.2026 kl. 18–05 kvälls- och nattetid på grund av huvudgatans livliga trafik. Arbetet orsakar buller.', en: 'The weather cover is lifted on 1–2 Apr 2026 at 6 p.m.–5 a.m. in the evening and night due to the busy main street. The work causes noise.' } },
      { date: '17.4.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - vaihe 3 rappaus', sv: 'Lägesrapport - skede 3 puts', en: 'Status update - phase 3 rendering' },
        excerpt: { fi: 'Vaihe 3:n julkisivujen rappaustyöt ovat käynnissä ja parveke- sekä ikkunatyöt etenevät.', sv: 'Skede 3:s fasadputsarbeten pågår och balkong- samt fönsterarbetena framskrider.', en: 'Phase 3 facade rendering is under way and balcony and window work is progressing.' } },
      { date: '8.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vaihe 3 - A-rappukäytävän ikkunoiden kunnostus', sv: 'Skede 3 - fönster i trapphus A', en: 'Phase 3 - stairwell A windows' },
        excerpt: { fi: 'Vaihe 3:n A-rappukäytävän ikkunoiden kunnostustyöt aloitettiin 8.5.2026.', sv: 'Renoveringen av fönstren i trapphus A (skede 3) inleddes 8.5.2026.', en: 'Phase 3 repair of the stairwell A windows started on 8 May 2026.' } },
      { date: '8.5.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - sisäpihan rappaus', sv: 'Lägesrapport - gårdsputs', en: 'Status update - courtyard rendering' },
        excerpt: { fi: 'Sisäpihan pohjarappaustyöt ovat valmiit ja viikolla 20 aloitetaan pintarappaus.', sv: 'Gårdens grundputs är klar och vecka 20 inleds ytputsen.', en: 'The courtyard base rendering is complete and the finish rendering begins in week 20.' } },
      { date: '19.5.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vaihe 3 - asuntojen ikkunoiden irrotus ja kunnostus', sv: 'Skede 3 - bostädernas fönster', en: 'Phase 3 - apartment window removal and repair' },
        excerpt: { fi: 'Tiistaina 19.5.2026 klo 8–16 poistetaan vaihe 3:n asuntojen ikkunoita kunnostettavaksi. Varmistathan, että ikkunan edessä on n. 1,5 m vapaata tilaa.', sv: 'Tisdag 19.5.2026 kl. 8–16 tas skede 3:s bostadsfönster bort för renovering. Se till att det finns ca 1,5 m fritt utrymme framför fönstret.', en: 'On Tuesday 19 May 2026 from 8 a.m. to 4 p.m., phase 3 apartment windows are removed for repair. Please leave about 1.5 m of free space in front of the window.' } },
      { date: '2.6.2026', image: 'kuvat/sivut/huvilankatu27-julkisivu.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - maalaustyöt', sv: 'Lägesrapport - målningsarbeten', en: 'Status update - painting' },
        excerpt: { fi: 'Vaihe 1:n julkisivun maalaustyöt ovat käynnissä ja muiden vaiheiden rappaus- ja ikkunatyöt etenevät.', sv: 'Skede 1:s fasadmålning pågår och övriga skedens puts- och fönsterarbeten framskrider.', en: 'Phase 1 facade painting is under way and the rendering and window work of the other phases is progressing.' } },
      { date: '16.6.2026', image: 'kuvat/referenssit/unioninkatu39.jpg',
        category: { fi: 'Tilannetiedote', sv: 'Lägesrapport', en: 'Status update' },
        title: { fi: 'Tilannetiedote - maalaustyöt ja telineiden purku', sv: 'Lägesrapport - målning och ställningsrivning', en: 'Status update - painting and scaffold removal' },
        excerpt: { fi: 'Vaiheiden 2 ja 3 julkisivujen maalaustyöt ovat valmiit ja vaiheen 1 maalaus on käynnissä. Ikkunoiden maalaustyöt etenevät. Seuraavaksi vaiheen 1 vesipeltien ja parvekkeiden maalaus sekä telineiden ja sääsuojan purkutyöt kaikissa vaiheissa.', sv: 'Målningen av fasaderna i etapp 2 och 3 är klar och etapp 1:s målning pågår. Fönstermålningen framskrider. Härnäst målning av vattenplåtar och balkonger i etapp 1 samt rivning av ställningar och väderskydd i alla etapper.', en: 'Facade painting in phases 2 and 3 is complete and phase 1 painting is under way. Window painting is progressing. Next: painting of the phase 1 flashings and balconies, plus removal of scaffolding and weather protection across all phases.' } },
      { date: '25.6.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Meddelande', en: 'Resident notice' },
        title: { fi: 'Vaihe 3 - ikkunapuitteiden takaisinasennus 29.–30.6.', sv: 'Etapp 3 - fönsterbågarna återmonteras 29–30.6', en: 'Phase 3 - window sashes reinstalled 29–30 June' },
        excerpt: { fi: 'Vaiheen 3 A-rappukäytävän asunnoissa asennetaan kunnostetut ikkunapuitteet takaisin ma–ti 29.–30.6.2026. Jätäthän turvalukot auki, sillä asuntoihin tullaan yleisavaimella, ja varmista että ikkunan edessä on noin 1,5 m vapaata työtilaa.', sv: 'I bostäderna i trapphus A i etapp 3 återmonteras de renoverade fönsterbågarna mån–tis 29–30.6.2026. Lämna säkerhetslåsen öppna, eftersom bostäderna nås med huvudnyckel, och se till att det finns cirka 1,5 m fritt arbetsutrymme framför fönstret.', en: 'In the phase 3 stairwell A apartments, the restored window sashes are reinstalled on Mon–Tue 29–30 June 2026. Please leave safety locks open, as apartments are entered with a master key, and ensure about 1.5 m of clear working space in front of the window.' } }
    ],
    centrum: [
      { date: '9.7.2026', image: 'kuvat/referenssit/kasarmikatu28.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Rappukäytävien parvekeovien ja -ikkunoiden kunnostus alkaa 9.7.', sv: 'Renovering av trapphusens balkongdörrar och -fönster börjar 9.7.', en: 'Renovation of stairwell balcony doors and windows starts 9 July' },
        excerpt: { fi: 'To 9.7. alkavat rappukäytävien parvekeovien ja -ikkunoiden kunnostustyöt, aloitus D-rapusta. Kokonaiskesto n. 3 kk. Tuuletusparvekkeiden käyttö on urakan aikana kielletty, eikä asukkailta edellytetä toimenpiteitä.', sv: 'To 9.7 inleds renoveringen av trapphusens balkongdörrar och -fönster, med start i trapphus D. Total längd ca 3 mån. Vädringsbalkongerna får inte användas under entreprenaden och inga åtgärder krävs av de boende.', en: 'On Thu 9 July the renovation of the stairwells’ balcony doors and windows begins, starting from stairwell D. Total duration approx. 3 months. Ventilation balconies may not be used during the works and no action is required from residents.' } }
    ],
    soma: [
      { date: '28.7.2026', image: 'kuvat/referenssit/merituuli.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus - ikkunat ja katujulkisivut', sv: 'Entreprenaden inleds - fönster och gatufasader', en: 'Project start - windows and street facades' },
        excerpt: { fi: 'Ikkunoiden uusiminen sekä katujulkisivujen rapattujen osien uusimis-, kunnostus- ja pintakäsittelytyöt ajoittuvat elokuusta marraskuuhun 2026. Ikkunat vaihdetaan asuntojen sisältä käsin, ja porrashuoneiden, sisäpihan ulko-ovien sekä saunarakennuksen ikkunat ja ovet kunnostetaan.', sv: 'Fönsterbytet samt förnyelse, renovering och ytbehandling av gatufasadernas putsade delar pågår från augusti till november 2026. Fönstren byts inifrån bostäderna, och trapphusens, gårdens ytterdörrars samt bastubyggnadens fönster och dörrar renoveras.', en: 'Window replacement and the renewal, repair and surface treatment of the rendered sections of the street facades run from August to November 2026. Windows are replaced from inside the apartments, and the stairwell, courtyard entrance and sauna building windows and doors are restored.' } },
      { date: '28.7.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Mittauskierros', sv: 'Mätningsrunda', en: 'Measurement round' },
        title: { fi: 'Ikkunoiden mittatarkastuskierros 5.8.', sv: 'Måttkontroll av fönster 5.8.', en: 'Window measurement check 5 Aug' },
        excerpt: { fi: 'Asunnoissa tehdään ikkunoiden mittatarkastuskierros ke 5.8.2026 klo 8 alkaen. Kierros aloitetaan B-rapusta ylimmästä kerroksesta alaspäin ja kaikki raput käydään läpi. Käynti kestää noin 5 minuuttia asuntoa kohden – jätäthän turvalukot auki, sillä asuntoihin tullaan yleisavaimella.', sv: 'En måttkontroll av fönstren görs i bostäderna ons 5.8.2026 från kl. 8. Rundan börjar i trapphus B uppifrån och ned och alla trapphus gås igenom. Besöket tar cirka 5 minuter per bostad – lämna säkerhetslåsen öppna, eftersom bostäderna nås med huvudnyckel.', en: 'A window measurement check is carried out in the apartments on Wed 5 Aug 2026 from 8 a.m. The round starts in stairwell B from the top floor down and covers every stairwell. The visit takes about 5 minutes per apartment – please leave safety locks open, as apartments are entered with a master key.' } },
      { date: '22.8.2026', image: 'kuvat/referenssit/merituuli.jpg',
        category: { fi: 'Asukastiedote', sv: 'Boendeinfo', en: 'Resident notice' },
        title: { fi: 'Aikataulun päivitys - ikkuna-asennukset', sv: 'Tidtabellsuppdatering - fönstermontage', en: 'Schedule update - window installation' },
        excerpt: { fi: 'Urakoitsija on päivittänyt ikkuna-asennusten aikataulun.', sv: 'Entreprenören har uppdaterat tidtabellen för fönstermontaget.', en: 'The contractor has updated the schedule for the window installation.' } },
      { date: '18.8.2026', image: 'kuvat/sivut/ikkunat.jpg',
        category: { fi: 'Asukastiedote', sv: 'Boendeinfo', en: 'Resident notice' },
        title: { fi: 'Ikkunakaulureiden purkutyöt alkavat viikolla 35', sv: 'Rivningen av fönsterkragarna inleds vecka 35', en: 'Demolition of window collars starts in week 35' },
        excerpt: { fi: 'Katujulkisivun ikkunakaulureiden purkutyöt alkavat viikolla 35 ja kestävät arviolta viikon. Ikkunat suojataan ulkopuolelta muovilla ja kennolevyllä. Rappukäytäviin jaetaan teippiä vapaaehtoista sisäpuolista suojausta varten.', sv: 'Rivningen av fönsterkragarna på gatufasaden inleds vecka 35 och tar uppskattningsvis en vecka. Fönstren skyddas utifrån med plast och kanalplast. Tejp delas ut i trapphusen för frivillig tejpning på insidan.', en: 'Demolition of the window collars on the street facade starts in week 35 and takes about one week. The windows are protected from the outside with plastic and twin-wall sheeting. Tape is handed out in the stairwells for voluntary sealing on the inside.' } }
    ],
    uudenmaankatu29: [
      { date: '14.7.2026', image: 'kuvat/sivut/meritullinkatu6-peltikatto.jpg',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        title: { fi: 'Urakan aloitus - sisäpihan rakennuksen vesikatto', sv: 'Entreprenaden inleds - gårdsbyggnadens tak', en: 'Project start - courtyard building roof' },
        excerpt: { fi: 'Sisäpihan rakennuksen vesikaton uusiminen alkaa ma 20.7.2026 työmaan perustamisella ja telineiden pystytyksellä. Telineasennus kestää noin viikon, jonka ajan autopaikat ovat pois käytöstä. Parvekkeet on tyhjennettävä koko urakan ajaksi ja ullakoille jaetaan viikolla 29 suojamuovit komeroiden suojaukseen. Urakka valmistuu syyskuussa 2026.', sv: 'Förnyelsen av gårdsbyggnadens yttertak inleds mån 20.7.2026 med etablering och ställningsmontering. Ställningarna tar cirka en vecka och under den tiden är parkeringsplatserna ur bruk. Balkongerna måste tömmas för hela entreprenaden och skyddsplast delas ut till vindarna vecka 29. Entreprenaden blir klar i september 2026.', en: 'Renewal of the courtyard building roof starts on Mon 20 July 2026 with site setup and scaffolding. Scaffolding takes about a week, during which parking spaces are out of use. Balconies must be cleared for the whole project and protective plastic is distributed to the attics in week 29. The project completes in September 2026.' } }
    ]
  };

  /* ---- Demo bulletins generated per project ---- */
  var POST_IMAGES = ['8.png', '9.png', '2.png', '6.png', '3.png', '7.png'];

  function buildPosts(p, idx) {
    return REAL_POSTS[p.slug] || [];
  }

  function buildDemoPosts(p, idx) {
    var img1 = POST_IMAGES[idx % POST_IMAGES.length];
    var img2 = POST_IMAGES[(idx + 2) % POST_IMAGES.length];
    var a = p.address;
    return [
      {
        date: '14.1.2026',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        image: img1,
        title: {
          fi: 'Työmaa käynnistyi - ' + p.company,
          sv: 'Byggarbetet har startat - ' + p.company,
          en: 'Site work has started - ' + p.company
        },
        excerpt: {
          fi: 'Aloitimme työt kohteessa ' + a + '. Työmaa-alue rajattiin ja telineiden pystytys aloitettiin.',
          sv: 'Vi inledde arbetet på ' + a + '. Arbetsområdet avgränsades och ställningsmonteringen påbörjades.',
          en: 'We began work at ' + a + '. The site was cordoned off and scaffolding assembly started.'
        },
        body: {
          fi: ['Työt kohteessa ' + a + ' on käynnistetty aikataulun mukaisesti. Ensimmäisessä vaiheessa pystytämme suojatelineet ja teemme tarkemmat kuntokartoitukset, joiden perusteella korjaustyöt tarkennetaan.',
               'Pidämme taloyhtiön ajan tasalla työn etenemisestä. Mahdollisista asukkaita koskevista järjestelyistä tiedotamme erikseen porraskäytävien ilmoitustauluilla.',
               'Tämä on demoteksti. Lopullinen sisältö ja kuvat lisätään projektin edetessä.'],
          sv: ['Arbetet på ' + a + ' har inletts enligt tidtabell. I det första skedet reser vi skyddsställningar och gör noggrannare konditionsbedömningar som ligger till grund för reparationerna.',
               'Vi håller bostadsbolaget uppdaterat om hur arbetet framskrider. Eventuella arrangemang som berör de boende meddelas separat på trapphusens anslagstavlor.',
               'Detta är en demotext. Det slutliga innehållet och bilderna läggs till medan projektet framskrider.'],
          en: ['Work at ' + a + ' has begun on schedule. In the first phase we erect protective scaffolding and carry out more detailed condition surveys that guide the repairs.',
               'We keep the housing company up to date on progress. Any arrangements affecting residents are communicated separately on the stairwell notice boards.',
               'This is demo text. The final content and images will be added as the project progresses.']
        }
      },
      {
        date: '3.3.2026',
        category: { fi: 'Työ etenee', sv: 'Pågår', en: 'In progress' },
        image: img2,
        title: {
          fi: 'Korjaustyöt etenevät aikataulussa',
          sv: 'Reparationerna framskrider enligt plan',
          en: 'Repairs progressing on schedule'
        },
        excerpt: {
          fi: 'Kohteen ' + a + ' korjaustyöt etenevät suunnitellusti. Ensimmäiset työvaiheet on saatu valmiiksi.',
          sv: 'Reparationerna på ' + a + ' framskrider planenligt. De första arbetsskedena är klara.',
          en: 'The repairs at ' + a + ' are progressing as planned. The first work phases are complete.'
        },
        body: {
          fi: ['Korjaustyöt kohteessa ' + a + ' etenevät suunnitellussa aikataulussa. Olemme saaneet ensimmäiset työvaiheet valmiiksi ja siirtyneet seuraavaan vaiheeseen.',
               'Työn laatua seurataan jokaisessa vaiheessa, ja dokumentoimme etenemisen taloyhtiölle. Kiitämme asukkaita kärsivällisyydestä työn aikana.',
               'Tämä on demoteksti. Päivitämme tähän tarkemmat kuvaukset ja valokuvat työn edetessä.'],
          sv: ['Reparationerna på ' + a + ' framskrider enligt planerad tidtabell. Vi har slutfört de första arbetsskedena och gått vidare till nästa fas.',
               'Arbetets kvalitet följs upp i varje skede och vi dokumenterar framstegen för bostadsbolaget. Vi tackar de boende för tålamodet under arbetet.',
               'Detta är en demotext. Vi uppdaterar med noggrannare beskrivningar och foton medan arbetet framskrider.'],
          en: ['The repairs at ' + a + ' are progressing on the planned schedule. We have completed the first work phases and moved on to the next stage.',
               'Quality is monitored at every phase and we document progress for the housing company. We thank residents for their patience during the work.',
               'This is demo text. We will update this with more detailed descriptions and photos as the work advances.']
        }
      }
    ];
  }

  PROJECTS.forEach(function (p, i) { p.posts = buildPosts(p, i); });

  function findProject(slug) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) return PROJECTS[i];
    }
    return null;
  }

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function reveal(container) {
    requestAnimationFrame(function () {
      container.querySelectorAll('.fade-in').forEach(function (el, i) {
        setTimeout(function () { el.classList.add('visible'); }, i * 70);
      });
    });
  }

  /* ---- Renderers ---- */
  function projectCard(p) {
    return '<a class="aproj-card fade-in" href="' + base + 'projekti.html?p=' + p.slug + '" ' +
      'style="background-image:url(' + base + p.image + ')">' +
      '<span class="aproj-card-overlay"></span>' +
      '<span class="aproj-card-text">' +
      '<span class="aproj-card-company">' + esc(p.company) + '</span>' +
      '<span class="aproj-card-address">' + esc(p.address.replace(', Helsinki', '')) + '</span>' +
      '</span></a>';
  }

  function renderGrid(id, limit) {
    var el = document.getElementById(id);
    if (!el) return;
    var list = limit ? PROJECTS.slice(0, limit) : PROJECTS;
    el.innerHTML = list.map(projectCard).join('');
    reveal(el);
  }

  function refType(p) {
    var s = (p.intro.fi || '').toLowerCase(), key = 'korjaus';
    if (s.indexOf('katto') !== -1 || s.indexOf('pelti') !== -1) key = 'katto';
    else if (s.indexOf('julkisivu') !== -1 || s.indexOf('rappau') !== -1) key = 'julkisivu';
    else if (s.indexOf('ikkun') !== -1) key = 'ikkuna';
    else if (s.indexOf('parvek') !== -1) key = 'parveke';
    var L = {
      fi: { katto: 'Kattosaneeraus', julkisivu: 'Julkisivusaneeraus', ikkuna: 'Ikkunatyöt', parveke: 'Parvekekorjaukset', korjaus: 'Korjaustyöt' },
      sv: { katto: 'Takrenovering', julkisivu: 'Fasadrenovering', ikkuna: 'Fönsterarbeten', parveke: 'Balkongrenovering', korjaus: 'Reparationer' },
      en: { katto: 'Roof renovation', julkisivu: 'Facade renovation', ikkuna: 'Window works', parveke: 'Balcony renovation', korjaus: 'Repairs' }
    };
    return (L[lang] || L.fi)[key];
  }

  function referenceCard(p, post) {
    var cat = post.category[lang] || post.category.fi;
    var title = post.title[lang] || post.title.fi;
    return '<a class="reference-card fade-in" href="' + base + 'projekti.html?p=' + p.slug + '">' +
      '<div class="reference-image">' +
      '<img src="' + base + p.image + '" alt="' + esc(p.company) + '">' +
      '<div class="reference-badge">' + t.building + '</div>' +
      '</div>' +
      '<div class="reference-content">' +
      '<div class="reference-meta"><span class="reference-type">' + esc(cat) + '</span>' +
      '<span class="reference-date">' + esc(post.date) + '</span></div>' +
      '<h3>' + esc(p.company) + '</h3>' +
      '<p>' + esc(title) + '</p>' +
      '</div></a>';
  }

  // Etusivun "Viimeisimmät tiedotteet": 3 uusinta tiedotetta KAIKISTA projekteista
  function renderReferences() {
    var el = document.getElementById('latest-projects-grid');
    if (!el) return;
    var parseDate = function (d) { var m = /(\d+)\.(\d+)\.(\d+)/.exec(d || ''); return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0; };
    var all = [];
    PROJECTS.forEach(function (p) { (p.posts || []).forEach(function (post) { all.push({ p: p, post: post }); }); });
    all.sort(function (a, b) { return parseDate(b.post.date) - parseDate(a.post.date); });
    el.innerHTML = all.slice(0, 3).map(function (x) { return referenceCard(x.p, x.post); }).join('');
    reveal(el);
  }

  function postCard(p, post, i, isLatest) {
    var cat = post.category[lang] || post.category.fi;
    var title = post.title[lang] || post.title.fi;
    var excerpt = post.excerpt[lang] || post.excerpt.fi;
    var badge = isLatest ? '<span class="news-card-latest">' + t.latest + '</span>' : '';
    return '<article class="news-card news-card--text fade-in">' +
      '<div class="news-card-content">' +
      badge +
      '<div class="news-card-meta"><span class="news-card-category">' + esc(cat) + '</span>' +
      '<span class="news-card-date">' + esc(post.date) + '</span></div>' +
      '<h3>' + esc(title) + '</h3>' +
      '<p>' + esc(excerpt) + '</p>' +
      '</div></article>';
  }

  function renderProjectPage() {
    var main = document.getElementById('project-main');
    if (!main) return;
    var p = findProject(getParam('p'));
    if (!p) {
      main.innerHTML = '<section class="project-intro"><div class="section-container"><div class="project-intro-inner">' +
        '<p>' + t.notFound + '</p><a class="project-back" href="' + base + 'ajankohtaista.html">' + t.back + '</a>' +
        '</div></div></section>';
      return;
    }
    document.title = p.company + ' - Myrak Oy';
    var intro = p.intro[lang] || p.intro.fi;

    var hero = '<section class="page-hero" style="background-image:url(' + base + p.image + ')">' +
      '<div class="page-hero-content">' +
      '<span class="page-hero-eyebrow">' + t.eyebrow + '</span>' +
      '<h1>' + esc(p.company) + '</h1>' +
      '<p class="page-hero-subtitle">' + esc(p.address) + '</p>' +
      '</div></section>';

    var introSec = '<section class="project-intro"><div class="section-container">' +
      '<span class="section-label">' + t.whatWeDo + '</span>' +
      '<h2>' + esc(p.company) + '</h2>' +
      '<div class="project-intro-top">' +
        '<div class="project-intro-top-text">' +
          '<p class="project-intro-address">' + esc(p.address) + '</p>' +
          '<p class="project-intro-body">' + esc(intro) + '</p>' +
        '</div>' +
        '<figure class="project-intro-figure"><img src="' + base + p.image + '" alt="' + esc(p.company) + '"></figure>' +
      '</div>' +
      '<hr class="project-divider">' +
      '</div></section>';

    var parseDate = function (d) {
      var m = /(\d+)\.(\d+)\.(\d+)/.exec(d || '');
      return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0;
    };
    // Uusin ensin (vasen yläkulma); ensimmäinen on aina ajankohtaisin
    var sorted = p.posts.slice().sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });

    var grid = sorted.length
      ? '<div class="news-grid">' + sorted.map(function (post, i) { return postCard(p, post, i, i === 0); }).join('') + '</div>'
      : '<p class="refs-no-results">' + t.noNews + '</p>';

    var posts = '<section class="news-section"><div class="section-container">' +
      '<div class="section-header"><span class="section-label">' + t.sectionLabel + '</span>' +
      '<h2 class="section-title">' + t.updates + '</h2></div>' +
      grid +
      '<div class="project-back-wrap"><a class="project-back" href="' + base + 'ajankohtaista.html">' + t.back + '</a></div>' +
      '</div></section>';

    main.innerHTML = hero + introSec + posts;
    reveal(main);
  }

  function renderTiedotePage() {
    var main = document.getElementById('tiedote-main');
    if (!main) return;
    var p = findProject(getParam('p'));
    var n = parseInt(getParam('n'), 10);
    if (!p || isNaN(n) || !p.posts[n]) {
      main.innerHTML = '<section class="tiedote-body"><div class="section-container"><div class="tiedote-inner">' +
        '<p>' + t.notFound + '</p><a class="project-back" href="' + base + 'ajankohtaista.html">' + t.back + '</a>' +
        '</div></div></section>';
      return;
    }
    var post = p.posts[n];
    var cat = post.category[lang] || post.category.fi;
    var title = post.title[lang] || post.title.fi;
    var body = (post.body && (post.body[lang] || post.body.fi)) || [post.excerpt[lang] || post.excerpt.fi];
    document.title = title + ' - Myrak Oy';

    var hero = '<section class="page-hero page-hero--steel"><div class="page-hero-content">' +
      '<span class="page-hero-eyebrow">' + esc(p.company) + '</span>' +
      '<h1 style="font-size:clamp(1.8rem,4vw,3rem);">' + esc(title) + '</h1>' +
      '<p class="page-hero-subtitle">' + esc(p.address) + '</p>' +
      '</div></section>';

    var article = '<section class="tiedote-body"><div class="section-container"><div class="tiedote-inner">' +
      '<div class="news-card-meta"><span class="news-card-category">' + esc(cat) + '</span>' +
      '<span class="news-card-date">' + esc(post.date) + '</span></div>' +
      '<div class="tiedote-image"><img src="' + base + post.image + '" alt="' + esc(title) + '"></div>' +
      body.map(function (par) { return '<p>' + esc(par) + '</p>'; }).join('') +
      '<a class="project-back" href="' + base + 'projekti.html?p=' + p.slug + '">' + t.backToProject + '</a>' +
      '</div></div></section>';

    main.innerHTML = hero + article;
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('active-projects-preview')) renderGrid('active-projects-preview', 3);
    if (document.getElementById('active-projects-all')) renderGrid('active-projects-all', 0);
    renderReferences();
    renderProjectPage();
    renderTiedotePage();
  });

  window.MyrakAktiiviset = { projects: PROJECTS, renderGrid: renderGrid };
})();

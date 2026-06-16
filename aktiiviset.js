/* ============================================================
   Myrak Oy — Aktiiviset projektit (2026)
   Shared data + renderers for:
     - index.html / sv/index.html / en/index.html  (preview row)
     - ajankohtaista.html (+ sv/en)                 (full grid)
     - projekti.html (+ sv/en)                      (project detail)
     - tiedote.html (+ sv/en)                       (single bulletin)

   NOTE: Images and bulletin texts below are DEMO content.
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
      sectionLabel: 'News',
      sectionTitle: 'Active projects',
      sectionSub: 'Our ongoing sites in 2026'
    }
  };
  var t = UI[lang];

  /* ---- Project data (2026) ---- */
  var PROJECTS = [
    {
      slug: 'aitio', company: 'As Oy Aitio', address: 'Aino Acktén tie 1, 3, Helsinki', image: '1.png',
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
      slug: 'neitsytpolku9', company: 'As Oy Neitsytpolku 9', address: 'Neitsytpolku 9, Helsinki', image: '8.png',
      intro: {
        fi: 'Julkisivu-, ikkuna- ja parvekekorjaukset. Kokonaisvaltainen julkisivuremontti, jossa kunnostetaan rappaukset, uusitaan ikkunat ja saneerataan parvekkeet rakenteineen.',
        sv: 'Fasad-, fönster- och balkongrenovering. En helhetsrenovering där putsen restaureras, fönstren förnyas och balkongerna saneras med konstruktioner.',
        en: 'Facade, window and balcony repairs. A comprehensive facade renovation restoring the plaster, renewing the windows and refurbishing the balconies and their structures.'
      }
    },
    {
      slug: 'soma', company: 'As Oy Soma', address: 'Meritullinkatu 31 / Kruununhaankatu 3, Helsinki', image: '9.png',
      intro: {
        fi: 'Ikkuna- ja julkisivukorjaukset Kruununhaan arvokorttelissa. Ikkunat entisöidään tai uusitaan ja julkisivun pinnat kunnostetaan kokonaisuutta kunnioittaen.',
        sv: 'Fönster- och fasadrenovering i Kronohagens värdefulla kvarter. Fönstren restaureras eller förnyas och fasadens ytor renoveras med respekt för helheten.',
        en: 'Window and facade repairs in the distinguished Kruununhaka block. Windows are restored or renewed and the facade surfaces refurbished respecting the whole.'
      }
    },
    {
      slug: 'turuntie68', company: 'As Oy Turuntie 68', address: 'Mannerheimintie 94, Helsinki', image: '1.png',
      intro: {
        fi: 'Ikkuna-, julkisivu- ja kattokorjaukset. Laaja kokonaisuus, jossa rakennuksen vaippa kunnostetaan ulkoa: ikkunat, julkisivut ja vesikatto saatetaan kuntoon.',
        sv: 'Fönster-, fasad- och takrenovering. En omfattande helhet där byggnadens klimatskal renoveras utifrån: fönster, fasader och yttertak sätts i skick.',
        en: 'Window, facade and roof repairs. A broad package in which the building envelope is renovated from the outside: windows, facades and roof are brought into shape.'
      }
    },
    {
      slug: 'aino', company: 'Asunto Oy Aino', address: 'Yrjönkatu 12–14, Helsinki', image: '2.png',
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
      slug: 'bangatan', company: 'Bostads Ab Bangatan 11–13', address: 'Ratakatu 11–13, Helsinki', image: '4.png',
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

  /* ---- Demo bulletins generated per project ---- */
  var POST_IMAGES = ['8.png', '9.png', '2.png', '6.png', '3.png', '7.png'];

  function buildPosts(p, idx) {
    var img1 = POST_IMAGES[idx % POST_IMAGES.length];
    var img2 = POST_IMAGES[(idx + 2) % POST_IMAGES.length];
    var a = p.address;
    return [
      {
        date: '14.1.2026',
        category: { fi: 'Aloitus', sv: 'Start', en: 'Kick-off' },
        image: img1,
        title: {
          fi: 'Työmaa käynnistyi — ' + p.company,
          sv: 'Byggarbetet har startat — ' + p.company,
          en: 'Site work has started — ' + p.company
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

  function referenceCard(p) {
    return '<a class="reference-card fade-in" href="' + base + 'projekti.html?p=' + p.slug + '">' +
      '<div class="reference-image">' +
      '<img src="' + base + p.image + '" alt="' + esc(p.company) + '">' +
      '<div class="reference-badge">' + t.building + '</div>' +
      '</div>' +
      '<div class="reference-content">' +
      '<div class="reference-meta"><span class="reference-type">' + refType(p) + '</span>' +
      '<span class="reference-date">2026</span></div>' +
      '<h3>' + esc(p.company) + '</h3>' +
      '<p>' + esc(p.address.replace(', Helsinki', '')) + '</p>' +
      '</div></a>';
  }

  function renderReferences() {
    var el = document.getElementById('latest-projects-grid');
    if (!el) return;
    el.innerHTML = PROJECTS.slice(0, 3).map(referenceCard).join('');
    reveal(el);
  }

  function postCard(p, post, i, isLatest) {
    var cat = post.category[lang] || post.category.fi;
    var title = post.title[lang] || post.title.fi;
    var excerpt = post.excerpt[lang] || post.excerpt.fi;
    var badge = isLatest ? '<span class="news-card-latest">' + t.latest + '</span>' : '';
    return '<article class="news-card fade-in">' +
      '<div class="news-card-image">' + badge + '<img src="' + base + post.image + '" alt="' + esc(title) + '"></div>' +
      '<div class="news-card-content">' +
      '<div class="news-card-meta"><span class="news-card-category">' + esc(cat) + '</span>' +
      '<span class="news-card-date">' + esc(post.date) + '</span></div>' +
      '<h3>' + esc(title) + '</h3>' +
      '<p>' + esc(excerpt) + '</p>' +
      '<a class="news-card-link" href="' + base + 'tiedote.html?p=' + p.slug + '&n=' + i + '">' + t.readMore + ' →</a>' +
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
    document.title = p.company + ' — Myrak Oy';
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
    var latestIdx = 0;
    p.posts.forEach(function (post, i) {
      if (parseDate(post.date) >= parseDate(p.posts[latestIdx].date)) latestIdx = i;
    });

    var posts = '<section class="news-section"><div class="section-container">' +
      '<div class="section-header"><span class="section-label">' + t.sectionLabel + '</span>' +
      '<h2 class="section-title">' + t.updates + '</h2></div>' +
      '<div class="news-grid">' + p.posts.map(function (post, i) { return postCard(p, post, i, i === latestIdx); }).join('') + '</div>' +
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
    var body = post.body[lang] || post.body.fi;
    document.title = title + ' — Myrak Oy';

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

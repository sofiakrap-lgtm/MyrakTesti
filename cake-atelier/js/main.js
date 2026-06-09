/* =========================================================================
   PÄÄSKRIPTI  –  js/main.js
   -------------------------------------------------------------------------
   Sisältää:
     1. Ikonit (SVG)
     2. Jaettu header (navi + kori) ja footer – injektoidaan joka sivulle
     3. Mobiilivalikko (hampurilainen)
     4. Demo-ostoskori (localStorage, ei oikeaa maksua)
     5. Tuotteiden, gallerian ja tapahtumien renderöinti site.js:stä
     6. Lomakkeiden demo-toiminta (ei lähetä – näyttää kiitosviestin)

   Kaikki sisältö luetaan window.SITE-objektista (data/site.js).
   ========================================================================= */

(function () {
  "use strict";

  const SITE = window.SITE;
  if (!SITE) {
    console.error("data/site.js puuttuu – sisältöä ei voida ladata.");
    return;
  }

  // Merkitään että JS on käytössä (CSS-fade-in aktivoituu vasta tästä,
  // jotta sisältö on näkyvissä myös ilman JS:ää).
  document.body.classList.add("js");

  /* =======================================================================
     1. IKONIT  (yksinkertaiset SVG-merkit)
     ======================================================================= */
  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.7 0-2-1.3-3.4-3.7-3.4-2.7 0-4.3 2-4.3 4.1 0 .8.2 1.3.6 1.8.2.2.2.3.1.5l-.2.8c0 .3-.2.4-.5.2-1.1-.5-1.7-1.9-1.7-3.4 0-2.6 2.2-5.7 6.5-5.7 3.5 0 5.8 2.5 5.8 5.2 0 3.6-2 6.2-4.9 6.2-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.7 1.7-1 2.3A10 10 0 1 0 12 2z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.3 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.8c0 3.2-2.4 5.7-5.6 5.7A5.6 5.6 0 0 1 5 14.4c.2-2.7 2.4-4.7 5.1-4.6.3 0 .5 0 .8.1v2.8c-.3-.1-.6-.2-.9-.2-1.3 0-2.3 1-2.3 2.2 0 1.3 1 2.2 2.2 2.2 1.3 0 2.3-1 2.3-2.4V3H16z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v3"/><path d="M3 21h18"/><path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7"/><path d="M4 15c2 0 2 1.5 4 1.5S10 15 12 15s2 1.5 4 1.5S18 15 20 15"/><circle cx="12" cy="3" r="1" fill="currentColor"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.9z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z"/><path d="M4 20c2-4 5-7 9-9"/></svg>',
  };

  /* Kuvapaikka-komponentti: lämmin gradientti + kakku-SVG + teksti.
     variantti = lisäluokka (esim. "kuvapaikka--laaja"), kuva = polku tai "" */
  function kuvapaikka(variantti, kuva, altTeksti) {
    const luokka = "kuvapaikka " + (variantti || "");
    if (kuva) {
      // Oikea kuva lisätty: taustakuva + saavutettava aria-label
      return (
        '<div class="' + luokka + ' has-img" role="img" aria-label="' +
        (altTeksti || "") + '" style="background-image:url(\'' + kuva + "')\"></div>"
      );
    }
    // Paikkamerkki
    return (
      '<div class="' + luokka + '">' +
      '<span class="kuvapaikka__svg">' + ICONS.cake + "</span>" +
      '<span class="kuvapaikka__teksti">oma kuva tähän</span>' +
      "</div>"
    );
  }

  /* =======================================================================
     2. JAETTU HEADER + FOOTER (injektoidaan joka sivulle)
     ======================================================================= */

  const sivu = document.body.getAttribute("data-page") || "";

  function renderHeader() {
    const linkit = SITE.navi
      .map(function (n) {
        const aktiivinen = n.linkki === sivu ? ' aria-current="page"' : "";
        return '<li><a href="' + n.linkki + '"' + aktiivinen + ">" + n.teksti + "</a></li>";
      })
      .join("");

    return (
      // Ohut demo-yläpalkki
      '<div class="demobar">' +
      '<strong>DEMOVERSIO</strong> — esimerkki sivustosta, kuvat ja tekstit vaihdetaan asiakkaan omiin.' +
      "</div>" +
      // Varsinainen yläpalkki
      '<header class="site-header">' +
      '<div class="wrap nav">' +
      '<a class="nav__logo" href="index.html" aria-label="' + SITE.nimi + '">' +
      // Wordmark-logo (assets/logo.svg). alt-teksti toimii varatekstinä.
      '<img src="assets/logo.svg" alt="' + SITE.nimi + '">' +
      "</a>" +
      '<button class="nav__burger" aria-label="Avaa valikko" aria-expanded="false" aria-controls="paavalikko">' +
      "<span></span><span></span><span></span>" +
      "</button>" +
      '<ul class="nav__links" id="paavalikko">' + linkit + "</ul>" +
      '<div class="nav__actions">' +
      '<a class="btn btn--primary btn--small" href="tilaa.html">Tilaa nyt</a>' +
      '<button class="cart-btn" id="cart-open" aria-label="Avaa ostoskori">' +
      ICONS.cart +
      '<span class="cart-count" id="cart-count" hidden>0</span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</header>"
    );
  }

  function renderFooter() {
    const toimipisteet = SITE.toimipisteet
      .map(function (t) {
        const aukiolot = t.aukiolot
          .map(function (a) {
            return a.paiva + " " + a.aika;
          })
          .join("<br>");
        return (
          '<div class="footer-loc">' +
          "<h4>" + t.nimi + "</h4>" +
          "<p>" + t.osoite + "<br>" +
          '<a href="tel:' + t.puhelin.replace(/\s/g, "") + '">' + t.puhelin + "</a><br>" +
          '<a href="mailto:' + t.sahkoposti + '">' + t.sahkoposti + "</a></p>" +
          "<p>" + aukiolot + "</p>" +
          "</div>"
        );
      })
      .join("");

    // Somelinkit (vain ne joilla on osoite)
    const some = Object.keys(SITE.some)
      .filter(function (k) { return SITE.some[k]; })
      .map(function (k) {
        return (
          '<a href="' + SITE.some[k] + '" target="_blank" rel="noopener" aria-label="' +
          k + '">' + (ICONS[k] || "") + "</a>"
        );
      })
      .join("");

    return (
      '<footer class="site-footer">' +
      '<div class="wrap">' +
      '<div class="footer-grid">' +
      // Brändisarake (vaalea wordmark tummalla taustalla + englanninkielinen slogan)
      '<div class="footer-brand">' +
      '<img src="assets/logo-light.svg" alt="' + SITE.nimi + '">' +
      "<p>" + (SITE.tagline || SITE.iskulause) + "</p>" +
      '<div class="footer-social">' + some + "</div>" +
      "</div>" +
      // Kaksi toimipistettä
      toimipisteet +
      // Linkit
      '<div class="footer-links">' +
      "<h4>Tietoa</h4>" +
      "<ul>" +
      '<li><a href="tilausehdot.html">Tilaus- ja toimitusehdot</a></li>' +
      '<li><a href="tietosuoja.html">Tietosuojaseloste</a></li>' +
      '<li><a href="ukk.html">Usein kysyttyä</a></li>' +
      '<li><a href="yhteystiedot.html">Yhteystiedot</a></li>' +
      "</ul>" +
      "</div>" +
      "</div>" +
      // Alarivi
      '<div class="footer-bottom">' +
      "<span>© " + new Date().getFullYear() + " " + SITE.nimi + " — demo</span>" +
      '<span><a href="' + SITE.rakentajaLinkki + '">' + SITE.rakentaja + "</a></span>" +
      "</div>" +
      "</div>" +
      "</footer>"
    );
  }

  // Ostoskori-laatikko (drawer) injektoidaan kerran joka sivulle
  function renderCartDrawer() {
    return (
      '<div class="cart-overlay" id="cart-overlay"></div>' +
      '<aside class="cart" id="cart" aria-label="Ostoskori" aria-hidden="true">' +
      '<div class="cart__head">' +
      "<h2>Ostoskori</h2>" +
      '<button class="cart__close" id="cart-close" aria-label="Sulje ostoskori">✕</button>' +
      "</div>" +
      '<div class="cart__items" id="cart-items"></div>' +
      '<div class="cart__foot">' +
      '<div class="cart__note">' +
      '<label for="cart-note">Lisätiedot / toiveet (esim. kukkatoiveet, teksti kakkuun)</label>' +
      '<textarea id="cart-note" placeholder="Kirjoita toiveesi tähän…"></textarea>' +
      "</div>" +
      '<div class="cart__total"><span>Yhteensä</span><span id="cart-total">0 €</span></div>' +
      '<button class="btn btn--primary btn--block" id="cart-checkout">Lähetä tilauspyyntö (demo)</button>' +
      '<p style="font-size:.78rem;color:var(--muted);text-align:center;margin:.6rem 0 0">' +
      "Demo-ostoskori: maksua ei veloiteta. Nouto myymälästä." +
      "</p>" +
      "</div>" +
      "</aside>"
    );
  }

  // Injektoi header alkuun, footer ja kori loppuun
  const headerSlot = document.getElementById("site-header");
  if (headerSlot) headerSlot.outerHTML = renderHeader();

  const footerSlot = document.getElementById("site-footer");
  if (footerSlot) footerSlot.outerHTML = renderFooter() + renderCartDrawer();

  /* =======================================================================
     3. MOBIILIVALIKKO (hampurilainen)
     ======================================================================= */
  const burger = document.querySelector(".nav__burger");
  const links = document.getElementById("paavalikko");
  if (burger && links) {
    burger.addEventListener("click", function () {
      const auki = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", auki ? "true" : "false");
    });
    // Sulje valikko kun linkkiä klikataan
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =======================================================================
     4. DEMO-OSTOSKORI
     – Tallennetaan localStorageen, jotta säilyy sivulta toiselle.
     ======================================================================= */
  const CART_KEY = "karpalo_demo_cart";

  function lueKori() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function tallennaKori(kori) {
    localStorage.setItem(CART_KEY, JSON.stringify(kori));
  }
  function euro(n) {
    return n.toFixed(2).replace(".", ",").replace(",00", "") + " €";
  }

  function lisaaKoriin(tuote) {
    const kori = lueKori();
    kori.push(tuote);
    tallennaKori(kori);
    paivitaKori();
    avaaKori();
  }

  function poistaKorista(index) {
    const kori = lueKori();
    kori.splice(index, 1);
    tallennaKori(kori);
    paivitaKori();
  }

  function paivitaKori() {
    const kori = lueKori();
    const count = document.getElementById("cart-count");
    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if (count) {
      count.textContent = kori.length;
      count.hidden = kori.length === 0;
    }
    if (!items || !total) return;

    if (kori.length === 0) {
      items.innerHTML = '<p class="cart__empty">Korisi on tyhjä. Selaa tuotteita ja lisää suosikkisi.</p>';
      total.textContent = "0 €";
      return;
    }

    let summa = 0;
    items.innerHTML = kori
      .map(function (t, i) {
        summa += t.hinta;
        return (
          '<div class="cart-item">' +
          '<div class="cart-item__info">' +
          '<p class="cart-item__name">' + t.nimi + "</p>" +
          '<p class="cart-item__opts">' + t.valinnat + "</p>" +
          '<button class="cart-item__remove" data-remove="' + i + '">Poista</button>' +
          "</div>" +
          '<span class="cart-item__price">' + euro(t.hinta) + "</span>" +
          "</div>"
        );
      })
      .join("");
    total.textContent = euro(summa);

    // Poistonapit
    items.querySelectorAll("[data-remove]").forEach(function (b) {
      b.addEventListener("click", function () {
        poistaKorista(parseInt(b.getAttribute("data-remove"), 10));
      });
    });
  }

  function avaaKori() {
    const cart = document.getElementById("cart");
    const ov = document.getElementById("cart-overlay");
    if (cart) { cart.classList.add("open"); cart.setAttribute("aria-hidden", "false"); }
    if (ov) ov.classList.add("open");
  }
  function suljeKori() {
    const cart = document.getElementById("cart");
    const ov = document.getElementById("cart-overlay");
    if (cart) { cart.classList.remove("open"); cart.setAttribute("aria-hidden", "true"); }
    if (ov) ov.classList.remove("open");
  }

  // Korin napit
  const cartOpen = document.getElementById("cart-open");
  const cartClose = document.getElementById("cart-close");
  const cartOverlay = document.getElementById("cart-overlay");
  if (cartOpen) cartOpen.addEventListener("click", avaaKori);
  if (cartClose) cartClose.addEventListener("click", suljeKori);
  if (cartOverlay) cartOverlay.addEventListener("click", suljeKori);

  // "Lähetä tilauspyyntö (demo)" – ei oikeaa maksua
  const checkout = document.getElementById("cart-checkout");
  if (checkout) {
    checkout.addEventListener("click", function () {
      const kori = lueKori();
      if (kori.length === 0) {
        alert("Korisi on tyhjä – lisää ensin tuotteita.");
        return;
      }
      const items = document.getElementById("cart-items");
      items.innerHTML =
        '<div class="demo-success">' +
        "<h3>Kiitos tilauspyynnöstäsi</h3>" +
        "<p>Tämä on <strong>demo</strong> – maksua ei veloiteta eikä tilausta " +
        "lähetetä oikeasti. Oikealla sivustolla saisit tästä vahvistuksen " +
        "sähköpostiisi, ja olisimme sinuun yhteydessä noudon sopimiseksi.</p>" +
        "</div>";
      document.getElementById("cart-total").textContent = "0 €";
      localStorage.removeItem(CART_KEY);
      const count = document.getElementById("cart-count");
      if (count) { count.textContent = "0"; count.hidden = true; }
    });
  }

  paivitaKori();

  /* =======================================================================
     4b. TEKSTIN TÄYTTÖ site.js:stä
     – Mikä tahansa elementti, jolla on data-site="avain", saa tekstinsä
       SITE-objektista. Esim. <span data-site="nimi"></span>
     ======================================================================= */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    const avain = el.getAttribute("data-site");
    if (SITE[avain] != null && typeof SITE[avain] === "string") {
      el.textContent = SITE[avain];
    }
  });
  // Erikseen puhelin/sähköposti linkkeinä
  document.querySelectorAll('[data-site-link="puhelin"]').forEach(function (a) {
    a.href = "tel:" + SITE.puhelin.replace(/\s/g, "");
    if (!a.textContent.trim()) a.textContent = SITE.puhelin;
  });
  document.querySelectorAll('[data-site-link="sahkoposti"]').forEach(function (a) {
    a.href = "mailto:" + SITE.sahkoposti;
    if (!a.textContent.trim()) a.textContent = SITE.sahkoposti;
  });

  /* =======================================================================
     5. TUOTTEIDEN RENDERÖINTI (verkkokauppa + suosikit etusivulla)
     ======================================================================= */

  // Rakentaa yhden tuotekortin HTML:n
  function tuotekortti(t) {
    const koot = t.koot
      .map(function (k, i) {
        const valittu = i === 0 ? 'aria-pressed="true"' : 'aria-pressed="false"';
        return (
          '<button class="opt" data-koko="' + k.lisa + '" ' + valittu + ">" + k.nimi + "</button>"
        );
      })
      .join("");

    const ruokavaliot = t.ruokavaliot
      .map(function (r, i) {
        const valittu = i === 0 ? 'aria-pressed="true"' : 'aria-pressed="false"';
        return (
          '<button class="opt" data-diet="' + r.lisa + '" ' + valittu + ">" + r.nimi + "</button>"
        );
      })
      .join("");

    const allergeenit = t.allergeenit.length
      ? t.allergeenit.map(function (a) { return '<span class="allergen-tag">' + a + "</span>"; }).join(" ")
      : '<span class="allergen-tag">ei merkittäviä allergeeneja</span>';

    return (
      '<article class="product" data-nimi="' + t.nimi.toLowerCase() + " " + t.kuvaus.toLowerCase() +
      '" data-kategoria="' + t.kategoria + '" data-base="' + t.alkaen + '">' +
      '<div class="product__media">' + kuvapaikka("kuvapaikka--laaja", t.kuva, t.nimi) + "</div>" +
      '<div class="product__body">' +
      '<h3 class="product__name">' + t.nimi + "</h3>" +
      '<p class="product__desc">' + t.kuvaus + "</p>" +
      '<p class="product__meta"><span>' + t.annos + "</span></p>" +
      '<div class="opt-group"><span class="opt-group__label">Koko</span>' +
      '<div class="opt-row" data-group="koko">' + koot + "</div></div>" +
      '<div class="opt-group"><span class="opt-group__label">Ruokavalio</span>' +
      '<div class="opt-row" data-group="diet">' + ruokavaliot + "</div></div>" +
      // Lisätiedot-osio (kuten Bakerikalla): laajennettava
      '<details class="product__more"><summary>Lisätiedot</summary>' +
      '<dl class="product__details">' +
      "<dt>Annoskoko</dt><dd>" + t.annos + "</dd>" +
      "<dt>Allergeenit</dt><dd>" + allergeenit + "</dd>" +
      (t.ainesosat ? "<dt>Ainesosat</dt><dd>" + t.ainesosat + "</dd>" : "") +
      (t.sailytys ? "<dt>Säilytys</dt><dd>" + t.sailytys + "</dd>" : "") +
      "</dl></details>" +
      '<p class="product__price"><span class="hinta-arvo">' + euro(t.alkaen) +
      '</span> <small>alkaen</small></p>' +
      '<button class="btn btn--primary btn--block lisaa-koriin">Lisää koriin</button>' +
      "</div>" +
      "</article>"
    );
  }

  // Laskee ja päivittää kortin hinnan valintojen mukaan
  function paivitaHinta(kortti) {
    const base = parseFloat(kortti.getAttribute("data-base"));
    const kokoEl = kortti.querySelector('[data-group="koko"] [aria-pressed="true"]');
    const dietEl = kortti.querySelector('[data-group="diet"] [aria-pressed="true"]');
    const koko = kokoEl ? parseFloat(kokoEl.getAttribute("data-koko")) : 0;
    const diet = dietEl ? parseFloat(dietEl.getAttribute("data-diet")) : 0;
    const hinta = base + koko + diet;
    kortti.querySelector(".hinta-arvo").textContent = euro(hinta);
    return hinta;
  }

  // Kytkee variaatiopainikkeet ja "lisää koriin" yhteen tuotekorttiin
  function kytkeKortti(kortti) {
    kortti.querySelectorAll(".opt-row").forEach(function (rivi) {
      rivi.addEventListener("click", function (e) {
        if (!e.target.classList.contains("opt")) return;
        rivi.querySelectorAll(".opt").forEach(function (o) {
          o.setAttribute("aria-pressed", "false");
        });
        e.target.setAttribute("aria-pressed", "true");
        // "alkaen" pois kun käyttäjä on valinnut
        const small = kortti.querySelector(".product__price small");
        if (small) small.textContent = "";
        paivitaHinta(kortti);
      });
    });

    kortti.querySelector(".lisaa-koriin").addEventListener("click", function () {
      const hinta = paivitaHinta(kortti);
      const nimi = kortti.querySelector(".product__name").textContent;
      const koko = kortti.querySelector('[data-group="koko"] [aria-pressed="true"]');
      const diet = kortti.querySelector('[data-group="diet"] [aria-pressed="true"]');
      const valinnat = [koko ? koko.textContent : "", diet ? diet.textContent : ""]
        .filter(function (s) { return s && s !== "—"; })
        .join(" · ");
      lisaaKoriin({ nimi: nimi, valinnat: valinnat, hinta: hinta });
    });
  }

  // Renderöi tuotelistauksen annettuun säiliöön
  function renderTuotteet(saiplio, tuotteet) {
    saiplio.innerHTML = tuotteet.map(tuotekortti).join("");
    saiplio.querySelectorAll(".product").forEach(kytkeKortti);
  }

  // a) Verkkokauppasivu (tuotteet.html)
  const shopGrid = document.getElementById("shop-grid");
  if (shopGrid) {
    renderTuotteet(shopGrid, SITE.tuotteet);

    // Suodatuskategoriat (chipit)
    const filterWrap = document.getElementById("shop-filters");
    if (filterWrap) {
      filterWrap.innerHTML = SITE.kategoriat
        .map(function (k, i) {
          return (
            '<button class="chip" data-cat="' + k.avain + '" aria-pressed="' +
            (i === 0 ? "true" : "false") + '">' + k.nimi + "</button>"
          );
        })
        .join("");
    }

    const haku = document.getElementById("shop-search-input");

    function suodata() {
      const teksti = haku ? haku.value.trim().toLowerCase() : "";
      const aktChip = filterWrap ? filterWrap.querySelector('[aria-pressed="true"]') : null;
      const cat = aktChip ? aktChip.getAttribute("data-cat") : "kaikki";

      shopGrid.querySelectorAll(".product").forEach(function (p) {
        const osuuTeksti = p.getAttribute("data-nimi").indexOf(teksti) !== -1;
        const osuuKat = cat === "kaikki" || p.getAttribute("data-kategoria") === cat;
        p.style.display = osuuTeksti && osuuKat ? "" : "none";
      });
    }

    if (haku) haku.addEventListener("input", suodata);
    if (filterWrap) {
      filterWrap.addEventListener("click", function (e) {
        if (!e.target.classList.contains("chip")) return;
        filterWrap.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", "false");
        });
        e.target.setAttribute("aria-pressed", "true");
        suodata();
      });
    }
  }

  // b) Suosikkituotteet etusivulla (#suosikit)
  const suosikitGrid = document.getElementById("suosikit");
  if (suosikitGrid) {
    const suosikit = SITE.suosikit
      .map(function (id) {
        return SITE.tuotteet.find(function (t) { return t.id === id; });
      })
      .filter(Boolean);
    renderTuotteet(suosikitGrid, suosikit);
  }

  /* =======================================================================
     6. GALLERIAN RENDERÖINTI (galleria.html ja etusivun teaser)
     ======================================================================= */
  const galleriaGrid = document.getElementById("galleria");
  if (galleriaGrid) {
    galleriaGrid.innerHTML = SITE.galleria
      .map(function (g) {
        return (
          "<figure>" +
          kuvapaikka("kuvapaikka--neliö", g.kuva, g.otsikko) +
          "<figcaption>" + g.otsikko + "</figcaption>" +
          "</figure>"
        );
      })
      .join("");
  }

  /* =======================================================================
     7. TAPAHTUMIEN RENDERÖINTI (tapahtumat.html)
     ======================================================================= */
  const tapahtumatLista = document.getElementById("tapahtumat");
  if (tapahtumatLista) {
    const kuukaudet = ["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu"];
    tapahtumatLista.innerHTML = SITE.tapahtumat
      .map(function (e) {
        const d = new Date(e.pvm);
        return (
          '<div class="event">' +
          '<div class="event__date"><span class="d">' + d.getDate() + '</span>' +
          '<span class="m">' + kuukaudet[d.getMonth()] + "</span></div>" +
          '<div class="event__body">' +
          '<span class="event__tag">' + e.tagi + "</span>" +
          "<h3>" + e.otsikko + "</h3>" +
          "<p>" + e.kuvaus + "</p>" +
          '<a class="btn btn--ghost btn--small" href="tilaa.html">Ilmoittaudu (demo)</a>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* =======================================================================
     7b. TOIMIPISTEET (yhteystiedot.html)
     ======================================================================= */
  const locGrid = document.getElementById("locations-grid");
  if (locGrid) {
    locGrid.innerHTML = SITE.toimipisteet
      .map(function (t) {
        const rivit = t.aukiolot
          .map(function (a) {
            return "<tr><th>" + a.paiva + "</th><td>" + a.aika + "</td></tr>";
          })
          .join("");
        return (
          '<div class="card">' +
          "<h2>" + t.nimi + "</h2>" +
          '<dl style="margin:0 0 1rem">' +
          '<div class="location__row"><dt>Osoite</dt><dd>' + t.osoite + "</dd></div>" +
          '<div class="location__row"><dt>Puhelin</dt><dd><a href="tel:' +
          t.puhelin.replace(/\s/g, "") + '">' + t.puhelin + "</a></dd></div>" +
          '<div class="location__row"><dt>Sähköposti</dt><dd><a href="mailto:' +
          t.sahkoposti + '">' + t.sahkoposti + "</a></dd></div>" +
          "</dl>" +
          "<h3>Aukioloajat</h3>" +
          '<table class="hours-table"><tbody>' + rivit + "</tbody></table>" +
          '<p style="font-size:.88rem;color:var(--muted);margin-top:.8rem">' +
          "<strong>Poikkeusaukiolot:</strong> " + t.poikkeukset + "</p>" +
          '<div class="map-placeholder kuvapaikka" style="margin-top:1rem">' +
          '<span class="kuvapaikka__teksti">kartta tähän</span></div>' +
          "</div>"
        );
      })
      .join("");
  }

  /* =======================================================================
     8. LOMAKKEIDEN DEMO-TOIMINTA (ei lähetä – näyttää kiitosviestin)
     ======================================================================= */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const viesti = form.querySelector(".demo-success");
      if (viesti) {
        viesti.hidden = false;
        viesti.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.querySelectorAll("input, textarea, select, button").forEach(function (el) {
        if (el.type !== "button") el.setAttribute("disabled", "disabled");
      });
    });
  });

  /* =======================================================================
     9. PEHMEÄT FADE-IN-ANIMAATIOT
     – Elementit, joilla on luokka .reveal, häivähtävät näkyviin kun ne
       tulevat näkyviin. Kunnioittaa prefers-reduced-motion -asetusta.
     ======================================================================= */
  const reveals = document.querySelectorAll(".reveal");
  const liikeVahennetty = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reveals.length && !liikeVahennetty && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    // Ei animaatiota: näytetään heti
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

})();

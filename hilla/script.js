/* =========================================================
   Hilla Studios — shared interactions
   Works on every page; each block guards for its own elements.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Marquee seamless loop ---------- */
  var marquee = document.getElementById("marquee");
  if (marquee) { marquee.innerHTML += marquee.innerHTML; }

  /* ---------- Currency helper ---------- */
  function eur(n) { return n.toLocaleString("fi-FI") + " €"; }

  var STORE_KEY = "hillaBrief";

  /* =========================================================
     CALCULATOR (laskuri.html)
     ========================================================= */
  var calcMain = document.querySelector(".calc-main");
  if (calcMain) {
    var chips = Array.prototype.slice.call(document.querySelectorAll("#industryChips .chip"));
    var scopeInputs = Array.prototype.slice.call(document.querySelectorAll('input[name="scope"]'));
    var addonInputs = Array.prototype.slice.call(document.querySelectorAll('#addonGroup input[type="checkbox"]'));
    var addonLabels = Array.prototype.slice.call(document.querySelectorAll('#addonGroup .opt'));
    var upkeep = document.getElementById("upkeep");
    var langCountEl = document.getElementById("langCount");
    var langPlus = document.getElementById("langPlus");
    var langMinus = document.getElementById("langMinus");
    var summaryLines = document.getElementById("summaryLines");
    var summaryAla = document.getElementById("summaryAla");
    var totalPriceEl = document.getElementById("totalPrice");
    var monthlyLine = document.getElementById("monthlyLine");
    var toQuote = document.getElementById("toQuote");

    var LANG_PRICE = 220;
    var state = { ala: "", langs: 0 };

    var ALA_LABEL = {
      leipomo: "Leipomo", kahvila: "Kahvila", ravintola: "Ravintola",
      kampaamo: "Kampaamo", muu: "Muu ala"
    };

    function setIndustry(ala) {
      state.ala = ala;
      chips.forEach(function (c) { c.classList.toggle("active", c.getAttribute("data-ala") === ala); });
      // recommended highlight
      addonLabels.forEach(function (lbl) {
        var rec = (lbl.getAttribute("data-rec") || "").split(",");
        lbl.classList.toggle("recommended", ala && rec.indexOf(ala) !== -1);
      });
      summaryAla.textContent = ala ? ("Toimiala: " + ALA_LABEL[ala]) : "Valitse toimiala aloittaaksesi";
      render();
    }

    chips.forEach(function (c) {
      c.addEventListener("click", function () { setIndustry(c.getAttribute("data-ala")); });
    });

    function syncSelectedClasses() {
      document.querySelectorAll("#scopeGroup .opt").forEach(function (lbl) {
        var inp = lbl.querySelector("input");
        lbl.classList.toggle("selected", inp.checked);
      });
      addonLabels.forEach(function (lbl) {
        var inp = lbl.querySelector("input");
        lbl.classList.toggle("selected", inp.checked);
      });
    }

    function render() {
      syncSelectedClasses();
      var lines = [];
      var total = 0;

      var scope = scopeInputs.filter(function (i) { return i.checked; })[0];
      if (scope) {
        var sp = parseInt(scope.getAttribute("data-price"), 10);
        total += sp;
        lines.push({ label: scope.getAttribute("data-label"), price: sp });
      }
      addonInputs.forEach(function (i) {
        if (i.checked) {
          var p = parseInt(i.getAttribute("data-price"), 10);
          total += p;
          lines.push({ label: i.getAttribute("data-label"), price: p });
        }
      });
      if (state.langs > 0) {
        var lp = state.langs * LANG_PRICE;
        total += lp;
        lines.push({ label: "Lisäkielet (" + state.langs + ")", price: lp });
      }

      var monthly = (upkeep && upkeep.checked) ? parseInt(upkeep.getAttribute("data-price"), 10) : 0;

      // paint summary
      summaryLines.innerHTML = "";
      if (lines.length === 0) {
        var li = document.createElement("li");
        li.className = "empty";
        li.textContent = "Ei vielä valintoja";
        summaryLines.appendChild(li);
      } else {
        lines.forEach(function (l) {
          var li = document.createElement("li");
          li.innerHTML = "<span>" + l.label + "</span><span>" + eur(l.price) + "</span>";
          summaryLines.appendChild(li);
        });
      }
      totalPriceEl.textContent = eur(total);
      if (monthly > 0) {
        monthlyLine.hidden = false;
        monthlyLine.innerHTML = "+ ylläpito <b>" + eur(monthly) + " / kk</b>";
      } else {
        monthlyLine.hidden = true;
      }

      // persist for the quote form
      var payload = {
        ala: state.ala ? ALA_LABEL[state.ala] : "",
        lines: lines,
        total: total,
        monthly: monthly
      };
      try { localStorage.setItem(STORE_KEY, JSON.stringify(payload)); } catch (e) {}
      if (toQuote) { toQuote.href = "tarjouspyynto.html?from=laskuri"; }
    }

    scopeInputs.forEach(function (i) { i.addEventListener("change", render); });
    addonInputs.forEach(function (i) { i.addEventListener("change", render); });
    if (upkeep) upkeep.addEventListener("change", render);

    if (langPlus) langPlus.addEventListener("click", function () {
      if (state.langs < 5) { state.langs++; langCountEl.textContent = state.langs; render(); }
    });
    if (langMinus) langMinus.addEventListener("click", function () {
      if (state.langs > 0) { state.langs--; langCountEl.textContent = state.langs; render(); }
    });

    // Preselect industry from URL (?ala=...)
    var alaParam = new URLSearchParams(window.location.search).get("ala");
    if (alaParam && ALA_LABEL[alaParam]) { setIndustry(alaParam); }
    else { render(); }
  }

  /* =========================================================
     QUOTE FORM (tarjouspyynto.html)
     ========================================================= */
  var form = document.getElementById("briefForm");
  if (form) {
    var banner = document.getElementById("prefillBanner");
    var bannerText = document.getElementById("prefillText");
    var budjettiField = document.getElementById("budjettiField");
    var toimialaSelect = document.getElementById("toimialaSelect");
    var erittelyHidden = document.getElementById("laskuriErittely");

    // Prefill from calculator
    var data = null;
    try { data = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) {}
    var cameFromCalc = new URLSearchParams(window.location.search).get("from") === "laskuri";

    if (data && (cameFromCalc || (data.lines && data.lines.length))) {
      var parts = (data.lines || []).map(function (l) { return l.label + " (" + eur(l.price) + ")"; });
      var erittelyText = parts.join(", ");
      if (data.monthly) erittelyText += " + ylläpito " + eur(data.monthly) + "/kk";
      if (erittelyHidden) erittelyHidden.value = erittelyText;

      if (budjettiField && data.total) budjettiField.value = eur(data.total);
      if (toimialaSelect && data.ala) {
        Array.prototype.slice.call(toimialaSelect.options).forEach(function (o) {
          if (o.value === data.ala) toimialaSelect.value = data.ala;
        });
      }
      if (banner) {
        banner.hidden = false;
        bannerText.textContent = data.total
          ? ("Toin valintasi hintalaskurista — arvio " + eur(data.total) + (data.monthly ? " + " + eur(data.monthly) + "/kk" : "") + ". Voit täydentää toiveitasi alla.")
          : "Toin valintasi hintalaskurista. Voit täydentää toiveitasi alla.";
      }
    }

    function collectMulti(name) {
      return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (i) { return i.value; });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form;
      var nimi = f.nimi.value.trim();
      var email = f.email.value.trim();
      if (!nimi || !email) {
        alert("Täytä nimi ja sähköposti, niin voin lähettää tarjouksen.");
        return;
      }

      var L = [];
      L.push("UUSI TARJOUSPYYNTÖ — HILLA STUDIOS");
      L.push("====================================");
      L.push("");
      L.push("YHTEYSTIEDOT");
      L.push("Nimi: " + nimi);
      if (f.yritys.value) L.push("Yritys: " + f.yritys.value);
      L.push("Sähköposti: " + email);
      if (f.puhelin.value) L.push("Puhelin: " + f.puhelin.value);
      if (f.toimiala.value) L.push("Toimiala: " + f.toimiala.value);
      L.push("");
      L.push("PROJEKTI");
      if (f.tavoite.value) L.push("Tavoite: " + f.tavoite.value);
      if (f.nykyiset.value) L.push("Nykyiset sivut: " + f.nykyiset.value);
      if (f.aikataulu.value) L.push("Aikataulu: " + f.aikataulu.value);
      if (f.budjetti.value) L.push("Budjetti: " + f.budjetti.value);
      if (erittelyHidden && erittelyHidden.value) L.push("Laskurin erittely: " + erittelyHidden.value);
      L.push("");
      L.push("VISUAALISUUS");
      var varit = collectMulti("vari"); if (varit.length) L.push("Värimaailma: " + varit.join(", "));
      var tyylit = collectMulti("tyyli"); if (tyylit.length) L.push("Tyyli: " + tyylit.join(", "));
      if (f.typografia.value) L.push("Typografia: " + f.typografia.value);
      L.push("");
      L.push("INTERAKTIIVISET ELEMENTIT");
      var toiminnot = collectMulti("toiminto");
      L.push(toiminnot.length ? toiminnot.join(", ") : "(ei valintoja)");
      L.push("");
      L.push("ESIKUVAT & LISÄTIEDOT");
      if (f.esikuva1.value) L.push("Esikuva 1: " + f.esikuva1.value);
      if (f.esikuva2.value) L.push("Esikuva 2: " + f.esikuva2.value);
      if (f.lisatiedot.value) L.push("Lisätiedot: " + f.lisatiedot.value);

      var body = L.join("\n");
      var subject = "Tarjouspyyntö — " + (f.yritys.value || nimi);
      var mailto = "mailto:sofia.krap@gmail.com"
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body);

      var toast = document.getElementById("toast");
      if (toast) { toast.classList.add("show"); setTimeout(function () { toast.classList.remove("show"); }, 4000); }

      // Open the user's mail client with everything prefilled.
      // NOTE: there is no backend here. To receive submissions automatically
      // (without opening a mail client), replace this with a POST to a form
      // service such as Formspree, Web3Forms, or your own endpoint:
      //   fetch("https://formspree.io/f/XXXX", { method:"POST", body:new FormData(form) })
      window.location.href = mailto;
    });
  }
})();

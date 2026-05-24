(function () {
  var lang = document.documentElement.lang || 'fi';
  var path = window.location.pathname;
  var inSub = path.indexOf('/sv/') !== -1 || path.indexOf('/en/') !== -1;
  var base = inSub ? '../' : '';

  var labels = {
    fi: { allTypes: 'Kaikki tyypit', facade: 'Julkisivutyöt', roof: 'Kattosaneeraus', allYears: 'Kaikki vuodet', older: 'Vanhemmat', clear: 'Tyhjennä suodatus', none: 'Ei tuloksia valituilla suodattimilla.' },
    sv: { allTypes: 'Alla typer', facade: 'Fasadarbeten', roof: 'Takrenovering', allYears: 'Alla år', older: 'Äldre', clear: 'Rensa filter', none: 'Inga resultat med valda filter.' },
    en: { allTypes: 'All types', facade: 'Facade works', roof: 'Roof renovation', allYears: 'All years', older: 'Earlier', clear: 'Clear filters', none: 'No results for the selected filters.' }
  };
  var t = labels[lang] || labels.fi;

  var map, markers = [], all = [], fType = 'all', fYear = 'all';

  var icon = L.icon({
    iconUrl: base + 'karttamerkki.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34]
  });

  function initMap() {
    map = L.map('refs-map', { scrollWheelZoom: false }).setView([60.1699, 24.9384], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
  }

  function buildPopup(p) {
    var desc = p.description[lang] || p.description.fi;
    return '<div style="width:380px;font-family:\'Barlow\',system-ui,sans-serif;display:flex;align-items:flex-start;">' +
      '<img src="' + base + p.image + '" alt="' + p.address + '" style="width:155px;height:135px;object-fit:cover;flex-shrink:0;display:block;">' +
      '<div style="padding:10px 12px;flex:1;">' +
      '<div style="font-weight:700;font-size:0.85rem;color:#1a1a1a;margin-bottom:5px;line-height:1.3;">' + p.address + ', ' + p.city + '</div>' +
      '<div style="font-size:0.76rem;color:#444;line-height:1.6;margin-bottom:7px;">' + desc + '</div>' +
      '<div style="font-size:0.72rem;color:#888;font-style:italic;">' + p.yearDisplay + '</div>' +
      '</div></div>';
  }

  function renderMarkers(projects) {
    markers.forEach(function (m) { map.removeLayer(m); });
    markers = [];
    projects.forEach(function (p) {
      var m = L.marker([p.lat, p.lng], { icon: icon })
        .addTo(map)
        .bindPopup(buildPopup(p), { maxWidth: 420 });
      m.on('mouseover', function () { this.openPopup(); });
      m.on('mouseout', function () { this.closePopup(); });
      markers.push(m);
    });
  }

  function getFiltered() {
    return all.filter(function (p) {
      if (fType !== 'all' && p.type !== fType) return false;
      if (fYear === 'all') return true;
      if (fYear === 'older') return p.year < 2021;
      return p.year === parseInt(fYear, 10);
    });
  }

  function renderList(projects) {
    var el = document.getElementById('refs-project-list');
    if (!el) return;
    if (!projects.length) {
      el.innerHTML = '<p class="refs-no-results">' + t.none + '</p>';
      return;
    }
    el.innerHTML = projects.map(function (p) {
      var desc = p.description[lang] || p.description.fi;
      return '<div class="refs-project-row fade-in">' +
        '<div class="refs-project-img"><img src="' + base + p.image + '" alt="' + p.address + '"></div>' +
        '<div class="refs-project-info">' +
        '<div class="refs-project-address">' + p.address + ', ' + p.city + '</div>' +
        '<div class="refs-project-year">' + p.yearDisplay + '</div>' +
        '<div class="refs-project-desc">' + desc + '</div>' +
        '</div></div>';
    }).join('');
    requestAnimationFrame(function () {
      el.querySelectorAll('.fade-in').forEach(function (row, i) {
        setTimeout(function () { row.classList.add('visible'); }, i * 60);
      });
    });
  }

  function applyFilters() {
    var f = getFiltered();
    renderMarkers(f);
    renderList(f);
  }

  function buildFilters() {
    var years = all.map(function (p) { return p.year; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; })
      .sort(function (a, b) { return b - a; });

    var ts = document.getElementById('refs-filter-type');
    var ys = document.getElementById('refs-filter-year');
    var cb = document.getElementById('refs-filter-clear');

    if (ts) {
      ts.innerHTML = '<option value="all">' + t.allTypes + '</option>' +
        '<option value="julkisivu">' + t.facade + '</option>' +
        '<option value="katto">' + t.roof + '</option>';
      ts.addEventListener('change', function () { fType = ts.value; applyFilters(); });
    }
    if (ys) {
      var recent = years.filter(function (y) { return y >= 2021; });
      var hasOld = years.some(function (y) { return y < 2021; });
      ys.innerHTML = '<option value="all">' + t.allYears + '</option>' +
        recent.map(function (y) { return '<option value="' + y + '">' + y + '</option>'; }).join('') +
        (hasOld ? '<option value="older">' + t.older + '</option>' : '');
      ys.addEventListener('change', function () { fYear = ys.value; applyFilters(); });
    }
    if (cb) {
      cb.textContent = t.clear;
      cb.addEventListener('click', function () {
        fType = 'all'; fYear = 'all';
        if (ts) ts.value = 'all';
        if (ys) ys.value = 'all';
        applyFilters();
      });
    }
  }

  fetch(base + 'projects.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      all = data.projects;
      initMap();
      buildFilters();
      renderMarkers(all);
      renderList(all);
    })
    .catch(function (e) { console.error('projects.json load error', e); });
})();

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('open'));
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (!isOpen) {
    document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('open'));
  }
});

// Close mobile menu on non-dropdown link click
navLinks.querySelectorAll('a:not(.has-dropdown > a)').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Desktop dropdown toggle on click (mobile: no dropdown, link navigates normally)
document.querySelectorAll('.has-dropdown > a').forEach(toggle => {
  toggle.addEventListener('click', e => {
    if (window.innerWidth <= 768) return;
    e.preventDefault();
    toggle.closest('.has-dropdown').classList.toggle('open');
  });
});

// Close dropdown when clicking outside (desktop)
document.addEventListener('click', e => {
  if (window.innerWidth <= 768) return;
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('open'));
  }
});

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children).filter(
      el => el.classList.contains('fade-in')
    );
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 75}ms`;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Active nav link highlight (homepage only)
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  function updateActiveLink() {
    const scrollY = window.scrollY + navbar.offsetHeight + 40;
    let current = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-links > li > a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ======== CONTACT FORM MODAL (mailto-based) ======== */
(function () {
  var CONTACT_EMAIL = 'marko.murkel@myrak.fi';
  var PHONE = '050 581 3227';
  var PHONE_TEL = '0505813227';

  var lang = (document.documentElement.lang || 'fi').slice(0, 2).toLowerCase();
  if (['fi', 'sv', 'en'].indexOf(lang) === -1) lang = 'fi';

  var S = {
    fi: {
      eyebrow: 'Ota yhteyttä', title: 'Lähetä viesti',
      intro: 'Täytä lomake, niin olemme yhteydessä mahdollisimman pian.',
      name: 'Nimi', email: 'Sähköposti', phone: 'Puhelin', company: 'Yritys',
      optional: '(valinnainen)', message: 'Viesti', send: 'Lähetä viesti',
      mailSubject: 'Yhteydenotto verkkosivulta',
      thanksTitle: 'Kiitos yhteydenotostasi!',
      thanksBody: 'Viestisi on lähetetty. Yritämme vastata mahdollisimman pian.',
      urgent: 'Kiireellisissä tilanteissa olkaa yhteydessä puhelimitse:',
      close: 'Sulje',
      lName: 'Nimi', lEmail: 'Sähköposti', lPhone: 'Puhelin', lCompany: 'Yritys', lMsg: 'Viesti'
    },
    sv: {
      eyebrow: 'Kontakta oss', title: 'Skicka meddelande',
      intro: 'Fyll i formuläret så kontaktar vi dig så snart som möjligt.',
      name: 'Namn', email: 'E-post', phone: 'Telefon', company: 'Företag',
      optional: '(valfritt)', message: 'Meddelande', send: 'Skicka meddelande',
      mailSubject: 'Kontakt via webbplatsen',
      thanksTitle: 'Tack för din kontakt!',
      thanksBody: 'Ditt meddelande har skickats. Vi försöker svara så snart som möjligt.',
      urgent: 'I brådskande fall, kontakta oss per telefon:',
      close: 'Stäng',
      lName: 'Namn', lEmail: 'E-post', lPhone: 'Telefon', lCompany: 'Företag', lMsg: 'Meddelande'
    },
    en: {
      eyebrow: 'Contact us', title: 'Send a message',
      intro: 'Fill in the form and we will get back to you as soon as possible.',
      name: 'Name', email: 'Email', phone: 'Phone', company: 'Company',
      optional: '(optional)', message: 'Message', send: 'Send message',
      mailSubject: 'Contact from website',
      thanksTitle: 'Thank you for your message!',
      thanksBody: 'Your message has been sent. We will try to respond as soon as possible.',
      urgent: 'In urgent cases, please contact us by phone:',
      close: 'Close',
      lName: 'Name', lEmail: 'Email', lPhone: 'Phone', lCompany: 'Company', lMsg: 'Message'
    }
  };
  var t = S[lang];

  var modal = document.createElement('div');
  modal.className = 'cf-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML =
    '<div class="cf-overlay" data-cf-close></div>' +
    '<div class="cf-dialog">' +
      '<button class="cf-close" type="button" aria-label="' + t.close + '" data-cf-close>&times;</button>' +
      '<div class="cf-form-view">' +
        '<p class="cf-eyebrow">' + t.eyebrow + '</p>' +
        '<h2 class="cf-title">' + t.title + '</h2>' +
        '<p class="cf-intro">' + t.intro + '</p>' +
        '<form class="cf-form" novalidate>' +
          '<div class="cf-field"><label>' + t.lName + '</label><input type="text" name="name" required></div>' +
          '<div class="cf-field"><label>' + t.lEmail + '</label><input type="email" name="email" required></div>' +
          '<div class="cf-field"><label>' + t.lPhone + ' <span class="cf-optional">' + t.optional + '</span></label><input type="tel" name="phone"></div>' +
          '<div class="cf-field"><label>' + t.lCompany + ' <span class="cf-optional">' + t.optional + '</span></label><input type="text" name="company"></div>' +
          '<div class="cf-field"><label>' + t.lMsg + '</label><textarea name="message" required></textarea></div>' +
          '<button type="submit" class="btn btn-primary cf-submit">' + t.send + '</button>' +
        '</form>' +
      '</div>' +
      '<div class="cf-toast-view" style="display:none;">' +
        '<div class="cf-toast-text">' +
          '<div class="cf-toast-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
          '<h3>' + t.thanksTitle + '</h3>' +
          '<p>' + t.thanksBody + '</p>' +
          '<p>' + t.urgent + '</p>' +
          '<a class="cf-toast-phone" href="tel:' + PHONE_TEL + '">' + PHONE + '</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  var dialog = modal.querySelector('.cf-dialog');
  var formView = modal.querySelector('.cf-form-view');
  var toastView = modal.querySelector('.cf-toast-view');
  var form = modal.querySelector('.cf-form');

  function openModal() {
    // Close the mobile nav if it happens to be open
    var nav = document.getElementById('navLinks');
    var ham = document.getElementById('hamburger');
    if (nav) nav.classList.remove('open');
    if (ham) ham.classList.remove('open');

    formView.style.display = '';
    toastView.style.display = 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var first = form.querySelector('input');
    if (first) setTimeout(function () { first.focus(); }, 60);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    form.reset();
  }

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-cf-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var d = new FormData(form);
    var name = (d.get('name') || '').trim();
    var email = (d.get('email') || '').trim();
    var phone = (d.get('phone') || '').trim();
    var company = (d.get('company') || '').trim();
    var message = (d.get('message') || '').trim();

    var bodyLines = [
      t.lName + ': ' + name,
      t.lEmail + ': ' + email
    ];
    if (phone) bodyLines.push(t.lPhone + ': ' + phone);
    if (company) bodyLines.push(t.lCompany + ': ' + company);
    bodyLines.push('', t.lMsg + ':', message);

    var mailto = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(t.mailSubject + (company ? ' — ' + company : '')) +
      '&body=' + encodeURIComponent(bodyLines.join('\n'));

    window.location.href = mailto;

    formView.style.display = 'none';
    toastView.style.display = '';
    if (dialog) dialog.scrollTop = 0;
  });

  // Bind triggers: top-bar CTA, mobile CTA, and any opt-in element
  function bindTriggers() {
    var triggers = document.querySelectorAll('.nav-cta, .mobile-cta-item a, [data-contact-open]');
    triggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        openModal();
      }, true);
    });
  }
  bindTriggers();
})();

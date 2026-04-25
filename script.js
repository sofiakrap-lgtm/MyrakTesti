// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on non-dropdown link click
navLinks.querySelectorAll('a:not(.has-dropdown > a)').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Mobile dropdown toggle — prevent navigation, toggle open class
document.querySelectorAll('.has-dropdown > a').forEach(toggle => {
  toggle.addEventListener('click', e => {
    if (window.innerWidth > 768) return;
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

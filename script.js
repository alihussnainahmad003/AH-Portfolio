/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .skill-card, .project-card, .stat').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

/* ── TYPEWRITER ── */
const words = ['interfaces that sing.', 'products that scale.', 'experiences people love.', 'clean, fast code.'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = words[wi];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 45 : 90);
}
type();

/* ── NAV SCROLL ── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
  // Active link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── HAMBURGER ── */
const ham = document.getElementById('hamburger');
const mMenu = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mMenu.classList.toggle('open');
  document.body.style.overflow = mMenu.classList.contains('open') ? 'hidden' : '';
});
mMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    mMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Also trigger skill bar if inside skill card
      const card = e.target.closest('.skill-card') || e.target;
      if (card.classList.contains('skill-card')) card.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Skill cards separately for bar animation
const skillCards = document.querySelectorAll('.skill-card');
const scIo = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });
skillCards.forEach(c => scIo.observe(c));

/* ── BACK TO TOP ── */
document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SEND BUTTON ── */
document.getElementById('sendBtn').addEventListener('click', function() {
  this.textContent = '✓ Message sent!';
  this.style.background = 'var(--accent2)';
  setTimeout(() => {
    this.textContent = 'Send message →';
    this.style.background = '';
  }, 2500);
});

/* ── YEAR ── */
document.getElementById('year').textContent = new Date().getFullYear();
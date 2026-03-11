// ===== PARTICLES =====
(function () {
  var container = document.getElementById('particles');
  if (!container) return;
  for (var i = 0; i < 22; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText =
      'left:' + Math.random() * 100 + '%;' +
      '--dur:' + (8 + Math.random() * 10) + 's;' +
      '--delay:-' + (Math.random() * 14) + 's;' +
      '--drift:' + ((Math.random() - 0.5) * 180) + 'px;';
    container.appendChild(p);
  }
})();

// ===== CURSOR =====
var cursor = document.getElementById('cursor');
var cursorRing = document.getElementById('cursor-ring');
var mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', function (e) {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
(function ring() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(ring);
})();
document.querySelectorAll('a, button').forEach(function (el) {
  el.addEventListener('mouseenter', function () {
    cursor.style.width = '16px'; cursor.style.height = '16px';
    cursorRing.style.width = '55px'; cursorRing.style.height = '55px';
  });
  el.addEventListener('mouseleave', function () {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    cursorRing.style.width = '38px'; cursorRing.style.height = '38px';
  });
});

// ===== NAVBAR SCROLL =====
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
var hamburger = document.getElementById('hamburger');
var mobileNav = document.getElementById('mobile-nav');
function toggleMenu() {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL =====
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        entry.target.classList.add('visible');
      }, i * 70);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .reveal-left').forEach(function (el) {
  revealObserver.observe(el);
});

// ===== SKILL BARS =====
var skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(function (bar) {
        bar.style.width = bar.getAttribute('data-w') + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

var skillSection = document.getElementById('skills-section');
if (skillSection) skillObserver.observe(skillSection);

// ===== TYPING ANIMATION =====
var words = ['Developer.', 'AI Expert.', 'Problem Solver.', 'Your Partner.'];
var wordIndex = 0, charIndex = 0, isDeleting = false;
var typedEl = document.getElementById('typed');
var cursorEl = document.getElementById('type-cursor');

if (cursorEl) {
  cursorEl.style.animation = 'blink 1s step-end infinite';
}

function typeLoop() {
  var word = words[wordIndex];
  if (!isDeleting) {
    typedEl.textContent = word.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 52 : 95);
}
if (typedEl) typeLoop();

// ===== TILT EFFECT =====
document.querySelectorAll('.proj-card, .service-card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var rect = card.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = 'translateY(-7px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg)';
  });
  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
  });
});

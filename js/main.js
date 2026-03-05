/* ===========================
   KAI MEDIA — main.js
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  // ---- NAVBAR SCROLL ----
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---- MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- STATS COUNTER ANIMATION ----
  const statNums = document.querySelectorAll('.stat__num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '+';
        animateCount(el, target, suffix);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));

  function animateCount(el, target, suffix) {
    const duration = 1800;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      el.textContent = current + (progress === 1 ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- CONTACT FORM ----
 if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Let the form submit naturally to Formspree
    // Then reset button after 3 seconds
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      btn.style.opacity = '';
    }, 3000);
  });
}

  // ---- PARALLAX HERO BG TEXT ----
  const bgText = document.querySelector('.hero__bg-text');

  if (bgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      bgText.style.transform = `translateY(calc(-55% + ${scrolled * 0.15}px))`;
    }, { passive: true });
  }

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--white)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});

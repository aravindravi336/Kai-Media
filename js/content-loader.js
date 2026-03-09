/**
 * content-loader.js
 * Fetches content from /content/settings/ JSON files
 * and updates the DOM so Tina CMS edits show on the live site.
 */

async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function loadContent() {
  const [general, hero, about, stats, seo] = await Promise.all([
    fetchJSON('/content/settings/general.json'),
    fetchJSON('/content/settings/hero.json'),
    fetchJSON('/content/settings/about.json'),
    fetchJSON('/content/settings/stats.json'),
    fetchJSON('/content/settings/seo.json'),
  ]);

  // ── GENERAL ──
  if (general) {
    // Site title
    if (general.site_title) {
      document.querySelectorAll('.nav__logo').forEach(el => el.textContent = general.site_title);
      document.querySelectorAll('.footer__logo').forEach(el => el.textContent = general.site_title);
    }
    // Email
    if (general.email) {
      document.querySelectorAll('[data-content="email"]').forEach(el => {
        el.textContent = general.email;
        if (el.tagName === 'A') el.href = `mailto:${general.email}`;
      });
    }
    // Social links
    if (general.instagram) {
      document.querySelectorAll('[data-content="instagram"]').forEach(el => {
        el.href = `https://instagram.com/${general.instagram.replace('@', '')}`;
      });
    }
    if (general.twitter) {
      document.querySelectorAll('[data-content="twitter"]').forEach(el => {
        el.href = `https://twitter.com/${general.twitter.replace('@', '')}`;
      });
    }
    if (general.linkedin) {
      document.querySelectorAll('[data-content="linkedin"]').forEach(el => {
        el.href = general.linkedin;
      });
    }
    if (general.whatsapp) {
      document.querySelectorAll('[data-content="whatsapp"]').forEach(el => {
        el.href = `https://wa.me/${general.whatsapp.replace(/\D/g, '')}`;
      });
    }
  }

  // ── HERO ──
  if (hero) {
    if (hero.tag) {
      const tag = document.querySelector('.hero__tag');
      if (tag) tag.textContent = hero.tag;
    }
    if (hero.heading1) {
      const h1line = document.querySelector('.hero__title-line1');
      if (h1line) h1line.textContent = hero.heading1;
    }
    if (hero.heading2) {
      const outline = document.querySelector('.hero__title--outline');
      if (outline) outline.textContent = hero.heading2;
    }
    if (hero.heading3) {
      const h1line3 = document.querySelector('.hero__title-line3');
      if (h1line3) h1line3.textContent = hero.heading3;
    }
    if (hero.sub) {
      const sub = document.querySelector('.hero__sub');
      if (sub) sub.textContent = hero.sub;
    }
    if (hero.cta_primary) {
      const cta = document.querySelector('.hero__actions .btn--primary');
      if (cta) cta.textContent = hero.cta_primary;
    }
    if (hero.cta_secondary) {
      const cta2 = document.querySelector('.hero__actions .btn--secondary');
      if (cta2) cta2.textContent = hero.cta_secondary;
    }
  }

  // ── ABOUT ──
  if (about) {
    if (about.heading1) {
      const h1 = document.querySelector('.about__heading-line1');
      if (h1) h1.textContent = about.heading1;
    }
    if (about.heading2) {
      const h2 = document.querySelector('.about__heading-line2');
      if (h2) h2.textContent = about.heading2;
    }
    if (about.heading3) {
      const h3 = document.querySelector('.about__heading-line3');
      if (h3) h3.textContent = about.heading3;
    }
    if (about.lead) {
      const lead = document.querySelector('.about__lead');
      if (lead) lead.textContent = about.lead;
    }
    if (about.body) {
      const body = document.querySelector('.about__body');
      if (body) body.textContent = about.body;
    }
    if (about.values && Array.isArray(about.values)) {
      const valuesContainer = document.querySelector('.about__values');
      if (valuesContainer) {
        valuesContainer.innerHTML = about.values
          .map(v => `<span class="about__value">${v.value || v}</span>`)
          .join('');
      }
    }
  }

  // ── STATS ──
  if (stats && stats.stats && Array.isArray(stats.stats)) {
    const statEls = document.querySelectorAll('.stat');
    stats.stats.forEach((stat, i) => {
      if (statEls[i]) {
        const numEl = statEls[i].querySelector('.stat__num');
        const labelEl = statEls[i].querySelector('.stat__label');
        if (numEl && stat.number !== undefined) {
          numEl.setAttribute('data-count', stat.number);
          numEl.textContent = '0';
        }
        if (labelEl && stat.label) {
          labelEl.textContent = stat.label;
        }
      }
    });
  }

  // ── SEO ──
  if (seo) {
    if (seo.meta_title) {
      document.title = seo.meta_title;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = seo.meta_title;
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.content = seo.meta_title;
    }
    if (seo.meta_description) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.content = seo.meta_description;
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.content = seo.meta_description;
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.content = seo.meta_description;
    }
    if (seo.keywords) {
      const kw = document.querySelector('meta[name="keywords"]');
      if (kw) kw.content = seo.keywords;
    }
    if (seo.og_image) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.content = seo.og_image;
    }
    if (seo.ga_id) {
      // Load Google Analytics
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${seo.ga_id}`;
      document.head.appendChild(script1);
      const script2 = document.createElement('script');
      script2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seo.ga_id}');`;
      document.head.appendChild(script2);
    }
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadContent);
} else {
  loadContent();
}

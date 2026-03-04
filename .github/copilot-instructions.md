# Kai Media — Project Guidelines

## Code Style

**CSS**: Uses CSS custom properties defined in [css/style.css](css/style.css) `:root` for all colors, fonts, spacing, and easing functions. BEM-inspired naming (e.g., `.hero__content`, `.nav__links`, `.service-card__icon`). Never hardcode colors—always reference CSS variables like `var(--accent)`, `var(--black)`, `var(--white)`.

**JavaScript**: Vanilla JS only—no frameworks. Event listeners wrapped in `DOMContentLoaded`. Use `IntersectionObserver` for scroll-based animations (see [js/main.js](js/main.js)). Maintain functional, modular structure with clear section comments.

**HTML**: Single-page layout with semantic sections (`<section id="services">`, etc.). Follow existing patterns for consistency—see [index.html](index.html) structure.

## Architecture

Static single-page marketing site with no build process. Core features:

- **Custom cursor**: Animated dual-cursor system (main + follower) using `requestAnimationFrame` (see [js/main.js](js/main.js#L7-L30))
- **Scroll reveals**: `.reveal` class with IntersectionObserver triggers `.visible` state (see [css/animations.css](css/animations.css))
- **Mobile menu**: Hamburger toggle with overlay menu and body scroll lock
- **Stats counter**: Animated number counting on scroll into view
- **Marquee hero ticker**: Pure CSS infinite scroll animation

## Build and Test

No build step required. Open [index.html](index.html) directly in a browser or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

For production deployment, see [README.md](README.md) for Cloudflare Pages, Netlify, or GitHub Pages options.

## Project Conventions

**Animations**: Staggered delays for sequential items (e.g., service cards) defined in [css/animations.css](css/animations.css#L18-L30). Use `transition-delay` increments of 0.08s-0.1s.

**Cursor hiding**: Default cursor hidden via `cursor: none` on body. Custom cursor only shown on desktop (disabled on mobile via media queries).

**Responsive spacing**: Use `clamp()` for fluid typography and spacing (e.g., `var(--section-pad): clamp(80px, 10vw, 140px)`). Mobile breakpoint at `768px`.

**Section structure**: All major sections follow this pattern:
```html
<section class="section-name" id="anchor">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">Eyebrow Text</span>
      <h2 class="section-title">Main Title</h2>
    </div>
    <!-- content -->
  </div>
</section>
```

## Integration Points

**Contact form**: Currently uses mock `setTimeout` in [js/main.js](js/main.js#L145-L165). For production, integrate:
- Netlify Forms (add `data-netlify="true"` to form)
- Formspree (set form action to Formspree endpoint)
- EmailJS (replace mock with EmailJS SDK)

**Analytics/tracking**: Add scripts before closing `</body>` tag in [index.html](index.html).

## Security

No authentication or backend. Contact form should be validated server-side when integrated. Avoid XSS by never directly injecting user input into DOM without sanitization.

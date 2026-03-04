# Kai Media — Website

A modern, minimal website for Kai Media digital marketing agency.

## File Structure

```
kai-media/
├── index.html          # Main HTML file
├── css/
│   ├── reset.css       # CSS reset / base
│   ├── style.css       # Main styles
│   └── animations.css  # Reveal & motion animations
├── js/
│   └── main.js         # Custom cursor, scroll, counter, form
└── README.md
```

## Features

- Custom animated cursor
- Scroll reveal animations
- Animated stat counters
- Mobile-responsive with hamburger menu
- Marquee ticker in hero
- Parallax hero background text
- Contact form (ready to connect to Netlify Forms or Formspree)
- Active nav highlighting on scroll

## Free Deployment Options

### Option 1: Cloudflare Pages (Recommended)
1. Go to https://pages.cloudflare.com
2. Create account → New Project → Direct Upload
3. Upload the entire `kai-media/` folder
4. Go to Custom Domains → Add your domain
5. Update your domain's nameservers to Cloudflare

### Option 2: Netlify
1. Go to https://netlify.com
2. Drag & drop the `kai-media/` folder onto the deploy area
3. Go to Domain Settings → Add custom domain
4. Point your domain DNS to Netlify

**For contact form on Netlify**, add this to the `<form>` tag in index.html:
```html
<form data-netlify="true" name="contact" method="POST" ...>
  <input type="hidden" name="form-name" value="contact" />
```

### Option 3: GitHub Pages
1. Push code to a GitHub repository
2. Go to Settings → Pages → Deploy from branch
3. Add a custom domain in Settings → Pages → Custom domain

## Customization

- **Colors**: Edit CSS variables in `css/style.css` at `:root {}`
- **Fonts**: Change Google Fonts import in `index.html` and update `--font-display` / `--font-body` variables
- **Content**: All text is in `index.html` — update service descriptions, stats, email, social links
- **Work section**: Replace gradient placeholder cards with real project screenshots

## Contact Form Backend

Replace the `setTimeout` mock in `js/main.js` with a real handler:
- **Formspree**: https://formspree.io (free tier available)
- **Netlify Forms**: Free with Netlify hosting
- **EmailJS**: https://emailjs.com

Port three more "Concept" patterns into the theme as new, independent sections you can drop into any template from the Customizer.

## 1. Countdown promo hero (new section: `sections/countdown-hero.liquid`)
- Full-bleed background image (fireside look) with dark scrim
- Rotated vertical "GET 20% OFF" pill (matches existing floating rail style)
- Centered white headline: eyebrow + two-line H1 ("Get up to 50% off / on waterproof speakers")
- Live countdown to a merchant-set target date/time: DAYS / HOURS / MINS / SECS with colon separators
- CTA pill ("Discover sales →")
- Schema settings: image, eyebrow, heading line 1, heading line 2, promo pill text, countdown datetime, CTA text, CTA link, text color

## 2. Lookbook with hotspots (new section: `sections/lookbook.liquid`)
- Eyebrow + serif heading with hand-drawn underline squiggle (reuse `circle-underline` snippet style, add a new `underline-scribble` snippet)
- Two-column layout: big lifestyle image left, product card right (title, price, "Choose options" pill)
- White circular hotspot dots on the lifestyle image, positioned by percentage (block-level x/y settings)
- Click a hotspot → swaps the right-side product card to that block's product (JS handles the swap)
- Block schema: product picker, x %, y %

## 3. Press testimonial (new section: `sections/press-testimonial.liquid`)
- Full-bleed lifestyle background with dark scrim
- Centered white quote mark glyph
- Large serif pull-quote centered
- Publication wordmark image + attribution ("— Nathan Wright, Rolling Stone")
- Schema settings: background image, quote body, publication image, attribution

## Wiring
- Add new sections to Customizer as presets (available but not auto-added to the homepage)
- Optionally slot **Press testimonial** on the home page between Guarantee and Fundraisers, and **Lookbook** between Devotion feature and Highlighted text — say the word if you want that default order
- Extend `assets/styles.css` with `.countdown-hero`, `.lookbook`, `.press-testimonial` styles
- Extend `assets/site.js` with:
  - `initCountdown()` — reads target datetime from `data-countdown-target`, updates every second, freezes at 0
  - `initLookbook()` — click hotspot swaps the visible product card (data-lookbook-item)

## Note on the "build:dev" error
That error is from the React/Vite side of the project, not the Shopify Liquid theme in this repo. Liquid theme files don't need a Vite build — Shopify compiles them at request time. Safe to ignore for the theme work. If you want, I can also stub a `build:dev` in `lovable.toml` so the preview build stops complaining, but it won't affect the theme you upload to Shopify.

## Files to add/edit
- `sections/countdown-hero.liquid` (new)
- `sections/lookbook.liquid` (new)
- `sections/press-testimonial.liquid` (new)
- `snippets/underline-scribble.liquid` (new)
- `assets/styles.css` (append)
- `assets/site.js` (append `initCountdown`, `initLookbook`)
- Optional: `templates/index.json` (insert new sections into the home order)

Reply "go" (and any placement preferences) and I'll build it.


# Rebuild theme with Concept-style layout + feature set

Keep the For Every Morning brand (Bodoni Moda + Jost, sage/gold/paper palette, devotion voice) but adopt the structural patterns and component library from the reference "Concept" theme screenshots.

## Structural changes

### 1. Announcement bar
- Social icons left (IG, FB, X).
- Center: message carousel with left/right arrows (2–3 rotating messages).
- Right: language + currency selectors (Shopify `localization` form).

### 2. Header / nav (sticky, white)
- Logo left, horizontal menu center (**Shop, Subscriptions, Devotion, Fundraisers, About, Contact**), right cluster: search icon (opens predictive-search overlay), account icon → `account.foreverymorning.com`, cart icon with badge (opens drawer).

### 3. Floating left rail
- Vertical social icons + rotated "READ THIS MONTH'S DEVOTION" pill at bottom. Desktop only. Appears on hero and product pages.

### 4. Hero (two presets)
- **Image hero**: full-bleed image, bottom-left overlay title/lede/CTA.
- **Video hero**: split layout — text + play-button badge left, framed video mockup right (from screenshot 3).
- Section setting toggles between the two.

### 5. Devotion feature (own section, below hero)
- Extracted from hero. Same devotion panel design, now with more breathing room.

### 6. Collection grid
- 3-up rounded image cards with label + item count + arrow (from screenshot 2 of earlier upload).

### 7. Highlighted text section (new — from screenshot 2 this round)
- Left: eyebrow ("Our promise"), large heading with a **hand-drawn circle/underline SVG around key words** (e.g. "written **once**", "**never** reprinted").
- Right: paragraph body.

### 8. Lookbook section (new — from screenshot 1 this round)
- Editorial hero image with pinned product tags (hotspots) that open a mini product card popover.

### 9. Product grid with badges
- New/Hot/Sale badges (top-left) + star rating (top-right) on product cards. Star rating renders empty state only unless real reviews exist (no fake reviews).

### 10. Pricing grid restyle
- Image-forward rounded cards matching the new visual language.

### 11. Product template rebuild (`main-product.liquid`)
- Two-column sticky layout. Left: media gallery with **rotating circular text badge** ("A DEVOTION ON EVERY BAG · WRITTEN ONCE ·"). Right: vendor, title, star rating (empty), price, description, **color/variant chip swatches**, quantity stepper, low-stock progress bar ("Hurry, only N left"), full-width black **Add to cart — $price** button, secondary **Buy it now** button, accordion tabs (Devotion preview / What's in the box / Shipping / Returns).
- **Sibling products** module below main: horizontal row of related bags in the same series.
- **Product tabs** module (optional block): tabbed category browser (Whole bean / Ground / Subscription).

### 12. Cookie banner (site-wide, dismissible)
- Bottom-center card with Decline / Accept. Stores choice in `localStorage`. Configurable copy.

### 13. Footer / FAQ / guarantee / email capture / sticky mobile CTA
- Keep, restyle spacing/typography to match new rhythm.

## Files touched (all in `shopify-theme/`)

**New sections**
- `sections/devotion-feature.liquid`
- `sections/collection-grid.liquid`
- `sections/highlighted-text.liquid`
- `sections/lookbook.liquid`
- `sections/hero-video.liquid`
- `sections/sibling-products.liquid`
- `sections/product-tabs.liquid`
- `sections/cookie-banner.liquid`

**Rewrites**
- `sections/announcement-bar.liquid` (carousel + localization)
- `sections/header.liquid` (nav + search overlay + sticky)
- `sections/hero.liquid` (image preset)
- `sections/main-product.liquid` (two-column, badges, stock bar, tabs, buy-it-now)
- `sections/pricing-grid.liquid` (restyled cards)
- `snippets/product-card.liquid` (badges + rating slot)

**New snippets**
- `snippets/floating-rail.liquid`
- `snippets/circle-text.liquid` (rotating SVG text)
- `snippets/hotspot.liquid` (lookbook pin)
- `snippets/icon-search.liquid`, `snippets/icon-user.liquid`, `snippets/icon-facebook.liquid`, `snippets/icon-instagram.liquid`, `snippets/icon-x.liquid`, `snippets/icon-youtube.liquid`, `snippets/icon-arrow-right.liquid`, `snippets/icon-play.liquid`, `snippets/icon-star.liquid`

**Assets**
- `assets/styles.css` — utilities for floating rail, hero variants, collection cards, highlighted-text circle, lookbook hotspots, sticky product columns, circular text badge, stock bar, cookie banner, product-card badges, sibling products carousel, product tabs.
- `assets/site.js` — announcement carousel, sticky header shadow, predictive-search overlay, hotspot popovers, product-tabs switcher, sibling-products drag scroll, cookie-banner logic, quantity stepper, low-stock bar fill from data attribute.

**Templates**
- `templates/index.json` — new section order.
- `templates/product.json` — wire rebuilt main-product + sibling-products block.

## Non-goals

- No product data changes, no Shopify admin changes, no React rewrite.
- Reviews: UI structure only, no seeded reviews (per store policy).

## Delivery

- Build all above and package a fresh `for-every-morning-shopify-theme.zip`.
- You upload it (or push to `mtidevo/morning-devotion-store` main) — same flow as before.

## Optional (nice-to-have, only if you want)

1. Hero image and/or hero video upload — otherwise I'll use image_picker placeholders you can fill in Theme Customizer.
2. Confirm nav labels (Shop, Subscriptions, Devotion, Fundraisers, About, Contact).
3. Circle-highlight words on the highlighted-text section — I'll default to "written once" and "never reprinted"; editable in the customizer.

Reply "go" (with any answers) and I'll switch to build and ship the new ZIP.

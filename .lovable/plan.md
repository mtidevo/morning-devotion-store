Add the next batch of "Concept" patterns as opt-in theme features. All are drop-in; none replace existing sections.

## PDP upgrades (edit `sections/main-product.liquid`)
- **Color swatches with image previews** — when an option is named "Color" and each variant has an image, render circular image swatches (like the Air Beats reference). Selecting a swatch swaps the main product image and updates the hidden variant ID.
- **Popular upgrades / cross-sell card** — a bordered card under the buy box listing add-on products from a metafield or theme editor picker. Each row: thumbnail, title, price, checkbox. Checked items are added to the cart alongside the main product via a single form submit. Card is dismissible.
- Small **star-rating pill** next to the price (from a `product.metafields.reviews.rating` metafield — no fake ratings; renders nothing if absent).

## Free-shipping progress bar (new snippet `snippets/shipping-bar.liquid`, called from cart drawer / cart page)
- Threshold set in theme settings (default $40).
- Live message: "Spend $X more to reach free shipping" → "You've unlocked free shipping."
- Slim gradient progress bar underneath.

## Sticky add-to-cart bar (new section `sections/sticky-atc.liquid`, opt-in on product template)
- Appears on scroll past the buy box on PDPs.
- Left: thumbnail + product title + variant.
- Right: price + "Add to cart" button that submits the current PDP form.

## Popup newsletter (new section `sections/popup-newsletter.liquid`)
- Timed or exit-intent modal (settings toggle).
- Image left, form right ("Sign up and get 20% off your first order"), Shopify customer form for email capture.
- Dismiss state stored in `localStorage` (30-day cooldown).

## Countdown-timer strip on PDP (extend `sections/main-product.liquid`)
- Optional small "Hurry up! 04d : 20h : 48m : 17s" bar under the price when a target datetime is set on the product (via metafield or section setting).
- Reuses `initCountdown` from `assets/site.js`.

## Cart notes toggle (edit `sections/main-cart.liquid` if present, else new `sections/main-cart.liquid`)
- Collapsible "Order special instructions" panel with a textarea posting to `cart.attributes[note]` on update.

## Mega menu (extend `sections/header.liquid` + new `sections/header-megamenu.liquid` block)
- Header link with `mega:` prefix in the linklist handle opens a full-width panel on hover/focus.
- Grid of collection cards (image + title) driven by section blocks in a new "Mega menu" section paired to a menu handle.
- Keyboard/ARIA accessible; closes on outside click / Esc.

## Internationalization block (already partly in announcement bar)
- Move the language + country/currency switchers into the header on desktop (small chip in the actions area) in addition to the announcement bar dropdowns, using the existing `{% form 'localization' %}` pattern. Toggle via header setting.

## Before/after slider (new section `sections/before-after.liquid`)
- Two images (before / after), draggable divider with a circular handle. Great for "vibrant headphone choices" style comparisons or bag-back reveal. Pure CSS+JS, no library.

## Files to add/edit
- Edit: `sections/main-product.liquid`, `sections/header.liquid`, `assets/styles.css`, `assets/site.js`
- New: `sections/sticky-atc.liquid`, `sections/popup-newsletter.liquid`, `sections/main-cart.liquid`, `sections/header-megamenu.liquid`, `sections/before-after.liquid`, `snippets/shipping-bar.liquid`, `snippets/upgrade-row.liquid`

## Notes
- Everything is opt-in from the Customizer so upload → toggle. Nothing is auto-added to templates.
- The "build:dev" error is from the Vite/React side of the project, not the Shopify Liquid theme. Ignore for theme work, or say the word and I'll stub `build:dev` in `lovable.toml` to quiet the preview.
- No fake reviews — the rating pill only renders if a real reviews metafield is set.

Reply "go" (and flag any you want skipped) and I'll build them in one pass.

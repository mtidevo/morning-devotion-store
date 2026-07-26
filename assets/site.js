/* For Every Morning — Shopify theme scripts */

(function () {
  'use strict';

  // FAQ accordion
  function initFAQ() {
    const faqLists = document.querySelectorAll('.faq-list');
    faqLists.forEach(function (list) {
      const questions = list.querySelectorAll('.faq-question');
      questions.forEach(function (question) {
        question.addEventListener('click', function () {
          const item = question.closest('.faq-item');
          const answer = item.querySelector('.faq-answer');
          const isOpen = question.getAttribute('aria-expanded') === 'true';

          questions.forEach(function (q) {
            q.setAttribute('aria-expanded', 'false');
            q.closest('.faq-item').querySelector('.faq-answer').hidden = true;
            const m = q.querySelector('.icon-minus'); if (m) m.classList.add('hidden');
            const p = q.querySelector('.icon-plus'); if (p) p.classList.remove('hidden');
          });

          if (!isOpen) {
            question.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
            const m = question.querySelector('.icon-minus'); if (m) m.classList.remove('hidden');
            const p = question.querySelector('.icon-plus'); if (p) p.classList.add('hidden');
          }
        });
      });
    });
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', function () {
      const isOpen = mobileMenu.hidden;
      mobileMenu.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Sticky mobile CTA
  function initStickyCTA() {
    const cta = document.querySelector('.sticky-mobile-cta');
    if (!cta) return;

    const show = function () {
      if (window.scrollY > 300) cta.classList.add('is-visible');
      else cta.classList.remove('is-visible');
    };

    window.addEventListener('scroll', show, { passive: true });
    show();
  }

  // Product card variant selection helper
  function initProductCards() {
    document.querySelectorAll('.product-card-form').forEach(function (form) {
      const select = form.querySelector('select[name="id"]');
      if (!select) return;
      select.addEventListener('change', function () {
        const selectedOption = select.options[select.selectedIndex];
        const price = selectedOption.dataset.price;
        const priceEl = form.closest('.product-card').querySelector('.product-card-price-amount');
        if (price && priceEl) priceEl.textContent = price;
      });
    });
  }

  // Header shadow on scroll
  function initHeaderShadow() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    const onScroll = function () {
      if (window.scrollY > 10) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Announcement bar carousel
  function initAnnouncement() {
    document.querySelectorAll('[data-announcement]').forEach(function (bar) {
      const slides = bar.querySelectorAll('[data-announcement-slide]');
      if (slides.length < 2) return;
      let i = 0;
      const go = function (n) {
        slides[i].classList.remove('is-active');
        i = (n + slides.length) % slides.length;
        slides[i].classList.add('is-active');
      };
      const prev = bar.querySelector('[data-announcement-prev]');
      const next = bar.querySelector('[data-announcement-next]');
      if (prev) prev.addEventListener('click', function () { go(i - 1); reset(); });
      if (next) next.addEventListener('click', function () { go(i + 1); reset(); });
      let timer = setInterval(function () { go(i + 1); }, 5000);
      function reset() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 5000); }
    });
  }

  // Search overlay
  function initSearch() {
    const overlay = document.querySelector('[data-search-overlay]');
    const openBtn = document.querySelector('[data-search-open]');
    const closeBtn = document.querySelector('[data-search-close]');
    if (!overlay || !openBtn) return;
    openBtn.addEventListener('click', function () {
      overlay.hidden = false;
      const inp = overlay.querySelector('input'); if (inp) inp.focus();
    });
    if (closeBtn) closeBtn.addEventListener('click', function () { overlay.hidden = true; });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') overlay.hidden = true; });
  }

  // Cookie banner
  function initCookieBanner() {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    try {
      if (localStorage.getItem('fem-cookies') !== null) return;
    } catch (e) {}
    setTimeout(function () { banner.hidden = false; }, 800);
    const dismiss = function (val) {
      try { localStorage.setItem('fem-cookies', val); } catch (e) {}
      banner.hidden = true;
    };
    const accept = banner.querySelector('[data-cookie-accept]');
    const decline = banner.querySelector('[data-cookie-decline]');
    if (accept) accept.addEventListener('click', function () { dismiss('accepted'); });
    if (decline) decline.addEventListener('click', function () { dismiss('declined'); });
  }

  // PDP interactions: swatches, qty, thumbs, tabs
  function initPDP() {
    // Swatch active state (visual only; actual variant selection needs Shopify variant JSON)
    document.querySelectorAll('.pdp-swatches').forEach(function (group) {
      group.addEventListener('change', function (e) {
        if (e.target.matches('input[type="radio"]')) {
          group.querySelectorAll('.pdp-swatch').forEach(function (s) { s.classList.remove('is-active'); });
          const label = e.target.closest('.pdp-swatch');
          if (label) label.classList.add('is-active');
        }
      });
    });

    // Quantity
    document.querySelectorAll('.pdp-qty').forEach(function (qty) {
      const input = qty.querySelector('[data-pdp-qty]');
      const minus = qty.querySelector('[data-pdp-qty-minus]');
      const plus = qty.querySelector('[data-pdp-qty-plus]');
      if (!input) return;
      if (minus) minus.addEventListener('click', function () {
        input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      if (plus) plus.addEventListener('click', function () {
        input.value = parseInt(input.value || '1', 10) + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    // Thumbs
    document.querySelectorAll('[data-pdp-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const url = thumb.getAttribute('data-pdp-thumb');
        const main = document.querySelector('.pdp-main-image img');
        if (main && url) main.src = url;
        document.querySelectorAll('.pdp-thumb').forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });

    // Tabs
    document.querySelectorAll('[data-pdp-tabs]').forEach(function (tabs) {
      const nav = tabs.querySelectorAll('[data-pdp-tab]');
      const panels = tabs.querySelectorAll('[data-pdp-panel]');
      nav.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const key = btn.getAttribute('data-pdp-tab');
          nav.forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
          panels.forEach(function (p) {
            const isMatch = p.getAttribute('data-pdp-panel') === key;
            p.hidden = !isMatch;
            p.classList.toggle('is-active', isMatch);
          });
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFAQ();
    initMobileMenu();
    initStickyCTA();
    initProductCards();
    initHeaderShadow();
    initAnnouncement();
    initSearch();
    initCookieBanner();
    initPDP();
    initCountdown();
    initLookbook();
  });

  // ---------- Countdown ----------
  function initCountdown() {
    document.querySelectorAll('[data-countdown-target]').forEach(function (el) {
      const targetStr = el.getAttribute('data-countdown-target');
      const target = targetStr ? new Date(targetStr).getTime() : NaN;
      if (!target || isNaN(target)) return;
      const d = el.querySelector('[data-countdown-days]');
      const h = el.querySelector('[data-countdown-hours]');
      const m = el.querySelector('[data-countdown-mins]');
      const s = el.querySelector('[data-countdown-secs]');
      const pad = function (n) { return n < 10 ? '0' + n : String(n); };
      const tick = function () {
        const diff = Math.max(0, target - Date.now());
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        if (d) d.textContent = String(days);
        if (h) h.textContent = pad(hours);
        if (m) m.textContent = pad(mins);
        if (s) s.textContent = pad(secs);
        if (diff <= 0) clearInterval(id);
      };
      tick();
      const id = setInterval(tick, 1000);
    });
  }

  // ---------- Lookbook ----------
  function initLookbook() {
    document.querySelectorAll('[data-lookbook]').forEach(function (root) {
      const hotspots = root.querySelectorAll('[data-lookbook-hotspot]');
      const cards = root.querySelectorAll('[data-lookbook-card]');
      hotspots.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const id = btn.getAttribute('data-lookbook-hotspot');
          hotspots.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
          cards.forEach(function (c) {
            c.classList.toggle('is-active', c.getAttribute('data-lookbook-card') === id);
          });
        });
      });
    });
  }
})();


// ============================================================
// Concept-inspired feature scripts
// ============================================================
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // ---------- PDP: image color swatches + variant sync ----------
  function initColorSwatches() {
    document.querySelectorAll('.pdp-swatches--image').forEach(function (group) {
      group.addEventListener('change', function (e) {
        if (!e.target.matches('input[type="radio"]')) return;
        group.querySelectorAll('.pdp-swatch--image').forEach(function (s) { s.classList.remove('is-active'); });
        var label = e.target.closest('.pdp-swatch--image');
        if (label) label.classList.add('is-active');
        var valLabel = group.closest('.pdp-option').querySelector('[data-pdp-color-value]');
        if (valLabel) valLabel.textContent = e.target.value;
        // If the label has a background image, swap the main product image
        var url = label && label.style.backgroundImage && label.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
        if (url && url[1]) {
          var main = document.querySelector('[data-pdp-main-img]');
          if (main) main.src = url[1].replace(/width=\d+/, 'width=1200');
        }
      });
    });
  }

  // ---------- PDP: popular upgrades card ----------
  function initUpgrades() {
    var closer = document.querySelector('[data-pdp-upgrades-close]');
    if (closer) closer.addEventListener('click', function () {
      var card = closer.closest('[data-pdp-upgrades]');
      if (card) card.hidden = true;
    });
    // On PDP submit, POST selected upgrades to /cart/add.js alongside the main form.
    var form = document.querySelector('[data-pdp-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var checks = document.querySelectorAll('.upgrade-check:checked');
      if (!checks.length) return;
      e.preventDefault();
      var mainId = form.querySelector('[data-pdp-variant-id]').value;
      var mainQty = parseInt(form.querySelector('[data-pdp-qty]').value || '1', 10);
      var items = [{ id: mainId, quantity: mainQty }];
      checks.forEach(function (c) { items.push({ id: c.getAttribute('data-upgrade-variant'), quantity: 1 }); });
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ items: items })
      }).then(function () { window.location.href = '/cart'; })
        .catch(function () { form.submit(); });
    });
  }

  // ---------- Sticky ATC ----------
  function initStickyATC() {
    var bar = document.querySelector('[data-sticky-atc]');
    if (!bar) return;
    var pdpForm = document.querySelector('[data-pdp-form]');
    var addBtn = document.querySelector('.pdp-add');
    if (!pdpForm || !addBtn) return;
    var onScroll = function () {
      var rect = addBtn.getBoundingClientRect();
      var below = rect.bottom < 0 || rect.top > window.innerHeight;
      bar.hidden = !below;
      bar.classList.toggle('is-visible', below);
      bar.setAttribute('aria-hidden', below ? 'false' : 'true');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var submit = bar.querySelector('[data-sticky-atc-submit]');
    if (submit) submit.addEventListener('click', function () {
      if (typeof pdpForm.requestSubmit === 'function') pdpForm.requestSubmit();
      else pdpForm.submit();
    });
    // Reflect variant/price updates
    pdpForm.addEventListener('change', function () {
      var price = document.querySelector('[data-pdp-price]');
      var stickyPrice = bar.querySelector('[data-sticky-atc-price]');
      if (price && stickyPrice) stickyPrice.textContent = price.textContent;
    });
  }

  // ---------- Popup newsletter ----------
  function initPopup() {
    var pop = document.querySelector('[data-popup-newsletter]');
    if (!pop) return;
    var cooldownDays = parseInt(pop.getAttribute('data-cooldown') || '30', 10);
    var delay = parseInt(pop.getAttribute('data-delay') || '6', 10) * 1000;
    var exitOn = pop.getAttribute('data-exit-intent') === '1';
    var key = 'fem-popup-newsletter';
    try {
      var stored = localStorage.getItem(key);
      if (stored) {
        var last = parseInt(stored, 10);
        if (!isNaN(last) && Date.now() - last < cooldownDays * 86400000) return;
      }
    } catch (e) {}
    var shown = false;
    var show = function () {
      if (shown) return;
      shown = true;
      pop.hidden = false;
      pop.setAttribute('aria-hidden', 'false');
    };
    var dismiss = function () {
      pop.hidden = true;
      pop.setAttribute('aria-hidden', 'true');
      try { localStorage.setItem(key, String(Date.now())); } catch (e) {}
    };
    setTimeout(show, delay);
    if (exitOn) {
      document.addEventListener('mouseout', function (e) {
        if (!e.relatedTarget && e.clientY <= 0) show();
      });
    }
    pop.querySelectorAll('[data-popup-close]').forEach(function (b) { b.addEventListener('click', dismiss); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) dismiss(); });
  }

  // ---------- Mega menu ----------
  function initMegaMenu() {
    var menus = document.querySelectorAll('[data-mega-menu]');
    if (!menus.length) return;
    var byTrigger = {};
    menus.forEach(function (m) { byTrigger[m.getAttribute('data-mega-trigger')] = m; });
    var links = document.querySelectorAll('[data-nav-link]');
    var openMenu = null;
    var closeAll = function () {
      menus.forEach(function (m) { m.hidden = true; m.setAttribute('aria-hidden', 'true'); });
      openMenu = null;
    };
    var open = function (m) {
      if (openMenu === m) return;
      closeAll();
      m.hidden = false;
      m.setAttribute('aria-hidden', 'false');
      openMenu = m;
    };
    links.forEach(function (link) {
      var title = link.getAttribute('data-nav-title');
      var m = byTrigger[title];
      if (!m) return;
      link.addEventListener('mouseenter', function () { open(m); });
      link.addEventListener('focus', function () { open(m); });
    });
    document.addEventListener('mousemove', function (e) {
      if (!openMenu) return;
      var withinMenu = openMenu.contains(e.target);
      var withinHeader = e.target.closest && e.target.closest('.site-header');
      if (!withinMenu && !withinHeader) closeAll();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  }

  // ---------- Before / after slider ----------
  function initBeforeAfter() {
    document.querySelectorAll('[data-ba]').forEach(function (root) {
      var clip = root.querySelector('[data-ba-clip]');
      var handle = root.querySelector('[data-ba-handle]');
      if (!clip || !handle) return;
      var dragging = false;
      var setPos = function (pctRaw) {
        var pct = Math.max(0, Math.min(100, pctRaw));
        clip.style.width = pct + '%';
        handle.style.left = pct + '%';
        var innerImg = clip.querySelector('.ba-img--before');
        if (innerImg) innerImg.style.width = (100 / (pct / 100)) + '%';
      };
      var fromEvent = function (e) {
        var rect = root.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        setPos((x / rect.width) * 100);
      };
      var start = function (e) { dragging = true; fromEvent(e); e.preventDefault(); };
      var move = function (e) { if (dragging) fromEvent(e); };
      var end = function () { dragging = false; };
      handle.addEventListener('mousedown', start);
      handle.addEventListener('touchstart', start, { passive: false });
      window.addEventListener('mousemove', move);
      window.addEventListener('touchmove', move, { passive: true });
      window.addEventListener('mouseup', end);
      window.addEventListener('touchend', end);
      root.addEventListener('click', function (e) { if (e.target === root || e.target.classList.contains('ba-img--after')) fromEvent(e); });
      setPos(50);
    });
  }

  ready(function () {
    initColorSwatches();
    initUpgrades();
    initStickyATC();
    initPopup();
    initMegaMenu();
    initBeforeAfter();
  });
})();

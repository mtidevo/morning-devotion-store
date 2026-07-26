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


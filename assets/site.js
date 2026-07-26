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

          // Close all others in this list
          questions.forEach(function (q) {
            q.setAttribute('aria-expanded', 'false');
            q.closest('.faq-item').querySelector('.faq-answer').hidden = true;
            q.querySelector('.icon-minus').classList.add('hidden');
            q.querySelector('.icon-plus').classList.remove('hidden');
          });

          if (!isOpen) {
            question.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
            question.querySelector('.icon-minus').classList.remove('hidden');
            question.querySelector('.icon-plus').classList.add('hidden');
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
      if (window.scrollY > 300) {
        cta.classList.add('is-visible');
      } else {
        cta.classList.remove('is-visible');
      }
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
        if (price && priceEl) {
          priceEl.textContent = price;
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFAQ();
    initMobileMenu();
    initStickyCTA();
    initProductCards();
  });
})();

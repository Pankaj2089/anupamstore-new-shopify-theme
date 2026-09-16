(function () {
  const page = document.body.classList.contains('template-product');
  if (!page) return;

  function initGallery() {
    const root = document.querySelector('[data-gallery]');
    const main = document.querySelector('[data-gallery-main] img');
    const thumbs = Array.from(document.querySelectorAll('.pdp-thumb'));
    const dots = Array.from(document.querySelectorAll('.pdp-dot'));
    const track = document.querySelector('[data-thumbs]');
    if (!root || !main || !thumbs.length) return;

    const sources = thumbs.map((thumb) => thumb.getAttribute('data-full') || thumb.querySelector('img')?.getAttribute('src') || '');
    let index = Math.max(0, thumbs.findIndex((thumb) => thumb.classList.contains('is-active')));

    function setIndex(next) {
      const total = sources.length;
      const target = ((next % total) + total) % total;
      index = target;
      if (sources[index]) {
        main.classList.add('is-fading');
        window.setTimeout(() => {
          main.src = sources[index];
          if (main.hasAttribute('data-mfp-src')) main.setAttribute('data-mfp-src', sources[index]);
          main.setAttribute('data-image-id', thumbs[index].getAttribute('data-image-id') || '');
          main.classList.remove('is-fading');
        }, 120);
      }
      thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === index);
        if (i === index) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      const active = thumbs[index];
      if (active && track) {
        const horizontal = window.matchMedia('(max-width: 767px)').matches;
        if (horizontal) track.scrollTo({ left: active.offsetLeft - 8, behavior: 'smooth' });
        else track.scrollTo({ top: active.offsetTop - 8, behavior: 'smooth' });
      }
    }

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIndex(Number(thumb.getAttribute('data-index')));
      });
    });
    dots.forEach((dot) => {
      dot.addEventListener('click', () => setIndex(Number(dot.getAttribute('data-index'))));
    });
    document.querySelector('[data-gallery-prev]')?.addEventListener('click', (event) => {
      event.preventDefault();
      setIndex(index - 1);
    });
    document.querySelector('[data-gallery-next]')?.addEventListener('click', (event) => {
      event.preventDefault();
      setIndex(index + 1);
    });

    const scrollThumbs = (dir) => {
      if (!track) return;
      const amount = 74;
      if (window.matchMedia('(max-width: 767px)').matches) track.scrollBy({ left: dir * amount, behavior: 'smooth' });
      else track.scrollBy({ top: dir * amount, behavior: 'smooth' });
    };
    document.querySelector('[data-thumbs-prev]')?.addEventListener('click', (event) => {
      event.preventDefault();
      scrollThumbs(-1);
    });
    document.querySelector('[data-thumbs-next]')?.addEventListener('click', (event) => {
      event.preventDefault();
      scrollThumbs(1);
    });

    let startX = 0;
    const stage = document.querySelector('.pdp-stage');
    stage?.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    stage?.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      setIndex(dx < 0 ? index + 1 : index - 1);
    }, { passive: true });
  }

  function initAccordions() {
    document.addEventListener('click', (event) => {
      const toggle = event.target.closest('.pdp-acc-toggle');
      if (!toggle) return;
      event.preventDefault();
      const item = toggle.closest('.pdp-acc-item');
      const open = item.classList.contains('is-open');
      document.querySelectorAll('.pdp-acc-item').forEach((row) => {
        row.classList.remove('is-open');
        row.querySelector('.pdp-acc-toggle')?.setAttribute('aria-expanded', 'false');
        const icon = row.querySelector('.pdp-acc-toggle .material-symbols-outlined');
        if (icon) icon.textContent = 'add';
      });
      if (!open) {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        const icon = toggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'remove';
      }
    });
  }

  function initQuantity() {
    const input = document.querySelector('#product-qty .quantity__input, .pdp-qty .quantity__input');
    if (!input) return;
    const clamp = (value) => {
      const n = parseInt(value, 10);
      if (Number.isNaN(n) || n < 1) return 1;
      return Math.min(99, n);
    };
    document.querySelector('#product-qty [name="minus"], .pdp-qty [name="minus"]')?.addEventListener('click', () => {
      input.value = String(clamp(Number(input.value) - 1));
    });
    document.querySelector('#product-qty [name="plus"], .pdp-qty [name="plus"]')?.addEventListener('click', () => {
      input.value = String(clamp(Number(input.value) + 1));
    });
  }

  function initBuyLabel() {
    document.querySelectorAll('.shopify-payment-button__button, .shopify-payment-button button').forEach((btn) => {
      const label = (btn.textContent || '').replace(/\s+/g, ' ').trim();
      if (/buy it now/i.test(label)) {
        Array.from(btn.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.textContent = ' Buy Now ';
        });
        if (!btn.childNodes.length || !/buy now/i.test(btn.textContent || '')) {
          btn.textContent = 'Buy Now';
        }
      }
    });
  }

  initGallery();
  initAccordions();
  initQuantity();
  initBuyLabel();
  const buyRoot = document.querySelector('.pdp-cta, .product-form__buttons');
  if (buyRoot && window.MutationObserver) {
    const observer = new MutationObserver(initBuyLabel);
    observer.observe(buyRoot, { childList: true, subtree: true, characterData: true });
  }
})();

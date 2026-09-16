(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function initSlider(wrapper, options = {}) {
    const track = options.track || $('[data-slider-track]', wrapper) || $('.slider-track', wrapper);
    if (!track) return null;

    const prev = options.prev || $('[data-slider-prev]', wrapper) || $('.slider-btn.prev', wrapper);
    const next = options.next || $('[data-slider-next]', wrapper) || $('.slider-btn.next', wrapper);
    const loop = Boolean(options.loop);

    const amount = () => {
      const item = track.querySelector('[data-slider-item], .product-card, .category-item, .brand-card, .hero-slide, .promo-slide, .deal-card');
      if (!item) return track.clientWidth * 0.8;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap) || 16;
      return item.getBoundingClientRect().width + gap;
    };

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth - 2);

    const sync = () => {
      const max = maxScroll();
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= max;
      if (prev) prev.disabled = !loop && atStart;
      if (next) next.disabled = !loop && atEnd;
    };

    const go = (dir) => {
      const max = maxScroll();
      if (loop) {
        if (dir > 0 && track.scrollLeft >= max) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }
        if (dir < 0 && track.scrollLeft <= 2) {
          track.scrollTo({ left: max, behavior: 'smooth' });
          return;
        }
      }
      track.scrollBy({ left: dir * amount(), behavior: 'smooth' });
    };

    prev && prev.addEventListener('click', () => go(-1));
    next && next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    return { track, go, sync };
  }

  $$('[data-slider]').forEach((wrapper) => {
    initSlider(wrapper, {
      loop: wrapper.classList.contains('hero-slider')
        || wrapper.classList.contains('promo-banner')
        || wrapper.querySelector('.hero-track')
    });
  });

  const dealsWrap = $('.deals-slider');
  if (dealsWrap) {
    const deals = initSlider(dealsWrap);
    $('[data-deals-prev]')?.addEventListener('click', () => deals && deals.go(-1));
    $('[data-deals-next]')?.addEventListener('click', () => deals && deals.go(1));
  }

  const featuredWrap = $('.featured-slider');
  if (featuredWrap) {
    const featured = initSlider(featuredWrap);
    $('[data-featured-prev]')?.addEventListener('click', () => featured && featured.go(-1));
    $('[data-featured-next]')?.addEventListener('click', () => featured && featured.go(1));
  }

  const hero = $('.hero-slider');
  if (hero) {
    const heroSlider = initSlider(hero, { loop: true });
    const autoplay = hero.getAttribute('data-autoplay');
    if (heroSlider && autoplay && autoplay !== 'false') {
      const speed = parseInt(hero.getAttribute('data-autoplay-speed'), 10) || 5000;
      setInterval(() => heroSlider.go(1), speed);
    }
  }

  const searchToggle = $('.search-toggle');
  const headerSearch = $('form.header-search') || $('.header-search');
  const searchWrap = $('.header-search-wrap') || $('.site-header__search');
  const searchHome = headerSearch?.parentElement;
  const headerInner = headerSearch?.closest('.header-inner') || $('.header_3 .header-inner') || $('.header_3 #header-sticky');
  const setHeaderSearchOpen = (open) => {
    if (!headerSearch) return;
    headerSearch.classList.toggle('is-open', open);
    searchWrap?.classList.toggle('is-open', open);
    searchToggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && headerInner && headerSearch.parentElement !== headerInner) {
      headerInner.appendChild(headerSearch);
    } else if (!open && searchHome && headerSearch.parentElement !== searchHome) {
      searchHome.appendChild(headerSearch);
    }
    if (open) headerSearch.querySelector('input')?.focus();
  };
  searchToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHeaderSearchOpen(!headerSearch?.classList.contains('is-open'));
  });
  document.addEventListener('click', (event) => {
    if (!headerSearch?.classList.contains('is-open')) return;
    if (event.target.closest('.header-search, .header-search-wrap, .search-toggle')) return;
    setHeaderSearchOpen(false);
  });

  const secondaryNav = $('.header_3 .secondary-nav') || $('.secondary-nav');
  if (secondaryNav) {
    const isMobileNav = () => window.matchMedia('(max-width: 1023px)').matches;
    const track = $('.tt_menus_ul1.secondary-track', secondaryNav) || $('.tt_menus_ul1', secondaryNav);

    const keepLink = (text, href) => {
      const t = (text || '').toLowerCase();
      const h = (href || '').toLowerCase();
      return t.includes('blog') || t.includes('contact') || h.includes('blog') || h.includes('contact');
    };

    const appendNavLink = (href, text) => {
      if (!track) return;
      const exists = $$(':scope > .tt_menu_item > a', track).some((a) => {
        const label = (a.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        return label === text.toLowerCase() || a.getAttribute('href') === href;
      });
      if (exists) return;
      const li = document.createElement('li');
      li.className = 'tt_menu_item single anupam-promoted-link';
      const a = document.createElement('a');
      a.href = href || '#';
      const span = document.createElement('span');
      span.className = 'tt_menu_item_heading_title';
      span.textContent = text;
      a.appendChild(span);
      li.appendChild(a);
      track.appendChild(li);
    };

    const showBlogContactOnMobile = () => {
      if (!isMobileNav() || !track) return;
      $$(':scope > .more_menu', track).forEach((more) => {
        const inner = more.querySelector(':scope > ul');
        Array.from(inner ? inner.children : []).forEach((node) => track.appendChild(node));
        more.remove();
      });
      $$('.anupam-more-item', secondaryNav).forEach((moreItem) => {
        const panel = moreItem.querySelector('.tt_sub_menu_wrap');
        if (panel) {
          $$('a', panel).forEach((link) => {
            if (link.classList.contains('menu-banner') || link.querySelector('img')) return;
            const text = (link.textContent || '').replace(/\s+/g, ' ').trim();
            const href = link.getAttribute('href') || '';
            if (!text || text.toLowerCase() === 'more') return;
            if (keepLink(text, href)) appendNavLink(href, text);
          });
        }
        moreItem.classList.add('is-more-hidden');
      });
    };

    const schedulePromote = () => {
      showBlogContactOnMobile();
      setTimeout(showBlogContactOnMobile, 50);
    };
    if (window.jQuery) window.jQuery(schedulePromote);
    else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedulePromote);
    else schedulePromote();

    const navItems = $$('.tt_menus_ul1 > .tt_menu_item.tt_mm_hassub', secondaryNav);

    navItems.forEach((item, index) => {
      item.dataset.navId = String(index);
      const panel = item.querySelector(':scope > .tt_sub_menu_wrap:not(.disable)');
      if (panel) panel.dataset.navId = String(index);
      const trigger = item.querySelector(':scope > a');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });

    const getPanel = (item) => {
      const id = item.dataset.navId;
      return item.querySelector(':scope > .tt_sub_menu_wrap:not(.disable)')
        || secondaryNav.querySelector(`:scope > .tt_sub_menu_wrap[data-nav-id="${id}"]`);
    };

    const restorePanel = (item) => {
      const panel = getPanel(item);
      if (panel && panel.parentElement !== item) item.appendChild(panel);
      panel?.classList.remove('is-open-panel');
    };

    const closeNavMenus = (except) => {
      navItems.forEach((item) => {
        if (item === except) return;
        item.classList.remove('is-open');
        restorePanel(item);
        const trigger = item.querySelector(':scope > a');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    };

    document.addEventListener('click', (event) => {
      if (!isMobileNav()) return;
      const trigger = event.target.closest('.header_3 .tt_menus_ul1 > .tt_menu_item.tt_mm_hassub > a');
      if (trigger) {
        const item = trigger.parentElement;
        if (!navItems.includes(item)) return;
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !item.classList.contains('is-open');
        closeNavMenus(item);
        item.classList.toggle('is-open', willOpen);
        trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        const panel = getPanel(item);
        if (willOpen && panel) {
          secondaryNav.appendChild(panel);
          panel.classList.add('is-open-panel');
        } else {
          restorePanel(item);
        }
        return;
      }
      if (event.target.closest('.tt_sub_menu_wrap.is-open-panel a')) {
        closeNavMenus();
        return;
      }
      if (!event.target.closest('.secondary-nav')) closeNavMenus();
    }, true);

    window.addEventListener('resize', () => {
      if (!isMobileNav()) closeNavMenus();
    });
  }

  if (document.body.classList.contains('template-index')) {
    const promoSec = document.querySelector('.promo-banner')?.closest('.shopify-section');
    const featuredEl = document.querySelector('.section.featured');
    if (promoSec && featuredEl && featuredEl.parentNode) {
      featuredEl.parentNode.insertBefore(promoSec, featuredEl);
    }
  }
})();

(function () {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const cart = [];
    const wishlist = new Set();
    const compare = new Set();

    function updateBadges() {
        $$('[data-cart-count]').forEach((el) => {
            el.textContent = String(cart.length);
            el.classList.toggle('is-visible', cart.length > 0);
        });
        $$('[data-wishlist-count]').forEach((el) => {
            el.textContent = String(wishlist.size);
            el.classList.toggle('is-visible', wishlist.size > 0);
        });
    }

    function toast(message) {
        const el = $('#toast');
        if (!el) return;
        el.hidden = false;
        el.textContent = message;
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { el.hidden = true; }, 2200);
    }

    function productFrom(el) {
        const card = el.closest('[data-product]');
        if (!card) return null;
        return {
            card,
            name: card.dataset.name || 'Product',
            price: card.dataset.price || '',
            image: card.dataset.image || ''
        };
    }

    function formatPrice(value) {
        const n = Number(value);
        if (Number.isNaN(n)) return value;
        return '₹' + n.toLocaleString('en-IN');
    }

    /* Reusable slider */
    function initSlider(wrapper, options = {}) {
        const track = options.track || $('[data-slider-track]', wrapper) || $('.slider-track', wrapper);
        if (!track) return null;

        const prev = options.prev || $('[data-slider-prev]', wrapper) || $('.slider-btn.prev', wrapper);
        const next = options.next || $('[data-slider-next]', wrapper) || $('.slider-btn.next', wrapper);
        const loop = Boolean(options.loop);

        const amount = () => {
            const item = track.querySelector('[data-slider-item], .product-card, .blog-card, .category-item, .brand-card, .hero-slide, .promo-slide');
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
        const syncDeals = () => {
            if (!deals) return;
            const max = Math.max(0, deals.track.scrollWidth - deals.track.clientWidth - 2);
            const prev = $('[data-deals-prev]');
            const next = $('[data-deals-next]');
            if (prev) prev.disabled = deals.track.scrollLeft <= 2;
            if (next) next.disabled = deals.track.scrollLeft >= max;
        };
        deals?.track.addEventListener('scroll', syncDeals, { passive: true });
        window.addEventListener('resize', syncDeals);
        syncDeals();
    }

    const featuredWrap = $('.featured-slider');
    if (featuredWrap) {
        const featured = initSlider(featuredWrap);
        $('[data-featured-prev]')?.addEventListener('click', () => featured && featured.go(-1));
        $('[data-featured-next]')?.addEventListener('click', () => featured && featured.go(1));
        const syncFeatured = () => {
            if (!featured) return;
            const max = Math.max(0, featured.track.scrollWidth - featured.track.clientWidth - 2);
            const prev = $('[data-featured-prev]');
            const next = $('[data-featured-next]');
            if (prev) prev.disabled = featured.track.scrollLeft <= 2;
            if (next) next.disabled = featured.track.scrollLeft >= max;
        };
        featured?.track.addEventListener('scroll', syncFeatured, { passive: true });
        window.addEventListener('resize', syncFeatured);
        syncFeatured();
    }

    /* Mobile drawer */
    const drawer = $('#mobile-drawer');
    const overlay = $('[data-drawer-close].drawer-overlay') || $('.drawer-overlay');
    const menuBtn = $('.menu-toggle');

    function setDrawer(open) {
        if (!drawer) return;
        drawer.classList.toggle('is-open', open);
        drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (overlay) overlay.hidden = !open;
        if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) $('[data-drawer-close]', drawer)?.focus();
        else menuBtn?.focus();
    }

    menuBtn?.addEventListener('click', () => setDrawer(true));
    $$('[data-drawer-close]').forEach((btn) => btn.addEventListener('click', () => setDrawer(false)));
    overlay?.addEventListener('click', () => setDrawer(false));
    $$('#mobile-drawer a').forEach((link) => link.addEventListener('click', () => setDrawer(false)));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setDrawer(false);
            closeModal();
            $$('.secondary-nav .has-sub, .secondary-nav .has-mega').forEach((item) => item.classList.remove('is-open'));
        }
    });

    /* Desktop/touch nav menus */
    const secondaryNav = $('.secondary-nav');
    const navItems = $$('.secondary-nav .has-sub, .secondary-nav .has-mega');
    const isMobileNav = () => window.matchMedia('(max-width: 767px)').matches;

    navItems.forEach((item, index) => {
        item.dataset.navId = String(index);
        const panel = item.querySelector(':scope > .dropdown, :scope > .mega-menu');
        if (panel) panel.dataset.navId = String(index);
    });

    const getPanel = (item) => {
        const id = item.dataset.navId;
        return item.querySelector(':scope > .dropdown, :scope > .mega-menu')
            || secondaryNav?.querySelector(`:scope > [data-nav-id="${id}"]`);
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

    navItems.forEach((item) => {
        const trigger = item.querySelector(':scope > a');
        if (!trigger) return;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', (e) => {
            if (!isMobileNav()) return;
            e.preventDefault();
            const willOpen = !item.classList.contains('is-open');
            closeNavMenus(item);
            item.classList.toggle('is-open', willOpen);
            trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            const panel = getPanel(item);
            if (willOpen && panel && secondaryNav) {
                secondaryNav.appendChild(panel);
                panel.classList.add('is-open-panel');
            } else {
                restorePanel(item);
            }
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.secondary-nav')) closeNavMenus();
    });
    secondaryNav?.addEventListener('click', (e) => {
        if (!isMobileNav()) return;
        if (e.target.closest('.dropdown a, .mega-menu a')) closeNavMenus();
    });
    window.addEventListener('resize', () => {
        if (!isMobileNav()) closeNavMenus();
    });
    const searchToggle = $('.search-toggle');
    const searchForm = $('.header-search');
    searchToggle?.addEventListener('click', () => {
        const open = searchForm.classList.toggle('is-open');
        searchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) $('#site-search')?.focus();
    });

    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = $('#site-search')?.value.trim();
        toast(q ? `Searching for “${q}”` : 'Enter a product to search');
    });

    /* Product actions */
    document.addEventListener('click', (e) => {
        const wishBtn = e.target.closest('[data-wishlist]');
        if (wishBtn) {
            const item = productFrom(wishBtn);
            if (!item) return;
            if (wishlist.has(item.name)) wishlist.delete(item.name);
            else wishlist.add(item.name);
            wishBtn.classList.toggle('is-active', wishlist.has(item.name));
            wishBtn.setAttribute('aria-label', wishlist.has(item.name) ? 'Remove from wishlist' : 'Add to wishlist');
            updateBadges();
            toast(wishlist.has(item.name) ? `${item.name} saved to wishlist` : `${item.name} removed from wishlist`);
            return;
        }

        const compareBtn = e.target.closest('[data-compare]');
        if (compareBtn) {
            const item = productFrom(compareBtn);
            if (!item) return;
            if (compare.has(item.name)) compare.delete(item.name);
            else compare.add(item.name);
            compareBtn.classList.toggle('is-active', compare.has(item.name));
            toast(compare.has(item.name) ? `${item.name} added to compare` : `${item.name} removed from compare`);
            return;
        }

        const cartBtn = e.target.closest('[data-add-cart], [data-modal-add]');
        if (cartBtn) {
            if (cartBtn.hasAttribute('data-modal-add')) {
                const name = $('#quickview-title')?.textContent || 'Product';
                cart.push(name);
                updateBadges();
                toast(`${name} added to cart`);
                closeModal();
                return;
            }
            const item = productFrom(cartBtn);
            if (!item) return;
            cart.push(item.name);
            updateBadges();
            toast(`${item.name} added to cart`);
            return;
        }

        const quickBtn = e.target.closest('[data-quickview]');
        if (quickBtn) {
            const item = productFrom(quickBtn);
            if (item) openModal(item);
        }
    });

    const modal = $('#quickview');
    function openModal(item) {
        if (!modal) return;
        $('#quickview-title').textContent = item.name;
        $('#quickview-price').textContent = formatPrice(item.price);
        const img = $('#quickview-image');
        img.src = item.image;
        img.alt = item.name;
        modal.hidden = false;
        $('[data-modal-close]', modal)?.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.hidden = true;
    }

    $('[data-modal-close]')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    $('.newsletter-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = $('#newsletter-email')?.value.trim();
        if (!email) return;
        toast('Thanks for subscribing');
        e.target.reset();
    });

    /* Overflow check in development */
    function checkOverflow() {
        if (document.documentElement.scrollWidth > window.innerWidth + 1) {
            document.documentElement.classList.add('has-overflow');
        } else {
            document.documentElement.classList.remove('has-overflow');
        }
    }
    window.addEventListener('resize', checkOverflow);
    checkOverflow();

    $$('.product-image img[src*="prod-"]').forEach((img) => {
        const src = img.getAttribute('src') || '';
        if (/prod-3\.png|prod-8-/.test(src)) return;
        img.closest('.product-image')?.classList.add('has-raster-badge');
    });

    updateBadges();

    window.AnupamUI = {
        initSlider,
        toast,
        addToCart(name, qty = 1) {
            const count = Math.max(1, Number(qty) || 1);
            for (let i = 0; i < count; i += 1) cart.push(name);
            updateBadges();
            toast(count > 1 ? `${name} ×${count} added to cart` : `${name} added to cart`);
        }
    };
})();

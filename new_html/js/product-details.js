(function () {
    const Shared = window.AnupamShared;
    const catalog = window.AnupamCatalog;
    const products = window.AnupamProducts || [];
    if (!Shared || !catalog || !products.length) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');
    const product = catalog.byId(requestedId) || catalog.byId('prod-1') || products[0];
    const images = catalog.gallery(product);
    const RECENT_KEY = 'anupam-recently-viewed';
    const asset = (file) => Shared.base() + 'assets/images/' + file;
    const whatsappIcon = `<img src="${asset('pdp-whatsapp.svg')}" width="24" height="24" alt="" aria-hidden="true">`;

    const title = product.title || product.name;
    const save = Shared.savePercent(product);
    const src = Shared.base() + product.image;
    document.title = title + ' | Anupam Stores';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', title);

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function readRecent() {
        try {
            const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
            return Array.isArray(raw) ? raw.filter((id) => typeof id === 'string') : [];
        } catch (err) {
            return [];
        }
    }

    function storeRecent(id) {
        const ids = readRecent().filter((item) => item !== id);
        ids.unshift(id);
        localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, 12)));
    }

    storeRecent(product.id);

    function renderCrumb() {
        const crumb = document.querySelector('[data-pdp-crumb]');
        if (!crumb) return;
        crumb.innerHTML = `
            <a href="${Shared.home()}">Home</a>
            <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <a href="${Shared.collection()}">New Arrivals</a>
            <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <span aria-current="page">${escapeHtml(title)}</span>
        `;
    }

    function renderGallery() {
        const root = document.querySelector('[data-gallery]');
        if (!root) return;
        const base = Shared.base();
        root.innerHTML = `
            <div class="pdp-thumbs">
                <button type="button" class="pdp-thumbs-btn" data-thumbs-prev aria-label="Previous thumbnails">
                    <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_up</span>
                </button>
                <div class="pdp-thumbs-track" data-thumbs>
                    ${images.map((image, index) => `
                        <button type="button" class="pdp-thumb${index === 0 ? ' is-active' : ''}" data-index="${index}" aria-label="View image ${index + 1}"${index === 0 ? ' aria-current="true"' : ''}>
                            <img src="${base}${image}" alt="" width="64" height="64" ${index === 0 ? '' : 'loading="lazy"'}>
                        </button>
                    `).join('')}
                </div>
                <button type="button" class="pdp-thumbs-btn" data-thumbs-next aria-label="Next thumbnails">
                    <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
                </button>
            </div>
            <div class="pdp-stage">
                <button type="button" class="pdp-nav prev" data-gallery-prev aria-label="Previous product image">
                    <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                </button>
                <figure class="pdp-main" data-gallery-main>
                    <img src="${base}${images[0]}" alt="${escapeHtml(product.alt || title)}" width="800" height="800">
                </figure>
                <button type="button" class="pdp-nav next" data-gallery-next aria-label="Next product image">
                    <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                </button>
            </div>
            <div class="pdp-dots" data-gallery-dots>
                ${images.map((_, index) => `<button type="button" class="pdp-dot${index === 0 ? ' is-active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></button>`).join('')}
            </div>
        `;
    }

    function detailsContent() {
        const highlights = (product.highlights && product.highlights.length)
            ? product.highlights
            : [
                'Premium finish suited to modern interiors',
                'Designed as a decorative accent and functional piece',
                'Ideal for living rooms, bedrooms and gifting'
            ];
        const copy = product.description
            || `Add a refined accent to your home with the ${title}. Crafted as a decorative statement piece, it pairs beautifully with contemporary and classic interiors.`;
        return `
            <p>${escapeHtml(copy)}</p>
            <ul>${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            <p>Perfect for: Living Room | Bedroom | Console Table | Display Shelf | Gifting</p>
        `;
    }

    function renderInfo() {
        const info = document.querySelector('[data-pdp-info]');
        if (!info) return;
        const stockLabel = product.inStock
            ? (product.stockCount ? `${product.stockCount} In Stock` : 'Available in stock')
            : 'Out of stock';
        const sku = product.sku || product.id.toUpperCase();
        const type = product.type || 'Home & Garden';
        const waText = encodeURIComponent(`Hi Anupam Stores, I would like to order: ${title}`);
        info.setAttribute('data-product', '');
        info.dataset.id = product.id;
        info.dataset.name = product.name;
        info.dataset.price = String(product.price);
        info.dataset.image = src;
        info.innerHTML = `
            <div class="pdp-intro">
            <h1 class="pdp-title" id="pdp-title">${escapeHtml(title)}</h1>
            <dl class="pdp-meta">
                <div>
                    <dt>Product Type:</dt>
                    <dd> ${escapeHtml(type)}</dd>
                </div>
                <div>
                    <dt>Category:</dt>
                    <dd> ${escapeHtml(product.category || 'Home Decor')}</dd>
                </div>
                <div>
                    <dt>SKU:</dt>
                    <dd> ${escapeHtml(sku)}</dd>
                </div>
                <div>
                    <dt>Availability:</dt>
                    <dd class="${product.inStock ? 'pdp-stock' : ''}"> ${escapeHtml(stockLabel)}</dd>
                </div>
            </dl>
            <div class="pdp-rating" aria-label="Rated ${Number(product.rating || 5).toFixed(1)} out of 5 from ${product.reviews || 0} reviews">
                <span class="pdp-stars" aria-hidden="true">★★★★★</span>
                <span>(${product.reviews || 0} Reviews)</span>
            </div>
            </div>
            <div class="pdp-price">
                <span class="pdp-price-now">${Shared.formatPrice(product.price).replace('₹', '₹ ')}</span>
                ${product.compareAt ? `<span class="pdp-price-was">${Shared.formatPrice(product.compareAt).replace('₹', '₹ ')}</span>` : ''}
                ${save ? `<span class="pdp-save">Save -${save}%</span>` : ''}
            </div>
            <div class="pdp-actions">
                <div class="pdp-actions-top">
                    <button type="button" class="pdp-chip" data-wishlist aria-label="Add to wishlist">
                        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
                        Wishlist
                    </button>
                    <div class="pdp-qty" role="group" aria-label="Quantity">
                        <button type="button" data-qty-minus aria-label="Decrease quantity">
                            <span class="material-symbols-outlined" aria-hidden="true">remove</span>
                        </button>
                        <input id="pdp-qty" type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="Quantity" data-qty>
                        <button type="button" data-qty-plus aria-label="Increase quantity">
                            <span class="material-symbols-outlined" aria-hidden="true">add</span>
                        </button>
                    </div>
                </div>
                <div class="pdp-cta">
                    <button type="button" class="pdp-btn pdp-btn-cart" data-pdp-add ${product.inStock ? '' : 'disabled'}>
                        <span class="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
                        Add to Cart
                    </button>
                    <button type="button" class="pdp-btn pdp-btn-buy" data-pdp-buy ${product.inStock ? '' : 'disabled'}>Buy Now</button>
                </div>
                <a class="pdp-whatsapp" href="https://wa.me/919929994251?text=${waText}" target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp
                    ${whatsappIcon}
                </a>
            </div>
            <div class="pdp-benefits">
                <article class="pdp-benefit">
                    <img src="${asset('pdp-export-quality.png')}" width="50" height="50" alt="">
                    Export Quality
                </article>
                <article class="pdp-benefit">
                    <img src="${asset('pdp-original-marble.png')}" width="50" height="50" alt="">
                    100 % Original Marble
                </article>
                <article class="pdp-benefit">
                    <img src="${asset('pdp-free-delivery.png')}" width="50" height="50" alt="">
                    Free Delivery
                </article>
                <article class="pdp-benefit">
                    <img src="${asset('pdp-cod.png')}" width="50" height="50" alt="">
                    COD available
                </article>
            </div>
            <div class="pdp-acc">
                <div class="pdp-acc-item">
                    <button class="pdp-acc-toggle" type="button" aria-expanded="false">
                        Product Details
                        <span class="material-symbols-outlined" aria-hidden="true">add</span>
                    </button>
                    <div class="pdp-acc-panel">${detailsContent()}</div>
                </div>
                <div class="pdp-acc-item">
                    <button class="pdp-acc-toggle" type="button" aria-expanded="false">
                        Shipping
                        <span class="material-symbols-outlined" aria-hidden="true">add</span>
                    </button>
                    <div class="pdp-acc-panel">
                        <p>Anupam Stores delivers across India through trusted transport partners, with local delivery available in Jaipur.</p>
                        <p>Estimated delivery is 4–7 working days for most pin codes. Large furniture pieces may require additional transit time and appointment-based delivery.</p>
                    </div>
                </div>
                <div class="pdp-acc-item">
                    <button class="pdp-acc-toggle" type="button" aria-expanded="false">
                        Return Policy
                        <span class="material-symbols-outlined" aria-hidden="true">add</span>
                    </button>
                    <div class="pdp-acc-panel">
                        <p>Unused items in original packaging may be returned within 7 days of delivery, subject to inspection.</p>
                        <p>Custom, assembled or damaged-by-use products are not eligible. Please contact us before arranging a return so we can guide you through pickup or store drop-off.</p>
                    </div>
                </div>
            </div>
        `;
    }

    function initGallery() {
        const root = document.querySelector('[data-gallery]');
        const main = document.querySelector('[data-gallery-main] img');
        const thumbs = Array.from(document.querySelectorAll('.pdp-thumb'));
        const dots = Array.from(document.querySelectorAll('.pdp-dot'));
        const track = document.querySelector('[data-thumbs]');
        if (!root || !main || !images.length) return;

        let index = 0;

        function setIndex(next) {
            const total = images.length;
            const target = ((next % total) + total) % total;
            if (target === index) return;
            index = target;
            main.src = Shared.base() + images[index];
            thumbs.forEach((thumb, i) => {
                thumb.classList.toggle('is-active', i === index);
                if (i === index) thumb.setAttribute('aria-current', 'true');
                else thumb.removeAttribute('aria-current');
            });
            dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
            const active = thumbs[index];
            if (active && track) {
                const vertical = window.matchMedia('(max-width: 767px)').matches;
                if (vertical) {
                    track.scrollTo({ left: active.offsetLeft - 8, behavior: 'smooth' });
                } else {
                    track.scrollTo({ top: active.offsetTop - 8, behavior: 'smooth' });
                }
            }
        }

        thumbs.forEach((thumb) => {
            thumb.addEventListener('click', () => setIndex(Number(thumb.dataset.index)));
        });
        dots.forEach((dot) => {
            dot.addEventListener('click', () => setIndex(Number(dot.dataset.index)));
        });
        document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => setIndex(index - 1));
        document.querySelector('[data-gallery-next]')?.addEventListener('click', () => setIndex(index + 1));

        const scrollThumbs = (dir) => {
            if (!track) return;
            const amount = 74;
            if (window.matchMedia('(max-width: 767px)').matches) {
                track.scrollBy({ left: dir * amount, behavior: 'smooth' });
            } else {
                track.scrollBy({ top: dir * amount, behavior: 'smooth' });
            }
        };
        document.querySelector('[data-thumbs-prev]')?.addEventListener('click', () => scrollThumbs(-1));
        document.querySelector('[data-thumbs-next]')?.addEventListener('click', () => scrollThumbs(1));

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

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
            e.preventDefault();
            setIndex(e.key === 'ArrowLeft' ? index - 1 : index + 1);
        });
    }

    function initQuantity() {
        const input = document.querySelector('[data-qty]');
        if (!input) return;
        const clamp = (value) => {
            const n = parseInt(value, 10);
            if (Number.isNaN(n) || n < 1) return 1;
            return Math.min(99, n);
        };
        const sync = (value) => {
            input.value = String(clamp(value));
        };
        document.querySelector('[data-qty-minus]')?.addEventListener('click', () => sync(Number(input.value) - 1));
        document.querySelector('[data-qty-plus]')?.addEventListener('click', () => sync(Number(input.value) + 1));
        input.addEventListener('change', () => sync(input.value));
        input.addEventListener('blur', () => sync(input.value));
    }

    function initAccordions() {
        const items = Array.from(document.querySelectorAll('.pdp-acc-item'));
        items.forEach((item) => {
            const toggle = item.querySelector('.pdp-acc-toggle');
            const icon = toggle?.querySelector('.material-symbols-outlined');
            toggle?.addEventListener('click', () => {
                const open = !item.classList.contains('is-open');
                items.forEach((other) => {
                    other.classList.remove('is-open');
                    other.querySelector('.pdp-acc-toggle')?.setAttribute('aria-expanded', 'false');
                    const otherIcon = other.querySelector('.pdp-acc-toggle .material-symbols-outlined');
                    if (otherIcon) otherIcon.textContent = 'add';
                });
                item.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (icon) icon.textContent = open ? 'remove' : 'add';
            });
        });
    }

    function initActions() {
        const qty = () => Math.max(1, parseInt(document.querySelector('[data-qty]')?.value, 10) || 1);
        document.querySelector('[data-pdp-add]')?.addEventListener('click', () => {
            window.AnupamUI?.addToCart(product.name, qty());
        });
        document.querySelector('[data-pdp-buy]')?.addEventListener('click', () => {
            window.AnupamUI?.addToCart(product.name, qty());
        });
    }

    function fillTrack(selector, list, prevSel, nextSel, sliderSel) {
        const track = document.querySelector(selector);
        if (!track) return;
        track.innerHTML = list.map((item) => Shared.productCard(item, { slider: true })).join('');
        if (window.AnupamUI && typeof window.AnupamUI.initSlider === 'function') {
            window.AnupamUI.initSlider(document.querySelector(sliderSel), {
                prev: document.querySelector(prevSel),
                next: document.querySelector(nextSel)
            });
        }
    }

    function renderCarousels() {
        const related = catalog.related(product, 8);
        fillTrack('[data-related-track]', related, '[data-related-prev]', '[data-related-next]', '[data-related-slider]');

        const recentIds = readRecent().filter((id) => id !== product.id);
        let recent = recentIds.map((id) => catalog.byId(id)).filter(Boolean);
        if (recent.length < 4) {
            const extras = related.filter((item) => !recent.some((seen) => seen.id === item.id));
            recent = recent.concat(extras).slice(0, 8);
        }
        fillTrack('[data-recent-track]', recent, '[data-recent-prev]', '[data-recent-next]', '[data-recent-slider]');
    }

    renderCrumb();
    renderGallery();
    renderInfo();
    initGallery();
    initQuantity();
    initAccordions();
    initActions();
    renderCarousels();
})();

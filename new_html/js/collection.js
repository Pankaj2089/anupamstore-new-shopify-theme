(function () {
    const products = window.AnupamProducts || [];
    const catalog = window.AnupamCatalog || {};
    const Shared = window.AnupamShared;
    if (!Shared || !products.length) return;

    const PAGE_SIZE = 8;
    const range = catalog.priceRange ? catalog.priceRange() : { min: 0, max: 0 };

    const state = {
        categories: new Set(),
        savings: new Set(),
        brands: new Set(),
        availability: new Set(),
        minPrice: range.min,
        maxPrice: range.max,
        sort: 'featured',
        page: 1
    };

    const grid = document.querySelector('[data-collection-grid]');
    const pagination = document.querySelector('[data-pagination]');
    const bestTrack = document.querySelector('[data-bestseller-track]');
    const overlay = document.querySelector('[data-filter-overlay]');
    const drawer = document.querySelector('[data-filter-drawer]');
    const closeBtn = document.querySelector('[data-filter-close]');
    const openBtns = document.querySelectorAll('[data-filter-open]');
    const sortToggle = document.querySelector('[data-sort-toggle]');
    const sortMenu = document.querySelector('[data-sort-menu]');
    const minOutput = document.querySelector('[data-price-min-label]');
    const maxOutput = document.querySelector('[data-price-max-label]');
    const minInput = document.querySelector('[data-price-min]');
    const maxInput = document.querySelector('[data-price-max]');

    function savePercent(product) {
        return Shared.savePercent(product);
    }

    function filtered() {
        return products.filter((item) => {
            if (state.categories.size && !state.categories.has(item.category)) return false;
            if (state.brands.size && !state.brands.has(item.brand)) return false;
            if (state.availability.size) {
                const key = item.inStock ? 'in-stock' : 'out-of-stock';
                if (!state.availability.has(key)) return false;
            }
            if (state.savings.has('on-sale') && savePercent(item) <= 0) return false;
            if (state.savings.has('best-discount') && savePercent(item) < 50) return false;
            if (item.price < state.minPrice || item.price > state.maxPrice) return false;
            return true;
        });
    }

    function sorted(list) {
        const next = list.slice();
        switch (state.sort) {
            case 'best-selling':
                next.sort((a, b) => (b.sold || 0) - (a.sold || 0));
                break;
            case 'price-asc':
                next.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                next.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                next.sort((a, b) => Number(Boolean(b.newest)) - Number(Boolean(a.newest)));
                break;
            default:
                break;
        }
        return next;
    }

    function renderGrid() {
        if (!grid) return;
        const list = sorted(filtered());
        const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
        if (state.page > pages) state.page = pages;
        const start = (state.page - 1) * PAGE_SIZE;
        const pageItems = list.slice(start, start + PAGE_SIZE);

        if (!pageItems.length) {
            grid.innerHTML = '<p class="collection-empty">No products match the selected filters.</p>';
        } else {
            grid.innerHTML = pageItems.map((item) => Shared.productCard(item)).join('');
        }
        renderPagination(pages, list.length);
    }

    function renderPagination(pages) {
        if (!pagination) return;
        if (pages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        const buttons = ['<button type="button" class="page-btn" data-page="prev">Previous</button>'];
        for (let i = 1; i <= pages; i += 1) {
            buttons.push(`<button type="button" class="page-btn${i === state.page ? ' is-active' : ''}" data-page="${i}" ${i === state.page ? 'aria-current="page"' : ''}>${i}</button>`);
        }
        buttons.push('<button type="button" class="page-btn" data-page="next">Next</button>');
        pagination.innerHTML = buttons.join('');
        const prev = pagination.querySelector('[data-page="prev"]');
        const next = pagination.querySelector('[data-page="next"]');
        if (prev) prev.disabled = state.page === 1;
        if (next) next.disabled = state.page === pages;
    }

    function renderBestsellers() {
        if (!bestTrack) return;
        const list = products.filter((item) => item.bestselling).slice(0, 6);
        bestTrack.innerHTML = list.map((item) => Shared.productCard(item, { slider: true })).join('');
        if (window.AnupamUI && typeof window.AnupamUI.initSlider === 'function') {
            const wrap = bestTrack.closest('[data-bestseller-slider]');
            if (wrap) {
                window.AnupamUI.initSlider(wrap, {
                    prev: document.querySelector('[data-bestseller-prev]'),
                    next: document.querySelector('[data-bestseller-next]')
                });
            }
        }
    }

    function selectedValues(name) {
        return new Set(Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value));
    }

    function applyFiltersFromUI() {
        state.categories = selectedValues('category');
        state.savings = selectedValues('savings');
        state.brands = selectedValues('brand');
        state.availability = selectedValues('availability');
        const minVal = Number(minInput?.value || range.min);
        const maxVal = Number(maxInput?.value || range.max);
        state.minPrice = Math.min(minVal, maxVal);
        state.maxPrice = Math.max(minVal, maxVal);
        state.page = 1;
        renderGrid();
    }

    function updatePriceLabels() {
        if (minOutput) minOutput.textContent = Shared.formatPrice(Math.min(Number(minInput.value), Number(maxInput.value)));
        if (maxOutput) maxOutput.textContent = Shared.formatPrice(Math.max(Number(minInput.value), Number(maxInput.value)));
    }

    function setFilterOpen(open) {
        document.body.classList.toggle('filter-open', open);
        overlay?.classList.toggle('is-open', open);
        drawer?.classList.toggle('is-open', open);
        if (drawer) {
            drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
            drawer.inert = !open;
        }
        if (overlay) overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
        openBtns.forEach((btn) => btn.setAttribute('aria-expanded', open ? 'true' : 'false'));
        if (open) closeBtn?.focus();
        else openBtns[0]?.focus();
    }

    function clearFilters() {
        document.querySelectorAll('.filter-drawer input[type="checkbox"]').forEach((el) => { el.checked = false; });
        if (minInput) minInput.value = String(range.min);
        if (maxInput) maxInput.value = String(range.max);
        updatePriceLabels();
        applyFiltersFromUI();
    }

    openBtns.forEach((btn) => btn.addEventListener('click', () => setFilterOpen(true)));
    closeBtn?.addEventListener('click', () => setFilterOpen(false));
    overlay?.addEventListener('click', () => setFilterOpen(false));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('filter-open')) {
            setFilterOpen(false);
        }
    });

    document.querySelectorAll('[data-filter-accordion]').forEach((group) => {
        const toggle = group.querySelector('.filter-group-toggle');
        const icon = group.querySelector('.filter-group-icon');
        toggle?.addEventListener('click', () => {
            const open = !group.classList.contains('is-open');
            group.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (icon) icon.textContent = open ? '−' : '+';
        });
    });

    document.querySelectorAll('.filter-drawer input[type="checkbox"]').forEach((el) => {
        el.addEventListener('change', applyFiltersFromUI);
    });
    minInput?.addEventListener('input', () => { updatePriceLabels(); applyFiltersFromUI(); });
    maxInput?.addEventListener('input', () => { updatePriceLabels(); applyFiltersFromUI(); });
    document.querySelector('[data-filter-clear]')?.addEventListener('click', clearFilters);

    pagination?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-page]');
        if (!btn || btn.disabled) return;
        const value = btn.getAttribute('data-page');
        const pages = Math.max(1, Math.ceil(sorted(filtered()).length / PAGE_SIZE));
        if (value === 'prev') state.page = Math.max(1, state.page - 1);
        else if (value === 'next') state.page = Math.min(pages, state.page + 1);
        else state.page = Number(value);
        renderGrid();
        grid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    sortToggle?.addEventListener('click', () => {
        const open = sortMenu?.hasAttribute('hidden');
        if (!sortMenu) return;
        sortMenu.hidden = !open;
        sortToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.collection-sort')) {
            if (sortMenu) sortMenu.hidden = true;
            sortToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    sortMenu?.addEventListener('click', (e) => {
        const option = e.target.closest('[data-sort]');
        if (!option) return;
        state.sort = option.getAttribute('data-sort');
        state.page = 1;
        sortMenu.querySelectorAll('[data-sort]').forEach((el) => el.classList.toggle('is-active', el === option));
        if (sortToggle) {
            const label = option.textContent.trim();
            sortToggle.querySelector('[data-sort-label]').textContent = label === 'Featured' ? 'Sort by' : label;
        }
        sortMenu.hidden = true;
        sortToggle?.setAttribute('aria-expanded', 'false');
        renderGrid();
    });

    updatePriceLabels();
    renderBestsellers();
    renderGrid();
})();

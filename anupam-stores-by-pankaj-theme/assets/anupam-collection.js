(function () {
  const page = document.body.classList.contains('template-collection') || document.body.classList.contains('template-search');
  if (!page) return;

  const overlay = document.querySelector('[data-filter-overlay]');
  const drawer = document.querySelector('[data-filter-drawer]');

  function setFilterOpen(open) {
    document.body.classList.toggle('filter-open', open);
    overlay?.classList.toggle('is-open', open);
    drawer?.classList.toggle('is-open', open);
    if (drawer) {
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    document.querySelectorAll('[data-filter-open]').forEach((btn) => {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function syncSortLabel() {
    const select = document.getElementById('SortBy');
    const label = document.querySelector('[data-sort-label]');
    if (!select || !label) return;
    const active = select.options[select.selectedIndex];
    if (active) label.textContent = active.textContent.trim();
    document.querySelectorAll('[data-sort-menu] [data-sort]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-sort') === select.value);
    });
  }

  function initFilterAccordions() {
    const groups = document.querySelectorAll('.filter-drawer .widget, .filter-drawer .js-filter');
    groups.forEach((group, index) => {
      group.classList.add('filter-group');
      if (index === 0) group.classList.add('is-open');
      const toggle = group.querySelector('h4, .facets__summary');
      if (toggle) toggle.classList.add('filter-group-toggle');
    });
  }

  document.addEventListener('click', (event) => {
    const openBtn = event.target.closest('[data-filter-open]');
    if (openBtn) {
      event.preventDefault();
      setFilterOpen(true);
      return;
    }

    if (event.target.closest('[data-filter-close]') || event.target.closest('[data-filter-overlay]')) {
      event.preventDefault();
      setFilterOpen(false);
      return;
    }

    const sortToggle = event.target.closest('[data-sort-toggle]');
    const sortMenu = document.querySelector('[data-sort-menu]');
    if (sortToggle) {
      event.preventDefault();
      const expanded = sortToggle.getAttribute('aria-expanded') === 'true';
      sortToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (sortMenu) sortMenu.hidden = expanded;
      return;
    }

    const sortOption = event.target.closest('[data-sort]');
    if (sortOption) {
      event.preventDefault();
      const value = sortOption.getAttribute('data-sort');
      const select = document.getElementById('SortBy');
      const filterForm = document.getElementById('FacetFiltersForm');
      if (select) select.value = value;
      if (filterForm) {
        let hidden = filterForm.querySelector('input[name="sort_by"]');
        if (!hidden) {
          hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = 'sort_by';
          filterForm.appendChild(hidden);
        }
        hidden.value = value;
        filterForm.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (select) {
        select.dispatchEvent(new Event('input', { bubbles: true }));
      }
      syncSortLabel();
      const toggle = document.querySelector('[data-sort-toggle]');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (sortMenu) sortMenu.hidden = true;
      return;
    }

    if (sortMenu && !event.target.closest('.collection-sort')) {
      const toggle = document.querySelector('[data-sort-toggle]');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      sortMenu.hidden = true;
    }

    const accordionToggle = event.target.closest('.filter-drawer .filter-group-toggle, .filter-drawer .facets__summary, .filter-drawer .widget > h4');
    if (accordionToggle) {
      const group = accordionToggle.closest('.filter-group, .widget, .js-filter');
      if (!group) return;
      event.preventDefault();
      group.classList.toggle('is-open');
      return;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setFilterOpen(false);
  });

  initFilterAccordions();
  syncSortLabel();
  document.querySelectorAll('#product-grid .add-cart-btn').forEach((btn) => {
    btn.dataset.atcBound = '1';
  });
  initInfiniteScroll();

  function bindNewProductActions(nodes) {
    if (!window.jQuery || !nodes.length) return;
    const sample = document.querySelector('#product-grid .add-cart-btn[data-atc-bound="1"]');
    const events = sample && jQuery._data && jQuery._data(sample, 'events');
    const clickHandlers = events && events.click ? events.click.slice() : [];
    nodes.forEach((node) => {
      node.querySelectorAll('.add-cart-btn').forEach((btn) => {
        if (btn.dataset.atcBound === '1') return;
        btn.dataset.atcBound = '1';
        clickHandlers.forEach((handler) => {
          jQuery(btn).on('click', handler.handler);
        });
      });
    });
  }

  function initInfiniteScroll() {
    const grid = document.querySelector('#product-grid');
    const loader = document.querySelector('#infinite-scroll-loader');
    if (!grid || !loader) return;

    let loading = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || loading) return;
        const nextPage = loader.getAttribute('data-next-page');
        if (!nextPage) return;

        loading = true;
        loader.classList.add('is-loading');

        fetch(nextPage, { credentials: 'same-origin' })
          .then((response) => response.text())
          .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const nextGrid = doc.querySelector('#product-grid');
            const fragment = document.createDocumentFragment();
            const added = [];

            if (nextGrid) {
              nextGrid.querySelectorAll('.product-card, article.item-row, .grid-item').forEach((card) => {
                const node = document.importNode(card, true);
                fragment.appendChild(node);
                added.push(node);
              });
            }

            if (added.length) {
              grid.appendChild(fragment);
              bindNewProductActions(added);
            }

            const newLoader = doc.querySelector('#infinite-scroll-loader');
            const newNext = newLoader && newLoader.getAttribute('data-next-page');
            if (newNext) {
              loader.setAttribute('data-next-page', newNext);
              loading = false;
              loader.classList.remove('is-loading');
            } else {
              observer.disconnect();
              loader.remove();
            }
          })
          .catch(() => {
            loading = false;
            loader.classList.remove('is-loading');
          });
      });
    }, { rootMargin: '500px 0px' });

    observer.observe(loader);
  }
})();

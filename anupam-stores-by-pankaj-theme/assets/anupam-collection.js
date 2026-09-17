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
})();

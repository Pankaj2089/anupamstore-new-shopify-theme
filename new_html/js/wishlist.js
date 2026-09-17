(function () {
    const Shared = window.AnupamShared;
    const products = window.AnupamProducts || [];
    const grid = document.querySelector('[data-wishlist-grid]');
    if (!Shared || !grid) return;

    const empty = document.querySelector('[data-wishlist-empty]');
    const saved = ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6'];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatPrice(value) {
        return '₹ ' + Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function card(product) {
        const href = Shared.productUrl(product.id);
        const src = Shared.base() + product.image;
        const name = escapeHtml(product.name);
        const zoom = Shared.hasRasterBadge(product.image) ? ' wishlist-media--zoom' : '';
        return `
<article class="wishlist-card" data-wishlist-item data-id="${escapeHtml(product.id)}">
    <a class="wishlist-media${zoom}" href="${href}">
        <img src="${src}" alt="${escapeHtml(product.alt || product.name)}" width="400" height="400" loading="lazy">
    </a>
    <h2 class="wishlist-card-title"><a href="${href}">${name}</a></h2>
    <p class="wishlist-price">${formatPrice(product.price)}</p>
    <button type="button" class="wishlist-remove" data-wishlist-remove>
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
        Remove
    </button>
</article>`;
    }

    function syncCount() {
        const count = grid.querySelectorAll('[data-wishlist-item]').length;
        document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
            el.textContent = String(count);
            el.classList.toggle('is-visible', count > 0);
        });
        if (empty) empty.hidden = count > 0;
    }

    const items = saved
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);

    grid.innerHTML = items.map(card).join('');
    syncCount();

    grid.addEventListener('click', (e) => {
        const button = e.target.closest('[data-wishlist-remove]');
        if (!button) return;
        const item = button.closest('[data-wishlist-item]');
        if (!item) return;
        const name = item.querySelector('.wishlist-card-title')?.textContent.trim() || 'Product';
        item.remove();
        syncCount();
        if (window.AnupamUI) window.AnupamUI.toast(`${name} removed from wishlist`);
    });
})();

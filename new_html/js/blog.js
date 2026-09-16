(function () {
    const Blogs = window.AnupamBlogs;
    if (!Blogs) return;

    const PER_PAGE = 4;
    const listEl = document.querySelector('[data-blog-list]');
    const pagination = document.querySelector('[data-pagination]');
    const params = new URLSearchParams(window.location.search);
    let page = Math.max(1, parseInt(params.get('page'), 10) || 1);

    function pageCount() {
        return Math.max(1, Math.ceil(Blogs.posts.length / PER_PAGE));
    }

    function setPage(next, scroll) {
        const pages = pageCount();
        page = Math.min(pages, Math.max(1, next));
        const url = new URL(window.location.href);
        if (page === 1) url.searchParams.delete('page');
        else url.searchParams.set('page', String(page));
        window.history.replaceState({}, '', url);
        render();
        if (scroll) {
            document.querySelector('.blog-listing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function renderPagination(pages) {
        if (!pagination) return;
        if (pages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        const buttons = ['<button type="button" class="page-btn" data-page="prev">Previous</button>'];
        for (let i = 1; i <= pages; i += 1) {
            buttons.push(`<button type="button" class="page-btn${i === page ? ' is-active' : ''}" data-page="${i}" ${i === page ? 'aria-current="page"' : ''}>${i}</button>`);
        }
        buttons.push('<button type="button" class="page-btn" data-page="next">Next</button>');
        pagination.innerHTML = buttons.join('');
        const prev = pagination.querySelector('[data-page="prev"]');
        const next = pagination.querySelector('[data-page="next"]');
        if (prev) prev.disabled = page === 1;
        if (next) next.disabled = page === pages;
    }

    function render() {
        if (!listEl) return;
        const pages = pageCount();
        if (page > pages) page = pages;
        const start = (page - 1) * PER_PAGE;
        const slice = Blogs.posts.slice(start, start + PER_PAGE);
        listEl.innerHTML = slice.map((post, i) => Blogs.blogCard(post, {
            imageRight: (start + i) % 2 === 1,
            lazy: i > 0
        })).join('');
        renderPagination(pages);
    }

    pagination?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-page]');
        if (!btn || btn.disabled) return;
        const value = btn.getAttribute('data-page');
        if (value === 'prev') setPage(page - 1, true);
        else if (value === 'next') setPage(page + 1, true);
        else setPage(Number(value), true);
    });

    render();
})();

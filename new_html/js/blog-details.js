(function () {
    const Shared = window.AnupamShared;
    const Blogs = window.AnupamBlogs;
    if (!Shared || !Blogs) return;

    const params = new URLSearchParams(window.location.search);
    const requested = params.get('id');
    const post = Blogs.byId(requested) || Blogs.byId('retail-vs-wholesale') || Blogs.posts[0];
    if (!post) return;

    document.title = post.title + ' | Anupam Stores';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', post.excerpt);

    function renderCrumb() {
        const crumb = document.querySelector('[data-article-crumb]');
        if (!crumb) return;
        crumb.innerHTML = `
            <a href="${Shared.home()}">Home</a>
            <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <a href="${Shared.blogs()}">Blogs</a>
            <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <span aria-current="page">${Blogs.escapeHtml(post.title)}</span>
        `;
    }

    function renderHero() {
        const hero = document.querySelector('[data-article-hero]');
        if (!hero) return;
        hero.innerHTML = `<img src="${Blogs.escapeHtml(post.image)}" alt="${Blogs.escapeHtml(post.alt)}" width="1200" height="675">`;
    }

    function renderHeader() {
        const title = document.getElementById('article-title');
        const meta = document.querySelector('[data-article-meta]');
        if (title) title.textContent = post.title;
        if (meta) {
            meta.innerHTML = `
                <span>
                    <span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                    ${Blogs.escapeHtml(post.date)}
                </span>
                <span class="blog-meta-sep" aria-hidden="true">|</span>
                <span>
                    <span class="material-symbols-outlined" aria-hidden="true">person</span>
                    By: ${Blogs.escapeHtml(post.author)}
                </span>
                <span class="blog-meta-sep" aria-hidden="true">|</span>
                <span>
                    <span class="material-symbols-outlined" aria-hidden="true">article</span>
                    ${Blogs.escapeHtml(post.category)}
                </span>
            `;
        }
    }

    function renderBody() {
        const body = document.querySelector('[data-article-body]');
        if (!body) return;
        body.innerHTML = post.body || `<p>${Blogs.escapeHtml(post.excerpt)}</p>`;
    }

    function renderRecent() {
        const track = document.querySelector('[data-recent-track]');
        if (!track) return;
        const recent = Blogs.recent(post.id, 8);
        track.innerHTML = recent.map((item) => Blogs.blogCard(item, {
            vertical: true,
            slider: true,
            lazy: true,
            heading: 'h3'
        })).join('');
        if (window.AnupamUI && typeof window.AnupamUI.initSlider === 'function') {
            window.AnupamUI.initSlider(document.querySelector('[data-recent-slider]'), {
                prev: document.querySelector('[data-recent-prev]'),
                next: document.querySelector('[data-recent-next]')
            });
        }
    }

    renderCrumb();
    renderHero();
    renderHeader();
    renderBody();
    renderRecent();
})();

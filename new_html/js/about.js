(function () {
    const Blogs = window.AnupamBlogs;
    const track = document.querySelector('[data-recent-track]');
    if (!Blogs || !track) return;

    track.innerHTML = Blogs.posts.slice(0, 8).map((post) => Blogs.blogCard(post, {
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
})();

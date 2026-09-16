(function () {
    const Shared = {
        base() {
            return document.documentElement.getAttribute('data-base') || '';
        },
        home() {
            return this.base() + 'index.html';
        },
        collection() {
            return this.base() + 'collections/new-arrivals.html';
        },
        blogs() {
            return this.base() + 'blogs.html';
        },
        blogUrl(id) {
            return this.base() + 'blog-details.html?id=' + encodeURIComponent(id);
        },
        productUrl(id) {
            return this.base() + 'product-details.html?id=' + encodeURIComponent(id);
        },
        apply(html) {
            return html
                .replaceAll('{{base}}', this.base())
                .replaceAll('{{home}}', this.home())
                .replaceAll('{{collection}}', this.collection())
                .replaceAll('{{blogs}}', this.blogs());
        },
        formatPrice(value) {
            const n = Number(value);
            if (Number.isNaN(n)) return value;
            return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        savePercent(product) {
            if (!product.compareAt || product.compareAt <= product.price) return 0;
            return Math.round((1 - product.price / product.compareAt) * 100);
        },
        hasRasterBadge(image) {
            return /prod-/.test(image) && !/prod-3\.png|prod-8-/.test(image);
        },
        productCard(product, options = {}) {
            const save = this.savePercent(product);
            const src = this.base() + product.image;
            const href = this.productUrl(product.id);
            const raster = this.hasRasterBadge(product.image) ? ' has-raster-badge' : '';
            const contain = options.contain ? ' product-image--contain' : '';
            const slider = options.slider ? ' data-slider-item' : '';
            const rating = Number(product.rating || 0).toFixed(1);
            return `
<article class="product-card" ${slider} data-product data-id="${product.id}" data-name="${product.name.replace(/"/g, '&quot;')}" data-price="${product.price}" data-image="${src}">
    <div class="product-image${contain}${raster}">
        <a class="product-media" href="${href}">
            <img src="${src}" alt="${product.alt || product.name}" width="400" height="400" loading="lazy">
        </a>
        ${save ? `<span class="badge-sale">Save -${save}%</span>` : ''}
        <div class="product-actions">
            <button type="button" class="action-btn" data-wishlist aria-label="Add to wishlist"><span class="material-symbols-outlined" aria-hidden="true">favorite</span></button>
            <button type="button" class="action-btn" data-quickview aria-label="Quick view"><span class="material-symbols-outlined" aria-hidden="true">visibility</span></button>
            <button type="button" class="action-btn" data-add-cart aria-label="Add to cart"><span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span></button>
        </div>
    </div>
    <div class="product-body">
        <h3 class="product-title"><a href="${href}">${product.name}</a></h3>
        <div class="product-rating" aria-label="Rated ${rating} out of 5">
            <span class="stars" aria-hidden="true">★★★★★</span>
            <span>${rating} (${product.reviews || 0})</span>
        </div>
        <div class="product-price">
            ${product.compareAt ? `<span class="price-was">${this.formatPrice(product.compareAt)}</span>` : ''}
            <span class="price-sale">${this.formatPrice(product.price)}</span>
        </div>
        <button type="button" class="btn btn-cart-mobile" data-add-cart>Add to Cart</button>
    </div>
</article>`;
        },
        header() {
            return this.apply(`
    <header class="site-header" id="site-header">
        <div class="announcement" role="region" aria-label="Store highlights">
            <div class="container announcement-inner">
                <a class="announcement-mail" href="mailto:info@anupamstores.com">
                    <span class="material-symbols-outlined" aria-hidden="true">mail</span>
                    info@anupamstores.com
                </a>
                <ul class="announcement-highlights">
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">home</span>
                        Premium Home Decor
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
                        Home Essentials
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">verified_user</span>
                        Secure Checkout
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">local_shipping</span>
                        Free shipping and returns
                    </li>
                </ul>
            </div>
        </div>

        <div class="header-main">
            <div class="container header-inner">
                <a class="logo" href="{{home}}" aria-label="Anupam Stores home">
                    <img src="{{base}}assets/images/Logo%20(2).png" alt="Anupam Stores — Home Decor | Style Your Space" width="220" height="52">
                </a>

                <a class="header-call" href="tel:+919929994251">
                    <img src="{{base}}assets/images/headset.png" alt="" width="28" height="28">
                    <span>
                        <small>Call us now</small>
                        <strong>+91 99299 94251</strong>
                    </span>
                </a>

                <form class="header-search" role="search" action="#" method="get">
                    <label class="sr-only" for="site-search">Search products</label>
                    <input id="site-search" type="search" name="q" placeholder="Search for products, categories...">
                    <button type="submit" aria-label="Search">
                        <span class="material-symbols-outlined" aria-hidden="true">search</span>
                    </button>
                </form>

                <div class="header-tools">
                    <button class="icon-btn search-toggle" type="button" aria-label="Search" aria-expanded="false">
                        <span class="material-symbols-outlined" aria-hidden="true">search</span>
                    </button>
                    <a class="icon-btn" href="#wishlist" aria-label="Wishlist">
                        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
                        <span class="count-badge" data-wishlist-count>0</span>
                    </a>
                    <a class="icon-btn" href="#account" aria-label="Account">
                        <span class="material-symbols-outlined" aria-hidden="true">person</span>
                    </a>
                    <a class="icon-btn" href="#cart" aria-label="Cart">
                        <span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
                        <span class="count-badge" data-cart-count>0</span>
                    </a>
                    <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-drawer" aria-expanded="false">
                        <span class="material-symbols-outlined" aria-hidden="true">menu</span>
                    </button>
                </div>
            </div>
        </div>

        <nav class="secondary-nav" aria-label="Departments">
            <div class="container">
                <div class="secondary-scroller">
                <ul class="secondary-track">
                    <li class="has-sub">
                        <a href="{{collection}}" aria-haspopup="true">New Arrivals <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span></a>
                        <ul class="dropdown">
                            <li><a href="{{collection}}">New Products</a></li>
                            <li><a href="{{home}}#bestsellers">Best Sellers</a></li>
                            <li><a href="{{home}}#featured">Top Featured</a></li>
                            <li><a href="{{home}}#deals">Deals of the Day</a></li>
                        </ul>
                    </li>
                    <li class="has-mega">
                        <a href="{{home}}#categories" aria-haspopup="true">What's on your Mind ? <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span></a>
                        <div class="mega-menu" role="region" aria-label="Shop by category">
                            <div class="container mega-inner mega-inner--tiles">
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-1.png" alt="" width="120" height="120">
                                    <span>Kitchen &amp; Dining</span>
                                </a>
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-2.png" alt="" width="120" height="120">
                                    <span>Bedding &amp; Linen</span>
                                </a>
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-3.png" alt="" width="120" height="120">
                                    <span>Decorative Figures</span>
                                </a>
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-7.png" alt="" width="120" height="120">
                                    <span>Vases &amp; Pots</span>
                                </a>
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-4.png" alt="" width="120" height="120">
                                    <span>Home Lighting</span>
                                </a>
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-5.png" alt="" width="120" height="120">
                                    <span>Wall Hangings</span>
                                </a>
                                <a class="mega-tile" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-6.png" alt="" width="120" height="120">
                                    <span>Clocks</span>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="has-mega">
                        <a href="{{home}}#categories" aria-haspopup="true">Room Styling &amp; Decor <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span></a>
                        <div class="mega-menu" role="region" aria-label="Room styling and decor">
                            <div class="container mega-inner mega-inner--cols">
                                <div class="mega-col">
                                    <h4>Decor Accents</h4>
                                    <ul>
                                        <li><a href="{{home}}#categories">Decorative Figures</a></li>
                                        <li><a href="{{home}}#categories">Vases &amp; Pots</a></li>
                                        <li><a href="{{home}}#categories">Wall Hangings</a></li>
                                        <li><a href="{{home}}#categories">Artificial Flowers &amp; Plants</a></li>
                                        <li><a href="{{home}}#categories">Flameless Candles</a></li>
                                    </ul>
                                </div>
                                <div class="mega-col">
                                    <h4>Lighting &amp; Time</h4>
                                    <ul>
                                        <li><a href="{{home}}#categories">Home Lighting</a></li>
                                        <li><a href="{{home}}#categories">Clocks</a></li>
                                        <li><a href="{{home}}#categories">Decorative Bowls &amp; Plates</a></li>
                                    </ul>
                                </div>
                                <div class="mega-col">
                                    <h4>Shop Highlights</h4>
                                    <ul>
                                        <li><a href="{{collection}}">New Arrivals</a></li>
                                        <li><a href="{{home}}#bestsellers">Best Sellers</a></li>
                                        <li><a href="{{home}}#featured">Top Featured</a></li>
                                        <li><a href="{{home}}#gifting">Gifting</a></li>
                                    </ul>
                                </div>
                                <a class="mega-promo" href="{{collection}}">
                                    <img src="{{base}}assets/images/cat-3.png" alt="Decorative figures" width="280" height="220">
                                    <span>Shop New Arrivals →</span>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="has-mega">
                        <a href="{{home}}#categories" aria-haspopup="true">Kitchen &amp; Dining Essentials <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span></a>
                        <div class="mega-menu" role="region" aria-label="Kitchen and dining">
                            <div class="container mega-inner mega-inner--cols mega-inner--cols-2">
                                <div class="mega-col">
                                    <h4>Cook &amp; Serve</h4>
                                    <ul>
                                        <li><a href="{{home}}#categories">Kitchen &amp; Dining</a></li>
                                        <li><a href="{{home}}#categories">Cookware &amp; Bakeware</a></li>
                                        <li><a href="{{home}}#categories">Drinkware &amp; Serving</a></li>
                                        <li><a href="{{home}}#categories">Decorative Bowls &amp; Plates</a></li>
                                    </ul>
                                </div>
                                <div class="mega-col">
                                    <h4>Table Essentials</h4>
                                    <ul>
                                        <li><a href="{{home}}#deals">Pocket Friendly Deals</a></li>
                                        <li><a href="{{home}}#deals">Mega Price Drops</a></li>
                                        <li><a href="{{home}}#bestsellers">Best Sellers</a></li>
                                    </ul>
                                </div>
                                <a class="mega-promo" href="{{home}}#categories">
                                    <img src="{{base}}assets/images/cat-1.png" alt="Kitchen and dining" width="280" height="220">
                                    <span>Shop Kitchen &amp; Dining →</span>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="has-sub">
                        <a href="{{home}}#categories" aria-haspopup="true">Storage, Furniture &amp; Utility <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span></a>
                        <ul class="dropdown">
                            <li><a href="{{home}}#categories">Desk Organizers</a></li>
                            <li><a href="{{home}}#categories">Folding Tables</a></li>
                            <li><a href="{{home}}#categories">Storage &amp; Utility</a></li>
                            <li><a href="{{home}}#bestsellers">Furniture Best Sellers</a></li>
                        </ul>
                    </li>
                    <li class="has-sub">
                        <a href="{{home}}#categories" aria-haspopup="true">Living &amp; Entertainment <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span></a>
                        <ul class="dropdown">
                            <li><a href="{{home}}#categories">Bedding &amp; Linen</a></li>
                            <li><a href="{{home}}#categories">Bed Sheets</a></li>
                            <li><a href="{{home}}#categories">Gifts &amp; Games</a></li>
                            <li><a href="{{home}}#featured">Living Highlights</a></li>
                        </ul>
                    </li>
                    <li class="has-sub has-sub--right">
                        <a href="#more" aria-haspopup="true">More <span class="material-symbols-outlined" aria-hidden="true">menu</span></a>
                        <ul class="dropdown">
                            <li><a href="{{home}}#deals">Deals of the Day</a></li>
                            <li><a href="{{home}}#featured">Top Featured</a></li>
                            <li><a href="{{home}}#brands">Our Brands</a></li>
                            <li><a href="{{home}}#newsletter">Newsletter</a></li>
                            <li><a href="{{home}}#footer">Contact Us</a></li>
                            <li><a href="{{home}}#footer">FAQ</a></li>
                        </ul>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </header>`);
        },
        mobileDrawer() {
            return this.apply(`
    <div class="drawer-overlay" data-drawer-close hidden></div>
    <aside class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <div class="drawer-head">
            <a class="logo" href="{{home}}">
                <img src="{{base}}assets/images/Logo%20(2).png" alt="Anupam Stores" width="180" height="42">
            </a>
            <button class="icon-btn" type="button" data-drawer-close aria-label="Close menu">
                <span class="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
        </div>
        <nav aria-label="Mobile">
            <ul>
                <li><a href="{{home}}">Home</a></li>
                <li><a href="{{collection}}">New Arrivals</a></li>
                <li><a href="{{home}}#categories">Shop by Categories</a></li>
                <li><a href="{{home}}#categories">Room Styling &amp; Decor</a></li>
                <li><a href="{{home}}#categories">Kitchen &amp; Dining</a></li>
                <li><a href="{{home}}#categories">Storage, Furniture &amp; Utility</a></li>
                <li><a href="{{home}}#categories">Living &amp; Entertainment</a></li>
                <li><a href="{{home}}#bestsellers">Best Sellers</a></li>
                <li><a href="{{home}}#deals">Deals of the Day</a></li>
                <li><a href="{{collection}}">New Products</a></li>
                <li><a href="{{home}}#featured">Top Featured</a></li>
                <li><a href="{{home}}#brands">Our Brands</a></li>
                <li><a href="{{home}}#gifting">Gifting</a></li>
                <li><a href="{{home}}#footer">Contact</a></li>
            </ul>
        </nav>
    </aside>`);
        },
        promoBanner() {
            return this.apply(`
        <section class="promo-banner" id="gifting" aria-label="Home decor promotion" data-slider>
            <div class="promo-track" data-slider-track>
                <article class="promo-slide" data-slider-item>
                    <img class="promo-slide-img" src="{{base}}assets/images/2151928981%201.png" alt="Carved terracotta vases with flowering branches on a wooden table" width="1920" height="742">
                    <div class="container promo-copy">
                        <h2 class="promo-title">Elevate Your<br>Home Decor</h2>
                        <p>Elegant accents for beautiful living spaces</p>
                        <a class="btn btn-promo" href="{{home}}#categories">Shop Now</a>
                    </div>
                </article>
                <article class="promo-slide" data-slider-item>
                    <img class="promo-slide-img promo-slide-img--vase" src="{{base}}assets/images/2151928981%201.png" alt="Warm interior styled with handcrafted terracotta vases" width="1920" height="742">
                    <div class="container promo-copy">
                        <h2 class="promo-title">Style Every<br>Living Space</h2>
                        <p>Handcrafted pieces that bring warmth into your home</p>
                        <a class="btn btn-promo" href="{{collection}}">Shop Now</a>
                    </div>
                </article>
            </div>
            <div class="promo-nav">
                <button type="button" class="promo-arrow prev" data-slider-prev aria-label="Previous promo slide">
                    <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                </button>
                <button type="button" class="promo-arrow next" data-slider-next aria-label="Next promo slide">
                    <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                </button>
            </div>
        </section>`);
        },
        brands() {
            return this.apply(`
        <section class="section brands" id="brands">
            <div class="container">
                <div class="section-head">
                    <h2 class="section-title">Our Brands</h2>
                </div>
                <div class="slider-wrapper brand-slider" data-slider>
                    <button class="slider-btn prev" type="button" data-slider-prev aria-label="Previous brands">
                        <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                    </button>
                    <div class="slider-track brand-track" data-slider-track>
                        <article class="brand-card" data-slider-item aria-label="Cello">
                            <span class="brand-mark brand-cello">CELLO</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Borosil">
                            <span class="brand-mark brand-borosil">BOROSIL</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Hawkins">
                            <span class="brand-mark brand-hawkins">HAWKINS</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Milton">
                            <span class="brand-mark brand-milton">milton</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Havells">
                            <span class="brand-mark brand-havells">HAVELLS</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Prestige">
                            <span class="brand-mark brand-prestige">Prestige</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Pigeon">
                            <span class="brand-mark brand-pigeon">Pigeon</span>
                        </article>
                        <article class="brand-card" data-slider-item aria-label="Bajaj">
                            <span class="brand-mark brand-bajaj">BAJAJ</span>
                        </article>
                    </div>
                    <button class="slider-btn next" type="button" data-slider-next aria-label="Next brands">
                        <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                    </button>
                </div>
            </div>
        </section>`);
        },
        newsletter() {
            return `
        <section class="newsletter" id="newsletter">
            <div class="container newsletter-inner">
                <h2 class="section-title">Subscribe to Our Newsletter</h2>
                <p>Be the first to know about new arrivals, exclusive deals and festive collections.</p>
                <form class="newsletter-form" action="#" method="post">
                    <label class="sr-only" for="newsletter-email">Email address</label>
                    <input id="newsletter-email" type="email" name="email" placeholder="Enter your email address" required autocomplete="email">
                    <button class="btn btn-solid" type="submit">Subscribe</button>
                </form>
            </div>
        </section>`;
        },
        followRail() {
            return `
    <aside class="follow-rail" aria-label="Follow us">
        <a class="follow-rail-icon" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z"/></svg>
        </a>
        <a class="follow-rail-icon" href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.2-.1-1-.2-2.4 0-3.4.2-.9 1.4-6 1.4-6s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.8-2.2 3.8-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.5-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.3c0 .2-.2.3-.4.2-1.6-.7-2.6-3.1-2.6-5 0-4.1 3-7.8 8.6-7.8 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.5-.7-3-1.5l-.8 3.1c-.3 1.1-1.1 2.5-1.6 3.4A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
        </a>
        <a class="follow-rail-icon" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.7.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9C2.3 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0 2.7.1.1 2.7 0 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 4.3 2.7 6.9 7 7 1.3 0 1.7.1 4.9.1s3.7 0 5-.1c4.3-.1 6.9-2.7 7-7 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-4.3-2.7-6.9-7-7C15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.8a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4z"/></svg>
        </a>
        <a class="follow-rail-icon" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
        </a>
        <span class="follow-rail-label">Follow us</span>
    </aside>`;
        },
        footer() {
            return this.apply(`
    <footer class="site-footer" id="footer">
        <div class="container footer-grid">
            <section>
                <h3>Contact Information</h3>
                <ul class="footer-contact">
                    <li>
                        <span class="footer-icon material-symbols-outlined" aria-hidden="true">call</span>
                        <div>
                            <span class="footer-label">Call On Order ? Call us 24/7</span>
                            <a class="footer-value" href="tel:+919929994251">+91 99299 94251</a>
                        </div>
                    </li>
                    <li>
                        <span class="footer-icon material-symbols-outlined" aria-hidden="true">location_on</span>
                        <div>
                            <span class="footer-label">Store 1</span>
                            <address>68, suraj nagar west, opp. metro pillar 60, civil lines, sodala circle, ajmer road, Jaipur, Rajasthan</address>
                        </div>
                    </li>
                    <li>
                        <span class="footer-icon material-symbols-outlined" aria-hidden="true">location_on</span>
                        <div>
                            <span class="footer-label">Store 2</span>
                            <address>Plot No.18,19,20, Ashok Nagar, Purani Chungi, Near Ridhiraj World Business Center, Ajmer Road, Jaipur, Rajasthan 302019</address>
                        </div>
                    </li>
                    <li>
                        <span class="footer-icon material-symbols-outlined" aria-hidden="true">mail</span>
                        <div>
                            <span class="footer-label">Email Address</span>
                            <a class="footer-value" href="mailto:info@anupamstores.com">info@anupamstores.com</a>
                        </div>
                    </li>
                </ul>
            </section>
            <section>
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="{{home}}#footer">About Us</a></li>
                    <li><a href="{{home}}#footer">Contact Us</a></li>
                    <li><a href="{{home}}#footer">Terms And Conditions</a></li>
                    <li><a href="{{home}}#footer">FAQ</a></li>
                    <li><a href="{{home}}#footer">Privacy Policy</a></li>
                    <li><a href="{{home}}#footer">Return &amp; Cancellation Policy</a></li>
                    <li><a href="{{home}}#footer">Shipping &amp; Delivery Policy</a></li>
                </ul>
            </section>
            <section>
                <h3>My Accounts</h3>
                <ul class="footer-links">
                    <li><a href="#account">Profile</a></li>
                    <li><a href="#account">Orders</a></li>
                </ul>
            </section>
            <section>
                <h3>Popular Tag</h3>
                <div class="tag-cloud">
                    <a href="{{home}}#categories">Decorative Bowls &amp; Plates</a>
                    <a href="{{home}}#categories">Decorative Figures</a>
                    <a href="{{home}}#categories">Artificial Flowers &amp; Plants</a>
                    <a href="{{home}}#categories">Flameless Candles</a>
                    <a href="{{home}}#categories">Cookware &amp; Bakeware</a>
                    <a href="{{home}}#categories">Drinkware &amp; Serving</a>
                    <a href="{{home}}#categories">Desk Organizers</a>
                    <a href="{{home}}#categories">Folding Tables</a>
                    <a href="{{home}}#categories">Bed Sheets</a>
                    <a href="{{home}}#categories">Gifts &amp; Games</a>
                    <a href="{{home}}#deals">Pocket Friendly Deals</a>
                    <a href="{{home}}#deals">Mega Price Drops</a>
                </div>
            </section>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>Copyright © 2026 Anupam Stores Online</p>
            </div>
        </div>
    </footer>`);
        },
        quickview() {
            return `
    <div class="modal" id="quickview" role="dialog" aria-modal="true" aria-labelledby="quickview-title" hidden>
        <div class="modal-panel">
            <button class="icon-btn modal-close" type="button" data-modal-close aria-label="Close quick view">
                <span class="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
            <img id="quickview-image" alt="">
            <div class="modal-body">
                <h3 id="quickview-title"></h3>
                <p id="quickview-price"></p>
                <button type="button" class="btn btn-solid" data-modal-add>Add to Cart</button>
            </div>
        </div>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite" hidden></div>`;
        },
        mount() {
            const map = {
                header: () => this.header(),
                'mobile-drawer': () => this.mobileDrawer(),
                'promo-banner': () => this.promoBanner(),
                brands: () => this.brands(),
                newsletter: () => this.newsletter(),
                'follow-rail': () => this.followRail(),
                footer: () => this.footer(),
                quickview: () => this.quickview()
            };
            document.querySelectorAll('[data-component]').forEach((el) => {
                const name = el.getAttribute('data-component');
                const fn = map[name];
                if (!fn) return;
                el.outerHTML = fn();
            });
        }
    };

    window.AnupamShared = Shared;
    Shared.mount();
})();

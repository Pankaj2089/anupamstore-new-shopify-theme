(function () {
    const Shared = window.AnupamShared;
    if (!Shared) return;

    const asset = (file) => Shared.base() + 'assets/images/' + file;

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    const bodies = {
        'retail-vs-wholesale': `
            <p>Anupam Stores operates two distinct destinations in Jaipur, and which one you walk into can change your entire shopping experience. Anupam Stores Sodala is the retail flagship — built for individual shoppers, families, and gifting. Sukh Vrindavan is the wholesale destination — built for businesses, bulk buyers, and event-scale needs. Knowing which store to visit, and when, is the single biggest shortcut to shopping smart with Anupam Stores. This guide explains the difference, when each fits, and how to plan your visit.</p>
            <h2>Anupam Stores Sodala: The Retail Experience</h2>
            <p>Sodala is what most Jaipur shoppers think of when they think of Anupam Stores. It’s the bright, well-laid-out flagship where you go to browse, compare, and pick up everything from a missing kadhai to a wedding gift to a complete kitchen setup.</p>
            <p>Sodala is built for discovery. The aisles are designed for unhurried browsing across all eight major categories — kitchenware, appliances, dinnerware, décor, storage, personal care, gifting, and seasonal items. Pricing here reflects retail margins, but you also get the full retail experience: knowledgeable staff, the ability to compare brands side by side, gift wrapping for occasions, and the option to take home a single product without minimum quantities.</p>
            <p>Sodala is the right choice for individual and family shopping, gifting (single gifts or small hampers), home setup needs, and seasonal or festival shopping. If your list is in single units — one cooker, one dinner set, two towel sets — Sodala is where you go.</p>
            <h2>Sukh Vrindavan: The Wholesale Destination</h2>
            <p>Sukh Vrindavan is a different world. It’s built for buyers who need scale: kirana store owners stocking inventory, hostels and PGs equipping their kitchens and rooms, event planners sourcing for weddings and corporate events, gift shops building gifting catalogues, and small businesses managing their supply chains.</p>
            <p>The pricing here reflects wholesale rates — significantly lower per unit than retail, with savings that compound as quantities grow. The store layout, packaging, and team are all optimised for volume buying. You won’t find the same hand-holding retail experience as Sodala — you’re expected to know roughly what you need — but you’ll find pricing and supply support that no retail store can match.</p>
            <p>Sukh Vrindavan is the right choice for any purchase where quantity matters more than individual selection: bulk dinnerware for a hostel, hundreds of return gifts for a wedding, inventory restocking for a small store, or corporate gifting at scale.</p>
            <h2>Who Should Shop Where: A Quick Decision Guide</h2>
            <p>A simple framework:</p>
            <ul>
                <li>Buying for your own home, a single gift, or seasonal needs? Go to Anupam Stores Sodala.</li>
                <li>Buying for a business, an event, or anything in tens or hundreds? Go to Sukh Vrindavan.</li>
                <li>Mixed list? Start at Sodala for the curated and individual items, then plan a separate Sukh Vrindavan trip for the bulk components.</li>
            </ul>
            <p>This isn’t a hard line — both stores share the same brand catalogue and the same commitment to quality — but the experience is calibrated differently, and using the right one saves you time and money.</p>
            <h2>Wholesale Categories Worth Sourcing in Bulk</h2>
            <p>Some categories are particularly strong for wholesale buying at Sukh Vrindavan:</p>
            <ul>
                <li>Dinnerware and serveware for hostels, restaurants, and events.</li>
                <li>Kitchen storage containers for kirana store inventory.</li>
                <li>Towels and basic textiles for guesthouses and hostels.</li>
                <li>Gifting essentials for corporate, wedding, and festival hampers.</li>
                <li>Seasonal items like Diwali décor, Rakhi gifting, and wedding return gifts.</li>
                <li>Personal care and grooming SKUs for retail stores.</li>
            </ul>
            <p>If your business or event sources any of these categories, a single Sukh Vrindavan trip can replace weeks of price hunting across multiple suppliers.</p>
            <h2>What Wholesale Pricing Actually Looks Like</h2>
            <p>The savings at Sukh Vrindavan aren’t a marginal discount — they’re structural. A standard 28-piece dinner set that retails at around ₹2,500 individually might land closer to ₹1,800 in wholesale quantities of ten or more sets. A bulk order of stainless steel containers — say, a hundred pieces for a hostel inventory — can come in 25 to 35 percent below retail per unit. Festive gifting hampers built from bulk-sourced components frequently land at half the cost of buying the same items at retail and assembling at home.</p>
            <p>The savings compound the more categories you source from one place. A small business that sources dinnerware, storage, gifting, and cleaning supplies separately at retail almost always pays more than one that sources all four from a single wholesale destination. Beyond pricing, the consolidated buying also reduces logistics overhead — one transport, one invoice, one relationship to manage.</p>
            <h2>How to Plan a Wholesale Visit</h2>
            <p>A productive Sukh Vrindavan visit takes a little planning.</p>
            <ul>
                <li>Build a quantity-led list. Know roughly how many units of each item you need before you arrive.</li>
                <li>Plan for inspection. Bring someone who can check quality and packaging in volume.</li>
                <li>Discuss bulk pricing upfront. The team can quote tiered rates based on quantity and category.</li>
                <li>Plan transport. Wholesale loads need a tempo or dedicated vehicle — coordinate this in advance.</li>
                <li>Time it for off-peak hours if possible. Mornings on weekdays move fastest.</li>
            </ul>
            <p>For first-time wholesale buyers, the team at Sukh Vrindavan can walk you through pricing structure, quantity breaks, and category-specific deals.</p>
            <h2>Common Wholesale Mistakes to Avoid</h2>
            <p>First-time wholesale buyers tend to repeat the same handful of mistakes. The first is buying volume before validating quality — always inspect a sample before committing to a hundred units. The second is overestimating storage capacity. Bulk pricing only saves money if you have somewhere to keep the inventory and turn it within a reasonable window; otherwise the savings get eaten by storage costs and stale stock.</p>
            <p>The third is confusing wholesale with negotiation theatre. Sukh Vrindavan’s pricing is structured around quantity tiers, not endless haggling. Knowing your target quantity upfront and asking for the relevant tier is more productive than starting low and working up. The fourth is poor planning around transport and timing. A wholesale load needs a vehicle and an unloading plan at the other end.</p>
            <h2>Two Stores, One Promise</h2>
            <p>Whether you walk into Sodala for a single dinner set or into Sukh Vrindavan for two hundred, the promise stays the same: 150+ trusted brands, real category depth, and pricing that respects your money. The smart move isn’t picking one store — it’s knowing which one fits which purchase.</p>
        `,
        'kitchen-essentials': `
            <p>The Indian kitchen is one of the most demanding spaces in any home. It runs from early morning to late night, handles dishes from across regional cuisines, and has to flex between everyday meals and festival feasts. Building it right means knowing exactly which essentials matter, which are worth investing in, and which you can pick up later. This guide breaks down a complete Indian kitchen into the categories that actually make a difference.</p>
            <h2>Cookware: The Daily Workhorses</h2>
            <p>Cookware is where you should spend the most thought, because these are the items you’ll use every single day for years. The non-negotiables include a quality pressure cooker — three-litre for small households, five-litre for families of four or more. Stick to trusted brands like Prestige, Hawkins, or Butterfly; the safety margin is worth it.</p>
            <p>Next, a non-stick kadhai or wok for deep frying, sabzi, and stir-fried dishes. A hard-anodised tawa is essential for rotis, parathas, and dosas. Add a set of stainless steel handis or saucepans in two or three sizes for dal, milk, and gravies, plus a small pan for tadka and quick frying jobs.</p>
            <h2>Storage: The Quiet Hero</h2>
            <p>Most kitchens fail not because of cookware but because of storage. Invest in a stainless steel masala dabba and keep your daily masalas inside. Add a set of stainless steel containers in graduated sizes for dal, atta, rice, sugar, salt, and tea. Transparent jars are excellent for snacks, dry fruits, and biscuits.</p>
            <h2>Small Appliances That Earn Their Place</h2>
            <p>The mixer-grinder is the centrepiece — buy a 750-watt or higher model with at least three jars. After the mixer, consider a basic induction cooktop as a backup for gas, an electric kettle for chai, and a hand blender for soups and lassis.</p>
            <h2>The Daily-Use Toolkit</h2>
            <ul>
                <li>A chopping board and a basic knife set</li>
                <li>Peelers, graters, a strainer and a colander</li>
                <li>Ladles, serving spoons, tongs, a rolling pin and chakla</li>
                <li>Measuring cups and spoons if you bake or cook by recipe</li>
            </ul>
            <h2>Quality vs Budget — Where to Spend</h2>
            <p>Spend on what you use daily and what affects safety: pressure cooker, mixer-grinder, knives and chopping board. Save on items that get replaced over time: containers, ladles, peelers and basic plastic ware. If you’ll use it more than twice a week for the next five years, buy quality.</p>
            <h2>Build Your Kitchen at Anupam Stores</h2>
            <p>Anupam Stores Sodala stocks every category in this guide — from Prestige and Hawkins cookware to Milton storage, Borosil glassware, and a full range of small appliances. Build your Indian kitchen the right way, in one visit, with one trip to one trusted store.</p>
        `,
        'new-home-jaipur': `
            <p>Moving into a new home is one of life’s most exciting milestones — and one of the most overwhelming. Whether you’re a newlywed setting up your first kitchen, a young professional moving into a Jaipur apartment, or a family upgrading to a bigger space, the list of things you need is longer than it first appears. This complete checklist walks you through every room, every essential, and the order in which you should buy.</p>
            <h2>Start With the Kitchen</h2>
            <p>The kitchen is the heart of every Indian home, so it’s where most setups begin. Build your kitchen around four essentials: a quality pressure cooker, a non-stick kadhai or wok, a hard-anodised tawa, and a basic set of stainless steel handis. Add a sturdy mixer-grinder and storage: a masala dabba, dal and atta containers, and a few transparent jars.</p>
            <h2>Bedroom Essentials</h2>
            <p>Start with a quality mattress, two sets of sheets, four pillows with covers, and at least one comforter appropriate to Jaipur’s seasons. Add curtains, a dressing area with a mirror, and one bedside lamp per side rather than relying on harsh overhead light.</p>
            <h2>The Bathroom Setup</h2>
            <p>Stock the basics on day one: a sturdy bucket and mug, a soap dish, two sets of towels per family member, a bath mat, a small caddy for toiletries, a dustbin and basic cleaning supplies.</p>
            <h2>Living Room Foundations</h2>
            <p>Start with seating, a coffee table and a couple of side tables. Add curtains, a rug if your flooring needs softening, serving trays, decorative cushions, and one or two pieces of art to make the space feel personal rather than transitional.</p>
            <h2>Plan Your Budget Smartly</h2>
            <p>Think in three buckets: non-negotiables you use daily, functional essentials, and décor you can postpone for a month. A 50-35-15 split keeps a new home feeling finished instead of half-done.</p>
            <h2>Why Anupam Stores Works for Home Setup</h2>
            <p>With 150+ brands across kitchen, appliances, décor, storage, personal care and gifting, you can complete most of your checklist in a single visit. The team can recommend brands and sizes based on your family, your space and your budget.</p>
        `,
        'one-stop-jaipur': `
            <p>For decades, one name has quietly shaped the way Jaipur shops for its homes. From the busy lanes of Sodala to the wholesale corridors of Sukh Vrindavan, Anupam Stores has grown into something more than a retail destination — it has become a household habit. Whether you’re stocking a new kitchen, picking out a wedding gift, or running a guesthouse that needs supplies in bulk, chances are someone in your family has already pointed you here.</p>
            <h2>A Multi-Brand Promise That Actually Delivers</h2>
            <p>Anupam Stores stocks 150+ brands and over 2 lakh products under one roof, an inventory that competes with online marketplaces while giving you what they can’t: the chance to see, touch and compare before you buy. You can stay loyal to Prestige, Milton and Hawkins, or explore newer names in home and lifestyle.</p>
            <h2>Eight Categories, One Roof</h2>
            <p>The catalogue is organised around eight core categories that mirror how real Indian households shop: kitchen and cookware, home appliances, dinnerware, home décor, storage, personal care, gifting, and seasonal or festive items.</p>
            <h2>Two Locations, Two Distinct Experiences</h2>
            <p>Anupam Stores Sodala is the flagship retail experience — bright, browsable and family-friendly. Sukh Vrindavan is the wholesale destination, built for bulk buyers, kirana stores, hostels, event planners and small businesses.</p>
            <h2>Why Jaipur Comes Back</h2>
            <p>Three reasons keep customers loyal across generations: range, value and expertise. Direct relationships with 150+ brands translate into prices that frequently beat both online platforms and competing retail. Staff who have been with the company for years can guide buying decisions like a knowledgeable friend.</p>
            <h2>A Smart Plan for Your First Visit</h2>
            <ul>
                <li>Make a list before you arrive. The catalogue is huge, and a list keeps your visit focused.</li>
                <li>Visit on a weekday morning for a quieter, more browsable experience.</li>
                <li>Ask staff for recommendations, especially in appliances, cookware and gifting.</li>
                <li>If you’re shopping in volume, head straight to Sukh Vrindavan for wholesale rates.</li>
            </ul>
            <h2>More Than a Store — A Jaipur Institution</h2>
            <p>Three generations of families now shop here. Newlyweds set up their first kitchens with help from the same staff who advised their parents. When you shop at Anupam Stores, you’re plugging into a quiet network of trust that runs through the city.</p>
        `
    };

    function simpleBody(intro, heading, extra) {
        return `<p>${intro}</p><h2>${heading}</h2><p>${extra}</p>`;
    }

    const posts = [
        {
            id: 'kitchen-essentials',
            title: 'Kitchen Essentials Every Indian Household Needs',
            image: asset('blog-1.png'),
            alt: 'Kitchen essentials every Indian household needs — cookware styled on a marble counter',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'The Indian kitchen is one of the most demanding spaces in any home. It runs from early morning to late night, handles dishes from across regional cuisines, and has to flex between everyday meals and festival feasts. Building it right means knowing exactly which essentials matter, which are worth investing in, and which you can pick up later.',
            body: bodies['kitchen-essentials']
        },
        {
            id: 'new-home-jaipur',
            title: 'Setting Up Your New Home in Jaipur: The Complete Shopping Checklist',
            image: asset('blog-2.png'),
            alt: 'Home décor, brass idols and glassware for setting up a new home in Jaipur',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Moving into a new home is one of life’s most exciting milestones — and one of the most overwhelming. Whether you’re a newlywed setting up your first kitchen, a young professional moving into a Jaipur apartment, or a family upgrading to a bigger space, the list of things you need is longer than it first appears. This complete checklist walks you through every room, every essential, and the order in which you should buy.',
            body: bodies['new-home-jaipur']
        },
        {
            id: 'retail-vs-wholesale',
            title: 'Retail vs Wholesale: How to Shop Smart at Anupam Stores Sodala & Sukh Vrindavan',
            image: asset('blog-3.png'),
            alt: 'Retail at Anupam Stores Sodala compared with wholesale at Sukh Vrindavan',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Anupam Stores operates two distinct destinations in Jaipur, and which one you walk into can change your entire shopping experience. Anupam Stores Sodala is the retail flagship — built for individual shoppers, families, and gifting. Sukh Vrindavan is the wholesale destination — built for businesses, bulk buyers, and event-scale needs. Knowing which store to visit, and when, is the single biggest shortcut to shopping smart.',
            body: bodies['retail-vs-wholesale']
        },
        {
            id: 'one-stop-jaipur',
            title: 'Why Anupam Stores Is Jaipur’s One-Stop Shopping Destination',
            image: asset('blog-4.png'),
            alt: 'Kitchen appliances and home essentials showing why Anupam Stores is Jaipur’s one-stop shop',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'For decades, one name has quietly shaped the way Jaipur shops for its homes. From the busy lanes of Sodala to the wholesale corridors of Sukh Vrindavan, Anupam Stores has grown into something more than a retail destination — it has become a household habit. Whether you’re stocking a new kitchen, picking out a wedding gift, or running a guesthouse that needs supplies in bulk, chances are someone in your family has already pointed you here.',
            body: bodies['one-stop-jaipur']
        },
        {
            id: 'cookware-workhorses',
            title: 'Cookware: The Daily Workhorses of an Indian Kitchen',
            image: asset('blog-1.png'),
            alt: 'Stainless steel pans and a non-stick tawa for everyday Indian cooking',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Cookware is where you should spend the most thought, because these are the items you’ll use every single day for years. Start with a quality pressure cooker, a non-stick kadhai, a hard-anodised tawa, and a set of stainless steel handis.',
            body: simpleBody('Cookware is where you should spend the most thought, because these are the items you’ll use every single day for years.', 'Start With the Pieces You Will Use Daily', 'A quality pressure cooker, non-stick kadhai, hard-anodised tawa and stainless steel handis form the backbone of an Indian kitchen. Trusted brands like Prestige, Hawkins and Butterfly earn their place through safety and durability.')
        },
        {
            id: 'bedroom-essentials',
            title: 'Bedroom Essentials for a New Home in Jaipur',
            image: asset('blog-2.png'),
            alt: 'Decorative accents and home accessories for a complete bedroom setup',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Bedrooms need surprisingly little to feel complete, but skipping the basics is what leaves a space feeling temporary. Start with a quality mattress, two sets of sheets, four pillows with covers, and at least one comforter appropriate to Jaipur’s seasons.',
            body: simpleBody('Bedrooms need surprisingly little to feel complete, but skipping the basics is what leaves a space feeling temporary.', 'Light, Linen and a Place to Rest', 'Start with a quality mattress, two sets of sheets, four pillows and a comforter for Jaipur’s seasons. Add curtains, a dressing mirror and one bedside lamp per side rather than relying on harsh overhead light.')
        },
        {
            id: 'sodala-retail',
            title: 'Anupam Stores Sodala: The Retail Experience',
            image: asset('blog-3.png'),
            alt: 'Retail aisles at Anupam Stores Sodala in Jaipur',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Sodala is what most Jaipur shoppers think of when they think of Anupam Stores. It’s the bright, well-laid-out flagship where you go to browse, compare, and pick up everything from a missing kadhai to a wedding gift to a complete kitchen setup.',
            body: simpleBody('Sodala is what most Jaipur shoppers think of when they think of Anupam Stores.', 'Built for Discovery', 'The aisles are designed for unhurried browsing across kitchenware, appliances, dinnerware, décor, storage, personal care and gifting. Staff can compare brands side by side and wrap gifts for occasions.')
        },
        {
            id: 'eight-categories',
            title: 'Eight Categories, One Roof: How Anupam Stores Is Organised',
            image: asset('blog-4.png'),
            alt: 'Cookware, appliances and décor representing Anupam Stores’ eight categories',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'The catalogue is organised around eight core categories that mirror how real Indian households actually shop: kitchen and cookware, home appliances, dinnerware and serveware, home décor and furnishings, storage and organisation, personal care, gifting essentials, and seasonal or festive items.',
            body: simpleBody('The catalogue is organised around eight core categories that mirror how real Indian households actually shop.', 'Whatever Brings You In', 'Kitchen, appliances, dinnerware, décor, storage, personal care, gifting and seasonal items sit under one roof, so a single missing tawa often turns into a more complete home setup.')
        },
        {
            id: 'kitchen-storage',
            title: 'Storage: The Quiet Hero of Indian Kitchens',
            image: asset('blog-1.png'),
            alt: 'Organised cookware and kitchen storage essentials',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Most kitchens fail not because of cookware but because of storage. Indian cooking uses dozens of ingredients, and without proper containers everything turns into chaos.',
            body: simpleBody('Most kitchens fail not because of cookware but because of storage.', 'Containers That Earn Their Place', 'Invest in a stainless steel masala dabba, graduated containers for dal, atta, rice, sugar and tea, and airtight fridge boxes. Cheap containers crack, lose their seals, and waste more food than they store.')
        },
        {
            id: 'first-visit',
            title: 'A Smart Plan for Your First Visit to Anupam Stores',
            image: asset('blog-4.png'),
            alt: 'Home and kitchen products to plan a first visit to Anupam Stores',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'If you’re new to Anupam Stores, a little planning goes a long way. Make a list before you arrive, visit on a weekday morning for a quieter experience, and ask staff for recommendations in appliances, cookware and gifting.',
            body: simpleBody('If you’re new to Anupam Stores, a little planning goes a long way.', 'Arrive With a List', 'Visit on a weekday morning, ask staff for recommendations, and watch for festival events like Bachat Ka Mahotsav. If you’re shopping in volume, head straight to Sukh Vrindavan for wholesale rates.')
        },
        {
            id: 'wholesale-bulk',
            title: 'Wholesale Categories Worth Sourcing in Bulk at Sukh Vrindavan',
            image: asset('blog-3.png'),
            alt: 'Wholesale aisles at Sukh Vrindavan Anupam Stores',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Sukh Vrindavan is built for buyers who need scale: kirana store owners, hostels, event planners and gift shops. Dinnerware, kitchen storage, towels, corporate and wedding gifting, and seasonal items like Diwali décor are particularly strong in bulk.',
            body: simpleBody('Sukh Vrindavan is built for buyers who need scale: kirana store owners, hostels, event planners and gift shops.', 'Where Bulk Buying Pays Back', 'Dinnerware, kitchen storage, towels, corporate and wedding gifting, and seasonal items like Diwali décor are particularly strong in wholesale. A single trip can replace weeks of price hunting.')
        },
        {
            id: 'budget-smartly',
            title: 'Plan Your Budget Smartly for a New Home Setup',
            image: asset('blog-2.png'),
            alt: 'Home setup pieces including décor, glassware and gifting items',
            date: 'May 7, 2026',
            author: 'Admin',
            category: 'News',
            excerpt: 'Most home setups go over budget because the priorities are unclear. Spend properly on non-negotiables such as a mattress, mixer-grinder, pressure cooker and gas stove.',
            body: simpleBody('Most home setups go over budget because the priorities are unclear.', 'Protect the 50-35-15 Split', 'Spend properly on a mattress, mixer-grinder, pressure cooker and gas stove. Buy reliable mid-range cookware and storage next, and postpone décor until you’ve lived in the space for a month.')
        }
    ];

    function blogCard(post, options = {}) {
        const href = Shared.blogUrl(post.id);
        const heading = options.heading || 'h2';
        const lazy = options.lazy ? ' loading="lazy"' : '';
        const slider = options.slider ? ' data-slider-item' : '';
        let variant = 'blog-card--image-left';
        if (options.vertical) variant = 'blog-card--vertical';
        else if (options.imageRight) variant = 'blog-card--image-right';
        return `
<article class="blog-card ${variant}"${slider}>
    <a class="blog-card-image" href="${href}">
        <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.alt)}" width="800" height="500"${lazy}>
    </a>
    <div class="blog-card-body">
        <${heading} class="blog-card-title"><a href="${href}">${escapeHtml(post.title)}</a></${heading}>
        <p class="blog-card-meta">
            <span>
                <span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                ${escapeHtml(post.date)}
            </span>
            <span class="blog-meta-sep" aria-hidden="true">|</span>
            <span>
                <span class="material-symbols-outlined" aria-hidden="true">person</span>
                By: ${escapeHtml(post.author)}
            </span>
            <span class="blog-meta-sep" aria-hidden="true">|</span>
            <span>
                <span class="material-symbols-outlined" aria-hidden="true">article</span>
                ${escapeHtml(post.category)}
            </span>
        </p>
        <p class="blog-excerpt">${escapeHtml(post.excerpt)}</p>
        <a class="blog-read-more" href="${href}">
            Read More
            <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </a>
    </div>
</article>`;
    }

    window.AnupamBlogs = {
        posts,
        byId(id) {
            return posts.find((item) => item.id === id) || null;
        },
        recent(excludeId, limit = 8) {
            return posts.filter((item) => item.id !== excludeId).slice(0, limit);
        },
        blogCard,
        escapeHtml
    };
})();

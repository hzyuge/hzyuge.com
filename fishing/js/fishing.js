/**
 * HZYUGE Fishing Journal - Blog Engine
 * Handles article listing, detail view, and dynamic content rendering.
 */

const AMAZON_TAG = 'hzyuge-20';
const ADSENSE_CLIENT = 'ca-pub-2958320523040643';
const ADSENSE_SLOT = '6909660918';

// ===== Article Data =====
const fishingArticles = [
    {
        id: 'first-bass-catch',
        file: 'articles/my-first-bass-catch-a-beginners-story.html',
        title: 'My First Bass Catch: A Beginner\'s Story',
        excerpt: 'The line went tight, the rod bent double, and my heart nearly exploded. Here\'s how my first bass catch changed everything I thought I knew about fishing.',
        category: 'Stories',
        date: '2026-05-28',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1544550581-8c3c4c3c3c3c?w=600&q=80'
    },
    {
        id: 'freshwater-spots',
        file: 'articles/best-freshwater-fishing-spots-near-me.html',
        title: 'Best Freshwater Fishing Spots: Hidden Gems Within 2 Hours',
        excerpt: 'Tired of crowded fishing piers? I spent three months exploring off-the-beaten-path lakes and rivers. Here are 5 spots that most anglers overlook.',
        category: 'Spots',
        date: '2026-05-25',
        readTime: '9 min',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'
    },
    {
        id: 'essential-gear-2026',
        file: 'articles/essential-fishing-gear-for-beginners-2026.html',
        title: 'Essential Fishing Gear for Beginners: Don\'t Waste Money on Fancy Stuff',
        excerpt: 'Walk into any tackle shop and you\'ll drown in options. After years of trial and error, here\'s the minimum gear that actually catches fish — without breaking the bank.',
        category: 'Gear',
        date: '2026-05-22',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1471104113180-1e5f8d8c8f7e?w=600&q=80'
    },
    {
        id: 'fly-vs-spinning',
        file: 'articles/fly-fishing-vs-spinning-which-is-right-for-you.html',
        title: 'Fly Fishing vs Spinning: Which One Should You Start With?',
        excerpt: 'Two completely different worlds. One is zen-like and artful. The other is practical and deadly effective. After doing both for years, here\'s my honest comparison.',
        category: 'Guides',
        date: '2026-05-20',
        readTime: '10 min',
        image: 'https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?w=600&q=80'
    },
    {
        id: 'night-fishing-tips',
        file: 'articles/night-fishing-tips-what-i-learned-the-hard-way.html',
        title: 'Night Fishing Tips: What I Learned the Hard Way',
        excerpt: 'Fishing in the dark is a completely different game. The fish behave differently. The gear needs are different. And the mistakes? They\'re way more expensive.',
        category: 'Tips',
        date: '2026-05-18',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=600&q=80'
    },
    {
        id: 'choose-fishing-rod',
        file: 'articles/how-to-choose-the-right-fishing-rod.html',
        title: 'How to Choose the Right Fishing Rod (Without Overthinking It)',
        excerpt: 'Length, power, action, material — the terminology is dizzying. But picking the right rod is simpler than most people think. Here\'s my no-BS guide.',
        category: 'Gear',
        date: '2026-05-15',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&q=80'
    }
];

// ===== Render Article List (Homepage) =====
function renderArticleList() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    grid.innerHTML = fishingArticles.map((article, i) => `
        <article class="article-card" onclick="location.href='${article.file}'" style="animation: fadeInUp ${0.3 + i * 0.1}s ease both;">
            <div class="card-image">
                <img src="${article.image}" alt="${article.title}" loading="${i < 3 ? 'eager' : 'lazy'}">
            </div>
            <div class="card-body">
                <span class="card-category">${article.category}</span>
                <h3><a href="${article.file}">${article.title}</a></h3>
                <p class="card-excerpt">${article.excerpt}</p>
                <div class="card-meta">
                    <span>📅 ${article.date}</span>
                    <span>⏱ ${article.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// ===== Render Sidebar Gear =====
function renderSidebarGear() {
    const gearList = document.getElementById('sidebar-gear');
    if (!gearList) return;

    const gearItems = [
        { name: 'Ugly Stik GX2 Spinning Rod', price: '$49.95', url: `https://www.amazon.com/dp/B008H4G0ZI/?tag=${AMAZON_TAG}` },
        { name: 'Penn Battle III Spinning Reel', price: '$109.95', url: `https://www.amazon.com/dp/B07G3H5R7Q/?tag=${AMAZON_TAG}` },
        { name: 'Plano Tackle Box (4-Tray)', price: '$24.99', url: `https://www.amazon.com/dp/B000E7XQ5O/?tag=${AMAZON_TAG}` },
        { name: 'Berkley Trilene XL Fishing Line', price: '$8.99', url: `https://www.amazon.com/dp/B0000AV0KI/?tag=${AMAZON_TAG}` },
        { name: 'Rapala Original Floating Lure', price: '$9.49', url: `https://www.amazon.com/dp/B0000BYNNI/?tag=${AMAZON_TAG}` }
    ];

    gearList.innerHTML = gearItems.map(item => `
        <a href="${item.url}" class="sidebar-gear-item" target="_blank" rel="nofollow sponsored">
            ${item.name}
            <span class="sidebar-gear-price">${item.price}</span>
        </a>
    `).join('');
}

// ===== Load AdSense Ads =====
function loadAdsenseAds() {
    // Wait for AdSense to be ready, then push all ad units
    if (typeof adsbygoogle !== 'undefined') {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // AdSense not fully loaded yet — retry on load
        }
    }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    renderArticleList();
    renderSidebarGear();

    // Load AdSense ads with a slight delay to ensure the script is ready
    setTimeout(loadAdsenseAds, 500);

    // Observe dynamically inserted adsbygoogle elements
    const observer = new MutationObserver(() => {
        document.querySelectorAll('ins.adsbygoogle').forEach(ins => {
            if (!ins.getAttribute('data-adsbygoogle-status')) {
                try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// ===== View Article (called from article pages) =====
function viewArticle(articleId) {
    const article = fishingArticles.find(a => a.id === articleId);
    if (!article) return;

    // Set back link
    const backLink = document.querySelector('.back-home');
    if (backLink) backLink.href = '/';

    // Set category
    const catEl = document.querySelector('.article-category');
    if (catEl) catEl.textContent = article.category;

    // Set title
    const titleEl = document.querySelector('.article-header h1');
    if (titleEl) titleEl.textContent = article.title;

    // Set date
    const dateEl = document.querySelector('.article-meta .article-date');
    if (dateEl) dateEl.textContent = article.date;

    // Set read time
    const readEl = document.querySelector('.article-meta .article-readtime');
    if (readEl) readEl.textContent = article.readTime;

    document.title = `${article.title} | HZYUGE Fishing`;
}

// ===== Helper: Insert Ad After Nth Paragraph =====
function insertAdAfterParagraph(containerSelector, paragraphIndex) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const paragraphs = container.querySelectorAll('p');
    if (paragraphs.length <= paragraphIndex) return;

    const adDiv = document.createElement('div');
    adDiv.className = 'ad-in-content';
    adDiv.innerHTML = `
        <div class="ad-label">Advertisement</div>
        <ins class="adsbygoogle"
             style="display:block; text-align:center;"
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="${ADSENSE_CLIENT}"
             data-ad-slot="${ADSENSE_SLOT}"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    `;
    paragraphs[paragraphIndex].after(adDiv);
}

// ===== Related Articles =====
function renderRelatedArticles(currentId) {
    const related = document.getElementById('related-articles');
    if (!related) return;

    const others = fishingArticles.filter(a => a.id !== currentId).slice(0, 3);
    related.innerHTML = `
        <h3>🎣 More Fishing Stories</h3>
        <div class="articles-grid" style="margin-top: 16px;">
            ${others.map(a => `
                <article class="article-card" onclick="location.href='${a.file}'">
                    <div class="card-image">
                        <img src="${a.image}" alt="${a.title}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <span class="card-category">${a.category}</span>
                        <h3>${a.title}</h3>
                        <div class="card-meta">
                            <span>📅 ${a.date}</span>
                            <span>⏱ ${a.readTime}</span>
                        </div>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
}

// ===== CSS Animation Keyframes (injected dynamically) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

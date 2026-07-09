/**
 * HZYUGE Fishing Journal - Blog Engine
 * Handles article listing, detail view, and dynamic content rendering.
 */

const AMAZON_TAG = 'hzyuge-20';
const ADSENSE_CLIENT = 'ca-pub-2958320523040643';
const ADSENSE_SLOT = '6909660918';

// ===== Article Data =====
const fishingArticles = [];

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

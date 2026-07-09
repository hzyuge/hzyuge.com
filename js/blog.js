/**
 * HZYUGE Cycling Journal - Main Script
 * Features: article loading, Amazon affiliate links, AdSense slots
 */

// ============================================
// Free Image Sources (Unsplash - no AI generated)
// ============================================
const IMAGES = {
    cyclist_road:  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    cyclist_climb:  "https://images.unsplash.com/photo-1571068315805-91c6ebc73008?w=800&q=80",
    bike_gear:      "https://images.unsplash.com/photo-1541625602811-6630a8cc1c03?w=800&q=80",
    bike_repair:    "https://images.unsplash.com/photo-1532298229144-0ec6e92c7a04?w=800&q=80",
    lake_ride:      "https://images.unsplash.com/photo-1476482758037-1d662a89c7d6?w=800&q=80",
    group_ride:     "https://images.unsplash.com/photo-1507035895480-2d92c1e51d0e?w=800&q=80",
    nutrition:      "https://images.unsplash.com/photo-1490645935966-10f6d09737e9?w=800&q=80",
    sunset_ride:    "https://images.unsplash.com/photo-1501555088652-021f10510620?w=800&q=80",
};

// ============================================
// Article Data
// ============================================
const articles = [];

// ============================================
// Amazon Affiliate Gear List
// ============================================
const AMAZON_TAG = "hzyuge-20";  // <-- Your Amazon Associate ID

const amazonGear = [
    { name: "Giro Syntax MIPS Helmet",     price: "$89.95", url: `https://www.amazon.com/dp/B087TKF1NM?tag=${AMAZON_TAG}` },
    { name: "CamelBak Podium Bottle",      price: "$12.99", url: `https://www.amazon.com/dp/B08RWX87L5?tag=${AMAZON_TAG}` },
    { name: "GU Energy Gel (24-pack)",      price: "$35.99", url: `https://www.amazon.com/dp/B0026R8C8S?tag=${AMAZON_TAG}` },
    { name: "Pearl iZUMi Bib Shorts",      price: "$64.99", url: `https://www.amazon.com/dp/B07FTVNQYX?tag=${AMAZON_TAG}` },
    { name: "Topeak Mini 20 Tool Kit",      price: "$26.95", url: `https://www.amazon.com/dp/B00CWWT8MY?tag=${AMAZON_TAG}` },
];

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    loadAmazonGear();
});

function loadArticles() {
    const grid = document.getElementById('articleGrid');
    if (!grid) return;

    grid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="card-image">
                <img src="${article.coverImage}" alt="${article.title}">
            </div>
            <div class="card-body">
                <div class="card-meta">
                    <span>${article.date}</span>
                    <span class="card-tag">${article.tag}</span>
                </div>
                <h3><a href="#" onclick="viewArticle('${article.slug}'); return false;">${article.title}</a></h3>
                <p class="card-excerpt">${article.excerpt}</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span>📖 ${estimateReadTime(article.content)} min read</span>
                    </div>
                    <a href="#" class="read-more" onclick="viewArticle('${article.slug}'); return false;">Read more →</a>
                </div>
            </div>
        </article>
    `).join('');
}

function viewArticle(slug) {
    const article = articles.find(a => a.slug === slug);
    if (!article) return;

    const grid = document.getElementById('articleGrid');
    const sectionTitle = document.querySelector('.section-title');

    const detailHTML = `
        <div class="article-detail" id="articleDetail">
            <a href="#" class="back-link" onclick="backToArticles(); return false;" style="display:inline-block;margin-bottom:16px;color:var(--green);font-weight:600;">← Back to articles</a>
            <div class="article-header">
                <div class="card-meta">
                    <span>${article.date}</span>
                    <span class="card-tag">${article.tag}</span>
                    <span>📖 ${estimateReadTime(article.content)} min read</span>
                </div>
                <h1>${article.title}</h1>
            </div>
            <div class="article-content">
                ${article.content}
            </div>
            <div class="ad-in-content">
                <div class="ad-label">Advertisement</div>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-2958320523040643"
                     data-ad-slot="6909660918"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
        </div>
    `;

    grid.innerHTML = detailHTML;
    sectionTitle.textContent = article.title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToArticles() {
    const grid = document.getElementById('articleGrid');
    const sectionTitle = document.querySelector('.section-title');
    sectionTitle.innerHTML = '<span class="title-icon">📝</span> Latest Articles';
    grid.innerHTML = '';
    loadArticles();
}

function estimateReadTime(content) {
    const text = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, minutes);
}

function loadAmazonGear() {
    const list = document.getElementById('amazonGearList');
    if (!list) return;

    list.innerHTML = amazonGear.map(gear => `
        <li>
            <a href="${gear.url}" target="_blank" rel="nofollow sponsored">
                🛒 ${gear.name}
                <span class="gear-price">${gear.price}</span>
            </a>
        </li>
    `).join('');
}

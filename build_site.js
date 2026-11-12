const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'stitch_bilingual_local_seo_website_platform');
const arDir = path.join(__dirname, 'ar');
const enDir = path.join(__dirname, 'en');
const designDir = path.join(__dirname, 'design');

if (!fs.existsSync(arDir)) fs.mkdirSync(arDir, { recursive: true });
if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
if (!fs.existsSync(designDir)) fs.mkdirSync(designDir, { recursive: true });

// Copy DESIGN.md if needed
const designSrc = path.join(srcDir, 'jaliblaat_al_batin_luxury_stoneworks', 'DESIGN.md');
if (fs.existsSync(designSrc)) {
  fs.copyFileSync(designSrc, path.join(designDir, 'DESIGN.md'));
}

function injectHeadTags(html, { title, description, keywords, canonical, arUrl, enUrl, ogTitle, ogDesc, ogType, isArabic }) {
  // Ensure title exists or replace existing
  let processed = html;
  
  // Font enhancement for Arabic if not present
  if (isArabic && !processed.includes('IBM+Plex+Sans+Arabic')) {
    processed = processed.replace('IBM+Plex+Sans:wght', 'IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght');
  }

  // Remove existing title if any
  processed = processed.replace(/<title>.*?<\/title>/gi, '');

  const metaTags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    keywords ? `<meta name="keywords" content="${keywords}">` : '',
    `<meta name="author" content="JaliBlaat Al Batin Luxury Stoneworks">`,
    `<meta name="robots" content="index, follow">`,
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="alternate" hreflang="ar" href="${arUrl}">`,
    `<link rel="alternate" hreflang="en" href="${enUrl}">`,
    `<link rel="alternate" hreflang="x-default" href="https://jaliblaat-albatin.com/">`,
    `<meta property="og:title" content="${ogTitle || title}">`,
    `<meta property="og:description" content="${ogDesc || description}">`,
    `<meta property="og:type" content="${ogType || 'website'}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:locale" content="${isArabic ? 'ar_SA' : 'en_US'}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${ogTitle || title}">`,
    `<meta name="twitter:description" content="${ogDesc || description}">`
  ].filter(Boolean).join('\n    ');

  // Insert right after <head> or after viewport
  if (processed.includes('name="viewport"/>')) {
    processed = processed.replace('name="viewport"/>', `name="viewport"/>\n    ${metaTags}`);
  } else if (processed.includes('<head>')) {
    processed = processed.replace('<head>', `<head>\n    ${metaTags}`);
  }

  return processed;
}

// 1. Process AR Home (_1)
console.log('Processing AR Home (from _1)...');
let arHome = fs.readFileSync(path.join(srcDir, '_1', 'code.html'), 'utf8');
arHome = injectHeadTags(arHome, {
  title: 'جلي بلاط حفرالباطن | جلي وتلميع رخام وبلاط بأحدث التقنيات | جلي بلاط الباطن',
  description: 'أفضل مؤسسة جلي وتلميع رخام وبلاط وسيراميك بحفر الباطن بأحدث ماكينات كلياندكس الإيطالية وأقراص الألماس. معالجة الترويبات، كريستال إيطالي، معاينة مجانية وضمان معتمد.',
  keywords: 'جلي بلاط حفر الباطن, جلي رخام حفر الباطن, تلميع سيراميك حفر الباطن, شركة جلي بلاط بحفر الباطن, اسعار جلي البلاط حفر الباطن',
  canonical: 'https://jaliblaat-albatin.com/ar/',
  arUrl: 'https://jaliblaat-albatin.com/ar/',
  enUrl: 'https://jaliblaat-albatin.com/en/',
  ogTitle: 'جلي بلاط حفرالباطن | جلي وتلميع رخام وبلاط بأحدث ماكينات كلياندكس الإيطالية',
  isArabic: true
});

// Add section IDs to AR Home so anchors work
arHome = arHome.replace('<!-- SECTION 3: WHY CHOOSE US', '<div id="about"></div><!-- SECTION 3: WHY CHOOSE US');
arHome = arHome.replace('<!-- SECTION 4: INTERACTIVE BEFORE & AFTER SHOWCASE', '<div id="our-work"></div><!-- SECTION 4: INTERACTIVE BEFORE & AFTER SHOWCASE');
arHome = arHome.replace('<!-- SECTION 6: DISTRICTS COVERAGE GRID', '<div id="service-areas"></div><!-- SECTION 6: DISTRICTS COVERAGE GRID');
arHome = arHome.replace('<!-- SECTION 7: SEARCH-OPTIMIZED FAQ SECTION', '<div id="faq"></div><!-- SECTION 7: SEARCH-OPTIMIZED FAQ SECTION');
arHome = arHome.replace('<!-- SECTION 8: FAST BOOKING & WHATSAPP QUOTE FORM', '<div id="quote-form"></div><!-- SECTION 8: FAST BOOKING & WHATSAPP QUOTE FORM');

// Fix AR Nav links
arHome = arHome.replace(/data-path="home" href="#"/g, 'data-path="home" href="index.html"');
arHome = arHome.replace(/data-path="about" href="#"/g, 'data-path="about" href="#about"');
arHome = arHome.replace(/data-path="services" href="#"/g, 'data-path="services" href="#services-grid"');
arHome = arHome.replace(/data-path="our-work" href="#"/g, 'data-path="our-work" href="gallery.html"');
arHome = arHome.replace(/data-path="pricing-guide" href="#"/g, 'data-path="pricing-guide" href="pricing.html"');
arHome = arHome.replace(/data-path="service-areas" href="#"/g, 'data-path="service-areas" href="#service-areas"');
arHome = arHome.replace(/data-path="contact" href="#"/g, 'data-path="contact" href="#quote-form"');
arHome = arHome.replace(/href="\/en\/"/g, 'href="../en/index.html"');

fs.writeFileSync(path.join(arDir, 'index.html'), arHome, 'utf8');

// 2. Process AR Mobile (_2)
console.log('Processing AR Mobile (from _2)...');
let arMobile = fs.readFileSync(path.join(srcDir, '_2', 'code.html'), 'utf8');
arMobile = injectHeadTags(arMobile, {
  title: 'جلي وتلميع بلاط ورخام بحفر الباطن | اتصال فوري وواتساب 24/7',
  description: 'خدمة سريعة ومعاينة مجانية لجلي الرخام والبلاط في جميع أحياء حفر الباطن. تواصل فوري عبر الواتساب والمكالمات الهاتفية مع فريق المعاينة.',
  canonical: 'https://jaliblaat-albatin.com/ar/mobile.html',
  arUrl: 'https://jaliblaat-albatin.com/ar/mobile.html',
  enUrl: 'https://jaliblaat-albatin.com/en/mobile.html',
  isArabic: true
});
arMobile = arMobile.replace(/href="\/en\/"/g, 'href="../en/mobile.html"');
fs.writeFileSync(path.join(arDir, 'mobile.html'), arMobile, 'utf8');

// 3. Process AR Pricing (_3)
console.log('Processing AR Pricing (from _3)...');
let arPricing = fs.readFileSync(path.join(srcDir, '_3', 'code.html'), 'utf8');
arPricing = injectHeadTags(arPricing, {
  title: 'أسعار جلي البلاط والرخام بحفر الباطن 2025 | حاسبة التكلفة المباشرة | جلي بلاط الباطن',
  description: 'تعرف على أسعار جلي الرخام والبلاط والجرانيت في حفر الباطن لعام 2025 بالمتر المربع. حاسبة تكلفة تفاعلية، شفافية كاملة وبدون رسوم معاينة مخفية.',
  keywords: 'اسعار جلي البلاط حفر الباطن, سعر جلي الرخام حفر الباطن, تكلفة جلي السيراميك, اسعار جلي البلاط والرخام',
  canonical: 'https://jaliblaat-albatin.com/ar/pricing.html',
  arUrl: 'https://jaliblaat-albatin.com/ar/pricing.html',
  enUrl: 'https://jaliblaat-albatin.com/en/pricing.html',
  isArabic: true
});

// Fix AR Pricing Nav links
arPricing = arPricing.replace(/data-path="home" href="#"/g, 'data-path="home" href="index.html"');
arPricing = arPricing.replace(/data-path="about" href="#"/g, 'data-path="about" href="index.html#about"');
arPricing = arPricing.replace(/data-path="services" href="#"/g, 'data-path="services" href="index.html#services-grid"');
arPricing = arPricing.replace(/data-path="our-work" href="#"/g, 'data-path="our-work" href="gallery.html"');
arPricing = arPricing.replace(/data-path="pricing-guide" href="#"/g, 'data-path="pricing-guide" href="pricing.html"');
arPricing = arPricing.replace(/data-path="service-areas" href="#"/g, 'data-path="service-areas" href="index.html#service-areas"');
arPricing = arPricing.replace(/data-path="contact" href="#"/g, 'data-path="contact" href="index.html#quote-form"');
arPricing = arPricing.replace(/href="\/en\/"/g, 'href="../en/pricing.html"');

// Inject Pricing Schema into ar/pricing.html if not present
if (!arPricing.includes('application/ld+json')) {
  const pricingSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "name": "أسعار جلي وتلميع الرخام والبلاط بحفر الباطن 2025",
  "minPrice": "12",
  "maxPrice": "35",
  "priceCurrency": "SAR",
  "unitText": "متر مربع",
  "description": "أسعار رسمية ومعتمدة لجلي الرخام والبلاط بحفر الباطن تشمل الصنفرة بالألماس والتلميع بالكريستال الإيطالي ومعالجة الترويبات مجاناً."
}
</script>`;
  arPricing = arPricing.replace('</head>', `${pricingSchema}\n</head>`);
}
fs.writeFileSync(path.join(arDir, 'pricing.html'), arPricing, 'utf8');

// 4. Process AR Gallery (_4)
console.log('Processing AR Gallery (from _4)...');
let arGallery = fs.readFileSync(path.join(srcDir, '_4', 'code.html'), 'utf8');
arGallery = injectHeadTags(arGallery, {
  title: 'معرض أعمال جلي الرخام والبلاط قبل وبعد بحفر الباطن | جلي بلاط الباطن',
  description: 'شاهد نتائج جلي وتلميع الرخام والبلاط والجرانيت قبل وبعد في فلل ومساجد وقصور حفر الباطن. صور ومقارنات واقعية بتقنية الكريستال الإيطالي.',
  keywords: 'معرض اعمال جلي بلاط حفر الباطن, قبل وبعد جلي الرخام, تلميع رخام حفر الباطن',
  canonical: 'https://jaliblaat-albatin.com/ar/gallery.html',
  arUrl: 'https://jaliblaat-albatin.com/ar/gallery.html',
  enUrl: 'https://jaliblaat-albatin.com/en/',
  isArabic: true
});

arGallery = arGallery.replace(/data-path="home" href="#"/g, 'data-path="home" href="index.html"');
arGallery = arGallery.replace(/data-path="about" href="#"/g, 'data-path="about" href="index.html#about"');
arGallery = arGallery.replace(/data-path="services" href="#"/g, 'data-path="services" href="index.html#services-grid"');
arGallery = arGallery.replace(/data-path="our-work" href="#"/g, 'data-path="our-work" href="gallery.html"');
arGallery = arGallery.replace(/data-path="pricing-guide" href="#"/g, 'data-path="pricing-guide" href="pricing.html"');
arGallery = arGallery.replace(/data-path="service-areas" href="#"/g, 'data-path="service-areas" href="index.html#service-areas"');
arGallery = arGallery.replace(/data-path="contact" href="#"/g, 'data-path="contact" href="index.html#quote-form"');
arGallery = arGallery.replace(/href="\/en\/"/g, 'href="../en/index.html"');
fs.writeFileSync(path.join(arDir, 'gallery.html'), arGallery, 'utf8');

// 5. Process AR App View (_5)
console.log('Processing AR App View (from _5)...');
let arApp = fs.readFileSync(path.join(srcDir, '_5', 'code.html'), 'utf8');
arApp = injectHeadTags(arApp, {
  title: 'تطبيق جلي بلاط حفرالباطن | حجز فوري ومعاينة مجانية',
  description: 'تطبيق ويب سريع لحجز معاينة جلي الرخام والبلاط في جميع أحياء حفر الباطن.',
  canonical: 'https://jaliblaat-albatin.com/ar/app-view.html',
  arUrl: 'https://jaliblaat-albatin.com/ar/app-view.html',
  enUrl: 'https://jaliblaat-albatin.com/en/mobile.html',
  isArabic: true
});
fs.writeFileSync(path.join(arDir, 'app-view.html'), arApp, 'utf8');

// 6. Process EN Home
console.log('Processing EN Home...');
let enHome = fs.readFileSync(path.join(srcDir, 'tile_polishing_in_hafar_al_batin_jaliblaat_al_batin_english', 'code.html'), 'utf8');
enHome = injectHeadTags(enHome, {
  title: 'Tile & Marble Polishing in Hafar Al-Batin | JaliBlaat Al Batin Luxury Stoneworks',
  description: 'Premier tile and marble polishing services in Hafar Al-Batin using Italian Klindex planetary diamond grinding. Free in-person site assessment and guaranteed high-gloss finish.',
  keywords: 'tile polishing hafar al batin, marble polishing hafar al batin, floor restoration saudi arabia, jaliblaat al batin',
  canonical: 'https://jaliblaat-albatin.com/en/',
  arUrl: 'https://jaliblaat-albatin.com/ar/',
  enUrl: 'https://jaliblaat-albatin.com/en/',
  isArabic: false
});

// Add missing section IDs
enHome = enHome.replace('<!-- SECTION 3: WHY CHOOSE US', '<div id="about"></div><!-- SECTION 3: WHY CHOOSE US');

// Fix EN Nav links
enHome = enHome.replace(/data-path="home" href="#"/g, 'data-path="home" href="index.html"');
enHome = enHome.replace(/data-path="about" href="#"/g, 'data-path="about" href="#about"');
enHome = enHome.replace(/data-path="services" href="#"/g, 'data-path="services" href="#services-grid"');
enHome = enHome.replace(/data-path="our-work" href="#our-work"/g, 'data-path="our-work" href="../ar/gallery.html"');
enHome = enHome.replace(/data-path="pricing-guide" href="#quote-form"/g, 'data-path="pricing-guide" href="pricing.html"');
enHome = enHome.replace(/data-path="service-areas" href="#service-areas"/g, 'data-path="service-areas" href="#service-areas"');
enHome = enHome.replace(/data-path="contact" href="#quote-form"/g, 'data-path="contact" href="#quote-form"');
enHome = enHome.replace(/href="\/" lang="ar"/g, 'href="../ar/index.html" lang="ar"');

fs.writeFileSync(path.join(enDir, 'index.html'), enHome, 'utf8');

// 7. Process EN Pricing
console.log('Processing EN Pricing...');
let enPricing = fs.readFileSync(path.join(srcDir, 'tile_polishing_cost_in_hafar_al_batin_pricing_guide_english', 'code.html'), 'utf8');
enPricing = injectHeadTags(enPricing, {
  title: 'Tile & Marble Polishing Cost in Hafar Al-Batin 2025 | Pricing Guide & Calculator',
  description: 'Official 2025 tile and marble polishing price matrix in Hafar Al-Batin. Transparent per-square-meter rates, interactive calculator, and zero hidden callout fees.',
  keywords: 'tile polishing cost hafar al batin, marble polishing price saudi arabia, floor polishing rates per m2',
  canonical: 'https://jaliblaat-albatin.com/en/pricing.html',
  arUrl: 'https://jaliblaat-albatin.com/ar/pricing.html',
  enUrl: 'https://jaliblaat-albatin.com/en/pricing.html',
  isArabic: false
});

enPricing = enPricing.replace(/data-path="home" href="#"/g, 'data-path="home" href="index.html"');
enPricing = enPricing.replace(/data-path="about" href="#"/g, 'data-path="about" href="index.html#about"');
enPricing = enPricing.replace(/data-path="services" href="#services-grid"/g, 'data-path="services" href="index.html#services-grid"');
enPricing = enPricing.replace(/data-path="our-work" href="#our-work"/g, 'data-path="our-work" href="../ar/gallery.html"');
enPricing = enPricing.replace(/data-path="pricing-guide" href="#quote-form"/g, 'data-path="pricing-guide" href="pricing.html"');
enPricing = enPricing.replace(/data-path="service-areas" href="#service-areas"/g, 'data-path="service-areas" href="index.html#service-areas"');
enPricing = enPricing.replace(/data-path="contact" href="#quote-form"/g, 'data-path="contact" href="index.html#quote-form"');
enPricing = enPricing.replace(/href="\/" lang="ar"/g, 'href="../ar/pricing.html" lang="ar"');

// Inject EN Pricing Schema
if (!enPricing.includes('application/ld+json')) {
  const enPricingSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "name": "Tile & Marble Polishing Rates 2025 - Hafar Al-Batin",
  "minPrice": "12",
  "maxPrice": "35",
  "priceCurrency": "SAR",
  "unitText": "m2",
  "description": "Standard verified rates for residential and commercial diamond wet-crystallization floor polishing in Hafar Al-Batin."
}
</script>`;
  enPricing = enPricing.replace('</head>', `${enPricingSchema}\n</head>`);
}

fs.writeFileSync(path.join(enDir, 'pricing.html'), enPricing, 'utf8');

// 8. Process EN Mobile
console.log('Processing EN Mobile...');
let enMobile = fs.readFileSync(path.join(srcDir, 'tile_polishing_in_hafar_al_batin_mobile_english', 'code.html'), 'utf8');
enMobile = injectHeadTags(enMobile, {
  title: 'Tile & Marble Polishing in Hafar Al-Batin | Instant Mobile Quote',
  description: 'Fast mobile tile and marble polishing quote across Hafar Al-Batin. Chat on WhatsApp or call for immediate on-site inspection.',
  canonical: 'https://jaliblaat-albatin.com/en/mobile.html',
  arUrl: 'https://jaliblaat-albatin.com/ar/mobile.html',
  enUrl: 'https://jaliblaat-albatin.com/en/mobile.html',
  isArabic: false
});
enMobile = enMobile.replace(/href="\/" lang="ar"/g, 'href="../ar/mobile.html" lang="ar"');
fs.writeFileSync(path.join(enDir, 'mobile.html'), enMobile, 'utf8');

console.log('All 8 pages successfully generated with SEO and interlinking!');

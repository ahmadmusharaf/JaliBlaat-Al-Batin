# JaliBlaat Al Batin (جلي بلاط حفرالباطن) - Bilingual Local SEO Website Platform

A high-performance, bilingual (Arabic RTL / English LTR) local SEO website platform for **JaliBlaat Al Batin Luxury Stoneworks**, specializing in marble, tile, and stone restoration in Hafar Al-Batin, Eastern Province, Saudi Arabia.

---

## 📁 Project Structure

```text
├── index.html                  # Intelligent root gateway (auto-detects language ar/en + fallback card)
├── ar/                         # Arabic Platform (RTL)
│   ├── index.html              # Main Arabic Landing Page & Service Showcase
│   ├── pricing.html            # 2025 Price Guide & Interactive Floor Cost Calculator
│   ├── gallery.html            # Before & After Project Transformation Portfolio
│   ├── mobile.html             # High-conversion mobile-first landing page
│   └── app-view.html           # Lightweight app-like tab navigation interface
│
├── en/                         # English Platform (LTR)
│   ├── index.html              # Main English Landing Page
│   ├── pricing.html            # 2025 Price Matrix & Quote Estimator
│   └── mobile.html             # Mobile-optimized English interface
│
├── design/
│   └── DESIGN.md               # Complete Material token specifications, palette & typography rules
│
├── build_site.js               # Node.js build & SEO generator script
├── .gitignore                  # Git ignore rules
└── README.md                   # Documentation & deployment guide
```

---

## 🚀 Key Features

* **Bilingual SEO Engine:** Full Arabic (`dir="rtl"`, `lang="ar"`) and English (`dir="ltr"`, `lang="en"`) setup with bidirectional `hreflang` tags (`ar`, `en`, and `x-default`).
* **Complete Metadata & Social Sharing:** High-intent `<title>`, `<meta name="description">`, OpenGraph, and Twitter cards embedded across all pages.
* **Schema.org JSON-LD Structured Data:**
  * `HomeAndConstructionBusiness` schema including local geo-coordinates (`28.4342, 45.9636`), neighborhood service areas (العزيزية، الخالدية، المحمدية، البلدية), and pricing range.
  * `PriceSpecification` schema on pricing pages.
  * Search engine-optimized FAQ schemas.
* **Conversion-Driven Architecture:** Direct WhatsApp quotation dispatcher and one-tap telephone calls.
* **Interactive Calculators & Sliders:** Live cost calculators per square meter and before/after comparison sliders.

---

## 🛠️ Customization Guide

### 1. Updating Contact Information
To change the placeholder phone numbers (`+966500000000`) and WhatsApp links across all pages:
* Open `ar/index.html`, `ar/pricing.html`, `en/index.html`, etc.
* Find and replace `966500000000` with your verified Saudi business WhatsApp number (e.g. `966512345678`).
* Replace `+966 5X XXX XXXX` with your display phone number.

### 2. Updating Domain Name
The canonical URLs currently point to `https://jaliblaat-albatin.com/`. If you use a different domain:
* Search and replace `https://jaliblaat-albatin.com` with your production domain.

---

## 🌐 Deployment Options

### GitHub Pages
1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`. Click **Save**.
4. Your website is live within minutes!

### Vercel / Netlify
* Simply drag and drop this project directory into the Netlify dashboard or import the GitHub repository into Vercel. Static HTML/JS deploys with zero build configuration needed.

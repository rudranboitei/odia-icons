# DESIGN.md — pop.site (Pop Site)

> Source: live page at https://pop.site/ (fetched 19 Nov 2026).
>
> **Legend**
> - ✅ **Verified**: read directly from the page content or markup.
> - 🟡 **Inferred**: a reasonable reading of the verified content.
> - ⬜ **Not extracted**: I could not read it (see section 8 to fill it in exactly).
>
> **Important:** the fetch returned the page text, structure, links and image sizes, but not its CSS or rendered pixels, and the image files themselves were blocked. So colors, fonts, radii, spacing and shadows are **not** in this document. Section 8 has a 30-second console script that pulls them exactly.

---

## 1. Overview

| | |
|---|---|
| ✅ Product | No-code website builder for creators, freelancers and small businesses (link-in-bio, portfolio, business site, online school, membership, digital product shop) |
| ✅ Company | Pop Website Technology Corp |
| ✅ Positioning | "Make a stunning site." Free to start, Pro from $10/mo |
| ✅ Social proof | 10K+ people, 50+ countries, 600K+ combined subscribers (featured creator), 100K+ visitors/month (testimonial) |
| ✅ Color scheme | `meta color-scheme: light` (light-only site) |
| 🟡 Tone | Confident, short, benefit-first. Numbers everywhere. Friendly, creator-focused |

## 2. Tech and metadata (✅)

- Built with **Framer** (generator build `fb64017`).
- Framer search index is published for the site.
- `robots: max-image-preview:large`.
- `viewport: width=device-width`.
- Open Graph and Twitter: `summary_large_image`, one shared image, same title and description as the page.
- Title: *Pop Site - Make your free personal site. For Creators, Freelancers & Businesses*
- Description: *Pop Site is a simple, no-code website builder for creators, freelancers, and small businesses. Build and publish a professional website in minutes with customizable sections, forms, analytics, payments, and more. No coding required.*
- Media is hosted on Framer's CDN (images, plus MP4 for videos).
- **Breakpoint variants are duplicated in the DOM** (✅): the nav, most headings, some paragraphs, and footer appear twice. This is how Framer ships separate desktop and mobile variants.

## 3. Page anatomy, top to bottom

Every section follows the same formula (🟡 pattern, ✅ content):

```
[small icon] EYEBROW  →  H2 headline  →  one-line subhead  →  (claim box or content)  →  visual
```

### 3.1 Navigation (✅)
- Logo (links to `/`)
- Links: **Pricing** (`/pricing`), **Blog** (`/blog`)
- Actions: **Log In** (`app.pop.site?signin`), **Create Account** (`app.pop.site`) as the primary action
- Two variants in the DOM (desktop and mobile)

### 3.2 Hero (✅ content)
1. Eyebrow with a small icon: **"Join 10K+ People"**
2. H1: **"Make a stunning site."**
3. Subline: *Used by 10K+ people in over 50 countries.*
4. **Claim box**: input with a fixed `.pop.site` suffix, button **"Claim your site"**, helper text *No credit card required.*
5. **Phone mockup showcase**: 5 phones, each built from 3 stacked image layers:
   - back layer PNG, 2292×3366
   - site screenshot JPG/PNG, portrait (804×1748, 804×1792, 1206×2688)
   - top overlay PNG, 1888×3832 (🟡 the bezel/shine)

### 3.3 "Powerful Site Sections" (✅)
- Eyebrow: *Powerful Site Sections*
- H2: **"Use pre-built sections to easily make your site."**
- Sub: *Showcase forms, services, testimonials, products and more.*
- **9 cards**, each = image (4:3: 3840×2880 or 1920×1440) + title + one-line description:

| Card | Description |
|---|---|
| Links Section | Put all your socials and links in a single place to make it easy for people to discover you. |
| Services | Clearly display your services, pricing, and descriptions to attract more clients. |
| Forms Section | Capture inquiries with customizable forms to grow your business. |
| Testimonials Section | Build trust by showcasing real customer feedback and success stories. |
| Shop | Powered by Shopify, connect your existing or new store to power shopping. |
| FAQs Section | Answer questions upfront to build trust and save time for you and customers. |
| Gallery Section | Show the world your visual works and even add links to boost engagement. |
| Socials Section | Link everything in one place so visitors easily connect with your platforms. |
| Videos Section | Feature one or more videos to engage visitors and increase conversions. |

- Then a row labelled **"Plus tons more"** with 5 small square icons (160×160).

### 3.4 Creator story / video (✅)
- Eyebrow: *Loved by 10,000+ People*
- H2: **"Made for creators and people running a business."**
- Sub: *Watch Youtuber and business owner Oliur talk about Pop Site.*
- Claim box (same component) + helper *No credit card required*
- **Autoplay-style MP4** (hosted on Framer CDN)
- Creator chip: avatar 300×300, **Oliur**, link `oliur.pop.site`, **"600K+ Combined Subscribers"**

### 3.5 "Customize from your phone or desktop" (✅)
- Eyebrow: *Loved by 10K+ site makers*
- H2: **"Customize from your phone or desktop."**
- Sub: *Create, edit and publish from any device.*
- A list of **3 product screenshots** (3840×2880, 4:3), 🟡 a tabbed or carousel gallery

### 3.6 "Make Money Online" (✅)
- Eyebrow: *Make Money Online*
- H2: **"Sell memberships, courses, digital products and more."**
- Paragraph: *Add a sign-in option to your site, and let members access your content, courses, downloads, digital products, and more.*
- Wide image 1206×497 (≈2.4:1)
- **3 steps**:
  1. **Build your site**: Use Pop Site's pre-built themes and sections to create a stunning site.
  2. **Sell on your site**: Sell courses, digital products, memberships and more.
  3. **Grow your sales**: Track what's working with real data from visitors and customers.

### 3.7 Testimonial card (✅)
- Background photo 2595×1955 + avatar 912×866
- Quote: *"My site was done before my coffee was, I get over 100K visitors a month now."*
- **Django Degree** · `django.pop.site` · **105K Followers**

### 3.8 Built-in Analytics (✅)
- H2 with a **highlighted phrase**: `==Built-in Analytics==` (the source marks it as emphasized, 🟡 a marker or colored highlight)
- Paragraph: *Advanced UTM campaign tracking, live visitor alerts and more. Analytics that go beyond what Framer, Webflow and others offer.*
- **6 feature bullets**: Track button clicks · Get live visitor alerts · UTM tracking · Track visits by device type · Track where people visit from · Track geographical information
- Product image 1200×1027 (appears 3×, 🟡 breakpoint or stacked variants)

### 3.9 "You should look credible" (✅)
- Eyebrow: *Loved by 10K+ site makers*
- H2: **"You should look credible. Pop Site does that."**
- Sub: *Designer-made themes give your site a polished, professional look that builds instant credibility.*
- 3 wide images (522×186, 507×186, 522×186), 🟡 badges or logo chips
- MP4 + tall phone image 1470×3066

### 3.10 Free / pricing nudge (✅)
- H2: **"Free to create and share."**
- Sub: *Free. Pro features start at just $10/mo.*
- Claim box + MP4

### 3.11 Themes (✅)
- Eyebrow: *Curated by Award-Winning Designers*
- H2 (two variants): **"Look incredible with stunning, free themes."** / **"Themes on Pop Site are stunning and free to use."**
- Sub: *Designer-made themes give your site a professional, standout look.*
- MP4 (same file as 3.10)

### 3.12 Final CTA (✅)
- Eyebrow: *Join 10K+ Site Makers*
- H2: **"It's time to claim yours."**
- H3 with icon: **"Get your URL before someone else takes it."**
- Claim box, helper *No Credit Card Required*
- The same 5-phone showcase as the hero

### 3.13 FAQ (✅)
- Eyebrow: *Loved by 10K+ Site Makers*
- H2: **"Join 10K+ people"** + claim box
- Accordion with 6 Q&As:
  1. What is Pop Site?
  2. Can I use Pop Site as my portfolio?
  3. Can I build my business website on Pop Site?
  4. Can I run my online school on Pop Site?
  5. Can I run my membership on Pop Site?
  6. Can I sell digital products on Pop Site?
- Answers are 1–2 sentences, starting with "Yes." Each item also carries a `framer.link` referral link (🟡 a Framer template credit).

### 3.14 Footer (✅)
- **Pop Website Technology Corp**
- Columns: **Use** (Sign In, Blog, Support, Featured, Press & Media) · **Legal** (Terms, Privacy, My Information, GDPR & CPRA) · **More** (X/Twitter, Instagram)
- *2026 © All Rights Reserved*

## 4. Component inventory

| Component | Where | Notes |
|---|---|---|
| **Eyebrow pill** | Every section | Small 160×160 icon image + short label. Icons are reused across sections (✅ same files recur) |
| **Claim box** | Hero, 3.4, 3.10, 3.12, 3.13 (5×) | Input with fixed `.pop.site` suffix + "Claim your …" button + tiny reassurance line. The core conversion component (✅) |
| **Phone mockup** | Hero, final CTA | 3 stacked layers per phone, 5 phones (✅ layers, 🟡 roles) |
| **Section card** | 3.3 | Image (4:3) + title + one-line desc (✅) |
| **Icon row** | "Plus tons more" | 5 small square icons (✅) |
| **Video block** | 3.4, 3.9, 3.10, 3.11 | MP4 from Framer CDN (✅) |
| **Creator chip / testimonial** | 3.4, 3.7 | Avatar + name + link + audience size (✅) |
| **Step list** | 3.6 | 3 items, title + 1 line (✅) |
| **Bullet list** | 3.8 | 6 short feature lines (✅) |
| **Accordion** | 3.13 | 6 items (✅) |
| **Footer columns** | 3.14 | 3 link groups (✅) |

## 5. Copywriting patterns (✅ → 🟡 rules)

- H1/H2 are short, imperative or promise-based: *Make a stunning site.* · *It's time to claim yours.*
- Every section opens with a **social-proof eyebrow** ("Loved by 10K+ …", "Join 10K+ …").
- One-line subheads, no jargon. Concrete numbers: 10K+, 50 countries, 600K+, 100K+, $10/mo.
- Same CTA verb throughout: **Claim**. The reassurance line is always *No credit card required.*
- FAQ answers start with "Yes." and name the use case.
- Cards use a *Noun + short benefit sentence* pair.

## 6. Layout and responsive behavior

- ✅ Separate desktop and mobile variants exist for the nav, headings, some paragraphs and the footer.
- ✅ Image ratios: cards 4:3, gallery 4:3, step banner ≈2.4:1, phone screenshots ≈9:19.5, avatars 1:1.
- 🟡 Single centered column of sections; cards in a multi-column grid on desktop that collapses on mobile.
- ⬜ Exact breakpoints, container width, grid gaps and section padding (see section 8).

## 7. Motion and media

- ✅ Four sections use MP4 video (hosted on Framer's CDN).
- ✅ The phone showcase repeats the same 5-phone set in the hero and the final CTA.
- 🟡 Framer-style scroll reveals and hover effects on cards; I could not observe the animations themselves.
- ⬜ Durations, easings and scroll triggers.

## 8. Design tokens — ⬜ not extracted

I could not read these from the page. Fill them from the live site with the script below.

| Token | Value |
|---|---|
| Background | ⬜ |
| Foreground / text | ⬜ |
| Muted text | ⬜ |
| Border | ⬜ |
| Primary button bg / text | ⬜ |
| Accent / highlight | ⬜ |
| Font family (headings / body) | ⬜ |
| H1 / H2 / H3 / body size, weight, line-height, tracking | ⬜ |
| Radius (cards, buttons, input, pills) | ⬜ |
| Shadows | ⬜ |
| Container max-width, section padding, grid gap | ⬜ |
| Breakpoints | ⬜ |

**How to extract:** open https://pop.site, press `F12` → Console, paste this, press Enter. It copies a JSON summary to your clipboard.

```js
(() => {
  const tally = (m, k) => { if (k) m[k] = (m[k] || 0) + 1 };
  const top = (m, n = 8) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);
  const C = {}, BG = {}, BR = {}, SH = {}, FF = {};
  document.querySelectorAll("body *").forEach((el) => {
    const s = getComputedStyle(el);
    tally(C, s.color);
    if (s.backgroundColor !== "rgba(0, 0, 0, 0)") tally(BG, s.backgroundColor);
    if (s.borderRadius !== "0px") tally(BR, s.borderRadius);
    if (s.boxShadow !== "none") tally(SH, s.boxShadow);
    tally(FF, s.fontFamily);
  });
  const type = {};
  ["h1", "h2", "h3", "p", "a", "button", "input"].forEach((t) => {
    const el = document.querySelector(t);
    if (!el) return;
    const s = getComputedStyle(el);
    type[t] = {
      family: s.fontFamily, size: s.fontSize, weight: s.fontWeight,
      lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
      color: s.color, bg: s.backgroundColor, radius: s.borderRadius,
      padding: s.padding,
    };
  });
  const out = {
    colors: top(C), backgrounds: top(BG), radii: top(BR), shadows: top(SH, 4),
    fonts: top(FF, 4), type,
    themeColor: document.querySelector('meta[name="theme-color"]')?.content,
    bodyBg: getComputedStyle(document.body).backgroundColor,
  };
  copy(JSON.stringify(out, null, 2));
  console.log(out);
})();
```

Paste the JSON back to me and I'll fill this table and turn it into shadcn tokens.

## 9. Applying this to odiaicon

| Pop Site pattern | odiaicon equivalent |
|---|---|
| Eyebrow pill with icon | Already in the Features header (chakra icon + label) |
| H2 + one-line subhead formula | `featuresIntro` in `site-config.ts`; reuse for every section |
| **Claim box** (core CTA) | A copyable install box: `bun add odiaicon` with a Copy button, so the main action is "grab the icons" |
| 9 section cards (image + title + line) | An icon category grid (temples, textiles, art forms…) |
| Phone mockup showcase | A marquee of icon cards in the hero |
| Creator chip / testimonial | A contributor or user quote card |
| Accordion FAQ | shadcn `Accordion`: licensing, install, contributing, request an icon |
| 3 footer columns | Icons · Project (GitHub, License, Contribute) · More (X, Instagram, Email) |
| Social-proof eyebrows | "Open source · MIT", GitHub stars, number of icons |

## 10. Open questions

1. Exact palette, type scale, radii and spacing (run the script above).
2. Whether the 3 wide images in 3.9 are logo/badge chips or screenshots.
3. Animation details: scroll reveals, hover states, video behavior.
4. What the `framer.link` links under each FAQ item are for.

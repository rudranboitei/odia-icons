# Landing cleanup audit — 2026-11-20

Branch: `cleanup-landing`
Scope: `src/app`, `src/components`, `src/lib`, `src/data`, `public`.

## Route reachability (before changes)

```
src/app/layout.tsx            -> globals.css, next/font (Inter Tight, Pixelify Sans)
src/app/page.tsx              -> cta-footer, hero, icon-explorer, install-section
  hero                        -> icon-wall, ui/badge, ui/button, data/icons, data/site
    icon-wall                 -> data/icons
  icon-explorer               -> ui/badge, ui/input, data/icons, lib/utils
  install-section             -> ui/button, ui/card, data/site
  cta-footer                  -> ui/button, data/site
src/app/icons/page.tsx        -> icon-browser
  icon-browser                -> next/image, next/link, ui/button, ui/dialog,
                                 shiki-code, lib/clipboard, lib/icons, icon-playground,
                                 data/site
    icon-playground           -> shiki-code, ui/button, ui/toast, lib/clipboard,
                                 lib/icons, data/site
    shiki-code                -> lib/utils, shiki
src/app/sitemap.ts            -> lib/site-url
file conventions              -> favicon.ico, opengraph-image.*, twitter-image.*,
                                 icons/opengraph-image.*
```

Second source of copy found: `src/lib/site-config.ts` (old landing copy, incl.
`features`, `quote`, `steps`, `developer`, `faq`, `finalCta`, `footer`) alongside
`src/data/site.ts` (icon pages + new landing components). `site-config` is only
imported by currently-unused legacy sections.

## File inventory

| file | status | reason |
|---|---|---|
| `src/app/layout.tsx` | USED | Root layout for every route. |
| `src/app/page.tsx` | USED | `/` route; will be recomposed. |
| `src/app/globals.css` | USED | Tokens + Tailwind entry. |
| `src/app/sitemap.ts` | USED | `/sitemap.xml` route. |
| `src/app/favicon.ico` | USED | Next file convention. |
| `src/app/opengraph-image.png` + `.alt.txt` | USED | Next OG file convention. |
| `src/app/twitter-image.png` + `.alt.txt` | USED | Next Twitter image convention. |
| `src/app/icons/page.tsx` | USED | `/icons` route. |
| `src/app/icons/opengraph-image.png` + `.alt.txt` | USED | OG convention for `/icons`. |
| `src/components/hero.tsx` | USED | Landing hero. |
| `src/components/icon-wall.tsx` | USED | Hero background, imported by hero. |
| `src/components/icon-explorer.tsx` | USED | Landing icon preview. |
| `src/components/cta-footer.tsx` | DUPLICATE | Same slots as `final-cta.tsx` + `footer.tsx`; legacy versions win. |
| `src/components/install-section.tsx` | DUPLICATE | Same slots as `steps.tsx` + `developer.tsx` (install box). |
| `src/components/feature.tsx` | UNUSED / DUPLICATE | Self-contained blue-gradient bento; does not use `features` from data and breaks the cream-only rule. |
| `src/components/feature-media.tsx` | UNUSED (KEEP) | Renders the four owned animations; needed by the new Features section. |
| `src/components/feature-visuals.tsx` | UNUSED (KEEP) | Owned “rooted / grid / copy-code / free” animations. |
| `src/components/odia-motifs.tsx` | UNUSED (KEEP) | Motif paths used by `feature-visuals`. |
| `src/components/quote.tsx` | UNUSED (KEEP) | Quote/stats section, needed by plan. |
| `src/components/steps.tsx` | UNUSED (KEEP) | Steps section, needed by plan. |
| `src/components/developer.tsx` | UNUSED (KEEP) | Developer section, needed by plan. |
| `src/components/faq.tsx` | UNUSED (KEEP) | FAQ section, needed by plan. |
| `src/components/final-cta.tsx` | UNUSED (KEEP) | Final CTA, needed by plan. |
| `src/components/footer.tsx` | UNUSED (KEEP) | Footer, needed by plan. |
| `src/components/eyebrow.tsx` | UNUSED (KEEP) | Used by section-header/quote/developer. |
| `src/components/section-header.tsx` | UNUSED (KEEP) | Shared section header. |
| `src/components/install-box.tsx` | UNUSED (KEEP) | Copyable install command in developer/CTA. |
| `src/components/icon-marquee.tsx` | UNUSED (KEEP) | Footer flourish of final CTA. |
| `src/components/site-nav.tsx` | UNUSED | Not in the landing section plan; new hero owns the top of page. |
| `src/components/theme-provider.tsx` | UNUSED | next-themes wrapper; layout is dark-only. |
| `src/components/icon-browser.tsx` | USED | `/icons` page. Protected. |
| `src/components/icon-playground.tsx` | USED | Used by icon-browser. Protected. |
| `src/components/shiki-code.tsx` | USED | Icon page + developer snippet. Protected. |
| `src/components/ui/badge.tsx` | USED | Hero + explorer. |
| `src/components/ui/button.tsx` | USED | Hero, icons, sections. |
| `src/components/ui/card.tsx` | USED (by route, pre-cleanup) | Only `install-section` imports it; kept per “don’t touch ui/*”. |
| `src/components/ui/input.tsx` | USED | Explorer search. |
| `src/components/ui/dialog.tsx` | USED | Icon detail dialog. Broken `size="icon-sm"` (fix). |
| `src/components/ui/toast.tsx` | UNUSED | Imports kept; only `install-box` calls `toast.add`, no `<Toaster/>` mounted. Kept per ui/* rule. Broken `icon-sm` (fix). |
| `src/components/ui/dropdown-menu.tsx` | UNUSED | No imports. Kept per ui/* rule. |
| `src/components/ui/sheet.tsx` | UNUSED | No imports. Kept; broken `icon-sm` (fix). |
| `src/components/ui/slider.tsx` | UNUSED | No imports. Kept. |
| `src/components/ui/tabs.tsx` | UNUSED | No imports. Kept. |
| `src/components/ui/mode-toggle.tsx` | UNUSED | Dark-only site; commented out on icon page. Kept; broken `icon-lg` (fix). |
| `src/lib/utils.ts` | USED | `cn` re-export. |
| `src/lib/clipboard.ts` | USED | Copy helpers. |
| `src/lib/icons.tsx` | USED | Icon renderer/exporters. Protected. |
| `src/lib/icons.generated.ts` | USED | Generated icon data. Protected. |
| `src/lib/site-url.ts` | USED | Sitemap/metadata origin. |
| `src/lib/site-config.ts` | DUPLICATE | Old copy source; consolidate into `data/site.ts`, then remove. |
| `src/data/site.ts` | USED | Single copy/links source. Extend only. |
| `src/data/icons.tsx` | USED | Landing icon data. Do not change. |
| `public/brand/wordmark-cream.svg` | USED | Header/icon-browser logo. |
| `public/contribute/*.jpeg` (3) | USED | Icon page contribute cards. |
| `public/icons.json`, `public/svg/outline/*`, `public/r/*`, `public/odiaicons-sprite.svg` | USED | Generated distribution artifacts from `scripts/icons/build.mjs`. |
| `public/favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`, `apple-touch-icon.png` | USED | Wired in root metadata/brand assets. |
| `public/android-chrome-192x192.png`, `android-chrome-512x512.png`, `maskable-icon-512x512.png`, `site.webmanifest` | USED | PWA/manifest icons. |
| `public/og-image.png`, `public/twitter-card.png` | USED | Root metadata OG/Twitter images. |
| `public/fonts/GeistSans-Variable.woff2`, `Satoshi-{400,500,700}.woff2` | UNUSED | Fonts now come from `next/font/google`. Delete. |
| `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | UNUSED | Create-Next-App leftovers. Delete. |
| `public/github-icon.svg` | UNUSED | Only old site-nav used it. Delete. |

## Proposed landing sections

| # | section | component(s) | id |
|---|---|---|---|
| 1 | Hero | `hero.tsx`, `icon-wall.tsx` | `#top` |
| 2 | Icon explorer | `icon-explorer.tsx` | `#icons` |
| 3 | Features (owned animations) | new wrapper + `feature-media.tsx`, `feature-visuals.tsx`, `odia-motifs.tsx` | `#features` |
| 4 | Quote / stats | `quote.tsx` | — |
| 5 | Steps | `steps.tsx` | — |
| 6 | Developer | `developer.tsx`, `install-box.tsx` | `#developers` |
| 7 | FAQ | `faq.tsx` | `#faq` |
| 8 | Final CTA | `final-cta.tsx`, `icon-marquee.tsx` | `#install` |
| 9 | Footer | `footer.tsx` | — |

Copy consolidation: move the landing copy from `src/lib/site-config.ts` into
`src/data/site.ts` (add only), point every kept component at `data/site.ts`, delete
the old file. Restore manifest/favicon metadata so existing public assets are used.

## Planned deletions

- Components: `feature.tsx`, `cta-footer.tsx`, `install-section.tsx`, `site-nav.tsx`,
  `theme-provider.tsx`; then `src/lib/site-config.ts`.
- Public: `fonts/*`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`,
  `github-icon.svg`.
- Dependencies: none found (all remaining packages are imported).

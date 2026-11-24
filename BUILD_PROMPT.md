# Build prompt: OdiaIcons library + website functionality

Paste this into your coding agent. The landing page design at icons.odiaui.xyz is already done; this prompt builds the icon library, package, and the interactive functionality.

---

You are a senior frontend engineer. Build **OdiaIcons**, an open-source, Odisha-themed icon library, and wire it into the existing landing page at icons.odiaui.xyz. Read `SKILL.md` in the repo root first and follow it for every icon.

## Stack
- Monorepo (pnpm workspaces + Turborepo)
- `packages/icons`: source SVGs, metadata and build scripts consumed by `@odiaui/icons-react`
- `packages/react`: generated React components (TypeScript, tree-shakeable, ESM + CJS, `.d.ts`)
- `apps/web`: Next.js (App Router) + TypeScript + Tailwind, the existing landing page. Keep the existing design exactly; only add functionality and the icon browser.
- Tooling: SVGO, Vitest, Playwright (visual snapshots), Changesets, GitHub Actions

## 1. Icon source and pipeline
- `icons/{outline,solid,duotone}/*.svg` plus `meta/*.json` (schema in SKILL.md).
- Scripts: `icons:validate`, `icons:optimize`, `icons:build`, `icons:sprite`, `icons:font`, `icons:registry`.
- Validation fails the build on: wrong viewBox, hard-coded colors, duplicate names, missing metadata, file over 2KB.
- Generate `icons.json` manifest consumed by the website.

## 2. React package
Each icon component:
- Props: `size` (default 24), `color` (default `currentColor`), `strokeWidth` (default 1.75), `variant` (`outline | solid | duotone`), `absoluteStrokeWidth`, `title`, plus all `SVGProps`.
- `forwardRef`, `aria-hidden="true"` by default, `role="img"` + `<title>` when `title` is given.
- Named exports per icon, plus a `createIcon` helper and a dynamic `<Icon name="konark-wheel" />` (lazy) for CMS use.
- A provider `<OdiaIconsProvider size color strokeWidth>` for global defaults.
- Works in RSC, Next.js, Vite, Remix. No runtime dependencies besides React peer dep.

## 3. Starter icon set (v0.1, about 120 icons)
- Culture and religion (20): jagannath, balabhadra, subhadra, rath-yatra, nabakalebara, mahaprasad, chakra, patita-pabana-flag, conch, lotus, diya, lamp-brass, bell, mandala, ...
- Architecture (15): konark-wheel, konark-temple, lingaraj-temple, jagannath-temple, khandagiri-cave, rajarani-temple, stupa, dhauli-peace-pagoda, ...
- Art and craft (20): pattachitra-frame, odissi-dancer, mudra-hand, mardala-drum, gotipua, sambalpuri-ikat, tarakasi-filigree, sora-painting, applique-umbrella, palm-leaf-manuscript, ...
- Festival (10): durga-puja, raja-festival, bali-yatra, kumar-purnima, dola-yatra, ...
- Food (15): rasagola, pakhala, chhena-poda, dalma, khaja, mudhi, ...
- Nature and geography (20): chilika-lake, bhitarkanika-crocodile, olive-ridley-turtle, simlipal-tiger, mahanadi, hirakud-dam, irrawaddy-dolphin, ...
- General UI (20+): the usual search, arrow, check, close, menu, download, copy, heart, user, settings, etc. in the same visual style.
Each follows the 24x24, 1.75px-stroke, round-cap rules in SKILL.md. Include the Odia-script name in every icon's metadata.

## 4. Website functionality (apps/web)
Keep the current visual design. Add:
1. **Icon grid** with virtualized rendering (handles 1,000+ icons), skeleton loading, keyboard navigation (arrow keys, Enter to open, `/` to focus search, `Esc` to close).
2. **Search**: instant, fuzzy (Fuse.js or MiniSearch) across name, aliases, tags and Odia script. Type "ଚକ" or "wheel" and find `konark-wheel`. Show "no results" with a request-an-icon link.
3. **Filters**: category chips, variant toggle (outline/solid/duotone), sort (A-Z, newest, popular).
4. **Customizer panel**: size slider (12 to 128), stroke width slider (0.5 to 3), color picker with presets (terracotta, sun gold, temple stone, indigo), live preview updates the whole grid. State persisted in the URL and localStorage.
5. **Icon detail drawer**: previews at 16/24/32/48, light and dark backgrounds, name, Odia name, tags, category, variants, "since" version, cultural note if present.
6. **Copy and export actions**: copy SVG, copy JSX, copy import statement, copy CSS background data-URI, copy sprite `<use>` snippet, download SVG, download PNG at chosen size, install command for shadcn registry.
7. **Multi-select tray**: select multiple icons, download as ZIP (SVG or PNG), or copy a combined import line.
8. **Install and usage docs**: pages for React, Next.js, plain SVG, sprite, icon font, shadcn registry, Figma plugin link; each with copyable code and a live example.
9. **Theme**: light and dark, using the existing OdiaUI tokens.
10. **Request an icon** form (opens a prefilled GitHub issue) and a contribution guide page generated from SKILL.md.
11. **SEO**: per-icon pages `/icons/[name]` (static generation), OG image per icon, sitemap, structured data.
12. **Accessibility**: WCAG AA, focus rings, screen-reader labels, reduced-motion support.
13. **Analytics**: privacy-friendly (Plausible or Umami) for copy and download events.

## 5. Distribution
- npm: `@odiaui/icons-react` (React components, types, ESM + CJS).
- shadcn-style registry JSON per icon at `/r/<name>.json`.
- CDN-friendly: `https://icons.odiaui.xyz/svg/<variant>/<name>.svg`.
- Figma: export a `.fig`-friendly SVG bundle (plugin later).

## 6. Quality gates
- Vitest tests for every React component (renders, props, ref, a11y attributes).
- Playwright visual snapshots at 16, 24 and 48px for each icon.
- Size budget: one icon import under 1KB gzipped, total website JS under 150KB on first load.
- Lighthouse 95+ on all four scores.
- GitHub Actions: validate, build, test, deploy preview on PRs, release via Changesets on main.

## Deliverables
1. Working monorepo with the pipeline and 120 starter icons.
2. Website functionality 1 to 13 above.
3. README, CONTRIBUTING.md and the SKILL.md.
4. A short summary of decisions and anything left out.

Work in stages: pipeline first, then 10 sample icons end to end, then the website features, then the remaining icons in batches. Show me the sample icons before generating the full set.

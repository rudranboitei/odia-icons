---
name: odiaicons
description: Use when adding, editing, auditing or publishing icons in OdiaIcons (icons.odiaui.xyz), the Odisha-themed icon library. Covers the icon spec, SVG rules, metadata, build pipeline, React package, registry and website sync.
---

# OdiaIcons skill

OdiaIcons is an open-source icon library with Odisha-themed icons (temples, Pattachitra motifs, Odissi, Jagannath culture, Sambalpuri ikat, festivals, food, wildlife, geography) plus a general UI set. It ships as a React package, a copy-paste registry (shadcn-style) and raw SVGs, and is browsed at icons.odiaui.xyz.

## Flow

Follow these steps in order. Do not skip validation.

### 1. Brief
- Name the icon in kebab-case English (`konark-wheel`, `rath-yatra`, `odissi-dancer`).
- Choose a category: `culture`, `architecture`, `art`, `festival`, `food`, `nature`, `travel`, `ui`.
- Write 3 to 8 tags, including the Odia-script name and a transliteration (e.g. `ଚକ`, `chakra`).
- Check `icons/` for an existing icon with the same name or concept. Never duplicate.

### 2. Design rules (hard constraints)
- Canvas: 24x24 viewBox, 2px safe padding (live area 20x20).
- Style: outline, 1.75px stroke, round caps, round joins, no fills except when `solid` variant.
- `stroke="currentColor"` and `fill="none"`. No hard-coded colors. No gradients, filters, masks or clip-paths.
- Optical alignment to the 24px grid; snap points to 0.5px.
- Cultural motifs stay recognisable at 16px. Simplify, do not decorate.
- Variants: `outline` (default), `solid` (optional), `duotone` (optional, uses `currentColor` plus 0.25 opacity layer).
- Be respectful with religious and cultural symbols. Add a one-line `note` in metadata for sensitive ones (e.g. Jagannath, Mahaprasad).

### 3. File layout
```
icons/
  outline/<name>.svg
  solid/<name>.svg
  duotone/<name>.svg
meta/<name>.json
```
`meta/<name>.json`:
```json
{
  "name": "konark-wheel",
  "odia": "କୋଣାର୍କ ଚକ",
  "category": "architecture",
  "tags": ["konark", "chakra", "sun temple", "ଚକ"],
  "aliases": ["sun-wheel"],
  "variants": ["outline", "solid"],
  "contributors": ["github-handle"],
  "since": "0.1.0",
  "note": ""
}
```

### 4. Optimise and validate
- Run SVGO with the repo config (remove metadata, keep viewBox, convert to currentColor, no id prefixes).
- `pnpm icons:validate` must pass: viewBox, stroke width, no fixed colors, name uniqueness, metadata schema, max 2KB per icon.
- Add a visual regression snapshot at 16, 24 and 48px.

### 5. Build
- `pnpm icons:build` generates:
  - React components (`<KonarkWheel />`) with props `size`, `color`, `strokeWidth`, `variant`, `absoluteStrokeWidth`, `title`, plus all SVG props; forwards refs; tree-shakeable; `aria-hidden` by default, `role="img"` when `title` is set.
  - ESM + CJS bundles and `.d.ts` types.
  - `icons.json` manifest (name, odia, category, tags, path data) for the website search.
  - Sprite sheet `odiaicons-sprite.svg`.
  - Icon-font (woff2) and per-icon registry JSON for `npx shadcn add`.
- Bundle size check: importing one icon must add under 1KB gzipped.

### 6. Website sync (icons.odiaui.xyz)
- Website reads `icons.json` at build time. Never hand-edit icon data in the site.
- Verify the new icon appears in grid, search (English, Odia script, tags), category filter and detail drawer.
- Detail drawer shows: preview at 16/24/32/48, copy SVG, copy JSX, copy import, download SVG/PNG, install snippets, size and stroke controls, color picker, variant switcher.

### 7. Release
- Add a changeset (`pnpm changeset`), semver: new icons = minor, fixed paths = patch, rename/remove = major (keep an alias for one major version).
- Update `CHANGELOG.md`, tag, publish `@odiaui/icons` to npm, deploy site.

## Definition of done
- [ ] Passes validate and build, snapshots reviewed
- [ ] Metadata complete with Odia-script name
- [ ] Looks correct at 16px, in light and dark
- [ ] Appears and is searchable on the website
- [ ] Changeset added

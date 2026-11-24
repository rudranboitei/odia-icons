---
name: odiaicons-library
description: Use when adding OdiaIcons (the Odisha-themed open-source icon library) to a project, choosing or searching for an icon, styling or exporting icons as SVG/JSX/React, or contributing a new icon. Covers install, usage, props, accessibility, the icon design spec, and the contribution flow.
---

# OdiaIcons library

OdiaIcons is an open-source icon library with icons drawn from Odisha: temples, Pattachitra motifs, Odissi, Jagannath culture, Sambalpuri ikat, festivals, food, wildlife and geography, plus a general UI set. Every icon is a clean 24 × 24 outline glyph.

It ships as:
- **React components** (tree-shakeable, typed)
- **Raw SVG** files
- **A shadcn-style registry** (copy a single icon into your project)
- **Exports from the website**: SVG, JSX, TSX, data URI, PNG

Website and browser: https://icons.odiaui.xyz
Repository: https://github.com/odiaui/odiaicons <!-- TODO: confirm repo URL -->

> Verify before relying on these: package name, registry URL and prop names below follow the library spec. Check them against the real source if anything disagrees.

---

## When to use this skill

- The user wants Odisha, Odia, or Indian-heritage icons in a UI, poster or product.
- The user asks for an icon by an Odia name (ରଥ, ଦେଉଳ, ପଦ୍ମ) or an Odisha concept (Konark wheel, rath yatra, deula, ikat).
- The user wants to install, import, style, or export an OdiaIcons icon.
- The user wants to add or fix an icon in the library.

If the user wants a generic UI icon and no Odisha theme, the library's `ui` category may still cover it. Say so rather than inventing an icon that does not exist.

---

## 1. Install

```bash
npm install @odiaui/icons-react    # or: pnpm add / yarn add / bun add
```

Single icon, no package, via the shadcn-style registry:

```bash
npx shadcn add https://icons.odiaui.xyz/r/konark-wheel.json
```

There is no runtime to configure and no provider to wrap your app in.

---

## 2. Use in React

Each icon is a component named in PascalCase from its kebab-case name (`konark-wheel` becomes `KonarkWheel`).

```tsx
import { KonarkWheel, Deula } from "@odiaui/icons-react"

export function Example() {
  return (
    <div className="flex gap-4 text-foreground">
      <KonarkWheel size={32} />
      <Deula size={24} strokeWidth={2} title="Temple" />
    </div>
  )
}
```

### Props

| Prop | Default | Notes |
|---|---|---|
| `size` | `24` | Width and height in px |
| `color` | `currentColor` | Inherits text colour; prefer styling with `className` / `text-*` |
| `strokeWidth` | `1.75` | Spec stroke. 1 to 2.5 all look fine |
| `absoluteStrokeWidth` | `false` | Keep stroke thickness constant when `size` changes |
| `variant` | `"outline"` | `"outline"`, `"solid"` or `"duotone"` where the icon provides it |
| `title` | none | Adds an accessible name |
| ...SVG props | | Everything valid on `<svg>` is forwarded; refs are forwarded |

### Accessibility

- Icons are `aria-hidden` by default, which is right for decorative icons next to a text label.
- Pass `title` for an icon that stands alone. It becomes `role="img"` with that name.
- Icon-only buttons need an `aria-label` on the **button**, not just a title on the icon.

### Raw SVG

```html
<svg viewBox="0 0 24 24" width="24" height="24" fill="none"
     stroke="currentColor" stroke-width="1.75"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- paths -->
</svg>
```

The website lets you copy any icon as SVG, JSX, TSX or a data URI, and download SVG or PNG (512px).

---

## 3. Find the right icon

Icons carry an English name, an Odia-script name, a category and tags.

- **Search by any of these:** English name, tag, or Odia script (`ରଥ`, `ଦେଉଳ`, `chakra`, `sun temple`).
- **Categories:** `culture`, `architecture`, `art`, `festival`, `food`, `nature`, `travel`, `ui`.
- **Machine-readable list:** the build publishes an `icons.json` manifest (name, odia, category, tags, path data). Read that to look icons up in code instead of guessing names.

Examples of the kinds of names to expect: `konark-wheel`, `rath-yatra`, `odissi-dancer`, `deula`, `padma`, `machha`, `boita`, `shankha`, `deepa`, `madala`, `pataka`, `ikat`, `pattachitra`.

Never fabricate an icon name. If you cannot find a match in the manifest or the website, tell the user and suggest requesting the motif (see section 6).

---

## 4. Styling guidance

- **Colour:** icons use `currentColor`. Colour them with the parent's text colour (`text-primary`, `text-muted-foreground`), not hard-coded hex.
- **Sizes:** 16 for dense UI, 20 to 24 for buttons and nav, 32 to 48 for cards and features, 64 and up for hero art. Motifs are designed to stay readable at 16px.
- **Stroke:** keep the default 1.75 so icons match each other. If you change it, change it everywhere in that view.
- **Mixing sets:** they sit comfortably beside most line icon sets (24px grid, round caps and joins). Do not mix with filled sets in the same row.
- **Dark and light:** works in both because colour is inherited.
- **Sensitive symbols:** religious and cultural symbols (Jagannath, Mahaprasad and similar) carry a `note` in their metadata. Use them respectfully and in fitting contexts, not as decoration for unrelated content.

---

## 5. Icon design spec

Hard constraints for any icon added or edited:

- **Canvas:** 24 × 24 viewBox, 2px safe padding (20 × 20 live area).
- **Style:** outline, 1.75px stroke, round caps, round joins, no fills (except the `solid` variant).
- `stroke="currentColor"` and `fill="none"`. No hard-coded colours, gradients, filters, masks or clip-paths.
- Snap points to 0.5px; keep optical alignment to the 24px grid.
- Cultural motifs must stay recognisable at 16px. Simplify; do not decorate.
- Variants: `outline` (default), `solid` (optional), `duotone` (optional, `currentColor` plus a 0.25 opacity layer).
- Max 2KB per icon.

### File layout

```
icons/
  outline/<name>.svg
  solid/<name>.svg
  duotone/<name>.svg
meta/<name>.json
```

### Metadata (`meta/<name>.json`)

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

- `name`: kebab-case English. Check `icons/` for an existing icon first; never duplicate.
- `tags`: 3 to 8, including the Odia-script name and a transliteration.
- `note`: one line for sensitive symbols.

---

## 6. Contribute an icon

1. **Brief:** name (kebab-case), category, tags, and a check that it does not already exist.
2. **Draw** to the spec in section 5.
3. **Optimise:** run SVGO with the repo config (remove metadata, keep viewBox, convert to `currentColor`).
4. **Validate:** `pnpm icons:validate` must pass (viewBox, stroke width, no fixed colours, unique name, metadata schema, size limit). Check 16, 24 and 48px snapshots.
5. **Build:** `pnpm icons:build` generates React components, ESM and CJS bundles, types, `icons.json`, the sprite sheet and per-icon registry JSON. One icon should add under 1KB gzipped.
6. **Check the site:** the new icon must appear in the grid, search (English, Odia, tags), category filter and detail dialog. Never hand-edit icon data on the website; it reads `icons.json` at build time.
7. **Release:** add a changeset (`pnpm changeset`). New icons are a minor bump, fixed paths a patch, renames or removals a major (keep an alias for one major version).

### Definition of done

- [ ] Passes validate and build, snapshots reviewed
- [ ] Metadata complete, including the Odia-script name
- [ ] Looks correct at 16px in light and dark
- [ ] Appears and is searchable on the website
- [ ] Changeset added

Requesting a motif instead of drawing one: open an issue with the motif, a reference image and where it comes from.

---

## 7. Quick answers

- **Licence:** MIT. Free for personal, commercial and client work; no attribution needed. Do not resell the icons as your own icon set.
- **Dependencies:** none at runtime.
- **Change colour:** set the parent's `color` / text class.
- **Change stroke:** `strokeWidth` prop; add `absoluteStrokeWidth` to keep it constant across sizes.
- **Icon missing:** do not invent it. Suggest requesting it, or contributing it via section 6.

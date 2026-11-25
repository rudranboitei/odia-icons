---
name: odiaicons
description: Use when adding, editing, auditing or publishing icons in OdiaIcons (icons.odiaui.xyz), the Odisha-themed icon library. Runs a gated workflow (brief, concept, draft, render and critique, validate, batch review, build, release) so every icon ships at the same quality bar.
---

# OdiaIcons: ship-quality workflow

OdiaIcons is an open-source Odisha-themed icon library (temples, crafts, music, festivals, food, wildlife, geography, plus a general UI set). It ships as a React package, a shadcn-style registry and raw SVGs, and is browsed at icons.odiaui.xyz.

Work in **gates**. An icon only moves to the next gate when the current one passes. If a gate fails, fix and retry that gate (max 3 rounds). After 3 failed rounds, simplify the concept instead of adding detail.

```
G0 Brief -> G1 Concept -> G2 Draft -> G3 Render + Critique -> G4 Validate -> G5 Batch + Culture review -> G6 Build + Sync -> G7 Release
```

## Style spec (locked, never changed per icon)

Keep this as `style-spec.json` in the repo and read it at the start of every session.

```json
{
  "viewBox": "0 0 24 24",
  "livePadding": 2,
  "stroke": 1.5,
  "linecap": "round",
  "linejoin": "round",
  "color": "currentColor",
  "fill": "none",
  "snap": 0.5,
  "minGap": 1.5,
  "minDetail": 1.5,
  "maxPaths": 8,
  "maxBytes": 2048,
  "variants": ["outline", "solid", "duotone"]
}
```

Rules that follow from it:
- 24x24 canvas, live area 20x20. Keylines: circle 20 diameter, square 18x18, portrait rect 16x20, landscape rect 20x16.
- Outline by default. No gradients, filters, masks, clip-paths, hard-coded colors, ids or transforms.
- Snap points to 0.5px. Optical balance beats mathematical centering (circles look lighter than squares, so make them slightly larger).
- Parallel strokes keep at least `minGap` (1.5px) between them. No detail smaller than the stroke width.
- Stroke is 1.5 at 24px, so it renders about 1px at 16px. If details merge at 16px, **simplify, never thicken**.
- Duotone uses `currentColor` plus one 0.25 opacity layer. Solid has no stroke.

## G0. Brief

- Name in kebab-case English (`konark-wheel`, `rath-yatra`). Pattern: `[object]-[variant]`.
- Category: `culture`, `architecture`, `art`, `festival`, `food`, `nature`, `travel`, `ui`.
- 3 to 8 tags, including the Odia-script name and a transliteration (e.g. `ଚକ`, `chakra`).
- Search `icons/` and `meta/` for the same name or concept. Never duplicate. Prefer an alias over a near-duplicate.
- Write the **one-line metaphor**: "what is the single thing a viewer must recognise?" If you cannot say it in one line, the concept is too busy.
- Sensitive subject (Jagannath, Mahaprasad, deities, ritual objects)? Mark it now. It needs a `note` and a G5 culture review.

**Pass:** name unique, metaphor in one line, metadata draft exists.

## G1. Concept (3 directions, pick 1)

Do not jump into path code. Produce three quick directions for the same metaphor, for example:
1. Pure silhouette (most reduced).
2. Silhouette plus one signature detail (the cultural cue, e.g. the 24 spokes simplified to 8 on the Konark wheel).
3. Alternative viewpoint (front vs side, whole vs part).

Show them as three small SVG sketches at 48px, state the trade-off in one line each, and pick one. Prefer direction 1 or 2. Direction 3 only if 1 and 2 are unrecognisable.

Reduction rules for cultural motifs:
- Keep the **one cue** that makes it Odia (the deul curvature, the chakra spokes, the Pattachitra eye shape). Drop everything else.
- Think symbol, not illustration. Max 8 paths.
- Pattern-heavy art (Sambalpuri ikat, Pattachitra borders) is reduced to a geometric rhythm of 3 to 5 repeating units.

**Pass:** one direction chosen, still readable as a 48px sketch.

## G2. Draft SVG

Use this exact outer structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- paths here -->
</svg>
```

- Prefer primitives (`circle`, `rect`, `line`, `path` with absolute commands) over free-form curves.
- Round coordinates to 2 decimals, merge paths that share a stroke, remove empty groups.
- Draft the outline first. Derive solid and duotone from the approved outline, never the reverse.
- Write `meta/<name>.json` now so metadata is never a last-minute afterthought.

## G3. Render and critique (the quality gate)

Render the draft and **look at it**. Do not approve from code alone.

Render sheet (one image per icon):
- 16, 24, 32 and 48px, in light **and** dark.
- Next to 3 existing neighbours of the same category (consistency check).
- Optional: with `strokeWidth` 1.5 and 2 to confirm it survives the size/stroke control on the site.

Score out of 100:

| Criterion | Points | Question |
|---|---|---|
| Legibility at 16px | 25 | Is the metaphor obvious in under 1 second? |
| Set consistency | 20 | Same weight, radius, detail level as its neighbours? |
| Metaphor and cultural accuracy | 20 | Right cue kept, nothing disrespectful or wrong? |
| Geometry and grid | 15 | On keylines, snapped, optically centred, even gaps? |
| Simplicity and balance | 10 | Nothing decorative, visual weight evenly spread? |
| Technical hygiene | 10 | Passes the spec, no extras, under 2KB? |

Thresholds:
- **90+** ship.
- **85 to 89** ship after fixing the listed notes.
- **Below 85** revise. Fix the lowest-scoring criterion first, re-render, re-score.

Auto-fail (score capped at 70 until fixed):
- Detail smaller than 1.5px or gap under 1.5px.
- Strokes touching or overlapping so they thicken.
- Mixed corner radii or caps inside one icon.
- Different visual weight from neighbours (looks bolder or lighter).
- Any hard-coded color, gradient, filter or transform.
- Would not be recognised without its label.

Icon "slop" to avoid (the icon version of generic AI output):
- Decorative flourishes that add no meaning.
- Random wobbly curves with no geometric logic.
- Tiny fills or dots at 24px.
- Cramming the whole temple instead of one cue.
- Mixing outline and solid pieces in the outline variant.
- Copying a Lucide/Heroicons shape and adding a swirl, rather than designing the metaphor.

**Pass:** score >= 85 and zero auto-fails, with the render sheet saved with the PR.

## G4. Validate (automated)

- Run SVGO with the repo config (keep `viewBox`, no id prefixes, no metadata, convert to `currentColor`).
- `pnpm icons:validate` must pass: viewBox, stroke width, no fixed colors, name uniqueness, metadata schema, max 2KB per icon, max 8 paths.
- Visual regression snapshots at 16, 24 and 48px.
- If validation fails, return to G2 (not G6). Never patch the output files by hand.

## G5. Batch and culture review

**Batch review** (every 5 to 8 icons, and before any release):
- Lay the whole batch on one grid, light and dark, at 24px and at 16px.
- Squint test: do any icons stand out as heavier, lighter or more detailed? Fix the outlier, not the set.
- Check naming, category balance and alias collisions.

**Culture review** (required for sensitive subjects, recommended for all culture/art/festival icons):
- Is the depiction accurate (e.g. real number of spokes, correct form of the deul, correct attire for Odissi)?
- Is a religious symbol shown respectfully (no decorative remixing, no placing it in a joke or trivial context)?
- Is there a one-line `note` in metadata for the sensitive ones?
- If unsure, mark `"status": "needs-review"` and ask a native reviewer (Odia speaker or community contributor) before release.

**Pass:** batch looks like one family, culture checklist ticked.

## G6. Build and website sync

- `pnpm icons:build` generates React components (`size`, `color`, `strokeWidth`, `variant`, `absoluteStrokeWidth`, `title`, forwarded refs, `aria-hidden` by default and `role="img"` when `title` is set), ESM + CJS + types, `icons.json`, the sprite sheet, the woff2 font and the per-icon registry JSON.
- Bundle size: importing one icon adds under 1KB gzipped.
- Website reads `icons.json` at build time. Never hand-edit icon data in the site.
- Verify on icons.odiaui.xyz: grid, search (English, Odia script, tags), category filter, detail drawer (16/24/32/48 preview, copy SVG/JSX/import, download SVG/PNG, install snippets, size and stroke controls, color picker, variant switcher).

## G7. Release

- `pnpm changeset`. New icons = minor, fixed paths = patch, rename/remove = major (keep an alias for one major version).
- Update `CHANGELOG.md`, tag, publish `@odiaui/icons-react`, deploy the site.
- Post-release smoke test: install the package in a fresh Next.js app, import one icon, confirm it renders and tree-shakes.

## Definition of done

- [ ] Metaphor stated in one line, 3 directions considered
- [ ] Critique score >= 85, no auto-fails, render sheet attached
- [ ] Readable at 16px in light and dark
- [ ] `icons:validate` and `icons:build` pass, snapshots reviewed
- [ ] Metadata complete (Odia-script name, tags, note if sensitive)
- [ ] Batch consistency and culture review done
- [ ] Searchable on the website
- [ ] Changeset added

## Quick prompts to run each gate

- G1: "Brief for `<name>`. Give me 3 directions as 48px sketches with trade-offs."
- G3: "Render `<name>` at 16/24/32/48, light and dark, next to 3 neighbours. Score it with the rubric and list fixes."
- G5: "Lay out this batch on one grid at 24px and 16px and flag outliers for weight and detail."
- G6: "Run validate and build, then check the new icons on the site."

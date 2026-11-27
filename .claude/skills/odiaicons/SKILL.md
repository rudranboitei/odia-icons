---
name: odiaicons
description: Use when adding, editing, auditing or publishing icons in OdiaIcons (icons.odiaui.xyz), the Odisha-themed icon library. Runs a gated workflow (brief, concept, draft, render and critique, validate, batch review, build, release) so every icon ships at the same quality bar and matches the library's style DNA.
---

# OdiaIcons: ship-quality workflow (v3)

OdiaIcons is an open-source Odisha-themed icon library (temples, crafts, music, festivals, food, wildlife, geography, plus a general UI set). It ships as a React package, a shadcn-style registry and raw SVGs, and is browsed at icons.odiaui.xyz.

Work in **gates**. An icon only moves to the next gate when the current one passes. If a gate fails, fix and retry that gate (max 3 rounds). After 3 failed rounds, simplify the concept instead of adding detail.

```
G0 Brief -> G1 Concept -> G2 Draft -> G3 Render + Critique -> G4 Validate -> G5 Batch + Culture review -> G6 Build + Sync -> G7 Release
```

## Style spec (locked)

The source of truth is `style-spec.json` (v3). Read it at the start of every session. Summary:

| Rule | Value |
|---|---|
| Canvas / live area | 24x24 / 20x20 (2px padding) |
| Stroke | 2, round caps, round joins, `currentColor` |
| Fill | none (one tiny accent fill allowed, see below) |
| Snap | every point, control point and radius to 0.5 |
| Gap between strokes | hard floor 1.0, target 1.25 or more |
| Smallest detail | 1.5 (ring holes, dashes, counters) |
| Corner radius | 3 on containers, 1.5 minimum on inner corners |
| Complexity tiers | simple <= 5 paths / 1KB, standard <= 8 / 2KB, complex <= 12 / 2.5KB |
| Variants | outline only |

The library stroke is **2**. That is deliberately a little bolder than the 1.3 to 1.5 measured from the reference sheet, so the UI set stays crisp at 16px. Keep 2 across every icon.

## Style DNA (measured from the reference sheet)

What every OdiaIcons icon shares. Check each draft against this list, not just the numbers.

1. **One uniform line weight.** Outer shapes and inner details use the same stroke. No thick/thin contrast, no calligraphic strokes. The reference measures about 6.7% of the icon's long axis (about 1.3 to 1.5 units on a 20 unit span).
2. **Round everything.** Round caps and joins, rounded corners, no sharp miters. Containers use radius 3. Even the pointed bits (temple spire, elephant tusk, conch tip) end in a round cap.
3. **Tight but readable detail.** The reference runs detail close: typical inner gap is about 1 stroke, tightest about 0.6 stroke. That is why the floor is 1.0 unit. Below 1.0 the gap closes at 16px, so simplify instead.
4. **Symbol, not illustration.** One cultural cue per icon, drawn with confident simple curves. Silhouette first, then at most one signature detail group.
5. **Fills are rare accents.** Pure outline, except: a small solid glyph inside a container (the temple inside a map pin or search lens), and tiny solid shapes such as loader petals or the dots in a box icon.
6. **Architecture sits on a plinth.** Temples use a full-width rounded baseline, stepped tiers (pidha) narrowing upward, an arched doorway, and a finial or flag on top.
7. **Kalasha-dome container.** Neutral UI uses plain rounded squares (copy). Odia-flavoured UI containers (lock, menu, dots) use a rounded square with a small ogee bump on the top centre, like a temple finial.
8. **Figures face the viewer or sit in clean profile.** Elephant and animals use a side profile with one decorative blanket or pattern block. Faces (Jagannath) are frontal and symmetric.
9. **Scripts follow the same weight.** Odia glyphs (like ଅ) are drawn as strokes at the same weight, never as font fills. Latin letters beside them are rounded.
10. **Optical balance beats maths.** Circles slightly larger than squares, icons with less ink slightly larger so no icon looks lighter or heavier.

### Motif guide (the one cue to keep)

| Subject | Keep this cue | Drop |
|---|---|---|
| Jagannath | big ring eyes with pupil, brow/crown arch, forehead mark, nose curl, smile, open U chin | any extra ornament beyond the crown leaf |
| Konark / chakra | outer ring, 8 spokes, small nubs on the rim | all 24 spokes |
| Temple (deul, Lingaraj, Jagannath temple) | plinth, stepped tiers, arched door, finial or flag | carvings, side towers |
| Shankha | spiral shell with the eye/whorl, pointed tip | surface texture |
| Diya | shallow bowl, single flame | oil, wick detail |
| Lotus | 5 petals, outer petals curling | stem, water |
| Elephant | side profile, trunk curl, tusk, caparison block | skin detail |
| Wave / scroll | one spiral inside a flowing wave | repeats |
| Pipili umbrella, tarakasi, dhokra | the single craft signature (scallop edge, filigree spiral, horse stance) | patterning |

## Gates

### G0. Brief
- Name in kebab-case English (`konark-wheel`, `rath-yatra`). Pattern: `[object]-[variant]`.
- Category: `culture`, `architecture`, `art`, `festival`, `food`, `nature`, `travel`, `ui`.
- 3 to 8 tags, including the Odia-script name and a transliteration.
- Search `icons/` and `meta/` for the same name or concept. Never duplicate. Prefer an alias.
- Write the **one-line metaphor**. If it will not fit in one line, the concept is too busy.
- Pick the complexity tier (simple, standard, complex).
- Sensitive subject (Jagannath, Mahaprasad, deities, ritual objects)? Mark it now. It needs a `note`, `"status": "needs-review"` and a G5 culture review.

**Pass:** name unique, metaphor in one line, tier chosen, metadata draft exists.

### G1. Concept (3 directions, pick 1)
Three quick directions for the same metaphor, shown as 48px sketches with a one-line trade-off each:
1. Pure silhouette (most reduced).
2. Silhouette plus one signature detail group.
3. Alternative viewpoint (front vs side, whole vs part).

Prefer 1 or 2. Reject any direction that looks like a generic emoji, a power socket, a house or a Lucide shape with a swirl added.

**Pass:** one direction chosen, still readable at 48px, matches the Style DNA.

### G2. Draft SVG
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- paths here -->
</svg>
```
- Prefer primitives (`circle`, `rect`, `line`, absolute-command `path`).
- **Every coordinate, control point and radius is a multiple of 0.5.** Radius 2.25 or y 8.75 is a fail.
- Mirror symmetric icons around x = 12 so mirrored points stay on the grid.
- Merge paths that share a stroke. No ids, transforms, clip-paths, masks, filters or hard-coded colors.
- Draft the outline first. Write `meta/<name>.json` now.

### G3. Render and critique (quality gate)
Render the draft and look at it. Never approve from code alone.

Render sheet per icon: 16, 24, 32 and 48px, light and dark, next to 3 existing neighbours of the same category (use the reference sheet if the neighbours are not in the repo).

| Criterion | Points | Question |
|---|---|---|
| Legibility at 16px | 25 | Metaphor obvious in under 1 second? |
| Set consistency | 20 | Same weight, radius and detail level as neighbours, and all 10 Style DNA points? |
| Metaphor and cultural accuracy | 20 | Right cue kept, nothing disrespectful or wrong? |
| Geometry and grid | 15 | On the 0.5 grid, on keylines, optically centred, even gaps? |
| Simplicity and balance | 10 | Nothing decorative, weight evenly spread? |
| Technical hygiene | 10 | Within tier limits, no extras? |

Thresholds: **90+** ship. **85 to 89** ship after the listed fixes. **Below 85** revise the lowest criterion first.

Auto-fail (score capped at 70):
- Gap under 1.0 or detail under 1.5.
- Strokes touching or overlapping so they thicken.
- Any coordinate off the 0.5 grid.
- Mixed corner radii or caps inside one icon.
- Looks bolder or lighter than neighbours.
- Hard-coded color, gradient, filter or transform.
- More than one accent fill, or a filled outer silhouette.
- Would not be recognised without its label.

Slop to avoid: decorative flourishes with no meaning, wobbly curves with no geometric logic, dots or fills smaller than 1.5, cramming the whole temple instead of one cue, emoji-style faces, copying a Lucide/Heroicons shape and adding a swirl.

**Pass:** score >= 85, zero auto-fails, render sheet saved with the PR.

### G4. Validate (automated)
- SVGO with the repo config (keep `viewBox`, no id prefixes, no metadata, `currentColor`).
- `pnpm icons:validate` must pass: viewBox, stroke, no fixed colors, name uniqueness, metadata schema, tier path and byte limits, **0.5 grid snap, minimum gap 1.0**.
- Visual regression snapshots at 16, 24 and 48px.
- If validation fails, return to G2. Never patch generated files by hand.

### G5. Batch and culture review
**Batch review** (every 5 to 8 icons, and before release): lay the batch on one grid, light and dark, at 24px and 16px. Squint test for outliers in weight and detail. Check naming, category balance and alias collisions.

**Culture review** (required for sensitive subjects, recommended for all culture, art and festival icons): accurate depiction (spoke count, deul form, Odissi attire), respectful treatment of religious symbols, one-line `note` for sensitive ones, `"status": "needs-review"` until a native reviewer signs off.

### G6. Build and website sync
- `pnpm icons:build` generates React components (`size`, `color`, `strokeWidth`, `variant`, `absoluteStrokeWidth`, `title`, forwarded refs, `aria-hidden` by default and `role="img"` when `title` is set), ESM + CJS + types, `icons.json`, the sprite, the woff2 font and the per-icon registry JSON.
- Importing one icon adds under 1KB gzipped.
- The website reads `icons.json` at build time. Never hand-edit icon data in the site.
- Verify on icons.odiaui.xyz: grid, search (English, Odia script, tags), category filter, detail drawer.

### G7. Release
- `pnpm changeset`: new icons minor, fixed paths patch, rename or remove major (keep an alias for one major).
- Update `CHANGELOG.md`, tag, publish `@odiaui/icons-react`, deploy the site.
- Smoke test in a fresh Next.js app: import one icon, confirm it renders and tree-shakes.

## Definition of done
- [ ] Metaphor in one line, 3 directions considered, tier chosen
- [ ] All 10 Style DNA points checked
- [ ] Critique score >= 85, no auto-fails, render sheet attached
- [ ] Readable at 16px in light and dark
- [ ] Every coordinate on the 0.5 grid, minimum gap 1.0
- [ ] `icons:validate` and `icons:build` pass, snapshots reviewed
- [ ] Metadata complete (Odia name, tags, note and status if sensitive)
- [ ] Batch consistency and culture review done
- [ ] Searchable on the website
- [ ] Changeset added

## Quick prompts to run each gate
- G1: "Brief for `<name>`. Give me 3 directions as 48px sketches with trade-offs."
- G3: "Render `<name>` at 16/24/32/48, light and dark, next to 3 neighbours. Score it with the rubric and check the Style DNA list."
- G5: "Lay out this batch on one grid at 24px and 16px and flag outliers for weight and detail."
- G6: "Run validate and build, then check the new icons on the site."

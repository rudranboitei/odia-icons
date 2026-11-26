# OdiaIcons 0.2.0 upgrade notes

## Icon library
- Expanded the library from 88 to 109 icons.
- Added 21 Odisha-inspired motifs covering culture, festivals, food, architecture, crafts and wildlife.
- Added Odia-script names, bilingual search tags and cultural-review notes for each new icon.
- Regenerated the typed manifest, public JSON manifest, SVG sprite, per-icon shadcn registry files and React component exports.

## Design consistency
- Preserved the 24 × 24 SVG coordinate grid, 1.5px stroke, round caps/joins and `currentColor`.
- Kept 16px, 20px and 24px as supported display sizes.
- Added explicit 16px legibility guidance: simple silhouettes, sufficient gaps and no details that disappear at small sizes.

## Rendering stability
- Removed render-time reduced-motion media-query branches from initial animation styles in the marketing components.
- Kept the global MotionConfig reduced-motion policy; animation preferences are handled by Motion rather than changing the server/client initial markup.
- Removed metadata references to optional PNG social/favicon assets that are not present in this slim archive. Existing supplied visual assets were preserved.

## Validation
- `node scripts/icons/validate.mjs` — passed: 109 icons, 109 SVG files.
- `node scripts/icons/build.mjs` — passed.
- `node packages/react/scripts/build.mjs` — passed.
- Full Next.js production build was not run in this environment because dependency installation did not complete. Run `npm ci` (or `bun install`) then `npm run build` locally.

New cultural/religious icon artwork is intentionally marked `needs-review`; expert cultural review is recommended before a public release.

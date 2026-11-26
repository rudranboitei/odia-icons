# OdiaIcons 0.3.0 — Cultural Library Expansion

- Expanded the icon library from 109 to 132 icons with 23 additional Odisha-focused symbols.
- Added architecture, festivals, dance and folk traditions, crafts, Odia food, wildlife, and coastal/nature motifs.
- Added matching Odia labels, bilingual discovery tags, category metadata, and cultural-review notes.
- Kept the 24×24 grid, 1.5px stroke, `currentColor`, and rounded caps/joins.
- Regenerated the typed icon manifest, public JSON manifest, SVG sprite, per-icon registry entries, and React component exports.
- New cultural artwork is marked `needs-review`; please obtain knowledgeable cultural review before marking it reviewed.

## Validation

- `node scripts/icons/validate.mjs` — passed: 132 icons, 132 outline SVGs.
- `node scripts/icons/build.mjs` — passed.
- `node packages/react/scripts/build.mjs` — passed: 132 React components generated.

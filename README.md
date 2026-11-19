# odiaicons

A free, open-source icon set shaped by Odisha's temples, textiles and living
visual traditions. Built with Next.js, Tailwind CSS and Motion.

## Features

- Five hand-drawn Odia motifs on a shared 24 × 24 grid with 1.75px strokes
- Searchable, filterable icon browser at `/icons` with a detail drawer
- Playground: resize, change stroke, preview at 16/24/32/48, copy SVG / JSX /
  React / import / data URI, download SVG or PNG
- Animated feature cards explaining the set
- Satoshi type, fully responsive, respects reduced motion

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding an icon

Every icon is a source SVG plus a metadata file. Follow `SKILL.md` for the
design rules (24 × 24 canvas, 2px safe padding, 1.75px stroke, round caps,
`currentColor`, no fills).

```
icons/outline/<name>.svg
meta/<name>.json
```

Metadata shape:

```json
{
  "name": "konark-wheel",
  "odia": "କୋଣାର୍କ ଚକ",
  "category": "architecture",
  "tags": ["konark", "chakra", "sun temple", "wheel", "ଚକ"],
  "aliases": ["sun-wheel"],
  "variants": ["outline"],
  "contributors": ["your-github-handle"],
  "since": "0.1.0",
  "note": ""
}
```

Then validate and rebuild the generated artifacts:

```bash
bun run icons:validate   # grid, stroke, colors, metadata, 2KB budget
bun run icons:build      # regenerates the manifest, sprite and registry
```

`icons:build` writes:

| Path                        | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| `src/lib/icons.generated.ts` | Typed manifest consumed by the website         |
| `public/icons.json`         | Public manifest for search and tooling         |
| `public/svg/<variant>/*.svg` | Raw, CDN-friendly SVGs                         |
| `public/odiaicons-sprite.svg` | `<symbol>` sprite for `<use>`                  |
| `public/r/<name>.json`      | shadcn-style registry item per icon            |

`bun run build` runs the icon build first, so the site can never ship a stale
manifest. To preview without the pipeline run `bunx next dev`; the generated
file is committed.

## Editing content

All copy, links, features and footer text live in `src/lib/site-config.ts`.
Icon rendering and export helpers live in `src/lib/icons.tsx`.

## Build

```bash
bun run build
bun run start
```

## License

MIT — free to use in personal and commercial work.

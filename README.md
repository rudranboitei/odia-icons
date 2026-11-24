<p align="center">
  <img src="./public/construction.svg" alt="odiaicons logo construction sheet" width="100%" />
</p>

# OdiaIcons

<p align="center">
  <strong>Free, open-source icons inspired by Odisha’s temples, textiles, and living traditions.</strong>
</p>

<p align="center">
  <a href="https://icons.odiaui.xyz">Website</a> ·
  <a href="https://icons.odiaui.xyz/icons">Browse Icons</a> ·
  <a href="https://github.com/rudranboitei/odia-icons/issues/new">Request an Icon</a> ·
  <a href="#contributing">Contribute</a>
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-1f1f1f?style=flat-square" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/icons-8-f3e0c9?style=flat-square&labelColor=1f1f1f" alt="8 icons" />
  <img src="https://img.shields.io/badge/grid-24%C3%9724-1f1f1f?style=flat-square" alt="24x24 grid" />
  <img src="https://img.shields.io/badge/stroke-1.75px-1f1f1f?style=flat-square" alt="1.75px stroke" />
  <a href="https://github.com/rudranboitei/odia-icons/pulls"><img src="https://img.shields.io/badge/PRs-welcome-1f1f1f?style=flat-square" alt="PRs welcome" /></a>
</p>

---

OdiaIcons is a small, carefully crafted icon set that translates Odisha’s visual language into clean, production-ready line icons. Each icon is drawn on a shared 24 × 24 grid, uses `currentColor`, and is designed to feel consistent across product interfaces, websites, and editorial layouts.

Search and discover icons in **English** or **ଓଡ଼ିଆ** on the [icon browser](https://icons.odiaui.xyz/icons).

## Highlights

- **Rooted in Odisha** — Motifs inspired by Konark, Kalinga architecture, Pattachitra, Jagannath culture, and local traditions.
- **Consistent by design** — Every icon follows a 24 × 24 grid, 2px safe padding, 1.75px stroke, round caps, and round joins.
- **Theme-friendly** — Built with `currentColor`, so icons inherit text color and work naturally in light/dark themes.
- **Developer-ready exports** — Copy SVG, JSX, React/TSX, import snippet, or data URI from the playground.
- **Bilingual discovery** — Icon names, tags, and aliases support English and Odia script.
- **Open source** — MIT licensed, free for personal and commercial use.

## Current Icon Set

| Icon | Name | Odia | Category |
|------|------|------|----------|
| Boita | `boita` | ବୋଇତ | Festival |
| Deepa | `deepa` | ଦୀପ | Festival |
| Deula | `deula` | ଦେଉଳ | Architecture |
| Jagannath | `jagannath` | ଜଗନ୍ନାଥ | Culture |
| Konark Wheel | `konark-wheel` | କୋଣାର୍କ ଚକ | Architecture |
| Machha | `machha` | ମାଛ | Nature |
| Padma | `padma` | ପଦ୍ମ | Nature |
| Rath | `rath` | ରଥ | Festival |

> The set is growing. Have a motif in mind? [Request an icon](https://github.com/rudranboitei/odia-icons/issues/new).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended, project uses `bun@1.4.4`)
- Node.js 20+ for compatibility with the Next.js toolchain

### Local Development

```bash
# Clone the repository
git clone https://github.com/rudranboitei/odia-icons.git
cd odia-icons

# Install dependencies
bun install

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Starts the Next.js development server. |
| `bun run build` | Runs the icon build pipeline, then creates a production Next.js build. |
| `bun run start` | Starts the production server. |
| `bun run lint` | Runs ESLint across the project. |
| `bun run icons:validate` | Validates icon SVGs and metadata against the OdiaIcons rules. |
| `bun run icons:build` | Regenerates manifests, raw SVGs, sprite, and registry artifacts. |

## Using the Icons

The website includes an interactive icon browser at `/icons` where you can:

- Search by English name, Odia script, tag, alias, or category.
- Preview icons in the playground.
- Adjust size and stroke.
- Copy as **SVG**, **JSX**, **React TSX**, **import snippet**, or **data URI**.
- Download the icon as an **SVG** file.

### Generated Artifacts

The icon pipeline generates the files consumed by the site and tooling:

| Path | Purpose |
|------|---------|
| `src/lib/icons.generated.ts` | Typed icon manifest used by the app. |
| `public/icons.json` | Public manifest for search and tooling. |
| `public/svg/<variant>/*.svg` | Raw, CDN-friendly SVG files. |
| `public/odiaicons-sprite.svg` | SVG sprite with `<symbol>` definitions. |
| `public/r/<name>.json` | shadcn-style registry item for each icon. |

## Icon Design Spec

All icons follow the same visual contract to keep the set cohesive:

| Rule | Value |
|------|-------|
| Canvas | 24 × 24 |
| Safe area | 20 × 20 (2px padding) |
| Style | Outline |
| Stroke width | 1.75px |
| Stroke caps / joins | Round |
| Color | `currentColor` |
| Fills | None on root |
| Formats | Clean SVG paths/shapes, no hard-coded colors, gradients, filters, masks, or clip-paths |
| Size budget | Max 2KB per icon source |

For the full authoring workflow, see [`SKILL.md`](./SKILL.md).

## Contributing

Contributions are welcome — new icons, metadata improvements, bug fixes, and documentation updates all help.

### Add a New Icon

1. **Create the source SVG** at `icons/outline/<name>.svg`.
2. **Add metadata** at `meta/<name>.json`.
3. **Validate** the icon against the design rules.
4. **Build** generated artifacts.
5. **Open a pull request** with the source, metadata, and a short visual/context note.

#### Metadata Shape

```json
{
  "name": "konark-wheel",
  "odia": "କୋଣାର୍କ ଚକ",
  "category": "architecture",
  "tags": ["konark", "chakra", "sun temple", "wheel", "odisha"],
  "aliases": ["sun-wheel", "konark-chakra", "chakra"],
  "variants": ["outline"],
  "contributors": ["your-github-handle"],
  "since": "0.1.0",
  "note": ""
}
```

#### Validate and Build

```bash
bun run icons:validate
bun run icons:build
```

`bun run build` also runs the icon build before the Next.js production build, so the site does not ship stale generated artifacts.

### Contribution Guidelines

- Keep icon names in **kebab-case**.
- Include a meaningful **Odia name** and relevant bilingual tags/aliases.
- Preserve the shared grid, stroke, and visual balance.
- For culturally sensitive or religious symbols, add a brief `note` in metadata.
- Follow the detailed workflow in [`SKILL.md`](./SKILL.md) before submitting.

## Project Structure

```text
.
├── icons/                  # Source icon SVGs by variant
│   └── outline/
├── meta/                   # Icon metadata JSON files
├── public/                 # Static assets and generated icon artifacts
│   ├── svg/
│   ├── r/
│   └── odiaicons-sprite.svg
├── scripts/
│   └── icons/              # Icon validation and build pipeline
├── src/
│   ├── app/                # Next.js App Router pages/layout
│   ├── components/         # UI and marketing components
│   ├── data/               # Site copy and configuration
│   └── lib/                # Icon helpers and generated manifest
├── DESIGN.md               # Design system reference
├── SKILL.md                # Icon authoring workflow
└── package.json
```

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Motion:** [Motion](https://motion.dev/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)
- **Code Highlighting:** [Shiki](https://shiki.style/)
- **Package Manager:** [Bun](https://bun.sh/)

## Editing Site Content

Most landing page copy, links, and site configuration live in [`src/data/site.ts`](./src/data/site.ts). Icon rendering and export helpers live in [`src/lib/icons.tsx`](./src/lib/icons.tsx).

## License

Released under the [MIT License](./LICENSE). Free to use in personal and commercial projects.
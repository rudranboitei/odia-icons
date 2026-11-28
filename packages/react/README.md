<p align="center">
  <img src="https://raw.githubusercontent.com/rudranboitei/odia-icons/main/public/construction.svg" alt="odiaicons logo construction sheet" width="100%" />
</p>

# @odiaui/icons-react

Free, open-source Odisha icons as typed React components. Every icon is drawn
on a **24 × 24 grid**, uses `currentColor`, and ships as a tree-shakeable named
export. MIT licensed.

- 237 icons, drawn with Odisha in mind
- React 18+
- TypeScript types included
- ESM and CJS builds
- No runtime dependencies beyond React

## Install

```bash
npm install @odiaui/icons-react
```

```bash
pnpm add @odiaui/icons-react
```

```bash
yarn add @odiaui/icons-react
```

```bash
bun add @odiaui/icons-react
```

## Usage

```tsx
import { Home } from "@odiaui/icons-react";

export function Example() {
  return <Home size={32} className="text-orange-600" />;
}
```

Colour comes from `currentColor`, so Tailwind text utilities, CSS `color`, or a
`color` prop all work:

```tsx
<Home size={24} color="#ea580c" />
```

Every component forwards its ref to the underlying `<svg>`:

```tsx
import { useRef } from "react";
import { Search } from "@odiaui/icons-react";

const ref = useRef<SVGSVGElement>(null);
<Search ref={ref} size={40} aria-label="Search" />;
```

## Props

| Prop          | Type                                   | Default                  | Description                                                        |
| ------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| `size`        | `number \| string`                     | `24`                     | Width and height of the icon.                                      |
| `className`   | `string`                               | —                        | CSS classes applied to the `<svg>`.                                |
| `color`       | `string`                               | `currentColor` inherited | Sets the icon colour. The icon strokes use `currentColor`.          |
| `strokeWidth` | `number \| string`                     | `2`                      | Stroke width.                                                      |
| `...props`    | `React.SVGProps<SVGSVGElement>`        | —                        | Any valid SVG attribute, event handler or accessibility prop.      |

Component names are the PascalCase form of the SVG filename. For example,
`home.svg` becomes `Home`:

```tsx
import { Home } from "@odiaui/icons-react";
```

Browse the full set at [icons.odiaui.xyz/icons](https://icons.odiaui.xyz/icons).

## Tree-shaking

The package is ESM-first, declares `"sideEffects": false`, and exposes one named
component per icon. Bundlers can remove any icon you do not import.

## Requirements

- React 18 or newer
- Node 18 or newer when building from source

## Licence

MIT © odiaicons contributors. See [LICENSE](./LICENSE).

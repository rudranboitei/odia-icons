# @rdrudra99/odia-icons

Free, open-source Odisha icons as typed React components. Every icon is drawn
on a **24 × 24 grid**, uses `currentColor`, and ships as a tree-shakeable named
export. MIT licensed.

- 37 hand-drawn motifs: temples, Pattachitra, Odissi, festivals and food
- React 18+
- TypeScript types included
- ESM and CJS builds
- No runtime dependencies beyond React

## Install

```bash
npm install @rdrudra99/odia-icons
```

```bash
pnpm add @rdrudra99/odia-icons
```

```bash
yarn add @rdrudra99/odia-icons
```

```bash
bun add @rdrudra99/odia-icons
```

## Usage

```tsx
import { Deepa } from "@rdrudra99/odia-icons";

export function Example() {
  return <Deepa size={32} className="text-orange-600" />;
}
```

Colour comes from `currentColor`, so Tailwind text utilities, CSS `color`, or a
`color` prop all work:

```tsx
<Deepa size={24} color="#ea580c" />
```

Every component forwards its ref to the underlying `<svg>`:

```tsx
import { useRef } from "react";
import { Lotus } from "@rdrudra99/odia-icons";

const ref = useRef<SVGSVGElement>(null);
<Lotus ref={ref} size={40} aria-label="Lotus" />;
```

## Props

| Prop          | Type                                   | Default                  | Description                                                        |
| ------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| `size`        | `number \| string`                     | `24`                     | Width and height of the icon.                                      |
| `className`   | `string`                               | —                        | CSS classes applied to the `<svg>`.                                |
| `color`       | `string`                               | `currentColor` inherited | Sets the icon colour. The icon strokes use `currentColor`.          |
| `strokeWidth` | `number \| string`                     | `1.5`                    | Stroke width.                                                      |
| `...props`    | `React.SVGProps<SVGSVGElement>`        | —                        | Any valid SVG attribute, event handler or accessibility prop.      |

Component names are the PascalCase form of the SVG filename. For example,
`olive-ridley-turtle.svg` becomes `OliveRidleyTurtle`:

```tsx
import { OliveRidleyTurtle } from "@rdrudra99/odia-icons";
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

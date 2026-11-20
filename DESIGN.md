# OdiaIcons Design System

Design reference for the OdiaIcons landing page and icon browser. Dark-first, warm and tactile: a near-black canvas, one cream accent, a pixel-font wordmark, and springy motion.

**Stack:** Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui components, Motion (`motion/react`), Tabler icons (icon pages), Lucide (landing), Shiki (code).

---

## 1. Principles

1. **One accent.** Cream (`--primary`) is the only brand colour. Everything else is neutral. If something needs attention, make it cream, not a new hue.
2. **Dark first.** The look is designed for dark mode. Light mode works through tokens but the cream-on-black character is the reference.
3. **Tactile.** Pressable keycap, lift on hover, spring on release. Interactions should feel physical, not fade-only.
4. **Quiet surfaces.** Cards are barely-there (`white/3–6%`) with hairline borders. The icons are the content.
5. **Odia-first.** Names and search work in English and ଓଡ଼ିଆ. Odia script is never hidden or de-emphasised.

---

## 2. Colour tokens

Defined in `app/globals.css` (`:root`), mapped to Tailwind through `@theme inline`.

| Token | Value | Use |
|---|---|---|
| `--background` | `#141414` | Page canvas |
| `--foreground` | `#f5f1ea` | Primary text (warm off-white) |
| `--card` | `#1b1b1b` | Raised surfaces |
| `--card-foreground` | `#f5f1ea` | Text on cards |
| `--primary` | `#f3e0c9` | Brand cream: CTAs, active pills, highlights |
| `--primary-foreground` | `#1a1713` | Text on cream |
| `--secondary` | `#2a2a2a` | Secondary button fill |
| `--muted` | `#232323` | Inactive pills, code backgrounds |
| `--muted-foreground` | `#9b968d` | Secondary text, labels |
| `--accent` | `#2f2b27` | Hover fill (ghost) |
| `--accent-foreground` | `#f3e0c9` | Text on hover fill |
| `--border` | `rgba(255,255,255,0.09)` | Hairlines |
| `--input` | `rgba(255,255,255,0.12)` | Input borders |
| `--ring` | `#f3e0c9` | Focus ring |
| `--radius` | `1rem` | Base radius |

**Glass surfaces:** `bg-white/[0.03–0.06]` + `border-white/10`, with `backdrop-blur` on anything that floats (badges, search, sticky header).

**Glows:** cream at low alpha, e.g. `shadow-[0_0_40px_-8px_rgba(243,224,201,0.55)]` on the primary button, and `color-mix(in oklab, var(--primary) 14–16%, transparent)` for radial hero/preview glows.

### Keycap (fixed colours, same in both themes)

| Part | Value |
|---|---|
| Outer face gradient | `#f7e8d4` → `#e6c9a6` |
| Inner dish gradient | `#f3dec4` → `#ecd2b0` |
| Bottom edge (3D depth) | `#b8946b` |
| Icon colour | `#3b2a1a` |

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display / UI | **Inter Tight** (`--font-inter-tight`) | Tight, modern grotesque. Weights 400–600 |
| Wordmark / titles | **Pixelify Sans** (`--font-pixelify` → `font-pixel`) | Weights 600–700. Used only for hero wordmark, page title, dialog icon name, empty state |
| Code / names | System mono (`font-mono`) | Icon names, sizes, install commands |

### Scale

| Use | Classes |
|---|---|
| Hero line 1 (pixel) | `font-pixel text-5xl md:text-7xl font-bold leading-none` |
| Hero line 2 | `text-5xl md:text-8xl font-semibold tracking-tight leading-[1.05]` |
| Section title | `text-4xl md:text-6xl font-semibold tracking-tight` |
| CTA title | `text-5xl md:text-7xl font-semibold tracking-tight` |
| Lead paragraph | `text-lg md:text-xl text-muted-foreground leading-relaxed` |
| Body / card text | `text-sm text-muted-foreground leading-relaxed` |
| Icon name / meta | `font-mono text-[11px] text-muted-foreground` |
| Page title (icon browser) | `font-pixel text-4xl md:text-6xl font-bold` |

**Accent word rule:** in a big heading, exactly one phrase is cream (`text-primary`), e.g. "Icons ⚙ **with soul.**", "Ship it today.", "Come build with **Odisha.**".

---

## 4. Shape, spacing, layout

- **Radius:** pills and buttons `rounded-full`; cards and panels `rounded-3xl`; inner code blocks `rounded-2xl`; badges `rounded-lg`.
- **Borders:** 1px hairline, always `border-border` or `border-white/10`.
- **Page width:** landing sections `max-w-6xl` (explorer), `max-w-5xl` (install), `max-w-4xl` (CTA); gutters `px-6`. Icon browser frame is `max-w-[1600px]` with vertical hairlines (`border-x`).
- **Section rhythm:** `py-28` between landing sections.
- **Icon grid:** landing `grid-cols-2 sm:3 md:4 lg:6`, gap 4. Browser `grid-cols-2 sm:3 lg:4`, gap 3, cards `h-[164px]`.
- **Icon browser layout:** 232px sticky sidebar, sticky header (blurred) with search + category pills, main grid, 236px sticky right panel (xl and up).

---

## 5. Components

Built on shadcn conventions (`cva`, `data-slot`, Radix `Slot`/`asChild`, `cn()`).

### Button (`components/ui/button.tsx`)
- Always `rounded-full`, `font-semibold`.
- **default:** cream fill, dark text, cream glow.
- **secondary:** `bg-secondary/80`, `border-white/10`, `backdrop-blur`.
- **ghost / outline:** transparent, hover `bg-accent`.
- Sizes: `sm` h-9, `default` h-11, `lg` h-14 (hero CTAs), `icon` size-9.
- Wrap in `motion.div` with `whileHover={{ y: -2 }}` and `whileTap={{ scale: 0.97 }}` for the tactile feel.

### Badge (`components/ui/badge.tsx`)
- Small glass chip: `rounded-lg border-white/10 bg-white/[0.06] backdrop-blur`, `text-xs`.
- `active` variant: `border-primary/60 bg-primary/15 text-primary`.
- Hero badges: GitHub, stars, installs (only shown when set), icon count.

### Card (`components/ui/card.tsx`)
- `rounded-2xl border bg-card p-6`; feature cards override to `border-white/10 bg-white/[0.03]`.
- Icon tile inside: `size-11 rounded-xl bg-primary/15 text-primary`.

### Input (`components/ui/input.tsx`)
- `h-12 rounded-full bg-white/[0.04] backdrop-blur`, focus: cream border + `ring-[3px] ring-ring/30`.

### Pills (category, size, stroke, tab)
- Inactive: `bg-muted text-muted-foreground`. Active: `bg-primary text-primary-foreground`.
- The active background is a shared `layoutId` span, so it **slides** between options (one `layoutId` per group: `category-pill`, `pill-size`, `pill-stroke`, `pill-tab`).

### Icon card
- `rounded-3xl border-border bg-card/40`, icon 34px, mono name below.
- Hover: lift `y: -4`, border to `primary/40`, icon turns cream, soft cream shadow, arrow chip appears bottom-right.
- Quick actions (copy SVG, copy JSX, download) appear top-right on hover as `size-7` round buttons.

### Keycap tile
- 80px mobile / 112px desktop on landing, 56px / 80px on the icon page.
- Pressing: `whileTap={{ y: 6, scale: 0.97 }}`. Hover: `rotate: -4, scale: 1.04`.

### Code (`components/shiki-code.tsx`)
- Custom Shiki themes `odia-dark` / `odia-light`, transparent backgrounds.

| Token | Dark | Light |
|---|---|---|
| Foreground | `#f5f1ea` | `#2a2118` |
| Comments (italic) | `#7d776d` | `#9a8f80` |
| Strings | `#f3e0c9` | `#8a5a1f` |
| Keywords / tags | `#e8a77a` | `#b4532a` |
| Functions / attributes | `#f0c987` | `#8c6a14` |
| Numbers / constants | `#e6b98a` | `#a0521c` |
| Variables | `#cdbfa8` | `#5a4c3a` |
| Punctuation | `#9b968d` | `#6f655a` |

### Playground dialog
- Left: preview on a dotted 16px grid with a cream radial glow, size/stroke caption chip.
- Right: icon name (pixel font), category chip, Size / Stroke / Color rows, SVG/JSX/CLI tabs, actions (Copy, SVG, PNG 512).
- Colour swatches are springy (`scale 1.1` when selected, cream ring).

---

## 6. Hero composition (landing)

```
Meet [keycap] Odia              ← Pixelify Sans, white
Icons [spinning wheel] with soul.   ← Inter Tight, "with soul." in cream
Lead paragraph (muted)
[Install icons]  [Browse icons →]   ← cream CTA + glass secondary
[GitHub] [stars?] [installs?] [N icons]   ← glass badges
```

**Background:** `IconWall`, 9 columns of dimmed icon cards drifting vertically.
- Columns alternate up/down; duration `38 + (col % 4) * 9` seconds, linear, infinite. Content is duplicated and translated by 50% for a seamless loop.
- Column offsets vary (`-6rem`, `2rem`, `-2rem`) so cards don't align.
- Cards alternate `aspect-square` and `aspect-[3/4]`.
- Layers: wall at `opacity-[0.55]` → `bg-[#141414]/70` overlay → radial pool of `#141414` behind the text → bottom fade into the page.

---

## 7. Motion

All via `motion/react`.

| Name | Value |
|---|---|
| Ease (entrances) | `[0.22, 1, 0.36, 1]` |
| Hero stagger | `staggerChildren: 0.12`, `delayChildren: 0.25` |
| Rise (text) | from `opacity 0, y 28, blur 10px` to rest, 0.8s |
| Keycap entrance | spring, stiffness 220, damping 15, mass 0.9, from `scale .6, rotate -14` |
| Pills / layout | spring, stiffness 500, damping 36 |
| Cards hover | spring, stiffness 380–400, damping 28 |
| Scroll reveal | `whileInView`, `once: true`, `margin: -60 to -80px`, 0.6–0.7s |
| Grid card entrance | `y 14, scale .97` to rest, 0.45s, delay `min(index % 12, 11) * 0.025` |
| Wheel spin | linear 360° over 18s, infinite |
| Sidebar dot pulse | scale `[1, 1.5, 1]`, 2.4s loop |
| Copy feedback | icon swaps with `scale .5, rotate -30` to rest, 0.15s |
| Code tab swap | `AnimatePresence mode="wait"`, 0.18s |

**Reduced motion:** the wall, spinning wheel, and sidebar dot stop (`useReducedMotion`). Entrances still play.

**Rules**
- Hover = lift (`y: -2` buttons, `-4` cards). Tap = shrink (`scale .96–.97`).
- Animate transforms and opacity only. No animating layout on large lists; big grids use per-card `whileInView` instead of `layout`.

---

## 8. Icon spec (what the icons themselves follow)

From the OdiaIcons contributor spec.

- Canvas **24 × 24**, 2px safe padding (20 × 20 live area).
- **Outline** style, **1.75px stroke**, round caps and joins, `fill="none"`, `stroke="currentColor"`.
- No hard-coded colours, gradients, filters, masks or clip-paths.
- Snap points to 0.5px; motifs must stay recognisable at 16px.
- Variants: `outline` (default), `solid`, `duotone` (`currentColor` + 0.25 opacity layer).
- Each icon has metadata: kebab-case `name`, Odia-script `odia` name, `category`, 3–8 `tags` (incl. Odia + transliteration), `aliases`.
- Categories: `culture`, `architecture`, `art`, `festival`, `food`, `nature`, `travel`, `ui`.
- Sensitive religious or cultural symbols get a one-line `note`.
- Max 2KB per icon.

In the UI, icons render at 34px (grid cards, `absoluteStrokeWidth`), 10–14 (landing tiles), and 16–96 in the playground.

---

## 9. Accessibility

- Decorative SVGs: `aria-hidden`. Icon cards are real `<button>`s with `aria-label="Open {name} icon"`.
- Focus: cream `ring-[3px]` (inputs, buttons) or `ring-2 ring-offset-2` (grid cards).
- Pills use `aria-pressed`. Search input has `aria-label`. Dialog has a screen-reader title and description.
- Keyboard: `⌘K` / `Ctrl+K` or `/` focuses search; `Esc` clears and blurs it.
- Contrast: cream (`#f3e0c9`) on `#141414` is ~14:1. Muted text (`#9b968d`) on `#141414` is ~6:1. Keep secondary text no darker than `muted-foreground`.
- Motion respects `prefers-reduced-motion`.

---

## 10. Do / Don't

**Do**
- Use cream for the single most important thing in a view.
- Keep surfaces translucent with hairline borders.
- Use the pixel font only for display moments (wordmark, page title, empty state).
- Give every interactive element a hover lift and a tap press.

**Don't**
- Introduce a second brand colour or coloured gradients (the keycap is the only gradient).
- Use the pixel font for body text, buttons, or labels.
- Use sharp corners. Everything is rounded.
- Add heavy shadows. Depth comes from borders, blur, and the cream glow.
- Animate every card with `layout` in big grids.

---

## 11. File map

| File | Role |
|---|---|
| `app/globals.css` | Colour tokens, radius, font mapping |
| `app/layout.tsx` | Loads Inter Tight + Pixelify Sans, sets `dark` class |
| `components/hero.tsx` | Wordmark, keycap, spinning wheel, CTAs, badges |
| `components/icon-wall.tsx` | Drifting background columns |
| `components/icon-explorer.tsx` | Landing search + filter + grid |
| `components/install-section.tsx` | Copyable commands + feature cards |
| `components/cta-footer.tsx` | Final CTA + footer |
| `components/ui/*` | Button, Badge, Card, Input |
| `icon-browser.tsx` | Full icon page (sidebar, header, grid, panel, dialog) |
| `icon-playground.tsx` | Icon customiser (size, stroke, colour, code, export) |
| `shiki-code.tsx` | Themed code highlighting |
| `data/site.ts` | Site copy, links, install command |

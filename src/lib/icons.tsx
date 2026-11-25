import { forwardRef, type SVGProps } from "react"
import { icons, iconsByName, type IconCategory, type IconDef } from "./icons.generated"

export { icons, iconsByName }
export type { IconCategory, IconDef, IconVariant } from "./icons.generated"

export type Opts = { size: number; stroke: number }

export const GRID = 24
export const DEFAULT_STROKE = 1.5

const els = (body: string, pad: string) => {
  const parts = body.match(/<[^>]+>/g) ?? []
  return parts.map((element) => pad + element).join("\n")
}

export const pascal = (name: string) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

const toJsxBody = (body: string) =>
  body
    .replace(/\bstroke-width=/g, "strokeWidth=")
    .replace(/\bstroke-linecap=/g, "strokeLinecap=")
    .replace(/\bstroke-linejoin=/g, "strokeLinejoin=")
    .replace(/\bfill-rule=/g, "fillRule=")
    .replace(/\bclip-rule=/g, "clipRule=")

export const toSvg = (icon: IconDef, o: Opts) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${o.size}" height="${o.size}" viewBox="0 0 ${GRID} ${GRID}" fill="none" stroke="currentColor" stroke-width="${o.stroke}" stroke-linecap="round" stroke-linejoin="round">\n${els(icon.body, "  ")}\n</svg>`

export const toJsx = (icon: IconDef, o: Opts) =>
  `<svg width={${o.size}} height={${o.size}} viewBox="0 0 ${GRID} ${GRID}" fill="none" stroke="currentColor" strokeWidth={${o.stroke}} strokeLinecap="round" strokeLinejoin="round">\n${toJsxBody(els(icon.body, "  "))}\n</svg>`

export const toComponentJsx = (icon: IconDef, o: Opts, packageName: string) => {
  const name = pascal(icon.name)
  return `import { ${name} } from "${packageName}"

export default function Example() {
  return <${name} size={${o.size}} strokeWidth={${o.stroke}} className="text-neutral-900" />
}
`
}

export const toTsx = (icon: IconDef, o: Opts) =>
  `import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

export function ${pascal(icon.name)}({ size = ${o.size}, strokeWidth = ${o.stroke}, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 ${GRID} ${GRID}"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
${toJsxBody(els(icon.body, "      "))}
    </svg>
  );
}
`

export const toImport = (icon: IconDef) =>
  `import { ${pascal(icon.name)} } from "@odiaui/icons-react"\n\n<${pascal(icon.name)} size={24} strokeWidth={1.5} />`

// currentColor does not work inside a data URI, so a fixed ink color is used.
export const toDataUri = (icon: IconDef, o: Opts) =>
  `data:image/svg+xml,${encodeURIComponent(toSvg(icon, o).replace("currentColor", "#232120"))}`

export const formats = [
  { id: "svg", label: "SVG", run: toSvg, file: (i: IconDef) => `${i.name}.svg`, mime: "image/svg+xml" },
  { id: "jsx", label: "JSX", run: toJsx },
  { id: "tsx", label: "React", run: toTsx, file: (i: IconDef) => `${pascal(i.name)}.tsx`, mime: "text/plain" },
  { id: "import", label: "Import", run: toImport },
  { id: "uri", label: "Data URI", run: toDataUri },
] as const

/** Cultural icons shown first, in this order, so the set reads as Odia. */
const FEATURED_ORDER: readonly string[] = [
  "deul-temple",
  "konark-wheel",
  "rasagola",
  "pakhala",
]

export const CATEGORY_ORDER: readonly IconCategory[] = [
  "architecture",
  "culture",
  "art",
  "festival",
  "food",
  "nature",
  "travel",
  "ui",
]

function sortIcons(list: IconDef[]): IconDef[] {
  return [...list].sort((a, b) => {
    const aFeatured = FEATURED_ORDER.indexOf(a.name)
    const bFeatured = FEATURED_ORDER.indexOf(b.name)
    if (aFeatured !== -1 || bFeatured !== -1) {
      if (aFeatured === -1) return 1
      if (bFeatured === -1) return -1
      return aFeatured - bFeatured
    }

    const aCategory = CATEGORY_ORDER.indexOf(a.category)
    const bCategory = CATEGORY_ORDER.indexOf(b.category)
    if (aCategory !== bCategory) return aCategory - bCategory

    return a.name.localeCompare(b.name)
  })
}

export function searchIcons(query: string): IconDef[] {
  const q = query.trim().toLowerCase()
  const matches = q
    ? icons.filter((icon) =>
        [icon.name, icon.odia, icon.category, ...icon.tags, ...icon.aliases]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : icons
  return sortIcons(matches)
}

type IconProps = Omit<
  SVGProps<SVGSVGElement>,
  "color" | "stroke" | "strokeWidth"
> & {
  /** Icon definition, or pass `name` to look it up from the generated set. */
  def?: IconDef
  name?: string
  size?: number
  stroke?: number
  strokeWidth?: number
  color?: string
  absoluteStrokeWidth?: boolean
  title?: string
  variant?: "outline" | "solid" | "duotone"
}

/**
 * Renders an icon on the 24×24 grid. Decorative by default; pass `title` to
 * expose it to assistive tech as a labelled image.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    def,
    name,
    size = GRID,
    stroke,
    strokeWidth,
    color = "currentColor",
    absoluteStrokeWidth = false,
    title,
    variant = "outline",
    className,
    ...props
  },
  ref
) {
  const icon = def ?? (name ? iconsByName[name] : undefined)
  if (!icon) return null

  const width = strokeWidth ?? stroke ?? DEFAULT_STROKE
  const resolved = absoluteStrokeWidth ? (width * GRID) / size : width

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${GRID} ${GRID}`}
      fill="none"
      stroke={color}
      strokeWidth={resolved}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      data-variant={variant}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g dangerouslySetInnerHTML={{ __html: icon.body }} />
    </svg>
  )
})

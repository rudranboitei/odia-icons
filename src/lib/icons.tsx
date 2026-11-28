import { forwardRef, type SVGProps } from "react"
import {
  ICON_COUNT,
  icons,
  iconsByName,
  type IconCategory,
  type IconDef,
} from "./icons.generated"

export { ICON_COUNT, icons, iconsByName }
export type { IconCategory, IconDef, IconVariant } from "./icons.generated"

export type Opts = { size: number; stroke: number }

export const GRID = 24
export const DEFAULT_STROKE = 2

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
  `import { ${pascal(icon.name)} } from "@odiaui/icons-react"\n\n<${pascal(icon.name)} size={24} strokeWidth={2} />`

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

/** Pinned icons shown first, in this order. */
const FEATURED_ORDER: readonly string[] = [
  "home",
  "search",
  "message",
  "user",
]

export const CATEGORY_ORDER: readonly IconCategory[] = [
  "architecture",
  "culture",
  "art",
  "festival",
  "food",
  "nature",
  "travel",
  "odisha",
  "social",
  "development",
  "web",
  "brand",
  "ai",
  "business",
  "education",
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

const SEARCH_SYNONYMS: Record<string, string[]> = {
  add: ["plus", "create", "new", "insert"],
  plus: ["add", "create", "new"],
  remove: ["delete", "trash", "bin", "close", "minus", "clear"],
  delete: ["remove", "trash", "bin", "erase"],
  trash: ["delete", "remove", "bin", "garbage"],
  close: ["x", "cancel", "dismiss", "remove", "exit"],
  cancel: ["close", "dismiss", "stop", "x"],
  search: ["find", "lookup", "magnifier", "magnifying", "discover"],
  find: ["search", "lookup", "discover"],
  settings: ["preferences", "config", "gear", "cog", "options"],
  config: ["settings", "preferences", "configuration", "options"],
  user: ["person", "profile", "account", "avatar", "member"],
  person: ["user", "profile", "account", "people"],
  profile: ["user", "account", "person", "avatar"],
  home: ["house", "dashboard", "main"],
  house: ["home", "building"],
  message: ["chat", "comment", "conversation", "talk", "sms"],
  chat: ["message", "conversation", "comment", "talk"],
  mail: ["email", "envelope", "message", "inbox"],
  email: ["mail", "envelope", "inbox"],
  notification: ["bell", "alert", "alarm", "reminder"],
  bell: ["notification", "alert", "alarm", "ring"],
  alert: ["warning", "notification", "danger", "caution", "error"],
  warning: ["alert", "caution", "danger", "triangle"],
  error: ["alert", "warning", "problem", "issue"],
  edit: ["pencil", "write", "modify", "update", "rename"],
  pencil: ["edit", "write", "draw"],
  copy: ["duplicate", "clone", "clipboard"],
  download: ["save", "export", "arrow-down"],
  upload: ["import", "arrow-up", "publish"],
  share: ["send", "forward", "social"],
  send: ["share", "forward", "message", "paper-plane"],
  link: ["url", "chain", "anchor", "external"],
  image: ["photo", "picture", "gallery", "media"],
  photo: ["image", "picture", "camera", "gallery"],
  video: ["movie", "film", "media", "play"],
  play: ["video", "start", "media"],
  pause: ["stop", "hold", "media"],
  music: ["audio", "sound", "note", "song"],
  audio: ["sound", "music", "volume", "speaker"],
  file: ["document", "page", "paper"],
  folder: ["directory", "files", "archive"],
  archive: ["folder", "box", "storage", "backup"],
  lock: ["secure", "private", "password", "security"],
  unlock: ["open", "access", "security"],
  security: ["lock", "shield", "safe", "protect"],
  shield: ["security", "protect", "safe"],
  time: ["clock", "schedule", "hour", "watch"],
  clock: ["time", "schedule", "hour"],
  calendar: ["date", "schedule", "event", "day"],
  date: ["calendar", "schedule", "time"],
  location: ["map", "pin", "place", "marker", "gps"],
  map: ["location", "place", "navigation", "pin"],
  pin: ["location", "map", "marker", "place"],
  star: ["favorite", "bookmark", "rating", "featured"],
  favorite: ["star", "heart", "like", "bookmark"],
  heart: ["like", "love", "favorite"],
  like: ["heart", "favorite", "thumb"],
  cart: ["shopping", "bag", "basket", "buy", "store"],
  shopping: ["cart", "bag", "store", "buy"],
  bag: ["cart", "shopping", "basket"],
  money: ["payment", "currency", "price", "rupee", "wallet"],
  payment: ["money", "card", "wallet", "pay"],
  chart: ["graph", "analytics", "stats", "data"],
  graph: ["chart", "analytics", "stats"],
  analytics: ["chart", "graph", "stats", "data"],
  code: ["developer", "programming", "terminal", "braces"],
  terminal: ["code", "command", "cli", "developer"],
  database: ["storage", "data", "server", "db"],
  cloud: ["server", "storage", "weather", "upload"],
  sun: ["weather", "light", "day", "bright"],
  moon: ["night", "dark", "weather"],
  weather: ["sun", "cloud", "rain", "moon"],
  phone: ["call", "mobile", "contact"],
  call: ["phone", "contact"],
  eye: ["view", "visible", "show", "preview", "watch"],
  hide: ["eye-off", "invisible", "hidden"],
  filter: ["sort", "funnel", "refine"],
  sort: ["filter", "order", "arrange"],
  menu: ["hamburger", "navigation", "list", "sidebar"],
  grid: ["layout", "apps", "dashboard", "gallery"],
  list: ["menu", "rows", "items"],
  check: ["tick", "done", "success", "complete", "approve"],
  success: ["check", "done", "complete", "approved"],
  info: ["information", "help", "about", "details"],
  help: ["info", "support", "question"],
  question: ["help", "info", "faq"],
  arrow: ["direction", "navigation", "pointer", "chevron"],
  direction: ["arrow", "navigation"],
  circle: ["round", "dot", "ring", "shape"],
  square: ["box", "rectangle", "shape"],
  triangle: ["shape", "warning", "alert"],
  odisha: ["odia", "orissa", "konark", "jagannath", "puri", "culture"],
  odia: ["odisha", "orissa", "language"],
  temple: ["mandir", "jagannath", "konark", "architecture", "shrine"],
  konark: ["sun-temple", "wheel", "odisha", "heritage"],
  jagannath: ["puri", "temple", "odisha", "lord"],
  boat: ["ship", "sail", "water", "travel"],
  fish: ["sea", "water", "ocean", "food"],
  flower: ["lotus", "bloom", "nature", "plant"],
  leaf: ["nature", "plant", "tree", "eco"],
  tree: ["nature", "plant", "forest", "leaf"],
  fire: ["flame", "hot", "burn"],
  water: ["drop", "liquid", "rain", "sea"],
  book: ["read", "education", "library", "learn"],
  education: ["book", "school", "learn", "study"],
  business: ["work", "office", "company", "briefcase"],
  social: ["share", "community", "people", "network"],
  ai: ["artificial-intelligence", "robot", "bot", "smart", "brain", "sparkle"],
  bot: ["robot", "ai", "assistant"],
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/[^a-z0-9\u0B00-\u0B7F\s-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function expandQueryTokens(tokens: string[]): string[] {
  const out = new Set<string>()
  for (const token of tokens) {
    out.add(token)
    const synonyms = SEARCH_SYNONYMS[token]
    if (synonyms) for (const synonym of synonyms) out.add(synonym)
    if (token.endsWith("s") && token.length > 3) out.add(token.slice(0, -1))
    if (token.endsWith("ing") && token.length > 5) out.add(token.slice(0, -3))
    if (token.endsWith("ed") && token.length > 4) out.add(token.slice(0, -2))
  }
  return [...out]
}

function scoreIcon(icon: IconDef, query: string, tokens: string[], expanded: string[]): number {
  const name = icon.name.toLowerCase()
  const odia = icon.odia.toLowerCase()
  const category = icon.category.toLowerCase()
  const tags = icon.tags.map((t) => t.toLowerCase())
  const aliases = icon.aliases.map((a) => a.toLowerCase())
  const haystack = [name, odia, category, ...tags, ...aliases].join(" ")

  let score = 0

  if (name === query) score += 120
  if (aliases.includes(query)) score += 110
  if (name.startsWith(query)) score += 90
  if (name.includes(query)) score += 75
  if (aliases.some((a) => a.includes(query))) score += 65
  if (tags.some((t) => t.includes(query))) score += 55
  if (category.includes(query)) score += 45
  if (odia.includes(query)) score += 45
  if (haystack.includes(query)) score += 20

  for (const token of tokens) {
    let tokenScore = 0
    if (name === token) tokenScore = Math.max(tokenScore, 60)
    if (name.startsWith(token)) tokenScore = Math.max(tokenScore, 45)
    if (name.includes(token)) tokenScore = Math.max(tokenScore, 35)
    if (aliases.some((a) => a === token || a.includes(token))) tokenScore = Math.max(tokenScore, 32)
    if (tags.some((t) => t === token || t.includes(token))) tokenScore = Math.max(tokenScore, 26)
    if (category.includes(token)) tokenScore = Math.max(tokenScore, 22)
    if (odia.includes(token)) tokenScore = Math.max(tokenScore, 22)
    if (tokenScore === 0 && haystack.includes(token)) tokenScore = 10
    if (tokenScore === 0) return 0
    score += tokenScore
  }

  for (const token of expanded) {
    if (tokens.includes(token)) continue
    if (name.includes(token)) score += 8
    else if (aliases.some((a) => a.includes(token))) score += 7
    else if (tags.some((t) => t.includes(token))) score += 6
    else if (category.includes(token)) score += 4
  }

  return score
}

export function searchIcons(query: string): IconDef[] {
  const q = normalizeSearchText(query)
  if (!q) return sortIcons(icons)

  const tokens = q.split(" ").filter(Boolean)
  const expanded = expandQueryTokens(tokens)

  const strict = icons
    .map((icon) => ({ icon, score: scoreIcon(icon, q, tokens, expanded) }))
    .filter((entry) => entry.score > 0)

  const ranked = (strict.length > 0 ? strict : icons
    .map((icon) => {
      let score = 0
      for (const token of tokens) {
        const single = scoreIcon(icon, token, [token], expandQueryTokens([token]))
        if (single > 0) score += single
      }
      return { icon, score }
    })
    .filter((entry) => entry.score > 0)
  ).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return sortIcons([a.icon, b.icon])[0] === a.icon ? -1 : 1
  })

  return ranked.map((entry) => entry.icon)
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

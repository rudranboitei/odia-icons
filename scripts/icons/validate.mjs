// Validate every icon source and its metadata before the build can pass.
// Run with: bun run icons:validate
import { readdir, readFile } from "node:fs/promises"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(HERE, "../..")

export const CATEGORIES = [
  "culture",
  "architecture",
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
export const VARIANTS = ["outline", "solid", "duotone"]

// Limits come from style-spec.json (repo root) when it exists.
const DEFAULT_SPEC = { viewBox: "0 0 24 24", stroke: 2, maxBytes: 2048 }

function loadSpec() {
  const file = path.join(ROOT, "style-spec.json")
  if (!existsSync(file)) return DEFAULT_SPEC
  return { ...DEFAULT_SPEC, ...JSON.parse(readFileSync(file, "utf8")) }
}

const SPEC = loadSpec()
const VIEWBOX = SPEC.viewBox
const STROKE = String(SPEC.stroke) // "2"
const MAX_BYTES = SPEC.maxBytes
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function fail(errors, message) {
  errors.push(message)
}

function attr(source, name) {
  const match = source.match(new RegExp(`${name}="([^"]*)"`))
  return match?.[1]
}

function innerBody(svg) {
  return svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim()
}

export async function loadIcons() {
  const errors = []
  const metaDir = path.join(ROOT, "meta")
  const iconsDir = path.join(ROOT, "icons")

  if (!existsSync(metaDir)) {
    throw new Error("Missing meta/ directory — every icon needs metadata.")
  }

  const metaFiles = (await readdir(metaDir)).filter((f) => f.endsWith(".json"))
  if (metaFiles.length === 0) fail(errors, "meta/ has no icon metadata files.")

  const icons = []
  const seen = new Map()

  for (const file of metaFiles.sort()) {
    const name = file.replace(/\.json$/, "")
    const metaPath = path.join(metaDir, file)
    let meta

    try {
      meta = JSON.parse(await readFile(metaPath, "utf8"))
    } catch (error) {
      fail(errors, `meta/${file}: invalid JSON (${error.message})`)
      continue
    }

    if (!KEBAB.test(meta.name ?? "")) {
      fail(errors, `meta/${file}: name must be kebab-case`)
    }
    if (meta.name !== name) {
      fail(errors, `meta/${file}: name "${meta.name}" does not match the filename`)
    }
    if (!meta.odia || typeof meta.odia !== "string") {
      fail(errors, `meta/${file}: missing Odia-script name ("odia")`)
    }
    if (!CATEGORIES.includes(meta.category)) {
      fail(errors, `meta/${file}: category "${meta.category}" is not allowed`)
    }
    if (!Array.isArray(meta.tags) || meta.tags.length < 3 || meta.tags.length > 8) {
      fail(errors, `meta/${file}: tags must have 3 to 8 entries`)
    }
    if (Array.isArray(meta.tags) && new Set(meta.tags).size !== meta.tags.length) {
      fail(errors, `meta/${file}: duplicate tags`)
    }
    if (!Array.isArray(meta.aliases)) {
      fail(errors, `meta/${file}: aliases must be an array`)
    }
    if (!Array.isArray(meta.variants) || meta.variants.length === 0) {
      fail(errors, `meta/${file}: variants must list at least one variant`)
    }
    for (const variant of meta.variants ?? []) {
      if (!VARIANTS.includes(variant)) {
        fail(errors, `meta/${file}: unknown variant "${variant}"`)
      }
    }
    if (!Array.isArray(meta.contributors) || meta.contributors.length === 0) {
      fail(errors, `meta/${file}: contributors must list at least one handle`)
    }
    if (typeof meta.since !== "string" || !/^\d+\.\d+\.\d+$/.test(meta.since)) {
      fail(errors, `meta/${file}: since must be a semver string`)
    }
    if (typeof meta.note !== "string") {
      fail(errors, `meta/${file}: note must be a string (use "" when empty)`)
    }

    for (const alias of [meta.name, ...(meta.aliases ?? [])]) {
      if (seen.has(alias)) {
        fail(errors, `duplicate icon name or alias "${alias}" (${seen.get(alias)} and meta/${file})`)
      } else {
        seen.set(alias, `meta/${file}`)
      }
    }

    const variants = {}

    for (const variant of meta.variants ?? []) {
      const svgPath = path.join(iconsDir, variant, `${name}.svg`)
      const label = `icons/${variant}/${name}.svg`

      if (!existsSync(svgPath)) {
        fail(errors, `${label}: missing file for variant "${variant}"`)
        continue
      }

      const svg = await readFile(svgPath, "utf8")
      const bytes = Buffer.byteLength(svg)

      if (bytes > MAX_BYTES) {
        fail(errors, `${label}: ${bytes}B exceeds the ${MAX_BYTES / 1024}KB limit`)
      }
      if (!svg.includes(`viewBox="${VIEWBOX}"`)) {
        fail(errors, `${label}: viewBox must be "${VIEWBOX}"`)
      }

      const stroke = attr(svg, "stroke-width")
      if (stroke !== STROKE) {
        fail(errors, `${label}: stroke-width must be "${STROKE}"`)
      }

      if (attr(svg, "stroke") !== "currentColor") {
        fail(errors, `${label}: stroke must be "currentColor"`)
      }
      if (attr(svg, "fill") !== "none") {
        fail(errors, `${label}: root fill must be "none"`)
      }
      if (!/stroke-linecap="round"/.test(svg) || !/stroke-linejoin="round"/.test(svg)) {
        fail(errors, `${label}: caps and joins must be round`)
      }
      if (/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(svg)) {
        fail(errors, `${label}: hard-coded colors are not allowed`)
      }
      if (/<(mask|filter|clipPath|linearGradient|radialGradient|style)\b/i.test(svg)) {
        fail(errors, `${label}: masks, filters, gradients and inline styles are not allowed`)
      }

      variants[variant] = { svg, body: innerBody(svg), bytes, stroke }
    }

    icons.push({
      ...meta,
      variants: variants,
    })
  }

  // Every SVG on disk must have metadata, so nothing ships undocumented.
  for (const variant of VARIANTS) {
    const dir = path.join(iconsDir, variant)
    if (!existsSync(dir)) continue
    for (const file of await readdir(dir)) {
      if (!file.endsWith(".svg")) continue
      const name = file.replace(/\.svg$/, "")
      if (!icons.some((icon) => icon.name === name)) {
        fail(errors, `icons/${variant}/${file}: missing meta/${name}.json`)
      }
    }
  }

  if (errors.length) {
    const message = errors.map((e) => `  ✖ ${e}`).join("\n")
    const error = new Error(`Icon validation failed (${errors.length}):\n${message}`)
    error.errors = errors
    throw error
  }

  return icons.sort((a, b) => a.name.localeCompare(b.name))
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (invokedDirectly) {
  try {
    const icons = await loadIcons()
    const count = icons.reduce((n, icon) => n + Object.keys(icon.variants).length, 0)
    console.log(`✓ Validated ${icons.length} icons (${count} files) — 24×24, ${STROKE} stroke, round caps.`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

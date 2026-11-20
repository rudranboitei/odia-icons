"use client"

import { useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { IconCheck, IconCopy, IconDownload, IconX } from "@tabler/icons-react"
import { SITE } from "../data/site"
import { copyText } from "@/lib/clipboard"
// import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { ShikiCode } from "@/components/shiki-code"
import { Icon, toJsx, toSvg, type IconDef } from "@/lib/icons"

const EASE = [0.22, 1, 0.36, 1] as const

const SIZES = [16, 20, 24, 32, 48, 64, 96]
const STROKES = [1, 1.5, 1.75, 2, 2.5]
const COLORS = [
  { label: "Inherit text color", value: "currentColor" },
  { label: "Gray", value: "#71717a" },
  { label: "Blue", value: "#2563eb" },
  { label: "Red", value: "#dc2626" },
  { label: "Green", value: "#16a34a" },
]
const TABS = ["SVG", "JSX", "CLI"] as const
type Tab = (typeof TABS)[number]

const PNG_PX = 512

function tint(source: string, color: string) {
  return color === "currentColor" ? source : source.replace(/currentColor/g, color)
}

function pascal(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

async function svgToPng(svg: string, px: number): Promise<Blob> {
  const sized = svg
    .replace(/(<svg[^>]*?\s)width="[^"]*"/, `$1width="${px}"`)
    .replace(/(<svg[^>]*?\s)height="[^"]*"/, `$1height="${px}"`)
  const url = URL.createObjectURL(
    new Blob([sized], { type: "image/svg+xml;charset=utf-8" })
  )
  try {
    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error("Could not load SVG"))
      img.src = url
    })
    const canvas = document.createElement("canvas")
    canvas.width = px
    canvas.height = px
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas unavailable")
    ctx.drawImage(img, 0, 0, px, px)
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    )
    if (!blob) throw new Error("Could not create PNG")
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}

function Row({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[12px]">
        <span className="text-muted-foreground">{label}</span>
        {value && <span className="font-mono text-primary">{value}</span>}
      </div>
      {children}
    </div>
  )
}

/** Pill whose active background slides between options in the same `group`. */
function Pill({
  active,
  onClick,
  group,
  children,
}: {
  active: boolean
  onClick: () => void
  group: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="relative rounded-full px-3 py-1.5 font-mono text-[12px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {active ? (
        <motion.span
          layoutId={`pill-${group}`}
          transition={{ type: "spring", stiffness: 500, damping: 36 }}
          className="absolute inset-0 rounded-full bg-primary"
        />
      ) : (
        <span className="absolute inset-0 rounded-full bg-muted" />
      )}
      <span
        className={`relative transition-colors ${active ? "font-medium text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
      >
        {children}
      </span>
    </button>
  )
}

const outlineBtn =
  "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-4 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-foreground/[0.08]"

export function IconPlayground({
  def,
  onClose,
}: {
  def: IconDef
  onClose?: () => void
}) {
  const [size, setSize] = useState(48)
  const [stroke, setStroke] = useState(1.75)
  const [color, setColor] = useState("currentColor")
  const [tab, setTab] = useState<Tab>("SVG")
  const [copied, setCopied] = useState(false)

  const svg = useMemo(
    () => tint(toSvg(def, { size, stroke }), color),
    [def, size, stroke, color]
  )
  const jsx = useMemo(
    () => tint(toJsx(def, { size, stroke }), color),
    [def, size, stroke, color]
  )

  const code = tab === "SVG" ? svg : tab === "JSX" ? jsx : SITE.install.command
  const copyLabel = tab === "CLI" ? "Copy command" : `Copy ${tab}`

  async function onCopy() {
    const ok = await copyText(code)
    if (!ok) {
      // toast.add({
      //   type: "error",
      //   title: "Could not copy",
      //   description: "Your browser blocked clipboard access.",
      //   timeout: 2000,
      // })
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function onDownloadSvg() {
    saveBlob(
      new Blob([`${svg}\n`], { type: "image/svg+xml;charset=utf-8" }),
      `${def.name}.svg`
    )
  }

  async function onDownloadPng() {
    try {
      saveBlob(await svgToPng(svg, PNG_PX), `${def.name}-${PNG_PX}.png`)
    } catch {
      // toast.add({
      //   type: "error",
      //   title: "Could not create PNG",
      //   description: "Try downloading the SVG instead.",
      //   timeout: 2500,
      // })
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Preview: dotted grid canvas with a soft cream glow */}
      <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted/50 text-foreground md:min-h-[360px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_75%)]"
        />
        <motion.div
          key={def.name}
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={color === "currentColor" ? undefined : { color }}
          className="relative"
        >
          <Icon def={def} size={size} stroke={stroke} />
        </motion.div>
        <span className="absolute bottom-3 left-4 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
          {size}px · stroke {stroke}
        </span>
      </div>

      {/* Controls */}
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-pixel truncate text-[24px] leading-none font-bold text-foreground">
              {def.name}
            </p>
            <p className="mt-2 text-[12px] text-muted-foreground">
              <span className="font-mono">{pascal(def.name)}</span> ·{" "}
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
                {def.category}
              </span>
            </p>
          </div>
          {onClose && (
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconX className="size-4" stroke={1.75} />
            </motion.button>
          )}
        </div>

        <Row label="Size" value={`${size}px`}>
          <div className="flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <Pill key={s} group="size" active={size === s} onClick={() => setSize(s)}>
                {s}
              </Pill>
            ))}
          </div>
        </Row>

        <Row label="Stroke" value={`${stroke}px`}>
          <div className="flex flex-wrap gap-1.5">
            {STROKES.map((s) => (
              <Pill key={s} group="stroke" active={stroke === s} onClick={() => setStroke(s)}>
                {s}
              </Pill>
            ))}
          </div>
        </Row>

        <Row label="Color" value={color === "currentColor" ? "currentColor" : color}>
          <div className="flex items-center gap-2">
            {COLORS.map((c) => (
              <motion.button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                aria-label={c.label}
                aria-pressed={color === c.value}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: color === c.value ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 26 }}
                className={`size-7 rounded-full border border-border ${color === c.value
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : ""
                  }`}
                style={{ background: c.value === "currentColor" ? "var(--foreground)" : c.value }}
              />
            ))}
            <motion.label
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative size-7 cursor-pointer overflow-hidden rounded-full border border-border"
              title="Custom color"
              style={{
                background:
                  "conic-gradient(from 0deg, #ef4444, #eab308, #22c55e, #06b6d4, #6366f1, #ec4899, #ef4444)",
              }}
            >
              <input
                type="color"
                aria-label="Custom color"
                onChange={(event) => setColor(event.target.value)}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </motion.label>
          </div>
        </Row>

        {/* Code */}
        <div>
          <div className="mb-2 flex gap-1.5">
            {TABS.map((t) => (
              <Pill key={t} group="tab" active={tab === t} onClick={() => setTab(t)}>
                {t}
              </Pill>
            ))}
          </div>
          <pre className="max-h-32 overflow-auto rounded-2xl border border-border bg-muted/50 p-3.5 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap break-all text-foreground [scrollbar-width:thin]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE }}
              >
                <ShikiCode
                  code={code}
                  lang={tab === "CLI" ? "bash" : tab === "JSX" ? "jsx" : "xml"}
                />
              </motion.div>
            </AnimatePresence>
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button type="button" onClick={onCopy} className="h-10 rounded-full px-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {copied ? (
                    <IconCheck className="size-3.5" stroke={2.25} />
                  ) : (
                    <IconCopy className="size-3.5" stroke={2} />
                  )}
                </motion.span>
              </AnimatePresence>
              {copied ? "Copied" : copyLabel}
            </Button>
          </motion.div>
          <motion.button
            type="button"
            onClick={onDownloadSvg}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={outlineBtn}
          >
            <IconDownload className="size-3.5" stroke={2} />
            SVG
          </motion.button>
          <motion.button
            type="button"
            onClick={onDownloadPng}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={outlineBtn}
          >
            <IconDownload className="size-3.5" stroke={2} />
            PNG {PNG_PX}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

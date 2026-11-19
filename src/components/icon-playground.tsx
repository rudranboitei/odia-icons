"use client"

import { useMemo, useState, type ReactNode } from "react"
import { IconCheck, IconCopy, IconDownload, IconX } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { copyText } from "@/lib/clipboard"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Icon, toJsx, toSvg, type IconDef } from "@/lib/icons"

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
        {value && <span className="font-mono text-muted-foreground">{value}</span>}
      </div>
      {children}
    </div>
  )
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full bg-foreground px-3 py-1.5 font-mono text-[12px] text-background"
          : "rounded-full bg-muted px-3 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
      }
    >
      {children}
    </button>
  )
}

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

  const code = tab === "SVG" ? svg : tab === "JSX" ? jsx : siteConfig.install.command
  const copyLabel = tab === "CLI" ? "Copy command" : `Copy ${tab}`

  async function onCopy() {
    const ok = await copyText(code)
    if (!ok) {
      toast.add({
        type: "error",
        title: "Could not copy",
        description: "Your browser blocked clipboard access.",
        timeout: 2000,
      })
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
      toast.add({
        type: "error",
        title: "Could not create PNG",
        description: "Try downloading the SVG instead.",
        timeout: 2500,
      })
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Preview */}
      <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-xl border border-border bg-muted text-foreground md:min-h-[360px]">
        <div style={color === "currentColor" ? undefined : { color }} className="relative">
          <Icon def={def} size={size} stroke={stroke} />
        </div>
        <span className="absolute bottom-3 left-4 font-mono text-[11px] text-muted-foreground">
          {size}px · stroke {stroke}
        </span>
      </div>

      {/* Controls */}
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-mono text-[15px] font-medium text-foreground">
              {def.name}
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {pascal(def.name)} · {def.category}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconX className="size-4" stroke={1.75} />
            </button>
          )}
        </div>

        <Row label="Size" value={`${size}px`}>
          <div className="flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <Pill key={s} active={size === s} onClick={() => setSize(s)}>
                {s}
              </Pill>
            ))}
          </div>
        </Row>

        <Row label="Stroke" value={`${stroke}px`}>
          <div className="flex flex-wrap gap-1.5">
            {STROKES.map((s) => (
              <Pill key={s} active={stroke === s} onClick={() => setStroke(s)}>
                {s}
              </Pill>
            ))}
          </div>
        </Row>

        <Row label="Color" value={color === "currentColor" ? "currentColor" : color}>
          <div className="flex items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                aria-label={c.label}
                aria-pressed={color === c.value}
                className={`size-6 rounded-full border border-border transition-transform hover:scale-110 ${color === c.value ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                  }`}
                style={{ background: c.value === "currentColor" ? "var(--foreground)" : c.value }}
              />
            ))}
            <label
              className="relative size-6 cursor-pointer overflow-hidden rounded-full border border-border"
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
            </label>
          </div>
        </Row>

        {/* Code */}
        <div>
          <div className="mb-2 flex gap-1.5">
            {TABS.map((t) => (
              <Pill key={t} active={tab === t} onClick={() => setTab(t)}>
                {t}
              </Pill>
            ))}
          </div>
          <pre className="max-h-32 overflow-auto rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap break-all text-foreground [scrollbar-width:thin]">
            {code}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={onCopy}
            className="h-9 px-4"
          >
            {copied ? (
              <IconCheck className="size-3.5" stroke={2.25} />
            ) : (
              <IconCopy className="size-3.5" stroke={2} />
            )}
            {copied ? "Copied" : copyLabel}
          </Button>
          <button
            type="button"
            onClick={onDownloadSvg}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            <IconDownload className="size-3.5" stroke={2} />
            SVG
          </button>
          <button
            type="button"
            onClick={onDownloadPng}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            <IconDownload className="size-3.5" stroke={2} />
            PNG {PNG_PX}
          </button>
        </div>
      </div>
    </div>
  )
}

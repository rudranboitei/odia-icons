"use client"

import { useMemo, useState } from "react"
import { IconCheck, IconCopy, IconDownload, IconX } from "@tabler/icons-react"
import { SITE } from "../data/site"
import { copyText } from "@/lib/clipboard"
import { ShikiCode } from "@/components/shiki-code"
import { Icon, toComponentJsx, toSvg, type IconDef } from "@/lib/icons"
import { Corners, MonoButton, Tag } from "./ui-bits"

const STROKE = 2 // the whole set is drawn at this weight
const COPY_SIZE = 24 // size baked into the copied SVG/JSX
const PREVIEW_SIZE = 96
const TABS = ["SVG", "JSX", "CLI"] as const
type Tab = (typeof TABS)[number]

export function IconPlayground({
  def,
  onClose,
}: {
  def: IconDef
  onClose?: () => void
}) {
  const [tab, setTab] = useState<Tab>("SVG")
  const [copied, setCopied] = useState(false)

  const packageName = SITE.install.command.trim().split(/\s+/).pop() ?? SITE.npmPackage
  const svg = useMemo(() => toSvg(def, { size: COPY_SIZE, stroke: STROKE }), [def])
  const jsx = useMemo(
    () => toComponentJsx(def, { size: COPY_SIZE, stroke: STROKE }, packageName),
    [def, packageName]
  )
  const cli = SITE.install.command

  const code = tab === "SVG" ? svg : tab === "JSX" ? jsx : cli

  async function onCopy() {
    const ok = await copyText(code)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function onDownload() {
    const blob = new Blob([`${svg}\n`], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${def.name}.svg`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex w-full min-w-0 flex-col text-neutral-900">
      {/* Header row: tile + title, like an inbox item */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-md bg-black/[0.05] text-neutral-800">
          <Corners />
          <Icon def={def} size={16} stroke={STROKE} absoluteStrokeWidth />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] leading-snug text-neutral-400">
            Selected icon
          </p>
          <p className="truncate text-[13px] leading-snug">
            <span className="font-bold text-orange-600 underline decoration-orange-600/70 underline-offset-[3px]">
              {def.name}
            </span>
          </p>
        </div>
        {onClose && (
          <MonoButton variant="soft" size="iconSm" onClick={onClose} aria-label="Close">
            <IconX className="size-4" stroke={2} />
          </MonoButton>
        )}
      </div>

      {/* Preview */}
      <div className="px-4">
        <div className="relative flex h-40 items-center justify-center rounded-xl border border-black/10 bg-white text-neutral-900">
          <div
            aria-hidden
            className="absolute inset-0 rounded-xl opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              backgroundPosition: "center",
            }}
          />
          <Corners className="m-2.5 size-3" />
          <Icon
            def={def}
            size={PREVIEW_SIZE}
            stroke={STROKE}
            absoluteStrokeWidth
            className="relative"
          />
        </div>
      </div>

      {/* Meta tags */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 pt-3">
        <Tag>{def.category}</Tag>
        <span className="text-[11px] text-neutral-400">/</span>
        <Tag>24 × 24</Tag>
        <Tag>{STROKE}px</Tag>
      </div>

      <div className="mx-4 mt-4 h-px bg-black/10" />

      {/* Tabs */}
      <div className="flex gap-1.5 px-4 pt-4">
        {TABS.map((t) => (
          <MonoButton
            key={t}
            variant={tab === t ? "accent" : "soft"}
            size="sm"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className="h-7 px-2.5 text-[11px]"
          >
            {t}
          </MonoButton>
        ))}
      </div>

      {/* Code */}
      <div className="px-4 pt-3">
        <pre className="max-h-56 min-h-[120px] overflow-auto rounded-lg border border-black/10 bg-white p-3 text-[11.5px] leading-relaxed break-all whitespace-pre-wrap text-neutral-800">
          <ShikiCode
            code={code}
            lang={tab === "CLI" ? "bash" : tab === "JSX" ? "jsx" : "xml"}
          />
        </pre>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-4">
        <MonoButton variant="solid" onClick={onCopy} className="flex-1">
          {copied ? (
            <IconCheck className="size-3.5" stroke={2.25} />
          ) : (
            <IconCopy className="size-3.5" stroke={2} />
          )}
          {copied ? "Copied" : `Copy ${tab === "CLI" ? "command" : tab}`}
        </MonoButton>
        <MonoButton variant="outline" onClick={onDownload}>
          <IconDownload className="size-3.5" stroke={2} />
          SVG
        </MonoButton>
      </div>
    </div>
  )
}

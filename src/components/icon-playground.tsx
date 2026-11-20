"use client"

import { useMemo, useState } from "react"
import { IconCheck, IconCopy, IconX } from "@tabler/icons-react"
import { SITE } from "../data/site"
import { copyText } from "@/lib/clipboard"
import { Button } from "@/components/ui/button"
import { ShikiCode } from "@/components/shiki-code"
import { Icon, toJsx, toSvg, type IconDef } from "@/lib/icons"

const STROKE = 1.75 // the whole set is drawn at this weight
const COPY_SIZE = 24 // size baked into the copied SVG/JSX
const PREVIEW_SIZE = 112
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

  const svg = useMemo(() => toSvg(def, { size: COPY_SIZE, stroke: STROKE }), [def])
  const jsx = useMemo(() => toJsx(def, { size: COPY_SIZE, stroke: STROKE }), [def])

  const code = tab === "SVG" ? svg : tab === "JSX" ? jsx : SITE.install.command

  async function onCopy() {
    const ok = await copyText(code)
    if (!ok) return
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="grid w-full gap-4 md:min-h-[340px] md:grid-cols-[260px_minmax(0,1fr)] md:gap-5">
      {/* Preview */}
      <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-border bg-muted/50 text-foreground md:min-h-0">
        <Icon def={def} size={PREVIEW_SIZE} stroke={STROKE} />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-2xl leading-none font-semibold text-foreground">
            {def.name}
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconX className="size-4" stroke={1.75} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${tab === t
                ? "bg-primary font-medium text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Code: grows to fill the available height */}
        <pre className="min-h-[120px] flex-1 overflow-auto rounded-xl border border-border bg-muted/50 p-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap break-all text-foreground [scrollbar-width:thin] md:max-h-[220px]">
          <ShikiCode
            code={code}
            lang={tab === "CLI" ? "bash" : tab === "JSX" ? "jsx" : "xml"}
          />
        </pre>

        {/* Action */}
        <Button type="button" onClick={onCopy} className="h-10 w-full rounded-full sm:w-fit sm:px-6">
          {copied ? (
            <IconCheck className="size-4" stroke={2.25} />
          ) : (
            <IconCopy className="size-4" stroke={2} />
          )}
          {copied ? "Copied" : `Copy ${tab === "CLI" ? "command" : tab}`}
        </Button>
      </div>
    </div>
  )
}

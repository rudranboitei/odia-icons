"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { MotifIcon, type MotifName } from "./odia-motifs"

// ✏️ Colors come ONLY from your shadcn theme tokens
// (background, foreground, muted, border, primary), so changing your
// palette in globals.css restyles every visual automatically.

const label = "font-mono text-[10px] tracking-wider text-muted-foreground uppercase"

function useCycle(length: number, ms: number) {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [length, ms])
  return i
}

/* ───────────────────────── 1. Rooted in Odisha ─────────────────────────
   A specimen frame: one motif at a time, Odia + English label, progress bar. */
const specimens: { name: MotifName; odia: string; en: string }[] = [
  { name: "chakra", odia: "କୋଣାର୍କ", en: "Konark chakra" },
  { name: "deula", odia: "ଦେଉଳ", en: "Kalinga deula" },
  { name: "fish", odia: "ମାଛ", en: "Pattachitra fish" },
  { name: "jagannath", odia: "ଜଗନ୍ନାଥ", en: "Jagannath" },
]

const INTERVAL = 3600

export function RootedVisual() {
  const idx = useCycle(specimens.length, INTERVAL)
  const s = specimens[idx]
  return (
    <div className="relative size-full">
      {/* corner ticks */}
      {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-12 left-4 border-b border-l", "bottom-12 right-4 border-b border-r"].map((c) => (
        <span key={c} className={`absolute size-2 border-foreground/30 ${c}`} />
      ))}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={s.name}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(6px)", scale: 0.97 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)", scale: 1.02 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="absolute inset-x-0 top-0 bottom-12 flex items-center justify-center">
            <MotifIcon name={s.name} draw="once" strokeWidth={1.1} className="size-24 text-foreground" />
          </div>
          <div className="absolute inset-x-5 bottom-[52px] flex items-baseline justify-between">
            <span className="text-sm font-medium">{s.odia}</span>
            <span className={label}>{s.en}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* progress */}
      <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
        {specimens.map((_, i) => (
          <span key={i} className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-border">
            {i < idx && <span className="absolute inset-0 bg-foreground" />}
            {i === idx && (
              <motion.span
                key={`p-${idx}`}
                className="absolute inset-0 origin-left bg-foreground"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── 2. One shared grid ─────────────────────────
   Construction sheet + a row of icons that sit together. */
export function GridVisual() {
  const row: MotifName[] = ["chakra", "deula", "fish", "jagannath"]
  const D = 7 // loop duration (s)
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <div className="relative size-[96px] rounded-xl border bg-background shadow-sm">
        <svg viewBox="0 0 32 32" className="absolute inset-0 size-full" fill="none" aria-hidden>
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i} className="stroke-border" strokeWidth="0.15">
              <line x1={(i + 1) * 4} y1="0" x2={(i + 1) * 4} y2="32" />
              <line x1="0" y1={(i + 1) * 4} x2="32" y2={(i + 1) * 4} />
            </g>
          ))}
          <rect x="3" y="3" width="26" height="26" rx="1.5" strokeWidth="0.25" strokeDasharray="1 1" className="stroke-primary/50" />
          <circle cx="16" cy="16" r="13" strokeWidth="0.25" strokeDasharray="1 1" className="stroke-primary/50" />
        </svg>
        <MotifIcon name="deula" draw="loop" duration={D} strokeWidth={1.1} className="absolute inset-0 size-full text-foreground" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex divide-x overflow-hidden rounded-lg border bg-background shadow-sm">
          {row.map((name, i) => (
            <motion.div
              key={name}
              className="flex size-10 items-center justify-center"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: D, times: [0, 0.2, 0.85, 1], delay: 0.8 + i * 0.15, repeat: Infinity }}
            >
              <MotifIcon name={name} className="size-5" strokeWidth={1.5} />
            </motion.div>
          ))}
        </div>
        <span className={label}>24 × 24 · 1.75 stroke · round caps</span>
      </div>
    </div>
  )
}

/* ───────────────────────── 3. Copy as code ─────────────────────────
   Tabs (SVG / JSX / URI) with a sliding pill, code reveal, Copy → Copied. */
const tabs = [
  { id: "SVG", lines: ['<svg viewBox="0 0 32 32"', '  fill="none" stroke="currentColor">', '  <path d="M10 28.5C9.5 21…" />', "</svg>"] },
  { id: "JSX", lines: ["export const Deula = (p) => (", '  <svg viewBox="0 0 32 32" {...p}>', '    <path d="M10 28.5C9.5 21…" />', "  </svg>\n)"] },
  { id: "URI", lines: ["data:image/svg+xml,", "%3Csvg%20viewBox=%270%200", "%2032%2032%27%3E%3Cpath", "%20d=%27M10%2028.5C9.5…"] },
]

export function CopyCodeVisual() {
  const t = useCycle(tabs.length, 3400)
  const [copied, setCopied] = React.useState(false)
  const [shownTab, setShownTab] = React.useState(t)

  // Reset while rendering when the tab changes (avoids a setState-in-effect).
  if (t !== shownTab) {
    setShownTab(t)
    setCopied(false)
  }

  React.useEffect(() => {
    const id = setTimeout(() => setCopied(true), 2000)
    return () => clearTimeout(id)
  }, [t])

  return (
    <div className="flex size-full items-center justify-center p-5">
      <div className="w-full max-w-[250px] overflow-hidden rounded-xl border bg-background shadow-sm">
        <div className="flex items-center justify-between border-b px-2.5 py-2">
          <div className="flex items-center gap-2">
            <MotifIcon name="deula" className="size-4" strokeWidth={1.5} />
            <div className="flex rounded-md bg-muted p-0.5">
              {tabs.map((x, i) => (
                <span key={x.id} className="relative px-2 py-0.5 text-[10px] font-medium">
                  {i === t && (
                    <motion.span
                      layoutId="odia-tab"
                      className="absolute inset-0 rounded bg-background shadow-sm"
                      transition={{ type: "spring", stiffness: 500, damping: 36 }}
                    />
                  )}
                  <span className={`relative ${i === t ? "text-foreground" : "text-muted-foreground"}`}>{x.id}</span>
                </span>
              ))}
            </div>
          </div>

          <span className="flex h-5 items-center gap-1 rounded-md border px-1.5 text-[10px] text-muted-foreground">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "c" : "n"}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className={copied ? "text-foreground" : ""}
              >
                {copied ? "✓ Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div key={tabs[t].id} className="h-[84px] overflow-hidden px-3 py-2.5 font-mono text-[9.5px] leading-[1.65]">
          {tabs[t].lines.map((line, i) => (
            <motion.div
              key={i}
              className="whitespace-pre text-foreground/80"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.12 }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── 4. Free for anything ─────────────────────────
   MIT license card in front, a poster and an app tile peeking behind. */
export function FreeVisual() {
  return (
    <div className="relative flex size-full items-center justify-center">
      {/* poster (behind, left) */}
      <motion.div
        className="absolute left-[14%] flex h-28 w-[76px] -rotate-6 flex-col items-center gap-1.5 rounded-lg border bg-background pt-3 shadow-sm"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <MotifIcon name="deula" className="size-9" strokeWidth={1.2} />
        <span className="h-1 w-10 rounded-full bg-foreground/80" />
        <span className="h-1 w-7 rounded-full bg-muted" />
        <span className="h-1 w-9 rounded-full bg-muted" />
      </motion.div>

      {/* app tile (behind, right) */}
      <motion.div
        className="absolute right-[14%] flex size-[68px] rotate-6 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <MotifIcon name="chakra" className="size-9" strokeWidth={1.3} />
      </motion.div>

      {/* license (front) */}
      <div className="relative z-10 w-[150px] rounded-xl border bg-background p-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight">MIT License</span>
          <span className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg viewBox="0 0 16 16" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M3.5 8.5L6.5 11.5L12.5 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 4, times: [0, 0.25, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
              />
            </svg>
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          <span className="h-1 w-full rounded-full bg-muted" />
          <span className="h-1 w-5/6 rounded-full bg-muted" />
          <span className="h-1 w-full rounded-full bg-muted" />
          <span className="h-1 w-2/3 rounded-full bg-muted" />
        </div>
        <p className={`${label} mt-3 border-t pt-2`}>No attribution needed</p>
      </div>
    </div>
  )
}

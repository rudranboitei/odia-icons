"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { IconSearch, IconX } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import {
  Icon,
  icons,
  searchIcons,
  type IconCategory,
  type IconDef,
} from "@/lib/icons"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { IconPlayground } from "./icon-playground"
import { SectionHeader } from "./section-header"

const categories: Array<{ id: "all" | IconCategory; label: string }> = [
  { id: "all", label: "All" },
  ...[...new Set(icons.map((icon) => icon.category))].map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
  })),
]

export function IconShowcase() {
  const [active, setActive] = useState<IconDef | null>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<"all" | IconCategory>("all")
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(
    () =>
      searchIcons(query).filter(
        (icon) => category === "all" || icon.category === category
      ),
    [query, category]
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable

      if (event.key === "/" && !typing) {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("")
        searchRef.current?.blur()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <section id="icons" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="The set"
          title={`${icons.length} motifs. One shared grid.`}
          description="Every icon is drawn on a 24 × 24 grid with 1.75px strokes. Search, filter, then open any tile to make it yours."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <IconSearch
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#1d1d1f]/40"
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search icons, tags, ଓଡ଼ିଆ…"
              aria-label="Search icons"
              className="h-11 w-full appearance-none rounded-full border bg-card pr-10 pl-10 text-[15px] font-medium tracking-[-0.03em] text-[#1d1d1f] shadow-xs transition-colors outline-none placeholder:text-[#1d1d1f]/40 focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  searchRef.current?.focus()
                }}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-[#1d1d1f]/50 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
              >
                <IconX className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={
                  category === item.id
                    ? "rounded-full bg-[#1d1d1f] px-3.5 py-2 text-[13px] font-medium tracking-[-0.03em] text-white"
                    : "rounded-full border px-3.5 py-2 text-[13px] font-medium tracking-[-0.03em] text-[#1d1d1f]/60 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[13px] leading-[1.2] tracking-[-0.03em] text-[#1d1d1f] opacity-55">
          <span>
            {filtered.length} of {icons.length} icons
          </span>
          <span className="hidden sm:inline">
            Press <kbd className="font-mono">/</kbd> to search
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {filtered.map((icon) => (
              <button
                key={icon.name}
                type="button"
                onClick={() => setActive(icon)}
                aria-label={`Open ${icon.name} icon`}
                className="group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-3xl border bg-card p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                <Icon
                  def={icon}
                  size={52}
                  stroke={1.4}
                  className="text-[#171717] transition-transform duration-300 group-hover:scale-110"
                />
                <span className="flex flex-col items-center gap-1">
                  <span className="text-[21px] leading-[1.4] font-medium capitalize tracking-[-0.03em] text-[#1d1d1f]">
                    {icon.name.replaceAll("-", " ")}
                  </span>
                  <span className="text-[13px] leading-[1.2] tracking-[-0.03em] text-[#1d1d1f] opacity-55">
                    {icon.odia}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed px-6 py-16 text-center">
            <p className="text-[21px] leading-[1.4] font-medium tracking-[-0.03em] text-[#1d1d1f]">
              No icons match that search.
            </p>
            <p className="max-w-sm text-[15px] leading-[1.3] font-medium tracking-[-0.03em] text-[#1d1d1f] opacity-80">
              Try a different word, or ask for the motif you need.
            </p>
            <a
              href={siteConfig.links.contribute}
              target="_blank"
              rel="noopener"
              className="mt-1 text-[15px] font-medium tracking-[-0.03em] text-[#1d1d1f] underline underline-offset-4 hover:opacity-70"
            >
              Request an icon →
            </a>
          </div>
        )}

        <p className="mt-5 text-center text-[13px] leading-[1.4] tracking-[-0.03em] text-[#1d1d1f] opacity-55">
          Click any icon to resize it, change the stroke and copy the code. All
          icons are free under the{" "}
          <a
            href={siteConfig.links.license}
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2 hover:text-[#1d1d1f]"
          >
            MIT licence
          </a>
          .
        </p>
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent className="max-h-[88dvh] overflow-y-auto sm:max-w-2xl">
          {active && <IconPlayground def={active} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}

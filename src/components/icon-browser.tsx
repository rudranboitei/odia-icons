"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  IconBrandGithub,
  IconCheck,
  IconCopy,
  IconDownload,
  IconExternalLink,
  IconFileCode,
  IconHome,
  IconSearch,
  IconTerminal2,
  IconX,
} from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { copyText } from "@/lib/clipboard"
import { toast } from "@/components/ui/toast"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Icon,
  icons,
  searchIcons,
  toJsx,
  toSvg,
  type IconCategory,
  type IconDef,
} from "@/lib/icons"
import { IconPlayground } from "./icon-playground"

const categoryCounts = [
  { id: "all" as const, label: "All", count: icons.length },
  ...[...new Set(icons.map((icon) => icon.category))].map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    count: icons.filter((icon) => icon.category === id).length,
  })),
]

const navItems = [
  { label: "Home", href: "/", icon: IconHome },
  { label: "Installation", href: "/#install", icon: IconTerminal2 },
  { label: "Developers", href: "/#developers", icon: IconFileCode },
]

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

export function IconBrowser() {
  const [active, setActive] = useState<IconDef | null>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<"all" | IconCategory>("all")
  const [copiedInstall, setCopiedInstall] = useState(false)
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

      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing)) {
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

  async function copy(value: string, label: string) {
    const copied = await copyText(value)
    toast.add({
      type: copied ? "success" : "error",
      title: copied ? `Copied ${label}` : "Could not copy",
      description: copied ? undefined : "Your browser blocked clipboard access.",
      timeout: 2000,
    })
  }

  async function copyInstall() {
    const copied = await copyText(siteConfig.install.command)
    if (!copied) return
    setCopiedInstall(true)
    toast.add({
      type: "success",
      title: "Install command copied",
      description: siteConfig.install.command,
      timeout: 2000,
    })
    setTimeout(() => setCopiedInstall(false), 1600)
  }

  function download(icon: IconDef) {
    saveBlob(
      new Blob([`${toSvg(icon, { size: 24, stroke: 1.75 })}\n`], {
        type: "image/svg+xml;charset=utf-8",
      }),
      `${icon.name}.svg`
    )
  }

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col overflow-y-auto border-r lg:flex">
        <div className="px-5 py-5">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/brand/logo-wordmark.svg"
              alt={siteConfig.name}
              width={112}
              height={28}
              priority
              unoptimized
              className="h-7 w-auto"
            />
          </Link>
        </div>

        <nav className="px-3" aria-label="Site">
          <p className="px-2 text-[11px] font-medium tracking-[0.14em] text-[#1d1d1f]/40 uppercase">
            Navigation
          </p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] font-medium tracking-[-0.02em] text-[#1d1d1f]/65 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
                >
                  <item.icon className="size-4" stroke={1.75} />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] font-medium tracking-[-0.02em] text-[#1d1d1f]/65 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
              >
                <IconBrandGithub className="size-4" stroke={1.75} />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.contribute}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] font-medium tracking-[-0.02em] text-[#1d1d1f]/65 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
              >
                <IconExternalLink className="size-4" stroke={1.75} />
                Submit an icon
              </a>
            </li>
          </ul>
        </nav>

        <nav className="mt-7 px-3" aria-label="Categories">
          <p className="px-2 text-[11px] font-medium tracking-[0.14em] text-[#1d1d1f]/40 uppercase">
            Categories
          </p>
          <ul className="mt-2 flex flex-col gap-0.5">
            {categoryCounts.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                  className={
                    category === item.id
                      ? "flex w-full items-center justify-between rounded-lg bg-muted px-2 py-2 text-left text-[13px] font-medium tracking-[-0.02em] text-[#1d1d1f]"
                      : "flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-[13px] font-medium tracking-[-0.02em] text-[#1d1d1f]/60 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
                  }
                >
                  {item.label}
                  <span className="font-mono text-[11px] tabular-nums opacity-45">
                    {item.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t px-5 py-4">
          <p className="text-[11px] leading-[1.5] tracking-[-0.01em] text-[#1d1d1f]/45">
            MIT licensed · v0.1.0
            <br />
            Made in Odisha, India.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
            <Link href="/" className="shrink-0 lg:hidden">
              <Image
                src="/brand/logo-wordmark.svg"
                alt={siteConfig.name}
                width={92}
                height={23}
                priority
                unoptimized
                className="h-[23px] w-auto"
              />
            </Link>

            <div className="relative w-full max-w-sm">
              <IconSearch
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#1d1d1f]/40"
              />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${icons.length} icons…`}
                aria-label="Search icons"
                className="h-9 w-full appearance-none rounded-lg border bg-card pr-14 pl-9 text-[13px] font-medium tracking-[-0.01em] text-[#1d1d1f] outline-none placeholder:text-[#1d1d1f]/40 focus-visible:ring-3 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    searchRef.current?.focus()
                  }}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-[#1d1d1f]/50 hover:bg-muted hover:text-[#1d1d1f]"
                >
                  <IconX className="size-3.5" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-[#1d1d1f]/45">
                  ⌘K
                </kbd>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={copyInstall}
                className="hidden h-9 items-center gap-2 rounded-lg border bg-card px-3 font-mono text-[12px] whitespace-nowrap text-[#1d1d1f]/70 transition-colors hover:bg-muted hover:text-[#1d1d1f] sm:inline-flex"
              >
                <IconTerminal2 className="size-3.5" stroke={1.75} />
                {siteConfig.install.command}
                {copiedInstall ? (
                  <IconCheck className="size-3.5 text-emerald-600" />
                ) : (
                  <IconCopy className="size-3.5 opacity-50" />
                )}
              </button>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener"
                className="inline-flex h-9 items-center gap-2 rounded-lg border bg-card px-3 text-[12px] font-medium tracking-[-0.01em] text-[#1d1d1f]/70 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
              >
                <IconBrandGithub className="size-4" stroke={1.75} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none] lg:hidden">
            {categoryCounts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={
                  category === item.id
                    ? "shrink-0 rounded-full bg-[#1d1d1f] px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] text-white"
                    : "shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] text-[#1d1d1f]/60"
                }
              >
                {item.label}
                <span className="ml-1.5 font-mono text-[10px] opacity-60">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 px-4 py-5 lg:px-6">
          <h1 className="sr-only">Odiaicons icon set</h1>
          <div className="mb-4 flex items-center justify-between text-[12px] tracking-[-0.01em] text-[#1d1d1f] opacity-50">
            <span>
              {category === "all"
                ? `${filtered.length} icons`
                : `${categoryCounts.find((item) => item.id === category)?.label} · ${filtered.length} icons`}
            </span>
            <a
              href={siteConfig.links.license}
              target="_blank"
              rel="noopener"
              className="hidden transition-colors hover:opacity-80 sm:inline"
            >
              MIT licence ↗
            </a>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {filtered.map((icon) => (
                <div key={icon.name} className="group relative">
                  <button
                    type="button"
                    onClick={() => setActive(icon)}
                    aria-label={`Open ${icon.name} icon`}
                    className="flex h-[136px] w-full flex-col items-center justify-center gap-3 rounded-xl border bg-card px-3 transition-colors hover:border-[#1d1d1f]/20 hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
                  >
                    <Icon
                      def={icon}
                      size={30}
                      stroke={1.75}
                      absoluteStrokeWidth
                      className="text-[#1d1d1f]"
                    />
                    <span className="max-w-full truncate font-mono text-[11px] tracking-normal text-[#1d1d1f]/55 transition-colors group-hover:text-[#1d1d1f]/80">
                      {icon.name}
                    </span>
                  </button>

                  <div className="absolute top-2 right-2 hidden gap-1 transition-opacity sm:flex sm:opacity-100 sm:[@media(hover:hover)]:opacity-0 sm:[@media(hover:hover)]:group-hover:opacity-100 sm:[@media(hover:hover)]:focus-within:opacity-100">
                    <button
                      type="button"
                      onClick={() => copy(toSvg(icon, { size: 24, stroke: 1.75 }), "SVG")}
                      aria-label={`Copy ${icon.name} SVG`}
                      className="flex size-6 items-center justify-center rounded-md border bg-background/90 text-[#1d1d1f]/60 shadow-xs backdrop-blur transition-colors hover:text-[#1d1d1f]"
                    >
                      <IconCopy className="size-3" stroke={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(toJsx(icon, { size: 24, stroke: 1.75 }), "JSX")}
                      aria-label={`Copy ${icon.name} JSX`}
                      className="flex size-6 items-center justify-center rounded-md border bg-background/90 text-[#1d1d1f]/60 shadow-xs backdrop-blur transition-colors hover:text-[#1d1d1f]"
                    >
                      <IconFileCode className="size-3" stroke={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => download(icon)}
                      aria-label={`Download ${icon.name} SVG`}
                      className="flex size-6 items-center justify-center rounded-md border bg-background/90 text-[#1d1d1f]/60 shadow-xs backdrop-blur transition-colors hover:text-[#1d1d1f]"
                    >
                      <IconDownload className="size-3" stroke={2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-20 text-center">
              <p className="text-[21px] leading-[1.4] font-medium tracking-[-0.03em] text-[#1d1d1f]">
                No icons match that search.
              </p>
              <p className="max-w-sm text-[15px] leading-[1.3] font-medium tracking-[-0.03em] text-[#1d1d1f] opacity-80">
                Try another word, or request the motif you need.
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
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-4 text-[11px] tracking-[-0.01em] text-[#1d1d1f] opacity-45 lg:px-6">
          <span>odiaicons · open source under the MIT licence</span>
          <span>24 × 24 grid · 1.75px stroke</span>
        </footer>
      </div>

      <Sheet
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <SheetContent
          side="bottom"
          className="max-h-[88dvh] rounded-t-[24px] p-6 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <div
            aria-hidden
            className="absolute top-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#1d1d1f]/15"
          />
          <div className="mx-auto min-h-0 w-full max-w-3xl flex-1 overflow-y-auto overscroll-contain">
            {active && <IconPlayground def={active} />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

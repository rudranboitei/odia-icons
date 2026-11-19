"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconCheck,
  IconCopy,
  IconDownload,
  IconFileCode,
  IconSearch,
  IconTerminal2,
  IconX,
} from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { copyText } from "@/lib/clipboard"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { ShellCode } from "@/components/syntax-code"
import { ModeToggle } from "@/components/ui/mode-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
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

const browseItems = [
  { label: "Icons", href: "/icons", active: true },
  { label: "Installation", href: "/#install" },
  { label: "Developers", href: "/#developers" },
]

const resourceItems = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "Submit an icon", href: siteConfig.links.contribute },
  { label: "Licence", href: siteConfig.links.license },
]

const contributeRows = [
  {
    eyebrow: "Open source",
    title: "Submit an icon",
    href: siteConfig.links.contribute,
    image: "/contribute/glass-folder.jpeg",
  },
  {
    eyebrow: "GitHub",
    title: "Star the repository",
    href: siteConfig.links.github,
    image: "/contribute/github.jpeg",
  },
  {
    eyebrow: "Licence",
    title: "MIT, free to use",
    href: siteConfig.links.license,
    image: "/contribute/duna.jpeg",
  },
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
    <div className="min-h-dvh bg-background text-foreground">
      {/* Framed page: space on both sides + vertical hairlines */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[1600px] border-x border-border">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col px-6 py-6 lg:flex">
          <Link href="/" className="inline-flex w-fit items-center">
            <Image
              src="/brand/logo-wordmark-white.svg"
              alt={siteConfig.name}
              width={112}
              height={28}
              priority
              unoptimized
              className="h-7 w-auto invert dark:invert-0"
            />
          </Link>

          <nav className="mt-12" aria-label="Browse">
            <p className="text-[13px] text-muted-foreground">Browse</p>
            <ul className="mt-3 flex flex-col gap-3.5">
              {browseItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={
                      item.active
                        ? "inline-flex items-center gap-2 text-[14px] font-medium text-foreground"
                        : "text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    {item.label}
                    {item.active && (
                      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="mt-9" aria-label="Resources">
            <p className="text-[13px] text-muted-foreground">Resources</p>
            <ul className="mt-3 flex flex-col gap-3.5">
              {resourceItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <div className="h-px w-10 bg-border-strong" />
            <p className="mt-4 text-[14px] leading-[1.45] font-medium text-foreground">
              Open-source icons from Odisha, drawn on one shared grid.
            </p>
            <Button
              type="button"
              onClick={copyInstall}
              className="mt-4 h-9 px-4"
            >
              {copiedInstall ? "Copied" : "Copy install"}
              {copiedInstall ? (
                <IconCheck className="size-3.5" stroke={2.25} />
              ) : (
                <IconCopy className="size-3.5" stroke={2} />
              )}
            </Button>
            <p className="mt-4 text-[13px] leading-[1.5] text-muted-foreground">
              MIT licensed · v0.1.0
              <br />
              Made in Odisha, India.
            </p>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-border bg-background">
            <div className="flex h-16 items-center gap-4 px-5 lg:px-6">
              <Link href="/" className="shrink-0 lg:hidden">
                <Image
                  src="/brand/logo-wordmark-white.svg"
                  alt={siteConfig.name}
                  width={92}
                  height={23}
                  priority
                  unoptimized
                  className="h-[23px] w-auto invert dark:invert-0"
                />
              </Link>

              <div className="hidden min-w-0 items-baseline gap-3 lg:flex">
                <span className="text-[16px] font-medium">Icons</span>
                <span className="truncate text-[13px] text-muted-foreground">
                  Odia motifs drawn on a 24 × 24 grid.
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="relative w-full min-w-0 sm:w-64">
                  <IconSearch
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`Search ${icons.length} icons…`}
                    aria-label="Search icons"
                    className="h-9 w-full appearance-none rounded-full border border-border bg-card pr-14 pl-9 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-search-cancel-button]:hidden"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("")
                        searchRef.current?.focus()
                      }}
                      aria-label="Clear search"
                      className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <IconX className="size-3.5" />
                    </button>
                  ) : (
                    <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[10px] text-muted-foreground">
                      ⌘K
                    </kbd>
                  )}
                </div>

                <button
                  type="button"
                  onClick={copyInstall}
                  className="hidden h-9 items-center gap-2 rounded-full border bg-card px-3.5 font-mono text-[12px] whitespace-nowrap text-foreground/70 transition-colors hover:text-foreground xl:inline-flex"
                >
                  <IconTerminal2 className="size-3.5" stroke={1.75} />
                  <ShellCode command={siteConfig.install.command} />
                  {copiedInstall ? (
                    <IconCheck className="size-3.5" />
                  ) : (
                    <IconCopy className="size-3.5 opacity-50" />
                  )}
                </button>

                <ModeToggle />

                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border bg-card text-foreground/70 transition-colors hover:text-foreground"
                >
                  <IconBrandGithub className="size-4" stroke={1.75} />
                </a>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-3 px-5 pb-3 lg:px-6">
              <div className="flex min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categoryCounts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    aria-pressed={category === item.id}
                    className={
                      category === item.id
                        ? "shrink-0 rounded-full cursor-pointer bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background"
                        : "shrink-0 rounded-full bg-muted px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    {item.label}
                    <span className="ml-1.5 font-mono text-[10px] opacity-55">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
              <span className="ml-auto hidden shrink-0 text-[12px] text-muted-foreground sm:block">
                {filtered.length} icons
              </span>
            </div>
          </header>

          <main className="flex-1 px-5 py-5 lg:px-6">
            <h1 className="sr-only">Odiaicons icon set</h1>

            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered.map((icon) => (
                      <div key={icon.name} className="group relative">
                        <button
                          type="button"
                          onClick={() => setActive(icon)}
                          aria-label={`Open ${icon.name} icon`}
                          className="flex h-[156px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-sm border border-border px-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-border-strong hover:bg-muted/60 hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.18)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          <Icon
                            def={icon}
                            size={32}
                            stroke={1.75}
                            absoluteStrokeWidth
                            className="text-foreground"
                          />
                          <span className="max-w-full truncate font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                            {icon.name}
                          </span>
                        </button>

                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-2.5 bottom-2.5 flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <IconArrowUpRight className="size-3.5" stroke={2} />
                        </span>

                        <div className="absolute top-2 right-2 hidden gap-1 transition-opacity sm:flex sm:opacity-100 sm:[@media(hover:hover)]:opacity-0 sm:[@media(hover:hover)]:group-hover:opacity-100 sm:[@media(hover:hover)]:focus-within:opacity-100">
                          <button
                            type="button"
                            onClick={() => copy(toSvg(icon, { size: 24, stroke: 1.75 }), "SVG")}
                            aria-label={`Copy ${icon.name} SVG`}
                            className="flex size-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                          >
                            <IconCopy className="size-3" stroke={2} />
                          </button>
                          <button
                            type="button"
                            onClick={() => copy(toJsx(icon, { size: 24, stroke: 1.75 }), "JSX")}
                            aria-label={`Copy ${icon.name} JSX`}
                            className="flex size-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                          >
                            <IconFileCode className="size-3" stroke={2} />
                          </button>
                          <button
                            type="button"
                            onClick={() => download(icon)}
                            aria-label={`Download ${icon.name} SVG`}
                            className="flex size-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                          >
                            <IconDownload className="size-3" stroke={2} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-20 text-center">
                    <p className="text-[20px] leading-[1.4] font-medium text-foreground">
                      No icons match that search.
                    </p>
                    <p className="max-w-sm text-[14px] leading-[1.4] text-muted-foreground">
                      Try another word, or request the motif you need.
                    </p>
                    <a
                      href={siteConfig.links.contribute}
                      target="_blank"
                      rel="noopener"
                      className="mt-1 text-[14px] font-medium text-foreground underline underline-offset-4 hover:opacity-70"
                    >
                      Request an icon →
                    </a>
                  </div>
                )}
              </div>

              {/* Right panel */}
              <aside className="sticky top-33 hidden w-59 shrink-0 xl:block">
                <div className="rounded-sm bg-muted/30">
                  <div className="flex items-center justify-between px-4 pt-4 pb-3">
                    <p className="text-[13px] text-muted-foreground">Contribute</p>
                    <a
                      href={siteConfig.links.contribute}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full bg-background px-3 py-1.5 text-[12px] font-medium text-foreground/70 transition-colors hover:text-foreground"
                    >
                      Submit an icon
                    </a>
                  </div>

                  <ul className="flex flex-col gap-1 px-2 pb-2">
                    {contributeRows.map((row) => (
                      <li key={row.title}>
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-3 rounded-sm px-2 py-2 transition-colors hover:bg-background"
                        >
                          <span className="relative size-9 shrink-0 overflow-hidden bg-background">
                            <Image
                              src={row.image}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[12px] text-muted-foreground">
                              {row.eyebrow}
                            </span>
                            <span className="block truncate text-[13px] font-medium text-foreground">
                              {row.title}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-between border-t px-4 py-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    See all on GitHub
                    <IconArrowUpRight className="size-4" stroke={1.75} />
                  </a>
                </div>
              </aside>
            </div>
          </main>

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-4 text-[12px] text-muted-foreground lg:px-6">
            <span>odiaicons · open source under the MIT licence</span>
            <span>24 × 24 grid · 1.75px stroke</span>
          </footer>
        </div>
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-4xl">
          <DialogTitle className="sr-only">{active?.name ?? "Icon"}</DialogTitle>
          <DialogDescription className="sr-only">
            Customize size, stroke and color, then copy or download the icon.
          </DialogDescription>
          <div className="max-h-[90dvh] min-h-0 overflow-y-auto overscroll-contain p-5 md:p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {active && <IconPlayground def={active} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

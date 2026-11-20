"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
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
import { SITE } from "../data/site"
import { copyText } from "@/lib/clipboard"
// import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { ShikiCode } from "@/components/shiki-code"
// import { ModeToggle } from "@/components/ui/mode-toggle"
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

const EASE = [0.22, 1, 0.36, 1] as const

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
  { label: "GitHub", href: SITE.links.github },
  { label: "Submit an icon", href: SITE.links.contribute },
  { label: "Licence", href: SITE.links.license },
]

const contributeRows = [
  {
    eyebrow: "Open source",
    title: "Submit an icon",
    href: SITE.links.contribute,
    image: "/contribute/glass-folder.jpeg",
  },
  {
    eyebrow: "GitHub",
    title: "Star the repository",
    href: SITE.links.github,
    image: "/contribute/github.jpeg",
  },
  {
    eyebrow: "Licence",
    title: "MIT, free to use",
    href: SITE.links.license,
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

/** Cream keycap, same one as the landing hero. Presses down on click. */
function KeyTile({ def }: { def: IconDef }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -14, y: 16 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 15, mass: 0.9, delay: 0.15 }}
      whileHover={{ rotate: -4, scale: 1.04 }}
      whileTap={{ y: 5, scale: 0.97 }}
      className="relative grid size-14 shrink-0 cursor-pointer place-items-center rounded-2xl bg-gradient-to-b from-[#f7e8d4] to-[#e6c9a6] shadow-[0_6px_0_#b8946b,0_14px_26px_-6px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(255,255,255,0.65)] md:size-20 md:rounded-3xl md:shadow-[0_8px_0_#b8946b,0_18px_34px_-6px_rgba(0,0,0,0.55),inset_0_2px_0_rgba(255,255,255,0.65)]"
    >
      <div className="absolute inset-[5px] rounded-xl bg-gradient-to-b from-[#f3dec4] to-[#ecd2b0] shadow-[inset_0_2px_6px_rgba(120,80,40,0.25)] md:inset-[7px] md:rounded-[1.25rem]" />
      <Icon
        def={def}
        size={32}
        stroke={1.5}
        className="relative size-7 text-[#3b2a1a] md:size-10"
      />
    </motion.div>
  )
}

/** Compact version of the landing hero, shown above the grid. */
function PageHero({ count }: { count: number }) {
  const mark = icons.find((i) => i.name === "konark-wheel") ?? icons[0]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mb-5 overflow-hidden rounded-3xl border border-border px-6 py-8 md:px-10 md:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_15%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]"
      />
      <div className="relative flex flex-col gap-4">
        <h1 className="font-pixel flex flex-wrap items-center gap-3 text-4xl leading-none font-bold text-foreground md:gap-5 md:text-6xl">
          <span>Odia</span>
          <KeyTile def={mark} />
          <span>Icons</span>
        </h1>
        <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
          <span className="font-medium text-foreground">{count} icons</span> drawn on one
          24 × 24 grid. Click any icon to tune size, stroke and colour, then copy or
          download it.
        </p>
      </div>
    </motion.section>
  )
}

function IconCard({ icon, index, onOpen, onCopy, onDownload }: {
  icon: IconDef
  index: number
  onOpen: () => void
  onCopy: (value: string, label: string) => void
  onDownload: () => void
}) {
  const actionBtn =
    "flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "60px" }}
      transition={{ duration: 0.45, ease: EASE, delay: Math.min(index % 12, 11) * 0.025 }}
      className="group relative"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${icon.name} icon`}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="flex h-[164px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card/40 px-3 transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary/40 hover:bg-card hover:shadow-[0_18px_36px_-18px_color-mix(in_oklab,var(--primary)_35%,transparent)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        <Icon
          def={icon}
          size={34}
          stroke={1.75}
          absoluteStrokeWidth
          className="text-foreground transition-colors duration-200 group-hover:text-primary"
        />
        <span className="max-w-full truncate font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
          {icon.name}
        </span>
      </motion.button>

      <span
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-3 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
      >
        <IconArrowUpRight className="size-3.5" stroke={2} />
      </span>

      <div className="absolute top-2.5 right-2.5 hidden gap-1 transition-opacity sm:flex sm:opacity-100 sm:[@media(hover:hover)]:opacity-0 sm:[@media(hover:hover)]:group-hover:opacity-100 sm:[@media(hover:hover)]:focus-within:opacity-100">
        <button
          type="button"
          onClick={() => onCopy(toSvg(icon, { size: 24, stroke: 1.75 }), "SVG")}
          aria-label={`Copy ${icon.name} SVG`}
          className={actionBtn}
        >
          <IconCopy className="size-3" stroke={2} />
        </button>
        <button
          type="button"
          onClick={() => onCopy(toJsx(icon, { size: 24, stroke: 1.75 }), "JSX")}
          aria-label={`Copy ${icon.name} JSX`}
          className={actionBtn}
        >
          <IconFileCode className="size-3" stroke={2} />
        </button>
        <button
          type="button"
          onClick={onDownload}
          aria-label={`Download ${icon.name} SVG`}
          className={actionBtn}
        >
          <IconDownload className="size-3" stroke={2} />
        </button>
      </div>
    </motion.div>
  )
}

export function IconBrowser() {
  const [active, setActive] = useState<IconDef | null>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<"all" | IconCategory>("all")
  const [copiedInstall, setCopiedInstall] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()

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
    // toast.add({
    //   type: copied ? "success" : "error",
    //   title: copied ? `Copied ${label}` : "Could not copy",
    //   description: copied ? undefined : "Your browser blocked clipboard access.",
    //   timeout: 2000,
    // })
  }

  async function copyInstall() {
    const copied = await copyText(SITE.install.command)
    if (!copied) return
    setCopiedInstall(true)
    // toast.add({
    //   type: "success",
    //   title: "Install command copied",
    //   description: SITE.install.command,
    //   timeout: 2000,
    // })
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
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col px-6 py-6 lg:flex"
        >
          <Link href="/" className="inline-flex w-fit items-center">
            <Image
              src="/brand/logo-wordmark-white.svg"
              alt={SITE.name}
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
                      <motion.span
                        aria-hidden
                        animate={reduceMotion ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="size-1.5 rounded-full bg-primary"
                      />
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
            <div className="h-px w-10 bg-primary/50" />
            <p className="mt-4 text-[14px] leading-[1.45] font-medium text-foreground">
              Open-source icons from Odisha, drawn on one shared grid.
            </p>
            <motion.div
              className="mt-4 w-fit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="button"
                onClick={copyInstall}
                className="h-9 rounded-full px-4"
              >
                {copiedInstall ? "Copied" : "Copy install"}
                {copiedInstall ? (
                  <IconCheck className="size-3.5" stroke={2.25} />
                ) : (
                  <IconCopy className="size-3.5" stroke={2} />
                )}
              </Button>
            </motion.div>
            <p className="mt-4 text-[13px] leading-[1.5] text-muted-foreground">
              MIT licensed · v0.1.0
              <br />
              Made in Odisha, India.
            </p>
          </div>
        </motion.aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-5 lg:px-6">
              <Link href="/" className="shrink-0 lg:hidden">
                <Image
                  src="/brand/logo-wordmark-white.svg"
                  alt={SITE.name}
                  width={92}
                  height={23}
                  priority
                  unoptimized
                  className="h-[23px] w-auto invert dark:invert-0"
                />
              </Link>

              <div className="hidden min-w-0 items-baseline gap-3 lg:flex">
                <span className="font-pixel text-[18px] font-bold">Icons</span>
                <span className="truncate text-[13px] text-muted-foreground">
                  Odia motifs drawn on a 24 × 24 grid.
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="relative w-full min-w-0 sm:w-72">
                  <IconSearch
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`Search ${icons.length} icons…`}
                    aria-label="Search icons"
                    className="h-10 w-full appearance-none rounded-full border border-border bg-foreground/[0.04] pr-14 pl-10 text-[13px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:ring-[3px] focus-visible:ring-primary/25 [&::-webkit-search-cancel-button]:hidden"
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
                    <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      ⌘K
                    </kbd>
                  )}
                </div>

                <motion.button
                  type="button"
                  onClick={copyInstall}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden h-10 items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-4 font-mono text-[12px] whitespace-nowrap text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground xl:inline-flex"
                >
                  <IconTerminal2 className="size-3.5" stroke={1.75} />
                  <ShikiCode code={SITE.install.command} lang="bash" />
                  {copiedInstall ? (
                    <IconCheck className="size-3.5 text-primary" />
                  ) : (
                    <IconCopy className="size-3.5 opacity-50" />
                  )}
                </motion.button>

                {/* <ModeToggle /> */}

                <motion.a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-foreground/[0.04] text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <IconBrandGithub className="size-4" stroke={1.75} />
                </motion.a>
              </div>
            </div>

            {/* Category pills: the active pill slides between options */}
            <div className="flex items-center gap-3 px-5 pb-3 lg:px-6">
              <div className="flex min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categoryCounts.map((item) => {
                  const isActive = category === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={isActive}
                      className="relative shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="category-pill"
                          transition={{ type: "spring", stiffness: 500, damping: 36 }}
                          className="absolute inset-0 rounded-full bg-primary"
                        />
                      )}
                      {!isActive && (
                        <span className="absolute inset-0 rounded-full bg-muted" />
                      )}
                      <span
                        className={`relative transition-colors ${isActive
                          ? "font-medium text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {item.label}
                        <span className="ml-1.5 font-mono text-[10px] opacity-60">
                          {item.count}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <span className="ml-auto hidden shrink-0 text-[12px] text-muted-foreground sm:block">
                {filtered.length} icons
              </span>
            </div>
          </header>

          <main className="flex-1 px-5 py-5 lg:px-6">
            <PageHero count={icons.length} />

            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered.map((icon, index) => (
                      <IconCard
                        key={icon.name}
                        icon={icon}
                        index={index}
                        onOpen={() => setActive(icon)}
                        onCopy={copy}
                        onDownload={() => download(icon)}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border px-6 py-20 text-center"
                  >
                    <p className="font-pixel text-[24px] leading-[1.3] font-bold text-foreground">
                      No icons match that search.
                    </p>
                    <p className="max-w-sm text-[14px] leading-[1.4] text-muted-foreground">
                      Try another word, or request the motif you need.
                    </p>
                    <a
                      href={SITE.links.contribute}
                      target="_blank"
                      rel="noopener"
                      className="mt-1 text-[14px] font-medium text-primary underline underline-offset-4 hover:opacity-70"
                    >
                      Request an icon →
                    </a>
                  </motion.div>
                )}
              </div>

              {/* Right panel */}
              <motion.aside
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="sticky top-33 hidden w-59 shrink-0 xl:block"
              >
                <div className="rounded-3xl border border-border bg-card/40">
                  <div className="flex items-center justify-between px-4 pt-4 pb-3">
                    <p className="text-[13px] text-muted-foreground">Contribute</p>
                    <a
                      href={SITE.links.contribute}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
                    >
                      Submit an icon
                    </a>
                  </div>

                  <ul className="flex flex-col gap-1 px-2 pb-2">
                    {contributeRows.map((row) => (
                      <li key={row.title}>
                        <motion.a
                          href={row.href}
                          target="_blank"
                          rel="noopener"
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-foreground/[0.05]"
                        >
                          <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-background">
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
                        </motion.a>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-between border-t border-border px-4 py-3 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                  >
                    See all on GitHub
                    <IconArrowUpRight className="size-4" stroke={1.75} />
                  </a>
                </div>
              </motion.aside>
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
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-3xl border-border bg-background p-0 sm:max-w-4xl">
          <DialogTitle className="sr-only">{active?.name ?? "Icon"}</DialogTitle>
          <DialogDescription className="sr-only">
            Customize size, stroke and color, then copy or download the icon.
          </DialogDescription>
          <div className="max-h-[90dvh] min-h-0 overflow-y-auto overscroll-contain p-5 md:p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <IconPlayground def={active} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

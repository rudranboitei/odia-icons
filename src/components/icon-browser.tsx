"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  IconArrowUpRight,
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
import { Button } from "@/components/ui/button"
import { ShikiCode } from "@/components/shiki-code"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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

function IconCard({ icon, index, onOpen, onCopy, onDownload }: {
  icon: IconDef
  index: number
  onOpen: () => void
  onCopy: (value: string) => void
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
        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card/40 px-3 transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary/40 hover:bg-card hover:shadow-[0_18px_36px_-18px_color-mix(in_oklab,var(--primary)_35%,transparent)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        <Icon
          def={icon}
          size={30}
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
          onClick={() => onCopy(toSvg(icon, { size: 24, stroke: 1.75 }))}
          aria-label={`Copy ${icon.name} SVG`}
          className={actionBtn}
        >
          <IconCopy className="size-3" stroke={2} />
        </button>
        <button
          type="button"
          onClick={() => onCopy(toJsx(icon, { size: 24, stroke: 1.75 }))}
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
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)

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
        setSearchOpen(true)
        searchRef.current?.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Close the command results when clicking anywhere else on the page.
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!searchWrapRef.current?.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  async function copy(value: string) {
    await copyText(value)
  }

  async function copyInstall() {
    const copied = await copyText(SITE.install.command)
    if (!copied) return
    setCopiedInstall(true)
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
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="sticky top-0 hidden h-dvh w-[216px] shrink-0 flex-col px-5 py-5 lg:flex"
        >
          <Link href="/" className="inline-flex w-fit items-center">
            <Image
              src="/brand/logo-wordmark-white.svg"
              alt={SITE.name}
              width={112}
              height={28}
              priority
              unoptimized
              className="invert dark:invert-0"
            />
          </Link>

          <nav className="mt-10" aria-label="Browse">
            <p className="text-[13px] text-muted-foreground">Browse</p>
            <ul className="mt-3 flex flex-col gap-3">
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
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="size-1.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="mt-8" aria-label="Resources">
            <p className="text-[13px] text-muted-foreground">Resources</p>
            <ul className="mt-3 flex flex-col gap-3">
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
            <div className="flex h-14 items-center gap-4 px-5 lg:px-6">
              <Link href="/" className="shrink-0 lg:hidden">
                <Image
                  src="/brand/logo-wordmark-white.svg"
                  alt={SITE.name}
                  width={92}
                  height={23}
                  priority
                  unoptimized
                  className="invert dark:invert-0"
                />
              </Link>

              <div className="hidden min-w-0 items-baseline gap-3 lg:flex">
                <span className="font-sans text-[18px] font-bold">Icons</span>
                <span className="truncate text-[13px] text-muted-foreground">
                  Odia motifs drawn on a 24 × 24 grid.
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div ref={searchWrapRef} className="relative w-full min-w-0 sm:w-72">
                  <Command
                    shouldFilter={false}
                    className="relative overflow-visible rounded-full bg-transparent p-0"
                  >
                    <div className="relative">
                      <IconSearch
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        ref={searchRef}
                        type="search"
                        value={query}
                        onChange={(event) => {
                          setQuery(event.target.value)
                          setSearchOpen(true)
                        }}
                        onFocus={() => setSearchOpen(true)}
                        onKeyDown={(event) => {
                          if (event.key !== "Escape") return
                          event.preventDefault()
                          if (query) {
                            setQuery("")
                          } else {
                            setSearchOpen(false)
                            searchRef.current?.blur()
                          }
                        }}
                        placeholder={`Search ${icons.length} icons…`}
                        aria-label="Search icons"
                        role="combobox"
                        aria-expanded={searchOpen}
                        aria-controls={searchOpen ? "icon-search-results" : undefined}
                        aria-autocomplete="list"
                        className="h-10 w-full appearance-none rounded-full border border-border bg-foreground/[0.04] pr-14 pl-10 text-[13px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:ring-[3px] focus-visible:ring-primary/25 [&::-webkit-search-cancel-button]:hidden"
                      />
                      {query ? (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("")
                            setSearchOpen(true)
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

                    {searchOpen && (
                      <div
                        id="icon-search-results"
                        className="absolute top-full right-0 z-50 mt-2 w-[min(17rem,calc(100vw-4.5rem))] overflow-hidden rounded-2xl border border-border bg-popover p-1 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] sm:left-0 sm:w-auto"
                      >
                        <CommandList className="max-h-[320px] p-0">
                          {filtered.length > 0 ? (
                            <CommandGroup heading={query ? "Icons" : "All icons"}>
                              {filtered.map((icon) => (
                                <CommandItem
                                  key={icon.name}
                                  value={icon.name}
                                  onSelect={() => {
                                    setQuery(icon.name)
                                    setSearchOpen(false)
                                    setActive(icon)
                                  }}
                                  className="gap-2.5 px-2.5 py-2"
                                >
                                  <Icon def={icon} size={18} stroke={1.75} />
                                  <span className="truncate font-mono text-[13px] whitespace-nowrap">
                                    {icon.name}
                                  </span>
                                  <span className="ml-auto mr-1 text-[11px] whitespace-nowrap text-muted-foreground">
                                    {icon.category}
                                  </span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ) : (
                            <CommandEmpty className="py-8">
                              No icons match “{query}”.
                            </CommandEmpty>
                          )}
                        </CommandList>
                      </div>
                    )}
                  </Command>
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

                <motion.a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-foreground/[0.04] text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 -0.5 25 25"
                    className="size-4 fill-current"
                  >
                    <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                  </svg>
                </motion.a>
              </div>
            </div>

            {/* Category pills: the active pill slides between options */}
            <div className="flex items-center gap-3 px-5 pb-2 lg:px-6">
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

          <main className="flex-1 px-5 py-4 lg:px-6">
            <h1 className="sr-only">Icons</h1>
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                    <p className="font-sans text-[24px] leading-[1.3] font-bold text-foreground">
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
                initial={{ opacity: 0, x: 16 }}
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

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3 text-[12px] text-muted-foreground lg:px-6">
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

"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconCopy,
  IconDownload,
  IconFileCode,
  IconFilter,
  IconFolder,
  IconFolderOpen,
  IconLayoutGrid,
  IconPlus,
  IconScale,
  IconSearch,
  IconTerminal2,
  IconX,
} from "@tabler/icons-react"
import { SITE } from "../data/site"
import { copyText } from "@/lib/clipboard"
import { ShikiCode } from "@/components/shiki-code"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
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
import { btn, Corners, Kbd, MonoButton, Tag } from "./ui-bits"

const EASE = [0.22, 1, 0.36, 1] as const

// Reference palette: cool neutral greys + one orange accent.
const PAGE_BG = "bg-[#ececec]"
const PANEL_BG = "bg-[#f5f5f5]"
const SIDEBAR_BG = "bg-[#efefef]"
const HATCH =
  "repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 7px)"

const categoryCounts = [
  { id: "all" as const, label: "All", count: icons.length },
  ...[...new Set(icons.map((icon) => icon.category))].map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    count: icons.filter((icon) => icon.category === id).length,
  })),
]
const categoryList = categoryCounts.filter((c) => c.id !== "all")

const browseItems = [
  { label: "Icons", href: "/icons", icon: IconLayoutGrid, active: true },
  { label: "Installation", href: "/#install", icon: IconTerminal2 },
  { label: "Developers", href: "/#developers", icon: IconCode },
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

const sidebarStats = [
  { label: "Icons", value: String(icons.length) },
  { label: "Categories", value: String(categoryList.length) },
  { label: "Grid", value: "24×24" },
  { label: "Stroke", value: "1.75" },
]

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick focus", keys: ["/"] },
  { label: "Close", keys: ["Esc"] },
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

/** True when the right-hand playground column is visible (Tailwind `xl`). */
function useIsXl() {
  const [isXl, setIsXl] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)")
    const update = () => setIsXl(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isXl
}

function IconCard({ icon, index, selected, onOpen, onCopy, onDownload }: {
  icon: IconDef
  index: number
  selected: boolean
  onOpen: () => void
  onCopy: (value: string) => void
  onDownload: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "60px" }}
      transition={{ duration: 0.4, ease: EASE, delay: Math.min(index % 12, 11) * 0.02 }}
      className="group relative"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${icon.name} icon`}
        aria-pressed={selected}
        whileTap={{ scale: 0.98 }}
        className={`relative flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border px-3 transition-[background-color,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] focus-visible:outline-none ${selected
          ? "border-orange-600/50 bg-white"
          : "border-black/10 bg-white/70 hover:border-black/25 hover:bg-white"
          }`}
      >
        <span
          className={`transition-opacity ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <Corners className="m-2 size-2.5" />
        </span>
        <Icon
          def={icon}
          size={28}
          stroke={1.75}
          absoluteStrokeWidth
          className="text-neutral-800"
        />
        <span
          className={`max-w-full truncate text-[11px] transition-colors ${selected
            ? "text-orange-700"
            : "text-neutral-500 group-hover:text-neutral-900"
            }`}
        >
          {icon.name}
        </span>
      </motion.button>

      <div className="absolute top-2.5 right-2.5 hidden gap-1 sm:flex sm:[@media(hover:hover)]:opacity-0 sm:[@media(hover:hover)]:transition-opacity sm:[@media(hover:hover)]:group-hover:opacity-100 sm:[@media(hover:hover)]:focus-within:opacity-100">
        <MonoButton
          variant="outline"
          size="iconSm"
          onClick={() => onCopy(toSvg(icon, { size: 24, stroke: 1.75 }))}
          aria-label={`Copy ${icon.name} SVG`}
        >
          <IconCopy className="size-3" stroke={2} />
        </MonoButton>
        <MonoButton
          variant="outline"
          size="iconSm"
          onClick={() => onCopy(toJsx(icon, { size: 24, stroke: 1.75 }))}
          aria-label={`Copy ${icon.name} JSX`}
        >
          <IconFileCode className="size-3" stroke={2} />
        </MonoButton>
        <MonoButton
          variant="outline"
          size="iconSm"
          onClick={onDownload}
          aria-label={`Download ${icon.name} SVG`}
        >
          <IconDownload className="size-3" stroke={2} />
        </MonoButton>
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
  const [dialogQuery, setDialogQuery] = useState("")
  const isXl = useIsXl()

  const filtered = useMemo(
    () =>
      searchIcons(query).filter(
        (icon) => category === "all" || icon.category === category
      ),
    [query, category]
  )

  // The playground column always shows something: the picked icon, else the first result.
  const panelIcon = active ?? filtered[0] ?? null

  // Command dialog results, grouped by category.
  const dialogResults = useMemo(() => searchIcons(dialogQuery), [dialogQuery])
  const dialogGroups = useMemo(() => {
    const map = new Map<string, IconDef[]>()
    for (const icon of dialogResults) {
      const list = map.get(icon.category) ?? []
      list.push(icon)
      map.set(icon.category, list)
    }
    return [...map.entries()]
  }, [dialogResults])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable

      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setSearchOpen((open) => !open)
        return
      }
      if (event.key === "/" && !typing) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function closeSearch() {
    setSearchOpen(false)
    setDialogQuery("")
  }

  function openExternal(href: string) {
    closeSearch()
    window.open(href, "_blank", "noopener")
  }

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
    <div
      className={`min-h-dvh font-mono text-neutral-900 ${PAGE_BG}`}
      style={{ backgroundImage: HATCH }}
    >
      {/* Framed app: grey hatch on both sides + hairlines */}
      <div
        className={`mx-auto flex min-h-dvh w-full max-w-[1600px] border-x border-black/10 ${PANEL_BG}`}
      >
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col overflow-y-auto border-r border-black/10 px-3 py-4 [scrollbar-width:none] lg:flex [&::-webkit-scrollbar]:hidden ${SIDEBAR_BG}`}
        >
          <Link href="/" className="mb-4 inline-flex w-fit items-center px-2">
            {/* The cream wordmark is made for dark pages; brightness-0 turns it solid black */}
            <Image
              src="/brand/wordmark-cream.svg"
              alt={SITE.name}
              width={104}
              height={26}
              priority
              unoptimized
              className="brightness-0"
            />
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={btn("outline", "lg", "w-full text-neutral-900")}
          >
            New search
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </button>

          <nav className="mt-4" aria-label="Browse">
            <ul className="flex flex-col gap-0.5">
              {browseItems.map((item) => {
                const NavIcon = item.icon
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${item.active
                        ? "bg-black/[0.07] text-neutral-900"
                        : "text-neutral-600 hover:bg-black/[0.04] hover:text-neutral-900"
                        }`}
                    >
                      <span className="relative flex">
                        <NavIcon className="size-4" stroke={1.75} />
                        {item.active && (
                          <span
                            aria-hidden
                            className="absolute -top-1 -right-1 size-1.5 rounded-full bg-orange-600"
                          />
                        )}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="my-4 h-px bg-black/10" />

          {/* Categories, like the Portfolio folders in the reference */}
          <nav aria-label="Categories">
            <p className="px-2.5 text-[12px] text-neutral-400">Categories</p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {categoryCounts.map((item) => {
                const isActive = category === item.id
                const FolderIcon = isActive ? IconFolderOpen : IconFolder
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={isActive}
                      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/40 ${isActive
                        ? "bg-black/[0.07] text-neutral-900"
                        : "text-neutral-600 hover:bg-black/[0.04] hover:text-neutral-900"
                        }`}
                    >
                      <FolderIcon className="size-4 shrink-0" stroke={1.75} />
                      <span className="truncate">{item.label}</span>
                      <span
                        className={`ml-auto text-[11px] ${isActive ? "text-orange-600" : "text-neutral-400"}`}
                      >
                        {item.count}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="my-4 h-px bg-black/10" />

          <nav aria-label="Resources">
            <p className="px-2.5 text-[12px] text-neutral-400">Resources</p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {resourceItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-between rounded-md px-2.5 py-2 text-[13px] text-neutral-600 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                  >
                    {item.label}
                    <IconArrowUpRight className="size-3.5 opacity-50" stroke={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom: stats, install card, shortcuts */}
          <div className="mt-auto pt-6">
            <p className="px-2.5 text-[12px] text-neutral-400">Library</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {sidebarStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-black/10 bg-white/70 px-2.5 py-2"
                >
                  <p className="text-[10px] tracking-wide text-neutral-400 uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[15px] leading-none font-bold text-neutral-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-3 rounded-xl border border-black/10 bg-white p-3">
              <Corners className="m-1.5 size-2" />
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[11px] tracking-wide text-neutral-500 uppercase">
                  <IconTerminal2 className="size-3.5" stroke={1.75} />
                  Install
                </p>
                <Tag tone="orange">v0.1.0</Tag>
              </div>
              <div className="mt-2.5 rounded-md border border-black/10 bg-[#f5f5f5] px-2.5 py-2 text-[11px] leading-relaxed break-all text-neutral-800">
                <ShikiCode code={SITE.install.command} lang="bash" />
              </div>
              <MonoButton variant="solid" onClick={copyInstall} className="mt-2.5 w-full">
                {copiedInstall ? "Copied" : "Copy command"}
                {copiedInstall ? (
                  <IconCheck className="size-3.5" stroke={2.25} />
                ) : (
                  <IconCopy className="size-3.5" stroke={2} />
                )}
              </MonoButton>
              <a
                href={SITE.links.github}
                target="_blank"
                rel="noopener"
                className={btn("outline", "md", "mt-1.5 w-full")}
              >
                <IconBrandGithub className="size-3.5" stroke={1.75} />
                Star on GitHub
              </a>
            </div>

            <ul className="mt-3 flex flex-col gap-1.5 px-2.5">
              {shortcuts.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between text-[11px] text-neutral-500"
                >
                  {item.label}
                  <span className="flex gap-1">
                    {item.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 h-px bg-black/10" />
            <p className="mt-3 flex items-center gap-2 px-2.5 text-[11px] leading-[1.6] text-neutral-400">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-orange-600" />
              MIT licensed · Made in Odisha, India.
            </p>
          </div>
        </motion.aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f5f5f5]/85 backdrop-blur-xl">
            <div className="flex h-14 items-center gap-3 px-4 lg:px-5">
              <Link href="/" className="shrink-0 lg:hidden">
                <Image
                  src="/brand/wordmark-cream.svg"
                  alt={SITE.name}
                  width={88}
                  height={22}
                  priority
                  unoptimized
                  className="brightness-0"
                />
              </Link>

              <div className="hidden min-w-0 items-center gap-2.5 lg:flex">
                <IconLayoutGrid className="size-4 text-neutral-500" stroke={1.75} />
                <span className="text-[15px] tracking-wide uppercase">Icons</span>
                <Tag tone="orange">{filtered.length} shown</Tag>
              </div>

              <div className="ml-auto flex items-center gap-2">
                {/* Search trigger: opens the centered command dialog */}
                <div className="relative w-full min-w-0 sm:w-72">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search icons"
                    className="flex h-10 w-full cursor-pointer items-center gap-2 rounded-md border border-black/10 bg-white pr-20 pl-3 text-left text-[12px] tracking-wide uppercase outline-none transition-[border-color,box-shadow] hover:border-black/25 focus-visible:border-black/30 focus-visible:ring-[3px] focus-visible:ring-black/10"
                  >
                    <IconSearch className="size-4 shrink-0 text-neutral-400" />
                    <span
                      className={`truncate ${query ? "text-neutral-900" : "text-neutral-400"}`}
                    >
                      {query || `Search ${icons.length} icons`}
                    </span>
                  </button>
                  {query ? (
                    <MonoButton
                      variant="soft"
                      size="iconSm"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute top-1/2 right-1.5 -translate-y-1/2"
                    >
                      <IconX className="size-3.5" />
                    </MonoButton>
                  ) : (
                    <span className="pointer-events-none absolute top-1/2 right-2.5 flex -translate-y-1/2 gap-1">
                      <Kbd>⌘</Kbd>
                      <Kbd>K</Kbd>
                    </span>
                  )}
                </div>

                <MonoButton
                  variant="soft"
                  size="lg"
                  onClick={copyInstall}
                  className="hidden normal-case 2xl:inline-flex"
                >
                  <IconTerminal2 className="size-3.5" stroke={1.75} />
                  <ShikiCode code={SITE.install.command} lang="bash" />
                  {copiedInstall ? (
                    <IconCheck className="size-3.5 text-orange-600" />
                  ) : (
                    <IconCopy className="size-3.5 opacity-50" />
                  )}
                </MonoButton>

                <a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  className={btn("soft", "lg", "size-10 px-0")}
                >
                  <IconBrandGithub className="size-4" stroke={1.75} />
                </a>
              </div>
            </div>

            {/* Category tags (below lg; on lg+ they live in the sidebar) */}
            <div className="flex items-center gap-3 px-4 pb-2.5 lg:hidden">
              <div className="flex min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categoryCounts.map((item) => {
                  const isActive = category === item.id
                  return (
                    <MonoButton
                      key={item.id}
                      variant={isActive ? "accent" : "soft"}
                      size="sm"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={isActive}
                      className="h-7 text-[11px]"
                    >
                      {item.label}
                      <span className="opacity-60">{item.count}</span>
                    </MonoButton>
                  )
                })}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-4 lg:px-5">
            <h1 className="sr-only">Icons</h1>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {filtered.map((icon, index) => (
                  <IconCard
                    key={icon.name}
                    icon={icon}
                    index={index}
                    selected={isXl && panelIcon?.name === icon.name}
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
                className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-black/15 px-6 py-20 text-center"
              >
                <p className="text-[18px] leading-[1.3] font-bold text-neutral-900">
                  No icons match that search.
                </p>
                <p className="max-w-sm text-[13px] leading-[1.5] text-neutral-500">
                  Try another word, or request the motif you need.
                </p>
                <a
                  href={SITE.links.contribute}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 text-[13px] font-bold text-orange-600 underline decoration-orange-600/70 underline-offset-[3px] hover:opacity-70"
                >
                  Request an icon →
                </a>
              </motion.div>
            )}
          </main>

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 px-4 py-3 text-[11px] text-neutral-400 lg:px-5">
            <span>odiaicons · open source under the MIT licence</span>
            <span>24 × 24 grid · 1.75px stroke</span>
          </footer>
        </div>

        {/* Right column: playground + contribute, like the inbox column */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className={`sticky top-0 hidden h-dvh w-[340px] shrink-0 flex-col border-l border-black/10 xl:flex ${PANEL_BG}`}
        >
          <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-black/10 px-4">
            <IconCode className="size-4 text-neutral-500" stroke={1.75} />
            <span className="text-[15px] tracking-wide uppercase">Playground</span>
            {panelIcon && <Tag tone="orange">{panelIcon.category}</Tag>}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="wait" initial={false}>
              {panelIcon ? (
                <motion.div
                  key={panelIcon.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <IconPlayground def={panelIcon} />
                </motion.div>
              ) : (
                <div className="px-4 py-10 text-center text-[12px] text-neutral-500 uppercase">
                  Select an icon
                </div>
              )}
            </AnimatePresence>

            <div className="border-t border-black/10 px-4 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-neutral-400">Contribute</p>
                <a
                  href={SITE.links.contribute}
                  target="_blank"
                  rel="noopener"
                  className={btn("accent", "sm", "h-7 text-[11px]")}
                >
                  Submit an icon
                </a>
              </div>

              <ul className="mt-2 flex flex-col">
                {contributeRows.map((row) => (
                  <li key={row.title} className="border-t border-black/10 first:border-t-0">
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center gap-3 py-2.5"
                    >
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-white">
                        <Image
                          src={row.image}
                          alt=""
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] text-neutral-400 uppercase">
                          {row.eyebrow}
                        </span>
                        <span className="block truncate text-[13px] text-neutral-900 group-hover:text-orange-600">
                          {row.title}
                        </span>
                      </span>
                      <IconArrowUpRight
                        className="ml-auto size-4 shrink-0 text-neutral-400"
                        stroke={1.75}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Search: the default shadcn command dialog, centered */}
      <CommandDialog
        open={searchOpen}
        onOpenChange={(open) => {
          if (open) setSearchOpen(true)
          else closeSearch()
        }}
        title="Search icons"
        description="Search icons, jump to a category, or run an action."
        className="max-w-xl rounded-xl border-black/10 bg-[#f5f5f5] font-mono text-neutral-900"
      >
        <Command shouldFilter={false} className="bg-transparent font-mono">
          <CommandInput
            value={dialogQuery}
            onValueChange={setDialogQuery}
            placeholder="Type an icon, category or command..."
          />
          <CommandList className="max-h-[420px]">
            <CommandEmpty>No results found.</CommandEmpty>

            {dialogQuery.trim() && dialogResults.length > 0 && (
              <>
                <CommandGroup heading="Filter">
                  <CommandItem
                    value="apply-filter"
                    onSelect={() => {
                      setQuery(dialogQuery.trim())
                      setCategory("all")
                      closeSearch()
                    }}
                  >
                    <IconFilter />
                    <span>
                      Show {dialogResults.length} result
                      {dialogResults.length === 1 ? "" : "s"} in the grid
                    </span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {!dialogQuery.trim() && (
              <>
                <CommandGroup heading="Categories">
                  {categoryCounts.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`category-${item.id}`}
                      onSelect={() => {
                        setCategory(item.id)
                        setQuery("")
                        closeSearch()
                      }}
                    >
                      <IconFolder />
                      <span>{item.label}</span>
                      <CommandShortcut>{item.count}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem
                    value="action-copy-install"
                    onSelect={() => {
                      void copyInstall()
                      closeSearch()
                    }}
                  >
                    <IconTerminal2 />
                    <span>Copy install command</span>
                  </CommandItem>
                  <CommandItem
                    value="action-submit"
                    onSelect={() => openExternal(SITE.links.contribute)}
                  >
                    <IconPlus />
                    <span>Submit an icon</span>
                  </CommandItem>
                  <CommandItem
                    value="action-github"
                    onSelect={() => openExternal(SITE.links.github)}
                  >
                    <IconBrandGithub />
                    <span>Open GitHub</span>
                  </CommandItem>
                  <CommandItem
                    value="action-licence"
                    onSelect={() => openExternal(SITE.links.license)}
                  >
                    <IconScale />
                    <span>View licence</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {dialogGroups.map(([group, groupIcons], i) => (
              <div key={group}>
                {i > 0 && <CommandSeparator />}
                <CommandGroup
                  heading={group.charAt(0).toUpperCase() + group.slice(1)}
                >
                  {groupIcons.map((icon) => (
                    <CommandItem
                      key={icon.name}
                      value={`icon-${icon.name}`}
                      onSelect={() => {
                        setActive(icon)
                        closeSearch()
                      }}
                    >
                      <Icon def={icon} size={16} stroke={1.75} />
                      <span>{icon.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>

      {/* Below xl there's no right column, so the playground opens as a dialog */}
      <Dialog
        open={active !== null && !isXl}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-xl border-black/10 bg-[#f5f5f5] p-0 font-mono text-neutral-900 sm:max-w-md">
          <DialogTitle className="sr-only">{active?.name ?? "Icon"}</DialogTitle>
          <DialogDescription className="sr-only">
            Preview the icon, then copy or download it.
          </DialogDescription>
          <div className="max-h-[90dvh] min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

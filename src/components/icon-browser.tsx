"use client"

import { useEffect, useMemo, useState, type SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  Copy,
  Filter,
  Folder,
  FolderOpen,
  LayoutGrid,
  Menu,
  Plus,
  Scale,
  Search,
  Terminal,
  Close,
} from "@odiaui/icons-react"

function GithubIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function NpmIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M1 8h22v7H11v2H7v-2H1V8zm1 6h2v-4h1v4h2V9H2v5zm5 0h1v1h2V9H7v5zm3-4v3h1v-3h-1zm3 4h2v-4h1v4h1v-4h1v4h2V9h-7v5z" />
    </svg>
  )
}
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
  CATEGORY_ORDER,
  Icon,
  ICON_COUNT,
  icons,
  searchIcons,
  type IconCategory,
  type IconDef,
} from "@/lib/icons"
import { GitHubStarButton } from "./github-star-button"
import { IconPlayground } from "./icon-playground"
import { btn, Corners, Kbd, MonoButton, Tag } from "./ui-bits"

const EASE = [0.22, 1, 0.36, 1] as const

// Reference palette: cool neutral greys + one orange accent.
const PAGE_BG = "bg-[#141210]"
const PANEL_BG = "bg-[#1a1816]"
const SIDEBAR_BG = "bg-[#171513]"
const HATCH =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 7px)"

type CategoryFilter = "all" | IconCategory

const categoryCounts = [
  { id: "all" as const, label: "All", count: ICON_COUNT },
  ...CATEGORY_ORDER.flatMap((id) => {
    const count = icons.filter((icon) => icon.category === id).length
    if (count === 0) return []
    return [
      {
        id,
        label: id === "ui" ? "UI" : id.charAt(0).toUpperCase() + id.slice(1),
        count,
      },
    ]
  }),
]
const categoryList = categoryCounts.filter((c) => c.id !== "all")

const browseItems = [
  { label: "Icons", href: "/icons", icon: LayoutGrid, active: true },
  { label: "Installation", href: "/installation", icon: Terminal },
  { label: "Developers", href: "/#developers", icon: Code },
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
  { label: "Icons", value: String(ICON_COUNT) },
  { label: "Categories", value: String(categoryList.length) },
  { label: "Grid", value: "24×24" },
  { label: "Stroke", value: "2" },
]

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick focus", keys: ["/"] },
  { label: "Close", keys: ["Esc"] },
]

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

/**
 * Sidebar body, shared by the desktop rail and the mobile drawer.
 * `onClose` is only passed by the drawer.
 */
function SidebarContent({
  category,
  onCategory,
  copiedInstall,
  onCopyInstall,
  onClose,
}: {
  category: CategoryFilter
  onCategory: (id: CategoryFilter) => void
  copiedInstall: boolean
  onCopyInstall: () => void
  onClose?: () => void
}) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between px-2">
        <Link href="/" onClick={onClose} className="inline-flex w-fit items-center">
          <Image
            src="/brand/wordmark-cream.svg"
            alt={SITE.name}
            width={96}
            height={24}
            priority
            unoptimized
            className="h-6 w-auto"
          />
        </Link>
        {onClose && (
          <MonoButton variant="soft" size="icon" onClick={onClose} aria-label="Close menu">
            <Close className="size-4" strokeWidth={1.5} />
          </MonoButton>
        )}
      </div>



      <nav className="mt-3" aria-label="Browse">
        <ul className="flex flex-col gap-0.5">
          {browseItems.map((item) => {
            const NavIcon = item.icon
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] transition-colors lg:py-1.5 ${item.active
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                >
                  <span className="relative flex">
                    <NavIcon className="size-4" strokeWidth={1.5} />
                    {item.active && (
                      <span
                        aria-hidden
                        className="absolute -top-1 -right-1 size-1.5 rounded-full bg-white"
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

      <div className="my-3 h-px bg-black/10" />

      {/* Categories, like the Portfolio folders in the reference */}
      <nav aria-label="Categories">
        <p className="px-2 text-[11px] tracking-wide text-neutral-400 uppercase">Categories</p>
        <ul className="mt-1.5 flex flex-col gap-0.5">
          {categoryCounts.map((item) => {
            const isActive = category === item.id
            const FolderIcon = isActive ? FolderOpen : Folder
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onCategory(item.id)
                    onClose?.()
                  }}
                  aria-pressed={isActive}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/30 lg:py-1.5 ${isActive
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                >
                  <FolderIcon className="size-4 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{item.label}</span>
                  <span
                    className={`ml-auto text-[11px] ${isActive ? "text-white" : "text-neutral-400"}`}
                  >
                    {item.count}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="my-3 h-px bg-black/10" />

      {/* Bottom: stats, install card, shortcuts */}
      <div className="mt-auto pt-4">
        <p className="px-2 text-[11px] tracking-wide text-neutral-400 uppercase">Library</p>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {sidebarStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2"
            >
              <p className="text-[10px] tracking-wide text-neutral-400 uppercase">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[14px] leading-none font-bold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-2.5 rounded-md border border-white/10 bg-[#1f1d1a] p-3">
          <Corners className="m-1.5 size-2" />
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[11px] tracking-wide text-neutral-500 uppercase">
              <Terminal className="size-3.5" strokeWidth={1.5} />
              Install
            </p>
            <Tag tone="orange">v0.1.0</Tag>
          </div>
          <div className="mt-2 rounded-xl border border-white/10 bg-[#1a1816] px-2.5 py-2 text-[11px] leading-relaxed break-all text-neutral-200">
            <ShikiCode code={SITE.install.command} lang="bash" />
          </div>
          <MonoButton variant="solid" size="sm" onClick={onCopyInstall} className="mt-2 w-full">
            {copiedInstall ? "Copied" : "Copy command"}
            {copiedInstall ? (
              <Check className="size-3.5" strokeWidth={2.25} />
            ) : (
              <Copy className="size-3.5" strokeWidth={2} />
            )}
          </MonoButton>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noopener"
            className={btn("outline", "sm", "mt-1.5 w-full")}
          >
            <GithubIcon className="size-3.5" />
            Star on GitHub
          </a>
        </div>

        {/* Keyboard hints make no sense on touch devices */}
        <ul className="mt-2.5 flex flex-col gap-1 px-2 [@media(hover:none)]:hidden">
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

        <div className="mt-3 h-px bg-black/10" />
        <p className="mt-2.5 flex items-center gap-2 px-2 text-[11px] leading-[1.6] text-neutral-400">
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-white" />
          MIT licensed · Made in Odisha, India.
        </p>
      </div>
    </>
  )
}

function IconCard({ icon, index, selected, onOpen }: {
  icon: IconDef
  index: number
  selected: boolean
  onOpen: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "60px" }}
      transition={{ duration: 0.4, ease: EASE, delay: Math.min(index % 12, 11) * 0.02 }}
      className="group relative min-w-0"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${icon.name} icon`}
        aria-pressed={selected}
        whileTap={{ scale: 0.98 }}
        className={`relative flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border px-2 transition-[background-color,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1816] focus-visible:outline-none sm:h-28 sm:gap-3 sm:px-3 ${selected
          ? "border-white/30 bg-[#1f1d1a]"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
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
          stroke={2}
          absoluteStrokeWidth
          className="text-neutral-100"
        />
        <span
          className={`max-w-full truncate text-[11px] transition-colors ${selected
            ? "text-neutral-200"
            : "text-neutral-500 group-hover:text-white"
            }`}
        >
          {icon.name}
        </span>
      </motion.button>
    </motion.div>
  )
}

export function IconBrowser() {
  const [active, setActive] = useState<IconDef | null>(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryFilter>("all")
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
      if (event.key === "Escape") setMenuOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  function openSearch() {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  function closeSearch() {
    setSearchOpen(false)
    setDialogQuery("")
  }

  function openExternal(href: string) {
    closeSearch()
    window.open(href, "_blank", "noopener")
  }

  async function copyInstall() {
    const copied = await copyText(SITE.install.command)
    if (!copied) return
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 1600)
  }

  const sidebarProps = {
    category,
    onCategory: setCategory,
    copiedInstall,
    onCopyInstall: copyInstall,
  }

  return (
    <div
      className={`min-h-dvh overflow-x-clip  text-white ${PAGE_BG}`}
      style={{ backgroundImage: HATCH }}
    >
      {/* Framed app: grey hatch on both sides + hairlines */}
      <div
        className={`mx-auto flex min-h-dvh w-full border-x border-white/10 ${PANEL_BG}`}
      >
        {/* Sidebar (desktop) */}
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`sticky top-0 hidden h-dvh w-[240px] shrink-0 flex-col overflow-y-auto border-r border-white/10 px-2.5 py-3 [scrollbar-width:none] lg:flex [&::-webkit-scrollbar]:hidden ${SIDEBAR_BG}`}
        >
          <SidebarContent {...sidebarProps} />
        </motion.aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1a1816]/90 backdrop-blur-xl">
            <div className="flex h-14 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-5">
              {/* Mobile: menu button opens the drawer */}
              <MonoButton
                variant="soft"
                size="icon"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="size-10 lg:hidden"
              >
                <Menu className="size-4" strokeWidth={1.5} />
              </MonoButton>

              <div className="hidden min-w-0 items-center gap-2.5 lg:flex">
                <LayoutGrid className="size-4 text-neutral-500" strokeWidth={1.5} />
                <span className="text-[15px] font-medium text-white">Icons</span>
                <Tag tone="orange">{filtered.length} shown</Tag>
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-2 lg:ml-auto lg:flex-none">
                {/* Search trigger: opens the centered command dialog */}
                <div className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
                  <button
                    type="button"
                    onClick={openSearch}
                    aria-label="Search icons"
                    className={`flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/5 pl-4 text-left text-sm outline-none transition-[border-color,box-shadow,background-color] hover:border-white/20 hover:bg-white/[0.07] focus-visible:border-white/20 focus-visible:ring-[3px] focus-visible:ring-white/20 ${query ? "pr-11" : "pr-4 sm:pr-20"}`}
                  >
                    <Search className="size-4 shrink-0 text-neutral-400" />
                    <span
                      className={`truncate ${query ? "text-white" : "text-neutral-500"}`}
                    >
                      {query || `Search ${ICON_COUNT} icons...`}
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
                      <Close className="size-3.5" />
                    </MonoButton>
                  ) : (
                    <span className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 gap-1 sm:flex [@media(hover:none)]:hidden">
                      <Kbd>⌘</Kbd>
                      <Kbd>K</Kbd>
                    </span>
                  )}
                </div>

                <MonoButton
                  variant="soft"
                  size="lg"
                  onClick={copyInstall}
                  className="max-2xl:hidden normal-case"
                >
                  <Terminal className="size-3.5" strokeWidth={1.5} />
                  <ShikiCode code={SITE.install.command} lang="bash" />
                  {copiedInstall ? (
                    <Check className="size-3.5 text-white" />
                  ) : (
                    <Copy className="size-3.5 opacity-50" />
                  )}
                </MonoButton>

                <a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  className={btn("soft", "icon")}
                >
                  <GithubIcon className="size-4" />
                </a>
                <a
                  href={SITE.links.npm}
                  target="_blank"
                  rel="noopener"
                  aria-label="npm"
                  className={btn("soft", "icon")}
                >
                  <NpmIcon className="size-4" />
                </a>
              </div>
            </div>

            {/* Category chips (below lg; on lg+ they live in the sidebar) */}
            <div className="hidden items-center gap-2 px-3 pb-2.5 sm:flex sm:px-4 lg:hidden">
              <div className="-mx-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categoryCounts.map((item) => {
                  const isActive = category === item.id
                  return (
                    <MonoButton
                      key={item.id}
                      variant={isActive ? "accent" : "soft"}
                      size="sm"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={isActive}
                      className="h-8 text-[11px]"
                    >
                      {item.label}
                      <span className="opacity-60">{item.count}</span>
                    </MonoButton>
                  )
                })}
              </div>
              <Tag tone="orange" className="shrink-0">
                {filtered.length} shown
              </Tag>
            </div>
          </header>

          <main className="flex-1 px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
            <h1 className="sr-only">Icons</h1>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4 2xl:grid-cols-5">
                {filtered.map((icon, index) => (
                  <IconCard
                    key={icon.name}
                    icon={icon}
                    index={index}
                    selected={isXl && panelIcon?.name === icon.name}
                    onOpen={() => setActive(icon)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/15 px-5 py-16 text-center sm:px-6 sm:py-20"
              >
                <p className="text-[16px] leading-[1.3] font-bold text-white sm:text-[18px]">
                  No icons match that search.
                </p>
                <p className="max-w-sm text-[13px] leading-[1.5] text-neutral-500">
                  Try another word, or request the motif you need.
                </p>
                <a
                  href={SITE.links.contribute}
                  target="_blank"
                  rel="noopener"
                  className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold text-white underline decoration-white/50 underline-offset-[3px] hover:opacity-70"
                >
                  Request an icon
                  <ArrowRight aria-hidden className="size-3.5" />
                </a>
              </motion.div>
            )}
          </main>

          <footer className="flex flex-col gap-1 border-t border-white/10 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-[11px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between sm:px-4 lg:px-5">
            <span>odiaicons · open source under the MIT licence</span>
            <span>24 × 24 grid · 2px stroke</span>
          </footer>
        </div>

        {/* Right column: playground + contribute, like the inbox column */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className={`sticky top-0 hidden h-dvh w-[340px] shrink-0 flex-col border-l border-white/10 xl:flex ${PANEL_BG}`}
        >
          <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
            <Code className="size-4 text-neutral-500" strokeWidth={1.5} />
            <span className="text-[15px] font-medium text-white">Playground</span>
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

            <div className="border-t border-white/10 px-4 pt-4 pb-2">
              <p className="text-[12px] text-neutral-400">Contribute</p>

              <ul className="mt-2 flex flex-col">
                {contributeRows.map((row) => (
                  <li key={row.title} className="border-t border-white/10 first:border-t-0">
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center gap-3 py-2.5"
                    >
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-md bg-[#1f1d1a]">
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
                        <span className="block truncate text-[13px] text-white group-hover:text-white">
                          {row.title}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="ml-auto size-4 shrink-0 text-neutral-400"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Mobile drawer: the sidebar, slid in from the left */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`absolute inset-y-0 left-0 flex w-[min(86vw,320px)] flex-col overflow-y-auto overscroll-contain border-r border-white/10 px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]  text-white shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${SIDEBAR_BG}`}
            >
              <SidebarContent {...sidebarProps} onClose={() => setMenuOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Search: the default shadcn command dialog, centered (top-aligned on phones for the keyboard) */}
      <CommandDialog
        open={searchOpen}
        onOpenChange={(open) => {
          if (open) setSearchOpen(true)
          else closeSearch()
        }}
        title="Search icons"
        description="Search icons, jump to a category, or run an action."
        className="w-[calc(100%-1.5rem)] max-w-xl rounded-2xl border-white/10 bg-[#1a1816] text-white max-sm:top-[6%] max-sm:translate-y-0 [--background:#1a1816] [--foreground:#ffffff] [--popover:#1a1816] [--popover-foreground:#ffffff] [--muted:#2a2724] [--muted-foreground:#a3a3a3] [--input:#2a2724] [--border:rgba(255,255,255,0.1)]"
      >
        <Command shouldFilter={false} className="bg-transparent text-white [&_[cmdk-group-heading]]:text-neutral-500 [&_[cmdk-item]]:text-neutral-200 [&_[cmdk-item]_svg]:text-neutral-400">
          {/* text-base on phones stops iOS from zooming the page on focus */}
          <CommandInput
            value={dialogQuery}
            onValueChange={setDialogQuery}
            placeholder="Type an icon, category or command..."
            className="text-base sm:text-sm"
          />
          <CommandList className="max-h-[min(420px,60dvh)]">
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
                    className="py-2.5 sm:py-1.5"
                  >
                    <Filter />
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
                      className="py-2.5 sm:py-1.5"
                    >
                      <Folder />
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
                    className="py-2.5 sm:py-1.5"
                  >
                    <Terminal />
                    <span>Copy install command</span>
                  </CommandItem>
                  <CommandItem
                    value="action-submit"
                    onSelect={() => openExternal(SITE.links.contribute)}
                    className="py-2.5 sm:py-1.5"
                  >
                    <Plus />
                    <span>Submit an icon</span>
                  </CommandItem>
                  <CommandItem
                    value="action-github"
                    onSelect={() => openExternal(SITE.links.github)}
                    className="py-2.5 sm:py-1.5"
                  >
                    <GithubIcon />
                    <span>Open GitHub</span>
                  </CommandItem>
                  <CommandItem
                    value="action-licence"
                    onSelect={() => openExternal(SITE.links.license)}
                    className="py-2.5 sm:py-1.5"
                  >
                    <Scale />
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
                      className="py-2.5 sm:py-1.5"
                    >
                      <Icon def={icon} size={16} stroke={2} />
                      <span className="truncate">{icon.name}</span>
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
        <DialogContent className="max-h-[88dvh] w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-2xl border-white/10 bg-[#1a1816] p-0 text-white sm:max-w-md">
          <DialogTitle className="sr-only">{active?.name ?? "Icon"}</DialogTitle>
          <DialogDescription className="sr-only">
            Preview the icon, then copy or download it.
          </DialogDescription>
          <div className="max-h-[88dvh] min-h-0 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

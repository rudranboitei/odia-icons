"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"

import { SITE } from "@/data/site"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/** Section ids must match the landing page: #install, #features, #developers, #faq */
const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Install", href: "/#install" },
  { label: "Developers", href: "/#developers" },
  { label: "FAQ", href: "/#faq" },
]

const SECTION_IDS = LINKS.map((l) => l.href.split("#")[1])

/* ------------------------------------------------------------------ */
/* Small pieces                                                       */
/* ------------------------------------------------------------------ */

/** Same primary button as the hero: glass ring, cream gradient, dark arrow disc. Hidden on phones (<640px). */
function PrimaryCta({ href }: { href: string }) {
  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }} className="hidden sm:block">
      <Link
        href={href}
        className="group inline-flex rounded-full bg-white/10 p-0.5 ring-1 ring-white/20 focus-visible:ring-2 focus-visible:ring-[#f6dfc4] focus-visible:outline-none"
      >
        <span className="flex h-9 items-center gap-2.5 rounded-full bg-gradient-to-b from-[#fbeedb] to-[#e8c89f] pr-[3px] pl-5 text-[15px] font-medium whitespace-nowrap text-[#2a1a10] shadow-[0_6px_18px_-6px_rgba(240,168,116,0.55),inset_0_1px_0_rgba(255,255,255,0.7)] md:h-10">
          Get started
          <span className="grid size-[30px] place-items-center rounded-full bg-[#1a1a1a] text-[#f6dfc4] transition-transform duration-300 group-hover:translate-x-0.5 md:size-8">
            <ArrowRight aria-hidden className="size-3.5" />
          </span>
        </span>
      </Link>
    </motion.div>
  )
}

/** Highlights the section currently in view (landing page only). */
function useActiveSection(enabled: boolean) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    )
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id)
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    els.forEach((el) => io.observe(el))

    const onTop = () => window.scrollY < 120 && setActiveId(null)
    window.addEventListener("scroll", onTop, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onTop)
    }
  }, [enabled])

  return enabled ? activeId : null
}

/* ------------------------------------------------------------------ */
/* Navbar                                                             */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const pathname = usePathname()
  const reduce = useReducedMotion() ?? false
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const activeId = useActiveSection(pathname === "/")
  const activeHref = activeId ? `/#${activeId}` : null
  const pillTarget = hovered ?? activeHref

  // Scroll progress line along the bottom of the pill
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <motion.header
      initial={reduce ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 top-[var(--notice-h,0px)] z-[90] px-3 pt-3 sm:pt-4"
    >
      {/* Width wrapper so the mobile panel always matches the pill */}
      <div
        className={cn(
          "relative mx-auto w-full transition-[max-width] duration-500 ease-out",
          scrolled ? "max-w-[680px]" : "max-w-[760px]"
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "pointer-events-auto relative w-full overflow-hidden rounded-full text-white ring-1 ring-white/10 transition-[background-color,box-shadow] duration-500 ease-out",
            scrolled || open
              ? "bg-[#141210]/90 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              : "bg-[#141210] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-2 px-2 transition-[height] duration-500 md:grid md:grid-cols-[1fr_auto_1fr]",
              scrolled ? "h-[52px] sm:h-14" : "h-14 sm:h-16"
            )}
          >
            {/* Logo: keycap on mobile, wordmark on md+ */}
            <Link
              href="/"
              aria-label={`${SITE.name} home`}
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center justify-self-start rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none md:pl-4"
            >
              <Image
                src="/brand/wordmark-cream.svg"
                alt={SITE.name}
                width={112}
                height={28}
                priority
                unoptimized
                className="hidden h-6 w-auto object-contain object-left md:block"
              />
              <Image
                src="/brand/wordmark-cream.svg"
                alt=""
                aria-hidden
                width={112}
                height={28}
                className="h-5 w-auto md:hidden"
              />
            </Link>

            {/* Centre links (md+) with sliding pill */}
            <div
              className="hidden items-center gap-0.5 md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {LINKS.map((l) => {
                const isPill = pillTarget === l.href
                const isActive = activeHref === l.href
                return (
                  <span
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    onBlur={() => setHovered(null)}
                  >
                    {isPill && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-white/12"
                      />
                    )}
                    <Link
                      href={l.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-3.5 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
                        isActive || hovered === l.href ? "text-white" : "text-white/65"
                      )}
                    >
                      {l.label}
                    </Link>
                  </span>
                )
              })}
            </div>

            {/* Right: CTA + mobile menu button */}
            <div className="flex items-center justify-end gap-1 justify-self-end">
              <PrimaryCta href="/icons" />

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
                className="grid size-10 shrink-0 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none md:hidden"
              >
                {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
              </button>
            </div>
          </div>

          {/* Scroll progress line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-6 bottom-0 h-px origin-left bg-gradient-to-r from-white/0 via-white/70 to-white"
          />
        </nav>

        {/* Mobile menu panel (no extra dependency) */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              key="mobile-nav"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pointer-events-auto absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-3xl bg-[#141210]/95 p-2 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {LINKS.map((l, i) => {
                  const isActive = activeHref === l.href
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-lg font-medium tracking-[-0.01em] transition-colors hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-[#f6dfc4]/60 focus-visible:outline-none",
                          isActive ? "bg-white/8 text-white" : "text-white/70"
                        )}
                      >
                        <span className="w-6 font-mono text-xs text-[#f6dfc4]/60 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 group-hover:text-white">{l.label}</span>
                        <ArrowRight
                          aria-hidden
                          className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70"
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

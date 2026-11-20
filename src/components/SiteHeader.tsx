"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { ArrowUpRight, Menu } from "lucide-react"
import { motion, useScroll, useSpring } from "motion/react"

import { Button } from "@/components/ui/button"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
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

/** Konark wheel (self-contained SVG). */
function Wheel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3v7M12 14v7M3 12h7M14 12h7M5.6 5.6l4.9 4.9M13.5 13.5l4.9 4.9M18.4 5.6l-4.9 4.9M10.5 13.5l-4.9 4.9" />
    </svg>
  )
}

/** Small cream keycap logo for mobile. */
function KeyLogo() {
  return (
    <motion.span
      whileHover={{ rotate: -6 }}
      whileTap={{ scale: 0.94 }}
      className="relative grid size-10 place-items-center rounded-full bg-gradient-to-b from-[#f7e8d4] to-[#e6c9a6] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_8px_rgba(0,0,0,0.4)] md:hidden"
    >
      <Wheel className="size-5 text-[#3b2a1a]" />
    </motion.span>
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
  const [scrolled, setScrolled] = useState(false)
  const [_open, _setOpen] = useState(false)
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

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 top-[var(--notice-h,0px)] z-[90] px-3 pt-3 sm:pt-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-auto relative mx-auto w-full overflow-hidden rounded-full text-white ring-1 ring-white/10 transition-[max-width,background-color,box-shadow] duration-500 ease-out",
          scrolled
            ? "max-w-[680px] bg-[#141414]/85 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "max-w-[760px] bg-[#141414] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
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
            className="flex shrink-0 items-center justify-self-start rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none md:pl-4"
          >
            <Image
              src="/brand/logo-wordmark-white.svg"
              alt={SITE.name}
              width={112}
              height={28}
              priority
              unoptimized
              className="hidden h-6 w-auto object-contain object-left md:block"
            />
            <KeyLogo />
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

          {/* Right: CTA + mobile menu */}
          <div className="flex items-center justify-end gap-1.5 justify-self-end">
            <motion.div whileTap={{ scale: 0.96 }}>
              <Button
                asChild
                className="h-10 rounded-full  px-4 text-[15px] font-medium text-[#141414]  sm:px-5 md:h-11"
              >
                <Link href="/#install">
                  <span className="hidden sm:inline">Get started</span>
                  <span className="sm:hidden">Install</span>
                </Link>
              </Button>
            </motion.div>

            {/* Mobile menu: shadcn Sheet */}
            {/* <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="size-10 shrink-0 rounded-full text-white hover:bg-white/10 hover:text-white md:hidden"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="z-[100] flex w-[88vw] max-w-sm flex-col gap-0 overflow-hidden border-l p-0"
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, ease: "linear", repeat: Infinity }}
                  className="pointer-events-none absolute -right-24 -bottom-24 text-foreground/[0.06]"
                >
                  <Wheel className="size-[22rem]" />
                </motion.div>

                <SheetHeader className="relative border-b px-6 py-5">
                  <SheetTitle className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-full bg-gradient-to-b from-[#f7e8d4] to-[#e6c9a6]">
                      <Wheel className="size-4 text-[#3b2a1a]" />
                    </span>
                    {SITE.name}
                  </SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </SheetHeader>

                <nav
                  aria-label="Mobile"
                  className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
                >
                  {LINKS.map((l, i) => {
                    const isActive = activeHref === l.href
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                        transition={{ duration: 0.4, ease: EASE, delay: open ? 0.08 + i * 0.06 : 0 }}
                      >
                        <SheetClose asChild>
                          <Link
                            href={l.href}
                            aria-current={isActive ? "location" : undefined}
                            className={cn(
                              "group flex items-center gap-4 rounded-full px-5 py-3.5 text-xl font-medium tracking-[-0.02em] transition-colors hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
                              isActive ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground"
                            )}
                          >
                            <span className="w-6 font-mono text-xs tabular-nums text-muted-foreground/70">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 group-hover:text-foreground">{l.label}</span>
                            <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        </SheetClose>
                      </motion.div>
                    )
                  })}
                </nav>

                <div className="relative flex flex-col gap-2.5 border-t px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="h-12 rounded-full text-base font-medium">
                      <Link href="/#install">Get started</Link>
                    </Button>
                  </SheetClose>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-full text-base font-medium"
                  >
                    <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>

        {/* Scroll progress line */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-6 bottom-0 h-px origin-left bg-gradient-to-r from-white/0 via-white/70 to-white"
        />
      </nav>
    </motion.header>
  )
}

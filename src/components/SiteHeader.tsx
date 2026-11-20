"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useSpring } from "motion/react"

import { Button } from "@/components/ui/button"
import { SITE } from "@/data/site"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/* Small pieces                                                       */
/* ------------------------------------------------------------------ */

/** Konark wheel (self-contained SVG), used by the mobile logo key. */
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

/** Mobile logo: the cream keycap with the Konark wheel. */
function KeyLogo() {
  return (
    <motion.span
      whileHover={{ rotate: -6 }}
      whileTap={{ y: 2, scale: 0.96 }}
      className="relative grid size-9 place-items-center rounded-[10px] bg-gradient-to-b from-[#f7e8d4] to-[#e6c9a6] shadow-[0_3px_0_#b8946b,0_8px_14px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.65)] md:hidden"
    >
      <span className="absolute inset-[3px] rounded-[7px] bg-gradient-to-b from-[#f3dec4] to-[#ecd2b0] shadow-[inset_0_1px_3px_rgba(120,80,40,0.25)]" />
      <Wheel className="relative size-5 text-[#3b2a1a]" />
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/* Navbar: logo + one link to the icon browser                        */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Scroll progress line
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  // Morph into a floating capsule after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 top-[var(--notice-h,0px)] z-[90]"
    >
      {/* Fade behind the bar at the top of the page */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background/95 via-background/55 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      />

      <div
        className={cn(
          "relative transition-[padding] duration-500",
          scrolled ? "px-3 pt-2 sm:px-4 sm:pt-3" : "px-0 pt-0"
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "pointer-events-auto relative mx-auto w-full overflow-hidden border transition-[max-width,background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-500 ease-out",
            scrolled
              ? "max-w-[1120px] rounded-full border-border bg-background/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "max-w-[1440px] rounded-none border-transparent border-b-transparent bg-transparent backdrop-blur-0"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-3 px-4 transition-[height,padding] duration-500 sm:px-6",
              scrolled ? "h-14 lg:px-6" : "h-[62px] sm:px-8 lg:h-20"
            )}
          >
            {/* Logo: wordmark on md+, keycap on mobile */}
            <Link
              href="/"
              aria-label={`${SITE.name} home`}
              className="group flex shrink-0 items-center rounded-full focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <Image
                src="/brand/logo-wordmark-white.svg"
                alt={SITE.name}
                width={112}
                height={28}
                priority
                unoptimized
                className="hidden h-7 w-28 object-contain object-left invert md:block dark:invert-0"
              />
              <KeyLogo />
            </Link>

            {/* The one action: open the icon browser */}
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                className="h-10 rounded-full px-4 text-[15px] font-medium sm:px-5 lg:h-11"
              >
                <Link href="/icons">
                  <span className="hidden sm:inline">Browse icons</span>
                  <span className="sm:hidden">Icons</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Scroll progress line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-primary/0 via-primary to-primary"
          />
        </nav>
      </div>
    </motion.header>
  )
}

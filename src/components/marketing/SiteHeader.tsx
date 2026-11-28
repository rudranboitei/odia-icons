"use client";

import { useEffect, useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Close, Menu } from "@odiaui/icons-react";

function NpmIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M1 8h22v7H11v2H7v-2H1V8zm1 6h2v-4h1v4h2V9H2v5zm5 0h1v1h2V9H7v5zm3-4v3h1v-3h-1zm3 4h2v-4h1v4h1v-4h1v4h2V9h-7v5z" />
    </svg>
  );
}

import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Top of page: transparent (blends into the hero). After scroll: pill. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes the mobile menu */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3.5 md:top-[15px] md:px-4">
      {/* Width: wide at the top, narrower pill after scroll (desktop) */}
      <div
        className={cn(
          "relative w-full max-w-xl transition-[max-width] duration-500 ease-out",
          scrolled ? "md:max-w-[832px]" : "md:max-w-5xl",
        )}
      >
        {/* Bar: SAME height in every state */}
        <div
          className={cn(
            "pointer-events-auto flex h-16 items-center justify-between rounded-full transition-all duration-300 md:h-[70px]",
            /* mobile: always a glass pill */
            " pr-2 pl-5 ring-1 ring-white/15 bg-black/30 backdrop-blur-xl",
            open && "",
            /* desktop: transparent at top, pill after scroll */
            scrolled
              ? " md:pr-2 md:pl-6 md:bg-[#1b1b1b]/90 md:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] md:ring-white/10"
              : "md:bg-transparent md:px-0 md:shadow-none md:ring-transparent md:backdrop-blur-none",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="odiaicons home"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center rounded-full focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:outline-none"
          >
            <Image
              src="/brand/wordmark-cream.svg"
              alt="odiaicons"
              width={120}
              height={28}
              priority
              className="h-6 w-auto md:h-7"
            />
          </Link>

          {/* Desktop actions */}
          <div className="hidden items-center gap-1 md:flex">
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              <Image src="/github.svg" alt="" width={20} height={20} className="size-5 invert" />
            </a>
            <a
              href={SITE.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="npm"
              className="inline-flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              <NpmIcon className="size-5" />
            </a>
            <Link
              href="/installation"
              className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              Install
            </Link>
            <Button
              asChild
              className="ml-1 h-10 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200"
            >
              <Link href="/icons">
                Browse icons
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none md:hidden"
          >
            {open ? <Close aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>

        {/* Mobile dropdown (no sidebar) */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto absolute inset-x-0 top-full mt-2.5 origin-top rounded-[28px] bg-[#1b1b1b]/95 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                <Link
                  href="/installation"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Install
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Image src="/github.svg" alt="" width={20} height={20} className="size-5 invert" />
                  </a>
                  <a
                    href={SITE.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="npm"
                    className="inline-flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <NpmIcon className="size-5" />
                  </a>
                </div>
                <Button
                  asChild
                  className="h-12 w-full rounded-full bg-white text-sm font-medium text-black hover:bg-neutral-200"
                >
                  <Link href="/icons" onClick={() => setOpen(false)}>
                    Browse all icons
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

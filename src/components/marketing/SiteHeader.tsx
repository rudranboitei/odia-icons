"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

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
            " pr-2 pl-5 ring-1 ring-white/50 backdrop-blur-xl",
            open && "",
            /* desktop: transparent at top, pill after scroll */
            scrolled
              ? " md:pr-2 md:pl-6 md:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)] md:ring-black/5"
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
              src="/brand/wordmark-dark.svg"
              alt="odiaicons"
              width={120}
              height={28}
              priority
              className="h-6 w-auto md:h-7"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-base text-neutral-900 transition-colors hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Button
            asChild
            className="hidden h-[54px] rounded-full bg-neutral-950 px-6 text-base font-medium text-white hover:bg-neutral-800 md:inline-flex"
          >
            <Link href="/icons">
              Browse icons
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-12 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:outline-none md:hidden"
          >
            {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
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
              className="pointer-events-auto absolute inset-x-0 top-full mt-2.5 origin-top rounded-[28px] bg-white/60 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-white/50 backdrop-blur-2xl md:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-1 py-2">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-full px-4 py-3 text-center text-base text-neutral-900 transition-colors hover:bg-white/70 active:bg-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Button
                asChild
                className="mt-2 h-14 w-full rounded-full bg-neutral-950 text-base font-medium text-white hover:bg-neutral-800"
              >
                <Link href="/icons" onClick={() => setOpen(false)}>
                  Browse icons
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

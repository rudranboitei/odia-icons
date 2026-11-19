"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IconArrowUpRight, IconMenu2, IconX } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteNav() {
  const { name, nav, links } = siteConfig
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-wordmark.svg"
            alt={name}
            width={104}
            height={26}
            priority
            unoptimized
            className="h-[26px] w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[15px] font-medium tracking-[-0.03em] text-[#1d1d1f]/60 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noopener"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "hidden h-10 rounded-full px-4 text-[15px] sm:inline-flex"
            )}
          >
            GitHub
            <IconArrowUpRight data-icon="inline-end" />
          </a>
          <Link
            href={links.icons}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 rounded-full px-4 text-[15px]"
            )}
          >
            Get the icons
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              "md:hidden"
            )}
          >
            {open ? <IconX /> : <IconMenu2 />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3" aria-label="Mobile">
            {nav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-[15px] font-medium tracking-[-0.03em] text-[#1d1d1f]/60 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={links.github}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="rounded-xl px-2 py-3 text-[15px] font-medium tracking-[-0.03em] text-[#1d1d1f]/60 transition-colors hover:bg-muted hover:text-[#1d1d1f]"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

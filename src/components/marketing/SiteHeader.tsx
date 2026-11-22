import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

/* Edit these to match your sections */
const NAV = [
  { label: "Icons", href: "/icons" },
  { label: "Why odiaicons", href: "#why" },
  { label: "Install", href: "#install" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-2 z-50 flex justify-center px-2 sm:top-4 sm:px-4">
      <div className="pointer-events-auto flex h-12 w-full max-w-3xl items-center justify-between gap-2 rounded-full bg-white/75 py-1.5 pr-1.5 pl-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5 backdrop-blur-xl sm:h-14 sm:pl-5">
        {/* Logo */}
        <Link
          href="/"
          aria-label="odiaicons home"
          className="flex shrink-0 items-center rounded-full focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:outline-none"
        >
          <Image
            src="/brand/wordmark-dark.svg"
            alt="odiaicons"
            width={120}
            height={28}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        {/* Nav (tablet and up) */}
        <nav aria-label="Main" className="hidden items-center md:flex">
          {NAV.map((item) => (
            <Button
              key={item.label}
              asChild
              variant="ghost"
              className="h-9 rounded-full px-3 text-sm font-normal text-neutral-900 hover:bg-black/5"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Actions (all screens) */}
        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            asChild
            variant="secondary"
            className="size-9 rounded-full bg-white p-0 shadow-sm hover:bg-white/90 sm:size-11"
          >
            <Link
              href={SITE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="odiaicons on GitHub"
            >
              <Image
                src="/github.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
            </Link>
          </Button>

          <Button
            asChild
            className="h-9 rounded-full bg-black px-3.5 text-sm font-normal text-white hover:bg-neutral-800 sm:h-11 sm:px-5"
          >
            <Link href="/icons">
              Browse<span className="hidden sm:inline">&nbsp;icons</span>
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

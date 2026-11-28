"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Close, Menu } from "@odiaui/icons-react";

function GithubIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/rudranboitei/odia-icons";

/* Edit the links here. Each href needs a matching id on its section. */
const NAV = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#steps" },
  { label: "Playground", href: "#playground" },
  { label: "FAQ", href: "#faq" },
];

function GithubLink({ className }: { className?: string }) {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub repository"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30",
        className
      )}
    >
      <GithubIcon className="size-5" />
    </a>
  );
}

export function Header() {
  const { name } = SITE;
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll, close on Escape, and move focus to the close button while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-white/10 bg-[#141210]/90 backdrop-blur-md"
    >
      {/* Mobile: logo left, menu right. Desktop: one centred group. */}
      <div className="mx-auto flex h-14 w-full max-w-[1080px] items-center justify-between px-4 sm:px-6 md:justify-center md:gap-10">
        <Link
          href="#top"
          aria-label={`${name} home`}
          className="inline-flex items-center hover:opacity-80"
        >
          <Image
            src="/brand/wordmark-cream.svg"
            alt={name}
            width={112}
            height={28}
            priority
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-400 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <GithubLink className="hidden md:inline-flex" />

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 md:hidden"
        >
          <Menu aria-hidden className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* Full-screen mobile menu (no animation) */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141210] md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col items-center gap-1">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-[clamp(2rem,9vw,2.75rem)] leading-tight font-medium tracking-tight text-white outline-none hover:text-neutral-400 focus-visible:text-neutral-400"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <GithubLink className="mt-6" />

          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute bottom-8 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-sm outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <Close aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub, IconMenu, IconX } from "@tabler/icons-react";

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
        "inline-flex size-9 items-center justify-center rounded-full text-neutral-900 outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/40",
        className
      )}
    >
      <IconBrandGithub aria-hidden className="size-5" stroke={1.5} />
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
      className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f4f0]/90 backdrop-blur-md"
    >
      {/* Mobile: logo left, menu right. Desktop: one centred group. */}
      <div className="mx-auto flex h-14 w-full max-w-[1080px] items-center justify-between px-4 sm:px-6 md:justify-center md:gap-10">
        <Link
          href="#top"
          aria-label={`${name} home`}
          className="inline-flex items-center hover:opacity-80"
        >
          {/* The cream wordmark is made for dark pages; brightness-0 turns it solid black */}
          <Image
            src="/brand/wordmark-cream.svg"
            alt={name}
            width={112}
            height={28}
            priority
            className="h-6 w-auto brightness-0"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-600 hover:text-neutral-900"
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
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg text-neutral-900 outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/40 md:hidden"
        >
          <IconMenu aria-hidden className="size-6" stroke={1.5} />
        </button>
      </div>

      {/* Full-screen mobile menu (no animation) */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f6f4f0] md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col items-center gap-1">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-[clamp(2rem,9vw,2.75rem)] leading-tight font-medium tracking-tight text-neutral-900 outline-none hover:text-neutral-500 focus-visible:text-neutral-500"
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
            className="absolute bottom-8 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-neutral-900 shadow-sm outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-black/40"
          >
            <IconX aria-hidden className="size-5" stroke={1.5} />
          </button>
        </div>
      )}
    </header>
  );
}

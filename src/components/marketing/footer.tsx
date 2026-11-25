import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { SITE } from "@/data/site";

export function Footer() {
  const { name, footer } = SITE;
  const year = footer.year;

  const linkClass =
    "inline-flex items-center gap-1 transition-colors hover:text-neutral-900";

  return (
    <footer className="relative border-t border-black/10 bg-[#f6f4f0] text-neutral-900">
      <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 py-10 text-center sm:gap-4 sm:py-12">
          <Link
            href="#top"
            className="inline-flex items-center transition-opacity hover:opacity-80"
            aria-label={`${name} home`}
          >
            {/* The cream wordmark is made for dark pages; brightness-0 turns it solid black */}
            <Image
              src="/brand/wordmark-cream.svg"
              alt={name}
              width={112}
              height={28}
              className="h-7 w-auto brightness-0"
            />
          </Link>
          <p className="max-w-sm text-[15px] leading-relaxed text-neutral-500">
            {footer.tagline}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-10 text-sm text-neutral-500 sm:pb-12"
        >
          {footer.links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {link.label}
                <IconArrowUpRight aria-hidden className="size-3" stroke={1.5} />
              </a>
            ) : link.href.startsWith("mailto:") ? (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
                <IconArrowUpRight aria-hidden className="size-3" stroke={1.5} />
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
                <IconArrowUpRight aria-hidden className="size-3" stroke={1.5} />
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col gap-2 border-t border-black/10 py-5 text-[13px] leading-[1.2] tracking-[-0.03em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {name}. {footer.licenseNote}
          </span>
          <span>{footer.note}</span>
        </div>
      </div>

      <div
        aria-hidden
        className="relative mt-2 overflow-hidden px-2 select-none"
      >
        <div className="w-full text-center font-sans text-[18vw] leading-none whitespace-nowrap text-black/[0.05]">
          {footer.wordmark}
        </div>
      </div>
    </footer>
  );
}

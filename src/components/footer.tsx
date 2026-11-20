import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { Icon, iconsByName } from "@/lib/icons";

export function Footer() {
  const { name, footer } = SITE;
  const year = footer.year;

  const linkClass =
    "inline-flex items-center gap-1 transition-colors hover:text-primary";

  return (
    <footer className="relative mt-12 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 py-14 text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-foreground underline-offset-4 transition-colors hover:text-primary"
          >
            <Icon def={iconsByName["konark-wheel"]} size={22} stroke={1.5} />
            <span className="text-[17px] font-medium tracking-[-0.03em]">
              {name}
            </span>
          </a>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            {footer.tagline}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-14 text-sm text-muted-foreground"
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
                <IconArrowUpRight aria-hidden className="size-3" stroke={1.75} />
              </a>
            ) : link.href.startsWith("mailto:") ? (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
                <IconArrowUpRight aria-hidden className="size-3" stroke={1.75} />
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
                <IconArrowUpRight aria-hidden className="size-3" stroke={1.75} />
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col gap-2 border-t border-white/10 py-5 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
        <div className="w-full text-center font-pixel text-[18vw] leading-none whitespace-nowrap text-white/[0.035]">
          {footer.wordmark}
        </div>
      </div>
    </footer>
  );
}

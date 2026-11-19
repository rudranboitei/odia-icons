import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"

export function Footer() {
  const { name, footer } = siteConfig
  const year = footer.year

  return (
    <footer className="relative mt-12 border-t">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 py-14 text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-[#1d1d1f]"
          >
            <Icon def={icons[0]} size={22} stroke={1.5} />
            <span className="text-[17px] font-medium tracking-[-0.03em]">
              {name}
            </span>
          </a>
          <p className="max-w-sm text-[15px] font-medium leading-[1.3] tracking-[-0.03em] text-[#1d1d1f] opacity-80">
            {footer.tagline}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-14 text-sm text-muted-foreground"
        >
          {footer.links.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ) : l.href.startsWith("mailto:") ? (
              <a
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-col gap-2 border-t py-5 text-[13px] leading-[1.2] tracking-[-0.03em] text-[#1d1d1f] opacity-55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {name}. Free under the MIT licence.
          </span>
          <span>{footer.note}</span>
        </div>
      </div>

      <div
        aria-hidden
        className="relative mt-4 overflow-x-clip px-2 select-none"
      >
        <div className="text-footer-mark w-full text-center whitespace-nowrap">
          {footer.wordmark}
        </div>
      </div>
    </footer>
  )
}

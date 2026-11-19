import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { Icon, iconsByName } from "@/lib/icons"

export function Footer() {
  const { name, footer } = siteConfig
  const year = footer.year

  return (
    <footer className="relative mt-12 border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-6">
        <div className="flex flex-col items-center gap-4 py-14 text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-foreground underline-offset-4 hover:text-brand hover:underline"
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
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-14 text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-brand"
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

        <div className="flex flex-col gap-2 border-t border-border py-5 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {name}. Free under the MIT licence.
          </span>
          <span>{footer.note}</span>
        </div>
      </div>

      <div
        aria-hidden
        className="relative mt-2 overflow-hidden px-2 select-none"
      >
        <div className="text-footer-mark w-full text-center whitespace-nowrap">
          {footer.wordmark}
        </div>
      </div>
    </footer>
  )
}

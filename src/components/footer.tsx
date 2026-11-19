import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"

export function Footer() {
  const { name, footer, footerLinks } = siteConfig
  const year = footer.year

  return (
    <footer className="relative mt-12 border-t">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-10 py-12 sm:flex-row">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-[#171717]"
            >
              <Icon def={icons[0]} size={22} stroke={1.5} />
              <span className="text-base font-medium tracking-tight">
                {name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-4 sm:items-end"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener" }
                      : {})}
                    className="text-muted-foreground transition-colors hover:text-[#171717]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#top"
              className="text-xs text-muted-foreground transition-colors hover:text-[#171717]"
            >
              Back to top ↑
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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

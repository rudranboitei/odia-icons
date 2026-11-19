import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  const { name, footer } = siteConfig
  const year = footer.year

  return (
    <footer className="relative mt-12 border-t">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 py-14 text-center">
          <a href="#top" className="inline-flex items-center">
            <Image
              src="/brand/logo-wordmark.svg"
              alt={name}
              width={112}
              height={28}
              unoptimized
              className="h-7 w-auto"
            />
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
        className="relative mt-2 overflow-hidden px-2 select-none [mask-image:linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
        <Image
          src="/brand/logo-wordmark.svg"
          alt=""
          width={2400}
          height={609}
          unoptimized
          className="w-full"
        />
      </div>
    </footer>
  )
}

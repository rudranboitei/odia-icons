import Image from "next/image"
import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteNav() {
  const { name, links } = siteConfig

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-5 lg:px-6">
        <Link href="/" className="flex items-center" aria-label={name}>
          <Image
            src="/brand/logo-wordmark.svg"
            alt={name}
            width={104}
            height={26}
            priority
            unoptimized
            className="h-6.5 w-auto dark:invert"
          />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={links.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            title="GitHub"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-10 rounded-full"
            )}
          >
            <IconBrandGithub />
          </Link>
          <Link
            href={links.icons}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-10 rounded-full px-4 text-[15px]"
            )}
          >
            Get the icons
          </Link>
        </div>
      </div>
    </header>
  )
}

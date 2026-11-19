import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"

// Fixed mini icon sheet in the corner (desktop only).
export function IconDock() {
  const { iconDock, links } = siteConfig

  return (
    <a
      href={links.github}
      target="_blank"
      rel="noopener"
      aria-label={iconDock.ariaLabel}
      className="fixed right-6 bottom-6 z-40 hidden flex-col items-center gap-2 rounded-2xl border bg-background/80 p-3 shadow-sm backdrop-blur md:flex"
    >
      <span className="grid grid-cols-3 gap-1.5" aria-hidden>
        {icons.slice(0, 6).map((icon) => (
          <Icon
            key={icon.name}
            def={icon}
            size={22}
            stroke={1.5}
            className="text-[#171717]"
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">
        <span className="underline underline-offset-2">{iconDock.caption}</span> ↗
      </span>
    </a>
  )
}

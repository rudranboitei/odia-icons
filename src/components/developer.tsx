import { IconCheck } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { iconsByName, toSvg } from "@/lib/icons"
import { Eyebrow } from "./eyebrow"
import { InstallBox } from "./install-box"

export function DeveloperSection() {
  const { developer } = siteConfig
  const [lead, trail] = developer.title.split(developer.highlight)
  const snippet = toSvg(iconsByName["konark-wheel"], { size: 32, stroke: 1.75 })

  return (
    <section id="developers" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>{developer.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl leading-[1.05] font-medium tracking-[-0.03em] text-balance text-[#1d1d1f] sm:text-5xl">
            {lead}
            <span className="rounded-lg bg-muted px-2 text-[#1d1d1f]">
              {developer.highlight}
            </span>
            {trail}
          </h2>
          <p className="mt-6 max-w-xl text-[21px] leading-[1.4] font-medium tracking-[-0.03em] text-[#545454]">
            {developer.description}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {developer.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-[15px] leading-[1.3] font-medium tracking-[-0.03em] text-[#1d1d1f] opacity-80"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <IconCheck className="size-2.5" stroke={3} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <InstallBox className="mt-9 items-start" />
        </div>

        <div className="overflow-hidden rounded-[2rem] border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-5 py-3">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              konark-wheel.svg
            </span>
            <span className="ml-auto rounded-full border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              24 × 24
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-relaxed text-foreground/80">
            <code>{snippet}</code>
          </pre>
          <div className="flex items-center justify-between border-t px-5 py-3 text-[11px] text-muted-foreground">
            <span>MIT licensed</span>
            <span className="font-mono">1.75 stroke · round caps</span>
          </div>
        </div>
      </div>
    </section>
  )
}

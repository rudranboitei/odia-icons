import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"
import { FeatureMedia } from "./feature-media"

// Pop-style section: centered header (pill + title + subtitle),
// then large rounded cards with the animation on top and text below.
export function Features() {
  const { features, featuresIntro } = siteConfig
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      {/* decorative chakra */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <Icon
          def={icons[0]}
          size={1000}
          stroke={0.35}
          className="max-w-none text-foreground opacity-[0.055]"
        />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-1.5 text-xs font-medium shadow-xs backdrop-blur">
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background">
              <Icon def={icons[0]} size={12} stroke={1.75} />
            </span>
            {featuresIntro.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {featuresIntro.title}
          </h2>
          <p className="mt-4 text-base text-balance text-muted-foreground sm:text-lg">
            {featuresIntro.description}
          </p>
        </header>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="rounded-3xl border bg-card/80 p-2 shadow-xs backdrop-blur transition-shadow duration-300 hover:shadow-md"
            >
              {f.media && (
                <FeatureMedia media={f.media} label={f.title} className="aspect-[16/11]" />
              )}
              <div className="px-4 pt-5 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-lg border bg-background">
                    <Icon def={icons[(i + 1) % icons.length]} size={16} stroke={1.5} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

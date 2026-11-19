import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { FeatureMedia } from "./feature-media"
import { SectionHeader } from "./section-header"

// "Powerful sections" card grid: package cards with a motion visual on top.
export function Features() {
  const { features, featuresIntro } = siteConfig

  return (
    <section id="features" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow={featuresIntro.eyebrow}
          title={featuresIntro.title}
          description={featuresIntro.description}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={cn(
                "rounded-2xl border bg-card p-3 shadow-xs transition-shadow duration-300 hover:shadow-md",
                features.length % 3 === 1 &&
                  i === features.length - 1 &&
                  "lg:col-start-2"
              )}
            >
              {f.media && (
                <FeatureMedia
                  media={f.media}
                  label={f.title}
                  className="aspect-[4/3] rounded-xl"
                />
              )}
              <div className="px-1.5 pt-4 pb-2">
                <h3 className="text-[17px] font-medium tracking-tight text-[#171717]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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

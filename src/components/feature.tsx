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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={cn(
                "flex flex-col items-start gap-5 rounded-[10px] border border-[#2222221a] bg-white p-5",
                features.length % 3 === 1 &&
                  i === features.length - 1 &&
                  "lg:col-start-2"
              )}
            >
              {f.media && <FeatureMedia media={f.media} label={f.title} />}
              <div className="flex w-full flex-col items-start gap-2.5">
                <h3 className="text-[19px] font-medium tracking-[-0.03em] text-[#1d1d1f] leading-[1.4] min-[1200px]:text-[21px]">
                  {f.title}
                </h3>
                <p className="text-[15px] font-medium leading-[1.3] tracking-[-0.03em] text-[#1d1d1f] opacity-80">
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

"use client";

import { motion, useReducedMotion } from "motion/react";

import { SITE } from "@/data/site";
import { FeatureMedia } from "./feature-media";
import { EASE } from "./reveal";
import { SectionHeader } from "./section-header";
import { Boita, Deula, KonarkWheel, Machha, Padma, Rath, type Motif } from "./odia-motifs";

/**
 * Each feature gets a custom Odisha motif chosen for what it says:
 * the deula for "rooted", the Konark wheel (all symmetry and geometry) for
 * the grid, the Rath (carries things out) for copy-as-code, and the lotus
 * (open, unrestricted) for "free". Anything else falls back by position.
 */
const BY_MEDIA: Record<string, Motif> = {
  rooted: Deula,
  grid: KonarkWheel,
  "copy-code": Rath,
  free: Padma,
};
const FALLBACK: Motif[] = [Boita, Machha, Deula, KonarkWheel];

/**
 * Features built on the existing "rooted / grid / copy-code / free" visuals.
 * The visuals keep their own animation logic untouched.
 */
export function Features() {
  const { features, featuresIntro } = SITE;
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="scroll-mt-20 px-5 py-14 sm:px-6 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          titleId="features-title"
          eyebrow={featuresIntro.eyebrow}
          title={featuresIntro.title}
          accent={featuresIntro.accent}
          description={featuresIntro.description}
        />

        <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2">
          {features.map((feature, index) => {
            const name = feature.media?.type === "animation" ? feature.media.name : undefined;
            const Motif = (name && BY_MEDIA[name]) || FALLBACK[index % FALLBACK.length];

            return (
              <motion.article
                key={feature.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                // Stagger by column, not by index, so cards never wait on ones above them
                transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: EASE }}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-1.5 sm:p-2"
              >
                {feature.media && (
                  <FeatureMedia
                    media={feature.media}
                    label={feature.title}
                    className="rounded-2xl"
                  />
                )}

                <div className="flex items-start gap-4 px-3.5 pt-4 pb-4 sm:px-4 sm:pt-5 sm:pb-5">
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] sm:size-14"
                  >
                    <Motif className="size-8 text-foreground sm:size-9" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg leading-snug font-semibold tracking-tight text-foreground sm:text-xl">
                        {feature.title}
                      </h3>
                      <span
                        aria-hidden
                        className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/60"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

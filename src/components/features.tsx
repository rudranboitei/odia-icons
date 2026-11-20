"use client";

import { motion } from "motion/react";

import { SITE } from "@/data/site";
import { Icon, icons } from "@/lib/icons";
import { FeatureMedia } from "./feature-media";
import { EASE } from "./reveal";
import { SectionHeader } from "./section-header";

/**
 * Features built on the existing "rooted / grid / copy-code / free" visuals.
 * Card reveal, hover and tap are the shared landing motion; the visuals keep
 * their own animation logic untouched.
 */
export function Features() {
  const { features, featuresIntro } = SITE;

  return (
    <section id="features" className="scroll-mt-20 px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow={featuresIntro.eyebrow}
          title={featuresIntro.title}
          accent={featuresIntro.accent}
          description={featuresIntro.description}
        />

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 lg:mt-12">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: EASE,
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-1.5 transition-colors duration-300 hover:border-primary/40 sm:p-2"
            >
              {feature.media && (
                <FeatureMedia
                  media={feature.media}
                  label={feature.title}
                  className="rounded-2xl"
                />
              )}

              <div className="px-4 pt-4 pb-4 sm:pt-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Icon
                      def={icons[(index + 1) % icons.length]}
                      size={16}
                      stroke={1.5}
                    />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

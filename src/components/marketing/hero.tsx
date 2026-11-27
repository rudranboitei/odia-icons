"use client";

import Link from "next/link";
import { Inter_Tight } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight, Download, LayoutGrid, MousePointer2, Star } from "lucide-react";

import { SITE } from "@/data/site";
import { ICON_COUNT } from "@/lib/icons";
import { InstallBox } from "./install-box";

/* Bold, tight sans for the whole hero */
const sans = Inter_Tight({ subsets: ["latin"], weight: ["500", "700"] });

const HERO_IMAGE = "/home-bg.jpeg";

/* Must match the background of the section that follows the hero */
const PAGE_BG = "#141210";

const EASE = [0.22, 1, 0.36, 1] as const;

/* The toggle switch that stands in for the "o" in "Icons" */
function ToggleO({ reduce }: { reduce: boolean }) {
  return (
    <span className="relative mx-[0.04em] inline-block h-[0.58em] w-[1.15em] rounded-full bg-black shadow-[0_0.08em_0.25em_rgba(0,0,0,0.6)] ring-1 ring-white/40">
      {/* Inner hole, so it still reads as an "o" */}
      <span className="absolute inset-[0.13em] rounded-full bg-black ring-1 ring-white/25" />
      {/* Knob: slides from right to left once on load */}
      <motion.span
        initial={reduce ? false : { x: "0.57em" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        className="absolute top-[0.04em] left-[0.04em] block"
      >
        {/* Sized on an inner element so "em" matches the headline */}
        <span className="block size-[0.5em] rounded-full bg-gradient-to-br from-white to-neutral-300 shadow-lg" />
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { hero } = SITE;
  const reduce = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.1 } },
  };

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0.2 : 0.7, ease: EASE },
    },
  };

  const trust = [
    SITE.stars !== null && {
      icon: Star,
      text: `${SITE.stars.toLocaleString()} ${hero.badges.stars}`,
      fill: true,
    },
    SITE.installs !== null && {
      icon: Download,
      text: `${SITE.installs} ${hero.badges.installs}`,
    },
    { icon: LayoutGrid, text: `${ICON_COUNT} ${hero.badges.icons}` },
  ].filter(Boolean) as { icon: typeof Star; text: string; fill?: boolean }[];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`${sans.className} relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[#141210] px-4 pt-28 pb-12 sm:px-6 sm:pt-36`}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-bottom"
      />

      {/* Dark wash so the headline stays readable on the image */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />

      {/* Bottom fade into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 sm:h-48"
        style={{
          background: `linear-gradient(to top, ${PAGE_BG} 0%, ${PAGE_BG}99 40%, transparent 100%)`,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center"
      >
        {/* Small uppercase line */}
        <motion.p
          variants={rise}
          className="text-xs font-bold tracking-wide text-neutral-300 uppercase sm:text-sm"
        >
          Open source
        </motion.p>

        {/* Headline */}
        <motion.h1 id="hero-title" variants={rise} className="mt-6 font-bold text-white">
          <span className="sr-only">Free Odisha Icons, Open-source SVG Set</span>

          <span aria-hidden="true" className="flex flex-col items-center">
            <span className="flex items-center gap-3 text-[clamp(2rem,6.5vw,4rem)] leading-none tracking-[-0.04em] sm:gap-5">
              Free Odisha
              <span className="flex size-[0.85em] items-center justify-center rounded-full bg-black ring-1 ring-white/40">
                <ArrowUpRight className="size-[0.45em]" strokeWidth={2.5} />
              </span>
            </span>

            <span className="block text-[clamp(5rem,22vw,12.5rem)] leading-[0.95] tracking-[-0.05em] whitespace-nowrap">
              Ic
              <ToggleO reduce={reduce} />
              ns
            </span>

            <span className="mt-2 flex items-center gap-2 text-[clamp(1.5rem,6vw,4rem)] sm:mt-3 leading-none tracking-[-0.04em] whitespace-nowrap sm:gap-4">
              <MousePointer2 className="size-[0.7em] fill-white" />
              Open-source SVG Set
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={rise}
          className="mt-7 max-w-md text-sm leading-relaxed font-medium text-balance text-neutral-300 sm:text-base"
        >
          {hero.lead}
        </motion.p>

        {/* CTA */}
        <motion.div variants={rise} className="mt-8 flex w-full max-w-xs flex-col sm:max-w-md">
          <InstallBox className="w-full" />
        </motion.div>

        {/* Underlined link */}
        <motion.div variants={rise} className="mt-5">
          <Link
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-white underline decoration-2 underline-offset-4 hover:text-neutral-300"
          >
            {hero.badges.github}
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.ul
          variants={rise}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-neutral-300"
        >
          {trust.map((t) => (
            <li key={t.text} className="flex items-center gap-1.5">
              <t.icon
                aria-hidden
                className={`size-4 ${t.fill ? "fill-white text-white" : ""}`}
              />
              {t.text}
            </li>
          ))}
        </motion.ul>

      </motion.div>
    </section>
  );
}

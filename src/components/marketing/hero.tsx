"use client";

import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Download, LayoutGrid, Search, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/data/site";
import { Icon, ICON_COUNT, iconsByName } from "@/lib/icons";

/* Serif display face */
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

/* Save hero-bg.webp to /public/images/ */
const HERO_IMAGE = "/home-bg.jpeg";

/* Must match the background of the section that follows the hero */
const PAGE_BG = "#141210";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Product preview (cropped + light fade at the bottom)                */
/* ------------------------------------------------------------------ */

/*
 * Replaces PreviewWindow in your file. Everything else in that file stays.
 *
 * Imports it needs (from your lib, the file you just sent):
 *
 *   import { Icon, ICON_COUNT, iconsByName } from "@/lib/icons";
 *
 * It no longer uses ICONS or IconGlyph, which have a different type (IconEntry,
 * with `paths`). `Icon` takes the same IconDef that iconsByName returns.
 */

/** The icons shown in the preview, by name (the files in ./icons/outline). */
const PREVIEW_NAMES = [
  "home",
  "search",
  "download",
  "lock",
  "message",
  "bell",
  "settings",
  "user",
] as const;

/** Which tile shows the dark "selected" border. */
const SELECTED = "home";

function PreviewWindow() {
  // Look each name up; a name that isn't in the registry is skipped, and logged so it isn't silent
  const tiles = PREVIEW_NAMES.flatMap((name) => {
    const icon = iconsByName[name];
    if (!icon) {
      console.warn(
        `PreviewWindow: no icon named "${name}" in the registry. Run "bun run icons:build" and restart the dev server.`
      );
      return [];
    }
    return [icon];
  });

  return (
    <Card
      aria-hidden="true"
      className="relative h-[260px] gap-0 overflow-hidden rounded-b-none border-b-0 border-white/10 bg-[#1b1b1b] p-0 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] select-none sm:h-[320px] md:h-[380px]"
    >
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white text-black">
          <LayoutGrid className="size-4" />
        </div>
        <span className="hidden text-sm font-semibold text-white sm:block">
          odiaicons
        </span>
        <div className="ml-2 flex h-8 max-w-xs flex-1 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-neutral-400">
          <Search className="size-3.5 shrink-0" />
          <span className="truncate">Search icons</span>
        </div>
        <span className="ml-auto hidden text-xs text-neutral-400 sm:block">
          {ICON_COUNT} icons
        </span>
      </div>

      {/* Grid: 16 tiles divide evenly into 4 or 8 columns, so no ragged last row */}
      <div className="p-4 sm:p-5">
        <p className="mb-3 text-left text-sm font-semibold text-white">
          Featured icons
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {tiles.map((icon) => (
            <div
              key={icon.name}
              className={`flex aspect-[1/0.85] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-1 ${icon.name === SELECTED
                ? "border-white/30 bg-white/10"
                : "border-white/10"
                }`}
            >
              <Icon
                def={icon}
                strokeWidth={2}
                className="size-6 text-white sm:size-7"
              />
              <span className="w-full truncate text-center text-[10px] text-neutral-400 capitalize">
                {icon.name.replaceAll("-", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Light fade: dashboard dissolves into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32"
        style={{
          background: `linear-gradient(to top, ${PAGE_BG} 0%, ${PAGE_BG}b3 45%, transparent 100%)`,
        }}
      />
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

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
      className="relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[#141210] px-4 pt-28 sm:px-6 sm:pt-36"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-bottom"
      />

      {/* Soft light wash so the headline stays readable on the image */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/35 to-transparent" />

      {/* Light bottom fade: blends the hero into the next (light) section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 sm:h-48"
        style={{
          background: `linear-gradient(to top, ${PAGE_BG} 0%, ${PAGE_BG}99 40%, transparent 100%)`,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center text-center"
      >
        {/* Pill badge */}
        <motion.div variants={rise}>
          <Badge
            asChild
            variant="outline"
            className="h-8 gap-2 rounded-full border-white/10 bg-white/10 py-1 pr-3.5 pl-1 text-[13px] font-medium text-neutral-200 shadow-sm backdrop-blur hover:bg-white/15"
          >
            <Link href={SITE.links.github} target="_blank" rel="noopener noreferrer">
              <Badge className="rounded-full bg-white px-2.5 text-[11px] text-[#1a1713] hover:bg-white/90">
                Open source
              </Badge>
              {hero.badges.github}
            </Link>
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-title"
          initial={reduce ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className={`${serif.className} mt-5 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] font-normal tracking-[-0.045em] text-[#ffffff] sm:mt-7`}
        >
          <span className="block text-balance">Free Odisha Icons</span>
          <span className="block text-balance">Open-source SVG Set</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={rise}
          className="mt-5 max-w-xl text-base leading-relaxed text-balance text-neutral-300 sm:mt-6 sm:text-lg"
        >
          {hero.lead}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rise}
          className="mt-7 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-black px-6 text-base font-normal text-white ring-1 ring-white/15 hover:bg-neutral-900"
          >
            <Link href="#install">
              {hero.ctas.install}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-12 rounded-full bg-white/10 px-6 text-base font-normal text-white shadow-sm ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
          >
            <Link href="/icons">{hero.ctas.browse}</Link>
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.ul
          variants={rise}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 rounded-full bg-white/10 px-5 py-2 text-[13px] text-neutral-200 ring-1 ring-white/10 backdrop-blur-md sm:mt-8 sm:text-sm"
        >
          {trust.map((t, i) => (
            <li key={t.text} className="flex items-center gap-4">
              {i > 0 && (
                <Separator
                  orientation="vertical"
                  className="hidden h-4 bg-white/20 sm:block"
                />
              )}
              <span className="flex items-center gap-1.5">
                <t.icon
                  aria-hidden
                  className={`size-4 ${t.fill ? "fill-amber-400 text-amber-400" : ""}`}
                />
                {t.text}
              </span>
            </li>
          ))}
        </motion.ul>

        {/* Preview: pinned to the bottom, cropped by the hero edge */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-auto w-full max-w-4xl pt-10 sm:pt-14"
        >
          <PreviewWindow />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Download, LayoutGrid, Search, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/data/site";
import { Icon, icons, iconsByName } from "@/lib/icons";

/* Serif display face */
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

/* Save hero-bg.webp to /public/images/ */
const HERO_IMAGE = "/hero-bg.webp";

/* Must match the background of the section that follows the hero */
const PAGE_BG = "#f7f5f1";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Product preview (cropped + light fade at the bottom)                */
/* ------------------------------------------------------------------ */

/*
 * Replaces PreviewWindow in your file. Everything else in that file stays.
 *
 * Imports it needs (from your lib, the file you just sent):
 *
 *   import { Icon, icons, iconsByName } from "@/lib/icons";
 *
 * It no longer uses ICONS or IconGlyph, which have a different type (IconEntry,
 * with `paths`). `Icon` takes the same IconDef that iconsByName returns.
 */

/** The 16 Odia icons shown in the preview, by name (the files in ./icons/outline). */
const PREVIEW_NAMES = [
  "deul-temple",
  "konark-wheel",
  "jagannath-symbol",
  "gotipua",
  "odissi-mudra",
  "raja-parba",
  "dhanu-yatra",
  "poda-pitha",
  "khaja",
  "pakhala",
  "pipili-applique",
  "khandagiri-cave",
  "hirakud-dam",
  "bhitarkanika-crocodile",
  "conch-shell",
  "sora-painting",
] as const;

/** Which tile shows the dark "selected" border. */
const SELECTED = "deul-temple";

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
      className="relative h-[260px] gap-0 overflow-hidden rounded-b-none border-b-0 border-black/5 bg-white p-0 shadow-[0_30px_80px_-24px_rgba(90,60,30,0.35)] select-none sm:h-[320px] md:h-[380px]"
    >
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-black text-white">
          <LayoutGrid className="size-4" />
        </div>
        <span className="hidden text-sm font-semibold text-neutral-900 sm:block">
          odiaicons
        </span>
        <div className="ml-2 flex h-8 max-w-xs flex-1 items-center gap-2 rounded-lg border border-neutral-200 px-3 text-xs text-neutral-500">
          <Search className="size-3.5 shrink-0" />
          <span className="truncate">Search icons</span>
        </div>
        <span className="ml-auto hidden text-xs text-neutral-500 sm:block">
          {icons.length} icons
        </span>
      </div>

      {/* Grid: 16 tiles divide evenly into 4 or 8 columns, so no ragged last row */}
      <div className="p-4 sm:p-5">
        <p className="mb-3 text-left text-sm font-semibold text-neutral-900">
          Featured icons
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {tiles.map((icon) => (
            <div
              key={icon.name}
              className={`flex aspect-[1/0.85] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-1 ${icon.name === SELECTED
                ? "border-black bg-neutral-50"
                : "border-neutral-200"
                }`}
            >
              <Icon
                def={icon}
                strokeWidth={1.5}
                className="size-6 text-neutral-900 sm:size-7"
              />
              <span className="w-full truncate text-center text-[10px] text-neutral-500 capitalize">
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

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
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
    { icon: LayoutGrid, text: `${icons.length} ${hero.badges.icons}` },
  ].filter(Boolean) as { icon: typeof Star; text: string; fill?: boolean }[];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-linear-to-b from-[#f1dfcc] via-[#f5e9db] to-[#f7f5f1] px-4 pt-28 sm:px-6 sm:pt-36"
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/45 via-white/15 to-transparent" />

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
            className="h-8 gap-2 rounded-full border-black/5 bg-white/85 py-1 pr-3.5 pl-1 text-[13px] font-medium text-neutral-800 shadow-sm backdrop-blur hover:bg-white"
          >
            <Link href={SITE.links.github} target="_blank" rel="noopener noreferrer">
              <Badge className="rounded-full bg-black px-2.5 text-[11px] text-white hover:bg-black">
                Open source
              </Badge>
              {hero.badges.github}
            </Link>
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-title"
          initial={{ y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className={`${serif.className} mt-5 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] font-normal tracking-[-0.045em] text-[#17130f] sm:mt-7`}
        >
          <span className="block text-balance">Free Odisha Icons</span>
          <span className="block text-balance">Open-source SVG Set</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={rise}
          className="mt-5 max-w-xl text-base leading-relaxed text-balance text-neutral-700 sm:mt-6 sm:text-lg"
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
            className="h-12 rounded-full bg-black px-6 text-base font-normal text-white hover:bg-neutral-800"
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
            className="h-12 rounded-full bg-white/90 px-6 text-base font-normal text-neutral-900 shadow-sm ring-1 ring-black/5 backdrop-blur hover:bg-white"
          >
            <Link href="/icons">{hero.ctas.browse}</Link>
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.ul
          variants={rise}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 rounded-full bg-white/60 px-5 py-2 text-[13px] text-neutral-800 ring-1 ring-black/5 backdrop-blur-md sm:mt-8 sm:text-sm"
        >
          {trust.map((t, i) => (
            <li key={t.text} className="flex items-center gap-4">
              {i > 0 && (
                <Separator
                  orientation="vertical"
                  className="hidden h-4 bg-neutral-400/50 sm:block"
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
          initial={{ opacity: 0, y: 50 }}
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

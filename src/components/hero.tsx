"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Download, GitBranchPlus, LayoutGrid, Search, Star } from "lucide-react";

import { byName, ICONS, IconGlyph } from "@/data/icons";
import { SITE } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Scene: sky, clouds, hills                                          */
/* ------------------------------------------------------------------ */

/** A soft cloud made from overlapping blurred blobs. Size it with className. */
function Cloud({
  className,
  drift = 24,
  duration = 40,
  reduce,
}: {
  className?: string;
  drift?: number;
  duration?: number;
  reduce: boolean;
}) {
  const blobs = [
    { l: "0%", t: "38%", w: "42%", h: "52%", o: 0.9 },
    { l: "18%", t: "6%", w: "44%", h: "70%", o: 1 },
    { l: "42%", t: "20%", w: "40%", h: "62%", o: 0.95 },
    { l: "58%", t: "42%", w: "42%", h: "50%", o: 0.9 },
    { l: "12%", t: "52%", w: "76%", h: "42%", o: 0.85 },
  ];
  return (
    <motion.div
      aria-hidden="true"
      animate={reduce ? undefined : { x: [0, drift, 0] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity }}
      className={`pointer-events-none absolute ${className ?? ""}`}
    >
      <div className="relative size-full">
        {blobs.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white blur-[14px] sm:blur-[22px]"
            style={{ left: b.l, top: b.t, width: b.w, height: b.h, opacity: b.o }}
          />
        ))}
      </div>
    </motion.div>
  );
}

const HILL_LEFT =
  "M0 520 V250 C120 170 300 150 430 215 C520 260 600 360 700 520 Z";
const HILL_RIGHT =
  "M1440 520 V230 C1320 150 1120 140 980 230 C880 295 820 400 740 520 Z";

/** Deterministic wildflowers (same output on server and client). */
const FLOWERS = (() => {
  let s = 7;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const colors = ["#ffd93b", "#ffffff", "#ff8fb1", "#b48cff", "#ffb347"];
  const out: { x: number; y: number; r: number; c: string }[] = [];
  for (let i = 0; i < 40; i++) {
    out.push({
      x: 10 + rnd() * 420,
      y: 275 + Math.pow(rnd(), 0.7) * 225,
      r: 1.6 + rnd() * 1.8,
      c: colors[Math.floor(rnd() * colors.length)],
    });
    out.push({
      x: 1010 + rnd() * 420,
      y: 265 + Math.pow(rnd(), 0.7) * 235,
      r: 1.6 + rnd() * 1.8,
      c: colors[Math.floor(rnd() * colors.length)],
    });
  }
  return out;
})();

function Hills() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] w-full sm:h-[440px] md:h-[540px]"
    >
      <defs>
        <linearGradient id="grass-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd95a" />
          <stop offset="1" stopColor="#4aa22e" />
        </linearGradient>
        <linearGradient id="grass-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fd13f" />
          <stop offset="0.5" stopColor="#35901f" />
          <stop offset="1" stopColor="#1d5d16" />
        </linearGradient>
        <radialGradient id="grass-light" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9f56f" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c9f56f" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip-left">
          <path d={HILL_LEFT} />
        </clipPath>
        <clipPath id="clip-right">
          <path d={HILL_RIGHT} />
        </clipPath>
      </defs>

      {/* Back valley */}
      <path
        d="M0 420 C250 340 520 380 720 400 C920 380 1200 330 1440 410 V520 H0 Z"
        fill="url(#grass-back)"
      />

      {/* Front hills */}
      <path d={HILL_LEFT} fill="url(#grass-front)" />
      <path d={HILL_RIGHT} fill="url(#grass-front)" />

      {/* Sunlit highlights */}
      <g clipPath="url(#clip-left)">
        <ellipse cx="190" cy="235" rx="260" ry="90" fill="url(#grass-light)" />
      </g>
      <g clipPath="url(#clip-right)">
        <ellipse cx="1240" cy="225" rx="260" ry="90" fill="url(#grass-light)" />
      </g>

      {/* Wildflowers */}
      {FLOWERS.map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.c} opacity={0.9} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Headline keycap (sized in em so it matches the text)               */
/* ------------------------------------------------------------------ */

function KeyTile() {
  const wheel = byName("konark-wheel");
  return (
    <motion.span
      aria-hidden="true"
      variants={{
        hidden: { opacity: 0, scale: 0.6, rotate: -14, y: 16 },
        show: {
          opacity: 1,
          scale: 1,
          rotate: -6,
          y: 0,
          transition: { type: "spring", stiffness: 220, damping: 15, mass: 0.9 },
        },
      }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      whileTap={{ y: 4, scale: 0.97 }}
      className="relative grid size-[1.3em] shrink-0 place-items-center rounded-[0.32em] bg-gradient-to-b from-[#f7e8d4] to-[#e6c9a6] shadow-[0_0.08em_0_#b8946b,0_0.22em_0.4em_-0.06em_rgba(10,30,70,0.45),inset_0_0.03em_0_rgba(255,255,255,0.7)]"
    >
      <span className="absolute inset-[0.07em] rounded-[0.25em] bg-gradient-to-b from-[#f3dec4] to-[#ecd2b0] shadow-[inset_0_0.03em_0.08em_rgba(120,80,40,0.25)]" />
      <IconGlyph
        icon={wheel}
        strokeWidth={1.5}
        className="relative size-[0.72em] text-[#3b2a1a]"
      />
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Product preview window (cropped at the bottom of the hero)         */
/* ------------------------------------------------------------------ */

function PreviewWindow() {
  const tiles = ICONS.slice(0, 32);

  return (
    <div className="h-[250px] overflow-hidden rounded-t-[1.1rem] border border-b-0 border-white/70 bg-white/55 p-2 shadow-[0_-10px_60px_-10px_rgba(10,30,70,0.35)] backdrop-blur-xl sm:h-[330px] sm:rounded-t-[1.5rem] sm:p-3 md:h-[400px]">
      <div className="h-full overflow-hidden rounded-t-[0.8rem] bg-white ring-1 ring-black/5 sm:rounded-t-[1.1rem]">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-slate-200" />
            <span className="size-2.5 rounded-full bg-slate-200" />
            <span className="size-2.5 rounded-full bg-slate-200" />
          </div>
          <div className="flex h-8 min-w-0 max-w-sm flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 text-xs text-slate-400">
            <Search aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">Search icons</span>
          </div>
          <span className="ml-auto hidden shrink-0 text-xs text-slate-400 sm:block">
            {ICONS.length} icons
          </span>
        </div>

        {/* Grid */}
        <div className="p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <span className="text-sm font-semibold text-slate-900">All icons</span>
            <span className="text-xs text-slate-400 sm:hidden">{ICONS.length}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 md:grid-cols-8">
            {tiles.map((icon, i) => (
              <div
                key={icon.name}
                className={`flex aspect-[1/0.9] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-1 ${i === 1
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200/70 bg-white"
                  }`}
              >
                <IconGlyph
                  icon={icon}
                  strokeWidth={1.5}
                  className="size-6 text-slate-800 sm:size-7"
                />
                <span className="w-full truncate text-center text-[10px] text-slate-500 capitalize sm:text-[11px]">
                  {icon.name.replaceAll("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.15 } },
  };

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(6px)" },
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
    { icon: LayoutGrid, text: `${ICONS.length} ${hero.badges.icons}` },
  ].filter(Boolean) as { icon: typeof Star; text: string; fill?: boolean }[];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[linear-gradient(to_bottom,#4f8fe0_0%,#7fb2ee_35%,#b9d7f6_68%,#e8f2fc_100%)] px-5 pt-28 sm:px-6 sm:pt-36"
    >
      {/* Scene */}
      <Cloud
        reduce={reduce}
        className="-top-6 -left-16 h-36 w-72 sm:-left-10 sm:h-56 sm:w-[30rem]"
        drift={30}
        duration={46}
      />
      <Cloud
        reduce={reduce}
        className="top-24 -right-20 h-28 w-60 sm:top-16 sm:-right-10 sm:h-48 sm:w-[26rem]"
        drift={-26}
        duration={54}
      />
      <Cloud
        reduce={reduce}
        className="top-[46%] -left-24 hidden h-24 w-56 opacity-80 md:block"
        drift={20}
        duration={60}
      />
      <Hills />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center text-center"
      >
        <motion.div variants={rise}>
          <Link
            href={SITE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/70 bg-white/55 px-3.5 text-[13px] font-medium text-[#0b1b33] backdrop-blur transition-colors hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-[#0b1b33]/50 focus-visible:outline-none"
          >
            <GitBranchPlus aria-hidden className="size-3.5" />
            {hero.badges.github}
            <ArrowRight aria-hidden className="size-3.5 opacity-60" />
          </Link>
        </motion.div>

        <h1 className="mt-5 sm:mt-6">
          <motion.span
            variants={rise}
            className="flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-1 text-[clamp(2.4rem,10vw,7rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#0b1b33]"
          >
            <span>{hero.wordmark.lead}</span>
            <KeyTile />
            <span>{hero.wordmark.trail}</span>
          </motion.span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-4 max-w-xl text-base leading-relaxed text-balance text-[#12315a]/80 sm:mt-6 sm:text-xl"
        >
          {hero.lead}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rise}
          className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#install"
              className="group flex rounded-full bg-white/40 p-1 ring-1 ring-white/70 backdrop-blur focus-visible:ring-2 focus-visible:ring-[#0b1b33] focus-visible:outline-none sm:inline-flex"
            >
              <span className="flex h-12 flex-1 items-center justify-between gap-4 rounded-full bg-gradient-to-b from-[#1f3a6b] to-[#0b1b33] pr-1.5 pl-6 text-base font-medium text-white shadow-[0_10px_24px_-8px_rgba(11,27,51,0.7),inset_0_1px_0_rgba(255,255,255,0.25)] sm:flex-none sm:justify-start">
                {hero.ctas.install}
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#0b1b33] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/icons"
              className="flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-[#0b1b33] shadow-[0_10px_24px_-12px_rgba(11,27,51,0.45)] transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-[#0b1b33] focus-visible:outline-none"
            >
              {hero.ctas.browse}
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust row */}
        <motion.ul
          variants={rise}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#12315a]/85 sm:mt-9 sm:gap-x-0 sm:text-[15px]"
        >
          {trust.map((t, i) => (
            <li
              key={t.text}
              className={`flex items-center gap-2 sm:px-5 ${i > 0 ? "sm:border-l sm:border-[#12315a]/20" : ""
                }`}
            >
              <t.icon
                aria-hidden
                className={`size-4 ${t.fill ? "fill-[#f5b301] text-[#f5b301]" : "text-[#12315a]"}`}
              />
              {t.text}
            </li>
          ))}
        </motion.ul>

        {/* Preview window, cropped by the fold */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="relative mt-10 w-full max-w-[880px] sm:mt-14"
        >
          <PreviewWindow />
        </motion.div>
      </motion.div>

      {/* Blend into the dark page below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-background to-transparent sm:h-40"
      />
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Download, GitBranchPlus, LayoutGrid, Search, Star } from "lucide-react";

import { ICONS, IconGlyph } from "@/data/icons";
import { SITE } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Palette taken from the "Why odiaicons" section */
const CREAM = "#f6dfc4";
const INK = "#1a1210";

/* ------------------------------------------------------------------ */
/* Mountains: faceted, sun-lit ranges (deterministic, SSR-safe)        */
/* ------------------------------------------------------------------ */

type Pt = [number, number];
const W = 1440;
const H = 520;
const SUN_X = W / 2;

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Midpoint displacement for a jagged, natural ridgeline. */
function subdivide(a: Pt, b: Pt, rnd: () => number, depth: number, rough: number): Pt[] {
  if (depth === 0) return [a, b];
  const m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (rnd() - 0.5) * rough * Math.abs(b[0] - a[0])];
  const l = subdivide(a, m, rnd, depth - 1, rough);
  const r = subdivide(m, b, rnd, depth - 1, rough);
  return [...l, ...r.slice(1)];
}

const fmt = (pts: Pt[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

function makeRange(o: {
  seed: number;
  count: number;
  top: number;
  spread: number;
  valley: number;
  vSpread: number;
}) {
  const rnd = rng(o.seed);
  const step = W / o.count;

  const peaks: Pt[] = Array.from({ length: o.count }, (_, i) => [
    (i + 0.5) * step + (rnd() - 0.5) * step * 0.45,
    o.top + rnd() * o.spread,
  ]);
  const valleys: Pt[] = Array.from({ length: o.count + 1 }, (_, i) => [
    i === 0 ? -40 : i === o.count ? W + 40 : i * step + (rnd() - 0.5) * step * 0.3,
    o.valley + rnd() * o.vSpread,
  ]);

  const ridge: Pt[] = [];
  const faces: { lit: string; shade: string }[] = [];

  peaks.forEach((p, i) => {
    const left = subdivide(valleys[i], p, rnd, 3, 0.35);
    const right = subdivide(p, valleys[i + 1], rnd, 3, 0.35);
    const litSide = p[0] < SUN_X; // sun sits in the middle: lit face points toward it
    const spine: Pt = [p[0] + (litSide ? 30 : -30), H];

    ridge.push(...(i === 0 ? left : left.slice(1)), ...right.slice(1));
    faces.push(
      litSide
        ? { lit: fmt([...right, spine]), shade: fmt([...left, spine]) }
        : { lit: fmt([...left, spine]), shade: fmt([...right, spine]) },
    );
  });

  const line = ridge.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
  return {
    ridge: `M${line}`,
    path: `M${line} L${W + 40} ${H} L-40 ${H} Z`,
    faces,
  };
}

const LAYERS = [
  {
    id: "far",
    range: makeRange({ seed: 3, count: 6, top: 175, spread: 70, valley: 300, vSpread: 40 }),
    fill: ["#7a5f58", "#4a3a36"],
    lit: "rgba(255,206,160,0.30)",
    shade: "rgba(20,14,14,0.32)",
    rim: "rgba(255,226,190,0.55)",
    haze: 0.38,
  },
  {
    id: "mid",
    range: makeRange({ seed: 9, count: 5, top: 245, spread: 70, valley: 360, vSpread: 40 }),
    fill: ["#46362f", "#261d1a"],
    lit: "rgba(246,190,140,0.24)",
    shade: "rgba(10,8,8,0.38)",
    rim: "rgba(255,214,170,0.4)",
    haze: 0.22,
  },
  {
    id: "near",
    range: makeRange({ seed: 21, count: 4, top: 335, spread: 50, valley: 435, vSpread: 30 }),
    fill: ["#211a17", "#0e0c0b"],
    lit: "rgba(240,180,130,0.16)",
    shade: "rgba(0,0,0,0.45)",
    rim: "rgba(255,206,160,0.28)",
    haze: 0.08,
  },
] as const;

const STARS = (() => {
  const rnd = rng(11);
  return Array.from({ length: 40 }, () => ({
    x: rnd() * 100,
    y: rnd() * 40,
    r: 0.6 + rnd() * 1,
    o: 0.2 + rnd() * 0.45,
  }));
})();

function Mountains() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] w-full sm:h-[440px] md:h-[540px]"
    >
      <defs>
        {LAYERS.map((l) => (
          <g key={l.id}>
            <linearGradient id={`fill-${l.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={l.fill[0]} />
              <stop offset="1" stopColor={l.fill[1]} />
            </linearGradient>
            <linearGradient id={`haze-${l.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0a874" stopOpacity="0" />
              <stop offset="1" stopColor="#f0a874" stopOpacity={l.haze} />
            </linearGradient>
            <clipPath id={`clip-${l.id}`}>
              <path d={l.range.path} />
            </clipPath>
          </g>
        ))}
      </defs>

      {LAYERS.map((l) => (
        <g key={l.id}>
          <path d={l.range.path} fill={`url(#fill-${l.id})`} />
          <g clipPath={`url(#clip-${l.id})`}>
            {l.range.faces.map((f, i) => (
              <g key={i}>
                <polygon points={f.shade} fill={l.shade} />
                <polygon points={f.lit} fill={l.lit} />
              </g>
            ))}
            {/* Atmospheric haze for depth */}
            <rect x="0" y="0" width={W} height={H} fill={`url(#haze-${l.id})`} />
          </g>
          {/* Rim light along the ridge */}
          <path d={l.range.ridge} fill="none" stroke={l.rim} strokeWidth="1.1" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

function Scene() {
  return (
    <>
      {/* Dusk sky: charcoal into warm amber at the horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#151413_0%,#1c1917_38%,#33251f_66%,#7a4a33_88%,#c98a5e_100%)]"
      />
      {/* Sun glow behind the peaks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_40%_at_50%_78%,rgba(255,200,150,0.55),rgba(214,128,84,0.22)_45%,transparent_72%)]"
      />
      {/* Stars */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
        {STARS.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#fff4e3" opacity={s.o} />
        ))}
      </svg>
      <Mountains />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Headline mascots (replace a letter, Jitter-style)                   */
/* ------------------------------------------------------------------ */

/** Little Deula (Kalinga temple) character: stands in for the "i" in "Odisha's". */
function DeulaMascot({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, y: 24, rotate: -10, scale: 0.8 }}
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: [0, -6, 0], rotate: [-3, 3, -3], scale: 1 }
      }
      transition={
        reduce
          ? undefined
          : {
            opacity: { duration: 0.5, delay: 0.5 },
            scale: { type: "spring", stiffness: 220, damping: 14, delay: 0.5 },
            y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            rotate: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          }
      }
      className="relative -mx-[0.04em] inline-block h-[1.02em] w-[0.78em] origin-bottom translate-y-[0.07em] align-baseline"
    >
      <svg viewBox="0 0 80 104" className="size-full overflow-visible" fill="none">
        <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          {/* legs */}
          <path d="M32 84v14M48 84v14M26 99h10M44 99h10" />
          {/* arms up */}
          <path d="M22 62 8 44M58 62 72 44" />
          <circle cx="6.5" cy="41" r="4" fill={CREAM} />
          <circle cx="73.5" cy="41" r="4" fill={CREAM} />
          {/* tower */}
          <path d="M40 9C53 24 59 46 59 84H21C21 46 27 24 40 9Z" fill={CREAM} />
          <circle cx="40" cy="5.5" r="3.2" fill={CREAM} />
          <path d="M32 32h16M29 42h22" />
        </g>
        {/* face */}
        <circle cx="33.5" cy="58" r="2.6" fill={INK} />
        <circle cx="46.5" cy="58" r="2.6" fill={INK} />
        <path d="M33 68q7 6 14 0" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </motion.span>
  );
}

/** Little Konark wheel character: stands in for the "o" in "icons". */
function WheelMascot({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, y: 24, rotate: 10, scale: 0.8 }}
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: [0, -5, 0], rotate: [3, -3, 3], scale: 1 }
      }
      transition={
        reduce
          ? undefined
          : {
            opacity: { duration: 0.5, delay: 0.7 },
            scale: { type: "spring", stiffness: 220, damping: 14, delay: 0.7 },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
            rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
          }
      }
      className="relative -mx-[0.02em] inline-block h-[0.98em] w-[0.88em] origin-bottom translate-y-[0.07em] align-baseline"
    >
      <svg viewBox="0 0 96 104" className="size-full overflow-visible" fill="none">
        <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          {/* legs */}
          <path d="M38 80v16M58 80v16M32 97h10M54 97h10" />
          {/* arms */}
          <path d="M14 50 3 34M82 50 93 34" />
          <circle cx="2" cy="31" r="4" fill={CREAM} />
          <circle cx="94" cy="31" r="4" fill={CREAM} />
          {/* wheel */}
          <circle cx="48" cy="48" r="33" fill={CREAM} />
        </g>
        {/* spokes */}
        <g stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.35">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1="48"
              y1="48"
              x2={48 + 31 * Math.cos((a * Math.PI) / 180)}
              y2={48 + 31 * Math.sin((a * Math.PI) / 180)}
            />
          ))}
        </g>
        {/* hub + face */}
        <circle cx="48" cy="48" r="17" fill={CREAM} stroke={INK} strokeWidth="3" />
        <circle cx="42" cy="44" r="2.4" fill={INK} />
        <circle cx="54" cy="44" r="2.4" fill={INK} />
        <path d="M41.5 53q6.5 6 13 0" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Product preview window (cropped at the bottom of the hero)         */
/* ------------------------------------------------------------------ */

function PreviewWindow() {
  const tiles = ICONS.slice(0, 32);

  return (
    <div className="relative h-[250px] overflow-hidden rounded-t-[1.1rem] border border-b-0 border-white/15 bg-white/5 p-2 shadow-[0_-10px_80px_-10px_rgba(240,168,116,0.35)] backdrop-blur-xl sm:h-[330px] sm:rounded-t-[1.5rem] sm:p-3 md:h-[400px]">
      <div className="h-full overflow-hidden rounded-t-[0.8rem] bg-[#1f1f1f] ring-1 ring-white/10 sm:rounded-t-[1.1rem]">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex h-8 min-w-0 max-w-sm flex-1 items-center gap-2 rounded-lg bg-white/5 px-3 text-xs text-neutral-500">
            <Search aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">Search icons</span>
          </div>
          <span className="ml-auto hidden shrink-0 text-xs text-neutral-500 sm:block">
            {ICONS.length} icons
          </span>
        </div>

        {/* Grid */}
        <div className="p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <span className="text-sm font-semibold text-neutral-100">All icons</span>
            <span className="text-xs text-neutral-500 sm:hidden">{ICONS.length}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 md:grid-cols-8">
            {tiles.map((icon, i) => (
              <div
                key={icon.name}
                className={`flex aspect-[1/0.9] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border px-1 ${i === 1
                  ? "border-[#f6dfc4]/70 bg-[#2e2a26]"
                  : "border-white/10 bg-[#262626]"
                  }`}
              >
                <IconGlyph
                  icon={icon}
                  strokeWidth={1.5}
                  className="size-6 text-[#f6dfc4] sm:size-7"
                />
                <span className="w-full truncate text-center text-[10px] text-neutral-400 capitalize sm:text-[11px]">
                  {icon.name.replaceAll("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom blend: progressive blur (mobile only) + dark fade (all sizes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_10%,transparent)] sm:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/75 to-transparent sm:h-2/5 sm:via-[#1a1a1a]/50"
      />
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
      className="relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[#1a1a1a] px-5 pt-28 sm:px-6 sm:pt-36"
    >
      <Scene />

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
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-[#262626]/80 px-3.5 text-[13px] font-medium text-neutral-300 backdrop-blur transition-colors hover:bg-[#2e2e2e] focus-visible:ring-2 focus-visible:ring-[#f6dfc4]/60 focus-visible:outline-none"
          >
            <GitBranchPlus aria-hidden className="size-3.5 text-[#f6dfc4]" />
            {hero.badges.github}
            <ArrowRight aria-hidden className="size-3.5 opacity-60" />
          </Link>
        </motion.div>

        {/* Jitter-style headline: heavy, tight, two lines, mascots replace letters */}
        <h1 className="mt-6 sm:mt-8" aria-label="Odisha's culture, in 24px icons.">
          <motion.span
            variants={rise}
            aria-hidden="true"
            className="block text-[clamp(2.35rem,9.4vw,7.6rem)] leading-[0.98] font-black tracking-[-0.065em] text-balance text-[#f5f1ea]"
          >
            <span className="block whitespace-nowrap">
              Od
              <DeulaMascot reduce={reduce} />
              sha&apos;s culture,
            </span>
            <span className="block whitespace-nowrap text-[#f6dfc4]">
              in 24px ic
              <WheelMascot reduce={reduce} />
              ns.
            </span>
          </motion.span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-5 max-w-xl text-base leading-relaxed text-balance text-neutral-300/80 sm:mt-7 sm:text-xl"
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
              className="group flex rounded-full bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur focus-visible:ring-2 focus-visible:ring-[#f6dfc4] focus-visible:outline-none sm:inline-flex"
            >
              <span className="flex h-12 flex-1 items-center justify-between gap-4 rounded-full bg-gradient-to-b from-[#fbeedb] to-[#e8c89f] pr-1.5 pl-6 text-base font-medium text-[#2a1a10] shadow-[0_10px_28px_-8px_rgba(240,168,116,0.6),inset_0_1px_0_rgba(255,255,255,0.7)] sm:flex-none sm:justify-start">
                {hero.ctas.install}
                <span className="grid size-9 place-items-center rounded-full bg-[#1a1a1a] text-[#f6dfc4] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden className="size-4" />
                </span>
              </span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/icons"
              className="flex h-14 items-center justify-center rounded-full border border-white/10 bg-[#262626]/90 px-8 text-base font-medium text-neutral-100 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7)] backdrop-blur transition-colors hover:bg-[#2e2e2e] focus-visible:ring-2 focus-visible:ring-[#f6dfc4] focus-visible:outline-none"
            >
              {hero.ctas.browse}
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust row */}
        <motion.ul
          variants={rise}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-300/90 sm:mt-9 sm:gap-x-0 sm:text-[15px]"
        >
          {trust.map((t, i) => (
            <li
              key={t.text}
              className={`flex items-center gap-2 sm:px-5 ${i > 0 ? "sm:border-l sm:border-white/15" : ""
                }`}
            >
              <t.icon
                aria-hidden
                className={`size-4 text-[#f6dfc4] ${t.fill ? "fill-[#f6dfc4]" : ""}`}
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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-background via-background/80 to-transparent sm:h-30"
      />
    </section>
  );
}

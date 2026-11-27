"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import { Inter_Tight } from "next/font/google";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { Download, MousePointer2, Star } from "lucide-react";

import { SITE } from "@/data/site";
import { Icon, iconsByName } from "@/lib/icons";
import { InstallBox } from "./install-box";

/* Bold, tight sans for the whole hero */
const sans = Inter_Tight({ subsets: ["latin"], weight: ["500", "700"] });

const HERO_IMAGE = "/home-bg.jpeg";

/* Must match the background of the section that follows the hero */
const PAGE_BG = "#141210";

const EASE = [0.22, 1, 0.36, 1] as const;


/*
 * Icons that appear when the toggle is on, mirrored on both sides.
 * Large screens: x and y are percentages of the headline area, beside the title.
 * Smaller screens have no room there, so they form an arc above it: mx across, my upwards.
 */
const REVEAL = [
  { name: "home", x: 16, y: 12, mx: 25, my: "-5rem", size: "size-6 lg:size-10", opacity: 0.75 },
  { name: "search", x: 8, y: 50, mx: 8, my: "-4rem", size: "size-6 lg:size-10", opacity: 0.45 },
  { name: "download", x: 4, y: 92, mx: 42, my: "-5.5rem", size: "size-6 lg:size-7", opacity: 0.6 },
  { name: "bell", x: 84, y: 12, mx: 75, my: "-5rem", size: "size-6 lg:size-10", opacity: 0.75 },
  { name: "user", x: 92, y: 50, mx: 92, my: "-4rem", size: "size-6 lg:size-10", opacity: 0.45 },
  { name: "settings", x: 96, y: 92, mx: 58, my: "-5.5rem", size: "size-6 lg:size-7", opacity: 0.6 },
];

/* Soft start and soft landing for the knob */
const SMOOTH = [0.65, 0, 0.35, 1] as const;

/** How far a finger or mouse must move to count as a swipe, in pixels */
const SWIPE = 12;

function IconReveal({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {on &&
          REVEAL.map((item, i) => {
            const icon = iconsByName[item.name];
            if (!icon) return null;
            /* Each icon drifts a short way outwards from the headline */
            const hidden = reduce
              ? { opacity: 0 }
              : { opacity: 0, x: item.x < 50 ? 24 : -24, scale: 0.85, filter: "blur(8px)" };

            return (
              <motion.span
                key={item.name}
                initial={hidden}
                animate={{ opacity: item.opacity, x: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ ...hidden, transition: { duration: reduce ? 0.2 : 0.3, ease: "easeIn" } }}
                transition={
                  reduce
                    ? { duration: 0.2 }
                    : { duration: 0.7, ease: EASE, delay: 0.15 + (i % 3) * 0.07 }
                }
                className="absolute top-[var(--my)] left-[var(--mx)] text-white lg:top-[var(--y)] lg:left-[var(--x)]"
                style={
                  {
                    "--x": `${item.x}%`,
                    "--y": `${item.y}%`,
                    "--mx": `${item.mx}%`,
                    "--my": item.my,
                  } as CSSProperties
                }
              >
                {/* Centred on its point; kept separate from the animated transform */}
                <span className="block -translate-x-1/2 -translate-y-1/2">
                  <Icon def={icon} strokeWidth={1.5} className={item.size} />
                </span>
              </motion.span>
            );
          })}
      </AnimatePresence>
    </span>
  );
}

/* The toggle switch that stands in for the "o" in "Icons". Click, tap, swipe or use the keyboard. */
function ToggleO({
  on,
  touched,
  onChange,
  reduce,
}: {
  on: boolean;
  touched: boolean;
  onChange: (next: boolean) => void;
  reduce: boolean;
}) {
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);

  const handleDown = (e: PointerEvent<HTMLButtonElement>) => {
    startX.current = e.clientX;
    swiped.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (startX.current === null) return;
    const distance = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(distance) > SWIPE) {
      swiped.current = true;
      onChange(distance > 0);
    }
  };

  const handleClick = () => {
    /* A swipe already set the value, so ignore the click that follows it */
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    onChange(!on);
  };

  /* Until someone uses it, the knob leans over a few times as a hint */
  const nudge = !touched && !reduce;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Show icons"
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerCancel={() => (startX.current = null)}
      onClick={handleClick}
      className="relative mr-[0.015em] ml-[0.065em] inline-block h-[0.58em] w-[1.15em] cursor-pointer touch-pan-y rounded-full bg-black shadow-[0_0.08em_0.25em_rgba(0,0,0,0.6)] ring-1 ring-white/40 transition-shadow duration-300 select-none hover:ring-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {/* Inner hole, so it still reads as an "o" */}
      <span className="absolute inset-[0.13em] rounded-full bg-black ring-1 ring-white/25" />
      {/* Knob: only its position animates, which keeps the movement smooth */}
      <motion.span
        initial={false}
        animate={{ x: on ? "0.57em" : nudge ? ["0em", "0.08em", "0em"] : "0em" }}
        transition={
          reduce
            ? { duration: 0 }
            : nudge
              ? { duration: 1.1, ease: "easeInOut", delay: 1.5, repeat: 2, repeatDelay: 1.8 }
              : { duration: 0.55, ease: SMOOTH }
        }
        className="absolute top-[0.04em] left-[0.04em] block will-change-transform"
      >
        {/* Sized on an inner element so "em" matches the headline */}
        <span className="block size-[0.5em] rounded-full bg-gradient-to-br from-white to-neutral-300 shadow-lg" />
      </motion.span>
    </button>
  );
}

export function Hero() {
  const { hero } = SITE;
  const reduce = useReducedMotion() ?? false;
  const [iconsOn, setIconsOn] = useState(false);
  const [touched, setTouched] = useState(false);

  const toggleIcons = (next: boolean) => {
    setTouched(true);
    setIconsOn(next);
  };

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
  ].filter(Boolean) as { icon: typeof Star; text: string; fill?: boolean }[];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`${sans.className} relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[#141210] px-4 pt-28 pb-16 sm:px-6`}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-bottom"
      />

      {/* Dark wash, strongest behind the headline, so the text stands out from the sky */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/60 to-black/25" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_50%_42%,rgba(0,0,0,0.45),transparent_100%)]" />

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
        {/* Headline */}
        <motion.h1 id="hero-title" variants={rise} className="relative w-full font-bold text-white">
          <span className="sr-only">Free Odisha Icons, Open-source SVG Set</span>

          <IconReveal on={iconsOn} reduce={reduce} />

          <span className="flex flex-col items-center">
            <span aria-hidden="true" className="relative block text-[clamp(2rem,min(8.5vw,7.5svh),4.5rem)] leading-none tracking-[-0.04em] whitespace-nowrap">
              Free Odisha
              <MousePointer2
                className="absolute top-1/2 left-full ml-2 size-[0.7em] -translate-y-1/2 fill-white sm:ml-4"
              />
            </span>

            <span className="block text-[clamp(5rem,min(23vw,23svh),14rem)] leading-[0.95] tracking-[-0.05em] whitespace-nowrap">
              <span aria-hidden="true">Ic</span>
              <ToggleO on={iconsOn} touched={touched} onChange={toggleIcons} reduce={reduce} />
              <span aria-hidden="true">ns</span>
            </span>

            <span aria-hidden="true" className="mt-3 block text-[clamp(1.25rem,min(6vw,4.8svh),2.75rem)] leading-none font-medium tracking-[-0.03em] whitespace-nowrap text-neutral-300 sm:mt-4">
              Open-source SVG Set
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={rise}
          className="mt-6 max-w-md text-sm leading-relaxed font-medium text-balance text-neutral-400 sm:text-base lg:max-w-lg lg:text-[17px]"
        >
          {hero.lead}
        </motion.p>

        {/* CTA */}
        <motion.div variants={rise} className="mt-8 flex w-full max-w-xs flex-col grayscale sm:max-w-md">
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

        {/* Stars and installs, shown only when there is data */}
        {trust.length > 0 && (
          <motion.ul
            variants={rise}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-neutral-300"
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
        )}

      </motion.div>
    </section>
  );
}

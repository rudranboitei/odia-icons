"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy, Search } from "lucide-react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Time each tab stays on screen while the section autoplays. */
const STEP_MS = 6500;

const BG = "/home-bg.jpeg";
const BG_POS = ["14% 64%", "52% 72%", "90% 68%"];

/* ------------------------------------------------------------------ */
/* Your icons, loaded from the built SVGs in /public.                  */
/* If your folder differs, change ICON_BASE only.                      */
/* ------------------------------------------------------------------ */
const ICON_BASE = "/svg/outline";

type Motif = (props: { className?: string }) => ReactNode;

/** Renders an SVG as a CSS mask so it follows the text color. */
function makeIcon(name: string): Motif {
  const url = `url(${ICON_BASE}/${name}.svg)`;
  return function Icon({ className }) {
    return (
      <span
        aria-hidden
        className={cn("inline-block bg-current", className)}
        style={{
          WebkitMaskImage: url,
          maskImage: url,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  };
}

const ICONS: { Icon: Motif; label: string }[] = [
  { Icon: makeIcon("home"), label: "Home" },
  { Icon: makeIcon("search"), label: "Search" },
  { Icon: makeIcon("message"), label: "Message" },
  { Icon: makeIcon("lock"), label: "Lock" },
  { Icon: makeIcon("bell"), label: "Bell" },
];

/* ------------------------------------------------------------------ */
/* Simple light card                                                  */
/* ------------------------------------------------------------------ */

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[22rem] rounded-xl border border-white/10 bg-[#1f1d1a] p-3 shadow-sm sm:max-w-sm sm:p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function Tile({ Icon, label, selected }: { Icon: Motif; label: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-lg border px-1 py-2.5 sm:py-3",
        selected ? "border-[#f3e0c9]/50 bg-white/10" : "border-white/10 bg-white/5"
      )}
    >
      <Icon className={cn("size-8 sm:size-9", selected ? "text-[#ffffff]" : "text-neutral-400")} />
      <span className="text-[10px] text-neutral-400 sm:text-xs">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scenes                                                             */
/* ------------------------------------------------------------------ */

/** 1. Pick */
function SceneBrowse() {
  return (
    <Card>
      <div className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-neutral-400">
        <Search aria-hidden className="size-3.5 shrink-0" />
        <span className="truncate">{SITE.explorer.searchPlaceholder}</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {ICONS.map(({ Icon, label }, i) => (
          <Tile key={label} Icon={Icon} label={label} selected={i === 0} />
        ))}
        <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 text-neutral-500">
          <span className="text-lg leading-none">+</span>
          <span className="text-[10px] sm:text-xs">More</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="font-medium text-[#ffffff]">{ICONS[0].label}</span>
        <span className="font-mono">24 × 24 · 2 stroke</span>
      </div>
    </Card>
  );
}

/** 2. Copy */
function SceneCopy() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCopied(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["SVG", "JSX", "React", "Data URI"];
  const name = ICONS[0].label;

  return (
    <Card>
      <div className="flex items-center gap-1 text-[11px] font-medium sm:text-xs">
        {tabs.map((t) => (
          <span
            key={t}
            className={cn(
              "rounded-md px-2 py-1",
              t === "React" ? "bg-white/10 text-[#ffffff]" : "text-neutral-500"
            )}
          >
            {t}
          </span>
        ))}
        <span
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors duration-300",
            copied ? "border-[#f3e0c9] bg-[#f3e0c9] text-[#1a1713]" : "border-white/10 text-neutral-300"
          )}
        >
          {copied ? <Check aria-hidden className="size-3" strokeWidth={3} /> : <Copy aria-hidden className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </span>
      </div>

      <pre className="mt-3 overflow-hidden rounded-lg bg-black/30 p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-200 sm:text-xs">
        <code>
          <span className="text-neutral-500">$ npm install {SITE.npmPackage}</span>
          {"\n\n"}
          {`import { ${name} } from`}
          {"\n  "}
          {`"${SITE.npmPackage}"`}
          {"\n\n"}
          {`<${name} className="size-6" />`}
        </code>
      </pre>
    </Card>
  );
}

/** 3. Ship */
function SceneShip() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
        className="w-full max-w-[22rem] sm:max-w-sm"
      >
        <Card>
          <p className="text-[11px] font-semibold text-[#ffffff]">Explore Odisha</p>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {ICONS.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 sm:size-12">
                  <Icon className="size-6 text-[#ffffff] sm:size-7" />
                </div>
                <span className="text-[9px] text-neutral-400 sm:text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <span className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-[#1f1d1a] px-3 py-1 text-[11px] whitespace-nowrap text-neutral-200 shadow-sm sm:bottom-1">
        <Check aria-hidden className="size-3" strokeWidth={3} />
        No attribution needed
      </span>
    </div>
  );
}

const SCENES = [SceneBrowse, SceneCopy, SceneShip];

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export function Steps() {
  const { steps } = SITE;
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  const running = auto && inView && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.items.length), STEP_MS);
    return () => clearTimeout(t);
  }, [running, active, steps.items.length]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const Scene = SCENES[active % SCENES.length];
  const item = steps.items[active];

  return (
    <section
      aria-labelledby="steps-title"
      className="bg-[#141210] px-4 py-16 text-[#ffffff] sm:px-6 sm:py-24"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">
        <p className="flex items-center gap-2 text-sm text-neutral-400">
          <span aria-hidden className="size-2 rounded-full bg-[#f3e0c9]" />
          {steps.eyebrow}
        </p>
        <h2
          id="steps-title"
          className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
        >
          <span className="text-[#ffffff]">{steps.title}</span>
          {steps.accent ? (
            <>
              {" "}
              <span className="text-neutral-500">{steps.accent}</span>
            </>
          ) : null}
        </h2>

        <div ref={ref} className="mt-10 sm:mt-14">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label={steps.title}
            className="flex gap-1 overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {steps.items.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  id={`steps-tab-${i}`}
                  aria-selected={on}
                  aria-controls="steps-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "relative shrink-0 cursor-pointer px-3 py-3 text-[15px] whitespace-nowrap outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/30",
                    on ? "text-[#ffffff]" : "text-neutral-500 hover:text-neutral-300"
                  )}
                >
                  {s.title}
                  {on && (
                    <motion.span
                      key={`${i}-${running}`}
                      aria-hidden
                      initial={{ scaleX: auto && !reduce ? 0 : 1 }}
                      animate={{ scaleX: auto && !reduce ? (running ? 1 : 0) : 1 }}
                      transition={{ duration: running ? STEP_MS / 1000 : 0.2, ease: "linear" }}
                      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-[#f3e0c9]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            id="steps-panel"
            role="tabpanel"
            aria-labelledby={`steps-tab-${active}`}
            className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-0"
          >
            {/* Image + scene */}
            <div
              aria-hidden
              className="relative aspect-[1.1/1] w-full overflow-hidden rounded-[4px] bg-neutral-800 sm:aspect-[1.3/1]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={BG}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="scale-[1.9] object-cover"
                    style={{
                      objectPosition: BG_POS[active % BG_POS.length],
                      transformOrigin: BG_POS[active % BG_POS.length],
                    }}
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
                    <Scene />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Copy */}
            <div className="md:pl-16 lg:pl-24">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="text-sm text-neutral-400">{item.title}</p>
                  <p className="mt-3 max-w-[22rem] text-xl leading-snug text-[#ffffff] sm:text-[22px]">
                    {item.description}
                  </p>
                  <Link
                    href={SITE.links.icons}
                    className="group/cta mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-black px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Browse all Odisha icons
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

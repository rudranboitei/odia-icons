"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy, Search } from "lucide-react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { Deepa, type Motif } from "./odia-motifs";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Time each step stays on screen while the section autoplays. */
const STEP_MS = 6500;

/* ------------------------------------------------------------------ */
/* Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Window({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[22rem] rounded-2xl border border-white/10 bg-[#1d1a18] p-3 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.85)] sm:max-w-sm sm:p-4",
        className
      )}
    >
      <div className="mb-3 flex gap-1.5" aria-hidden>
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
      </div>
      {children}
    </div>
  );
}

function Tile({ Icon, label, selected }: { Icon: Motif; label: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 sm:py-3",
        selected ? "border-primary/70 bg-primary/10" : "border-white/10 bg-white/[0.03]"
      )}
    >
      <Icon className={cn("size-8 sm:size-10", selected ? "text-foreground" : "text-foreground/65")} />
      <span className="text-[10px] text-muted-foreground sm:text-xs">{label}</span>
      {selected && (
        <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scenes: a small, honest picture of what each step looks like       */
/* ------------------------------------------------------------------ */

/** 1. Pick: the icon browser with one motif selected. */
function SceneBrowse() {
  return (
    <Window>
      <div className="flex h-9 items-center gap-2 rounded-lg bg-white/[0.05] px-3 text-xs text-muted-foreground">
        <Search aria-hidden className="size-3.5 shrink-0" />
        <span className="truncate">{SITE.explorer.searchPlaceholder}</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Tile Icon={Deepa} label="Deepa" selected />
        <Tile Icon={Deepa} label="Deepa" />
        <Tile Icon={Deepa} label="Deepa" />
        <Tile Icon={Deepa} label="Deepa" />
        <Tile Icon={Deepa} label="Deepa" />
        <Tile Icon={Deepa} label="Deepa" />
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="font-medium text-foreground/80">Deepa</span>
        <span className="font-mono">24 × 24 · 1.5 stroke</span>
      </div>
    </Window>
  );
}

/** 2. Copy: the export panel, with the copy button confirming itself. */
function SceneCopy() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCopied(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const pkg = `"${SITE.npmPackage}"`;
  const tabs = ["SVG", "JSX", "React", "Data URI"];

  return (
    <Window>
      <div className="flex items-center gap-1 text-[11px] font-medium sm:text-xs">
        {tabs.map((t) => (
          <span
            key={t}
            className={cn(
              "rounded-md px-2 py-1",
              t === "React" ? "bg-white/10 text-foreground" : "text-muted-foreground"
            )}
          >
            {t}
          </span>
        ))}
        <span
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors duration-300",
            copied
              ? "border-primary/60 bg-primary/10 text-primary"
              : "border-white/10 text-foreground/80"
          )}
        >
          {copied ? <Check aria-hidden className="size-3" /> : <Copy aria-hidden className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </span>
      </div>

      <pre className="mt-3 overflow-hidden rounded-lg bg-black/30 p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-foreground/85 sm:text-xs">
        <code>
          <span className="text-muted-foreground">$ npm install {SITE.npmPackage}</span>
          {"\n\n"}
          <span className="text-primary">import</span> {"{ Deepa }"}{" "}
          <span className="text-primary">from</span>
          {"\n  "}
          <span className="text-[#e9b98a]">{pkg}</span>
          {"\n\n"}
          {"<"}
          <span className="text-primary">Deepa</span>
          {" className="}
          <span className="text-[#e9b98a]">{'"size-6"'}</span>
          {" />"}
        </code>
      </pre>
    </Window>
  );
}

/** 3. Ship: the same motifs, in a phone UI and on a poster. */
function SceneShip() {
  const apps: { Icon: Motif; label: string }[] = [
    { Icon: Deepa, label: "Deepa" },
    { Icon: Deepa, label: "Deepa" },
    { Icon: Deepa, label: "Deepa" },
    { Icon: Deepa, label: "Deepa" },
  ];
  const tabs: { Icon: Motif; on?: boolean }[] = [
    { Icon: Deepa, on: true },
    { Icon: Deepa },
    { Icon: Deepa },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-3 sm:gap-5">
      {/* Poster */}
      <motion.div
        initial={{ opacity: 0, y: 18, rotate: -9 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        className="w-[7.25rem] rounded-xl bg-gradient-to-b from-[#fbeedb] to-[#e8c89f] p-3 text-[#2a1a10] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] sm:w-40 sm:p-4 [&_.stroke-primary]:stroke-[#b4693b]"
      >
        <Deepa className="mx-auto size-[4.25rem] sm:size-24" />
        <p className="mt-2 text-center text-lg font-black tracking-tight sm:text-2xl">Odisha</p>
        <p className="mt-0.5 text-center text-[9px] font-medium tracking-[0.18em] uppercase opacity-70 sm:text-[10px]">
          Deepa · Home
        </p>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
        className="w-[8.75rem] rounded-[1.5rem] border border-white/15 bg-[#1d1a18] p-2 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.9)] sm:w-44"
      >
        <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-white/15" aria-hidden />
        <p className="px-1 text-[11px] font-semibold text-foreground">Explore Odisha</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {apps.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] py-2"
            >
              <Icon className="size-7 text-foreground/80 sm:size-8" />
              <span className="text-[9px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-around rounded-xl bg-white/[0.06] py-2">
          {tabs.map(({ Icon, on }, i) => (
            <Icon key={i} className={cn("size-5", on ? "text-primary" : "text-foreground/45")} />
          ))}
        </div>
      </motion.div>

      <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] whitespace-nowrap text-foreground/85 backdrop-blur sm:bottom-4">
        <Check aria-hidden className="size-3 text-primary" strokeWidth={3} />
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

  // Autoplay only while visible, never with reduced motion, and never after the visitor takes over.
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

  return (
    <section aria-labelledby="steps-title" className="px-5 py-14 sm:px-6 sm:py-16 lg:py-24">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHeader
          titleId="steps-title"
          eyebrow={steps.eyebrow}
          title={steps.title}
          accent={steps.accent}
          description={steps.description}
        />

        <div
          ref={ref}
          className="mt-10 grid items-center gap-8 sm:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
        >
          {/* Steps */}
          <div>
            <ol className="flex flex-col">
              {steps.items.map((item, i) => {
                const on = i === active;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={on ? "step" : undefined}
                      className="group relative block w-full cursor-pointer rounded-lg py-4 pr-2 pl-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-5"
                    >
                      {/* Rail + progress */}
                      <span aria-hidden className="absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-white/10" />
                      {on && (
                        <motion.span
                          key={`${i}-${running}`}
                          aria-hidden
                          initial={{ scaleY: auto && !reduce ? 0 : 1 }}
                          animate={{ scaleY: auto && !reduce ? (running ? 1 : 0) : 1 }}
                          transition={{ duration: running ? STEP_MS / 1000 : 0.2, ease: "linear" }}
                          className="absolute top-2 bottom-2 left-0 w-0.5 origin-top rounded-full bg-primary"
                        />
                      )}

                      <span className="flex items-baseline gap-3">
                        <span
                          className={cn(
                            "w-5 font-mono text-xs tabular-nums transition-colors duration-300",
                            on ? "text-primary" : "text-muted-foreground/60"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-lg font-semibold tracking-tight transition-colors duration-300 sm:text-xl",
                            on ? "text-foreground" : "text-foreground/55 group-hover:text-foreground/85"
                          )}
                        >
                          {item.title}
                        </span>
                      </span>

                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <span className="min-h-0 overflow-hidden">
                          <span className="mt-2 block max-w-sm pl-8 text-[15px] leading-relaxed text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <Link
              href={SITE.links.icons}
              className="group/cta mt-4 ml-6 inline-flex min-h-10 items-center gap-1.5 rounded-full text-[15px] font-medium text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Browse all Odisha icons
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Stage (mobile: above the list) */}
          <div
            aria-hidden
            className="relative order-first h-[19rem] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(70%_60%_at_30%_15%,rgba(246,223,196,0.10),transparent_70%)] sm:h-[24rem] lg:order-none lg:h-[27rem]"
          >
            <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(75%_75%_at_50%_50%,black,transparent)]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute inset-0 grid place-items-center p-4 sm:p-6"
              >
                <Scene />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

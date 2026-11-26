"use client";

import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Deepa } from "./odia-motifs";

/**
 * Animated visuals for the four feature cards, built from the custom Odisha
 * motifs. Every loop runs only while the card is on screen, and none run
 * when the visitor prefers reduced motion.
 */

type SceneProps = { active: boolean; reduce: boolean };

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* 1. Rooted: Deepa at the centre, motifs floating around it           */
/* ------------------------------------------------------------------ */

function FloatTile({
  children,
  className,
  delay,
  loop,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  loop: boolean;
}) {
  return (
    <motion.span
      animate={loop ? { y: [0, -7, 0] } : { y: 0 }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "absolute grid size-14 place-items-center rounded-2xl border border-white/10 bg-[#1d1a18] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] sm:size-16",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

function RootedScene({ active, reduce }: SceneProps) {
  const loop = active && !reduce;

  return (
    <div className="relative size-full">
      {/* Oversized, faint Deepa turning slowly behind everything */}
      <motion.div
        aria-hidden
        animate={{ rotate: loop ? 360 : 0 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -top-14 -right-14 opacity-[0.12]"
      >
        <Deepa className="size-56 text-foreground sm:size-64" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(38%_50%_at_50%_58%,rgba(246,200,150,0.20),transparent)]" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.94 }}
        animate={active || reduce ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute inset-0 grid place-items-center"
      >
        <Deepa className="size-32 text-foreground sm:size-40" />
      </motion.div>

      <FloatTile loop={loop} delay={0} className="bottom-[16%] left-[9%]">
        <Deepa className="size-9 text-foreground sm:size-10" />
      </FloatTile>
      <FloatTile loop={loop} delay={1.2} className="top-[14%] left-[14%] hidden sm:grid">
        <Deepa className="size-9 text-foreground sm:size-10" />
      </FloatTile>
      <FloatTile loop={loop} delay={0.6} className="right-[10%] bottom-[14%]">
        <Deepa className="size-9 text-foreground sm:size-10" />
      </FloatTile>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Grid: a motif sitting on its 24 x 24 grid with keylines          */
/* ------------------------------------------------------------------ */

function GridScene({ active, reduce }: SceneProps) {
  const loop = active && !reduce;
  const ticks = Array.from({ length: 25 }, (_, i) => i * 2);

  return (
    <div className="relative grid size-full place-items-center">
      <div className="relative size-40 sm:size-48">
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" aria-hidden>
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: active || reduce ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="0.14"
          >
            {ticks.map((v) => (
              <g key={v}>
                <line x1={v} y1="0" x2={v} y2="48" />
                <line x1="0" y1={v} x2="48" y2={v} />
              </g>
            ))}
          </motion.g>

          {/* Live-area box, marching dashes */}
          <motion.rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="1.5"
            fill="none"
            strokeWidth="0.3"
            strokeDasharray="1.2 1.2"
            className="stroke-primary"
            animate={loop ? { strokeDashoffset: [0, -2.4] } : { strokeDashoffset: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
          {/* Circular keyline */}
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            strokeWidth="0.25"
            strokeDasharray="0.8 1.4"
            className="stroke-primary opacity-60"
          />
          {/* Scan line */}
          {loop && (
            <motion.rect
              x="0"
              width="48"
              height="0.5"
              className="fill-primary"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, 47.5], opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
            />
          )}
        </svg>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={active || reduce ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="absolute inset-0"
        >
          <Deepa className="size-full text-foreground" />
        </motion.div>
      </div>

      <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-foreground/85 backdrop-blur sm:top-4 sm:left-4 sm:text-[11px]">
        24 × 24
      </span>
      <span className="absolute right-3 bottom-3 rounded-full border border-white/10 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-foreground/85 backdrop-blur sm:right-4 sm:bottom-4 sm:text-[11px]">
        1.5 stroke · round caps
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Copy as code: the four export formats, cycling                   */
/* ------------------------------------------------------------------ */

const FORMATS = [
  { id: "SVG", file: "deepa.svg", code: ['<svg viewBox="0 0 24 24"', '  stroke="currentColor">', '  <path d="M3.5 13h17…" />'] },
  { id: "JSX", file: "deepa.jsx", code: ['<svg viewBox="0 0 24 24"', "  strokeWidth={1.5}>", '  <path d="M3.5 13h17…" />'] },
  { id: "TSX", file: "Deepa.tsx", code: ["export function Deepa(", "  p: SVGProps<SVGSVGElement>", ") { return <svg {...p}>…"] },
  { id: "Data URI", file: "deepa.txt", code: ['url("data:image/svg+xml,', "  %3Csvg viewBox='0 0 24 24'", '  %3E%3Cpath d=…")'] },
] as const;

function CopyScene({ active, reduce }: SceneProps) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const loop = active && !reduce;

  useEffect(() => {
    if (!loop) return;
    const t = setInterval(() => setI((n) => (n + 1) % FORMATS.length), 2600);
    return () => clearInterval(t);
  }, [loop]);

  // Each time the format changes, the button "copies" shortly after
  useEffect(() => {
    setCopied(false);
    if (!active) return;
    const t = setTimeout(() => setCopied(true), 1000);
    return () => clearTimeout(t);
  }, [i, active]);

  const f = FORMATS[i];

  return (
    <div className="grid size-full place-items-center p-4 sm:p-6">
      <div className="w-full max-w-[19rem] rounded-2xl border border-white/10 bg-[#1d1a18] p-3 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.85)] sm:max-w-xs">
        <div className="flex items-center gap-1 text-[11px] font-medium">
          {FORMATS.map((t, n) => (
            <span
              key={t.id}
              className={cn(
                "relative rounded-md px-2 py-1 transition-colors duration-300",
                n === i ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {n === i && (
                <motion.span
                  layoutId="format-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-md bg-white/10"
                />
              )}
              <span className="relative">{t.id}</span>
            </span>
          ))}
        </div>

        <div className="mt-2.5 h-[4.75rem] overflow-hidden rounded-lg bg-black/30 p-2.5 font-mono text-[10.5px] leading-[1.6] text-foreground/85 sm:text-[11px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.pre
              key={f.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="whitespace-pre"
            >
              {f.code.join("\n")}
            </motion.pre>
          </AnimatePresence>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
            <Deepa className="size-6 text-foreground" />
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{f.file}</span>
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors duration-300",
              copied ? "border-primary/60 bg-primary/10 text-primary" : "border-white/10 text-foreground/80"
            )}
          >
            {copied ? <Check aria-hidden className="size-3" /> : <Copy aria-hidden className="size-3" />}
            {copied ? "Copied" : "Copy"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Free for anything: one motif, three kinds of use                 */
/* ------------------------------------------------------------------ */

const CARDS = [
  {
    label: "Poster",
    x: -58,
    rotate: -9,
    className: "bg-gradient-to-b from-[#fbeedb] to-[#e8c89f] text-[#2a1a10] [&_.stroke-primary]:stroke-[#b4693b]",
    sub: "text-[#2a1a10]/70",
  },
  {
    label: "App",
    x: 0,
    rotate: 0,
    className: "border border-white/15 bg-[#1d1a18] text-foreground",
    sub: "text-muted-foreground",
  },
  {
    label: "Packaging",
    x: 58,
    rotate: 9,
    className: "border border-primary/40 bg-primary/15 text-foreground",
    sub: "text-foreground/70",
  },
] as const;

function FreeScene({ active, reduce }: SceneProps) {
  const open = active || reduce;

  return (
    <div className="relative grid size-full place-items-center">
      {CARDS.map((c, n) => (
        <motion.div
          key={c.label}
          initial={reduce ? false : { x: 0, rotate: 0, opacity: 0, y: 14 }}
          animate={open ? { x: c.x, rotate: c.rotate, opacity: 1, y: n === 1 ? -6 : 0 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 17, delay: 0.1 + n * 0.08 }}
          className={cn(
            "absolute flex aspect-[3/4] w-[6.25rem] flex-col items-center justify-between rounded-2xl p-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.85)] sm:w-28",
            n === 1 && "z-10",
            c.className
          )}
        >
          <Deepa className="mt-1 size-14 sm:size-16" />
          <span className={cn("text-[10px] font-medium tracking-[0.14em] uppercase", c.sub)}>{c.label}</span>
        </motion.div>
      ))}

      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/70 px-2.5 py-1 text-[10px] font-medium text-foreground/85 backdrop-blur sm:top-4 sm:left-4 sm:text-[11px]">
        MIT licensed
      </span>
      <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] whitespace-nowrap text-foreground/85 backdrop-blur sm:bottom-4">
        <Check aria-hidden className="size-3 text-primary" strokeWidth={3} />
        No attribution needed
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exports: same names feature-media.tsx already imports               */
/* ------------------------------------------------------------------ */

/**
 * Adds the shared backdrop (soft light + dot grid) and tells the scene when it
 * is on screen, so loops only run while visible. The border, radius and size
 * come from the parent (`FeatureMedia`).
 */
function Frame({ Scene }: { Scene: (p: SceneProps) => JSX.Element }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: 0.4 });
  // Keep the initial render identical on server and client. MotionConfig
  // applies the OS reduced-motion preference after hydration.
  const reduce = false;

  return (
    <div
      ref={ref}
      className="relative size-full bg-[radial-gradient(70%_60%_at_30%_10%,rgba(246,223,196,0.10),transparent_70%)]"
    >
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(75%_75%_at_50%_50%,black,transparent)]" />
      <div className="relative size-full">
        <Scene active={active} reduce={reduce} />
      </div>
    </div>
  );
}

export const RootedVisual = () => <Frame Scene={RootedScene} />;
export const GridVisual = () => <Frame Scene={GridScene} />;
export const CopyCodeVisual = () => <Frame Scene={CopyScene} />;
export const FreeVisual = () => <Frame Scene={FreeScene} />;

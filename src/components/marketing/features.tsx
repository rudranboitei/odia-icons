"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Bookmark,
  Check,
  Code2,
  Copy,
  Download,
  Grid3x3,
  PenTool,
  Palette,
  Ruler,
  Sparkles,
} from "lucide-react";

import { ICONS, IconGlyph } from "@/data/icons";
import { pascal } from "@/lib/icons";

/* Same graded photo as the hero: /public/images/hero-bg.webp */
const BG = "/hero-bg.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Shared glass panel look (dark, blurred, thin border) */
const glass =
  "rounded-xl bg-white/80 text-neutral-900 ring-1 ring-black/5 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)]";

/* ------------------------------------------------------------------ */
/* Card visuals                                                        */
/* ------------------------------------------------------------------ */

function GridVisual() {
  const Line = () => (
    <span aria-hidden className="h-3 w-px border-l border-dashed border-neutral-900/30 sm:h-4" />
  );

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <div className={`${glass} flex items-center gap-2 px-3.5 py-2 text-[13px]`}>
        24 × 24 grid
      </div>
      <Line />
      <div className={`${glass} flex w-[72%] items-center gap-2.5 px-3.5 py-2.5 text-[13px]`}>
        <Grid3x3 aria-hidden className="size-4 text-neutral-500" />
        Consistent geometry
      </div>
      <Line />
      <div className={`${glass} flex w-[72%] items-center gap-2.5 px-3.5 py-2.5 text-[13px]`}>
        <PenTool aria-hidden className="size-4 text-neutral-500" />
        Rounded 1.5px stroke
      </div>
      <Line />
      <div className={`${glass} flex items-center gap-2 px-3.5 py-2 text-[13px]`}>
        <Check aria-hidden className="size-4 text-neutral-600" />
        Export SVG
      </div>
    </div>
  );
}

function CopyVisual() {
  const sample = ICONS[0];
  const sampleName = pascal(sample?.name ?? "deepa");

  return (
    <div className="absolute inset-0">
      <div className={`${glass} absolute top-[17%] left-[9%] h-[66%] w-[112%] p-4`}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center rounded-full bg-neutral-900 text-neutral-900">
            {sample ? (
              <IconGlyph icon={sample} strokeWidth={1.5} className="size-3.5" />
            ) : (
              <Sparkles className="size-3.5" />
            )}
          </span>
          <span className="text-[12px] font-medium">odiaicons</span>
        </div>

        <p className="mt-3 text-[12px] text-neutral-700">Copy as React component</p>

        <pre className="mt-2 overflow-hidden font-mono text-[11px] leading-relaxed whitespace-pre text-neutral-500">
          {`import { ${sampleName} } from "@odiaui/icons-react";

<${sampleName} size={24} />`}
        </pre>

        <div className="absolute bottom-4 left-4 flex items-center gap-3.5 text-neutral-500">
          <Copy aria-hidden className="size-3.5" />
          <Download aria-hidden className="size-3.5" />
          <Code2 aria-hidden className="size-3.5" />
          <Bookmark aria-hidden className="size-3.5" />
        </div>
      </div>
    </div>
  );
}

function CustomizeVisual() {
  const sample = ICONS[1] ?? ICONS[0];

  const Row = ({
    icon: Icon,
    text,
    tag,
    className,
  }: {
    icon: typeof Ruler;
    text: string;
    tag: string;
    className: string;
  }) => (
    <div
      className={`${glass} absolute flex items-center gap-2.5 px-3.5 py-3 text-[13px] ${className}`}
    >
      <Icon aria-hidden className="size-4 shrink-0 text-neutral-500" />
      <span className="truncate">{text}</span>
      <span className="ml-auto shrink-0 rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] text-neutral-600">
        {tag}
      </span>
    </div>
  );

  return (
    <div className="absolute inset-0">
      <Row
        icon={Ruler}
        text="Size 24px"
        tag="Resize"
        className="inset-x-[17%] top-[24%] scale-[0.94] opacity-60"
      />
      <Row
        icon={Palette}
        text="Colour: currentColor"
        tag="Change"
        className="inset-x-[14%] top-[34%] scale-[0.97] opacity-80"
      />
      <div
        className={`${glass} absolute inset-x-[11%] top-[46%] flex items-center gap-3 px-4 py-3.5 text-[13px]`}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-black/5">
          {sample ? (
            <IconGlyph icon={sample} strokeWidth={1.5} className="size-5 text-neutral-900" />
          ) : (
            <Sparkles className="size-4" />
          )}
        </span>
        <span className="leading-snug">
          Match the stroke
          <br />
          to your brand?
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white">
          Apply
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    title: "Drawn on a Grid",
    body: "Every icon shares one 24px grid, rounded strokes and calm geometry, so your set stays consistent at any size.",
    visual: <GridVisual />,
    position: "12% 62%",
  },
  {
    title: "Copy. Paste. Ship.",
    body: "Grab the SVG or the React component in one click and drop it straight into your project. No setup, no friction.",
    visual: <CopyVisual />,
    position: "52% 70%",
  },
  {
    title: "Make It Yours",
    body: "Change stroke, size and colour with a single prop. Icons inherit your text colour out of the box.",
    visual: <CustomizeVisual />,
    position: "92% 66%",
  },
];

export function Features() {
  const reduce = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: EASE } },
  };

  return (
    <section
      id="why"
      aria-labelledby="features-title"
      className="relative isolate overflow-hidden bg-[#f7f5f1] px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Subtle film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-[1080px]"
      >
        {/* Eyebrow */}
        <motion.p
          variants={rise}
          className="flex items-center gap-2 text-sm text-neutral-500"
        >
          <span aria-hidden className="size-2 rounded-full bg-neutral-400" />
          Why OdiaIcons
        </motion.p>

        {/* Heading: bright lead, muted rest */}
        <motion.h2
          id="features-title"
          variants={rise}
          className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
        >
          <span className="text-neutral-900">Odisha&apos;s heritage, drawn as icons</span>{" "}
          <span className="text-neutral-400">
            — consistent, customizable and free for every project you build.
          </span>
        </motion.h2>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 md:grid-cols-3 md:gap-3">
          {FEATURES.map((f) => (
            <motion.article key={f.title} variants={rise} className="min-w-0">
              <div className="relative aspect-[1.1/1] overflow-hidden rounded-[4px] bg-neutral-200">
                <Image
                  src={BG}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 768px) 352px, 100vw"
                  className="scale-[1.7] object-cover"
                  style={{ objectPosition: f.position, transformOrigin: f.position }}
                />
                {/* Moody dark tint */}
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                {f.visual}
              </div>

              <h3 className="mt-4 text-xl text-neutral-900">{f.title}</h3>
              <p className="mt-1.5 max-w-[310px] text-[15px] leading-snug text-neutral-500 sm:text-base">
                {f.body}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

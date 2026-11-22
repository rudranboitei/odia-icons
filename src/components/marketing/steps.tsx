// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
// import { ArrowRight, Check, Copy, Search } from "lucide-react";

// import { SITE } from "@/data/site";
// import { cn } from "@/lib/utils";
// import { Reveal } from "./reveal";
// import { Deepa, type Motif } from "./odia-motifs";

// const EASE = [0.22, 1, 0.36, 1] as const;
// /** Time each tab stays on screen while the section autoplays. */
// const STEP_MS = 6500;

// /* Same graded temple photo as the hero. Each tab shows a different part of it. */
// const BG = "/hero-bg.webp";
// const BG_POS = ["14% 64%", "52% 72%", "90% 68%"];

// /* Accent used for highlights (matches the terracotta in your poster) */
// const ACCENT = "#b4693b";

// /* ------------------------------------------------------------------ */
// /* Shared bits (light glass)                                          */
// /* ------------------------------------------------------------------ */

// function Window({ children, className }: { children: ReactNode; className?: string }) {
//   return (
//     <div
//       className={cn(
//         "w-full max-w-[22rem] rounded-xl bg-white/80 p-3 ring-1 ring-black/5 backdrop-blur-md shadow-[0_24px_50px_-20px_rgba(70,40,15,0.45)] sm:max-w-sm sm:p-4",
//         className
//       )}
//     >
//       <div className="mb-3 flex gap-1.5" aria-hidden>
//         <span className="size-2 rounded-full bg-black/15" />
//         <span className="size-2 rounded-full bg-black/15" />
//         <span className="size-2 rounded-full bg-black/15" />
//       </div>
//       {children}
//     </div>
//   );
// }

// function Tile({ Icon, label, selected }: { Icon: Motif; label: string; selected?: boolean }) {
//   return (
//     <div
//       className={cn(
//         "relative flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 sm:py-3",
//         selected ? "border-neutral-900 bg-white" : "border-black/5 bg-white/60"
//       )}
//     >
//       <Icon className={cn("size-8 sm:size-10", selected ? "text-neutral-900" : "text-neutral-900/60")} />
//       <span className="text-[10px] text-neutral-500 sm:text-xs">{label}</span>
//       {selected && (
//         <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-neutral-900 text-white">
//           <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
//         </span>
//       )}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Scenes                                                             */
// /* ------------------------------------------------------------------ */

// /** 1. Pick: the icon browser with one motif selected. */
// function SceneBrowse() {
//   return (
//     <Window>
//       <div className="flex h-9 items-center gap-2 rounded-lg bg-black/5 px-3 text-xs text-neutral-500">
//         <Search aria-hidden className="size-3.5 shrink-0" />
//         <span className="truncate">{SITE.explorer.searchPlaceholder}</span>
//       </div>
//       <div className="mt-3 grid grid-cols-3 gap-2">
//         <Tile Icon={Deepa} label="Deepa" selected />
//         <Tile Icon={Deepa} label="Deepa" />
//         <Tile Icon={Deepa} label="Deepa" />
//         <Tile Icon={Deepa} label="Deepa" />
//         <Tile Icon={Deepa} label="Deepa" />
//         <Tile Icon={Deepa} label="Deepa" />
//       </div>
//       <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
//         <span className="font-medium text-neutral-800">Deepa</span>
//         <span className="font-mono">24 × 24 · 1.5 stroke</span>
//       </div>
//     </Window>
//   );
// }

// /** 2. Copy: the export panel, with the copy button confirming itself. */
// function SceneCopy() {
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setCopied(true), 1500);
//     return () => clearTimeout(t);
//   }, []);

//   const pkg = `"${SITE.npmPackage}"`;
//   const tabs = ["SVG", "JSX", "React", "Data URI"];

//   return (
//     <Window>
//       <div className="flex items-center gap-1 text-[11px] font-medium sm:text-xs">
//         {tabs.map((t) => (
//           <span
//             key={t}
//             className={cn(
//               "rounded-md px-2 py-1",
//               t === "React" ? "bg-black/10 text-neutral-900" : "text-neutral-500"
//             )}
//           >
//             {t}
//           </span>
//         ))}
//         <span
//           className={cn(
//             "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors duration-300",
//             copied ? "text-[#b4693b]" : "border-black/10 text-neutral-700"
//           )}
//           style={copied ? { borderColor: `${ACCENT}80`, backgroundColor: `${ACCENT}14` } : undefined}
//         >
//           {copied ? <Check aria-hidden className="size-3" /> : <Copy aria-hidden className="size-3" />}
//           {copied ? "Copied" : "Copy"}
//         </span>
//       </div>

//       <pre className="mt-3 overflow-hidden rounded-lg bg-black/5 p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-800 sm:text-xs">
//         <code>
//           <span className="text-neutral-500">$ npm install {SITE.npmPackage}</span>
//           {"\n\n"}
//           <span style={{ color: ACCENT }}>import</span> {"{ Deepa }"}{" "}
//           <span style={{ color: ACCENT }}>from</span>
//           {"\n  "}
//           <span className="text-[#8a5a2b]">{pkg}</span>
//           {"\n\n"}
//           {"<"}
//           <span style={{ color: ACCENT }}>Deepa</span>
//           {" className="}
//           <span className="text-[#8a5a2b]">{'"size-6"'}</span>
//           {" />"}
//         </code>
//       </pre>
//     </Window>
//   );
// }

// /** 3. Ship: the same motifs, in a phone UI and on a poster. */
// function SceneShip() {
//   const apps: { Icon: Motif; label: string }[] = [
//     { Icon: Deepa, label: "Deepa" },
//     { Icon: Deepa, label: "Deepa" },
//     { Icon: Deepa, label: "Deepa" },
//     { Icon: Deepa, label: "Deepa" },
//   ];
//   const tabs: { Icon: Motif; on?: boolean }[] = [
//     { Icon: Deepa, on: true },
//     { Icon: Deepa },
//     { Icon: Deepa },
//   ];

//   return (
//     <div className="relative flex h-full w-full items-center justify-center gap-3 sm:gap-5">
//       {/* Poster */}
//       <motion.div
//         initial={{ opacity: 0, y: 18, rotate: -9 }}
//         animate={{ opacity: 1, y: 0, rotate: -5 }}
//         transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
//         className="w-[7.25rem] rounded-xl bg-gradient-to-b from-[#fbeedb] to-[#e8c89f] p-3 text-[#2a1a10] shadow-[0_24px_50px_-20px_rgba(70,40,15,0.55)] sm:w-40 sm:p-4 [&_.stroke-primary]:stroke-[#b4693b]"
//       >
//         <Deepa className="mx-auto size-[4.25rem] sm:size-24" />
//         <p className="mt-2 text-center text-lg font-black tracking-tight sm:text-2xl">Odisha</p>
//         <p className="mt-0.5 text-center text-[9px] font-medium tracking-[0.18em] uppercase opacity-70 sm:text-[10px]">
//           Deepa · Home
//         </p>
//       </motion.div>

//       {/* Phone */}
//       <motion.div
//         initial={{ opacity: 0, y: 22 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
//         className="w-[8.75rem] rounded-[1.5rem] bg-white/90 p-2 ring-1 ring-black/5 shadow-[0_28px_60px_-24px_rgba(70,40,15,0.55)] sm:w-44"
//       >
//         <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-black/15" aria-hidden />
//         <p className="px-1 text-[11px] font-semibold text-neutral-900">Explore Odisha</p>
//         <div className="mt-2 grid grid-cols-2 gap-1.5">
//           {apps.map(({ Icon, label }, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center gap-1 rounded-lg border border-black/5 bg-black/[0.03] py-2"
//             >
//               <Icon className="size-7 text-neutral-900/80 sm:size-8" />
//               <span className="text-[9px] text-neutral-500">{label}</span>
//             </div>
//           ))}
//         </div>
//         <div className="mt-2 flex items-center justify-around rounded-xl bg-black/5 py-2">
//           {tabs.map(({ Icon, on }, i) => (
//             <Icon
//               key={i}
//               className={cn("size-5", on ? "text-[#b4693b]" : "text-neutral-900/40")}
//             />
//           ))}
//         </div>
//       </motion.div>

//       <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[11px] whitespace-nowrap text-neutral-800 ring-1 ring-black/5 backdrop-blur sm:bottom-4">
//         <Check aria-hidden className="size-3 text-[#b4693b]" strokeWidth={3} />
//         No attribution needed
//       </span>
//     </div>
//   );
// }

// const SCENES = [SceneBrowse, SceneCopy, SceneShip];

// /* ------------------------------------------------------------------ */
// /* Section                                                            */
// /* ------------------------------------------------------------------ */

// export function Steps() {
//   const { steps } = SITE;
//   const reduce = useReducedMotion() ?? false;
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { amount: 0.35 });

//   const [active, setActive] = useState(0);
//   const [auto, setAuto] = useState(true);

//   // Autoplay only while visible, never with reduced motion, and never after the visitor takes over.
//   const running = auto && inView && !reduce;

//   useEffect(() => {
//     if (!running) return;
//     const t = setTimeout(() => setActive((a) => (a + 1) % steps.items.length), STEP_MS);
//     return () => clearTimeout(t);
//   }, [running, active, steps.items.length]);

//   const select = (i: number) => {
//     setAuto(false);
//     setActive(i);
//   };

//   const Scene = SCENES[active % SCENES.length];
//   const item = steps.items[active];

//   return (
//     <section
//       aria-labelledby="steps-title"
//       className="px-4 py-16 sm:px-6 sm:py-24"
//     >
//       <Reveal className="mx-auto w-full max-w-[1080px]">
//         {/* Eyebrow + two-tone heading */}
//         <p className="flex items-center gap-2 text-sm text-neutral-500">
//           <span aria-hidden className="size-2 rounded-full bg-neutral-400" />
//           {steps.eyebrow}
//         </p>
//         <h2
//           id="steps-title"
//           className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
//         >
//           <span className="text-neutral-900">{steps.title}</span>{" "}
//           <span className="text-neutral-400">{steps.accent}</span>
//         </h2>

//         <div ref={ref} className="mt-10 sm:mt-14">
//           {/* Tabs */}
//           <div
//             role="tablist"
//             aria-label={steps.title}
//             className="flex gap-1 overflow-x-auto border-b border-black/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//           >
//             {steps.items.map((s, i) => {
//               const on = i === active;
//               return (
//                 <button
//                   key={s.title}
//                   type="button"
//                   role="tab"
//                   id={`steps-tab-${i}`}
//                   aria-selected={on}
//                   aria-controls="steps-panel"
//                   tabIndex={on ? 0 : -1}
//                   onClick={() => select(i)}
//                   className={cn(
//                     "relative shrink-0 cursor-pointer px-3 py-3 text-[15px] whitespace-nowrap outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-black/40",
//                     on ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
//                   )}
//                 >
//                   {s.title}
//                   {on && (
//                     <motion.span
//                       key={`${i}-${running}`}
//                       aria-hidden
//                       initial={{ scaleX: auto && !reduce ? 0 : 1 }}
//                       animate={{ scaleX: auto && !reduce ? (running ? 1 : 0) : 1 }}
//                       transition={{ duration: running ? STEP_MS / 1000 : 0.2, ease: "linear" }}
//                       className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-neutral-900"
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Panel */}
//           <div
//             id="steps-panel"
//             role="tabpanel"
//             aria-labelledby={`steps-tab-${active}`}
//             className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-0"
//           >
//             {/* Image + scene */}
//             <div
//               aria-hidden
//               className="relative aspect-[1.1/1] w-full overflow-hidden rounded-[4px] bg-neutral-200 sm:aspect-[1.3/1]"
//             >
//               <AnimatePresence mode="wait" initial={false}>
//                 <motion.div
//                   key={active}
//                   initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.35, ease: EASE }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={BG}
//                     alt=""
//                     fill
//                     sizes="(min-width: 768px) 600px, 100vw"
//                     className="scale-[1.9] object-cover"
//                     style={{
//                       objectPosition: BG_POS[active % BG_POS.length],
//                       transformOrigin: BG_POS[active % BG_POS.length],
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-white/10" />
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" />
//                   <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
//                     <Scene />
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Copy */}
//             <div className="md:pl-16 lg:pl-24">
//               <AnimatePresence mode="wait" initial={false}>
//                 <motion.div
//                   key={active}
//                   initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3, ease: EASE }}
//                 >
//                   <p className="text-sm text-neutral-500">{item.title}</p>
//                   <p className="mt-3 max-w-[22rem] text-xl leading-snug text-neutral-900 sm:text-[22px]">
//                     {item.description}
//                   </p>
//                   <Link
//                     href={SITE.links.icons}
//                     className="group/cta mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 focus-visible:outline-none"
//                   >
//                     Browse all Odisha icons
//                     <ArrowRight
//                       aria-hidden
//                       className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
//                     />
//                   </Link>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </Reveal>
//     </section>
//   );
// }






"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy, Search } from "lucide-react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Deepa, type Motif } from "./odia-motifs";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 6500;

const BG = "/hero-bg.webp";
const BG_POS = ["14% 64%", "52% 72%", "90% 68%"];

const ACCENT = "#b4693b";

/* ------------------------------------------------------------------ */
/* Shared bits (warm light glass)                                     */
/* ------------------------------------------------------------------ */

function Window({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[22rem] rounded-xl border border-[#e9e1d8] bg-white/90 p-3 shadow-[0_24px_50px_-20px_rgba(70,40,15,0.12)] backdrop-blur-md sm:max-w-sm sm:p-4",
        className
      )}
    >
      <div className="mb-3 flex gap-1.5" aria-hidden>
        <span className="size-2 rounded-full bg-[#d9cec2]" />
        <span className="size-2 rounded-full bg-[#d9cec2]" />
        <span className="size-2 rounded-full bg-[#d9cec2]" />
      </div>
      {children}
    </div>
  );
}

function Tile({ Icon, label, selected }: { Icon: Motif; label: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 transition-colors sm:py-3",
        selected
          ? "border-[#b4693b]/50 bg-[#fbf4ed]"
          : "border-[#eee7df] bg-[#faf8f5]"
      )}
    >
      <Icon
        className={cn(
          "size-8 sm:size-10",
          selected ? "text-[#b4693b]" : "text-neutral-800/60"
        )}
      />

      <span className="text-[10px] text-neutral-500 sm:text-xs">
        {label}
      </span>

      {selected && (
        <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-[#b4693b] text-white">
          <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scenes                                                             */
/* ------------------------------------------------------------------ */

/** 1. Browse: icon browser with one motif selected. */

function SceneBrowse() {
  return (
    <Window>
      <div className="flex h-9 items-center gap-2 rounded-lg border border-[#eee7df] bg-[#faf8f5] px-3 text-xs text-neutral-500">
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

      <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
        <span className="font-medium text-neutral-800">Deepa</span>
        <span className="font-mono">24 × 24 · 1.5 stroke</span>
      </div>
    </Window>
  );
}

/** 2. Copy: export panel with copy confirmation. */

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
              t === "React"
                ? "bg-[#f5e9de] text-[#98542f]"
                : "text-neutral-500"
            )}
          >
            {t}
          </span>
        ))}

        <span
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors duration-300",
            copied
              ? "text-[#b4693b]"
              : "border-[#e9e1d8] text-neutral-700"
          )}
          style={
            copied
              ? {
                borderColor: `${ACCENT}80`,
                backgroundColor: `${ACCENT}14`,
              }
              : undefined
          }
        >
          {copied ? (
            <Check aria-hidden className="size-3" />
          ) : (
            <Copy aria-hidden className="size-3" />
          )}

          {copied ? "Copied" : "Copy"}
        </span>
      </div>

      <pre className="mt-3 overflow-hidden rounded-lg border border-[#eee7df] bg-[#faf8f5] p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-neutral-800 sm:text-xs">
        <code>
          <span className="text-neutral-500">
            $ npm install {SITE.npmPackage}
          </span>

          {"\n\n"}

          <span style={{ color: ACCENT }}>import</span> {"{ Deepa }"}{" "}
          <span style={{ color: ACCENT }}>from</span>
          {"\n  "}

          <span className="text-[#8a5a2b]">{pkg}</span>

          {"\n\n"}

          {"<"}
          <span style={{ color: ACCENT }}>Deepa</span>
          {" className="}
          <span className="text-[#8a5a2b]">{'"size-6"'}</span>
          {" />"}
        </code>
      </pre>
    </Window>
  );
}

/** 3. Ship: motifs in a phone UI and on a poster. */

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
        className="w-[7.25rem] rounded-xl border border-[#ead8c5] bg-gradient-to-b from-[#fff8ee] to-[#eddbc3] p-3 text-[#2a1a10] shadow-[0_24px_50px_-20px_rgba(70,40,15,0.20)] sm:w-40 sm:p-4 [&_.stroke-primary]:stroke-[#b4693b]"
      >
        <Deepa className="mx-auto size-[4.25rem] sm:size-24" />

        <p className="mt-2 text-center text-lg font-black tracking-tight sm:text-2xl">
          Odisha
        </p>

        <p className="mt-0.5 text-center text-[9px] font-medium tracking-[0.18em] uppercase opacity-70 sm:text-[10px]">
          Deepa · Home
        </p>
      </motion.div>

      {/* Phone */}

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
        className="w-[8.75rem] rounded-[1.5rem] border border-[#e9e1d8] bg-white/95 p-2 shadow-[0_28px_60px_-24px_rgba(70,40,15,0.20)] sm:w-44"
      >
        <div
          className="mx-auto mb-2 h-1 w-9 rounded-full bg-[#ded5ca]"
          aria-hidden
        />

        <p className="px-1 text-[11px] font-semibold text-neutral-900">
          Explore Odisha
        </p>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {apps.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 rounded-lg border border-[#eee7df] bg-[#faf8f5] py-2"
            >
              <Icon className="size-7 text-neutral-800/80 sm:size-8" />

              <span className="text-[9px] text-neutral-500">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-around rounded-xl border border-[#eee7df] bg-[#faf8f5] py-2">
          {tabs.map(({ Icon, on }, i) => (
            <Icon
              key={i}
              className={cn(
                "size-5",
                on ? "text-[#b4693b]" : "text-neutral-900/40"
              )}
            />
          ))}
        </div>
      </motion.div>

      {/* Confirmation */}

      <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#e9e1d8] bg-white/95 px-3 py-1 text-[11px] whitespace-nowrap text-neutral-800 shadow-sm backdrop-blur sm:bottom-4">
        <Check
          aria-hidden
          className="size-3 text-[#b4693b]"
          strokeWidth={3}
        />
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

  // Autoplay only while visible, and respect reduced motion.

  const running = auto && inView && !reduce;

  useEffect(() => {
    if (!running) return;

    const t = setTimeout(
      () => setActive((a) => (a + 1) % steps.items.length),
      STEP_MS
    );

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
      className="bg-[#faf8f5] px-4 py-16 text-neutral-900 sm:px-6 sm:py-24"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">

        {/* Eyebrow + heading */}

        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <span
            aria-hidden
            className="size-2 rounded-full bg-[#b4693b]"
          />
          {steps.eyebrow}
        </p>

        <h2
          id="steps-title"
          className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
        >
          <span className="text-neutral-900">
            {steps.title}
          </span>{" "}

          <span className="text-[#b4693b]">
            {steps.accent}
          </span>
        </h2>

        <div ref={ref} className="mt-10 sm:mt-14">

          {/* Tabs */}

          <div
            role="tablist"
            aria-label={steps.title}
            className="flex gap-1 overflow-x-auto border-b border-[#e9e1d8] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    "relative shrink-0 cursor-pointer px-3 py-3 text-[15px] whitespace-nowrap outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#b4693b]/40",
                    on
                      ? "text-[#b4693b]"
                      : "text-neutral-500 hover:text-neutral-900"
                  )}
                >
                  {s.title}

                  {on && (
                    <motion.span
                      key={`${i}-${running}`}
                      aria-hidden
                      initial={{
                        scaleX: auto && !reduce ? 0 : 1,
                      }}
                      animate={{
                        scaleX: auto && !reduce
                          ? running ? 1 : 0
                          : 1,
                      }}
                      transition={{
                        duration: running ? STEP_MS / 1000 : 0.2,
                        ease: "linear",
                      }}
                      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-[#b4693b]"
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
              className="relative aspect-[1.1/1] w-full overflow-hidden rounded-xl bg-[#eee8df] ring-1 ring-black/5 sm:aspect-[1.3/1]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.02 }
                  }
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

                  {/* Warm image overlay */}

                  <div className="absolute inset-0 bg-[#fff8ef]/15" />

                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#2a1a10]/10" />

                  {/* Scene */}

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
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="text-sm font-medium text-[#b4693b]">
                    {item.title}
                  </p>

                  <p className="mt-3 max-w-[22rem] text-xl leading-snug text-neutral-900 sm:text-[22px]">
                    {item.description}
                  </p>

                  <Link
                    href={SITE.links.icons}
                    className="group/cta mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#b4693b] px-5 text-sm font-medium text-white transition-colors hover:bg-[#98542f] focus-visible:ring-2 focus-visible:ring-[#b4693b]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] focus-visible:outline-none"
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

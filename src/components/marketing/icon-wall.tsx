"use client";

import { motion } from "motion/react";

import { ICONS, IconGlyph, type IconEntry } from "@/data/icons";

const COLUMNS = 9;

/** Deterministic column contents so server and client render the same markup. */
function columnIcons(col: number): IconEntry[] {
  const out: IconEntry[] = [];
  for (let i = 0; i < 6; i++) {
    out.push(ICONS[(col * 3 + i * 5) % ICONS.length]);
  }
  return out;
}

function WallCard({ icon, tall }: { icon: IconEntry; tall: boolean }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 ${
        tall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      <IconGlyph icon={icon} className="size-1/3 text-white/70" strokeWidth={2} />
      <span className="font-mono text-[10px] tracking-wide text-white/40">
        {icon.name}
      </span>
    </div>
  );
}

function Column({ col }: { col: number }) {
  const items = columnIcons(col);
  const goingUp = col % 2 === 0;
  const duration = 38 + (col % 4) * 9;

  // Content is rendered twice and translated by -50%, so the loop is seamless.
  const loop = [...items, ...items];

  return (
    <div
      className="flex-1 overflow-hidden"
      style={{ marginTop: col % 3 === 0 ? "-6rem" : col % 3 === 1 ? "2rem" : "-2rem" }}
    >
      <motion.div
        className="flex flex-col gap-4"
        initial={{ y: goingUp ? "0%" : "-50%" }}
        animate={{ y: goingUp ? "-50%" : "0%" }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map((icon, i) => (
          <WallCard key={`${icon.name}-${i}`} icon={icon} tall={(i + col) % 3 === 0} />
        ))}
      </motion.div>
    </div>
  );
}

export function IconWall() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <div className="flex h-full w-full gap-4 px-4 opacity-[0.55]">
        {Array.from({ length: COLUMNS }).map((_, c) => (
          <Column key={c} col={c} />
        ))}
      </div>
      {/* darken everything, then carve a darker pool behind the headline */}
      <div className="absolute inset-0 bg-[#141210]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,#141210_35%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  );
}

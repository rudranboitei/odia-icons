"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, Download, GitBranchPlus, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconWall } from "@/components/icon-wall";
import { byName, ICONS, IconGlyph } from "@/data/icons";
import { SITE } from "@/data/site";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Cream keycap holding an icon, pressable like a real key. */
function KeyTile() {
  const wheel = byName("konark-wheel");
  return (
    <motion.div
      aria-hidden="true"
      variants={{
        hidden: { opacity: 0, scale: 0.6, rotate: -14, y: 20 },
        show: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: 0,
          transition: { type: "spring", stiffness: 220, damping: 15, mass: 0.9 },
        },
      }}
      whileHover={{ rotate: -4, scale: 1.04 }}
      whileTap={{ y: 6, scale: 0.97 }}
      className="relative grid size-20 shrink-0 place-items-center rounded-[1.4rem] bg-gradient-to-b from-[#f7e8d4] to-[#e6c9a6] shadow-[0_8px_0_#b8946b,0_18px_34px_-6px_rgba(0,0,0,0.65),inset_0_2px_0_rgba(255,255,255,0.65)] md:size-28 md:rounded-[1.9rem]"
    >
      <div className="absolute inset-[7px] rounded-[1.1rem] bg-gradient-to-b from-[#f3dec4] to-[#ecd2b0] shadow-[inset_0_2px_6px_rgba(120,80,40,0.25)] md:inset-[9px] md:rounded-[1.5rem]" />
      <IconGlyph
        icon={wheel}
        strokeWidth={1.5}
        className="relative size-10 text-[#3b2a1a] md:size-14"
      />
    </motion.div>
  );
}

function SpinningWheel() {
  const wheel = byName("konark-wheel");
  return (
    <motion.span
      aria-hidden="true"
      className="inline-block text-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, ease: "linear", repeat: Infinity }}
    >
      <IconGlyph icon={wheel} strokeWidth={1.4} className="size-[0.85em]" />
    </motion.span>
  );
}

export function Hero() {
  const { hero } = SITE;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:py-28"
    >
      <IconWall />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* Line 1: pixel wordmark with keycap */}
        <motion.h1
          variants={rise}
          className="flex flex-wrap items-center justify-center gap-3 font-sans text-4xl leading-none font-bold text-foreground sm:text-5xl md:gap-5 md:text-7xl"
        >
          <span>{hero.wordmark.lead}</span>
          <KeyTile />
          <span>{hero.wordmark.trail}</span>
        </motion.h1>

        {/* Line 2: large display line with the accent phrase in cream */}
        <motion.p
          variants={rise}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:mt-8 sm:text-5xl md:gap-5 md:text-7xl lg:text-8xl"
        >
          <span>{hero.display.lead}</span>
          <SpinningWheel />
          <span className="text-primary">{hero.display.accent}</span>
        </motion.p>

        <motion.p
          variants={rise}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl"
        >
          {hero.lead}
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" asChild>
              <Link href="#install">{hero.ctas.install}</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/icons">
                {hero.ctas.browse}
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
        >
          <motion.div
            variants={rise}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Badge asChild>
              <Link href={SITE.links.github} target="_blank" rel="noopener noreferrer">
                <GitBranchPlus />
                {hero.badges.github}
              </Link>
            </Badge>
          </motion.div>
          {SITE.stars !== null && (
            <motion.div variants={rise}>
              <Badge>
                <Star className="fill-current" />
                <b className="font-semibold">{SITE.stars.toLocaleString()}</b>{" "}
                {hero.badges.stars}
              </Badge>
            </motion.div>
          )}
          {SITE.installs !== null && (
            <motion.div variants={rise}>
              <Badge>
                <Download />
                <b className="font-semibold">{SITE.installs}</b>{" "}
                {hero.badges.installs}
              </Badge>
            </motion.div>
          )}
          <motion.div variants={rise}>
            <Badge>
              <b className="font-semibold">{ICONS.length}</b> {hero.badges.icons}
            </Badge>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

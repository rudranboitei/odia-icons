"use client";

import { useId, useState } from "react";
import { IconArrowUpRight, IconPlus } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const EASE = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

function FaqRow({
  item,
  index,
  open,
  onToggle,
  reduce,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  // Cursor-follow spotlight
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      onMouseMove={onMove}
      data-open={open}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 sm:rounded-3xl",
        open
          ? "border-primary/30 bg-white/[0.06] shadow-[0_20px_60px_-24px] shadow-primary/30"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      )}
    >
      {/* Spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />

      {/* Active accent bar */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: open ? 1 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute top-4 bottom-4 left-0 w-[3px] origin-center rounded-full bg-primary"
      />

      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="relative flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:gap-5 sm:px-7 sm:py-5"
        >
          <span
            className={cn(
              "w-7 shrink-0 font-mono text-xs tabular-nums tracking-wider transition-colors duration-300",
              open ? "text-primary" : "text-muted-foreground/60"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={cn(
              "flex-1 text-base leading-[1.4] font-semibold tracking-tight transition-colors duration-300 sm:text-[18px]",
              open ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
            )}
          >
            {item.q}
          </span>

          <motion.span
            initial={false}
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
              open
                ? "border-primary bg-primary text-primary-foreground"
                : "border-white/10 bg-card text-foreground group-hover:border-white/25"
            )}
          >
            <IconPlus aria-hidden className="size-4" stroke={2} />
          </motion.span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{
          height: { duration: reduce ? 0 : 0.45, ease: EASE },
          opacity: { duration: reduce ? 0 : 0.3, delay: open ? 0.08 : 0 },
        }}
        className="overflow-hidden"
        // Keep collapsed content out of the tab order / screen readers
        inert={!open}
      >
        <motion.p
          initial={false}
          animate={{ y: open ? 0 : -8 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
          className="max-w-2xl pr-5 pb-6 pl-[3.75rem] text-[15px] leading-relaxed text-muted-foreground sm:pr-8 sm:pb-7 sm:pl-[4.5rem] sm:text-base"
        >
          {item.a}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export function Faq() {
  const { faq, links } = SITE;
  const reduce = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden px-5 py-14 sm:px-6 sm:py-16 lg:py-24"
    >
      {/* Soft ambient glow behind the list */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <Reveal className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          accent={faq.accent}
          description={faq.description}
        />

        <div className="mt-8 flex flex-col gap-3 sm:mt-12">
          {faq.items.map((item: FaqItem, i: number) => (
            <FaqRow
              key={item.q}
              item={item}
              index={i}
              reduce={reduce}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[15px] text-muted-foreground sm:mt-10"
        >
          <span>{faq.more.label}</span>
          <a
            href={links.contribute}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {faq.more.linkLabel}
            <IconArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              stroke={1.75}
            />
          </a>
        </motion.div>
      </Reveal>
    </section>
  );
}

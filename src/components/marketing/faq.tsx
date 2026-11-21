"use client";

import { useId, useState } from "react";
import { IconArrowUpRight, IconPlus } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

/**
 * One row. The panel opens with a CSS grid-rows transition (0fr -> 1fr):
 * it is compositor-friendly, needs no JS height measuring, and stays smooth
 * on low-end phones. Only transform/opacity/grid-rows change, no shadows.
 */
function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  return (
    <div className="group">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-14 w-full cursor-pointer items-start gap-4 rounded-lg py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-6"
        >
          <span
            className={cn(
              "w-7 shrink-0 pt-[3px] font-mono text-xs tabular-nums tracking-wider transition-colors duration-300",
              open ? "text-primary" : "text-muted-foreground/60"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={cn(
              "flex-1 text-[17px] leading-snug font-semibold tracking-tight transition-colors duration-300 sm:text-lg",
              open ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
            )}
          >
            {item.q}
          </span>

          <IconPlus
            aria-hidden
            stroke={1.75}
            className={cn(
              "mt-0.5 size-5 shrink-0 transition-[transform,color] duration-300 ease-out motion-reduce:transition-none",
              open ? "rotate-45 text-primary" : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        // Keep collapsed content out of the tab order and away from screen readers
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="max-w-xl pr-8 pb-6 pl-11 text-[15px] leading-relaxed text-muted-foreground sm:pb-7 sm:text-base">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function MoreLink({ className }: { className?: string }) {
  const { faq, links } = SITE;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-muted-foreground",
        className
      )}
    >
      <span>{faq.more.label}</span>
      <a
        href={links.contribute}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex min-h-10 items-center gap-1 rounded-full border border-white/10 px-4 font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {faq.more.linkLabel}
        <IconArrowUpRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          stroke={1.75}
        />
      </a>
    </div>
  );
}

export function Faq() {
  const { faq } = SITE;
  const reduce = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // One calm entrance for each column instead of per-row staggers
  const enter = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative scroll-mt-20 px-5 py-14 sm:px-6 sm:py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Left: heading (sticky on desktop) */}
        <motion.div {...enter()} className="lg:sticky lg:top-28 lg:self-start">
          {faq.eyebrow && (
            <p className="mb-3 text-xs font-medium tracking-[0.14em] text-primary uppercase">
              {faq.eyebrow}
            </p>
          )}
          <h2
            id="faq-title"
            className="text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            {faq.title}
            {faq.accent && <> <span className="text-primary">{faq.accent}</span></>}
          </h2>
          {faq.description && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {faq.description}
            </p>
          )}
          <MoreLink className="mt-8 hidden lg:flex" />
        </motion.div>

        {/* Right: flat list with hairline dividers */}
        <motion.div {...enter(0.08)}>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faq.items.map((item: FaqItem, i: number) => (
              <FaqRow
                key={item.q}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          <MoreLink className="mt-8 lg:hidden" />
        </motion.div>
      </div>
    </section>
  );
}

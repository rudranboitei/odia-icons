"use client";

import { useId, useState } from "react";
import { IconArrowUpRight, IconPlus } from "@tabler/icons-react";
import { motion } from "motion/react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

/**
 * One boxed question. The answer opens inside the box with a CSS
 * grid-rows transition (0fr -> 1fr): no JS height measuring, smooth on phones.
 */
function FaqBox({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  return (
    <div
      className={cn(
        "rounded-sm border bg-white transition-colors duration-300",
        open ? "border-black/30" : "border-black/10 hover:border-black/20"
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f4f0]"
        >
          <span className="text-[15px] leading-snug text-neutral-900">{item.q}</span>
          <IconPlus
            aria-hidden
            stroke={1.5}
            className={cn(
              "size-[18px] shrink-0 text-neutral-700 transition-transform duration-300 ease-out motion-reduce:transition-none",
              open && "rotate-45"
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
          <p className="max-w-[26rem] px-4 pb-4 text-[15px] leading-relaxed text-neutral-500">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const { faq, links } = SITE;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative scroll-mt-20 bg-[#f6f4f0] px-4 py-16 text-neutral-900 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto w-full max-w-[1080px]"
      >
        {/* Eyebrow + two-tone heading */}
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <span aria-hidden className="size-2 rounded-full bg-neutral-400" />
          {faq.eyebrow ?? "FAQ"}
        </p>
        <h2
          id="faq-title"
          className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
        >
          <span className="text-neutral-900">{faq.title}</span>
          {faq.accent && (
            <>
              {" "}
              <span className="text-neutral-400">{faq.accent}</span>
            </>
          )}
        </h2>
        {faq.description && (
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-500">
            {faq.description}
          </p>
        )}

        {/* Two columns of boxes; items-start so an open box doesn't stretch its neighbour */}
        <div className="mt-10 grid items-start gap-3 sm:mt-14 md:grid-cols-2 md:gap-4">
          {faq.items.map((item: FaqItem, i: number) => (
            <FaqBox
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-neutral-500">
          <span>{faq.more.label}</span>
          <a
            href={links.contribute}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex h-10 items-center gap-1 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {faq.more.linkLabel}
            <IconArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              stroke={1.5}
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

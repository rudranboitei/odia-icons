"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Plus } from "@odiaui/icons-react";
import { motion, useReducedMotion } from "motion/react";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

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
    <div className="border-b border-white/10">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-start gap-4 py-5 text-left outline-none sm:gap-6 sm:py-6 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210]"
        >
          <span className="w-8 shrink-0 pt-0.5 text-sm font-medium text-neutral-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "flex-1 text-[17px] leading-snug font-medium transition-colors sm:text-lg",
              open ? "text-white" : "text-neutral-200 group-hover:text-white"
            )}
          >
            {item.q}
          </span>
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              open
                ? "border-white/20 bg-white text-black"
                : "border-white/15 text-neutral-400 group-hover:border-white/25 group-hover:text-white"
            )}
          >
            <Plus
              className={cn(
                "size-4 transition-transform duration-300 ease-out motion-reduce:transition-none",
                open && "rotate-45"
              )}
              strokeWidth={1.75}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-6 pl-12 text-[15px] leading-relaxed text-neutral-400 sm:pl-14 sm:text-base">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const { faq, links } = SITE;
  const reduce = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative scroll-mt-20 bg-[#141210] px-4 py-20 text-[#ffffff] sm:px-6 sm:py-28"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto w-full max-w-[1080px]"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-sm text-neutral-400">
              <span aria-hidden className="size-2 rounded-full bg-[#ffffff]" />
              {faq.eyebrow ?? "FAQ"}
            </p>
            <h2
              id="faq-title"
              className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance"
            >
              <span className="text-[#ffffff]">{faq.title}</span>
              {faq.accent && (
                <>
                  {" "}
                  <span className="text-neutral-500">{faq.accent}</span>
                </>
              )}
            </h2>
            {faq.description && (
              <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
                {faq.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-neutral-500">
              <span>{faq.more.label}</span>
              <a
                href={links.contribute}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex h-10 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] focus-visible:outline-none"
              >
                {faq.more.linkLabel}
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10">
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
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";

import { SITE } from "@/data/site";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function FinalCta() {
  const { finalCta } = SITE;
  const reduce = useReducedMotion() ?? false;

  // Cursor-follow spotlight inside the card
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="install"
      className="relative scroll-mt-20 overflow-hidden px-4 py-14 text-center sm:px-6 sm:py-16 lg:py-24"
    >
      <Reveal className="mx-auto max-w-7xl">
        <div
          onMouseMove={onMove}
          className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-5 py-12 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* Dotted grid, faded toward the edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Concentric rings pulsing outward from the top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          >
            {[320, 520, 720].map((size, i) => (
              <motion.span
                key={size}
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.06, 1], opacity: [0.5, 0.2, 0.5] }
                }
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
                style={{ width: size, height: size }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 max-sm:hidden"
              />
            ))}
          </div>

          {/* Drifting colour orbs */}
          <motion.div
            aria-hidden="true"
            animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
            className="pointer-events-none absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-primary/20 blur-[100px]"
          />
          <motion.div
            aria-hidden="true"
            animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -24, 0] }}
            transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
            className="pointer-events-none absolute -right-20 -bottom-24 -z-10 size-72 rounded-full bg-primary/15 blur-[100px]"
          />

          {/* Cursor spotlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
            }}
          />

          {/* Top highlight line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent sm:inset-x-24"
          />

          <div className="relative mx-auto max-w-3xl">
            <SectionHeader
              eyebrow={finalCta.eyebrow}
              title={finalCta.title}
              accent={finalCta.accent}
              description={finalCta.description}
              size="cta"
            />

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="mt-8 flex justify-center sm:mt-10"
            >
              <div className="relative w-full max-w-lg">
                {/* Soft glow under the install box */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 -bottom-3 h-10 rounded-full bg-primary/30 blur-2xl"
                />
                <InstallBox className="relative" />
              </div>
            </motion.div>

            <p className="mt-5 inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] leading-[1.3] tracking-[-0.02em] text-muted-foreground sm:mt-6">
              {finalCta.helper}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

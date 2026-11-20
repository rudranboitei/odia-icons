"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared entrance curve from DESIGN.md. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/**
 * Small scroll-in wrapper for sections. Animates transform + opacity only.
 * Reduced motion is handled globally by `<MotionConfig reducedMotion="user">`:
 * entrances still play, transforms (like the hero wall and wheel) stop.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

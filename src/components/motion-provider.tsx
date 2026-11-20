"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide motion policy. `reducedMotion="user"` keeps opacity entrances but
 * stops transforms (hero wall, spinning wheel, hovers) when the OS asks for it.
 * This is hydration-safe: the server and client render the same markup.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

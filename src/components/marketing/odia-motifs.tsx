"use client";

import type { JSX, SVGProps } from "react";

/**
 * Custom Odisha motifs, drawn on a 48 × 48 grid with a 1.5 stroke.
 * Main lines use `currentColor`; detail lines use the theme's `primary`
 * colour, so each motif has two tones without extra props.
 */
export type MotifProps = SVGProps<SVGSVGElement>;
export type Motif = (props: MotifProps) => JSX.Element;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

/** Deepa: a clay oil lamp with a lit flame. */
export function Deepa({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6 28h36c0 8-8 14-18 14S6 36 6 28Z" />
      <path d="M24 5c5 6 8 10 8 15a8 8 0 0 1-16 0c0-5 3-9 8-15Z" className="stroke-primary" />
      <path d="M24 28v-3.500" />
      <path d="M24 24.500c-2.800 0-4.200-2.200-4.200-4.200 0-2 1.600-4 4.200-6.800 2.600 2.800 4.200 4.800 4.200 6.800 0 2-1.400 4.200-4.200 4.200Z" />
      <path d="M13 33.500h0M19 36.500h0M24 37.500h0M29 36.500h0M35 33.500h0" strokeWidth="2.600" />
      <path d="M17 45h14" />
    </svg>
  );
}

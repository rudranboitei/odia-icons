"use client"

import { motion } from "motion/react"

// ✏️ All motif icons live here as plain SVG path data on a 32 × 32 grid.
// These are simple line drawings for the animated previews.
// Swap any entry with the real path data from your icon set.

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return [16 + r * Math.cos(a), 16 + r * Math.sin(a)] as const
}

const spoke = (deg: number) => {
  const [x1, y1] = polar(3.5, deg)
  const [x2, y2] = polar(13, deg)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`
}

const bead = (deg: number) => {
  const [x, y] = polar(8.6, deg)
  return circle(+x.toFixed(2), +y.toFixed(2), 0.9)
}

export const motifs = {
  // Konark sun-temple wheel
  chakra: [
    circle(16, 16, 13),
    circle(16, 16, 3.5),
    ...Array.from({ length: 8 }, (_, k) => spoke(k * 45)),
    ...Array.from({ length: 8 }, (_, k) => bead(k * 45 + 22.5)),
  ],
  // Kalinga-style deula (temple tower)
  deula: [
    "M5 28.5H27",
    "M10 28.5C9.5 21 11 14 14 9.5",
    "M22 28.5C22.5 21 21 14 18 9.5",
    "M13.2 9.5C13.2 7.8 14.4 7 16 7C17.6 7 18.8 7.8 18.8 9.5Z",
    "M16 7V4.8",
    circle(16, 3.7, 1.1),
    "M13.5 28.5V24.5C13.5 22.7 14.6 21.7 16 21.7C17.4 21.7 18.5 22.7 18.5 24.5V28.5",
    "M10.8 18.5H21.2",
    "M12 14H20",
  ],
  // Pattachitra fish
  fish: [
    "M3 16C8 9 17 9 23 16C17 23 8 23 3 16Z",
    "M23 16L29 10.5V21.5Z",
    circle(8.2, 15.2, 0.9),
    "M13 12.5C15 14.5 15 17.5 13 19.5",
    "M17 12C19 14.5 19 17.5 17 20",
  ],
  // Jagannath: big round eyes
  jagannath: [
    "M6 9C6 6.5 7.5 5 10 5H22C24.5 5 26 6.5 26 9V19C26 24 21.5 28 16 28C10.5 28 6 24 6 19Z",
    circle(11.3, 14, 3.4),
    circle(20.7, 14, 3.4),
    circle(11.3, 14, 1),
    circle(20.7, 14, 1),
    "M13 22.5H19",
  ],
}

export type MotifName = keyof typeof motifs

export function MotifIcon({
  name,
  className,
  draw = false,
  delay = 0,
  duration = 6,
  strokeWidth = 1.5,
}: {
  name: MotifName
  className?: string
  /** false = static, "once" = draws in once, "loop" = draws and erases forever */
  draw?: false | "once" | "loop"
  delay?: number
  duration?: number
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {motifs[name].map((d, i) =>
        !draw ? (
          <path key={i} d={d} />
        ) : (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0 }}
            animate={
              draw === "once" ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }
            }
            transition={
              draw === "once"
                ? { duration: 0.9, delay: delay + i * 0.08, ease: "easeInOut" }
                : {
                  duration,
                  times: [0, 0.25, 0.85, 1],
                  delay: delay + i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
            }
          />
        )
      )}
    </svg>
  )
}



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

/** Konark Sun Temple chakra: bead rim, eight spokes with medallions, carved hub. */
export function KonarkWheel({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="24" cy="24" r="21" />
      <circle cx="24" cy="24" r="17.6" strokeDasharray="0.01 2.55" strokeWidth="2.2" className="stroke-primary" />
      <circle cx="24" cy="24" r="15.2" />
      <path d="M24.00 17.50L24.00 8.80M28.60 19.40L34.75 13.25M30.50 24.00L39.20 24.00M28.60 28.60L34.75 34.75M24.00 30.50L24.00 39.20M19.40 28.60L13.25 34.75M17.50 24.00L8.80 24.00M19.40 19.40L13.25 13.25" />
      <circle cx="24.00" cy="13.00" r="1.35" className="stroke-primary" />
      <circle cx="31.78" cy="16.22" r="1.35" className="stroke-primary" />
      <circle cx="35.00" cy="24.00" r="1.35" className="stroke-primary" />
      <circle cx="31.78" cy="31.78" r="1.35" className="stroke-primary" />
      <circle cx="24.00" cy="35.00" r="1.35" className="stroke-primary" />
      <circle cx="16.22" cy="31.78" r="1.35" className="stroke-primary" />
      <circle cx="13.00" cy="24.00" r="1.35" className="stroke-primary" />
      <circle cx="16.22" cy="16.22" r="1.35" className="stroke-primary" />
      <circle cx="24" cy="24" r="6.5" />
      <circle cx="24" cy="24" r="2.4" className="stroke-primary" />
    </svg>
  );
}

/** Kalinga-style temple: curved rekha deula tower with amalaka and kalasa, stepped pidha porch. */
export function Deula({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 42H44" />
      <path d="M24 42V32M42 42V32" />
      <path d="M24 32C24 24 28 17 33 12.5C38 17 42 24 42 32" />
      <path d="M25.16 28.5H40.84M25.93 25H40.07M27.26 21.5H38.74M29.19 18H36.81" className="stroke-primary" />
      <path d="M30 42v-4.5a3 3 0 0 1 6 0V42" />
      <ellipse cx="33" cy="11" rx="4.2" ry="1.6" className="stroke-primary" />
      <path d="M33 9.4V6.2" />
      <circle cx="33" cy="5" r="1.2" className="stroke-primary" />
      <path d="M6 42v-6h18v6" />
      <path d="M8 36l2.5-3h11L24 36" />
      <path d="M11.6 33l2-2.6h6.8l2 2.6" />
      <path d="M15.2 30.4l1.6-2h2.4l1.6 2" />
      <path d="M18 28.4V26" />
      <path d="M15 42v-3.2a2 2 0 0 1 4 0V42" />
    </svg>
  );
}

/** Boita, the traditional Odia trading boat, on waves (Bali Yatra). */
export function Boita({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4.5 26c1 0 2.2.4 2.8 1.6C9 33 14.5 37 24 37s15-4 16.7-9.4c.6-1.2 1.8-1.6 2.8-1.6" />
      <path d="M4.5 26H43.5" />
      <path d="M4.5 26c-.6-2.2.2-4.2 2-5.2M43.5 26c.6-2.2-.2-4.2-2-5.2" />
      <path d="M24 26V7" />
      <path d="M24 9.5c7 1.2 11.2 6.2 12 14.5H24" />
      <path d="M24 12.5c-5 1.4-8.4 5.4-9 11.5h9" className="stroke-primary" />
      <path d="M24 7l7 2.4L24 12" className="stroke-primary" />
      <path d="M13 30.5h22" strokeDasharray="0.01 3" strokeWidth="2" className="stroke-primary" />
      <path d="M3 43c2.7-2.2 5.3-2.2 8 0s5.3 2.2 8 0 5.3-2.2 8 0 5.3 2.2 8 0 5.3-2.2 8 0 4.5 1.4 5-.4" />
    </svg>
  );
}

/** Padma (lotus) with five petals over water lines. */
export function Padma({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M24 7c5 6 5 17 0 26-5-9-5-20 0-26Z" />
      <path d="M24 33C15 32 9 26 8 16c8 1 14 8 16 17Z" />
      <path d="M24 33c9-1 15-7 16-17-8 1-14 8-16 17Z" />
      <path d="M24 35c-8 3-16 1-20-6 8-1 16 0 20 6Z" />
      <path d="M24 35c8 3 16 1 20-6-8-1-16 0-20 6Z" />
      <path d="M24 14v15" className="stroke-primary" />
      <path d="M8 41h32" />
      <path d="M15 44.5h18" className="stroke-primary" />
    </svg>
  );
}

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

/** Rath: the Puri chariot with spoked wheels, tiered roof and flag. */
export function Rath({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="13" cy="36" r="7.500" />
      <circle cx="35" cy="36" r="7.500" />
      <circle cx="13" cy="36" r="1.600" className="stroke-primary" />
      <circle cx="35" cy="36" r="1.600" className="stroke-primary" />
      <path d="M6.80 36.00L19.20 36.00M8.62 31.62L17.38 40.38M13.00 29.80L13.00 42.20M17.38 31.62L8.62 40.38M28.80 36.00L41.20 36.00M30.62 31.62L39.38 40.38M35.00 29.80L35.00 42.20M39.38 31.62L30.62 40.38" />
      <path d="M5 29h38" />
      <path d="M10 29V19h28v10" />
      <path d="M18 29V23h12v6" className="stroke-primary" />
      <path d="M8 19h32M12 15.500h24M16 12h16" />
      <path d="M24 12V5" />
      <path d="M24 5l6 2.200-6 2.200" className="stroke-primary" />
    </svg>
  );
}

/** Machha: Pattachitra-style fish with a decorated eye and scales. */
export function Machha({ className, ...props }: MotifProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4.500 25C10 14 22 12 32 18l11-7c-1.800 6-1.800 20 0 26l-11-7C22 36 10 36 4.500 25Z" />
      <circle cx="12.500" cy="22.500" r="1.800" className="stroke-primary" />
      <path d="M18 17c-3.200 4-3.200 10 0 14" className="stroke-primary" />
      <path d="M23 19.500c2.500 3.200 2.500 6.800 0 10M28 21.500c1.500 2 1.500 4.200 0 6" />
      <path d="M19 14.500c3-3 7.500-3.500 11-1.500" className="stroke-primary" />
      <path d="M19 35.500c3 3 7.500 3.500 11 1.500" />
    </svg>
  );
}

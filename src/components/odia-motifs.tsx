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

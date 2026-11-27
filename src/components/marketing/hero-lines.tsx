"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/*
 * Flowing lines on both sides of the headline.
 *
 * Coordinates are percentages of the headline area, the same as REVEAL in the hero,
 * so each line with an icon passes exactly through that icon's x and y.
 *
 * The SVG is drawn in real pixels (measured with ResizeObserver) instead of a
 * stretched 100x100 viewBox. That keeps the curves identical to before, but it
 * lets us animate dashes and keep round caps without any distortion.
 */

/* Where the lines meet (near the title) and where they leave the screen */
const INNER = 30;
const OUTER = -50;

/* [x, y] points for the left side. The right side is a mirror. */
const LINES: [number, number][] = [
  [16, 12], // home / bell
  [8, 50], // search / user
  [4, 92], // download / settings
  /* extra lines without icons, for density */
  [10, -14],
  [12, 31],
  [10, 70],
  [14, 116],
];

/* Draw order: lines with icons first, so the icons appear as the lines reach them */
const DRAW_DELAY = 0.1;
const DRAW_STEP = 0.07;
const DRAW_TIME = 1.3;

function useSize<T extends Element>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
}

/* Same curve as before, converted from percentages to pixels */
function pathD([x, y]: [number, number], w: number, h: number) {
  const px = (v: number) => (v * w) / 100;
  const py = (v: number) => (v * h) / 100;

  const mid = (INNER + x) / 2;
  const end = y + (y - 50) * 0.6;

  return [
    `M ${px(INNER)} ${py(50)}`,
    `C ${px(mid)} ${py(50)}, ${px(mid)} ${py(y)}, ${px(x)} ${py(y)}`,
    `C ${px(x - 18)} ${py(y)}, ${px(OUTER + 20)} ${py(end)}, ${px(OUTER)} ${py(end)}`,
  ].join(" ");
}

/*
 * One light pulse per line. pathLength="1" means the dash sizes are fractions of the
 * line, so a pulse is always the same share of the line at any screen size.
 * The pulse rests for the last 30% of each cycle so the lines breathe.
 */
const FLOW_CSS = `
@keyframes hero-flow {
  0%   { stroke-dashoffset: 0.14; }
  70%  { stroke-dashoffset: -1; }
  100% { stroke-dashoffset: -1; }
}
.hero-flow {
  stroke-dasharray: 0.14 1.2;
  animation-name: hero-flow;
  animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
  animation-iteration-count: infinite;
}
`;

export function HeroLines({ on = true, reduce = false }: { on?: boolean; reduce?: boolean }) {
  const [ref, { w, h }] = useSize<SVGSVGElement>();
  const ready = w > 0 && h > 0;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={`0 0 ${w || 100} ${h || 100}`}
      fill="none"
      className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
    >
      <style>{FLOW_CSS}</style>

      {ready && (
        <>
          <defs>
            {/* userSpaceOnUse so that the flat middle line gets the gradient too */}
            <linearGradient
              id="hero-line"
              gradientUnits="userSpaceOnUse"
              x1={(OUTER * w) / 100}
              y1="0"
              x2={(INNER * w) / 100}
              y2="0"
            >
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset="0.65" stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>

            {/* Brighter version for the travelling pulse, it fades in and out the same way */}
            <linearGradient
              id="hero-pulse"
              gradientUnits="userSpaceOnUse"
              x1={(OUTER * w) / 100}
              y1="0"
              x2={(INNER * w) / 100}
              y2="0"
            >
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset="0.55" stopColor="white" stopOpacity="1" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[undefined, `translate(${w} 0) scale(-1 1)`].map((mirror, side) => (
            <g key={side} transform={mirror}>
              {LINES.map((point, i) => {
                const d = pathD(point, w, h);
                const delay = DRAW_DELAY + i * DRAW_STEP;

                return (
                  <g key={point.join("-")}>
                    {/* The line itself draws outwards from the title, and pulls back when toggled off */}
                    <motion.path
                      d={d}
                      stroke="url(#hero-line)"
                      strokeWidth={1}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.2 }
                          : on
                            ? { duration: DRAW_TIME, delay, ease: [0.22, 1, 0.36, 1] }
                            : { duration: 0.35, ease: "easeIn" }
                      }
                    />

                    {/* Light pulse that travels along the line, away from the title */}
                    {!reduce && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: on ? 1 : 0 }}
                        transition={{ duration: 0.6, delay: on ? DRAW_TIME + delay : 0 }}
                      >
                        <path
                          d={d}
                          pathLength={1}
                          className="hero-flow"
                          stroke="url(#hero-pulse)"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          style={{
                            animationDuration: `${4 + (i % 4) * 0.7}s`,
                            animationDelay: `${DRAW_TIME + delay + i * 0.45}s`,
                            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.7))",
                          }}
                        />
                      </motion.g>
                    )}
                  </g>
                );
              })}
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

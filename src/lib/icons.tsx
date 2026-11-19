export type IconDef = { name: string; tags: string[]; body: string };
export type Opts = { size: number; stroke: number };

export const icons: IconDef[] = [
  { name: "chakra", tags: ["wheel", "konark", "sun"], body: '<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="3.5"/><path d="M19.5 16H28M18.47 13.53l6.02-6.02M16 12.5V4M13.53 13.53L7.51 7.51M12.5 16H4M13.53 18.47l-6.02 6.02M16 19.5V28M18.47 18.47l6.02 6.02"/>' },
  { name: "deula", tags: ["temple", "kalinga", "tower"], body: '<path d="M9 28V18Q9 11 16 6Q23 11 23 18V28M5 28H27M9 18H23M12 12.5H20M16 6V4.2M14 28v-4.5a2 2 0 0 1 4 0V28"/><circle cx="16" cy="3.2" r="1"/>' },
  { name: "padma", tags: ["lotus", "flower"], body: '<path d="M16 6c4 4 4 12 0 18-4-6-4-14 0-18zM16 24c-6-1-10-5-11-11 5 0 9 4 11 11zM16 24c6-1 10-5 11-11-5 0-9 4-11 11zM8 27.5h16"/>' },
  { name: "jagannath", tags: ["puri", "deity", "ratha"], body: '<path d="M7 22V14a9 9 0 0 1 18 0v8zM11 22v5h10v-5"/><circle cx="12.5" cy="14" r="2.6"/><circle cx="19.5" cy="14" r="2.6"/>' },
  { name: "pattachitra", tags: ["painting", "fish", "art"], body: '<rect x="5" y="5" width="22" height="22" rx="2"/><rect x="9" y="9" width="14" height="14" rx="1"/><path d="M11 16q5-5 10 0q-5 5-10 0zM21 16l2-2M21 16l2 2"/><circle cx="14.5" cy="15.6" r=".6"/>' },
  { name: "ikat", tags: ["weave", "textile", "sambalpuri"], body: '<path d="M16 4l12 12-12 12L4 16zM16 10l6 6-6 6-6-6z"/><circle cx="16" cy="16" r="1"/>' },
];

export const pascal = (n: string) => n.charAt(0).toUpperCase() + n.slice(1) + "Icon";
const els = (body: string, pad: string) =>
  (body.match(/<[^>]+>/g) ?? []).map((e) => pad + e).join("\n");

export const toSvg = (i: IconDef, o: Opts) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${o.size}" height="${o.size}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="${o.stroke}" stroke-linecap="round" stroke-linejoin="round">\n${els(i.body, "  ")}\n</svg>`;

export const toJsx = (i: IconDef, o: Opts) =>
  `<svg width={${o.size}} height={${o.size}} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={${o.stroke}} strokeLinecap="round" strokeLinejoin="round">\n${els(i.body, "  ")}\n</svg>`;

export const toTsx = (i: IconDef, o: Opts) =>
  `import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

export function ${pascal(i.name)}({ size = ${o.size}, strokeWidth = ${o.stroke}, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
${els(i.body, "      ")}
    </svg>
  );
}
`;

// currentColor does not work inside a data URI, so a fixed ink color is used.
export const toDataUri = (i: IconDef, o: Opts) =>
  `data:image/svg+xml,${encodeURIComponent(toSvg(i, o).replace("currentColor", "#232120"))}`;

export const formats = [
  { id: "svg", label: "SVG", run: toSvg, file: (i: IconDef) => `${i.name}.svg`, mime: "image/svg+xml" },
  { id: "jsx", label: "JSX", run: toJsx },
  { id: "tsx", label: "React", run: toTsx, file: (i: IconDef) => `${pascal(i.name)}.tsx`, mime: "text/plain" },
  { id: "uri", label: "Data URI", run: toDataUri },
] as const;

export function Icon({ def, size = 24, stroke = 1.4, className }: { def: IconDef; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: def.body }}
    />
  );
}

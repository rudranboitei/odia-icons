import type { ReactNode } from "react";
import { Icon, iconsByName, type IconDef } from "@/lib/icons";

// Small pill with an icon — the eyebrow used above every section headline.
export function Eyebrow({
  children,
  icon = iconsByName["home"],
}: {
  children: ReactNode;
  icon?: IconDef;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-muted-foreground backdrop-blur">
      <Icon
        def={icon}
        size={12}
        stroke={1.85}
        className="text-primary"
      />
      {children}
    </span>
  );
}

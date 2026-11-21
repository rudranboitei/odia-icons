"use client";

import Image from "next/image";
import { MotionConfig } from "motion/react";

import { cn } from "@/lib/utils";
import type { FeatureMedia as Media } from "@/data/site";
import {
  RootedVisual,
  GridVisual,
  CopyCodeVisual,
  FreeVisual,
} from "./feature-visuals";

const animations = {
  rooted: RootedVisual,
  grid: GridVisual,
  "copy-code": CopyCodeVisual,
  free: FreeVisual,
};

// Renders an animation, a looping video or a GIF depending on config.
// Animations respect the user's "reduce motion" setting, and only loop while
// they are on screen (see feature-visuals.tsx).
export function FeatureMedia({
  media,
  label,
  className,
}: {
  media: Media;
  label: string;
  className?: string;
}) {
  const Visual = media.type === "animation" ? animations[media.name] : null;

  return (
    <div
      // The animated scenes are decorative: give them one text description.
      {...(Visual ? { role: "img", "aria-label": `${label}: illustration` } : {})}
      className={cn(
        "h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:h-64",
        className,
      )}
    >
      <MotionConfig reducedMotion="user">
        {Visual && <Visual />}

        {media.type === "video" && (
          <video
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={label}
            className="size-full object-cover"
          />
        )}

        {media.type === "gif" && (
          <Image
            src={media.src}
            alt={label}
            width={640}
            height={480}
            unoptimized
            className="size-full object-cover"
          />
        )}
      </MotionConfig>
    </div>
  );
}

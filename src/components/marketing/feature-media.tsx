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
// Animations respect the user's "reduce motion" setting.
export function FeatureMedia({
  media,
  label,
  className,
}: {
  media: Media;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-[180px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:h-[220px]",
        className,
      )}
    >
      <MotionConfig reducedMotion="user">
        {media.type === "animation" &&
          (() => {
            const Visual = animations[media.name];
            return <Visual />;
          })()}

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

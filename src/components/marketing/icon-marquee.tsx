import { Icon, icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Two infinite rows of icon cards — the footer flourish of the final CTA.
export function IconMarquee({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative flex flex-col gap-3 select-none sm:gap-4", className)}
    >
      <MarqueeRow />
      <MarqueeRow reverse duration="52s" />
    </div>
  );
}

const sequence = [...icons, ...icons, ...icons];

function MarqueeRow({
  reverse = false,
  duration = "44s",
}: {
  reverse?: boolean;
  duration?: string;
}) {
  return (
    <div className="group relative overflow-hidden">
      <div
        className={cn(
          "icon-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className="flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-3 pr-3 sm:gap-4 sm:pr-4">
              {sequence.map((icon, i) => (
                <div
                  key={`${half}-${icon.name}-${i}`}
                  className="flex h-28 w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-primary/40 sm:h-32 sm:w-44 sm:gap-3"
                >
                  <Icon
                    def={icon}
                    size={44}
                    stroke={2}
                    className="text-foreground"
                  />
                  <span className="text-[13px] leading-[1.2] font-medium capitalize tracking-[-0.03em] text-muted-foreground">
                    {icon.name.replaceAll("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

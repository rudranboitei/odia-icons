import { Icon, icons } from "@/lib/icons"
import { cn } from "@/lib/utils"

// Two infinite rows of icon cards — the hero visual.
export function IconMarquee({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative flex flex-col gap-4 select-none", className)}
    >
      <MarqueeRow />
      <MarqueeRow reverse duration="52s" />
    </div>
  )
}

const sequence = [...icons, ...icons, ...icons]

function MarqueeRow({
  reverse = false,
  duration = "44s",
}: {
  reverse?: boolean
  duration?: string
}) {
  return (
    <div className="group relative overflow-hidden">
      <div
        className={cn(
          "icon-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className="flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-4 pr-4">
              {sequence.map((icon, i) => (
                <div
                  key={`${half}-${icon.name.replaceAll("-", " ")}-${i}`}
                  className="flex h-32 w-44 shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card"
                >
                  <Icon
                    def={icon}
                    size={44}
                    stroke={1.4}
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
  )
}

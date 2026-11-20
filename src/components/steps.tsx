import { SITE } from "@/data/site";
import { Icon, icons } from "@/lib/icons";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function Steps() {
  const { steps } = SITE;

  return (
    <section className="px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={steps.eyebrow}
          title={steps.title}
          accent={steps.accent}
          description={steps.description}
        />

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:mt-10">
          <div
            aria-hidden
            className="flex h-28 items-center justify-center gap-3 overflow-hidden border-b border-white/10 bg-white/[0.02] sm:h-32 sm:gap-4 lg:h-40"
          >
            {[...icons, ...icons].map((icon, i) => (
              <span
                key={`${icon.name}-${i}`}
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-card/40 sm:size-16 lg:size-20"
              >
                <Icon
                  def={icon}
                  size={24}
                  stroke={1.3}
                  className="text-foreground"
                />
              </span>
            ))}
          </div>

          <ol className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {steps.items.map((item, i) => (
              <li key={item.title} className="p-5 sm:p-6 lg:p-8">
                <span className="font-mono text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg leading-[1.4] font-semibold tracking-tight text-foreground sm:text-[21px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

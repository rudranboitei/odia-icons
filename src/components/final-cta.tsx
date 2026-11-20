import { SITE } from "@/data/site";
import { IconMarquee } from "./icon-marquee";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function FinalCta() {
  const { finalCta } = SITE;

  return (
    <section
      id="install"
      className="relative scroll-mt-20 overflow-hidden px-5 pt-14 pb-4 text-center sm:px-6 sm:pt-16 lg:pt-20"
    >
      <Reveal className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow={finalCta.eyebrow}
          title={finalCta.title}
          accent={finalCta.accent}
          description={finalCta.description}
          size="cta"
        />

        <div className="mt-8 flex justify-center sm:mt-10">
          <InstallBox />
        </div>

        <p className="mt-4 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground sm:mt-6">
          {finalCta.helper}
        </p>
      </Reveal>

      <div className="mx-auto mt-10 max-w-6xl sm:mt-14">
        <IconMarquee />
      </div>
    </section>
  );
}

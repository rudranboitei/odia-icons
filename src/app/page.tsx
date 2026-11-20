import { CtaFooter } from "@/components/cta-footer";
import { Hero } from "@/components/hero";
import { IconExplorer } from "@/components/icon-explorer";
import { InstallSection } from "@/components/install-section";

export default function Page() {
  return (
    <main>
      <Hero />
      <IconExplorer />
      <InstallSection />
      <CtaFooter />
    </main>
  );
}

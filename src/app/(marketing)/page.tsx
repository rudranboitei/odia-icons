import { DeveloperSection } from "@/components/marketing/developer";
import { Faq } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Header } from "@/components/marketing/SiteHeader";
import { Steps } from "@/components/marketing/steps";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Header />
      <Hero />
      <Features />
      <Steps />
      <DeveloperSection />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

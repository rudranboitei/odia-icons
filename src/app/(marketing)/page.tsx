import { DeveloperSection } from "@/components/developer";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Quote } from "@/components/quote";
import { Navbar } from "@/components/SiteHeader";
import { Steps } from "@/components/steps";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <Hero />
      <Features />
      <Quote />
      <Steps />
      <DeveloperSection />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

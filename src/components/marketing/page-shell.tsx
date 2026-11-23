import { Footer } from "./footer";
import { Header } from "./SiteHeader";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#f6f4f0] text-neutral-900">
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}

import { Footer } from "./footer";
import { Header } from "./SiteHeader";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#141210] text-white">
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <main className="min-h-dvh pt-20">{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}



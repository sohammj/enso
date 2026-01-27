import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import TransitionProvider from "../TransitionProvider";

import InterstitialPopup from "@/components/InterstitialPopup";
import { urlFor } from "@/sanity/lib/image";
import { fetchInterstitial } from "@/sanity/lib/fetchInterstitial";
import { SanityLive } from "@/sanity/lib/live";

function imgUrl(img: any, w = 1200, h = 1200) {
  if (!img) return "";
  return urlFor(img).width(w).height(h).fit("crop").url();
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const interstitial = await fetchInterstitial();

  // ✅ SERVER: compute URL string here
  const interstitialImageUrl = interstitial?.image
    ? imgUrl(interstitial.image, 1200, 1200)
    : "";

  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <main className="min-h-dvh pt-20">
        <TransitionProvider>{children}</TransitionProvider>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />

      {/* Interstitial lives above all site pages */}
      <InterstitialPopup data={interstitial} imageUrl={interstitialImageUrl} />

      <SanityLive />
    </div>
  );
}

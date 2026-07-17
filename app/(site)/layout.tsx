import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import TransitionProvider from "../TransitionProvider";

import InterstitialPopup from "@/components/InterstitialPopup";
import { urlFor } from "@/sanity/lib/image";
import { fetchInterstitial } from "@/sanity/lib/fetchInterstitial";
import { SanityLive } from "@/sanity/lib/live";
import { JsonLd } from "@/components/JsonLd";

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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://www.ensomindmatters.com/#organization",
    name: "Enso Mind Matters",
    url: "https://www.ensomindmatters.com",
    logo: "https://www.ensomindmatters.com/ensologo.png",
    image: "https://www.ensomindmatters.com/ensologo.png",
    email: "parul.enso@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "United House, 3, Manmala Tank Road, Mainak Wadi, Mahim",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400016",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Mumbai" },
    sameAs: [
      "https://www.instagram.com/enso_mind_matters",
      "https://www.linkedin.com/company/enso-mind-matters",
    ],
  };

  return (
    <div className="relative overflow-x-hidden">
      <JsonLd data={organizationSchema} />
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

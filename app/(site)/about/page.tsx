export const dynamic = "force-dynamic";
export const revalidate = 0;

import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import JourneyHorizontal from "@/components/sections/JourneyHorizontal";

import { fetchAboutPage } from "@/sanity/lib/fetchAboutPage";
import { urlFor } from "@/sanity/lib/image";
import type { JourneyContent } from "@/sanity/lib/types";

function imgUrl(img: any, w = 900, h = 900) {
  if (!img) return "";
  return urlFor(img).width(w).height(h).fit("crop").url();
}

export default async function AboutPage() {
  const data = await fetchAboutPage();

  const journey: JourneyContent = {
    heading: data?.heading || "Our Journey",
    subheading: data?.subheading || "",
    photo1: imgUrl(data?.photos?.photo1, 900, 900),
    photo2: imgUrl(data?.photos?.photo2, 900, 900),
    photo3: imgUrl(data?.photos?.photo3, 900, 900),
    photo4: imgUrl(data?.photos?.photo4, 900, 900),
    photo5: imgUrl(data?.photos?.photo5, 900, 900),

    steps: {
      s1: {
        title: data?.steps?.s1?.title || "",
        body: data?.steps?.s1?.body || "",
      },
      s2: {
        title: data?.steps?.s2?.title || "",
        body: data?.steps?.s2?.body || "",
      },
      s3: {
        title: data?.steps?.s3?.title || "",
        body: data?.steps?.s3?.body || "",
      },
      s4: {
        title: data?.steps?.s4?.title || "",
        body: data?.steps?.s4?.body || "",
      },
      s5: {
        title: data?.steps?.s5?.title || "",
        body: data?.steps?.s5?.body || "",
      },
    },
  };

  return (
    <main className="relative [scroll-behavior:auto]">
      {/* MOBILE: normal flow */}
      <div className="md:hidden pt-24 px-6 pb-12 text-center">
        <h1 className="font-display uppercase tracking-[0.22em] text-[44px] text-black/80">
          {journey.heading}
        </h1>

        {journey.subheading && (
          <p className="mt-4 text-[14px] leading-relaxed text-black/60 max-w-2xl mx-auto">
            {journey.subheading}
          </p>
        )}
      </div>

      {/* DESKTOP: hero section */}
      <div className="hidden md:block">
        {/* Hero section - EXACTLY full screen */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display uppercase tracking-[0.22em] text-[64px] leading-tight text-black/80">
              {journey.heading}
            </h1>

            {journey.subheading && (
              <p className="mt-6 text-[16px] leading-relaxed text-black/60">
                {journey.subheading}
              </p>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-black/40">
            <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
            <svg 
              className="w-6 h-6 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </section>
      </div>

      {/* Horizontal scroll section */}
      <JourneyHorizontal journey={journey} />

      <StickyGetInTouch />
    </main>
  );
}
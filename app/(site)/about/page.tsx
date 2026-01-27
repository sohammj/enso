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
    photo5: imgUrl(data?.photos?.photo5, 900, 900),

    // ✅ NEW: step-5 image (editable in Sanity)
    

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
      // ✅ FIXED: was incorrectly using s3
      s4: {
        title: data?.steps?.s4?.title || "",
        body: data?.steps?.s4?.body || "",
      },
      // ✅ FIXED: was incorrectly using s4
      s5: {
        title: data?.steps?.s5?.title || "",
        body: data?.steps?.s5?.body || "",
      },
    },
  };

  return (
    <main className="relative">
      {/* MOBILE: normal flow (pushes content down) */}
      <div className="md:hidden pt-24 px-6 text-center">
        <h1 className="font-display uppercase tracking-[0.22em] text-[44px] text-black/80">
          {journey.heading}
        </h1>

        {journey.subheading && (
          <p className="mt-4 text-[14px] leading-relaxed text-black/60">
            {journey.subheading}
          </p>
        )}
      </div>

      {/* DESKTOP: absolute overlay (your current look) */}
      <div className="hidden md:block">
        <h1
          className="
            pointer-events-none
            absolute left-1/2 top-50 -translate-x-1/2
            z-30
            font-display uppercase tracking-[0.22em]
            text-[64px]
            text-black/80
          "
        >
          {journey.heading}
        </h1>

        {journey.subheading && (
          <p
            className="
              pointer-events-none
              absolute left-1/2 top-[120px] -translate-x-1/2
              z-30
              max-w-2xl px-6 text-center
              text-[16px]
              text-black/60
            "
          >
            {journey.subheading}
          </p>
        )}
      </div>

      <div className="pt-38 md:pt-48">
          <JourneyHorizontal journey={journey} />
        </div>


      <StickyGetInTouch />
    </main>
  );
}
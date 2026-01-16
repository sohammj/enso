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
    photo1: imgUrl(data?.photos?.photo1, 900, 900),
    photo2: imgUrl(data?.photos?.photo2, 900, 900),
    photo3: imgUrl(data?.photos?.photo3, 900, 900),
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
        title: data?.steps?.s3?.title || "",
        body: data?.steps?.s3?.body || "",
      },
      s5: {
        title: data?.steps?.s4?.title || "",
        body: data?.steps?.s4?.body || "",
      },
    },
  };

  return (
    <main className="relative">
      <div className="relative">
        <h1
          className="
            pointer-events-none
            absolute left-1/2 top-50 -translate-x-1/2
            z-30
            font-display uppercase tracking-[0.22em]
            text-[46px] md:text-[64px]
            text-black/80
          "
        >
          {journey.heading}
        </h1>

        <div className="pt-24 md:pt-28">
          <JourneyHorizontal journey={journey} />
        </div>
      </div>

      <StickyGetInTouch />
    </main>
  );
}

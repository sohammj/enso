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
    {/* <div className="max-w-[540px] mx-auto my-24">
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        <iframe
          src="https://www.instagram.com/reel/DOs817lAZPt/embed/captioned/?cr=1&v=14&captioned=0"
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowTransparency
        />
      </div>
    </div> */}



    {/* <!-- Elfsight Instagram Feed | Untitled Instagram Feed -->
    <script src="https://elfsightcdn.com/platform.js" async></script>
    <div className="elfsight-app-1decc3f6-c086-4ab9-9262-1d5ecf4ed33f" data-elfsight-app-lazy></div> */}

    </main>
  );
}

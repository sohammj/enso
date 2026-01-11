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
        no: data?.steps?.s1?.no || "01",
        title: data?.steps?.s1?.title || "BRIEFING",
        body:
          data?.steps?.s1?.body ||
          "Meeting (in person or via video call) and discussion of the project idea. We listen to your wishes and goals to understand exactly what you want to achieve.",
      },
      s2: {
        no: data?.steps?.s2?.no || "02",
        title: data?.steps?.s2?.title || "ANALYTICS",
        body:
          data?.steps?.s2?.body ||
          "After prepayment, we conduct a comprehensive market analysis, study competitors, and identify the target audience. Based on the collected information, we prepare the project's technical specification (TS) and agree on it with you.",
      },
      s3: {
        no: data?.steps?.s3?.no || "03",
        title: data?.steps?.s3?.title || "CONCEPT",
        body:
          data?.steps?.s3?.body ||
          "We are starting to develop the design of the first page. We create a concept and present it to you. After receiving feedback, we make the necessary adjustments and approve the final version.",
      },
      s4: {
        topLeftTitle: data?.steps?.s4?.topLeftTitle || "DESIGN-PROJECT",
        topLeftBody:
          data?.steps?.s4?.topLeftBody ||
          "Based on the approved concept, we are developing the design of all other pages. We present each page and coordinate it with you to make sure that the result meets your expectations.",
        topRightStep: data?.steps?.s4?.topRightStep || "05",
        bottomLeftStep: data?.steps?.s4?.bottomLeftStep || "04",
        bottomRightTitle: data?.steps?.s4?.bottomRightTitle || "DEVELOPMENT",
        bottomRightBody:
          data?.steps?.s4?.bottomRightBody ||
          "At the final stage, we begin the project's layout and development. We are presenting the completed website to you for review. We make any necessary adjustments, if required, and upon completion, sign the acceptance certificate, finalizing the project in accordance with all your requirements.",
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

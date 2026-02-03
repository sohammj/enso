export const dynamic = "force-dynamic";
export const revalidate = 0;

import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import JourneyHorizontal from "@/components/sections/JourneyHorizontal";

import { fetchAboutPage } from "@/sanity/lib/fetchAboutPage";
import { urlFor } from "@/sanity/lib/image";
import type { JourneyContent } from "@/sanity/lib/types";
import { PortableText } from "@portabletext/react";
import AboutStatsTicker from "@/components/sections/AboutStatsTicker";


function imgUrl(img: any, w = 900, h = 900) {
  if (!img) return "";
  return urlFor(img).width(w).height(h).fit("crop").url();
}

export default async function AboutPage() {
  const data = await fetchAboutPage();


  const clientsSeen = data?.clientsSeen ?? 0;
  const workshops = data?.workshops ?? 0;


  <AboutStatsTicker clientsSeen={clientsSeen} workshops={workshops} />



  // Create array of photos with their URLs, filtering out empty ones
  const photosArray = [
    { key: 'photo1', url: imgUrl(data?.photos?.photo1, 900, 900), original: data?.photos?.photo1 },
    { key: 'photo2', url: imgUrl(data?.photos?.photo2, 900, 900), original: data?.photos?.photo2 },
    { key: 'photo3', url: imgUrl(data?.photos?.photo3, 900, 900), original: data?.photos?.photo3 },
    { key: 'photo4', url: imgUrl(data?.photos?.photo4, 900, 900), original: data?.photos?.photo4 },
    { key: 'photo5', url: imgUrl(data?.photos?.photo5, 900, 900), original: data?.photos?.photo5 },
  ].filter(photo => photo.original); // Only keep photos that have actual data

  // Build journey object with only valid photos
  const photo1 = photosArray[0]?.url ?? "";
  const photo2 = photosArray[1]?.url ?? "";
  const photo3 = photosArray[2]?.url ?? "";
  const photo4 = photosArray[3]?.url ?? "";
  const photo5 = photosArray[4]?.url ?? "";

  const journey: JourneyContent = {
    heading: data?.heading || "Our Journey",
    subheading: data?.subheading || [],
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,

    steps: {
      s1: { title: data?.steps?.s1?.title || [], body: data?.steps?.s1?.body || [] },
      s2: { title: data?.steps?.s2?.title || [], body: data?.steps?.s2?.body || [] },
      s3: { title: data?.steps?.s3?.title || [], body: data?.steps?.s3?.body || [] },
      s4: { title: data?.steps?.s4?.title || [], body: data?.steps?.s4?.body || [] },
      s5: { title: data?.steps?.s5?.title || [], body: data?.steps?.s5?.body || [] },
    },
  };

  return (
    <main className="relative [scroll-behavior:auto]">
      {/* MOBILE: normal flow */}
      {/* MOBILE: normal flow */}
      <div className="md:hidden pt-24 px-6 pb-12 text-center">
        <h1 className="font-display uppercase tracking-[0.22em] text-[44px] text-black/80">
          {journey.heading}
        </h1>

        {journey.subheading?.length ? (
          <div className="mt-4 text-[14px] leading-relaxed text-black/60 max-w-2xl mx-auto">
            <PortableText value={journey.subheading} />
          </div>
        ) : null}

        <div className="mt-10">
          <AboutStatsTicker clientsSeen={clientsSeen} workshops={workshops} />
        </div>
      </div>


      {/* ✅ DESKTOP ONLY: hero section (HIDE ON MOBILE) */}
      <section
        className="hidden md:block relative h-screen w-full px-6 text-center"
        aria-hidden
      >
        <div className="h-full max-w-5xl mx-auto grid grid-rows-[1fr_auto_1fr]">
          {/* TOP */}
          <div className="flex items-end justify-center pb-10">
            <h1 className="font-display uppercase tracking-[0.22em] text-[72px] leading-[0.95] text-black/80">
              {journey.heading}
            </h1>
          </div>

          {/* MIDDLE */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-px w-24 bg-black/15 mb-10" />

            {journey.subheading?.length ? (
              <div className="max-w-3xl text-[20px] leading-[1.9] text-black/55">
                <PortableText value={journey.subheading} />
              </div>
            ) : null}

            <div className="mt-12">
              <AboutStatsTicker clientsSeen={clientsSeen} workshops={workshops} />
            </div>
          </div>


          {/* BOTTOM */}
          <div className="flex items-end justify-center pb-16">
            <div className="flex flex-col items-center gap-3 text-black/40">
              <span className="text-xs uppercase tracking-[0.2em]">
                Scroll to know more about me
              </span>
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
          </div>
        </div>
      </section>

      {/* Horizontal scroll section */}
      <JourneyHorizontal journey={journey} />

      <StickyGetInTouch />
    </main>
  );
}
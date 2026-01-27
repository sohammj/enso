"use client";

import Image from "next/image";
import Link from "next/link";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";
import type { Service } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";
import SocialRail from "@/components/SocialRail";


function ptToPlainText(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) return "";
  return blocks
    .map((block) =>
      block._type === "block"
        ? (block.children || []).map((child: any) => child.text).join("")
        : ""
    )
    .join("\n");
}


function isSvgUrl(url?: string | null) {
  if (!url) return false;
  return url.split("?")[0].toLowerCase().endsWith(".svg");
}

export default function ServicesClient({ services }: { services: Service[] }) {
  const bgColors = ["#FFF2CC", "#F4EFEA", "#F8D7C4", "#DCEEEA"];
  const getBg = (i: number) => bgColors[i % bgColors.length];

  return (
    <main className="bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] min-h-screen relative overflow-visible">
      {/* HEADER */}
      <section className="pt-24 md:pt-28 pb-16 md:pb-24 text-center px-6 relative z-20">
        <h1 className="font-[Playfair_Display] text-[40px] md:text-[56px] leading-tight">
          Our Services
        </h1>

        <div className="w-20 md:w-28 h-[2px] bg-[#B88933] mx-auto my-6" />

        <p className="text-[16px] md:text-[18px] opacity-80 max-w-2xl mx-auto">
          Explore how Enso Counseling and Art Therapy Centre supports individuals
          in expressing, processing, and healing through creative practices.
        </p>
      </section>

      {/* 🦋 LEFT TOP CLUSTER */}
      <div className="hidden md:block absolute left-[40px] top-[200px] opacity-85 z-[60]">
        <Dragonfly
          className="w-[140px] rotate-[-18deg]"
          drift={28}
          twist={8}
          floatDuration={8}
        />
      </div>
      <div className="hidden md:block absolute left-[80px] top-[340px] opacity-85 z-[60]">
        <Dragonfly
          className="w-[100px] rotate-[8deg]"
          drift={24}
          twist={6}
          floatDuration={8}
        />
      </div>

      {/* 🦋 RIGHT SIDE */}
      <div className="hidden md:block absolute right-[50px] top-[420px] opacity-80 z-[60]">
        <Dragonfly
          className="w-[110px] rotate-[-10deg]"
          drift={22}
          twist={7}
          floatDuration={8}
        />
      </div>

      {/* SERVICES CARDS */}
      <section className="pb-32 md:pb-40 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">


          {services.map((service, i) => {
            const bg = getBg(i);
            const slug = service.slug || "";
            const iconSrc = service.icon
              ? urlFor(service.icon).width(200).height(200).fit("max").url()
              : null;

            const plainDesc = ptToPlainText(service.description);
            const previewText =
              service.preview || (plainDesc ? plainDesc.slice(0, 160) + (plainDesc.length > 160 ? "…" : "") : "");


            return (
              <Link key={service._id || slug || i} href={`/services/${slug}`} className="cursor-pointer  w-full md:max-w-[420px]">
                {/* ✅ MOBILE: static card */}
                <div
                  style={{ backgroundColor: bg }}
                  className="md:hidden relative h-[360px] w-full rounded-[28px]
                            px-8 pt-16 pb-10 shadow-sm
                            flex flex-col items-center text-center"
                >
                  <div className="absolute -top-5 -left-5 w-14 h-14">
                    <Image
                      src="/enso.png"
                      alt="Enso"
                      width={56}
                      height={56}
                      className="drop-shadow-md"
                    />
                  </div>

                  <h3 className="font-[Playfair_Display] text-[22px] mb-4 border-b border-[#0E1E2A]/40 pb-2">
                    {service.title}
                  </h3>

                  {/* ✅ ICON on mobile (same logic as desktop) */}
                  <div className="h-[95px] flex items-center justify-center mb-4">
                    {iconSrc ? (
                      isSvgUrl(iconSrc) ? (
                        <img
                          src={iconSrc}
                          alt={service.title || "Service"}
                          className="w-[80px] h-[80px] object-contain opacity-90"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={iconSrc}
                          alt={service.title || "Service"}
                          width={80}
                          height={80}
                          className="object-contain opacity-90"
                        />
                      )
                    ) : (
                      <div className="text-sm opacity-60">Explore</div>
                    )}
                  </div>

                  <p className="text-[15px] leading-[1.75] opacity-80">
                    {previewText}
                  </p>
                </div>


                {/* ✅ DESKTOP: flip on hover */}
                <div className="hidden md:block group" style={{ perspective: "1200px" }}>
                  <div
                    className="relative h-[380px] w-full transition-transform duration-700
                               ease-[cubic-bezier(0.4,0,0.2,1)]
                               [transform-style:preserve-3d]
                               group-hover:[transform:rotateY(180deg)]"
                  >
                    {/* FRONT */}
                    <div
                      style={{ backgroundColor: bg }}
                      className="absolute inset-0 rounded-[32px]
                                 px-12 pt-20 pb-14 shadow-sm
                                 flex flex-col items-center
                                 [backface-visibility:hidden]"
                    >
                      <div className="absolute -top-5 -left-5 w-14 h-14">
                        <Image
                          src="/enso.png"
                          alt="Enso"
                          width={56}
                          height={56}
                          className="drop-shadow-md"
                        />
                      </div>

                      <div className="min-h-[72px] flex items-center justify-center">
                        <h3 className="font-[Playfair_Display] text-[28px] text-center leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      <div className="h-[200px] flex items-center justify-center mt-6">
                        {iconSrc ? (
                          isSvgUrl(iconSrc) ? (
                            <img
                              src={iconSrc}
                              alt={service.title || "Service"}
                              className="w-[88px] h-[88px] object-contain opacity-90"
                              loading="lazy"
                            />
                          ) : (
                            <Image
                              src={iconSrc}
                              alt={service.title || "Service"}
                              width={88}
                              height={88}
                              className="object-contain opacity-90"
                            />
                          )
                        ) : (
                          <div className="text-sm opacity-60">Explore</div>
                        )}
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      style={{ backgroundColor: bg }}
                      className="absolute inset-0 rounded-[32px]
                                 px-10 pt-20 pb-12 shadow-sm
                                 flex flex-col items-center text-center
                                 [transform:rotateY(180deg)]
                                 [backface-visibility:hidden]"
                    >
                      <div className="absolute -top-5 -left-5 w-14 h-14">
                        <Image
                          src="/enso.png"
                          alt="Enso"
                          width={56}
                          height={56}
                          className="drop-shadow-md"
                        />
                      </div>

                      <h3 className="font-[Playfair_Display] text-[24px] mb-3 border-b border-[#0E1E2A]/40 pb-2">
                        {service.title}
                      </h3>

                      <p className="text-[16px] leading-[1.8] opacity-80 mt-2">
                        {previewText}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      </section>
      <SocialRail desktop mobile="bar" />

      <StickyGetInTouch />
    </main>
  );
}
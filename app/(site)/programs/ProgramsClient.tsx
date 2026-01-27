"use client";

import Image from "next/image";
import Link from "next/link";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";
import type { Program } from "@/sanity/lib/types";
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


export default function ProgramsClient({ programs }: { programs: Program[] }) {
  const bgColors = ["#FFF2CC", "#F4EFEA", "#F8D7C4", "#DCEEEA"];

  const ongoing = programs.filter((p) => p.status === "ongoing");
  const past = programs.filter((p) => p.status === "past");

  const getBg = (i: number) => bgColors[i % bgColors.length];

  function isSvgUrl(url?: string | null) {
    if (!url) return false;
    return url.split("?")[0].toLowerCase().endsWith(".svg");
  }

  const Section = ({
    title,
    subtitle,
    items,
  }: {
    title: string;
    subtitle: string;
    items: Program[];
  }) => (
    <section className="pb-20 relative">
      <div className="text-center px-6">
        {!!title && (
          <h2 className="font-[Playfair_Display] text-[30px] md:text-[40px]">
            {title}
          </h2>
        )}
        {!!subtitle && (
          <p className="mt-3 text-[15px] md:text-[16px] opacity-75 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {items.map((program, i) => {
              const bg = getBg(i);
              const isPast = program.status === "past";
              const badgeSrc = "/enso.png";
              const slug = program.slug || "";

              const iconSrc = program.icon
                ? urlFor(program.icon).width(200).height(200).fit("max").url()
                : null;

              return (
                <Link
                  key={program._id || slug || i}
                  href={`/programs/${slug}`}
                  className="cursor-pointer w-full md:w-[calc(50%-1.75rem)] lg:w-[calc(33.333%-2.333rem)] max-w-[380px]"
                >
                  {/* ✅ MOBILE: no flip */}
                  <div
                    style={{ backgroundColor: bg }}
                    className="md:hidden relative h-[320px] w-full rounded-[28px] px-8 pt-16 pb-10 shadow-sm
                               flex flex-col items-center text-center"
                  >
                    <div className="absolute -top-5 -left-5 w-14 h-14">
                      <Image
                        src={badgeSrc}
                        alt="Enso"
                        width={56}
                        height={56}
                        className="drop-shadow-md"
                      />
                    </div>

                    {isPast && (
                      <div className="absolute top-5 right-5 rounded-full border border-[#0E1E2A]/20 px-3 py-1 text-[12px] opacity-70">
                        Past Program
                      </div>
                    )}

                    <h3 className="font-[Playfair_Display] text-[22px] text-[#0E1E2A] mb-3 border-b border-[#0E1E2A]/40 pb-2">
                      {program.title}
                    </h3>

                    <p className="text-[15px] leading-[1.75] opacity-80 mt-2">
                      {program.preview ?? ptToPlainText(program.description).slice(0, 160)}
                    </p>

                  </div>

                  {/* ✅ DESKTOP: flip */}
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
                          <Image src={badgeSrc} alt="Enso" width={56} height={56} className="drop-shadow-md" />
                        </div>

                        {isPast && (
                          <div className="absolute top-6 right-6 rounded-full border border-[#0E1E2A]/20 px-3 py-1 text-[12px] opacity-70">
                            Past Program
                          </div>
                        )}

                        <div className="min-h-[72px] flex items-center justify-center">
                          <h3 className="font-[Playfair_Display] text-[28px] text-center leading-snug">
                            {program.title}
                          </h3>
                        </div>

                        <div className="h-[200px] flex items-center justify-center mt-6">
                          {iconSrc ? (
                            isSvgUrl(iconSrc) ? (
                              <img
                                src={iconSrc}
                                alt={program.title || "Program"}
                                className="w-[88px] h-[88px] object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <Image
                                src={iconSrc}
                                alt={program.title || "Program"}
                                width={88}
                                height={88}
                                className="object-contain"
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
                          <Image src={badgeSrc} alt="Enso" width={56} height={56} className="drop-shadow-md" />
                        </div>

                        {isPast && (
                          <div className="absolute top-6 right-6 rounded-full border border-[#0E1E2A]/20 px-3 py-1 text-[12px] opacity-70">
                            Past Program
                          </div>
                        )}

                        <h3 className="font-[Playfair_Display] text-[24px] mb-3 border-b border-[#0E1E2A]/40 pb-2">
                          {program.title}
                        </h3>

                        <p className="text-[16px] leading-[1.8] opacity-80 mt-2">
                            {program.preview ?? ptToPlainText(program.description).slice(0, 160)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <main className="bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] min-h-screen relative overflow-visible">
      <SocialRail desktop mobile="bar" />
      <section className="pt-24 md:pt-28 pb-12 md:pb-16 text-center px-6 relative z-20">
        <h1 className="font-[Playfair_Display] text-[40px] md:text-[56px] leading-tight">
          Our Programs
        </h1>

        <div className="w-20 md:w-28 h-[2px] bg-[#B88933] mx-auto my-6" />

        <p className="text-[16px] md:text-[18px] opacity-80 max-w-xl mx-auto">
          Explore ways to express, connect, and heal through creativity.
        </p>
      </section>

      {/* 🦋 LEFT TOP */}
      <div className="hidden md:block absolute left-[50px] top-[200px] opacity-85 z-[50]">
        <Dragonfly
          className="w-[135px] rotate-[-20deg]"
          drift={26}
          twist={7}
          floatDuration={8}
        />
      </div>

      {/* 🦋 RIGHT MIDDLE */}
      <div className="hidden md:block absolute right-[40px] top-[600px] opacity-80 z-[5]">
        <Dragonfly
          className="w-[115px] rotate-[-8deg]"
          drift={20}
          twist={5}
          floatDuration={8}
        />
      </div>

      {/* 🦋 BOTTOM LEFT (for Past Programs section) */}
      <div className="hidden md:block absolute left-[90px] top-[1100px] opacity-75 z-[5]">
        <Dragonfly
          className="w-[120px] rotate-[25deg]"
          drift={22}
          twist={6}
          floatDuration={8}
        />
      </div>

      {/* 🦋 BOTTOM RIGHT (for Past Programs section) */}
      <div className="hidden md:block absolute right-[100px] top-[1200px] opacity-75 z-[5]">
        <Dragonfly
          className="w-[110px] rotate-[-15deg]"
          drift={20}
          twist={6}
          floatDuration={8}
        />
      </div>

      <Section title="" subtitle="" items={ongoing} />

      <Section
        title="Past Programs"
        subtitle="Programs we've previously hosted that continue to shape our approach and philosophy."
        items={past}
      />

      <div className="pb-32 md:pb-40">
        <StickyGetInTouch />
      </div>
    </main>
  );
}
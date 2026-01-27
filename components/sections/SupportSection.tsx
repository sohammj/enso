"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SupportCard } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

export default function SupportSection({
  title = "How We Support You",
  subtitle = "Different paths, one purpose — helping you reconnect with yourself.",
  cards = [],
}: {
  title?: string;
  subtitle?: string;
  cards?: SupportCard[];
}) {
  const router = useRouter();

  return (
    <section className="pt-8 pb-20 bg-[url('/paper-texture.jpg')] bg-repeat">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-6">
        <h2 className="font-[Playfair_Display] text-[40px] md:text-[56px] leading-tight text-[#0E1E2A]">
          {title}
        </h2>

        <div className="w-20 md:w-28 h-[2px] bg-[#B88933] mx-auto my-6" />

        <p className="text-[16px] md:text-[18px] text-[#0E1E2A]/80">
          {subtitle}
        </p>
      </div>

      {/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 px-6"> */}
      {/* <div
        className="
          max-w-6xl mx-auto px-6
          grid gap-8 md:gap-14
          justify-center justify-items-center
          [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]
        "
      > */}
      <div
        className={[
          "max-w-6xl mx-auto px-6 grid gap-8 md:gap-14",
          cards.length >= 4
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" // ✅ your original 4-card layout
            : "justify-center justify-items-center [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]", // ✅ your centered auto-fit layout
        ].join(" ")}
      >


        {cards.map((card, i) => {
          const bg = card.bg || "#F4EFEA";

          const iconSrc =
            card.icon
              ? urlFor(card.icon).width(200).height(200).fit("crop").url()
              : card.fallbackIconPath || "/icons/individual.png";

          return (
            <div
              key={i}
              className="cursor-pointer w-full"
              onClick={() => card.href && router.push(card.href)}
            >

              {/* MOBILE */}
              <div
                style={{ backgroundColor: bg }}
                className="md:hidden relative h-[380px] w-full rounded-[28px] px-8 pt-16 pb-10 shadow-sm flex flex-col items-center text-center"
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

                <h3 className="font-[Playfair_Display] text-[22px] text-[#0E1E2A] mb-4 border-b border-[#0E1E2A]/50 pb-2">
                  {card.title}
                </h3>

                <div className="h-[100px] flex items-center justify-center mb-4">
                  <Image
                    src={iconSrc}
                    alt={card.title || "Support icon"}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <p className="text-[15px] leading-[1.75] text-[#0E1E2A]/80">
                  {card.description}
                </p>
              </div>

              {/* DESKTOP: flip */}
              <div className="hidden md:block group" style={{ perspective: "1200px" }}>
                <div
                  className="relative h-[380px] w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* FRONT */}
                  <div
                    style={{ backgroundColor: bg }}
                    className="absolute inset-0 rounded-[32px] px-12 pt-20 pb-14 shadow-sm flex flex-col items-center [backface-visibility:hidden]"
                  >
                    <div className="absolute -top-5 -left-5 w-14 h-14">
                      <Image src="/enso.png" alt="Enso" width={56} height={56} className="drop-shadow-md" />
                    </div>

                    <div className="min-h-[72px] flex items-center justify-center">
                      <h3 className="font-[Playfair_Display] text-[28px] text-[#0E1E2A] text-center leading-snug">
                        {card.title}
                      </h3>
                    </div>

                    <div className="h-[200px] flex items-center justify-center mt-6">
                      <Image
                        src={iconSrc}
                        alt={card.title || "Support icon"}
                        width={88}
                        height={88}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    style={{ backgroundColor: bg }}
                    className="absolute inset-0 rounded-[28px] px-10 pt-20 pb-12 shadow-sm flex flex-col items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  >
                    <div className="absolute -top-5 -left-5 w-14 h-14">
                      <Image src="/enso.png" alt="Enso" width={56} height={56} className="drop-shadow-md" />
                    </div>

                    <h3 className="font-[Playfair_Display] text-[24px] text-[#0E1E2A] mb-3 border-b border-[#0E1E2A]/50 pb-2">
                      {card.title}
                    </h3>

                    <p className="text-[16px] leading-[1.8] text-[#0E1E2A]/80 mt-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
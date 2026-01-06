"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Individual Therapy",
    description:
      "Space to pause, reflect, and work through emotions at your own pace.",
    bg: "#FFF2CC",
    href: "/services/individual-sessions",
    image: "/icons/individual.png",
  },
  {
    title: "Group Therapy",
    description: "Grow through shared stories, connection, and collective healing.",
    bg: "#F4EFEA",
    href: "/services/group-sessions",
    image: "/icons/group.png",
  },
  {
    title: "NGO Collaborations",
    description:
      "Bringing art and therapy to spaces where voices need to be seen and supported.",
    bg: "#F8D7C4",
    href: "/services/workshops-and-training",
    image: "/icons/ngo.png",
  },
  {
    title: "Corporate Sessions",
    description:
      "Reflective and creative experiences that bring balance, awareness, and connection to teams.",
    bg: "#DCEEEA",
    href: "/services/workshops-and-training",
    image: "/icons/corporate.png",
  },
];

export default function SupportSection() {
  const router = useRouter();

  return (
    <section className="pt-8 pb-20 bg-[url('/paper-texture.jpg')] bg-repeat">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-6">
        <h2 className="font-[Playfair_Display] text-[40px] md:text-[56px] leading-tight text-[#0E1E2A]">
          How We Support You
        </h2>

        <div className="w-20 md:w-28 h-[2px] bg-[#B88933] mx-auto my-6" />

        <p className="text-[16px] md:text-[18px] text-[#0E1E2A]/80">
          Different paths, one purpose — helping you reconnect with yourself.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 px-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="cursor-pointer"
            onClick={() => router.push(card.href)}
          >
            {/* ✅ MOBILE: no flip, always “back” content */}
            <div
              style={{ backgroundColor: card.bg }}
              className="md:hidden relative h-[320px] w-full rounded-[28px] px-8 pt-16 pb-10 shadow-sm
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

              <h3 className="font-[Playfair_Display] text-[22px] text-[#0E1E2A] mb-3 border-b border-[#0E1E2A]/50 pb-2">
                {card.title}
              </h3>

              <p className="text-[15px] leading-[1.75] text-[#0E1E2A]/80 mt-2">
                {card.description}
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
                  style={{ backgroundColor: card.bg }}
                  className="absolute inset-0 rounded-[32px] px-12 pt-20 pb-14 shadow-sm
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
                    <h3 className="font-[Playfair_Display] text-[28px] text-[#0E1E2A] text-center leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  <div className="h-[200px] flex items-center justify-center mt-6">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={88}
                      height={88}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* BACK */}
                <div
                  style={{ backgroundColor: card.bg }}
                  className="absolute inset-0 rounded-[28px] px-10 pt-20 pb-12 shadow-sm
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
        ))}
      </div>
    </section>
  );
}

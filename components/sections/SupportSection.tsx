"use client";

import Image from "next/image";

const cards = [
  {
    title: "Individual Therapy",
    description:
      "Space to pause, reflect, and work through emotions at your own pace.",
    bg: "#FFF2CC",
  },
  {
    title: "Group Therapy",
    description:
      "Grow through shared stories, connection, and collective healing.",
    bg: "#F4EFEA",
  },
  {
    title: "NGO Collaborations",
    description:
      "Bringing art and therapy to spaces where voices need to be seen and supported.",
    bg: "#F8D7C4",
  },
  {
    title: "Corporate Sessions",
    description:
      "Reflective and creative experiences that bring balance, awareness, and connection to teams.",
    bg: "#DCEEEA",
  },
];

export default function SupportSection() {
  return (
    <section className="py-40 bg-[url('/paper-texture.jpg')] bg-repeat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-24 px-6">
        <h2 className="font-[Playfair_Display] text-[56px] leading-tight text-[#0E1E2A]">
          How We Support You
        </h2>

        <div className="w-28 h-[2px] bg-[#B88933] mx-auto my-6" />

        <p className="text-[18px] text-[#0E1E2A]/80">
          Different paths, one purpose — helping you reconnect with yourself.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 px-6">
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ backgroundColor: card.bg }}
            className="relative rounded-[28px] px-10 pt-20 pb-12 shadow-sm"
          >
            {/* Enso badge */}
            <div className="absolute -top-5 -left-5 w-14 h-14 flex items-center justify-center">
              <Image
                src="/enso.png"
                alt="Enso"
                width={56}
                height={56}
                className="drop-shadow-md"
              />
            </div>


            <h3 className="font-[Playfair_Display] text-[24px] text-[#0E1E2A] mb-4">
              {card.title}
            </h3>

            <p className="text-[16px] leading-[1.8] text-[#0E1E2A]/80">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

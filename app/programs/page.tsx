"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { programs } from "../../lib/data";

export default function ProgramsPage() {
  const router = useRouter();

  const bgColors = ["#FFF2CC", "#F4EFEA", "#F8D7C4", "#DCEEEA"];

  return (
    <main className="bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] min-h-screen">

      {/* HEADER */}
      <section className="pt-28 pb-24 text-center px-6">
        <h1 className="font-[Playfair_Display] text-[56px] leading-tight">
          Our Programs
        </h1>

        <div className="w-28 h-[2px] bg-[#B88933] mx-auto my-6" />

        <p className="text-[18px] opacity-80 max-w-xl mx-auto">
          Explore ways to express, connect, and heal through creativity.
        </p>
      </section>

      {/* PROGRAM CARDS */}
      <section className="pb-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 px-6">

          {programs.map((program, i) => (
            <div
              key={program.slug}
              className="group cursor-pointer"
              style={{ perspective: "1200px" }}
              onClick={() => router.push(`/programs/${program.slug}`)}
            >
              <div
                className="
                  relative h-[380px] w-full
                  transition-transform duration-700
                  ease-[cubic-bezier(0.4,0,0.2,1)]
                  [transform-style:preserve-3d]
                  group-hover:[transform:rotateY(180deg)]
                "
              >
                {/* FRONT */}
                <div
                  style={{ backgroundColor: bgColors[i % bgColors.length] }}
                  className="
                    absolute inset-0 rounded-[32px]
                    px-12 pt-20 pb-14 shadow-sm
                    flex flex-col items-center
                    [backface-visibility:hidden]
                  "
                >
                  {/* ENSO BADGE */}
                  <div className="absolute -top-5 -left-5 w-14 h-14">
                    <Image
                      src="/enso.png"
                      alt="Enso"
                      width={56}
                      height={56}
                      className="drop-shadow-md"
                    />
                  </div>

                  {/* TITLE */}
                  <div className="min-h-[72px] flex items-center justify-center">
                    <h3 className="font-[Playfair_Display] text-[28px] text-center leading-snug">
                      {program.title}
                    </h3>
                  </div>

                  {/* ICON */}
                  <div className="h-[200px] flex items-center justify-center mt-6">
                    <Image
                      src={program.icon}
                      alt={program.title}
                      width={88}
                      height={88}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* BACK */}
                <div
                  style={{ backgroundColor: bgColors[i % bgColors.length] }}
                  className="
                    absolute inset-0 rounded-[32px]
                    px-10 pt-20 pb-12 shadow-sm
                    flex flex-col items-center text-center
                    [transform:rotateY(180deg)]
                    [backface-visibility:hidden]
                  "
                >
                  {/* ENSO BADGE */}
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
                    {program.title}
                  </h3>

                  <p className="text-[16px] leading-[1.8] opacity-80 mt-2">
                    {program.description[0]}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}

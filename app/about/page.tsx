import Image from "next/image";
import { founder, studioInfo } from "../../lib/data";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";

export default function AboutPage() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">

      {/* ===== INTRO ===== */}
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-[#0E1E2A]">
          Our Journey
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[#0E1E2A]/80">
          {studioInfo.name} is a space for emotional expression and holistic
          well-being through Art-Based Therapy — grounded in compassion,
          creativity, and safety.
        </p>
      </div>

      {/* ===== FOUNDER IMAGE ===== */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-[380px_1fr] gap-16 items-start">
        <div className="relative">
          <Image
            src={founder.headshot}
            alt={founder.name}
            width={420}
            height={520}
            className="rounded-3xl object-cover shadow-soft"
          />

          <div className="mt-6">
            <h2 className="text-xl font-medium text-[#0E1E2A]">
              {founder.name}
            </h2>
            <p className="mt-1 text-sm text-[#0E1E2A]/60">
              {founder.bioShort}
            </p>
          </div>
        </div>

        {/* ===== NARRATIVE ===== */}
        <div className="space-y-6 text-lg leading-relaxed text-[#0E1E2A]/85">
          {founder.bioLong.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
      <div className="mt-20 max-w-3xl space-y-2 text-[#0E1E2A]/75">
        <p className="text-sm opacity-60">
          Location: {studioInfo.addressLine1} {studioInfo.addressLine2}
        </p>
      </div>

      {/* ===== STATS (QUIET) ===== */}
      <div className="mt-24 border-t border-[#0E1E2A]/10 pt-12">
        <div className="grid grid-cols-3 max-w-3xl gap-8 text-center">
          <div>
            <div className="font-display text-3xl text-[#0E1E2A]">500+</div>
            <p className="mt-1 text-sm text-[#0E1E2A]/60">
              Sessions Held
            </p>
          </div>

          <div>
            <div className="font-display text-3xl text-[#0E1E2A]">200+</div>
            <p className="mt-1 text-sm text-[#0E1E2A]/60">
              Lives Touched
            </p>
          </div>

          <div>
            <div className="font-display text-3xl text-[#0E1E2A]">5+</div>
            <p className="mt-1 text-sm text-[#0E1E2A]/60">
              Years of Practice
            </p>
          </div>
        </div>
      </div>
       <StickyGetInTouch  />

      {/* ===== ROLES & LOCATION =====
      <div className="mt-20 max-w-3xl space-y-6 text-[#0E1E2A]/75">
        <div>
          <p className="uppercase text-xs tracking-wider opacity-60">
            Also involved in
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-5 text-sm">
            {founder.roles.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div> */}
      {/* <div className="mt-20 max-w-3xl space-y-2 text-[#0E1E2A]/75">
        <p className="text-sm opacity-60">
          Location: {studioInfo.addressLine1} {studioInfo.addressLine2}
        </p>
      </div> */}
    </section>
   

  );
}

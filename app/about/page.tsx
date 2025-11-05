import Image from "next/image";
import { founder, studioInfo } from "../../lib/data";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl">Our Journey</h1>
      <p className="mt-3 max-w-3xl text-lg opacity-80">
        {studioInfo.name} is a space for emotional expression and holistic
        well-being through Art-Based Therapy.
      </p>

      <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        {/* LEFT COLUMN - Photo + Stats */}
        <div className="rounded-2xl bg-white p-6 shadow-soft flex flex-col items-center">
          <Image
            src={founder.headshot}
            alt={founder.name}
            width={500}
            height={500}
            className="rounded-xl object-cover"
          />
          <h2 className="mt-4 text-xl font-medium">{founder.name}</h2>
          <p className="text-sm opacity-70">{founder.bioShort}</p>

          {/* Stats Section */}
          <div className="mt-6 flex items-center justify-center gap-6 text-center">
            <div>
              <div
                className="text-[#0E1E2A] text-2xl font-medium"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                500+
              </div>
              <div className="text-[#0E1E2A]/60 text-sm">Sessions Held</div>
            </div>

            <div className="w-px h-8 bg-[#0E1E2A]/20" />

            <div>
              <div
                className="text-[#0E1E2A] text-2xl font-medium"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                200+
              </div>
              <div className="text-[#0E1E2A]/60 text-sm">Lives Touched</div>
            </div>

            <div className="w-px h-8 bg-[#0E1E2A]/20" />

            <div>
              <div
                className="text-[#0E1E2A] text-2xl font-medium"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                5 Years
              </div>
              <div className="text-[#0E1E2A]/60 text-sm">Of Practice</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Biography */}
        <div className="space-y-4 text-lg opacity-90 leading-relaxed">
          {founder.bioLong.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div className="rounded-xl bg-sand p-4 text-sm shadow-soft">
            <p className="uppercase text-xs opacity-60">Also involved in</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {founder.roles.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <p className="text-sm opacity-60">
            Location: {studioInfo.addressLine1} {studioInfo.addressLine2}
          </p>
        </div>
      </div>


      

    </div>
  );
}
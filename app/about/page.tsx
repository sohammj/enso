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
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <Image
            src={founder.headshot}
            alt={founder.name}
            width={500}
            height={500}
            className="rounded-xl object-cover"
          />
          <h2 className="mt-4 text-xl font-medium">{founder.name}</h2>
          <p className="text-sm opacity-70">{founder.bioShort}</p>
        </div>

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

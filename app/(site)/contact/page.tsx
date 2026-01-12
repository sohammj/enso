import { studioInfo } from "@/lib/data";
import { MapEmbed } from "@/components/sections/MapEmbed";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";


export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-lg opacity-80">
        We offer in-person sessions in Mahim, Mumbai and online sessions.
        Reach out — you don’t have to figure it out alone.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-medium">Studio</h2>
          <p className="mt-2 text-sm opacity-80 leading-relaxed">
            {studioInfo.addressLine1}
            <br />
            {studioInfo.addressLine2}
          </p>

          <div className="mt-4 text-sm opacity-80">
            <p>
              Email:{" "}
              <a
                href={`mailto:${studioInfo.email}`}
                className="underline underline-offset-4"
              >
                {studioInfo.email}
              </a>
            </p>
            {studioInfo.phone && <p>Phone: {studioInfo.phone}</p>}
          </div>

          <a
            href="/start-a-conversation"
            className="mt-6 inline-block rounded-xl bg-ink px-4 py-2 text-white text-sm hover:opacity-90"
          >
            Start a conversation →
          </a>
        </div>

        <div>
          <MapEmbed />
        </div>
      </div>
      
    </div>
  );
}

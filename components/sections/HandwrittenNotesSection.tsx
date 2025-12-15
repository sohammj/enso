import Image from "next/image";

export default function HandwrittenNotesSection() {
  return (
    <section className="relative py-36 overflow-hidden bg-[url('/paper-texture.jpg')] bg-repeat">


      {/* Floating birds – top left */}
        <div className="absolute top-[20px] left-[30px] opacity-70 pointer-events-none float-soft">
        <Image
            src="/birds.png"   // your transparent birds image
            alt=""
            width={260}
            height={260}
        />
        </div>

            
      {/* Notes container */}
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10">

        {/* Left note */}
        <div className="relative bg-[#EFE6D8] rounded-2xl px-10 py-12 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rotate-[-2deg] max-w-sm text-center">
          <p className="font-[Caveat] text-[26px] leading-[1.6] text-[#2B2B2B]">
            Thank you for being here. <br />
            I know it takes courage <br />
            to reach out.
          </p>
        </div>

        {/* Center note (main) */}
        <div className="relative bg-[#F3EBDD] rounded-2xl px-14 py-16 shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-10 text-center">
          <p className="font-[Caveat] text-[28px] md:text-[30px] leading-[1.6] text-[#2B2B2B]">
            Enso is a space that listens <br />
            — a space to explore your emotions, <br />
            reconnect with yourself, <br />
            and grow at your own pace.
          </p>
        </div>

        {/* Right note */}
        <div className="relative bg-[#EFE6D8] rounded-2xl px-10 py-12 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rotate-[2deg] max-w-sm text-center">
          <p className="font-[Caveat] text-[26px] leading-[1.6] text-[#2B2B2B]">
            Sometimes, <br />
            the smallest step towards <br />
            yourself <br />
            changes everything.
          </p>
        </div>
      </div>

      {/* Bottom watercolor waves */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <Image
          src="/watercolor-waves.png"
          alt=""
          width={2000}
          height={300}
          className="w-full opacity-90"
        />
      </div>
    </section>
  );
}

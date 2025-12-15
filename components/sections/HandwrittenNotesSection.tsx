import Image from "next/image";

export default function HandwrittenNotesSection() {
  return (
    <section className="relative py-44 overflow-hidden bg-[url('/paper-texture.jpg')] bg-repeat">

      {/* Floating birds – top left */}
      {/* <div className="absolute top-[40px] left-[60px] opacity-70 pointer-events-none float-soft z-10">
        <Image src="/birds.png" alt="" width={220} height={220} />
      </div> */}

      {/* Cards wrapper */}
      <div className="relative max-w-6xl mx-auto h-[420px]">

        {/* LEFT CARD */}
        <div className="absolute left-0 top-[60px] scale-[1.05] z-10">
          <Card
            text={
              <>
                Thank you for being here. <br />
                I know it takes courage <br />
                to reach out.
              </>
            }
          />
        </div>

        {/* CENTER CARD */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 scale-[1.25] z-20">
          <Card
            text={
              <>
                Enso is a space that listens <br />
                — a space to explore your emotions, <br />
                reconnect with yourself, <br />
                and grow at your own pace.
              </>
            }
            large
          />
        </div>

        {/* RIGHT CARD */}
        <div className="absolute right-0 top-[60px] scale-[1.05] z-10">
          <Card
            text={
              <>
                Sometimes, <br />
                the smallest step towards <br />
                yourself <br />
                changes everything.
              </>
            }
          />
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

/* ---------- Card component ---------- */

function Card({
  text,
  large = false,
}: {
  text: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div className="relative">
      <Image
        src="/card_hand.png"
        alt=""
        width={large ? 520 : 420}
        height={large ? 360 : 300}
        className="drop-shadow-[0_18px_35px_rgba(0,0,0,0.18)]"
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-10 text-center">
        <p
          className={`font-handwritten text-[#2B2B2B] leading-[1.6]
          ${large ? "text-[26px]" : "text-[22px]"}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

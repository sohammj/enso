import Image from "next/image";
import React from "react";

export default function HandwrittenNotesSection() {
  return (
    <section className="relative py-28 md:py-44 overflow-hidden bg-[url('/paper-texture.jpg')] bg-repeat">
      
      {/* ===== MOBILE LAYOUT ===== */}
      <div className="flex flex-col items-center gap-10 md:hidden">
        <Card
          text={
            <>
              Thank you for being here. <br />
              I know it takes courage <br />
              to reach out.
            </>
          }
        />

        <Card
          large
          text={
            <>
              Enso is a space that listens <br />
              a space to explore your emotions, <br />
              reconnect with yourself, <br />
              and grow at your own pace.
            </>
          }
        />

        <Card
          text={
            <>
              Sometimes, <br />
              the smallest step towards <br />
              yourself <br />
              changes everything. — Parul
            </>
          }
        />
      </div>

      {/* ===== DESKTOP LAYOUT (UNCHANGED) ===== */}
      <div className="relative max-w-6xl mx-auto h-[420px] isolate hidden md:block">

        {/* LEFT CARD */}
        <div className="absolute left-0 top-[70px] -translate-x-[45px] scale-[1.0] z-10">
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
        <div className="absolute left-1/2 top-[10px] -translate-x-1/2 scale-[1.12] z-20">
          <Card
            large
            text={
              <>
                Enso is a space that listens <br />
                a space to explore your emotions, <br />
                reconnect with yourself, <br />
                and grow at your own pace.
              </>
            }
          />
        </div>

        {/* RIGHT CARD */}
        <div className="absolute right-0 top-[70px] translate-x-[50px] scale-[1.0] z-10">
          <Card
            text={
              <>
                Sometimes, <br />
                the smallest step towards <br />
                yourself <br />
                changes everything. — Parul
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

/* ---------------- CARD ---------------- */
function Card({
  text,
  large = false,
}: {
  text: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className="
        relative
        transition-all duration-300 ease-out
        hover:-translate-y-[6px]
        hover:scale-[1.03]
        hover:z-[10]
      "
    >
      {/* Card image */}
      <Image
        src="/card_hand.png"
        alt=""
        width={large ? 500 : 420}
        height={large ? 340 : 300}
        className="
          drop-shadow-[0_14px_30px_rgba(0,0,0,0.18)]
          transition-shadow duration-300
          hover:drop-shadow-[0_24px_48px_rgba(0,0,0,0.26)]
        "
      />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <p
          className={`
            font-handwritten
            text-[#2B2B2B]
            leading-[1.5]
            tracking-[0.01em]
            ${large ? "text-[22px] md:text-[24px]" : "text-[20px] md:text-[21px]"}
          `}
          style={{
            mixBlendMode: "multiply",
            textShadow: "0 0.5px 0.5px rgba(0,0,0,0.1)",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";

export default function HandwrittenNotesSection() {
  return (
    <section className="relative py-36 md:py-56 overflow-hidden bg-[url('/paper-texture.jpg')] bg-repeat">

      {/* ===== YELLOW BLOB ===== */}
      {/* <div className="absolute right-[8%] top-[8%] z-0 pointer-events-none"> */}
      <div className="absolute -right-[22%] top-[8%] z-0 pointer-events-none">

        <Image
          src="/yellow-blob.svg"
          alt=""
          width={520}
          height={360}
          className="opacity-80 rotate-[-6deg] blur-[1px]"
        />
      </div>

      {/* ===== MOBILE ===== */}
      <div className="relative z-10 flex flex-col items-center gap-10 md:hidden">
        <CardImage src="/handwritten-cards-left.png" width={520} height={360} />
        <CardImage
          src="/handwritten-cards-middle.png"
          width={620}
          height={440}
          priority
        />
        <CardImage src="/handwritten-cards-right.png" width={520} height={360} />
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="relative z-10 max-w-6xl mx-auto h-[420px] isolate hidden md:block">

        {/* LEFT CARD */}
        <div className="absolute left-0 top-[70px] -translate-x-[45px] z-10">
          <CardImage src="/handwritten-cards-left.png" width={520} height={360} />
        </div>

        {/* CENTER CARD */}
        <div className="absolute left-1/2 top-[10px] -translate-x-1/2 scale-[1.12] z-20">
          <CardImage
            src="/handwritten-cards-middle.png"
            width={680}
            height={470}
            priority
          />
        </div>

        {/* RIGHT CARD */}
        <div className="absolute right-0 top-[70px] translate-x-[50px] z-10">
          <CardImage src="/handwritten-cards-right.png" width={520} height={360} />
        </div>
      </div>

      {/* ===== WATER WAVES ===== */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
        <Image
          src="/watercolor-waves.png"
          alt=""
          width={2000}
          height={300}
          className="w-full opacity-90"
          priority
        />
      </div>
    </section>
  );
}

/* ---------------- CARD IMAGE ---------------- */
function CardImage({
  src,
  width,
  height,
  priority = false,
}: {
  src: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="relative transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.02] hover:z-[50]">
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        priority={priority}
        className="select-none drop-shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
      />
    </div>
  );
}

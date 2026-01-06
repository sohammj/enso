"use client";

import Image from "next/image";
import CardSwap, { Card } from "@/components/bits/CardSwap";

export default function HandwrittenNotesSection() {
  return (
    <section className="relative py-28 md:py-56 overflow-hidden bg-[url('/paper-texture.jpg')] bg-repeat">
      {/* ===== YELLOW BLOB ===== */}
      <div className="absolute -right-[22%] top-[8%] z-0 pointer-events-none">
        <Image
          src="/yellow-blob.svg"
          alt=""
          width={520}
          height={360}
          className="opacity-80 rotate-[-6deg] blur-[1px]"
        />
      </div>

      {/* ===== CARD SWAP STAGE ===== */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative h-[460px] md:h-[420px]">
          <CardSwap
            width={920}
            height={580}
            cardDistance={62}
            verticalDistance={36}
            delay={5000}
            pauseOnHover={false}
            easing="elastic"
            skewAmount={4}
          >
            <Card className="overflow-hidden rounded-3xl border-black/10 bg-transparent">
              <Image
                src="/handwritten-cards-middle.png"
                alt=""
                fill
                className="object-contain select-none"
                priority
              />
            </Card>

            <Card className="overflow-hidden rounded-3xl border-black/10 bg-transparent">
              <Image
                src="/handwritten-cards-left.png"
                alt=""
                fill
                className="object-contain select-none"
              />
            </Card>

            <Card className="overflow-hidden rounded-3xl border-black/10 bg-transparent">
              <Image
                src="/handwritten-cards-right.png"
                alt=""
                fill
                className="object-contain select-none"
              />
            </Card>
          </CardSwap>
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

"use client";

import React, { useEffect, useState } from "react";

function AnimatedCounter({
  value,
  duration = 1200,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const current = Math.floor(progress * value);
      setDisplay(current);

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}

export default function AboutStatsTicker({
  clientsSeen,
  workshops,
}: {
  clientsSeen: number;
  workshops: number;
}) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-2 gap-12 place-items-center">
          {/* CLIENTS */}
          <div
            className="text-black/80 font-display leading-none
                       text-[34px] sm:text-[40px] md:text-[44px] lg:text-[48px]"
          >
            <AnimatedCounter value={clientsSeen} />
            <div className="text-[12px] uppercase tracking-[0.22em] text-black/45 mt-3 text-center">
              Number of clients seen
            </div>
          </div>

          {/* WORKSHOPS */}
          <div
            className="text-black/80 font-display leading-none
                       text-[34px] sm:text-[40px] md:text-[44px] lg:text-[48px]"
          >
            <AnimatedCounter value={workshops} />
            <div className="text-[12px] uppercase tracking-[0.22em] text-black/45 mt-3 text-center">
              Number of workshops
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

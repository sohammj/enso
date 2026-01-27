"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type PhotoStripItem = {
  image?: any;
  label?: string;
  caption?: string;
  mobileOrder?: number;
  mobileAlign?: "left" | "center" | "right";
};

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function DecorativePath() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 3000 1000"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.15 }}
    >
      <path
        d="M0 500 C 200 300, 400 700, 600 500 S 1000 200, 1200 500 S 1600 800, 1800 500 S 2200 200, 2400 500 S 2800 700, 3000 500"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0 600 C 300 400, 500 800, 800 600 S 1100 300, 1400 600 S 1700 900, 2000 600 S 2300 300, 2600 600 S 2900 800, 3000 600"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 400 C 250 200, 450 600, 700 400 S 1050 100, 1350 400 S 1650 700, 1950 400 S 2250 100, 2550 400 S 2850 600, 3000 400"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

// Function to calculate Y position on the main curve
function getCurveY(x: number, totalWidth: number): number {
  // Normalize x to 0-1 range
  const t = x / totalWidth;
  
  // Use a sine wave that matches our SVG path better
  // This creates the wave pattern that follows the middle SVG curve
  const wave1 = Math.sin(t * Math.PI * 4) * 0.15; // 4 waves across
  const wave2 = Math.sin(t * Math.PI * 2 + Math.PI / 4) * 0.08; // offset wave
  
  // Base at 50% (middle) + wave variations
  return 50 + (wave1 + wave2) * 100;
}

export default function HorizontalPhotoStrip({ items }: { items: PhotoStripItem[] }) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Filter valid items
  const validItems = useMemo(
    () => (items || []).filter((it) => it?.image?.asset),
    [items]
  );

  if (!validItems.length) return null;

  // Dynamic spacing based on number of images
  const SPACING = useMemo(() => {
    const count = validItems.length;
    if (count <= 3) return 20; // Closer spacing for fewer images
    if (count <= 5) return 16;
    return 14; // Even tighter for many images
  }, [validItems.length]);

  // Dynamic world width based on number of images
  const WORLD_WIDTH_VW = useMemo(() => {
    const count = validItems.length;
    // Tighter base width + spacing per image
    return Math.max(100, 60 + count * SPACING);
  }, [validItems.length, SPACING]);

  // Layout items on the curve
  const laidOut = useMemo(() => {
    const count = validItems.length;
    const worldWidthPx = (WORLD_WIDTH_VW * window.innerWidth) / 100;

    return validItems.map((it, idx) => {
      // Calculate horizontal position
      const xPercent = 10 + (idx * (WORLD_WIDTH_VW - 20)) / Math.max(count - 1, 1);
      const xPx = (xPercent * window.innerWidth) / 100;
      
      // Calculate Y position on curve
      const yPercent = getCurveY(xPx, worldWidthPx);
      
      // Vary image sizes slightly
      const widthVariants = [300, 340, 280, 320, 290, 310];
      const width = widthVariants[idx % widthVariants.length];
      
      // Alternate z-index for overlap effect
      const zIndex = idx % 2 === 0 ? 2 : 3;

      return {
        ...it,
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        width: `${width}px`,
        zIndex,
      };
    });
  }, [validItems, WORLD_WIDTH_VW, SPACING]);

  // Calculate max translate for scroll
  useEffect(() => {
    if (isMobile) return;

    const calculate = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxTranslate(Math.max(0, containerWidth - viewportWidth));
    };

    const timer = setTimeout(calculate, 100);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculate);
    };
  }, [isMobile, laidOut, WORLD_WIDTH_VW]);

  // Scroll handling
  useEffect(() => {
    if (isMobile) {
      setIsFixed(false);
      setTranslateX(0);
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section || maxTranslate < 5) {
        setIsFixed(false);
        setTranslateX(0);
        return;
      }

      const sectionTop = section.offsetTop;
      const scrollY = window.scrollY;
      const scrollStart = sectionTop;
      const scrollEnd = sectionTop + maxTranslate;

      if (scrollY < scrollStart) {
        setIsFixed(false);
        setTranslateX(0);
      } else if (scrollY <= scrollEnd) {
        setIsFixed(true);
        setTranslateX(scrollY - scrollStart);
      } else {
        setIsFixed(false);
        setTranslateX(maxTranslate);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, maxTranslate]);

  const sectionHeight = useMemo(() => {
    return `calc(100vh + ${maxTranslate}px + 100px)`;
  }, [maxTranslate]);

  // MOBILE VIEW
  if (isMobile) {
    const sorted = [...laidOut].sort(
      (a, b) => (a.mobileOrder ?? 9999) - (b.mobileOrder ?? 9999)
    );

    return (
      <section className="relative z-10 py-16">
        <div className="relative px-6">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <DecorativePath />
          </div>

          <div className="relative space-y-12">
            {sorted.map((it, idx) => {
              const align =
                it.mobileAlign === "left"
                  ? "mr-auto"
                  : it.mobileAlign === "right"
                  ? "ml-auto"
                  : "mx-auto";

              const imgUrl = urlFor(it.image)
                .width(800)
                .height(1000)
                .fit("max")
                .url();

              return (
                <div key={idx} className={`${align} max-w-sm`}>
                  {it.label && (
                    <p className="text-xs tracking-wider uppercase opacity-70 mb-3 font-medium">
                      {it.label}
                    </p>
                  )}

                  <div className="relative w-full rounded-2xl shadow-xl bg-gray-100 p-4">
                    <div className="relative w-full aspect-[4/5]">
                      <Image
                        src={imgUrl}
                        alt={it.caption || it.label || "Photo"}
                        fill
                        className="object-contain transition-transform duration-300"
                        sizes="(max-width: 768px) 90vw, 400px"
                      />
                    </div>
                  </div>

                  {it.caption && (
                    <p className="mt-4 text-sm leading-relaxed opacity-80">
                      {it.caption}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP HORIZONTAL SCROLL
  return (
    <section ref={sectionRef} className="relative z-10" style={{ height: sectionHeight }}>
      <div
        className={`${isFixed ? "fixed top-0" : "absolute"} left-0 w-full h-screen overflow-hidden`}
        style={{
          top: isFixed ? 0 : undefined,
          bottom: !isFixed && translateX > 0 ? 0 : undefined,
        }}
      >
        <div
          ref={containerRef}
          className="relative h-full will-change-transform"
          style={{
            width: `${WORLD_WIDTH_VW}vw`,
            transform: `translate3d(-${translateX}px, 0, 0)`,
          }}
        >
          {/* Background SVG */}
          <div className="absolute inset-0 opacity-30">
            <DecorativePath />
          </div>

          {/* Images positioned on curve */}
          {laidOut.map((it, idx) => {
            const imgUrl = urlFor(it.image)
              .width(800)
              .height(1000)
              .fit("max")
              .url();

            return (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: it.top,
                  left: it.left,
                  width: it.width,
                  zIndex: it.zIndex,
                  transform: "translate(-50%, -50%)", // Center on curve point
                }}
              >
                {it.label && (
                  <p className="text-xs tracking-wider uppercase opacity-70 mb-2 font-medium text-center">
                    {it.label}
                  </p>
                )}

                <div className="relative w-full rounded-2xl shadow-2xl bg-gray-100 border border-white/10 p-3">
                  <div className="relative w-full aspect-[4/5]">
                    <Image
                      src={imgUrl}
                      alt={it.caption || it.label || "Photo"}
                      fill
                      className="object-contain transition-transform duration-300"
                      sizes="(min-width: 1024px) 400px, 300px"
                      priority={idx < 3}
                    />
                  </div>
                </div>

                {it.caption && (
                  <div className="mt-3 px-2 pb-24">
                    <p className="text-sm leading-relaxed opacity-80 text-center max-w-[280px] mx-auto">
                      {it.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
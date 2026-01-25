"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type PhotoStripItem = {
  image?: any; // ✅ Sanity image object
  label?: string;
  caption?: string;
  top?: string;
  left?: string;
  width?: string;
  zIndex?: number;
  grayscale?: boolean;
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
      style={{ opacity: 0.12 }}
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

export default function HorizontalPhotoStrip({ items }: { items: PhotoStripItem[] }) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // ✅ spacing: 0.6–0.7 recommended
  const SPACING_FACTOR = 0.7;
  const BASE_LEFT = 5;
  const STEP = 22 * SPACING_FACTOR;

  // ✅ filter only valid items (prevents blank pinned scroll)
  const validItems = useMemo(
    () => (items || []).filter((it) => it?.image?.asset),
    [items]
  );

  // If nothing to show, render nothing (prevents the “blank scroll world”)
  if (!validItems.length) return null;

  // Build layout with smoother wave
  const laidOut = useMemo(() => {
    return validItems.map((it, idx) => {
      if (it.top && it.left && it.width) return it;

      const topVariants = ["8%", "45%", "18%", "55%", "12%", "40%"];
      const top = topVariants[idx % topVariants.length];

      const left = `${BASE_LEFT + idx * STEP}%`;

      const widthVariants = ["280px", "320px", "240px", "300px", "260px", "340px"];
      const width = widthVariants[idx % widthVariants.length];

      const zIndex = idx % 2 === 0 ? 2 : 3;

      return { ...it, top, left, width, zIndex };
    });
  }, [validItems]);

  // ✅ dynamic world width (so your tighter spacing doesn’t feel “too long”)
  const WORLD_VW = useMemo(() => {
    // roughly: base + n * step-ish
    // tweak these constants if you want even tighter/shorter
    const n = laidOut.length;
    return Math.max(140, 140 + n * 28 * SPACING_FACTOR);
  }, [laidOut.length, SPACING_FACTOR]);

  useEffect(() => {
    if (isMobile) return;

    const calculate = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxTranslate(Math.max(0, containerWidth - viewportWidth));
    };

    const t = setTimeout(calculate, 50);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calculate);
    };
  }, [isMobile, laidOut, WORLD_VW]);

  useEffect(() => {
    if (isMobile) {
      setIsFixed(false);
      setTranslateX(0);
      return;
    }

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      // if maxTranslate is tiny, don’t pin
      if (maxTranslate < 5) {
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
    // little buffer so it exits cleanly
    return `calc(100vh + ${maxTranslate}px + 200px)`;
  }, [maxTranslate]);

  // MOBILE stacked
  if (isMobile) {
    const sorted = [...laidOut].sort(
      (a, b) => (a.mobileOrder ?? 9999) - (b.mobileOrder ?? 9999)
    );

    return (
      <section className="relative z-10 pb-24">
        <div className="relative px-6">
          <div className="absolute inset-0 pointer-events-none opacity-30">
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

              const imgUrl = urlFor(it.image).width(1200).height(1200).fit("crop").url();

              return (
                <div key={idx} className={`${align} max-w-sm`}>
                  {it.label && (
                    <p className="text-[11px] tracking-[0.15em] uppercase opacity-60 mb-3 font-medium">
                      {it.label}
                    </p>
                  )}

                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={imgUrl}
                      alt={it.caption || it.label || "Photo"}
                      fill
                      className={`object-cover transition-transform duration-500 hover:scale-[1.02] ${
                        it.grayscale ? "grayscale" : ""
                      }`}
                      sizes="(min-width: 1024px) 360px, 70vw"
                    />
                  </div>

                  {it.caption && (
                    <p className="mt-4 text-[15px] leading-relaxed opacity-75 text-justify whitespace-normal break-words">
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

  // DESKTOP pinned
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
            width: `${WORLD_VW}vw`,
            transform: `translate3d(-${translateX}px, 0, 0)`,
          }}
        >
          <div className="absolute inset-0 opacity-40">
            <DecorativePath />
          </div>

          {laidOut.map((it, idx) => {
            const imgUrl = urlFor(it.image).width(1600).height(1600).fit("crop").url();

            return (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: it.top ?? "20%",
                  left: it.left ?? `${idx * 25}%`,
                  width: it.width ?? "280px",
                  zIndex: it.zIndex ?? 2,
                }}
              >
                {it.label && (
                  <p className="text-[11px] tracking-[0.15em] uppercase opacity-60 mb-3 font-medium">
                    {it.label}
                  </p>
                )}

                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={imgUrl}
                    alt={it.caption || it.label || "Photo"}
                    fill
                    className={`object-cover transition-transform duration-500 hover:scale-[1.02] ${
                      it.grayscale ? "grayscale" : ""
                    }`}
                    sizes="(min-width: 1024px) 360px, 70vw"
                  />
                </div>

                {it.caption && (
                  <p className="mt-4 text-[15px] leading-relaxed opacity-75 text-justify whitespace-normal break-words">
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

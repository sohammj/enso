"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type PhotoStripItem = {
  image?: any;
  label?: string;
  caption?: string;

  // Optional layout controls (if you later add these fields in Sanity)
  top?: string; // e.g. "15%"
  left?: string; // e.g. "55%"
  width?: string; // e.g. "220px"
  zIndex?: number;
  grayscale?: boolean;

  // Mobile controls (optional)
  mobileOrder?: number;
  mobileAlign?: "left" | "center" | "right";
};

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const run = () => setIsMobile(window.innerWidth < breakpoint);
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, [breakpoint]);
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

// If you don’t store positions in Sanity yet, we “auto-place” them to look good.
function withFallbackLayout(items: PhotoStripItem[]): Required<Pick<PhotoStripItem, "top" | "left" | "width" | "zIndex">> & PhotoStripItem {
  // not used directly
  return {} as any;
}

export default function HorizontalPhotoStrip({
  items,
}: {
  items: PhotoStripItem[];
}) {
  const isMobile = useIsMobile(1024);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  // Build a Lovable-ish layout if Sanity items don’t have positions
  const laidOut = useMemo(() => {
    const baseLeft = 5; // %
    const step = 22; // %
    return (items || []).map((it, idx) => {
      const hasLayout = !!it.top && !!it.left && !!it.width;
      if (hasLayout) return it;

      const topVariants = ["12%", "24%", "55%", "35%", "60%", "15%"];
      const top = topVariants[idx % topVariants.length];
      const left = `${baseLeft + idx * step}%`;
      const width = idx % 3 === 1 ? "360px" : idx % 3 === 2 ? "200px" : "240px";
      const zIndex = idx % 3 === 1 ? 3 : 2;

      return { ...it, top, left, width, zIndex };
    });
  }, [items]);

  useEffect(() => {
    if (isMobile) {
      setIsFixed(false);
      setTranslateX(0);
      return;
    }

    const handleScroll = () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const sectionTop = section.offsetTop;
      const scrollY = window.scrollY;

      const containerWidth = container.scrollWidth; // total “world”
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, containerWidth - viewportWidth);

      const scrollStart = sectionTop;
      const scrollEnd = sectionTop + maxTranslate;

      if (scrollY < scrollStart) {
        setIsFixed(false);
        setTranslateX(0);
      } else if (scrollY >= scrollStart && scrollY <= scrollEnd) {
        setIsFixed(true);
        setTranslateX(scrollY - scrollStart);
      } else {
        setIsFixed(false);
        setTranslateX(maxTranslate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // MOBILE: simple stacked layout (Lovable also does vertical on mobile)
  if (isMobile) {
    const sorted = [...laidOut].sort(
      (a, b) => (a.mobileOrder ?? 9999) - (b.mobileOrder ?? 9999)
    );

    return (
      <section className="relative z-10 pb-24">
        <div className="relative px-6">
          <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
            <DecorativePath />
          </div>

          <div className="relative space-y-10">
            {sorted.map((it, idx) => {
              if (!it?.image?.asset) return null;

              const align =
                it.mobileAlign === "left"
                  ? "mr-auto"
                  : it.mobileAlign === "right"
                  ? "ml-auto"
                  : "mx-auto";

              const imgUrl = urlFor(it.image).width(1200).height(1200).fit("crop").url();

              return (
                <div key={idx} className={`${align}`} style={{ width: "80%" }}>
                  {it.label && <p className="gallery-label mb-2">{it.label}</p>}
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
                    <Image
                      src={imgUrl}
                      alt={it.caption || it.label || "Photo"}
                      fill
                      className={`object-cover ${it.grayscale ? "grayscale" : ""}`}
                      sizes="80vw"
                    />
                  </div>
                  {it.caption && (
                    <p className="mt-3 text-sm opacity-70 leading-relaxed">
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

  // DESKTOP: pinned horizontal scroll like Lovable
  return (
    <section
      ref={sectionRef}
      className="relative z-10"
      style={{ height: "calc(100vh + 2200px)" }} // feel free to tweak
    >
      <div
        className={`${isFixed ? "fixed top-0" : "absolute"} left-0 w-full h-screen overflow-hidden`}
        style={{
          top: isFixed ? 0 : translateX > 0 ? "auto" : 0,
          bottom: !isFixed && translateX > 0 ? 0 : "auto",
        }}
      >
        <div
          ref={containerRef}
          className="relative h-full"
          style={{
            width: "250vw",
            transform: `translateX(-${translateX}px)`,
            transition: "transform 80ms ease-out",
          }}
        >
          {/* Decorative */}
          <div className="absolute inset-0 opacity-40">
            <DecorativePath />
          </div>

          {/* Photos */}
          {laidOut.map((it, idx) => {
            if (!it?.image?.asset) return null;

            const imgUrl = urlFor(it.image).width(1600).height(1600).fit("crop").url();

            return (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: it.top ?? "20%",
                  left: it.left ?? `${idx * 25}%`,
                  width: it.width ?? "240px",
                  zIndex: it.zIndex ?? 2,
                }}
              >
                {it.label && <p className="gallery-label mb-2">{it.label}</p>}

                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
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
                  <p className="mt-3 text-sm opacity-70 leading-relaxed">
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

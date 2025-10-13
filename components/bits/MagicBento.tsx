"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import "./MagicBento.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const cardData = [
  // Programs
  {
    color: "#FFFFFF",
    title: "Fika",
    description: "A reflective art circle for connection and presence.",
    label: "Program",
    href: "/programs/fika",
    glowColor: "38, 67, 160", // royal
  },
  {
    color: "#FFFFFF",
    title: "Cope",
    description: "Art-based therapy for resilience and emotional processing.",
    label: "Program",
    href: "/programs/cope",
    glowColor: "38, 67, 160", // royal
  },
  {
    color: "#FFFFFF",
    title: "Aakar",
    description: "Creative growth program focused on identity and healing.",
    label: "Program",
    href: "/programs/aakar",
    glowColor: "38, 67, 160", // royal
  },
    //   glowColor: "255, 209, 102", sun
    // glowColor: "107, 181, 162", tea
    // glowColor: "38, 67, 160", royal
    
  // Services
  {
    color: "#FFFFFF",
    title: "Individual Session",
    description: "One-on-one art therapy for personalized emotional support.",
    label: "Service",
    href: "/services/individual-session",
    glowColor: "38, 67, 160", // royal
  },
  {
    color: "#FFFFFF",
    title: "Group Session",
    description: "Shared creative exploration fostering connection.",
    label: "Service",
    href: "/services/group-session",
    glowColor: "38, 67, 160", // royal
  },
  {
    color: "#FFFFFF",
    title: "Workshop & Training",
    description: "Therapist-led workshops for educators and organizations.",
    label: "Service",
    href: "/services/workshop-training",
    glowColor: "38, 67, 160", // royal
  },
];

// Utility functions
const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}: any) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        gridRef.current
          .querySelectorAll(".card")
          .forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      gridRef.current.querySelectorAll(".card").forEach((card: HTMLElement) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        minDistance = Math.min(minDistance, dist);
        const glow = Math.max(0, 1 - dist / fadeDistance);
        updateCardGlowProperties(card, e.clientX, e.clientY, glow, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 });
      gsap.to(spotlightRef.current, {
        opacity:
          minDistance <= proximity
            ? 0.8
            : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0,
        duration: 0.2,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      spotlight.remove();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const MagicBento = ({
  enableSpotlight = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
}: any) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobile();
  const disable = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={disable}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
        />
      )}

      <div
        ref={gridRef}
        className="bento-section grid gap-2 p-3 max-w-[54rem] select-none relative"
      >
        <div className="card-responsive grid gap-2">
          {cardData.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="card card--border-glow flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full p-5 rounded-[20px] border font-light overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: card.color,
                "--glow-color": card.glowColor,
              } as React.CSSProperties}
            >
              <div className="card__header flex justify-between gap-3 relative">
                <span className="card__label text-base text-ink opacity-70">
                  {card.label}
                </span>
              </div>
              <div className="card__content flex flex-col relative">
                <h3 className="font-medium text-lg mb-1">{card.title}</h3>
                <p className="text-sm opacity-80 leading-5">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MagicBento;

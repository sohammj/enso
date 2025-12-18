"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import "./MagicBento.css";

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

// 🧩 Default card data (for homepage)
export const defaultCardData = [
  {
    color: "#FFFFFF",
    title: "Fika",
    description: "A reflective art circle for connection and presence.",
    label: "Program",
    href: "/programs/fika",
    glowColor: "38, 67, 160",
    icon: "/icons/pencil.svg",
  },
  {
    color: "#FFFFFF",
    title: "Cope",
    description: "Art-based therapy for resilience and emotional processing.",
    label: "Program",
    href: "/programs/cope",
    glowColor: "38, 67, 160",
    icon: "/icons/chat-bubble.svg",
  },
  {
    color: "#FFFFFF",
    title: "Aakar",
    description: "Creative growth program focused on identity and healing.",
    label: "Program",
    href: "/programs/aakar",
    glowColor: "38, 67, 160",
    icon: "/icons/brush.svg",
  },
  {
    color: "#FFFFFF",
    title: "Individual Session",
    description: "One-on-one art therapy for personalized emotional support.",
    label: "Service",
    href: "/services/individual-sessions",
    glowColor: "38, 67, 160",
    icon: "/icons/individual1.png",
  },
  {
    color: "#FFFFFF",
    title: "Group Session",
    description: "Shared creative exploration fostering connection.",
    label: "Service",
    href: "/services/group-sessions",
    glowColor: "38, 67, 160",
    icon: "/icons/group.svg",
  },
  {
    color: "#FFFFFF",
    title: "Workshop & Training",
    description: "Therapist-led workshops for educators and organizations.",
    label: "Service",
    href: "/services/workshops-and-training",
    glowColor: "38, 67, 160",
    icon: "/icons/workshop.svg",
  },
];

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
          .forEach((card: HTMLElement) =>
            card.style.setProperty("--glow-intensity", "0")
          );
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
  cards = defaultCardData, // ✅ Reusable data source
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

      <div ref={gridRef} className="bento-section relative mx-auto max-w-6xl px-4 select-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch">
          {cards.map((card: any, i: number) => (
            <Link
              key={i}
              href={card.href}
              className="card card--border-glow flex flex-col justify-between relative p-6 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
              style={{
                "--glow-color": card.glowColor,
              } as React.CSSProperties}
            >
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-500 mb-2">
                  {card.label}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {card.icon && (
                    <img
                      src={card.icon}
                      alt={`${card.title} icon`}
                      className="w-6 h-6 object-contain opacity-80 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <h3 className="font-medium text-xl text-gray-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MagicBento;

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Props = {
  className?: string;
  src?: string;
  alt?: string;
  drift?: number;
  twist?: number;
  hoverScale?: number;
  floatDuration?: number;

  /** Hide on smaller than desktop (default: true) */
  hideBelowDesktop?: boolean;

  /** Tailwind desktop breakpoint: 1024 (lg) by default */
  desktopMinWidth?: number;
};

export default function Dragonfly({
  className = "",
  src = "/dragonfly.svg",
  alt = "",
  drift = 24,
  twist = 6,
  hoverScale = 1.06,
  floatDuration = 8,
  hideBelowDesktop = true,
  desktopMinWidth = 1280,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(!hideBelowDesktop);

  useEffect(() => {
    if (!hideBelowDesktop) return;

    const mq = window.matchMedia(`(min-width: ${desktopMinWidth}px)`);
    const apply = () => setIsDesktop(mq.matches);

    apply();

    // iOS/Safari compatibility
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    } else {
      // @ts-ignore
      mq.addListener(apply);
      // @ts-ignore
      return () => mq.removeListener(apply);
    }
  }, [hideBelowDesktop, desktopMinWidth]);

  // ✅ ALWAYS call hooks (no conditional returns before them)
  const enabled = hideBelowDesktop ? isDesktop : true;

  // If not enabled, set motion ranges to 0 so it doesn't drift on iPad
  const safeDrift = enabled ? drift : 0;
  const safeTwist = enabled ? twist : 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [safeDrift, -safeDrift]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [-safeDrift * 0.35, safeDrift * 0.35]
  );
  const r = useTransform(scrollYProgress, [0, 1], [-safeTwist, safeTwist]);

  const ySpring = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 });
  const xSpring = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 });
  const rSpring = useSpring(r, { stiffness: 80, damping: 20, mass: 0.6 });

  // Optional: kill float animation entirely when disabled
  const imgAnimate = useMemo(() => {
    if (!enabled) return { y: 0, rotate: 0 };
    return { y: [0, -10, 0], rotate: [0, 1.5, -1.5, 0] };
  }, [enabled]);

  return (
    <motion.div
      ref={ref}
      className={`inline-block pointer-events-auto ${enabled ? "" : "hidden"}`}
      style={{
        x: xSpring,
        y: ySpring,
        rotate: rSpring,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`select-none ${className}`}
        animate={imgAnimate as any}
        transition={{
          duration: floatDuration,
          repeat: enabled ? Infinity : 0,
          ease: "easeInOut",
        }}
        whileHover={
          enabled
            ? {
                scale: hoverScale,
                y: -14,
                rotate: [0, -6, 6, -4, 4, 0],
                transition: { duration: 0.55, ease: "easeOut" },
              }
            : undefined
        }
        whileTap={enabled ? { scale: 0.98 } : undefined}
        draggable={false}
      />
    </motion.div>
  );
}

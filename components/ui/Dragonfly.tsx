"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Props = {
  className?: string;
  src?: string;
  alt?: string;
  drift?: number;
  twist?: number;
  hoverScale?: number;
  floatDuration?: number;
};

export default function Dragonfly({
  className = "",
  src = "/dragonfly.svg",
  alt = "",
  drift = 24,
  twist = 6,
  hoverScale = 1.06,
  floatDuration = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const x = useTransform(scrollYProgress, [0, 1], [-drift * 0.35, drift * 0.35]);
  const r = useTransform(scrollYProgress, [0, 1], [-twist, twist]);

  const ySpring = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 });
  const xSpring = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 });
  const rSpring = useSpring(r, { stiffness: 80, damping: 20, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      className="inline-block pointer-events-auto" // ✅ MOVED pointer-events-auto HERE
      style={{ x: xSpring, y: ySpring, rotate: rSpring }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`select-none ${className}`}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1.5, -1.5, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: hoverScale,
          y: -14,
          rotate: [0, -6, 6, -4, 4, 0],
          transition: { duration: 0.55, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
      />
    </motion.div>
  );
}
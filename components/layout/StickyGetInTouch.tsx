"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type StickyGetInTouchProps = {
  showAfterScroll?: boolean; // use ONLY on pages with hero
};

export default function StickyGetInTouch({
  showAfterScroll = false,
}: StickyGetInTouchProps) {
  const [visible, setVisible] = useState(!showAfterScroll);
  const router = useRouter();

  useEffect(() => {
    if (!showAfterScroll) return;

    const onScroll = () => {
      const heroThreshold = window.innerHeight * 0.9;
      setVisible(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScroll]);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => router.push("/start-a-conversation")}
      className="
        fixed
        bottom-[90px]
        right-6
        z-40
        rounded-full
        bg-[#0E1E2A]
        px-6
        py-3
        text-sm
        text-white
        shadow-lg
        hover:opacity-90
      "
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-label="Get in touch"
    >
      Get in touch
    </motion.button>
  );
}

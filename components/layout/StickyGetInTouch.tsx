"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

type StickyGetInTouchProps = {
  showAfterScroll?: boolean;
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
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push("/start-a-conversation")}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="
        fixed
        bottom-6
        right-6
        z-40
        bg-transparent
        p-0
      "
      aria-label="Get in touch"
    >
      <Image
        src="/g-removebg-preview.png"
        alt="Get in touch"
        width={54}
        height={54}
        className="hover:opacity-90 transition"
        priority
      />
    </motion.button>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import type { Program } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

const float = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 2, -2, 0],
    transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
  },
};


function isSvgUrl(url?: string | null) {
  if (!url) return false;
  // Sanity SVG URLs typically end with .svg and include query params
  return url.split("?")[0].toLowerCase().endsWith(".svg");
}

export default function ProgramClient({ program }: { program: Program }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const iconSrc = program.icon
    ? urlFor(program.icon).width(200).height(200).fit("max").url()
    : null;

  return (
    <main className="relative bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] overflow-hidden">
      <div className="hidden md:block absolute left-[-260px] top-[-220px] w-[700px] -z-10">
        <Image src="/blob.png" alt="" width={700} height={700} className="opacity-90" />
      </div>

      <div className="hidden md:block absolute right-[40px] top-[220px] opacity-90 -z-10">
        <motion.img src="/dragonfly.svg" alt="" className="w-[140px] rotate-[12deg]" {...float} />
        <motion.img src="/dragonfly.svg" alt="" className="w-[100px] absolute top-[120px] right-[60px] rotate-[-8deg]" {...float} />
        <motion.img src="/dragonfly.svg" alt="" className="w-[80px] absolute top-[260px] right-[10px] rotate-[20deg]" {...float} />
      </div>

      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt=""
              width={72}
              height={72}
              className="mx-auto mb-6 opacity-90"
            />
          )}

          <p className="uppercase tracking-widest text-xs opacity-60 mb-2">
            {program.label || "Program"}
          </p>

          <h1 className="font-[Playfair_Display] text-[40px] md:text-[52px] leading-tight">
            {program.title}
          </h1>

          {program.subtitle && (
            <p className="mt-3 text-lg opacity-75">{program.subtitle}</p>
          )}

          <div className="w-24 h-[2px] bg-[#B88933]/70 mx-auto mt-8" />
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-8 text-[18px] leading-[1.9] opacity-85"
        >
          {(program.description || []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <p className="text-center font-[Playfair_Display] italic text-[20px] md:text-[24px] opacity-80">
          There is no right way to heal — only your way.
        </p>
      </section>

      {program.cta?.href && (
        <section className="pb-32 px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-4xl mx-auto bg-[var(--cream)] rounded-3xl shadow-soft p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="font-medium text-lg">{program.cta?.tagline}</p>
              <p className="text-sm opacity-70 mt-1">{program.subtitle}</p>
            </div>

            <a
              href={program.cta?.href}
              className="px-7 py-3 rounded-full bg-[#2643A0] text-white text-sm hover:opacity-90 transition"
            >
              {program.cta?.text || "Learn more"}
            </a>
          </motion.div>
        </section>
      )}

      <StickyGetInTouch />
    </main>
  );
}

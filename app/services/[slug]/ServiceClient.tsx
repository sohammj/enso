"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";
import type { Service } from "@/sanity/lib/types";
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
  return url.split("?")[0].toLowerCase().endsWith(".svg");
}

export default function ServiceClient({ service }: { service: Service }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const iconSrc = service.icon
    ? urlFor(service.icon).width(200).height(200).fit("max").url()
    : null;

  return (
    <main className="relative bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] overflow-visible">
      <div className="hidden md:block absolute left-[-260px] top-[-220px] w-[700px] pointer-events-none z-0">
        <Image src="/blob.png" alt="" width={700} height={700} className="opacity-90" />
      </div>

      {/* 🦋 RIGHT SIDE CLUSTER - NOW ANIMATED */}
      <div className="hidden md:block absolute right-[40px] top-[220px] opacity-90 z-[5]">
        <Dragonfly
          className="w-[140px] rotate-[12deg]"
          drift={24}
          twist={6}
          floatDuration={8}
        />
      </div>
      <div className="hidden md:block absolute right-[-20px] top-[340px] opacity-90 z-[5]">
        <Dragonfly
          className="w-[100px] rotate-[-8deg]"
          drift={20}
          twist={5}
          floatDuration={8}
        />
      </div>
      <div className="hidden md:block absolute right-[30px] top-[480px] opacity-90 z-[5]">
        <Dragonfly
          className="w-[80px] rotate-[20deg]"
          drift={18}
          twist={5}
          floatDuration={8}
        />
      </div>

      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          {iconSrc && (
            isSvgUrl(iconSrc) ? (
              <img
                src={iconSrc}
                alt={service.title || "Service"}
                className="mx-auto mb-6 opacity-90 w-[72px] h-[72px] object-contain"
                loading="lazy"
              />
            ) : (
              <Image
                src={iconSrc}
                alt={service.title || "Service"}
                width={72}
                height={72}
                className="mx-auto mb-6 opacity-90 object-contain"
              />
            )
          )}

          <p className="uppercase tracking-widest text-xs opacity-60 mb-2">
            {service.label || "Service"}
          </p>

          <h1 className="font-[Playfair_Display] text-[40px] md:text-[52px] leading-tight">
            {service.title}
          </h1>

          {service.subtitle && <p className="mt-3 text-lg opacity-75">{service.subtitle}</p>}

          <div className="w-24 h-[2px] bg-[#B88933]/70 mx-auto mt-8" />
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-8 text-[18px] leading-[1.9] opacity-85"
        >
          {(service.description || []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <p className="text-center font-[Playfair_Display] italic text-[20px] md:text-[24px] opacity-80">
          Healing unfolds gently, when given the space to breathe.
        </p>
      </section>

      {service.cta?.href && (
        <section className="pb-32 px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-4xl mx-auto bg-[var(--cream)] rounded-3xl shadow-soft p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="font-medium text-lg">{service.cta?.tagline}</p>
              <p className="text-sm opacity-70 mt-1">{service.cta?.subtitle}</p>
            </div>

            <a
              href={service.cta?.href}
              className="px-7 py-3 rounded-full bg-[#2643A0] text-white text-sm hover:opacity-90 transition"
            >
              {service.cta?.text || "Learn more"}
            </a>
          </motion.div>
        </section>
      )}

      <StickyGetInTouch />
    </main>
  );
}
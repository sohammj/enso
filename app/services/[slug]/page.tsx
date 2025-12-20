"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "../../../lib/data";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";

const float = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 2, -2, 0],
    transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return notFound();

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <main className="relative bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] overflow-hidden">

      {/* 🌸 Watercolor Blob */}
      <div className="hidden md:block absolute left-[-260px] top-[-220px] w-[700px] -z-10">
        <Image
          src="/blob.png"
          alt=""
          width={700}
          height={700}
          className="opacity-90"
        />
      </div>

      {/* 🐉 RIGHT DRAGONFLIES */}
      <div className="hidden md:block absolute right-[40px] top-[220px] opacity-90 -z-10">
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[140px] rotate-[12deg]"
          {...float}
        />
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[100px] absolute top-[120px] right-[60px] rotate-[-8deg]"
          {...float}
        />
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[80px] absolute top-[260px] right-[10px] rotate-[20deg]"
          {...float}
        />
      </div>

      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          {service.icon && (
            <Image
              src={service.icon}
              alt=""
              width={72}
              height={72}
              className="mx-auto mb-6 opacity-90"
            />
          )}

          <p className="uppercase tracking-widest text-xs opacity-60 mb-2">
            {service.label || "Service"}
          </p>

          <h1 className="font-[Playfair_Display] text-[40px] md:text-[52px] leading-tight">
            {service.title}
          </h1>

          {service.subtitle && (
            <p className="mt-3 text-lg opacity-75">
              {service.subtitle}
            </p>
          )}

          <div className="w-24 h-[2px] bg-[#B88933]/70 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 pb-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-8 text-[18px] leading-[1.9] opacity-85"
        >
          {service.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </section>

      {/* 🌿 PAUSE QUOTE */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <p className="text-center font-[Playfair_Display] italic text-[20px] md:text-[24px] opacity-80">
          Healing unfolds gently, when given the space to breathe.
        </p>
      </section>

      {/* CTA */}
      {service.cta && (
        <section className="pb-32 px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="
              max-w-4xl mx-auto
              bg-[var(--cream)]
              rounded-3xl
              shadow-soft
              p-8 md:p-12
              flex flex-col md:flex-row
              items-center justify-between gap-6
            "
          >
            <div>
              <p className="font-medium text-lg">
                {service.cta.tagline}
              </p>
              <p className="text-sm opacity-70 mt-1">
                {service.cta.subtitle}
              </p>
            </div>

            <a
              href={service.cta.href}
              className="
                px-7 py-3
                rounded-full
                bg-[#2643A0]
                text-white
                text-sm
                hover:opacity-90
                transition
              "
            >
              {service.cta.text}
            </a>
          </motion.div>
        </section>
      )}
      <StickyGetInTouch />

    </main>
  );
}

"use client";

import { faqs } from "../../lib/data";
import { motion } from "framer-motion";
const float = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 1.5, -1.5, 0],
    transition: {
      repeat: Infinity,
      duration: 9,
      ease: "easeInOut",
    },
  },
};


export default function FAQPage() {
  return (
    <main className="bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] min-h-screen">
      
      {/* HEADER */}
      <section className="pt-28 pb-20 text-center px-6">
        <h1 className="font-[Playfair_Display] text-[48px] md:text-[56px] leading-tight">
          Frequently Asked Questions
        </h1>

        <div className="w-28 h-[2px] bg-[#B88933]/70 mx-auto my-6" />

        <p className="text-[18px] opacity-80 max-w-xl mx-auto">
          Answers to some common questions — gently explained.
        </p>
      </section>
      {/* 🦋 RIGHT DRAGONFLIES */}
      <div className="hidden md:block absolute right-[40px] top-[260px] opacity-70 -z-10">
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[140px] rotate-[10deg]"
          {...float}
        />

        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[100px] absolute top-[120px] right-[60px] rotate-[-6deg]"
          {...float}
        />
      </div>


      {/* FAQ LIST */}
      <section className="max-w-3xl mx-auto px-6 pb-28">
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="
                group
                rounded-3xl
                bg-white/70
                backdrop-blur-sm
                px-6 py-5
                shadow-soft
              "
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="text-[18px] font-medium leading-snug">
                  {f.q}
                </span>

                {/* subtle indicator */}
                <span className="text-[#B88933] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-[16px] leading-[1.8] opacity-80">
                {f.a}
              </p>
            </motion.details>
          ))}
        </div>
      </section>
      {/* 🌾 DANDELION — GROUNDED ENDING */}
      <div className="hidden md:block absolute right-[60px] bottom-[260px] opacity-80 -z-10">
        <motion.img
          src="/dandelion.svg"
          alt=""
          className="w-[180px]"
          {...float}
        />
      </div>


      {/* CTA */}
      <section className="pb-32 px-6">
        <div
          className="
            max-w-4xl mx-auto
            bg-[var(--cream)]
            rounded-3xl
            shadow-soft
            p-8 md:p-12
            text-center
          "
        >
          <p className="text-[17px] opacity-80 mb-6">
            Still unsure? Reach out and we’ll gently point you in the right direction.
          </p>

          <a
            href="/book"
            className="
              inline-block
              px-7 py-3
              rounded-full
              bg-[#2643A0]
              text-white
              text-sm
              hover:opacity-90
              transition
            "
          >
            Book a session
          </a>
        </div>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const float = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 1.5, -1.5, 0],
    transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
  },
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* 🪶 Floating dragonflies */}
      <motion.img
        src="/dragonfly.svg"
        alt=""
        className="absolute top-[50px] left-[60px] w-[90px] opacity-90 rotate-[-10deg] -z-10"
        {...float}
      />
      <motion.img
        src="/dragonfly.svg"
        alt=""
        className="absolute bottom-[100px] right-[60px] w-[100px] opacity-90 rotate-[25deg] -z-10"
        {...float}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* 📸 Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/paurl hande.jpg"
                alt="Enso art therapy workspace"
                width={1080}
                height={720}
                className="w-full h-[500px] object-cover"
                priority
              />
              <div className="absolute inset-0 border-8 border-white/20 rounded-3xl" />
            </div>

            {/* Decorative left cluster */}
            <div className="absolute left-[30px] top-[100px] opacity-90 -z-10">
              <motion.img
                src="/dragonfly.svg"
                alt=""
                className="w-[130px] rotate-[-10deg]"
                {...float}
              />
              <motion.img
                src="/dragonfly.svg"
                alt=""
                className="w-[90px] rotate-[8deg] absolute top-[90px] left-[60px]"
                {...float}
              />
            </div>

            {/* Subtle base accent */}
            <div className="absolute bottom-[60px] left-[120px] opacity-90 -z-10">
              <motion.img
                src="/dragonfly.svg"
                alt=""
                className="w-[110px] rotate-[25deg]"
                {...float}
              />
            </div>
          </motion.div>

          {/* 🪷 Text Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-12 h-1 bg-[var(--royal-blue)] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              />
              <span className="font-manrope text-[var(--royal-blue)] uppercase tracking-wider">
                Our Story
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl text-gray-900">
              About Enso Mind Matters
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 font-manrope text-gray-700 leading-relaxed">
              <p>
                For over{" "}
                <span className="text-[var(--royal-blue)]">14 years</span>, Enso
                Mind Matters has been a sanctuary for those seeking emotional
                healing, creative expression, and mindful living.
              </p>

              <p>
                Founded by{" "}
                <span className="text-[var(--royal-blue)]">Dr. Parul Dewal</span>,
                our centre embraces the profound connection between art and
                mental well-being. We believe that creativity is not just a
                skill — it's a pathway to understanding ourselves, processing
                emotions, and finding peace.
              </p>

              <p>
                The Enso circle, an ancient symbol of wholeness and imperfection,
                guides our philosophy: healing is not about perfection, but about
                embracing our journey with compassion and openness.
              </p>

              <p>
                Through art therapy, mindfulness practices, and community
                connection, we create spaces where individuals can explore their
                inner worlds, discover resilience, and cultivate joy.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-8 pt-8">
              <div className="space-y-1 text-center">
                <div
                  className="text-3xl font-semibold text-[#0E1E2A]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  500+
                </div>
                <div className="text-[#0E1E2A]/60 text-sm">Sessions Held</div>
              </div>

              <div className="w-px h-8 bg-[#0E1E2A]/20" />

              <div className="space-y-1 text-center">
                <div
                  className="text-3xl font-semibold text-[#0E1E2A]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  200+
                </div>
                <div className="text-[#0E1E2A]/60 text-sm">Lives Touched</div>
              </div>

              <div className="w-px h-8 bg-[#0E1E2A]/20" />

              <div className="space-y-1 text-center">
                <div
                  className="text-3xl font-semibold text-[#0E1E2A]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  5 Years
                </div>
                <div className="text-[#0E1E2A]/60 text-sm">Of Practice</div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="pt-6"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href="programs"
                className="inline-flex items-center space-x-2 font-manrope text-[var(--royal-blue)] group"
              >
                <span>Explore Our Approach</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative dragonflies (bottom layer) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="absolute top-[50px] left-[60px] w-[100px] opacity-90 rotate-[-10deg]"
          {...float}
        />
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="absolute bottom-[100px] right-[60px] w-[110px] opacity-90 rotate-[25deg]"
          {...float}
        />
      </div>
    </section>
  );
}

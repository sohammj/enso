"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-white relative overflow-hidden"
    >
      

      {/* Decorative watercolor blob */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full watercolor-blob bg-[var(--pastel-blush)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                    src="/paurl hande.jpg" // your image in /public
                    alt="Enso art therapy workspace"
                    width={1080}
                    height={720}
                    className="w-full h-[500px] object-cover"
                    priority
                />
                <div className="absolute inset-0 border-8 border-white/20 rounded-3xl" />
            </div>




            {/* Floating dragonfly doodle */}
            <motion.div
              className="absolute -top-6 -right-6 w-20 h-20"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <circle cx="40" cy="35" r="6" fill="var(--pastel-mint)" />
                <ellipse
                  cx="35"
                  cy="25"
                  rx="8"
                  ry="12"
                  fill="var(--pastel-sky)"
                  opacity="0.7"
                />
                <ellipse
                  cx="45"
                  cy="25"
                  rx="8"
                  ry="12"
                  fill="var(--pastel-sky)"
                  opacity="0.7"
                />
                <ellipse
                  cx="35"
                  cy="45"
                  rx="7"
                  ry="10"
                  fill="var(--pastel-blush)"
                  opacity="0.7"
                />
                <ellipse
                  cx="45"
                  cy="45"
                  rx="7"
                  ry="10"
                  fill="var(--pastel-blush)"
                  opacity="0.7"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
                    <div className="text-3xl font-semibold text-[#0E1E2A]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    500+
                    </div>
                    <div className="text-[#0E1E2A]/60 text-sm">Sessions Held</div>
                </div>

                <div className="w-px h-8 bg-[#0E1E2A]/20" />

                <div className="space-y-1 text-center">
                    <div className="text-3xl font-semibold text-[#0E1E2A]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    200+
                    </div>
                    <div className="text-[#0E1E2A]/60 text-sm">Lives Touched</div>
                </div>

                <div className="w-px h-8 bg-[#0E1E2A]/20" />

                <div className="space-y-1 text-center">
                    <div className="text-3xl font-semibold text-[#0E1E2A]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    5 Years
                    </div>
                    <div className="text-[#0E1E2A]/60 text-sm">Of Practice</div>
                </div>
            </div>


            <motion.div
              className="pt-6"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href="#programs"
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
    </section>
  );
}

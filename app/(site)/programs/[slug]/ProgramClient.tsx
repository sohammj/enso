"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";
import type { Program } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import HorizontalPhotoStrip from "@/components/bits/HorizontalPhotoStrip";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Script from "next/script";



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

export default function ProgramClient({ program }: { program: Program }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const igEnabled = !!program.socialFeeds?.instagram?.enabled && !!program.socialFeeds?.instagram?.appId;
  const liEnabled = !!program.socialFeeds?.linkedin?.enabled && !!program.socialFeeds?.linkedin?.appId;
  const showAnyFeed = igEnabled || liEnabled;



  const iconSrc = program.icon
    ? urlFor(program.icon).width(200).height(200).fit("max").url()
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
                alt={program.title || "Program"}
                className="mx-auto mb-6 opacity-90 w-[72px] h-[72px] object-contain"
                loading="lazy"
              />
            ) : (
              <Image
                src={iconSrc}
                alt={program.title || "Program"}
                width={72}
                height={72}
                className="mx-auto mb-6 opacity-90 object-contain"
              />
            )
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

      <section className="max-w-3xl mx-auto px-6 pb-28 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-8 text-[18px] leading-[1.9] opacity-85"
        >
          {program.description && (
            <div className="space-y-4">
              <PortableText value={program.description} />
            </div>
          )}

        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <p className="text-center font-[Playfair_Display] italic text-[20px] md:text-[24px] opacity-80">
          {program.closingQuote || "There is no right way to heal — only your way."}
        </p>
      </section>

      {/* Photo Strip Section - same as ServiceClient */}
      {program.photoStrip?.length ? (
        <HorizontalPhotoStrip items={program.photoStrip} />
      ) : null}


      {/* Elfsight loader (only if any feed is enabled) */}
      {showAnyFeed && (
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="afterInteractive"
        />
      )}

      {/* Social Feeds (toggleable from Sanity) */}
      {showAnyFeed && (
        <section className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
          <div className="space-y-10">
            {igEnabled && (
              <div className="bg-[var(--cream)]/60 rounded-3xl shadow-soft p-5 md:p-7 relative">
                <div
                  className={`elfsight-app-${program.socialFeeds?.instagram?.appId}`}
                  data-elfsight-app-lazy
                />
                {/* Enso Logo Cover for Instagram */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-center items-center pointer-events-none z-20">
                    <img 
                      src="/white-paper-texture.jpg" 
                      alt="Enso" 
                      className="h-full w-full object-cover"
                    />
                </div>
              </div>
            )}










            {liEnabled && (
              <div className="bg-[var(--cream)]/60 rounded-3xl shadow-soft p-5 md:p-7 relative">
                <div
                  className={`elfsight-app-${program.socialFeeds?.linkedin?.appId}`}
                  data-elfsight-app-lazy
                />
                {/* Enso Logo Cover for LinkedIn */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-center items-center pointer-events-none z-20">
                    <img 
                      src="/white-paper-texture.jpg" 
                      alt="Enso" 
                      className="h-full w-full object-cover"
                    />
                </div>
              </div>
            )}
          </div>
        </section>
      )}


      {/* CTA Section */}
      {program.cta?.href && (
        <section className="pb-32 px-6 relative z-10">
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
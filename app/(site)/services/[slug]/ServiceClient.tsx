"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";
import type { Service } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { useRef } from "react";
import HorizontalPhotoStrip from "@/components/bits/HorizontalPhotoStrip";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Script from "next/script";
import SocialRail from "@/components/SocialRail";


import type { PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-4 leading-[1.9] text-[18px] opacity-85">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-[28px] md:text-[32px] font-[Playfair_Display] font-semibold opacity-95">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-[22px] md:text-[24px] font-[Playfair_Display] font-semibold opacity-95">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[#B88933]/50 pl-5 italic opacity-85">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.8]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.8]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="underline underline-offset-4 hover:opacity-80"
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

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
function PhotoStrip({
  items,
}: {
  items: { image?: any; label?: string; caption?: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    // Convert vertical wheel to horizontal scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  return (

    <section className="relative z-10 pb-28">
      <div
        ref={ref}
        onWheel={onWheel}
        className="
          overflow-x-auto overflow-y-hidden
          px-6
          no-scrollbar
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        
        <div className="min-w-max flex gap-10 items-start py-4">
          {items.map((it, idx) => {
            if (!it?.image?.asset) return null;

            const imgUrl = urlFor(it.image)
              .width(900)
              .height(900)
              .fit("crop")
              .url();

            return (
              <figure key={idx} className="w-[260px] md:w-[340px] shrink-0">
                {(it.label || it.caption) && (
                  <div className="mb-2">
                    {it.label && (
                      <p className="text-[10px] tracking-widest uppercase opacity-60">
                        {it.label}
                      </p>
                    )}
                    {it.caption && (
                      <p className="text-sm opacity-70 leading-snug mt-1">
                        {it.caption}
                      </p>
                    )}
                  </div>
                )}

                <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-soft">
                  <Image
                    src={imgUrl}
                    alt={it.caption || it.label || "Photo"}
                    fill
                    className="object-cover"
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServiceClient({ service }: { service: Service }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  const igEnabled = !!service.socialFeeds?.instagram?.enabled && !!service.socialFeeds?.instagram?.appId;
  const liEnabled = !!service.socialFeeds?.linkedin?.enabled && !!service.socialFeeds?.linkedin?.appId;
  const showAnyFeed = igEnabled || liEnabled;

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
          {service.description && (
            <div>
              <PortableText value={service.description} components={portableTextComponents} />
            </div>
          )}

        </motion.div>


        <SocialRail desktop mobile="bar" />

      </section>
      
      <section className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        <p className="text-center font-[Playfair_Display] italic text-[20px] md:text-[24px] opacity-80">
          {service.ClosingQuote || "Healing unfolds gently, when given the space to breathe."}
        </p>
      </section>

      
      {/* {service.photoStrip?.length ? <PhotoStrip items={service.photoStrip} /> : null} */}
      {service.photoStrip?.length ? (
        <HorizontalPhotoStrip items={service.photoStrip} />
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
                  className={`elfsight-app-${service.socialFeeds?.instagram?.appId}`}
                  data-elfsight-app-lazy
                />
                {/* Enso Logo Cover for Instagram */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-center items-center pointer-events-none z-20 overflow-hidden rounded-b-3xl">
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
                  className={`elfsight-app-${service.socialFeeds?.linkedin?.appId}`}
                  data-elfsight-app-lazy
                />
                {/* Enso Logo Cover for LinkedIn */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-center items-center pointer-events-none z-20 overflow-hidden rounded-b-3xl">
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
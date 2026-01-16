"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import MagicBento from "@/components/bits/MagicBento";
import { PauseReflect } from "@/components/sections/PauseReflect";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { MapEmbed } from "@/components/sections/MapEmbed";
import SupportSection from "@/components/sections/SupportSection";
import HandwrittenNotesSection from "@/components/sections/HandwrittenNotesSection";
import StartConversationSection from "@/components/sections/StartConversationSection";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";


import type { HomePageData, SupportCard } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

const DEFAULTS = {
  hero: {
    // we keep your original formatting using <br/> lines
    headlineLines: [
      "A space to Pause,",
      "Reflect, and Heal",
      "through art and",
      "conversation.",
    ],
    subheadline:
      "ENSO is a space for emotional growth, self-discovery, and inner balance through art therapy and counselling.",
    overlayOpacity: 0.1,
    soundButtonLabelMuted: "🔇",
    soundButtonLabelUnmuted: "🔊",
    fallbackVideoPath: "/enso-bg.mp4",
  },
  welcome: {
    title: "Welcome to ENSO",
    body:
      "Enso Art Therapy and Counseling Centre offers a safe and inclusive space for emotional well-being, personal growth, and self-expression.",
    fallbackImagePath: "/hero11.jpeg",
    highlights: [
      { label: "Personal Growth", iconType: "dragonfly" },
      { label: "Emotional Well-being", iconType: "dragonfly" },
      { label: "Self-expression", iconType: "dragonfly" },
    ],
  },
  about: {
    title: "About ENSO",
    body:
      "The Enso, a circle drawn in one continuous breath, holds within it the beauty of being incomplete yet whole. Inspired by the Enso — a circle drawn in one mindful stroke — we believe healing is not about perfection, but presence.",
    quote:
      "Each session at Enso is an invitation to pause, reflect, and let your story unfold naturally, one breath at a time.",
  },
  pauseReflect: {
    label: "Pause & Reflect",
    phrases: [],
  },
  support: {
    title: "How We Support You",
    subtitle:
      "Different paths, one purpose — helping you reconnect with yourself.",
    cards: [
      {
        title: "Individual Therapy",
        description:
          "Space to pause, reflect, and work through emotions at your own pace.",
        bg: "#FFF2CC",
        href: "/services/individual-sessions",
        fallbackIconPath: "/icons/individual.png",
      },
      {
        title: "Group Therapy",
        description:
          "Grow through shared stories, connection, and collective healing.",
        bg: "#F4EFEA",
        href: "/services/group-sessions",
        fallbackIconPath: "/icons/group.png",
      },
      {
        title: "NGO Collaborations",
        description:
          "Bringing art and therapy to spaces where voices need to be seen and supported.",
        bg: "#F8D7C4",
        href: "/services/workshops-and-training",
        fallbackIconPath: "/icons/ngo.png",
      },
      {
        title: "Corporate Sessions",
        description:
          "Reflective and creative experiences that bring balance, awareness, and connection to teams.",
        bg: "#DCEEEA",
        href: "/services/workshops-and-training",
        fallbackIconPath: "/icons/corporate.png",
      },
    ] as SupportCard[],
  },
};

function splitHeadlineToLines(headline?: string): string[] | null {
  if (!headline) return null;
  // allow Sanity editor to either:
  // - type new lines
  // - or just a sentence (we won't force split)
  const lines = headline
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.length ? lines : null;
}

export default function HomeClient({ data }: { data: HomePageData | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  const float = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 1.5, -1.5, 0],
      transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
    },
  };

  // ========== Resolve content with fallbacks ==========
  const heroHeadlineLines =
    splitHeadlineToLines(data?.hero?.headlineLines?.join("\n")) ||
    DEFAULTS.hero.headlineLines;

  const heroSub = data?.hero?.subheadline || DEFAULTS.hero.subheadline;

//   const overlayOpacity =
//     typeof data?.hero?.overlayOpacity === "number"
//       ? data!.hero!.overlayOpacity
//       : DEFAULTS.hero.overlayOpacity;

//   const soundMutedLabel =
//     data?.hero?.soundButtonLabelMuted || DEFAULTS.hero.soundButtonLabelMuted;

//   const soundUnmutedLabel =
//     data?.hero?.soundButtonLabelUnmuted ||
//     DEFAULTS.hero.soundButtonLabelUnmuted;

  const heroVideoSrc =
    DEFAULTS.hero.fallbackVideoPath;

  const welcomeTitle = data?.welcome?.title || DEFAULTS.welcome.title;
  const welcomeBody = data?.welcome?.body || DEFAULTS.welcome.body;

  const welcomeImageSrc = data?.welcome?.image
    ? urlFor(data.welcome.image).width(900).height(900).fit("crop").url()
    : DEFAULTS.welcome.fallbackImagePath;

  const highlights =
    (data?.welcome?.highlights?.length ? data.welcome.highlights : null) ||
    DEFAULTS.welcome.highlights;

  const aboutTitle = data?.about?.title || DEFAULTS.about.title;
  const aboutBody = data?.about?.body || DEFAULTS.about.body;
  const aboutQuote = data?.about?.quote || DEFAULTS.about.quote;

  const supportTitle = data?.support?.title || DEFAULTS.support.title;
  const supportSubtitle = data?.support?.subtitle || DEFAULTS.support.subtitle;
  const supportCards = DEFAULTS.support.cards;

//   const supportCards =
//     (data?.support?.cards?.length ? data.support.cards : null) ||
//     DEFAULTS.support.cards;

  const pauseLabel = data?.pauseReflect?.label || DEFAULTS.pauseReflect.label;
  const pausePhrases =
    data?.pauseReflect?.phrases || DEFAULTS.pauseReflect.phrases;

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100vh] w-full overflow-hidden text-[#111] -mt-[80px]">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
        >
          <source src={DEFAULTS.hero.fallbackVideoPath} type="video/mp4" />
        </video>

        {/* keep original look: bg-black/10 */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        />

        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 bg-white/70 hover:bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm shadow-md"
        >
          {muted ? DEFAULTS.hero.soundButtonLabelMuted : DEFAULTS.hero.soundButtonLabelUnmuted}
        </button>

        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-3xl">
          <h1 className="font-title text-[32px] md:text-6xl leading-tight">
            {heroHeadlineLines[0]}
            <br />
            {heroHeadlineLines[1]}
            <br />
            {heroHeadlineLines[2]}
            <br />
            {heroHeadlineLines[3]}
          </h1>

          <p className="font-body mt-4 md:mt-6 text-base md:text-lg opacity-80">
            {heroSub}
          </p>
        </div>
      </section>


      {/* 🌕 WELCOME + ABOUT + SUPPORT WRAPPER */}
      <section className="relative overflow-visible">
        {/* 🌸 Gentle mid-left + lower-left cluster - POSITION FROM OLD CODE */}
        <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 z-[50]">
          <Dragonfly
            className="w-[150px] rotate-[-15deg]"
            drift={22}
            twist={6}
            floatDuration={8}
          />
          <div className="hidden md:block absolute left-[70px] top-[200px] opacity-90 z-[50]">
            <Dragonfly
              className="w-[130px] rotate-[15deg]"
              drift={20}
              twist={5}
              floatDuration={8}
            />
          </div>
        </div>

        {/* 🌕 GLOBAL WATERCOLOUR BLOB */}
        <div className="hidden lg:block absolute left-[-280px] top-[-420px] bottom-[-300px] w-[800px] pointer-events-none z-0">
          <Image
            src="/blob.png"
            alt=""
            fill
            className="object-contain opacity-95"
            priority
          />
        </div>

        {/* 🌿 WELCOME CARD */}
        <section className="relative overflow-visible py-16 md:py-28 z-10">
          {/* ✅ KEEP YOUR CURVE EXACTLY */}
          <img
            src="/enso-curve.svg"
            alt=""
            aria-hidden
            className="
              pointer-events-none
              absolute
              z-[1]
              opacity-45
              mix-blend-multiply
              blur-[0.3px]

              hidden

              md:block
              md:left-[-0.5%]
              md:top-[660px]
              md:w-[115%]
              md:scale-y-[0.85]

              xl:top-[700px]
              xl:w-[112%]
              xl:scale-y-[0.82]
            "
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              relative
              mx-auto
              mt-10 md:mt-24
              bg-[var(--cream)]
              rounded-3xl
              shadow-soft
              max-w-[92%]
              px-5 py-6
              md:max-w-5xl
              md:p-12
            "
          >
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-10 items-center">
              {/* <Image
                src={welcomeImageSrc}
                alt="Enso Art Therapy Space"
                width={420}
                height={420}
                className="w-full max-w-[320px] mx-auto md:max-w-none rounded-2xl object-cover shadow-md"
              /> */}
              <Image
                src={welcomeImageSrc}
                alt="Enso Art Therapy Space"
                width={520}
                height={520}
                className="
                  w-full
                  h-full
                  rounded-2xl
                  object-cover
                  shadow-md
                "
              />


              <div>
                <h3 className="font-[Playfair_Display] text-3xl mb-4">
                  {welcomeTitle}
                </h3>

                <p className="text-[var(--ink)]/80 leading-relaxed mb-6 max-w-xl">
                  {welcomeBody}
                </p>

                <ul className="space-y-4">
                  {highlights.map((h, idx) => (
                    <li key={`${h.label ?? "item"}-${idx}`} className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-white shadow grid place-items-center">
                        {h?.iconType === "image" && h?.iconImage?.asset ? (
                          <Image
                            src={urlFor(h.iconImage).width(60).height(60).fit("crop").url()}
                            alt=""
                            width={22}
                            height={22}
                            className="object-contain"
                          />
                        ) : h?.iconType === "dragonfly" ? (
                          <Dragonfly
                            className="w-[22px] h-[22px]"
                            drift={8}
                            twist={3}
                            floatDuration={6}
                          />
                        ) : (
                          <span className="text-lg leading-none">{h?.emoji || "•"}</span>
                        )}
                      </span>

                      {h.label}
                    </li>

                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <div
            className="
              absolute
              bottom-[-20px]
              right-[-10px]
              w-[220px]
              opacity-60
              pointer-events-none
              md:bottom-0
              md:right-0
              md:w-[420px]
            "
          >
            <DotLottieReact
              src="/enso-dandelion.lottie"
              loop
              autoplay
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </section>

        {/* 🌿 ABOUT ENSO */}
        <section className="relative pt-20 pb-10 z-10">
          {/* 🌸 About section - cluster of 2 - MOVED OUTSIDE CONTAINER */}
          <div className="hidden md:block absolute left-[30px] top-[120px] opacity-90 z-[5]">
            <Dragonfly
              className="w-[150px] rotate-[-15deg]"
              drift={22}
              twist={6}
              floatDuration={8}
            />
          </div>
          
          {/* Second dragonfly lower right in About */}
          <div className="hidden md:block absolute left-[70px] top-[200px] opacity-90 z-[5]">
            <Dragonfly
              className="w-[130px] rotate-[15deg]"
              drift={20}
              twist={5}
              floatDuration={8}
            />
          </div>

          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-[Playfair_Display] text-[32px] md:text-[44px] mb-4 text-[#0E1E2A]">
              {aboutTitle}
            </h2>

            <div className="w-28 h-[2px] bg-[#B88933]/70 mb-10" />

            <p className="max-w-[520px] text-[17px] leading-[1.9] text-[#0E1E2A]/85">
              {aboutBody}
            </p>
          </div>

          <p
            className="
              mt-16 md:mt-32
              text-center
              max-w-4xl mx-auto px-6
              font-quote
              text-[20px] md:text-[26px]
              leading-[1.7]
              text-[#0E1E2A]/85
            "
            style={{
              mixBlendMode: "multiply",
              textShadow: "0 0.6px 0.6px rgba(0,0,0,0.12)",
            }}
          >
            {aboutQuote}
          </p>
        </section>

        {/* 🌕 GLOW + PAUSE & REFLECT */}
        <div className="relative py-32 md:py-36 overflow-visible">
          <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-yellow-400 opacity-95 blur-[120px] pointer-events-none" />
          <PauseReflect label={pauseLabel} phrases={pausePhrases} />
        </div>

        {/* 🌿 SUPPORT */}
        <SupportSection
          title={supportTitle}
          subtitle={supportSubtitle}
          cards={supportCards}
        />

      </section>

      {/* 🌸 Support section - dragonflies OUTSIDE the main wrapper */}
      <div className="hidden md:block absolute right-[80px] top-[2800px] opacity-90 z-[5]">
        <Dragonfly
          className="w-[130px] rotate-[12deg]"
          drift={20}
          twist={5}
          floatDuration={8}
        />
      </div>
      <div className="hidden md:block absolute left-[60px] top-[3100px] opacity-90 z-[5]">
        <Dragonfly
          className="w-[115px] rotate-[-18deg]"
          drift={18}
          twist={6}
          floatDuration={8}
        />
      </div>

      {/* 🐉 ABOVE HANDWRITTEN NOTES */}
      <section className="relative">
        {/* 🌸 Handwritten Notes - cluster of 3 - POSITIONED BETTER */}
        <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 z-[5]">
          <Dragonfly
            className="w-[150px] rotate-[-15deg]"
            drift={22}
            twist={6}
            floatDuration={8}
          />
        </div>
        <div className="hidden md:block absolute left-[120px] top-[220px] opacity-90 z-[5]">
          <Dragonfly
            className="w-[100px] rotate-[5deg]"
            drift={18}
            twist={5}
            floatDuration={8}
          />
        </div>
        <div className="hidden md:block absolute left-[60px] top-[340px] opacity-90 z-[5]">
          <Dragonfly
            className="w-[120px] rotate-[-25deg]"
            drift={20}
            twist={7}
            floatDuration={8}
          />
        </div>
        
        <HandwrittenNotesSection />
      </section>

      <StartConversationSection />

      {/* 🐉 MAP WHITESPACE */}
      <section className="relative">
        <GoogleReviews />

        {/* 🌸 Gentle mid-left + lower-left cluster - POSITION FROM OLD CODE */}
        <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 z-0">
          <Dragonfly
            className="w-[150px] rotate-[-15deg]"
            drift={22}
            twist={6}
            floatDuration={8}
          />
          <Dragonfly
            className="w-[100px] rotate-[5deg] absolute top-[100px] left-[80px]"
            drift={18}
            twist={5}
            floatDuration={8}
          />
        </div>

        {/* Single dragonfly on left - POSITION FROM OLD CODE */}
        <div className="hidden md:block absolute bottom-[60px] left-[100px] opacity-90 z-0">
          <Dragonfly
            className="w-[120px] rotate-[30deg]"
            drift={20}
            twist={7}
            floatDuration={8}
          />
        </div>

        <MapEmbed />

        {/* 🌬️ Calm finale bottom-right group - POSITION FROM OLD CODE */}
        <div className="hidden md:block absolute bottom-[100px] right-[60px] opacity-90 z-0">
          <Dragonfly
            className="w-[160px] rotate-[10deg]"
            drift={24}
            twist={8}
            floatDuration={8}
          />
          <Dragonfly
            className="w-[110px] absolute -top-[60px] left-[-50px] rotate-[28deg]"
            drift={18}
            twist={7}
            floatDuration={8}
          />
          <Dragonfly
            className="w-[90px] absolute top-[100px] left-[70px] rotate-[8deg]"
            drift={16}
            twist={6}
            floatDuration={8}
          />
        </div>
      </section>

      <StickyGetInTouch showAfterScroll />
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react"; 
import { PauseReflect } from "@/components/sections/PauseReflect";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { MapEmbed } from "@/components/sections/MapEmbed";
import SupportSection from "@/components/sections/SupportSection";
import HandwrittenNotesSection from "@/components/sections/HandwrittenNotesSection";
import StartConversationSection from "@/components/sections/StartConversationSection";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import Dragonfly from "@/components/ui/Dragonfly";
import { toast } from "sonner";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import SocialRail from "@/components/SocialRail";
import { motion, AnimatePresence } from "framer-motion";





// import type { HomePageData, SupportCard } from "@/sanity/lib/types";
import type { HomePageData, SupportCard, HomeHighlight } from "@/sanity/lib/types";

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
    subheadline: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "ENSO is a space for emotional growth, self-discovery, and inner balance through art therapy and counselling.",
          },
        ],
      },
    ] satisfies PortableTextBlock[],
    overlayOpacity: 0.1,
    soundButtonIconMuted: "/icons/no-sound.png",
    soundButtonIconUnmuted: "/icons/volume-up.png",

    fallbackVideoPath: "/enso-bg.mp4",
  },
  welcome: {
    title: "Welcome to ENSO",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Enso Art Therapy and Counseling Centre offers a safe and inclusive space for emotional well-being, personal growth, and self-expression.",
          },
        ],
      },
    ] satisfies PortableTextBlock[],

    fallbackImagePath: "/hero11.jpeg",
    highlights: [
      { label: "Personal Growth" },
      { label: "Emotional Well-being" },
      { label: "Self-expression" },
    ] satisfies HomeHighlight[],
  },
  about: {
    title: "About ENSO",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "The Enso, a circle drawn in one continuous breath, holds within it the beauty of being incomplete yet whole. Inspired by the Enso — a circle drawn in one mindful stroke — we believe healing is not about perfection, but presence.",
          },
        ],
      },
    ] satisfies PortableTextBlock[],
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

  const startConvRef = useRef<HTMLDivElement | null>(null);
  const [showDesktopRail, setShowDesktopRail] = useState(false);

  useEffect(() => {
  const el = startConvRef.current;
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowDesktopRail(entry.isIntersecting);
    },
    {
      threshold: 0.35, // 35% visible before enabling
    }
  );

  observer.observe(el);

  return () => observer.disconnect();
}, []);



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

  // const heroSub = data?.hero?.subheadline || DEFAULTS.hero.subheadline;
  const heroSub: PortableTextBlock[] =
    (data?.hero?.subheadline?.length ? data.hero.subheadline : null) ??
    DEFAULTS.hero.subheadline;

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
  // const welcomeBody = data?.welcome?.body || DEFAULTS.welcome.body;

  const welcomeBody: PortableTextBlock[] =
    (data?.welcome?.body?.length ? data.welcome.body : null) ??
    DEFAULTS.welcome.body;

  const welcomeImageSrc = data?.welcome?.image
    ? urlFor(data.welcome.image).width(900).height(900).fit("crop").url()
    : DEFAULTS.welcome.fallbackImagePath;

  const highlights: HomeHighlight[] =
  (data?.welcome?.highlights?.length ? data.welcome.highlights : null) ??
  DEFAULTS.welcome.highlights;


  const aboutTitle = data?.about?.title || DEFAULTS.about.title;
  // const aboutBody = data?.about?.body || DEFAULTS.about.body;

  const aboutBody: PortableTextBlock[] =
    (data?.about?.body?.length ? data.about.body : null) ??
    DEFAULTS.about.body;


  const aboutQuote = data?.about?.quote || DEFAULTS.about.quote;

 // In your HomeClient component, update the support cards section:

const supportTitle = data?.support?.title || DEFAULTS.support.title;
const supportSubtitle = data?.support?.subtitle || DEFAULTS.support.subtitle;

// ✅ Use Sanity cards if available, otherwise use defaults
const supportCards: SupportCard[] = (data?.support?.cards?.length 
  ? data.support.cards 
  : DEFAULTS.support.cards
).map(card => ({
  ...card,
  // Add fallback icon paths for when Sanity images aren't available
  fallbackIconPath: card.fallbackIconPath || getDefaultIconPath(card.title),
}));

// Helper function to get default icon based on title
function getDefaultIconPath(title?: string): string {
  const titleLower = title?.toLowerCase() || "";
  if (titleLower.includes("individual")) return "/icons/individual.png";
  if (titleLower.includes("group")) return "/icons/group.png";
  if (titleLower.includes("ngo") || titleLower.includes("collaboration")) return "/icons/ngo.png";
  if (titleLower.includes("corporate")) return "/icons/corporate.png";
  return "/icons/individual.png"; // default fallback
}

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
        <div className="absolute inset-0 z-[5] md:hidden pointer-events-none backdrop-blur-md" />


        {/* keep original look: bg-black/10 */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        />

        {/* <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 bg-white/70 hover:bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm shadow-md"
        >
          {muted ? DEFAULTS.hero.soundButtonLabelMuted : DEFAULTS.hero.soundButtonLabelUnmuted}
        </button> */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-20 bg-white/70 hover:bg-white/90 backdrop-blur-sm px-3 py-3 rounded-full shadow-md flex items-center justify-center"
        >
          <Image
            src={muted ? DEFAULTS.hero.soundButtonIconMuted : DEFAULTS.hero.soundButtonIconUnmuted}
            alt=""
            width={22}
            height={22}
            className="opacity-80 hover:opacity-100 transition-opacity"
            priority
          />
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

          {/* <p className="font-body mt-4 md:mt-6 text-base md:text-lg opacity-100"> */}
          <div className="font-body mt-4 md:mt-6 text-base md:text-lg text-[#000000]">
            <PortableText value={heroSub} />
          </div>

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

                {/* <p className="text-[var(--ink)]/80 leading-relaxed mb-6 max-w-xl">
                  {welcomeBody}
                </p> */}

                <div className="text-[var(--ink)]/80 leading-relaxed mb-6 max-w-xl">
                  <PortableText value={welcomeBody} />
                </div>


                <ul className="space-y-4">
                  {highlights.map((h, idx) => (
                    <li key={`${h.label ?? "item"}-${idx}`} className="flex items-center gap-3">
                      {/* <span className="w-9 h-9 rounded-full bg-white shadow grid place-items-center">
                        {h?.icon?.asset ? (
                          <Image
                            src={urlFor(h.icon).width(60).height(60).fit("crop").url()}
                            alt=""
                            width={22}
                            height={22}
                            className="object-contain"
                          />
                        ) : (
                          <Image
                            src="/dragonfly.svg"
                            alt=""
                            width={18}
                            height={18}
                            className="object-contain"
                          />
                        )}
                      </span> */}
                      <span className="shrink-0 w-10 h-10 grid place-items-center">
                        {h?.icon?.asset ? (
                          <Image
                            src={urlFor(h.icon).width(80).height(80).fit("crop").url()}
                            alt=""
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        ) : (
                          <Image
                            src="/dragonfly.svg"
                            alt=""
                            width={80}
                            height={80}
                            className="object-contain"
                          />
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

          {/* <div className="max-w-5xl mx-auto px-6"> */}
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-[Playfair_Display] text-[32px] md:text-[44px] mb-4 text-[#0E1E2A] flex items-center">
            
            <span className="order-1 md:order-2">
              {aboutTitle}
            </span>

            <Image
              src="/enso.png"
              alt=""
              width={45}
              height={45}
              className="order-2 md:order-1 inline-block opacity-100 ml-2 md:ml-0 md:mr-2 flex-shrink-0"
            />

          </h2>

          <div className="w-28 h-[2px] bg-[#B88933]/70 mb-10" />

          <div className="max-w-[520px] text-[20px] md:text-[21px] leading-[1.9] text-[#0E1E2A]/85">
            <PortableText value={aboutBody} />
          </div>
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

      {/* <StartConversationSection /> */}
      <div ref={startConvRef}>
        <StartConversationSection />
      </div>


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

      {/* Desktop SocialRail (only when in StartConversation viewport) */}
      <AnimatePresence>
        {showDesktopRail && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <SocialRail desktop mobile="none" />
          </motion.div>
        )}
      </AnimatePresence>


      <StickyGetInTouch showAfterScroll />
    </>
  );
}
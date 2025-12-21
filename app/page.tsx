"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import MagicBento from "../components/bits/MagicBento";
import { PauseReflect } from "../components/sections/PauseReflect";
import { GoogleReviews } from "../components/sections/GoogleReviews";
import { MapEmbed } from "../components/sections/MapEmbed";
import SupportSection from "../components/sections/SupportSection";
import HandwrittenNotesSection from "../components/sections/HandwrittenNotesSection";
import StartConversationSection from "../components/sections/StartConversationSection";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";




/* ================= PAGE ================= */

export default function Home() {
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
        >
          <source src="/enso-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/10" />

        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 bg-white/70 hover:bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm shadow-md"
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-3xl">
          <h1 className="font-display text-[32px] leading-snug md:text-6xl md:leading-tight">

            A space to Pause, <br /> Reflect, and Heal <br /> through art and <br /> conversation.
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg opacity-80">

            ENSO is a space for emotional growth, self-discovery, and inner balance
            through art therapy and counselling.
          </p>
        </div>
      </section>

      {/* 🌕 WELCOME + ABOUT + SUPPORT WRAPPER */}
      <section className="relative overflow-visible">

        {/* 🌸 Gentle mid-left + lower-left cluster */}
        <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[150px] rotate-[-15deg]"
            {...float}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[100px] rotate-[5deg] absolute top-[100px] left-[80px]"
            {...float}
          />
        </div>

        {/* <div className="absolute bottom-[60px] left-[100px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[120px] rotate-[30deg]"
            {...float}
          /> */}
        {/* </div> */}
        

        {/* 🌕 GLOBAL WATERCOLOUR BLOB */}
        <div className="hidden md:block absolute left-[-280px] top-[-420px] bottom-[-300px] w-[800px] pointer-events-none z-0">
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
          {/* 🪶 HEALING IS NON-LINEAR CURVE */}
          {/* <img
            src="/enso-curve.svg"
            alt=""
            aria-hidden
            className="
              pointer-events-none
              absolute
              left-1/2
              -translate-x-[61%]
              top-[500px]
              w-[95%]
              opacity-45
              mix-blend-multiply
              blur-[0.3px]
              z-[1]
            "
          /> */}
          
          <img
            src="/enso-curve.svg"
            alt=""
            aria-hidden
            className="
              pointer-events-none
              absolute
              left-[-0.5%]          /* ⬅️ pulls curve start to the left */
              top-[660px]         /* ⬆️ vertical placement */
              w-[115%]            /* 🔍 zoom out / in */
              scale-y-[0.85]      /* 📉 reduces height only */
              opacity-45
              mix-blend-multiply
              blur-[0.3px]
              z-[1]
            "
          />


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative max-w-5xl mx-auto mt-12 md:mt-24 bg-[var(--cream)] rounded-3xl shadow-soft p-6 md:p-12"
          >
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-center">
              <Image
                src="/hero11.jpeg"
                alt="Enso Art Therapy Space"
                width={420}
                height={420}
                className="w-full max-w-[320px] mx-auto md:max-w-none rounded-2xl object-cover shadow-md"
              />

              <div>
                <h3 className="font-[Playfair_Display] text-3xl mb-4">
                  Welcome to ENSO
                </h3>

                <p className="text-[var(--ink)]/80 leading-relaxed mb-6 max-w-xl">
                  Enso Art Therapy and Counseling Centre offers a safe and inclusive space
                  for emotional well-being, personal growth, and self-expression.
                </p>

                <ul className="space-y-4">
                  {["Personal Growth", "Emotional Well-being", "Self-expression"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-white shadow grid place-items-center text-[#B88933]">
                          🌱
                        </span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 right-0 w-[420px] opacity-70 pointer-events-none">
            <DotLottieReact
              src="/enso-dandelion.lottie"
              loop
              autoplay
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          {/* 🎨 CURVE — STARTS FROM WELCOME */}
          {/* 🎨 CURVE — STARTS FROM WELCOME */}
          {/* 🎨 CURVE — LEFT-ANCHORED FROM CARD */}
          {/* <div
            className="
              pointer-events-none
              absolute
              left-1/2
              -translate-x-[640px]
              bottom-[-220px]
              z-0
            "
          >
            <Image
              src="/enso-curve.webp"
              alt=""
              width={2000}
              height={650}
              priority
              className="
                select-none
                scale-[1.9]
                origin-left
              "
            />

          </div>
 */}


        </section>

       


        

        {/* 🌿 ABOUT ENSO */}
        <section className="relative pt-20 pb-8 z-10">
          <div className="max-w-5xl mx-auto px-6">
            {/* 🌸 Gentle mid-left + lower-left cluster */}
            <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 -z-10">
              <motion.img
                src="/dragonfly.svg"
                alt=""
                className="w-[150px] rotate-[-15deg]"
                {...float}
              />
              <motion.img
                src="/dragonfly.svg"
                alt=""
                className="w-[100px] rotate-[5deg] absolute top-[100px] left-[80px]"
                {...float}
              />
            </div>
            {/* <h2 className="font-[Playfair_Display] text-[44px] mb-4 text-[#0E1E2A]"> */}
            <h2 className="font-[Playfair_Display] text-[32px] md:text-[44px] mb-4 text-[#0E1E2A]">

              About ENSO
            </h2>

            <div className="w-28 h-[2px] bg-[#B88933]/70 mb-10" />

            <p className="max-w-[520px] text-[17px] leading-[1.9] text-[#0E1E2A]/85">
              The Enso, a circle drawn in one continuous breath, holds within it the beauty
              of being incomplete yet whole. Inspired by the Enso — a circle drawn in one mindful stroke — we believe healing is not about perfection, but presence.
            </p>
          </div>

          <p className="mt-16 md:mt-32 text-center max-w-4xl mx-auto px-6 font-[Playfair_Display] italic text-[18px] md:text-[24px] text-[#0E1E2A]/85">
            Each session at Enso is an invitation to pause, reflect, and let your story
            unfold naturally, one breath at a time.
          </p>
        </section>

        {/* 🌕 GLOW */}
        <div className="relative h-[200px] overflow-visible pointer-events-none">
          <div
            className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-yellow-400 opacity-95 blur-[120px]"
          />
        </div>
        {/* <PauseReflect /> */}
        {/* PAUSE & REFLECT — CENTERED BETWEEN SECTIONS */}
        <section className="relative flex items-center justify-center h-[32vh]">
          <PauseReflect />
        </section>


        {/* 🌿 SUPPORT */}
        <SupportSection />
      </section>
      {/* <PauseReflect /> */}

      {/* 🐉 ABOVE HANDWRITTEN NOTES */}
      <section className="relative">
      
        <HandwrittenNotesSection />
        {/* 🌸 Gentle mid-left + lower-left cluster */}
        <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[150px] rotate-[-15deg]"
            {...float}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[100px] rotate-[5deg] absolute top-[100px] left-[80px]"
            {...float}
          />
        </div>
      </section>

      {/* 🐉 MAP WHITESPACE */}
      <section className="relative">
       
        <GoogleReviews />
        {/* 🌸 Gentle mid-left + lower-left cluster */}
        <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[150px] rotate-[-15deg]"
            {...float}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[100px] rotate-[5deg] absolute top-[100px] left-[80px]"
            {...float}
          />
        </div>

        <div className="absolute bottom-[60px] left-[100px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[120px] rotate-[30deg]"
            {...float}
          />
        </div>
        <StartConversationSection />
        <MapEmbed />
        {/* 🌬️ Calm finale bottom-right group */}
        <div className="absolute bottom-[100px] right-[60px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[160px] rotate-[10deg]"
            {...float}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[110px] absolute -top-[60px] left-[-50px] rotate-[28deg]"
            {...float}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[90px] absolute top-[100px] left-[70px] rotate-[8deg]"
            {...float}
          />
        </div>
      </section>

      {/* <PauseReflect /> */}
      {/* <StickyGetInTouch /> */}
      <StickyGetInTouch showAfterScroll />


    </>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
// import { ClickSpark } from "../components/bits/ClickSpark";
// import { CurvedLoop } from "../components/bits/CurvedLoop";
import MagicBento from "../components/bits/MagicBento";
import { HandwrittenNote } from "../components/sections/HandwrittenNote";
import { PauseReflect } from "../components/sections/PauseReflect";
import { GoogleReviews } from "../components/sections/GoogleReviews";
import { MapEmbed } from "../components/sections/MapEmbed";
// import { QuizLite } from "../components/sections/QuizLite";
import { AboutSection } from "../components/sections/AboutSection";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  // soft float motion
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
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={muted}
          playsInline
        >
          <source src="/enso-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10"></div>

        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 bg-white/70 hover:bg-white/90 transition backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-md"
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl text-left">
          <h1 className="font-display text-5xl md:text-6xl leading-tight">
            Creating space for <br />
            growth, healing, and <br />
            community through <br />
            <span className="text-[#111]">Art-Based Therapy.</span>
          </h1>
          <p className="mt-6 text-lg opacity-80">
            At Enso Mind Matters, we believe in nurturing emotional well-being
            through creativity, mindfulness, and connection.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative overflow-hidden">
        <AboutSection />

        {/* 🌸 Gentle mid-left + lower-left cluster */}
        <div className="absolute left-[40px] top-[120px] opacity-90 -z-10">
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
      </section>


      {/* PROGRAMS / SERVICES */}
      <section className="relative mx-auto max-w-6xl px-4 py-20 overflow-hidden">
        <PauseReflect />
        <div className="mt-10">
          <MagicBento />
        </div>

        {/* 🪶 Top-right drift cluster */}
        <div className="absolute top-[20px] right-[-40px] opacity-90 -z-10">
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[130px] rotate-[15deg]"
            {...float}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[90px] absolute top-[70px] left-[-50px] rotate-[30deg]"
            animate={{
              y: [0, 10, 0],
              x: [0, -6, 0],
              rotate: [30, 33, 27, 30],
              transition: { repeat: Infinity, duration: 9, ease: "easeInOut" },
            }}
          />
          <motion.img
            src="/dragonfly.svg"
            alt=""
            className="w-[70px] absolute top-[150px] left-[-20px] rotate-[12deg] opacity-90"
            {...float}
          />
        </div>
      </section>

      {/* HANDWRITTEN NOTE + REVIEWS */}
      <section className="relative overflow-hidden">
        <HandwrittenNote />
        <GoogleReviews />

        {/* 🌸 Gentle mid-left + lower-left cluster */}
        <div className="absolute left-[40px] top-[120px] opacity-90 -z-10">
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
      </section>

      {/* CURVED LOOP / MAP / QUIZ */}
      <section className="relative overflow-hidden">
        {/* <CurvedLoop /> */}
        <MapEmbed />
        {/* <QuizLite /> */}

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
    </>
  );
}

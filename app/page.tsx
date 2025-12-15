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
import { QuizLite } from "../components/sections/QuizLite";
import { AboutSection } from "../components/sections/AboutSection";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SupportSection from "../components/sections/SupportSection";
import HandwrittenNotesSection from "../components/sections/HandwrittenNotesSection";



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
            A space to Pause, <br /> Reflect, and Heal <br /> through art and <br /> conversation.
            
          </h1>

          <p className="mt-6 text-lg opacity-80">
            ENSO is a space for emotional growth, self-discovery, and inner balance
              through art therapy and counselling.
          </p>
        </div>
      </section>



      {/* 🌿 INTRO SECTION */}
        <section className="relative overflow-hidden py-28">
          {/* <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6">
             Left Quote 
            <div className="space-y-6">
              <h2 className="font-[Playfair_Display] text-3xl md:text-4xl text-[var(--ink)] leading-snug">
                You don’t need to be <br /> an artist to benefit <br /> from art therapy.
              </h2>
            </div>

            Right Enso Image
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex justify-center"
            >
              <img
                src="/enso-circle-blue.jpg" // Replace with your swirl image file
                alt="enso brush circle"
                className="rounded-full w-[350px] md:w-[420px] shadow-soft"
              />
            </motion.div>
          </div> */}

          {/* Welcome to Enso Card */}
          {/* 🌿 Welcome to ENSO – Reference Style Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative max-w-5xl mx-auto mt-24 bg-[var(--cream)] rounded-3xl shadow-soft p-8 md:p-12"
          >
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-center">
              
              {/* Left Image */}
              <div className="relative">
                <Image
                  src="/hero11.jpeg"
                  alt="Enso Art Therapy Space"
                  width={420}
                  height={420}
                  className="rounded-2xl object-cover shadow-md"
                />
              </div>

              {/* Right Content */}
              <div className="text-[var(--ink)]">
                <h3 className="font-[Playfair_Display] text-3xl mb-4">
                  Welcome to ENSO
                </h3>

                <p className="font-[Manrope] text-[var(--ink)]/80 leading-relaxed mb-6 max-w-xl">
                  Enso Art Therapy and Counselling Centre offers a safe and inclusive space for healing, reflection, and inner balance.
                </p>

                <ul className="space-y-4 font-[Manrope] text-[var(--ink)]/90">
                  <li className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-white shadow grid place-items-center text-[#B88933]">
                      🌱
                    </span>
                    Personal Growth
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-white shadow grid place-items-center text-[#B88933]">
                      🧠
                    </span>
                    Emotional Well-being
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-white shadow grid place-items-center text-[#B88933]">
                      🎨
                    </span>
                    Self-expression
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>



          {/* Dandelion Animation - bottom-right */}
          <div className="absolute bottom-[0px] right-[0px] w-[420px] opacity-70 pointer-events-none z-0">
            <DotLottieReact
              src="/enso-dandelion.lottie"
              loop
              autoplay
              style={{
                transform: "scaleX(-1)",  // Flip so it flows leftwards like your design
              }}
            />
          </div>


          {/* 🌿 Section Connector — Healing is Non Linear */}
          {/* <section className="relative py-32 overflow-hidden">
        
            <svg
              viewBox="0 0 1400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                d="
                  M 80 120
                  C 200 20, 320 260, 480 220
                  S 760 40, 900 180
                  S 1150 360, 1320 260
                "
                stroke="#B88933"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

    
            <span className="absolute left-[6%] top-[80px] text-[#B88933] italic text-sm tracking-widest">
              HEALING IS
            </span>

            <span className="absolute right-[6%] bottom-[90px] text-[#B88933] italic text-sm tracking-widest">
              NON LINEAR
            </span>
          </section> */}






        </section>



        <section className="relative overflow-hidden py-32">

          {/* 🎨 Soft watercolor blob (left) */}
          {/* <div className="absolute left-0 top-0 h-full w-[45%] bg-[#FBF6E9] rounded-r-[220px] opacity-90" /> */}

          {/* ✨ Curved accent line (top-right) */}
          {/* <svg
            className="absolute top-[-120px] right-[-120px] w-[520px] h-[520px]"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 450 C200 200, 300 200, 450 50"
              stroke="#B88933"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          
          <span className="absolute top-[120px] right-[40px] rotate-[60deg] text-[#B88933] text-sm tracking-widest italic">
            NON LINEAR
          </span> */}

          {/* 🧠 Main content */}
          {/* <div className="relative max-w-5xl mx-auto px-6"> */}
          <div className="relative max-w-5xl mx-auto px-6 mt-8">


            {/* <h2 className="font-[Playfair_Display] text-4xl mb-4 text-[#0E1E2A]"> */}
            {/* <h2 className="font-[Playfair_Display] text-[50px] leading-tight mb-3 text-[#0E1E2A]"> */}
            <h2 className="font-[Playfair_Display] text-[44px] leading-[1.15] mb-4 text-[#0E1E2A]">


              About ENSO
            </h2>

            {/* <div className="w-24 h-[2px] bg-[#B88933] mb-6" /> */}
            {/* <div className="w-40 h-[3.5px] bg-[#B88933]/80 mb-8" /> */}
            <div className="w-28 h-[2px] bg-[#B88933]/70 mb-10" />


            <p className="max-w-[520px] text-[17px] leading-[1.9] text-[#0E1E2A]/85">
              The Enso, a circle drawn in one continuous breath, holds within it the
              beauty of being incomplete yet whole.
            </p>

            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.9] text-[#0E1E2A]/85">
              Inspired by the Enso — a circle drawn in one mindful stroke — we believe
              healing is not about perfection, but presence.
            </p>

            {/* <p className="max-w-xl text-lg leading-relaxed text-[#0E1E2A]/80">
              The Enso, a circle drawn in one continuous breath, holds within it the
              beauty of being incomplete yet whole.
              <br /><br />
              Inspired by the Enso — a circle drawn in one mindful stroke — we believe
              healing is not about perfection, but presence.
            </p> */}
          </div>

          {/* 🌿 Closing statement */}
          {/* <p className="relative mt-32 text-center max-w-4xl mx-auto px-6 font-[Playfair_Display] italic text-2xl text-[#0E1E2A]/90"> */}
          <p className="relative mt-28 text-center max-w-4xl mx-auto px-6 font-[Playfair_Display] italic text-[24px] leading-[1.7] text-[#0E1E2A]/85">
          {/* text-[26px] leading-[1.6] text-[#0E1E2A]/95 */}


            Each session at Enso is an invitation to pause, reflect, and let your story
            unfold naturally, one breath at a time.
          </p>

        </section>


      <PauseReflect />

      {/* Support SECTION */}
      <SupportSection />
      {/* <PauseReflect /> */}

      {/* handwritten notes SECTION */}
      {/* <HandwrittenNotesSection /> */}






      {/* ABOUT SECTION */}
      {/* <section className="relative overflow-hidden"> */}
        {/* <AboutSection /> */}

        {/* 🌸 Gentle mid-left + lower-left cluster */}
        {/* <div className="absolute left-[40px] top-[120px] opacity-90 -z-10">
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
      </section> */}


      {/* PROGRAMS / SERVICES */}
      {/* <section className="relative mx-auto max-w-6xl px-4 py-20 overflow-hidden">
        
        <div className="mt-10">
          <MagicBento />
        </div> */}

        {/* 🪶 Top-right drift cluster */}
        {/* <div className="absolute top-[20px] right-[-40px] opacity-90 -z-10">
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
      </section> */}

      {/* HANDWRITTEN NOTE + REVIEWS */}
      <section className="relative overflow-hidden">
        {/* <HandwrittenNote /> */}
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
       <HandwrittenNotesSection />
    </>
  );
}

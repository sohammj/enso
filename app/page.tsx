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
import Image from "next/image";


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
            You don’t need to be <br /> an artist to benefit <br /> from art therapy.
            <span className="text-[#111]">Art-Based Therapy.</span>
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative max-w-3xl mx-auto mt-20 bg-[var(--cream)] text-[var(--ink)] rounded-2xl shadow-soft p-10 text-center"
          >
            <h3 className="font-[Playfair_Display] text-2xl mb-2">Welcome to ENSO</h3>
            <div className="mx-auto w-16 h-[1px] bg-[var(--ink)]/40 mb-4" />
            <p className="font-[Manrope] text-[var(--ink)]/80 leading-relaxed">
              ENSO is a space for emotional growth, self-discovery, and inner balance
              through art therapy and counselling. We believe that every individual
              holds the power to express, transform, and heal — and art becomes the
              bridge to that transformation.
            </p>
          </motion.div>

          {/* Organic Divider Line */}
          <div className="relative mt-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 150"
              className="w-full opacity-70"
            >
              <path
                d="M0,100 C200,50 400,150 800,80"
                stroke="var(--sage)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span className="absolute left-[5%] top-[40px] text-[var(--sage)] italic text-sm tracking-widest">
              HEALING IS
            </span>
            <span className="absolute right-[5%] top-[90px] text-[var(--sage)] italic text-sm tracking-widest">
              NON LINEAR
            </span>
          </div>
        </section>



        <section className="relative overflow-hidden bg-white py-28">
           {/* 🌾 Soft beige background swoosh */}
            <svg
              className="absolute top-[40px] left-0 w-full h-[400px] -z-20"
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FBF6E9"
                d="M0,224L120,213.3C240,203,480,181,720,165.3C960,150,1200,160,1320,170.7L1440,181L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
              />
            </svg>

            {/* 🪶 Main content */}
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16 px-6 md:px-12 mt-12">
              {/* Left Text */}
              <div className="flex-1 pt-6">
                <h2 className="text-4xl font-[Playfair_Display] text-[#0E1E2A] mb-4">
                  About ENSO
                </h2>
                <p className="text-[#0E1E2A]/80 leading-relaxed text-lg max-w-md">
                  The name “ENSO” comes from a Japanese Zen symbol — a hand-drawn circle
                  representing wholeness, balance, and the beauty of imperfection.
                </p>
              </div>

              {/* Right Image with blush background */}
              <div className="relative flex-1 flex justify-center md:justify-end">
                {/* 🩰 Pink shape behind the image */}
                <div className="absolute top-[-40px] right-[-50px] w-[320px] h-[320px] bg-[#FBD7C1] rounded-[90px] -z-10" />
                {/* Subtle outline circle accent */}
                <div className="absolute top-[50px] right-[60px] w-[70px] h-[70px] border border-[#FBE6DD] rounded-full -z-10 opacity-70" />

                <Image
                  src="/hero11.jpeg"
                  alt="Enso space"
                  width={340}
                  height={340}
                  className="rounded-md shadow-md object-cover"
                />
              </div>
            </div>

            {/* --- Vision / Mission connector --- */}
            <div className="relative mt-24 md:ml-[84px]">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FFD8B0]/70" />

              {/* Vision Marker */}
              <div className="absolute -left-[23px] top-[4px]">
                <div className="w-10 h-10 rounded-full bg-white shadow-md grid place-items-center">
                  <div className="w-7 h-7 rounded-full bg-[#FFD8B0]" />
                </div>
              </div>

              {/* Vision Text */}
              <div className="pl-8 mb-16">
                <h4 className="font-[Playfair_Display] text-2xl text-[#0E1E2A] mb-2">
                  Our Vision
                </h4>
                <p className="font-[Manrope] text-[#0E1E2A]/80 leading-relaxed text-lg max-w-3xl">
                  To create a mindful and compassionate space where art and psychology unite
                  to support emotional well-being, self-awareness, and growth.
                </p>
              </div>

              {/* Mission Marker */}
              <div className="absolute -left-[23px] top-[150px] md:top-[170px]">
                <div className="w-10 h-10 rounded-full bg-white shadow-md grid place-items-center">
                  <div className="w-7 h-7 rounded-full bg-[#FFD8B0]" />
                </div>
              </div>

              {/* Mission Text */}
              <div className="pl-8">
                <h4 className="font-[Playfair_Display] text-2xl text-[#0E1E2A] mb-4">
                  Our Mission
                </h4>
                <ul className="list-disc pl-5 space-y-2 font-[Manrope] text-[#0E1E2A]/80 leading-relaxed text-lg max-w-3xl">
                  <li>To make emotional healing accessible through creative expression.</li>
                  <li>To support individuals in processing emotions, trauma, and stress through art.</li>
                  <li>To promote mindfulness, resilience, and self-compassion.</li>
                </ul>
              </div>
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

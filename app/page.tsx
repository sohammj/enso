"use client";

import { useRef, useState } from "react";
import { ClickSpark } from "../components/bits/ClickSpark";
import { CurvedLoop } from "../components/bits/CurvedLoop";
import MagicBento from "../components/bits/MagicBento";
import { HandwrittenNote } from "../components/sections/HandwrittenNote";
import { PauseReflect } from "../components/sections/PauseReflect";
import { GoogleReviews } from "../components/sections/GoogleReviews";
import { MapEmbed } from "../components/sections/MapEmbed";
import { QuizLite } from "../components/sections/QuizLite";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <ClickSpark />

      {/* HERO SECTION — with video background */}
      <section className="relative h-[90vh] w-full overflow-hidden text-[#111] pt-[72px]">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={muted}
          playsInline
        >
          <source src="/enso-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Overlay for readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 bg-white/70 hover:bg-white/90 transition backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-md"
        >
          {muted ? "🔇 Sound Off" : "🔊 Sound On"}
        </button>

        {/* Foreground Text */}
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

      {/* Main sections remain unchanged */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <PauseReflect />
        <div className="mt-10">
          <MagicBento />
        </div>
      </section>

      <HandwrittenNote />
      <GoogleReviews />
      <CurvedLoop />
      <MapEmbed />
      <QuizLite />
    </>
  );
}

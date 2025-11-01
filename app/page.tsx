"use client";

import { ClickSpark } from "../components/bits/ClickSpark";
import { CurvedLoop } from "../components/bits/CurvedLoop";
import MagicBento from "../components/bits/MagicBento";
import { HandwrittenNote } from "../components/sections/HandwrittenNote";
import { PauseReflect } from "../components/sections/PauseReflect";
import { GoogleReviews } from "../components/sections/GoogleReviews";
import { MapEmbed } from "../components/sections/MapEmbed";
import { QuizLite } from "../components/sections/QuizLite";

export default function Home() {
  return (
    <>
      <ClickSpark />

      {/* HERO SECTION — with video background */}
      <section className="relative h-[90vh] w-full overflow-hidden text-[#111]">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={false} // keep sound
          playsInline
          controls={false}
        >
          <source src="/enso-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Foreground content */}
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

      {/* Main sections remain untouched */}
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

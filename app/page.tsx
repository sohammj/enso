// app/page.tsx
"use client";

import  EnsoBrush  from "../components/hero/EnsoBrush";
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
      <section className="bg-white text-ink">
        <EnsoBrush />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <PauseReflect />
        <div className="mt-10">
          <MagicBento />
        </div>
      </section>

      <HandwrittenNote />

      {/* <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <QuizLite />
      </section> */}

      <GoogleReviews />
      <CurvedLoop />
      <MapEmbed />
      <QuizLite />
    </>
  );
}

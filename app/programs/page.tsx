"use client";

import MagicBento from "../../components/bits/MagicBento";
import { SplitText } from "../../components/bits/SplitText";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-center">
      <h1 className="font-display text-4xl">Our Programs</h1>
      <SplitText
        className="mt-3 text-lg opacity-80 mx-auto max-w-3xl"
        text="Enso Counseling and Art Therapy Center"
      />

      <main className="flex justify-center py-20">
        <MagicBento />
      </main>
    </div>
  );
}

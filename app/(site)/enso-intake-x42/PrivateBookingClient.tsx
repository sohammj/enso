"use client";

import { useState } from "react";
import type { PrivateBookingPage } from "@/sanity/lib/types";
import Dragonfly from "@/components/ui/Dragonfly";

export default function PrivateBookingClient({ data }: { data: PrivateBookingPage }) {
  const [mode, setMode] = useState<"new" | "returning">("new");

  const title = data.pageTitle?.trim() || "Enso Counseling & Art Therapy Centre";
  const subtitle = data.pageSubtitle?.trim() || "Choose your option below to continue.";

  return (
    <main className="min-h-screen bg-[url('/paper-texture.jpg')] bg-repeat text-[#0E1E2A] px-4 py-10 relative overflow-visible">
      {/* 🐉 Dragonflies (decor) */}
      <div className="hidden md:block absolute left-[40px] top-[120px] opacity-90 z-[5] pointer-events-none">
        <Dragonfly className="w-[140px] rotate-[-15deg]" drift={22} twist={6} floatDuration={8} />
      </div>

      <div className="hidden md:block absolute left-[90px] top-[220px] opacity-90 z-[5] pointer-events-none">
        <Dragonfly className="w-[110px] rotate-[15deg]" drift={18} twist={5} floatDuration={8} />
      </div>

      <div className="hidden lg:block absolute right-[70px] top-[520px] opacity-90 z-[5] pointer-events-none">
        <Dragonfly className="w-[125px] rotate-[10deg]" drift={20} twist={6} floatDuration={8} />
      </div>

      <div className="mx-auto max-w-4xl relative z-[10]">
        <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
        <p className="mt-2 text-base md:text-lg opacity-80">{subtitle}</p>

        {/* Info */}
        <div className="mt-6 rounded-2xl bg-white/70 border border-black/10 p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-base">
              <span className="font-semibold">Session:</span> {data.sessionDurationText}
            </p>
            <p className="text-base">
              <span className="font-semibold">Fee:</span> {data.feeCurrency}
              {data.feeAmount}
            </p>
          </div>

          <a
            className="inline-block mt-3 underline underline-offset-4"
            href={data.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>

        {/* Toggle */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setMode("new")}
            className={`px-4 py-2 rounded-full border transition ${
              mode === "new"
                ? "bg-[#0E1E2A] text-white border-[#0E1E2A]"
                : "bg-white/60 border-black/15"
            }`}
          >
            {data.newClientLabel}
          </button>

          <button
            onClick={() => setMode("returning")}
            className={`px-4 py-2 rounded-full border transition ${
              mode === "returning"
                ? "bg-[#0E1E2A] text-white border-[#0E1E2A]"
                : "bg-white/60 border-black/15"
            }`}
          >
            {data.returningClientLabel}
          </button>
        </div>

        {/* New client: Intake + Booking */}
        {mode === "new" && (
          <>
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Step 1 — Fill the intake form</h2>
              <p className="mt-1 text-sm opacity-80">
                Please fill this first. Then book your session below.
              </p>

              <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white">
                <div className="w-full h-[820px]">
                  <iframe
                    src={data.intakeFormEmbedUrl}
                    className="w-full h-full border-0"
                    title="Enso Intake Form"
                  />
                </div>
              </div>

              <p className="mt-3 text-sm opacity-80">{data.afterIntakeMessage}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Step 2 — Book your session</h2>
              <p className="mt-1 text-sm opacity-80">
                Choose an available slot in the calendar.
              </p>

              <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white">
                <div className="w-full h-[720px]">
                  <iframe
                    src={data.calendarEmbedUrl}
                    className="w-full h-full border-0"
                    title="Enso Booking Calendar"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={data.calendarEmbedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 text-sm"
                >
                  Open booking in new tab
                </a>
              </div>
            </section>
          </>
        )}

        {/* Returning: Booking only */}
        {mode === "returning" && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Book your session</h2>
            <p className="mt-1 text-sm opacity-80">
              Pick a slot from the calendar below.
            </p>

            <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white">
              <div className="w-full h-[760px]">
                <iframe
                  src={data.calendarEmbedUrl}
                  className="w-full h-full border-0"
                  title="Enso Booking Calendar"
                />
              </div>
            </div>

            <div className="mt-3">
              <a
                href={data.calendarEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 text-sm"
              >
                Open booking in new tab
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

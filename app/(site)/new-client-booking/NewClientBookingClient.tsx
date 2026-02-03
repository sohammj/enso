"use client";

import { useState } from "react";
import Image from "next/image";
import type { NewClientBookingPage } from "@/sanity/lib/types";
import Dragonfly from "@/components/ui/Dragonfly";

export default function NewClientBookingClient({ data }: { data: NewClientBookingPage }) {
  const title = data.pageTitle?.trim() || "New Client Booking";
  const subtitle = data.pageSubtitle?.trim() || "Fill out the intake form and book your session.";

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/enso-mind-matters", icon: "/icons/linkedin.svg" },
    { label: "WhatsApp", href: "https://wa.me/917304818758", icon: "/icons/whatsapp.svg" },
    // { label: "Instagram", href: data.instagramUrl, icon: "/icons/instagram.svg" },
    { label: "Instagram", href: "https://instagram.com/enso_mind_matters", icon: "/icons/instagram.svg" },
    { label: "Gmail", href: "mailto:ensomindmatters@gmail.com", icon: "/icons/mail.svg" },
  ];

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

      {/* Social Dock */}
      <SocialDock socials={socials} />

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
              {data.feeCurrency}
              {data.feeAmount}
            </p>
          </div>
        </div>

        {/* Step 1: Intake Form */}
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

        {/* Step 2: Booking */}
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
            
            <a  href={data.calendarEmbedUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 text-sm"
            >
              Open booking in new tab
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function SocialDock({ socials }: { socials: Array<{ label: string; href: string; icon: string }> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ DESKTOP: right edge, vertically centered, sticky to border */}
      <div
        className={[
          "hidden lg:flex",
          "fixed right-0 top-1/2 -translate-y-1/2",
          "z-40",
          "flex-col overflow-hidden",
          "rounded-l-2xl border border-black/10 bg-white/85 backdrop-blur",
          "shadow-soft",
        ].join(" ")}
      >
        {socials.map((s) => (
          
        <a    key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex h-14 w-14 items-center justify-center border-b border-black/10 last:border-b-0 hover:bg-black/[0.03]"
            aria-label={s.label}
            title={s.label}
          >
            <Image
              src={s.icon}
              alt=""
              width={22}
              height={22}
              className="opacity-80 transition group-hover:opacity-100"
            />
          </a>
        ))}
      </div>

      {/* ✅ MOBILE: bottom-right button -> dropdown icons */}
      <div className="lg:hidden fixed right-4 bottom-4 z-50">
        {/* dropdown */}
        <div
          className={[
            "absolute bottom-20 right-0",
            "transition-all duration-200",
            open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
          ].join(" ")}
        >
          <div className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white/95 backdrop-blur shadow-soft">
            {socials.map((s) => (
              
            <a    key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-16 w-16 items-center justify-center border-b border-black/10 last:border-b-0 active:bg-black/[0.05]"
                aria-label={s.label}
                title={s.label}
                onClick={() => setOpen(false)}
              >
                <Image
                  src={s.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="opacity-95"
                />
              </a>
            ))}
          </div>
        </div>

        {/* fab (logo-only) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-0 bg-transparent border-0 shadow-none backdrop-blur-0 rounded-none"
          aria-label="Open social links"
          title="Socials"
        >
          <Image
            src="/enso.png"
            alt="Enso"
            width={75}
            height={75}
            className={`cursor-pointer select-none opacity-90 hover:opacity-100 transition
              translate-x-1
              ${open ? "rotate-90" : "rotate-0"}
            `}
          />
        </button>
      </div>

      {/* click outside overlay (mobile) */}
      {open && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-40"
          aria-label="Close socials"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
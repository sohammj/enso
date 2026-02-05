"use client";

import Image from "next/image";
import type { ReturningClientBookingPage } from "@/sanity/lib/types";
import Dragonfly from "@/components/ui/Dragonfly";

export default function ReturningClientBookingClient({
  data,
}: {
  data: ReturningClientBookingPage;
}) {
  const title = data.pageTitle?.trim() || "Returning Client Booking";
  const subtitle = data.pageSubtitle?.trim() || "Book your next session below.";

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/enso-mind-matters",
      icon: "/icons/linkedin.svg",
    },
    { label: "WhatsApp", href: "https://wa.me/917304818758", icon: "/icons/whatsapp.svg" },
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

      {/* ✅ DESKTOP social dock only */}
      <SocialDockDesktop socials={socials} />

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

        {/* Booking Calendar */}
        <section className="mt-8">
          <div className="lg:hidden mt-5">
            <MobileSocialRow socials={socials} />
          </div>
          <br/>
          <h2 className="text-xl font-semibold">Book your session</h2>
          <p className="mt-1 text-sm opacity-80">Pick a slot from the calendar below.</p>

          {/* ✅ MOBILE: horizontal socials ABOVE calendar
          <div className="lg:hidden mt-5">
            <MobileSocialRow socials={socials} />
          </div> */}

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
      </div>
    </main>
  );
}

/* =========================
   DESKTOP SOCIAL DOCK
========================= */
function SocialDockDesktop({
  socials,
}: {
  socials: Array<{ label: string; href: string; icon: string }>;
}) {
  return (
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
        <a
          key={s.label}
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
  );
}

/* =========================
   MOBILE SOCIAL ROW
========================= */
function MobileSocialRow({
  socials,
}: {
  socials: Array<{ label: string; href: string; icon: string }>;
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel={s.href.startsWith("http") ? "noreferrer" : undefined}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm hover:shadow-md active:scale-95 transition-all"
          aria-label={s.label}
          title={s.label}
        >
          <Image src={s.icon} alt="" width={24} height={24} className="opacity-90" />
        </a>
      ))}
    </div>
  );
}

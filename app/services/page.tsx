"use client";

import MagicBento from "@/components/bits/MagicBento";
import { services } from "../../lib/data";

export default function ServicesPage() {
  // Convert your services data into MagicBento’s format
  const serviceCards = services.map((s) => ({
    title: s.title,
    description: s.description[0].slice(0, 120),
    label: s.label || "Service",
    href: `/services/${s.slug}`,
    glowColor: "38, 67, 160", // Enso blue glow
    icon: s.icon, // optional if available
  }));

  return (
    <main className="bg-white text-[#111] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-3">
            Our Services
          </h1>
          <p className="text-lg opacity-70">
            Explore how Enso Counseling and Art Therapy Centre supports individuals
            in expressing, processing, and healing through creative practices.
          </p>
        </div>

        {/* 🌟 MagicBento reused here */}
        <MagicBento cards={serviceCards} enableSpotlight spotlightRadius={250} />
      </section>
    </main>
  );
}

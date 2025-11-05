"use client";
import MagicBento from "@/components/bits/MagicBento";
import { programs } from "../../lib/data";

export default function ProgramsPage() {
  const programCards = programs.map((p) => ({
    title: p.title,
    description: p.description[0].slice(0, 120),
    label: p.label || "Program",
    href: `/programs/${p.slug}`,
    glowColor: "38, 67, 160",
    icon: p.icon,
  }));

  return (
    <main className="bg-white text-[#111] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-3">
            Our Programs
          </h1>
          <p className="text-lg opacity-70">
            Explore ways to express, connect, and heal through creativity.
          </p>
        </div>

        <MagicBento cards={programCards} enableSpotlight spotlightRadius={250} />
      </section>
    </main>
  );
}

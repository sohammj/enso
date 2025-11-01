"use client";

import Link from "next/link";
import { services } from "../../lib/data";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl">Services</h1>
      <p className="mt-3 max-w-3xl text-lg opacity-80">
        Enso Counseling and Art Therapy Centre helps individuals externalize
        and organize thoughts and emotions that are difficult to put into
        words.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="rounded-2xl bg-gradient-to-br from-sun/40 via-tea/40 to-royal/40 p-6 shadow-soft hover:from-tea/60 hover:to-royal/60 transition-all duration-500"
          >
            <h2 className="text-xl font-medium">{s.title}</h2>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              {s.description[0]}
            </p>
            <span className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

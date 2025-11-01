"use client";
import { faqs } from "../../lib/data";

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl">Frequently Asked Questions</h1>
      <div className="mt-6 space-y-4">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl bg-white p-5 shadow-soft"
          >
            <summary className="cursor-pointer list-none text-lg font-medium group-open:opacity-70">
              {f.q}
            </summary>
            <p className="mt-2 text-sm opacity-80">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-sand p-5 text-center shadow-soft">
        <p className="text-sm opacity-80">
          Still unsure? Reach out and we’ll point you in the right direction.
        </p>
        <a
          className="mt-3 inline-block rounded-xl bg-ink px-4 py-2 text-white text-sm hover:opacity-90"
          href="/book"
        >
          Book a session
        </a>
      </div>
    </div>
  );
}

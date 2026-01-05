"use client";

import { useEffect, useRef, useState } from "react";

type Review = {
  author: string;
  profilePhotoUrl: string | null;
  rating: number | null;
  text: string;
  relativeTime: string;
  googleMapsUri: string | null;
};

export function GoogleReviews() {
  const [data, setData] = useState<null | {
    name: string;
    rating: number | null;
    userRatingCount: number | null;
    googleMapsUri: string | null;
    reviews: Review[];
  }>(null);

  const [loading, setLoading] = useState(true);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  /* ---------- FETCH (cached server-side) ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/reviews");
        const json = await res.json();
        setData(json);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- AUTO SCROLL (NO STUTTER) ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const SPEED = 0.35; // px per frame
    const RESUME_DELAY = 1200;

    const stop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const start = () => {
      stop();
      const tick = () => {
        if (!isInteractingRef.current) {
          el.scrollLeft += SPEED;

          // seamless loop
          if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
            el.scrollLeft = 0;
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onUserIntent = () => {
      isInteractingRef.current = true;
      stop();

      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }

      resumeTimerRef.current = window.setTimeout(() => {
        isInteractingRef.current = false;
        start();
      }, RESUME_DELAY);
    };

    start();

    el.addEventListener("wheel", onUserIntent, { passive: true });
    el.addEventListener("touchstart", onUserIntent, { passive: true });
    el.addEventListener("pointerdown", onUserIntent, { passive: true });
    el.addEventListener("mouseenter", onUserIntent, { passive: true });
    el.addEventListener("scroll", onUserIntent, { passive: true });

    return () => {
      stop();
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      el.removeEventListener("wheel", onUserIntent as any);
      el.removeEventListener("touchstart", onUserIntent as any);
      el.removeEventListener("pointerdown", onUserIntent as any);
      el.removeEventListener("mouseenter", onUserIntent as any);
      el.removeEventListener("scroll", onUserIntent as any);
    };
  }, []);

  /* ---------- ARROW SCROLL ---------- */
  const userScroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    isInteractingRef.current = true;
    el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });

    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl">What people say</h2>

        {/* {data?.googleMapsUri && (
          <a
            href={data.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
          >
            ⭐ Read all Google Reviews
          </a>
        )} */}
      </div>

      <div className="mt-2 text-sm opacity-70">
        {loading
          ? "Loading reviews..."
          : data?.rating
          ? `${data.rating} ★ (${data.userRatingCount} reviews)`
          : "Reviews unavailable."}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={() => userScroll("left")}
        aria-label="Scroll left"
        className="
          hidden md:flex
          absolute left-[-24px] top-1/2 -translate-y-1/2 z-20
          h-12 w-12 items-center justify-center
          rounded-full bg-white/90
          shadow-md backdrop-blur
          text-xl
          transition hover:bg-white hover:scale-105
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => userScroll("right")}
        aria-label="Scroll right"
        className="
          hidden md:flex
          absolute right-[-24px] top-1/2 -translate-y-1/2 z-20
          h-12 w-12 items-center justify-center
          rounded-full bg-white/90
          shadow-md backdrop-blur
          text-xl
          transition hover:bg-white hover:scale-105
        "
      >
        ›
      </button>

      {/* SCROLLER */}
      <div
        ref={scrollerRef}
        className="
          mt-6 flex gap-6 overflow-x-auto pb-4
          [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {(data?.reviews ?? []).map((r, i) => (
          <article
            key={i}
            className="min-w-[320px] max-w-[360px] shrink-0
            rounded-2xl bg-white p-5 shadow-soft"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-black/10">
                {r.profilePhotoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.profilePhotoUrl}
                    alt={r.author}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              <div>
                <p className="text-sm font-medium">{r.author}</p>
                <p className="text-xs opacity-70">
                  {"★".repeat(r.rating ?? 5)} · {r.relativeTime}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed opacity-90 line-clamp-4">
              {r.text}
            </p>

            {data?.googleMapsUri && (
              <a
                href={data.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-medium hover:underline"
              >
                Read more on Google
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

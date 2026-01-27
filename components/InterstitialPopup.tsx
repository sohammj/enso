"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Interstitial = {
  _id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  showFrequency?: "always" | "session" | "daily";
  startAt?: string;
  endAt?: string;
};

function isWithinWindow(item: Interstitial) {
  const now = Date.now();
  const start = item.startAt ? new Date(item.startAt).getTime() : null;
  const end = item.endAt ? new Date(item.endAt).getTime() : null;

  if (start !== null && now < start) return false;
  if (end !== null && now > end) return false;
  return true;
}

export default function InterstitialPopup({
  data,
  imageUrl,
}: {
  data: Interstitial | null;
  imageUrl: string;
}) {
  const [open, setOpen] = useState(false);

  const storageKey = useMemo(() => {
    if (!data?._id) return "enso_interstitial_none";
    return `enso_interstitial_seen_${data._id}`;
  }, [data?._id]);

  useEffect(() => {
    if (!data?._id) return;

    // guard (even though GROQ filters)
    if (!isWithinWindow(data)) return;

    const freq = data.showFrequency || "session";

    const canShow = () => {
      if (freq === "always") return true;

      if (freq === "session") {
        return sessionStorage.getItem(storageKey) !== "1";
      }

      // daily
      const last = localStorage.getItem(storageKey);
      if (!last) return true;

      const lastDate = new Date(last);
      const now = new Date();

      return (
        lastDate.getFullYear() !== now.getFullYear() ||
        lastDate.getMonth() !== now.getMonth() ||
        lastDate.getDate() !== now.getDate()
      );
    };

    if (canShow()) setOpen(true);
  }, [data, storageKey]);

  const close = () => {
    if (!data?._id) return;

    const freq = data.showFrequency || "session";
    if (freq === "session") sessionStorage.setItem(storageKey, "1");
    if (freq === "daily") localStorage.setItem(storageKey, new Date().toISOString());

    setOpen(false);
  };

  // Esc close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // prevent background scroll while open (industry standard)
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!data?._id) return null;
  if (!open) return null;

  const hasCta = Boolean(data.ctaUrl && data.ctaLabel);
  const hasImage = Boolean(imageUrl);

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop (blur + dim) */}
      <button
        aria-label="Close popup"
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      />

      {/* Modal shell */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-[980px] overflow-hidden rounded-3xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          {/* Close (always visible) */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 hover:bg-white"
          >
            <span className="text-[22px] leading-none text-black/80">×</span>
          </button>

          {/* Content layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: Image */}
            {/* LEFT: Image */}
            {/* <div className="relative min-h-[240px] md:min-h-[520px] bg-white"> */}
            {/* <div className="relative min-h-[240px] md:min-h-[520px] bg-white p-6 md:p-10"> */}
            <div className="min-h-[240px] md:min-h-[520px] bg-white p-6 md:p-10 flex items-center justify-center">
              {hasImage ? (
                <Image
                  src={imageUrl}
                  alt={data.title || "Promotion"}
                  width={1400}
                  height={900}
                  priority
                  className="h-full w-full object-contain"
                />

              ) : (
                <div className="absolute inset-0 grid place-items-center p-10">
                  <div className="text-center text-black/50">
                    <div className="text-sm tracking-wide uppercase">Enso</div>
                    <div className="mt-2 text-lg font-medium">Update</div>
                  </div>
                </div>
              )}
            </div>


            {/* RIGHT: Details */}
            <div className="p-6 md:p-10">
              {data.subtitle && (
                <div className="text-xs tracking-[0.22em] uppercase text-black/45">
                  {data.subtitle}
                </div>
              )}

              {data.title && (
                <h3 className="mt-3 text-[28px] md:text-[34px] leading-tight font-semibold text-black">
                  {data.title}
                </h3>
              )}

              {data.description && (
                <p className="mt-4 text-[15px] md:text-[16px] leading-[1.75] text-black/70">
                  {data.description}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {hasCta ? (
                  <a
                    href={data.ctaUrl!}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-medium bg-black text-white hover:opacity-90"
                  >
                    {data.ctaLabel}
                  </a>
                ) : null}

                <button
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-medium bg-black/5 hover:bg-black/10 text-black/80"
                >
                  Not now
                </button>
              </div>

              {/* Optional: tiny note like industry modals */}
              {/* <div className="mt-6 text-xs text-black/40">
                You can close this anytime.
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

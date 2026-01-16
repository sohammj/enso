"use client";

import Image from "next/image";
import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";

export type PhotoStripItem = {
  image?: any;
  label?: string;
  caption?: string;
};

export default function HorizontalPhotoStrip({ items }: { items: PhotoStripItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    // Convert vertical wheel to horizontal scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  const valid = (items || []).filter((x) => x?.image?.asset);
  if (!valid.length) return null;

  return (
    <section className="relative z-10 pb-28">
      <div
        ref={ref}
        onWheel={onWheel}
        className="overflow-x-auto overflow-y-hidden px-6 [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Hide scrollbar (Chrome/Safari) */}
        <style jsx>{`
          .strip::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="strip min-w-max flex gap-10 items-start py-4">
          {valid.map((it, idx) => {
            const imgUrl = urlFor(it.image).width(1200).height(1200).fit("crop").url();

            return (
              <figure key={idx} className="w-[260px] md:w-[340px] shrink-0">
                {(it.label || it.caption) && (
                  <div className="mb-2">
                    {it.label && (
                      <p className="text-[10px] tracking-widest uppercase opacity-60">
                        {it.label}
                      </p>
                    )}
                    {it.caption && (
                      <p className="text-sm opacity-70 leading-snug mt-1">
                        {it.caption}
                      </p>
                    )}
                  </div>
                )}

                <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-soft">
                  <Image
                    src={imgUrl}
                    alt={it.caption || it.label || "Photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 260px, 340px"
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

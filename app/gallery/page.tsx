"use client";

import CircularGallery from "@/components/bits/CircularGallery";
import MasonryGallery from "@/components/bits/MasonryGallery";

const circularImages = [
  { image: "/gallery/Art therapy with cancer survivors.jpeg", text: "Art Therapy with Cancer Survivors" },
  { image: "/gallery/Drum session with kids.jpeg", text: "Drum Session with Kids" },
  { image: "/gallery/Group Session on goal setting.jpeg", text: "Group Session on Goal Setting" },
  { image: "/gallery/Movement session with college students.jpeg", text: "Movement Session" },
  { image: "/gallery/Shivaji Park Art Festival 2022.jpeg", text: "Shivaji Park Art Festival 2022" },
  { image: "/gallery/Visual art session for kids.jpeg", text: "Visual Art Session for Kids" },
];

const masonryImages = [
  "/gallery/Art therapy with cancer survivors.jpeg",
  "/gallery/Drum session with kids.jpeg",
  "/gallery/Group Session on goal setting.jpeg",
  "/gallery/Movement session with college students.jpeg",
  "/gallery/Shivaji Park Art Festival 2022.jpeg",
  "/gallery/Visual art session for kids.jpeg",
];

export default function GalleryPage() {
  return (
    <section className="relative w-screen  py-20 overflow-visible">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="font-display text-4xl text-[#506EA1] mb-3">Gallery</h1>
        <p className="opacity-80 text-[#3A3A3A]/80">
          Glimpses from circles, workshops, campus sessions, and quiet reflections.
        </p>
      </div>

      {/* Circular (top) */}
      <div className="relative w-full h-[65vh] overflow-visible mt-16">
        <CircularGallery
          items={circularImages}
          bend={1.0}
          textColor="#506EA1"
          borderRadius={0.06}
          scrollEase={0.03}
        />
      </div>

      {/* Masonry (bottom) */}
      <div className="mt-24">
        <h2 className="text-center text-2xl font-medium text-[#506EA1] mb-8">
          All Photos
        </h2>
        <MasonryGallery images={masonryImages} />
      </div>
    </section>
  );
}

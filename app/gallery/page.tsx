"use client";

import { CircularGallery } from "../../components/bits/CircularGallery";

const images = [
  // swap these for actual workshop / session photos that Parul okays publicly
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl">Gallery</h1>
      <p className="mt-2 opacity-80">
        Glimpses from circles, workshops, campus sessions, and quiet
        reflections.
      </p>

      <div className="mt-10">
        <CircularGallery images={images} />
      </div>
    </div>
  );
}

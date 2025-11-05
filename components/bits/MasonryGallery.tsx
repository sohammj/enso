"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";

interface MasonryGalleryProps {
  images: string[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  // number of columns per screen size
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    800: 2,
    500: 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="space-y-4"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Image
              src={src}
              alt={`Gallery Image ${i + 1}`}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

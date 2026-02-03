"use client";

import { useMemo, useEffect, useState } from 'react';
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Carousel, { CarouselItem } from './Carousel';

type PhotoStripItem = {
  image?: any;
  label?: string;
  caption?: string;
  mobileOrder?: number;
  mobileAlign?: "left" | "center" | "right";
};

interface PhotoCarouselProps {
  items: PhotoStripItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

export default function PhotoCarousel({
  items,
  baseWidth = 520,
  autoplay = false,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
  round = false
}: PhotoCarouselProps) {
  // Responsive width based on screen size
  const [responsiveWidth, setResponsiveWidth] = useState(baseWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        // Mobile: full width minus padding
        setResponsiveWidth(Math.min(window.innerWidth - 32, 400));
      } else if (window.innerWidth < 768) {
        // Small tablet
        setResponsiveWidth(440);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setResponsiveWidth(500);
      } else {
        // Desktop
        setResponsiveWidth(baseWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [baseWidth]);
  
  const carouselItems: CarouselItem[] = useMemo(() => {
    const validItems = (items || []).filter((it) => it?.image?.asset);
    
    return validItems.map((item, idx) => {
      const imgUrl = urlFor(item.image)
        .width(1600)
        .fit("max")
        .url();

      return {
        id: idx,
        title: item.label || '',
        description: item.caption || '',
        icon: (
          <div className="relative w-full h-full group">
            {/* Image container with clean presentation */}
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0E1E2A]/[0.02] to-[#B88933]/[0.03]">
              <Image
                src={imgUrl}
                alt={item.caption || item.label || "Photo"}
                fill
                className="object-contain select-none pointer-events-none"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 440px, (max-width: 1024px) 500px, 520px"
                priority={idx === 0}
              />
            </div>
          </div>
        )
      };
    });
  }, [items]);

  if (carouselItems.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-transparent via-[#0E1E2A]/[0.02] to-transparent py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background elements - subtle and refined */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#B88933] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2643A0] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Section header - refined typography */}
        <div className="text-center mb-14 md:mb-20 px-6">
          <h2 className="font-[Playfair_Display] text-3xl md:text-4xl lg:text-5xl text-[#0E1E2A] italic opacity-85 mb-5">
            Moments from Our Work
          </h2>
          <div className="w-20 h-[2px] bg-[#B88933]/60 mx-auto" />
        </div>

        {/* Carousel container with enhanced styling */}
        <div className="relative w-full flex justify-center px-4 md:px-20">
          {/* Subtle shadow behind carousel */}
          <div className="absolute inset-0 bg-[#0E1E2A]/[0.04] blur-2xl rounded-3xl transform scale-95 -z-10" />
          
          <Carousel
            items={carouselItems}
            baseWidth={responsiveWidth}
            autoplay={autoplay}
            autoplayDelay={autoplayDelay}
            pauseOnHover={pauseOnHover}
            loop={loop}
            round={round}
          />
        </div>
      </div>
    </section>
  );
}
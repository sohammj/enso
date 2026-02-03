import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import React, { JSX } from 'react';

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 32;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 280, damping: 32 };

interface CarouselItemProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  round: boolean;
  trackItemOffset: number;
  x: any;
  transition: any;
}

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [4, 0, -4];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  // Better aspect ratio for desktop
  const itemHeight = itemWidth < 380 ? 480 : 580;

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
        round
          ? 'items-center justify-center text-center bg-white/95 backdrop-blur-sm border-0'
          : 'items-start justify-between bg-white/98 backdrop-blur-sm border border-[#0E1E2A]/5 rounded-3xl'
      }`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : itemHeight,
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      {/* Icon/Image container */}
      <div className={`relative w-full ${round ? 'h-full' : itemWidth < 380 ? 'h-[380px]' : 'h-[440px]'} overflow-visible`}>
        {item.icon}
      </div>
      
      {/* Text content - only show if not round */}
      {!round && (item.title || item.description) && (
        <div className="w-full p-6 md:p-8 bg-gradient-to-t from-white via-white/95 to-transparent">
          {item.title && (
            <h3 className="font-[Playfair_Display] text-xl md:text-2xl text-[#0E1E2A] mb-2 leading-tight line-clamp-2">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="text-sm md:text-base text-[#0E1E2A]/70 leading-relaxed line-clamp-3">
              {item.description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Carousel({
  items = [],
  baseWidth = 520,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}: CarouselProps): JSX.Element {
  const containerPadding = 0;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  
  const itemsForRender = useMemo(() => {
    // Don't loop if we have 2 or fewer items, or if loop is disabled
    if (!loop || items.length === 0 || items.length <= 2) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => {
        const nextPos = prev + 1;
        // If loop is disabled OR we have 2 or fewer items, stop at the last item
        if ((!loop || items.length <= 2) && nextPos >= itemsForRender.length) {
          return prev; // Stay at current position - stops autoplay at end
        }
        return nextPos;
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length, loop, items.length]);

  useEffect(() => {
    // Start at position 1 only if we're looping AND have more than 2 items
    const startingPosition = (loop && items.length > 2) ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    // Only handle infinite loop logic if we're looping AND have more than 2 items
    if (!loop || itemsForRender.length <= 1 || items.length <= 2) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = (loop && items.length > 2)
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    items.length === 0 ? 0 : (loop && items.length > 2) ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  const handlePrevClick = () => {
    setPosition(prev => {
      if (loop && items.length > 2) {
        return prev - 1;
      }
      return Math.max(0, prev - 1);
    });
  };

  const handleNextClick = () => {
    setPosition(prev => {
      if (loop && items.length > 2) {
        return prev + 1;
      }
      return Math.min(itemsForRender.length - 1, prev + 1);
    });
  };

  if (items.length === 0) return <></>;

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible"
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
        padding: `${containerPadding}px`
      }}
    >
      {/* Main carousel track */}
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1800,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      {/* Navigation controls - dots with small arrows */}
      {items.length > 1 && (
        <div className={`flex w-full justify-center items-center ${round ? 'absolute z-20 bottom-8 left-1/2 -translate-x-1/2' : 'mt-8'}`}>
          <div className="flex items-center gap-6">
            {/* Left Arrow - Small and subtle */}
            <button
              onClick={handlePrevClick}
              className="group flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#0E1E2A]/5 transition-all duration-200"
              aria-label="Previous slide"
            >
              <svg 
                className="w-4 h-4 text-[#0E1E2A]/50 group-hover:text-[#B88933] transition-colors"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-3">
              {items.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-[#B88933] w-10'
                      : 'bg-[#0E1E2A]/25 w-2 hover:bg-[#0E1E2A]/50'
                  }`}
                  animate={{
                    scale: activeIndex === index ? 1 : 0.9
                  }}
                  onClick={() => setPosition((loop && items.length > 2) ? index + 1 : index)}
                  transition={{ duration: 0.2 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow - Small and subtle */}
            <button
              onClick={handleNextClick}
              className="group flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#0E1E2A]/5 transition-all duration-200"
              aria-label="Next slide"
            >
              <svg 
                className="w-4 h-4 text-[#0E1E2A]/50 group-hover:text-[#B88933] transition-colors"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
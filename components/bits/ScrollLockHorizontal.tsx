"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

const LOCK_TOP_PX = 171;
const LOCK_TOLERANCE_PX = 2;

export default function ScrollLockHorizontal({
  children,
  speed = 1,
  className = "",
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const panels = useMemo(() => React.Children.toArray(children), [children]);

  const [inView, setInView] = useState(false);
  const inViewRef = useRef(false);

  const [locked, setLocked] = useState(false);
  const lockedRef = useRef(false);

  const xRef = useRef(0);
  const maxXRef = useRef(0);
  const touchYRef = useRef<number | null>(null);

  const lockedScrollPositionRef = useRef(0);
  const pinRafRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const hasScrolledThroughRef = useRef(false);
  const lastTopRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);

  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  function applyTransform(x: number) {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function step(rawDelta: number) {
    const max = maxXRef.current;
    const next = clamp(xRef.current - rawDelta / speed, max, 0);
    xRef.current = next;
    applyTransform(next);
  }

  function snapHostToLockTop() {
    const host = hostRef.current;
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const diff = rect.top - LOCK_TOP_PX;
    const targetY = window.scrollY + diff;

    window.scrollTo(0, targetY);
    lockedScrollPositionRef.current = targetY;
  }

  function startPinning() {
    const tick = () => {
      if (!lockedRef.current) return;
      if (window.scrollY !== lockedScrollPositionRef.current) {
        window.scrollTo(0, lockedScrollPositionRef.current);
      }
      pinRafRef.current = requestAnimationFrame(tick);
    };

    if (pinRafRef.current) cancelAnimationFrame(pinRafRef.current);
    pinRafRef.current = requestAnimationFrame(tick);
  }

  function stopPinning() {
    if (pinRafRef.current) cancelAnimationFrame(pinRafRef.current);
    pinRafRef.current = null;
  }

  function lockNow() {
    if (lockedRef.current) return;

    isTransitioningRef.current = true;
    snapHostToLockTop();

    setLocked(true);
    lockedRef.current = true;

    startPinning();

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 80);
  }

  function unlockNow() {
    if (!lockedRef.current) return;
    setLocked(false);
    lockedRef.current = false;
    stopPinning();
  }

  useEffect(() => {
    const compute = () => {
      const track = trackRef.current;
      const host = hostRef.current;
      if (!track || !host) return;

      const hostW = host.clientWidth;
      const trackW = track.scrollWidth;
      const max = -(Math.max(0, trackW - hostW));

      maxXRef.current = max;
      xRef.current = clamp(xRef.current, max, 0);
      applyTransform(xRef.current);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let rafId: number;
    let lastState = false;

    lastScrollYRef.current = window.scrollY;

    const checkPosition = () => {
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;

      const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const visibilityRatio = Math.max(0, visibleHeight) / rect.height;

      const distanceFromLockLine = rect.top - LOCK_TOP_PX;
      const isNearLockLine = Math.abs(distanceFromLockLine) <= 160;

      let shouldBeActive: boolean;
      if (lastState) {
        shouldBeActive = visibilityRatio > 0.55 && isNearLockLine;
      } else {
        shouldBeActive = visibilityRatio > 0.7 && isNearLockLine;
      }

      if (shouldBeActive !== inViewRef.current) {
        setInView(shouldBeActive);
        inViewRef.current = shouldBeActive;
        lastState = shouldBeActive;

        if (!shouldBeActive) unlockNow();
      }

      const currScrollY = window.scrollY;
      const scrollingUp = currScrollY < lastScrollYRef.current;
      const scrollingDown = currScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currScrollY;

      if (!lockedRef.current) {
        const prevTop = lastTopRef.current;
        if (prevTop !== null) {
          const prevDist = prevTop - LOCK_TOP_PX;
          const currDist = rect.top - LOCK_TOP_PX;

          const crossed =
            (prevDist > 0 && currDist <= 0) || (prevDist < 0 && currDist >= 0);

          const mostlyVisible = visibilityRatio > 0.7;
          const nearLine = Math.abs(currDist) <= 160;

          if (crossed && mostlyVisible && nearLine) {
            if (scrollingUp) {
              const max = maxXRef.current;
              xRef.current = max;
              applyTransform(max);
              hasScrolledThroughRef.current = true;
            } else if (scrollingDown) {
              xRef.current = 0;
              applyTransform(0);
              hasScrolledThroughRef.current = false;
            }

            lockNow();
          }
        }

        lastTopRef.current = rect.top;
      } else {
        lastTopRef.current = rect.top;
      }

      rafId = requestAnimationFrame(checkPosition);
    };

    rafId = requestAnimationFrame(checkPosition);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;
      if (!inViewRef.current) return;

      const delta = e.deltaY || e.deltaX || 0;
      const max = maxXRef.current;
      const x = xRef.current;

      const atStart = x >= -10;
      const atEnd = x <= max + 10;

      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;

      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (scrollingDown && atEnd) {
          hasScrolledThroughRef.current = true;
          unlockNow();
          return;
        }
        if (scrollingUp && atStart) {
          hasScrolledThroughRef.current = false;
          unlockNow();
          return;
        }

        step(delta);
        return;
      }

      if (scrollingDown) {
        if (atStart && !hasScrolledThroughRef.current) {
          e.preventDefault();
          e.stopPropagation();
          lockNow();
          step(delta);
        }
      } else if (scrollingUp) {
        if (hasScrolledThroughRef.current) {
          if (atEnd || Math.abs(x - max) < 100) {
            e.preventDefault();
            e.stopPropagation();

            if (!atEnd) {
              xRef.current = max;
              applyTransform(max);
            }

            lockNow();
            step(delta);
          }
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;
      if (!inViewRef.current) return;
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;
      if (!inViewRef.current) return;
      if (touchYRef.current == null) return;

      const y = e.touches[0]?.clientY ?? touchYRef.current;
      const dy = touchYRef.current - y;
      touchYRef.current = y;

      const delta = dy * 1.2;

      const max = maxXRef.current;
      const x = xRef.current;

      const atStart = x >= -10;
      const atEnd = x <= max + 10;

      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;

      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (scrollingDown && atEnd) {
          hasScrolledThroughRef.current = true;
          unlockNow();
          return;
        }
        if (scrollingUp && atStart) {
          hasScrolledThroughRef.current = false;
          unlockNow();
          return;
        }

        step(delta);
        return;
      }

      if (scrollingDown && atStart && !hasScrolledThroughRef.current) {
        e.preventDefault();
        e.stopPropagation();
        lockNow();
        step(delta);
      } else if (scrollingUp && hasScrolledThroughRef.current) {
        if (atEnd || Math.abs(x - max) < 100) {
          e.preventDefault();
          e.stopPropagation();

          if (!atEnd) {
            xRef.current = max;
            applyTransform(max);
          }

          lockNow();
          step(delta);
        }
      }
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel as any, true);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onTouchEnd as any);
    };
  }, []);

  useEffect(() => {
    return () => stopPinning();
  }, []);

  return (
    <section
      ref={hostRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className="h-full flex will-change-transform"
        style={{ transform: "translate3d(0px,0,0)" }}
      >
        {/* ✅ REMOVED w-screen - panels now size based on their content */}
        {panels.map((p, i) => (
          <div key={i} className="h-full shrink-0">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}
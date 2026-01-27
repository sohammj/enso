"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

const LOCK_TOP_PX = 171; // ✅ YOUR DEBUG SCREENSHOT VALUE
const LOCK_TOLERANCE_PX = 2; // how exact you want it to be

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

  // ---------- helpers ----------
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

    // How far the host is from your desired lock line (171px)
    const rect = host.getBoundingClientRect();
    const diff = rect.top - LOCK_TOP_PX;

    // Scroll so rect.top becomes exactly LOCK_TOP_PX
    const targetY = window.scrollY + diff;

    // instant snap
    window.scrollTo(0, targetY);

    // store the snapped Y as the pinned position
    lockedScrollPositionRef.current = targetY;
  }

  function startPinning() {
    // keep it EXACTLY pinned even if browser tries momentum / trackpad drift
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

    // ✅ snap FIRST so we lock at the exact same visual height every time
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

  // ---------- bounds ----------
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

  // ---------- inView detection (BUT centered at 171px, not 0px) ----------
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let rafId: number;
    let lastState = false;

    const checkPosition = () => {
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;

      const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const visibilityRatio = Math.max(0, visibleHeight) / rect.height;

      // ✅ centered means "host.top is near 171px"
      const distanceFromLockLine = rect.top - LOCK_TOP_PX;
      const isCentered = Math.abs(distanceFromLockLine) <= 60; // activation zone

      let shouldBeActive: boolean;
      if (lastState) {
        // deactivate a bit later (hysteresis)
        shouldBeActive = visibilityRatio > 0.7 && isCentered;
      } else {
        shouldBeActive = visibilityRatio > 0.85 && isCentered;
      }

      if (shouldBeActive !== inViewRef.current) {
        setInView(shouldBeActive);
        inViewRef.current = shouldBeActive;
        lastState = shouldBeActive;

        // If leaving view, always unlock
        if (!shouldBeActive) unlockNow();
      }

      rafId = requestAnimationFrame(checkPosition);
    };

    rafId = requestAnimationFrame(checkPosition);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ---------- wheel + touch ----------
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

      // ✅ if locked, always prevent vertical scroll & pin exact position
      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();

        // boundaries -> unlock rules
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

      // not locked yet -> decide when to lock
      if (scrollingDown) {
        if (atStart && !hasScrolledThroughRef.current) {
          e.preventDefault();
          e.stopPropagation();
          lockNow();
          step(delta);
        }
      } else if (scrollingUp) {
        if (hasScrolledThroughRef.current) {
          // coming back up: lock near end
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

  // ---------- cleanup pinning if component unmounts ----------
  useEffect(() => {
    return () => stopPinning();
  }, []);

  return (
    <section
      ref={hostRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
      // optional: makes it easier to see the lock line while debugging
      // style={{ outline: locked ? "2px solid red" : undefined }}
    >
      <div
        ref={trackRef}
        className="h-full flex will-change-transform"
        style={{ transform: "translate3d(0px,0,0)" }}
      >
        {panels.map((p, i) => (
          <div key={i} className="h-full w-screen shrink-0">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  speed?: number; // 1 = normal, 1.3 = slower, 0.8 = faster
  className?: string;
};

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

  // ✅ this controls whether we are currently hijacking scroll
  const [locked, setLocked] = useState(false);
  const lockedRef = useRef(false);

  const xRef = useRef(0);
  const maxXRef = useRef(0); // negative
  const touchYRef = useRef<number | null>(null);

  // bounds
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

  // detect in-view
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const on = entry.isIntersecting && entry.intersectionRatio > 0.65;
        setInView(on);
        inViewRef.current = on;

        // ✅ when it becomes visible, lock immediately
        if (on) {
          setLocked(true);
          lockedRef.current = true;
        } else {
          setLocked(false);
          lockedRef.current = false;
        }
      },
      { threshold: [0.65] }
    );

    io.observe(host);
    return () => io.disconnect();
  }, []);

  // apply body lock/unlock
  useEffect(() => {
    const shouldLock = inView && locked;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;

    if (shouldLock) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = prevHtml || "";
      document.body.style.overflow = prevBody || "";
    }

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [inView, locked]);

  // wheel + touch
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!inViewRef.current) return;

      const delta = e.deltaY || e.deltaX || 0;
      const max = maxXRef.current;
      const x = xRef.current;

      const atStart = x === 0;
      const atEnd = x === max;

      // ✅ If currently locked, we own the scroll
      if (lockedRef.current) {
        // If user tries to scroll past the end, unlock so page can continue
        if ((atEnd && delta > 0) || (atStart && delta < 0)) {
          setLocked(false);
          lockedRef.current = false;
          return; // allow natural page scroll
        }

        e.preventDefault();
        step(delta);
        return;
      }

      // ✅ If unlocked, only relock when user reverses direction back into the horizontal range
      const shouldRelock =
        (atEnd && delta < 0) || // at end, user scrolls up -> go back horizontally
        (atStart && delta > 0); // at start, user scrolls down -> go forward horizontally

      if (shouldRelock) {
        e.preventDefault();
        setLocked(true);
        lockedRef.current = true;
        step(delta);
      }
      // otherwise: let page scroll
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!inViewRef.current) return;
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!inViewRef.current) return;
      if (touchYRef.current == null) return;

      const y = e.touches[0]?.clientY ?? touchYRef.current;
      const dy = touchYRef.current - y; // swipe up => positive
      touchYRef.current = y;

      const delta = dy * 1.2;

      const max = maxXRef.current;
      const x = xRef.current;

      const atStart = x === 0;
      const atEnd = x === max;

      if (lockedRef.current) {
        if ((atEnd && delta > 0) || (atStart && delta < 0)) {
          setLocked(false);
          lockedRef.current = false;
          return;
        }

        e.preventDefault();
        step(delta);
        return;
      }

      const shouldRelock = (atEnd && delta < 0) || (atStart && delta > 0);
      if (shouldRelock) {
        e.preventDefault();
        setLocked(true);
        lockedRef.current = true;
        step(delta);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function step(rawDelta: number) {
    const max = maxXRef.current;
    const next = clamp(xRef.current - rawDelta / speed, max, 0);
    xRef.current = next;
    applyTransform(next);
  }

  function applyTransform(x: number) {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  return (
    <section ref={hostRef} className={`relative w-full h-screen overflow-hidden ${className}`}>
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

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

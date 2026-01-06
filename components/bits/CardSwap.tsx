import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

type CardSwapProps = {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number; // you can keep it, but default 0 is better for "front-facing"
  easing?: "elastic" | "smooth";
  depthScale?: number; // how much smaller each back card gets
  children: React.ReactNode;
};

export const Card = forwardRef<HTMLDivElement, any>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
      customClass ?? ""
    } ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
  depthScale: number
) => ({
  x: 0,                 // ✅ keep all cards centered on X
  y: i * distY * 0.6,   // ✅ small downward peek (tweak 0.4–0.8)
  z: 0,
  scale: Math.max(0.9, 1 - i * depthScale),
  zIndex: total - i,
});


const placeNow = (el: HTMLElement, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    scale: slot.scale,
    xPercent: -50,
    yPercent: -50,
    skewY: skew, // keep 0 for clean front view
    rotationY: 0, // ✅ always face camera
    rotationX: 0,
    rotationZ: 0,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 0, // ✅ default 0 -> no slant
  easing = "elastic",
  depthScale = 0.05, // ✅ tweak: 0.04–0.07
  children,
}: CardSwapProps) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);

  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
//   const intervalRef = useRef<number | undefined>();
  const intervalRef = useRef<number | undefined>(undefined);

  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((r, i) => {
      if (!r.current) return;
      placeNow(
        r.current,
        makeSlot(i, cardDistance, verticalDistance, total, depthScale),
        skewAmount
      );
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;

        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, depthScale);

        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: slot.scale,
            rotationY: 0,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
        depthScale
      );

      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);

      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, "return");

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          scale: backSlot.scale,
          rotationY: 0,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      if (!node) return;

      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };

      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, depthScale, refs.length]);

  // ✅ TS-safe cloneElement
  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;

    const el = child as React.ReactElement<any>;

    return cloneElement(el, {
      key: i,
      ref: refs[i],
      style: { width, height, ...(el.props.style ?? {}) },
      onClick: (e: any) => {
        el.props.onClick?.(e);
        onCardClick?.(i);
      },
    });
  });

  return (
        <div
            ref={container}
            className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            perspective-[900px] overflow-visible
            max-[768px]:scale-[0.9]
            max-[480px]:scale-[0.8]
            "
            style={{ width, height, transformStyle: "preserve-3d" }}
        >
            {rendered}
        </div>
    );


//   return (
//     <div
//       ref={container}
//       className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
//       style={{ width, height, transformStyle: "preserve-3d" }}
//     >
//       {rendered}
//     </div>
//   );
};

export default CardSwap;

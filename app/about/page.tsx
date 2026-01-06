import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
import { founder, studioInfo } from "../../lib/data";
import JourneyHorizontal from "@/components/sections/JourneyHorizontal";

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Wrap so we can overlay heading without pushing the sticky section down */}
      <div className="relative">
        <h1
          className="
            pointer-events-none
            absolute left-1/2 top-50 -translate-x-1/2
            z-30
            font-display uppercase tracking-[0.22em]
            text-[46px] md:text-[64px]
            text-black/80
          "
        >
          Our Journey
        </h1>

        {/* optional: give a tiny breathing space so the title doesn't collide on small screens */}
        <div className="pt-24 md:pt-28">
          <JourneyHorizontal founder={founder} studioInfo={studioInfo} />
        </div>
      </div>

      <StickyGetInTouch />
    </main>
  );
}

// import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
// import { founder, studioInfo } from "../../lib/data";
// import JourneyHorizontal from "@/components/sections/JourneyHorizontal";

// export default function AboutPage() {
//   return (
//     <main className="relative">
//       {/* Intro heading */}
//       <section className="relative bg-transparent">
//         <div className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
//           <h1 className="font-display text-[48px] md:text-[64px] leading-[1.05] tracking-wide uppercase text-[#0E1E2A]">
//             Our Journey
//           </h1>
//         </div>
//       </section>

//       {/* Your horizontal section */}
//       <JourneyHorizontal founder={founder} studioInfo={studioInfo} />

//       <StickyGetInTouch />
//     </main>
//   );
// }

// import StickyGetInTouch from "@/components/layout/StickyGetInTouch";
// import { founder, studioInfo } from "../../lib/data";
// import JourneyHorizontal from "@/components/sections/JourneyHorizontal";

// export default function AboutPage() {
//   return (
//     <main className="relative">
//       <JourneyHorizontal founder={founder} studioInfo={studioInfo} />
//       <StickyGetInTouch />
//     </main>
//   );
// }

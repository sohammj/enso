"use client";

import Image from "next/image";
import StickyGetInTouch from "@/components/layout/StickyGetInTouch";


/* ================= DATA ================= */

const images = [
  {
    src: "/gallery/Art therapy with cancer survivors.jpeg",
    title: "Art Therapy with Cancer Survivors",
  },
  {
    src: "/gallery/Drum session with kids.jpeg",
    title: "Drum Session with Kids",
  },
  {
    src: "/gallery/Group Session on goal setting.jpeg",
    title: "Group Session on Goal Setting",
  },
  {
    src: "/gallery/Movement session with college students.jpeg",
    title: "Movement Session with College Students",
  },
  {
    src: "/gallery/Shivaji Park Art Festival 2022.jpeg",
    title: "Shivaji Park Art Festival 2022",
  },
  {
    src: "/gallery/Visual art session for kids.jpeg",
    title: "Visual Art Session for Kids",
  },
];

/* ================= PAGE ================= */

export default function GalleryPage() {
  return (
    <section className="relative py-24 bg-[url('/paper-texture.jpg')] bg-repeat">
      {/* ===== Header ===== */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-20">
        <h1 className="font-display text-4xl text-[#506EA1] mb-4">
          Gallery
        </h1>
        <p className="text-[#3A3A3A]/80 max-w-xl mx-auto">
          Glimpses from circles, workshops, campus sessions, and quiet reflections.
        </p>
      </div>

      {/* ===== IMAGE GRID ===== */}
      <div className="max-w-6xl mx-auto px-6">
        {/* <h2 className="text-center text-2xl font-medium text-[#506EA1] mb-12">
          All Photos
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((img) => (
            <div
              key={img.src}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-soft
                transition
                duration-500
                ease-out
                hover:shadow-md
              "
            >
              <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={420}
                className="
                  w-full
                  h-full
                  object-cover
                  transition
                  duration-500
                  ease-out
                  group-hover:contrast-105
                  group-hover:saturate-105
                "
              />

              {/* Soft caption */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-gradient-to-t
                  from-black/50
                  to-transparent
                  px-4
                  py-3
                  transition
                  duration-500
                  ease-out
                  group-hover:from-black/60
                "
              >
                <p className="text-sm text-white">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StickyGetInTouch />

    </section>
  );
}

// "use client";

// import Image from "next/image";

// /* ================= DATA ================= */

// const images = [
//   {
//     src: "/gallery/Art therapy with cancer survivors.jpeg",
//     title: "Art Therapy with Cancer Survivors",
//   },
//   {
//     src: "/gallery/Drum session with kids.jpeg",
//     title: "Drum Session with Kids",
//   },
//   {
//     src: "/gallery/Group Session on goal setting.jpeg",
//     title: "Group Session on Goal Setting",
//   },
//   {
//     src: "/gallery/Movement session with college students.jpeg",
//     title: "Movement Session with College Students",
//   },
//   {
//     src: "/gallery/Shivaji Park Art Festival 2022.jpeg",
//     title: "Shivaji Park Art Festival 2022",
//   },
//   {
//     src: "/gallery/Visual art session for kids.jpeg",
//     title: "Visual Art Session for Kids",
//   },
// ];

// /* ================= PAGE ================= */

// export default function GalleryPage() {
//   return (
//     <section className="relative py-24 bg-[url('/paper-texture.jpg')] bg-repeat">
//       {/* ===== Header ===== */}
//       <div className="max-w-6xl mx-auto px-6 text-center mb-20">
//         <h1 className="font-display text-4xl text-[#506EA1] mb-4">
//           Gallery
//         </h1>
//         <p className="text-[#3A3A3A]/80 max-w-xl mx-auto">
//           Glimpses from circles, workshops, campus sessions, and quiet reflections.
//         </p>
//       </div>

//       {/* ===== IMAGE GRID ===== */}
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {images.map((img) => (
//             <div
//               key={img.src}
//               className="relative overflow-hidden rounded-2xl bg-white shadow-soft"
//             >
//               <Image
//                 src={img.src}
//                 alt={img.title}
//                 width={600}
//                 height={420}
//                 className="w-full h-full object-cover"
//               />

//               {/* Soft caption */}
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
//                 <p className="text-sm text-white">
//                   {img.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

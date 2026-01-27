"use client";

const items = [
  // POSTS
  { type: "post", url: "https://www.instagram.com/p/DQmtd_7jWWF/" },
  { type: "post", url: "https://www.instagram.com/p/DQmtQL2DcLn/" },
  { type: "post", url: "https://www.instagram.com/p/DQmtE5SDa_d/" },

  // REELS
  { type: "reel", url: "https://www.instagram.com/reel/DT5FBDuD7sO/" },
  { type: "reel", url: "https://www.instagram.com/reel/DTvtVDgky5Y/" },
  { type: "reel", url: "https://www.instagram.com/reel/DTVkf5nkgrt/" },
];

function toEmbed(url: string) {
  // Keep it simple for demo: just ensure it ends with /embed
  const clean = url.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
}

export default function InstaDemoGrid() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          Instagram Demo Grid
        </h2>
        <p className="text-sm md:text-base opacity-70 mt-2">
          Mix of posts + reels (responsive grid)
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const isReel = it.type === "reel";

            return (
              <div
                key={idx}
                className={[
                  "relative isolate rounded-2xl overflow-hidden bg-white shadow-sm",
                  "border border-black/5",
                  // tile sizing:
                  isReel ? "aspect-[9/16]" : "aspect-square",
                ].join(" ")}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={toEmbed(it.url)}
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                />

                {/* Optional tiny overlay button (doesn't block clicks) */}
                <div className="pointer-events-none absolute bottom-3 right-3">
                  <div className="px-3 py-1.5 text-xs rounded-full bg-black/70 text-white">
                    View on Instagram
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

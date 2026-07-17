import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Enso Mind Matters",
    short_name: "Enso",
    description: "Counselling and arts-based therapy in Mumbai.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.png", sizes: "500x500", type: "image/png" }],
  };
}

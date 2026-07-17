import "./globals.css";
import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
// import TransitionProvider from "./TransitionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ensomindmatters.com"),
  title: {
    default: "Enso Mind Matters | Counselling & Art Therapy in Mumbai",
    template: "%s | Enso Mind Matters",
  },
  description:
    "A gentle, safe space for healing and self-exploration through counselling and arts-based therapy with psychologist Parul Dewal-Hande in Mumbai.",
  applicationName: "Enso Mind Matters",
  authors: [{ name: "Enso Mind Matters" }],
  creator: "Enso Mind Matters",
  publisher: "Enso Mind Matters",
  alternates: { canonical: "/" },
  category: "Mental Health",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Enso Mind Matters | Counselling & Art Therapy in Mumbai",
    description:
      "Counselling, arts-based therapy, support groups and workshops in Mahim, Mumbai.",
    images: ["/ensologo.png"],
  },
  openGraph: {
    title: "Enso Mind Matters | Counselling & Art Therapy in Mumbai",
    description:
      "Counselling, arts-based therapy, support groups and workshops in Mahim, Mumbai.",
    type: "website",
    locale: "en_IN",
    siteName: "Enso Mind Matters",
    url: "/",
    images: [
      {
        url: "/ensologo.png",
        width: 1200,
        height: 1200,
        alt: "Enso Mind Matters",
      },
    ],
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-[var(--sky)]/40 selection:text-[var(--ink)]">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}

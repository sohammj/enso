import "./globals.css";
import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Enso Counselling & Art Therapy Centre.",
  description: "A gentle, safe space for healing and self-exploration through counselling and  arts-based therapy with psychologist Parul Dewal-Hande.",
  twitter: {
    card: "summary_large_image",
    title: "Enso Counselling & Art Therapy Centre.",
  },
  openGraph: {
    title: "Enso Counselling & Art Therapy Centre.",
    type: "website",
  },
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

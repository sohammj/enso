import "./globals.css";
import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Enso Mind Matters",
  description: "Art-forward mental wellness – therapy, programs, community.",
  twitter: {
    card: "summary_large_image",
    title: "Enso Mind Matters",
  },
  openGraph: {
    title: "Enso Mind Matters",
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

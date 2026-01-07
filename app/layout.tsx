import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
// import SplashCursor from "../components/bits/SplashCursor";

// export const metadata: Metadata = {
//   title: "Enso Mind Matters",
//   description: "Art-forward mental wellness – therapy, programs, community.",
//   twitter: {
//     card: "summary_large_image",
//     title: "Enso Mind Matters",
//   },
//   openGraph: {
//     title: "Enso Mind Matters",
//     type: "website",
//   },
// };

export const metadata: Metadata = {
  title: "Enso Mind Matters",
  description: "Art-forward mental wellness – therapy, programs, community.",

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Enso Mind Matters",
  },

  openGraph: {
    title: "Enso Mind Matters",
    type: "website",
  },
};


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className="bg-background text-foreground antialiased selection:bg-[var(--sky)]/40 selection:text-[var(--ink)]">
//         {/* <SplashCursor /> */}
//         <Nav />
//         <main className="min-h-dvh pt-20">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-[var(--sky)]/40 selection:text-[var(--ink)]">
        {/* GLOBAL WRAPPER — THIS FIXES HORIZONTAL SCROLL */}
        <div className="relative overflow-x-hidden">
          <Nav />
          <main className="min-h-dvh pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-24 text-[#111]">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.svg" alt="Enso logo" className="w-8 h-8" />
            <span className="font-semibold text-lg tracking-tight">
              Enso Mind Matters
            </span>
          </div>
          <p className="text-sm opacity-80">Mumbai, India</p>
          <p className="text-sm mt-2 opacity-80">
            Email:{" "}
            <a
              href="mailto:info@example.com"
              className="underline underline-offset-4 hover:opacity-100"
            >
              info@example.com
            </a>
          </p>
        </div>

        {/* Explore Section */}
        <div>
          <h4 className="text-sm uppercase font-medium tracking-wide mb-3 opacity-70">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/programs" className="hover:underline underline-offset-4">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline underline-offset-4">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
            </li>
            <li>
              <Link href="/book-session" className="hover:underline underline-offset-4">
                Book
              </Link>
            </li>
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h4 className="text-sm uppercase font-medium tracking-wide mb-3 opacity-70">
            More
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline underline-offset-4">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline underline-offset-4">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 text-center py-6 text-xs opacity-70">
        © {new Date().getFullYear()} Enso Mind Matters. All rights reserved.
      </div>
    </footer>
  );
}

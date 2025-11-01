"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Our Programs" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book", label: "Book a Session" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "Our Journey" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled ? "bg-white/70 shadow-sm" : "bg-white/20 border-b border-white/10"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="font-display text-xl text-[#111]">
          enso
        </Link>

        {/* Desktop Links */}
        <div className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#111] hover:opacity-80 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200">
          <div className="mx-4 mb-4 rounded-2xl p-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-[#111] hover:bg-gray-100 transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

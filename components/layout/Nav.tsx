"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Our Programs" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/start-a-conversation", label: "Start a conversation" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "Our Journey" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4"> */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[80px]">

        {/* Logo — use GIF */}
        <Link href="/" className="flex items-center">
          <img
            src="/ensologo.gif"
            alt="Enso Mind Matters"
            className="h-[100px] md:h-[110px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[18px] font-medium text-[#111] hover:opacity-70 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#111]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
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

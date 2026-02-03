"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Our Programs" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/start-a-conversation", label: "Start a conversation" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "My Journey" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [gifSrc, setGifSrc] = useState("/ENSOLOGO1.gif");
  const startedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // In Next dev mode, React StrictMode runs effects twice.
    // This prevents double intervals → prevents “every second” restarts.
    if (startedRef.current) return;
    startedRef.current = true;

    const restart = () => {
      setGifSrc(`/ENSOLOGO1.gif?ts=${Date.now()}`);
    };

    // play immediately
    restart();

    // replay every 10 seconds
    const interval = setInterval(restart, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[80px]">
        <Link href="/" className="flex items-center">
          <img
            src={gifSrc}
            alt="Enso logo"
            className="h-[100px] md:h-[110px] w-auto object-contain"
            draggable={false}
          />
        </Link>

        <div className="hidden lg:flex gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-[18px] font-medium text-[#111] transition-all duration-300
                         hover:text-[#4A5568]
                         after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 
                         after:bg-[#111] after:transition-all after:duration-300 
                         hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden text-[#111] hover:text-[#4A5568] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md border-t border-gray-200">
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

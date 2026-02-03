"use client";

import Image from "next/image";
import { studioInfo } from "@/lib/data";

type SocialItem = { label: string; href: string; icon: string };

const socials: SocialItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/enso-mind-matters",
    icon: "/icons/linkedin.svg",
  },
  { label: "WhatsApp", href: "https://wa.me/917304818758", icon: "/icons/whatsapp.svg" },
  { label: "Instagram", href: "https://instagram.com/enso_mind_matters", icon: "/icons/instagram.svg" },
  { label: "Gmail", href: `mailto:${studioInfo.email}`, icon: "/icons/mail.svg" },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

/**
 * Desktop: fixed vertical rail on right
 * Mobile: floating action button (FAB) bottom-right that expands into a small vertical mini-rail
 */
export default function SocialRail({
  desktop = true,
  mobile = "fab", // "none" | "fab" | "bar"
}: {
  desktop?: boolean;
  mobile?: "none" | "fab" | "bar";
}) {
  return (
    <>
      {/* DESKTOP: Vertical rail */}
      {desktop && (
        <div
          className={[
            "hidden lg:flex",
            "fixed right-0 top-1/2 -translate-y-1/2",
            "z-[80]",
            "flex-col overflow-hidden",
            "rounded-l-2xl border border-black/10 bg-white/85 backdrop-blur",
            "shadow-soft",
          ].join(" ")}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={isExternal(s.href) ? "_blank" : undefined}
              rel={isExternal(s.href) ? "noreferrer" : undefined}
              className="group flex h-14 w-14 items-center justify-center border-b border-black/10 last:border-b-0 hover:bg-black/[0.03]"
              aria-label={s.label}
              title={s.label}
            >
              <Image
                src={s.icon}
                alt=""
                width={22}
                height={22}
                className="opacity-80 transition group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      )}

      {/* MOBILE: Floating FAB that expands */}
      {mobile === "fab" && (
        <div className="lg:hidden fixed right-4 bottom-4 z-[80]">
          <details className="group">
            {/* Button */}
            <summary
              className={[
                "list-none cursor-pointer",
                "h-12 w-12 rounded-full",
                "bg-white border border-black/10 shadow-soft",
                "flex items-center justify-center",
                "active:scale-95 transition",
              ].join(" ")}
              aria-label="Open social links"
              title="Connect"
            >
              <Image src="/enso.png" alt="" width={24} height={24} className="opacity-90" />
            </summary>

            {/* Mini rail */}
            <div className="mt-3 flex flex-col gap-2 items-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={isExternal(s.href) ? "_blank" : undefined}
                  rel={isExternal(s.href) ? "noreferrer" : undefined}
                  className={[
                    "h-11 w-11 rounded-full",
                    "bg-white border border-black/10 shadow-soft",
                    "flex items-center justify-center",
                    "active:scale-95 transition",
                  ].join(" ")}
                  aria-label={s.label}
                  title={s.label}
                >
                  <Image src={s.icon} alt="" width={20} height={20} className="opacity-90" />
                </a>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* MOBILE: Horizontal bar (if you ever want it) */}
      {mobile === "bar" && (
        <div className="lg:hidden flex items-center justify-center gap-6 mt-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={isExternal(s.href) ? "_blank" : undefined}
              rel={isExternal(s.href) ? "noreferrer" : undefined}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm hover:shadow-md active:scale-95 transition-all"
              aria-label={s.label}
              title={s.label}
            >
              <Image src={s.icon} alt="" width={24} height={24} className="opacity-90" />
            </a>
          ))}
        </div>
      )}
    </>
  );
}

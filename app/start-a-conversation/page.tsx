"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { studioInfo } from "../../lib/data";
import { useState } from "react";

/* ================= Schema ================= */

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(3, "Please enter your email or phone"),
  preferred: z.enum(["Email", "Call", "WhatsApp"]),
  message: z.string().min(5, "Tell us a little about what you’re looking for"),
});

type FormData = z.infer<typeof Schema>;

/* ================= Motion ================= */

const float = {
  animate: {
    y: [0, -12, 0],
    rotate: [-1, 1, -1],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};



// add if not already
// import Image from "next/image";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enso-mind-matters", icon: "/icons/linkedin.svg" },
  { label: "WhatsApp", href: "https://wa.me/919967240799", icon: "/icons/whatsapp.svg" },
  { label: "Instagram", href: "https://instagram.com/enso_mind_matters", icon: "/icons/instagram.svg" },
  { label: "Gmail", href: `mailto:${studioInfo.email}`, icon: "/icons/mail.svg" },
];

/* ================= SOCIALS (Desktop Rail + Mobile FAB) ================= */

function SocialDock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ DESKTOP: right edge, vertically centered, sticky to border */}
      <div
        className={[
          "hidden lg:flex",
          "fixed right-0 top-1/2 -translate-y-1/2",
          "z-40",
          "flex-col overflow-hidden",
          "rounded-l-2xl border border-black/10 bg-white/85 backdrop-blur",
          "shadow-soft",
        ].join(" ")}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
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

      {/* ✅ MOBILE: bottom-right button -> dropdown icons */}
      <div className="lg:hidden fixed right-4 bottom-4 z-50">
        {/* dropdown */}
        <div
          className={[
            // "absolute bottom-14 right-0",
            "absolute bottom-20 right-0",
            "transition-all duration-200",
            open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
          ].join(" ")}
        >
          {/* <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/90 backdrop-blur shadow-soft"> */}
          <div className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white/95 backdrop-blur shadow-soft">

            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-16 w-16 items-center justify-center border-b border-black/10 last:border-b-0 active:bg-black/[0.05]"

                // className="flex h-12 w-12 items-center justify-center border-b border-black/10 last:border-b-0 active:bg-black/[0.04]"
                aria-label={s.label}
                title={s.label}
                onClick={() => setOpen(false)}
              >
                {/* <Image src={s.icon} alt="" width={18} height={18} className="opacity-90" /> */}
                <Image
                  src={s.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="opacity-95"
                />

              </a>
            ))}
          </div>
        </div>

        {/* fab (logo-only) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-0 bg-transparent border-0 shadow-none backdrop-blur-0 rounded-none"
          aria-label="Open social links"
          title="Socials"
        >
          <Image
            src="/enso.png"
            alt="Enso"
            width={75}
            height={75}
            className={`cursor-pointer select-none opacity-90 hover:opacity-100 transition
              ${open ? "rotate-90" : "rotate-0"}
            `}
          />
        </button>

      </div>

      {/* click outside overlay (mobile) */}
      {open && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-40"
          aria-label="Close socials"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}


/* ================= Page ================= */

// export default function BookPage() {
export default function StartConversation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: { preferred: "Email" },
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset();
  };

  // return (
  //   <div className="relative mx-auto max-w-2xl px-4 py-14">
  return (
  <div className="relative mx-auto max-w-2xl px-4 py-14">
    {/* Social rail — choose left or right */}
    {/* <SocialRail side="left" /> */}
    <SocialDock />

     {/* 🦋 LEFT SIDE – gentle vertical cluster */}
      <div className="hidden lg:block absolute left-[-180px] top-[140px] opacity-80 -z-10">
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[140px] rotate-[-12deg]"
          {...float}
        />
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[90px] rotate-[6deg] absolute top-[120px] left-[90px]"
          {...float}
        />
      </div>

      {/* 🦋 RIGHT SIDE – balancing single */}
      <div className="hidden lg:block absolute right-[-160px] top-[320px] opacity-70 -z-10">
        <motion.img
          src="/dragonfly.svg"
          alt=""
          className="w-[110px] rotate-[10deg]"
          {...float}
        />
      </div>
      
     

      {/* Heading */}
      <h1 className="font-display text-4xl">Connect With Us Here</h1>
      <p className="mt-2 text-sm opacity-80">
        Tell us what you’re seeking support for. We will reach out to you soon.
      </p>

      {/* Success */}
      {isSubmitSuccessful && (
        <p className="mt-4 rounded-xl bg-tea/20 p-3 text-tea">
          Thank you. Please check your messages soon for next steps.
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid gap-4 text-sm"
      >
        <input
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <input
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          placeholder="Email or phone number"
          {...register("contact")}
        />
        {errors.contact && (
          <p className="text-sm text-red-500">{errors.contact.message}</p>
        )}

        <select
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          {...register("preferred")}
        >
          <option value="Email">Email</option>
          <option value="Call">Call</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>

        <textarea
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          rows={5}
          placeholder="Anything you’d like to share"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}

        <button
          disabled={isSubmitting}
          className="rounded-xl bg-ink px-5 py-3 text-white hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Footer note */}
      <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft text-sm">
        <p className="opacity-80">
          Prefer WhatsApp or email? Reach us at{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${studioInfo.email}`}
          >
            {studioInfo.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

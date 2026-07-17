"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { studioInfo } from "@/lib/data";
import { useState, useEffect } from "react";
import Dragonfly from "@/components/ui/Dragonfly";
import { toast } from "sonner";

// Metadata for this client page is supplied by the route layout.

/* ================= Schema ================= */

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(3, "Please enter your email or phone"),
  preferred: z.enum(["Email", "Call"]),
  message: z.string().min(5, "Tell us a little about what you're looking for"),
}).refine((data) => {
  // If Email is preferred, validate email format
  if (data.preferred === "Email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data.contact);
  }
  // If Call is preferred, validate phone number format
  if (data.preferred === "Call") {
    // Accepts formats like: +919876543210, 9876543210, +91 98765 43210, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}[-\s\.]?[0-9]{0,6}$/;
    return phoneRegex.test(data.contact.replace(/\s/g, ''));
  }
  return true;
}, (data) => ({
  message: data.preferred === "Email" 
    ? "Please enter a valid email address" 
    : "Please enter a valid phone number",
  path: ["contact"],
}));

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

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enso-mind-matters", icon: "/icons/linkedin.svg" },
  { label: "WhatsApp", href: "https://wa.me/917304818758", icon: "/icons/whatsapp.svg" },
  { label: "Instagram", href: "https://instagram.com/enso_mind_matters", icon: "/icons/instagram.svg" },
  { label: "Gmail", href: `mailto:${studioInfo.email}`, icon: "/icons/mail.svg" },
];

/* ================= Page ================= */

export default function StartConversation() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: { preferred: "Email" },
    mode: "all", // Validates on change, blur, and submit
  });

  const preferredMethod = watch("preferred");
  const contactValue = watch("contact");

  // Re-validate contact field when preferred method changes
  useEffect(() => {
    if (contactValue) {
      trigger("contact");
    }
  }, [preferredMethod, trigger, contactValue]);

  // Check if contact field matches the preferred method
  const isContactValid = () => {
    if (!contactValue || contactValue.length < 3) return false;
    
    if (preferredMethod === "Email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue);
    } else if (preferredMethod === "Call") {
      return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}[-\s\.]?[0-9]{0,6}$/.test(contactValue.replace(/\s/g, ''));
    }
    return false;
  };

  const onSubmit = async (data: FormData) => {
    // Double-check validation before submitting
    const isEmailValid = data.preferred === "Email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact);
    const isPhoneValid = data.preferred === "Call" && /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}[-\s\.]?[0-9]{0,6}$/.test(data.contact.replace(/\s/g, ''));
    
    if (!isEmailValid && !isPhoneValid) {
      toast.error(data.preferred === "Email" ? "Please enter a valid email address" : "Please enter a valid phone number");
      return;
    }

    const loadingToast = toast.loading("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        toast.error(j?.error || "Failed to send.");
        return;
      }

      reset();
      toast.success("Sent ✅ We'll reach out soon.");
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };


  return (
    <div className="relative mx-auto max-w-2xl px-4 py-14">
      {/* Desktop social rail only */}
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

      {/* 🦋 LEFT SIDE – gentle vertical cluster - NOW ANIMATED */}
      <div className="hidden lg:block absolute left-[-180px] top-[140px] opacity-80 z-0">
        <Dragonfly
          className="w-[140px] rotate-[-12deg]"
          drift={24}
          twist={6}
          floatDuration={8}
        />
      </div>
      <div className="hidden lg:block absolute left-[-90px] top-[260px] opacity-80 z-0">
        <Dragonfly
          className="w-[90px] rotate-[6deg]"
          drift={18}
          twist={5}
          floatDuration={8}
        />
      </div>

      {/* 🦋 RIGHT SIDE – balancing single - NOW ANIMATED */}
      <div className="hidden lg:block absolute right-[-160px] top-[320px] opacity-70 z-0">
        <Dragonfly
          className="w-[110px] rotate-[10deg]"
          drift={20}
          twist={6}
          floatDuration={8}
        />
      </div>

      {/* Heading */}
      <h1 className="font-display text-4xl">Connect With Us Here</h1>
      <p className="mt-2 text-sm opacity-80">
        Tell us what you're seeking support for. We will reach out to you soon.
      </p>

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
          placeholder={preferredMethod === "Email" ? "Your email address" : "Your phone number"}
          {...register("contact")}
        />
        {errors.contact && (
          <p className="text-sm text-red-500">{errors.contact.message}</p>
        )}
        {!errors.contact && contactValue && preferredMethod === "Call" && !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}[-\s\.]?[0-9]{0,6}$/.test(contactValue.replace(/\s/g, '')) && (
          <p className="text-sm text-red-500">Please enter a valid phone number</p>
        )}
        {!errors.contact && contactValue && preferredMethod === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue) && (
          <p className="text-sm text-red-500">Please enter a valid email address</p>
        )}

        <div className="grid gap-2">
          <p className="text-xs opacity-70">Preferred contact</p>

          <div className="flex gap-3">
            <label className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 cursor-pointer">
              <input
                type="radio"
                value="Email"
                {...register("preferred")}
                className="accent-black"
              />
              <span>Email</span>
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 cursor-pointer">
              <input
                type="radio"
                value="Call"
                {...register("preferred")}
                className="accent-black"
              />
              <span>Call</span>
            </label>
          </div>

          {errors.preferred && (
            <p className="text-sm text-red-500">{errors.preferred.message as string}</p>
          )}
        </div>

        <textarea
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          rows={5}
          placeholder="Anything you'd like to share"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}

        <button
          disabled={isSubmitting || !isValid || !isContactValid()}
          className="rounded-xl bg-ink px-5 py-3 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Mobile social icons - horizontal bar below form */}
      <div className="lg:hidden flex items-center justify-center gap-6 mt-8">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm hover:shadow-md active:scale-95 transition-all"
            aria-label={s.label}
            title={s.label}
          >
            <Image
              src={s.icon}
              alt=""
              width={24}
              height={24}
              className="opacity-90"
            />
          </a>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft text-sm">
        <p className="opacity-80">
          Prefer email? Reach us at{" "}
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

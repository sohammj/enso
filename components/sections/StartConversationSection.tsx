"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(3, "Please enter your email or phone"),
  preferred: z.enum(["Email", "WhatsApp"]),
  message: z.string().min(5, "Tell us a little about what you're feeling"),
}).refine((data) => {
  // If Email is preferred, validate email format
  if (data.preferred === "Email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data.contact);
  }
  // If WhatsApp is preferred, validate phone number format
  if (data.preferred === "WhatsApp") {
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

export default function StartConversationSection() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
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
    } else if (preferredMethod === "WhatsApp") {
      return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}[-\s\.]?[0-9]{0,6}$/.test(contactValue.replace(/\s/g, ''));
    }
    return false;
  };

  const onSubmit = async (data: FormData) => {
    // Double-check validation before submitting
    const isEmailValid = data.preferred === "Email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact);
    const isPhoneValid = data.preferred === "WhatsApp" && /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}[-\s\.]?[0-9]{0,6}$/.test(data.contact.replace(/\s/g, ''));
    
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
    <section className="relative py-28 bg-[url('/paper-texture.jpg')] bg-repeat overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Card */}
        <div className="bg-[var(--cream)] rounded-3xl shadow-soft p-6 sm:p-8 md:p-12">
          
          {/* Heading */}
          <h2 className="font-[Playfair_Display] text-2xl sm:text-3xl md:text-4xl text-[#0E1E2A]">
            Start a conversation with us
          </h2>

          <p className="mt-3 max-w-xl text-sm sm:text-base text-[#0E1E2A]/80 leading-relaxed">
            You don't have to have the right words. Share whatever feels safe —
            we'll take it from there.
          </p>

          {/* Success */}
          {isSubmitSuccessful && (
            <p className="mt-6 rounded-xl bg-[#B88933]/10 p-4 text-sm sm:text-base text-[#6A4A13]">
              Thank you for reaching out. We'll get back to you within 24–48 hours.
            </p>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid gap-5"
          >
            {/* Name */}
            <div>
              <input
                className="w-full rounded-2xl bg-white/80 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#B88933]/40"
                placeholder="Your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email / Phone */}
            <div>
              <input
                className="w-full rounded-2xl bg-white/80 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#B88933]/40"
                placeholder={preferredMethod === "Email" ? "Your email address" : "Your phone number"}
                {...register("contact")}
              />
              {errors.contact && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.contact.message}</p>
              )}
            </div>

            {/* Preferred method */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm text-[#0E1E2A]/70">
                Preferred way to connect
              </label>
              <div className="flex flex-wrap gap-3">
                {["Email", "WhatsApp"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 rounded-full bg-white/70 px-3 sm:px-4 py-2 cursor-pointer hover:bg-white transition-colors text-sm sm:text-base"
                  >
                    <input
                      type="radio"
                      value={option}
                      className="accent-[#B88933]"
                      {...register("preferred")}
                    />
                    <span className="whitespace-nowrap">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={5}
                className="w-full rounded-2xl bg-white/80 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#B88933]/40 resize-none"
                placeholder="What's been on your mind?"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting || !isValid || !isContactValid()}
              className="mt-4 self-start rounded-full bg-[#0E1E2A] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isSubmitting ? "Sending…" : "Get in touch"}
            </button>
          </form>

          {/* Note */}
          <p className="mt-8 text-xs sm:text-sm text-[#0E1E2A]/60 max-w-md">
            All messages are confidential. We'll respond within 24–48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
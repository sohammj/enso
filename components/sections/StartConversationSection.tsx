"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(3, "Please enter your email or phone"),
  preferred: z.enum(["Email", "Call", "WhatsApp"]),
  message: z.string().min(5, "Tell us a little about what you’re feeling"),
});

type FormData = z.infer<typeof Schema>;

export default function StartConversationSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: { preferred: "Email" },
  });


  const onSubmit = async (data: FormData) => {
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
        <div className="bg-[var(--cream)] rounded-3xl shadow-soft p-8 md:p-12">
          
          {/* Heading */}
          <h2 className="font-[Playfair_Display] text-3xl md:text-4xl text-[#0E1E2A]">
            Start a conversation with us
          </h2>

          <p className="mt-3 max-w-xl text-[#0E1E2A]/80 leading-relaxed">
            You don’t have to have the right words. Share whatever feels safe —
            we’ll take it from there.
          </p>

          {/* Success */}
          {isSubmitSuccessful && (
            <p className="mt-6 rounded-xl bg-[#B88933]/10 p-4 text-[#6A4A13]">
              Thank you for reaching out. We’ll get back to you within 24–48 hours.
            </p>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid gap-5"
          >
            {/* Name */}
            <input
              className="rounded-2xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-[#B88933]/40"
              placeholder="Your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}

            {/* Email / Phone */}
            <input
              className="rounded-2xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-[#B88933]/40"
              placeholder="Email or phone number"
              {...register("contact")}
            />
            {errors.contact && (
              <p className="text-sm text-red-500">{errors.contact.message}</p>
            )}

            {/* Preferred method */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#0E1E2A]/70">
                Preferred way to connect
              </label>
              <div className="flex gap-3">
                {["Email", "Call", "WhatsApp"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 cursor-pointer hover:bg-white"
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register("preferred")}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <textarea
              rows={5}
              className="rounded-2xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-[#B88933]/40"
              placeholder="What’s been on your mind?"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}

            {/* Submit */}
            <button
              disabled={isSubmitting}
              className="mt-4 self-start rounded-full bg-[#0E1E2A] px-6 py-3 text-white hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>

          {/* Note */}
          <p className="mt-8 text-sm text-[#0E1E2A]/60 max-w-md">
            All messages are confidential. We’ll respond within 24–48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

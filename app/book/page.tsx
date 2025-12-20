"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { studioInfo } from "../../lib/data";

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

/* ================= Page ================= */

export default function BookPage() {
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

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-14">
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
      <h1 className="font-display text-4xl">Book a Session</h1>
      <p className="mt-2 text-sm opacity-80">
        Tell us what you’re seeking support with. We’ll reply with available
        time slots and next steps.
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

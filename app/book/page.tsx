"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { studioInfo } from "../../lib/data";


const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  program: z.string(),
  message: z.string().min(5, "Tell us a little about what you’re looking for"),
});

type FormData = z.infer<typeof Schema>;

export default function BookPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-display text-4xl">Book a Session</h1>
      <p className="mt-2 text-sm opacity-80">
        Tell us what you’re seeking support with. We’ll reply with available
        time slots and next steps.
      </p>

      {isSubmitSuccessful && (
        <p className="mt-4 rounded-xl bg-tea/20 p-3 text-tea">
          Thank you. Please check your email soon for scheduling options.
        </p>
      )}

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
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          placeholder="Phone (optional)"
          {...register("phone")}
        />

        <select
          className="rounded-xl border border-black/10 bg-white px-4 py-3"
          {...register("program")}
        >
          <option>Individual Therapy</option>
          <option>Group Art Circle</option>
          <option>Fika / Support Group</option>
          <option>Workshops / Training</option>
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

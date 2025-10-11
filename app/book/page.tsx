"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const Schema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().optional(), program: z.string(), message: z.string().min(5) });


type FormData = z.infer<typeof Schema>;


export default function Book(){
const { register, handleSubmit, formState:{ errors, isSubmitSuccessful } } = useForm<FormData>({ resolver: zodResolver(Schema) });
const onSubmit = async (data: FormData) => {
// Formspree compatible POST (replace with your endpoint)
await fetch("https://formspree.io/f/your-id", { method: "POST", headers: {"Accept":"application/json"}, body: JSON.stringify(data) });
};


return (
<div className="mx-auto max-w-2xl px-4 py-14">
<h1 className="font-display text-4xl">Book a Session</h1>
<p className="mt-2 text-sm opacity-80">Pick a program and share a little context. We’ll email you a calendar link.</p>
{isSubmitSuccessful && <p className="mt-4 rounded-xl bg-tea/20 p-3 text-tea">Thanks! Check your inbox for scheduling options.</p>}
<form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
<input className="rounded-xl border border-black/10 bg-white px-4 py-3" placeholder="Your name" {...register("name")}/>
{errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
<input className="rounded-xl border border-black/10 bg-white px-4 py-3" placeholder="Email" {...register("email")}/>
<input className="rounded-xl border border-black/10 bg-white px-4 py-3" placeholder="Phone (optional)" {...register("phone")}/>
<select className="rounded-xl border border-black/10 bg-white px-4 py-3" {...register("program")}>
<option>Individual Therapy</option>
<option>Group Art Circle</option>
<option>Teens Program</option>
<option>Corporate Workshop</option>
</select>
<textarea className="rounded-xl border border-black/10 bg-white px-4 py-3" rows={5} placeholder="Anything you’d like to share" {...register("message")}/>
<button className="rounded-xl bg-ink px-5 py-3 text-white hover:opacity-90">Send</button>
</form>
<div className="mt-8 rounded-2xl bg-white p-5 shadow-soft">
<p className="text-sm opacity-80">Prefer instant booking? Use our scheduler:</p>
<a className="mt-2 inline-block rounded-xl bg-sand px-4 py-2 hover:bg-white hover:shadow-soft" href="https://calendar.google.com/" target="_blank">Open Google Calendar</a>
</div>
</div>
);
}
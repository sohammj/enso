const faqs = [
{ q: "What is art therapy?", a: "A form of psychotherapy that uses creative expression to explore feelings and foster growth." },
{ q: "Do I need to be an artist?", a: "Not at all! We focus on the process, not the outcome." },
{ q: "Do you offer online sessions?", a: "Yes, we have both in-person and online options." }
];
export default function FAQ(){
return (
<div className="mx-auto max-w-3xl px-4 py-14">
<h1 className="font-display text-4xl">Frequently Asked Questions</h1>
<div className="mt-6 space-y-4">
{faqs.map(f => (
<details key={f.q} className="group rounded-2xl bg-white p-5 shadow-soft">
<summary className="cursor-pointer list-none text-lg font-medium group-open:opacity-70">{f.q}</summary>
<p className="mt-2 text-sm opacity-80">{f.a}</p>
</details>
))}
</div>
</div>
);
}
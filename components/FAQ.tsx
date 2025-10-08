'use client'
import { useState } from 'react'

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
return (
<div className="grid gap-4">
{items.map((it, idx) => (
<FAQItem key={idx} q={it.q} a={it.a} />
))}
</div>
)
}

function FAQItem({ q, a }: { q: string; a: string }) {
const [open, setOpen] = useState(false)
return (
<div className="card">
<button className="w-full text-left flex justify-between items-center" onClick={() => setOpen(o => !o)}>
<span className="font-medium">{q}</span>
<span>{open ? '−' : '+'}</span>
</button>
{open && <p className="p mt-3">{a}</p>}
</div>
)
}

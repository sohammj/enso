'use client'
import { useState } from 'react'

export function ContactForm() {
const [status, setStatus] = useState<string | null>(null)

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault()
const form = e.currentTarget
const data = Object.fromEntries(new FormData(form).entries())


// If API route not configured, fallback to mailto
const to = process.env.NEXT_PUBLIC_CONTACT_FALLBACK || 'info@example.com'
try {
  const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  if (res.ok) {
    setStatus('Thanks! We will get back to you soon.')
    form.reset()
  } else {
    window.location.href = `mailto:${to}?subject=Website%20Enquiry&body=${encodeURIComponent(JSON.stringify(data, null, 2))}`
  }
} catch {
  window.location.href = `mailto:${to}?subject=Website%20Enquiry&body=${encodeURIComponent(JSON.stringify(data, null, 2))}`
}
}

return (
<form onSubmit={onSubmit} className="card grid gap-4">
<div className="grid md:grid-cols-2 gap-4">
<input required name="firstName" placeholder="First name" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
<input required name="lastName" placeholder="Last name" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
</div>
<input required type="email" name="email" placeholder="Email" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
<textarea required name="message" placeholder="Message" rows={5} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
<button className="btn w-fit">Send</button>
{status && <p className="p">{status}</p>}
</form>
)
}

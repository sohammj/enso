'use client'
import { useState } from 'react'

export default function NewsletterBar() {
  const [email, setEmail] = useState('')
  return (
    <div className="bg-surface-100 border-y border-black/5">
      <div className="container py-8 grid md:grid-cols-[1fr,auto] gap-4 items-center">
        <div>
          <div className="text-lg font-semibold">Get on the list</div>
          <div className="p">Perks include first dibs on program launches, new workshops, and more.</div>
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks!')}} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="rounded-2xl px-4 py-3 bg-white border border-black/10 min-w-[260px]"
          />
          <button className="btn">Sign me up</button>
        </form>
      </div>
    </div>
  )
}

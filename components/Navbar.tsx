'use client'
import Link from 'next/link'
import { useState } from 'react'

const primary = [
  { href: '/programs', label: 'Programs' },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
]

// These won’t show on desktop; just in the mobile sheet.
const more = [
  { href: '/contact', label: 'Contact' },
  { href: '/faq',     label: 'FAQ' },
  { href: '/gallery', label: 'Gallery' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/10">
      <div className="container flex items-center justify-between py-3">
        {/* Logo → acts as Home */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Enso" className="w-8 h-8" />
          <span className="font-semibold">Enso</span>
        </Link>

        {/* Desktop: ultra-minimal menu */}
        <nav className="hidden md:flex items-center gap-7">
          {primary.map(l => (
            <Link key={l.href} href={l.href} className="text-[var(--muted)] hover:text-[var(--ink)]">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right-aligned actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/book" className="btn">Book</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden btn">Menu</button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white/95">
          <div className="container py-4 grid gap-3">
            {primary.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[var(--ink)] text-lg"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <Link href="/book" className="btn w-fit mt-1" onClick={() => setOpen(false)}>Book</Link>

            <div className="pt-3 mt-2 border-t border-black/10">
              <div className="text-sm text-[var(--muted)] mb-2">More</div>
              <div className="grid gap-2">
                {more.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[var(--muted)]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

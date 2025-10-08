'use client'
import Link from 'next/link'
import { useState } from 'react'


const links = [
{ href: '/', label: 'Home' },
{ href: '/programs', label: 'Our Programs' },
{ href: '/services', label: 'Services' },
{ href: '/about', label: 'About' },
{ href: '/gallery', label: 'Gallery' },
{ href: '/faq', label: 'FAQ' },
{ href: '/contact', label: 'Contact' },
{ href: '/book', label: 'Book Online' },
]


export function Navbar() {
const [open, setOpen] = useState(false)
return (
<header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
<div className="container flex items-center justify-between py-3">
<Link href="/" className="flex items-center gap-3">
<img src="/logo.svg" alt="Logo" className="w-8 h-8" />
<span className="font-semibold">Enso</span>
</Link>
<nav className="hidden md:flex gap-6">
{links.map(l => (
<Link key={l.href} href={l.href} className="text-white/80 hover:text-white">{l.label}</Link>
))}
</nav>
<button onClick={() => setOpen(!open)} className="md:hidden btn">Menu</button>
</div>
{open && (
<div className="md:hidden border-t border-white/10 bg-black/70">
<div className="container py-4 grid gap-3">
{links.map(l => (
<Link key={l.href} href={l.href} className="text-white/90" onClick={() => setOpen(false)}>{l.label}</Link>
))}
</div>
</div>
)}
</header>
)
}
"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


const links = [
{ href: "/", label: "Home" },
{ href: "/programs", label: "Our Programs" },
{ href: "/gallery", label: "Gallery" },
{ href: "/book", label: "Book a Session" },
{ href: "/faq", label: "FAQ" },
{ href: "/about", label: "Our Journey" }
];


export function Nav() {
const [open, setOpen] = useState(false);
return (
<header className="fixed inset-x-0 top-0 z-50 bg-sand/80 backdrop-blur">
<nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
<Link href="/" className="font-display text-xl">enso</Link>
<div className="hidden gap-6 md:flex">
{links.map(l => (
<Link key={l.href} href={l.href} className="text-sm hover:opacity-80">{l.label}</Link>
))}
</div>
<button className="md:hidden" onClick={() => setOpen(v=>!v)} aria-label="Menu">
{open ? <XMarkIcon className="h-6 w-6"/> : <Bars3Icon className="h-6 w-6"/>}
</button>
</nav>
{open && (
<div className="md:hidden">
<div className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-soft">
{links.map(l => (
<Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="block rounded-xl px-3 py-2 hover:bg-sand">{l.label}</Link>
))}
</div>
</div>
)}
</header>
);
}
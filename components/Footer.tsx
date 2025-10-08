import Link from 'next/link'

export function Footer() {
return (
<footer className="border-t border-white/10 mt-16">
<div className="container py-10 grid md:grid-cols-3 gap-8">
<div>
<div className="flex items-center gap-3 mb-4">
<img src="/logo.svg" alt="Logo" className="w-8 h-8" />
<span className="font-semibold">Enso Mind Matters</span>
</div>
<p className="p">3 United House, Manmala Tank Rd, Mahim, Mumbai 400016 (placeholder)</p>
<p className="p mt-2">Email: <a href="mailto:info@example.com" className="link">info@example.com</a></p>
</div>
<div>
<h4 className="h3 mb-3">Quick Links</h4>
<ul className="grid gap-2">
<li><Link href="/programs" className="link">Programs</Link></li>
<li><Link href="/services" className="link">Services</Link></li>
<li><Link href="/faq" className="link">FAQ</Link></li>
<li><Link href="/book" className="link">Book Online</Link></li>
</ul>
</div>
<div>
<h4 className="h3 mb-3">Stay in touch</h4>
<div className="flex gap-3">
<a href="#" className="badge">Instagram</a>
<a href="#" className="badge">LinkedIn</a>
<a href="#" className="badge">WhatsApp</a>
</div>
</div>
</div>
<div className="border-t border-white/10">
<div className="container py-6 text-sm text-white/60">© {new Date().getFullYear()} Enso Mind Matters — All rights reserved.</div>
</div>
</footer>
)
}

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.svg" alt="Enso" className="w-8 h-8" />
            <span className="font-semibold">Enso Mind Matters</span>
          </div>
          <p className="p">Mumbai, India (placeholder)</p>
          <p className="p mt-2">
            Email: <a href="mailto:info@example.com" className="underline underline-offset-4">info@example.com</a>
          </p>
        </div>

        <div>
          <h4 className="h3 mb-3">Explore</h4>
          <ul className="grid gap-2">
            <li><Link href="/programs" className="underline underline-offset-4">Programs</Link></li>
            <li><Link href="/services" className="underline underline-offset-4">Services</Link></li>
            <li><Link href="/about" className="underline underline-offset-4">About</Link></li>
            <li><Link href="/book" className="underline underline-offset-4">Book</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="h3 mb-3">More</h4>
          <ul className="grid gap-2">
            <li><Link href="/contact" className="underline underline-offset-4">Contact</Link></li>
            <li><Link href="/faq" className="underline underline-offset-4">FAQ</Link></li>
            <li><Link href="/gallery" className="underline underline-offset-4">Gallery</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="container py-6 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} Enso Mind Matters — All rights reserved.
        </div>
      </div>
    </footer>
  )
}

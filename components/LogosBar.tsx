type Logo = { src: string; alt: string }

const logos: Logo[] = [
  { src: '/partners/partner-1.png', alt: 'Partner 1' },
  { src: '/partners/partner-2.png', alt: 'Partner 2' },
  { src: '/partners/partner-3.png', alt: 'Partner 3' },
  { src: '/partners/partner-4.png', alt: 'Partner 4' },
  { src: '/partners/partner-5.png', alt: 'Partner 5' },
  { src: '/partners/partner-6.png', alt: 'Partner 6' },
  { src: '/partners/partner-7.png', alt: 'Partner 7' },
  { src: '/partners/partner-8.png', alt: 'Partner 8' },
]

export default function LogosBar() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2 mb-6">Trusted by</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
          {logos.map((l, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/5 grid place-items-center p-6">
              <img src={l.src} alt={l.alt} className="max-h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

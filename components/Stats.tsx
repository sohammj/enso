const items = [
  { value: '5000+', label: 'Fruitful sessions per year' },
  { value: '6+', label: 'Years of experience' },
  { value: '1000+', label: 'Workshops & trainings' },
  { value: '500+', label: 'Satisfied clients' },
]

export default function Stats() {
  return (
    <section className="section bg-surface-100">
      <div className="container grid md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className="card text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-[var(--brand)]">{it.value}</div>
            <div className="p mt-1">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

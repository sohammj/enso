import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { ProgramGrid } from '../components/ProgramGrid'
import { ServiceGrid } from '../components/ServiceGrid'

export default function HomePage() {
return (
<>
<Hero />
<Section id="programs" title="Our Programs" subtitle="Community-led support and growth spaces.">
<ProgramGrid />
</Section>
<Section id="services" title="Services" subtitle="Evidence-informed, person-centered care.">
<ServiceGrid />
</Section>
<Section id="testimonials" title="Testimonials" subtitle="Replace with real client testimonials (with permission).">
<div className="grid md:grid-cols-3 gap-6">
{[1,2,3].map(n => (
<div key={n} className="card">
<p className="p">“Short testimonial goes here as placeholder.”</p>
<p className="mt-3 text-sm text-white/60">— Anon</p>
</div>
))}
</div>
</Section>
<Section id="cta">
<div className="card flex flex-col md:flex-row items-center justify-between gap-6">
<div>
<h3 className="h3">Ready to begin?</h3>
<p className="p mt-2">Book your first session or explore group programs.</p>
</div>
<div className="flex gap-3">
<a className="btn" href="/book">Book Online</a>
<a className="btn bg-white/10 hover:bg-white/20" href="/contact">Contact</a>
</div>
</div>
</Section>
</>
)
}

import { services } from '../lib/data'
import { Card } from './Card'

export function ServiceGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map(s => (
        <Card 
          key={s.slug} 
          title={s.title} 
          body={s.excerpt} 
          cta="Read more" 
          href={`/services/${s.slug}`}  // Fixed: changed / to `
        />
      ))}
    </div>
  )
}
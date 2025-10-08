import { programs } from '../lib/data'
import { Card } from './Card'

export function ProgramGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {programs.map(p => (
        <Card 
          key={p.slug} 
          title={p.title} 
          body={p.excerpt} 
          cta="Read more" 
          href={`/programs/${p.slug}`}  // Fixed: changed / to ` 
        />
      ))}
    </div>
  )
}
// app/programs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { programs } from '../../../lib/data'
import { titleCase } from '../../../lib/utils'

export default function ProgramDetail(props: any) {
  const { slug } = props.params || {}
  const program = programs.find(p => p.slug === slug)
  if (!program) return notFound()
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <span className="badge">Program</span>
        <h1 className="h1 mt-3">{program.title || titleCase(slug)}</h1>
        <p className="p mt-4">{program.body}</p>
      </div>
    </div>
  )
}

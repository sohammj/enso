import { notFound } from 'next/navigation'
import { programs } from '../../../lib/data'
import { titleCase } from '../../../lib/utils'

export default function ProgramDetail({ params }: { params: { slug: string } }) {
const program = programs.find(p => p.slug === params.slug)
if (!program) return notFound()
return (
<div className="section">
<div className="container max-w-3xl">
<span className="badge">Program</span>
<h1 className="h1 mt-3">{program.title || titleCase(params.slug)}</h1>
<p className="p mt-4">{program.body}</p>
</div>
</div>
)
}

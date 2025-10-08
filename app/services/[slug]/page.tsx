import { notFound } from 'next/navigation'
import { services } from '../../../lib/data'
import { titleCase } from '../../../lib/utils'

export default function ServiceDetail({ params }: { params: { slug: string } }) {
const service = services.find(s => s.slug === params.slug)
if (!service) return notFound()
return (
<div className="section">
<div className="container max-w-3xl">
<span className="badge">Service</span>
<h1 className="h1 mt-3">{service.title || titleCase(params.slug)}</h1>
<p className="p mt-4">{service.body}</p>
</div>
</div>
)
}

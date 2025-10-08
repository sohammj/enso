import { FAQ } from '../../components/FAQ'
import { faqItems } from '../../lib/data'

export default function FAQPage() {
return (
<div className="section">
<div className="container max-w-3xl">
<h1 className="h1">FAQ</h1>
<div className="mt-6">
<FAQ items={faqItems} />
</div>
</div>
</div>
)
}

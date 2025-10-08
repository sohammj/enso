import { ContactForm } from '../../components/ContactForm'

export default function ContactPage() {
return (
<div className="section">
<div className="container grid md:grid-cols-2 gap-10">
<div>
<h1 className="h1">Contact</h1>
<p className="p mt-4">Share address, directions, and session modalities here.</p>
<div className="card mt-6">
<p className="p">3 United House, Manmala Tank Rd, Mahim (placeholder)</p>
<p className="p mt-2">Email: info@example.com • Phone: +91-00000 00000</p>
</div>
</div>
<ContactForm />
</div>
</div>
)
}

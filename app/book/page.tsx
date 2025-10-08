import { BookingWidget } from '../../components/BookingWidget'

export default function BookPage() {
return (
<div className="section">
<div className="container">
<h1 className="h1">Book Online</h1>
<p className="p mt-4">If you have a Google Appointment Schedule link, set <code>NEXT_PUBLIC_APPOINTMENT_URL</code> to embed it here.</p>
<div className="mt-6">
<BookingWidget />
</div>
</div>
</div>
)
}

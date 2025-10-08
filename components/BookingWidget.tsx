export function BookingWidget() {
  const link = process.env.NEXT_PUBLIC_APPOINTMENT_URL
  if (link) {
    return (
      <div className="card">
        <iframe src={link} className="w-full h-[80vh] rounded-2xl" title="Booking" />
      </div>
    )
  }
  return (
    <div className="card">
      <h3 className="h3">Booking coming soon</h3>
      <p className="p mt-2">Share your Google Appointment Schedule/Calendly link in <code>NEXT_PUBLIC_APPOINTMENT_URL</code> to enable embedded booking. Until then, visitors can use the contact form.</p>
    </div>
  )
}
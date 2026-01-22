
import { fetchReturningClientBookingPage } from "@/sanity/lib/fetchReturningClientBookingPage";
import ReturningClientBookingClient from "./ReturningClientBookingClient";

export default async function ReturningClientBookingPage() {
  const data = await fetchReturningClientBookingPage();

  if (!data) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">Returning Client Booking Page</h1>
          <p className="mt-3 opacity-80">
            The Sanity document for this page hasn't been created yet.
            Create "Returning Client Booking Page" in Studio first.
          </p>
        </div>
      </main>
    );
  }

  return <ReturningClientBookingClient data={data} />;
}
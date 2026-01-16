import { fetchPrivateBookingPage } from "@/sanity/lib/fetchPrivateBookingPage";
import PrivateBookingClient from "./PrivateBookingClient";

export default async function PrivateBookingPage() {
  const data = await fetchPrivateBookingPage();

  // If the Sanity doc is not created yet, avoid crashing:
  if (!data) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">Private Booking Page</h1>
          <p className="mt-3 opacity-80">
            The Sanity document for this page hasn’t been created yet.
            Create “Private Booking Page” in Studio first.
          </p>
        </div>
      </main>
    );
  }

  return <PrivateBookingClient data={data} />;
}

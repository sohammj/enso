import { fetchNewClientBookingPage } from "@/sanity/lib/fetchNewClientBookingPage";
import NewClientBookingClient from "./NewClientBookingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Client Booking",
  robots: { index: false, follow: false },
};

export default async function NewClientBookingPage() {
  const data = await fetchNewClientBookingPage();

  if (!data) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">New Client Booking Page</h1>
          <p className="mt-3 opacity-80">
            The Sanity document for this page hasn't been created yet.
            Create "New Client Booking Page" in Studio first.
          </p>
        </div>
      </main>
    );
  }

  return <NewClientBookingClient data={data} />;
}

import ServicesClient from "./ServicesClient";
import { fetchServices } from "@/sanity/lib/fetchServices";
import { staticMetadata } from "@/lib/seo";

export const metadata = staticMetadata(
  "Counselling & Art Therapy Services in Mumbai",
  "Explore individual counselling, group sessions, arts-based therapy, workshops and mental health training from Enso Mind Matters.",
  "/services",
);

export default async function ServicesPage() {
  const services = await fetchServices();
  return <ServicesClient services={services} />;
}

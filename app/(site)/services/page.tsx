import ServicesClient from "./ServicesClient";
import { fetchServices } from "@/sanity/lib/fetchServices";

export default async function ServicesPage() {
  const services = await fetchServices();
  return <ServicesClient services={services} />;
}

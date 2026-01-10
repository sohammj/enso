import { notFound } from "next/navigation";
import ServiceClient from "./ServiceClient";
import { fetchServiceBySlug } from "@/sanity/lib/fetchServiceBySlug";

export default async function ServiceSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await fetchServiceBySlug(params.slug);
  if (!service) return notFound();
  return <ServiceClient service={service} />;
}

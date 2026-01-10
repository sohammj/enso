import { notFound } from "next/navigation";
import ServiceClient from "./ServiceClient";
import { fetchServiceBySlug } from "@/sanity/lib/fetchServiceBySlug";

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await fetchServiceBySlug(slug);
  if (!service) return notFound();

  return <ServiceClient service={service} />;
}

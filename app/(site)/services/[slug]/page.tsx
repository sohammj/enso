import { notFound } from "next/navigation";
import ServiceClient from "./ServiceClient";
import { fetchServiceBySlug } from "@/sanity/lib/fetchServiceBySlug";
import type { Metadata } from "next";
import { documentMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);
  return documentMetadata(service, `/services/${slug}`, "Service");
}

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

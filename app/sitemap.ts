import type { MetadataRoute } from "next";
import { fetchPrograms } from "@/sanity/lib/fetchPrograms";
import { fetchServices } from "@/sanity/lib/fetchServices";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, programs] = await Promise.all([
    fetchServices(),
    fetchPrograms(),
  ]);

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/programs", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/start-a-conversation", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services
      .filter((service) => service.slug && !service.noIndex)
      .map((service) => ({
        url: absoluteUrl(`/services/${service.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...programs
      .filter((program) => program.slug && !program.noIndex)
      .map((program) => ({
        url: absoluteUrl(`/programs/${program.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}

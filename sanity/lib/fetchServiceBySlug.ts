import type { Service } from "./types";
import { client } from "./client";
import { SERVICE_BY_SLUG_QUERY } from "./queries";

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  const service = await client.fetch<Service | null>(
    SERVICE_BY_SLUG_QUERY,
    { slug },
    {
      next: { tags: ["sanity", "services", `service:${slug}`] },
      revalidate: 86400,
    } as any
  );

  return service ?? null;
}

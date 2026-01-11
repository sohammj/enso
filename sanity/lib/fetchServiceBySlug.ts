import { fetchFromSanity } from "./fetch";
import { SERVICE_BY_SLUG_QUERY } from "./queries";
import type { Service } from "./types";

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  const data = await fetchFromSanity<Service | null>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["services", `service:${slug}`],
  });
  return data ?? null;
}

import { fetchFromSanity } from "./fetch";
import { SERVICES_QUERY } from "./queries";
import type { Service } from "./types";

export async function fetchServices(): Promise<Service[]> {
  const data = await fetchFromSanity<Service[]>({
    query: SERVICES_QUERY,
    tags: ["services"],
  });
  return data ?? [];
}

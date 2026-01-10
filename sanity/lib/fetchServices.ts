import type { Service } from "./types";
import { client } from "./client";
import { SERVICES_QUERY } from "./queries";

export async function fetchServices(): Promise<Service[]> {
  const services = await client.fetch<Service[]>(SERVICES_QUERY);
  return services || [];
}

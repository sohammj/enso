import { client } from "./client";
import { FAQ_PAGE_QUERY } from "./queries";
import type { FAQPageData } from "./types";

export async function fetchFAQPage(): Promise<FAQPageData | null> {
  try {
    const data = await client.fetch<FAQPageData | null>(FAQ_PAGE_QUERY);
    return data ?? null;
  } catch (e) {
    console.error("fetchFAQPage error:", e);
    return null;
  }
}

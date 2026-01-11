import { client } from "./client";
import { FAQ_PAGE_QUERY } from "./queries";
import type { FAQPageData } from "./types";

export async function fetchFAQPage(): Promise<FAQPageData | null> {
  try {
    const data = await client.fetch<FAQPageData | null>(
      FAQ_PAGE_QUERY,
      {},
      {
        next: { tags: ["sanity", "faq"] },
        revalidate: 21600,
      } as any
    );

    return data ?? null;
  } catch (e) {
    console.error("fetchFAQPage error:", e);
    return null;
  }
}

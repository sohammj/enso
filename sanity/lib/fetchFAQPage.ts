import { fetchFromSanity } from "./fetch";
import { FAQ_PAGE_QUERY } from "./queries";
import type { FAQPageData } from "./types";

export async function fetchFAQPage(): Promise<FAQPageData | null> {
  try {
    const data = await fetchFromSanity<FAQPageData | null>({
      query: FAQ_PAGE_QUERY,
      tags: ["faq"],
    });
    return data ?? null;
  } catch (e) {
    console.error("fetchFAQPage error:", e);
    return null;
  }
}

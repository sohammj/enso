import { client } from "./client";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePageData } from "./types";

export async function fetchHomePage(): Promise<HomePageData | null> {
  try {
    const data = await client.fetch<HomePageData | null>(
      HOME_PAGE_QUERY,
      {},
      {
        next: { tags: ["sanity", "home"] },
        revalidate: 86400,
      } as any
    );

    return data ?? null;
  } catch (e) {
    console.error("fetchHomePage error:", e);
    return null;
  }
}

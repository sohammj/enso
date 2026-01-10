import { client } from "./client";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePageData } from "./types";

export async function fetchHomePage(): Promise<HomePageData | null> {
  try {
    const data = await client.fetch<HomePageData | null>(HOME_PAGE_QUERY, {}, {
      // Next.js caching control:
      // Use "force-cache" if you want it cached; "no-store" while developing.
      // NOTE: in Sanity v4 client, the fetch options are different depending on setup;
      // if this causes TS issues, remove the 3rd argument entirely.
      // cache: "no-store",
    } as any);

    return data ?? null;
  } catch (e) {
    console.error("fetchHomePage error:", e);
    return null;
  }
}

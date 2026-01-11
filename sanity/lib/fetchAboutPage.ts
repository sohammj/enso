import { client } from "./client";
import { ABOUT_PAGE_QUERY } from "./queries";
import type { AboutPageData } from "./types";

export async function fetchAboutPage(): Promise<AboutPageData | null> {
  try {
    const data = await client.fetch<AboutPageData | null>(
      ABOUT_PAGE_QUERY,
      {},
      {
        next: { tags: ["sanity", "about"] },
        revalidate: 21600, // fallback: 1 day
      } as any
    );

    return data ?? null;
  } catch (e) {
    console.error("fetchAboutPage error:", e);
    return null;
  }
}
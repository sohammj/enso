import { fetchFromSanity } from "./fetch";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePageData } from "./types";

export async function fetchHomePage(): Promise<HomePageData | null> {
  try {
    const data = await fetchFromSanity<HomePageData | null>({
      query: HOME_PAGE_QUERY,
      tags: ["home"],
    });
    return data ?? null;
  } catch (e) {
    console.error("fetchHomePage error:", e);
    return null;
  }
}

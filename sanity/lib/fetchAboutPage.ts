import { fetchFromSanity } from "./fetch";
import { ABOUT_PAGE_QUERY } from "./queries";
import type { AboutPageData } from "./types";

export async function fetchAboutPage(): Promise<AboutPageData | null> {
  try {
    const data = await fetchFromSanity<AboutPageData | null>({
      query: ABOUT_PAGE_QUERY,
      tags: ["about"],
    });
    return data ?? null;
  } catch (e) {
    console.error("fetchAboutPage error:", e);
    return null;
  }
}

import { fetchFromSanity } from "./fetch";
import { PROGRAM_BY_SLUG_QUERY } from "./queries";
import type { Program } from "./types";

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const data = await fetchFromSanity<Program | null>({
      query: PROGRAM_BY_SLUG_QUERY,
      params: { slug },
      tags: ["programs", `program:${slug}`],
    });
    return data ?? null;
  } catch (e) {
    console.error("fetchProgramBySlug error:", e);
    return null;
  }
}

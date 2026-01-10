import { client } from "./client";
import { PROGRAM_BY_SLUG_QUERY } from "./queries";
import type { Program } from "./types";

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const data = await client.fetch<Program | null>(
      PROGRAM_BY_SLUG_QUERY,
      { slug },
      {} as any
    );
    return data ?? null;
  } catch (e) {
    console.error("fetchProgramBySlug error:", e);
    return null;
  }
}

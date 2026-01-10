import { client } from "./client";
import { PROGRAMS_QUERY } from "./queries";
import type { Program } from "./types";

export async function fetchPrograms(): Promise<Program[]> {
  try {
    const data = await client.fetch<Program[]>(PROGRAMS_QUERY, {}, {} as any);
    return data ?? [];
  } catch (e) {
    console.error("fetchPrograms error:", e);
    return [];
  }
}

import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("sanity"); // ✅ clears all sanity-tagged fetches

  return NextResponse.json({ ok: true });
}

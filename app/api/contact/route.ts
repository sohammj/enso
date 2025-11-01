// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO:
    // - Send to Resend / SendGrid transactional email to info inbox
    // - and/or push to Notion/Airtable
    console.log("Contact form submission:", body);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse("Error", { status: 500 });
  }
}

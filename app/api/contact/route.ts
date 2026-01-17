import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function renderTemplate(template: string, vars: Record<string, string>) {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    // replace ALL occurrences without replaceAll (Vercel TS lib issue)
    out = out.split(`{{${k}}}`).join(v);
  }
  return out;
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const contact = String(body?.contact ?? "").trim(); // can be email or phone
    const preferred = String(body?.preferred ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !contact || !preferred || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const toAdmin = process.env.CONTACT_TO_EMAIL;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (!toAdmin || !user || !pass || !from) {
      return NextResponse.json({ ok: false, error: "Email env not set" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // 1) Mail to admin
    await transporter.sendMail({
      from,
      to: toAdmin,
      subject: `ENSO: New form submission — ${name}`,
      text: [
        `Name: ${name}`,
        `Contact: ${contact}`,
        `Preferred: ${preferred}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      // If they entered a real email, replying will go to them
      replyTo: isEmail(contact) ? contact : undefined,
    });

    // 2) Auto-reply to client (ONLY if contact is email)
    if (isEmail(contact)) {
      const subject = process.env.AUTO_REPLY_SUBJECT || "We received your message";
      const template = process.env.AUTO_REPLY_BODY || "Hi {{name}},\n\nThanks for reaching out.\n\n— ENSO";

      const text = renderTemplate(template, { name }).replace(/\\n/g, "\n");


      await transporter.sendMail({
        from,
        to: contact,
        subject,
        text,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

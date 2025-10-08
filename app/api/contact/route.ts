import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
try {
const body = await req.json()
// TODO: Wire up your email provider or DB here
// e.g., Resend/Mailgun/SendGrid or persist to a Notion/Airtable/Sheets webhook
console.log('Contact form:', body)
return NextResponse.json({ ok: true })
} catch (e) {
return new NextResponse('Error', { status: 500 })
}
}

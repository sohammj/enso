// import { Resend } from "resend";

// // const resend = new Resend(process.env.RESEND_API_KEY);
// let resend: Resend | null = null;

// function getResend() {
//   if (!process.env.RESEND_API_KEY) return null;
//   if (!resend) {
//     resend = new Resend(process.env.RESEND_API_KEY);
//   }
//   return resend;
// }


// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, contact, preferred, message } = body;

//     if (!name || !contact || !message) {
//       return new Response("Missing fields", { status: 400 });
//     }

//     /* =========================
//        1️⃣ EMAIL TO YOU (ADMIN)
//     ========================== */
//     await resend.emails.send({
//       from: "ENSO <no-reply@ensomindmatters.com>",
//       to: [process.env.CONTACT_TO_EMAIL!],
//       subject: `New conversation from ${name}`,
//       html: `
//         <div style="font-family: Georgia, serif; line-height: 1.6">
//           <h2>New conversation request</h2>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Contact:</strong> ${contact}</p>
//           <p><strong>Preferred:</strong> ${preferred}</p>
//           <p><strong>Message:</strong></p>
//           <p>${message.replace(/\n/g, "<br/>")}</p>
//         </div>
//       `,
//     });

//     /* =========================
//        2️⃣ AUTO-REPLY TO USER (STEP 6)
//     ========================== */
//     // Only send auto-reply if contact looks like an email
//     if (contact.includes("@")) {
//       await resend.emails.send({
//         from: "ENSO <no-reply@ensomindmatters.com>",
//         to: [contact],
//         subject: "We’ve received your message",
//         html: `
//           <div style="font-family: Georgia, serif; line-height: 1.6">
//             <p>Dear ${name},</p>

//             <p>
//               Thank you for reaching out to ENSO.
//               We’ve received your message and will respond
//               within <strong>24–48 hours</strong>.
//             </p>

//             <p>
//               Until then, take care and be gentle with yourself.
//             </p>

//             <p>
//               Warmly,<br/>
//               <strong>ENSO</strong>
//             </p>
//           </div>
//         `,
//       });
//     }

//     return Response.json({ success: true });

//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to send message", { status: 500 });
//   }
// }

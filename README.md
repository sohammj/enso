```md
# Enso Mind Matters — Remake (Next.js + Tailwind)


Clean-room remake of https://www.ensomindmatters.com/ with modern stack. All text/images here are placeholders. Replace with client-approved assets.


## Tech
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion


## Quick Start
```bash
# 1) Create the project folder and copy files
# (paste the repository contents into a new folder)


# 2) Install deps
npm i


# 3) Run dev server
npm run dev
# open http://localhost:3000
```


## Environment
Copy `.env.example` to `.env.local` and set values as needed.


- `NEXT_PUBLIC_APPOINTMENT_URL` — public booking link (e.g., Google Appointment Schedules or Calendly). If set, booking page iframes it.
- `CONTACT_FORM_TO` — email address to receive contact form submissions (if you wire the API route); otherwise the form will fall back to `mailto:`.


## Deploy
- Vercel: push to GitHub and import; or `vercel` CLI.


## Notes on Copyright
- Do **not** copy text/images from the reference site without explicit permission.
- Replace placeholders in `lib/data.ts` and `public/`.
```
```

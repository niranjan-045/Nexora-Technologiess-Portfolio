# Nexora Technologies — Next.js Rebuild

Same site, same admin panel, same Firebase/Cloudinary backend — rebuilt with
**Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

## What changed vs. the original
- Pure HTML/CSS/vanilla-JS → typed React components, same visual identity
  (orange/amber brand, same sections) with smoother scroll-reveal, hover and
  page-load animations (Framer Motion) instead of AOS.
- Logic is unchanged: same Firestore collections (`settings`, `services`,
  `skills`, `process`, `faq`, `portfolio`, `reviews`), same fallback content
  when Firestore is empty/offline, same Cloudinary upload flow, same
  Firebase Auth–gated admin dashboard with identical CRUD sections.

## Run locally
```bash
npm install
npm run dev
```
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin
- Admin dashboard (after login): http://localhost:3000/admin/dashboard

## Build for production
```bash
npm run build
npm start
```

## Project structure
```
app/
  page.tsx                 → public homepage
  admin/page.tsx            → admin login
  admin/dashboard/page.tsx  → admin dashboard (protected)
  layout.tsx, globals.css
components/
  site/                     → public site sections
  admin/                    → sidebar, CRUD modals, dashboard sections
lib/
  firebase.ts               → Firebase config (same project as original)
  cloudinary.ts             → Cloudinary config (same cloud/preset)
  useSiteData.ts             → public-site Firestore fetch + fallback
  useAdminData.ts            → admin CRUD operations
  fallback-data.ts           → default content shown if Firestore is empty
  types.ts
```

## Notes
- Firebase config, Cloudinary cloud name/preset, and Firestore security
  rules are unchanged from the original `nexora-user` / `nexora-admin`
  projects — see each project's `FIRESTORE_AND_STORAGE_RULES.txt` if you
  need to reapply them.
- Fonts (Space Grotesk / Poppins / Inter) load via a Google Fonts `<link>`
  tag in `app/layout.tsx`. If you prefer `next/font/google` (auto-hosted,
  no external request at runtime), swap it in — it was avoided here only
  because this sandbox's network egress doesn't allow
  `fonts.googleapis.com` at build time.

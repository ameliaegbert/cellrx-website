# CellRX Website TODO

## Completed
- [x] Full website built (Home, About, Services, Black Label, Blog, Contact)
- [x] Ken Burns hero animation with injection photo
- [x] Team photos (Amelia, Samantha, David) with correct cropping
- [x] SEO: JSON-LD structured data, robots.txt, sitemap.xml, llms.txt
- [x] GitHub Pages deployment with CNAME (www.cellrx.bio)
- [x] Navigation restructured (logo clickable, CONCIERGE MEDICINE link)
- [x] Upgrade project to full-stack (web-db-user) for backend API

## In Progress
- [x] Add GHL contact submission tRPC mutation in server/routers.ts
- [ ] Store GHL API key as secret (GHL_API_KEY) — needs user to provide from GHL dashboard
- [x] Update Contact.tsx form to call tRPC mutation instead of local state
- [x] Tag contacts: "Stem Cell Prospect" vs "Black Label Prospect" based on service
- [x] Add owner notification on new lead submission
- [ ] Save checkpoint and provide webhook URL to user
- [x] Run pnpm db:push to sync schema
- [x] Write vitest for contact submission mutation (8/8 tests passing)

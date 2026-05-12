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
- [x] Store GHL API key as secret (GHL_API_KEY) — full-scope private integration created in GHL
- [x] Update Contact.tsx form to call tRPC mutation instead of local state
- [x] Tag contacts: "Stem Cell Prospect" vs "Black Label Prospect" based on service
- [x] Add owner notification on new lead submission
- [x] Save checkpoint and site live at cellrx.bio with GHL integration active
- [x] Run pnpm db:push to sync schema
- [x] Write vitest for contact submission mutation (8/8 tests passing)

## Tier 1 Website Improvements (Competitive Audit)
- [x] Wire /testimonials route in App.tsx (page exists, currently redirects to home)
- [x] Add /blog/:slug route for individual blog post pages
- [x] Build BlogPost.tsx page component with full article content for all 7 articles
- [x] Build /health-optimization service page (footer link currently goes nowhere)
- [x] Build /longevity-programs service page (footer link currently goes nowhere)
- [x] Add GHL calendar embed UI to Contact page (live with calendar ID ObJ0Y5tw59PrShIJKowv)
- [x] Update Footer.tsx to add health-optimization and longevity-programs links properly
- [x] Update Blog.tsx article cards to link to /blog/:slug instead of showing toast
- [x] Update Home.tsx "View All Patient Stories" CTA to link to /testimonials

## GHL Automations (API Scopes Upgraded)
- [x] Update welcome SMS in contact router to include direct calendar booking link
- [x] Verify new GHL API scopes (workflows, opportunities, calendars, tags)
- [x] Inspect existing GHL workflows (New Lead Form Submitted, Stem Cell Monthly Nurture) for gaps
- [x] Build Stem Cell 5-day prospect nurture sequence (server-side, enqueues on form submit)
- [x] Build Black Label 5-day prospect nurture sequence (server-side, enqueues on form submit)
- [x] Build appointment confirmation + 48hr + 2hr reminder workflow (enqueueAppointmentReminders helper ready)
- [x] Build post-consultation no-show re-engagement workflow (enqueueNoShowSequence helper ready)
- [x] Create 7-stage Opportunities pipeline via GHL API (Patient Pipeline already exists with correct stages)
- [ ] Update sitemap.xml with 9 new pages
- [ ] Register hourly heartbeat cron for /api/scheduled/nurture after deploy (requires live production URL)
- [ ] Wire appointment-booked webhook/event to call enqueueAppointmentReminders (requires GHL webhook or calendar event trigger)
- [ ] Wire no-show detection to call enqueueNoShowSequence (requires GHL appointment status webhook)

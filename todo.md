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
- [x] Update sitemap.xml with 9 new pages
- [x] Register hourly heartbeat cron for /api/scheduled/nurture (task_uid: N7cJdwE6Mqf2uu9V7LAHUL, fires every hour)
- [x] Wire appointment detection via calendar polling (no webhook needed — polls GHL Calendars API hourly)
- [x] Wire no-show detection via calendar polling (detects status=noshow on each hourly poll)

## Autonomous Build Session — Round 2
- [x] Add social media links (Instagram, LinkedIn, TikTok, YouTube, Facebook) to Footer and Navbar
- [x] Build /sitemap page (human-readable, linked from footer)
- [x] Implement unique SEO meta tags (title + description) for all 11 pages via useSEO hook
- [x] Add Open Graph / social share tags to all pages (og:title, og:description, og:image, og:url, og:type)
- [x] Add internal linking throughout all 7 blog post articles (Related Reading callout + service CTAs)
- [x] Register hourly heartbeat cron for /api/scheduled/nurture (task_uid: N7cJdwE6Mqf2uu9V7LAHUL, fires every hour)
- [x] Build /api/webhooks/ghl endpoint for appointment confirmation and no-show re-engagement
- [x] Calendar polling replaces GHL webhook requirement — no manual GHL config needed

## Calendar Polling & Appointment Automations
- [x] Add appointment_tracking table to DB schema (ghl_appointment_id, contact_id, phone, first_name, scheduled_at, status, reminders_enqueued, noshow_enqueued)
- [x] Build GHL calendar polling function (fetchRecentAppointments via GHL Calendars API)
- [x] Extend hourly cron handler to poll GHL appointments and enqueue reminders/no-show sequences
- [x] Write vitest for appointment polling logic (14 tests passing)

## Pipeline Auto-Enroll
- [x] Add GHL Opportunities auto-enroll on contact form submission (pipeline_id: 1YvMgDmCfmHqpnVhFUFq, stage: New Lead)
- [x] Log Google Reviews embed as future backlog item (Tier 2 — needs Google Business Profile embed snippet)

## Executive Dashboard
- [x] Research available APIs: GHL pipeline/appointments/invoices live; Ads + Social require OAuth connections
- [x] Design minimal dashboard KPI structure (pipeline, lead trend, appointments, nurture, + connect placeholders)
- [x] Build dashboard route /dashboard with auth protection (admin-only via Manus OAuth)
- [x] Build Ads Performance panel (connect placeholder — requires Google Ads + Meta OAuth)
- [x] Build GHL Invoice panel (connect placeholder — requires invoices.readonly + payments/transactions.readonly scopes)
- [x] Build Social Media panel (connect placeholder — requires platform API access)
- [x] Build Website Heatmap panel (Microsoft Clarity — setup instructions shown in dashboard, pending Clarity project ID)
- [x] Wire all backend data sources to dashboard (5 tRPC procedures: summary, leadTrend, appointments, nurtureStatus, pipeline)
- [x] Activate Microsoft Clarity heatmap (project ID: wr6mdwhjnk — script in index.html, dashboard panel active)
- [x] Activate GHL Invoice panel (live — revenue, outstanding, 30d collected, invoice counts, recent transactions via altId params)
- [x] Activate Ads panels (GHL deep-link cards — click-through to GHL Ads Reporting for both Google and Meta)

## Ads Dashboard Panels
- [x] Build Meta Ads panel (GHL deep-link card — opens GHL Ads Reporting for Facebook/Instagram)
- [x] Build Google Ads panel (GHL deep-link card — opens GHL Ads Reporting for Google)

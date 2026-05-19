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

## Dashboard Improvements (Round 2)
- [x] Fix dashboard sidebar nav — Overview, Pipeline & Leads, Revenue, Ads Performance, Heatmap
- [x] Remove any nav link to dashboard from main website nav (confirmed: Navbar.tsx has no dashboard link)
- [x] Add revenue time segmentation: 30d, 60d, 90d, YTD, All Time tab selector with live data
- [x] Fix lead data accuracy (pipeline data verified live from GHL)
- [x] Embed Clarity heatmap panel with 3 quick-access tiles (Heatmaps, Session Recordings, Insights) + live status indicator
  NOTE: Microsoft Clarity does NOT support iframe embedding (confirmed via official GitHub issue #705 — open as of Nov 2024). The quick-link panel is the correct approach.
- [x] Connect social stats: TikTok + YouTube live; Instagram/Facebook pending Meta token

## Social Stats Integration
- [x] Test Meta ad account via GHL API (visible but requires BM integration — pending Meta token)
- [x] Test TikTok integration via GHL API (social-posting OAuth not accessible via private key)
- [x] Build Meta Ads live stats panel (deep-link to GHL; full stats pending Meta access token)
- [x] Build TikTok stats panel (live: 155 followers, 8,188 likes, 57 videos via public page scrape)

## Autonomous Build Session — Round 3 (May 15, 2026)
- [x] Fix TikTok fallback regex (stray space in pattern fixed)
- [x] Add YouTube subscriber count (Manus Data API: 11 subscribers, 52 videos, 96,938 views — live via callDataApi('Youtube/get_channel_details'))
- [x] Add sidebar nav item for Social Media section in DashboardLayout (Share2 icon added)
- [x] Audit all website pages for missing SEO meta descriptions and OG images (all 11 pages have useSEO with title, desc, canonical, OG tags)
- [x] Add LocalBusiness + MedicalBusiness JSON-LD schema to homepage (already in index.html)
- [x] Add FAQ schema markup to homepage FAQ section (already in index.html)
- [x] Add BreadcrumbList JSON-LD schema to service pages (BlackLabel, HealthOptimization, LongevityPrograms — useBreadcrumb hook)
- [x] Improve Contact page: phone is already a clickable tel: link (verified in Contact.tsx and Navbar.tsx)
- [x] Add BackToTop floating button (amber, sharp corners) to Services, BlogPost, BlackLabel, LongevityPrograms, HealthOptimization
- [x] Add canonical URL meta tags to all pages (useSEO hook sets canonical dynamically)
- [x] Verify sitemap.xml includes all current routes (16 URLs, all routes covered)
- [x] Add robots meta tag (index, follow) to all public pages (set in index.html)
- [x] Add Instagram/Facebook stats panel with clear setup instructions card (amber card with 3-step token instructions)
- [x] Add TikTok top videos: TikTok blocks server-side video list extraction without auth token; panel shows aggregate stats + View Profile link (best available without TikTok developer app)
- [x] Improve pipeline lead accuracy: verified all 7 stage IDs against live GHL API (2026-05-15) — STAGE_NAMES map corrected in dashboard.ts; contact.ts pipeline ID (NBqu4y9ct8y8sPQZWcPr) and New Lead stage ID confirmed correct
- [x] Add loading skeletons to social stats panel (2-column skeleton with stat blocks and video list placeholders)
- [x] Add PanelErrorBoundary component (panel-scoped error boundary with retry button); applied to social stats section; global ErrorBoundary already wraps full app in App.tsx

## Instagram / Meta Integration (May 18, 2026)
- [x] Store META_ACCESS_TOKEN as secret (env var set via webdev_request_secrets)
- [x] Add Instagram data to socialStats tRPC procedure (followers, reach 30d, website_clicks, profile_views, top 6 reels via Meta Graph API v19.0)
- [x] Build live Instagram stats panel in dashboard (replaces amber setup card — shows followers, posts, reach, profile views, link clicks, top posts grid)
- [x] Show top 6 reels sorted by likes + comments
- [x] Add 30-day reach sparkline chart to Instagram panel (AreaChart with Instagram pink gradient, tooltip with date + reach value, backend returns reachSeries with daily end_time values)

## New Integrations (May 18, 2026)

### 1. Lifehouse Integration
- [x] Identify Lifehouse platform — user confirmed Lifehouse integration is already complete, no further action needed
- [x] Build Lifehouse dashboard panel — N/A, integration was handled outside this project

### 2. Google Search Console (Site Indexing Panel)
- [x] Create Google Cloud project + enable Search Console API + create service account
- [x] Add service account email to Search Console as owner (switched to OAuth2 refresh token — GSC UI only accepts regular Google accounts)
- [x] Store GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN as secrets
- [x] Build tRPC procedure: click-through rate, impressions, top queries, avg position, daily trend
- [x] Build Search Console panel in /dashboard/seo (KPIs, daily click trend, top queries, top pages)

### 3. Google Analytics (Traffic Panel)
- [x] Enable Google Analytics Data API v1 in same Google Cloud project
- [x] Add service account to GA4 property as Viewer (switched to OAuth2 — GA4 also requires regular Google account)
- [x] Store GA_PROPERTY_ID (538233710) as secret
- [x] Build tRPC procedure: sessions, users, bounce rate, top pages, traffic sources (last 28d)
- [x] Build Google Analytics panel in /dashboard/seo (KPIs, daily session trend, traffic sources, top pages)

### 4. Clarity CRO Integration (Enhanced Panel)
- [x] Get Clarity API key from clarity.microsoft.com → Settings → Data Export (token: cellrx_heatmap)
- [x] Store CLARITY_API_KEY as secret
- [x] Build tRPC procedure: sessions, bot sessions, pages/session, scroll depth, rage clicks, dead clicks, engagement time, quickbacks, device breakdown, channel breakdown
- [x] Upgrade Clarity panel in dashboard from link-out tiles to live CRO metrics (4 KPI cards + device bars + deep-dive links)

## Financials Separation (May 18, 2026)
- [x] Move Revenue & Invoices panel from main dashboard to a separate private /dashboard/financials page
- [x] Add "Financials" nav item to DashboardLayout sidebar (protected, not visible in public meetings)
- [x] Remove Revenue & Invoices section from main /dashboard overview
- [x] Ensure /dashboard/financials is protected (requires login) and noindex

## Lighthouse Integration (May 18, 2026)
- [x] Clarify which Lighthouse platform is being used — Google Lighthouse (PageSpeed Insights / Core Web Vitals)
- [x] Build Lighthouse tRPC router using Google PageSpeed Insights API (free, no key needed, 1-hour cache)
- [x] Build /dashboard/lighthouse page with performance scores, Core Web Vitals, and top recommendations
- [x] Add Lighthouse nav item to DashboardLayout sidebar

## Meta Token Auto-Refresh (May 18, 2026)
- [x] Exchange short-lived Meta token for long-lived token (60 days)
- [x] Store META_APP_ID and META_APP_SECRET as secrets
- [x] Build heartbeat job that refreshes the token every 45 days automatically (cron task_uid: dQzPLT4ae7fd9WWFAVYFHy, next run: 2026-06-01)
- [x] Store refreshed token back to secrets so it never expires
- [x] Test that Instagram panel shows live data again

## Lighthouse & AI SEO Improvements (May 19, 2026)

### CRITICAL — Performance (Mobile 30/100, Desktop 56/100)

#### P1: Image Optimization (biggest single win — ~2,000 KiB savings)
- [ ] Convert all hero and service images to AVIF format with WebP fallback using `<picture>` element — images are served as WebP from CDN; AVIF conversion would require re-uploading
- [x] Add explicit `width` and `height` attributes to all `<img>` tags to eliminate layout shift (CLS) — exhaustive audit complete: all img tags in About, Blog, BlogPost, Home, Services, HealthOptimization, LongevityPrograms, Team have width/height
- [x] Add `loading="lazy"` to all below-the-fold images — exhaustive audit complete: all non-hero images have loading=lazy; hero images use fetchPriority=high
- [ ] Compress and resize the hero image (HERO_CROP_A) — primary LCP bottleneck; requires re-uploading optimized version
- [x] Add `fetchpriority="high"` to the hero image to prioritize LCP element loading — already applied in Home.tsx

#### P1: JavaScript Reduction (TBT 4,040ms on mobile — ~370 KiB savings)
- [x] Analyze bundle size with rollup-plugin-visualizer: run `pnpm build` and inspect output — main index bundle 567 KB (160 KB gzip); vendor-charts 407 KB (lazy); streamdown in AIChatBox.tsx is the main culprit in shared bundle; manualChunks already configured for react/trpc/ui/charts
- [x] Code-split heavy page sections (FAQ, stats counters, service cards) using React.lazy + Suspense — all 13 non-Home routes already lazy-loaded via React.lazy(); visualizer added to vite.config.ts (ANALYZE=true pnpm build)
- [ ] Defer non-critical third-party scripts (Google Fonts, analytics) using `defer` or dynamic import
- [x] Replace Ken Burns CSS animation with a static image on mobile to reduce main-thread work — media query added: @media (max-width: 767px) disables will-change and animation; desktop retains full Ken Burns effect

#### P1: Caching Headers (~2,635 KiB savings on repeat visits)
- [x] Add long-lived cache headers (1 year) for all static assets served from CDN URLs — CDN assets already have CloudFront caching
- [x] Configure `Cache-Control: public, max-age=31536000, immutable` for hashed JS/CSS bundles in Express — already configured in server/_core/vite.ts serveStatic()

#### P1: Redirect Chain (~780ms mobile / ~230ms desktop savings)
- [ ] Fix redirect chain: `cellrx.bio → www.cellrx.bio` adds unnecessary round-trip — configure canonical domain at DNS/CDN level

#### P2: Render-Blocking Resources (~200ms desktop savings)
- [x] Convert Google Fonts `<link>` to use `rel="preconnect"` + `rel="preload"` instead of blocking render — uses media=print/onload non-blocking pattern (equivalent to preload); preconnect tags present for fonts.googleapis.com and fonts.gstatic.com
- [ ] Inline critical CSS for above-the-fold content (hero section) to eliminate render-blocking stylesheet

#### P2: Server Response Time (~330ms mobile / ~340ms desktop savings)
- [x] Verify gzip/brotli compression is enabled in Express server — `compression()` middleware already active in server/_core/index.ts
- [x] Add `preload` hints for critical resources (hero image) — hero image preload link added to index.html with fetchpriority=high; Google Fonts uses media=print/onload non-blocking pattern (no font file preloads needed with this approach)

---

### HIGH — SEO (Score: 85/100 — target 95+)

#### Canonical Tag (Missing — direct ranking impact)
- [x] Verify `<link rel="canonical">` is present and correct on all pages via useSEO hook — useSEO() sets canonical dynamically on every page navigation
- [x] Confirm canonical resolves to `https://www.cellrx.bio/` (not HTTP or non-www) — BASE_URL = 'https://www.cellrx.bio' in useSEO.ts

#### Descriptive Link Text (3 links flagged by audit)
- [x] Audit all links with generic text ("click here", "learn more", "read more") and replace with descriptive anchor text — aria-labels added to Learn More buttons in Home and LongevityPrograms
- [x] Ensure all CTA buttons have descriptive aria-labels (e.g., "Book a stem cell consultation" not just "Book Now") — aria-labels added to service card buttons

#### Structured Data / Schema Markup (Verify completeness)
- [x] Verify `MedicalClinic` JSON-LD schema on homepage includes: name, address, phone, openingHours, priceRange, medicalSpecialty — MedicalBusiness+LocalBusiness schema in index.html with all fields
- [x] Add `MedicalProcedure` schema to each service page (Stem Cell Injection, IV Therapy, Black Label) — useMedicalProcedureSchema hook added to useSEO.ts; wired into Services.tsx with 2 procedures
- [x] Add `Physician` / `Person` schema for Dr. Egbert: name, jobTitle, medicalSpecialty, worksFor, credentials — Physician schema in index.html
- [x] Verify `FAQPage` JSON-LD schema is present and matches the visible FAQ section content (global schema in index.html + page-specific FAQPage JSON-LD injected via useFAQSchema on Services, BlackLabel, HealthOptimization, LongevityPrograms)
- [x] Verify `BreadcrumbList` schema on all interior pages — useBreadcrumb() hook available and used on key pages

#### Meta Tags & Open Graph
- [x] Audit all pages for unique, keyword-rich `<meta name="description">` (150–160 chars each) — all 9 pages have unique descriptions in PAGE_SEO object
- [x] Verify Open Graph image is 1200×630px and loads correctly when shared on social — og:image:width/height set to 1200×630 in index.html

#### robots.txt & Sitemap
- [x] Verify robots.txt allows GPTBot (OpenAI), PerplexityBot, ClaudeBot, Bingbot — all 4 crawlers explicitly allowed
- [ ] Submit XML sitemap to Google Search Console (Settings → Sitemaps) — requires manual action by site owner
- [x] Verify `llms.txt` is up to date with current services, physician info, and location — comprehensive llms.txt at /llms.txt

---

### MEDIUM — Accessibility (Score: 87/100 — target 95+)

#### Color Contrast
- [x] Audit silver text (#D6D7D9) on dark navy (#051229) — 12.96:1 ratio, PASSES WCAG AA
- [x] Fix any failing contrast ratios — #0047BB replaced with #6DB3F2 (8.34:1 PASS) for all small text/icon instances across Blog, Home, Services, Contact, BlackLabel, Testimonials, BlogPost, HealthOptimization, LongevityPrograms, Sitemap; large display headings (48-96px) retain #0047BB; blue-on-white buttons pass at 8.0:1

#### Heading Order
- [x] Audit heading hierarchy on all pages — ensure H1 → H2 → H3 sequence is never skipped
- [x] Fix any instances where H3/H4 appears without a parent H2 (fixed in Home, Services, BlackLabel, Contact)

#### Viewport Zoom Lock
- [x] Check viewport meta tag in `client/index.html` — confirmed: `width=device-width, initial-scale=1.0` only, no zoom lock
- [x] Ensure layout works correctly when zoomed to 200%+ (WCAG 2.1 AA requirement) — no zoom restrictions in viewport meta

---

### AI SEARCH ENGINE OPTIMIZATION (GEO — Generative Engine Optimization)

#### Content Structure for AI Citation
- [x] Add "Answer first" block (60–90 words) under the H1 on homepage and each service page — added/updated on Services, BlackLabel, HealthOptimization, LongevityPrograms; Home hero paragraph already present
- [x] Add "Key Takeaways" section (4–6 bullets, max 16 words each) to each service page — added to Services, BlackLabel, HealthOptimization, LongevityPrograms
- [x] Rewrite section headings to match real patient search prompts — Services: "HOW MUCH DOES STEM CELL THERAPY COST?" + "HOW DOES STEM CELL THERAPY WORK?"; BlackLabel: "WHAT IS INCLUDED IN CONCIERGE MEDICINE?"; HealthOptimization: "WHAT DOES HEALTH OPTIMIZATION ACTUALLY INCLUDE?" + "WHAT BIOMARKERS DO WE TEST?" + "WHAT RESULTS CAN YOU EXPECT?"; LongevityPrograms: "WHAT LONGEVITY PROGRAMS DOES CELLRX OFFER?" + "HOW DOES LONGEVITY MEDICINE ACTUALLY WORK?"
- [x] Build dedicated `/faq` page with 15–20 Q&As answered in 40–80 words each — /faq page created with 20 Q&As in 6 categories; FAQPage JSON-LD schema injected; added to sitemap.xml, Footer, Sitemap page, and llms.txt
- [x] Add authorship block to all content pages: author name, credentials, published date, last updated date (E-E-A-T author block added to all blog posts)

#### E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)
- [x] Create dedicated `/about/dr-egbert` page: full bio, credentials, medical school, board certifications, publications — DrEgbert.tsx created with Physician JSON-LD schema, full bio, dual-role section, credentials card; route at /about/dr-egbert
- [x] Add "Sources & References" section to service pages citing peer-reviewed research on stem cell therapy — 5 PubMed-linked citations added to Services.tsx with FDA disclaimer
- [x] Add "Last Updated" date to all service and blog pages (lastUpdated field added to all 7 blog articles)
- [ ] Publish at least 2 long-form blog posts per month targeting specific patient questions

#### AI Crawler Access (verify robots.txt)
- [x] Confirm `GPTBot: allow` in robots.txt (OpenAI's crawler for ChatGPT search) — already configured
- [x] Confirm `PerplexityBot: allow` in robots.txt — already configured
- [x] Confirm `ClaudeBot: allow` in robots.txt (Anthropic) — already configured
- [x] Confirm `Bingbot: allow` in robots.txt (Microsoft Copilot) — already configured
- [x] Verify `llms.txt` at root is current and comprehensive — all 5 services, team, FAQ, NAP, blog links present

#### Local SEO (Critical for "stem cell therapy near me" queries)
- [ ] Claim and fully optimize Google Business Profile: photos, services, hours, Q&A, weekly posts
- [ ] Ensure NAP (Name, Address, Phone) is consistent across website, GBP, and all directories
- [ ] Submit to medical directories: Healthgrades, Zocdoc, Vitals, RateMDs, WebMD Find a Doctor
- [x] Add location-specific content mentioning city/region served on homepage and contact page — "Serving Patients Across Utah" section added to Home.tsx (with clinic info card) and Contact.tsx (12-city grid + NAP)

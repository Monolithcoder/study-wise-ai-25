# StudyTrack AI implementation plan

## Outcome

Build StudyTrack AI as a production-oriented student productivity intelligence platform, not a timer-only demo. The first screen will be a finished public landing page at `/`, with authenticated product surfaces available through a protected app shell.

## Current baseline

- The project is a minimal TanStack Start + React + TypeScript scaffold.
- `/` is still the generated blank-page placeholder.
- There are no application routes, persistence layer, authentication flow, or domain components yet.
- Recharts, Lucide React, Zod, Sonner, and TanStack Query are already available.

## Visual direction

Use the selected **Cinematic command center** direction as the source of truth:

- Deep ink workspace with panel surfaces, fine dividers, and high information density.
- Mint/green as the primary action and progress color, ember for social/distraction signals, and amber for attention states.
- Anton-style condensed display moments with Space Grotesk for interface copy; load fonts through the root document head.
- Restrained rise, progress-fill, chart-draw, and gentle floating motion with reduced-motion support.
- Preserve the dashboard preview composition: goal progress, focus trend, subject progress, timeline, weekly totals, activity mix, streak, quick actions, and an AI recommendation.
- Carry the palette into semantic CSS tokens so dark/light mode and component states remain themeable; do not hardcode visual colors in route components.

## Delivery stages

### 1. Platform foundation and account flow

- Enable Lovable Cloud for managed authentication, PostgreSQL persistence, and server-side functions.
- Implement email/password registration, login, logout, session-aware navigation, protected routes, forgot password, and the public `/reset-password` recovery page.
- Store onboarding and education data in a separate `profiles` table linked to the authenticated user; keep roles in a separate role table if role checks are introduced.
- Add onboarding for name, institution, course/branch, semester, study target, important/difficult subjects, preferred study window, sleep, and free time.
- Add route metadata for every public/content route with unique title, description, Open Graph, and Twitter card values.

### 2. Shared product shell and first vertical slice

- Create the protected app shell with desktop sidebar/top controls and mobile bottom navigation: Home, Study, Schedule, Analytics, Profile.
- Build the dashboard as the first complete vertical slice with real persisted reads and writes:
  - today's target and completion percentage
  - study/focus/social/entertainment metrics
  - app-generated productivity score with transparent explanatory copy
  - current and longest streak
  - subject progress
  - today's timeline
  - activity mix and weekly trend
  - today's schedule and AI recommendation
  - functional quick actions
- Add demo mode with a clearly identified demo student and realistic seed data so the first product view is populated without pretending browser tracking is automatic.
- Add loading skeletons, useful empty states, recoverable error states, and toast feedback for mutations.

### 3. Core persistent data and CRUD surfaces

Create the Cloud database schema, indexes, ownership rules, and migrations for profiles, subjects, study sessions, activities, goals, schedules, exams, achievements, notifications, and user preferences. Every user-owned read/write will be scoped server-side to the authenticated user.

Build reusable forms and routes for:

- Subjects: add/edit/delete, target hours, priority, difficulty, color/icon, progress.
- Study: manual session creation, start/pause/resume/finish flow, topic/goal/duration, distraction counter, saved completion and focus score.
- Focus mode: distraction-free full-screen responsive experience with completion summary.
- Activity: manual entry, category changes, privacy controls, pause tracking, delete history, and simulated demo data.
- Goals: daily/weekly/monthly/academic goals with target, progress, deadline, and status.
- Schedule: manual study/break/college/assignment/exam/revision/personal entries.
- Exams: exam date, subject, topics, remaining days, required hours, daily target, and revision plan.
- Notifications and achievements: readable notification center, mark-read behavior, preference toggles, streak and milestone badges.

### 4. Server boundaries and APIs

- Use TanStack Start server functions for app-internal authenticated reads, writes, analytics, and AI orchestration; attach and validate the user bearer session on every protected function.
- Add raw REST server routes under `/api` where an external or future desktop client needs a stable HTTP contract.
- Implement validated endpoints for profile, subjects, study sessions, activities, goals, analytics, schedules, exams, and AI actions. Include the future-agent `POST /api/activity` contract with category, application, timestamps, duration, and ownership validation.
- Validate all incoming data with Zod, return meaningful status codes, avoid leaking provider/database details, and enforce pagination/date ranges on activity and report queries.
- Keep the desktop-agent architecture explicit: manual and simulated tracking for MVP; no claim that the browser monitors the operating system.

### 5. Analytics, reports, and recommendations

- Centralize calculations for daily/weekly/monthly study time, subject distribution, study/social/entertainment percentages, target completion, streaks, consistency, focus score, and most productive time.
- Build the analytics route with Today, Yesterday, 7-day, 30-day, and custom range filters; use responsive Recharts visualizations for bars, donut distribution, horizontal usage, productivity trend, social usage, timeline, and calendar heatmap.
- Add weekly and monthly report views with the requested summary metrics, wins, improvement areas, AI recommendation, best/worst periods, and export-ready layout. Implement PDF export through a browser-safe approach.
- Provision the Lovable AI Gateway and create server-side recommendation, schedule-generation, exam-plan, and chat actions. Recommendations must be derived from the signed-in user's stored data only, with graceful AI failure fallbacks.

### 6. Settings, privacy, and quality pass

- Build profile, study preferences, theme, activity/application tracking consent, analytics/data collection, notification controls, password change, logout, and account deletion surfaces.
- Make tracking privacy-first: explain what is recorded, require explicit opt-in for activity tracking, support pause and deletion, and never expose one user's activity to another.
- Verify keyboard navigation, labels, contrast, focus states, responsive layouts at the requested desktop/tablet/mobile widths, no broken links, no placeholder route, and no unhandled console errors.
- Update the README with architecture, Cloud setup, environment variables, migrations, demo data, development/build/deployment commands, API contracts, and future desktop-agent notes.

## Technical guardrails

- Keep TanStack Router as the only routing system; use top-level public routes and an `_authenticated` pathless gate for private surfaces.
- Keep server-only secrets and privileged clients inside server handlers; never expose AI or database secrets to the browser.
- Prefer typed server functions plus TanStack Query loading patterns; do not query private data directly from isomorphic loaders.
- Use Cloud PostgreSQL with explicit grants, row-level ownership policies, foreign keys, and indexes. Keep Prisma-style domain relationships documented; if Prisma's Node runtime assumptions conflict with the deployed edge runtime, use the platform-compatible typed data client rather than sacrificing deployability or security.
- Use existing design-system components for controls and semantic tokens for all color, border, foreground, shadow, and state styling.

## Validation checkpoints

1. After platform foundation: public landing, auth pages, reset flow, and onboarding render without blank states.
2. After the first vertical slice: a demo user can sign in, view populated dashboard data, start/finish a session, and see persisted progress change.
3. After core CRUD: subjects, activities, goals, schedule, and exams support create/edit/delete or completion flows with empty/loading/error states.
4. After analytics/AI: date filters, reports, recommendations, and chat handle both populated and empty datasets safely.
5. Before completion: run lint/build checks, exercise primary flows in the live preview, and inspect desktop/mobile screenshots for overflow, overlap, and inaccessible controls.
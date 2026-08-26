# Task 06 — Contact Form + Email Notification

**Spec ref:** §5 (contact_messages, contact-notify), §8

**Depends on:** Task 02, 05

## Goal

Working contact form: validation, DB insert, honeypot, rate limit, and email notification via Edge Function + Resend.

## Steps

1. `ContactForm` client component: name/email/message fields, honeypot `website` (hidden), client validation (required, email format), loading/success/error states, i18n strings from dictionaries.
2. `app/api/contact/route.ts` (POST):
   - zod validation of body (+ honeypot must be empty)
   - per-IP rate limit (in-memory Map, 5/hour)
   - insert into `contact_messages` using service-role client (server only)
   - returns `{ ok: true }` / `{ ok: false, error }` with proper status codes
3. `supabase/functions/contact-notify/index.ts`:
   - receives webhook payload from DB trigger
   - sends email via Resend (`resend` npm package): to `NOTIFY_TO` (fallback) or `site_profile.email`, subject "New message from {name}", body with name/email/message/locale
   - verify `verify_jwt` or shared secret env `NOTIFY_SECRET` header check
4. Migration `0002_contact_trigger.sql`: `after insert on contact_messages` trigger calling `supabase_functions.http_request` to the deployed function URL (or `net.http_post`), failure-safe (exception caught, logged).
5. Edge function secrets: `RESEND_API_KEY`, `NOTIFY_TO`, `NOTIFY_SECRET` — document in `CONTENT_TODO.md` setup checklist; provide `supabase/.env.example`.
6. Update `CONTENT_TODO.md` with email-provider setup steps for owner (Resend account, sender domain `onboarding@resend.dev` for dev, verified domain later).

## Acceptance Criteria

- [x] Form validates client-side and server-side; honeypot submissions silently dropped
- [x] Valid submission inserts row into `contact_messages` (verified via REST + trigger response 200)
- [x] Rate limit: >5 POSTs/hour from one IP rejected with 429
- [x] Trigger fires `contact-notify`; email arrives at owner inbox — *verified: function 200 via pg_net response table; owner should confirm inbox email*
- [x] No service-role key leaked to client bundle
- [x] `npm run lint`, `npm run typecheck`, `npm run build` clean
- [x] `supabase functions deploy contact-notify` documented and run

## Notes

- Edge function uses direct `fetch` to Resend API (no npm deps → simpler Deno deploys).
- Deploy learnings (all documented in spec §5):
  - Functions gateway JWT-validates `Authorization` → auth uses custom `x-notify-secret`
    header + `verify_jwt = false` in `supabase/config.toml`.
  - `security definer` + empty `search_path` broke the unqualified `app_settings` read
    silently (caught by exception handler) → schema-qualified `public.app_settings`.
  - Management API can't `alter database set` → secret lives in private `app_settings` table.
- `CONTACT_TEST_MODE=1` added: local dev/e2e submissions return ok without insert/email.
- Local verification: invalid → 400, honeypot → 200 silently dropped, >5/hour → 429.
- e2e updated: valid submits now expect localized success message.

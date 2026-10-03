# KaiKhong.ai

KaiKhong.ai is a Thai-first AI Business Team for small businesses and solo founders. This repository contains the validation landing page and a secure, modular-monolith foundation for the MVP.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Supabase, Resend, Cloudflare Turnstile, Omise, Sentry, PostHog, and Vercel.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Run the checks before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Required setup

1. Create a Supabase project, copy its URL and publishable key into `.env.local`, then run the SQL in `supabase/migrations/20261003_initial_foundation.sql` using the Supabase CLI or SQL editor.
2. Create a Cloudflare Turnstile Managed widget for the deployed hostname and set its site and secret keys. The API rejects unverified tokens.
3. Verify a sending domain in Resend and set `RESEND_FROM_EMAIL` to a verified sender.
4. Configure Omise in test mode and set a webhook endpoint to `/api/webhooks/omise`. Payment creation remains intentionally unavailable until pricing and checkout UI are designed.
5. Create Sentry and PostHog projects, then configure their keys. Both integrations stay inert when their optional configuration is absent.

See [architecture](docs/architecture.md), [environment](docs/environment.md), [database](docs/database.md), and [deployment](docs/deployment.md) for operational details.

## Security notes

- `.env.local` is ignored; server secrets are only accessed in server modules.
- Supabase RLS restricts user-owned rows and permits waitlist inserts only.
- Turnstile is verified server-side with Cloudflare Siteverify.
- Omise webhooks use the raw payload, HMAC-SHA256 signature verification, and an idempotency event ledger.
- PostHog event properties intentionally exclude emails, payment details, passwords, and tokens.

## MVP next steps

Apply the migration, configure the services above, build business onboarding, then add the AI task and approval workflow. Do not ship payment collection until its plan selection and Omise source flow have been reviewed.

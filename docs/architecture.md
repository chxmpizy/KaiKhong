# Architecture

KaiKhong uses a modular monolith: one Next.js application with explicit boundaries rather than separate services.

| Area | Location | Responsibility |
| --- | --- | --- |
| UI and routes | `app/`, `components/` | Marketing, auth and protected workspace routes |
| Integrations | `lib/supabase`, `lib/resend`, `lib/omise`, `lib/posthog` | External-provider adapters |
| Domain services | `server/services/` | Validation, authorization and idempotency rules |
| Database | `supabase/migrations/` | Versioned schema and RLS |
| Future AI | `lib/ai/` | Provider-neutral contract only |

Business context belongs to a `businesses` row. Future Product, Marketing and Sales services should consume business-domain data through server services, not direct browser access to privileged integrations.

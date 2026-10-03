# Environment

Copy `.env.example` to `.env.local`. Only `NEXT_PUBLIC_*` variables are visible to browser code.

| Group | Required for |
| --- | --- |
| App URL | Redirect and deployment links |
| Supabase URL + publishable key | Auth and user-scoped queries |
| Supabase service role | Trusted waitlist and webhook server work only |
| Turnstile keys | Public waitlist protection |
| Resend keys | Waitlist confirmation email |
| Omise keys | Future payments and webhook verification |
| Sentry/PostHog | Optional monitoring and product analytics |

Never use server secrets in client components, commit `.env.local`, or put tokens in logs.

# Database

The initial migration creates `profiles`, `businesses`, `waitlist_signups`, `subscriptions`, `payments`, and the internal `omise_webhook_events` ledger.

Apply migrations through the Supabase CLI after linking the correct project:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

RLS is enabled on every table. Authenticated users can only access their own profile, businesses, subscriptions, and payments. Public clients can insert a waitlist record but cannot select, update, or delete waitlist records. Trusted server code uses the service role only for routes that require it.

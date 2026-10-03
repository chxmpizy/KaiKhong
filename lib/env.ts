/** Environment access lives here so server-only secrets do not leak into client bundles. */
export const publicEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  posthogToken: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export function isSupabaseConfigured() {
  return Boolean(publicEnv.supabaseUrl && publicEnv.supabasePublishableKey);
}

export function requireServerEnv(name: "SUPABASE_SERVICE_ROLE_KEY" | "RESEND_API_KEY" | "RESEND_FROM_EMAIL" | "TURNSTILE_SECRET_KEY" | "OMISE_SECRET_KEY" | "OMISE_WEBHOOK_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required server configuration: ${name}`);
  return value;
}

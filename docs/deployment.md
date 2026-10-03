# Deployment

Deploy the repository to Vercel. Configure `development`, `preview`, and `production` values independently in Vercel Project Settings. Do not copy production keys to preview.

1. Add the environment variables from `.env.example`.
2. Set `NEXT_PUBLIC_APP_URL` to the deployment URL for each environment.
3. Add Vercel hostnames to the Cloudflare Turnstile widget.
4. Set the Omise webhook URL to `https://YOUR_DOMAIN/api/webhooks/omise` after the production domain is live.
5. Confirm Sentry is receiving a deliberate test event before relying on alerts.

Cloudflare remains the DNS/domain and Turnstile layer; Vercel remains the application host.

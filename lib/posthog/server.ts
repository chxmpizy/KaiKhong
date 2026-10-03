import { PostHog } from "posthog-node";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const posthog = token ? new PostHog(token, { host }) : null;

/** Never include email, auth tokens, payment data, or other sensitive values in properties. */
export function trackServerEvent(distinctId: string, event: string, properties?: Record<string, string | number | boolean>) {
  posthog?.capture({ distinctId, event, properties });
}

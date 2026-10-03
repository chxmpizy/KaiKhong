import * as Sentry from "@sentry/nextjs";
import { apiError, apiSuccess } from "@/lib/api";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestIp, verifyTurnstile } from "@/lib/security/turnstile";
import { sendWaitlistConfirmation } from "@/lib/resend";
import { trackServerEvent } from "@/lib/posthog/server";
import { registerWaitlistSignup, waitlistSchema } from "@/server/services/waitlist";

export async function POST(request: Request) {
  try {
    const parsed = waitlistSchema.safeParse(await request.json());
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Please provide a valid email and form details.", 400);
    const validToken = await verifyTurnstile(parsed.data.turnstile_token, getRequestIp(request));
    if (!validToken) return apiError("VERIFICATION_FAILED", "Verification failed. Please try again.", 400);

    const supabase = createAdminClient();
    const result = await registerWaitlistSignup(parsed.data, {
      async exists(email) {
        const { data, error } = await supabase.from("waitlist_signups").select("id").eq("email", email).maybeSingle();
        if (error) throw error;
        return Boolean(data);
      },
      async insert(input) {
        const { error } = await supabase.from("waitlist_signups").insert(input);
        if (error) throw error;
      },
    });
    if (!result.created) return apiError("DUPLICATE_RESOURCE", "This email is already on the waitlist.", 409);

    await sendWaitlistConfirmation(parsed.data.email);
    trackServerEvent(`waitlist:${parsed.data.email}`, "waitlist_signup_success", { source: parsed.data.source });
    return apiSuccess({ message: "You're on the list." }, 201);
  } catch (error) {
    Sentry.captureException(error);
    trackServerEvent("anonymous", "waitlist_signup_failed");
    if (error instanceof Error && error.message.startsWith("Missing required server configuration")) {
      return apiError("CONFIGURATION_ERROR", "Waitlist is not configured yet. Please try again later.", 503);
    }
    return apiError("INTERNAL_ERROR", "We could not save your place. Please try again.", 500);
  }
}

import * as Sentry from "@sentry/nextjs";
import { apiError, apiSuccess } from "@/lib/api";
import { verifyWebhookSignature, mapOmiseChargeStatus } from "@/lib/omise";
import { createAdminClient } from "@/lib/supabase/admin";
import { processWebhookIdempotently } from "@/server/services/webhook";

type OmiseEvent = { id: string; key: string; data?: { id?: string; status?: string } };

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (!verifyWebhookSignature(rawBody, request.headers.get("omise-signature"), request.headers.get("omise-signature-timestamp"))) return apiError("VERIFICATION_FAILED", "Invalid webhook signature.", 401);
    const event = JSON.parse(rawBody) as OmiseEvent;
    if (!event.id || !event.key) return apiError("VALIDATION_ERROR", "Invalid webhook event.", 400);
    const supabase = createAdminClient();
    const result = await processWebhookIdempotently({ id: event.id, type: event.key }, {
      async claim(eventId, eventType) {
        const { error } = await supabase.from("omise_webhook_events").insert({ event_id: eventId, event_type: eventType, status: "processing" });
        if (error?.code === "23505") return "duplicate";
        if (error) throw error;
        return "claimed";
      },
      async markProcessed(eventId) { const { error } = await supabase.from("omise_webhook_events").update({ status: "processed", processed_at: new Date().toISOString() }).eq("event_id", eventId); if (error) throw error; },
      async markFailed(eventId) { await supabase.from("omise_webhook_events").update({ status: "failed" }).eq("event_id", eventId); },
    }, async () => {
      if (!event.data?.id || !event.data.status || !event.key.startsWith("charge.")) return;
      const { error } = await supabase.from("payments").update({ status: mapOmiseChargeStatus(event.data.status), updated_at: new Date().toISOString() }).eq("provider", "omise").eq("provider_payment_id", event.data.id);
      if (error) throw error;
    });
    return apiSuccess({ processed: result.processed });
  } catch (error) {
    Sentry.captureException(error);
    return apiError("INTERNAL_ERROR", "Webhook processing failed.", 500);
  }
}

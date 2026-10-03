export type WebhookEventStore = {
  claim(eventId: string, eventType: string): Promise<"claimed" | "duplicate">;
  markProcessed(eventId: string): Promise<void>;
  markFailed(eventId: string): Promise<void>;
};

/** Claims an event before processing; the database unique event_id constraint enforces idempotency. */
export async function processWebhookIdempotently(
  event: { id: string; type: string },
  store: WebhookEventStore,
  handle: () => Promise<void>,
) {
  if ((await store.claim(event.id, event.type)) === "duplicate") return { processed: false as const };
  try {
    await handle();
    await store.markProcessed(event.id);
    return { processed: true as const };
  } catch (error) {
    await store.markFailed(event.id);
    throw error;
  }
}

import { describe, expect, it, vi } from "vitest";
import { mapOmiseChargeStatus } from "@/lib/omise";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { requireAuthenticatedUser } from "@/server/services/auth";
import { processWebhookIdempotently } from "@/server/services/webhook";

describe("critical security and payment primitives", () => {
  it("maps provider charge states to internal payment states", () => {
    expect(mapOmiseChargeStatus("successful")).toBe("successful");
    expect(mapOmiseChargeStatus("expired")).toBe("cancelled");
    expect(mapOmiseChargeStatus("unexpected")).toBe("pending");
  });
  it("requires authentication before protected actions", () => {
    expect(() => requireAuthenticatedUser(null)).toThrow("AUTHENTICATION_REQUIRED");
    expect(requireAuthenticatedUser({ id: "user-1" }).id).toBe("user-1");
  });
  it("processes a webhook only once", async () => {
    const handler = vi.fn();
    const first = await processWebhookIdempotently({ id: "evt-1", type: "charge.complete" }, { claim: async () => "claimed", markProcessed: async () => undefined, markFailed: async () => undefined }, handler);
    const second = await processWebhookIdempotently({ id: "evt-1", type: "charge.complete" }, { claim: async () => "duplicate", markProcessed: async () => undefined, markFailed: async () => undefined }, handler);
    expect(first).toEqual({ processed: true }); expect(second).toEqual({ processed: false }); expect(handler).toHaveBeenCalledTimes(1);
  });
  it("sends a Turnstile result through the server verifier", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    const fetcher = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) }) as unknown as typeof fetch;
    await expect(verifyTurnstile("token", "203.0.113.1", fetcher)).resolves.toBe(true);
    expect(fetcher).toHaveBeenCalledOnce();
  });
});

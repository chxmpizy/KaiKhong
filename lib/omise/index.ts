import { createHmac, timingSafeEqual } from "node:crypto";
import { requireServerEnv } from "@/lib/env";
import type { PaymentStatus } from "@/types/domain";

type OmiseCharge = { id: string; status: string; amount: number; currency: string; customer?: string | null };

function authorizationHeader() {
  const secret = requireServerEnv("OMISE_SECRET_KEY");
  return `Basic ${Buffer.from(`${secret}:`).toString("base64")}`;
}

async function omiseFetch<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`https://api.omise.co${path}`, {
    ...init,
    headers: { Authorization: authorizationHeader(), "Content-Type": "application/x-www-form-urlencoded", ...init.headers },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("Omise request failed");
  return (await response.json()) as T;
}

export async function createCustomer(email: string, description?: string) {
  const body = new URLSearchParams({ email, ...(description ? { description } : {}) });
  return omiseFetch<{ id: string }>("/customers", { method: "POST", body });
}

export async function createCharge(params: { amount: number; currency: string; customer?: string; description?: string }) {
  const body = new URLSearchParams({ amount: String(params.amount), currency: params.currency, ...(params.customer ? { customer: params.customer } : {}), ...(params.description ? { description: params.description } : {}) });
  return omiseFetch<OmiseCharge>("/charges", { method: "POST", body });
}

export async function getCharge(chargeId: string) {
  return omiseFetch<OmiseCharge>(`/charges/${encodeURIComponent(chargeId)}`);
}

export function mapOmiseChargeStatus(status: string): PaymentStatus {
  const statusMap: Record<string, PaymentStatus> = {
    pending: "pending", successful: "successful", failed: "failed", reversed: "cancelled", expired: "cancelled", refunded: "refunded",
  };
  return statusMap[status] ?? "pending";
}

/** Validates the raw body using Omise's HMAC-SHA256 signature format. */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null, timestamp: string | null) {
  if (!signatureHeader || !timestamp) return false;
  const secret = Buffer.from(requireServerEnv("OMISE_WEBHOOK_SECRET"), "base64");
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest();
  return signatureHeader.split(",").some((signature) => {
    const received = Buffer.from(signature.trim(), "hex");
    return received.length === expected.length && timingSafeEqual(received, expected);
  });
}

import { requireServerEnv } from "@/lib/env";

type TurnstileResponse = { success: boolean; "error-codes"?: string[] };

export async function verifyTurnstile(token: string, remoteIp?: string, fetcher: typeof fetch = fetch) {
  const secret = requireServerEnv("TURNSTILE_SECRET_KEY");
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(5_000),
  });
  const result = (await response.json()) as TurnstileResponse;
  return result.success;
}

export function getRequestIp(request: Request) {
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}

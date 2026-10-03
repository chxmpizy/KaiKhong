import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  business_type: z.string().trim().max(100).optional().default(""),
  pain_point: z.string().trim().max(1_000).optional().default(""),
  source: z.string().trim().max(100).optional().default("landing_page"),
  turnstile_token: z.string().trim().min(1).max(2_048),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistRepository = {
  exists(email: string): Promise<boolean>;
  insert(input: Omit<WaitlistInput, "turnstile_token">): Promise<void>;
};

export async function registerWaitlistSignup(input: WaitlistInput, repository: WaitlistRepository) {
  if (await repository.exists(input.email)) return { created: false as const, reason: "duplicate" as const };
  await repository.insert({
    email: input.email,
    business_type: input.business_type,
    pain_point: input.pain_point,
    source: input.source,
  });
  return { created: true as const };
}

import { describe, expect, it } from "vitest";
import { registerWaitlistSignup, waitlistSchema, type WaitlistRepository } from "@/server/services/waitlist";

const token = "t".repeat(16);
const validInput = { email: "Founder@Example.com", business_type: "Retail", pain_point: "Content", source: "landing_page", turnstile_token: token };

describe("waitlist validation and duplicate protection", () => {
  it("normalizes a valid email", () => {
    expect(waitlistSchema.parse(validInput).email).toBe("founder@example.com");
  });
  it("rejects an invalid email", () => {
    expect(waitlistSchema.safeParse({ ...validInput, email: "not-an-email" }).success).toBe(false);
  });
  it("does not insert a duplicate email", async () => {
    let inserts = 0;
    const repository: WaitlistRepository = { exists: async () => true, insert: async () => { inserts += 1; } };
    await expect(registerWaitlistSignup(waitlistSchema.parse(validInput), repository)).resolves.toEqual({ created: false, reason: "duplicate" });
    expect(inserts).toBe(0);
  });
});

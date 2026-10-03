import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { apiError, apiSuccess } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { requireAuthenticatedUser } from "@/server/services/auth";

const businessSchema = z.object({
  name: z.string().trim().min(1).max(140), description: z.string().trim().max(2_000).optional(),
  industry: z.string().trim().max(100).optional(), websiteUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  targetCustomer: z.string().trim().max(1_000).optional(), businessGoal: z.string().trim().max(1_000).optional(),
});

function failure(error: unknown, action: string) {
  Sentry.captureException(error);
  const unauthenticated = error instanceof Error && error.message === "AUTHENTICATION_REQUIRED";
  return apiError(unauthenticated ? "AUTHENTICATION_REQUIRED" : "INTERNAL_ERROR", action, unauthenticated ? 401 : 500);
}

export async function GET() {
  try {
    const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); requireAuthenticatedUser(user);
    const { data, error } = await supabase.from("businesses").select("*").eq("owner_id", user.id).order("created_at", { ascending: false });
    if (error) throw error;
    return apiSuccess(data);
  } catch (error) { return failure(error, "Unable to load businesses."); }
}

export async function POST(request: Request) {
  try {
    const parsed = businessSchema.safeParse(await request.json());
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Invalid business details.", 400);
    const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); requireAuthenticatedUser(user);
    const { data, error } = await supabase.from("businesses").insert({
      owner_id: user.id, name: parsed.data.name, description: parsed.data.description || null, industry: parsed.data.industry || null,
      website_url: parsed.data.websiteUrl || null, target_customer: parsed.data.targetCustomer || null, business_goal: parsed.data.businessGoal || null,
    }).select().single();
    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) { return failure(error, "Unable to create the business."); }
}

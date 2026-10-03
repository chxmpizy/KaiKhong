import * as Sentry from "@sentry/nextjs";
import { apiError, apiSuccess } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { requireAuthenticatedUser } from "@/server/services/auth";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser(); requireAuthenticatedUser(user);
    const { data, error } = await supabase.from("payments").select("*").eq("id", id).eq("user_id", user.id).maybeSingle();
    if (error) throw error;
    if (!data) return apiError("NOT_FOUND", "Payment not found.", 404);
    return apiSuccess(data);
  } catch (error) {
    Sentry.captureException(error);
    const unauthenticated = error instanceof Error && error.message === "AUTHENTICATION_REQUIRED";
    return apiError(unauthenticated ? "AUTHENTICATION_REQUIRED" : "INTERNAL_ERROR", "Unable to load payment.", unauthenticated ? 401 : 500);
  }
}

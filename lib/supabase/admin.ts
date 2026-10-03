import { createClient } from "@supabase/supabase-js";
import { publicEnv, requireServerEnv } from "@/lib/env";

/** Server-only client for trusted jobs and API routes. Never import into a Client Component. */
export function createAdminClient() {
  if (!publicEnv.supabaseUrl) throw new Error("Missing required server configuration: NEXT_PUBLIC_SUPABASE_URL");
  return createClient(publicEnv.supabaseUrl, requireServerEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

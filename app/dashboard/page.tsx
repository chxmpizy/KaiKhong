import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) return <main className="dashboard-placeholder"><p className="eyebrow">SETUP REQUIRED</p><h1>Your KaiKhong workspace</h1><p>Add Supabase credentials and apply the first migration to enable authentication and business setup.</p></main>;
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return <main className="dashboard-placeholder"><p className="eyebrow">KAIKHONG WORKSPACE</p><h1>Welcome to your business workspace</h1><p>This protected route is ready for the first business-context onboarding flow.</p></main>;
}

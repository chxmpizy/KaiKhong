"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/posthog/client";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter(); const params = useSearchParams(); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const values = new FormData(event.currentTarget); const email = String(values.get("email")); const password = String(values.get("password"));
    try {
      const supabase = createClient();
      const result = isSignup ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } }) : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      trackEvent(isSignup ? "signup_completed" : "login_completed");
      if (isSignup && !result.data.session) { setError("Check your email to confirm your account, then log in."); return; }
      router.push(params.get("next") || "/dashboard"); router.refresh();
    } catch { setError("We couldn't complete that request. Check your credentials and Supabase configuration."); }
    finally { setLoading(false); }
  }
  return <form className="auth-form" onSubmit={onSubmit}><label>Email<input required name="email" type="email" autoComplete="email" /></label><label>Password<input required name="password" type="password" minLength={8} autoComplete={isSignup ? "new-password" : "current-password"} /></label>{error && <p role="alert" className="form-error">{error}</p>}<button className="button button-primary" disabled={loading}>{loading ? "Please wait…" : isSignup ? "Create account" : "Log in"}</button></form>;
}

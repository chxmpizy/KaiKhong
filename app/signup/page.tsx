import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return <main className="auth-page"><Link href="/" className="auth-brand">KaiKhong.ai</Link><section><p className="eyebrow">EARLY PRODUCT ACCESS</p><h1>Start with your business</h1><AuthForm mode="signup" /><p>Already have an account? <Link href="/login">Log in</Link></p></section></main>;
}

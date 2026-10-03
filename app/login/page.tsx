import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return <main className="auth-page"><Link href="/" className="auth-brand">KaiKhong.ai</Link><section><p className="eyebrow">WELCOME BACK</p><h1>Log in to KaiKhong</h1><AuthForm mode="login" /><p>New here? <Link href="/signup">Create an account</Link></p></section></main>;
}

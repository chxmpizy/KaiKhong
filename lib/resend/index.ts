import { Resend } from "resend";
import { requireServerEnv } from "@/lib/env";

export async function sendWaitlistConfirmation(email: string) {
  const resend = new Resend(requireServerEnv("RESEND_API_KEY"));
  return resend.emails.send({
    from: requireServerEnv("RESEND_FROM_EMAIL"),
    to: email,
    subject: "You're on the KaiKhong.ai waitlist",
    text: "Thanks for joining the KaiKhong.ai waitlist. We're currently building an AI Business Team for small businesses and will let you know when early access is ready.",
  });
}

// Intentional future boundaries. Keep transactional email calls server-side.
export async function sendWelcomeEmail() { throw new Error("Welcome email is not implemented yet."); }
export async function sendPaymentConfirmation() { throw new Error("Payment confirmation email is not implemented yet."); }

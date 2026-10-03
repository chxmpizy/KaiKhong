import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "@/components/providers/posthog-provider";

export const metadata: Metadata = {
  title: "KaiKhong.ai — Your AI Business Team",
  description:
    "KaiKhong.ai is an AI Business Team built to help small businesses and solo founders with Product, Marketing and Sales.",
  keywords: ["AI business team", "Thai small business", "marketing AI", "KaiKhong"],
  openGraph: {
    title: "KaiKhong.ai — Your AI Business Team",
    description:
      "An AI Business Team for Thai small businesses and solo founders. Early access coming soon.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body><PostHogProvider>{children}</PostHogProvider></body>
    </html>
  );
}

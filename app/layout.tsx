import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/providers/posthog-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const notoThai = Noto_Sans_Thai({ subsets: ["thai"], variable: "--font-noto-thai" });

export const metadata: Metadata = {
  title: "KaiKhong.ai — Your AI Marketing Team",
  description:
    "An AI marketing team for founders and small businesses. Strategy, content, SEO, social, and marketing intelligence in one system.",
  openGraph: {
    title: "KaiKhong.ai — Your AI Marketing Team",
    description:
      "An AI marketing team for founders and small businesses. Strategy, content, SEO, social, and marketing intelligence in one system.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${notoThai.variable}`}>
      <body className="bg-ivory text-charcoal font-sans antialiased selection:bg-forest selection:text-ivory">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

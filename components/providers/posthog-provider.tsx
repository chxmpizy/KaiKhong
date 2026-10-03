"use client";

import { useEffect, type ReactNode } from "react";
import { initializeAnalytics } from "@/lib/posthog/client";

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => { initializeAnalytics(); }, []);
  return children;
}

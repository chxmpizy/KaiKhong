"use client";

import posthog from "posthog-js";
import { publicEnv } from "@/lib/env";

export function initializeAnalytics() {
  if (publicEnv.posthogToken && typeof window !== "undefined") {
    posthog.init(publicEnv.posthogToken, {
      api_host: publicEnv.posthogHost,
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: "identified_only",
    });
  }
}

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  if (publicEnv.posthogToken) posthog.capture(name, properties);
}

export function identifyUser(userId: string) {
  if (publicEnv.posthogToken) posthog.identify(userId);
}

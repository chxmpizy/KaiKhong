"use client";

import { useEffect, useRef } from "react";
import { publicEnv } from "@/lib/env";

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: { sitekey: string; theme: "light"; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string; remove: (id: string) => void };
  }
}

export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sitekey = publicEnv.turnstileSiteKey;
    if (!sitekey || !container.current) return;
    let widgetId: string | undefined;
    const render = () => { if (container.current && window.turnstile) widgetId = window.turnstile.render(container.current, { sitekey, theme: "light", callback: onToken, "expired-callback": () => onToken(""), "error-callback": () => onToken("") }); };
    const existing = document.querySelector<HTMLScriptElement>('script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    if (existing) render(); else { const script = document.createElement("script"); script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; script.async = true; script.defer = true; script.onload = render; document.head.appendChild(script); }
    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId); };
  }, [onToken]);
  if (!publicEnv.turnstileSiteKey) return <p className="turnstile-note">Spam protection will be enabled when this site is deployed.</p>;
  return <div className="turnstile-widget" ref={container} aria-label="Spam protection" />;
}

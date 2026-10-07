"use client";

import { useState } from "react";

export function FAQ() {
  const faqs = [
    {
      q: "What is KaiKhong.ai?",
      a: "KaiKhong is an AI marketing team that understands your business and helps run your marketing from strategy to execution."
    },
    {
      q: "Who is KaiKhong for?",
      a: "It's built specifically for solo founders, small businesses, and lean teams that don't have a dedicated marketing department."
    },
    {
      q: "What can KaiKhong help with?",
      a: "Strategy, research, content creation, SEO, social media planning, campaigns, and analytics."
    },
    {
      q: "Is KaiKhong a replacement for marketers?",
      a: "No. It's a tool designed to help you execute marketing effectively when you don't have the resources to hire a full team."
    },
    {
      q: "Is KaiKhong available now?",
      a: "We are currently building and testing the core product. You can join the waitlist for early access."
    },
    {
      q: "How much will it cost?",
      a: "Pricing is not finalized yet. Early access pricing will be announced to waitlist members before launch."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto" id="faq">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">FAQ</span>
        <h2 className="font-serif text-3xl text-black">Common questions</h2>
      </div>

      <div className="flex flex-col border-t border-charcoal/20">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-charcoal/20">
            <button 
              className="w-full text-left py-6 flex justify-between items-center group"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="font-bold text-black group-hover:text-forest transition-colors pr-8">{faq.q}</span>
              <span className="text-charcoal/30 text-xl font-light">{openIdx === i ? "−" : "+"}</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
              <p className="text-charcoal/70">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

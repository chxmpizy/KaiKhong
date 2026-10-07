"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="border border-forest bg-forest/5 p-12 text-center animate-fade-in">
        <h3 className="font-serif text-3xl text-black mb-4">You're on the list.</h3>
        <p className="text-charcoal/70">Thanks. We'll keep you posted as KaiKhong takes shape.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-charcoal/20 p-8 md:p-12" id="waitlist">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">Want your own AI marketing team?</h2>
        <p className="text-charcoal/70">Be one of the first to use KaiKhong. Join the waitlist and help shape what the AI marketing team becomes.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-black">Name</label>
            <input type="text" id="name" required className="border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-black transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black">Email</label>
            <input type="email" id="email" required className="border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-black transition-colors" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="business" className="text-xs font-bold uppercase tracking-widest text-black">Business / Website</label>
          <input type="text" id="business" className="border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-black transition-colors" />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <label className="text-xs font-bold uppercase tracking-widest text-black">What would you want KaiKhong to help with most?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Marketing Strategy", "Content", "SEO", "Social Media", "Finding Customers", "Analytics", "Other"].map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-charcoal/30 flex items-center justify-center group-hover:border-black transition-colors">
                  <input type="radio" name="help_topic" value={opt} className="appearance-none w-2 h-2 checked:bg-forest transition-colors" />
                </div>
                <span className="text-sm text-charcoal/80 group-hover:text-black transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-8 bg-black text-ivory py-4 font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {loading ? "Joining..." : "Join the Waitlist"}
        </button>
        
        <p className="text-center text-xs text-charcoal/50 mt-4">
          Early access pricing will be announced before launch.
        </p>
      </form>
    </div>
  );
}

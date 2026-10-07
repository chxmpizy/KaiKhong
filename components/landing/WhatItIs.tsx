export function WhatItIs() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid" id="product">
      <div className="col-span-1 md:col-span-12 editorial-rule pt-8">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          01 / WHAT IT IS
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-black mb-6 max-w-3xl">
          One AI team for your marketing.
        </h2>
        <p className="text-lg text-charcoal/80 max-w-2xl mb-16">
          KaiKhong brings marketing strategy, research, content, SEO, social, and analytics into one connected workflow.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border border-charcoal/20 p-8 md:p-12 bg-white/50">
          <div className="text-center w-full">
            <span className="text-sm font-bold uppercase tracking-widest text-black">YOUR BUSINESS</span>
          </div>
          <div className="text-charcoal/30 rotate-90 md:rotate-0">→</div>
          <div className="text-center w-full">
            <span className="text-sm font-bold uppercase tracking-widest text-forest">BUSINESS CONTEXT</span>
          </div>
          <div className="text-charcoal/30 rotate-90 md:rotate-0">→</div>
          <div className="text-center w-full">
            <span className="text-sm font-bold uppercase tracking-widest text-black">AI MARKETING TEAM</span>
          </div>
          <div className="text-charcoal/30 rotate-90 md:rotate-0">→</div>
          <div className="text-center w-full">
            <span className="text-sm font-bold uppercase tracking-widest text-black">MARKETING OUTPUTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

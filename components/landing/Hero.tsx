export function Hero() {
  return (
    <section className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto editorial-grid">
      <div className="col-span-1 md:col-span-12 flex flex-col items-center text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-forest mb-6">
          KAIKHONG.AI / AI MARKETING TEAM
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-black leading-[1.1] mb-6">
          Your AI Marketing Team.
        </h1>
        <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl mb-10">
          Strategy, content, SEO, social, and analytics — brought together in one AI team that understands your business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
          <a
            href="#waitlist"
            className="bg-black text-ivory px-8 py-3.5 text-base font-medium transition-transform hover:-translate-y-0.5"
          >
            Join the Waitlist
          </a>
          <a
            href="#how-it-works"
            className="text-black border-b border-black pb-0.5 text-base font-medium transition-opacity hover:opacity-70"
          >
            See How It Works
          </a>
        </div>
        
        <p className="text-sm text-charcoal/60">
          Built for solo founders, small businesses, and lean teams.
        </p>
      </div>

      <div className="col-span-1 md:col-span-10 md:col-start-2 mt-16 border-t border-b border-charcoal/20 py-12 px-8 bg-white/50 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="font-serif text-2xl text-black mb-2">KAIKHONG.AI</h3>
            <p className="text-sm text-charcoal/60 uppercase tracking-widest">Your Marketing Team</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium">
            {["Strategy", "Content", "SEO", "Social", "Analytics"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-charcoal/10 pt-4 flex justify-between items-center text-xs text-charcoal/50">
          <span>System Status: Building...</span>
          <span>v0.1-pre-alpha</span>
        </div>
      </div>
    </section>
  );
}

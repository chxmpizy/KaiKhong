export function Comparison() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid">
      <div className="col-span-1 md:col-span-12 editorial-rule pt-8 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          07 / WHY KAIKHONG
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-black">
          Not another AI tool.
        </h2>
      </div>

      <div className="col-span-1 md:col-span-10 md:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/20 border border-charcoal/20">
        <div className="bg-white p-12">
          <h3 className="text-sm font-bold tracking-widest text-charcoal/50 mb-8 border-b border-charcoal/10 pb-4">
            WITHOUT KAIKHONG
          </h3>
          <ul className="flex flex-col gap-6 text-charcoal/70">
            <li className="flex gap-3"><span className="text-charcoal/30">×</span> Too many tools</li>
            <li className="flex gap-3"><span className="text-charcoal/30">×</span> Disconnected workflows</li>
            <li className="flex gap-3"><span className="text-charcoal/30">×</span> Repeated context</li>
            <li className="flex gap-3"><span className="text-charcoal/30">×</span> Manual research</li>
            <li className="flex gap-3"><span className="text-charcoal/30">×</span> Unclear priorities</li>
          </ul>
        </div>
        <div className="bg-ivory p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-sm font-bold tracking-widest text-forest mb-8 border-b border-forest/20 pb-4">
            WITH KAIKHONG
          </h3>
          <ul className="flex flex-col gap-6 text-black font-medium relative z-10">
            <li className="flex gap-3"><span className="text-forest">→</span> One AI team</li>
            <li className="flex gap-3"><span className="text-forest">→</span> Shared business context</li>
            <li className="flex gap-3"><span className="text-forest">→</span> Connected workflow</li>
            <li className="flex gap-3"><span className="text-forest">→</span> Clear priorities</li>
            <li className="flex gap-3"><span className="text-forest">→</span> Continuous improvement</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

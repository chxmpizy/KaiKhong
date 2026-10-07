export function BusinessContext() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid">
      <div className="col-span-1 md:col-span-12 editorial-rule pt-8 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          04 / BUSINESS CONTEXT
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-black mb-6">
          AI that knows your business.
        </h2>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
          Instead of starting from zero every time, KaiKhong works from the same understanding of your business.
        </p>
      </div>

      <div className="col-span-1 md:col-span-8 md:col-start-3">
        <div className="border border-charcoal/20 bg-white p-12 flex flex-col items-center">
          <div className="text-sm font-bold tracking-widest text-black mb-6 border-b border-black pb-1">BUSINESS</div>
          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm text-charcoal/70">
            {["Product", "Customers", "Brand", "Competitors", "Goals", "Marketing", "Previous Work"].map((item) => (
              <span key={item} className="px-3 py-1 bg-ivory border border-charcoal/10">{item}</span>
            ))}
          </div>
          
          <div className="text-charcoal/30 mb-10">↓</div>
          
          <div className="text-xl font-serif text-forest mb-10">KAIKHONG</div>
          
          <div className="text-charcoal/30 mb-10">↓</div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-black uppercase tracking-wide">
            {["Strategy", "Content", "SEO", "Social", "Analytics"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

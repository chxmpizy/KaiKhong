export function ProductPreview() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid" id="product-preview">
      <div className="col-span-1 md:col-span-12 editorial-rule pt-8 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          06 / PRODUCT
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-black">
          See what your marketing team is working on.
        </h2>
      </div>

      <div className="col-span-1 md:col-span-12 border border-charcoal/20 bg-white overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r border-charcoal/10 bg-ivory/50 p-6 flex flex-col gap-8">
          <div className="font-serif text-xl">KaiKhong</div>
          <nav className="flex flex-col gap-3 text-sm text-charcoal/70">
            <span className="text-black font-medium">Overview</span>
            <span>Strategy</span>
            <span>Research</span>
            <span>Content</span>
            <span>SEO</span>
            <span>Social</span>
            <span>Analytics</span>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-12">
            <h3 className="text-2xl font-serif text-black mb-2">Good morning.</h3>
            <p className="text-charcoal/60">Here's what your marketing team is working on.</p>
          </div>
          
          <div className="mb-8 flex items-center justify-between border-b border-charcoal/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-black">Marketing Health</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest"></span>
              <span className="text-xs text-forest font-medium">ON TRACK</span>
            </div>
          </div>
          
          <p className="text-sm font-medium mb-6">3 things worth doing this week:</p>
          
          <div className="flex flex-col gap-4">
            {[
              { num: "01", text: "Publish the comparison article." },
              { num: "02", text: "Repurpose last week's content." },
              { num: "03", text: "Improve the landing page CTA." }
            ].map(task => (
              <div key={task.num} className="p-4 border border-charcoal/10 hover:border-forest/50 transition-colors flex items-start gap-4">
                <span className="text-xs font-bold text-forest mt-0.5">{task.num}</span>
                <span className="text-sm text-black">{task.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <span className="text-[10px] uppercase tracking-widest text-charcoal/40">Concept Visualization / Currently Building</span>
          </div>
        </div>
      </div>
    </section>
  );
}

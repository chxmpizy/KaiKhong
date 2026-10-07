export function WhatYouGet() {
  const capabilities = [
    { num: "01", name: "MARKETING STRATEGY", desc: "Turn your business goals into a clear marketing direction." },
    { num: "02", name: "RESEARCH", desc: "Understand customers, competitors, trends, and opportunities." },
    { num: "03", name: "CONTENT", desc: "Find ideas and create content around your brand and strategy." },
    { num: "04", name: "SEO", desc: "Discover search opportunities and create content that gets found." },
    { num: "05", name: "GEO", desc: "Improve your visibility across AI search and answer engines." },
    { num: "06", name: "SOCIAL", desc: "Plan and create content for the channels your customers use." },
    { num: "07", name: "CAMPAIGNS", desc: "Turn marketing ideas into structured campaigns." },
    { num: "08", name: "ANALYTICS", desc: "Understand what is working and what to do next." },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid" id="capabilities">
      <div className="col-span-1 md:col-span-12 editorial-rule pt-8 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          02 / WHAT YOU GET
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-black">
          Everything you need to keep marketing moving.
        </h2>
      </div>

      <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-charcoal/20">
        {capabilities.map((cap, i) => (
          <div key={cap.num} className="border-b border-charcoal/20 py-8 flex items-start gap-6 group">
            <span className="text-xs font-bold text-forest mt-1 w-6 shrink-0">{cap.num}</span>
            <div>
              <h3 className="text-lg font-bold text-black mb-2 tracking-wide uppercase">{cap.name}</h3>
              <p className="text-charcoal/70 mb-4">{cap.desc}</p>
              <div className="text-xs font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer">
                <span>EXPLORE</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

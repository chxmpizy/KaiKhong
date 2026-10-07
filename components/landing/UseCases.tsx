export function UseCases() {
  const cases = [
    { title: "SOLO FOUNDERS", desc: "Run marketing while building the business." },
    { title: "SMALL BUSINESSES", desc: "Keep marketing moving without hiring a full team." },
    { title: "SERVICE BUSINESSES", desc: "Turn expertise into visibility and leads." },
    { title: "ONLINE BUSINESSES", desc: "Build a repeatable marketing workflow." },
    { title: "SMALL STARTUPS", desc: "Grow distribution while focusing on product." },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid" id="built-for">
      <div className="col-span-1 md:col-span-12 editorial-rule pt-8 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          05 / BUILT FOR
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-black">
          Built for teams that don't have a marketing department.
        </h2>
      </div>

      <div className="col-span-1 md:col-span-12">
        <ul className="border-t border-charcoal/20">
          {cases.map((c, i) => (
            <li key={i} className="flex flex-col md:flex-row md:items-center py-6 border-b border-charcoal/20">
              <span className="text-sm font-bold tracking-widest text-black w-64 shrink-0 mb-2 md:mb-0">
                {c.title}
              </span>
              <span className="text-charcoal/70">
                {c.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

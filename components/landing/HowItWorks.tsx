export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "TELL US ABOUT YOUR BUSINESS",
      desc: "Your product, customers, brand, goals, and current marketing.",
    },
    {
      num: "02",
      title: "KAIKHONG UNDERSTANDS",
      desc: "Build a shared business context.",
    },
    {
      num: "03",
      title: "THE AI TEAM WORKS",
      desc: "Strategy, research, content, SEO, social, and more.",
    },
    {
      num: "04",
      title: "YOU REVIEW",
      desc: "You stay in control of the final decisions.",
    },
    {
      num: "05",
      title: "IMPROVE",
      desc: "Use results and feedback to make the next decision better.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid" id="how-it-works">
      <div className="col-span-1 md:col-span-4 editorial-rule pt-8">
        <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
          03 / HOW IT WORKS
        </span>
        <h2 className="font-serif text-4xl text-black leading-tight pr-8">
          Simple on the outside. Powerful underneath.
        </h2>
      </div>

      <div className="col-span-1 md:col-span-8 editorial-rule pt-8">
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col">
              <div className="flex gap-8 items-start py-6">
                <span className="text-sm font-bold text-forest shrink-0">{step.num}</span>
                <div>
                  <h3 className="text-base font-bold text-black tracking-wide uppercase mb-2">{step.title}</h3>
                  <p className="text-charcoal/70">{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="pl-[2.25rem] text-charcoal/20 pb-2">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

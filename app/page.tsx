import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhatItIs } from "@/components/landing/WhatItIs";
import { WhatYouGet } from "@/components/landing/WhatYouGet";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BusinessContext } from "@/components/landing/BusinessContext";
import { UseCases } from "@/components/landing/UseCases";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { Comparison } from "@/components/landing/Comparison";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { SmoothScroll } from "@/components/landing/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <WhatItIs />
        <WhatYouGet />
        <HowItWorks />
        <BusinessContext />
      <UseCases />
      <ProductPreview />
      <Comparison />
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto editorial-grid" id="pricing">
        <div className="col-span-1 md:col-span-12 editorial-rule pt-8 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest block mb-4">
            08 / EARLY ACCESS
          </span>
        </div>
        <div className="col-span-1 md:col-span-12">
          <WaitlistForm />
        </div>
      </section>
      <FAQ />
      <Footer />
    </main>
    </SmoothScroll>
  );
}

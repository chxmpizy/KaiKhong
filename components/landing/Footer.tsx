import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/20 bg-ivory pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto editorial-grid mb-16">
        <div className="col-span-1 md:col-span-4">
          <Link href="/" className="font-serif text-2xl text-black block mb-4">
            KaiKhong.ai
          </Link>
          <p className="text-charcoal/70">Your AI Marketing Team.</p>
        </div>
        
        <div className="col-span-1 md:col-span-4 md:col-start-9 flex flex-col sm:flex-row gap-8 md:justify-end">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link href="#product" className="text-charcoal/70 hover:text-black transition-colors">Product</Link>
            <Link href="#capabilities" className="text-charcoal/70 hover:text-black transition-colors">Capabilities</Link>
            <Link href="#how-it-works" className="text-charcoal/70 hover:text-black transition-colors">How It Works</Link>
            <Link href="#built-for" className="text-charcoal/70 hover:text-black transition-colors">Use Cases</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link href="#pricing" className="text-charcoal/70 hover:text-black transition-colors">Pricing</Link>
            <Link href="#faq" className="text-charcoal/70 hover:text-black transition-colors">FAQ</Link>
            <Link href="#" className="text-charcoal/70 hover:text-black transition-colors">Privacy</Link>
            <Link href="#" className="text-charcoal/70 hover:text-black transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-charcoal/10 text-xs text-charcoal/50 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} KaiKhong.ai</span>
        <span>Built in public.</span>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-charcoal/10 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-xl tracking-tight text-black">
            KaiKhong.ai
          </Link>
          
          <nav className="hidden md:flex gap-6 text-sm font-medium text-charcoal/80">
            <Link href="#product" className="hover:text-black transition-colors">Product</Link>
            <Link href="#capabilities" className="hover:text-black transition-colors">Capabilities</Link>
            <Link href="#how-it-works" className="hover:text-black transition-colors">How It Works</Link>
            <Link href="#built-for" className="hover:text-black transition-colors">Use Cases</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
          </nav>
        </div>

        <div className="hidden md:flex">
          <a
            href="#waitlist"
            className="bg-black text-ivory px-5 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            Join Waitlist
          </a>
        </div>

        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`h-0.5 w-6 bg-black transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`h-0.5 w-6 bg-black transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`h-0.5 w-6 bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-charcoal/10 bg-ivory px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="#product" onClick={() => setIsOpen(false)}>Product</Link>
          <Link href="#capabilities" onClick={() => setIsOpen(false)}>Capabilities</Link>
          <Link href="#how-it-works" onClick={() => setIsOpen(false)}>How It Works</Link>
          <Link href="#built-for" onClick={() => setIsOpen(false)}>Use Cases</Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <a
            href="#waitlist"
            onClick={() => setIsOpen(false)}
            className="bg-black text-ivory px-5 py-2 text-center mt-2"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  );
}

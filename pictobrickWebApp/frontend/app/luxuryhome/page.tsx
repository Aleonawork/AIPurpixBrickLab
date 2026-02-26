"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* Elegant Nav */}
      <nav className="absolute top-0 w-full z-50 px-8 py-6 flex justify-between items-center text-sm tracking-widest uppercase">
        <div className="font-bold">Pictobrick</div>
        <div className="hidden md:flex gap-12 text-gray-400">
          <Link href="#" className="hover:text-white transition-colors duration-300">Collection</Link>
          <Link href="#" className="hover:text-white transition-colors duration-300">The Process</Link>
        </div>
        <Link href="/studio" className="border-b border-transparent hover:border-[#d4af37] text-[#d4af37] transition-all duration-300">
          Commission a Piece
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="z-10 max-w-4xl mx-auto space-y-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-6">Bespoke Mosaic Art</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight">
              Immortalize your moments <br className="hidden md:block"/> in physical form.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center gap-8 pt-8"
          >
            <p className="text-gray-400 max-w-lg text-lg font-light">
              Elevate your favorite photographs into museum-quality brick mosaics, curated and packaged exclusively for you.
            </p>

            <Link href="/build" className="group flex items-center gap-4 bg-white text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300">
              Begin Creation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Fading bottom edge */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
      </main>

      {/* Minimalist Gallery Grid */}
      <section className="px-4 py-24 md:px-12 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
         {[1, 2, 3].map((item, i) => (
           <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="aspect-[3/4] bg-[#141414] border border-[#222] flex flex-col items-center justify-center p-8 text-center group cursor-pointer"
           >
             <div className="w-full h-full border border-[#333] mb-6 relative overflow-hidden flex items-center justify-center text-gray-600 font-serif italic group-hover:border-[#d4af37] transition-colors duration-500">
               Artwork {item}
             </div>
             <p className="text-xs tracking-widest text-gray-500 uppercase">Series 00{item}</p>
           </motion.div>
         ))}
      </section>
    </div>
  );
}
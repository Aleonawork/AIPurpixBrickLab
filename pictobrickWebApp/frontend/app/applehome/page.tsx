"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

export default function ShowcasePage() {
  

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-black selection:text-white">
      
      {/* Sticky Minimal Nav */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-xs font-semibold tracking-wide">
          <Link href="/" className="hover:opacity-70 transition">Pictobrick</Link>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:opacity-70">Overview</span>
            <span className="cursor-pointer hover:opacity-70">Tech Specs</span>
            <Link href="/build" className="bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition">
              Buy
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-500 mb-2 tracking-tight">Pictobrick Studio</h2>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            Mind-blowing detail.<br />Brick by brick.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium mb-8 max-w-2xl mx-auto">
            Transform your memories into stunning, physical mosaic art. Powered by advanced image processing.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg">
              Start Building
            </Button>
            <Link href="#" className="text-blue-600 text-xl font-medium hover:underline flex items-center">
              Learn more <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Section (Image focused) */}
      <section className="py-32 bg-[#f5f5f7] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full max-w-5xl aspect-video bg-gray-200 rounded-3xl shadow-2xl flex items-center justify-center border border-gray-300 relative overflow-hidden"
          >
            {/* Placeholder for high-res product image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white opacity-50" />
            <span className="text-gray-400 font-medium text-lg relative z-10">[ Stunning High-Res Product Render Here ]</span>
          </motion.div>
      </section>
    </div>
  );
}
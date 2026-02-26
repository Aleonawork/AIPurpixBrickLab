"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Sparkles } from "lucide-react";

export default function PlayfulPage() {
  return (
    <div className="min-h-screen bg-[#FFE800] text-black font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center border-b-4 border-black bg-white">
        <div className="font-black text-2xl tracking-tighter uppercase">Picto<span className="text-blue-600">brick</span></div>
        <div className="hidden md:flex gap-8 font-bold">
          <Link href="#" className="hover:underline decoration-4 underline-offset-4">How it works</Link>
          <Link href="#" className="hover:underline decoration-4 underline-offset-4">Gallery</Link>
        </div>
        <Link href="/build" className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Start Building
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Text */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center gap-2 bg-white border-4 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Sparkles className="w-5 h-5 text-yellow-500" fill="currentColor" />
            Turn Photos Into Bricks!
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
            Build <br/> Your <span className="text-blue-600">Memories.</span>
          </h1>
          
          <p className="text-xl font-bold max-w-md">
            Upload any photo and we'll send you a custom brick set to build it yourself. It's that easy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/studio" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl py-4 px-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2">
              <ImageIcon className="w-6 h-6" /> Upload Photo
            </Link>
          </div>
        </div>

        {/* Right Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative aspect-square bg-pink-400 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden"
        >
           {/* Abstract brick pattern background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 4px, transparent 4px)', backgroundSize: '32px 32px' }} />
          <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 rotate-[-6deg]">
             <div className="w-48 h-48 bg-gray-200 border-4 border-black mb-4 flex items-center justify-center text-gray-500 font-bold">
               [ Pixel Art Example ]
             </div>
             <p className="font-black text-2xl uppercase">You Built This!</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
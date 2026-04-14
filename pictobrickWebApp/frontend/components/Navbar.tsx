"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
          <Image 
            src="/logobackgroundremoved.png" 
            alt="PictoBrick Logo" 
            width={120} 
            height={120}
            className="rounded-lg"
          />
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/gallery" className="hover:text-indigo-400 transition">Gallery</Link>
          <Link href="/pricing" className="hover:text-indigo-400 transition">Pricing</Link>
          <Link href="/faq" className="hover:text-indigo-400 transition">FAQ</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-300 hover:text-white hidden sm:flex">
            Sign In
          </Button>
          <Link href="/create">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
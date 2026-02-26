"use line";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

// Mock Data for the Configurator
const CONFIG_OPTIONS = {
  sizes: [
    { id: "s", name: "Standard", dims: "16x16 in", price: 49 },
    { id: "m", name: "Gallery", dims: "24x24 in", price: 89 },
    { id: "l", name: "Mural", dims: "32x32 in", price: 149 },
  ],
  palettes: [
    { id: "mono", name: "Monochrome", colors: ["#000000", "#555555", "#AAAAAA", "#FFFFFF"] },
    { id: "vintage", name: "Vintage Sepia", colors: ["#3E2723", "#5D4037", "#8D6E63", "#D7CCC8"] },
    { id: "vibrant", name: "Vibrant Pop", colors: ["#FF1744", "#00E676", "#2979FF", "#FFEA00"] },
  ]
};

export default function BuilderPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedPalette, setSelectedPalette] = useState("mono");

  // Calculate Total
  const basePrice = CONFIG_OPTIONS.sizes.find(s => s.id === selectedSize)?.price || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* LEFT: Preview Area (Fixed) */}
      <div className="w-full md:w-[60%] bg-white border-r border-gray-200 md:h-screen md:sticky top-0 flex flex-col relative">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Build Your Canvas</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
             {/* Dynamic Preview Box based on selections */}
            <motion.div
              key={`${selectedSize}-${selectedPalette}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 shadow-inner flex items-center justify-center transition-all duration-500 ease-in-out"
              style={{
                width: selectedSize === 's' ? '250px' : selectedSize === 'm' ? '350px' : '450px',
                height: selectedSize === 's' ? '250px' : selectedSize === 'm' ? '350px' : '450px',
                border: `8px solid ${CONFIG_OPTIONS.palettes.find(p => p.id === selectedPalette)?.colors[0]}`
              }}
            >
              <div className="text-center text-gray-400 font-medium">
                Live Preview <br/>
                <span className="text-sm font-normal">{CONFIG_OPTIONS.sizes.find(s => s.id === selectedSize)?.dims}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Price Summary Bar */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total Price</p>
            <p className="text-3xl font-bold">${basePrice}</p>
          </div>
          <Button className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-6 rounded-none font-bold text-lg">
            Checkout Now
          </Button>
        </div>
      </div>

      {/* RIGHT: Configurator Panel (Scrollable) */}
      <div className="w-full md:w-[40%] bg-gray-50 p-6 lg:p-12 h-screen overflow-y-auto">
        
        {/* Step 1: Size */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">1. Canvas Size</h2>
            <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
          
          <div className="space-y-3">
            {CONFIG_OPTIONS.sizes.map((size) => (
              <div 
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`
                  p-5 border-2 cursor-pointer transition-all duration-200 flex justify-between items-center
                  ${selectedSize === size.id ? 'border-gray-900 bg-white shadow-md' : 'border-gray-200 hover:border-gray-300 bg-transparent'}
                `}
              >
                <div>
                  <h3 className="font-bold text-gray-900">{size.name}</h3>
                  <p className="text-sm text-gray-500">{size.dims}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">${size.price}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSize === size.id ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {selectedSize === size.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Color Palette */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">2. Brick Palette</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {CONFIG_OPTIONS.palettes.map((palette) => (
              <div 
                key={palette.id}
                onClick={() => setSelectedPalette(palette.id)}
                className={`
                  p-5 border-2 cursor-pointer transition-all duration-200
                  ${selectedPalette === palette.id ? 'border-gray-900 bg-white shadow-md' : 'border-gray-200 hover:border-gray-300 bg-transparent'}
                `}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900">{palette.name}</h3>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPalette === palette.id ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
                    {selectedPalette === palette.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                
                {/* Visual Palette Swatches */}
                <div className="flex h-8 w-full rounded-sm overflow-hidden">
                  {palette.colors.map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step Placeholder */}
        <div className="opacity-50 pointer-events-none">
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Upload Photo</h2>
          <div className="p-8 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-500">Complete previous steps first</p>
          </div>
        </div>

      </div>
    </div>
  );
}
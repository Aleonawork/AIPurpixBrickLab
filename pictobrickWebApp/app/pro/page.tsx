import Link from "next/link";
import { Button } from "@/components/ui/button";
import PictobrickStudioPro from "@/components/PictobrickStudioPro";

export default function ProPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a]">
      
      {/* Navigation Button */}
      <div className="absolute top-6 right-6 z-50">
        <Link href="/">
          <Button variant="outline" className="bg-slate-900 text-white border-slate-700 hover:bg-slate-800">
            ← Back to Standard
          </Button>
        </Link>
      </div>

      {/* The Actual Component */}
      <PictobrickStudioPro />
      
    </main>
  );
}
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export function TrackingSearchBox({
  defaultNumber = "",
  className = "",
}: {
  defaultNumber?: string;
  className?: string;
}) {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState(defaultNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    router.push(`/track/${encodeURIComponent(trackingNumber.trim().toUpperCase())}`);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto text-left ${className}`}>
      {/* Sleek Glassmorphism Dark Search Form (Style Maersk / Alain Logistics) */}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row items-center gap-2 p-2.5 rounded-2xl glass-dark shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#42B0D5]/60 group"
      >
        <div className="relative flex-1 flex items-center w-full px-2">
          <Search className="w-5 h-5 text-[#42B0D5] ml-2 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Entrez votre numéro de suivi (ex : HL-2026-000001)"
            className="w-full bg-transparent py-3 pr-3 text-base font-medium text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#42B0D5] hover:bg-[#38A4C8] active:bg-[#2892B4] text-[#00243D] font-display font-extrabold text-base uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#42B0D5]/25 active:scale-98 cursor-pointer flex-shrink-0"
        >
          <span>SUIVRE</span>
          <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Helper text below search bar */}
      <div className="flex items-center gap-2 mt-3.5 text-xs text-white/80 font-medium">
        <span className="text-white/60">Numéro officiel d&apos;exemple :</span>
        <button
          type="button"
          onClick={() => {
            setTrackingNumber("HL-2026-000001");
            router.push("/track/HL-2026-000001");
          }}
          className="font-mono text-white font-bold hover:text-[#42B0D5] border border-white/20 px-2.5 py-0.5 rounded-md glass-dark transition-colors cursor-pointer shadow-xs"
        >
          HL-2026-000001
        </button>
      </div>
    </div>
  );
}

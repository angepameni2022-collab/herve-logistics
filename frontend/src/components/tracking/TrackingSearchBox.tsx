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
    <div className={`w-full max-w-2xl mx-auto text-left ${className}`}>
      {/* Bright & Luminous Search Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-white/90 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-red-400/50"
      >
        <div className="relative flex-1 flex items-center w-full">
          <Search className="w-5 h-5 text-slate-400 ml-3 mr-2.5 flex-shrink-0" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Entrez votre numéro de suivi (ex : HL-2026-000001)"
            className="w-full bg-transparent py-3 pr-3 text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#DC2626] to-[#E11D48] hover:from-[#B91C1C] hover:to-[#BE123C] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-500/30 active:scale-98 cursor-pointer flex-shrink-0"
        >
          <span>SUIVRE</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </form>

      {/* Helper text below search bar */}
      <div className="flex items-center gap-2 mt-3 text-xs text-white/95 font-medium drop-shadow-sm">
        <span className="text-white/80 font-bold">Numéro d&apos;exemple :</span>
        <button
          type="button"
          onClick={() => {
            setTrackingNumber("HL-2026-000001");
            router.push("/track/HL-2026-000001");
          }}
          className="font-mono text-slate-900 font-extrabold hover:text-[#DC2626] border border-white/80 px-2.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
        >
          HL-2026-000001
        </button>
      </div>
    </div>
  );
}

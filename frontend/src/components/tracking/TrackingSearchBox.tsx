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
      {/* Dark Glass Search Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row items-center gap-2 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-zinc-700/80 shadow-2xl transition-all focus-within:border-red-500/80"
      >
        <div className="relative flex-1 flex items-center w-full">
          <Search className="w-5 h-5 text-zinc-400 ml-3 mr-2.5 flex-shrink-0" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Entrez votre numéro de suivi (ex : HL-2026-000001)"
            className="w-full bg-transparent py-3 pr-3 text-sm sm:text-base font-medium text-white placeholder-zinc-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-500/30 active:scale-98 cursor-pointer flex-shrink-0"
        >
          <span>SUIVRE</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </form>

      {/* Helper text below search bar */}
      <div className="flex items-center gap-2 mt-3 text-xs text-zinc-300">
        <span className="text-zinc-400 font-medium">Essayez :</span>
        <button
          type="button"
          onClick={() => {
            setTrackingNumber("HL-2026-000001");
            router.push("/track/HL-2026-000001");
          }}
          className="font-mono text-zinc-200 hover:text-white border border-zinc-600/80 hover:border-red-500 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs transition-colors cursor-pointer"
        >
          HL-2026-000001
        </button>
      </div>
    </div>
  );
}

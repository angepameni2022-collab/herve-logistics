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
      {/* Sleek Glassmorphism Dark Search Form (Style Carbon Black & Gold) */}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row items-center gap-2 p-2.5 rounded-2xl glass-dark shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#FFB800]/60 group"
      >
        <div className="relative flex-1 flex items-center w-full px-2">
          <Search className="w-5 h-5 text-[#FFB800] ml-2 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Entrez votre numéro de suivi (ex : ALT-2026-000001)"
            className="w-full bg-transparent py-3 pr-3 text-base font-medium text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FFB800] hover:bg-[#E5A800] active:bg-[#D97706] text-[#09090B] font-display font-extrabold text-base uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#FFB800]/25 active:scale-98 cursor-pointer flex-shrink-0"
        >
          <span>SUIVRE</span>
          <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Helper text below search bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 text-xs text-white/80 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-white/60">Numéro officiel d&apos;exemple :</span>
          <button
            type="button"
            onClick={() => {
              setTrackingNumber("ALT-2026-000001");
              router.push("/track/ALT-2026-000001");
            }}
            className="font-mono text-white font-bold hover:text-[#FFB800] border border-white/20 px-2.5 py-0.5 rounded-md glass-dark transition-colors cursor-pointer shadow-xs"
          >
            ALT-2026-000001
          </button>
        </div>

        <a
          href="https://wa.me/447456062192?text=Bonjour%2C%20je%20souhaite%20obtenir%20mon%20code%20de%20suivi%20pour%20mon%20colis."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFB800] hover:text-white underline text-xs transition-colors"
        >
          Obtenir mon code par messagerie →
        </a>
      </div>
    </div>
  );
}

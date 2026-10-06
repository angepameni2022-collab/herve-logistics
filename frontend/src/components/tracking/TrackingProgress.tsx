"use client";

import React from "react";
import { Check, Clock } from "lucide-react";
import { ShipmentStatus } from "@/data/shipments";

interface TrackingProgressProps {
  status: ShipmentStatus;
  progress: number; // e.g. 79
}

export function TrackingProgress({ status, progress }: TrackingProgressProps) {
  const steps = [
    { label: "Expédié", minProgress: 20 },
    { label: "En transit", minProgress: 50 },
    { label: "Arrivée prévue", minProgress: 85 },
    { label: "Livré", minProgress: 100 },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Avancement du transit
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#09090B] mt-0.5">
            {progress}% complété
          </div>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#FEF2F2] text-[#DC2626] font-bold text-xs sm:text-sm border border-red-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
          {status.toUpperCase()}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative my-6 px-4">
        {/* Track Line Background */}
        <div className="absolute top-1/2 left-4 right-4 h-2 -translate-y-1/2 bg-zinc-100 rounded-full" />

        {/* Active Track Line in Red / Black Gradient */}
        <div
          className="absolute top-1/2 left-4 h-2 -translate-y-1/2 bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#EF4444] rounded-full transition-all duration-700 overflow-hidden"
          style={{ width: `calc(${Math.min(Math.max(progress, 0), 100)}% - 2rem)` }}
        >
          <div className="w-full h-full animate-shimmer" />
        </div>

        {/* 4 Steps Markers */}
        <div className="relative flex justify-between items-center z-10">
          {steps.map((step, index) => {
            const isCompleted = progress >= step.minProgress;
            const isCurrent =
              !isCompleted &&
              (index === 0 || progress >= steps[index - 1].minProgress);

            return (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? "bg-[#DC2626] text-white shadow-md shadow-red-500/30 ring-4 ring-red-50"
                      : isCurrent
                      ? "bg-white border-2 border-[#DC2626] text-[#DC2626] ring-4 ring-red-50"
                      : "bg-white border-2 border-zinc-200 text-zinc-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 text-[#DC2626] animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                  )}
                </div>

                <span
                  className={`mt-3 text-xs sm:text-sm font-bold whitespace-nowrap ${
                    isCompleted || isCurrent ? "text-[#09090B]" : "text-zinc-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

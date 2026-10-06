"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendDirection = "up",
  subtitle,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-red-200 hover:shadow-md transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center border border-red-100">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-3xl font-extrabold text-[#09090B] tracking-tight">{value}</div>
        {(trend || subtitle) && (
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            {trend && (
              <span
                className={`inline-flex items-center font-bold ${
                  trendDirection === "up"
                    ? "text-[#DC2626]"
                    : trendDirection === "down"
                    ? "text-zinc-500"
                    : "text-zinc-500"
                }`}
              >
                {trendDirection === "up" && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
                {trendDirection === "down" && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {trend}
              </span>
            )}
            {subtitle && <span className="text-zinc-400">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

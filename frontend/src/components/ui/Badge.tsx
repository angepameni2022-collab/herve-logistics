"use client";

import React from "react";
import { ShipmentStatus } from "@/data/shipments";

interface BadgeProps {
  children?: React.ReactNode;
  status?: ShipmentStatus | "Arrivée prévue" | "Actif" | "Suspendu" | "En attente" | string;
  variant?: "primary" | "success" | "warning" | "info" | "neutral" | "danger" | "dark";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  status,
  variant,
  size = "md",
  className = "",
  dot = true,
}: BadgeProps) {
  let badgeVariant = variant;

  if (status && !badgeVariant) {
    switch (status) {
      case "Livré":
      case "Actif":
        badgeVariant = "success";
        break;
      case "En transit":
        badgeVariant = "primary";
        break;
      case "Expédié":
      case "Arrivée prévue":
      case "Arrivé":
        badgeVariant = "dark";
        break;
      case "En attente":
        badgeVariant = "warning";
        break;
      case "Suspendu":
        badgeVariant = "danger";
        break;
      default:
        badgeVariant = "neutral";
    }
  }

  const variantStyles = {
    primary: "bg-[#FEF2F2] text-[#DC2626] border-red-200",
    dark: "bg-zinc-900 text-white border-zinc-800",
    info: "bg-red-50 text-red-700 border-red-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    neutral: "bg-zinc-100 text-zinc-700 border-zinc-200",
  };

  const dotColors = {
    primary: "bg-[#DC2626]",
    dark: "bg-red-500",
    info: "bg-red-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    neutral: "bg-zinc-400",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium",
    md: "text-xs px-3 py-1 font-semibold",
  };

  const chosenVariant = badgeVariant || "neutral";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[chosenVariant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[chosenVariant]}`} />}
      <span>{children || status}</span>
    </span>
  );
}

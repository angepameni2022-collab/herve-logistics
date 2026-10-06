"use client";

import React from "react";
import { PackageSearch } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-zinc-200/90 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4 border border-red-100">
        {icon || <PackageSearch className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-[#09090B] mb-1.5">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
}

export function LoadingState({ message = "Chargement des données..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-10 h-10 border-3 border-[#DC2626]/20 border-t-[#DC2626] rounded-full animate-spin mb-3" />
      <p className="text-sm text-zinc-500 font-medium">{message}</p>
    </div>
  );
}

"use client";

import React from "react";

export function TableContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-zinc-200/90 bg-white shadow-xs ${className}`}>
      <table className="w-full text-left text-sm text-[#09090B] border-collapse">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-zinc-50/90 text-[11px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-200">{children}</thead>;
}

export function TableRow({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-zinc-100 last:border-0 hover:bg-zinc-50/70 transition-colors ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHeaderCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-4 py-3.5 whitespace-nowrap ${className}`}>{children}</th>;
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3.5 whitespace-nowrap text-sm ${className}`}>{children}</td>;
}

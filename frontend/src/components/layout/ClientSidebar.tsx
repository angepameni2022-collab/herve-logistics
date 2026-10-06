"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  User,
  MessageSquare,
  LogOut,
  Box,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export function ClientSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Tableau de bord", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Déclarer un envoi (Code HL)", href: "/dashboard/new-request", icon: <Package className="w-5 h-5 text-[#DC2626]" /> },
    { label: "Mes envois", href: "/dashboard/shipments", icon: <Package className="w-5 h-5" /> },
    { label: "Mon profil", href: "/dashboard/profile", icon: <User className="w-5 h-5" /> },
    { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DC2626] flex items-center justify-center text-white shadow-sm shadow-red-500/30">
              <span className="text-xs font-black tracking-tighter flex items-center gap-0.5">
                HL <span className="text-[10px]">▶</span>
              </span>
            </div>
            <div>
              <span className="text-base font-black text-[#09090B] tracking-tight leading-none block">
                HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                Portail Client · Corée
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-zinc-400 hover:text-zinc-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#FEF2F2] text-[#DC2626] shadow-xs"
                    : "text-zinc-600 hover:text-[#09090B] hover:bg-zinc-50"
                }`}
              >
                <span className={active ? "text-[#DC2626]" : "text-zinc-400"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/60">
        <div className="flex items-center gap-3 px-2 py-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#09090B] truncate">Jean Dupont</p>
            <p className="text-[10px] text-zinc-500 truncate">jean.dupont@email.com</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-zinc-600 hover:text-[#09090B] hover:bg-zinc-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Site public</span>
          </Link>
          <Link
            href="/auth/login"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-zinc-200 z-30 px-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#09090B] border border-red-600/40 flex items-center justify-center text-white">
            <Box className="w-4 h-4 text-[#DC2626]" />
          </div>
          <span className="text-base font-bold text-[#09090B]">
            Trans<span className="text-[#DC2626]">Logix</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-zinc-600 hover:text-[#09090B] rounded-lg hover:bg-zinc-100"
          aria-label="Ouvrir le menu latéral"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-zinc-200 fixed inset-y-0 left-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-full bg-white h-full z-10 shadow-2xl">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}

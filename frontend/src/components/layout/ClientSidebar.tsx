"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  User,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ClientSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { shipments, currentUser } = useApp();

  const clientShipmentsCount = shipments.filter(
    (s) =>
      s.clientEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      s.trackingNumber.startsWith("HL-") ||
      s.trackingNumber.startsWith("TL-2025-00012")
  ).length;

  const navItems = [
    {
      label: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Déclarer un envoi",
      href: "/dashboard/new-request",
      icon: <PlusCircle className="w-5 h-5 text-[#DC2626]" />,
      badge: "NOUVEAU",
      badgeColor: "bg-red-50 text-[#DC2626] border-red-200",
    },
    {
      label: "Mes expéditions",
      href: "/dashboard/shipments",
      icon: <Package className="w-5 h-5" />,
      count: clientShipmentsCount,
    },
    {
      label: "Suivi Satellite Carte",
      href: "/track/HL-2026-000001",
      icon: <Globe className="w-5 h-5 text-emerald-600" />,
      badge: "LIVE",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      label: "Mon profil client",
      href: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Support & Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full justify-between bg-white select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md shadow-red-500/15 border border-zinc-100 group-hover:scale-105 transition-transform flex-shrink-0">
              <Image
                src="/images/logo-herve.png"
                alt="Hervé Logistics Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-base font-black text-[#09090B] tracking-tight leading-none block">
                HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-1 block">
                Portail Client International
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-5 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Navigation Client
          </div>

          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
                  active
                    ? "bg-[#FEF2F2] text-[#DC2626] font-bold shadow-xs border border-red-100/80"
                    : "text-zinc-600 hover:text-[#09090B] hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`transition-colors flex-shrink-0 ${
                      active ? "text-[#DC2626]" : "text-zinc-400 group-hover:text-zinc-700"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        active
                          ? "bg-[#DC2626] text-white"
                          : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Safe-zone Logout (Extra bottom padding to clear dev badges) */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/70 pb-8">
        <div className="bg-white p-3 rounded-2xl border border-zinc-200/80 shadow-xs mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-red-500/25 flex-shrink-0">
              {currentUser.name
                ? currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()
                : "JD"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-[#09090B] truncate">
                  {currentUser.name || "Jean Dupont"}
                </p>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-zinc-500 truncate font-mono">
                {currentUser.email || "jean.dupont@email.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 bg-white hover:bg-zinc-100 border border-zinc-200 transition-colors shadow-2xs"
            title="Revenir sur la page d'accueil publique"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            <span>Site public</span>
          </Link>
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#DC2626] bg-red-50 hover:bg-red-100 border border-red-200/80 transition-colors shadow-2xs"
            title="Fermer la session client"
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
          <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center border border-zinc-200 shadow-xs">
            <Image
              src="/images/logo-herve.png"
              alt="Hervé Logistics Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-base font-black text-[#09090B] tracking-tight">
            HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-zinc-600 hover:text-[#09090B] rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
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

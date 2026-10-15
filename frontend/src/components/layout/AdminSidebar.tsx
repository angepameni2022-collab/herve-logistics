"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CalendarCheck2,
  Users,
  MessageSquare,
  FileEdit,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { messages, shipments, currentUser, adminLogout } = useApp();

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const navItems = [
    { label: "Tableau de bord", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Envois", href: "/admin/shipments", icon: <Package className="w-5 h-5" />, badge: shipments.length },
    {
      label: "Navigateur GPS Colis",
      href: "/admin/displacement",
      icon: <Navigation className="w-5 h-5 text-[#FFB800]" />,
      badge: "LIVE",
      badgeColor: "bg-[#B45309]",
    },
    { label: "Événements", href: "/admin/events", icon: <CalendarCheck2 className="w-5 h-5" /> },
    { label: "Clients", href: "/admin/clients", icon: <Users className="w-5 h-5" /> },
    {
      label: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="w-5 h-5" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeColor: "bg-[#FFB800]",
    },
    { label: "Contenus", href: "/admin/cms", icon: <FileEdit className="w-5 h-5" /> },
    { label: "Journal d'activité", href: "/admin/activity", icon: <History className="w-5 h-5" /> },
    { label: "Paramètres", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#27272A] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-black border border-white/20 p-1 flex items-center justify-center shadow-sm flex-shrink-0 overflow-hidden">
              <Image
                src="/images/logo-herve-official.png"
                alt="Hervé Logistics"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-display text-lg font-extrabold text-white tracking-tight leading-none block uppercase">
                HERVÉ <span className="text-[#FFB800]">LOGISTICS</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                Console Admin · Corée
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-white/60 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-6 space-y-1">
          <div className="px-3 pb-2 font-display text-[11px] font-bold uppercase tracking-wider text-white/40">
            Gestion Opérationnelle
          </div>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#27272A] text-white border border-[#FFB800]/40 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={active ? "text-[#FFB800]" : "text-white/50 group-hover:text-white"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      active
                        ? "bg-[#FFB800] text-[#09090B]"
                        : item.badgeColor
                        ? `${item.badgeColor} text-white`
                        : "bg-[#27272A] text-white/70"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer User / Logout */}
      <div className="p-4 border-t border-[#27272A] bg-[#09090B]">
        <div className="flex items-center gap-3 px-2 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center font-bold text-xs border border-[#FFB800]/30">
            {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : "AD"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{currentUser?.name || "Admin Principal"}</p>
            <p className="text-[10px] text-white/50 truncate">{currentUser?.email || "admin@hervelogistics.com"}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Site public</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              adminLogout();
              showToast("Session administrateur fermée.", "info");
              router.push("/admin/login");
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#121212] border-b border-[#27272A] z-30 px-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-black border border-white/20 p-0.5 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image
              src="/images/logo-herve-official.png"
              alt="Hervé Logistics"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-display text-base font-extrabold uppercase text-white">
            HERVÉ <span className="text-[#FFB800]">LOGISTICS</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5"
          aria-label="Ouvrir le menu latéral"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#121212] border-r border-[#27272A] fixed inset-y-0 left-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-full bg-[#121212] h-full z-10 shadow-2xl">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminSidebar;

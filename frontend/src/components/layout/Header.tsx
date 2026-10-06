"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "ACCUEIL", href: "/" },
    { label: "NOS SERVICES", href: "/services" },
    { label: "À PROPOS", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 h-[74px] bg-[#09090B] border-b border-zinc-800/90 shadow-md text-white transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO HERVÉ LOGISTICS */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Red Badge Logo */}
          <div className="w-10 h-10 rounded-xl bg-[#DC2626] flex items-center justify-center text-white font-black shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform">
            <span className="text-xs sm:text-sm font-black tracking-tighter flex items-center gap-0.5">
              HL <span className="text-[10px]">▶</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-none">
              HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
            </span>
            <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest mt-0.5">
              TRANSIT & LOGISTIQUE
            </span>
          </div>
        </Link>

        {/* Desktop Nav (Center) */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs sm:text-sm font-black tracking-wider uppercase transition-colors py-2 ${
                  active
                    ? "text-[#DC2626]"
                    : "text-white hover:text-[#DC2626]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#DC2626] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:text-[#DC2626] transition-colors"
          >
            CONNEXION
          </Link>

          <Link
            href="/track/HL-2026-000001"
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-red-500/30 active:scale-98 transition-all"
          >
            <span>SUIVRE UN COLIS</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090B] border-b border-zinc-800 p-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-between ${
                    active
                      ? "bg-red-500/10 text-[#DC2626]"
                      : "text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                  {active && <span className="w-2 h-2 rounded-full bg-[#DC2626]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-4 border-t border-zinc-800 flex flex-col gap-3">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-white border border-zinc-700 hover:bg-zinc-900"
            >
              CONNEXION
            </Link>
            <Link
              href="/track/HL-2026-000001"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg text-sm font-black uppercase tracking-wider bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md shadow-red-500/30"
            >
              SUIVRE UN COLIS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

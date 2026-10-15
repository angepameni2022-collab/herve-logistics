"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Nos services", href: "/services" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-200/60 shadow-xs"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO HERVÉ LOGISTICS */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 items-center rounded-sm bg-[#DC2626] px-2.5 shadow-sm ring-1 ring-red-700/20">
            <span className="font-mono text-[20px] font-black leading-none tracking-tight text-white">
              HV
            </span>
            <span
              aria-hidden="true"
              className="ml-1 h-0 w-0 border-y-[9px] border-l-[9px] border-y-transparent border-l-white"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[19px] font-black uppercase tracking-tight text-slate-900">
              Hervé <span className="text-[#DC2626]">Logistics</span>
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Global Logistics
            </span>
          </div>
        </Link>

        {/* Navigation Bureau */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-bold uppercase tracking-wider transition-colors hover:text-[#DC2626] ${
                  active ? "text-[#DC2626] border-b-2 border-[#DC2626] pb-1" : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Boutons d'action Bureau */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/connexion"
            className="inline-flex items-center justify-center whitespace-nowrap h-9 rounded-lg px-4 font-bold uppercase tracking-wider text-xs text-slate-700 hover:text-[#DC2626] hover:bg-red-50/70 border border-slate-200 transition-all"
          >
            Connexion
          </Link>
          <Link
            href="/#tracking"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-9 px-5 bg-gradient-to-r from-[#DC2626] to-[#E11D48] text-white hover:from-[#B91C1C] hover:to-[#BE123C] font-black uppercase tracking-wider text-xs shadow-md shadow-red-500/25 rounded-lg transition-all active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Suivre un colis</span>
          </Link>
        </div>

        {/* Bouton Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-bold uppercase tracking-wider ${
                isActive(link.href) ? "text-[#DC2626]" : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-slate-300 text-xs font-bold uppercase text-slate-700 hover:bg-slate-50"
            >
              Connexion
            </Link>
            <Link
              href="/#tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#E11D48] text-xs font-bold uppercase text-white shadow-md shadow-red-500/20"
            >
              Suivre un colis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

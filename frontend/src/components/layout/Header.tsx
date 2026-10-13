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
          ? "bg-[#09090B]/95 backdrop-blur-md border-b border-zinc-800 shadow-xl"
          : "bg-[#09090B]/80 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO HERVÉ LOGISTICS */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 items-center rounded-sm bg-[#DC2626] px-2.5 shadow-sm ring-1 ring-black/5">
            <span className="font-mono text-[20px] font-black leading-none tracking-tight text-white">
              HV
            </span>
            <span
              aria-hidden="true"
              className="ml-1 h-0 w-0 border-y-[9px] border-l-[9px] border-y-transparent border-l-white"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[19px] font-black uppercase tracking-tight text-white">
              Hervé <span className="text-[#DC2626]">Logistics</span>
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
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
                  active ? "text-[#DC2626]" : "text-white"
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
            className="inline-flex items-center justify-center whitespace-nowrap h-8 rounded-md px-3 font-semibold uppercase tracking-wider text-xs text-white hover:bg-white/10 transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/suivi"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-8 px-4 bg-[#DC2626] text-white hover:bg-[#B91C1C] font-bold uppercase tracking-wider text-xs shadow-md rounded-sm transition-all shadow-red-500/20 active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Suivre un colis</span>
          </Link>
        </div>

        {/* Bouton Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090B] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-bold uppercase tracking-wider ${
                isActive(link.href) ? "text-[#DC2626]" : "text-zinc-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-zinc-700 text-xs font-bold uppercase text-white hover:bg-zinc-900"
            >
              Connexion
            </Link>
            <Link
              href="/suivi"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#DC2626] text-xs font-bold uppercase text-white hover:bg-[#B91C1C]"
            >
              Suivre un colis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-[#121212]/95 backdrop-blur-md border-b border-[#27272A] shadow-lg shadow-black/40"
          : "bg-[#121212]/90 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* LOGO HERVÉ LOGISTICS OFFICIEL */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 rounded-lg overflow-hidden border border-white/20 bg-black shadow-md group-hover:scale-105 transition-transform flex-shrink-0 flex items-center justify-center">
            <Image
              src="/images/logo-herve-official.png"
              alt="Hervé Logistics Logo"
              width={44}
              height={44}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[20px] font-extrabold uppercase tracking-tight text-white">
              Hervé <span className="text-[#FFB800]">Logistics</span>
            </span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
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
                className={`font-display text-[15px] font-bold uppercase tracking-wider transition-colors hover:text-[#FFB800] ${
                  active ? "text-[#FFB800] border-b-2 border-[#FFB800] pb-0.5" : "text-white/85"
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
            className="inline-flex items-center justify-center whitespace-nowrap h-9 rounded-md px-4 font-display font-bold uppercase tracking-wider text-xs text-white/90 hover:text-white hover:bg-white/10 border border-white/20 transition-all cursor-pointer"
          >
            Connexion
          </Link>
          <Link
            href="/#tracking"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-9 px-5 bg-[#FFB800] hover:bg-[#E5A800] text-[#09090B] font-display font-extrabold uppercase tracking-wider text-xs shadow-md shadow-[#FFB800]/20 rounded-sm transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Suivre un colis</span>
          </Link>
        </div>

        {/* Bouton Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-[#27272A] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display text-base font-bold uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors ${
                    active ? "bg-[#FFB800]/15 text-[#FFB800]" : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-white/20 font-display font-bold uppercase tracking-wider text-xs text-white"
            >
              Connexion Espace Privé
            </Link>
            <Link
              href="/#tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#FFB800] text-[#09090B] font-display font-extrabold uppercase tracking-wider text-xs shadow-md"
            >
              Suivre un colis en direct
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

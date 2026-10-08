"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#09090B] text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          {/* Col 1: TransLogix Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shadow-red-500/20 flex-shrink-0">
                <Image
                  src="/images/logo-herve.png"
                  alt="Hervé Logistics Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-tight text-white leading-none">
                  HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
                </span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                  TRANSIT & LOGISTIQUE INTERNATIONALE
                </span>
              </div>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Offrir à chaque client la même transparence et précision que les plus grands transporteurs mondiaux (DHL, FedEx, UPS, MSC, Maersk, CMA CGM). Nous accompagnons entreprises, importateurs et particuliers dans le suivi de leurs colis, conteneurs et véhicules à travers plus de 180 pays, 24h/24.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#DC2626] hover:border-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn Hervé Logistics"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#DC2626] hover:border-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter Hervé Logistics"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#DC2626] hover:border-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Hervé Logistics"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#DC2626] hover:border-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram TransLogix"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Liens utiles */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Liens utiles
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track/TL-2025-000123" className="hover:text-white transition-colors text-[#DC2626] font-semibold">
                  Suivre un envoi (Démo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Informations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Informations
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>Trade Tower, 511 Yeongdong-daero, Gangnam-gu, Séoul, Corée du Sud</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                <a href="mailto:contact@hervelogistics.com" className="hover:text-white transition-colors">
                  contact@hervelogistics.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                <a href="tel:+44745660622192" className="hover:text-white transition-colors">
                  +44 7456 60622192
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <a
                  href="https://wa.me/44745660622192"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium text-xs transition-colors"
                >
                  WhatsApp Direct : +44 7456 60622192
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Légal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Légal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  CGU
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white transition-colors block">
                  → Espace Client
                </Link>
                <Link href="/admin" className="text-xs text-zinc-400 hover:text-white transition-colors block mt-1">
                  → Console Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Hervé Logistics. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Système de suivi en ligne actif
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

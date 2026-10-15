"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white/80 border-t border-[#27272A] shadow-inner">
      {/* Ligne accentuée Golden Yellow au sommet du footer */}
      <div className="h-1.5 bg-[#FFB800]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        {/* Colonne 1: Marque & Description */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/20 bg-black shadow-md flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/logo-herve-official.png"
                alt="Hervé Logistics Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[20px] font-extrabold uppercase tracking-tight text-white">
                Hervé <span className="text-[#FFB800]">Logistics</span>
              </span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Global Logistics
              </span>
            </div>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/70 leading-relaxed font-normal">
            Hervé Logistics — plateforme internationale de transport et de suivi logistique. Import, export, fret maritime, aérien, routier et livraison de conteneurs partout dans le monde.
          </p>
        </div>

        {/* Colonne 2: Navigation */}
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#FFB800] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-white/75 font-medium">
            <li>
              <Link href="/" className="hover:text-[#FFB800] transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#FFB800] transition-colors">
                Nos services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FFB800] transition-colors">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FFB800] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/#tracking" className="hover:text-[#FFB800] transition-colors font-bold text-white">
                Suivi en direct
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Contact */}
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#FFB800] mb-4">
            Contact & Agence
          </h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-1 shrink-0 text-[#FFB800]" />
              <span>
                <strong className="block font-semibold text-white">Hervé Logistics Korea Co., Ltd.</strong>
                Trade Tower, 511 Yeongdong-daero<br />
                Gangnam-gu, Séoul, Corée du Sud
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#FFB800]" />
              <a href="mailto:contact@hervelogistics.com" className="hover:text-[#FFB800] transition-colors font-medium">
                contact@hervelogistics.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#FFB800]" />
              <a href="tel:+447456062192" className="hover:text-[#FFB800] transition-colors font-medium">
                +44 7456 062192
              </a>
            </li>
            <li className="pt-1">
              <a
                href="https://wa.me/447456062192"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white bg-[#1E1E22] hover:bg-[#27272A] border border-[#3F3F46] font-bold text-xs inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp : +44 7456 062192</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre de copyright basse */}
      <div className="border-t border-white/10 bg-[#09090B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Hervé Logistics. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65 font-medium">
            <Link href="/legal" className="hover:text-[#FFB800] transition-colors">
              Mentions Légales
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-[#FFB800] transition-colors">
              Confidentialité
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-[#FFB800] transition-colors">
              Conditions Générales (CGV)
            </Link>
          </div>
          <p className="font-display uppercase tracking-wider text-[11px] text-white/40 font-semibold">
            Global Logistics · Import · Export · Sea · Air · Road
          </p>
        </div>
      </div>
    </footer>
  );
}

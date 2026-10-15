"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#001726] text-white/80 border-t border-[#002B49] shadow-inner">
      {/* Ligne accentuée Maersk Star Blue au sommet du footer */}
      <div className="h-1.5 bg-[#42B0D5]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        {/* Colonne 1: Marque & Description */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 items-center rounded-sm bg-[#42B0D5] px-2.5 shadow-sm ring-1 ring-black/10">
              <span className="font-display text-[22px] font-extrabold leading-none tracking-tight text-[#00243D]">
                HV
              </span>
              <span
                aria-hidden="true"
                className="ml-1 h-0 w-0 border-y-[9px] border-l-[9px] border-y-transparent border-l-[#00243D]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[20px] font-extrabold uppercase tracking-tight text-white">
                Hervé <span className="text-[#42B0D5]">Logistics</span>
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
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#42B0D5] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-white/75 font-medium">
            <li>
              <Link href="/" className="hover:text-[#42B0D5] transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#42B0D5] transition-colors">
                Nos services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#42B0D5] transition-colors">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#42B0D5] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/#tracking" className="hover:text-[#42B0D5] transition-colors font-bold text-white">
                Suivi en direct
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Contact */}
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#42B0D5] mb-4">
            Contact & Agence
          </h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-1 shrink-0 text-[#42B0D5]" />
              <span>
                <strong className="block font-semibold text-white">Hervé Logistics Korea Co., Ltd.</strong>
                Trade Tower, 511 Yeongdong-daero<br />
                Gangnam-gu, Séoul, Corée du Sud
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#42B0D5]" />
              <a href="mailto:contact@hervelogistics.com" className="hover:text-[#42B0D5] transition-colors font-medium">
                contact@hervelogistics.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#42B0D5]" />
              <a href="tel:+447456062192" className="hover:text-[#42B0D5] transition-colors font-medium">
                +44 7456 062192
              </a>
            </li>
            <li className="pt-1">
              <a
                href="https://wa.me/447456062192"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white bg-[#002B49] hover:bg-[#00385F] border border-[#004D80] font-bold text-xs inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp : +44 7456 062192</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre de copyright basse */}
      <div className="border-t border-white/10 bg-[#001320]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Hervé Logistics. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65 font-medium">
            <Link href="/legal" className="hover:text-[#42B0D5] transition-colors">
              Mentions Légales
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-[#42B0D5] transition-colors">
              Confidentialité
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-[#42B0D5] transition-colors">
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

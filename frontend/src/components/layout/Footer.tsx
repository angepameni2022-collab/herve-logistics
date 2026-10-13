"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#09090B] text-zinc-300">
      {/* Ligne accentuée rouge au sommet du footer */}
      <div className="h-1.5 bg-[#DC2626]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        {/* Colonne 1: Marque & Description */}
        <div className="md:col-span-2">
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
          <p className="mt-4 max-w-sm text-sm text-white/70 leading-relaxed">
            Hervé Logistics — plateforme internationale de suivi logistique. Import, export, maritime, aérien, routier et livraison de conteneurs partout dans le monde.
          </p>
        </div>

        {/* Colonne 2: Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DC2626] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/" className="hover:text-[#DC2626] transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#DC2626] transition-colors">
                Nos services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#DC2626] transition-colors">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#DC2626] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/suivi" className="hover:text-[#DC2626] transition-colors font-semibold text-white">
                Suivi en direct
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DC2626] mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-1 shrink-0 text-[#DC2626]" />
              <span>
                <strong className="block font-semibold text-white">Hervé Logistics Korea Co., Ltd.</strong>
                Trade Tower, 511 Yeongdong-daero<br />
                Gangnam-gu, Séoul, Corée du Sud
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <a href="mailto:contact@hervelogistics.com" className="hover:text-white transition-colors">
                contact@hervelogistics.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <a href="tel:+447456062192" className="hover:text-white transition-colors">
                +44 7456 062192
              </a>
            </li>
            <li className="pt-1">
              <a
                href="https://wa.me/447456062192"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>WhatsApp Support : +44 7456 062192</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre de copyright basse */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© 2026 Hervé Logistics. Tous droits réservés.</p>
          <p className="uppercase tracking-wider text-[10px]">
            Global Logistics · Import · Export · Sea · Air · Road
          </p>
        </div>
      </div>
    </footer>
  );
}

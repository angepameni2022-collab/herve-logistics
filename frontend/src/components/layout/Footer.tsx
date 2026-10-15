"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 shadow-sm">
      {/* Ligne accentuée rouge et rose radieuse au sommet du footer */}
      <div className="h-1.5 bg-gradient-to-r from-[#DC2626] via-[#E11D48] to-[#DC2626]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        {/* Colonne 1: Marque & Description */}
        <div className="md:col-span-2">
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
          <p className="mt-4 max-w-sm text-sm text-slate-600 leading-relaxed font-medium">
            Hervé Logistics — plateforme internationale de suivi logistique. Import, export, maritime, aérien, routier et livraison de conteneurs partout dans le monde.
          </p>
        </div>

        {/* Colonne 2: Navigation */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#DC2626] mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
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
              <Link href="/#tracking" className="hover:text-[#DC2626] transition-colors font-bold text-slate-900">
                Suivi en direct
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Contact */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#DC2626] mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-1 shrink-0 text-[#DC2626]" />
              <span>
                <strong className="block font-bold text-slate-900">Hervé Logistics Korea Co., Ltd.</strong>
                Trade Tower, 511 Yeongdong-daero<br />
                Gangnam-gu, Séoul, Corée du Sud
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <a href="mailto:contact@hervelogistics.com" className="hover:text-[#DC2626] transition-colors font-medium">
                contact@hervelogistics.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <a href="tel:+447456062192" className="hover:text-[#DC2626] transition-colors font-medium">
                +44 7456 062192
              </a>
            </li>
            <li className="pt-1">
              <a
                href="https://wa.me/447456062192"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>WhatsApp Support : +44 7456 062192</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre de copyright basse lumineuse */}
      <div className="border-t border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-medium">© 2026 Hervé Logistics. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
            <Link href="/legal" className="hover:text-[#DC2626] transition-colors">
              Mentions Légales
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/privacy" className="hover:text-[#DC2626] transition-colors">
              Confidentialité
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/terms" className="hover:text-[#DC2626] transition-colors">
              Conditions Générales (CGV)
            </Link>
          </div>
          <p className="uppercase tracking-wider text-[10px] text-slate-400 font-bold">
            Global Logistics · Import · Export · Sea · Air · Road
          </p>
        </div>
      </div>
    </footer>
  );
}

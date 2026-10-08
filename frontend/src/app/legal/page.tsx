"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#DC2626] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Informations réglementaires
              </span>
              <h1 className="text-3xl font-extrabold text-[#09090B] mt-2 mb-3">
                Mentions Légales
              </h1>
              <p className="text-xs text-zinc-400 font-medium">Dernière mise à jour : 1er Janvier 2025</p>
            </div>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">1. Éditeur de la Plateforme</h2>
              <p>
                La plateforme web officielle <strong>Hervé Logistics</strong> est éditée par la société <strong>Hervé Logistics Korea Co., Ltd.</strong>, société immatriculée en République de Corée.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li><strong>Siège social :</strong> 511 Yeongdong-daero, Trade Tower 28F, Gangnam-gu, Séoul 06164, Corée du Sud</li>
                <li><strong>Hub maritime :</strong> Busan Port International Logistics Terminal, Busan, Corée du Sud</li>
                <li><strong>Téléphone :</strong> +44 7456 062192</li>
                <li><strong>Courrier électronique :</strong> contact@hervelogistics.com</li>
                <li><strong>Directeur de la publication :</strong> Direction Générale Hervé Logistics Korea</li>
              </ul>
            </section>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">2. Hébergement & Infrastructure</h2>
              <p>
                L&apos;infrastructure d&apos;hébergement et les passerelles de télématique satellite sont hébergées dans des centres de données sécurisés conformes aux normes ISO 27001 et SOC 2.
              </p>
            </section>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">3. Propriété Intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus, marques, logos, graphismes et interfaces figurant sur Hervé Logistics sont protégés par le Code de la propriété intellectuelle. Toute reproduction non autorisée est strictement interdite.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

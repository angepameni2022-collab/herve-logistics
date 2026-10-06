"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
                Conditions Générales
              </span>
              <h1 className="text-3xl font-extrabold text-[#09090B] mt-2 mb-3">
                Conditions Générales d&apos;Utilisation (CGU)
              </h1>
              <p className="text-xs text-zinc-400 font-medium">Dernière révision : 1er Janvier 2025</p>
            </div>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">1. Objet et Champ d&apos;Application</h2>
              <p>
                Les présentes Conditions Générales d&apos;Utilisation ont pour objet de définir les modalités et conditions d&apos;accès et d&apos;utilisation des services digitaux proposés par la plateforme Hervé Logistics.
              </p>
            </section>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">2. Services de Suivi & Données AIS</h2>
              <p>
                Les données de positionnement fournies par le système de suivi reposent sur des signaux de télématique maritime (AIS), aérienne et terrestre. Bien que tout soit mis en œuvre pour garantir une précision maximale, les estimations d&apos;arrivée (ETA) sont communiquées à titre indicatif et sont susceptibles de varier selon les aléas météorologiques et portuaires.
              </p>
            </section>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">3. Responsabilité du Chargeur et de l&apos;Expéditeur</h2>
              <p>
                L&apos;expéditeur garantit l&apos;exactitude des déclarations douanières, de la nature des marchandises et de la conformité des conditionnements remis au transporteur selon les conventions internationales en vigueur (Règles de La Haye-Visby, Convention CMR, Convention de Montréal).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

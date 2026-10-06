"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
                Protection des Données
              </span>
              <h1 className="text-3xl font-extrabold text-[#09090B] mt-2 mb-3">
                Politique de Confidentialité
              </h1>
              <p className="text-xs text-zinc-400 font-medium">Dernière mise à jour : 1er Janvier 2025</p>
            </div>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">1. Collecte des Données Personnelles</h2>
              <p>
                Dans le cadre de l&apos;acheminement de vos expéditions, Hervé Logistics collecte les informations strictement nécessaires à la bonne exécution des prestations logistiques, douanières et au suivi en temps réel :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li>Identité et coordonnées de l&apos;expéditeur et du destinataire</li>
                <li>Détails des manifestes de fret, factures commerciales et documents douaniers</li>
                <li>Données de navigation et numéros de suivi consultés</li>
              </ul>
            </section>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">2. Utilisation et Confidentialité</h2>
              <p>
                Les données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li>Le suivi opérationnel de vos envois via AIS et bornes de transit</li>
                <li>La notification d&apos;ETA et alertes de dédouanement</li>
                <li>Le respect des obligations réglementaires et contrôles maritimes internationaux</li>
              </ul>
            </section>

            <section className="space-y-3 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-[#09090B]">3. Vos Droits (RGPD)</h2>
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles. Pour toute demande, vous pouvez contacter notre délégué à la protection des données à : <strong>dpo@hervelogistics.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

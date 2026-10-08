"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Radar, MapPin } from "lucide-react";

export default function TrackIndexPage() {
  const { shipments } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF2F2] border border-red-200 text-[#DC2626] text-xs font-bold mb-4">
            <Radar className="w-4 h-4 animate-spin-slow" />
            <span>Centre de Suivi Satellitaire</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#09090B] mb-4">
            Suivre une expédition en temps réel
          </h1>
          <p className="text-base text-zinc-600 max-w-xl mx-auto mb-8">
            Saisissez votre numéro d&apos;expédition officiel <strong>Hervé Logistics</strong> (ex: HL-2026-000001) pour visualiser la position exacte de votre fret, l&apos;estimation d&apos;arrivée et l&apos;historique douanier.
          </p>

          <TrackingSearchBox />

          {/* BANNIÈRE : Inscription obligatoire & obtention de code */}
          <div className="mt-8 bg-[#09090B] text-white rounded-2xl p-6 border border-zinc-800 shadow-md text-left flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#DC2626] bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800/60 inline-block mb-1">
                INSCRIPTION OBLIGATOIRE · ATTRIBUTION DU CODE DE SUIVI
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Vous n&apos;avez pas encore de numéro de suivi ?
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg">
                Pour faire expédier une marchandise depuis la Corée du Sud, vous devez obligatoirement vous inscrire. Transmettez-nous vos informations et recevez immédiatement votre code de suivi officiel.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-red-500/20 cursor-pointer"
                >
                  S&apos;inscrire & Déclarer
                </button>
              </Link>
            </div>
          </div>

          {/* Envois récents enregistrés */}
          <div className="mt-12 text-left bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Envois actifs enregistrés
            </h3>

            <div className="space-y-3">
              {shipments.map((s) => (
                <Link
                  key={s.trackingNumber}
                  href={`/track/${s.trackingNumber}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-zinc-200/80 hover:border-red-300 hover:bg-[#FEF2F2]/40 transition-all gap-3 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-sm text-[#09090B] group-hover:text-[#DC2626]">
                      {s.trackingNumber}
                    </span>
                    <Badge status={s.status} size="sm" />
                    <span className="text-xs text-zinc-500 hidden sm:inline">
                      {s.mode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                    <span className="text-zinc-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {s.origin} → {s.destination}
                    </span>
                    <span className="font-bold text-[#DC2626] flex items-center gap-1">
                      Voir
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

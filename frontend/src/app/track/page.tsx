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

      <main className="flex-1 py-16 sm:py-20 pt-28 sm:pt-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#FFFBEB] border border-[#FFB800]/30 text-[#B45309] font-display text-xs font-bold uppercase tracking-wider mb-4">
            <Radar className="w-4 h-4 text-[#FFB800]" />
            <span>Centre de Suivi Satellitaire · Herv� Logistics Network</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-[#121212] mb-4 tracking-tight">
            Suivre une expédition en temps réel
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto mb-8 font-normal">
            Saisissez votre numéro d&apos;expédition officiel <strong>Hervé Logistics</strong> (ex: HL-2026-000001) pour visualiser la position exacte de votre fret, l&apos;estimation d&apos;arrivée et l&apos;historique douanier.
          </p>

          <TrackingSearchBox />

          {/* BANNIÈRE : Attribution du code de suivi par messagerie */}
          <div className="mt-8 bg-[#121212] text-white rounded-2xl p-6 border border-[#27272A] shadow-xl text-left flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFB800] bg-white/10 px-2.5 py-0.5 rounded-sm inline-block mb-1">
                ATTRIBUTION DU CODE DE SUIVI · CONTACTEZ VOTRE AGENT
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-white">
                Vous n&apos;avez pas encore de numéro de suivi ?
              </h3>
              <p className="text-xs text-white/70 mt-1 max-w-lg">
                Pour faire expédier une marchandise ou localiser un colis, transmettez vos informations ou bordereaux à notre équipe par messagerie. Votre agent dédié vous remet directement votre numéro officiel pour activer le suivi en direct.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
              <a
                href="https://wa.me/447456062192?text=Bonjour%2C%20je%20souhaite%20exp%C3%A9dier%20un%20colis%20ou%20obtenir%20mon%20code%20de%20suivi%20officiel."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#FFB800] hover:bg-[#E5A800] text-[#121212] font-display font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Contacter sur WhatsApp</span>
                </button>
              </a>
            </div>
          </div>

          {/* Envois récents enregistrés */}
          <div className="mt-12 text-left bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Envois actifs enregistrés
            </h3>

            <div className="space-y-3">
              {shipments.map((s) => (
                <Link
                  key={s.trackingNumber}
                  href={`/track/${s.trackingNumber}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#FFB800] hover:bg-[#FFFBEB]/40 transition-all gap-3 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-sm text-[#121212] group-hover:text-[#FFB800]">
                      {s.trackingNumber}
                    </span>
                    <Badge status={s.status} size="sm" />
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {s.mode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                    <span className="text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {s.origin} → {s.destination}
                    </span>
                    <span className="font-display font-bold uppercase tracking-wider text-[#B45309] flex items-center gap-1">
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

"use client";

import React, { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingProgress } from "@/components/tracking/TrackingProgress";
import { TrackingTimeline } from "@/components/tracking/TrackingTimeline";
import { TrackingMap } from "@/components/tracking/TrackingMap";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  AlertTriangle,
  ArrowLeft,
  Anchor,
  Calendar,
  MapPin,
  Printer,
  ShieldCheck,
} from "lucide-react";

export default function TrackingDetailPage({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const unwrappedParams = use(params);
  const rawNumero = decodeURIComponent(unwrappedParams.numero || "");
  const { getShipmentByNumber } = useApp();

  const shipment = getShipmentByNumber(rawNumero);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-10 sm:py-16 pt-24 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar with back link & search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-slate-600 hover:text-[#FFB800] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </Link>

            <div className="sm:w-80">
              <TrackingSearchBox defaultNumber={rawNumero} />
            </div>
          </div>

          {/* ÉTAT TRACKING INTROUVABLE */}
          {!shipment ? (
            <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#FFFBEB] text-[#B45309] flex items-center justify-center mx-auto mb-5 border border-[#FFB800]/30">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#B45309] bg-[#FFFBEB] px-3.5 py-1 rounded-sm border border-[#FFB800]/20">
                Numéro non répertorié
              </span>
              <h2 className="font-display text-3xl font-extrabold uppercase text-[#121212] mt-3 mb-3">
                Numéro de suivi introuvable
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Le numéro <span className="font-mono font-bold text-[#121212] bg-slate-100 px-2 py-0.5 rounded">&ldquo;{rawNumero}&rdquo;</span> ne correspond à aucune expédition active. Vérifiez que le numéro est correct ou contactez notre service client.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left text-slate-600 mb-8 space-y-2">
                <p className="font-bold text-[#121212]">Numéros d&apos;exemple à tester :</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/track/HL-2026-000001"
                    className="font-mono font-bold text-[#121212] bg-[#FFB800] px-2.5 py-1 rounded border border-[#E5A800] hover:bg-[#E5A800]"
                  >
                    HL-2026-000001 (Maritime - En transit)
                  </Link>
                  <Link
                    href="/track/TL-2025-000124"
                    className="font-mono font-bold text-slate-800 bg-white px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-100"
                  >
                    TL-2025-000124 (Aérien - Livré)
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/auth/register">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-sm bg-[#121212] hover:bg-[#27272A] text-white font-display font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    S&apos;inscrire & Obtenir un code de suivi
                  </button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="md">
                    Retour à l&apos;accueil
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* PAGE SUIVI VALIDE */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Entête de suivi : EN TRANSIT / HL-2026-000001 / OFFICIEL */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <Badge status={shipment.status} size="md" />
                    <span className="text-xs font-display font-bold uppercase tracking-wider bg-[#121212] text-white px-2.5 py-1 rounded-sm inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#FFB800]" />
                      Officiel Herv� Logistics Network
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Mode : {shipment.mode}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#121212] tracking-tight mt-2">
                    {shipment.trackingNumber}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                    <span>Expédié le {shipment.departureDate}</span>
                    <span>•</span>
                    <span className="text-[#B45309] font-semibold">{shipment.currentLocationName}</span>
                  </p>
                </div>

                {/* Actions boutons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-[#121212] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer le reçu</span>
                  </button>
                  <Link href="/contact">
                    <Button variant="secondary" size="sm">
                      Signaler un problème
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Barre de Progression */}
              <TrackingProgress status={shipment.status} progress={shipment.progress} />

              {/* Tableau Synthétique des Informations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <MapPin className="w-4 h-4 text-[#FFB800]" />
                    <span>Origine</span>
                  </div>
                  <div className="text-base font-bold text-[#121212]">{shipment.origin}</div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{shipment.sender}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Destination</span>
                  </div>
                  <div className="text-base font-bold text-[#121212]">{shipment.destination}</div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{shipment.recipient}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <Anchor className="w-4 h-4 text-[#FFB800]" />
                    <span>Mode de transport</span>
                  </div>
                  <div className="text-base font-bold text-[#121212]">{shipment.mode}</div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{shipment.volume}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <Calendar className="w-4 h-4 text-[#FFB800]" />
                    <span>ETA (Arrivée prévue)</span>
                  </div>
                  <div className="text-base font-extrabold text-[#B45309]">{shipment.eta}</div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">Poids total : {shipment.weight}</div>
                </div>
              </div>

              {/* CARTE DE SUIVI */}
              <div className="w-full">
                <TrackingMap shipment={shipment} />
              </div>

              {/* TIMELINE VERTICALE */}
              <div className="w-full">
                <TrackingTimeline events={shipment.events} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

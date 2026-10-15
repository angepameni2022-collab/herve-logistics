"use client";

import React, { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingMap } from "@/components/tracking/TrackingMap";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  MapPin,
  Printer,
  ShieldCheck,
  Share2,
  MessageCircle,
  Package,
  Box,
  Ship,
  Truck,
  Building2,
  Clock,
  Compass,
  Gauge,
  Hourglass,
  TrendingUp,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function TrackingDetailPage({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const unwrappedParams = use(params);
  const rawNumero = decodeURIComponent(unwrappedParams.numero || "");
  const { getShipmentByNumber } = useApp();
  const { showToast } = useToast();

  const shipment = getShipmentByNumber(rawNumero);

  // Logistics calculations matching user screenshot style (alain-logistics)
  const totalDistanceKm = 24284;
  const progressPercent = shipment ? shipment.progress : 45;
  const parcouruKm = Math.round((totalDistanceKm * progressPercent) / 100);
  const restantKm = Math.max(0, totalDistanceKm - parcouruKm);

  // Time calculations (705 hours total estimated journey)
  const totalHours = 705;
  const tempsEcouleHours = Math.round((totalHours * progressPercent) / 100);
  const tempsRestantHours = Math.max(0, totalHours - tempsEcouleHours);

  // Vessel Speed
  const speed = shipment?.status === "En transit" ? "19.4 nds (36 km/h)" : "0 km/h";

  // Container identifier
  const containerId = shipment?.vesselName?.includes("IMO")
    ? "MSCU 4829137"
    : (shipment?.vesselName || "MSCU 4829137");

  // Client name
  const clientDisplayName = shipment?.clientName || shipment?.recipient || "Azegue Kelly";

  // Share handler for native mobile sheet or clipboard fallback
  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `Suivi Colis ${shipment?.trackingNumber || ""} — Hervé Logistics`,
      text: `Suivez l'acheminement de votre expédition ${shipment?.trackingNumber || ""} en direct sur Hervé Logistics :`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User dismissed share dialog
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Lien de suivi copié ! Prêt à être partagé.", "success");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-8 sm:py-14 pt-20 sm:pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar with back link & search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-600 hover:text-[#FFB800] transition-colors"
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
                Le numéro <span className="font-mono font-bold text-[#121212] bg-slate-100 px-2 py-0.5 rounded">&ldquo;{rawNumero}&rdquo;</span> ne correspond à aucune expédition active. Vérifiez que le numéro est correct ou contactez votre agent Hervé Logistics.
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
                <Link href="/">
                  <Button variant="outline" size="md">
                    Retour à l&apos;accueil
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* ESPACE CLIENT DE SUIVI ÉPURÉ & SIMPLE (Style alain-logistics) */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* 1. Entête Expédition & Actions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <Badge status={shipment.status} size="sm" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider bg-[#121212] text-white px-2.5 py-0.5 rounded-sm inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#FFB800]" />
                      Officiel Hervé Logistics
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#121212] tracking-tight">
                    {shipment.trackingNumber}
                  </h1>

                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>Expédié le {shipment.departureDate}</span>
                    <span>•</span>
                    <span className="text-[#B45309] font-semibold">{shipment.currentLocationName}</span>
                  </p>
                </div>

                {/* Boutons d'action : Partager / WhatsApp / Imprimer */}
                <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                  <button
                    onClick={handleShare}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-[#121212] bg-[#FFB800] hover:bg-[#E0A200] transition-all shadow-xs"
                    title="Partager le suivi"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Partager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
                      const text = encodeURIComponent(`Suivez votre expédition Hervé Logistics n° ${shipment.trackingNumber} en temps réel ici : ${shareUrl}`);
                      window.open(`https://wa.me/?text=${text}`, '_blank');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-xs"
                    title="Envoyer sur WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-[#121212] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer</span>
                  </button>
                </div>
              </div>

              {/* 2. CARTE INTERACTIVE EN DIRECT AVEC BOUTON POSITION ACTUELLE */}
              <div className="w-full">
                <TrackingMap shipment={shipment} />
              </div>

              {/* 3. ESCALES DU VOYAGE (Photo 2) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold uppercase text-[#121212]">
                    Escales du voyage
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {shipment.waypoints?.length || 2} points de passage
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Point A : ORIGINE */}
                  <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                        A
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#121212] capitalize">
                          {shipment.origin}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          ORIGINE
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#0284C7]">
                      Départ
                    </span>
                  </div>

                  {/* Point B : DESTINATION */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#64748B] text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                        B
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#121212] capitalize">
                          {shipment.destination}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          ARRIVÉE
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Destination finale
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. GRILLE DES 8 CARTES MÉTRIQUES (Photo 2) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. PARCOURU */}
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>Parcouru</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#121212]">
                    {parcouruKm.toLocaleString("fr-FR")} km
                  </div>
                </div>

                {/* 2. RESTANT */}
                <div className="bg-[#F0F9FF] border border-[#E0F2FE] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sky-700 mb-1">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>Restant</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#121212]">
                    {restantKm.toLocaleString("fr-FR")} km
                  </div>
                </div>

                {/* 3. VITESSE */}
                <div className="bg-[#FAF5FF] border border-[#F3E8FF] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-1">
                    <Gauge className="w-4 h-4 text-purple-600" />
                    <span>Vitesse</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#121212] truncate">
                    {speed}
                  </div>
                </div>

                {/* 4. ETA */}
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>ETA</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#B45309]">
                    {shipment.eta}
                  </div>
                </div>

                {/* 5. DISTANCE TOTALE */}
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    <TrendingUp className="w-4 h-4 text-slate-600" />
                    <span>Distance totale</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#121212]">
                    {totalDistanceKm.toLocaleString("fr-FR")} km
                  </div>
                </div>

                {/* 6. TEMPS ÉCOULÉ */}
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span>Temps écoulé</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#121212]">
                    {tempsEcouleHours} h
                  </div>
                </div>

                {/* 7. TEMPS RESTANT */}
                <div className="bg-[#FFF1F2] border border-[#FFE4E6] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                    <Hourglass className="w-4 h-4 text-rose-600" />
                    <span>Temps restant</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-rose-950">
                    {tempsRestantHours} h
                  </div>
                </div>

                {/* 8. COLIS */}
                <div className="bg-[#F0FDFA] border border-[#CCFBF1] p-4 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-teal-700 mb-1">
                    <Package className="w-4 h-4 text-teal-600" />
                    <span>Colis</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-teal-950">
                    {shipment.volume.includes("Conteneur") ? "2 conteneurs" : "1 colis"}
                  </div>
                </div>
              </div>

              {/* 5. BANNIÈRE DISTANCE RESTANTE & PROGRESSION (Photo 1) */}
              <div className="bg-[#121212] text-white rounded-2xl p-5 sm:p-6 border border-[#27272A] shadow-md">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      DISTANCE RESTANTE
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      {restantKm.toLocaleString("fr-FR")} km
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      PROGRESSION
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#FFB800] mt-0.5">
                      {progressPercent}%
                    </div>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFB800] to-[#E5A800] rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                  />
                </div>
              </div>

              {/* 6. MARCHANDISE (Photo 1) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  MARCHANDISE
                </div>
                <div className="space-y-4">
                  {/* Type */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFB800] text-[#121212] flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Package className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">Type</div>
                      <div className="text-sm font-bold text-[#121212]">
                        {shipment.volume.includes("Conteneur") ? "Colis & Conteneurs" : "Colis"}
                      </div>
                    </div>
                  </div>

                  {/* Conteneur */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFB800] text-[#121212] flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Box className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">Conteneur</div>
                      <div className="text-sm font-bold text-[#121212] font-mono">
                        {containerId}
                      </div>
                    </div>
                  </div>

                  {/* Transport */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFB800] text-[#121212] flex items-center justify-center flex-shrink-0 shadow-xs">
                      {shipment.mode === "Aérien" ? (
                        <Truck className="w-5 h-5 stroke-[2.2]" />
                      ) : (
                        <Ship className="w-5 h-5 stroke-[2.2]" />
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">Transport</div>
                      <div className="text-sm font-bold text-[#121212]">
                        {shipment.mode}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. DESTINATAIRE (Photo 1) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  DESTINATAIRE
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-400">Client</div>
                    <div className="text-sm font-bold text-[#121212]">
                      {clientDisplayName}
                    </div>
                    {shipment.recipient && shipment.recipient !== clientDisplayName && (
                      <div className="text-xs text-slate-500 mt-0.5">
                        {shipment.recipient}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{shipment.destination}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. HISTORIQUE DU VOYAGE (Photo 1) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold uppercase text-[#121212]">
                    Historique du voyage
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-normal">
                    Chronologie de toutes les étapes
                  </p>
                </div>

                {!shipment.events || shipment.events.length === 0 ? (
                  <div className="text-center py-8 text-sm italic text-slate-400">
                    Aucun événement enregistré pour le moment.
                  </div>
                ) : (
                  <div className="relative pl-6 sm:pl-7 space-y-6 before:absolute before:left-[11px] sm:before:left-[13px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {shipment.events.map((evt, idx) => {
                      const isLatest = idx === 0;
                      return (
                        <div key={evt.id || idx} className="relative group">
                          <div
                            className={`absolute -left-6 sm:-left-7 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              evt.completed
                                ? isLatest
                                  ? "bg-[#FFB800] border-[#FFB800] text-[#121212] ring-4 ring-[#FFB800]/20"
                                  : "bg-[#121212] border-[#121212] text-white"
                                : "bg-white border-dashed border-slate-300 text-slate-400"
                            }`}
                          >
                            {evt.completed ? (
                              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                          </div>
                          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 transition-all">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                              <span className="text-xs font-bold text-slate-500">
                                {evt.date} · {evt.time}
                              </span>
                              <Badge status={evt.status} size="sm" />
                            </div>
                            <div className="text-sm font-bold text-[#121212] flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#FFB800] flex-shrink-0" />
                              <span>{evt.location}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {evt.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bouton Contacter / Support */}
              <div className="text-center pt-2 pb-6">
                <Link href="/contact">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-slate-600 hover:text-[#121212] hover:bg-slate-100 transition-colors"
                  >
                    <span>Un doute ou une question sur votre colis ? Contacter le support</span>
                  </button>
                </Link>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
